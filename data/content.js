// ============================================================
// data/content.js
// Every word on the site lives here. Markup shape is in js/.
// Numbers are real data from the projects — do not round them.
// ============================================================

// ── Work page ────────────────────────────────────────────────

const HERO_STATS = [
  { stat: '$14M+', label: 'Enterprise portfolio owned end to end at GLG' },
  { stat: '60 → 1', label: 'Minutes of account prep, after Signal' },
  { stat: '3–10', label: 'Client-facing managers led per quarter, on the AI workflows I wrote' },
  { stat: '3.4M', label: 'Orders modeled in dbt on BigQuery' },
];

const SIGNAL_TYPED = 'Send the CFO a one-page value recap. Nothing else.';

const SIGNAL_SCRAPS = [
  { text: 'call notes 4/12 — "budget owner changed, new CFO wants value by renewal"', left: '2%', top: '8px', rot: -4 },
  { text: 'renewal_deck_v3.pptx', left: '38%', top: '52px', rot: 6 },
  { text: 'crm_export_q2.csv (412 rows)', left: '12%', top: '84px', rot: -7 },
  { text: 'slack thread, 60 messages', left: '44%', top: '112px', rot: 3 },
];

const SIGNAL_OUT = [
  { k: 'The read', v: 'Renewal at risk. New CFO has no history with you.' },
  { k: 'Who matters', v: 'The CFO, not your champion. Champion quiet since April.' },
  { k: 'Where to press', v: '1. Value recap tied to their Q4 board metric  2. Re-anchor the champion  3. Bring in exec sponsor' },
  { k: 'Do this today', v: SIGNAL_TYPED, typing: true },
];

const SIGNAL_NOTES = [
  { n: '1', title: 'Ranked by risk', body: 'Accounts come back in risk order, so the first thing you read is the thing to act on.' },
  { n: '2', title: 'One line per account', body: 'The read is a sentence you can paste into Slack without editing it.' },
  { n: '3', title: 'The contact read', body: 'Second-order sentiment, meaning the gap between what someone says and what their behavior says.' },
  { n: '4', title: 'One action', body: 'It ends in a single "do this today" instead of a list of options, which is what makes it usable before a call.' },
];

// The contact read — verbatim Signal output for one account, typed
// back in live rather than screenshotted.
const READ_ROWS = [
  { k: 'Primary contact', v: 'Marcus Webb, VP Strategy & Analytics' },
  { k: 'Comm style', v: 'In Q3, Marcus was concise, technically engaged, and responsive same-day — he communicated with specificity and named deliverables. By Q4, his language became vague ("the team uses it when we use it"), he delegated substantive work to Tom without follow-through, and he stopped responding entirely. His current communication style is avoidance through silence, not explicit pushback.' },
  { k: 'Decision style', v: 'Data-driven when bought in — he cited specific metrics (6-hour savings) to his CPO and asked retroactive-cohort technical questions. But his decisions appear to also be politically influenced: the board deck win suggested he was using Veridian to build internal credibility. When that internal momentum stalled or his priorities shifted, his engagement dropped in lockstep.' },
  { k: 'Says vs means', v: 'Says: "Not off the table… not the right timing right now" (re: Export API). Means: I am not prioritizing this and I am not going to tell you why. Says nothing (silence since Nov 7). Means: either I have lost internal support for this tool, my priorities have materially changed, or I am already evaluating alternatives and do not want to have the renewal conversation yet.' },
  { k: 'How to engage', v: 'Do not re-pitch features to Marcus — he has heard the pitches and is not responding. The only approach likely to move him is a peer-level executive touchpoint that re-anchors to the outcome he already claimed as a win (board deck, CPO visibility). If that re-engage fails within 2 weeks, treat Marcus as lost and shift renewal strategy entirely to Priya Nair as the signing-authority path.' },
];

const SEC_CONTACTS = [
  { name: 'Priya Nair, Director of Research Operations', body: 'Operational admin and de facto day-to-day owner — 14 logins in 30 days, attended Q4 QBR as Marcus\'s substitute, highest platform engagement of any user. She is not the budget decision-maker but is the closest active stakeholder to the renewal and the most viable path to internal influence if Marcus remains unreachable.' },
  { name: 'Tom Gillis, Senior Analyst', body: 'Technical power user with the highest average session time (12.4 min) and substantive product engagement — evaluated Attribution v2 but reported being "slammed." An important adoption driver, but with no budget authority and limited bandwidth.' },
];

