/* Thambi — Your money: personal finance, mutual funds, insurance and NPS. Original lessons. */
T({ id: 'pf', group: 'money', name: 'Personal finance', emoji: '👛', color: '#12B76A',
  blurb: 'Budget, safety net, compounding, debt and your retirement number.',
  link: VARSITY('personalfinance', 'Personal Finance') }, [

  L('Where does the money go?', '🧾', [
    ['pie:Needs=50%,Wants=30%,Savings=20%', 'A simple split', 'A starting rule: half for *needs*, about a third for *wants* and at least a fifth for *savings*.'],
    ['f:Income − Savings = Spending|Not the other way round', 'Pay yourself first', 'Move savings out on *salary day*. Spend what is left, instead of saving what is left.'],
    ['📱|Track one full month', 'Measure before you fix', 'Write down every rupee for one month. Most people are surprised by where it leaks.']
  ], [
    ['Take-home pay is ₹80,000. By the 50-30-20 rule, savings should be at least…', '₹8,000', '₹16,000', '₹24,000', 1, '20% of 80,000 = ₹16,000.'],
    ['"Pay yourself first" means…', 'Buy what you want first', 'Save on salary day, then spend the rest', 'Pay all bills late', 1, 'Savings leave the account before spending begins.']
  ]),

  L('The emergency fund', '🧯', [
    ['f:Monthly expenses × 6|₹40,000 × 6 = ₹2,40,000', 'Six months of breathing room', 'Keep about *six months of expenses* aside for job loss, illness or urgent repairs.'],
    ['🏦 💧', 'Keep it boring', 'Park it in a savings account, sweep FD or liquid fund. It must be *safe and quick* to reach, not high-return.'],
    ['vs:Emergency|Job loss;Hospital bill;Urgent travel home||Not an emergency|New phone;Sale season;A hot stock tip', 'Guard it', 'If you dip into it, refill it before investing again.']
  ], [
    ['Monthly expenses are ₹50,000. A six-month emergency fund is…', '₹50,000', '₹3,00,000', '₹6,00,000', 1, '50,000 × 6 = ₹3,00,000.'],
    ['The best home for an emergency fund is…', 'Small-cap shares', 'A safe, quickly reachable account or liquid fund', 'A 10-year lock-in plan', 1, 'Safety and speed matter more than return here.']
  ]),

  L('Compounding', '🌳', [
    ['line:1,1.76,3.1,5.47,9.65,17|₹1 lakh growing at 12% over 25 years', 'Growth on growth', 'Returns earn their own returns. The curve starts slow and then *bends upward*.'],
    ['f:Years to double ≈ 72 ÷ return %|72 ÷ 12 = 6 years', 'The rule of 72', 'A quick way to see how fast money doubles at any rate.'],
    ['bars:Start at 25=325=₹3.2 crore,Start at 35=95=₹95 lakh|₹5,000 a month at 12%, until age 60', 'Time beats amount', 'Starting ten years earlier gives more than *three times* the money, for the same monthly amount.']
  ], [
    ['At 9% a year, money doubles in about…', '6 years', '8 years', '12 years', 1, '72 ÷ 9 = 8.'],
    ['Two people invest the same monthly amount. Who ends with more at 60?', 'The one who starts earlier', 'The one who starts later', 'Both are equal', 0, 'Extra years let compounding do far more work.']
  ]),

  L('Inflation, the quiet thief', '🕵️', [
    ['bars:Today=50=₹50K,10 years=90=₹90K,20 years=160=₹1.6L,30 years=287=₹2.9L|Monthly cost of the same lifestyle, at 6% inflation', 'Same life, bigger bill', 'A ₹50,000 lifestyle today will cost about *₹1.6 lakh* a month in twenty years.'],
    ['f:Real return ≈ Return − Inflation|7% FD − 6% inflation = about 1%', 'What you really earn', 'Only the return *above* inflation makes you richer.'],
    ['🎓 🏥', 'Some prices run faster', 'Education and medical costs have often risen faster than the average. Plan those goals with a higher rate.']
  ], [
    ['Your investment earns 7%. Inflation is 6%. Real return is about…', '13%', '7%', '1%', 2, '7 − 6 = 1.'],
    ['At 6% inflation, prices roughly double in…', '6 years', '12 years', '24 years', 1, 'Rule of 72: 72 ÷ 6 = 12.']
  ]),

  L('Goals and the right mix', '🎯', [
    ['grid:#Money needed in,#Mostly use;Under 3 years,FD and debt funds;3 to 7 years,A mix of both;Over 7 years,Equity', 'Match money to time', 'The sooner you need the money, the *less risk* it should carry.'],
    ['pie:Equity=60%,Debt=30%,Gold=10%', 'Asset allocation', 'Your split between equity, debt and gold decides most of your result, more than which fund you pick.'],
    ['🔁|Once a year', 'Rebalance', 'When one part grows too big, shift some back to your target mix. It makes you *sell high and buy low*.']
  ], [
    ['You need a house down payment in two years. Keep it mostly in…', 'Small-cap shares', 'FDs and debt funds', 'Options', 1, 'Short goals cannot afford a market fall.'],
    ['Rebalancing means…', 'Selling everything', 'Bringing the mix back to your target', 'Buying last year\'s winner', 1, 'You trim what grew and add to what lagged.']
  ]),

  L('Good debt, bad debt', '💳', [
    ['vs:Can be useful|Home loan;Education loan;Builds an asset or income||Usually harmful|Credit card dues;Personal loan for a holiday;Buy now, pay later', 'Not all loans are equal', 'Ask: does this loan build something that *grows*, or pay for something that fades?'],
    ['bars:Home loan=9,Personal loan=14,Credit card=40|Rough yearly interest, %', 'The costliest debt', 'Unpaid credit card dues can cost around *40% a year*. Clear the highest-interest loan first.'],
    ['f:All EMIs together under 40% of take-home pay', 'A safe ceiling', 'Pay every bill on time and use well under your card limit. That is what builds a good credit score.']
  ], [
    ['Which debt usually costs the most?', 'Home loan', 'Education loan', 'Unpaid credit card dues', 2, 'Card interest is charged monthly and adds up to roughly 40% a year.'],
    ['With several loans, pay off first the one with…', 'The highest interest rate', 'The smallest EMI', 'The friendliest bank', 0, 'That saves the most money.']
  ]),

  L('How income tax slabs work', '🪜', [
    ['grid:#Taxable income,#Rate;Up to ₹4 lakh,Nil;₹4 to 8 lakh,5%;₹8 to 12 lakh,10%;₹12 to 16 lakh,15%;₹16 to 20 lakh,20%;₹20 to 24 lakh,25%;Above ₹24 lakh,30%|New regime, FY 2026-27', 'A staircase', 'Each slice of income is taxed at its *own* rate. Entering a higher slab does not raise the tax on the income below it.'],
    ['🎁|Rebate up to ₹12 lakh of taxable income', 'The rebate', 'Under the new regime, taxable income up to ₹12 lakh ends up with *zero tax* because of a rebate.'],
    ['vs:New regime|Lower rates;Very few deductions;The default||Old regime|Higher rates;80C, HRA, home loan deductions;Must opt in', 'Two regimes', 'Compare both each year. Rates change in budgets, so check the current slabs before you file.']
  ], [
    ['Your income moves into a higher slab. The higher rate applies to…', 'Your whole income', 'Only the income inside that slab', 'Last year\'s income', 1, 'Slabs are marginal: each slice has its own rate.'],
    ['Which regime applies if you choose nothing?', 'New regime', 'Old regime', 'Neither', 0, 'The new regime is the default.']
  ]),

  L('Your retirement number', '🏖️', [
    ['f:Corpus ≈ 25 to 30 × yearly expenses', 'How much is enough?', 'If you can live on about *3 to 4%* of your corpus each year, it can last decades.'],
    ['f:₹6 lakh a year × 30 = ₹1.8 crore|In today\'s rupees', 'A worked example', 'Then raise it for inflation: the same life will cost far more by the time you retire.'],
    ['flow:EPF>PPF>NPS>Equity funds', 'The tools', 'Use the retirement accounts you already have, and add equity for *growth* over long periods.']
  ], [
    ['Yearly expenses are ₹10 lakh. Using 30 times, the corpus needed is…', '₹1 crore', '₹3 crore', '₹30 crore', 1, '10 lakh × 30 = ₹3 crore.'],
    ['Why raise the retirement number over time?', 'Inflation', 'Brokerage', 'Dividends', 0, 'Future expenses will be higher than today\'s.']
  ])
]);

