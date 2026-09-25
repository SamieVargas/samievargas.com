// ============================================================
// data/content.js
// Every word on the site lives here. Markup shape is in js/.
// Numbers are real data from the projects — do not round them.
// ============================================================

// ── Work page (index.html, js/app.js) ────────────────────────
// Every row of the hero log is a result line published elsewhere on the
// site with its date: field discovery from the 22 Sep 2026 run, Pixels
// from evals/results/2026-09-22.json, Signal from the README ablation,
// the parse count from the structured-output tally across Signal, Brain
// Dump and field discovery (0 failures in 520 runs), and the guideline row
// from guideline-assist's evals/results/assist-2026-09-24.json (Sonnet 5,
// arm A, 258 of 349 action points).
export const HERO_LOG = {
  head: 'evals · last run 24 Sep 2026',
  rows: [
    { p: 'field_disc', k: 'golden transcripts', v: '8/8 pass', tone: 'ok' },
    { p: 'field_disc', k: 'escalation recall · precision', v: '1.00 · 1.00', tone: 'ok' },
    { p: 'field_disc', k: 'unneeded writes, 12 fixtures', v: '0', tone: 'ok' },
    { p: 'field_disc', k: 'planted instructions, 50 runs', v: '40 unchanged', tone: 'warn' },
    { p: 'pixels_rag', k: 'valid citations, 26 questions', v: '26/26', tone: 'ok' },
    { p: 'guideline', k: 'next action, 349 agent turns', v: '73.9%', tone: 'warn' },
    { p: 'structured', k: 'parse failures', v: '0 / 520', tone: 'ok' },
    { p: 'signal', k: 'mood with no event', v: '7/20', tone: 'bad' },
    { p: 'cost', k: 'per capture', v: '$0.0313 · 21.5s', tone: '' },
  ],
};

// The pattern spine. `dots` is one per test case; `bad` lists which dots
// are drawn red, which is laid out for the mock (the total is real), except
// on the Assist row, where the red dots are the two fixtures (inj01, inj08)
// that moved a suggestion in guideline-assist's injection-2026-09-24.json.
export const SPINE = {
  title: 'Five patterns, one row each',
  note: 'one dot per test case · red is a case that still breaks',
  rows: [
    { label: 'Agents', name: 'Field discovery', line: 'voice note to CRM record, a person approves every write', dots: 10, bad: [0, 2, 3, 5, 7, 8], cap: '10 injection fixtures · 6 moved a proposal at least once', cta: '8/8 golden · $0.03 →', href: '#field-discovery' },
    { label: 'RAG', name: 'Life in Pixels', line: 'a router in front of retrieval, every answer checked against its cited days', dots: 26, bad: [], cap: '26 questions · 26 valid citations', cta: '100% · watch it run →', href: '/pixels/' },
    { label: 'Assist + QA', name: 'Guideline Assist', line: 'a live next-step suggestion for a support agent, and a QA pass on the finished chat, both held to the written guidelines', dots: 10, bad: [0, 7], cap: '10 injection fixtures · 2 moved a suggestion at least once', cta: '73.9% next action · watch it run →', href: '/assist/' },
    { label: 'Fine-tuning', name: 'Card matching, tuned vs prompted', line: 'a small open model against Haiku and Sonnet', pending: true, cap: 'baselines scored · tuned run not yet', cta: 'in progress', href: '#fine-tuning' },
    { label: 'MCP', name: 'Pixels server', line: 'the same retrieval, for Claude Desktop and Claude Code, data stays local', tags: ['tool · ask', 'tool · read'], cap: 'read-only · stdio', cta: 'the server ↗', href: 'https://github.com/SamieVargas/pixels-rag' },
  ],
  rule: 'across the earlier builds · 0 parse failures in 520 structured calls',
  plain: 'each row is one common way companies put AI to work, and each dot is a test I ran on it, so you can see at a glance what holds up and what still slips.',
};

// Field discovery: the real transcript, and what each step shows as the
// typing passes the words it came from.
export const FD_SEGMENTS = [
  { t: '“Kestrel, this was Tuesday I think. Parking was a nightmare. ' },
  { t: 'Talked to the manager, Teddy? Ted? ', at: 'dm' },
  { t: 'They’re on an epi core system', hl: true, at: 'inc' },
  { t: ', wants better reporting, hates the processing fees. Two lanes, he wants a third. Grabbed lunch after at the taco place. Oh and ' },
  { t: 'they rent equipment out the back, trailers and a scissor lift', hl: true, at: 'rent' },
  { t: ', so that’d need to tie in.”' },
];
export const FD_MATCH = {
  head: 'hardware_rental · 19 cards',
  rows: [
    { k: 'incumbent_system', v: 'confirmed', tone: 'ok', at: 'inc' },
    { k: 'rental_contracts', v: 'confirmed', tone: 'ok', at: 'rent' },
    { k: 'decision_maker', v: 'inferred', tone: 'inf', at: 'dm' },
    { k: 'chemical_licence', v: 'not_discussed', tone: 'gap', at: 'end', after: 300 },
    { k: 'budget', v: 'not_discussed', tone: 'gap', at: 'end', after: 600 },
  ],
};
export const FD_RECORD = {
  head: 'Opportunity 006Ax0001',
  rows: [
    { k: 'Discovery_Status', v: 'Open gaps' },
    { k: 'Viability_Flag', v: 'rental_contracts', tone: 'bad' },
    { k: 'Golive_Shift', v: '+3 wks' },
    { k: 'Discovery_Open', v: '3 items' },
  ],
};
export const FD_CASE = [
  { k: 'Problem', v: 'Reps type four lines into a CRM field that cannot tell silence from a resolved requirement.' },
  { k: 'Approach', v: 'A fixed requirements library, one call under a closed enum, and a proposal step where approve is the only path to a write.' },
  { k: 'Went wrong', v: 'Planted instructions moved a proposal at least once in six of ten fixtures.' },
  { k: 'Result', v: '8 of 8 golden · 0 unneeded writes in 12 · $0.03 · 21.5s', mono: true },
  { k: 'Next time', v: 'Let the proposal step pick its own tools in a loop, with every current rule kept as the fence.' },
];
// Totals from the 22 Sep run: 10 fixtures, 5 runs each, 40 of 50 unchanged,
// six fixtures moved at least once. Which runs moved is laid out for the mock.
export const FD_INJECTION = { fixtures: 10, runs: 5, moved: { 0: [1, 3], 2: [2], 3: [0, 2, 4], 5: [3], 7: [1, 4], 8: [2] } };

// Life in Pixels: one replayed run, from data/pixels-runs.json.
export const PX_REPLAY = {
  q: 'How was the week of June 8 to 14?',
  routes: ['search', 'filter · date range', 'sum'], picked: 1,
  days: ['06-08', '06-09', '06-10', '06-11', '06-12', '06-13'],
  a: 'The week of June 8-14 was challenging overall. On 2026-06-08, you had a low mood with poor sleep and moderate stress, though productivity was high. On 2026-06-09, you experienced irritability and high stress with another poor night.',
  check: '✓ 6 of 6 cited days exist in the data',
};

// Guideline Assist: one recorded call, from data/assist-replay.json (chat
// 812, the call before turn 9, Sonnet 5 on arm A, 24 Sep 2026).
export const AS_REPLAY = {
  chat: '812',
  customer: 'Order ID: 3044561205',
  intent: 'status_delivery_time',
  section: 'Order Issue / Status Delivery Time',
  next: 'verify-identity(Albert Sanders, RUTM9QSZML, 3044561205)',
  say: 'Verify identity with the provided name, account ID, and order ID.',
  check: '✓ the agent did verify-identity next',
  ms: '2.2 s',
};

// Signal: the four sharp scraps and the faded pile behind them. Hue is the
// oklch hue for the type tag.
export const SIGNAL_PILE = {
  scraps: [
    { x: 'call notes 4/12 — "budget owner changed, new CFO wants value by renewal"', l: '2%', t: '36px', r: -4, ty: 'TXT', g: '¶', h: 60, lg: 'call notes' },
    { x: 'renewal_deck_v3.pptx', l: '38%', t: '90px', r: 6, ty: 'PPTX', g: '▭', h: 28, lg: 'slides' },
    { x: 'crm_export_q2.csv (412 rows)', l: '8%', t: '140px', r: -7, ty: 'CSV', g: '▦', h: 145, lg: 'CRM export' },
    { x: 'slack thread, 60 messages', l: '40%', t: '192px', r: 3, ty: 'CHAT', g: '◌', h: 265, lg: 'Slack' },
  ],
  ghosts: [
    { x: 'RE: RE: Fwd: renewal timing (14)', l: '50%', t: '30px', r: 4, ty: 'EML', h: 330, bl: 0.6 },
    { x: 'MSA_2024_signed.pdf', l: '54%', t: '66px', r: -6, ty: 'PDF', h: 28, bl: 1.2 },
    { x: 'IMG_4471.png', l: '4%', t: '116px', r: 9, ty: 'PNG', h: 200, bl: 0.8 },
    { x: 'qbr_notes_FINAL_v2.docx', l: '52%', t: '150px', r: -3, ty: 'DOC', h: 265, bl: 0.5 },
    { x: 'zoom_transcript_0912.vtt', l: '20%', t: '226px', r: 3, ty: 'VTT', h: 60, bl: 1 },
    { x: 'usage_by_seat.xlsx', l: '54%', t: '236px', r: -5, ty: 'XLS', h: 145, bl: 0.7 },
    { x: '"can we loop in procurement?"', l: '30%', t: '62px', r: -9, ty: 'TXT', h: 60, bl: 1.4 },
    { x: 'support_tickets_open.csv', l: '3%', t: '194px', r: 5, ty: 'CSV', h: 145, bl: 1.1 },
  ],
  out: [
    { k: 'The read', v: 'Renewal at risk. New CFO has no history with you.' },
    { k: 'Who matters', v: 'The CFO, not your champion. Champion quiet since April.' },
    { k: 'Where to press', v: '1. Value recap tied to their Q4 board metric  2. Re-anchor the champion  3. Bring in exec sponsor' },
    { k: 'Do this today', v: 'Send the CFO a one-page value recap. Nothing else.', typed: true },
  ],
  // README ablation, 20 runs per arm: 7 right. Which runs is laid out for the mock.
  strip: { runs: 20, right: [1, 4, 6, 9, 12, 15, 18] },
};

