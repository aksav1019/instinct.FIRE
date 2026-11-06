/* instinct.SIP — client PDF report (jsPDF, A4, embedded Baloo 2 + Caveat). */
(function (root) {
  'use strict';
  var C = Doodles.C;
  var A4W = 210, A4H = 297, M = 14;

  function hex(doc, which, h) {
    var n = parseInt(h.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    if (which === 'fill') doc.setFillColor(r, g, b);
    else if (which === 'draw') doc.setDrawColor(r, g, b);
    else doc.setTextColor(r, g, b);
  }

  function setupFonts(doc) {
    var F = root.PDF_FONTS;
    doc.addFileToVFS('Baloo-Regular.ttf', F.regular); doc.addFont('Baloo-Regular.ttf', 'Baloo', 'normal');
    doc.addFileToVFS('Baloo-SemiBold.ttf', F.semibold); doc.addFont('Baloo-SemiBold.ttf', 'BalooSB', 'normal');
    doc.addFileToVFS('Baloo-ExtraBold.ttf', F.bold); doc.addFont('Baloo-ExtraBold.ttf', 'BalooXB', 'normal');
    doc.addFileToVFS('Caveat-Bold.ttf', F.hand); doc.addFont('Caveat-Bold.ttf', 'Caveat', 'normal');
  }

  function font(doc, face, size, color) {
    doc.setFont(face, 'normal');
    doc.setFontSize(size);
    hex(doc, 'text', color || C.ink);
  }

  /** A box with a hard offset "ink" shadow, like the app's sheets. */
  function sketchBox(doc, x, y, w, h, fill, r) {
    r = r == null ? 4 : r;
    hex(doc, 'fill', C.ink);
    doc.roundedRect(x + 1.1, y + 1.4, w, h, r, r, 'F');
    hex(doc, 'fill', fill || '#FFFFFF');
    hex(doc, 'draw', C.ink);
    doc.setLineWidth(0.55);
    doc.roundedRect(x, y, w, h, r, r, 'FD');
  }

  function canvasPNG(w, h, draw, transparent) {
    var cv = document.createElement('canvas');
    var k = 3;
    cv.width = Math.round(w * k); cv.height = Math.round(h * k);
    var ctx = cv.getContext('2d');
    if (!transparent) { ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, cv.width, cv.height); }
    ctx.scale(k, k);
    draw(Doodles.canvasAdapter(cv), w, h);
    return cv.toDataURL('image/png');
  }

  function today() {
    var d = new Date();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return { label: d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear(),
      iso: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') };
  }

  function fileName(r, info) {
    var kind = r.kind === 'sip' ? 'SIP' : 'Lumpsum';
    var mode = r.mode === 'goal' ? 'Goal' : 'Growth';
    var who = (info.client || 'Client').trim().replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'Client';
    return kind + '-' + mode + '-Plan_' + who + '_' + today().iso + '.pdf';
  }

  function footer(doc, page, pages, info) {
    hex(doc, 'draw', C.grid);
    doc.setLineWidth(0.3);
    doc.line(M, A4H - 14, A4W - M, A4H - 14);
    font(doc, 'Baloo', 7.5, C.inkSoft);
    var left = info.preparedBy ? 'Prepared by ' + info.preparedBy + (info.contact ? '  |  ' + info.contact : '') : 'Made with instinct.SIP';
    doc.text(left, M, A4H - 9);
    doc.text('Page ' + page + ' of ' + pages, A4W - M, A4H - 9, { align: 'right' });
  }

  function build(r, info) {
    var jsPDF = root.jspdf.jsPDF;
    var doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    setupFonts(doc);
    var d = Calc.describe(r);
    var col = Doodles.colorsFor(r.kind);
    var R = Calc.rupees;
    var dt = today();
    doc.setProperties({ title: d.title + (info.client ? ' for ' + info.client : ''), author: info.preparedBy || 'instinct.SIP', creator: 'instinct.SIP' });

    /* ---- header band ---- */
    hex(doc, 'fill', C.ink);
    doc.rect(0, 0, A4W, 34, 'F');
    // wavy hand-drawn edge
    hex(doc, 'fill', col.accent);
    doc.rect(0, 34, A4W, 2.2, 'F');
    font(doc, 'BalooXB', 22, '#FFFFFF');
    doc.text('instinct', M, 17);
    var w1 = doc.getTextWidth('instinct');
    hex(doc, 'text', r.kind === 'sip' ? '#B9A6FF' : '#7FE0BE');
    doc.text('.SIP', M + w1, 17);
    font(doc, 'Caveat', 17, C.marigold);
    doc.text(d.title, M, 26.5);
    font(doc, 'Baloo', 9, '#C9CEEA');
    doc.text(dt.label, A4W - M, 14, { align: 'right' });
    font(doc, 'BalooSB', 10, '#FFFFFF');
    if (info.preparedBy) doc.text(info.preparedBy, A4W - M, 20.5, { align: 'right' });
    font(doc, 'Baloo', 8.5, '#C9CEEA');
    if (info.contact) doc.text(info.contact, A4W - M, 26, { align: 'right' });

    /* ---- who it's for ---- */
    var y = 48;
    font(doc, 'Baloo', 9, C.inkSoft);
    doc.text('Prepared for', M, y);
    font(doc, 'BalooXB', 19, C.ink);
    doc.text(info.client || 'Our client', M, y + 8);
    y += 15;
    if (info.note) {
      // Caveat has no ₹ glyph; fall back to Baloo when the note needs one.
      if (/[^\x20-\x7E\xA0-\xFF–-”…]/.test(info.note)) font(doc, 'BalooSB', 11, C.melon);
      else font(doc, 'Caveat', 14, C.melon);
      var nl = doc.splitTextToSize(info.note, A4W - 2 * M);
      doc.text(nl.slice(0, 2), M, y + 1);
      y += 6 * Math.min(nl.length, 2);
    }
    font(doc, 'BalooSB', 11, C.inkSoft);
    var sc = doc.splitTextToSize(d.scenario + '.', A4W - 2 * M);
    doc.text(sc, M, y + 2);
    y += 5.5 * sc.length + 4;

    /* ---- the answer ---- */
    var boxH = 50;
    sketchBox(doc, M, y, A4W - 2 * M, boxH, col.accentWash, 5);
    font(doc, 'Caveat', 17, C.inkSoft);
    doc.text(d.question, M + 7, y + 12);
    font(doc, 'BalooXB', 31, C.ink);
    var bigStr = R(d.big);
    var bigW = doc.getTextWidth(bigStr);
    hex(doc, 'fill', r.mode === 'goal' ? '#FFD98A' : (r.kind === 'sip' ? '#A7E5CF' : '#FFD98A'));
    doc.roundedRect(M + 5, y + 19.5, bigW + 4, 7, 2, 2, 'F');
    doc.text(bigStr, M + 7, y + 25.5);
    font(doc, 'Baloo', 10, C.inkSoft);
    var sub = doc.splitTextToSize(d.sub, 100);
    doc.text(sub, M + 7, y + 33);
    font(doc, 'Caveat', 14, C.ink);
    doc.text(d.multipleHand, M + 7, y + 43.5);
    // illustration
    var art = canvasPNG(320, 150, function (A) { Doodles.drawScene(A, r.kind, r.mode); }, true);
    doc.addImage(art, 'PNG', A4W - M - 74, y + 6, 70, 32.8, undefined, 'FAST');
    y += boxH + 8;

    /* ---- three numbers ---- */
    var cw = (A4W - 2 * M - 10) / 3;
    var stats = [
      ['You invest', R(r.invested), r.kind === 'sip' ? R(r.instalment) + ' x ' + Calc.months(r.years) + ' months' : 'one time', col.accent],
      ['Market adds (est.)', R(r.gains), r.invested > 0 ? '+' + Math.round(r.gains / r.invested * 100) + '% on what you put in' : '', col.gain],
      ['You get', R(r.value), 'after ' + r.years + (r.years === 1 ? ' year' : ' years'), C.ink]
    ];
    stats.forEach(function (s, i) {
      var x = M + i * (cw + 5);
      sketchBox(doc, x, y, cw, 25, '#FFFFFF', 3.5);
      hex(doc, 'fill', s[3]);
      doc.roundedRect(x + 5, y + 5.2, 3.6, 3.6, 0.8, 0.8, 'F');
      font(doc, 'Baloo', 9, C.inkSoft);
      doc.text(s[0], x + 10.5, y + 8.2);
      font(doc, 'BalooXB', 13.5, C.ink);
      doc.text(s[1], x + 5, y + 16.3);
      font(doc, 'Baloo', 7.6, C.inkSoft);
      doc.text(s[2], x + 5, y + 21.5);
    });
    y += 33;

    /* ---- charts ---- */
    font(doc, 'BalooXB', 12, C.ink);
    doc.text('How it grows, year by year', M, y);
    hex(doc, 'fill', col.accent); doc.rect(A4W - M - 58, y - 3, 3, 3, 'F');
    font(doc, 'Baloo', 8.5, C.inkSoft); doc.text('invested', A4W - M - 53.5, y - 0.4);
    hex(doc, 'fill', col.gain); doc.rect(A4W - M - 36, y - 3, 3, 3, 'F');
    doc.text('growth', A4W - M - 31.5, y - 0.4);
    y += 3;
    var chartW = 128, chartH = 66;
    var chart = canvasPNG(chartW * 4, chartH * 4, function (A, W, H) {
      Doodles.drawGrowth(A, W, H, r.schedule, r.kind, Calc.short, { k: 1.45 });
    });
    doc.addImage(chart, 'PNG', M, y, chartW, chartH, undefined, 'FAST');
    var don = canvasPNG(200, 200, function (A) {
      Doodles.drawDonut(A, 100, 100, 170, r.invested, r.gains, r.kind, { hachureGap: 5, fillWeight: 2 });
    });
    doc.addImage(don, 'PNG', M + chartW + 6, y + 6, 48, 48, undefined, 'FAST');
    y += chartH + 6;

    /* ---- other route ---- */
    if (y + 26 < A4H - 20) {
      sketchBox(doc, M, y, A4W - 2 * M, 21, C.marigoldWash, 4);
      font(doc, 'BalooXB', 11, C.ink);
      doc.text(d.altTitle, M + 6, y + 8);
      font(doc, 'Baloo', 10, C.inkSoft);
      var line = d.altBody[0];
      doc.text(line, M + 6, y + 15);
      var lw = doc.getTextWidth(line);
      font(doc, 'BalooXB', 11.5, C.ink);
      doc.text(d.altBody[1], M + 6 + lw, y + 15);
      var bw = doc.getTextWidth(d.altBody[1]);
      font(doc, 'Baloo', 10, C.inkSoft);
      var tail = doc.splitTextToSize(d.altBody[2], A4W - 2 * M - 12 - lw - bw);
      doc.text(tail[0] || '', M + 6 + lw + bw, y + 15);
    }

    /* ---- page 2+: year table + method ---- */
    doc.addPage();
    y = 20;
    font(doc, 'BalooXB', 16, C.ink);
    doc.text('Year-by-year details', M, y);
    font(doc, 'Caveat', 14, C.inkSoft);
    doc.text('values at the end of each year', M, y + 7);
    y += 14;
    var cols = [M + 4, M + 40, M + 98, A4W - M - 4];
    var head = function () {
      hex(doc, 'fill', C.ink);
      doc.roundedRect(M, y, A4W - 2 * M, 9, 2, 2, 'F');
      font(doc, 'BalooSB', 9.5, '#FFFFFF');
      doc.text('Year', cols[0], y + 6);
      doc.text('Total invested', cols[1] + 30, y + 6, { align: 'right' });
      doc.text('Estimated gains', cols[2] + 30, y + 6, { align: 'right' });
      doc.text('Estimated value', cols[3], y + 6, { align: 'right' });
      y += 11;
    };
    head();
    r.schedule.forEach(function (row, i) {
      if (y > A4H - 32) { doc.addPage(); y = 20; head(); }
      if (i % 2 === 0) { hex(doc, 'fill', '#F3F7FF'); doc.rect(M, y - 4.6, A4W - 2 * M, 6.6, 'F'); }
      var last = i === r.schedule.length - 1;
      font(doc, last ? 'BalooXB' : 'Baloo', 9.5, C.ink);
      doc.text(String(row.year), cols[0], y);
      doc.text(R(row.invested), cols[1] + 30, y, { align: 'right' });
      hex(doc, 'text', last ? C.ink : C.leaf);
      doc.text(R(row.value - row.invested), cols[2] + 30, y, { align: 'right' });
      hex(doc, 'text', C.ink);
      doc.text(R(row.value), cols[3], y, { align: 'right' });
      y += 6.6;
    });

    y += 8;
    if (y > A4H - 92) { doc.addPage(); y = 20; }
    font(doc, 'Baloo', 9.2, C.inkSoft);
    var method = r.kind === 'sip'
      ? ['A SIP is an equal amount invested at the start of every month. Each instalment grows at the monthly rate (yearly return / 12), and the values are added up.',
         'Value = P x [(1 + i)^n - 1] / i x (1 + i), where P is the monthly amount, i = ' + r.rate + '% / 12, and n = ' + Calc.months(r.years) + ' months.']
      : ['A lumpsum is invested once and compounds every year at the assumed return.',
         'Value = P x (1 + r)^t, where P is the amount invested, r = ' + r.rate + '% and t = ' + r.years + (r.years === 1 ? ' year.' : ' years.')];
    if (r.mode === 'goal') method.push('For a goal, the same formula is run backwards: we start from the target of ' + R(r.target) + ' and solve for the amount to invest.');
    method.push('Amounts are rounded to the nearest rupee.');
    var blocks = method.map(function (m) { return doc.splitTextToSize(m, A4W - 2 * M - 12); });
    var boxH = 16 + blocks.reduce(function (s, b) { return s + b.length * 4.4 + 2.2; }, 0) + 2;
    sketchBox(doc, M, y, A4W - 2 * M, boxH, '#FFFFFF', 4);
    font(doc, 'BalooXB', 12, C.ink);
    doc.text('How these numbers are worked out', M + 6, y + 9);
    font(doc, 'Baloo', 9.2, C.inkSoft);
    var yy = y + 16;
    blocks.forEach(function (ls) {
      doc.text(ls, M + 6, yy);
      yy += ls.length * 4.4 + 2.2;
    });
    y += boxH + 9;

    font(doc, 'BalooSB', 9, C.ink);
    doc.text('Please note', M, y);
    font(doc, 'Baloo', 8.2, C.inkSoft);
    var disc = doc.splitTextToSize(
      'This report is an illustration, not a promise of returns. It assumes the same return every year; real investments rise and fall, and actual results will differ. ' +
      'Mutual fund investments are subject to market risks; read all scheme-related documents carefully. Taxes, exit loads and expense ratios are not included. ' +
      'Past performance does not guarantee future returns.', A4W - 2 * M);
    doc.text(disc, M, y + 5);

    var pages = doc.getNumberOfPages();
    for (var p = 1; p <= pages; p++) { doc.setPage(p); footer(doc, p, pages, info); }
    return { doc: doc, fileName: fileName(r, info) };
  }

  root.Report = { build: build, fileName: fileName };
})(this);
