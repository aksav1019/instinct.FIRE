/* instinct.SIP — hand-drawn illustrations and charts (rough.js).
 * Every drawing works on an "adapter" so the same code paints the live SVG
 * in the app and the canvas image that goes into the PDF report.
 */
(function (root) {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var C = {
    ink: '#1E2554', inkSoft: '#5D6694', faint: '#A3ABCF', grid: '#DCE6FA', paper: '#F3F7FF',
    lilac: '#7B5CFF', lilacWash: '#EEE9FF', lilacMid: '#D9CFFF',
    leaf: '#10A777', leafWash: '#E2F7EE',
    melon: '#FF5A78', melonWash: '#FFE3E9',
    marigold: '#FFB21E', marigoldWash: '#FFF4DA',
    sky: '#3BBEF2', skyWash: '#E3F5FD'
  };
  var reduceMotion = false;
  try { reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function colorsFor(kind) {
    return kind === 'lump'
      ? { accent: C.leaf, accentWash: C.leafWash, gain: C.marigold }
      : { accent: C.lilac, accentWash: C.lilacWash, gain: C.leaf };
  }

  /* ---------- adapters ---------- */
  function svgAdapter(svg) {
    var rc = rough.svg(svg);
    var target = svg;
    return {
      rc: rc, isSvg: true,
      put: function (node, parent) { (parent || target).appendChild(node); return node; },
      group: function (cls, parent) {
        var g = document.createElementNS(NS, 'g');
        if (cls) g.setAttribute('class', cls);
        (parent || target).appendChild(g);
        return g;
      },
      text: function (x, y, str, o, parent) {
        o = o || {};
        var t = document.createElementNS(NS, 'text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('fill', o.color || C.ink);
        t.setAttribute('font-family', o.hand ? 'Caveat, cursive' : 'Baloo, sans-serif');
        t.setAttribute('font-weight', o.weight || (o.hand ? 700 : 600));
        t.setAttribute('font-size', o.size || 14);
        t.setAttribute('text-anchor', o.anchor || 'start');
        if (o.rotate) t.setAttribute('transform', 'rotate(' + o.rotate + ' ' + x + ' ' + y + ')');
        if (o.cls) t.setAttribute('class', o.cls);
        t.textContent = str;
        (parent || target).appendChild(t);
        return t;
      }
    };
  }

  function canvasAdapter(canvas, scale) {
    var rc = rough.canvas(canvas);
    var ctx = canvas.getContext('2d');
    scale = scale || 1;
    return {
      rc: rc, isSvg: false, ctx: ctx,
      put: function () { return null; },
      group: function () { return null; },
      text: function (x, y, str, o) {
        o = o || {};
        ctx.save();
        ctx.fillStyle = o.color || C.ink;
        var fam = o.hand ? 'Caveat' : 'Baloo';
        ctx.font = (o.weight || (o.hand ? 700 : 600)) + ' ' + (o.size || 14) + 'px ' + fam;
        ctx.textAlign = o.anchor === 'middle' ? 'center' : (o.anchor === 'end' ? 'right' : 'left');
        ctx.textBaseline = 'alphabetic';
        if (o.rotate) { ctx.translate(x, y); ctx.rotate(o.rotate * Math.PI / 180); ctx.fillText(str, 0, 0); }
        else ctx.fillText(str, x, y);
        ctx.restore();
      }
    };
  }

  function clear(svg) { while (svg.firstChild) svg.removeChild(svg.firstChild); }

  /** Make every stroke in `el` draw itself; solid fills fade in. */
  function animateDraw(el, opts) {
    opts = opts || {};
    if (reduceMotion || !el) return;
    var dur = opts.dur || 700, delay = opts.delay || 0, stagger = opts.stagger == null ? 35 : opts.stagger;
    var paths = el.querySelectorAll('path');
    var list = [];
    for (var i = 0; i < paths.length; i++) {
      var p = paths[i];
      var stroke = p.getAttribute('stroke');
      var fill = p.getAttribute('fill');
      if (stroke && stroke !== 'none') {
        var len = 0;
        try { len = p.getTotalLength(); } catch (e) {}
        if (!len) continue;
        p.style.transition = 'none';
        p.style.strokeDasharray = len + ' ' + len;
        p.style.strokeDashoffset = len;
        list.push([p, 'stroke']);
      } else if (fill && fill !== 'none') {
        p.style.transition = 'none';
        p.style.opacity = 0;
        list.push([p, 'fill']);
      }
    }
    el.getBoundingClientRect();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        list.forEach(function (it, idx) {
          var d = delay + idx * stagger;
          if (it[1] === 'stroke') {
            it[0].style.transition = 'stroke-dashoffset ' + dur + 'ms cubic-bezier(.4,.1,.3,1) ' + d + 'ms';
            it[0].style.strokeDashoffset = 0;
          } else {
            it[0].style.transition = 'opacity ' + Math.round(dur * 0.8) + 'ms ease ' + (d + dur * 0.3) + 'ms';
            it[0].style.opacity = 1;
          }
        });
      });
    });
  }

  function o(extra) {
    var base = { stroke: C.ink, strokeWidth: 2.2, roughness: 1.3, bowing: 1.2 };
    for (var k in extra) base[k] = extra[k];
    return base;
  }

  /* ---------- small reusable doodles ---------- */
  function coin(A, x, y, d, seed, parent) {
    A.put(A.rc.circle(x, y, d, o({ fill: C.marigold, fillStyle: 'solid', seed: seed, strokeWidth: 2 })), parent);
    A.put(A.rc.circle(x, y, d * 0.7, o({ seed: seed + 1, strokeWidth: 1.4, roughness: 1 })), parent);
    A.text(x, y + d * 0.2, '₹', { size: Math.round(d * 0.5), weight: 800, anchor: 'middle' }, parent);
  }

  function bag(A, x, y, s, seed, parent) {
    // money bag, (x,y) = bottom centre, s = scale
    var p = 'M' + (x - 22 * s) + ' ' + y +
      ' Q' + (x - 30 * s) + ' ' + (y - 34 * s) + ' ' + (x - 7 * s) + ' ' + (y - 48 * s) +
      ' L' + (x - 13 * s) + ' ' + (y - 60 * s) +
      ' Q' + x + ' ' + (y - 65 * s) + ' ' + (x + 13 * s) + ' ' + (y - 60 * s) +
      ' L' + (x + 7 * s) + ' ' + (y - 48 * s) +
      ' Q' + (x + 30 * s) + ' ' + (y - 34 * s) + ' ' + (x + 22 * s) + ' ' + y + ' Z';
    A.put(A.rc.path(p, o({ fill: C.marigoldWash, fillStyle: 'solid', seed: seed })), parent);
    A.put(A.rc.line(x - 9 * s, y - 48 * s, x + 9 * s, y - 48 * s, o({ seed: seed + 1, strokeWidth: 2.6 })), parent);
    A.text(x, y - 12 * s, '₹', { size: Math.round(26 * s), weight: 800, anchor: 'middle', color: C.leaf }, parent);
  }

  function calendar(A, x, y, w, seed, parent) {
    A.put(A.rc.rectangle(x, y, w, w * 0.9, o({ fill: '#fff', fillStyle: 'solid', seed: seed })), parent);
    A.put(A.rc.rectangle(x, y, w, w * 0.24, o({ fill: C.melon, fillStyle: 'solid', seed: seed + 1 })), parent);
    A.put(A.rc.line(x + w * 0.28, y - 6, x + w * 0.28, y + 6, o({ seed: seed + 2, strokeWidth: 3 })), parent);
    A.put(A.rc.line(x + w * 0.72, y - 6, x + w * 0.72, y + 6, o({ seed: seed + 3, strokeWidth: 3 })), parent);
    for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++) {
      A.put(A.rc.circle(x + w * (0.22 + c * 0.28), y + w * (0.45 + r * 0.24), w * 0.1,
        o({ fill: (r === 1 && c === 2) ? C.marigold : C.lilacMid, fillStyle: 'solid', seed: seed + 4 + r * 3 + c, strokeWidth: 1.2 })), parent);
    }
  }

  function hourglass(A, cx, cy, s, seed, parent) {
    A.put(A.rc.line(cx - 18 * s, cy - 28 * s, cx + 18 * s, cy - 28 * s, o({ seed: seed, strokeWidth: 3 })), parent);
    A.put(A.rc.line(cx - 18 * s, cy + 28 * s, cx + 18 * s, cy + 28 * s, o({ seed: seed + 1, strokeWidth: 3 })), parent);
    A.put(A.rc.path('M' + (cx - 14 * s) + ' ' + (cy - 28 * s) + ' Q' + cx + ' ' + cy + ' ' + (cx - 14 * s) + ' ' + (cy + 28 * s) +
      ' M' + (cx + 14 * s) + ' ' + (cy - 28 * s) + ' Q' + cx + ' ' + cy + ' ' + (cx + 14 * s) + ' ' + (cy + 28 * s), o({ seed: seed + 2 })), parent);
    A.put(A.rc.polygon([[cx - 9 * s, cy + 26 * s], [cx + 9 * s, cy + 26 * s], [cx, cy + 10 * s]], o({ fill: C.marigold, fillStyle: 'solid', seed: seed + 3, strokeWidth: 1 })), parent);
    A.put(A.rc.polygon([[cx - 10 * s, cy - 24 * s], [cx + 10 * s, cy - 24 * s], [cx, cy - 8 * s]], o({ fill: C.marigold, fillStyle: 'solid', seed: seed + 4, strokeWidth: 1 })), parent);
  }

  /* ---------- scenes (viewBox 320 × 150) ---------- */
  function sceneSipGrow(A) {
    var g = A.group('draw');
    A.put(A.rc.line(14, 140, 306, 140, o({ seed: 3, roughness: 1.8 })), g);
    // piggy bank
    A.put(A.rc.path('M60 98 c-16 -2 -18 -16 -8 -18 c8 -1 8 10 -2 12', o({ seed: 9, strokeWidth: 2 })), g);
    A.put(A.rc.rectangle(86, 120, 15, 18, o({ fill: C.lilacMid, fillStyle: 'solid', seed: 10 })), g);
    A.put(A.rc.rectangle(136, 120, 15, 18, o({ fill: C.lilacMid, fillStyle: 'solid', seed: 11 })), g);
    A.put(A.rc.ellipse(120, 98, 128, 80, o({ fill: C.lilacWash, fillStyle: 'solid', seed: 5, strokeWidth: 2.6 })), g);
    A.put(A.rc.polygon([[98, 66], [110, 44], [122, 63]], o({ fill: C.lilacMid, fillStyle: 'solid', seed: 7 })), g);
    A.put(A.rc.ellipse(184, 98, 24, 30, o({ fill: C.lilacMid, fillStyle: 'solid', seed: 6 })), g);
    A.put(A.rc.circle(180, 94, 3.5, o({ fill: C.ink, fillStyle: 'solid', seed: 12, strokeWidth: 1 })), g);
    A.put(A.rc.circle(188, 101, 3.5, o({ fill: C.ink, fillStyle: 'solid', seed: 13, strokeWidth: 1 })), g);
    A.put(A.rc.circle(156, 84, 7, o({ fill: C.ink, fillStyle: 'solid', seed: 14, strokeWidth: 1 })), g);
    A.put(A.rc.path('M140 112 q10 6 20 0', o({ seed: 15, strokeWidth: 1.6 })), g);
    A.put(A.rc.line(106, 64, 134, 64, o({ seed: 8, strokeWidth: 3.4 })), g);
    // growing coin stacks
    for (var i = 0; i < 4; i++) {
      var x = 226 + i * 24;
      for (var k = 0; k <= i * 2 + 1; k++) {
        A.put(A.rc.ellipse(x, 135 - k * 7, 22, 9, o({ fill: C.marigold, fillStyle: 'solid', seed: 30 + i * 10 + k, strokeWidth: 1.6, roughness: 0.9 })), g);
      }
    }
    A.put(A.rc.path('M212 70 Q 246 40 294 22', o({ seed: 20, stroke: C.melon, strokeWidth: 2.6 })), g);
    A.put(A.rc.path('M282 18 L296 21 L289 33', o({ seed: 21, stroke: C.melon, strokeWidth: 2.6 })), g);
    // the falling coin — drops into the slot every couple of seconds
    var drop = A.group('drop');
    coin(A, 120, 34, 24, 40, drop);
    animateDraw(g, { dur: 650, stagger: 25 });
  }

  function sceneLumpGrow(A) {
    var g = A.group('draw');
    A.put(A.rc.line(14, 140, 306, 140, o({ seed: 3, roughness: 1.8 })), g);
    bag(A, 52, 138, 1, 50, g);
    A.put(A.rc.path('M80 102 Q 112 70 142 96', o({ seed: 51, strokeLineDash: [6, 6], strokeWidth: 2 })), g);
    A.put(A.rc.path('M132 86 L143 97 L129 101', o({ seed: 52, strokeWidth: 2 })), g);
    // pot and tree
    A.put(A.rc.path('M178 116 C 176 92 182 80 178 58 M179 88 C 190 80 196 76 204 70 M178 78 C 168 72 162 70 156 64', o({ seed: 53, strokeWidth: 3.4 })), g);
    A.put(A.rc.circle(160, 56, 48, o({ fill: C.leaf, fillStyle: 'hachure', hachureGap: 5, seed: 54 })), g);
    A.put(A.rc.circle(200, 52, 54, o({ fill: C.leaf, fillStyle: 'hachure', hachureGap: 5, seed: 55 })), g);
    A.put(A.rc.circle(180, 30, 48, o({ fill: C.leaf, fillStyle: 'hachure', hachureGap: 5, seed: 56 })), g);
    A.put(A.rc.polygon([[150, 114], [208, 114], [199, 140], [159, 140]], o({ fill: C.melonWash, fillStyle: 'solid', seed: 57 })), g);
    A.put(A.rc.rectangle(146, 108, 66, 9, o({ fill: C.melon, fillStyle: 'solid', seed: 58 })), g);
    // sun
    A.put(A.rc.circle(276, 34, 28, o({ fill: C.marigold, fillStyle: 'solid', seed: 59 })), g);
    for (var r = 0; r < 8; r++) {
      var a = r * Math.PI / 4;
      A.put(A.rc.line(276 + Math.cos(a) * 20, 34 + Math.sin(a) * 20, 276 + Math.cos(a) * 28, 34 + Math.sin(a) * 28, o({ seed: 60 + r, strokeWidth: 1.8 })), g);
    }
    A.text(232, 98, 'plant once,', { hand: true, size: 19, color: C.inkSoft }, g);
    A.text(232, 118, 'let it grow', { hand: true, size: 19, color: C.inkSoft }, g);
    // coin fruits pop in
    var fruits = [[150, 50], [206, 42], [184, 22], [196, 66], [166, 70]];
    fruits.forEach(function (f, i) {
      var fg = A.group('fruit');
      fg.style.animationDelay = (900 + i * 160) + 'ms';
      A.put(A.rc.circle(f[0], f[1], 13, o({ fill: C.marigold, fillStyle: 'solid', seed: 70 + i, strokeWidth: 1.6 })), fg);
    });
    animateDraw(g, { dur: 650, stagger: 30 });
  }

  function sceneGoal(A, kind) {
    var g = A.group('draw');
    A.put(A.rc.line(14, 140, 306, 140, o({ seed: 3, roughness: 1.8 })), g);
    A.put(A.rc.polygon([[24, 140], [152, 40], [206, 92], [238, 72], [300, 140]], o({ fill: C.sky, fillStyle: 'hachure', hachureGap: 7, hachureAngle: 60, seed: 80 })), g);
    A.put(A.rc.polygon([[132, 56], [152, 40], [170, 54], [160, 52], [152, 60], [142, 52]], o({ fill: '#fff', fillStyle: 'solid', seed: 81, strokeWidth: 1.6 })), g);
    A.put(A.rc.line(152, 40, 152, 6, o({ seed: 82, strokeWidth: 2.6 })), g);
    A.put(A.rc.polygon([[152, 6], [186, 13], [152, 22]], o({ fill: C.melon, fillStyle: 'solid', seed: 83 })), g);
    A.text(192, 22, 'your goal', { hand: true, size: 21, color: C.melon }, g);
    if (kind === 'sip') {
      var p = 'M34 138';
      var x = 34, y = 138;
      for (var s = 0; s < 8; s++) { x += 13; p += ' L' + x + ' ' + y; y -= 11; p += ' L' + x + ' ' + y; }
      A.put(A.rc.path(p, o({ seed: 84, stroke: C.marigold, strokeWidth: 3.6, roughness: 0.8 })), g);
      A.text(14, 64, 'step by step,', { hand: true, size: 19, color: C.inkSoft }, g);
      A.text(14, 84, 'every month', { hand: true, size: 19, color: C.inkSoft }, g);
    } else {
      A.put(A.rc.path('M42 128 Q 64 -6 144 34', o({ seed: 85, stroke: C.marigold, strokeWidth: 3, strokeLineDash: [8, 7] })), g);
      A.put(A.rc.path('M132 24 L146 35 L131 42', o({ seed: 86, stroke: C.marigold, strokeWidth: 3 })), g);
      bag(A, 42, 140, 0.55, 87, g);
      A.text(6, 46, 'one big leap', { hand: true, size: 19, color: C.inkSoft }, g);
    }
    var fg = A.group('float');
    coin(A, 262, 50, 26, 90, fg);
    animateDraw(g, { dur: 700, stagger: 40 });
  }

  function drawScene(A, kind, mode) {
    if (mode === 'goal') sceneGoal(A, kind);
    else if (kind === 'sip') sceneSipGrow(A);
    else sceneLumpGrow(A);
  }
  function scene(svg, kind, mode) {
    clear(svg);
    drawScene(svgAdapter(svg), kind, mode);
  }

  /* ---------- brand / splash / misc ---------- */
  function brandCoin(svg) {
    clear(svg);
    var A = svgAdapter(svg);
    A.put(A.rc.path('M22 9 C 20 4 24 2 26 1 M22 9 C 18 6 14 6 12 8', o({ seed: 2, stroke: C.leaf, strokeWidth: 2.4 })));
    coin(A, 22, 26, 32, 4);
  }

  function splash(svg) {
    clear(svg);
    var A = svgAdapter(svg);
    var g = A.group('draw');
    A.put(A.rc.line(30, 186, 210, 186, o({ seed: 1, roughness: 2 })), g);
    // jar
    A.put(A.rc.path('M70 82 L70 176 Q70 186 82 186 L158 186 Q170 186 170 176 L170 82', o({ fill: C.skyWash, fillStyle: 'solid', seed: 2, strokeWidth: 2.6 })), g);
    A.put(A.rc.rectangle(62, 70, 116, 14, o({ fill: C.lilac, fillStyle: 'solid', seed: 3 })), g);
    // coins inside
    var cs = [[96, 170], [128, 172], [150, 166], [110, 150], [140, 146], [124, 126]];
    cs.forEach(function (c, i) { coin(A, c[0], c[1], 26, 10 + i * 3, g); });
    // sprout
    A.put(A.rc.path('M120 70 C 118 50 122 36 120 22', o({ seed: 30, stroke: C.leaf, strokeWidth: 3.2 })), g);
    A.put(A.rc.path('M120 40 C 100 26 86 34 84 40 C 98 50 112 48 120 40 Z', o({ seed: 31, fill: C.leaf, fillStyle: 'solid', stroke: C.leaf })), g);
    A.put(A.rc.path('M121 28 C 138 10 154 16 158 22 C 146 36 130 36 121 28 Z', o({ seed: 32, fill: C.leaf, fillStyle: 'solid', stroke: C.leaf })), g);
    // sparkles
    [[44, 60], [196, 52], [200, 120]].forEach(function (s, i) {
      A.put(A.rc.path('M' + s[0] + ' ' + (s[1] - 8) + ' L' + s[0] + ' ' + (s[1] + 8) + ' M' + (s[0] - 8) + ' ' + s[1] + ' L' + (s[0] + 8) + ' ' + s[1],
        o({ seed: 40 + i, stroke: C.marigold, strokeWidth: 2.6 })), g);
    });
    animateDraw(g, { dur: 600, stagger: 22 });
  }

  function altDoodle(svg, alt, kind) {
    clear(svg);
    var A = svgAdapter(svg);
    var g = A.group('draw');
    if (alt.type === 'patience') hourglass(A, 35, 35, 1, 100, g);
    else if (alt.kind === 'lump') bag(A, 35, 64, 0.95, 110, g);
    else calendar(A, 8, 14, 54, 120, g);
    animateDraw(g, { dur: 600, stagger: 30, delay: 150 });
  }

  /** Pill behind the selected SIP/Lumpsum tab. */
  function kindInk(svg, kind) {
    clear(svg);
    var w = svg.clientWidth || 160, h = svg.clientHeight || 52;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var A = svgAdapter(svg);
    A.put(A.rc.rectangle(2, 2, w - 4, h - 4, o({ fill: colorsFor(kind).accent, fillStyle: 'solid', seed: 4, roughness: 1.1, strokeWidth: 2 })));
  }

  /** Marker highlight under the big number. */
  function marker(svg, widthPx, kind, mode) {
    clear(svg);
    var w = svg.clientWidth || 300;
    svg.setAttribute('viewBox', '0 0 ' + w + ' 40');
    var A = svgAdapter(svg);
    var half = Math.min(widthPx, w - 20) / 2 + 10;
    var col = mode === 'goal' ? C.marigold : colorsFor(kind).gain;
    var g = A.group('draw');
    A.put(A.rc.line(w / 2 - half, 28, w / 2 + half, 24, { stroke: col, strokeWidth: 14, roughness: 1.2, seed: 6, bowing: 2 }), g);
    g.style.opacity = 0.35;
    animateDraw(g, { dur: 500, stagger: 0 });
  }

  /* ---------- charts (shared by app + PDF) ---------- */
  function drawDonut(A, cx, cy, d, invested, gains, kind, opts) {
    opts = opts || {};
    var col = colorsFor(kind);
    var total = Math.max(invested + gains, 1);
    var start = -Math.PI / 2;
    var mid = start + 2 * Math.PI * Math.max(Math.min(invested / total, 0.9995), 0.0005);
    var end = start + 2 * Math.PI;
    var sw = opts.strokeWidth || 2;
    var parts = [];
    parts.push(A.put(A.rc.arc(cx, cy, d, d, start, mid, true, o({ fill: col.accent, fillStyle: 'solid', seed: 3, strokeWidth: sw }))));
    if (gains > 0.5) {
      parts.push(A.put(A.rc.arc(cx, cy, d, d, mid, end, true, o({ fill: col.gain, fillStyle: opts.fillStyle || 'hachure', hachureGap: opts.hachureGap || 4, fillWeight: opts.fillWeight || 1.6, seed: 4, strokeWidth: sw }))));
    }
    A.put(A.rc.circle(cx, cy, d * 0.6, o({ fill: '#fff', fillStyle: 'solid', seed: 5, strokeWidth: sw })));
    var mult = invested > 0 ? (invested + gains) / invested : 0;
    A.text(cx, cy + d * 0.03, mult ? mult.toFixed(mult >= 10 ? 0 : 1) + '×' : '–', { size: Math.round(d * 0.17), weight: 800, anchor: 'middle' });
    A.text(cx, cy + d * 0.15, 'growth', { hand: true, size: Math.round(d * 0.095), color: C.inkSoft, anchor: 'middle' });
    return parts;
  }

  function donut(svg, invested, gains, kind) {
    clear(svg);
    var A = svgAdapter(svg);
    var g = A.group('draw');
    // draw into group so it animates
    var A2 = {
      rc: A.rc, isSvg: true,
      put: function (n) { g.appendChild(n); return n; },
      group: A.group,
      text: function (x, y, s, oo) { return A.text(x, y, s, oo, g); }
    };
    drawDonut(A2, 85, 85, 150, invested, gains, kind);
    animateDraw(g, { dur: 800, stagger: 60 });
  }

  /** Pick a tidy axis: step from 1/2/2.5/5 × 10^k, ~4 gridlines. */
  function niceAxis(maxV) {
    if (maxV <= 0) return { top: 1, step: 0.25 };
    var raw = maxV / 4;
    var p = Math.pow(10, Math.floor(Math.log10(raw)));
    var steps = [1, 2, 2.5, 5, 10];
    var step = p;
    for (var i = 0; i < steps.length; i++) { if (steps[i] * p >= raw) { step = steps[i] * p; break; } }
    var top = Math.ceil(maxV * 1.04 / step) * step;
    return { top: top, step: step };
  }

  /**
   * Year-by-year stacked bars. rows: [{year, invested, value}]
   * Returns the bar groups (SVG only) so the app can animate them.
   */
  function drawGrowth(A, W, H, rows, kind, fmtShort, opts) {
    opts = opts || {};
    var col = colorsFor(kind);
    var k = opts.k || 1;                 // scale for canvas rendering
    var padL = 46 * k, padR = 14 * k, padT = 30 * k, padB = 28 * k;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var n = rows.length;
    var maxV = 0;
    rows.forEach(function (r) { if (r.value > maxV) maxV = r.value; });
    var axis = niceAxis(maxV);
    var top = axis.top;
    var baseY = padT + plotH;
    var y = function (v) { return baseY - (v / top) * plotH; };

    // grid + labels
    var ticks = Math.round(top / axis.step);
    for (var t = 0; t <= ticks; t++) {
      var v = axis.step * t;
      var yy = y(v);
      if (t > 0) A.put(A.rc.line(padL, yy, W - padR, yy, { stroke: C.grid, strokeWidth: 1.2 * k, roughness: 0.6, seed: 200 + t, strokeLineDash: [4 * k, 5 * k] }));
      A.text(padL - 6 * k, yy + 4 * k, t === 0 ? '0' : fmtShort(v).replace('₹', ''), { size: 11 * k, color: C.inkSoft, anchor: 'end', weight: 600 });
    }
    A.put(A.rc.line(padL, baseY, W - padR, baseY, o({ seed: 210, strokeWidth: 2 * k })));
    A.put(A.rc.line(padL, baseY, padL, padT - 6 * k, o({ seed: 211, strokeWidth: 2 * k })));

    var slot = plotW / n;
    var bw = Math.max(Math.min(slot * 0.66, 26 * k), 2 * k);
    var light = n > 22;                   // keep it fast with many bars
    var groups = [];
    var labelStep = Math.ceil(n / 8);
    rows.forEach(function (r, i) {
      var x = padL + slot * i + (slot - bw) / 2;
      var g = A.group('bar');
      if (g) g.style.animationDelay = Math.round(i * Math.min(40, 700 / n)) + 'ms';
      var hInv = baseY - y(r.invested);
      var hVal = baseY - y(r.value);
      var sw = (light ? 1.2 : 1.8) * k;
      if (hInv > 0.5) A.put(A.rc.rectangle(x, baseY - hInv, bw, hInv, {
        fill: col.accent, fillStyle: 'solid', stroke: C.ink, strokeWidth: sw, roughness: light ? 0.5 : 0.9, seed: 300 + i
      }), g);
      if (hVal - hInv > 0.5) A.put(A.rc.rectangle(x, baseY - hVal, bw, hVal - hInv, {
        fill: col.gain, fillStyle: light ? 'solid' : 'hachure', hachureGap: 3 * k, fillWeight: 1.4 * k,
        stroke: C.ink, strokeWidth: sw, roughness: light ? 0.5 : 0.9, seed: 400 + i
      }), g);
      if ((i + 1) % labelStep === 0 || i === n - 1 || i === 0) {
        A.text(x + bw / 2, baseY + 17 * k, String(r.year), { size: 11 * k, color: C.inkSoft, anchor: 'middle' });
      }
      if (g) groups.push(g);
    });
    A.text(W - padR, H - 1 * k, 'years', { hand: true, size: 15 * k, color: C.inkSoft, anchor: 'end' });

    // handwritten call-out on the last bar
    var last = rows[n - 1];
    var lx = padL + slot * (n - 1) + slot / 2;
    var ly = y(last.value);
    var tx = Math.max(padL + 70 * k, lx - 70 * k);
    var ty = Math.max(padT - 6 * k, ly - 8 * k);
    var callout = A.group('callout');
    if (tx + 10 * k < lx) {
      A.put(A.rc.path('M' + (tx + 6 * k) + ' ' + (ty + 4 * k) + ' Q ' + (lx - 14 * k) + ' ' + (ty - 2 * k) + ' ' + (lx - 4 * k) + ' ' + (ly - 4 * k),
        o({ seed: 500, strokeWidth: 1.6 * k, stroke: C.melon })), callout);
    }
    A.text(tx, ty, fmtShort(last.value), { size: 15 * k, weight: 800, color: C.melon, anchor: 'end' }, callout);
    return groups;
  }

  function growth(svg, rows, kind, fmtShort, animate) {
    clear(svg);
    var W = svg.clientWidth || 320, H = svg.clientHeight || 230;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var A = svgAdapter(svg);
    var groups = drawGrowth(A, W, H, rows, kind, fmtShort);
    if (animate && !reduceMotion) groups.forEach(function (g) { g.classList.add('grow'); });
  }

  root.Doodles = {
    C: C, colorsFor: colorsFor, svgAdapter: svgAdapter, canvasAdapter: canvasAdapter,
    scene: scene, drawScene: drawScene, brandCoin: brandCoin, splash: splash, altDoodle: altDoodle,
    kindInk: kindInk, marker: marker, donut: donut, growth: growth,
    drawDonut: drawDonut, drawGrowth: drawGrowth, coin: coin, bag: bag, calendar: calendar,
    hourglass: hourglass, animateDraw: animateDraw, reduceMotion: reduceMotion
  };
})(this);
