/* Thambi — Stock markets, part 2: futures, options, tax and other markets, risk, sectors. Original lessons. */
T({ id: 'fut', after: 'basics', group: 'markets', name: 'Futures', emoji: '⏳', color: '#FF7A1A',
  blurb: 'Contracts, margin, leverage and hedging.',
  link: VARSITY('futures-trading', 'Futures Trading') }, [

  L('From forwards to futures', '🤝', [
    ['🌾 🤝 🍞', 'A deal about tomorrow', 'A farmer and a baker fix *today* the price of wheat to be delivered in three months. That is a forward contract.'],
    ['vs:Forward|Private deal;Other side may back out;Hard to exit||Future|Traded on an exchange;Clearing house guarantees it;Exit any time', 'Why futures exist', 'A *future* is a standardised forward that trades on an exchange, with a guarantor in the middle.'],
    ['🧬|Derived from a share, an index, gold…', 'Derivative', 'A future has no value of its own. It is *derived* from the price of something else, the underlying.']
  ], [
    ['A futures contract improves on a forward mainly by…', 'Removing all risk', 'Adding an exchange guarantee and easy exit', 'Being free to trade', 1, 'Price risk stays. Counterparty risk and exit problems go.'],
    ['A derivative gets its value from…', 'Its underlying asset', 'The broker', 'SEBI', 0, 'That is why it is called a derivative.']
  ]),

  L('Reading a futures contract', '📜', [
    ['grid:#Term,#Meaning;Underlying,The share or index;Lot size,Fixed number of units;Expiry,Last day of the contract;Contract value,Price × lot size', 'Four things to read', 'You cannot buy one unit. Futures trade in fixed *lots*, and every contract has an *expiry*.'],
    ['f:Contract value = Futures price × Lot size|₹1,000 × 500 = ₹5,00,000', 'How big is it?', 'One lot can control several lakh rupees of shares.'],
    ['flow:Near month>Next month>Far month', 'Three contracts at a time', 'Before expiry you can *square off* (close) or *roll over* to the next month.']
  ], [
    ['Futures price ₹800, lot size 250. Contract value is…', '₹2,00,000', '₹20,000', '₹1,050', 0, '800 × 250 = ₹2,00,000.'],
    ['Futures are bought and sold in…', 'Single shares', 'Fixed lots', 'Any amount you like', 1, 'The exchange fixes the lot size for each contract.']
  ]),

  L('Margin and leverage', '🎚️', [
    ['bars:Contract value=500=₹5 lakh,Margin you pay=75=₹75K|You control the big bar with the small one', 'A deposit, not the full price', 'To trade a ₹5 lakh contract you block only a *margin*, perhaps 15% of its value.'],
    ['f:Leverage = Contract value ÷ Margin|5,00,000 ÷ 75,000 ≈ 6.7 times', 'Leverage', 'Leverage multiplies your exposure. Here every ₹1 of yours controls about ₹6.70.'],
    ['⚠️|A 5% move becomes about 33% on your margin', 'It cuts both ways', 'Leverage magnifies *losses* exactly as much as profits. This is where most beginners get hurt.']
  ], [
    ['Contract value ₹5 lakh, margin ₹1 lakh. Leverage is…', '5 times', '0.2 times', '50 times', 0, '5,00,000 ÷ 1,00,000 = 5.'],
    ['With 5 times leverage, a 4% fall in price costs about…', '4% of your margin', '20% of your margin', '0.8% of your margin', 1, '4% × 5 = 20%.']
  ]),

  L('Mark to market', '📆', [
    ['grid:#Day,#Close ₹,#Your P&L;Buy,1~000,-;Day 1,1~010,*+5~000;Day 2,995,*−7~500|One lot of 500, bought at ₹1,000', 'Settled every evening', 'Each day your position is repriced at the close. Profit is *credited* and loss is *debited* daily.'],
    ['f:Daily P&L = (Today\'s close − Yesterday\'s close) × Lot size', 'The sum', 'Day 2 above: (995 − 1,010) × 500 = a loss of ₹7,500.'],
    ['📞|Margin call', 'Top up or exit', 'If losses eat into your margin, the broker asks for more money. If you do not pay, the position is closed.']
  ], [
    ['You are long one lot of 500 at ₹1,000. It closes at ₹1,020. Today\'s P&L is…', '+₹10,000', '+₹20', '−₹10,000', 0, '(1,020 − 1,000) × 500 = ₹10,000.'],
    ['Mark-to-market settlement happens…', 'Only at expiry', 'Every trading day', 'Once a month', 1, 'Futures profits and losses are settled daily.']
  ]),

  L('Going short and hedging', '🛡️', [
    ['flow:Sell future at ₹1,000>Price falls to ₹950>Buy back>Gain ₹50 × lot', 'Shorting is easy here', 'With futures you can sell first and carry the position for days, unlike shares.'],
    ['💼 ➕ 🛡️', 'Hedging', 'You hold shares and fear a fall. *Short futures* against them: what the shares lose, the futures gain.'],
    ['vs:Speculator|Takes on risk;Wants profit||Hedger|Already has risk;Wants protection', 'Two kinds of users', 'A hedge gives up some profit to buy peace of mind.']
  ], [
    ['A hedger uses futures to…', 'Reduce a risk they already have', 'Double their profit', 'Avoid paying tax', 0, 'Hedging offsets an existing exposure.'],
    ['You short a future at ₹500 and buy back at ₹470. Lot size 1,000. You make…', '₹30', '₹30,000', '₹4,70,000', 1, '(500 − 470) × 1,000 = ₹30,000.']
  ]),

  L('Futures price and open interest', '🔍', [
    ['f:Futures price ≈ Spot price + interest cost − dividends|The gap is called the basis', 'Why futures cost a bit more', 'The future usually trades slightly above the spot. The gap shrinks to *zero at expiry*.'],
    ['grid:#Price,#Open interest,#Reading;Up,Up,*Fresh buying;Down,Up,*Fresh shorting;Up,Down,Shorts closing;Down,Down,Longs closing', 'Reading open interest', '*Open interest* is the number of contracts still open. Read it together with price.'],
    ['vs:Volume|Trades done today;Resets daily||Open interest|Positions still alive;Carries forward', 'Volume is not OI', 'Volume counts activity. Open interest counts *commitment*.']
  ], [
    ['Price rises and open interest rises. This suggests…', 'Fresh buying', 'Shorts closing', 'Nothing at all', 0, 'New long positions are being built.'],
    ['At expiry, the futures price and spot price…', 'Drift far apart', 'Converge', 'Are unrelated', 1, 'The basis goes to zero on expiry day.']
  ])
]);

