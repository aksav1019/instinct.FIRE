/* Thambi — MS Office: Excel, Word, PowerPoint, Outlook and Teams. Original lessons. */
var MS = function (path, name) { return { url: 'https://support.microsoft.com/' + path, label: 'Microsoft Support', sub: name }; };

T({ id: 'xl1', group: 'office', name: 'Excel basics', emoji: '📗', color: '#12B76A',
  blurb: 'Cells, formulas, lookups and the keys that save hours.',
  link: MS('excel', 'Excel help and training') }, [

  L('Cells, ranges and formulas', '🔲', [
    ['grid:#Item,#Qty,#Price,#Total;Pen,10,5,=B2*C2;Book,4,60,=B3*C3;Bag,1,700,=B4*C4', 'Every box has an address', 'Column letter plus row number: *B2* is column B, row 2.'],
    ['f:Every formula starts with =|=B2*C2', 'Formulas', 'Type = and then point at cells. Excel recalculates whenever those cells change.'],
    ['f:B2:B10 means B2 through B10|A colon makes a range', 'Ranges', 'Most functions work on a *range* of cells at once.']
  ], [
    ['How many cells are in the range A3:A7?', '4', '5', '7', 1, 'A3, A4, A5, A6, A7.'],
    ['Every Excel formula begins with…', '=', '#', '$', 0, 'The equals sign tells Excel to calculate.']
  ]),

  L('Relative and absolute references', '📌', [
    ['grid:#Qty,#Price,#Total;10,5,=A2*B2;4,60,*=A3*B3;1,700,*=A4*B4', 'Formulas shift when copied', 'Copy =A2*B2 down one row and it becomes =A3*B3. That is a *relative* reference.'],
    ['grid:#Reference,#What stays fixed;A1,Nothing;$A$1,Column and row;A$1,Row only;$A1,Column only', 'The dollar sign locks', 'Put $ in front of what must *not move* when you copy.'],
    ['keys:F4=Cycle through the $ locks', 'One key', 'Click a reference in the formula and press F4 to add or change the locks.']
  ], [
    ['You copy =A1*$B$1 one row down. It becomes…', '=A2*$B$1', '=A2*$B$2', '=A1*$B$1', 0, 'A1 shifts to A2. The locked $B$1 stays.'],
    ['Which key cycles through the $ locks?', 'F2', 'F4', 'F9', 1, 'F4 toggles absolute and relative references.']
  ]),

  L('The everyday five', '➕', [
    ['grid:#Marks,#Formula,#Result;45,=SUM(A2:A5),200;60,=AVERAGE(A2:A5),50;55,=MAX(A2:A5),60;40,=MIN(A2:A5),40', 'Sum, average, max, min', 'These four cover most daily work.'],
    ['vs:COUNT|Counts cells with numbers||COUNTA|Counts any cell that is not empty', 'And counting', 'Use COUNT for numbers and *COUNTA* for anything.'],
    ['keys:Alt+EQ=AutoSum the cells above', 'The fastest sum', 'Stand below a column of numbers and press Alt and = together.']
  ], [
    ['=AVERAGE(10,20,30) returns…', '20', '30', '60', 0, '60 ÷ 3 = 20.'],
    ['Which function counts all non-empty cells, including text?', 'COUNT', 'COUNTA', 'SUM', 1, 'COUNT ignores text. COUNTA does not.']
  ]),

  L('IF and friends', '🔀', [
    ['f:=IF(test, value if true, value if false)', 'Make Excel decide', 'IF checks a condition and returns one of two answers.'],
    ['grid:#Marks,#Result;72,=IF(A2>=40~"Pass"~"Fail");35,*Fail;40,*Pass', 'Example', 'Marks of 40 or more pass. Text answers go inside *double quotes*.'],
    ['grid:#Function,#Use;AND / OR,Combine several tests;IFS,Many conditions in a row;IFERROR,Show a fallback instead of an error', 'Helpers', '=IFERROR(A1/B1, 0) shows 0 instead of an ugly error.']
  ], [
    ['=IF(50>=40,"Pass","Fail") returns…', 'Pass', 'Fail', 'TRUE', 0, 'The test is true, so the first answer is returned.'],
    ['IFERROR is used to…', 'Create errors', 'Replace an error with a value you choose', 'Delete a cell', 1, 'It keeps sheets clean when a formula fails.']
  ]),

  L('Tables, sort and filter', '🗃️', [
    ['keys:Ctrl+T=Turn a range into a table,Ctrl+Shift+L=Filter arrows on or off', 'Make it a table', 'A table *grows by itself*, keeps its formatting and copies formulas down automatically.'],
    ['🔽|Click the arrow in a header', 'Sort and filter', 'Sort A to Z or largest first. Filter to show only the rows you need. Nothing is deleted.'],
    ['🧊|View, then Freeze Panes', 'Keep headers in sight', 'Freeze the top row so the headers stay visible while you scroll.']
  ], [
    ['Which shortcut turns a range into a table?', 'Ctrl+T', 'Ctrl+P', 'Ctrl+B', 0, 'Ctrl+T creates a table.'],
    ['Freeze Panes is used to…', 'Lock the file with a password', 'Keep headers visible while scrolling', 'Stop formulas calculating', 1, 'The frozen rows or columns stay on screen.']
  ]),

  L('Lookups', '🔎', [
    ['f:=XLOOKUP(what to find, where to look, what to return, if not found)', 'Fetch a matching value', 'Give it a code, it brings back the name, price or anything else on that row.'],
    ['grid:#Code,#Item,#Price;P1,Pen,5;B7,Book,60;*B7,=XLOOKUP(A4~A2:A3~C2:C3),*60', 'Example', 'Looking up B7 in the code column returns its price, *60*.'],
    ['vs:VLOOKUP|Looks only to the right;Needs a column number;End with FALSE for exact match||XLOOKUP|Looks in any direction;No column counting;Exact match by default', 'Old and new', 'On older Excel, use VLOOKUP or INDEX with MATCH.']
  ], [
    ['In VLOOKUP, the last argument FALSE asks for…', 'An exact match', 'An approximate match', 'No result', 0, 'FALSE (or 0) means exact match only.'],
    ['One advantage of XLOOKUP over VLOOKUP is that it…', 'Can look to the left', 'Works only with numbers', 'Needs no arguments', 0, 'The lookup and return columns can be anywhere.']
  ]),

  L('Add up with conditions', '🧮', [
    ['f:=SUMIFS(range to add, range to check, condition)', 'Sum only what matches', 'Add the sales, but only where the region is South.'],
    ['grid:#Region,#Sales;South,100;North,80;South,50;*South total,=SUMIFS(B2:B4~A2:A4~"South")', 'Example', 'The answer is *150*: rows 2 and 4 match.'],
    ['grid:#Function,#Does;COUNTIFS,Counts matching rows;AVERAGEIFS,Averages matching rows;SUMIFS,Adds matching rows', 'The family', 'All three accept several conditions, one pair after another.']
  ], [
    ['In SUMIFS, the first argument is the…', 'Range to add up', 'Condition', 'Sheet name', 0, 'Sum range first, then pairs of range and condition.'],
    ['To count how many orders came from "South", use…', 'COUNTIFS', 'SUM', 'MAX', 0, 'COUNTIFS counts rows that meet conditions.']
  ]),

  L('Speed keys', '⌨️', [
    ['keys:Ctrl+Arrow=Jump to the edge of the data,Ctrl+Shift+Arrow=Select to the edge,Ctrl+Space=Select the column,Shift+Space=Select the row', 'Move and select', 'Stop scrolling. These jump across thousands of rows instantly.'],
    ['keys:F2=Edit the cell,Ctrl+1=Format cells,Ctrl+;=Insert today\'s date,Ctrl+Z=Undo', 'Edit', 'F2 and Ctrl+1 alone will change how fast you work.'],
    ['keys:Ctrl+Alt+V=Paste special,Ctrl+E=Flash Fill,Ctrl+D=Fill down', 'Paste and fill', '*Paste special* lets you paste only values, dropping the formulas.']
  ], [
    ['Which key lets you edit the active cell?', 'F2', 'F5', 'F12', 0, 'F2 puts the cursor inside the cell.'],
    ['Paste special is opened with…', 'Ctrl+Alt+V', 'Ctrl+P', 'Ctrl+S', 0, 'Then choose Values, Formats and so on.']
  ])
]);

