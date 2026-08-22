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
  { n: '1', title: 'Ranked, not listed', body: 'Accounts come back in risk order, so the first thing you read is the thing to act on.' },
  { n: '2', title: 'One line per account', body: 'The read is a sentence you can paste into Slack without editing it.' },
  { n: '3', title: 'The contact read', body: 'Second-order sentiment — the gap between what someone says and what their behavior says.' },
  { n: '4', title: 'One action', body: 'Not a list of options. A single "do this today," which is what makes it usable before a call.' },
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
  Foggy: { note: 'Foggy gets one physical task and warmer wording. Decision work is pushed down the list, not surfaced.',
    piles: [
      { k: 'Energy for today', v: 'Eat something. That is the whole task.' },
      { k: 'Real but not now', v: 'Thursday deck · vendor callback' },
      { k: 'Worth keeping', v: 'Learn Snowflake properly — park it, it is a good one' },
      { k: 'Put it down', v: 'The Q2 thing. It is closed and you are still carrying it.' } ] },
  Low: { note: 'Low energy blocks decision work entirely. Nothing needing a judgement call reaches the first pile.',
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
  Wired: { note: 'Wired gets a hard cap. Two items, because the failure mode here is starting six things.',
    piles: [
      { k: 'Energy for today', v: 'Thursday deck, all the way through' },
      { k: 'Real but not now', v: 'Vendor callback · laundry' },
      { k: 'Worth keeping', v: 'Snowflake — write the plan down, do not open it tonight' },
      { k: 'Put it down', v: 'The Q2 thing' } ] },
  Heavy: { note: 'Heavy reorders around the weight first. The thing you are carrying gets named before anything is asked of you.',
    piles: [
      { k: 'Put it down', v: 'The Q2 thing. You have thought about it for weeks and it is finished.' },
      { k: 'Energy for today', v: 'Eat. Then the vendor callback if it still feels possible.' },
      { k: 'Real but not now', v: 'Thursday deck' },
      { k: 'Worth keeping', v: 'The Greenbelt run' } ] },
};