T({ id: 'opt', after: 'fut', group: 'markets', name: 'Options', emoji: '🎟️', color: '#0FB9B1',
  blurb: 'Calls, puts, premiums, the Greeks and classic strategies.',
  link: VARSITY('option-theory', 'Options Theory, then Option Strategies') }, [

  L('A right, not a duty', '🎟️', [
    ['🏡 💰 🎟️', 'The token advance', 'You pay ₹1 lakh to lock a plot at ₹50 lakh for six months. If prices jump, you buy. If they crash, you *walk away* and lose only the token.'],
    ['flow:Premium = the token>Strike = the locked price>Expiry = the deadline', 'Three words', 'Every option has a *premium*, a *strike* price and an *expiry* date.'],
    ['vs:Buyer|Pays the premium;Has the right;Loss limited to premium||Seller|Receives the premium;Has the duty;Loss can be large', 'Two sides', 'The buyer chooses. The seller (or writer) must honour the deal.']
  ], [
    ['The most an option buyer can lose is…', 'The premium paid', 'The strike price', 'Unlimited', 0, 'The buyer can simply let the option expire.'],
    ['The locked-in price of an option is its…', 'Premium', 'Strike', 'Margin', 1, 'Strike is the price at which the right can be used.']
  ]),

  L('Call options', '📞', [
    ['📞 📈', 'The right to buy', 'A *call* lets you buy at the strike. You buy calls when you expect the price to *rise*.'],
    ['line:-5,-5,-5,0,5,10,15|Buy a ₹100 call for ₹5: P&L as the price goes 90 → 120', 'The hockey stick', 'Below the strike you lose only the premium. Above it, profit grows with the price.'],
    ['f:Break-even = Strike + Premium|100 + 5 = ₹105', 'Where you start winning', 'The price must rise past the strike *plus* what you paid.']
  ], [
    ['You buy a ₹200 call for ₹8. Your break-even is…', '₹192', '₹200', '₹208', 2, 'Strike 200 + premium 8.'],
    ['Same call. At expiry the share is at ₹230. Profit per share is…', '₹22', '₹30', '₹38', 0, '230 − 200 − 8 = 22.']
  ]),

  L('Put options', '🪂', [
    ['🪂 📉', 'The right to sell', 'A *put* lets you sell at the strike. It gains when the price *falls*, like insurance.'],
    ['line:15,10,5,0,-5,-5,-5|Buy a ₹100 put for ₹5: P&L as the price goes 80 → 110', 'Mirror image', 'The lower the price goes, the more the put earns. Above the strike you lose only the premium.'],
    ['f:Break-even = Strike − Premium|100 − 5 = ₹95', 'Where you start winning', 'The price must fall below the strike *minus* what you paid.']
  ], [
    ['You buy a ₹500 put for ₹20. At expiry the share is ₹450. Profit per share is…', '₹30', '₹50', '₹70', 0, '500 − 450 − 20 = 30.'],
    ['You buy a put when you expect the price to…', 'Rise', 'Fall', 'Stay flat', 1, 'A put gains value as the price drops.']
  ]),

  L('In, at or out of the money', '🎯', [
    ['grid:#Strike,#Call is,#Put is;90,*In the money,Out of the money;100,At the money,At the money;110,Out of the money,*In the money|Share price: ₹100', 'Moneyness', 'An option is *in the money* if using it right now would pay something.'],
    ['f:Intrinsic value of a call = Share price − Strike|Never less than zero', 'Intrinsic value', 'With the share at ₹100, a ₹90 call has ₹10 of real, usable value.'],
    ['vs:In the money|Costs more;Moves closely with the share||Out of the money|Cheap;Usually expires worthless', 'Cheap is not a bargain', 'Out-of-the-money options look cheap because the odds are *against* them.']
  ], [
    ['Share price ₹1,000. A ₹950 call is…', 'In the money', 'At the money', 'Out of the money', 0, 'You could buy at 950 what trades at 1,000.'],
    ['Its intrinsic value is…', '₹0', '₹50', '₹950', 1, '1,000 − 950 = 50.']
  ]),

  L('What is inside a premium', '🧅', [
    ['f:Premium = Intrinsic value + Time value', 'Two layers', 'Part of the premium is real value today. The rest is the price of *hope*.'],
    ['bars:Intrinsic=50,Time value=22,Premium=72|Share at ₹1,000, the ₹950 call', 'Peel it', 'This call costs ₹72. ₹50 is intrinsic, so buyers pay ₹22 for the time left.'],
    ['line:22,21,19,17,14,10,5,0|Time value melting as expiry comes closer', 'The ice cube', 'Time value *melts* every day and reaches zero at expiry. The melt speeds up near the end.']
  ], [
    ['Share ₹300, a ₹280 call costs ₹27. Its time value is…', '₹7', '₹20', '₹27', 0, 'Intrinsic is 20, so time value is 27 − 20 = 7.'],
    ['At expiry, time value is…', 'At its highest', 'Zero', 'Equal to the strike', 1, 'No time left, no time value.']
  ]),

  L('Selling options', '🏦', [
    ['line:5,5,5,0,-5,-10,-15|Sell a ₹100 call for ₹5: P&L as the price goes 90 → 120', 'The other side', 'The seller pockets the premium if the option dies worthless, but the loss grows if the price runs away.'],
    ['🪙🪙🪙 💥', 'Small wins, rare big loss', 'Most options expire worthless, so sellers win often. One violent move can erase *months* of premiums.'],
    ['vs:Buyer|Pays only the premium||Seller|Must block margin;Faces margin calls', 'Margin', 'Because the seller\'s risk is large, the exchange makes sellers keep *margin*.']
  ], [
    ['The most an option seller can earn is…', 'The premium received', 'Unlimited', 'The strike price', 0, 'The premium is the best case.'],
    ['Who must keep margin with the broker?', 'The option buyer', 'The option seller', 'Neither', 1, 'The seller carries the open-ended risk.']
  ]),

  L('Delta', '🧭', [
    ['f:Delta = change in premium for a ₹1 move in the share', 'The speedometer', '*Delta* tells you how much the option price moves when the share moves.'],
    ['bars:Far out of money=0.1,At the money=0.5,Deep in money=0.9|Delta of a call', 'From 0 to 1', 'A call at the money has a delta near *0.5*. Puts have negative delta.'],
    ['f:Share up ₹10 × delta 0.5 = premium up about ₹5', 'Use it', 'Delta also hints at the rough chance of ending in the money.']
  ], [
    ['Delta is 0.4. The share rises ₹20. The call premium rises about…', '₹4', '₹8', '₹20', 1, '20 × 0.4 = 8.'],
    ['The delta of an at-the-money call is about…', '0', '0.5', '1', 1, 'Roughly half the share\'s move.']
  ]),

  L('Theta, vega and gamma', '⏱️', [
    ['grid:#Greek,#Measures;Delta,Move with the share price;Gamma,How fast delta changes;Theta,Value lost per day;Vega,Move with volatility', 'The Greeks', 'Each Greek isolates *one force* acting on an option\'s price.'],
    ['⏱️ 🧊', 'Theta', 'Time decay hurts the buyer and pays the seller. A theta of −3 means about ₹3 lost per day.'],
    ['🌪️ 📈', 'Vega', 'When expected volatility rises, *both* calls and puts get costlier.']
  ], [
    ['Theta is −3. All else equal, tomorrow the premium will be about…', '₹3 higher', '₹3 lower', 'Unchanged', 1, 'Theta is the daily cost of holding the option.'],
    ['Time decay works in favour of the…', 'Buyer', 'Seller', 'Broker only', 1, 'The seller keeps what the option loses.']
  ]),

  L('Volatility', '🌪️', [
    ['line:100,101,99,100,102,101/100,108,94,107,92,110|A calm share and a wild share', 'How much it swings', 'Volatility measures the *size of the swings*, not the direction.'],
    ['🔮|Implied volatility', 'The market\'s forecast', '*Implied volatility* is the swing the market expects. It is baked into every premium.'],
    ['📅 💥', 'Events pump it up', 'Before results or a budget, implied volatility rises and options get costly. After the event it collapses.']
  ], [
    ['Just before quarterly results, implied volatility usually…', 'Rises', 'Falls to zero', 'Does not matter', 0, 'Uncertainty is highest before the news.'],
    ['Higher implied volatility makes options…', 'Cheaper', 'Costlier', 'Illegal to sell', 1, 'Bigger expected swings mean bigger premiums.']
  ]),

  L('Spreads: limit both sides', '🪜', [
    ['line:-4,-4,0,6,6,6|Buy the ₹100 call at ₹6, sell the ₹110 call at ₹2', 'Bull call spread', 'Buying one call and selling a higher one cuts the cost. Loss and profit are *both capped*.'],
    ['f:Max loss = net premium = ₹4|Max profit = strike gap − net premium = 10 − 4 = ₹6', 'The sums', 'You know the worst and best case before you enter.'],
    ['🪞|Bear put spread', 'The mirror', 'Expecting a fall? Buy a put and sell a lower-strike put. Same logic, upside down.']
  ], [
    ['Buy a ₹500 call at ₹20 and sell a ₹520 call at ₹8. Max loss is…', '₹8', '₹12', '₹20', 1, 'Net premium paid: 20 − 8 = 12.'],
    ['The maximum profit on that spread is…', '₹8', '₹12', '₹20', 0, 'Strike gap 20 − net premium 12 = 8.']
  ]),

  L('Straddles and strangles', '🎢', [
    ['line:10,0,-10,0,10|Buy the ₹100 call and the ₹100 put for ₹5 each', 'Long straddle', 'You win on a *big move either way*. You lose if the price sits still.'],
    ['vs:Straddle|Call and put at the same strike;Costs more||Strangle|Call and put, both out of the money;Cheaper, needs a bigger move', 'Two flavours', 'Both are bets on *movement*, not direction.'],
    ['😴 💰 ⚠️', 'Selling them', 'Sellers of straddles bet on a quiet market. They earn premium but carry open-ended risk.']
  ], [
    ['A long straddle makes money when the price…', 'Barely moves', 'Moves sharply in either direction', 'Only rises', 1, 'It needs a move bigger than the total premium.'],
    ['Straddle at strike ₹100 costs ₹10 in total. Break-evens are…', '₹90 and ₹110', '₹95 and ₹105', '₹100 only', 0, 'Strike ± total premium.']
  ]),

  L('Options with shares you own', '🧥', [
    ['📦 ➕ 📞', 'Covered call', 'Own the shares and *sell a call* above the price. You earn extra income but cap your upside.'],
    ['📦 ➕ 🪂', 'Protective put', 'Own the shares and *buy a put*. If the price crashes, the put pays. It is insurance with a premium.'],
    ['vs:Covered call|Earns premium;Upside capped at strike||Protective put|Costs premium;Downside capped at strike', 'Income or insurance', 'One gives up some gain for income. The other pays a fee to limit loss.']
  ], [
    ['A covered call writer gives up…', 'All dividends', 'Gains above the strike', 'Ownership of the shares today', 1, 'Above the strike, the shares get called away.'],
    ['A protective put works like…', 'A loan', 'Insurance', 'A dividend', 1, 'You pay a premium to cap the loss.']
  ])
]);

