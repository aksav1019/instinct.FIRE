/* instinct.SIP — app controller */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var body = document.body;
  var Bridge = window.AndroidBridge || null;

  /* ---------- state ---------- */
  var RANGES = {
    sip_grow:  { min: 500,    max: 5e5, def: 10000,  label: 'Monthly investment' },
    sip_goal:  { min: 1e5,    max: 5e8, def: 1e7,    label: 'Target corpus' },
    lump_grow: { min: 10000,  max: 1e8, def: 500000, label: 'One-time investment' },
    lump_goal: { min: 1e5,    max: 5e8, def: 1e7,    label: 'Target corpus' }
  };
  var LIMITS = { amountMax: 1e11, rateMin: 0, rateMax: 50, yearsMin: 1, yearsMax: 50 };

  var state = { kind: 'sip', mode: 'grow', amounts: {}, rate: 12, years: 10 };
  Object.keys(RANGES).forEach(function (k) { state.amounts[k] = RANGES[k].def; });

  function store(key, val) { try { localStorage.setItem('isip.' + key, JSON.stringify(val)); } catch (e) {} }
  function load(key) { try { var v = localStorage.getItem('isip.' + key); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  var saved = load('state');
  if (saved && saved.amounts) {
    state.kind = saved.kind === 'lump' ? 'lump' : 'sip';
    state.mode = saved.mode === 'goal' ? 'goal' : 'grow';
    Object.keys(RANGES).forEach(function (k) { if (saved.amounts[k] > 0) state.amounts[k] = saved.amounts[k]; });
    if (saved.rate >= 0 && saved.rate <= 50) state.rate = saved.rate;
    if (saved.years >= 1 && saved.years <= 50) state.years = saved.years;
  }
  function key() { return state.kind + '_' + state.mode; }

  /* ---------- elements ---------- */
  var amountInput = $('amountInput'), amountRange = $('amountRange'), amountWords = $('amountWords');
  var rateInput = $('rateInput'), rateRange = $('rateRange');
  var yearsInput = $('yearsInput'), yearsRange = $('yearsRange');
  var errorEl = $('fieldError');

  /* ---------- log slider for money ---------- */
  function niceStep(v) {
    if (v < 1e4) return 100;
    if (v < 1e5) return 500;
    if (v < 1e6) return 1000;
    if (v < 1e7) return 10000;
    if (v < 1e8) return 100000;
    return 1000000;
  }
  function posToAmount(pos) {
    var R = RANGES[key()];
    var v = R.min * Math.pow(R.max / R.min, pos / 1000);
    var s = niceStep(v);
    return Math.min(R.max, Math.max(R.min, Math.round(v / s) * s));
  }
  function amountToPos(v) {
    var R = RANGES[key()];
    var p = Math.log(Math.max(v, R.min) / R.min) / Math.log(R.max / R.min) * 1000;
    return Math.max(0, Math.min(1000, p));
  }
  function paintRange(el) {
    var min = +el.min, max = +el.max, v = +el.value;
    el.style.setProperty('--fill', ((v - min) / (max - min) * 100) + '%');
  }

  /* ---------- parsing ---------- */
  function parseMoney(s) { var d = String(s).replace(/[^\d]/g, ''); return d ? +d : NaN; }
  function parseNum(s) { var d = String(s).replace(/[^\d.]/g, ''); return d && !isNaN(+d) ? +d : NaN; }

  function validate() {
    var a = state.amounts[key()];
    if (!(a > 0)) return 'Enter an amount above ₹0.';
    if (a > LIMITS.amountMax) return 'Amount is too large. Keep it under ₹1,000 crore.';
    if (!(state.rate >= LIMITS.rateMin && state.rate <= LIMITS.rateMax)) return 'Return should be between 0% and 50% a year.';
    if (!(state.years >= LIMITS.yearsMin && state.years <= LIMITS.yearsMax && Math.round(state.years) === state.years)) return 'Time period should be a whole number from 1 to 50 years.';
    return '';
  }

  /* ---------- number tween ---------- */
  var tweens = {};
  function tweenMoney(el, to, dur) {
    var from = +(el.dataset.v || 0);
    el.dataset.v = to;
    if (tweens[el.id]) cancelAnimationFrame(tweens[el.id]);
    if (Doodles.reduceMotion || !isFinite(from) || from === to) { el.textContent = Calc.rupees(to); return; }
    var t0 = performance.now();
    dur = dur || 420;
    var step = function (t) {
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Calc.rupees(from + (to - from) * e);
      if (p < 1) tweens[el.id] = requestAnimationFrame(step);
    };
    tweens[el.id] = requestAnimationFrame(step);
  }

  /* ---------- render ---------- */
  var current = null;
  var settleTimer = null;

  function syncInputs(skip) {
    var a = state.amounts[key()];
    $('amountLabel').textContent = RANGES[key()].label;
    if (skip !== 'amount') amountInput.value = Calc.groupIN(a);
    amountInput.style.width = Math.min(14, Math.max(6, amountInput.value.length + 1)) + 'ch';
    if (skip !== 'amountRange') amountRange.value = amountToPos(a);
    amountWords.textContent = a > 0 ? Calc.words(a) + (state.mode === 'goal' ? ' to build up' : (state.kind === 'sip' ? ' every month' : ' invested once')) : '';
    if (skip !== 'rate') rateInput.value = state.rate;
    if (skip !== 'rateRange') rateRange.value = Math.min(30, Math.max(1, state.rate));
    if (skip !== 'years') yearsInput.value = state.years;
    if (skip !== 'yearsRange') yearsRange.value = Math.min(40, Math.max(1, state.years));
    [amountRange, rateRange, yearsRange].forEach(paintRange);
    var presets = document.querySelectorAll('.presets button');
    for (var i = 0; i < presets.length; i++) presets[i].classList.toggle('on', +presets[i].dataset.rate === state.rate);
  }

  function render(opts) {
    opts = opts || {};
    var err = validate();
    errorEl.textContent = err;
    $('answer').style.opacity = err ? 0.45 : 1;
    if (err) return;
    var r = Calc.compute(state.kind, state.mode, state.amounts[key()], state.rate, state.years);
    current = r;
    var d = Calc.describe(r);

    $('answerQ').textContent = d.question;
    var big = $('answerBig');
    tweenMoney(big, Math.round(d.big), opts.instant ? 1 : 420);
    if (opts.pop) { big.classList.remove('pop'); void big.offsetWidth; big.classList.add('pop'); }
    $('answerSub').textContent = d.sub;
    tweenMoney($('lgInvested'), Math.round(r.invested));
    tweenMoney($('lgGains'), Math.round(r.gains));
    tweenMoney($('lgTotal'), Math.round(r.value));
    $('multipleLine').textContent = d.multipleHand;
    $('storyLine').textContent = d.story;

    $('altTitle').textContent = d.altTitle;
    var ab = $('altBody');
    ab.textContent = '';
    ab.appendChild(document.createTextNode(d.altBody[0]));
    var b = document.createElement('b'); b.textContent = d.altBody[1]; ab.appendChild(b);
    ab.appendChild(document.createTextNode(d.altBody[2]));

    var tb = $('yearTable').tBodies[0];
    var html = '';
    r.schedule.forEach(function (row) {
      html += '<tr><td>' + row.year + '</td><td>' + Calc.rupees(row.invested) + '</td><td>' + Calc.rupees(row.value) + '</td></tr>';
    });
    tb.innerHTML = html;

    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () { drawCharts(r, opts.animate !== false); }, opts.immediate ? 0 : 160);
    store('state', state);
  }

  function drawCharts(r, animate) {
    Doodles.donut($('donut'), r.invested, r.gains, r.kind);
    Doodles.growth($('growthChart'), r.schedule, r.kind, Calc.short, animate);
    Doodles.altDoodle($('altDoodle'), r.alt, r.kind);
    // marker sized to the final big number
    var big = $('answerBig');
    var span = document.createElement('span');
    var cs = getComputedStyle(big);
    span.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-family:' + cs.fontFamily +
      ';font-size:' + cs.fontSize + ';font-weight:' + cs.fontWeight + ';letter-spacing:' + cs.letterSpacing;
    span.textContent = Calc.rupees(+big.dataset.v);
    document.body.appendChild(span);
    var w = span.getBoundingClientRect().width;
    span.remove();
    var mk = $('answerMarker');
    mk.style.top = (big.offsetTop + big.offsetHeight * 0.8 - 26) + 'px';
    Doodles.marker(mk, w, r.kind, r.mode);
  }

  function setKind(kind) {
    if (state.kind === kind) return;
    state.kind = kind;
    body.dataset.kind = kind;
    document.querySelectorAll('.kind-tab').forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.kind === kind)); });
    Doodles.kindInk($('kindInk'), kind);
    Doodles.scene($('scene'), state.kind, state.mode);
    syncInputs();
    render({ pop: true, immediate: true });
  }

  function setMode(mode) {
    if (state.mode === mode) return;
    state.mode = mode;
    body.dataset.mode = mode;
    document.querySelectorAll('.ask-chip').forEach(function (c) { c.setAttribute('aria-checked', String(c.dataset.mode === mode)); });
    Doodles.scene($('scene'), state.kind, state.mode);
    syncInputs();
    render({ pop: true, immediate: true });
  }

  /* ---------- wire inputs ---------- */
  document.querySelectorAll('.kind-tab').forEach(function (t) { t.addEventListener('click', function () { setKind(t.dataset.kind); }); });
  document.querySelectorAll('.ask-chip').forEach(function (c) { c.addEventListener('click', function () { setMode(c.dataset.mode); }); });

  amountRange.addEventListener('input', function () {
    state.amounts[key()] = posToAmount(+amountRange.value);
    syncInputs('amountRange'); render();
  });
  amountInput.addEventListener('input', function () {
    var v = parseMoney(amountInput.value);
    state.amounts[key()] = isNaN(v) ? 0 : v;
    syncInputs('amount'); render();
  });
  amountInput.addEventListener('blur', function () { syncInputs(); });
  amountInput.addEventListener('focus', function () { setTimeout(function () { amountInput.select(); }, 30); });

  rateRange.addEventListener('input', function () { state.rate = +rateRange.value; syncInputs('rateRange'); render(); });
  rateInput.addEventListener('input', function () {
    var v = parseNum(rateInput.value);
    state.rate = isNaN(v) ? -1 : Math.round(v * 100) / 100;
    syncInputs('rate'); render();
  });
  rateInput.addEventListener('blur', function () { if (state.rate < 0) { state.rate = 12; render(); } syncInputs(); });
  rateInput.addEventListener('focus', function () { setTimeout(function () { rateInput.select(); }, 30); });

  yearsRange.addEventListener('input', function () { state.years = +yearsRange.value; syncInputs('yearsRange'); render(); });
  yearsInput.addEventListener('input', function () {
    var v = parseMoney(yearsInput.value);
    state.years = isNaN(v) ? 0 : v;
    syncInputs('years'); render();
  });
  yearsInput.addEventListener('blur', function () { if (!(state.years >= 1)) { state.years = 10; render(); } syncInputs(); });
  yearsInput.addEventListener('focus', function () { setTimeout(function () { yearsInput.select(); }, 30); });

  document.querySelectorAll('.presets button').forEach(function (b) {
    b.addEventListener('click', function () { state.rate = +b.dataset.rate; syncInputs(); render({ pop: true }); });
  });
  [amountInput, rateInput, yearsInput].forEach(function (inp) {
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') inp.blur(); });
  });

  /* ---------- sheets ---------- */
  var openSheet = null;
  function showSheet(id) { var el = $(id); el.hidden = false; openSheet = el; }
  function hideSheet() { if (openSheet) { openSheet.hidden = true; openSheet = null; } }
  ['reportOverlay', 'howOverlay'].forEach(function (id) {
    $(id).addEventListener('click', function (e) { if (e.target.id === id) hideSheet(); });
  });
  $('closeReport').addEventListener('click', hideSheet);
  $('closeHow').addEventListener('click', hideSheet);
  $('howBtn').addEventListener('click', function () { showSheet('howOverlay'); });
  // Android back button
  window.handleBack = function () {
    if (openSheet) { hideSheet(); return true; }
    return false;
  };

  $('reportBtn').addEventListener('click', function () {
    var err = validate();
    if (err) { toast(err); return; }
    var d = Calc.describe(current);
    $('reportSummary').textContent = d.title + ': ' + d.question.toLowerCase() + ' ' + Calc.rupees(d.big) + '.';
    $('preparedBy').value = load('preparedBy') || '';
    $('contactLine').value = load('contact') || '';
    showSheet('reportOverlay');
  });

  function reportInfo() {
    var info = {
      client: $('clientName').value.trim(),
      preparedBy: $('preparedBy').value.trim(),
      contact: $('contactLine').value.trim(),
      note: $('clientNote').value.trim()
    };
    store('preparedBy', info.preparedBy);
    store('contact', info.contact);
    return info;
  }

  var busy = false;
  function makePdf(action) {
    if (busy) return;
    var err = validate();
    if (err) { toast(err); return; }
    busy = true;
    var btns = document.querySelectorAll('.sheet-actions button');
    btns.forEach(function (b) { b.disabled = true; });
    var shareBtn = $('sharePdf');
    var label = shareBtn.lastChild.textContent;
    shareBtn.lastChild.textContent = ' Making your PDF…';
    var fontsReady = (document.fonts && document.fonts.load)
      ? Promise.all([document.fonts.load('700 20px Caveat'), document.fonts.load('600 14px Baloo'), document.fonts.load('800 14px Baloo')])
      : Promise.resolve();
    fontsReady.catch(function () {}).then(function () {
      return new Promise(function (res) { setTimeout(res, 30); });
    }).then(function () {
      var out = Report.build(current, reportInfo());
      deliver(out, action, shareBtn);
    }).catch(function (e) {
      toast('Could not make the PDF: ' + (e && e.message ? e.message : e));
    }).then(function () {
      busy = false;
      btns.forEach(function (b) { b.disabled = false; });
      shareBtn.lastChild.textContent = label;
    });
  }

  function deliver(out, action, fromEl) {
    var doc = out.doc, name = out.fileName;
    if (Bridge) {
      var b64 = doc.output('datauristring').split('base64,')[1];
      var msg = '';
      if (action === 'share') msg = (Bridge.sharePdfWithText ? Bridge.sharePdfWithText(b64, name, shareText()) : Bridge.sharePdf(b64, name));
      else if (action === 'save') msg = Bridge.savePdf(b64, name);
      else msg = Bridge.openPdf(b64, name);
      if (msg && msg.indexOf('Error') === 0) { toast(msg); return; }
      if (action === 'save') { toast(msg || 'Saved to Downloads'); confetti(fromEl); }
      if (action === 'share') confetti(fromEl);
      return;
    }
    // Browser fallback
    var blob = doc.output('blob');
    if (action === 'share') {
      var file;
      try { file = new File([blob], name, { type: 'application/pdf' }); } catch (e) {}
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: name, text: shareText() }).catch(function () {});
        confetti(fromEl);
        return;
      }
    }
    if (action === 'open') { window.open(URL.createObjectURL(blob), '_blank'); return; }
    doc.save(name);
    toast('PDF downloaded');
    confetti(fromEl);
  }

  function shareText() {
    var who = $('clientName').value.trim();
    return (who ? 'Hi ' + who + ', p' : 'P') + 'lease find your investment plan attached.\n\n' + Report.DISCLAIMER;
  }

  $('sharePdf').addEventListener('click', function () { makePdf('share'); });
  $('savePdf').addEventListener('click', function () { makePdf('save'); });
  $('openPdf').addEventListener('click', function () { makePdf('open'); });

  /* ---------- toast + confetti ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2800);
  }
  window.showToast = toast;

  function confetti(fromEl) {
    if (Doodles.reduceMotion || !document.body.animate) return;
    var rect = fromEl ? fromEl.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight - 80, width: 0 };
    var cx = rect.left + rect.width / 2, cy = rect.top;
    var cols = ['#7B5CFF', '#10A777', '#FF5A78', '#FFB21E', '#3BBEF2'];
    for (var i = 0; i < 34; i++) {
      var bit = document.createElement('i');
      bit.className = 'bit';
      bit.style.background = cols[i % cols.length];
      bit.style.left = cx + 'px'; bit.style.top = cy + 'px';
      if (i % 3 === 0) bit.style.borderRadius = '50%';
      document.body.appendChild(bit);
      var ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      var dist = 140 + Math.random() * 200;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
      var rot = (Math.random() * 720 - 360) | 0;
      var a = bit.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rot / 2 + 'deg)', opacity: 1, offset: 0.45 },
        { transform: 'translate(' + dx * 1.25 + 'px,' + (dy + 380) + 'px) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 1500 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.4,1)' });
      a.onfinish = (function (el) { return function () { el.remove(); }; })(bit);
    }
  }

  /* ---------- start ---------- */
  body.dataset.kind = state.kind;
  body.dataset.mode = state.mode;
  document.querySelectorAll('.kind-tab').forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.kind === state.kind)); });
  document.querySelectorAll('.ask-chip').forEach(function (c) { c.setAttribute('aria-checked', String(c.dataset.mode === state.mode)); });

  function start() {
    Doodles.brandCoin($('brandCoin'));
    Doodles.kindInk($('kindInk'), state.kind);
    Doodles.scene($('scene'), state.kind, state.mode);
    syncInputs();
    render({ immediate: true, pop: true });
  }

  var splashEl = $('splash');
  var skipSplash = false;
  try { skipSplash = sessionStorage.getItem('isip.splash') === '1' || Doodles.reduceMotion; } catch (e) {}
  function endSplash() {
    if (!splashEl || splashEl.classList.contains('done')) return;
    splashEl.classList.add('done');
    try { sessionStorage.setItem('isip.splash', '1'); } catch (e) {}
    setTimeout(function () { splashEl.remove(); }, 500);
    start();
  }
  var fontsLoaded = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsLoaded.then(function () {
    if (skipSplash) { splashEl.remove(); start(); return; }
    Doodles.splash($('splashArt'));
    splashEl.addEventListener('click', endSplash);
    setTimeout(endSplash, 1900);
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      Doodles.kindInk($('kindInk'), state.kind);
      if (current) drawCharts(current, false);
    }, 200);
  });
})();