T({ id: 'mf', group: 'money', name: 'Mutual funds', emoji: '🧺', color: '#FF4F8B',
  blurb: 'How funds work, what they cost and how to choose them.',
  link: VARSITY('personalfinance', 'Personal Finance: Mutual Funds') }, [

  L('What a mutual fund is', '🧺', [
    ['flow:Many investors>One big pool>Fund manager>Shares and bonds', 'Pooling money', 'Thousands of people put money in one pot. A professional invests it, and everyone owns *units*.'],
    ['f:NAV = (Assets − Liabilities) ÷ Units', 'The price of one unit', '*NAV* is worked out every day after the market closes.'],
    ['f:₹10,000 ÷ NAV ₹50 = 200 units', 'Buying in', 'A high NAV does not mean a fund is expensive. Only the *growth* in NAV matters.']
  ], [
    ['You invest ₹5,000 at an NAV of ₹25. You get…', '125 units', '200 units', '5,000 units', 1, '5,000 ÷ 25 = 200.'],
    ['A fund with NAV ₹500 is costlier than one with NAV ₹20.', 'True', 'False', 'Only for SIPs', 1, 'NAV level means nothing. Percentage growth is what counts.']
  ]),

  L('Who is who in a fund', '🧑‍🤝‍🧑', [
    ['flow:Sponsor>Trustees>Fund house (AMC)>Fund manager', 'The chain', 'The fund house runs the scheme. *Trustees* watch over it on behalf of investors.'],
    ['🔐|Custodian', 'Where your money sits', 'The fund\'s shares and bonds are held by a separate *custodian*. They do not belong to the fund house.'],
    ['👮 📋', 'The rule makers', 'SEBI regulates mutual funds. Registrars like CAMS and KFintech keep the unit records.']
  ], [
    ['Who decides which shares the fund buys?', 'The custodian', 'The fund manager', 'The registrar', 1, 'The manager picks investments within the scheme\'s rules.'],
    ['The fund\'s securities are held by the…', 'Custodian', 'Fund manager personally', 'Distributor', 0, 'Keeping assets separate protects investors.']
  ]),

  L('Direct, regular and costs', '💸', [
    ['vs:Direct plan|Bought from the fund house;No commission;Lower cost||Regular plan|Bought through a distributor;Commission built in;Higher cost', 'Two doors, same fund', 'The portfolio is identical. Only the *cost* differs.'],
    ['f:Expense ratio = yearly fee as % of your money|Taken out of the NAV every day', 'The expense ratio', 'You never see a bill. The fee is quietly deducted from the NAV.'],
    ['bars:Earning 12%=100=₹1.00 crore,Earning 11%=87=₹87 lakh|₹10,000 a month for 20 years', 'One per cent is huge', 'A 1% higher cost can eat about *₹13 lakh* over twenty years.']
  ], [
    ['The expense ratio is charged…', 'Once, when you buy', 'Every year, as a % of your investment', 'Only when you sell', 1, 'It is an ongoing yearly cost built into the NAV.'],
    ['Which plan of the same fund has the lower cost?', 'Direct', 'Regular', 'They cost the same', 0, 'Direct plans carry no distributor commission.']
  ]),

  L('Types of equity funds', '🗂️', [
    ['grid:#Fund type,#Invests in;Large cap,The 100 biggest companies;Mid cap,Companies ranked 101 to 250;Small cap,Companies ranked 251 onward;Flexi cap,Any size;ELSS,Tax saver with a 3-year lock', 'Sorted by company size', 'SEBI defines the categories, so a "large cap" fund means the same thing at every fund house.'],
    ['bars:Large cap=1=Calmer,Mid cap=2=Bumpier,Small cap=3=Wildest|Size of the swings', 'Size and bumpiness', 'Smaller companies can grow faster and fall harder. Hold them only for *long* goals.'],
    ['🎯|Sector and thematic funds', 'Narrow bets', 'A fund that buys only one sector or theme is concentrated. Treat it as a side dish.']
  ], [
    ['A small-cap fund mainly invests in companies ranked…', '1 to 100', '101 to 250', '251 onward', 2, 'By market cap, small caps start at rank 251.'],
    ['The lock-in period of an ELSS fund is…', '1 year', '3 years', '5 years', 1, 'ELSS units are locked for three years.']
  ]),

  L('Debt funds', '🏦', [
    ['🤝 🏛️ 🏢', 'Funds that lend', 'A debt fund lends your money to governments and companies and earns *interest*.'],
    ['vs:Interest rate risk|Rates rise, bond prices fall;Bigger for long-term bonds||Credit risk|The borrower may not repay;Bigger for low-rated borrowers', 'Two risks', 'Debt funds are *not* fixed deposits. The NAV can fall.'],
    ['grid:#Type,#Lends for;Liquid,Up to about 3 months;Short duration,1 to 3 years;Gilt,Government only;Credit risk,Lower-rated companies', 'Pick by time', 'Match the fund\'s lending period to how long *you* can stay invested.']
  ], [
    ['Interest rates rise sharply. A long-duration debt fund\'s NAV will likely…', 'Rise', 'Fall', 'Not move', 1, 'Bond prices fall when rates rise, more so for long bonds.'],
    ['Money you need in a few weeks fits best in a…', 'Liquid fund', 'Small-cap fund', 'Credit risk fund', 0, 'Liquid funds lend for very short periods.']
  ]),

  L('Index funds and ETFs', '🪞', [
    ['🪞|Copy the index, do not beat it', 'Passive investing', 'An *index fund* simply buys every share in an index like the Nifty 50, in the same proportion.'],
    ['bars:Index fund=0.2,Active fund=1.2|Typical yearly cost, %', 'Why people like them', 'Costs are tiny, and many active large-cap funds *fail to beat* the index after fees.'],
    ['vs:Index fund|Buy from the fund house at NAV;SIP is easy||ETF|Trades on the exchange like a share;Needs a demat account', 'Two wrappers', 'Check the *tracking error*: the gap between the fund\'s return and the index.']
  ], [
    ['An index fund tries to…', 'Beat the market', 'Match its index', 'Avoid shares', 1, 'It mirrors the index at low cost.'],
    ['Tracking error is the gap between…', 'Fund return and index return', 'Two fund managers', 'NAV and price of gold', 0, 'Smaller is better.']
  ]),

  L('SIP and rupee cost averaging', '📅', [
    ['grid:#Month,#NAV ₹,#Units for ₹1~000;Jan,50,20;Feb,40,*25;Mar,50,20|65 units for ₹3,000', 'Same amount, every month', 'A *SIP* invests a fixed sum on a fixed date. When prices fall, the same money buys more units.'],
    ['f:Average cost = ₹3,000 ÷ 65 units = ₹46.15|Lower than the average NAV of ₹46.67', 'Averaging', 'You automatically buy *more when cheap* and less when costly.'],
    ['📈|Raise the SIP every year', 'Step up', 'Increase the amount by about 10% each year as your income grows. It changes the final number a lot.']
  ], [
    ['With a fixed SIP, when the NAV falls you get…', 'Fewer units', 'More units', 'The same units', 1, 'The same rupees buy more units at a lower price.'],
    ['A step-up SIP means…', 'Stopping in a fall', 'Raising the amount every year', 'Switching funds monthly', 1, 'Your investing grows with your income.']
  ]),

  L('Reading returns', '📏', [
    ['f:CAGR = (End value ÷ Start value)^(1 ÷ years) − 1', 'Yearly growth rate', '*CAGR* turns a total gain into a smooth per-year figure, so funds can be compared.'],
    ['f:₹1 lakh → ₹2 lakh in 6 years ≈ 12% a year', 'Example', 'Doubling in six years is about 12% CAGR, as the rule of 72 predicts.'],
    ['vs:CAGR|One investment, one date||XIRR|Many investments on many dates;Use this for SIPs', 'For SIPs use XIRR', 'Also look at *rolling returns*: how the fund did over every 3- or 5-year stretch, not one lucky period.']
  ], [
    ['₹1 lakh becomes ₹2 lakh in 6 years. The CAGR is about…', '12%', '17%', '100%', 0, 'Rule of 72: 72 ÷ 6 = 12.'],
    ['The right return measure for a SIP is…', 'Absolute return', 'XIRR', 'NAV', 1, 'XIRR handles many cash flows on different dates.']
  ]),

  L('Measuring risk', '🎢', [
    ['line:10,11,10.5,11.5,11,12/10,13,9,14,8,13|A steady fund and a jumpy fund', 'Standard deviation', 'It measures how widely returns *swing* around their average. Bigger swings mean more risk.'],
    ['f:Beta 1.2 = moves about 20% more than the market', 'Beta', 'Beta compares the fund\'s moves with the market\'s. Below 1 is calmer than the market.'],
    ['f:Sharpe = (Return − Risk-free return) ÷ Standard deviation', 'Sharpe ratio', 'Return earned *per unit of risk*. Higher is better.']
  ], [
    ['Fund A: return 14%, deviation 14. Fund B: return 12%, deviation 8. Risk-free 7%. Better Sharpe ratio?', 'Fund A', 'Fund B', 'Equal', 1, 'A: 7 ÷ 14 = 0.5. B: 5 ÷ 8 = 0.625.'],
    ['A beta of 1.2 means the fund…', 'Moves more than the market', 'Never falls', 'Moves less than the market', 0, 'It amplifies market moves by about 20%.']
  ]),

  L('Tax on mutual funds', '🧾', [
    ['vs:Equity funds|Held up to 12 months: 20%;Longer: 12.5% above ₹1.25 lakh a year||Debt funds|Gains added to your income;Taxed at your slab rate', 'Two tax worlds', 'A fund counts as equity if it holds at least *65% in Indian shares*. Rates shown are for FY 2026-27.'],
    ['🔢|First in, first out', 'Which units are sold?', 'When you redeem, the *oldest units* go first. That decides whether each gain is short or long term.'],
    ['📜|Check current rules', 'Rules change', 'Debt fund taxation changed in 2023 and equity rates in 2024. Confirm before you redeem.']
  ], [
    ['Gains on a debt fund bought today are taxed…', 'At your slab rate', 'At a flat 12.5%', 'Never', 0, 'They are added to your income.'],
    ['You sell an equity fund after 2 years with a ₹1 lakh gain, your only gain this year. Tax is…', '₹12,500', '₹20,000', 'Zero', 2, 'Long-term gains up to ₹1.25 lakh a year are exempt.']
  ]),

  L('Build your fund portfolio', '🧱', [
    ['pie:Index core=70%,Your ideas=30%', 'Core and satellite', 'Keep most of your money in a low-cost *core*. Use a small part for ideas you believe in.'],
    ['🧩|Three to five funds are enough', 'Do not collect funds', 'Five large-cap funds hold nearly the same shares. More funds add *overlap*, not safety.'],
    ['🏁|Last year\'s winner rarely repeats', 'Do not chase', 'Review once a year. Change a fund for a reason, not because another one topped a chart.']
  ], [
    ['Owning five large-cap funds mostly gives you…', 'Five times the safety', 'Overlap', 'Guaranteed returns', 1, 'They buy from the same 100 companies.'],
    ['Picking funds only by last year\'s top return is…', 'Unreliable', 'The best method', 'Required by SEBI', 0, 'Top performers change from year to year.']
  ])
]);