T({ id: 'tax', after: 'basics', group: 'markets', name: 'Tax, currency and commodities', emoji: '🧾', color: '#FFC83D',
  blurb: 'What you owe on gains, plus the rupee, gold, oil and bonds.',
  link: VARSITY('markets-and-taxation', 'Markets and Taxation') }, [

  L('Tax on share profits', '🧾', [
    ['vs:Short term|Sold within 12 months;Taxed at 20%||Long term|Held more than 12 months;12.5% on gains above ₹1.25 lakh a year', 'Holding period decides', 'For listed shares and equity funds, the tax depends on *how long* you held. Rates shown are for FY 2026-27.'],
    ['f:₹2,25,000 gain − ₹1,25,000 free = ₹1,00,000 taxable|Tax at 12.5% = ₹12,500, plus cess', 'A long-term example', 'The first ₹1.25 lakh of long-term gains each year is *tax-free*.'],
    ['📜|Budgets change these rates', 'Always re-check', 'These rates changed in 2024 and can change again. Confirm the current numbers before you file.']
  ], [
    ['You sell shares after 8 months with a ₹50,000 gain. Tax is about…', '₹6,250', '₹10,000', 'Zero', 1, 'Short term: 20% of 50,000 = ₹10,000 (plus cess).'],
    ['Your only long-term equity gain this year is ₹1,00,000. Tax is…', 'Zero', '₹12,500', '₹20,000', 0, 'It is within the ₹1.25 lakh exemption.']
  ]),

  L('Trader or investor?', '🎭', [
    ['grid:#Activity,#Taxed as;Delivery shares,Capital gains;Intraday shares,Speculative business income;Futures and options,Business income', 'Three buckets', 'The taxman treats intraday and F&O as a *business*, not as investing.'],
    ['🧮|Added to your income, taxed at your slab', 'Business income', 'F&O and intraday profits are added to your other income. Related expenses can be deducted.'],
    ['f:Intraday loss: carry forward 4 years|F&O loss: carry forward 8 years', 'Losses have value', 'File your return *on time* to carry losses forward and set them off against future profits.']
  ], [
    ['Profits from futures and options are taxed…', 'At a flat 12.5%', 'As business income at your slab rate', 'Not at all', 1, 'F&O is treated as non-speculative business income.'],
    ['Intraday share trading is treated as…', 'Long-term capital gain', 'Speculative business income', 'Salary', 1, 'No delivery is taken, so it is speculative.']
  ]),

  L('Dividends and tax harvesting', '🌾', [
    ['💰 ➡️ 🧾', 'Dividends', 'Dividends are added to your income and taxed at *your slab rate*.'],
    ['f:Short-term loss: set off against any capital gain|Long-term loss: only against long-term gains', 'Loss harvesting', 'Selling a loser books a loss that can *reduce the tax* on your gains.'],
    ['🌾|Book up to ₹1.25 lakh of long-term gain each year', 'Gain harvesting', 'Some investors sell and rebuy each year to use the tax-free limit and raise their cost price.']
  ], [
    ['A long-term capital loss can be set off against…', 'Salary income', 'Only long-term capital gains', 'Any income', 1, 'Long-term losses offset only long-term gains.'],
    ['Dividends from shares are taxed…', 'At your slab rate', 'At a flat 12.5%', 'Never', 0, 'They are added to your total income.']
  ]),

  L('The rupee and the dollar', '💱', [
    ['f:USD/INR = 90|An example: ₹90 buys one US dollar', 'Reading the pair', 'If the number goes *up*, the rupee has weakened: you need more rupees for each dollar.'],
    ['vs:Weaker rupee helps|IT exporters;Pharma exporters;Families receiving dollars||Weaker rupee hurts|Oil importers;Foreign travel;Students abroad', 'Winners and losers', 'Exporters earn dollars, so a weak rupee *lifts* their income.'],
    ['flow:Interest rates>Inflation>Oil imports>Foreign investor flows>RBI action', 'What moves it', 'Currency pairs also trade as futures and options on the exchange.']
  ], [
    ['USD/INR moves from 90 to 92. The rupee has…', 'Weakened', 'Strengthened', 'Not changed', 0, 'More rupees are needed for one dollar.'],
    ['Who gains from a weaker rupee?', 'An oil importer', 'An IT exporter', 'A student paying US fees', 1, 'Their dollar earnings convert into more rupees.']
  ]),

  L('Gold and crude oil', '🛢️', [
    ['🥇 🛢️ 🥈', 'Commodity markets', 'Gold, silver, crude oil, natural gas and metals trade as futures on *MCX*.'],
    ['f:Gold price in India ≈ World price × USD/INR + duties', 'Gold', 'Gold is seen as a shelter in scary times. A weak rupee pushes Indian gold prices *up*.'],
    ['✈️ 🎨 🚚', 'Crude oil', 'India imports most of its oil. Costlier crude squeezes airlines, paint makers and transporters.']
  ], [
    ['Gold prices in India depend on the world price and…', 'The Sensex', 'USD/INR', 'Rainfall', 1, 'Gold is priced in dollars globally.'],
    ['Rising crude oil prices usually hurt…', 'Airlines', 'Oil producers', 'Gold miners', 0, 'Fuel is a major cost for airlines.']
  ]),

  L('Bonds and government securities', '🏛️', [
    ['🤝 🏛️', 'A bond is a loan', 'Buy a government security and you have *lent* money to the government. Treasury bills are the under-one-year kind.'],
    ['f:Coupon = fixed yearly interest|A ₹100 bond with a 7% coupon pays ₹7 a year', 'Coupon', 'The coupon is fixed for life. The bond\'s market price is not.'],
    ['📈 🔄 📉|Rates up, bond prices down', 'The see-saw', 'When interest rates rise, old bonds with lower coupons become less attractive, so their *price falls*.']
  ], [
    ['Interest rates rise. Prices of existing bonds…', 'Rise', 'Fall', 'Stay fixed', 1, 'Price and yield move in opposite directions.'],
    ['A treasury bill matures in…', 'Under one year', 'Exactly 10 years', '40 years', 0, 'T-bills are short-term government borrowing.']
  ])
]);