const DUMP_BITS = [
  { t: 'deck for thursday not started', x: 2, y: 4, r: -3, dx: -26, dy: -14, dr: -14 },
  { t: 'call the vendor back', x: 46, y: 18, r: 4, dx: 30, dy: -10, dr: 12 },
  { t: 'why am i still thinking about the q2 thing', x: 4, y: 34, r: -2, dx: -18, dy: 20, dr: -8 },
  { t: 'laundry', x: 62, y: 48, r: 6, dx: 26, dy: 16, dr: 16 },
  { t: 'learn snowflake properly', x: 8, y: 62, r: 3, dx: -22, dy: 26, dr: 10 },
  { t: "haven't eaten", x: 52, y: 74, r: -5, dx: 20, dy: 22, dr: -16 },
  { t: 'the greenbelt run i keep not doing', x: 2, y: 88, r: 2, dx: -16, dy: 28, dr: 8 },
  { t: 'is the knee thing getting worse', x: 40, y: 4, r: 7, dx: 22, dy: -22, dr: 18 },
  { t: 'text back', x: 74, y: 30, r: -6, dx: 28, dy: -6, dr: -12 },
];

const BRAIN_STATES = {
  Foggy: { note: 'Foggy gets one physical task and warmer wording, and decision work is pushed down the list instead of surfaced.',
    piles: [
      { k: 'Energy for today', v: 'Eat something. That is the whole task.' },
      { k: 'Real but not now', v: 'Thursday deck · vendor callback' },
      { k: 'Worth keeping', v: 'Learn Snowflake properly — park it, it is a good one' },
      { k: 'Put it down', v: 'The Q2 thing. It is closed and you are still carrying it.' } ] },
  Low: { note: 'Low energy blocks decision work entirely, so nothing needing a judgement call reaches the first pile.',
    piles: [
      { k: 'Energy for today', v: 'Laundry. Low stakes, visible progress.' },
      { k: 'Real but not now', v: 'Thursday deck — needs a clear head, not this one' },
      { k: 'Worth keeping', v: 'Greenbelt run · Snowflake' },
      { k: 'Put it down', v: 'The Q2 thing, again.' } ] },
  Steady: { note: 'Steady is the default sort: highest-friction real work first, ideas held separately so they stop competing with it.',
    piles: [
      { k: 'Energy for today', v: 'Thursday deck, first pass only · vendor callback' },
      { k: 'Real but not now', v: 'Greenbelt run — schedule it, do not do it today' },
      { k: 'Worth keeping', v: 'Snowflake, properly, with a project attached' },
      { k: 'Put it down', v: 'The Q2 thing' } ] },
  Wired: { note: 'Wired gets a hard cap of two items, because the failure mode here is starting six things.',
    piles: [
      { k: 'Energy for today', v: 'Thursday deck, all the way through' },
      { k: 'Real but not now', v: 'Vendor callback · laundry' },
      { k: 'Worth keeping', v: 'Snowflake — write the plan down, do not open it tonight' },
      { k: 'Put it down', v: 'The Q2 thing' } ] },
  Heavy: { note: 'Heavy reorders around the weight first, and the thing you are carrying gets named before anything is asked of you.',
    piles: [
      { k: 'Put it down', v: 'The Q2 thing. You have thought about it for weeks and it is finished.' },
      { k: 'Energy for today', v: 'Eat. Then the vendor callback if it still feels possible.' },
      { k: 'Real but not now', v: 'Thursday deck' },
      { k: 'Worth keeping', v: 'The Greenbelt run' } ] },
};