T({ id: 'xl2', after: 'xl1', group: 'office', name: 'Excel for analysis', emoji: '📊', color: '#0FB9B1',
  blurb: 'PivotTables, charts, finance functions and what-if tools.',
  link: MS('excel', 'Excel help and training') }, [

  L('PivotTables', '🔄', [
    ['flow:Click in your data>Insert>PivotTable>Drag the fields', 'Summaries in seconds', 'A PivotTable turns thousands of rows into a summary *without any formulas*.'],
    ['grid:#Area,#Put here;Rows,What to group by;Columns,A second grouping;Values,Numbers to add or count;Filters,What to include', 'Four boxes', 'Drag Region to Rows and Sales to Values, and you have sales by region.'],
    ['🔁|Right-click, then Refresh', 'Remember to refresh', 'A PivotTable does not update by itself when the data changes.']
  ], [
    ['Numbers you want added up go in the… area.', 'Rows', 'Values', 'Filters', 1, 'Values holds the sums, counts and averages.'],
    ['After the source data changes, you must…', 'Refresh the PivotTable', 'Rebuild it', 'Restart Excel', 0, 'Refresh pulls in the new data.']
  ]),

  L('Charts that tell the truth', '📈', [
    ['grid:#To show,#Use;Change over time,Line chart;Comparison between items,Bar or column chart;Parts of a whole,Pie or stacked bar;Relationship of two numbers,Scatter chart', 'Pick by purpose', 'Decide the *message* first. The chart type follows from it.'],
    ['keys:Alt+F1=Instant chart of the selected data', 'Fast start', 'Select your data and press Alt+F1 for a default chart on the sheet.'],
    ['✂️|One chart, one message', 'Clean it up', 'Write the conclusion as the title, start bars at zero and remove gridlines you do not need.']
  ], [
    ['Sales over twelve months are best shown with a…', 'Pie chart', 'Line chart', 'Scatter chart', 1, 'Lines show change over time.'],
    ['A good chart title states…', 'The file name', 'The conclusion', 'The font used', 1, 'Tell the reader what to see.']
  ]),

  L('Colour rules and dropdowns', '🚦', [
    ['grid:#Month,#Sales;Jan,40;Feb,*75;Mar,20;Apr,*90|Cells above 70 highlight themselves', 'Conditional formatting', 'Home, then Conditional Formatting. Cells *colour themselves* when they meet a rule.'],
    ['grid:#Rule type,#Good for;Highlight cells,Values above or below a limit;Data bars,A quick in-cell chart;Colour scales,Heat maps;Duplicate values,Spotting repeats', 'Four handy rules', 'Use one or two. A rainbow sheet says nothing.'],
    ['🔽|Data, then Data Validation, then List', 'Dropdown lists', 'Data validation limits what can be typed in a cell. A *dropdown* stops spelling mistakes at the source.']
  ], [
    ['Which feature colours cells automatically by their value?', 'Conditional formatting', 'Freeze panes', 'Spell check', 0, 'Rules decide the formatting.'],
    ['A dropdown list in a cell is made with…', 'Data validation', 'A PivotTable', 'Paste special', 0, 'Choose "List" as the validation type.']
  ]),

  L('Text and date functions', '🔤', [
    ['grid:#Formula,#Result;=LEFT("Thambi"~3),Tha;=LEN("Thambi"),6;=TRIM("  hi  "),hi;=UPPER("hi"),HI', 'Text tools', 'LEFT, RIGHT and MID cut text. TRIM removes stray spaces. TEXTJOIN glues pieces together.'],
    ['f:Dates are numbers in disguise|Tomorrow = today + 1', 'Dates', 'Excel stores each date as a day count, so you can *subtract* two dates to get the days between.'],
    ['grid:#Formula,#Gives;=TODAY(),Today\'s date;=EDATE(A1~3),Same day 3 months later;=EOMONTH(A1~0),Last day of that month;=NETWORKDAYS(A1~B1),Working days between', 'Date tools', 'These four handle most deadline and ageing calculations.']
  ], [
    ['=LEFT("Bengaluru",4) returns…', 'Beng', 'luru', '4', 0, 'The first four characters.'],
    ['A1 holds 1 January. =EDATE(A1,3) returns…', '4 January', '1 April', '31 March', 1, 'Same day, three months later.']
  ]),

  L('Dynamic arrays', '🪄', [
    ['grid:#City,#,#Result;Chennai,,*Chennai;Kochi,,*Kochi;Chennai,,*Mysuru;Mysuru,,;Kochi,,|Cell C2 holds =UNIQUE(A2:A6)', 'One formula, many cells', 'In modern Excel a single formula can *spill* results into the cells below.'],
    ['grid:#Function,#Returns;UNIQUE,Each value once;SORT,The range in order;FILTER,Only rows that match;SEQUENCE,A list of numbers', 'Four spill functions', '=FILTER(A2:C100, B2:B100>1000) returns every row with more than 1,000.'],
    ['🚧|##SPILL!', 'When it is blocked', 'A #SPILL! error means something is sitting in the cells the result needs. Clear them.']
  ], [
    ['Which function returns each value only once?', 'UNIQUE', 'SORT', 'SUM', 0, 'UNIQUE removes repeats.'],
    ['A #SPILL! error means…', 'The formula is too long', 'Cells needed for the result are not empty', 'The file is corrupt', 1, 'Clear the cells in the way.']
  ]),

  L('Money functions', '💰', [
    ['f:=PMT(rate ÷ 12, months, −loan)|₹10 lakh at 9% for 5 years ≈ ₹20,758 a month', 'EMI', 'PMT gives the fixed monthly payment on a loan.'],
    ['grid:#Function,#Answers;NPV,What are future cash flows worth today?;IRR,What yearly return do these cash flows give?;XIRR,The same but with real dates;FV,What will regular savings grow to?', 'Four more', 'Use *XIRR* for SIPs, where money goes in on many different dates.'],
    ['⚠️|NPV assumes the first cash flow is one period away', 'A common trap', 'Add today\'s investment *outside* the NPV formula: =NPV(rate, future flows) + initial outflow.']
  ], [
    ['Which function gives the return on a SIP with many dates?', 'XIRR', 'PMT', 'SUM', 0, 'XIRR uses the actual date of each cash flow.'],
    ['PMT calculates…', 'The EMI of a loan', 'The tax on a gain', 'The number of rows', 0, 'A fixed periodic payment.']
  ]),

  L('What-if tools', '🔮', [
    ['flow:Data>What-If Analysis>Goal Seek', 'Goal Seek', 'Tell Excel the *answer you want* and which cell it may change. It works backwards for you.'],
    ['grid:#Rate ↓ Years →,#3,#5,#7;8%,31~336,20~276,15~586;9%,*31~800,*20~758,*16~089;10%,32~267,21~247,16~601|EMI on ₹10 lakh', 'Data Table', 'One formula, a grid of results. This is how *sensitivity tables* are built.'],
    ['🎭|Best, base and worst', 'Scenario Manager', 'Save named sets of inputs and switch between them without retyping.']
  ], [
    ['Goal Seek is used when you know the… and need the input.', 'Desired result', 'File name', 'Font', 0, 'It solves backwards from the target.'],
    ['A Data Table shows…', 'Results for many input combinations', 'Only one answer', 'Deleted rows', 0, 'It fills a grid from a single formula.']
  ]),

  L('Clean and audit', '🧹', [
    ['grid:#Tool,#Fixes;Text to Columns,One cell holding many values;Remove Duplicates,Repeated rows;Find and Replace,Wrong spellings;Power Query,The same clean-up every month', 'Cleaning messy data', 'For a repeated import, *Power Query* remembers your steps and replays them.'],
    ['grid:#Error,#Means;##DIV/0!,Dividing by zero or a blank;##N/A,Lookup found nothing;##REF!,A referenced cell was deleted;##VALUE!,Text where a number is needed;##NAME?,Misspelt function name', 'Read the error', 'Each error tells you *what kind* of mistake to look for.'],
    ['keys:Ctrl+`=Show all formulas,Ctrl+[=Jump to the cells a formula uses', 'Audit', 'Formulas, then Trace Precedents, draws arrows from the inputs to the result.']
  ], [
    ['A #REF! error means…', 'A referenced cell was deleted', 'The number is too big', 'The file is read-only', 0, 'The formula points at something that no longer exists.'],
    ['A lookup that finds nothing returns…', '#N/A', '#DIV/0!', '0', 0, 'N/A means not available.']
  ])
]);

