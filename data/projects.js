// ============================================================
// data/projects.js
// ============================================================

export const FEATURED_PROJECTS = [
  {
    id: 'signal',
    badge: 'Self-Built · AI Agent · Vanilla JS · Cloudflare Workers',
    title: 'Signal — Account Intelligence Tool for Customer Success',
    description: 'I spent 8 years doing this hour of account digging manually before every QBR. Signal is what I built instead. Paste or upload anything — Zoom transcripts, MBR/QBR decks, Teams chats, CRM snapshots, usage CSVs, SWOT docs — and Signal synthesizes a full account brief: situation read, contact persona analysis, ranked leverage points, and a single "do this today" action. Built on a two-call architecture: Claude Haiku summarizes each document first (cheap), Claude Sonnet synthesizes across all summaries (main call). Four analysis modes — Full Brief, Revenue Risk, Relationship Read, Pre-Call — each producing meaningfully different output at different token costs. The API key is held in a Cloudflare Worker so the code is safe to demo publicly.',
    quickContext: {
      problem: 'Account managers spend 45-60 minutes before every QBR digging through scattered docs to build a picture they already half-know. The insight is sitting in the data. Nobody has time to connect it.',
      approach: 'Two-call architecture: Haiku per-document summarization (~25x cheaper than sending raw docs to Sonnet) → Sonnet synthesis with source-weighted prompting. Four focus modes reduce token usage by 40-60% on targeted pulls. Source attribution on every section.',
      finding: 'The contact read is the sleeper feature. "Says: not off the table right now. Means: I am not prioritizing this and I am not going to tell you why." That gap between stated and behavioral signal is what experienced CSMs read instinctively — Signal makes it explicit and citable.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/signal/signal-7.png',
          alt: 'Signal book of business view — accounts ranked by risk with one-line reads',
          label: 'Book of Business',
        },
        {
          type: 'img',
          src: './assets/signal/signal-6.png',
          alt: 'Signal add context panel — upload any format, four analysis modes',
          label: 'Upload & Focus',
        },
        {
          type: 'img',
          src: './assets/signal/signal-5.png',
          alt: 'Signal situation read — champion silence pattern with high confidence',
          label: 'Situation Read',
        },
        {
          type: 'img',
          src: './assets/signal/signal-4.png',
          alt: 'Signal contact read — Marcus Webb primary, Priya Nair and Tom Gillis secondary',
          label: 'Contact Read',
        },
        {
          type: 'img',
          src: './assets/signal/signal-3.png',
          alt: 'Signal where to press — three ranked priorities with rationale',
          label: 'Where to Press',
        },
        {
          type: 'img',
          src: './assets/signal/signal-2.png',
          alt: 'Signal do this today and data gaps sections',
          label: 'Do This Today',
        },
        {
          type: 'img',
          src: './assets/signal/signal-1.png',
          alt: 'Signal ask signal chips — five suggested questions auto-populate chat',
          label: 'Ask Signal',
        },
      ],
    },
    filters: ['AI Agent'],
    tags: ['JavaScript', 'Anthropic API', 'AI Agent', 'Prompt Engineering', 'Cloudflare Workers', 'GitHub Pages', 'Two-Call Architecture'],
    links: [
      { href: 'https://samievargas.com/signal/', label: 'Try it →' },
    ],
    dim: false,
  },

  {
    id: 'brain-dump',
    badge: 'Self-Built · AI Agent · Vanilla JS · Cloudflare Workers',
    title: 'Brain Dump — An AI Sorting Tool for ADHD and ADHD-Adjacent Brains',
    description: 'I built this because every productivity app I tried assumed I already knew what I needed to do. I didn\'t. I just needed to get it out of my head first. Brain Dump is a timed free-write tool that sends your unfiltered thoughts to an AI agent, which reads the whole dump holistically and sorts everything into four buckets: things you have energy for today, things that are real but not for right now, ideas worth keeping, and things that are just weight you\'re carrying. The AI then gives you 2-3 focus tasks matched to how you actually feel, with built-in ADHD strategies and a Pomodoro timer that queues your tasks automatically. Five energy states (overwhelmed, scattered, anxious, low energy, foggy) each produce meaningfully different output. The API key is held in a Cloudflare Worker so the code is fully open source without exposing credentials.',
    quickContext: {
      problem: 'Most productivity tools treat you the same way on a bad Tuesday as a good Monday. They also assume you already know what to do. This one starts with the brain dump first.',
      approach: 'Vanilla HTML/CSS/JS, no framework, no build step. Anthropic API proxied through a Cloudflare Worker to keep the key secret while the code stays public. Structured JSON response drives bucket rendering, dynamic focus copy, and Pomodoro queue.',
      finding: 'Energy state materially changes output. Foggy gets one physical gesture and warm copy. Anxious gets two tasks and no "should" anywhere. Low energy blocks decision tasks entirely. The AI also caught that I hadn\'t eaten dinner at 7:30pm and made that the first priority.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/brain-dump/brain_dump_1.png',
          alt: 'Brain dump input view — timer, energy selector, and dump area',
          label: 'Input',
        },
        {
          type: 'img',
          src: './assets/brain-dump/brain_dump_2.png',
          alt: 'Four color-coded buckets with sorted items',
          label: 'Buckets',
        },
        {
          type: 'img',
          src: './assets/brain-dump/brain_dump_3.png',
          alt: 'Your focus today — 3 tasks with inline strategy tags',
          label: 'Focus List',
        },
        {
          type: 'img',
          src: './assets/brain-dump/brain_dump_4.png',
          alt: 'Pomodoro timer with task queue and up next',
          label: 'Pomodoro',
        },
      ],
    },
    filters: ['AI Agent'],
    tags: ['JavaScript', 'Anthropic API', 'AI Agent', 'Cloudflare Workers', 'Prompt Engineering', 'GitHub Pages', 'UX Design'],
    links: [
      { href: 'https://samievargas.com/brain-dump', label: 'Try it →' },
      { href: 'https://github.com/SamieVargas/brain-dump', label: 'View on GitHub →' },
    ],
  },

  {
    id: 'pixels-rag',
    badge: 'Self-Built · RAG Pipeline · Python · Anthropic API',
    title: 'Life in Pixels RAG — Asking Natural Language Questions About My Own Behavioral Data',
    description: 'I\'ve been logging 45 behavioral metrics daily since late 2025. This is a RAG system that lets me ask natural language questions about the patterns in that data — questions a spreadsheet can\'t answer. A spreadsheet can filter one thing. This can reason about the intersection of many: "On days where I was Dysregulated, what else was true?" or "What exercise has the best impact on my mood and sleep?" Each day\'s 35+ fields get converted into an information-dense text chunk, embedded locally via sentence-transformers, stored in ChromaDB, and retrieved semantically. Claude Haiku synthesizes the answer with specific date citations. The data never leaves my machine unencrypted — sensitive fields are stripped server-side by the Apps Script endpoint before the Python client ever sees them.',
    quickContext: {
      problem: 'I had 6 months of rich daily behavioral data and no way to ask multi-dimensional questions across it. SQL filters one column. I needed something that could reason across sleep, HRV, exercise, mood, and regulation simultaneously.',
      approach: 'Built a full RAG pipeline: Google Apps Script sanitized endpoint → ingest.py → chunk.py → ChromaDB local vector store (sentence-transformers, zero API cost for embedding) → Claude Haiku for generation. CLI with --rebuild, --dry-run, and --stats flags.',
      finding: 'Hot Yoga + Walking produced the highest sleep scores (92/100) and HRV (63ms) despite lower step counts than pure cardio days. Yoga appears to sustain positive moods rather than elevate them — every yoga day rated 4-5/5, but days without comparable data show mixed results, so it\'s correlation, not causation. The system is honest about its own limitations.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/pixels-rag/pixels-rag-1.png',
          alt: 'RAG dry run showing information-dense chunk structure',
          label: 'Chunk Structure',
        },
        {
          type: 'img',
          src: './assets/pixels-rag/pixels-rag-2.png',
          alt: 'Query: How does my mood change when I do yoga?',
          label: 'Yoga × Mood Query',
        },
        {
          type: 'img',
          src: './assets/pixels-rag/pixels-rag-3.png',
          alt: 'Query: What exercise has the best impact on mood and sleep?',
          label: 'Exercise × Sleep Query',
        },
      ],
    },
    filters: ['Python', 'AI Agent'],
    tags: ['Python', 'RAG', 'ChromaDB', 'Anthropic API', 'sentence-transformers', 'Google Apps Script', 'Privacy-First Design'],
    links: [
      { href: 'https://github.com/SamieVargas/pixels-rag', label: 'View on GitHub →' },
    ],
    dim: false,
  },

  {
    id: 'instacart-dbt',
    badge: 'Personal Portfolio Project · dbt Fundamentals Certified',
    title: 'Instacart dbt Project — When Does Data Become Trustworthy?',
    description: 'Built a staging → intermediate → mart transformation layer in dbt Cloud on BigQuery across 3.4M Instacart grocery orders. Loaded 6 CSVs from Kaggle via the bq CLI — no manual UI uploads. 35 passing tests that encode business logic, not just nulls. The core finding: the 0.60 average reorder ratio everyone cites hides a 3x difference across user segments. New users reorder at 0.221. Veterans reorder at 0.670. The data only becomes reliable for ML reorder prediction at 10+ orders.',
    quickContext: {
      problem: 'The Instacart dataset ships with no enforced relationships, a days_since_prior_order column that silently caps at 30, and two order-product files that overlap in non-obvious ways. A raw join produces numbers that look correct and are wrong.',
      approach: 'Explored the data in BigQuery before writing a single model. Built 5 staging models, 1 intermediate join, and 3 marts. 35 tests. Connected to Looker Studio for findings visualization.',
      finding: 'Reorder ratio ranges from 0.221 (new users, 1-3 orders) to 0.670 (veterans, 20+ orders). The population average of 0.60 is misleading without the segment label. Data becomes reliable for prediction at 10+ orders.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/instacart-dbt/dag_01_full_lineage.png',
          alt: 'dbt DAG showing full lineage from sources through staging to marts',
          label: 'Data Lineage DAG',
        },
        {
          type: 'img',
          src: './assets/instacart-dbt/find_02_reorder_rate_by_user_segment.png',
          alt: 'Reorder rate by user segment showing 3x difference from new to veteran users',
          label: 'User Segment Finding',
        },
        {
          type: 'img',
          src: './assets/instacart-dbt/find_01_reorder_rate_by_dept.png',
          alt: 'Reorder rate by department showing dairy eggs and produce at top',
          label: 'Department Finding',
        },
        {
          type: 'img',
          src: './assets/instacart-dbt/doc_01_dbt_test_all_passing.png',
          alt: '35 of 35 dbt tests passing',
          label: '35 Tests Passing',
        },
        {
          type: 'img',
          src: './assets/instacart-dbt/find_03_looker_page-1.png',
          alt: 'Looker dashboard page 1',
          label: 'Looker: Orders',
        },
        {
          type: 'img',
          src: './assets/instacart-dbt/find_03_looker_page-2.png',
          alt: 'Looker dashboard page 2 — user segmentation',
          label: 'Looker: User Segments',
        },
      ],
    },
    filters: ['SQL', 'dbt'],
    tags: ['dbt Cloud', 'BigQuery', 'SQL', 'bq CLI', 'Data Modeling', 'Looker Studio', 'dbt Fundamentals'],
    links: [
      { href: 'https://github.com/SamieVargas/instacart-project', label: 'View on GitHub →' },
      { href: 'https://datastudio.google.com/reporting/e6e40a84-8ad4-47e8-b6f7-25016e65b32b', label: 'Interact on Looker →' },
    ],
  },

  {
    id: 'instacart-ml',
    badge: 'Google Advanced Data Analytics Capstone · ML Extension',
    title: 'Instacart Reorder Prediction — Does the Segment Finding Hold Under ML?',
    description: 'Built a reorder prediction model on top of the dbt mart layer to validate a behavioral threshold found in SQL. Instead of pulling raw CSVs like every other Instacart notebook on Kaggle, feature inputs came from validated BigQuery marts with 35 passing dbt tests behind them. The core question: if veteran users (10+ orders) reorder at 3x the rate of new users, is that difference actually learnable — or just descriptive? Trained logistic regression and random forest classifiers on 480K order-product rows. Veteran user AUC: 0.9886. New user AUC: 0.8566. The 0.1320 gap is ML evidence for the same threshold the SQL analysis found.',
    quickContext: {
      problem: 'The dbt project found that users with 10+ orders reorder at 3x the rate of new users. SQL can describe that pattern — it can\'t tell you whether it\'s learnable. This notebook finds out.',
      approach: 'Pulled 2M rows from dbt mart layer via BigQuery. Applied the 10+ order filter as justified preprocessing. Trained logistic regression baseline (AUC 0.8585) and random forest (AUC 0.8711). Ran segment AUC comparison on held-out new user population.',
      finding: 'Veteran users scored 0.9886 AUC vs 0.8566 for new users — a 15.4% performance gap. `order_reorder_ratio` was the dominant feature at 0.37 importance, nearly 4x the next predictor. Two methods, one threshold.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/instacart-ml/V3_segment_auc_comparison.png',
          alt: 'Segment AUC comparison — new users vs veteran users',
          label: 'Segment Validation',
        },
        {
          type: 'img',
          src: './assets/instacart-ml/V4_feature_importances.png',
          alt: 'Random forest feature importances — order_reorder_ratio dominates',
          label: 'Feature Importances',
        },
        {
          type: 'img',
          src: './assets/instacart-ml/V1_data_overview.png',
          alt: 'Data overview — target distribution and segment reorder gradient',
          label: 'Data Overview',
        },
        {
          type: 'img',
          src: './assets/instacart-ml/V2_correlation_heatmap.png',
          alt: 'Feature correlation heatmap',
          label: 'Correlation Heatmap',
        },
        {
          type: 'img',
          src: './assets/instacart-ml/V5_confusion_matrix.png',
          alt: 'Confusion matrix — random forest on test set',
          label: 'Confusion Matrix',
        },
      ],
    },
    filters: ['Python', 'ML', 'SQL', 'dbt'],
    tags: ['Python', 'pandas · scikit-learn · seaborn', 'BigQuery', 'Logistic Regression', 'Random Forest', 'dbt', 'Google GADA Cert', 'Kaggle'],
    links: [
      { href: 'https://www.kaggle.com/code/samievargas/instacart-reorder-ml', label: 'View on Kaggle →' },
      { href: 'https://github.com/SamieVargas/instacart-project', label: 'dbt Project →' },
    ],
  },

  {
    id: 'gda-capstone',
    badge: 'Google Data Analytics Certificate Capstone',
    title: 'Wearable Engagement & Fitness Dropout Prediction',
    description: 'Analyzed the LifeSnaps/Fitbit longitudinal dataset (71 users, 4+ months) to identify behavioral and physiological signals that predict fitness goal dropout. Surfaced Feb/March burnout patterns, cadence load spikes, and HRV trends as early dropout predictors — built in Python and BigQuery SQL, informed by personal Garmin training data and 8 years of observing behavioral dropout in enterprise clients.',
    quickContext: {
      problem: 'What early behavioral signals predict fitness goal dropout — before users fully disengage?',
      approach: 'Analyzed 71 users across 4+ months of LifeSnaps/Fitbit longitudinal data in Python and BigQuery SQL. Cross-referenced with personal Garmin cadence data.',
      finding: 'Feb/March burnout spikes, HRV trend drops, and cadence load overload precede dropout by 2-3 weeks — actionable by any wearable platform with the right alerting logic.',
    },
    media: {
      type: 'iframe',
      src: 'https://docs.google.com/presentation/d/e/2PACX-1vRsL1gK9sbwSSWGcXKwWrtsRjn_20h1qjh8Qv0mBmYtyPDf1hTv-7I1DsbQFXXmqYxjamyaZ5aXqgZD/pubembed?start=false&loop=false&delayms=3000',
    },
    filters: ['Python', 'ML'],
    tags: ['Python (pandas · matplotlib)', 'BigQuery SQL', 'EDA', 'Behavioral Analysis', 'Looker Studio', 'Google GDA Cert'],
    links: [
      { href: 'https://www.kaggle.com/code/samievargas/sv-wearable-dropout-behavioral-signals', label: 'View on Kaggle →' },
    ],
  },

  {
    id: 'ibm-churn',
    badge: 'Personal Portfolio Project',
    title: 'IBM Telco Customer Churn — The Fiber Paradox',
    description: 'Analyzed 7,000+ customer records using Python, pandas, seaborn, and logistic regression. Identified a "Fiber Paradox" — premium internet customers churning at 2x the rate of lower-tier users — and engineered a composite risk signal (new customer + fiber + no tech support) that surfaces high-churn candidates a CS team can action in any CRM without ML infrastructure. Modeled on 8 years of enterprise retention patterns.',
    quickContext: {
      problem: 'Why are premium fiber customers churning at twice the rate of basic-plan users — and can we catch them before they leave?',
      approach: 'Logistic regression + feature engineering on 7,043 customer records. Built a composite risk signal from three observable attributes requiring zero ML infrastructure to deploy.',
      finding: 'New + fiber + no tech support = 3x churn probability. Any CS team can filter a CRM for this combination today.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/ibm-telco-churn-analysis/churn_preview_both.png',
          alt: 'IBM Telco Customer Churn Overview',
          label: 'Overview',
        },
        {
          type: 'img',
          src: './assets/ibm-telco-churn-analysis/churn.png',
          alt: 'Churn Analysis Chart',
          label: 'Churn Drivers',
        },
        {
          type: 'img',
          src: './assets/ibm-telco-churn-analysis/retention.png',
          alt: 'Retention Analysis',
          label: 'Retention Patterns',
        },
      ],
    },
    filters: ['Python', 'ML'],
    tags: ['Python', 'pandas · seaborn', 'scikit-learn', 'Logistic Regression', 'EDA', 'Feature Engineering', 'Kaggle'],
    links: [
      { href: 'https://www.kaggle.com/code/samievargas/ibm-telco-customer-churn', label: 'View on Kaggle →' },
    ],
  },

  {
    id: 'atx-foodie',
    badge: 'Personal Portfolio Project',
    title: 'Austin Food Safety — Does Reputation Match the Safety Record?',
    description: 'A JuiceLand pest report on r/Austin & TikTok made me realize I had zero data visibility into the restaurants I eat at daily. Fetched 21,160 health inspection records from the City of Austin Open Data Portal API via paginated pull, built a brand compliance scorecard across 84 local brands, and surfaced five findings with direct policy implications: compliance isn\'t uniform by neighborhood, operational drift is measurable by inspection cycle, and follow-up inspections average 8 points lower than routine visits — meaning the corrective action loop is broken. Includes a folium choropleth map of Austin zip codes and a personal audit of my own regular spots.',
    quickContext: {
      problem: 'A Reddit pest-sighting post made me realize I ate at dozens of Austin restaurants with zero visibility into their actual health inspection records.',
      approach: 'Pulled 21,160 inspection records via the City of Austin Socrata REST API with offset pagination. Built brand scorecards for 84 local restaurant groups and a folium choropleth map by zip code.',
      finding: 'Follow-up inspections score 8 pts lower than routine visits — the corrective loop is broken. Serial offenders are identifiable in advance. The data exists; the workflow to act on it doesn\'t.',
    },
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'iframe',
          src: 'https://samievargas.com/assets/atx-foodie-inspection/atx_choropleth_site_widget.html',
          label: 'Zip Code Compliance Map',
        },
        {
          type: 'iframe',
          src: 'https://samievargas.com/assets/atx-foodie-inspection/atx_zipcode_site_widget.html',
          label: 'Zip Code Lookup',
        },
        {
          type: 'img',
          src: './assets/atx-foodie-inspection/zip_performance.png',
          alt: 'Compliance by zip code — top 10 by restaurant density',
          label: 'Zip Code Compliance',
        },
        {
          type: 'img',
          src: './assets/atx-foodie-inspection/branded_only_scale.png',
          alt: 'Brand scale vs inspection frequency — full and zoomed view',
          label: 'Inspection Intensity',
        },
        {
          type: 'img',
          src: './assets/atx-foodie-inspection/score_volatility.png',
          alt: 'Brand score volatility vs average compliance',
          label: 'Score Volatility',
        },
        {
          type: 'img',
          src: './assets/atx-foodie-inspection/burnout_inverted_trend.png',
          alt: 'Operational drift — avg score by inspection sequence',
          label: 'Compliance Drift',
        },
        {
          type: 'img',
          src: './assets/atx-foodie-inspection/my_favs.png',
          alt: 'My regulars vs Austin compliance landscape',
          label: 'Personal Audit',
        },
      ],
    },
    filters: ['Python'],
    tags: ['Python', 'pandas · matplotlib · seaborn', 'folium (geospatial)', 'Socrata API', 'EDA', 'Public Health Data', 'Kaggle'],
    links: [
      { href: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection', label: 'View on Kaggle →' },
    ],
  },
];

