/* instinct.SIP — calculation engine (pure functions, no DOM).
 *
 * SIP   : monthly instalment paid at the START of each month (annuity due),
 *         compounded monthly at r/12 — the same convention Groww and most
 *         AMC calculators use.
 *         FV = P × [((1 + i)^n − 1) / i] × (1 + i),  i = r / 12 / 100,  n = years × 12
 * Lumpsum: one-time amount compounded yearly.
 *         FV = P × (1 + r/100)^years
 * Goal modes invert the same formulas, so a goal answer fed back into the
 * "grow" calculator lands exactly on the target.
 */
(function (root) {
  'use strict';

  function months(years) { return Math.round(years * 12); }

  /** Growth factor for ₹1 per month over n months (annuity due). */
  function sipFactor(ratePct, years) {
    var n = months(years);
    var i = ratePct / 1200;
    if (i === 0) return n;
    return ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }

  function sipFV(P, ratePct, years) { return P * sipFactor(ratePct, years); }
  function sipRequired(target, ratePct, years) { return target / sipFactor(ratePct, years); }
  function lumpFV(P, ratePct, years) { return P * Math.pow(1 + ratePct / 100, years); }
  function lumpRequired(target, ratePct, years) { return target / Math.pow(1 + ratePct / 100, years); }

  /** Year-by-year growth table for a SIP of P. */
  function sipSchedule(P, ratePct, years) {
    var rows = [];
    for (var y = 1; y <= Math.ceil(years); y++) {
      var yrs = Math.min(y, years);
      rows.push({ year: y, invested: P * months(yrs), value: sipFV(P, ratePct, yrs) });
    }
    return rows;
  }

  /** Year-by-year growth table for a lumpsum of P. */
  function lumpSchedule(P, ratePct, years) {
    var rows = [];
    for (var y = 1; y <= Math.ceil(years); y++) {
      var yrs = Math.min(y, years);
      rows.push({ year: y, invested: P, value: lumpFV(P, ratePct, yrs) });
    }
    return rows;
  }

  /**
   * Main entry point.
   * kind: 'sip' | 'lump'      mode: 'grow' | 'goal'
   * amount: monthly SIP / lumpsum (grow)  or  target corpus (goal)
   * Returns everything the UI and the PDF need.
   */
  function compute(kind, mode, amount, ratePct, years) {
    var r = {
      kind: kind, mode: mode, rate: ratePct, years: years,
      instalment: 0,        // monthly SIP or one-time lumpsum
      invested: 0,          // total money put in
      value: 0,             // value at the end
      gains: 0,             // value − invested
      target: mode === 'goal' ? amount : null,
      schedule: [],
      alt: null             // "another way to look at it"
    };

    if (kind === 'sip') {
      r.instalment = mode === 'grow' ? amount : sipRequired(amount, ratePct, years);
      r.value = mode === 'grow' ? sipFV(amount, ratePct, years) : amount;
      r.invested = r.instalment * months(years);
      r.schedule = sipSchedule(r.instalment, ratePct, years);
    } else {
      r.instalment = mode === 'grow' ? amount : lumpRequired(amount, ratePct, years);
      r.value = mode === 'grow' ? lumpFV(amount, ratePct, years) : amount;
      r.invested = r.instalment;
      r.schedule = lumpSchedule(r.instalment, ratePct, years);
    }
    r.gains = r.value - r.invested;
    r.multiple = r.invested > 0 ? r.value / r.invested : 0;

    if (mode === 'goal') {
      // Same goal, the other route.
      if (kind === 'sip') {
        r.alt = { type: 'route', kind: 'lump', instalment: lumpRequired(amount, ratePct, years) };
      } else {
        var sip = sipRequired(amount, ratePct, years);
        r.alt = { type: 'route', kind: 'sip', instalment: sip, invested: sip * months(years) };
      }
    } else {
      // Patience bonus: the same plan, five more years.
      var extra = 5;
      var later = kind === 'sip' ? sipFV(amount, ratePct, years + extra) : lumpFV(amount, ratePct, years + extra);
      r.alt = { type: 'patience', extraYears: extra, value: later };
    }
    return r;
  }

  /* ---------- Indian number formatting ---------- */

  function groupIN(n) {
    // 12,34,56,789 grouping without relying on Intl (older WebViews).
    var s = String(Math.round(Math.abs(n)));
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    if (rest) last3 = ',' + last3;
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return (n < 0 ? '-' : '') + rest + last3;
  }

  function rupees(n) { return '₹' + groupIN(n); }

  /** Short words: ₹1.25 Cr, ₹45.6 L, ₹12.5 K */
  function short(n) {
    var a = Math.abs(n);
    function trim(x, d) { return x.toFixed(d).replace(/\.?0+$/, ''); }
    if (a >= 1e7) return '₹' + trim(n / 1e7, 2) + ' Cr';
    if (a >= 1e5) return '₹' + trim(n / 1e5, 2) + ' L';
    if (a >= 1e3) return '₹' + trim(n / 1e3, 1) + ' K';
    return '₹' + Math.round(n);
  }

  /** Long words: "1.25 crore", "45.6 lakh" — for helper text under inputs. */
  function words(n) {
    var a = Math.abs(n);
    function trim(x, d) { return x.toFixed(d).replace(/\.?0+$/, ''); }
    if (a >= 1e7) return trim(n / 1e7, 2) + ' crore';
    if (a >= 1e5) return trim(n / 1e5, 2) + ' lakh';
    if (a >= 1e3) return trim(n / 1e3, 2) + ' thousand';
    return String(Math.round(n));
  }

  /** All the words shown for a result — shared by the app and the PDF. */
  function describe(r) {
    var R = rupees, yrs = r.years + (r.years === 1 ? ' year' : ' years');
    var rate = (Math.round(r.rate * 100) / 100) + '%';
    var d = {};
    if (r.kind === 'sip' && r.mode === 'grow') {
      d.question = 'Your SIP could grow to';
      d.bigLabel = 'Estimated value';
      d.big = r.value;
      d.sub = 'investing ' + R(r.instalment) + ' every month for ' + yrs + ' at ' + rate;
      d.scenario = 'A monthly SIP of ' + R(r.instalment) + ' for ' + yrs + ', assuming ' + rate + ' a year';
      d.title = 'SIP growth plan';
      d.story = 'Drop a little in every month. Time does the heavy lifting.';
    } else if (r.kind === 'sip') {
      d.question = 'Start a monthly SIP of';
      d.bigLabel = 'Monthly SIP needed';
      d.big = r.instalment;
      d.sub = 'to reach ' + R(r.target) + ' in ' + yrs + ' at ' + rate;
      d.scenario = 'Goal: ' + R(r.target) + ' in ' + yrs + ' through a monthly SIP, assuming ' + rate + ' a year';
      d.title = 'SIP goal plan';
      d.story = 'Pick the goal. We will find the monthly amount.';
    } else if (r.mode === 'grow') {
      d.question = 'Your lumpsum could grow to';
      d.bigLabel = 'Estimated value';
      d.big = r.value;
      d.sub = 'investing ' + R(r.instalment) + ' once, for ' + yrs + ' at ' + rate;
      d.scenario = 'A one-time investment of ' + R(r.instalment) + ' for ' + yrs + ', assuming ' + rate + ' a year';
      d.title = 'Lumpsum growth plan';
      d.story = 'Invest once, then let it compound quietly.';
    } else {
      d.question = 'Invest this much today';
      d.bigLabel = 'One-time investment needed';
      d.big = r.instalment;
      d.sub = 'to reach ' + R(r.target) + ' in ' + yrs + ' at ' + rate;
      d.scenario = 'Goal: ' + R(r.target) + ' in ' + yrs + ' through a one-time investment, assuming ' + rate + ' a year';
      d.title = 'Lumpsum goal plan';
      d.story = 'Pick the goal. We will find the one-time amount.';
    }
    var a = r.alt;
    if (a.type === 'patience') {
      d.altTitle = 'Stay invested ' + a.extraYears + ' more years';
      d.altBody = ['The same plan held for ' + (r.years + a.extraYears) + ' years could become ', R(a.value), '.'];
    } else if (a.kind === 'lump') {
      d.altTitle = 'Or invest once, today';
      d.altBody = ['A one-time ', R(a.instalment), ' now reaches the same goal.'];
    } else {
      d.altTitle = 'Or spread it out every month';
      d.altBody = ['A SIP of ', R(a.instalment), ' a month gets there too (' + R(a.invested) + ' put in over time).'];
    }
    d.multiple = r.invested > 0 ? 'Every ' + '₹' + '1 you put in could become ' + '₹' + (r.value / r.invested).toFixed(2) : '';
    d.multipleHand = r.invested > 0 ? 'Your money grows ' + (r.value / r.invested).toFixed(1) + ' times' : '';
    return d;
  }

  var api = {
    describe: describe,
    sipFactor: sipFactor, sipFV: sipFV, sipRequired: sipRequired,
    lumpFV: lumpFV, lumpRequired: lumpRequired,
    sipSchedule: sipSchedule, lumpSchedule: lumpSchedule,
    compute: compute, groupIN: groupIN, rupees: rupees, short: short, words: words,
    months: months
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Calc = api;
})(this);