T({ id: 'wd', group: 'office', name: 'Word', emoji: '📘', color: '#2E9BFF',
  blurb: 'Styles, layout, review and mail merge.',
  link: MS('word', 'Word help and training') }, [

  L('Styles: the master switch', '🎨', [
    ['vs:Manual formatting|Select, bold, resize;Repeat for every heading;Slow and uneven||Styles|Click Heading 1;Every heading matches;Change once, all update', 'Stop formatting by hand', 'A *style* is a named bundle of formatting. Use Heading 1, Heading 2 and Normal.'],
    ['keys:Ctrl+Alt+1=Heading 1,Ctrl+Alt+2=Heading 2,Ctrl+Shift+N=Normal', 'From the keyboard', 'Apply the three main styles without touching the mouse.'],
    ['🪄|Right-click a style, then Modify', 'Change everything at once', 'Modify the style and every paragraph using it *updates together*.']
  ], [
    ['The big benefit of styles is that…', 'One change updates the whole document', 'Files get larger', 'Spell check turns off', 0, 'Formatting is controlled from one place.'],
    ['Ctrl+Alt+1 applies…', 'Heading 1', 'Bold', 'A page break', 0, 'It is the Heading 1 shortcut.']
  ]),

  L('Navigate and auto contents', '🧭', [
    ['🗺️|View, then Navigation Pane', 'A map of your document', 'With heading styles in place, the pane lists every heading. *Drag one* to move the whole section.'],
    ['flow:References>Table of Contents>Pick a style', 'Contents in two clicks', 'Word builds the table of contents from your *headings*, with page numbers.'],
    ['keys:F9=Update the selected table of contents', 'Keep it current', 'After editing, click the contents and press F9. Never type page numbers by hand.']
  ], [
    ['An automatic table of contents is built from…', 'Heading styles', 'Bold text', 'Footnotes', 0, 'That is why styles come first.'],
    ['Dragging a heading in the Navigation Pane…', 'Moves that whole section', 'Deletes it', 'Changes the font', 0, 'The heading and its content move together.']
  ]),

  L('Page layout and sections', '📐', [
    ['keys:Ctrl+Enter=Start a new page', 'Page breaks', 'Never press Enter many times to reach a new page. Insert a *page break*.'],
    ['📄 📄 🖼️ 📄|Only one page turned sideways', 'Section breaks', 'A *section break* lets one part have its own orientation, margins or page numbering. Find it under Layout, then Breaks.'],
    ['🔢|Insert, then Header and Footer', 'Headers and page numbers', 'Tick "Different First Page" to keep the cover page clean.']
  ], [
    ['To make only one page landscape, use…', 'Section breaks', 'A bigger font', 'Track Changes', 0, 'Sections can each have their own layout.'],
    ['Ctrl+Enter inserts…', 'A page break', 'A table', 'A comment', 0, 'The text after it starts on a new page.']
  ]),

  L('Review together', '🖍️', [
    ['keys:Ctrl+Shift+E=Track Changes on or off,Ctrl+Alt+M=New comment', 'Show your edits', 'With *Track Changes* on, every insertion and deletion is marked for the other person to see.'],
    ['✅ ❌|Accept or Reject', 'The author decides', 'On the Review tab, step through each change and accept or reject it.'],
    ['👥|Share, then edit together', 'Live co-authoring', 'Save to OneDrive or SharePoint and several people can edit the same file at the same time.']
  ], [
    ['Track Changes is turned on with…', 'Ctrl+Shift+E', 'Ctrl+T', 'Ctrl+B', 0, 'It toggles change tracking.'],
    ['Who normally accepts or rejects tracked changes?', 'The document\'s author', 'Nobody', 'The printer', 0, 'The reviewer suggests, the author decides.']
  ]),

  L('Tables, pictures and references', '🖼️', [
    ['📊|Insert, then Table', 'Tables', 'Use a table to line things up, never rows of spaces. Tick "Repeat Header Rows" for long tables.'],
    ['🖼️|Layout Options, then Wrap Text', 'Pictures', 'Choose *Square* or *Top and Bottom* so the picture stops jumping around your text.'],
    ['keys:Ctrl+Alt+F=Insert a footnote', 'References', 'Captions, cross-references and footnotes renumber themselves when you add or remove one.']
  ], [
    ['Ctrl+Alt+F inserts a…', 'Footnote', 'Formula', 'Font', 0, 'The number and note are created together.'],
    ['To align items in neat columns, use…', 'A table', 'Many spaces', 'A bigger margin', 0, 'Tables keep alignment when text changes.']
  ]),

  L('Mail merge and time-savers', '✉️', [
    ['flow:Write one letter>Connect an Excel list>Insert name and address fields>Preview>Finish', 'One letter, a hundred people', '*Mail merge* is on the Mailings tab. It personalises each copy from your list.'],
    ['keys:Ctrl+Shift+C=Copy formatting,Ctrl+Shift+V=Paste formatting,Ctrl+H=Find and replace,Shift+F3=Change case', 'Four time-savers', 'Shift+F3 flips text between lower case, Title Case and UPPER CASE.'],
    ['📑|File, then Save As, then PDF', 'Send it safely', 'Share the final version as a *PDF* so it looks the same on every device.']
  ], [
    ['Mail merge combines a document with…', 'A list of people', 'A video', 'A password', 0, 'Usually an Excel sheet of names and addresses.'],
    ['Shift+F3 changes…', 'Letter case', 'Page size', 'Line spacing', 0, 'It cycles through cases.']
  ])
]);