T({ id: 'risk', after: 'basics', group: 'markets', name: 'Risk and trading psychology', emoji: '🧠', color: '#12B76A',
  blurb: 'Protect your capital and manage your own mind.',
  link: VARSITY('risk-management', 'Risk Management and Trading Psychology') }, [

  L('Two kinds of risk', '🎲', [
    ['vs:Company risk|Bad results;Fraud;A strike;Can be diversified away||Market risk|Recession;War;Rate hikes;Hits almost everything', 'Know your enemy', 'One risk belongs to a single company. The other belongs to the whole market.'],
    ['line:40,28,22,19,17,16,15.5,15|Portfolio risk as you add more shares', 'Spreading helps, up to a point', 'Adding shares cuts risk quickly at first. Beyond *15 to 20* well-chosen shares, there is little extra benefit.'],
    ['🌧️|The part that never goes away', 'Market risk stays', 'You manage market risk with *asset allocation* and hedging, not with more shares.']
  ], [
    ['Which risk can diversification reduce?', 'Company-specific risk', 'Market-wide risk', 'Neither', 0, 'Spreading across companies dilutes single-company shocks.'],
    ['A global recession is an example of…', 'Company risk', 'Market risk', 'Liquidity bonus', 1, 'It affects nearly all shares together.']
  ]),

  L('Diversify properly', '🧺', [
    ['f:Correlation runs from −1 to +1|+1 move together, 0 unrelated, −1 move opposite', 'Correlation', 'Diversification only works when your holdings do *not* all move together.'],
    ['pie:Banks=25,IT=20,Consumer=20,Pharma=15,Auto=20', 'Spread across sectors', 'Five bank shares are one bet, not five. Spread across *different businesses*.'],
    ['pie:Equity=60,Debt=30,Gold=10', 'Spread across assets', 'Shares, bonds and gold react differently to the same news. Mixing them smooths the ride.']
  ], [
    ['You own five private bank shares. You are…', 'Well diversified', 'Concentrated in one sector', 'Fully hedged', 1, 'They share the same sector risks.'],
    ['Two assets with correlation near −1 tend to…', 'Move in opposite directions', 'Move together', 'Never move', 0, 'That is what makes them good diversifiers.']
  ]),

  L('Position sizing', '📐', [
    ['f:Shares to buy = (Capital × Risk %) ÷ (Entry − Stop-loss)', 'How much to buy', 'Decide the loss you can accept first. The quantity follows from it.'],
    ['f:(₹5,00,000 × 1%) ÷ (₹250 − ₹240) = 500 shares|Risking ₹5,000 on the trade', 'Worked example', 'If the stop-loss is hit, you lose ₹5,000, which is just *1%* of your capital.'],
    ['bars:Risk 2% each=82,Risk 10% each=35|Capital left after 10 losses in a row, %', 'Survive the bad streak', 'Small risk per trade keeps you in the game long enough for your edge to show.']
  ], [
    ['Capital ₹2,00,000, risk 1%, entry ₹100, stop ₹96. Buy…', '500 shares', '2,000 shares', '50 shares', 0, 'Risk ₹2,000 ÷ ₹4 per share = 500.'],
    ['Position sizing starts with deciding…', 'How much you could gain', 'How much you can afford to lose', 'Which broker to use', 1, 'Risk first, quantity second.']
  ]),

  L('Expectancy', '🧮', [
    ['f:Expectancy = (Win % × Average win) − (Loss % × Average loss)', 'Is your method worth it?', 'Expectancy is what you earn *per trade on average* over many trades.'],
    ['vs:System A|Wins 80% of trades;Average win ₹500;Average loss ₹3,000;Loses ₹200 a trade||System B|Wins 40% of trades;Average win ₹3,000;Average loss ₹1,000;Makes ₹600 a trade', 'Win rate fools people', 'A system can win *less than half* the time and still make money.'],
    ['🎰|Many small edges, repeated', 'Think like the casino', 'One trade proves nothing. The edge appears only over *hundreds* of trades.']
  ], [
    ['Win 50%, average win ₹2,000, average loss ₹1,000. Expectancy per trade is…', '+₹500', '+₹1,000', '−₹500', 0, '0.5 × 2,000 − 0.5 × 1,000 = 500.'],
    ['A high win rate guarantees profit.', 'True', 'False', 'Only in options', 1, 'Big losses can outweigh many small wins.']
  ]),

  L('The traps in your head', '🪤', [
    ['😖 > 😊', 'Loss aversion', 'A loss hurts about *twice* as much as an equal gain pleases. So people cling to losers and sell winners early.'],
    ['grid:#Trap,#It sounds like;Anchoring,It was ₹500 once;Confirmation,I only read news I agree with;Herding,Everyone is buying it;Overconfidence,I cannot be wrong', 'Four more', 'Naming a bias is the first step to catching it in yourself.'],
    ['📋|Written rules beat willpower', 'The fix', 'Decide entries, exits and size *before* the market opens, when you are calm.']
  ], [
    ['"I will sell once it gets back to my buying price" is…', 'Anchoring', 'Diversification', 'Hedging', 0, 'The buying price is an anchor the market does not care about.'],
    ['Buying only because everyone else is buying is…', 'Herding', 'Arbitrage', 'Value investing', 0, 'Following the crowd without your own reasons.']
  ]),

  L('Journal and drawdowns', '📔', [
    ['grid:#Trade,#Why I entered,#Result,#Lesson;1,Breakout with volume,+2~400,Worked as planned;2,Tip from a friend,*−3~100,No more tips', 'Write every trade down', 'A *journal* shows which of your setups pay and which mistakes repeat.'],
    ['bars:Lose 10%=11,Lose 25%=33,Lose 50%=100|Gain needed to get back to even, %', 'Losses are not symmetric', 'Lose half your capital and you must *double* what is left to recover.'],
    ['🗓️|Review every week', 'Close the loop', 'A journal is useless unless you read it. Look for patterns, not single trades.']
  ], [
    ['After a 50% loss, the gain needed to recover is…', '50%', '75%', '100%', 2, '₹100 falls to ₹50. ₹50 must double to reach ₹100.'],
    ['The main purpose of a trading journal is to…', 'Impress friends', 'Find your repeating patterns', 'Replace a demat account', 1, 'It turns experience into evidence.']
  ]),

  L('Trading systems and backtests', '🤖', [
    ['flow:Idea>Clear rules>Test on past data>Paper trade>Small real money', 'From hunch to system', 'A system is a set of rules clear enough that *anyone* would take the same trades.'],
    ['👯|Two similar shares, one gap', 'Pair trading', 'Two alike shares usually move together. When the gap stretches, buy the laggard and short the leader, betting it *closes*.'],
    ['🧵|Too perfect on old data', 'Overfitting', 'Rules tuned to fit the past perfectly tend to fail live. Always include costs and slippage in tests.']
  ], [
    ['A pair trade makes money when the gap between the two shares…', 'Closes', 'Widens forever', 'Disappears from the chart', 0, 'It is a bet on the relationship returning to normal.'],
    ['Overfitting means the rules are…', 'Too simple', 'Too tailored to past data', 'Approved by SEBI', 1, 'They describe history instead of predicting.']
  ])
]);