const ANNOTATED = [
  { kicker: 'Instacart · dbt on BigQuery · 3.4M orders', headline: 'One cited number, rebuilt until it split in half.',
    cta: 'See the models ↗', href: 'https://github.com/SamieVargas/instacart-project',
    img: 'assets/instacart-dbt/dag_01_full_lineage.png', alt: 'dbt lineage graph — staging models through to marts',
    cols: '1fr 1.15fr', imgFirst: true,
    inputLine: 'In: raw order tables · out: five staging models, one join, three marts, 35 passing tests',
    notes: [
      { n: '1', title: 'Lineage you can follow', body: 'Every mart traces back to a named staging model, so a number can be argued with.' },
      { n: '2', title: '35 tests, not null checks', body: 'The tests encode business rules — grain, valid segments, plausible ranges.' },
      { n: '3', title: 'Segmented, then compared', body: 'Reorder rate recomputed per shopper tenure instead of pooled.' },
      { n: '4', title: 'Confirmed with a model', body: 'Random forest AUC 0.989 for veterans against 0.857 for new users.' } ],
    finding: 'new shoppers reorder at 0.221, veterans at 0.670. The 0.60 everyone cites describes neither.' },
  { kicker: 'ATX Foodie · Socrata API · 21,160 records', headline: 'A pest-sighting post, turned into an audit of where I eat.',
    cta: 'See the findings ↗', href: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection',
    img: 'assets/atx-foodie-inspection/my_favs.png', alt: 'Inspection scores for my regular restaurants',
    cols: '1.15fr 1fr', imgFirst: false, isAtx: true,
    inputLine: 'In: City of Austin open data, paginated · out: brand scorecard and a folium choropleth',
    notes: [
      { n: '1', title: 'My own spots first', body: 'The places I eat at weekly, queried by name — the question I actually had.' },
      { n: '2', title: 'Scored per visit type', body: 'Routine visits separated from follow-ups, which is where the pattern lives.' },
      { n: '3', title: '84 brands compared', body: 'A compliance scorecard across local restaurant groups, not single locations.' },
      { n: '4', title: 'Mapped by zip', body: 'A choropleth of Austin, so a neighborhood answer replaces an anecdote.' } ],
    finding: 'follow-up inspections score eight points below routine visits. Evidence of a broken corrective loop.' },
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
  { zip: '78660', score: 92.3, label: 'Pflugerville', box: [30.440, -97.640, 30.408, -97.610] },
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
  { name: 'Anthropic AI Fluency — full credential set', issuer: 'Anthropic Academy · Jun 2026', href: 'https://www.anthropic.com/learn' },
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
      'The Instacart dataset gets cited constantly: 60% of items in a typical order are things the shopper has bought before. I spent a week building a transformation layer on top of it to make the data trustworthy. First real query and the number fell apart.',
      'New shoppers reorder at 0.221. Veterans at 0.670. Same metric, same platform, same dataset, a threefold difference. The average is not wrong. It is four different behavioral profiles compressed into one number that describes none of them.',
      'Also: I am in this dataset. I ordered groceries the day I ran the query. Dairy and produce came back as my top two reorder departments. That was just my cart.'],
    sourceText: 'Built in dbt on BigQuery ·', linkText: 'Full project ↗', linkHref: 'https://github.com/SamieVargas/instacart-project' },
  { tag: 'Apr–May 2026 · personal biometric data', title: 'My nervous system knew about the raccoon before I did',
    paragraphs: [
      'For several nights I slept badly and could not explain it. I blamed podcasts. I cancelled plans. Then I got up early one Wednesday and found a mother raccoon and her babies nesting on my balcony.',
      'The wearable data told the story better than I could. Five consecutive days at a body battery of 5 out of 100 — the floor — before I knew what the threat was. Sleep score fell from a baseline of 81 to 53.',
      'The part that surprised me was after. The raccoons were removed on May 3. It took eight days to return to baseline. The nervous system does not get the memo. That lag, not the disruption, is what the data made visible.'],
    sourceText: 'Full story with photos →', linkText: 'The Raccoon Invoice ↗', linkHref: 'https://samievargas.com/raccoon/',
    chart: { title: 'Body battery, out of 100', hint: 'Scrub the days', max: 100, days: RACCOON_DAYS } },
  { tag: 'May 2026 · 21,160 inspection records', title: 'Being flagged does not fix it',
    paragraphs: [
      'I started by querying every restaurant I actually eat at against the city health inspection API. Places that failed and were sent for a follow-up visit scored eight points lower on average than routine visits. Not higher. Lower.',
      'A second pattern across 84 local brands: scores decay measurably by the fifth or sixth inspection cycle. Repeat offenders are identifiable before it gets bad. The city already has the data. The question is whether anyone has built the workflow to act on it.'],
    sourceText: 'City of Austin open data ·', linkText: 'Full analysis ↗', linkHref: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection' },
  { tag: 'May 2026 · systems', title: 'Every productivity system I have built has the same failure mode',
    paragraphs: [
      'I have a very good system. I have rebuilt it roughly four times. Each rebuild improves on the last and shares the same core problem: it requires me to want to use it at the exact moment I am least capable of wanting to use anything.',
      'I do not think this is a failure. This is what maintenance looks like when your brain does not do it automatically. You rebuild, and the rebuilt version is smarter because you know more.'],
    sourceText: 'Currently running on Todoist and Drive', linkText: '', linkHref: '#' },
];

