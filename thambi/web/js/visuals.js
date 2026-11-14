/* Thambi — lesson pictures. Each card names a picture with a tiny spec string:
   "🏭 🍕"                      big emoji (add "|caption")
   "bars:FD=7,Equity=12|cap"    bar chart (Label=value or Label=value=shown text)
   "line:1,2,4,8|cap|h=3"       line chart, optional dashed levels; "a/b" = two lines
   "candle:o h l c label,..."   candlesticks
   "pie:Equity=60,Debt=30"      donut
   "flow:A>B>C"                 steps
   "vs:Left|a;b||Right|c;d"     side by side
   "f:Formula|small note"       formula
   "keys:Ctrl+C=Copy,F4=Lock"   keycaps
   "grid:a,b;c,d"               spreadsheet (=formula, *highlight, #header cell) */
(function () {
  var INK = '#1D1147';
  var PAL = ['#6B3CFF', '#FF4F8B', '#12B76A', '#FFC83D', '#2E9BFF', '#FF7A1A', '#0FB9B1'];
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function cap(c) { return c ? '<div class="v-cap">' + esc(c) + '</div>' : ''; }
  function wrap(h) { return '<div class="v-wrap">' + h + '</div>'; }
  function pairs(s) {
    return s.split(',').map(function (p) {
      var a = p.split('=');
      return { k: a[0].trim(), v: parseFloat(a[1]), t: a[2] != null ? a[2] : a[1] };
    });
  }

  function emoji(body) {
    var a = body.split('|');
    var n = Array.from(a[0].replace(/\s/g, '')).length;
    var cls = n > 9 ? ' s' : n > 5 ? ' m' : '';
    return '<div class="v-emoji' + cls + '">' + esc(a[0]) + (a[1] ? '<small>' + esc(a[1]) + '</small>' : '') + '</div>';
  }

  function bars(body) {
    var a = body.split('|'), d = pairs(a[0]);
    var max = Math.max.apply(null, d.map(function (x) { return Math.abs(x.v); })) || 1;
    var W = 300, H = 190, base = 150, bw = Math.min(58, (W - 20) / d.length - 12);
    var gap = (W - d.length * bw) / (d.length + 1), out = '';
    d.forEach(function (x, i) {
      var h = Math.max(4, Math.abs(x.v) / max * 112), px = gap + i * (bw + gap);
      var col = x.v < 0 ? '#F04438' : PAL[i % PAL.length];
      out += '<rect x="' + px + '" y="' + (base - h) + '" width="' + bw + '" height="' + h + '" rx="7" fill="' + col + '" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<text x="' + (px + bw / 2) + '" y="' + (base - h - 7) + '" text-anchor="middle" font-size="14" font-weight="800" fill="' + INK + '">' + esc(x.t) + '</text>' +
        '<text x="' + (px + bw / 2) + '" y="' + (base + 18) + '" text-anchor="middle" font-size="12.5" font-weight="600" fill="' + INK + '">' + esc(x.k) + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%"><line x1="6" x2="' + (W - 6) + '" y1="' + base + '" y2="' + base + '" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/>' + out + '</svg>' + cap(a[1]);
  }

  function line(body) {
    var a = body.split('|');
    var series = a[0].split('/').map(function (s) { return s.split(',').map(Number); });
    var hl = (a[2] || '').replace('h=', '').split(',').filter(Boolean).map(Number);
    var all = [].concat.apply([], series).concat(hl);
    var mn = Math.min.apply(null, all), mx = Math.max.apply(null, all);
    if (mn > 0 && !hl.length && mn / mx < 0.6) mn = 0;
    var W = 300, H = 180, px = 14, py = 18, rng = (mx - mn) || 1;
    function Y(v) { return H - py - (v - mn) / rng * (H - 2 * py); }
    var out = '';
    if (mn < 0 && mx > 0) out += '<line x1="6" x2="' + (W - 6) + '" y1="' + Y(0) + '" y2="' + Y(0) + '" stroke="' + INK + '" stroke-width="2"/><text x="8" y="' + (Y(0) - 5) + '" font-size="11.5" font-weight="800" fill="' + INK + '">0</text>';
    hl.forEach(function (v) { out += '<line x1="6" x2="' + (W - 6) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="#FF4F8B" stroke-width="2.5" stroke-dasharray="7 6"/>'; });
    series.forEach(function (s, si) {
      var pts = s.map(function (v, i) { return (px + i * (W - 2 * px) / (s.length - 1)).toFixed(1) + ',' + Y(v).toFixed(1); });
      var col = si ? '#FF7A1A' : '#6B3CFF';
      if (!si && mn >= 0 && series.length === 1) out += '<polygon points="' + px + ',' + (H - py) + ' ' + pts.join(' ') + ' ' + (W - px) + ',' + (H - py) + '" fill="#6B3CFF" opacity=".14"/>';
      out += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>';
      var last = pts[pts.length - 1].split(',');
      out += '<circle cx="' + last[0] + '" cy="' + last[1] + '" r="6" fill="#FFC83D" stroke="' + INK + '" stroke-width="2.5"/>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%">' + out + '</svg>' + cap(a[1]);
  }

  function candle(body) {
    var a = body.split('|');
    var cs = a[0].split(',').map(function (c) {
      var p = c.trim().split(/\s+/);
      return { o: +p[0], h: +p[1], l: +p[2], c: +p[3], t: p.slice(4).join(' ') };
    });
    var mn = Math.min.apply(null, cs.map(function (c) { return c.l; })), mx = Math.max.apply(null, cs.map(function (c) { return c.h; }));
    var W = 300, H = 190, top = 14, bot = 150, rng = (mx - mn) || 1;
    function Y(v) { return bot - (v - mn) / rng * (bot - top); }
    var step = W / cs.length, bw = Math.min(40, step * 0.5), out = '';
    cs.forEach(function (c, i) {
      var x = step * i + step / 2, up = c.c >= c.o, col = up ? '#12B76A' : '#F04438';
      var y1 = Y(Math.max(c.o, c.c)), y2 = Y(Math.min(c.o, c.c));
      out += '<line x1="' + x + '" x2="' + x + '" y1="' + Y(c.h) + '" y2="' + Y(c.l) + '" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
        '<rect x="' + (x - bw / 2) + '" y="' + y1 + '" width="' + bw + '" height="' + Math.max(4, y2 - y1) + '" rx="4" fill="' + col + '" stroke="' + INK + '" stroke-width="2.5"/>';
      if (c.t) out += '<text x="' + x + '" y="' + (bot + 24) + '" text-anchor="middle" font-size="12.5" font-weight="800" fill="' + INK + '">' + esc(c.t) + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%">' + out + '</svg>' + cap(a[1]);
  }

  function pie(body) {
    var a = body.split('|'), d = pairs(a[0]);
    var tot = d.reduce(function (s, x) { return s + x.v; }, 0), r = 54, C = 2 * Math.PI * r, off = 0, arcs = '', leg = '';
    d.forEach(function (x, i) {
      var len = x.v / tot * C;
      arcs += '<circle cx="80" cy="80" r="' + r + '" fill="none" stroke="' + PAL[i % PAL.length] + '" stroke-width="30" stroke-dasharray="' + len + ' ' + (C - len) + '" stroke-dashoffset="' + (-off) + '" transform="rotate(-90 80 80)"/>';
      off += len;
      leg += '<span><i style="background:' + PAL[i % PAL.length] + '"></i>' + esc(x.k) + ' <b>' + esc(x.t) + '</b></span>';
    });
    return '<div class="v-pie"><svg viewBox="0 0 160 160" width="150" height="150">' + arcs + '<circle cx="80" cy="80" r="69" fill="none" stroke="' + INK + '" stroke-width="2.5"/><circle cx="80" cy="80" r="39" fill="none" stroke="' + INK + '" stroke-width="2.5"/></svg><div>' + leg + '</div></div>' + cap(a[1]);
  }

  function flow(body) {
    var a = body.split('|');
    return '<div class="v-flow">' + a[0].split('>').map(function (s, i) {
      return '<span style="background:' + ['#FFF0B8', '#E4DAFF', '#D9FBE8', '#FFDCE8', '#D8ECFF', '#FFE3CC'][i % 6] + '"><b>' + (i + 1) + '</b>' + esc(s.trim()) + '</span>';
    }).join('') + '</div>' + cap(a[1]);
  }

  function vs(body) {
    var cols = body.split('||').map(function (c, i) {
      var p = c.split('|');
      return '<div style="background:' + (i ? '#FFDCE8' : '#D8ECFF') + '"><b>' + esc(p[0]) + '</b>' +
        (p[1] || '').split(';').map(function (l) { return '<span>' + esc(l.trim()) + '</span>'; }).join('') + '</div>';
    });
    return '<div class="v-vs">' + cols.join('') + '</div>';
  }

  function formula(body) {
    var a = body.split('|');
    return '<div class="v-f">' + esc(a[0]) + (a[1] ? '<em>' + esc(a[1]) + '</em>' : '') + '</div>';
  }

  function keys(body) {
    return '<div class="v-keys">' + body.split(',').map(function (k) {
      var p = k.split('=');
      return '<div>' + p[0].trim().split('+').map(function (x) { return '<kbd>' + esc(x === 'EQ' ? '=' : x === 'PLUS' ? '+' : x) + '</kbd>'; }).join('') + (p[1] ? '<span>' + esc(p[1]) + '</span>' : '') + '</div>';
    }).join('') + '</div>';
  }

  function grid(body) {
    var a = body.split('|'), rows = a[0].split(';');
    var n = Math.max.apply(null, rows.map(function (r) { return r.split(',').length; }));
    var h = '<tr><th></th>';
    for (var i = 0; i < n; i++) h += '<th>' + String.fromCharCode(65 + i) + '</th>';
    h += '</tr>';
    rows.forEach(function (r, ri) {
      h += '<tr><th>' + (ri + 1) + '</th>' + r.split(',').map(function (c) {
        c = c.trim().replace(/;;/g, ',');
        var cls = '';
        if (c.charAt(0) === '*') { cls = 'h'; c = c.slice(1); }
        if (c.slice(0, 2) === '##') c = c.slice(1);            // "##N/A" shows a literal #N/A
        else if (c.charAt(0) === '#') { cls = 'k'; c = c.slice(1); }
        if (c.charAt(0) === '=') cls += ' f';
        return '<td class="' + cls + '">' + esc(c.replace(/~/g, ',')) + '</td>';
      }).join('') + '</tr>';
    });
    return '<table class="v-grid">' + h + '</table>' + cap(a[1]);
  }

  var KIND = { bars: bars, line: line, candle: candle, pie: pie, flow: flow, vs: vs, f: formula, keys: keys, grid: grid };
  window.visual = function (spec) {
    var m = /^([a-z]+):/.exec(spec);
    if (m && KIND[m[1]]) return wrap(KIND[m[1]](spec.slice(m[0].length)));
    return wrap(emoji(spec));
  };
  window.visualKinds = Object.keys(KIND);

  /* Thambi himself — an original mascot. mood: hi | wow | think | sad */
  window.thambi = function (mood) {
    var mouth = { hi: '<path d="M38 62 Q50 74 62 62" fill="#fff" stroke="#1D1147" stroke-width="3" stroke-linejoin="round"/>',
      wow: '<ellipse cx="50" cy="66" rx="8" ry="9" fill="#7A1F3D" stroke="#1D1147" stroke-width="3"/>',
      think: '<path d="M41 66 Q50 62 60 67" fill="none" stroke="#1D1147" stroke-width="3.2" stroke-linecap="round"/>',
      sad: '<path d="M40 69 Q50 61 60 69" fill="none" stroke="#1D1147" stroke-width="3.2" stroke-linecap="round"/>' }[mood || 'hi'];
    var brows = mood === 'think' ? '<path d="M30 37 L42 34 M58 33 L70 37" stroke="#1D1147" stroke-width="3" stroke-linecap="round"/>' :
      mood === 'wow' ? '<path d="M30 33 Q36 28 42 32 M58 32 Q64 28 70 33" fill="none" stroke="#1D1147" stroke-width="3" stroke-linecap="round"/>' : '';
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<path d="M18 100 Q18 80 50 80 Q82 80 82 100Z" fill="#6B3CFF" stroke="#1D1147" stroke-width="3"/>' +
      '<circle cx="17" cy="52" r="7" fill="#C98958" stroke="#1D1147" stroke-width="3"/><circle cx="83" cy="52" r="7" fill="#C98958" stroke="#1D1147" stroke-width="3"/>' +
      '<circle cx="50" cy="50" r="33" fill="#D99A66" stroke="#1D1147" stroke-width="3"/>' +
      '<path d="M19 42 Q18 14 50 13 Q84 14 81 43 Q72 27 58 27 Q47 34 34 28 Q24 30 19 42Z" fill="#1D1147"/>' +
      '<path d="M46 13 Q50 2 60 6" fill="none" stroke="#1D1147" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="37" cy="48" r="6.5" fill="#fff" stroke="#1D1147" stroke-width="2.5"/><circle cx="63" cy="48" r="6.5" fill="#fff" stroke="#1D1147" stroke-width="2.5"/>' +
      '<circle cx="' + (mood === 'think' ? 39 : 38) + '" cy="' + (mood === 'think' ? 46 : 49) + '" r="3" fill="#1D1147"/><circle cx="' + (mood === 'think' ? 65 : 64) + '" cy="' + (mood === 'think' ? 46 : 49) + '" r="3" fill="#1D1147"/>' +
      '<circle cx="28" cy="60" r="5" fill="#FF4F8B" opacity=".45"/><circle cx="72" cy="60" r="5" fill="#FF4F8B" opacity=".45"/>' +
      brows + mouth + '</svg>';
  };
})();