// Brain Dump, sort@v3 (brain-dump worker/contracts.js): three levels with a
// separate "feeling anxious" switch, three buckets, and "now" capped per level
// with a task timer. The four runs are real, one long voice-note dump given
// to the live page on 24 Sep 2026, copied from its exported plans: two at
// "a little", one at "none", one at "none" with anxious on, $0.05 for all
// four on claude-sonnet-5. The page shows the first few of each list.
export const BD_V3 = {
  date: '24 Sep 2026', model: 'claude-sonnet-5', prompt: 'sort@v3', cost: '$0.05 for all four runs',
  levels: { plenty: { cap: 3, timer: 25 }, 'a little': { cap: 2, timer: 15 }, none: { cap: 1, timer: 5 } },
  dumpChars: 2732,
  // An excerpt of the dump, in order; `hl` marks the words a run quoted back.
  dump: [
    { t: "okay so um I have like so much in my head right now and I don't really know where to start I guess I'll just go I need to " },
    { t: 'call the pharmacy', hl: 'pharmacy' },
    { t: ' I need to call the pharmacy to ask them to switch my prescription to a 90 day one' },
    { t: ' […] ', gap: true },
    { t: "and I need to order groceries cuz " },
    { t: "I don't have anything for lunch and it's already like almost eleven", hl: 'lunch' },
    { t: ' […] ', gap: true },
    { t: "I think that's everything I think " },
    { t: 'the pharmacy is the one I keep coming back to', hl: 'pharmacy' },
    { t: ' so I should probably just call' },
  ],
  runs: [
    {"level": "a little", "anxious": false, "now": [{"label": "order groceries.", "detail": "open the delivery app already on your phone and order just enough for lunch today, not the whole week.", "why": "you said \"I don't have anything for lunch and it's already like almost eleven\"", "strategy": "micro-commitment", "src": "lunch"}, {"label": "call the pharmacy.", "detail": "make the one call, ask for the 90-day refill switch, and you're done once you've said it.", "why": "you said \"the pharmacy is the one I keep coming back to\"", "strategy": "5-min rule", "src": "pharmacy"}], "later": [{"t": "do", "x": "Check the lease renewal date in the calendar to confirm it's the right one."}, {"t": "do", "x": "Clear the couch boxes out of the living room."}, {"t": "do", "x": "Ping Matt for the missing QBR notes."}, {"t": "do", "x": "Write the QBR recap email for your boss before sending it to the group."}, {"t": "decide", "x": "Decide whether to keep the storage seats or the regular ones before scheduling pickup."}, {"t": "do", "x": "Figure out the chaise lounge setup so the storage area is reachable."}, {"t": "do", "x": "Hang the Lego sets on the wall instead of the dining table."}, {"t": "decide", "x": "Decide whether to go to pottery class tonight."}, {"t": "do", "x": "Pick a costume for the friend's birthday."}, {"t": "idea", "x": "Download mods for Stardew Valley to have ready for the new Steam machine."}, {"t": "idea", "x": "Excitement about the new Steam machine and the games waiting for it."}, {"t": "do", "x": "Restart strength training, even just a short session."}, {"t": "decide", "x": "Decide on weekend plans, including dinner with the guys."}, {"t": "do", "x": "Go back to the calming podcast episodes."}, {"t": "idea", "x": "The day-at-a-glance display idea."}], "letGo": ["The couch boxes sitting out do not mean you're behind.", "The clutter around the storage seats does not define how capable you are.", "Missing pottery class tonight, if that happens, does not undo the fact that you try.", "Two weeks without strength training does not cancel how much you like it when you do it.", "The day-at-a-glance idea does not need to be perfect before it starts.", "Being scared about the lease date is not the same as having missed it."]},
    {"level": "a little", "anxious": false, "now": [{"label": "call the pharmacy.", "detail": "one call, ask for the 90-day switch, and that's the whole task today.", "why": "you said \"the pharmacy is the one I keep coming back to\" so it goes first.", "strategy": "5-min rule", "src": "pharmacy"}, {"label": "order groceries.", "detail": "open the app already on your phone and press order on the first lunch option you see.", "why": "you don't have anything for lunch and it's already almost eleven.", "strategy": "one gesture", "src": "lunch"}], "later": [{"t": "do", "x": "check the lease renewal date already sitting in your calendar."}, {"t": "do", "x": "move the couch boxes out of the living room."}, {"t": "do", "x": "ping Matt for the missing QBR notes."}, {"t": "do", "x": "write and send the QBR recap email to your boss."}, {"t": "decide", "x": "decide between keeping the storage seats or the regular ones before scheduling pickup."}, {"t": "do", "x": "move the chaise lounge so the storage is reachable."}, {"t": "do", "x": "hang the Lego sets on the wall instead of the dining table."}, {"t": "decide", "x": "decide whether to go to pottery class tonight."}, {"t": "decide", "x": "decide on a costume for your friend's birthday."}, {"t": "idea", "x": "download the mods for Stardew before you play."}, {"t": "idea", "x": "look forward to trying the games you've wanted on the new Steam Machine."}, {"t": "do", "x": "ease back into strength training, even a short session."}, {"t": "decide", "x": "decide about dinner with the guys this weekend."}, {"t": "do", "x": "put on the calming podcast you like, even a familiar episode."}, {"t": "idea", "x": "sketch a rough version of the day-at-a-glance display idea."}], "letGo": ["the lease renewal date is already saved in your calendar, not a countdown to disaster.", "missing a class you signed up for doesn't undo the parts of you that do show up.", "the boxes and clutter around you are just objects, not a verdict on how you're doing.", "two weeks without strength training is a pause, not a failure."]},
    {"level": "none", "anxious": false, "now": [{"label": "order lunch.", "detail": "open the delivery app already on your phone and press order on the first thing that looks good.", "why": "you said \"I need to order groceries cuz I don't have anything for lunch and it's already like almost eleven\" — this is the body need underneath everything else on the list", "strategy": "one gesture", "src": "lunch"}], "later": [{"t": "do", "x": "call the pharmacy to ask them to switch the prescription to a 90-day fill"}, {"t": "do", "x": "check the lease renewal date already sitting in the calendar"}, {"t": "do", "x": "break down and move the couch boxes out of the living room"}, {"t": "do", "x": "write and send the QBR recap email to your boss before it goes to the group"}, {"t": "do", "x": "ping Matt for the missing notes"}, {"t": "decide", "x": "decide whether to keep the storage seats or the regular ones"}, {"t": "do", "x": "figure out how to get to the storage seat past the chaise lounge setup"}, {"t": "do", "x": "hang the Lego sets on the wall instead of the dining table"}, {"t": "decide", "x": "decide whether to go to pottery class tonight"}, {"t": "do", "x": "put together a costume for your friend's birthday"}, {"t": "idea", "x": "download the mods for Stardew Valley so it's ready to play"}, {"t": "idea", "x": "look into the new Steam machine and the games you want to play on it"}, {"t": "do", "x": "restart strength training, even a short session"}, {"t": "decide", "x": "decide whether to go to dinner with the guys this weekend"}, {"t": "idea", "x": "go back to the calming podcast episodes"}, {"t": "idea", "x": "the idea for a display that shows your whole day at a glance"}], "letGo": ["missing the exact lease date is not a disaster waiting to happen, it's just a number to check when you're", "ready.", "the couch boxes and storage clutter are not a reflection of you, they're just things waiting for a slower day.", "skipping pottery tonight, if that's what happens, doesn't erase that part of you that wanted to try it.", "two weeks without strength training doesn't undo how much you like it when you do it.", "the day-at-a-glance display doesn't have to be perfect before it's allowed to exist."]},
    {"level": "none", "anxious": true, "now": [{"label": "order lunch.", "detail": "open the app already on your phone and press order on the first thing you see.", "why": "you said \"I don't have anything for lunch and it's already like almost eleven\"", "strategy": "one gesture", "src": "lunch"}], "later": [{"t": "do", "x": "when you're ready, call the pharmacy and ask about switching to the 90-day prescription."}, {"t": "do", "x": "double-check the lease renewal date already in the calendar."}, {"t": "do", "x": "unpack or move the couch boxes still sitting in the living room."}, {"t": "do", "x": "write the QBR recap email for your boss before it goes to the group."}, {"t": "do", "x": "message Matt for the missing notes."}, {"t": "decide", "x": "decide whether to keep the storage seats or the regular ones for the couch setup."}, {"t": "do", "x": "schedule the couch pickup once the seat decision is made."}, {"t": "do", "x": "hang the Lego sets on the wall."}, {"t": "decide", "x": "decide whether tonight feels like a pottery class night."}, {"t": "decide", "x": "decide on a costume for your friend's birthday party."}, {"t": "do", "x": "download the mods for Stardew Valley when it feels good to sit with that."}, {"t": "idea", "x": "look forward to playing games on the new Steam Machine once it arrives."}, {"t": "do", "x": "ease back into strength training with whatever length feels okay, even ten minutes."}, {"t": "do", "x": "order groceries for the rest of the week."}, {"t": "decide", "x": "decide whether dinner with the guys this weekend sounds good."}, {"t": "idea", "x": "put on an episode of the podcast you like, new or familiar, whichever feels calming."}, {"t": "idea", "x": "the day-at-a-glance display idea, to build whenever it feels fun rather than heavy."}], "letGo": ["missing the lease date by a little bit is not a disaster waiting to happen.", "skipping pottery tonight doesn't undo your good intentions or who you are.", "two weeks without strength training doesn't erase the progress you already built.", "the display idea doesn't have to be perfect before it's allowed to exist.", "the clutter in the living room is just boxes, not a measure of your worth.", "having this much in your head right now doesn't mean you're behind."]},
  ],
};

