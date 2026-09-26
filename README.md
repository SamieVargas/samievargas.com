# samievargas.com
My portfolio site. Live at [samievargas.com](https://samievargas.com).

---

## What this is

This started as an upskilling thing and then it became something else too, because the portfolio part is real and the projects are real and I genuinely needed a place to put all of it that was not a LinkedIn PDF, and somewhere along the way it also just became a place that is actually me, which felt more honest anyway. The Agatha Christie read-through and the Ring Fit dragon are not going to help me learn how to use SQL, but they are on here anyway.

I have been in operations for eight years building systems that did not exist before I built them, and a big part of what I do is sit with a messy problem long enough that something useful shows up, so everything on here came from that same instinct. The AI tools replace work I used to do by hand. The data projects start from a question I actually had. The ATX Foodie health inspection analysis began because of a JuiceLand pest sighting on TikTok or Reddit and then turned into 21,160 inspection records and a choropleth map of Austin zip codes, which is basically how I work.

---

## What is on it now

| Page | Route | What it is |
| --- | --- | --- |
| Work | `/` | The portfolio: Field discovery, Signal and Brain Dump as working case studies, the annotated Instacart and inspection projects, experience, skills, and contact. |
| Life | `/life` | The personal half, split off the homepage so it stops standing between a hiring manager and the projects. The field, the raccoon, the Christie ledger, the notes carousel, the dragon. |
| Apps | `/apps` | The arcade, fifteen small browser apps that each do one thing. |
| Pixels | `/pixels` | The Life in Pixels replay, all twenty-six eval questions played back from the recorded run with the chunking ablation and the MCP server. |
| Assist | `/assist` | The Guideline Assist replay, six recorded support chats with the suggestion shown before each turn, the QA on planted defects, and the context ablation. |
| Toolkit | `/toolkit` | How the site is built, linked from the homepage footer: tokens, components, the `<head>` block, the copy decisions, and a change log that writes itself. |
| Résumé | `/resume` | A printable one-file résumé, with `Resume.pdf` generated from it. |
| Raccoon | `/raccoon` | The raccoon invoice, which is exactly what it sounds like. |

Three more routes on the same domain are served from their own repos, because each one is an app with its own Worker and its own evals:

| Route | Repo | What it is |
| --- | --- | --- |
| `/signal/` | [SamieVargas/signal](https://github.com/SamieVargas/signal) | Reads messy account files for second-order sentiment and returns a revenue-risk, relationship-health, or pre-call brief. |
| `/brain-dump` | [SamieVargas/brain-dump](https://github.com/SamieVargas/brain-dump) | Turns an unstructured brain dump into an energy-state-aware plan. |
| `/field-discovery/` | case study and demo only | A rep talks for sixty seconds after a visit and onboarding gets a Salesforce record with the unanswered questions named on it. |

---

## The projects

Every project line on the site ends in a dated eval paragraph, and nothing goes on the résumé until that paragraph exists. The numbers below are the ones the site and the résumé state as of 22 September 2026.

**Field discovery**: built for a final-round hiring case and presented to a cross-functional leadership panel. A rep talks into their phone in a parking lot; the transcript is checked against a local, vertical-aware requirement library; one model call runs under a closed enum with a five-rule validator in code and reject-and-retry; the result is an idempotent upsert to Salesforce. A second stage reads what the record already holds and proposes the next discovery update or an engineer escalation, and a person approves, edits or rejects each one, with approve as the only path to a write. Evaluated in seven layers: 8 of 8 golden transcripts pass with 0 hard fails and both viability signals recalled; on twelve proposal fixtures, zero unnecessary writes and 100% escalation recall and precision; ten planted-instruction fixtures at five runs each left 80% of runs unchanged, and six of the ten moved a proposal at least once, which is why approval stays with a person. Only the reader needs a network, so a rep in a dead zone still gets a checklist in under a second. Case study at [samievargas.com/field-discovery](https://samievargas.com/field-discovery/), walkthrough at [/field-discovery/demo](https://samievargas.com/field-discovery/demo/).

**Signal**: the thing I built because I spent eight years doing an hour of account digging before every quarterly review. Haiku summarizes each document, images and PDFs included, and Sonnet synthesizes, which cut the main call from roughly 23k to about 1k input tokens on long transcripts; every section of the brief names the sources it came from, and the JSON contract sits behind a tolerant parser with a native structured-output mode behind a flag. Evaluated on 13 hand-written account cases, 20 runs each, under both arms of a source-weighting ablation: 90% risk-type recall in both arms, 0 parse failures in 520 runs under the native contract against 8 of 13 replies recovered by the parser under the prompt contract, and the weighting block worth 24 points of economic-buyer accuracy, 93% against 69%. What still breaks: a mood without an event is read right in 7 runs of 20, and one case names the wrong buyer in 19 of 20. Live at [samievargas.com/signal](https://samievargas.com/signal/), repo at [SamieVargas/signal](https://github.com/SamieVargas/signal).

**Brain Dump**: one HTML file and a Cloudflare Worker that holds the prompts and the key. You pick how much you have, plenty, a little or none, and whether you are feeling anxious, and the Worker assembles the system prompt from that, with the cap on "now", the tone rules and the banned phrasing; every item is sorted into now, later or let go under a strict JSON contract, each now step quotes the words it came from, and the page re-checks the plan against the same rules before it shows it. An emergency one-thing mode has its own prompt, schema and hard-coded fallback. Evaluated on 24 Sep 2026 with deterministic graders over twenty hand-written dumps under all three levels with the anxious switch on and off, 120 plans a run, and then tuned against those runs: the first prompt (sort@v3, at the model's default thinking effort) took 14.0 s a sort at the median and $0.0134 a plan, the tuned prompt (sort@v4) at medium effort took 7.3 s and $0.0071 with 7 of 120 worry-heavy dumps still given more than one thing to do against 8 before, and low effort took 4.6 s and $0.0040 but missed that one gentle item 16 times, so the Worker runs medium; every run parsed 120 of 120 with the cap at 100%, and a banned phrase like "need to" still slipped into 10 to 12 plans, which the page rewrites. Four live runs of one long dump came to $0.05, and three of them are replayed on the work page, with the tuning drawn under them. Live at [samievargas.com/brain-dump](https://samievargas.com/brain-dump), repo at [SamieVargas/brain-dump](https://github.com/SamieVargas/brain-dump).

**Life in Pixels**: a RAG pipeline over six months of my own daily data, askable in plain language, at [SamieVargas/pixels-rag](https://github.com/SamieVargas/pixels-rag). Day-level chunks with metadata, local Hugging Face embeddings in ChromaDB (MiniLM by default, bge-small and e5 as measured arms, a cross-encoder reranker measured against plain top-k), and a router that decides whether a question is a search, a filter, a sum or unanswerable, so filters and sums run in code and only the search goes through retrieval. Every answer is checked in code against the days it cites, with one reject-and-retry on an uncited date or an invented number. The same router, validator and model call are exposed as a local MCP server with two read-only tools, so Claude Desktop and Claude Code can ask the data questions while it stays on the machine. Evaluated on 26 hand-written questions over a seeded synthetic export: 100% route accuracy, 100% valid citations with 0 hard fails, all 5 unanswerable questions refused, 85% of expected facts in the answer, and a 20-run chunking ablation where weekly rollups lifted the one whole-week question from 71% to 100% recall and changed nothing else. The card on /life is where it lives on the site.

**Guideline Assist**: a live next-step suggestion for a support agent and a QA pass on the finished chat, both held to the written guidelines, on ASAPP's ABCD role-played support chats (MIT licensed, no real customers). One model call per agent turn carries the whole 55-section guideline library in a cached prompt, a validator rejects any step the guideline section does not list, and a QA call grades the finished chat against the same guidelines. Evaluated on 24 Sep 2026 over 100 frozen test chats: Sonnet 5 named the right next action on 258 of 349 agent actions (73.9%) and matched what the agent did next on 79.5% of 176 in shadow mode, caching the whole library beat looking up one section on cost and speed on both models, and it runs about $122 per 1,000 chats on Sonnet 5 against $48 on Haiku 4.5 at 50.1%. What still breaks: the QA flags 20 of 100 clean chats, and 2 of 10 planted-instruction fixtures moved a suggestion at least once. Replayed at [samievargas.com/assist](https://samievargas.com/assist/), repo at [SamieVargas/guideline-assist](https://github.com/SamieVargas/guideline-assist).

**Instacart**: dbt Cloud on BigQuery across 3.4M orders, five staging models into one join and three marts with 35 passing tests, and the reorder rate everybody cites at 0.60 splits into 0.221 for new shoppers and 0.670 for veterans once you segment it, confirmed with a random forest at 0.989 AUC for veterans against 0.857 for new users. Repo at [SamieVargas/instacart-project](https://github.com/SamieVargas/instacart-project). The homepage has a read-only query console over cached result sets from the marts.

**ATX Foodie**: 21,160 City of Austin inspection records through the Socrata API, a brand compliance scorecard across 84 local chains, a folium choropleth by zip, and an audit of my own regular spots because of course I did. Scores drift 2.1 points toward more violations across a venue's inspection history, 90.5 at the first visit and 92.6 by the fifteenth, and follow-up visits average 84.4 against 90.9 for routine ones, so being flagged is not what fixes it. Notebook at [kaggle.com/code/samievargas/atx-foodie-inspection](https://www.kaggle.com/code/samievargas/atx-foodie-inspection).

**In progress**: review-bombing detection across 31M+ Steam reviews, to catch when a score is being driven by something other than the game.

---

## Tech

No framework, no build step, just vanilla JS modules, CSS custom properties, and GitHub Pages.

I made this decision early and I would make it the same way again, because I did not want to fight a bundler or manage a dependency tree for what is ultimately a personal site, and this way everything is readable and nothing is compiled and if something breaks I can open DevTools and find it in under a minute, which is the whole pitch.

**Structure:**

```
index.html           -- the work page: hero and eval log, the five-pattern spine, Field discovery,
                        Life in Pixels, Guideline Assist, fine-tuning, Signal, Brain Dump, analysis, experience,
                        skills and certs, off the clock, contact
life.html            -- /life, with the notes at /life#notes
pixels/              -- /pixels, the recorded Life in Pixels runs
assist/              -- /assist, the recorded Guideline Assist chats and QA
design/
  samie-3a-style.md  -- the 3a style guide every page follows
apps/                -- the arcade index plus fifteen self-contained apps
toolkit.html         -- /toolkit, the build notes
resume.html          -- printable résumé; Resume.pdf is printed from it
CERTIFICATIONS.md    -- every cert with its verify and course links; the site and résumé carry a subset
FACTS.md             -- the locked numbers, dates and versions, with the source for each; pages copy from it
raccoon/             -- the raccoon invoice
css/
  styles.css         -- design tokens and every style, one accent colour
js/
  reveal.js          -- the shared scroll load-in and motion helpers
  app.js             -- renders the work page from data/, wires every control
  pixels.js          -- replays the recorded runs in data/pixels-runs.json
  assist.js          -- replays the recorded chats in data/assist-replay.json
  staged-loader.js   -- one three-stage loader shared by the API-backed apps
  life.js            -- the field, the crate, the Christie ledger, the notes, the dragon
  arcade.js          -- the apps index
  toolkit.js         -- the change log, pushes per week, and repo age, read from data/changelog.json
data/
  content.js         -- the work page's evals and case studies, roles, skills, certs,
                        result lines, notes, the field, the arcade, the toolkit
  changelog.json     -- written by the Action below on every push to main
  pixels-runs.json   -- the recorded Life in Pixels runs
  assist-replay.json -- the recorded Guideline Assist chats, QA copies and ablation
assets/              -- charts and screenshots, one folder per project
.github/
  workflows/changelog.yml   -- snapshots the commit log into data/changelog.json
  scripts/changelog.mjs     -- the script it runs
```

`css/`, `js/` and `data/` each carry their own README with the conventions for that folder.

`data/content.js` is just exported JS objects, so if I want to update a project description or add a new interest card I go to one file, change the text, and push, and that is the whole update flow. Prose that only appears once, like the hero and the bio and the Signal writeup, sits directly in `index.html`.

The LLM apps talk to the Anthropic API through a Cloudflare Worker, so the key stays on the server and the front end can stay public, and it is the same pattern every time.

---

## Features worth noting

**Five patterns, one row each**: the work page is organised around agents, RAG, agent assist and QA, fine-tuning and MCP, with one dot per test case under each and the cases that still break drawn in red, so the evals are the first thing you see and every project also carries one "In plain terms" sentence for the reader who does not live in this vocabulary.

**Result lines**: every project ends on the same four fields: what it replaced, what it took, what it costs to run, and what still breaks. The last one is filled from the project's own eval, not from optimism.

**Working case studies**: Field discovery, Signal and Brain Dump are on the homepage as things you can watch rather than screenshots, so you can see what goes in, what comes back, and how long it took.

**The field**: a plot of everything on /life, placed by whether I only noticed it or actually built something, and whether it came from work or from my life, so you click a dot and the panel next to it changes, and the two halves turn out to look the same.

**Notes**: at /life#notes, four short pieces about things I have noticed in data, each with its chart pinned beside the text while you read. This is the part of the site I want to keep adding to the most.

**The dragon**: Ring Fit Adventure, level 32, with an HP bar, because it turns out I need a dragon to fight to stay motivated.

**The arcade**: fifteen small apps at /apps, where six pull live public data from keyless APIs like Wikidata and Open Library and the City of Austin, a few read exports you bring yourself, two track what you tap, and the rest need nothing but a browser. The API-backed ones share one staged loader that advances on real events and trips a failure path on a budget, so it can never spin forever.

**Site toolkit**: a public page about how the site is built, linked from the footer instead of the nav since it is for the people who want to look under it: the design tokens, the component set, the copy decisions and why each one reads the way it does, the `<head>` block, and a change log snapshotted from this repo's history by `.github/workflows/changelog.yml` on every push to main. It used to ask the GitHub API from the browser, which stopped working while the repo was private and whenever the rate limit ran out, so now it updates itself when I push and never calls the API at all.

**Scroll load-ins**: one IntersectionObserver in `js/reveal.js` with a bounding-rect safety tick, so tall sections on phones still fire, counters that land exactly on the source number, and with reduced motion every end state renders at once.

---

## Why it's public

The site is already live so the repo being private would not accomplish much, and also the code is the point, or part of the point. It was private for a stretch, which is when the change log broke and every commit link on /toolkit went dead, so it is back to public and staying that way. If you are a recruiter or hiring manager who clicked through from the live site, hello, the projects section is probably what you are looking for but feel free to poke around here too.

---

## Running locally

It is just HTML files, so there is no dev server required, but if you want one:

```bash
npx serve .
```

or

```bash
python3 -m http.server 8000
```

Open `localhost:8000` or `localhost:3000` depending on which you used. The JS uses ES modules so you do need to serve it over HTTP rather than opening the file directly, otherwise the imports will not resolve.

### Shipping a CSS or JS change

The stylesheet, the page modules, and `data/content.js` are all referenced with a `?v=` version token, because without one a browser will happily pair freshly deployed HTML with a cached copy of the old JS and the page renders half-updated. When you change anything in `css/` or `js/` or `data/`, bump the token everywhere in one pass:

```bash
grep -rln "?v=20260925i" --include=*.html --include=*.js .
```

Every hit needs the same new value, including the `data/content.js` imports at the top of each module, since a module import is cached under its own URL.

### Regenerating the résumé PDF

`Resume.pdf` is printed from `resume.html` with headless Chromium, with the Google Fonts link swapped for embedded Young Serif, Onest and Geist Mono so the PDF carries its own type. Regenerate it whenever the résumé copy changes, and check the page count before committing.

---

## Contact

[samievargas.com](https://samievargas.com) has everything, and email is on the contact section. LinkedIn is [linkedin.com/in/samievargas12](https://www.linkedin.com/in/samievargas12/), and Kaggle is [kaggle.com/samievargas](https://www.kaggle.com/samievargas) if you want to see the notebooks.
