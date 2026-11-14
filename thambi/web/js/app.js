/* Thambi — app engine. Everything is stored on the phone (localStorage). */
(function () {
  'use strict';
  var KEY = 'thambi.v1';
  var $app = document.getElementById('app'), $layer = document.getElementById('layer');
  var LESSON = {}, TRACK = {};
  TRACKS.forEach(function (t) { TRACK[t.id] = t; t.lessons.forEach(function (l) { LESSON[l.id] = l; }); });
  var LIGHT = { '#FFC83D': 1 };            // track colours that need dark text
  var SHELF = { sk: { name: 'Skillshare', url: 'https://www.skillshare.com/', color: '#12B76A', em: '🎨' },
                wv: { name: 'WebVeda', url: 'https://www.webveda.com/', color: '#FF7A1A', em: '🧭' } };

  /* ---------- state ---------- */
  var S = load();
  function blank() { return { name: '', xp: 0, coins: 0, streak: 0, best: 0, last: '', done: {}, stickers: [], cups: [], daily: {}, log: {}, classes: { sk: [], wv: [] }, sound: true }; }
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.done) { var b = blank(); for (var k in b) if (s[k] == null) s[k] = b[k]; return s; } } catch (e) { }
    return blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function dkey(d) { d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function dayNo(d) { d = d || new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 6e4) / 864e5); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rich(s) { return esc(s).replace(/\*([^*]+)\*/g, '<b>$1</b>'); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function isDone(id) { return !!S.done[id]; }
  function trackDone(t) { return t.lessons.filter(function (l) { return isDone(l.id); }).length; }
  function nextIn(t) { for (var i = 0; i < t.lessons.length; i++) if (!isDone(t.lessons[i].id)) return t.lessons[i]; return null; }
  function level() { var cur = LEVELS[0], nxt = null; LEVELS.forEach(function (l, i) { if (S.xp >= l[0]) { cur = l; nxt = LEVELS[i + 1] || null; } }); return { name: cur[1], from: cur[0], next: nxt }; }
  function tc(c) { return 'style="--tc:' + c + '"'; }
  function lightCls(c) { return LIGHT[c] ? ' light' : ''; }

  /* ---------- streak + daily ---------- */
  function touchDay() {
    var today = dkey();
    if (S.last !== today) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      S.streak = S.last === dkey(y) ? S.streak + 1 : 1;
      S.last = today; S.best = Math.max(S.best, S.streak);
    }
    S.log[today] = (S.log[today] || 0) + 1;
  }
  function liveStreak() {
    if (!S.last) return 0;
    var y = new Date(); y.setDate(y.getDate() - 1);
    return (S.last === dkey() || S.last === dkey(y)) ? S.streak : 0;
  }
  function daily() {
    var today = dkey();
    if (S.daily.date === today && S.daily.picks && S.daily.picks.every(function (id) { return LESSON[id]; })) return S.daily;
    var open = TRACKS.filter(function (t) { return nextIn(t) && (!t.after || !nextIn(TRACK[t.after])); });
    if (!open.length) open = TRACKS.filter(function (t) { return nextIn(t); });
    var picks = [], n = dayNo(), usedGroup = {};
    // rotate through tracks so each day brings different subjects; prefer one per group
    for (var pass = 0; pass < 2 && picks.length < 3; pass++) {
      for (var i = 0; i < open.length && picks.length < 3; i++) {
        var t = open[(n * 2 + i) % open.length];
        if (picks.some(function (id) { return LESSON[id].track === t.id; })) continue;
        if (pass === 0 && usedGroup[t.group]) continue;
        usedGroup[t.group] = 1; picks.push(nextIn(t).id);
      }
    }
    // a single open track left: take its next lessons
    if (picks.length < 3 && open.length) {
      open.forEach(function (t) { t.lessons.forEach(function (l) { if (picks.length < 3 && !isDone(l.id) && picks.indexOf(l.id) < 0) picks.push(l.id); }); });
    }
    S.daily = { date: today, picks: picks, q: null, bonus: false }; save();
    return S.daily;
  }
  function qotd() {
    var done = Object.keys(S.done).filter(function (id) { return LESSON[id] && LESSON[id].quiz.length; });
    var pool = done.length ? done : [TRACKS[0].lessons[0].id];
    var l = LESSON[pool[dayNo() % pool.length]];
    return { l: l, q: l.quiz[dayNo() % l.quiz.length] };
  }

  /* ---------- tiny feedback: sound, buzz, toast, confetti ---------- */
  var AC = null;
  function beep(kind) {
    if (navigator.vibrate) try { navigator.vibrate(kind === 'bad' ? [30, 40, 30] : kind === 'gift' ? [20, 30, 20, 30, 60] : 15); } catch (e) { }
    if (!S.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var notes = { tap: [520], ok: [660, 880], bad: [300, 220], gift: [523, 659, 784, 1047] }[kind] || [520];
      notes.forEach(function (f, i) {
        var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + i * 0.09;
        o.type = kind === 'bad' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.22);
      });
    } catch (e) { }
  }
  function toast(msg) {
    var d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 2000);
  }
  function confetti() {
    var c = document.createElement('div'); c.className = 'confetti';
    var cols = ['#FFC83D', '#6B3CFF', '#12B76A', '#FF4F8B', '#2E9BFF', '#FF7A1A'], h = '';
    for (var i = 0; i < 46; i++) h += '<i style="left:' + (Math.random() * 100) + '%;background:' + cols[i % 6] + ';animation-duration:' + (1.3 + Math.random() * 1.4) + 's;animation-delay:' + (Math.random() * 0.35) + 's"></i>';
    c.innerHTML = h; document.body.appendChild(c); setTimeout(function () { c.remove(); }, 3200);
  }

  /* ---------- router ---------- */
  var view = { name: 'home', arg: null }, overlay = null;      // overlay: lesson player state
  function go(name, arg) { view = { name: name, arg: arg }; render(); window.scrollTo(0, 0); }
  function nav() {
    var items = [['home', '🏠', 'Today'], ['learn', '📚', 'Learn'], ['classes', '🎒', 'My classes'], ['gifts', '🎁', 'Gifts']];
    var cur = view.name === 'track' ? 'learn' : view.name === 'class' ? 'classes' : view.name;
    return '<nav class="nav"><div>' + items.map(function (i) {
      return '<button data-go="' + i[0] + '" class="' + (cur === i[0] ? 'on' : '') + '"><span>' + i[1] + '</span>' + i[2] + '</button>';
    }).join('') + '</div></nav>';
  }
  function render() {
    if (!S.name) { $app.innerHTML = welcome(); return; }
    var v = { home: home, learn: learn, track: trackPage, classes: classes, class: classPage, gifts: gifts }[view.name] || home;
    $app.innerHTML = '<div class="screen">' + v(view.arg) + '</div>' + nav();
  }

  /* ---------- welcome ---------- */
  function welcome() {
    return '<div class="welcome">' + thambi('hi') + '<h1 style="margin:14px 0 6px">Hi, I am Thambi.</h1>' +
      '<p style="font-size:19px;margin-bottom:20px">Markets, money, modelling and MS Office, in tiny picture lessons. Finish a topic, open a gift.</p>' +
      '<label class="field"><span>What should I call you?</span><input id="nm" maxlength="20" autocomplete="off" placeholder="Your name"></label>' +
      '<button class="btn ghost" data-act="start">Start learning</button></div>';
  }

  /* ---------- home ---------- */
  function lessonRow(l, done) {
    var t = TRACK[l.track];
    return '<button class="stk pick' + (done ? ' done' : '') + '" ' + tc(t.color) + ' data-lesson="' + l.id + '"><div class="em">' + l.e + '</div>' +
      '<div class="tx"><b>' + esc(l.t) + '</b><span>' + esc(t.name) + '</span></div><div class="go">' + (done ? '✓' : '▶') + '</div></button>';
  }
  function home() {
    var d = daily(), doneN = d.picks.filter(isDone).length, lv = level(), all = d.picks.length && doneN === d.picks.length;
    var total = Object.keys(LESSON).length, fin = Object.keys(S.done).filter(function (id) { return LESSON[id]; }).length;
    var line = !d.picks.length ? 'You finished every topic!' : all ? pick(LINES.doneDay) : doneN ? (d.picks.length - doneN) + ' more for today\'s goal.' : LINES.hi[dayNo() % LINES.hi.length];
    var h = '<div class="hero"><div class="stats"><span class="pill">🔥 ' + liveStreak() + '</span><span class="pill">🪙 ' + S.coins + '</span><span class="pill">⭐ ' + esc(lv.name) + '</span></div>' +
      '<div class="who">' + thambi(all ? 'wow' : 'hi') + '<div class="bubble"><b>Hi ' + esc(S.name) + '!</b><span class="hand">' + esc(line) + '</span></div></div></div>';

    h += '<div class="section"><h2>Today\'s three<span class="goal">' + d.picks.map(function (id) { return '<span class="dot' + (isDone(id) ? ' on' : '') + '">' + (isDone(id) ? '✓' : '') + '</span>'; }).join('') + '</span></h2>';
    h += d.picks.map(function (id) { return lessonRow(LESSON[id], isDone(id)); }).join('');
    if (all && !d.bonus) h += '<button class="btn" data-act="bonus">🎁 Open today\'s bonus gift</button>';
    else if (all) h += '<button class="btn ghost" data-go="learn">Pick another topic</button>';
    h += '</div>';

    var q = qotd(), ans = d.q;
    h += '<div class="section"><h2>Question of the day<small>+5 🪙</small></h2><div class="stk qotd"><h3>' + esc(q.q[0]) + '</h3><div class="opts">';
    var perm = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [0, 2, 1], [2, 1, 0], [1, 0, 2]][dayNo() % 6];
    perm.forEach(function (k, pos) {
      var cls = ans == null ? '' : (k === q.q[4] ? ' right lock' : k === ans ? ' wrong lock' : ' lock');
      h += '<button class="opt' + cls + '" style="margin:0" data-qotd="' + k + '"><i>' + 'ABC'[pos] + '</i>' + esc(q.q[k + 1]) + '</button>';
    });
    h += '</div>' + (ans != null ? '<p style="margin-top:12px"><b>' + (ans === q.q[4] ? 'Correct. ' : 'Not this time. ') + '</b>' + esc(q.q[5]) + '</p>' : '') + '</div></div>';

    var going = TRACKS.filter(function (t) { var n = trackDone(t); return n > 0 && n < t.lessons.length; }).slice(0, 3);
    if (going.length) {
      h += '<div class="section"><h2>Keep going</h2>';
      going.forEach(function (t) { h += lessonRow(nextIn(t), false); });
      h += '</div>';
    }
    h += '<div class="section"><h2>Your journey<small>' + fin + ' of ' + total + ' topics</small></h2><div class="bar" ' + tc('#12B76A') + '><i style="width:' + (fin / total * 100) + '%"></i></div>' +
      (lv.next ? '<p class="soft" style="font-size:14.5px;margin-top:8px">' + (lv.next[0] - S.xp) + ' XP to become ' + esc(lv.next[1]) + '</p>' : '') + '</div>';
    return h;
  }

  /* ---------- learn ---------- */
  function learn() {
    var h = '<div class="top"><h1>Learn</h1><span class="pill">🪙 ' + S.coins + '</span></div>';
    GROUPS.forEach(function (g) {
      h += '<div class="grp"><h2>' + esc(g.name) + '</h2><p>' + esc(g.note) + '</p><div class="tiles">';
      TRACKS.filter(function (t) { return t.group === g.id; }).forEach(function (t) {
        var n = trackDone(t);
        h += '<button class="stk tile' + lightCls(t.color) + '" ' + tc(t.color) + ' data-track="' + t.id + '">' + (n === t.lessons.length ? '<span class="cup">🏆</span>' : '') +
          '<span class="em">' + t.emoji + '</span><b>' + esc(t.name) + '</b><span class="n">' + n + ' / ' + t.lessons.length + ' topics</span><div class="bar"><i style="width:' + (n / t.lessons.length * 100) + '%"></i></div></button>';
      });
      h += '</div></div>';
    });
    return h;
  }
  function trackPage(id) {
    var t = TRACK[id], nx = nextIn(t), n = trackDone(t);
    var h = '<div class="thead' + lightCls(t.color) + '" ' + tc(t.color) + '><button class="back" data-go="learn" aria-label="Back">←</button>' +
      '<div class="row"><span class="big">' + t.emoji + '</span><div><h1>' + esc(t.name) + '</h1><p>' + esc(t.blurb) + '</p></div></div>' +
      '<div class="bar" style="margin-top:14px;--tc:#FFC83D"><i style="width:' + (n / t.lessons.length * 100) + '%"></i></div></div>';
    h += '<div class="path" ' + tc(t.color) + '>';
    t.lessons.forEach(function (l, i) {
      var d = isDone(l.id);
      h += '<button class="stone' + (d ? ' done' : '') + (nx && nx.id === l.id ? ' next' : '') + '" data-lesson="' + l.id + '"><span class="disc">' + l.e + '</span>' +
        '<span><b>' + esc(l.t) + '</b><span>' + (d ? 'Done. Tap to revise' : 'Topic ' + (i + 1) + ', about 2 min') + '</span></span></button>';
    });
    h += '</div>';
    if (t.link) h += '<a class="stk deeper" href="' + t.link.url + '" target="_blank" rel="noopener"><span class="em">🔎</span><span><b>Go deeper on ' + esc(t.link.label) + '</b><span>' + esc(t.link.sub) + '. Opens in your browser.</span></span></a>';
    return h;
  }

  /* ---------- lesson player ---------- */
  function openLesson(id) {
    var l = LESSON[id]; if (!l) return;
    overlay = { l: l, i: 0, right: 0, answered: null, again: isDone(id) };
    beep('tap'); drawPlayer();
  }
  function closePlayer() { overlay = null; $layer.innerHTML = ''; render(); }
  function drawPlayer() {
    var o = overlay, l = o.l, t = TRACK[l.track], steps = l.cards.length + l.quiz.length, h = '';
    var segs = ''; for (var s = 0; s < steps; s++) segs += '<i class="' + (s <= o.i ? 'on' : '') + '"></i>';
    h += '<div class="player" ' + tc(t.color) + '><div class="ptop"><button class="back" data-act="close" aria-label="Close">✕</button><div class="segs">' + segs + '</div></div>';
    if (o.i < l.cards.length) {
      var c = l.cards[o.i];
      h += '<div class="pbody"><div class="card"><div class="vis' + (/^[a-z]+:/.test(c[0]) ? '' : ' tint') + '">' + visual(c[0]) + '</div><h2>' + esc(c[1]) + '</h2><p>' + rich(c[2]) + '</p></div></div>' +
        '<div class="pfoot"><button class="btn tc' + lightCls(t.color) + '" data-act="next">' + (o.i === l.cards.length - 1 ? 'Quiz time' : 'Next') + '</button></div>';
    } else if (o.i < steps) {
      var q = l.quiz[o.i - l.cards.length], a = o.answered;
      if (!o.perm || o.permFor !== o.i) { o.perm = shuffle([0, 1, 2]); o.permFor = o.i; }
      h += '<div class="pbody"><div class="card quiz"><span class="pill qtag' + lightCls(t.color) + '">Question ' + (o.i - l.cards.length + 1) + ' of ' + l.quiz.length + '</span><h2>' + esc(q[0]) + '</h2>';
      o.perm.forEach(function (k, pos) {
        var cls = a == null ? '' : (k === q[4] ? ' right lock' : k === a ? ' wrong lock' : ' lock');
        h += '<button class="opt' + cls + '" data-ans="' + k + '"><i>' + 'ABC'[pos] + '</i>' + esc(q[k + 1]) + '</button>';
      });
      if (a != null) h += '<div class="why">' + thambi(a === q[4] ? 'wow' : 'think') + '<div><b>' + esc(pick(a === q[4] ? LINES.right : LINES.wrong)) + '</b> ' + esc(q[5]) + '</div></div>';
      h += '</div></div><div class="pfoot"><button class="btn tc' + lightCls(t.color) + '" data-act="next"' + (a == null ? ' disabled' : '') + '>' + (o.i === steps - 1 ? 'Finish topic' : 'Next') + '</button></div>';
    } else h += giftScreen();
    h += '</div>';
    $layer.innerHTML = h;
    var pb = $layer.querySelector('.pbody'); if (pb) pb.scrollTop = 0;
    fitVisual();
  }
  /* shrink a wide table or tall picture so it always fits inside its frame */
  function fitVisual() {
    var vis = $layer.querySelector('.vis'), w = vis && vis.querySelector('.v-wrap'); if (!w) return;
    var box = vis.getBoundingClientRect(), pad = 12, availW = vis.clientWidth - 2 * pad;
    function fits() {
      var els = w.querySelectorAll('*');
      for (var k = 0; k < els.length; k++) {
        var r = els[k].getBoundingClientRect(); if (!r.width) continue;
        if (r.left < box.left + pad - 1 || r.right > box.right - pad + 1 || r.top < box.top + pad - 1 || r.bottom > box.bottom - pad + 1) return false;
      }
      return true;
    }
    if (fits()) return;
    w.style.maxHeight = 'none';
    for (var z = 0.94; z >= 0.4; z -= 0.06) {
      w.style.zoom = z; w.style.width = (availW / z) + 'px';
      if (fits()) return;
    }
  }
  function finishLesson() {
    var o = overlay, l = o.l, t = TRACK[l.track], perfect = o.right === l.quiz.length;
    var r = { coins: 0, xp: 0, perfect: perfect, sticker: null, cup: null, again: o.again, opened: false };
    if (o.again) { r.coins = 2; r.xp = 2; }
    else {
      r.coins = 10 + o.right * 5; r.xp = 20 + o.right * 5;
      S.done[l.id] = { d: dkey(), p: perfect ? 1 : 0 };
      touchDay();
      r.sticker = drawSticker(perfect ? 0.85 : 0.65);
      if (!r.sticker) r.coins += 20;
      if (trackDone(t) === t.lessons.length && S.cups.indexOf(t.id) < 0) { S.cups.push(t.id); r.cup = t; r.coins += 50; r.xp += 50; }
    }
    S.coins += r.coins; S.xp += r.xp; save();
    o.reward = r;
  }
  function drawSticker(chance, minRare) {
    var left = STICKERS.filter(function (s) { return S.stickers.indexOf(s.id) < 0 && (!minRare || s.r >= minRare); });
    if (!left.length || Math.random() > chance) return null;
    var roll = Math.random(), want = roll < 0.08 ? 3 : roll < 0.35 ? 2 : 1;
    var pool = left.filter(function (s) { return s.r === want; }); if (!pool.length) pool = left;
    var s = pick(pool); S.stickers.push(s.id); return s;
  }
  function giftScreen() {
    var o = overlay, r = o.reward, h = '<div class="pbody"><div class="gift">';
    if (r.again) {
      h += thambi('hi').replace('<svg', '<svg width="120" height="120"') + '<h1 style="margin-top:10px">Revised!</h1><div class="earn"><span class="pill">+' + r.coins + ' 🪙</span></div><p class="soft">Gifts come with new topics.</p>';
    } else if (!r.opened) {
      h += '<h1>Topic complete!</h1><p class="hand" style="margin-top:6px">' + esc(pick(LINES.gift)) + '</p>' +
        '<button class="box shake" data-act="open" aria-label="Open gift"><span class="body"></span><span class="rib"></span><span class="lid"></span><span class="bow">🎀</span></button><p class="soft">Tap the box</p>';
    } else {
      h += '<div class="prize">';
      if (r.sticker) h += '<p class="pill" style="background:#FFC83D">' + ['', 'New sticker', 'Rare sticker', 'Super rare sticker'][r.sticker.r] + '</p><div class="sticker r' + r.sticker.r + '">' + r.sticker.e + '</div><h1>' + esc(r.sticker.n) + '</h1>';
      else h += '<div class="sticker">💰</div><h1>Coin bag!</h1>';
      h += '<div class="earn"><span class="pill">+' + r.coins + ' 🪙</span><span class="pill">+' + r.xp + ' XP</span>' + (r.perfect ? '<span class="pill" style="background:#D9FBE8">💯 Perfect quiz</span>' : '') + '</div>';
      if (r.cup) h += '<p class="pill" style="background:' + r.cup.color + ';color:' + (LIGHT[r.cup.color] ? 'inherit' : '#fff') + '">🏆 ' + esc(r.cup.name) + ' finished</p>';
      h += '</div>';
    }
    h += '</div></div>';
    if (r.again || r.opened) {
      var nx = nextIn(TRACK[o.l.track]);
      h += '<div class="pfoot">' + (nx ? '<button class="btn" data-lesson="' + nx.id + '" style="margin-bottom:12px">Next topic: ' + esc(nx.t) + '</button>' : '') + '<button class="btn ghost" data-act="close">Done for now</button></div>';
    }
    return h;
  }

  /* ---------- my classes (Skillshare / WebVeda trackers) ---------- */
  var shelf = 'sk';
  function classes() {
    var sh = SHELF[shelf], list = S.classes[shelf];
    var h = '<div class="top"><h1>My classes</h1><span class="pill">🪙 ' + S.coins + '</span></div>' +
      '<div class="tabs">' + Object.keys(SHELF).map(function (k) { return '<button data-shelf="' + k + '" class="' + (k === shelf ? 'on' : '') + '" ' + tc(SHELF[k].color) + '>' + SHELF[k].em + ' ' + SHELF[k].name + '</button>'; }).join('') + '</div><div ' + tc(sh.color) + '>';
    if (!list.length) h += '<div class="stk empty"><div class="em">' + sh.em + '</div><h3>No ' + sh.name + ' classes yet</h3><p class="soft" style="margin:6px 0 4px">Add a class you are taking on ' + sh.name + '. Tick each lesson as you watch it, keep notes, and earn coins and gifts here.</p></div>';
    list.forEach(function (c, i) {
      var n = c.done.filter(Boolean).length;
      h += '<button class="stk cls" data-class="' + i + '"><b>' + (n === c.done.length ? '🏆 ' : '') + esc(c.name) + '</b><div class="bar"><i style="width:' + (n / c.done.length * 100) + '%"></i></div><div class="n">' + n + ' of ' + c.done.length + ' lessons</div></button>';
    });
    h += '<button class="btn" data-act="addclass" style="margin-top:6px">＋ Add a ' + sh.name + ' class</button>' +
      '<a class="btn ghost" style="margin-top:13px;text-decoration:none" href="' + sh.url + '" target="_blank" rel="noopener">Open ' + sh.name + '</a></div>';
    return h;
  }
  function classPage(i) {
    var sh = SHELF[shelf], c = S.classes[shelf][i]; if (!c) return classes();
    var n = c.done.filter(Boolean).length;
    var h = '<div class="thead" ' + tc(sh.color) + '><button class="back" data-go="classes" aria-label="Back">←</button><div class="row"><span class="big">' + sh.em + '</span><div><h1>' + esc(c.name) + '</h1><p>' + sh.name + ' class. ' + n + ' of ' + c.done.length + ' lessons done.</p></div></div>' +
      '<div class="bar" style="margin-top:14px;--tc:#FFC83D"><i style="width:' + (n / c.done.length * 100) + '%"></i></div></div>';
    h += '<div class="section"><h2>Lessons<small>tap when watched, +5 🪙</small></h2><div class="bubbles">' + c.done.map(function (d, k) { return '<button class="' + (d ? 'on' : '') + '" data-tick="' + k + '">' + (k + 1) + '</button>'; }).join('') + '</div></div>';
    if (c.url) h += '<a class="btn tc" style="text-decoration:none" ' + tc(sh.color) + ' href="' + esc(c.url) + '" target="_blank" rel="noopener">Open the class</a>';
    h += '<div class="section"><h2>My notes</h2><label class="field"><textarea id="notes" placeholder="What did you learn? Write it in your own words.">' + esc(c.notes || '') + '</textarea></label>' +
      '<button class="btn small ghost" data-act="delclass" style="margin-top:4px">Remove this class</button></div>';
    return h;
  }
  function addClassSheet() {
    var sh = SHELF[shelf];
    sheet('<h2 style="margin-bottom:14px">Add a ' + sh.name + ' class</h2>' +
      '<label class="field"><span>Class name</span><input id="cn" maxlength="80" placeholder="As it appears on ' + sh.name + '"></label>' +
      '<label class="field"><span>How many lessons?</span><input id="ct" type="number" inputmode="numeric" min="1" max="120" value="10"></label>' +
      '<label class="field"><span>Link (optional)</span><input id="cu" inputmode="url" placeholder="https://"></label>' +
      '<button class="btn" data-act="saveclass">Add class</button><button class="btn ghost" data-act="closesheet" style="margin-top:12px">Cancel</button>');
  }
  function sheet(html) { var d = document.createElement('div'); d.className = 'sheet'; d.id = 'sheet'; d.innerHTML = '<div>' + html + '</div>'; document.body.appendChild(d); }
  function closeSheet() { var s = document.getElementById('sheet'); if (s) s.remove(); }

  /* ---------- gifts ---------- */
  function gifts() {
    var lv = level(), fin = Object.keys(S.done).filter(function (id) { return LESSON[id]; }).length;
    var h = '<div class="top"><h1>Gifts</h1><span class="pill">🪙 ' + S.coins + '</span></div>' +
      '<div class="statrow"><div class="stk stat"><b>🔥 ' + liveStreak() + '</b><span>day streak</span></div><div class="stk stat"><b>' + fin + '</b><span>topics done</span></div><div class="stk stat"><b>' + S.xp + '</b><span>XP</span></div></div>' +
      '<p class="soft" style="margin-top:12px;font-size:15px">⭐ ' + esc(lv.name) + (lv.next ? '. Next: ' + esc(lv.next[1]) + ' at ' + lv.next[0] + ' XP.' : '. Top level!') + ' Best streak ' + S.best + '.</p>';
    var left = STICKERS.length - S.stickers.length;
    h += '<div class="section"><h2>Sticker album<small>' + S.stickers.length + ' of ' + STICKERS.length + '</small></h2>' +
      (left ? '<button class="btn" data-act="buy" style="margin-bottom:16px"' + (S.coins < 60 ? ' disabled' : '') + '>🎁 Mystery gift for 60 🪙</button>' : '') + '<div class="album">';
    STICKERS.forEach(function (s) { var own = S.stickers.indexOf(s.id) >= 0; h += own ? '<div class="r' + s.r + '">' + s.e + '<small>' + esc(s.n) + '</small></div>' : '<div class="no">?</div>'; });
    h += '</div></div><div class="section"><h2>Trophies<small>finish a whole subject</small></h2><div class="cups">';
    TRACKS.forEach(function (t) { var own = S.cups.indexOf(t.id) >= 0; h += '<span class="pill' + (own ? '' : ' off') + '">' + (own ? '🏆' : t.emoji) + ' ' + esc(t.name) + '</span>'; });
    h += '</div></div><div class="section"><h2>Settings</h2><label class="field"><span>Your name</span><input id="rename" maxlength="20" value="' + esc(S.name) + '"></label>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn small ghost" data-act="sound">Sounds: ' + (S.sound ? 'on' : 'off') + '</button><button class="btn small ghost" data-act="backup">Back up progress</button><button class="btn small ghost" data-act="restore">Restore</button></div>' +
      '<p class="soft" style="font-size:13.5px;margin-top:18px">Thambi teaches ideas, not stock tips. Lessons are original and simplified, for learning only, and are not investment or tax advice. Tax rates and rules change, so check the current ones before acting. Zerodha Varsity, Skillshare and WebVeda belong to their owners; Thambi only links to them.</p></div>';
    return h;
  }

  /* ---------- events ---------- */
  function reward(coins, xp) { S.coins += coins; S.xp += xp || 0; save(); }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-act],[data-lesson],[data-track],[data-ans],[data-qotd],[data-shelf],[data-class],[data-tick]');
    if (!el) { if (e.target.id === 'sheet') closeSheet(); return; }
    var d = el.dataset;
    if (d.go) { beep('tap'); go(d.go); }
    else if (d.track) { beep('tap'); go('track', d.track); }
    else if (d.lesson) openLesson(d.lesson);
    else if (d.shelf) { shelf = d.shelf; beep('tap'); render(); }
    else if (d.class != null) { beep('tap'); go('class', +d.class); }
    else if (d.ans != null) {
      var o = overlay, q = o.l.quiz[o.i - o.l.cards.length]; if (o.answered != null) return;
      o.answered = +d.ans; if (o.answered === q[4]) { o.right++; beep('ok'); } else beep('bad');
      drawPlayer(); var w = $layer.querySelector('.why'); if (w) w.scrollIntoView({ block: 'nearest' });
    }
    else if (d.qotd != null) {
      var dd = daily(); if (dd.q != null) return;
      dd.q = +d.qotd; if (dd.q === qotd().q[4]) { reward(5, 5); beep('ok'); toast('+5 coins'); } else beep('bad');
      save(); var y = window.scrollY; render(); window.scrollTo(0, y);
    }
    else if (d.tick != null) {
      var c = S.classes[shelf][view.arg], k = +d.tick, wasAll = c.done.every(Boolean);
      saveNotes(); c.done[k] = !c.done[k];
      if (c.done[k] && !(c.paid || (c.paid = {}))[k]) { c.paid[k] = 1; reward(5, 10); touchDay(); beep('ok'); toast('+5 coins'); } else beep('tap');
      if (!wasAll && c.done.every(Boolean) && !c.cup) {
        c.cup = 1; var st = drawSticker(1, 2) || drawSticker(1); reward(40, 40); confetti(); beep('gift');
        sheet('<div style="text-align:center"><h1>Class complete!</h1>' + (st ? '<div class="sticker r' + st.r + '">' + st.e + '</div><h2>' + esc(st.n) + '</h2>' : '<div class="sticker">💰</div>') + '<div class="earn"><span class="pill">+40 🪙</span></div><button class="btn" data-act="closesheet">Lovely</button></div>');
      }
      save(); var yy = window.scrollY; render(); window.scrollTo(0, yy);
    }
    else if (d.act) act(d.act);
  });
  function saveNotes() { var n = document.getElementById('notes'); if (n && view.name === 'class' && S.classes[shelf][view.arg]) { S.classes[shelf][view.arg].notes = n.value; save(); } }
  document.addEventListener('input', function (e) {
    if (e.target.id === 'notes') saveNotes();
    if (e.target.id === 'rename') { var v = e.target.value.trim(); if (v) { S.name = v; save(); } }
  });
  function act(a) {
    var o = overlay;
    if (a === 'start') { var nm = document.getElementById('nm').value.trim(); if (!nm) { toast('Type your name first'); return; } S.name = nm; save(); beep('ok'); render(); }
    else if (a === 'close') closePlayer();
    else if (a === 'next') {
      o.i++; o.answered = null; beep('tap');
      if (o.i >= o.l.cards.length + o.l.quiz.length) { finishLesson(); if (o.reward.again) beep('ok'); }
      drawPlayer();
    }
    else if (a === 'open') {
      var box = $layer.querySelector('.box'); if (!box || box.classList.contains('open')) return;
      box.classList.remove('shake'); box.classList.add('open'); beep('gift'); confetti();
      setTimeout(function () { if (overlay && overlay.reward) { overlay.reward.opened = true; drawPlayer(); } }, 650);
    }
    else if (a === 'bonus') {
      var dd = daily(); if (dd.bonus) return; dd.bonus = true;
      var st = drawSticker(1, 2) || drawSticker(1); reward(30, 30); confetti(); beep('gift');
      sheet('<div style="text-align:center"><h1>Daily goal gift</h1>' + (st ? '<div class="sticker r' + st.r + '">' + st.e + '</div><h2>' + esc(st.n) + '</h2>' : '<div class="sticker">💰</div>') + '<div class="earn"><span class="pill">+30 🪙</span><span class="pill">+30 XP</span></div><button class="btn" data-act="closesheet">Thanks, Thambi</button></div>');
      render();
    }
    else if (a === 'buy') {
      if (S.coins < 60) return; var s2 = drawSticker(1); if (!s2) return; S.coins -= 60; save(); confetti(); beep('gift');
      sheet('<div style="text-align:center"><p class="pill" style="background:#FFC83D">' + ['', 'New sticker', 'Rare sticker', 'Super rare sticker'][s2.r] + '</p><div class="sticker r' + s2.r + '">' + s2.e + '</div><h1>' + esc(s2.n) + '</h1><button class="btn" data-act="closesheet" style="margin-top:16px">Into the album</button></div>');
      render();
    }
    else if (a === 'addclass') addClassSheet();
    else if (a === 'closesheet') closeSheet();
    else if (a === 'saveclass') {
      var n = document.getElementById('cn').value.trim(), tot = Math.max(1, Math.min(120, parseInt(document.getElementById('ct').value, 10) || 0)), u = document.getElementById('cu').value.trim();
      if (!n) { toast('Give the class a name'); return; }
      if (u && !/^https?:\/\//i.test(u)) u = 'https://' + u;
      var arr = []; for (var i = 0; i < tot; i++) arr.push(false);
      S.classes[shelf].push({ name: n, url: u, done: arr, notes: '' }); save(); closeSheet(); beep('ok'); render();
    }
    else if (a === 'delclass') {
      sheet('<h2>Remove this class?</h2><p class="soft" style="margin:8px 0 16px">Its ticks and notes will be deleted. Coins you earned stay.</p><button class="btn" style="background:#FF4F8B;color:#fff" data-act="delyes">Remove</button><button class="btn ghost" data-act="closesheet" style="margin-top:12px">Keep it</button>');
    }
    else if (a === 'delyes') { S.classes[shelf].splice(view.arg, 1); save(); closeSheet(); go('classes'); }
    else if (a === 'sound') { S.sound = !S.sound; save(); render(); beep('tap'); }
    else if (a === 'backup') {
      sheet('<h2>Back up progress</h2><p class="soft" style="margin:6px 0 12px">Copy this text and keep it somewhere safe. Paste it into Restore on any phone.</p><label class="field"><textarea id="bk" readonly>' + esc(JSON.stringify(S)) + '</textarea></label><button class="btn" data-act="copybk">Copy</button><button class="btn ghost" data-act="closesheet" style="margin-top:12px">Close</button>');
    }
    else if (a === 'copybk') { var t = document.getElementById('bk'); t.select(); try { document.execCommand('copy'); toast('Copied'); } catch (e) { toast('Select and copy the text'); } }
    else if (a === 'restore') {
      sheet('<h2>Restore progress</h2><p class="soft" style="margin:6px 0 12px">Paste your backup text. It replaces what is on this phone.</p><label class="field"><textarea id="rs" placeholder="Paste backup here"></textarea></label><button class="btn" data-act="dorestore">Restore</button><button class="btn ghost" data-act="closesheet" style="margin-top:12px">Cancel</button>');
    }
    else if (a === 'dorestore') {
      try { var s = JSON.parse(document.getElementById('rs').value); if (!s || typeof s.done !== 'object' || !s.classes) throw 0; localStorage.setItem(KEY, JSON.stringify(s)); S = load(); closeSheet(); toast('Progress restored'); go('home'); }
      catch (e) { toast('That is not a Thambi backup'); }
    }
  }

  /* Android back button: close whatever is on top; return false to let the app exit */
  window.handleBack = function () {
    if (document.getElementById('sheet')) { closeSheet(); return true; }
    if (overlay) { closePlayer(); return true; }
    if (view.name === 'track') { go('learn'); return true; }
    if (view.name === 'class') { saveNotes(); go('classes'); return true; }
    if (view.name !== 'home' && S.name) { go('home'); return true; }
    return false;
  };
  window.__thambi = { state: function () { return S; }, go: go };
  window.__open = openLesson;
  render();
})();