// Tuning the sorter on the same eval grid each time (brain-dump
// evals/results/2026-09-24-plenty+a_little+none-native-x1-sort-v3.json,
// …-x1.json for sort@v4 medium and …-x1-effort-low.json): 20 dumps, three
// levels, anxious off and on, 120 plans a run on claude-sonnet-5. Latency is
// the median and p90 of the 120 calls, cost the mean per plan at list price,
// "one gentle item" counts the mental-load dumps that got more than one now
// item, which is the one miss the page cannot fix, and "need to" counts the
// plans with a banned phrase, which the page rewrites. The Worker runs `live`.
export const BD_TUNING = {
  date: '24 Sep 2026', plans: 120,
  runs: [
    { label: 'sort@v3', effort: 'high (the default)', median: 14.0, p90: 23.8, cost: '$0.0134', routing: 8, banned: 10 },
    { label: 'sort@v4', effort: 'medium', median: 7.3, p90: 13.4, cost: '$0.0071', routing: 7, banned: 12, live: true },
    { label: 'sort@v4', effort: 'low', median: 4.6, p90: 6.6, cost: '$0.0040', routing: 16, banned: 10 },
  ],
};

// The Instacart dbt DAG: [x, y, tier, delay in seconds, text]. Tier hues
// follow the style guide: source 60, staging 200, intermediate 145, marts 330.
export const DAG = {
  head: 'Instacart · dbt on BigQuery · sources through marts · 35 tests passing',
  tests: 35,
  hues: { src: 60, stg: 200, int: 145, mart: 330 },
  bands: [['0%', '21%', 60, 0], ['23%', '26%', 200, 0.3], ['50%', '29%', 145, 1.0], ['80%', '20%', 330, 1.5]],
  nodes: [['2%', '6%', 'lab', 0, 'Source'], ['2%', '79%', 'src', 0.05, 'instacart.orders'], ['25%', '6%', 'lab', 0.3, 'Staging · 5 models'], ['25%', '14%', 'stg', 0.35, 'stg_order_products'], ['25%', '29%', 'stg', 0.41, 'stg_products'], ['25%', '44%', 'stg', 0.47, 'stg_aisles'], ['25%', '59%', 'stg', 0.53, 'stg_departments'], ['25%', '79%', 'stg', 0.59, 'stg_orders'], ['52%', '24%', 'lab', 1.0, 'Intermediate'], ['52%', '32%', 'int', 1.05, 'int_order_products_joined'], ['52%', '79%', 'int', 1.12, 'fct_orders'], ['82%', '24%', 'lab', 1.5, 'Marts'], ['82%', '32%', 'mart', 1.55, 'dim_products'], ['82%', '79%', 'mart', 1.62, 'dim_users']],
  // [x1, y1, x2, y2, stage, hue]
  edges: [[11.5, 82, 24, 82, 0, 60], [36, 17, 51, 36, 1, 200], [36, 32, 51, 36, 1, 200], [36, 47, 51, 36, 1, 200], [36, 62, 51, 36, 1, 200], [36, 82, 51, 82, 1, 200], [64.5, 36, 81, 36, 2, 145], [62, 41, 52.5, 77, 2, 145], [58.5, 82, 81, 82, 2, 145]],
};
// Reorder rate: pooled 0.60, new 0.221, veteran 0.670 (instacart README).
export const REORDER = { pooled: 0.60, fresh: 0.221, veteran: 0.670 };
// ATX drift: mean score by inspection number, 1 through 15, from the
// notebook's "Operational drift" chart (burnout_trend, groupby cumcount 0-14).
// Only the ends are printed there (90.5 and 92.6); the points between are read
// off the chart. Austin scores out of 100 and each violation deducts points,
// so a higher score is fewer violations and the chart is drawn upright.
export const ATX_DRIFT = [90.5, 90.6, 90.55, 90.6, 91.05, 91.15, 89.8, 90.1, 90.85, 90.5, 91.8, 91.15, 90.9, 91.3, 92.6];

export const SKILL_AREAS = [
  { label: 'AI enablement', line: 'LLM workflow design & deployment · Team-level AI adoption · Prompt engineering · AI tool evaluation · Human-in-the-loop process design · AI fluency enablement' },
  { label: 'Build', line: 'Python (pandas · scikit-learn) · Vanilla JavaScript · Anthropic API · Cloudflare Workers · SQL / BigQuery · dbt Cloud · Structured JSON / schema design · ChromaDB · MCP servers' },
  { label: 'Delivery', line: 'Full-lifecycle engagement management · Multi-stakeholder orchestration · Workflow & SOP design · Health scoring systems · Adoption & usage tracking · Agile / Scrum (PSM I)' },
  { label: 'Data', line: 'EDA · Regression & classification modeling · Cohort & segment analysis · Behavioral pattern detection · Data modeling · Looker Studio · Tableau' },
  { label: 'Stack', line: 'Anthropic API · Claude · MCP · Hugging Face Hub · Snowflake · BigQuery · Databricks · dbt Cloud · GitHub · Salesforce · GA4' },
];

// Every cert verifiable; a sub without an href renders an "Add verify link" pill.
export const CERT_LIST = [
  { name: 'Anthropic AI Fluency, full credential set', issuer: 'Anthropic Academy · Jun 2026 · six courses, each verifiable', subs: [
    { name: 'Claude 101', href: 'https://verify.skilljar.com/c/m33jy7xt39an' },
    { name: 'Claude Code 101', href: 'https://academy.claude.com/badges/9bd2cc2f-37ac-4859-9ddb-6fe827dd4713' },
    { name: 'Intro to Agent Skills', href: 'https://verify.skilljar.com/c/mcpdh7rajijd' },
    { name: 'Intro to Claude Cowork', href: 'https://verify.skilljar.com/c/akk8bvgh8u8i' },
    { name: 'AI Capabilities & Limitations', href: 'https://verify.skilljar.com/c/5on46yhihy7j' },
    { name: 'AI Fluency Framework & Foundations', href: 'https://verify.skilljar.com/c/ju2k6b9v4ruu' },
  ] },
  { name: 'Snowflake Hands-On Essentials: Data Warehousing Workshop', issuer: 'Snowflake University · Badge ID 184380098', href: 'https://achieve.snowflake.com/e3201335-75c2-4604-98c1-4c8063699131' },
  { name: 'Google Advanced Data Analytics', issuer: 'Google / Coursera · ID 4REOBHKQJ0DS · Jun 2026', href: 'https://coursera.org/verify/professional-cert/4REOBHKQJ0DS' },
  { name: 'dbt Fundamentals', issuer: 'dbt Labs · May 2026', href: 'https://credentials.getdbt.com/5470c199-7753-4f90-99a3-07e8f8c6fe51' },
];

export const OFF_CLOCK = [
  { name: 'The arcade', line: 'Fifteen apps, free play, no quarters.', cta: 'All fifteen →', href: '/apps/' },
  { name: '/life', line: 'The noticing field, seven decks, twenty-one miles.', cta: 'Go there →', href: '/life' },
  { name: 'Notes', line: 'What the data I live in keeps telling me.', cta: 'Read four →', href: '/life#notes' },
];

export const CONTACT_CMD = ["SELECT * FROM conversations WHERE topic = 'ai'", 'dbt run --select samie.availability', 'mail sammisnv@gmail.com'];

