// ============================================================
// data/content.js
// Every word on the page lives here. Markup shape is in js/app.js.
// ============================================================

const NAV = [
  { label: 'Signal', href: '#signal', id: 'signal' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'The field', href: '#field', id: 'field' },
  { label: 'Building', href: '#building', id: 'building' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Writing', href: '#writing', id: 'writing' },
  { label: 'About', href: '#about', id: 'about' },
];

const PROJECTS = [
  { id: 'signal', kicker: '01 · Built and shipped', year: '2026', title: 'Signal',
    img: 'assets/signal/signal-7.png', filters: ['AI'],
    plain: 'An hour of digging through scattered account documents, done in a minute. Paste in call notes, decks or exports and it returns a read on the account, who actually matters, and the one thing to do today.',
    how: 'Two passes over the documents: a cheap model summarizes each one, then a stronger model synthesizes across all of them. Four focus modes trade depth against cost. The API key lives on a server so the code can stay public.',
    found: 'The contact read is the sleeper feature — the gap between what someone says and what their behavior says is what experienced managers read instinctively. This makes it explicit and quotable.',
    tags: ['JavaScript', 'Anthropic API', 'Cloudflare Workers', 'Prompt design'],
    href: 'https://samievargas.com/signal/', linkLabel: 'Try it ↗' },
  { id: 'instacart', kicker: '02 · Analysis', year: '2026', title: 'Instacart, 3.4M orders',
    img: 'assets/instacart-dbt/dag_01_full_lineage.png', filters: ['Data'],
    plain: 'Everyone cites the same 60% reorder rate. It hides a threefold gap between new and long-time shoppers — one number describing four different behaviors.',
    how: 'Built a transformation layer in dbt on BigQuery: five staging models, one join, three marts, 35 tests that encode business rules rather than just checking for nulls.',
    found: 'New shoppers reorder at 0.221, veterans at 0.670. The data only becomes reliable for prediction at ten or more orders — a threshold a machine learning model later confirmed.',
    tags: ['dbt Cloud', 'BigQuery', 'SQL', 'Looker Studio'],
    href: 'https://github.com/SamieVargas/instacart-project', linkLabel: 'GitHub ↗' },
  { id: 'braindump', kicker: '03 · Built and shipped', year: '2026', title: 'Brain Dump',
    img: 'assets/brain-dump/brain_dump_1.png', filters: ['AI'],
    plain: 'A timed free-write that sorts what comes out into four piles: what you have energy for today, what is real but not now, ideas worth keeping, and weight you are carrying for no reason.',
    how: 'Five energy states change the output materially. Foggy gets one physical task and warm wording. Low energy blocks decision work entirely. Built plain, no framework, key held server-side.',
    found: 'It caught that I had not eaten dinner at 7:30pm and made that the first priority. Matching the output to the state someone is actually in matters more than the sorting itself.',
    tags: ['JavaScript', 'Anthropic API', 'Cloudflare Workers', 'UX'],
    href: 'https://samievargas.com/brain-dump', linkLabel: 'Try it ↗' },
  { id: 'atx', kicker: '04 · Analysis', year: '2026', title: 'Austin food safety',
    img: 'assets/atx-foodie-inspection/my_favs.png', filters: ['Data'],
    plain: 'A pest-sighting post about a place I eat at weekly made me realize I had no visibility into any of it. So I pulled 21,160 city inspection records and looked.',
    how: 'Paginated pull from the city open-data API, brand scorecards across 84 local restaurant groups, and a map of compliance by zip code.',
    found: 'Restaurants sent for a follow-up visit score eight points lower on average than routine visits. The corrective loop is not closing, and repeat offenders are identifiable well before it gets bad.',
    tags: ['Python', 'pandas', 'folium', 'Public data'],
    href: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection', linkLabel: 'Kaggle ↗' },
];

const ALSO = [
  { kicker: 'AI · Python', title: 'Life in Pixels RAG', plain: 'Ask plain questions of six months of my own daily behavioral data. Hot yoga plus walking produced the best sleep and recovery scores.', filters: ['AI'] },
  { kicker: 'Apps Script', title: 'Life OS', plain: 'A daily dashboard pulling from two of my own data endpoints. Fifteen charts across health, habits, and behavior.', filters: ['Data'] },
  { kicker: 'JavaScript', title: 'Tarot Tracker', plain: 'Pull history across 78 cards, suit patterns, and the cards that keep showing up. Built because I pull most days.', filters: ['Personal'] },
  { kicker: 'Machine learning', title: 'Reorder prediction', plain: 'Tested whether the Instacart segment gap is learnable. Veteran users scored 0.9886 against 0.8566 for new users.', filters: ['Data'] },
];

const FILTERS = ['All', 'AI', 'Data', 'Personal'];

const BUILDING = [
  { title: 'Steam review-bombing detection', body: 'Sentiment analysis across 31M+ game reviews to detect when a score is being driven by something other than the game — developer controversy, monetization backlash, exclusivity deals. Built as an early warning system before a score collapse becomes a crisis.' },
  { title: 'dbt Certified Developer', body: 'Pushing past Fundamentals into the full certification. The Instacart project is the working foundation; now closing the gaps the exam requires.' },
  { title: 'Snowflake hands-on essentials', body: 'Databases, warehouses, semi-structured loading, performance tuning, cloning, and time travel. Badge two on collaboration and cost estimation follows.' },
  { title: 'The full Greenbelt, 21 miles out and back', body: 'Currently at fifteen. Knee rehab is the gating factor, not fitness. Garmin is tracking everything.' },
  { title: 'Solo travel — London', body: 'Neighborhoods mapped, restaurant shortlist started. The goal is not the trip, it is the category. London is just first.' },
];

const ROLES = [
  { title: 'Senior Manager, Service', period: 'Oct 2023 – Present', bullets: [
    'Lead a team of client solutions managers across a $14M+ enterprise book — setting KPIs, running weekly performance reviews, and coaching to retention and growth targets.',
    'Spearheaded a 5% year-over-year growth strategy across global professional services and advisory clients, finding expansion signals in usage data and stakeholder mapping.',
    'Built Salesforce health scoring dashboards and automated reporting that reduced reactive escalations and gave leadership a live view of account risk.',
    'Built and rolled out AI-assisted workflows for quarterly review prep, escalation drafts, and data synthesis. Wrote the prompts and the process, trained the team, drove adoption across 8 managers, and cut prep time by 60%.',
    'Designed delivery frameworks for high-complexity, multi-stakeholder engagements across consulting, financial services, and technology.'],
    tags: ['Team leadership', 'Salesforce', 'Revenue growth', 'AI workflows'] },
  { title: 'Manager, Client Solutions — Team Lead', period: 'Mar 2022 – Oct 2023', bullets: [
    'Managed a team of specialists while carrying a personal enterprise book, bridging delivery and people management through a high-growth phase.',
    'Founded and scaled an internal Center of Excellence: playbooks, onboarding templates, and performance cadences adopted team-wide.',
    'Led coordination with product, legal, and operations to resolve complex escalations and protect retention in a high-touch model.',
    'Developed renewal forecasting and pipeline tracking in Salesforce that improved quarterly accuracy and surfaced at-risk accounts earlier.'],
    tags: ['Center of Excellence', 'Playbooks', 'Renewal forecasting'] },
  { title: 'Associate → Senior Client Solutions Manager', period: 'Jul 2018 – Feb 2022', bullets: [
    'Grew from individual contributor to senior manager of complex enterprise accounts across consulting, financial services, and technology — promoted twice in four years.',
    'Built custom Salesforce reporting and tracking that became the team standard for account health visibility.',
    'Maintained top-tier client satisfaction across a high-complexity book that required both operational precision and real relationship depth.'],
    tags: ['Account management', 'Enterprise CS', 'Salesforce'] },
];

const SKILL_GROUPS = [
  { label: 'Analytics', items: [
    { name: 'Python', note: 'pandas · numpy · seaborn · scikit-learn' },
    { name: 'SQL / BigQuery', note: 'advanced' },
    { name: 'dbt Cloud', note: 'certified · staging to marts' },
    { name: 'Machine learning', note: 'classification · random forest · evaluation' },
    { name: 'Regression modeling', note: 'linear · logistic · feature selection' },
    { name: 'Feature engineering', note: '' },
    { name: 'Retrieval pipelines', note: 'chunking · embedding · vector store' },
    { name: 'Data modeling', note: 'grain · test architecture · lineage' } ] },
  { label: 'AI', items: [
    { name: 'Claude', note: 'daily · prompt design · Claude Code' },
    { name: 'Anthropic API', note: 'agents shipped on Cloudflare Workers' },
    { name: 'Multi-pass architecture', note: 'cheap summarize, strong synthesize' },
    { name: 'Source-weighted prompting', note: 'attribution · confidence calibration' },
    { name: 'Retrieval on personal data', note: 'local vector store' },
    { name: 'Agent design', note: 'structured output · state-aware logic' } ] },
  { label: 'Visualization', items: [
    { name: 'Tableau', note: '' }, { name: 'Looker Studio', note: '' },
    { name: 'Power BI', note: '' }, { name: 'matplotlib and seaborn', note: 'advanced' } ] },
  { label: 'Tools', items: [
    { name: 'Snowflake', note: 'loading · formats · compute' },
    { name: 'BigQuery', note: '' },
    { name: 'Google Apps Script', note: '4 apps deployed' },
    { name: 'GitHub Pages', note: 'self-deployed portfolio' },
    { name: 'Salesforce', note: 'ops · reporting · dashboards' } ] },
  { label: 'Operations', items: [
    { name: 'Engagement lifecycle', note: '' }, { name: 'Health scoring architecture', note: '' },
    { name: 'Playbook and CoE design', note: '' }, { name: 'Renewal pipeline architecture', note: '' },
    { name: 'Cross-functional alignment', note: '' }, { name: 'Agile / Scrum', note: 'PSM I certified' } ] },
];

const CERTS = [
  { name: 'Google Advanced Data Analytics Certificate', issuer: 'Google / Coursera · Jun 2026', href: 'https://coursera.org/verify/professional-cert/4REOBHKQJ0DS' },
  { name: 'dbt Fundamentals', issuer: 'dbt Labs · May 2026', href: 'https://credentials.getdbt.com/5470c199-7753-4f90-99a3-07e8f8c6fe51' },
  { name: 'PSM I — Professional Scrum Master', issuer: 'Scrum.org · May 2026', href: 'https://scrum.org/certificates/1318010' },
  { name: 'Snowflake Hands-On Essentials: Data Warehouse', issuer: 'Snowflake · Jun 2026', href: 'https://achieve.snowflake.com/e3201335-75c2-4604-98c1-4c8063699131' },
];

const OTHER_CERTS = [
  { name: 'Google Data Analytics Certificate', issuer: 'Google / Coursera · May 2026' },
  { name: 'Google AI Professional Certificate', issuer: 'Google / Coursera · Jun 2026' },
  { name: 'Google Business Intelligence Certificate', issuer: 'Google / Coursera · Jun 2026' },
  { name: 'Anthropic certifications', issuer: 'Anthropic Academy · Jun 2026' },
  { name: 'Databricks accreditations', issuer: 'Databricks Academy · Jun 2026' },
  { name: 'Google Analytics (GA4)', issuer: 'Google Skillshop · May 2026' },
  { name: 'Predictive Project Management', issuer: 'Project Management Institute · 2026' },
  { name: 'Six Sigma White Belt', issuer: '2026' },
];

const OBSERVATIONS = [
  { tag: 'May 2026 · Instacart · 3.4M orders',
    title: 'The 0.60 reorder rate is technically correct and also meaningless',
    paragraphs: [
      'The Instacart dataset gets cited constantly: 60% of items in a typical order are things the shopper has bought before. I spent a week building a transformation layer on top of it to make the data trustworthy. First real query and the number fell apart.',
      'New shoppers reorder at 0.221. Veterans at 0.670. Same metric, same platform, same dataset, a threefold difference. The average is not wrong. It is four different behavioral profiles compressed into one number that describes none of them.',
      'Also: I am in this dataset. I ordered groceries the day I ran the query. Dairy and produce came back as my top two reorder departments. That was just my cart.'],
    sourceText: 'Built in dbt on BigQuery ·', linkText: 'Full project ↗', linkHref: 'https://github.com/SamieVargas/instacart-project', suffix: '' },
  { tag: 'Apr–May 2026 · personal biometric data',
    title: 'My nervous system knew about the raccoon before I did',
    paragraphs: [
      'For several nights I slept badly and could not explain it. I blamed podcasts. I cancelled plans. Then I got up early one Wednesday and found a mother raccoon and her babies nesting on my balcony.',
      'The wearable data told the story better than I could. Five consecutive days at a body battery of 5 out of 100 — the floor — before I knew what the threat was. Sleep score fell from a baseline of 81 to 53.',
      'The part that surprised me was after. The raccoons were removed on May 3. It took eight days to return to baseline. The nervous system does not get the memo. That lag, not the disruption, is what the data made visible.'],
    sourceText: 'Full story with photos →', linkText: 'The Raccoon Invoice ↗', linkHref: 'https://samievargas.com/raccoon/', suffix: '',
    chart: { title: 'Body battery, out of 100', hint: 'Scrub the days', max: 100, days: [
      { d: 'Apr 24', v: 62, note: 'Normal week. No idea anything was coming.' },
      { d: 'Apr 25', v: 41, note: 'First bad night. Blamed the podcast.' },
      { d: 'Apr 26', v: 18, note: 'Cancelled plans.' },
      { d: 'Apr 27', v: 5,  note: 'The floor. Five out of a hundred.' },
      { d: 'Apr 28', v: 5,  note: 'Still the floor.' },
      { d: 'Apr 29', v: 5,  note: 'Still the floor. Sleep score 53.' },
      { d: 'Apr 30', v: 5,  note: 'HRV 26ms, my worst on record.' },
      { d: 'May 1',  v: 5,  note: 'Found them. Mother raccoon and babies on the balcony.' },
      { d: 'May 3',  v: 5,  note: 'Raccoons removed. I expected instant relief. Body battery: still 5.' },
      { d: 'May 5',  v: 22, note: 'First movement in ten days.' },
      { d: 'May 7',  v: 44, note: 'Climbing.' },
      { d: 'May 9',  v: 58, note: 'Almost back.' },
      { d: 'May 11', v: 74, note: 'Baseline. Eight days after the threat was gone.' },
    ] } },
  { tag: 'May 2026 · behavioral data',
    title: 'A walk is worth half a point',
    paragraphs: [
      'I have logged my mood on a one to five scale for months in a tracker I built. One pattern kept holding: on days I walked, my average was half a point higher. Not just that day. The following morning too.',
      'The interesting part is what the lag says about recovery. Sleep, stress, and movement do not reset at midnight. That carryover is the thing wellness features tend to flatten out of their models.'],
    sourceText: 'Tracked in a self-built logger ·', linkText: 'Life in Pixels', linkHref: 'https://samievargas.com', suffix: '' },
  { tag: 'May 2026 · 21,160 inspection records',
    title: 'Being flagged does not fix it',
    paragraphs: [
      'I started by querying every restaurant I actually eat at against the city health inspection API. Places that failed and were sent for a follow-up visit scored eight points lower on average than routine visits. Not higher. Lower.',
      'A second pattern across 84 local brands: scores decay measurably by the fifth or sixth inspection cycle. Repeat offenders are identifiable before it gets bad. The city already has the data. The question is whether anyone has built the workflow to act on it.'],
    sourceText: 'City of Austin open data ·', linkText: 'Full analysis ↗', linkHref: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection', suffix: '' },
  { tag: 'May 2026 · unprompted life finding',
    title: 'A toothbrush app fixed something my dentist has been telling me for years',
    paragraphs: [
      'New electric toothbrush, maps your mouth into sixteen zones and tells you which ones you actually cleaned. Three days in it turns out I was not, in fact, getting my back molars. I thought I was. I was not.',
      'The zone map made it obvious in about 45 seconds in a way years of appointments never quite did. Same information, different visibility. Good intervention design is not telling people what to do. It is showing them the gap between what they are doing and what they think they are doing.'],
    sourceText: 'Observation from real life', linkText: '', linkHref: '#', suffix: '' },
  { tag: 'May 2026 · systems',
    title: 'Every productivity system I have built has the same failure mode',
    paragraphs: [
      'I have a very good system. I have rebuilt it roughly four times. Each rebuild improves on the last and shares the same core problem: it requires me to want to use it at the exact moment I am least capable of wanting to use anything.',
      'I do not think this is a failure. This is what maintenance looks like when your brain does not do it automatically. You rebuild, and the rebuilt version is smarter because you know more.'],
    sourceText: 'Currently running on Todoist and Drive', linkText: '', linkHref: '#', suffix: '' },
];

const QUICK_FACTS = [
  { label: 'Currently', value: 'Senior Manager, Service at GLG' },
  { label: 'Location', value: 'Austin, TX · since 2014' },
  { label: 'Education', value: 'B.S. Biochemistry, UT Austin' },
  { label: 'Running', value: '15 of 21 miles on the Greenbelt goal' },
  { label: 'Reading', value: 'The complete Poirot catalog, in order' },
  { label: 'Code', value: 'github.com/SamieVargas' },
];

const INTERESTS = [
  { title: 'Trail running and the Greenbelt', body: 'The Greenbelt in October, water still warm, is one of the best things about living here. Working up to the full 21-mile out and back. The knee is the gating factor, not the fitness.' },
  { title: 'House Flipper and the medieval problem', body: 'I spent an unreasonable amount of time getting the half-timbering right on a build. Cobblestone base, old plaster, steep pitched roof. It served no purpose and I loved every minute.' },
  { title: 'Austin food, and its inspection records', body: 'Current favorites are Paprika, Desnudo, and Terrible Love, plus an ongoing and possibly doomed search for the perfect Caesar salad. The inspection project started here and I still go to all of them.' },
  { title: 'Tarot', body: 'I pull cards most days. It is a journaling prompt, not a prediction. I built a tracker for it because of course I did. Seven decks and counting.' },
  { title: 'Agatha Christie, in order', body: 'Working through the complete catalog. Paused in the later Poirot books because he is getting older in them and I am not ready to read toward the end of something I love.' },
  { title: 'Hot yoga, pilates, and Ring Fit', body: 'The yoga and pilates are for the knee and the nervous system. Ring Fit is because it turns out I need a dragon to fight to stay motivated.' },
  { title: 'Austin, actually', body: 'Here since 2014 and still finding things. Barton Springs before it gets crowded. That late afternoon light in South Austin. I complain about the summers and then September comes.' },
  { title: 'Journaling', body: 'Daily since 2020, in an app I built so the prompts are exactly what I want. The patterns across months are different from what shows up in a single day. That is the whole point.' },
];

const CONTACT_LINKS = [
  { label: 'Email', value: 'sammisnv@gmail.com', href: 'mailto:sammisnv@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/samievargas12', href: 'https://www.linkedin.com/in/samievargas12/' },
  { label: 'GitHub', value: 'github.com/SamieVargas', href: 'https://github.com/SamieVargas' },
  { label: 'Kaggle', value: 'kaggle.com/samievargas', href: 'https://www.kaggle.com/samievargas' },
  { label: 'Résumé', value: 'Download PDF ↓', href: './Resume.pdf' },
];

// The noticing field — every point placed by how it started and who it was for.
// Points with an `art` resolve to something you can open; the rest are honest notes.
const FIELD = [
  { id: 'signal', short: 'Signal', kind: 'Built · work', title: 'Signal', x: '80%', y: '20%', year: '2026',
    art: 'assets/signal/signal-7.png', href: 'https://samievargas.com/signal/', linkLabel: 'Open Signal ↗',
    line: 'Paste in call notes, decks, whatever you have. It hands back a read on the account, who actually matters, and one thing to do today.' },
  { id: 'qbr', short: 'AI workflows for 8 managers', kind: 'Built · work', title: 'AI workflows across the team', x: '58%', y: '9%', year: '2024–26',
    line: 'The same prep work was being redone by eight people every quarter, slightly differently each time. I wrote the prompts and the process and trained the team. Prep time fell 60%.' },
  { id: 'health', short: 'Health scoring', kind: 'Built · work', title: 'Account health scoring', x: '64%', y: '31%', year: '2019–26',
    line: 'Leadership used to learn an account was at risk when it escalated, which is the most expensive moment to find out. Dashboards replaced that with a live view.' },
  { id: 'coe', short: 'Center of Excellence', kind: 'Built · work', title: 'A Center of Excellence, from nothing', x: '54%', y: '42%', year: '2022',
    line: 'Everyone was solving the same problems privately and none of it was written down. Playbooks, onboarding, and cadences that got adopted team-wide.' },
  { id: 'instacart', short: 'The 60% that means nothing', kind: 'Noticed → built · work', title: 'The reorder rate everyone cites', x: '76%', y: '44%', year: '2026',
    art: 'assets/instacart-dbt/dag_01_full_lineage.png', href: 'https://github.com/SamieVargas/instacart-project', linkLabel: 'See the project ↗',
    line: 'Everyone quotes the same 60% figure about grocery orders. Rebuilt properly it splits into 22% for new shoppers and 67% for regulars.' },
  { id: 'churn', short: 'The fiber paradox', kind: 'Noticed · work', title: 'Premium customers leaving faster', x: '34%', y: '25%', year: '2026',
    line: 'The customers paying the most for the best product were leaving twice as fast as everyone else. Three observable attributes flag them early.' },
  { id: 'atx', short: 'Where I eat', kind: 'Noticed → built · life', title: 'The restaurants I eat at every week', x: '74%', y: '62%', year: '2026',
    art: 'assets/atx-foodie-inspection/my_favs.png', href: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection', linkLabel: 'See the findings ↗',
    line: 'Twenty-one thousand city inspection records. Restaurants sent back for a follow-up score eight points lower than routine visits.' },
  { id: 'raccoon', short: 'The raccoon', kind: 'Noticed · life', title: 'Why I could not sleep', x: '26%', y: '70%', year: '2026',
    line: 'Five bad nights I blamed on podcasts. My recovery score had been pinned at the floor for days before I found a raccoon nesting on my balcony.' },
  { id: 'walk', short: 'A walk is worth half a point', kind: 'Noticed → built · life', title: 'What a walk is actually worth', x: '62%', y: '79%', year: '2026',
    art: 'assets/pixels-rag/pixels-rag-1.png', href: 'https://github.com/SamieVargas/pixels-rag', linkLabel: 'See how it works ↗',
    line: 'Six months of my own daily data, askable in plain language. Hot yoga plus walking beat everything else for sleep and recovery.' },
  { id: 'braindump', short: 'Brain Dump', kind: 'Built · life', title: 'Brain Dump', x: '86%', y: '70%', year: '2026',
    art: 'assets/brain-dump/brain_dump_1.png', href: 'https://samievargas.com/brain-dump', linkLabel: 'Open Brain Dump ↗',
    line: 'Write for five minutes without stopping. It sorts what came out into four piles and hands back two things matched to how you actually feel.' },
  { id: 'lifeos', short: 'Life OS', kind: 'Built · life', title: 'Life OS', x: '90%', y: '56%', year: '2025–26',
    art: 'assets/life-os/lifeos_today.png', href: 'https://samievargas.com', linkLabel: 'See the dashboard ↗',
    line: 'A daily dashboard pulling from two of my own data endpoints — fifteen charts across health, habits, and whatever I said I would do.' },
  { id: 'tarot', short: 'Tarot tracker', kind: 'Built · life', title: 'Seven decks and a tracker', x: '72%', y: '90%', year: '2025',
    art: 'assets/tarot-tracker/deck.png', href: 'https://samievargas.com', linkLabel: 'Open the tracker ↗',
    line: 'Every pull logged across all 78 cards, with the ones that keep coming back. Built because I pull most mornings anyway.' },
  { id: 'toothbrush', short: 'The toothbrush', kind: 'Noticed · life', title: 'A toothbrush app and my dentist', x: '16%', y: '57%', year: '2026',
    line: 'A brush that maps sixteen zones told me in 45 seconds what years of appointments had not. Showing someone the gap is the whole job.' },
  { id: 'poirot', short: 'Paused on Poirot', kind: 'Noticed · life', title: 'Why I stopped reading', x: '20%', y: '86%', year: 'Ongoing',
    line: 'I am reading the complete Christie in order and I have stalled in the late Poirot books, because he is getting old in them.' },
  { id: 'greenbelt', short: '15 of 21 miles', kind: 'In progress · life', title: 'The full Greenbelt', x: '42%', y: '92%', year: 'Ongoing',
    line: 'The trail runs 21 miles out and back and I am at fifteen. Knee rehab is the gating factor, not fitness.' },
];

const TABS = [
  { label: 'Home', href: '#top', radius: '0', rotate: 'none' },
  { label: 'Work', href: '#work', radius: '50%', rotate: 'none' },
  { label: 'Notes', href: '#writing', radius: '3px', rotate: 'none' },
  { label: 'About', href: '#about', radius: '0', rotate: 'rotate(45deg)' },
];

export {
  NAV, TABS, FILTERS, PROJECTS, ALSO, BUILDING, ROLES,
  SKILL_GROUPS, CERTS, OTHER_CERTS, OBSERVATIONS,
  QUICK_FACTS, INTERESTS, CONTACT_LINKS, FIELD,
};
