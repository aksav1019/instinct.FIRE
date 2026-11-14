/* Thambi — Stock markets, part 1: basics, technical analysis, fundamental analysis. Original lessons. */
T({ id: 'basics', group: 'markets', name: 'Stock market basics', emoji: '🏛️', color: '#6B3CFF',
  blurb: 'What a share is, who runs the market and how a trade works.',
  link: VARSITY('introduction-to-stock-markets', 'Introduction to Stock Markets') }, [

  L('Why invest at all', '🌱', [
    ['🛒 ➡️ 💸|₹100 of groceries today, ₹106 next year', 'Prices creep up', 'Prices in India rise roughly *6% a year*. Cash kept in a locker buys less every year.'],
    ['bars:Locker=0,Savings a/c=3,FD=7,Equity=12|Rough long-run yearly return, %', 'Different homes for money', 'Equity has grown fastest over long periods, with the *bumpiest ride*. FDs are calm but barely beat inflation.'],
    ['line:1,1.76,3.1,5.47,9.65|₹1 lakh at 12% a year for 20 years', 'Time does the heavy lifting', '₹1 lakh left alone at 12% becomes about *₹9.6 lakh* in 20 years. The last 5 years add the most.']
  ], [
    ['Your FD pays 7% and inflation is 6%. Your real gain is about…', '1%', '7%', '13%', 0, 'Real return is what is left after inflation: 7 − 6 = about 1%.'],
    ['Which has grown fastest over long periods, with the most ups and downs?', 'Savings account', 'Equity', 'Fixed deposit', 1, 'Equity gives the highest long-run return and the most volatility.']
  ]),

  L('What a share really is', '🍕', [
    ['🏭 ➗ 🍕🍕🍕🍕', 'A company, sliced', 'A company is cut into equal slices called *shares*. Own a slice and you own a part of the business.'],
    ['f:1,000 shares ÷ 1,00,000 shares = 1%|Your slice of the whole company', 'How big is your slice?', 'Your ownership is your shares divided by *all* the shares the company has issued.'],
    ['📈 ➕ 💰', 'Two ways to earn', 'The price can rise (*capital gain*), and the company can share its profit with you (*dividend*).']
  ], [
    ['A company has 10 lakh shares. You hold 10,000. You own…', '0.1%', '1%', '10%', 1, '10,000 ÷ 10,00,000 = 1%.'],
    ['A dividend is…', 'A fee you pay the broker', 'A part of profit paid to shareholders', 'A tax on shares', 1, 'Companies may pay out part of their profit to owners as dividends.']
  ]),

  L('Who runs the market', '🏟️', [
    ['flow:You>Broker>Exchange>Clearing corporation>Depository', 'The relay team', 'Your order passes through a *broker* to the *exchange*. The clearing corporation settles it and the depository stores your shares.'],
    ['👮|SEBI', 'The referee', '*SEBI* regulates the market. It makes the rules, protects investors and punishes fraud.'],
    ['vs:NSE|Main index: Nifty 50;50 large companies||BSE|Main index: Sensex;30 large companies', 'Two big exchanges', 'Most large companies are listed on both. Your shares sit in *demat* form with NSDL or CDSL.']
  ], [
    ['Who stores your shares electronically?', 'SEBI', 'A depository (NSDL or CDSL)', 'The company itself', 1, 'Depositories hold shares in demat form. You reach them through your broker.'],
    ['Who regulates India\'s securities market?', 'RBI', 'SEBI', 'NSE', 1, 'SEBI is the securities market regulator. RBI regulates banks.']
  ]),

  L('IPO: a company goes public', '🚪', [
    ['flow:Founders>Angel investors>Venture capital>Private equity>IPO', 'The funding ladder', 'A growing company raises money in rounds. An *IPO* is when it first sells shares to everyone.'],
    ['vs:Fresh issue|Company sells new shares;Money goes to the company||Offer for sale|Old owners sell their shares;Money goes to them', 'Where does IPO money go?', 'Read the offer document to see how much is *fresh issue* and how much is early investors cashing out.'],
    ['vs:Primary market|Company to investors;IPOs happen here||Secondary market|Investor to investor;Daily trading happens here', 'Two markets', 'After listing, you buy from *another investor*. The company gets nothing from daily trades.']
  ], [
    ['In an offer for sale, the money goes to…', 'The company', 'The selling shareholders', 'SEBI', 1, 'In an OFS existing owners sell their shares, so they receive the money.'],
    ['You buy a listed share on NSE today. Who sold it to you?', 'The company', 'The exchange', 'Another investor', 2, 'Daily trading is the secondary market: investor to investor.']
  ]),

  L('Why prices move', '⚖️', [
    ['🙋🙋🙋 ⚔️ 🙅', 'A tug of war', 'More people wanting to buy than sell at a price pushes it *up*. More sellers pushes it *down*.'],
    ['grid:#Bid qty,#Bid ₹,#Ask ₹,#Ask qty;500,*99.90,*100.10,300;800,99.85,100.15,650|The order book', 'Bid and ask', 'Buyers post *bids*, sellers post *asks*. The small gap between the best two is the *spread*.'],
    ['flow:News>Expected profits change>Orders rush in>Price moves', 'News moves expectations', 'A price reflects what people expect the business to earn in *future*. New information changes that.']
  ], [
    ['Best bid ₹99.90, best ask ₹100.10. A market buy order fills near…', '₹99.90', '₹100.00', '₹100.10', 2, 'A buyer in a hurry pays the best ask, the lowest price a seller will accept.'],
    ['A price rises when…', 'The company wants it to', 'Demand at that price beats supply', 'The exchange raises it', 1, 'Prices are set by buyers and sellers, not by the company or the exchange.']
  ]),

  L('Sensex and Nifty', '🌡️', [
    ['🌡️|How is the market feeling today?', 'A thermometer', 'An index tracks a basket of big companies. *Nifty 50* follows 50 on NSE, *Sensex* follows 30 on BSE.'],
    ['f:Market cap = Share price × Number of shares|Free float counts only the shares the public can trade', 'Size decides weight', 'Indices weigh companies by *free-float market cap*. Bigger companies move the index more.'],
    ['pie:Top 10 stocks=55,Other 40 stocks=45|Rough Nifty 50 weight split', 'A few giants lead', 'Roughly half the Nifty sits in its ten biggest names, so the index can rise while most stocks fall.']
  ], [
    ['Share price ₹200, 5 crore shares. Market cap is…', '₹100 crore', '₹1,000 crore', '₹40 crore', 1, '200 × 5 crore = ₹1,000 crore.'],
    ['Nifty 50 weighs companies by…', 'Share price', 'Free-float market cap', 'Number of employees', 1, 'A larger free-float market cap means a larger weight in the index.']
  ]),

  L('Placing an order', '🛒', [
    ['vs:Market order|Buy now at the best price;Sure to fill;Price not sure||Limit order|Buy only at my price or better;Price is sure;May not fill', 'Speed or price?', 'A *market* order promises the trade. A *limit* order promises the price. You choose which matters.'],
    ['🛑|Stop-loss', 'Your emergency exit', 'A *stop-loss* order waits quietly and exits if the price hits your pain point.'],
    ['vs:Delivery|Hold as long as you like;You own the shares||Intraday|Must close the same day;Broker lends margin', 'How long will you hold?', 'Delivery is for investing. *Intraday* trades are closed before the market shuts.']
  ], [
    ['You want to buy only if the price falls to ₹95. Use a…', 'Market order', 'Limit order at ₹95', 'Stop-loss order', 1, 'A limit buy at ₹95 fills only at ₹95 or lower.'],
    ['A stop-loss order is mainly for…', 'Booking a big profit', 'Capping your loss', 'Avoiding brokerage', 1, 'It exits the trade automatically when the price moves against you.']
  ]),

  L('From click to demat', '📦', [
    ['flow:Trade day (T)>Next working day (T+1)>Shares in your demat', 'Settlement takes a day', 'Indian shares settle on *T+1*. Buy on Monday and they are yours on Tuesday.'],
    ['🤝|Clearing corporation', 'The trade guarantor', 'The clearing corporation stands in the middle, so you get your shares even if the other side fails.'],
    ['🧾|Brokerage, STT, exchange fee, GST, stamp duty, DP charge', 'Small costs add up', 'Every trade carries charges. Frequent traders must beat these *before* they earn anything.']
  ], [
    ['You buy on Monday with no holidays ahead. Shares reach your demat on…', 'Monday night', 'Tuesday', 'Friday', 1, 'T+1: one working day after the trade.'],
    ['Who guarantees the other side of your trade?', 'Your broker', 'The clearing corporation', 'The company', 1, 'It becomes the buyer to every seller and the seller to every buyer.']
  ]),

  L('Bonus, split and buyback', '🎁', [
    ['f:1:1 bonus: 100 shares at ₹1,000 → 200 shares at about ₹500|Same pizza, more slices', 'More shares, same value', 'A *bonus* or *split* raises your share count and cuts the price. Your total value stays about the same.'],
    ['📅|Ex-date', 'Mind the ex-date', 'Own the share *before* the ex-date to get the dividend or bonus. Buy on or after it and you miss out.'],
    ['vs:Buyback|Company buys back its own shares;Fewer shares remain||Rights issue|New shares offered to existing owners;Usually at a discount', 'Shrinking and growing', 'A buyback returns cash to owners. A rights issue raises fresh cash from them.']
  ], [
    ['Right after a 1:1 bonus, the total value of your holding…', 'Doubles', 'Stays about the same', 'Halves', 1, 'You hold twice the shares at about half the price.'],
    ['To receive a dividend you must own the share before the…', 'Ex-date', 'Payment date', 'Results date', 0, 'The ex-date is the cut-off for dividends and other corporate actions.']
  ]),

  L('Bulls, bears and trading styles', '🐂', [
    ['🐂 🆚 🐻', 'Up or down?', 'A *bull* expects prices to rise and buys first. A *bear* expects a fall.'],
    ['flow:Sell first at ₹100>Price falls>Buy back at ₹90>Keep ₹10', 'Shorting', 'Selling first and buying later is a *short*. In shares it must be closed the same day.'],
    ['flow:Scalper: minutes>Day trader: hours>Swing trader: days>Investor: years', 'Pick your clock', 'Styles differ mostly by *holding time*. Shorter clocks need more screen time and stronger nerves.']
  ], [
    ['A short seller makes money when the price…', 'Rises', 'Falls', 'Stays flat', 1, 'They sell high first, then buy back lower.'],
    ['In the cash (shares) segment, a short position must be closed…', 'The same day', 'Within a week', 'Any time', 0, 'You cannot carry a short in shares overnight. Futures and options allow that.']
  ])
]);