const LIFE_TEASERS = [
  { k: 'The field', v: 'Everything I noticed, plotted by whether I built something about it' },
  { k: 'Running', v: '15 of 21 miles on the Greenbelt' },
  { k: 'Reading', v: 'The complete Christie, in order. Stalled on late Poirot.' },
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
  { id: 'walk', short: 'A walk is worth half a point', kind: 'Noticed → built', title: 'What a walk is actually worth', x: '62%', y: '18%', year: '2026', art: 'assets/pixels-rag/pixels-rag-1.png', href: 'https://github.com/SamieVargas/pixels-rag', linkLabel: 'See how it works ↗', line: 'Six months of my own daily data, askable in plain language. Hot yoga plus walking beat everything else for sleep and recovery.' },
  { id: 'lifeos', short: 'Life OS', kind: 'Built', title: 'Life OS', x: '88%', y: '30%', year: '2025–26', art: 'assets/life-os/lifeos_today.png', href: 'https://samievargas.com', linkLabel: 'See the dashboard ↗', line: 'A daily dashboard pulling from two of my own data endpoints — fifteen charts across health, habits, and whatever I said I would do.' },
  { id: 'tarot', short: 'Tarot tracker', kind: 'Built', title: 'Seven decks and a tracker', x: '76%', y: '58%', year: '2025', art: 'assets/tarot-tracker/deck.png', href: 'https://samievargas.com', linkLabel: 'Open the tracker ↗', line: 'Every pull logged across all 78 cards, with the ones that keep coming back. Built because I pull most mornings anyway.' },
  { id: 'journal', short: 'Journaling since 2020', kind: 'Built', title: 'My own journaling app', x: '70%', y: '80%', year: '2020–26', line: 'Daily since 2020, in an app I built so the prompts are exactly what I want. The patterns across months are different from what shows up in a single day.' },
  { id: 'raccoon', short: 'The raccoon', kind: 'Noticed', title: 'Why I could not sleep', x: '24%', y: '26%', year: '2026', line: 'Five bad nights I blamed on podcasts. My recovery score had been pinned at the floor for days before I found a raccoon nesting on my balcony.' },
  { id: 'toothbrush', short: 'The toothbrush', kind: 'Noticed', title: 'Sixteen tooth zones', x: '14%', y: '44%', year: '2026', line: 'A brush that maps sixteen zones told me in 45 seconds what years of appointments had not. I was not getting my back molars. Showing someone the gap is the whole job.' },
  { id: 'poirot', short: 'Paused on Poirot', kind: 'Noticed', title: 'Why I stopped reading', x: '20%', y: '68%', year: 'Ongoing', line: 'I am reading the complete Christie in order and I have stalled in the late Poirot books, because he is getting old in them and I am not ready.' },
  { id: 'caesar', short: 'The Caesar search', kind: 'Noticed', title: 'The perfect Caesar salad', x: '34%', y: '86%', year: 'Ongoing', line: 'An ongoing and possibly doomed search. Paprika, Desnudo, and Terrible Love are the current favorites for everything else.' },
  { id: 'knee', short: 'The knee', kind: 'Noticed', title: 'What the knee actually allows', x: '30%', y: '10%', year: 'Ongoing', line: 'Hot yoga and pilates are for the knee and the nervous system. It is the gating factor on the Greenbelt, not fitness.' },
  { id: 'greenbelt', short: '15 of 21 miles', kind: 'In progress', title: 'The full Greenbelt', x: '48%', y: '92%', year: 'Ongoing', line: 'The trail runs 21 miles out and back and I am at fifteen. The Greenbelt in October, water still warm, is one of the best things about living here.' },
  { id: 'flipper', short: 'The medieval problem', kind: 'Built, sort of', title: 'Half-timbering in House Flipper', x: '86%', y: '72%', year: '2026', line: 'I spent an unreasonable amount of time getting the half-timbering right. Cobblestone base, old plaster, steep pitched roof. It served no purpose and I loved every minute.' },
];

const LIFE_RELATED = {
  walk: ['raccoon', 'lifeos', 'greenbelt', 'knee'], lifeos: ['walk', 'tarot', 'journal'], tarot: ['lifeos', 'journal'],
  journal: ['tarot', 'lifeos'], raccoon: ['walk', 'lifeos'], toothbrush: ['raccoon', 'walk'], poirot: ['journal'],
  caesar: ['toothbrush'], knee: ['greenbelt', 'walk'], greenbelt: ['knee', 'walk'], flipper: ['tarot'],
};

const INVOICE_ROWS = [
  { item: 'Nights slept badly before I knew why', qty: '5', note: 'blamed podcasts' },
  { item: 'Days at a body battery of 5 out of 100', qty: '6', note: 'the floor' },
  { item: 'Worst HRV on record', qty: '26 ms', note: 'April 30' },
  { item: 'Sleep score, against a baseline of 81', qty: '53', note: 'measured, not felt' },
  { item: 'Raccoons nesting on the balcony', qty: '1 + kits', note: 'found May 1' },
  { item: 'Days back to baseline after removal', qty: '8', note: 'the surprising part' },
];

