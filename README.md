# 🔥 instinct.FIRE

**Find your FIRE type. Plan in rupees. Track every month until work becomes optional.**

instinct.FIRE is a free, offline-first app that teaches the FIRE framework (Financial Independence, Retire Early) in the Indian context and turns it into a personal, month-by-month plan — including loans.

## What it does

| Step | What happens |
|---|---|
| **Discover** | A 7-question quiz matches you with Lean, Regular, Fat, Coast, Barista or Slow FIRE and explains all six. |
| **Plan** | Income, expenses by category, existing corpus (EPF/PPF/NPS/MF/FD/gold), India assumptions (6% inflation, 3.5% safe withdrawal rate, healthcare buffer). |
| **Loans** | Add every EMI. See avalanche vs snowball order, debt-free date, prepay-vs-invest comparison. Freed EMIs flow into your SIP automatically. |
| **Home** | Your FIRE number, freedom date, Freedom Flame, Freedom Ladder, projection chart, and plain-English insights. |
| **Track** | Log each month's income, spending and investments. Streaks, savings rate, running corpus. |
| **Calc** | A standalone FIRE calculator with every variant and a "what moves the number" table. |
| **Learn** | An 11-lesson guide: history, 4% rule vs India's 3–3.5%, instruments, taxes, buckets, Gen Z / Millennial / Gen X playbooks, common mistakes. |
| **More** | Breathing exercise, daily affirmations, JSON backup / restore. |

Everything is stored **only on your device** (browser `localStorage`). Nothing is uploaded.

## Use it

- **Web (online):** enable GitHub Pages for this repo (Settings → Pages → Source: *GitHub Actions*) and the workflow publishes `web/` automatically. Add it to your home screen — it installs as a PWA and works offline.
- **Web (offline):** download `web/index.html` and open it in any browser. No server needed.
- **Android APK:** every push to `main` builds `instinct.FIRE.apk` and attaches it to a **GitHub Release** (see the Releases tab) and to the workflow's artifacts. It is debug-signed, so sideload it: download on the phone → open → allow installs from this source.

## Build locally

```bash
# web: nothing to build — it's a single file
# android:
cp -r web/* android/app/src/main/assets/www/
cd android && gradle assembleRelease   # needs JDK 17 + Android SDK 34
```

## The maths (short version)

```
future annual expenses = today's monthly expenses × 12 × type multiplier × (1 + inflation)^years
FIRE number            = future annual expenses ÷ safe withdrawal rate  +  healthcare buffer
Coast number (today)   = FIRE number ÷ (1 + return)^years
```

Type multipliers: Lean 0.75× · Regular 1× · Fat 1.6× · Coast 1× · Barista (1 − part-time share) · Slow 1×.
Defaults: inflation 6%, pre-FIRE return 11%, SWR 3.5% (≈ 28.6× annual expenses), income growth 8%/yr.

## Disclaimer

Educational tool, not investment advice. Returns and inflation are assumptions, not promises. Talk to a SEBI-registered investment advisor for decisions about your own money.

---
Built by Savin Padencherry · instinct.finance family