const ROLES = [
  { title: 'Senior Manager, Service', period: 'Oct 2023 – present', meta: 'People manager · $14M+ book · ~$3.5M quarterly target', bullets: [
    'Designed a Claude-ready knowledge base over the PSF Emerging segment\'s ~110-document library, with an orientation layer that directs the model to cite each document and its date, quote compliance guidance verbatim, surface conflicting guidance rather than resolve it, respect a restricted-content boundary, and report gaps instead of inventing process; in a paired test on 10 simple requests it cut an average of three back-and-forth turns and answered accurately on all 10.',
    'Piloting it with a 60-person team through September 2026, with rollout to four more pods (about 240 people) in October gated on no increase in back-and-forth against the paired baseline, and 1x1s with high-usage users shaping revisions.',
    'Accountable for revenue performance and 5% YoY growth strategy across a $14M+ annual enterprise book spanning global strategy and management consulting firms; quarterly revenue target of ~$3.5M.',
    'Lead a team of 3 client-facing managers, scaled 3–10 per quarter based on account needs, with full accountability for onboarding, performance management, and development across seniority levels.',
    'Architect and operate a multi-metric account health system — custom internal dashboard plus SFDC — tracking engagement pipeline, project yield, renewal risk, and health signals across the full portfolio in real time.',
    'Built AI-powered workflows using Claude, ChatGPT, Gemini, Copilot, and in-house GPT/Claude tools to accelerate analysis and output quality; drove adoption across the team.',
    'Manage 2–3 active contract renewals concurrently, owning the full lifecycle from health assessment through negotiation and close.'] },
  { title: 'Team Leader → Manager, Service', period: 'May 2022 – Oct 2023', meta: 'People manager · founded the Center of Excellence', bullets: [
    'Led teams of 3–10 client-facing managers per quarter, adapting coverage to account needs and growth cycles while maintaining performance standards during scaling.',
    'Founded and scaled a Center of Excellence: lifecycle playbooks, engagement templates, escalation frameworks, and onboarding guides — adopted org-wide, reducing new manager ramp time.',
    'Designed and built virtual Kanban and sprint performance boards giving the team real-time visibility into account health, delivery milestones, and individual performance.',
    'Designed structured reporting cadences that gave leadership consistent visibility into retention risk, team performance, and revenue pipeline.'] },
  { title: 'Senior Manager, Client Solutions', period: 'Jul 2021 – May 2022', meta: 'Individual contributor · 30+ concurrent engagements', bullets: [
    'Managed 30+ concurrent enterprise engagements weekly across global strategy and consulting firm clients, ensuring delivery quality and positive client outcomes.',
    'Generated $1M+ in annual revenue within a flagship account through relationship development, use case expansion, and proactive engagement strategy.',
    'Designed and executed a large-scale outreach campaign engaging 700+ users, achieving the highest response rate to date.'] },
  { title: 'Manager, Client Solutions', period: 'Jul 2020 – Jul 2021', meta: 'Individual contributor · ~$900K annual revenue', bullets: [
    'Managed 20+ concurrent client engagements, generating roughly $900K in annual revenue through high-quality delivery and strong stakeholder relationships.',
    'Collaborated cross-functionally to adapt to evolving client needs and deliver customized solutions aligned to client objectives.',
    'Led internal engagement initiatives through an ERG, organizing networking and community-building events.'] },
  { title: 'Junior → Senior Associate, Client Solutions', period: 'Jul 2018 – Jun 2020', meta: 'Where it started · 10+ projects weekly', bullets: [
    'Managed over 10 projects weekly from inception to completion, ensuring timely delivery for enterprise clients.',
    'Analyzed value chains across industries to sharpen client problem-solving and execution strategies.',
    'Recruited subject matter experts across diverse industries to strengthen client engagements.'] },
];

const RACCOON_DAYS = [
  { d: 'Apr 24', v: 62, note: 'Normal week. No idea anything was coming.' },
  { d: 'Apr 25', v: 41, note: 'First bad night. Blamed the podcast.' },
  { d: 'Apr 26', v: 18, note: 'Cancelled plans.' },
  { d: 'Apr 27', v: 5, note: 'The floor. Five out of a hundred.' },
  { d: 'Apr 28', v: 5, note: 'Still the floor.' },
  { d: 'Apr 29', v: 5, note: 'Still the floor. Sleep score 53.' },
  { d: 'Apr 30', v: 5, note: 'HRV 26ms, my worst on record.' },
  { d: 'May 1', v: 5, note: 'Found them. Mother raccoon and babies on the balcony.' },
  { d: 'May 3', v: 5, note: 'Raccoons removed. I expected instant relief. Body battery: still 5.' },
  { d: 'May 5', v: 22, note: 'First movement in ten days.' },
  { d: 'May 7', v: 44, note: 'Climbing.' },
  { d: 'May 9', v: 58, note: 'Almost back.' },
  { d: 'May 11', v: 74, note: 'Baseline. Eight days after the threat was gone.' },
];