export const GRID_PROJECTS = [
  {
    id: 'tarot-tracker',
    badge: 'Self-Built · JavaScript · GitHub Pages',
    title: 'Tarot Tracker — Personal Card Archive',
    description: 'A full-featured tarot reading tracker deployed on GitHub Pages. Logs pulls, tracks card history across 78 cards, surfaces stalker cards and ghost cards, visualizes suit distribution, and syncs to Google Sheets via Apps Script. Built end-to-end with vanilla JS — no frameworks, no dependencies.',
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/tarot-tracker/deck.png',
          alt: 'Tarot Tracker spread view',
          label: 'Live App',
          link: 'https://samievargas.com/tarot-tracker/',
        },
        {
          type: 'img',
          src: './assets/tarot-tracker/card.png',
          alt: 'Tarot Tracker card view',
          label: 'Card History',
          link: 'https://samievargas.com/tarot-tracker/',
        },
      ],
    },
    filters: ['Apps Script'],
    tags: ['JavaScript', 'Google Apps Script', 'GitHub Pages', 'Google Sheets', 'Self-Deployed'],
    dim: false,
  },

  {
    id: 'life-os',
    badge: 'Self-Built · Google Apps Script · Personal Analytics',
    title: 'Life OS — Personal Health & Habit Dashboard',
    description: 'A multi-panel personal dashboard I built and use daily. Pulls longitudinal data from two custom Apps Script APIs, renders 15+ Chart.js visualizations across health, habit, and behavioral metrics, and integrates Gemini AI for weekly reflection and Todoist for task tracking. Built entirely in vanilla Apps Script — no frameworks, no external backend. The architecture is the same pattern I\'d use to build an ops dashboard for a CS team: normalized data model, live sync, modular panels.',
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/life-os/lifeos_today.png',
          alt: 'Life OS today panel — daily snapshot with wearable data',
          label: 'Today',
        },
        {
          type: 'img',
          src: './assets/life-os/lifeos_goals.png',
          alt: 'Life OS goals panel — smart goal tracking with progress bars',
          label: 'Goals',
        },
        {
          type: 'img',
          src: './assets/life-os/lifeos_events.png',
          alt: 'Life OS life events panel — body battery and sleep score overlaid with events',
          label: 'Events × Recovery',
        },
        {
          type: 'img',
          src: './assets/life-os/lifeos_rearview.png',
          alt: 'Life OS rearview panel — 30-day trend charts and wearable stats',
          label: 'Rearview',
        },
        {
          type: 'img',
          src: './assets/life-os/lifeos_journal.png',
          alt: 'Life OS journal search — full-text search across journal entries',
          label: 'Journal Search',
        },
      ],
    },
    filters: ['Apps Script'],
    tags: ['Google Apps Script', 'Chart.js', 'Gemini API', 'Todoist API', 'Garmin', 'Personal Analytics'],
    dim: false,
  },

  {
    id: 'life-in-pixels',
    badge: 'Self-Built · Google Apps Script',
    title: 'Life in Pixels — Mood & Habit Tracker',
    description: 'A daily mood and habit logger built in Google Apps Script, backed by Google Sheets. Tracks mood on a 1-5 scale alongside activity and habit data over time. The data from this app produced the walk/mood finding in Observations and powers the Life OS dashboard.',
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/pixels-app-script/Pixels-App.png',
          alt: 'Life in Pixels app interface',
          label: 'Live App',
          link: 'https://script.google.com/macros/s/AKfycbwUVS3iL7JTO-XR93eCRDRY_lcFOdWPpa9VIB1hFLatsgtXT9QRfPtgoRJlTstkDis/exec',
        },
      ],
    },
    filters: ['Apps Script'],
    tags: ['Google Apps Script', 'Google Sheets', 'Behavioral Data', 'Personal Analytics'],
    dim: false,
  },

  {
    id: 'journal',
    badge: 'Self-Built · Google Apps Script',
    title: 'Journal — Structured Reflection Logger',
    description: 'A lightweight journaling app with structured prompts for fast daily entries stored in Google Docs. Part of the same personal data infrastructure as Life in Pixels and Life OS. Built end-to-end in Google Apps Script — no external dependencies.',
    media: {
      type: 'carousel',
      slides: [
        {
          type: 'img',
          src: './assets/journal-app-script/Journal-App.png',
          alt: 'Journal app interface',
          label: 'Live App',
          link: 'https://script.google.com/macros/s/AKfycbwBsldN89wdMdiVlD9xWINYvm30Gayaj0eb0N4nQeLsNmG98PHd7QnngjQSGl2l91Wq/exec',
        },
        {
          type: 'img',
          src: './assets/journal-app-script/Journal.png',
          alt: 'Journal output in Google Docs',
          label: 'Output View',
        },
      ],
    },
    filters: ['Apps Script'],
    tags: ['Google Apps Script', 'Google Docs', 'Structured Logging'],
    dim: false,
  },
];
