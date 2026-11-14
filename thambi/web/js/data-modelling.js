/* Thambi — Financial modelling: build the model, then value the company. Original lessons. */
T({ id: 'fm1', group: 'model', name: 'Build the model', emoji: '🏗️', color: '#FF7A1A',
  blurb: 'From blank workbook to three linked statements.',
  link: VARSITY('financial-modelling', 'Integrated Financial Modelling') }, [

  L('What a financial model is', '🏗️', [
    ['🧮 ➡️ 🔮', 'A machine for "what if"', 'A model is a spreadsheet that turns your *assumptions* about a business into its future financial statements.'],
    ['flow:Past numbers>Assumptions>Forecast statements>Valuation>Decision', 'The pipeline', 'Change one assumption at the start and every number downstream should *update by itself*.'],
    ['vs:Who builds them|Analysts;Bankers;Founders;Lenders||To decide|What is it worth?;Can it repay?;How much to raise?', 'Why bother', 'A model does not predict the future. It shows what must be *true* for a price to make sense.']
  ], [
    ['A financial model mainly converts…', 'Assumptions into forecast statements', 'Charts into words', 'PDFs into Excel', 0, 'It is a structured chain from assumptions to results.'],
    ['When you change a growth assumption, a good model…', 'Needs retyping', 'Updates everything automatically', 'Shows an error', 1, 'All later numbers are formulas linked to the inputs.']
  ]),

  L('Lay out the workbook', '🗂️', [
    ['flow:Inputs>Assumptions>Schedules>P&L>Balance sheet>Cash flow>Valuation', 'One sheet, one job', 'Give each stage its own tab, in the order the numbers *flow*.'],
    ['grid:#Text colour,#Meaning;Blue,A number you typed;Black,A formula;Green,A link to another sheet', 'The colour code', 'Anyone opening the file can see at a glance what is an *input* and what is calculated.'],
    ['🚫|Never type a number inside a formula', 'The golden rule', 'Write =B5×Growth, not =B5×1.12. Hidden numbers are where models go *wrong*.']
  ], [
    ['In the standard colour code, blue text means…', 'A formula', 'A typed input', 'An error', 1, 'Blue marks hard-coded inputs.'],
    ['Why avoid typing 1.12 inside a formula?', 'It slows Excel', 'The assumption is hidden and hard to change', 'Excel forbids it', 1, 'Assumptions should sit in visible input cells.']
  ]),

  L('Start with history', '📜', [
    ['📚|Three to five years of annual reports', 'Collect the past', 'Enter the past P&L, balance sheet and cash flow first. This is your *raw material*.'],
    ['grid:#,#FY23,#FY24,#FY25;Sales,100,115,130;Growth,-,*15%,*13%;EBITDA margin,18%,19%,19%', 'Turn it into ratios', 'Growth rates, margins and days tell you what is *normal* for this business.'],
    ['🧹|Remove one-off items', 'Clean it', 'A one-time gain from selling land is not repeatable. Strip such items out before you forecast.']
  ], [
    ['Sales rise from ₹200 crore to ₹230 crore. Growth is…', '15%', '13%', '30%', 0, '30 ÷ 200 = 15%.'],
    ['Why study past ratios before forecasting?', 'To fill space', 'To learn what is normal for the business', 'Auditors require it', 1, 'History anchors your assumptions.']
  ]),

  L('Forecast revenue', '📈', [
    ['f:Revenue = Volume × Price', 'Break it into drivers', 'Never forecast sales as one number. Forecast *what causes* it.'],
    ['grid:#,#FY25,#FY26E;Units sold,1~000,=B2*1.08;Price ₹,500,=B3*1.04;Revenue ₹,5~00~000,=C2*C3', 'In the sheet', 'Volume up 8% and price up 4% gives revenue up about *12.3%*.'],
    ['vs:Top-down|Market size × your share||Bottom-up|Shops × sales per shop', 'Two routes', 'Build it both ways. If the answers are far apart, one assumption is off.']
  ], [
    ['Volume grows 10% and price grows 5%. Revenue grows about…', '15.5%', '5%', '50%', 0, '1.10 × 1.05 = 1.155.'],
    ['A "driver" in a model is…', 'A person', 'A factor that causes a number to change', 'A chart type', 1, 'Volume and price are drivers of revenue.']
  ]),

  L('Forecast costs', '✂️', [
    ['vs:Variable costs|Raw material;Freight;Move with sales;Forecast as % of sales||Fixed costs|Rent;Salaries;Move slowly;Forecast with a growth rate', 'Two behaviours', 'Ask of each cost: does it rise *with sales* or on its own?'],
    ['grid:#,#FY26E;Sales,1~000;Raw material 55%,=B2*55%;Gross profit,=B2-B3;Fixed costs,250;EBITDA,=B4-B5', 'Build the margin', 'Here raw material is ₹550, gross profit ₹450 and EBITDA *₹200*.'],
    ['🔍|Compare with history', 'Sense check', 'If your forecast margin jumps well above anything in the past, you need a strong reason.']
  ], [
    ['Sales ₹500 crore, raw material at 55% of sales. Raw material cost is…', '₹55 crore', '₹275 crore', '₹445 crore', 1, '500 × 55% = 275.'],
    ['Office rent is best forecast…', 'As a % of sales', 'With its own growth rate', 'As zero', 1, 'It is a fixed cost that rises slowly.']
  ]),

  L('Assets and depreciation', '🏭', [
    ['f:Closing = Opening + Capex − Depreciation', 'The roll-forward', 'Every schedule follows the same shape: start, add, subtract, *end*.'],
    ['grid:#,#FY26E,#FY27E;Opening,1~000,*1~100;Capex,200,200;Depreciation,−100,−110;Closing,*1~100,1~190', 'The corkscrew', 'This year\'s closing balance becomes next year\'s *opening* balance.'],
    ['flow:Depreciation to P&L>Closing assets to balance sheet>Capex to cash flow', 'Where it goes', 'One schedule feeds *all three* statements.']
  ], [
    ['Opening assets ₹500 crore, capex ₹100 crore, depreciation ₹50 crore. Closing is…', '₹450 crore', '₹550 crore', '₹650 crore', 1, '500 + 100 − 50 = 550.'],
    ['This year\'s closing balance becomes…', 'Next year\'s opening balance', 'Next year\'s capex', 'Zero', 0, 'That link gives the schedule its corkscrew shape.']
  ]),

  L('The debt schedule', '🏦', [
    ['f:Closing debt = Opening + New loans − Repayments', 'Same shape again', 'Debt gets its own roll-forward schedule.'],
    ['f:Interest = Average debt × Interest rate|Average = (Opening + Closing) ÷ 2', 'Interest', 'Using the *average* balance allows for loans taken or repaid during the year.'],
    ['flow:Interest to P&L>Closing debt to balance sheet>Loans and repayments to cash flow', 'Where it goes', 'Again, one schedule feeds three statements.']
  ], [
    ['Opening debt ₹400 crore, closing ₹600 crore, rate 10%. Interest on average debt is…', '₹40 crore', '₹50 crore', '₹60 crore', 1, 'Average 500 × 10% = 50.'],
    ['A loan repayment shows up in the cash flow statement under…', 'Operating', 'Investing', 'Financing', 2, 'Borrowing and repaying are financing flows.']
  ]),

  L('Working capital', '🔄', [
    ['f:Receivable days = Receivables ÷ Sales × 365', 'Think in days', 'How many days of sales are customers yet to pay for?'],
    ['grid:#Item,#Forecast using;Receivables,Days of sales;Inventory,Days of cost of goods;Payables,Days of cost of goods', 'Three drivers', 'Assume the days, then back out the balance sheet number.'],
    ['f:Working capital = Receivables + Inventory − Payables|A rise uses cash. A fall frees cash.', 'It eats cash', 'A fast-growing company can be profitable and still *run out of cash* here.']
  ], [
    ['Sales ₹3,650 crore, receivable days 30. Receivables are…', '₹300 crore', '₹30 crore', '₹1,095 crore', 0, '3,650 ÷ 365 × 30 = 300.'],
    ['Working capital rises during the year. Cash…', 'Increases', 'Is used up', 'Is unaffected', 1, 'More money is tied up in stock and unpaid bills.']
  ]),

  L('Link the three statements', '🔗', [
    ['flow:Profit from P&L>Adds to reserves in balance sheet>Starts the cash flow>Closing cash returns to balance sheet', 'The loop', 'The three statements are one system. Profit and cash *travel* between them.'],
    ['f:Profit + Depreciation − Rise in working capital − Capex + Net borrowing − Dividends = Change in cash', 'Build the cash flow', 'Depreciation is added back because it reduced profit without using cash.'],
    ['f:Assets − Liabilities − Equity = 0', 'The balance check', 'Add this row for every year. If it is not zero, there is an error to *hunt down*.']
  ], [
    ['Depreciation is added back in the cash flow because it is…', 'A non-cash expense', 'A tax refund', 'A loan', 0, 'It lowered profit but no cash left the business.'],
    ['The balance check row should show…', 'Zero in every year', 'The profit', 'A growing number', 0, 'Assets must equal liabilities plus equity.']
  ])
]);

