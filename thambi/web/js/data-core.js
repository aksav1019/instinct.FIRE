/* Thambi — content registry, stickers and Thambi's lines. Lessons live in the other data-*.js files. */
(function () {
  window.GROUPS = [
    { id: 'markets', name: 'Stock markets', note: 'From your first share to options and trading systems.' },
    { id: 'money', name: 'Your money', note: 'Personal finance, mutual funds, insurance and retirement.' },
    { id: 'model', name: 'Financial modelling', note: 'Build a company model in Excel, sheet by sheet.' },
    { id: 'office', name: 'MS Office', note: 'Excel, Word, PowerPoint and Outlook, one trick at a time.' }
  ];
  window.TRACKS = [];
  function slug(s) { return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  /* L(title, emoji, cards, quiz)  cards: [picture, heading, text]  quiz: [question, a, b, c, correctIndex, why] */
  window.L = function (t, e, cards, quiz) { return { t: t, e: e, cards: cards, quiz: quiz }; };
  window.T = function (o, lessons) {
    o.lessons = lessons.map(function (l) { l.id = o.id + ':' + slug(l.t); l.track = o.id; return l; });
    window.TRACKS.push(o);
  };
  var V = 'https://zerodha.com/varsity/module/';
  window.VARSITY = function (path, name) { return { url: V + path + '/', label: 'Zerodha Varsity', sub: name }; };

  /* r: 1 common, 2 rare, 3 super rare */
  window.STICKERS = [
    ['☕', 'Filter kaapi', 1], ['🥭', 'Mango', 1], ['🏏', 'Cricket bat', 1], ['🛺', 'Auto', 1], ['🪁', 'Kite', 1], ['🥥', 'Tender coconut', 1],
    ['🍌', 'Banana leaf', 1], ['🚲', 'Cycle', 1], ['📻', 'Radio', 1], ['🌶️', 'Chilli', 1], ['🍋', 'Lemon soda', 1], ['🎈', 'Balloon', 1],
    ['🐘', 'Elephant', 1], ['🦜', 'Parrot', 1], ['🌴', 'Palm tree', 1], ['🚌', 'City bus', 1], ['🍛', 'Meals', 1], ['⚽', 'Football', 1],
    ['🧮', 'Abacus', 1], ['📒', 'Ledger', 1], ['🐷', 'Piggy bank', 1], ['🌱', 'Sapling', 1], ['🔔', 'Opening bell', 1], ['🧾', 'Bill', 1],
    ['🐂', 'Bull', 2], ['🐻', 'Bear', 2], ['🦚', 'Peacock', 2], ['🐯', 'Tiger', 2], ['🪔', 'Diya', 2], ['🎆', 'Fireworks', 2],
    ['🚀', 'Rocket', 2], ['🎯', 'Bullseye', 2], ['🧠', 'Big brain', 2], ['🔭', 'Telescope', 2], ['🧲', 'Magnet', 2], ['🎸', 'Guitar', 2],
    ['🏍️', 'Bullet bike', 2], ['🚂', 'Night train', 2], ['🛶', 'Houseboat', 2], ['🏔️', 'Hill station', 2], ['🎬', 'First day first show', 2], ['🥁', 'Thavil', 2],
    ['🦁', 'Lion', 2], ['🦉', 'Wise owl', 2], ['⛵', 'Sailboat', 2], ['🎪', 'Circus', 2], ['🗝️', 'Old key', 2], ['📈', 'Up only', 2],
    ['💎', 'Diamond', 3], ['👑', 'Crown', 3], ['🏆', 'Trophy', 3], ['🦄', 'Unicorn', 3], ['🐉', 'Dragon', 3], ['🌈', 'Rainbow', 3],
    ['🛸', 'UFO', 3], ['🏰', 'Palace', 3], ['🥇', 'Gold medal', 3], ['🌋', 'Volcano', 3], ['🪐', 'Saturn', 3], ['🧞', 'Genie', 3]
  ].map(function (s, i) { return { id: 's' + i, e: s[0], n: s[1], r: s[2] }; });

  window.LEVELS = [[0, 'Chinna Thambi'], [150, 'Curious Thambi'], [400, 'Sharp Thambi'], [800, 'Market Thambi'], [1400, 'Periya Thambi'], [2200, 'Thalaivar Thambi']];

  window.LINES = {
    hi: ['Three fresh topics are waiting.', 'Ready when you are.', 'Small topic, big brain.', 'One topic now, one gift after.'],
    doneDay: ['All three done. Take a bow!', 'Daily goal crushed.', 'That is today sorted.'],
    right: ['Correct!', 'Spot on!', 'Yes! Exactly that.', 'Nailed it.', 'Sharp!'],
    wrong: ['Not this one.', 'Close, but no.', 'Missed it. Look here:'],
    gift: ['You earned this.', 'A gift for a finished topic.', 'Tap the box!']
  };
})();