const ANNOTATED = [
  { kicker: 'Instacart · dbt on BigQuery · 3.4M orders', headline: 'I rebuilt one cited number until it split in half.',
    cta: 'See the models ↗', href: 'https://github.com/SamieVargas/instacart-project',
    img: null, viz: 'reorder', vizId: 'viz-reorder', cols: '1.2fr 1fr', imgFirst: true,
    inputLine: 'In: raw order tables · out: five staging models, one join, three marts, 35 passing tests',
    notes: [
      { n: '1', title: 'Lineage you can follow', body: 'Every mart traces back to a named staging model, so a number can be argued with.' },
      { n: '2', title: '35 tests that mean something', body: 'The tests encode business rules like grain, valid segments, and plausible ranges.' },
      { n: '3', title: 'Segmented, then compared', body: 'I recomputed reorder rate per shopper tenure instead of pooling it.' },
      { n: '4', title: 'Confirmed with a model', body: 'Random forest AUC 0.989 for veterans against 0.857 for new users.' } ],
    finding: 'new shoppers reorder at 0.221 and veterans at 0.670, so the 0.60 everyone cites describes neither.' },
  { kicker: 'ATX Foodie · Socrata API · 21,160 records', headline: 'I turned a pest-sighting post into an audit of where I eat.',
    cta: 'See the findings ↗', href: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection',
    img: null, vizId: 'viz-atx', cols: '1fr 1.2fr', imgFirst: false, isAtx: true,
    inputLine: 'In: City of Austin open data, paginated · out: brand scorecard and a folium choropleth',
    notes: [
      { n: '1', title: 'My own spots first', body: 'The places I eat at weekly, queried by name, because that was the question I actually had.' },
      { n: '2', title: 'Scored per visit type', body: 'I separated routine visits from follow-ups, which is where the pattern lives.' },
      { n: '3', title: '84 brands compared', body: 'A compliance scorecard across whole local restaurant groups rather than single locations.' },
      { n: '4', title: 'Mapped by zip', body: 'A choropleth of Austin, so a neighborhood answer replaces an anecdote.' } ],
    finding: 'scores drift about two points worse across a venue\'s inspection history, 90.5 at the first visit and 92.6 by the fourteenth, and being flagged is not what fixes it.' },
];

// Real per-zip averages from assets/atx-foodie-inspection — lower score = fewer violations.
const ATX_ZIPS = [
  { zip: '78701', score: 89.2, label: 'Downtown', box: [30.282, -97.748, 30.266, -97.730] },
  { zip: '78702', score: 89.3, label: 'East Austin', box: [30.280, -97.730, 30.255, -97.710] },
  { zip: '78703', score: 90.1, label: 'Tarrytown', box: [30.300, -97.775, 30.270, -97.748] },
  { zip: '78704', score: 88.7, label: 'South Congress', box: [30.255, -97.775, 30.225, -97.740] },
  { zip: '78705', score: 89.1, label: 'UT area', box: [30.300, -97.748, 30.282, -97.730] },
  { zip: '78721', score: 90.8, label: 'MLK', box: [30.280, -97.710, 30.260, -97.693] },
  { zip: '78722', score: 91.0, label: 'Cherrywood', box: [30.300, -97.730, 30.280, -97.710] },
  { zip: '78723', score: 90.9, label: 'Windsor Park', box: [30.300, -97.710, 30.272, -97.685] },
  { zip: '78741', score: 90.4, label: 'Riverside', box: [30.255, -97.730, 30.228, -97.710] },
  { zip: '78745', score: 88.8, label: 'South Lamar', box: [30.225, -97.775, 30.198, -97.740] },
  { zip: '78748', score: 90.2, label: 'Slaughter Ln', box: [30.198, -97.775, 30.172, -97.740] },
  { zip: '78751', score: 90.5, label: 'Hyde Park', box: [30.320, -97.730, 30.300, -97.710] },
  { zip: '78752', score: 89.5, label: 'North Loop', box: [30.340, -97.710, 30.320, -97.685] },
  { zip: '78753', score: 88.8, label: 'Rundberg', box: [30.380, -97.685, 30.345, -97.655] },
  { zip: '78757', score: 91.6, label: 'Crestview', box: [30.360, -97.730, 30.340, -97.710] },
  { zip: '78758', score: 91.6, label: 'North Burnet', box: [30.380, -97.730, 30.360, -97.710] },
  { zip: '78759', score: 89.4, label: 'Great Hills', box: [30.400, -97.775, 30.370, -97.745] },
];