T({ id: 'fm2', after: 'fm1', group: 'model', name: 'Value the company', emoji: '💎', color: '#2E9BFF',
  blurb: 'Scenarios, free cash flow, WACC, DCF and sanity checks.',
  link: VARSITY('financial-modelling', 'Integrated Financial Modelling') }, [

  L('Scenarios and sensitivity', '🎛️', [
    ['bars:Bear=70,Base=100,Bull=140|Value per share, ₹', 'Three stories', 'Build a *base*, *bull* and *bear* case by changing a few key drivers together.'],
    ['grid:#Growth ↓ Margin →,#18%,#20%,#22%;8%,82,91,100;10%,*90,*100,*110;12%,99,110,121', 'A sensitivity table', 'It shows how value moves when *two* assumptions change. Excel builds it with a Data Table.'],
    ['🎯|Which input matters most?', 'Find the big lever', 'Spend your research time on the one or two assumptions that move the answer most.']
  ], [
    ['A sensitivity table shows…', 'How the result changes with two inputs', 'The company logo', 'Past share prices', 0, 'It maps outcomes across a grid of assumptions.'],
    ['A "bear case" is…', 'The most optimistic view', 'A pessimistic set of assumptions', 'A type of chart', 1, 'It tests what happens if things go badly.']
  ]),

  L('Free cash flow', '💧', [
    ['f:FCFF = EBIT × (1 − tax) + Depreciation − Capex − Rise in working capital', 'Cash for all funders', '*Free cash flow to the firm* is what is left for lenders and owners after running and growing the business.'],
    ['grid:#Step,#₹ crore;EBIT,200;Less tax at 25%,−50;Add depreciation,40;Less capex,−70;Less rise in working capital,−20;FCFF,*100', 'Worked example', '200 − 50 + 40 − 70 − 20 = *₹100 crore*.'],
    ['🧾 ≠ 💵', 'Why not just profit?', 'Profit ignores capex and working capital. Value comes from *cash* that can be taken out.']
  ], [
    ['EBIT 400, tax 25%, depreciation 50, capex 100, working capital rise 30. FCFF is…', '220', '320', '270', 0, '400 × 0.75 = 300. 300 + 50 − 100 − 30 = 220.'],
    ['FCFF belongs to…', 'Only shareholders', 'Lenders and shareholders together', 'Only the government', 1, 'It is measured before any payment to funders.']
  ]),

  L('The cost of capital', '⚖️', [
    ['f:Cost of equity = Risk-free rate + Beta × Equity risk premium|7% + 1.1 × 6% = 13.6%', 'What owners expect', 'Shareholders take more risk than lenders, so they expect *more return*.'],
    ['f:WACC = Equity share × Cost of equity + Debt share × Cost of debt × (1 − tax)', 'Blend the two', '*WACC* is the average return the company must earn to satisfy everyone who funded it.'],
    ['f:70% × 14% + 30% × 9% × (1 − 25%) ≈ 11.8%', 'Worked example', 'Interest is tax-deductible, so debt costs less after tax.']
  ], [
    ['Equity 60% at 15%, debt 40% at 10%, tax 25%. WACC is…', '12%', '13%', '25%', 0, '0.6 × 15 = 9. 0.4 × 10 × 0.75 = 3. Total 12%.'],
    ['Why is the cost of debt multiplied by (1 − tax)?', 'Interest is tax-deductible', 'Debt is illegal', 'Tax is optional', 0, 'The tax saving lowers the true cost of borrowing.']
  ]),

  L('Terminal value', '♾️', [
    ['f:Terminal value = Final year FCF × (1 + g) ÷ (WACC − g)', 'Beyond the forecast', 'You cannot forecast forever. One formula values all the years *after* your forecast.'],
    ['f:100 × 1.05 ÷ (12% − 5%) = ₹1,500 crore', 'Worked example', 'A tiny change in g or WACC moves this number a lot.'],
    ['pie:Forecast years=30%,Terminal value=70%|A typical DCF', 'Handle with care', 'Terminal value is often *most* of the total. Keep the growth rate modest, below the economy\'s long-run growth.']
  ], [
    ['Final FCF 200, g 4%, WACC 12%. Terminal value is…', '2,600', '1,667', '5,200', 0, '200 × 1.04 ÷ 0.08 = 2,600.'],
    ['A higher long-term growth rate makes terminal value…', 'Higher', 'Lower', 'Unchanged', 0, 'The numerator grows and the denominator shrinks.']
  ]),

  L('From firm value to share price', '🧮', [
    ['flow:Discount each FCF>Add discounted terminal value>Enterprise value>Subtract net debt>Equity value>Divide by shares', 'The last mile', 'Six steps take you from cash flows to a *value per share*.'],
    ['grid:#Step,#₹ crore;Enterprise value,5~000;Less net debt,−1~000;Equity value,4~000;Shares (crore),40;Value per share ₹,*100', 'Worked example', 'Net debt is debt minus cash. Lenders are paid before owners.'],
    ['🛟|Compare with the market price', 'Then decide', 'If the market price is well *below* your value, you may have a margin of safety. If above, ask what the market assumes.']
  ], [
    ['Enterprise value 2,000, debt 500, cash 100. Equity value is…', '1,600', '1,400', '2,400', 0, 'Net debt is 400. 2,000 − 400 = 1,600.'],
    ['Net debt means…', 'Debt minus cash', 'Debt plus cash', 'Only bank loans', 0, 'Cash in hand could repay part of the debt.']
  ]),

  L('Cross-check the answer', '🧪', [
    ['f:Peer EV/EBITDA × Your EBITDA = Implied enterprise value|10 × ₹300 crore = ₹3,000 crore', 'Relative valuation', 'Value the company using the *multiples* at which similar companies trade.'],
    ['bars:DCF=100,P/E of peers=90,EV/EBITDA of peers=110|Value per share by each method, ₹', 'Look for a range', 'No method gives the truth. Agreement between methods gives *confidence*.'],
    ['flow:Balance check is zero>No typed numbers in formulas>Margins near history>Growth is believable', 'Audit your model', 'Before trusting any output, walk through this list.']
  ], [
    ['Peers trade at 10 times EBITDA. Your company\'s EBITDA is ₹300 crore. Implied enterprise value is…', '₹30 crore', '₹3,000 crore', '₹310 crore', 1, '10 × 300 = 3,000.'],
    ['Using several valuation methods gives you…', 'One exact price', 'A sensible range', 'A tax deduction', 1, 'Valuation is a range, not a point.']
  ])
]);