T({ id: 'ins', group: 'money', name: 'Insurance and NPS', emoji: '☂️', color: '#2E9BFF',
  blurb: 'Cover the big risks, then build a pension.',
  link: VARSITY('insurance', 'Personal Finance: Insurance, and the NPS module') }, [

  L('Term insurance', '☂️', [
    ['☂️ 👨‍👩‍👧', 'Pure protection', 'You pay a premium. If you die during the term, your family gets a large sum. If you live, you get *nothing back*, which is why it is cheap.'],
    ['f:Cover ≈ 10 to 15 × yearly income + loans', 'How much?', 'The cover should replace your income for the people who depend on it.'],
    ['🙋|Only if someone depends on your income', 'Who needs it', 'No dependents and no loans? You may not need it yet. Buy early when you do: premiums rise with age.']
  ], [
    ['Yearly income ₹12 lakh, home loan ₹30 lakh. A sensible minimum cover is about…', '₹30 lakh', '₹1.5 crore', '₹12 lakh', 1, '12 lakh × 10 + 30 lakh = ₹1.5 crore.'],
    ['If you outlive a plain term plan, you receive…', 'All premiums with interest', 'Nothing', 'Double the cover', 1, 'It is pure protection, like car insurance.']
  ]),

  L('Health insurance', '🏥', [
    ['grid:#Word,#Meaning;Sum insured,Most the insurer pays in a year;Waiting period,Time before some illnesses are covered;Co-pay,Your share of each claim;Cashless,Hospital is paid directly;Room rent limit,Cap on the room charge', 'Five words to know', 'Read these in the policy *before* you buy, not at the hospital.'],
    ['🏢 ➕ 👤', 'Not only the office policy', 'Employer cover ends when the job ends. Keep a *personal* policy as well.'],
    ['🧢|Super top-up', 'Cheap extra cover', 'A super top-up pays only after bills cross a set amount. It adds a large cover for a small premium.']
  ], [
    ['Your policy has a 10% co-pay. On a ₹2 lakh claim you pay…', '₹2,000', '₹20,000', '₹1,80,000', 1, '10% of 2,00,000 = ₹20,000.'],
    ['Why keep a personal health policy besides the employer\'s?', 'Employer cover ends with the job', 'It is illegal not to', 'It doubles your salary', 0, 'A job change or loss should not leave you uncovered.']
  ]),

  L('Keep insurance and investing apart', '🥣', [
    ['vs:Savings-type policy|Small life cover;Low returns;Long lock-in||Term plan + mutual fund|Large life cover;Market-linked growth;Flexible', 'Two ways to spend the same premium', 'Policies that mix insurance and investment often do *neither* job well.'],
    ['f:Insurance protects. Investments grow.', 'One job each', 'Ask of any product: what is the cover, what is the real yearly return and what does it cost to exit?'],
    ['🚪|Surrender value', 'Check before exiting', 'Leaving a traditional policy early can return less than you paid. Compare before you stop or continue.']
  ], [
    ['The main purpose of life insurance is to…', 'Beat the stock market', 'Protect dependents from loss of income', 'Save tax only', 1, 'Protection first. Returns belong elsewhere.'],
    ['Before buying a bundled policy, check its…', 'Brochure colours', 'Cover, real return and exit cost', 'Agent\'s targets', 1, 'Those three numbers tell you what you are buying.']
  ]),

  L('NPS basics', '🧓', [
    ['🧓 🪙', 'A pension account', 'The *National Pension System* is a low-cost retirement account regulated by PFRDA.'],
    ['pie:Equity (E)=50%,Corporate bonds (C)=30%,Govt securities (G)=20%|One example mix', 'Three ingredients', 'You choose the mix yourself (active choice) or let it shift from equity to debt as you age (*auto choice*).'],
    ['vs:Tier I|The pension account;Locked for retirement;Tax benefits||Tier II|Optional savings account;Withdraw any time;No special tax benefit', 'Two tiers', 'Tier I is the real NPS. Tier II is an add-on.']
  ], [
    ['Who regulates the NPS?', 'SEBI', 'PFRDA', 'IRDAI', 1, 'The Pension Fund Regulatory and Development Authority.'],
    ['Under auto choice, as you get older the equity share…', 'Rises', 'Falls', 'Stays fixed', 1, 'The mix becomes safer near retirement.']
  ]),

  L('NPS: tax and exit', '🚪', [
    ['pie:Lump sum (up to)=80%,Annuity (at least)=20%|Non-government subscribers, larger corpus', 'At retirement', 'Part of the corpus can be taken out and the rest buys an *annuity*. The split depends on your sector and corpus size.'],
    ['📆 💵', 'What an annuity is', 'You hand a lump sum to an insurer and receive a *pension* for life.'],
    ['🧾|Employer contribution is deductible, within limits', 'Tax help', 'Your employer\'s NPS contribution gets a deduction even in the new regime. Exit rules were relaxed in late 2025, so check the current ones.']
  ], [
    ['An annuity gives you…', 'A one-time bonus', 'A regular pension', 'Free shares', 1, 'A lump sum is converted into regular income.'],
    ['NPS exit rules are the same for every subscriber.', 'True', 'False', 'Only in Tier II', 1, 'They differ for government and non-government subscribers and by corpus size.']
  ]),

  L('Nominees and paperwork', '📂', [
    ['✍️|Bank, demat, funds, insurance, EPF, NPS', 'Add a nominee everywhere', 'A *nominee* lets your family reach the money quickly. Check every account today.'],
    ['📜|A will decides who finally owns it', 'Write a will', 'A nominee receives the money. A *will* decides who it belongs to. A simple one prevents long disputes.'],
    ['🗂️ 👨‍👩‍👧', 'One list, shared', 'Keep one list of all accounts and policies, and tell a trusted family member where it is.']
  ], [
    ['Adding a nominee mainly helps your family to…', 'Pay less tax', 'Reach the money quickly', 'Get higher returns', 1, 'It avoids delays in claiming.'],
    ['The document that decides final ownership is…', 'The nomination form', 'A will', 'The account statement', 1, 'A nominee holds the money for the legal heirs.']
  ])
]);