T({ id: 'ta', after: 'basics', group: 'markets', name: 'Technical analysis', emoji: '🕯️', color: '#FF4F8B',
  blurb: 'Read candles, trends, volume and indicators to time a trade.',
  link: VARSITY('technical-analysis', 'Technical Analysis') }, [

  L('What charts can tell you', '🔭', [
    ['📊 👀', 'Watching the crowd', 'Technical analysis studies *price and volume* to judge what the crowd may do next. The business itself is not studied.'],
    ['flow:Price reflects everything>How it moves matters>Patterns repeat', 'Three beliefs', 'Chartists assume known news is already in the price, and that crowd behaviour *repeats*.'],
    ['vs:Technical|Short-term trades;Price and volume;When to enter and exit||Fundamental|Long-term investing;Business and numbers;What to own', 'Two toolkits', 'Many people use fundamentals to choose *what* and charts to choose *when*.']
  ], [
    ['Technical analysis mainly studies…', 'Annual reports', 'Price and volume', 'Management interviews', 1, 'Charts of price and volume are its raw material.'],
    ['"Price reflects everything" means…', 'Prices never change', 'Known information is already in the price', 'Only insiders can profit', 1, 'Chartists assume the market has already digested public information.']
  ]),

  L('Reading a candlestick', '🕯️', [
    ['candle:100 112 96 108 Up day,108 111 95 99 Down day', 'One candle, four prices', 'A *green* candle closed above its open. A *red* candle closed below it.'],
    ['f:O  H  L  C|Open, High, Low, Close', 'Body and wicks', 'The thick *body* runs from open to close. The thin *wicks* mark the highest and lowest prices touched.'],
    ['⏱️|5 minutes, 1 day, 1 week', 'Choose the clock', 'Each candle covers one period. Day traders watch 5-minute candles, investors watch daily or weekly ones.']
  ], [
    ['A red candle means…', 'Close was below open', 'Close was above open', 'No trades happened', 0, 'Red (or black) shows the price ended lower than it started.'],
    ['The tip of the upper wick is the…', 'Open', 'Close', 'High of the period', 2, 'Wicks show the extremes: upper tip is the high, lower tip is the low.']
  ]),

  L('Single-candle signals', '🔨', [
    ['candle:100 120 100 120 Marubozu,110 118 102 110.4 Doji', 'Power and doubt', 'A *marubozu* has no wicks: one side ruled all day. A *doji* opens and closes at the same level: nobody won.'],
    ['candle:120 121 112 113,113 114 106 107,107 108 96 106.5 Hammer', 'The hammer', 'After a fall, a small body with a *long lower wick* shows buyers pushed the price back up.'],
    ['candle:96 104 95 103,103 111 102 110,110 122 109 111 Shooting star', 'The shooting star', 'After a rise, a *long upper wick* shows sellers rejected the higher prices.']
  ], [
    ['A hammer is meaningful when it appears after a…', 'Fall', 'Rise', 'Flat market', 0, 'It hints that selling is drying up after a downtrend.'],
    ['A doji tells you the market is…', 'Strongly bullish', 'Undecided', 'Closed', 1, 'Open and close are nearly equal, so neither side won.']
  ]),

  L('Patterns with two or three candles', '🌅', [
    ['candle:118 119 110 111,111 112 101 102,101 115 100 114|Bullish engulfing', 'Engulfing', 'After a fall, a big green body that *fully covers* the previous red body hints at a turn up.'],
    ['candle:120 121 107 108,106 108 102 105,107 119 106 118|Morning star', 'Morning star', 'Big red, a small pause, then big green. Three candles that show sellers losing control.'],
    ['✅|Trend first, pattern second', 'Do not trade them alone', 'A pattern only matters after a *clear trend*. Wait for the next candle to confirm, and place a stop beyond the pattern.']
  ], [
    ['A bullish engulfing pattern shows a green body that…', 'Is smaller than the red one', 'Fully covers the previous red body', 'Has no wicks', 1, 'The second candle swallows the first, after a downtrend.'],
    ['A morning star hints at…', 'A possible turn upward', 'A market holiday', 'A sharp fall ahead', 0, 'It is a three-candle bullish reversal pattern.']
  ]),

  L('Support and resistance', '🧱', [
    ['line:50,58,52,60,53,61,52,59|Floor near 52, ceiling near 60|h=52,60', 'Floors and ceilings', '*Support* is a price where buyers keep showing up. *Resistance* is where sellers keep showing up.'],
    ['🔁|Old ceiling, new floor', 'Roles flip', 'When price breaks above resistance, that level often turns into *support* on the way back.'],
    ['🎯|Targets and stop-losses', 'Why they matter', 'Traders use these levels to set *targets* just below resistance and *stop-losses* just below support.']
  ], [
    ['A stock keeps bouncing up from ₹52. ₹52 is its…', 'Resistance', 'Support', 'Target', 1, 'Buyers defend that level, so it acts as a floor.'],
    ['After a breakout above resistance, the old resistance often becomes…', 'Support', 'Irrelevant', 'A circuit limit', 0, 'This role reversal is one of the most used ideas in charting.']
  ]),

  L('Volume: the crowd meter', '📢', [
    ['bars:Mon=20,Tue=22,Wed=19,Thu=58,Fri=25|Shares traded, in lakh', 'How many showed up', '*Volume* is the number of shares traded. Thursday here is far above normal, so something happened.'],
    ['grid:#Price,#Volume,#Reading;Up,Up,*Strong buying;Up,Down,Weak rally;Down,Up,*Strong selling;Down,Down,Weak fall', 'Price plus volume', 'A move backed by *high volume* has conviction. The same move on thin volume is easy to reverse.'],
    ['📏|Compare with the 10-day average', 'High compared to what?', 'Judge today\'s volume against its recent *average*, never as a raw number.']
  ], [
    ['Price rises on rising volume. That is…', 'A weak rally', 'A strong, convincing move', 'A sell signal', 1, 'Many participants agree with the move.'],
    ['A breakout on very low volume is…', 'Extra reliable', 'Less trustworthy', 'Illegal', 1, 'Few traders took part, so it can fail easily.']
  ]),

  L('Moving averages', '〰️', [
    ['line:50,54,49,57,55,62,58,66,63,70/50,51,51,53,53,56,56,59,60,63|Price in purple, its average in orange', 'Smoothing the noise', 'A *moving average* is the average of the last few closes. It shows direction without the daily zig-zag.'],
    ['f:5-day SMA = last 5 closes ÷ 5|An EMA gives recent days more weight', 'Simple and exponential', 'The *EMA* reacts faster to new prices than the simple average.'],
    ['✨|50-day crosses above 200-day', 'Crossovers', 'A short average crossing above a long one (*golden cross*) signals strength. The reverse is a death cross.']
  ], [
    ['Closes are 10, 12, 14, 16, 18. The 5-day SMA is…', '14', '16', '18', 0, '(10+12+14+16+18) ÷ 5 = 14.'],
    ['Compared with an SMA, an EMA…', 'Ignores recent prices', 'Reacts faster to recent prices', 'Is always higher', 1, 'It weights the latest prices more heavily.']
  ]),

  L('RSI and MACD', '🎚️', [
    ['line:45,62,74,81,66,48,31,24,38,55|RSI moves between 0 and 100|h=30,70', 'RSI: how stretched?', 'Above *70* the stock is called overbought, below *30* oversold. It is a warning, not an order to sell.'],
    ['f:MACD = 12-day EMA − 26-day EMA|Signal line = 9-day EMA of the MACD', 'MACD: momentum', 'When the MACD line crosses *above* its signal line, momentum is turning up.'],
    ['🧰|One or two tools, used well', 'Indicators confirm', 'Indicators are built from price, so they lag it. Use them to *confirm* what the chart already shows.']
  ], [
    ['An RSI of 82 suggests the stock is…', 'Oversold', 'Overbought', 'Delisted', 1, 'Readings above 70 are treated as overbought.'],
    ['The MACD line crosses above its signal line. Momentum is…', 'Turning up', 'Turning down', 'Unchanged', 0, 'That crossover is read as a bullish signal.']
  ]),

  L('Trends and market phases', '🌊', [
    ['line:10,16,13,20,17,25,22,30|Higher highs and higher lows', 'What an uptrend is', 'An uptrend makes *higher highs and higher lows*. A downtrend does the opposite.'],
    ['flow:Accumulation>Mark-up>Distribution>Mark-down', 'Four seasons', 'Informed money buys quietly, the public joins the rise, the informed sell, then prices slide.'],
    ['🌊|Tide, wave, ripple', 'Three sizes of trend', 'The main trend lasts years, corrections last weeks, daily moves are ripples. Trade *with* the tide.']
  ], [
    ['An uptrend is defined by…', 'Higher highs and higher lows', 'One big green candle', 'High volume alone', 0, 'Each peak and each dip is higher than the last.'],
    ['Quiet buying by informed investors after a long fall is called…', 'Distribution', 'Accumulation', 'Mark-down', 1, 'Accumulation comes first, before the public notices.']
  ]),

  L('Plan the trade', '📝', [
    ['f:Reward to risk = (Target − Entry) ÷ (Entry − Stop-loss)', 'Is it worth it?', 'Before any trade, compare what you could *gain* with what you could *lose*.'],
    ['bars:Risk=5=₹5,Reward=15=₹15|Entry ₹100, stop ₹95, target ₹115', 'Three to one', 'Risking ₹5 to make ₹15 means you can be wrong often and still come out ahead.'],
    ['flow:Clear pattern>Near support or resistance>Volume agrees>Reward at least 1.5× risk', 'A simple checklist', 'Take the trade only when the boxes are ticked. Fix the stop-loss *before* you enter.']
  ], [
    ['Entry ₹200, stop-loss ₹190, target ₹230. Reward to risk is…', '1', '3', '30', 1, 'Reward 30 ÷ risk 10 = 3.'],
    ['When should you decide your stop-loss?', 'Before entering', 'After the loss gets big', 'Never', 0, 'Deciding in advance keeps emotion out of it.']
  ])
]);