T({ id: 'pp', group: 'office', name: 'PowerPoint', emoji: '📙', color: '#FF7A1A',
  blurb: 'Clear slides, consistent design and confident delivery.',
  link: MS('powerpoint', 'PowerPoint help and training') }, [

  L('One slide, one idea', '💡', [
    ['vs:Topic title|Q3 sales||Message title|Q3 sales grew 18%, led by the South', 'Say it in the title', 'Write the title as a full sentence that states the *point*. The body proves it.'],
    ['✂️|If you can cut it, cut it', 'Fewer words', 'A slide is not a document. Keep what the audience must *see*, and say the rest aloud.'],
    ['f:Three points = three slides', 'Split, do not shrink', 'When a slide feels crowded, make another slide. Slides are free.']
  ], [
    ['The best slide title is…', 'A full sentence stating the message', 'One vague word', 'The date', 0, 'Readers should get the point from the title alone.'],
    ['A slide feels crowded. You should…', 'Shrink the font', 'Split it into more slides', 'Add a border', 1, 'One idea per slide.']
  ]),

  L('The Slide Master', '🧱', [
    ['flow:View>Slide Master>Edit fonts, colours and logo>Close', 'Design once', 'The *Slide Master* controls the look of every slide in the deck.'],
    ['🗂️|Title, content, two columns, section header', 'Layouts', 'Each layout under the master is a ready-made arrangement. Pick one instead of drawing text boxes.'],
    ['⏱️|Change the master, all slides follow', 'Why it matters', 'A font change that would take an hour by hand takes *ten seconds* here.']
  ], [
    ['Where do you set a font for the whole deck?', 'Slide Master', 'Each slide by hand', 'Presenter View', 0, 'The master cascades to every slide.'],
    ['A layout is…', 'A ready-made arrangement of placeholders', 'An animation', 'A printer setting', 0, 'Layouts live under the Slide Master.']
  ]),

  L('Align and arrange', '📏', [
    ['flow:Select the objects>Arrange>Align>Distribute', 'Line things up', 'Uneven edges make a slide look careless. Let PowerPoint *align and space* objects for you.'],
    ['keys:Ctrl+D=Duplicate,Ctrl+G=Group,Ctrl+Shift+C=Copy formatting,Ctrl+Shift+V=Paste formatting', 'Four keys', 'Duplicate one well-made shape instead of drawing new ones.'],
    ['keys:Shift+drag=Move in a straight line,Ctrl+drag=Copy while moving', 'Drag with a helper key', 'Hold Shift while resizing to keep the proportions.']
  ], [
    ['Ctrl+D in PowerPoint…', 'Duplicates the selection', 'Deletes the slide', 'Opens Design', 0, 'It copies and pastes in one step.'],
    ['To space three boxes evenly, use…', 'Distribute', 'Spell check', 'Zoom', 0, 'Align, then Distribute Horizontally or Vertically.']
  ]),

  L('Charts and visuals', '📊', [
    ['bars:North=40,South=95,East=45,West=50|Make the important bar stand out', 'Guide the eye', 'Colour the *one thing* you are talking about. Keep the rest quiet.'],
    ['✂️|Remove gridlines, borders and legends you do not need', 'Less ink', 'Label bars and lines directly instead of making people decode a legend.'],
    ['flow:Insert>SmartArt or Icons', 'Beyond charts', 'SmartArt turns a list into a process or cycle. Icons replace long labels.']
  ], [
    ['On a chart, colour should be used to…', 'Highlight the point you are making', 'Decorate every bar differently', 'Fill empty space', 0, 'Colour directs attention.'],
    ['Direct labels are better than a legend because…', 'The audience does not have to look back and forth', 'They are bigger files', 'They hide the data', 0, 'They reduce effort for the reader.']
  ]),

  L('Motion with purpose', '🎞️', [
    ['vs:Transition|Between two slides||Animation|On an object inside a slide', 'Two kinds of motion', 'Use both *sparingly*. Motion should explain, not entertain.'],
    ['🖱️|Appear, on click', 'Reveal step by step', 'Showing one point at a time keeps the audience with you, not reading ahead.'],
    ['🦋|Transitions, then Morph', 'Morph', 'Duplicate a slide, move things on the copy and apply *Morph*. PowerPoint animates the change smoothly.']
  ], [
    ['Morph is a…', 'Transition that animates changes between two slides', 'Chart type', 'Font', 0, 'It moves matching objects from one slide to the next.'],
    ['Animations are best used…', 'On every object', 'Only when they help explain', 'Never', 1, 'Purpose first.']
  ]),

  L('Present like a pro', '🎤', [
    ['keys:F5=Start from the first slide,Shift+F5=Start from this slide,B=Black out the screen,Esc=End the show', 'Show keys', 'Press B to blank the screen when you want all eyes on *you*.'],
    ['🖥️|Notes, timer and the next slide', 'Presenter View', 'Your laptop shows your notes and what is coming next. The audience sees only the slide.'],
    ['f:Type a slide number, then Enter|Jump straight to any slide', 'Answer questions fast', 'Rehearse aloud at least once. Then export a PDF as a backup.']
  ], [
    ['Shift+F5 starts the show from…', 'The current slide', 'The first slide', 'The last slide', 0, 'F5 alone starts from the beginning.'],
    ['Presenter View lets you see…', 'Your notes and the next slide', 'The audience\'s screens', 'Only a black screen', 0, 'The audience sees just the slide.']
  ])
]);