const ROLES = [
  { title: 'Senior Manager, Service', period: 'Oct 2023 – present', meta: 'People manager · $14M+ book · ~$3.5M quarterly target', bullets: [
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

const RAIL_TICKS = ['2018', '2019', '2020', '2021', '2022', '2023'];

const SKILLS = [
  { label: 'AI enablement', line: 'LLM workflow design & deployment · Team-level AI adoption · Prompt engineering · AI tool evaluation · Internal and client-facing AI strategy input · Human-in-the-loop process design · AI fluency enablement' },
  { label: 'Build', line: 'Python (pandas · scikit-learn) · Vanilla JavaScript · Anthropic API · Cloudflare Workers · Google Apps Script · SQL / BigQuery · dbt Cloud · REST API integration · Structured JSON / schema design' },
  { label: 'Delivery', line: 'Full-lifecycle engagement management · Multi-stakeholder orchestration · Workflow & SOP design · Health scoring systems · Adoption & usage tracking · Agile / Scrum (PSM I) · Cross-functional coordination' },
  { label: 'Data', line: 'EDA · Regression & classification modeling · Cohort & segment analysis · Behavioral pattern detection · Data modeling · Looker Studio · Tableau' },
  { label: 'Stack', line: 'Anthropic API · Claude · ChatGPT · Gemini · Snowflake · BigQuery · Databricks · dbt Cloud · GitHub · Salesforce · GA4' },
];

const CERTS = [
  { name: 'Anthropic AI Fluency — full credential set', issuer: 'Anthropic Academy · Jun 2026 · Claude 101 · Claude Code 101 · Agent Skills · Claude Cowork · AI Capabilities & Limitations · AI Fluency Framework', href: 'https://www.anthropic.com/learn' },
  { name: 'Google Advanced Data Analytics', issuer: 'Google / Coursera · ID 4REOBHKQJ0DS · Jun 2026', href: 'https://coursera.org/verify/professional-cert/4REOBHKQJ0DS' },
  { name: 'dbt Fundamentals', issuer: 'dbt Labs · May 2026', href: 'https://credentials.getdbt.com/5470c199-7753-4f90-99a3-07e8f8c6fe51' },
  { name: 'PSM I — Professional Scrum Master', issuer: 'Scrum.org · May 2026', href: 'https://scrum.org/certificates/1318010' },
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
    sourceText: 'Full story with photos →', linkText: 'The Raccoon Invoice ↗', linkHref: 'https://samievargas.com/raccoon/',
    chart: { title: 'Body battery, out of 100', hint: 'Scrub the days', max: 100, days: RACCOON_DAYS } },
  { tag: 'May 2026 · 21,160 inspection records', title: 'Being flagged does not fix it',
    paragraphs: [
      'I started by querying every restaurant I actually eat at against the city health inspection API, and places that failed and were sent for a follow-up visit scored eight points lower on average than routine visits, which is the opposite direction of what I expected.',
      'A second pattern showed up across 84 local brands, scores decay measurably by the fifth or sixth inspection cycle, so repeat offenders are identifiable before it gets bad, and the city already has the data, the question is whether anyone has built the workflow to act on it.'],
    sourceText: 'City of Austin open data ·', linkText: 'Full analysis ↗', linkHref: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection' },
  { tag: 'May 2026 · systems', title: 'Every productivity system I have built has the same failure mode',
    paragraphs: [
      'I have a very good system that I have rebuilt roughly four times, and each rebuild improves on the last while sharing the same core problem, it requires me to want to use it at the exact moment I am least capable of wanting to use anything.',
      'I do not think this is a failure, this is what maintenance looks like when your brain does not do it automatically, and each rebuilt version is smarter because you know more.'],
    sourceText: 'Currently running on Todoist and Drive', linkText: '', linkHref: '#' },
];

const LIFE_TEASERS = [
  { k: 'The field', v: 'Everything I noticed, plotted by whether I built something about it' },
  { k: 'Running', v: '15 of 21 miles on the Greenbelt' },
  { k: 'Reading', v: 'The complete Christie in order, currently stalled on late Poirot.' },
  { k: 'Tarot', v: 'Seven decks, every pull logged across 78 cards' },
];

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
  { id: 'walk', short: 'A walk is worth half a point', kind: 'Noticed → built', title: 'What a walk is actually worth', x: '62%', y: '18%', year: '2026', art: 'assets/pixels-rag/pixels-rag-1.png', href: 'https://github.com/SamieVargas/pixels-rag', linkLabel: 'See how it works ↗', line: 'Six months of my own daily data, askable in plain language, and hot yoga plus walking beat everything else for sleep and recovery.' },
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

const PLACES = [
  { name: 'Paprika', note: 'The standing default, on the patio, late.', zip: '78757', score: 91.6 },
  { name: 'Desnudo', note: 'Coffee that turns into something else by evening.', zip: '78702', score: 89.3 },
  { name: 'Terrible Love', note: 'Named like a warning and eats like a favourite.', zip: '78704', score: 88.7 },
  { name: 'Barton Springs, before the crowd', note: 'Not food, but still part of the rotation.', zip: '78704', score: 88.7 },
  { name: 'The Caesar salad, still hypothetical', note: 'Cold plate, no anchovy, croutons that were bread yesterday.', zip: 'anywhere', score: null },
];

const LIFE_INTERESTS = [
  { title: 'Austin, actually', body: 'Here since 2014 and still finding things. Barton Springs before it gets crowded. That late afternoon light in South Austin. I complain about the summers and then September comes.' },
  { title: 'Eating here', body: 'Paprika, Desnudo, and Terrible Love are the standing favorites. The inspection project started with exactly this list.' },
  { title: 'Moving', body: 'Hot yoga and pilates for the knee and the nervous system. Ring Fit because it turns out I need a dragon to fight to stay motivated.' },
];

const LIFE_FACTS = [
  { label: 'Location', value: 'Austin, TX · since 2014' },
  { label: 'Journaling', value: 'Daily since 2020, in my own app' },
  { label: 'Decks', value: 'Seven, every pull logged' },
  { label: 'Code', value: 'github.com/SamieVargas' },
];

const READING = ['Agatha Christie, in order', 'Seishi Yokomizo', 'Terry Pratchett'];
const PLAYING = ['House Flipper 2', 'Ring Fit Adventure', 'Stardew Valley'];

// ── Toolkit page ─────────────────────────────────────────────

const TK_REPO = 'SamieVargas/samievargas.github.io';

const TK_FALLBACK = [
  { message: 'Add the launch kit: favicon set, social card, 404, manifest', date: '2026-08-22' },
  { message: 'Split /life out of the work page', date: '2026-08-20' },
  { message: 'Annotate the analysis projects with what each one found', date: '2026-08-18' },
  { message: 'Ship Signal', date: '2026-08-14' },
  { message: 'Ship Brain Dump', date: '2026-07-28' },
  { message: 'Rebuild the site as vanilla modules, no framework', date: '2026-06-10' },
];

const TK_NOTES = [
  { date: '2026-08-22', title: 'The mark and the card', body: 'The social card was 347×190, so every platform upscaled it into a blur, and the tab title was just my name. That means the first thing anyone saw of this site was the least considered part of it. Redrew both in the same type as the rest.' },
  { date: '2026-08-20', title: 'Moving the personal half', body: 'The raccoon, the tarot decks, and the tooth zones are the most interesting things here and the worst thing to put between a hiring manager and my projects. They have their own page now, linked from the nav, and nothing was deleted.' },
  { date: '2026-08-18', title: 'Projects that show their work', body: 'Cards described what I built. They did not show messy going in and clean coming out, which is the actual point. Every project now names its input, marks four things in the output, and ends on what it found.' },
  { date: '2026-08-14', title: 'Signal', body: 'I spent eight years doing an hour of account digging before every quarterly review. I got tired of it and built the thing that does it in a minute.' },
  { date: '2026-06-10', title: 'Starting over', body: 'I always wanted my own website, and I wanted to teach myself to code past HTML. Doing it without a framework meant I had to understand every piece, which was slower and the whole reason I did it.' },
];

const TK_META = [
  { name: 'Tab title', attr: '<title>', current: 'Samie Vargas — applied AI & enablement', status: 'Live · 38 chars',
    why: 'My name on its own loses to every other Samie Vargas in a search result, and it says nothing in a tab strip of twelve, so this says what I do in the space I have.' },
  { name: 'Social title', attr: 'og:title · twitter:title', current: 'I ship AI tools that replace work I used to do by hand', status: 'Live · 54 chars',
    why: 'This is the line that shows up in someone\'s Slack, which is how most people get here, so it should be the claim, since my name is already on the card as the domain.' },
  { name: 'Social description', attr: 'og:description', current: 'Signal reads messy account files in a minute. 3.4M orders modeled in dbt. 21,160 inspection records. Eight years running a $14M+ enterprise book.', status: 'Live · 146 chars',
    why: 'The title makes the claim, so this carries proof instead of repeating it, and every number here is one I can walk someone through.' },
  { name: 'Search description', attr: 'meta name="description"', current: 'Applied-AI operator in enterprise customer success. I build the LLM workflows and ship the tools — Signal, Brain Dump, dbt pipelines. Austin, remote.', status: 'Live · 150 chars',
    why: 'Google cuts around 155 and my old one was 197, so the part being dropped was the location, and this ends on the strongest clause while still keeping Austin.' },
  { name: 'Card alt text', attr: 'og:image:alt', current: 'Samie Vargas — applied AI and enablement. Austin, remote.', status: 'Live',
    why: 'Some clients and every screen reader get this instead of the image, and it was missing entirely.' },
  { name: 'Canonical + theme', attr: 'link canonical · meta theme-color', current: 'https://samievargas.com/ · #1a6b5a', status: 'Live',
    why: 'The site answers on two domains, so one of them has to be the real one, and the theme colour tints mobile browser chrome to the same green as everything else.' },
];

const TK_HEAD = [
  '<title>Samie Vargas — applied AI & enablement</title>',
  '<meta name="description" content="Applied-AI operator in enterprise customer success. I build the LLM workflows and ship the tools — Signal, Brain Dump, dbt pipelines. Austin, remote.">',
  '<link rel="canonical" href="https://samievargas.com/">',
  '<meta name="theme-color" content="#1a6b5a">',
  '',
  '<meta property="og:type" content="website">',
  '<meta property="og:url" content="https://samievargas.com/">',
  '<meta property="og:title" content="I ship AI tools that replace work I used to do by hand">',
  '<meta property="og:description" content="Signal reads messy account files in a minute. 3.4M orders modeled in dbt. 21,160 inspection records. Eight years running a $14M+ enterprise book.">',
  '<meta property="og:image" content="https://samievargas.com/og-card.png">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="Samie Vargas — applied AI and enablement. Austin, remote.">',
  '<meta name="twitter:card" content="summary_large_image">',
  '',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  '<link rel="icon" href="/favicon-32.png" sizes="32x32">',
  '<link rel="icon" href="/favicon-16.png" sizes="16x16">',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
  '<link rel="manifest" href="/site.webmanifest">',
].join('\n');

const TK_TOKENS = [
  { name: '--paper', hex: '#fbf9f3', use: 'Page background' },
  { name: '--paper-alt', hex: '#f4f1e8', use: 'Alternating sections' },
  { name: '--ink', hex: '#16150f', use: 'Headings and body' },
  { name: '--ink-soft', hex: '#3a382e', use: 'Lead paragraphs' },
  { name: '--muted', hex: '#6d6a5c', use: 'Secondary text' },
  { name: '--faint', hex: '#77735f', use: 'Labels · fixed for contrast' },
  { name: '--rule', hex: '#e2ddce', use: 'Hairlines' },
  { name: '--rule-strong', hex: '#c9c3b1', use: 'Button borders' },
  { name: '--accent', hex: '#1a6b5a', use: 'The one green' },
];

// ── The arcade (/apps) ───────────────────────────────────────

const ARCADE_APPS = [
  { slug: 'six-degrees', needs: ['live'], preview: 'terminal', shot: 'shots/six-degrees.png', title: 'Six Degrees of Anything', badge: 'live data', accent: '#1a6b5a', feat: true, hook: 'Two things, whether people or films or bands or towns, and the shortest path between them, so Dolly Parton reaches Austin through Willie Nelson.' },
  { slug: 'died-doing-what', needs: ['live'], preview: 'bars', shot: 'shots/died-doing-what.png', title: 'Died Doing What', badge: 'live data', accent: '#8a4a3a', feat: true, hook: 'Pick a trade and Wikidata reports how its people actually died, so for poets tuberculosis leads at a median age of 58.' },
  { slug: 'taco-coin-flip', needs: ['live'], preview: 'terminal', shot: 'shots/taco-flip.png', title: 'Taco Coin Flip', badge: 'live data', accent: '#b31f5b', feat: true, hook: "Settles a lunch argument between two Austin restaurants, and if one scored worse on the city's real inspection records then the coin defers to the cleaner option." },
  { slug: 'corporate-translator', needs: ['browser'], preview: 'terminal', shot: 'shots/translator.png', title: 'Corporate Translator', badge: 'no data needed', accent: '#4a5ac9', feat: true, hook: 'Paste an email and slide from passive-aggressive to Texan warm, and the slider genuinely rewrites the text.' },
  { slug: 'streak-autopsy', needs: ['browser'], preview: 'grid', shot: 'shots/streak-autopsy.png', title: 'Streak Autopsy', badge: 'tracks your taps', accent: '#6b6255', feat: true, hook: 'A habit tracker that only gets interesting when you fail, so two missed days and it stamps the habit DECEASED and opens a case file.' },
  { slug: 'whodunit-roulette', needs: ['live', 'export'], preview: 'terminal', shot: 'shots/whodunit.png', title: 'Whodunit Roulette', badge: 'live + your export', accent: '#7a3b8f', feat: true, hook: 'Picks your next mystery by mood, and if you import your Goodreads or StoryGraph export it learns which authors you return to.' },
  { slug: 'nepotism-graph', needs: ['live'], preview: 'terminal', title: 'The Nepotism Graph', badge: 'live data', accent: '#1a6b5a', hook: 'Which professions run in families, so of the 25,885 conductors in Wikidata, 347 have a relative who also conducted.' },
  { slug: 'same-name', needs: ['live'], preview: 'terminal', title: 'Same Name, Different Life', badge: 'live data', accent: '#1a6b5a', hook: 'Every human in Wikidata who carried your name, as a timeline, a constellation, and a list.' },
  { slug: 'backlog-reaper', needs: ['export'], preview: 'bars', title: 'Backlog Reaper', badge: 'your export', accent: '#8a4a3a', hook: 'Your unplayed game pile scored by guilt with one title condemned, and you can delete it forever or spare it like a coward.' },
  { slug: 'was-it-worth-it', needs: ['browser'], preview: 'grid', title: 'Was It Worth It?', badge: 'tracks your taps', accent: '#6b6255', hook: 'Log a purchase and thirty days later it asks whether you still care, and it keeps your lifetime regret rate.' },
  { slug: 'sample-size-roast', needs: ['browser'], preview: 'bars', title: 'Sample Size Roast', badge: 'no data needed', accent: '#4a5ac9', hook: 'Paste a percentage claim, give it n, and receive consequences, which is real margin-of-error math plus an honest rewrite of the stat.' },
  { slug: 'oracle', needs: ['browser'], preview: 'ring', title: 'One-Question Oracle', badge: 'no data needed', accent: '#4a5ac9', hook: 'An obsidian scrying stone that never answers, so you ask it anything and it hands back a harder question.' },
  { slug: 'sql-tarot', needs: ['browser'], preview: 'grid', title: 'SQL Tarot', badge: 'no data needed', accent: '#7a3b8f', hook: 'Fourteen SQL clauses, upright or reversed, dealt into past, present, and ships-to-prod.' },
  { slug: 'locked-room', needs: ['browser'], preview: 'ring', title: 'The Locked Room', badge: 'no data needed', accent: '#7a3b8f', hook: 'A house, a body, six guests, and one impossible exit, with a fresh locked-room mystery generated every time.' },
  { slug: 'escalation-simulator', needs: ['browser'], preview: 'ring', title: 'Escalation Simulator', badge: 'no data needed', accent: '#8a4a3a', hook: 'An enterprise account is on fire and you have five decisions, and every choice moves account health and none of them are free.' },
];

// Ticker order on the work page differs deliberately from the arcade's curated order.
const ARCADE_TITLES = ['Six Degrees of Anything', 'Died Doing What', 'Taco Coin Flip', 'SQL Tarot', 'The Nepotism Graph', 'Corporate Translator', 'Streak Autopsy', 'The Locked Room', 'One-Question Oracle', 'Whodunit Roulette', 'Backlog Reaper', 'Was It Worth It?', 'Same Name, Different Life', 'Sample Size Roast', 'Escalation Simulator'];

export {
  HERO_STATS, SIGNAL_TYPED, SIGNAL_SCRAPS, SIGNAL_OUT, SIGNAL_NOTES,
  READ_ROWS, SEC_CONTACTS,
  ARCADE_APPS, ARCADE_TITLES,
  DUMP_BITS, BRAIN_STATES, ANNOTATED, ATX_ZIPS, ROLES, RAIL_TICKS,
  SKILLS, CERTS, OBSERVATIONS, LIFE_TEASERS, CONTACT_LINKS,
  LIFE_FIELD, LIFE_RELATED, INVOICE_ROWS, RACCOON_LIFE, PROGRESS,
  PLACES, LIFE_INTERESTS, LIFE_FACTS, READING, PLAYING, RECORDS, CHRISTIE,
  TK_REPO, TK_FALLBACK, TK_NOTES, TK_META, TK_HEAD, TK_TOKENS,
};