T({ id: 'sector', after: 'fa', group: 'markets', name: 'Sectors and social exchanges', emoji: '🏭', color: '#6B3CFF',
  blurb: 'Every industry has its own scorecard. Learn to read them.',
  link: VARSITY('sector-analysis', 'Sector Analysis') }, [

  L('How to study a sector', '🗺️', [
    ['flow:Size and growth>Main players>What drives demand>What drives cost>Rules and regulation', 'Five questions', 'Understand the *industry* before you pick a company inside it.'],
    ['grid:#Sector,#Watch this;Banks,Margins and bad loans;IT services,Deal wins and attrition;Cement,Capacity use and cost per tonne;Hotels,Occupancy and room rate;Retail,Same-store sales growth', 'Different scorecards', 'A P/E alone will not do. Every sector has its *own numbers*.'],
    ['vs:Cyclical|Autos;Cement;Metals;Swing with the economy||Defensive|Consumer staples;Pharma;Utilities;Steady in bad times', 'Two temperaments', 'Know which kind you own before the economy turns.']
  ], [
    ['Which is a defensive sector?', 'Metals', 'Consumer staples', 'Cement', 1, 'People buy soap and toothpaste in any economy.'],
    ['Before picking a company, first understand…', 'Its logo', 'Its industry', 'Its share price yesterday', 1, 'The industry sets the limits for every company in it.']
  ]),

  L('Reading a bank', '🏦', [
    ['f:Net interest margin = (Interest earned − Interest paid) ÷ Loans and investments', 'The spread', 'A bank borrows cheap and lends dear. *NIM* measures that gap.'],
    ['🏧|Current and savings account share', 'CASA', 'Savings and current accounts pay little or no interest. A *higher CASA share* means cheaper money for the bank.'],
    ['🚩|Unpaid for more than 90 days', 'Bad loans', 'A loan unpaid for 90 days becomes a *non-performing asset*. Watch gross and net NPA.']
  ], [
    ['A loan is classed as non-performing when unpaid for more than…', '30 days', '90 days', '365 days', 1, 'Ninety days overdue is the standard test.'],
    ['A higher CASA share gives a bank…', 'Costlier funds', 'Cheaper funds', 'More bad loans', 1, 'Those deposits cost the bank very little.']
  ]),

  L('Factories: cement and steel', '🏗️', [
    ['f:Capacity use = Production ÷ Capacity|8 million tonnes ÷ 10 = 80%', 'How busy is the plant?', 'A factory earns most when it runs *close to full*.'],
    ['f:EBITDA per tonne = EBITDA ÷ Tonnes sold', 'Profit per tonne', 'For commodities, compare companies on profit *per tonne*. Fuel and freight decide who wins.'],
    ['line:5,6,8,12,18,26|Profit rising faster than volume', 'Operating leverage', 'With high fixed costs, a small rise in volume gives a *big rise in profit*. It works in reverse too.']
  ], [
    ['Capacity 20 million tonnes, production 15. Capacity use is…', '75%', '133%', '5%', 0, '15 ÷ 20 = 75%.'],
    ['High fixed costs mean a small fall in volume causes…', 'No change in profit', 'A large fall in profit', 'A rise in profit', 1, 'Operating leverage cuts both ways.']
  ]),

  L('Services: IT and hotels', '🏨', [
    ['f:IT revenue ≈ People × Billing rate × Utilisation', 'IT services', 'Watch deal wins, employee *attrition* and the rupee. Most revenue is in dollars.'],
    ['f:RevPAR = Occupancy × Average room rate|70% × ₹8,000 = ₹5,600', 'Hotels', 'Revenue per available room blends how *full* the hotel is with how much it charges.'],
    ['🛍️|Same-store sales growth', 'Retail', 'Growth from *existing* shops shows real demand. New shops alone can hide a weak business.']
  ], [
    ['Occupancy 60%, average room rate ₹5,000. RevPAR is…', '₹3,000', '₹5,000', '₹8,333', 0, '0.60 × 5,000 = 3,000.'],
    ['Same-store sales growth measures growth from…', 'New shops', 'Existing shops', 'Online ads', 1, 'It strips out the effect of opening new outlets.']
  ]),

  L('The social stock exchange', '🤲', [
    ['🤲 🏛️', 'A market for doing good', 'The *social stock exchange* is a segment of NSE and BSE where non-profits and social enterprises raise money.'],
    ['f:Zero coupon, zero principal|No interest, no repayment', 'A donation with a receipt', 'Non-profits issue *ZCZP* instruments. You give money and get reports on the impact, not returns.'],
    ['🔍|Registered, audited, reported', 'Why it matters', 'Listed organisations must disclose how funds were used and what changed. Giving becomes *transparent*.']
  ], [
    ['A ZCZP instrument pays the holder…', 'Monthly interest', 'No interest and no principal', 'Bonus shares', 1, 'It is a structured donation.'],
    ['Who raises money on the social stock exchange?', 'Only banks', 'Non-profits and social enterprises', 'Only the government', 1, 'It exists to fund social impact.']
  ])
]);
