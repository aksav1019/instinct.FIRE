// Loads the Thambi data files in a fake window and checks every lesson.
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2];
const ctx = { window: {}, console };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['visuals.js','data-core.js','data-markets.js','data-derivatives.js','data-money.js','data-modelling.js','data-office.js'])
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
let errs = [], n = 0, cards = 0, quiz = 0; const ids = new Set(), ans = [0,0,0];
for (const t of ctx.TRACKS) {
  if (!ctx.GROUPS.find(g => g.id === t.group)) errs.push('bad group ' + t.id);
  for (const l of t.lessons) {
    n++; if (ids.has(l.id)) errs.push('dup id ' + l.id); ids.add(l.id);
    if (l.cards.length < 3) errs.push('few cards ' + l.id);
    if (l.quiz.length < 2) errs.push('few quiz ' + l.id);
    if (l.t.length > 34) errs.push('long title ' + l.id + ' ' + l.t.length);
    for (const c of l.cards) { cards++;
      if (c.length !== 3) errs.push('card shape ' + l.id);
      if (c[1].length > 34) errs.push('long head ' + l.id + ': ' + c[1]);
      if (c[2].length > 175) errs.push('long text ' + l.id + ' (' + c[2].length + '): ' + c[1]);
      if ((c[2].match(/\*/g) || []).length % 2) errs.push('odd * ' + l.id + ': ' + c[1]);
      try { const h = ctx.visual(c[0]); if (/NaN|undefined/.test(h)) errs.push('visual NaN ' + l.id + ': ' + c[0]); }
      catch (e) { errs.push('visual throw ' + l.id + ': ' + c[0] + ' ' + e.message); }
    }
    for (const q of l.quiz) { quiz++;
      if (q.length !== 6) errs.push('quiz shape ' + l.id + ': ' + q[0]);
      if (![0,1,2].includes(q[4])) errs.push('quiz idx ' + l.id);
      else ans[q[4]]++;
      if (new Set([q[1],q[2],q[3]]).size !== 3) errs.push('dup options ' + l.id + ': ' + q[0]);
      if (q[0].length > 120) errs.push('long q ' + l.id + ': ' + q[0].length);
      for (const o of [q[1],q[2],q[3]]) if (o.length > 52) errs.push('long opt ' + l.id + ': ' + o);
    }
  }
}
console.log('tracks', ctx.TRACKS.length, 'lessons', n, 'cards', cards, 'quiz', quiz, 'answer spread', ans.join('/'));
console.log(ctx.TRACKS.map(t => t.id + ':' + t.lessons.length).join(' '));
if (errs.length) process.exitCode = 1;
console.log(errs.length ? errs.join('\n') : 'NO ERRORS');
