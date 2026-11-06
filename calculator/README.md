# instinct.SIP — SIP & Lumpsum calculator

A hand-drawn, offline Android app for showing clients how their money can grow, and sending them a PDF plan.

## What it does

| | What will it grow to? | How much to invest for a goal? |
|---|---|---|
| **SIP** | Monthly amount → future value | Target corpus → monthly SIP needed |
| **Lumpsum** | One-time amount → future value | Target corpus → one-time amount needed |

Every result shows what you invest, what the market adds, a year-by-year chart and table, and "another way to look at it" (the other route to the same goal, or what five more years would do).

**PDF report** — tap *Make PDF report*, add the client's name (and your name / contact, which the app remembers), then *Share PDF* (WhatsApp, Gmail…), *Save to phone* (Downloads/instinct.SIP) or *Preview*.

## The maths

```
SIP      FV = P × [((1 + i)^n − 1) / i] × (1 + i)     i = r/12/100, n = years × 12   (paid at the start of each month)
Lumpsum  FV = P × (1 + r/100)^t
Goal     same formulas solved for P
```

Checked against Groww's published examples (₹25,000/month, 12%, 10 yrs → ₹58,08,477; ₹25,000 once, 12%, 10 yrs → ₹77,646) and numpy-financial.

## Get the APK

Every push that touches `calculator/` builds `instinct.SIP.apk` and attaches it to a GitHub Release tagged `sip-v1.0.N` (see **Releases**). It is debug-signed for sideloading: download on the phone → open → allow installs from this source.

## Files

- `web/` — the app itself (HTML/CSS/JS, works in any browser too: open `web/index.html`)
  - `js/calc.js` — all calculations and wording
  - `js/doodles.js` — rough.js illustrations and charts
  - `js/report.js` — PDF report (jsPDF with embedded Baloo 2 + Caveat fonts)
- `android/` — WebView wrapper with a share/save bridge for the PDF

Fonts: Baloo 2 (Ek Type) and Caveat (Impallari Type), SIL Open Font License. Libraries: rough.js (MIT), jsPDF (MIT).

Illustration only, not investment advice. Mutual fund investments are subject to market risks.