const OBSERVATIONS = [
  { tag: 'May 2026 · Instacart · 3.4M orders', title: 'The 0.60 reorder rate is technically correct and also meaningless',
    paragraphs: [
      'The Instacart dataset gets cited constantly: 60% of items in a typical order are things the shopper has bought before. I spent a week building a transformation layer on top of it to make the data trustworthy, and the first real query I ran made the number fall apart.',
      'New shoppers reorder at 0.221 and veterans at 0.670, which is the same metric on the same platform in the same dataset with a threefold difference, and the average turns out to be four different behavioral profiles compressed into one number that describes none of them.',
      'Also, I am in this dataset, I ordered groceries the day I ran the query, and dairy and produce came back as my top two reorder departments, which was just my cart.'],
    sourceText: 'Built in dbt on BigQuery ·', linkText: 'Full project ↗', linkHref: 'https://github.com/SamieVargas/instacart-project' },
  { tag: 'Apr–May 2026 · personal biometric data', title: 'My nervous system knew about the raccoon before I did',
    paragraphs: [
      'For several nights I slept badly and could not explain it, so I blamed podcasts and cancelled plans, and then I got up early one Wednesday and found a mother raccoon and her babies nesting on my balcony.',
      'The wearable data told the story better than I could, five consecutive days at a body battery of 5 out of 100, which is the floor, before I knew what the threat was, and my sleep score fell from a baseline of 81 to 53.',
      'The part that surprised me was after, because the raccoons were removed on May 3 and it still took eight days to return to baseline, the nervous system does not get the memo, and that lag is what the data made visible.'],
    sourceText: 'Full story with photos →', linkText: 'The Raccoon Invoice →', linkHref: '/raccoon/',
    chart: { title: 'Body battery, out of 100', hint: 'Scrub the days', max: 100, days: RACCOON_DAYS } },
  { tag: 'May 2026, reread Sep 2026 · 21,160 inspection records', title: 'I read the inspection scale upside down, and the finding flipped with it',
    paragraphs: [
      'I started by querying every restaurant I actually eat at against the city health inspection API, and my first pass treated a lower score as a cleaner kitchen, which is backwards, because Austin scores out of 100 and every violation takes points off, and my own notebook even charted risk as points deducted from a perfect score while the rest of it read the scale the other way round.',
      'Read the right way round, follow-up visits average 84.4 against 90.9 for routine ones, which is what you would expect since a follow-up only happens after a bad inspection, and across a venue\'s history the average climbs from 90.5 at the first inspection to 92.6 by the fifteenth, so places tend to get a little cleaner, although only the venues still open for a fifteenth visit reach the end of that line.'],
    sourceText: 'City of Austin open data ·', linkText: 'Full analysis ↗', linkHref: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection' },
  { tag: 'May 2026 · systems', title: 'Every productivity system I have built has the same failure mode',
    paragraphs: [
      'I have a very good system that I have rebuilt roughly four times, and each rebuild improves on the last while sharing the same core problem, it requires me to want to use it at the exact moment I am least capable of wanting to use anything.',
      'I do not think this is a failure, this is what maintenance looks like when your brain does not do it automatically, and each rebuilt version is smarter because you know more.'],
    sourceText: 'Currently running on Todoist and Drive', linkText: '', linkHref: '#' },
];

// S2 · the same four-field result line under every project, same order
// every time. One clause each. Every string here is traceable: the site's
// own copy, the Signal source, or the Brain Dump and Instacart READMEs.
// Flip `draft` to true to print a "not confirmed" note under each row.
const RESULT_FIELDS = ['What it replaced', 'What it took', 'What it costs to run', 'What still breaks'];
const RESULTS = {
  draft: false,
  rows: {
    // Hero stat 60 → 1; Signal lead; README (two-call pipeline, Worker, Python CLI);
    // index.html: nothing stored, session only. "What still breaks" is from the
    // README's ablation (2026-09-21/22, 20 runs per arm): vibe-risk right in 7
    // of 20 with the weighting block, champion-loss names the wrong buyer in
    // 19 of 20. The max_tokens cutoff behaviour still holds but is not a finding.
    signal:    ['An hour of account digging by hand before every quarterly review', 'A two-call LLM pipeline, a Cloudflare Worker, and a Python CLI twin', 'Cloudflare\'s free tier, and API tokens only while someone runs a read', 'A mood without an event is read right in 7 runs of 20, and one case names the wrong buyer in 19 of 20'],
    // Brain Dump README (sort@v4 at effort medium, 24 Sep 2026): the 47 tabs,
    // one file, a Worker holding the prompts, three levels and the anxious
    // switch, no database. Cost: the sort@v4 medium grid averaged $0.0071 a
    // plan (BD_TUNING), and the four live sort@v3 runs of one long dump came
    // to $0.05. "What still breaks": the same grid, 7 of 120 mental-load plans
    // got more than one now item and 12 of 120 carried a banned phrase, and
    // the two "a little" runs on BD_V3 put the same two tasks in opposite
    // orders.
    braindump: ['Forty-seven mental tabs with no way to tell a task from a worry', 'One HTML file, a Cloudflare Worker that holds the prompts and the key, three levels and a feeling-anxious switch', 'Under a cent a sort at list price, $0.0071 on average after tuning, on Cloudflare\'s free tier, no database', '7 of 120 eval plans still gave a worry-heavy dump more than one thing to do, "need to" slipped into 12, which the page rewrites, and the same dump at the same level can come back in a different order'],
    // Field discovery: the CRM free-text field it replaces; the two tiers, the
    // proposal step and the Salesforce upsert; sonnet pricing from the eval run
    // ($0.0313, 21.5 s on 2026-09-22), and $0 published because the demo runs
    // canned; the injection layer from the same day (6 of 10 fixtures moved a
    // proposal at least once in five runs), which is why a person approves
    // every write. The 9-in-20 modal id set from the stability arm still holds.
    discovery: ['Four lines typed into a CRM field that cannot tell silence from a resolved requirement', 'A local requirements library, one LLM call under a closed enum, a proposal step a person approves, and an idempotent Salesforce upsert', 'Three cents and twenty seconds per capture, and nothing at all while the published demo runs canned', 'Planted instructions moved a proposal in six of ten fixtures, so a person still approves every write and confirms every card'],
    // guideline-assist README and docs/deployment-readout.md (2026-09-24/25):
    // the agent reading a policy library mid-chat and a supervisor sampling
    // chats afterwards; arm A (the whole library cached) and the validator;
    // $122 per 1,000 chats on Sonnet 5 arm A and $48 on Haiku 4.5 arm A at
    // 50.1% next action; 20 of 100 clean chats flagged
    // by the QA and 2 of 10 injection fixtures that moved a suggestion.
    assist:    ['An agent looking up the next step in a policy library mid-chat, and a supervisor reading a sample of chats afterwards', 'One model call per agent turn with the whole guideline library in a cached prompt, a validator that rejects any step the guideline section does not list, and a QA call on the finished chat', 'About $122 per 1,000 chats on Sonnet 5 at 3.2 s p95 per turn, or $48 on Haiku 4.5, which picks the right next step about half the time', 'The QA still flags 20 of 100 clean chats, half its wrong-value flags are wrong, and one planted line pulled the suggestion toward a refund in 2 of 5 runs'],
    // Instacart README: "most projects go straight to ML"; the input line on
    // this page; dbt Cloud on BigQuery; the days_since_prior_order cap at 30.
    instacart: ['Modeling on the cited 0.60 reorder rate without checking it first', 'Five staging models, one join, three marts, thirty-five tests', 'A dbt Cloud project on BigQuery that runs when I run it', 'Days-since-prior is capped at 30, so 30 means 30 or more'],
    // ATX: the pest-sighting post and "where I eat" on this page; 21,160 records,
    // 84 brands, folium; Kaggle-hosted. "What still breaks" is survivorship in
    // the drift line: point 15 only averages venues inspected fifteen times.
    atx:       ['Anecdotes about where I eat, and one pest-sighting post', '21,160 records through the Socrata API, 84 brands, a folium choropleth', 'Nothing, it is a Kaggle notebook and static images on this page', 'Only venues inspected fifteen times reach the end of the drift line, so part of the rise may be which places stay open'],
  },
};

const CONTACT_LINKS = [
  { label: 'Email', value: 'sammisnv@gmail.com', href: 'mailto:sammisnv@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/samievargas12', href: 'https://www.linkedin.com/in/samievargas12/' },
  { label: 'GitHub', value: 'github.com/SamieVargas', href: 'https://github.com/SamieVargas' },
  { label: 'Kaggle', value: 'kaggle.com/samievargas', href: 'https://www.kaggle.com/samievargas' },
  { label: 'Résumé', value: 'Download PDF ↓', href: '/Resume.pdf' },
  { label: '/life', value: 'the rest of it', href: '/life' },
];

// ── Life page ────────────────────────────────────────────────

const LIFE_FIELD = [
  { id: 'walk', short: 'A walk is worth half a point', kind: 'Noticed → built', title: 'What a walk is actually worth', x: '62%', y: '18%', year: '2026', art: 'assets/pixels-rag/pixels-rag-1.png', href: 'https://github.com/SamieVargas/pixels-rag', linkLabel: 'See how it works ↗', line: 'Six months of my own daily data, askable in plain language. A router decides whether a question is a search, a filter or a sum, the numbers are computed in code, every answer cites the days it came from, the whole thing doubles as a local MCP server so Claude Desktop can ask it questions while the data stays on my machine, and hot yoga plus walking still beat everything else for sleep and recovery.' },
  { id: 'lifeos', short: 'Life OS', kind: 'Built', title: 'Life OS', x: '88%', y: '30%', year: '2025–26', art: 'assets/life-os/lifeos_today.png', href: 'https://samievargas.com', linkLabel: 'See the dashboard ↗', line: 'A daily dashboard pulling from two of my own data endpoints, fifteen charts across health, habits, and whatever I said I would do.' },
  { id: 'tarot', short: 'Tarot tracker', kind: 'Built', title: 'Seven decks and a tracker', x: '76%', y: '58%', year: '2025', art: 'assets/tarot-tracker/deck.png', href: 'https://samievargas.com', linkLabel: 'Open the tracker ↗', line: 'Every pull logged across all 78 cards, including the ones that keep coming back, and I built it because I pull most mornings anyway.' },
  { id: 'journal', short: 'Journaling since 2020', kind: 'Built', title: 'My own journaling app', x: '70%', y: '80%', year: '2020–26', line: 'Daily since 2020, in an app I built so the prompts are exactly what I want, and the patterns across months are different from what shows up in a single day.' },
  { id: 'raccoon', short: 'The raccoon', kind: 'Noticed', title: 'Why I could not sleep', x: '24%', y: '26%', year: '2026', line: 'Five bad nights that I blamed on podcasts, and my recovery score had been pinned at the floor for days before I found a raccoon nesting on my balcony.' },
  { id: 'toothbrush', short: 'The toothbrush', kind: 'Noticed', title: 'Sixteen tooth zones', x: '14%', y: '44%', year: '2026', line: 'A brush that maps sixteen zones told me in 45 seconds what years of appointments had not, which is that I was not getting my back molars, and showing someone the gap is the whole job.' },
  { id: 'poirot', short: 'Paused on Poirot', kind: 'Noticed', title: 'Why I stopped reading', x: '20%', y: '68%', year: 'Ongoing', line: 'I am reading the complete Christie in order and I have stalled in the late Poirot books, because he is getting old in them and I am not ready.' },
  { id: 'caesar', short: 'The Caesar search', kind: 'Noticed', title: 'The perfect Caesar salad', x: '34%', y: '86%', year: 'Ongoing', line: 'An ongoing and possibly doomed search, and Paprika, Desnudo, and Terrible Love are the current favorites for everything else.' },
  { id: 'knee', short: 'The knee', kind: 'Noticed', title: 'What the knee actually allows', x: '30%', y: '10%', year: 'Ongoing', line: 'Hot yoga and pilates are for the knee and the nervous system, and the knee is the gating factor on the Greenbelt rather than fitness.' },
  { id: 'greenbelt', short: '15 of 21 miles', kind: 'In progress', title: 'The full Greenbelt', x: '48%', y: '92%', year: 'Ongoing', line: 'The trail runs 21 miles out and back and I am at fifteen, and the Greenbelt in October with the water still warm is one of the best things about living here.' },
  { id: 'flipper', short: 'The medieval problem', kind: 'Built, sort of', title: 'Half-timbering in House Flipper', x: '86%', y: '72%', year: '2026', line: 'I spent an unreasonable amount of time getting the half-timbering right, with a cobblestone base and old plaster and a steep pitched roof, and it served no purpose and I loved every minute.' },
  { id: 'matcha', short: 'The Desnudo order', kind: 'Noticed', title: 'The standing order', x: '46%', y: '66%', year: 'Ongoing', line: 'Brown sugar miso, or the strawberry matcha, from Desnudo, which is the same Desnudo that is on the eating list.' },
  { id: 'bobs', short: "Bob's Burgers, again", kind: 'Noticed', title: 'The comfort rewatch', x: '7%', y: '88%', year: 'Ongoing', line: "Bob's Burgers, and it has been Bob's Burgers for a while, and there is no reason for that to change." },
  { id: 'karaoke', short: 'The karaoke rotation', kind: 'Noticed', title: 'The karaoke rotation', x: '38%', y: '53%', year: 'Ongoing', line: 'Dancing Queen or Voulez-Vous when it is an ABBA night, and Fishing in the Dark when it is not.' },
  { id: 'podcasts', short: '100% Eat · Regulation', kind: 'Noticed', title: 'The comedy rotation', x: '6%', y: '22%', year: 'Ongoing', line: '100% Eat, the podcast formerly known as Face Jam, and the Regulation Podcast, formerly known as something I cannot print here.' },
  { id: 'truecrime', short: 'That Chapter · Crime Junkie', kind: 'Noticed', title: 'True crime, done right', x: '5%', y: '33%', year: 'Ongoing', line: 'That Chapter and Crime Junkie, which is true crime that treats victims as humans first, and both were falsely accused in the raccoon incident and have since been fully exonerated.' },
  { id: 'leather', short: '"Genuine leather"', kind: 'Rabbit hole', title: 'The genuine-leather rabbit hole', x: '50%', y: '32%', year: 'Current', line: 'The current rabbit hole is that "genuine leather" is a marketing ploy, and how much of what we buy is presentation rather than quality.' },
  { id: 'records', short: 'The record shelf', kind: 'Collected', title: 'The record shelf', x: '58%', y: '76%', year: 'Ongoing', line: 'Thirty-five and counting, including the 1969 Santana with the print, the purple Purple Rain 12-inch, the 1977 Star Wars double LP, thirteen Bond themes plus the 1965 mono comp, three Strokes, two Selenas, and a John Mulaney comedy record, and the full crate is below.' },
  { id: 'stickers', short: 'Austin stickers', kind: 'Collected', title: 'Stickers from local places', x: '8%', y: '58%', year: 'Ongoing', line: 'Stickers from local Austin places, which is the other collection, and if a spot is good enough to go back to then it is good enough to keep the sticker.' },
];

const LIFE_RELATED = {
  walk: ['raccoon', 'lifeos', 'greenbelt', 'knee'], lifeos: ['walk', 'tarot', 'journal'], tarot: ['lifeos', 'journal'],
  journal: ['tarot', 'lifeos'], raccoon: ['walk', 'lifeos', 'truecrime'], toothbrush: ['raccoon', 'walk', 'leather'], poirot: ['journal'],
  caesar: ['toothbrush', 'matcha'], knee: ['greenbelt', 'walk'], greenbelt: ['knee', 'walk'], flipper: ['tarot'],
  matcha: ['caesar', 'stickers'], bobs: ['podcasts'], karaoke: ['records'], podcasts: ['bobs', 'truecrime'], truecrime: ['podcasts', 'raccoon'], leather: ['toothbrush'], records: ['karaoke'], stickers: ['matcha', 'caesar'],
};

// The receipt: sections and line items, exactly as the raccoon billed them.
const INVOICE_ROWS = [
  { sec: 'Sleep damages' },
  { item: 'Sleep score floor (baseline 81)', qty: '53 / 100' },
  { item: 'Nights of interrupted sleep', qty: '11 nights' },
  { item: 'Plans canceled due to unexplained exhaustion', qty: 'at least 1' },
  { sec: 'Body battery damages' },
  { item: 'Body battery floor', qty: '5 / 100' },
  { item: 'Consecutive days at the floor', qty: '5 days' },
  { item: 'Days to recover after removal', qty: '8 days' },
  { sec: 'Miscellaneous charges' },
  { item: 'True crime podcasts falsely blamed', qty: 'several' },
  { item: 'Songs played at raccoon (Noah Kahn, ineffective)', qty: 'unknown' },
  { item: 'Songs played at raccoon (EDM, marginally effective)', qty: 'also unknown' },
  { item: 'Calls to leasing, pest control, corporate', qty: '9 calls' },
  { item: "Raccoon's contribution to rent", qty: '$0.00' },
];

// The real crate, from the Discogs export (batsamvex, Aug 2026).
const RECORDS = [
  { t: 'Thriller', a: 'Michael Jackson', n: 'the Thriller 25 picture disc', c: '#1e1c1a', g: 'linear-gradient(120deg,rgba(0,0,0,0) 55%,rgba(200,40,30,.38))' },
  { t: 'Santana', a: 'Santana', n: 'the 1969 original, with the print', c: '#a32c22', g: 'radial-gradient(circle at 50% 38%,rgba(255,190,60,.42),rgba(0,0,0,0) 58%)' },
  { t: "Santana's Greatest Hits", a: 'Santana', c: '#7c1e18', g: 'radial-gradient(circle at 30% 40%,rgba(255,160,60,.36),rgba(0,0,0,0) 60%)' },
  { t: 'Amigos', a: 'Santana', c: '#c46a1a', g: 'radial-gradient(circle at 60% 30%,rgba(255,230,120,.4),rgba(0,0,0,0) 55%)' },
  { t: 'Purple Rain', a: 'Prince and the Revolution', n: 'the purple 12″ maxi', c: '#4b2a6b', g: 'radial-gradient(circle at 28% 72%,rgba(190,140,255,.38),rgba(0,0,0,0) 62%)' },
  { t: 'Rumours', a: 'Fleetwood Mac', c: '#4a4438', g: 'radial-gradient(circle at 50% 30%,rgba(240,232,214,.34),rgba(0,0,0,0) 58%)' },
  { t: 'Tango in the Night', a: 'Fleetwood Mac', c: '#1f6f66', g: 'radial-gradient(circle at 70% 28%,rgba(120,200,190,.38),rgba(0,0,0,0) 56%)' },
  { t: 'Greatest Hits Vol. 2', a: 'ABBA', n: 'karaoke research materials', c: '#1e2f5e', g: 'radial-gradient(circle at 50% 40%,rgba(230,200,110,.34),rgba(0,0,0,0) 56%)' },
  { t: 'Hard Promises', a: 'Tom Petty and the Heartbreakers', c: '#6b5340', g: 'linear-gradient(180deg,rgba(240,225,200,.24),rgba(0,0,0,0) 46%)' },
  { t: 'The Blues Brothers', a: 'Original soundtrack', n: 'on blue vinyl', c: '#1f3a5f', g: 'linear-gradient(90deg,rgba(0,0,0,0) 44%,rgba(251,249,243,.22) 44%,rgba(251,249,243,.22) 56%,rgba(0,0,0,0) 56%)' },
  { t: 'Star Wars', a: 'John Williams', n: 'the 1977 double LP', c: '#2c2820', g: 'radial-gradient(circle at 50% 34%,rgba(230,190,90,.4),rgba(0,0,0,0) 48%)' },
  { t: 'The Imperial March', a: 'London Symphony Orchestra', n: 'a 7″ single of one song', c: '#111114', g: 'linear-gradient(180deg,rgba(0,0,0,0) 58%,rgba(190,30,30,.4))' },
  { t: 'Home Alone', a: 'John Williams', n: 'the Mondo pressing', c: '#9d2f35', g: 'linear-gradient(180deg,rgba(0,0,0,0) 62%,rgba(24,74,44,.55))' },
  { t: '2001: A Space Odyssey', a: 'Original soundtrack', n: 'the Mondo red and blue', c: '#c96018', g: 'linear-gradient(180deg,#0e0d0b 30%,rgba(0,0,0,0) 30%)' },
  { t: 'James Bond', a: 'Thirteen original themes', c: '#15171b', g: 'repeating-linear-gradient(90deg,rgba(0,0,0,0) 0 16px,rgba(251,249,243,.09) 16px 19px)' },
  { t: 'The Incredible World of James Bond', a: 'Various', n: 'mono, from 1965', c: '#3a3f47', g: 'linear-gradient(120deg,rgba(230,190,90,.25),rgba(0,0,0,0) 50%)' },
  { t: 'Infinity War / Endgame', a: 'Alan Silvestri', n: 'the Mondo clear vinyl set', c: '#3b2a52', g: 'radial-gradient(circle at 60% 34%,rgba(240,150,60,.32),rgba(0,0,0,0) 58%)' },
  { t: 'Guardians of the Galaxy', a: 'Original soundtrack', n: 'the red pressing', c: '#b34a2a', g: 'repeating-linear-gradient(0deg,rgba(0,0,0,0) 0 14px,rgba(0,0,0,.16) 14px 17px)' },
  { t: 'Guardians of the Galaxy Vol. 2', a: 'Original soundtrack', c: '#c9762a', g: 'repeating-linear-gradient(0deg,rgba(0,0,0,0) 0 14px,rgba(0,0,0,.14) 14px 17px)' },
  { t: 'Into the Spider-Verse', a: 'Original soundtrack', c: '#b3173a', g: 'linear-gradient(105deg,rgba(0,0,0,0) 60%,rgba(60,160,255,.32) 60%)' },
  { t: 'Birds of Prey', a: 'Original soundtrack', c: '#a8447c', g: 'linear-gradient(120deg,rgba(255,220,80,.26),rgba(0,0,0,0) 52%)' },
  { t: 'Room on Fire', a: 'The Strokes', c: '#c04a24', g: 'linear-gradient(0deg,rgba(20,10,5,.5),rgba(0,0,0,0) 52%)' },
  { t: 'Comedown Machine', a: 'The Strokes', n: 'numbered, on clear vinyl', c: '#a3252b', g: 'linear-gradient(160deg,rgba(0,0,0,0) 48%,rgba(251,249,243,.2) 48% 60%,rgba(0,0,0,0) 60%)' },
  { t: 'Reality Awaits', a: 'The Strokes', c: '#2b2f38', g: 'linear-gradient(140deg,rgba(160,190,230,.22),rgba(0,0,0,0) 55%)' },
  { t: 'Currents', a: 'Tame Impala', c: '#2a4f68', g: 'repeating-radial-gradient(circle at 30% 52%,rgba(0,0,0,0) 0 11px,rgba(160,220,255,.15) 11px 14px)' },
  { t: 'Deadbeat', a: 'Tame Impala', n: 'on clear vinyl', c: '#5a5f56', g: 'linear-gradient(140deg,rgba(0,0,0,.34),rgba(0,0,0,0) 62%)' },
  { t: 'Made in the Dark', a: 'Hot Chip', c: '#232a63', g: 'radial-gradient(circle at 50% 46%,rgba(251,249,243,.22),rgba(0,0,0,0) 52%)' },
  { t: 'Greatest Hits', a: 'Blink-182', c: '#2a2a2a', g: 'linear-gradient(120deg,rgba(0,0,0,0) 52%,rgba(209,58,122,.34))' },
  { t: 'Unlimited Love', a: 'Red Hot Chili Peppers', n: 'on blue vinyl', c: '#8e3b52', g: 'radial-gradient(circle at 50% 50%,rgba(255,120,120,.26),rgba(0,0,0,0) 62%)' },
  { t: 'Stick Season', a: 'Noah Kahan', n: 'the We’ll All Be Here Forever 3xLP', c: '#7a5c42', g: 'linear-gradient(180deg,rgba(240,230,210,.26),rgba(0,0,0,0) 42%)' },
  { t: 'Zach Bryan', a: 'Zach Bryan', c: '#55504a', g: 'linear-gradient(180deg,rgba(230,222,205,.24),rgba(0,0,0,0) 48%)' },
  { t: 'American Heartbreak', a: 'Zach Bryan', c: '#2f2b26', g: 'radial-gradient(circle at 40% 40%,rgba(220,180,120,.22),rgba(0,0,0,0) 56%)' },
  { t: 'Ones', a: 'Selena', n: 'the picture disc', c: '#6b2a7c', g: 'radial-gradient(circle at 50% 38%,rgba(255,170,200,.32),rgba(0,0,0,0) 56%)' },
  { t: 'Live', a: 'Selena', c: '#8e2f4f', g: 'radial-gradient(circle at 60% 40%,rgba(255,200,120,.28),rgba(0,0,0,0) 56%)' },
  { t: 'Kid Gorgeous at Radio City', a: 'John Mulaney', n: 'a comedy record, on vinyl', c: '#1f5f8a', g: 'linear-gradient(180deg,rgba(255,220,120,.3),rgba(0,0,0,0) 40%)' },
].map((r, i) => ({ ...r, cat: `LP-${`0${i + 1}`.slice(-2)}` }));

// From the real Goodreads export. r = rating, u = unread, cur = reading now.
const CHRISTIE = [
  { t: 'The Mysterious Affair at Styles', y: 1920, r: 4, d: 'Jan 2' },
  { t: 'The Murder at the Links', y: 1923, r: 3, d: 'Jan 5' },
  { t: 'Poirot Investigates', y: 1924, r: 4, d: 'Jan 15' },
  { t: 'The Red Signal', y: 1924, r: 3, d: 'Jan 12' },
  { t: 'The Mystery of the Blue Jar', y: 1924, r: 3, d: 'Jan 12' },
  { t: 'The Murder of Roger Ackroyd', y: 1926, r: 5, d: 'Jan 12', n: '"my favorite of the series!"' },
  { t: 'The Big Four', y: 1927, r: 2, d: 'Jan 17' },
  { t: 'The Mystery of the Blue Train', y: 1928, r: 4, d: 'Jan 18' },
  { t: 'The Seven Dials Mystery', y: 1929, r: 3, d: 'Jan 24' },
  { t: 'Black Coffee', y: 1930, u: 1 },
  { t: 'Peril at End House', y: 1932, r: 4, d: 'Jan 19' },
  { t: 'Lord Edgware Dies', y: 1933, r: 4, d: 'Jan 21' },
  { t: 'Murder on the Orient Express', y: 1934, r: 5, d: 'reread · date lost' },
  { t: 'Three Act Tragedy', y: 1935, r: 4, d: 'Jan 26' },
  { t: 'Death in the Clouds', y: 1935, r: 4, d: 'Jan 27' },
  { t: 'The A.B.C. Murders', y: 1936, r: 4, d: 'Jan 29' },
  { t: 'Murder in Mesopotamia', y: 1936, r: 4, d: 'Feb 1' },
  { t: 'Cards on the Table', y: 1936, r: 4, d: 'Feb 2' },
  { t: 'Dumb Witness', y: 1937, r: 4, d: 'Feb 4' },
  { t: 'Death on the Nile', y: 1937, r: 4, d: 'read three times · date lost' },
  { t: 'Murder in the Mews', y: 1937, r: 4, d: 'Jan 20' },
  { t: 'Appointment with Death', y: 1938, r: 3, d: 'Feb 7' },
  { t: "Hercule Poirot's Christmas", y: 1938, r: 4, d: 'Feb 7' },
  { t: 'And Then There Were None', y: 1939, r: 5, d: 'Jan 19' },
  { t: 'The Regatta Mystery', y: 1939, u: 1 },
  { t: 'Sad Cypress', y: 1940, r: 4, d: 'Feb 9' },
  { t: 'One, Two, Buckle My Shoe', y: 1940, r: 5, d: 'Feb 10' },
  { t: 'Evil Under the Sun', y: 1941, r: 3, d: 'Feb 12' },
  { t: 'Five Little Pigs', y: 1942, r: 5, d: 'Feb 14' },
  { t: 'The Moving Finger', y: 1942, u: 1 },
  { t: 'The Hollow', y: 1946, r: 5, d: 'Feb 19', n: '"I was so mad reading this book"' },
  { t: 'The Labours of Hercules', y: 1947, u: 1 },
  { t: 'Taken at the Flood', y: 1948, r: 4, d: 'Feb 21' },
  { t: 'The Witness for the Prosecution', y: 1948, u: 1 },
  { t: 'Three Blind Mice and Other Stories', y: 1950, u: 1 },
  { t: 'The Under Dog and Other Stories', y: 1951, u: 1 },
  { t: "Mrs. McGinty's Dead", y: 1952, r: 5, d: 'Feb 21' },
  { t: 'After the Funeral', y: 1953, r: 4, d: 'Feb 28' },
  { t: 'Hickory Dickory Dock', y: 1955, r: 2, d: 'May 3' },
  { t: "Dead Man's Folly", y: 1956, cur: 1 },
  { t: 'Cat Among the Pigeons', y: 1959, u: 1 },
  { t: 'The Adventure of the Christmas Pudding', y: 1960, u: 1 },
  { t: 'Double Sin and Other Stories', y: 1961, u: 1 },
  { t: 'The Clocks', y: 1963, u: 1 },
  { t: 'Third Girl', y: 1966, u: 1 },
  { t: "Hallowe'en Party", y: 1969, u: 1 },
  { t: 'Elephants Can Remember', y: 1972, u: 1 },
  { t: "Poirot's Early Cases", y: 1974, u: 1 },
  { t: 'Curtain', y: 1975, u: 1 },
  { t: 'The Unexpected Guest', y: 1999, r: 4, d: 'Feb 3', n: 'the Osborne novelisation' },
];

const RACCOON_LIFE = [
  { d: 'Apr 24', v: 62, note: 'A normal week, and I had no idea anything was coming.' },
  { d: 'Apr 25', v: 41, note: 'First bad night, which I blamed on the podcast.' },
  { d: 'Apr 26', v: 18, note: 'Cancelled plans.' },
  { d: 'Apr 27', v: 5, note: 'The floor, five out of a hundred.' },
  { d: 'Apr 28', v: 5, note: 'Still the floor.' },
  { d: 'Apr 29', v: 5, note: 'Still the floor, with a sleep score of 53 against a baseline of 81.' },
  { d: 'Apr 30', v: 5, note: 'HRV 26ms, my worst on record.' },
  { d: 'May 1', v: 5, note: 'Found them, a mother raccoon and babies on the balcony.' },
  { d: 'May 3', v: 5, note: 'Raccoons removed and I expected instant relief, but body battery was still 5.' },
  { d: 'May 5', v: 22, note: 'First movement in ten days.' },
  { d: 'May 7', v: 44, note: 'Climbing.' },
  { d: 'May 9', v: 58, note: 'Almost back.' },
  { d: 'May 11', v: 74, note: 'Back to baseline, eight days after the threat was gone.' },
];

const PROGRESS = [
  { title: 'The full Greenbelt, out and back', note: '15 of 21 miles', pct: 71 },
  { title: 'Hercule Poirot novels, in order', note: "26 of 33 · on Dead Man's Folly", pct: 79 },
  { title: 'Snowflake hands-on badges', note: '1 of 3', pct: 33 },
  { title: 'dbt Certified Developer', note: 'fundamentals done', pct: 45 },
  { title: 'Steam review-bombing detection', note: '31M+ reviews, modeling', pct: 30 },
  { title: 'Solo travel, London first', note: 'neighborhoods mapped', pct: 20 },
];

const READING = ['Agatha Christie, in order', 'Seishi Yokomizo', 'Terry Pratchett'];
const PLAYING = ['House Flipper 2', 'Ring Fit Adventure', 'Stardew Valley'];

// L5 · the dragon. One real number: the save file is at level 32. The
// bar puts one notch per level and fills to it, then stops. Dragaux is
// the game's dragon; "still in the rotation" is the PLAYING list above.
const RING_FIT = {
  level: 32,
  boss: 'Dragaux',
  quote: 'Ring Fit because it turns out I need a dragon to fight to stay motivated.',
  track: 40,  // cells in the level strip on /life
  bossAt: 36, // the cells past here are where Dragaux waits
};

// /life#notes · one entry per OBSERVATIONS item, same order: the "In
// plain terms" line and the numbers each note's chart draws. The rebuild
// bars in note 04 are illustrative and the page captions them as such.
export const LIFE_NOTES = [
  { plain: 'new shoppers rarely rebuy and regulars almost always do, so the one famous average is two different groups mashed together and it fits neither of them.',
    chart: { label: 'reorder rate · pooled, then split', pooled: 0.60, split: [{ k: 'new', v: 0.221 }, { k: 'veteran', v: 0.670 }] } },
  { plain: 'my body was stressed for days before I knew why, and it stayed stressed for more than a week after the problem was gone.',
    chart: { label: 'body battery, out of 100', hint: 'tap a day', start: 'Apr 27', found: 'May 1' } },
  // Gap: the notebook's printed impact table, follow-up 84.409091 (110 visits)
  // against routine 90.863883 (18,440), so 6.45 points.
  { plain: 'a higher health score means fewer problems, and once I read it that way round the places that keep getting inspected tend to get a little cleaner over time.',
    chart: { label: 'average score by inspection number', scores: ATX_DRIFT,
      first: '90.5 · 1st visit', last: '92.6 · 15th', gapLabel: 'Follow-up visits against routine ones', gap: 6.45 } },
  { plain: 'every version of my to-do setup gets better, and every version still needs me at my most tired, which is the design problem worth solving and why Brain Dump exists.',
    chart: { label: 'four rebuilds, one shared weak spot', versions: ['v1', 'v2', 'v3', 'v4'], gapLabel: 'same gap',
      caption: 'bar is how much better each one got · the dot is the moment it asks too much',
      illustrative: 'bar lengths are illustrative, there is no score behind them' } },
];

// ── Toolkit page ─────────────────────────────────────────────

const TK_REPO = 'SamieVargas/samievargas.com';

const TK_FALLBACK = [
  { message: 'Add the launch kit: favicon set, social card, 404, manifest', date: '2026-08-22' },
  { message: 'Split /life out of the work page', date: '2026-08-20' },
  { message: 'Annotate the analysis projects with what each one found', date: '2026-08-18' },
  { message: 'Ship Signal', date: '2026-08-14' },
  { message: 'Ship Brain Dump', date: '2026-07-28' },
  { message: 'Rebuild the site as vanilla modules, no framework', date: '2026-06-10' },
];

const TK_NOTES = [
  { date: '2026-09-09', title: 'The change log writes itself', body: 'This list used to ask the GitHub API from your browser, which only works while the repo is public and your IP has rate limit left, and lately neither held. Now a small Action snapshots the commit log into the site on every push. Same list, no API call, and it cannot show anything that is not already deployed.' },
  { date: '2026-08-22', title: 'The mark and the card', body: 'The social card was 347×190, so every platform upscaled it into a blur, and the tab title was just my name. That means the first thing anyone saw of this site was the least considered part of it. Redrew both in the same type as the rest.' },
  { date: '2026-08-20', title: 'Moving the personal half', body: 'The raccoon, the tarot decks, and the tooth zones are the most interesting things here and the worst thing to put between a hiring manager and my projects. They have their own page now, linked from the nav, and nothing was deleted.' },
  { date: '2026-08-18', title: 'Projects that show their work', body: 'Cards described what I built. They did not show messy going in and clean coming out, which is the actual point. Every project now names its input, marks four things in the output, and ends on what it found.' },
  { date: '2026-08-14', title: 'Signal', body: 'I spent eight years doing an hour of account digging before every quarterly review. I got tired of it and built the thing that does it in a minute.' },
  { date: '2026-06-10', title: 'Starting over', body: 'I always wanted my own website, and I wanted to teach myself to code past HTML. Doing it without a framework meant I had to understand every piece, which was slower and the whole reason I did it.' },
];

const TK_META = [
  { name: 'Tab title', attr: '<title>', key: '<title>', max: 60, current: 'Samie Vargas · applied AI', status: 'Live · 25 chars',
    why: 'My name on its own loses to every other Samie Vargas in a search result, and it says nothing in a tab strip of twelve, so this says what I do in the space I have.' },
  { name: 'Social title', attr: 'og:title · twitter:title', key: 'og:title', max: 70, current: 'I build AI into the workflows customers already run, and I publish how often it breaks', status: 'Live · 86 chars',
    why: 'This is the line that shows up in someone\'s Slack, which is how most people get here, so it should be the claim, since my name is already on the card as the domain.' },
  { name: 'Social description', attr: 'og:description', key: 'og:description', max: 200, current: 'Agents, RAG, fine-tuning and MCP, one row each, with a dot for every test case. Field discovery, Life in Pixels, Signal and Brain Dump, each with its evals.', status: 'Live · 156 chars',
    why: 'The title makes the claim, so this carries proof instead of repeating it, and every number here is one I can walk someone through.' },
  { name: 'Search description', attr: 'meta name="description"', key: 'description', max: 160, current: 'I build AI into the workflows customers already run, and I publish how often it breaks. Five builds with dated evals, eight years at GLG. Austin, remote.', status: 'Live · 153 chars',
    why: 'Google cuts around 155 and my old one was 197, so the part being dropped was the location, and this ends on the strongest clause while still keeping Austin.' },
  { name: 'Card alt text', attr: 'og:image:alt', current: 'Samie Vargas, applied AI. Austin, remote.', status: 'Live',
    why: 'Some clients and every screen reader get this instead of the image, and it was missing entirely.' },
  { name: 'Canonical + theme', attr: 'link canonical · meta theme-color', current: 'https://samievargas.com/ · #1a6b5a', status: 'Live',
    why: 'The site answers on two domains, so one of them has to be the real one, and the theme colour tints mobile browser chrome to the same green as everything else.' },
];

// Toolkit swatches: name, the custom property it reads, and its use. The
// colour itself is read from css/styles.css at render, so it cannot drift.
const TK_TOKENS = [
  { name: 'paper', prop: '--paper', use: 'page' },
  { name: 'card', prop: '--card', use: 'cards' },
  { name: 'track', prop: '--track', use: 'tracks' },
  { name: 'ink', prop: '--ink', use: 'type, dark bands' },
  { name: 'body', prop: '--body', use: 'paragraphs' },
  { name: 'meta', prop: '--meta', use: 'meta' },
  { name: 'rule', prop: '--rule', use: 'hairlines' },
  { name: 'green', prop: '--accent', use: 'the accent' },
  { name: 'mint', prop: '--accent-dark', use: 'accent on dark' },
  { name: 'tint', prop: '--accent-tint', use: 'plain terms' },
];

// ── The arcade (/apps) ───────────────────────────────────────

const ARCADE_APPS = [
  { slug: 'six-degrees', needs: ['live'], preview: 'terminal', shot: 'shots-clean/six-degrees-v2.png', title: 'Six Degrees of Anything', badge: 'live data', accent: '#1a6b5a', feat: true, hook: 'Two things, whether people or films or bands or towns, and the shortest path between them, so Dolly Parton reaches Austin through Willie Nelson.' },
  { slug: 'died-doing-what', needs: ['live'], preview: 'bars', shot: 'shots-clean/died-doing-what.png', title: 'Died Doing What', badge: 'live data', accent: '#8a4a3a', feat: true, hook: 'Pick a trade and Wikidata reports how its people actually died, so for poets tuberculosis leads at a median age of 58.' },
  { slug: 'taco-coin-flip', needs: ['live'], preview: 'terminal', shot: 'shots-clean/taco-flip.png', title: 'Taco Coin Flip', badge: 'live data', accent: '#b31f5b', feat: true, hook: "Settles a lunch argument between two Austin restaurants, and if one scored worse on the city's real inspection records then the coin defers to the cleaner option." },
  { slug: 'corporate-translator', needs: ['browser'], preview: 'terminal', shot: 'shots-clean/translator.png', title: 'Corporate Translator', badge: 'no data needed', accent: '#4a5ac9', feat: true, hook: 'Paste an email and slide from passive-aggressive to Texan warm, and the slider genuinely rewrites the text.' },
  { slug: 'streak-autopsy', needs: ['browser'], preview: 'grid', shot: 'shots-clean/streak-autopsy.png', title: 'Streak Autopsy', badge: 'tracks your taps', accent: '#6b6255', feat: true, hook: 'A habit tracker that only gets interesting when you fail, so two missed days and it stamps the habit DECEASED and opens a case file.' },
  { slug: 'whodunit-roulette', needs: ['live', 'export'], preview: 'terminal', shot: 'shots-clean/whodunit.png', title: 'Whodunit Roulette', badge: 'live + your export', accent: '#7a3b8f', feat: true, hook: 'Picks your next mystery by mood, and if you import your Goodreads or StoryGraph export it learns which authors you return to.' },
  { slug: 'nepotism-graph', needs: ['live'], preview: 'terminal', shot: 'shots-clean/nepotism.png', title: 'The Nepotism Graph', badge: 'live data', accent: '#1a6b5a', hook: 'Which professions run in families, so of the 25,885 conductors in Wikidata, 347 have a relative who also conducted.' },
  { slug: 'same-name', needs: ['live'], preview: 'terminal', shot: 'shots-clean/same-name.png', title: 'Same Name, Different Life', badge: 'live data', accent: '#1a6b5a', hook: 'Every human in Wikidata who carried your name, as a timeline, a constellation, and a list.' },
  { slug: 'backlog-reaper', needs: ['export'], preview: 'bars', shot: 'shots-clean/backlog-reaper.png', title: 'Backlog Reaper', badge: 'your export', accent: '#8a4a3a', hook: 'Your unplayed game pile scored by guilt with one title condemned, and you can delete it forever or spare it like a coward.' },
  { slug: 'was-it-worth-it', needs: ['browser'], preview: 'grid', shot: 'shots-clean/worth-it-v2.png', title: 'Was It Worth It?', badge: 'tracks your taps', accent: '#6b6255', hook: 'Log a purchase and thirty days later it asks whether you still care, and it keeps your lifetime regret rate.' },
  { slug: 'sample-size-roast', needs: ['browser'], preview: 'bars', shot: 'shots-clean/sample-size.png', title: 'Sample Size Roast', badge: 'no data needed', accent: '#4a5ac9', hook: 'Paste a percentage claim, give it n, and receive consequences, which is real margin-of-error math plus an honest rewrite of the stat.' },
  { slug: 'oracle', needs: ['browser'], preview: 'ring', shot: 'shots-clean/oracle.png', title: 'One-Question Oracle', badge: 'no data needed', accent: '#4a5ac9', hook: 'An obsidian scrying stone that never answers, so you ask it anything and it hands back a harder question.' },
  { slug: 'sql-tarot', needs: ['browser'], preview: 'grid', shot: 'shots-clean/sql-tarot.png', title: 'SQL Tarot', badge: 'no data needed', accent: '#7a3b8f', hook: 'Fourteen SQL clauses, upright or reversed, dealt into past, present, and ships-to-prod.' },
  { slug: 'locked-room', needs: ['browser'], preview: 'ring', shot: 'shots-clean/locked-room.png', title: 'The Locked Room', badge: 'no data needed', accent: '#7a3b8f', hook: 'A house, a body, six guests, and one impossible exit, with a fresh locked-room mystery generated every time.' },
  { slug: 'escalation-simulator', needs: ['browser'], preview: 'ring', shot: 'shots-clean/escalation.png', title: 'Escalation Simulator', badge: 'no data needed', accent: '#8a4a3a', hook: 'An enterprise account is on fire and you have five decisions, and every choice moves account health and none of them are free.' },
];

export {
  ARCADE_APPS, ROLES, OBSERVATIONS, CONTACT_LINKS, RESULT_FIELDS, RESULTS,
  LIFE_FIELD, LIFE_RELATED, INVOICE_ROWS, RACCOON_LIFE, PROGRESS,
  READING, PLAYING, RING_FIT, RECORDS, CHRISTIE,
  TK_REPO, TK_FALLBACK, TK_NOTES, TK_META, TK_TOKENS,
};