T({ id: 'fa', after: 'basics', group: 'markets', name: 'Fundamental analysis', emoji: '🔬', color: '#2E9BFF',
  blurb: 'Judge a business from its reports, ratios and price.',
  link: VARSITY('fundamental-analysis', 'Fundamental Analysis') }, [

  L('Think like an owner', '🏪', [
    ['🏪 🤔', 'Would you buy the whole shop?', 'A share is a piece of a business. Ask the question an owner asks: is this a *good business* to own?'],
    ['vs:Story|Honest management;Strong brand or edge;Growing industry||Numbers|Sales growth;Margins;Debt;Cash flow', 'Two halves', 'Study the *story* and the *numbers*. A great story with weak numbers is only a story.'],
    ['f:Good business + Fair price + Time', 'The recipe', 'Fundamental investors look for all three, then let *compounding* work for years.']
  ], [
    ['Fundamental analysis treats a share as…', 'A lottery ticket', 'Part ownership of a business', 'A chart pattern', 1, 'You analyse the business behind the ticker.'],
    ['Which is a "numbers" check?', 'Brand strength', 'Debt level', 'Management honesty', 1, 'Debt comes straight from the balance sheet.']
  ]),

  L('The annual report', '📘', [
    ['flow:Chairman letter>Management discussion>Financial statements>Notes>Auditor report', 'What is inside', 'The annual report is the company speaking for itself. It is free on the company website.'],
    ['vs:Standalone|Parent company only||Consolidated|Parent plus subsidiaries;Use this one', 'Which numbers?', 'Use *consolidated* statements to see the whole group.'],
    ['🚩|Auditor remarks, related-party deals, pledged shares', 'Red flags', 'Read the auditor report and notes. Trouble is usually disclosed in the *small print*.']
  ], [
    ['Which statements show the whole group?', 'Standalone', 'Consolidated', 'Neither', 1, 'Consolidated numbers include subsidiaries.'],
    ['Where is trouble most often disclosed?', 'On the cover', 'In the notes and auditor report', 'In the photos', 1, 'Auditor qualifications and notes carry the uncomfortable details.']
  ]),

  L('Profit and loss statement', '🧾', [
    ['bars:Sales=100,Costs=-70=−70,EBITDA=30,Dep+Int=-10=−10,Tax=-5=−5,Profit=15|₹ crore, one year', 'From sales to profit', 'Start with sales, take away costs step by step, and what remains is *profit after tax* (PAT).'],
    ['f:EBITDA margin = EBITDA ÷ Sales|30 ÷ 100 = 30%', 'Margins', 'A margin shows how much of each ₹100 of sales the company keeps at that stage.'],
    ['f:EPS = Profit after tax ÷ Number of shares', 'Profit per share', '*EPS* tells you how much profit belongs to each share you hold.']
  ], [
    ['Sales ₹500 crore, operating costs ₹400 crore. EBITDA margin is…', '20%', '25%', '80%', 0, 'EBITDA 100 ÷ sales 500 = 20%.'],
    ['Profit ₹50 crore, 10 crore shares. EPS is…', '₹0.2', '₹5', '₹500', 1, '50 ÷ 10 = ₹5 per share.']
  ]),

  L('The balance sheet', '⚖️', [
    ['f:Assets = Liabilities + Owners\' equity', 'It always balances', 'Everything the company *owns* was paid for with borrowed money or the owners\' money.'],
    ['vs:Owns|Factories;Inventory;Money customers owe;Cash||Owes|Loans;Money owed to suppliers;The rest belongs to owners', 'Two sides', 'Assets on one side. Liabilities and *equity* on the other.'],
    ['📸 🆚 🎬', 'Photo and film', 'The balance sheet is a *photo* on one date. The profit and loss statement is a *film* of the whole year.']
  ], [
    ['Assets ₹900 crore, liabilities ₹500 crore. Equity is…', '₹400 crore', '₹1,400 crore', '₹500 crore', 0, 'Equity = assets − liabilities = 400.'],
    ['A balance sheet shows the position…', 'Over a whole year', 'On a single date', 'For the next year', 1, 'It is a snapshot, usually as on 31 March.']
  ]),

  L('The cash flow statement', '💧', [
    ['bars:Operations=120,Investing=-80=−80,Financing=-30=−30|₹ crore: a healthy pattern', 'Three taps', 'Cash comes from *running the business*, goes into *investing* in assets and moves through *financing* (loans, dividends).'],
    ['🧾 ≠ 💵', 'Profit is not cash', 'A sale on credit is profit today but cash later. Years of profit with no operating cash is a *warning*.'],
    ['f:Free cash flow = Cash from operations − Capex', 'What is really free', 'Free cash flow is what is left to repay debt, pay dividends or grow.']
  ], [
    ['Buying a new machine appears under…', 'Operating activities', 'Investing activities', 'Financing activities', 1, 'Capex is an investing cash outflow.'],
    ['Profits rise every year but cash from operations stays negative. This is…', 'Normal and healthy', 'A warning sign', 'A tax benefit', 1, 'Real profits should eventually arrive as cash.']
  ]),

  L('Is it profitable?', '💹', [
    ['f:ROE = Profit after tax ÷ Owners\' equity', 'Return on equity', 'For every ₹100 owners have in the business, how much does it earn in a year?'],
    ['f:ROCE = EBIT ÷ (Equity + Debt)|Return on all the capital used', 'Return on capital', '*ROCE* includes borrowed money too, so debt cannot flatter the result.'],
    ['bars:Company A=22,Company B=9,FD=7|Return on equity, %', 'Compare', 'A business earning less than an FD is destroying value. Many investors look for *15% or more*, year after year.']
  ], [
    ['Profit ₹30 crore, equity ₹150 crore. ROE is…', '5%', '20%', '45%', 1, '30 ÷ 150 = 20%.'],
    ['ROCE is more telling than ROE when a company has…', 'A lot of debt', 'No debt', 'No sales', 0, 'High debt can inflate ROE. ROCE counts all capital.']
  ]),

  L('Can it carry its debt?', '🏋️', [
    ['f:Debt to equity = Total debt ÷ Equity', 'How much is borrowed?', 'A ratio of 0.3 means ₹30 of loans for every ₹100 of owners\' money. Lower is safer.'],
    ['f:Interest cover = EBIT ÷ Interest|How many times can profit pay the interest?', 'Can it pay interest?', 'A cover of 6 is comfortable. Near 1 means almost all profit goes to lenders.'],
    ['🏦|Banks are different', 'One exception', 'For banks and lenders, borrowed money is the *raw material*. Judge them with other ratios.']
  ], [
    ['EBIT ₹100 crore, interest ₹50 crore. Interest cover is…', '0.5', '2', '50', 1, '100 ÷ 50 = 2 times, which is tight.'],
    ['Which debt-to-equity ratio is safer?', '0.2', '3', 'Both are equal', 0, 'Less debt for each rupee of equity means less risk.']
  ]),

  L('Is the price fair?', '🏷️', [
    ['f:P/E = Share price ÷ EPS|₹300 ÷ ₹15 = 20', 'Price to earnings', 'A P/E of 20 means you pay *₹20 for every ₹1* of yearly profit.'],
    ['grid:#Ratio,#What it compares;P/E,Price with profit per share;P/B,Price with book value per share;P/S,Market cap with sales;EV/EBITDA,Whole firm value with EBITDA', 'Four price tags', 'Each ratio compares the *price* with something the business produces or owns.'],
    ['🪤|Cheap can be a trap', 'Compare wisely', 'Compare with the company\'s *own history* and its *peers*. A low P/E may signal trouble, a high one may signal growth.']
  ], [
    ['Price ₹500, EPS ₹25. P/E is…', '20', '25', '12,500', 0, '500 ÷ 25 = 20.'],
    ['A P/E ratio is best compared with…', 'A random stock', 'Peers and the company\'s own history', 'The Sensex level', 1, 'Valuation only means something in context.']
  ]),

  L('Money today and money tomorrow', '⏳', [
    ['f:Present value = Future cash ÷ (1 + r)ⁿ', 'Discounting', 'Money received later is worth less today, because today\'s money can *earn a return*.'],
    ['bars:Today=100,1 year=91,5 years=62,10 years=39|What ₹100 received later is worth now, at 10%', 'Waiting has a cost', '₹100 arriving in ten years is worth only about *₹39* today at a 10% rate.'],
    ['flow:Forecast cash flows>Discount to today>Add them up>Subtract debt>Divide by shares', 'The DCF idea', 'A business is worth the *present value of the cash* it will generate. This is discounted cash flow.']
  ], [
    ['₹110 received a year from now, at a 10% rate, is worth today…', '₹90', '₹100', '₹121', 1, '110 ÷ 1.10 = 100.'],
    ['A higher discount rate makes present value…', 'Higher', 'Lower', 'Unchanged', 1, 'You divide by a bigger number.']
  ]),

  L('Margin of safety', '🛟', [
    ['bars:Your estimate=100,Buy price=70|Buy well below what you think it is worth', 'Leave a cushion', 'Your estimate of value can be wrong. Buying at a *discount* protects you from your own errors.'],
    ['f:Buy price = Intrinsic value × (1 − margin)|₹200 × 0.75 = ₹150', 'Do the sum', 'With a 25% margin of safety, a share you value at ₹200 becomes interesting at *₹150*.'],
    ['flow:Understand the business>Ten years of numbers>Low debt>Real cash flow>Clean management>Price with a cushion', 'An investor\'s checklist', 'Patience is part of the method. Most days the right action is *nothing*.']
  ], [
    ['You value a share at ₹200 and want a 25% margin of safety. Buy at or below…', '₹150', '₹175', '₹250', 0, '200 × (1 − 0.25) = 150.'],
    ['Why insist on a margin of safety?', 'Estimates of value are uncertain', 'It reduces brokerage', 'SEBI requires it', 0, 'It is protection against being wrong.']
  ])
]);