T({ id: 'ol', group: 'office', name: 'Outlook and Teams', emoji: '📬', color: '#0FB9B1',
  blurb: 'Calm inbox, clear mails, smooth meetings.',
  link: MS('outlook', 'Outlook help and training') }, [

  L('Tame the inbox', '📥', [
    ['flow:Delete>Do it if under 2 minutes>Delegate>Defer with a flag', 'Touch each mail once', 'Decide on every mail the first time you open it.'],
    ['⚙️|Rules', 'Let Outlook sort', 'A *rule* moves mails automatically, such as newsletters into a Read Later folder.'],
    ['🚩 🏷️', 'Flags and categories', 'Flag what needs action and colour-code by project. Then your flagged list is your to-do list.']
  ], [
    ['An Outlook rule can…', 'Move matching mails to a folder automatically', 'Write replies for you', 'Delete your account', 0, 'Rules act on incoming mail by conditions.'],
    ['A mail needs a one-minute reply. Best action?', 'Reply now', 'Flag it for next week', 'Mark it unread', 0, 'If it takes under two minutes, do it.']
  ]),

  L('Mails that get replies', '✍️', [
    ['vs:Weak subject|Update||Strong subject|Approve Q3 budget by Friday', 'Subject does the work', 'Put the *action and the deadline* in the subject line.'],
    ['grid:#Field,#For;To,People who must act;Cc,People who should know;Bcc,Hidden recipients', 'To, Cc, Bcc', 'Put the request in the first line. Background can follow.'],
    ['keys:Ctrl+R=Reply,Ctrl+Shift+R=Reply all,Ctrl+F=Forward,Ctrl+Enter=Send', 'Mail keys', 'Use *Schedule send* for mails written late at night.']
  ], [
    ['People in Bcc are…', 'Hidden from other recipients', 'Required to reply', 'Removed from the mail', 0, 'Other recipients cannot see them.'],
    ['Where should your request appear?', 'In the first line', 'In the last paragraph', 'Only in an attachment', 0, 'Lead with the ask.']
  ]),

  L('Calendar and meetings', '📅', [
    ['🗓️|Scheduling Assistant', 'Find a free slot', 'It shows everyone\'s free and busy times side by side, so you stop asking "when are you free?"'],
    ['📝|Purpose, agenda, what to prepare', 'Write a real invite', 'An invite with an agenda gets a *prepared* room. Without one, expect a longer meeting.'],
    ['⏲️|25 or 50 minutes', 'Leave gaps', 'End meetings five or ten minutes early so people can breathe before the next one.']
  ], [
    ['The Scheduling Assistant shows…', 'When attendees are free or busy', 'Their emails', 'Their salaries', 0, 'It overlays calendars to find a common slot.'],
    ['A good meeting invite always has…', 'An agenda', 'A funny picture', 'No end time', 0, 'People arrive prepared.']
  ]),

  L('Teams and OneNote', '💬', [
    ['vs:Chat|Quick and private;One person or a small group||Channel|Open to the whole team;Organised by topic;Easy to find later', 'Chat or channel?', 'Work that others may need later belongs in a *channel*.'],
    ['keys:Ctrl+Shift+M=Mute or unmute,Ctrl+E=Search,@=Mention someone', 'Teams keys', 'Use @mention when you need a *specific* person to respond.'],
    ['flow:Notebook>Section>Page', 'OneNote', 'One notebook per area of work, a section per project, a page per meeting. Everything is searchable.']
  ], [
    ['A decision the whole team should be able to find later goes in…', 'A channel', 'A private chat', 'A sticky note', 0, 'Channels are open and organised by topic.'],
    ['OneNote is organised as…', 'Notebook, section, page', 'Folder, file, cell', 'Slide, layout, master', 0, 'Three levels, all searchable.']
  ])
]);
