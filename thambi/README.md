# Thambi

A playful, offline learning app. Tiny picture lessons, a quiz after each one, and a gift to open every time a topic is finished.

## What is inside

| Section | Subjects | Topics |
|---|---|---|
| Stock markets | Basics, technical analysis, fundamental analysis, futures, options, tax / currency / commodities, risk and psychology, sectors | 66 |
| Your money | Personal finance, mutual funds, insurance and NPS | 25 |
| Financial modelling | Build the model, value the company | 15 |
| MS Office | Excel basics, Excel for analysis, Word, PowerPoint, Outlook and Teams | 32 |

138 topics, 414 picture cards and 276 quiz questions in all.

- **Today**: three new topics every day, a question of the day, streak, coins and levels.
- **Learn**: every subject as a stepping-stone path. Each subject ends with a "go deeper" link.
- **My classes**: separate Skillshare and WebVeda shelves. Add the classes you are taking, tick lessons as you watch them, keep notes, earn coins and gifts.
- **Gifts**: a 60-sticker album, trophies for finished subjects, mystery gifts bought with coins, backup and restore.

Everything is stored only on the phone. Nothing is uploaded and no account is needed.

## About the content

All lessons are original, written for this app. They cover the same subjects as Zerodha Varsity's modules and link to the matching module for deeper reading, but no Varsity text is copied. Skillshare and WebVeda course material is not included: those sections are trackers for classes you take on those sites. Zerodha Varsity, Skillshare, WebVeda and Microsoft Office belong to their owners.

Lessons are simplified, for learning only, and are not investment or tax advice. Tax rates shown are for FY 2026-27 and change with budgets.

## Install

Every push that touches `thambi/` builds `thambi.apk` and attaches it to a GitHub Release (Releases tab, tag `thambi-v1.0.N`). It is debug-signed, so sideload it: download on the phone, open it, allow installs from this source.

## Add or edit lessons

Lessons live in `web/js/data-*.js`. One lesson looks like this:

```js
L('Topic title', '🌱', [
  ['picture spec', 'Card heading', 'One or two short sentences. *Stars* highlight a phrase.'],
  // two more cards
], [
  ['Question?', 'Option A', 'Option B', 'Option C', 0, 'Why the right one is right.'],
  // one more question
])
```

Picture specs (emoji, `bars:`, `line:`, `candle:`, `pie:`, `flow:`, `vs:`, `f:`, `keys:`, `grid:`) are documented at the top of `web/js/visuals.js`. Run `node tools/validate.js web/js` to check every lesson before pushing; the build runs it too.

## Build locally

```bash
mkdir -p android/app/src/main/assets/www && cp -r web/* android/app/src/main/assets/www/
cd android && gradle assembleRelease   # JDK 17 + Android SDK 34
```

Or just open `web/index.html` in a browser.

---
Built by Savin Padencherry · instinct.finance family