const RACCOON_LIFE = [
  RACCOON_DAYS[0], RACCOON_DAYS[1], RACCOON_DAYS[2], RACCOON_DAYS[3], RACCOON_DAYS[4],
  { d: 'Apr 29', v: 5, note: 'Still the floor. Sleep score 53 against a baseline of 81.' },
  RACCOON_DAYS[6], RACCOON_DAYS[7], RACCOON_DAYS[8], RACCOON_DAYS[9], RACCOON_DAYS[10], RACCOON_DAYS[11], RACCOON_DAYS[12],
];

const PROGRESS = [
  { title: 'The full Greenbelt, out and back', note: '15 of 21 miles', pct: 71 },
  { title: 'Agatha Christie, in order', note: 'stalled on late Poirot', pct: 71 },
  { title: 'Snowflake hands-on badges', note: '1 of 3', pct: 33 },
  { title: 'dbt Certified Developer', note: 'fundamentals done', pct: 45 },
  { title: 'Steam review-bombing detection', note: '31M+ reviews, modeling', pct: 30 },
  { title: 'Solo travel — London first', note: 'neighborhoods mapped', pct: 20 },
];

const PLACES = [
  { name: 'Paprika', note: 'The standing default. Patio, late.', zip: '78757', score: 91.6 },
  { name: 'Desnudo', note: 'Coffee that turns into something else by evening.', zip: '78702', score: 89.3 },
  { name: 'Terrible Love', note: 'Named like a warning, eats like a favourite.', zip: '78704', score: 88.7 },
  { name: 'Barton Springs, before the crowd', note: 'Not food. Still part of the rotation.', zip: '78704', score: 88.7 },
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
    why: 'My name on its own loses to every other Samie Vargas in a search result, and says nothing in a tab strip of twelve. This says what I do in the space I have.' },
  { name: 'Social title', attr: 'og:title · twitter:title', current: 'I ship AI tools that replace work I used to do by hand', status: 'Live · 54 chars',
    why: 'This is the line that shows up in someone\'s Slack, which is how most people get here. It should be the claim — my name is already on the card as the domain.' },
  { name: 'Social description', attr: 'og:description', current: 'Signal reads messy account files in a minute. 3.4M orders modeled in dbt. 21,160 inspection records. Eight years running a $14M+ enterprise book.', status: 'Live · 146 chars',
    why: 'The title makes the claim, so this carries proof instead of repeating it. Every number here is one I can walk someone through.' },
  { name: 'Search description', attr: 'meta name="description"', current: 'Applied-AI operator in enterprise customer success. I build the LLM workflows and ship the tools — Signal, Brain Dump, dbt pipelines. Austin, remote.', status: 'Live · 150 chars',
    why: 'Google cuts around 155, and my old one was 197, so the part being dropped was the location. This ends on the strongest clause and still keeps Austin.' },
  { name: 'Card alt text', attr: 'og:image:alt', current: 'Samie Vargas — applied AI and enablement. Austin, remote.', status: 'Live',
    why: 'Some clients and every screen reader get this instead of the image. It was missing entirely.' },
  { name: 'Canonical + theme', attr: 'link canonical · meta theme-color', current: 'https://samievargas.com/ · #1a6b5a', status: 'Live',
    why: 'The site answers on two domains, so one of them has to be the real one. The theme colour tints mobile browser chrome to the same green as everything else.' },
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

export {
  HERO_STATS, SIGNAL_TYPED, SIGNAL_SCRAPS, SIGNAL_OUT, SIGNAL_NOTES,
  DUMP_BITS, BRAIN_STATES, ANNOTATED, ATX_ZIPS, ROLES, RAIL_TICKS,
  SKILLS, CERTS, OBSERVATIONS, LIFE_TEASERS, CONTACT_LINKS,
  LIFE_FIELD, LIFE_RELATED, INVOICE_ROWS, RACCOON_LIFE, PROGRESS,
  PLACES, LIFE_INTERESTS, LIFE_FACTS, READING, PLAYING,
  TK_REPO, TK_FALLBACK, TK_NOTES, TK_META, TK_HEAD, TK_TOKENS,
};
