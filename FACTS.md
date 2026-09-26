# FACTS.md · the locked numbers and dates for samievargas.com

This file is the source of truth for every number, date and version that appears on the site. Pages and `data/content.js` copy from here, and this file copies from the results files named in each row.

## Rules for anyone editing (Claude Code included)

1. **Never change a number, date, model name or version on a page without changing it here first**, with the new source file and date in the row. If a copy edit would alter a number (rounding, rephrasing "7 of 20" as "a third"), stop and keep the number as written here.
2. Copy edits are welcome, number edits are not. Rewording a sentence must leave every figure in it identical to this file.
3. Numbers are never rounded past what the source says. "~" and "about" are allowed only where the row below already uses them.
4. When a new eval lands, add a new dated row and keep the old one under **History**; never overwrite a result in place.
5. Order of trust: the results file in the source repo, then this file, then `data/content.js`, then page copy. If they disagree, the page is wrong.
6. Rows marked **UNSOURCED** or **RECONCILE** are on the site but not yet traced; do not repeat them in new copy until they are resolved.
7. Voice rules for all site copy: no em dashes; run-on sentences joined with commas, "and", "so", "which is"; no punchy fragments; no "not X, it's Y"; headlines are full claims in sentence case; every project carries at least one "In plain terms" line (`.plain`); Claude adds exactly one unless Samie asks for more, and any extra ones she adds (for a term like RAG, MCP, dbt or Socrata) stay. Résumé bullets and recreated product output may stay as originally written.
8. After changing `css/`, `js/` or `data/`, bump the `?v=` token on every page and import in one pass.
9. Each build's own repo is the source of truth for that build, its README first and then the results files the README names, and this file copies from it. When a build's README changes, update its row here first and then every page that repeats it, and when the site says something its README does not, the site is wrong until the README says it too.

| Build | Source-of-truth repo | Read first |
| --- | --- | --- |
| Field discovery | [SamieVargas/Field-Sales-Build](https://github.com/SamieVargas/Field-Sales-Build) (private) | `README.md`, `evals/` results |
| Life in Pixels | [SamieVargas/pixels-rag](https://github.com/SamieVargas/pixels-rag) | `README.md`, `evals/results/` |
| Guideline Assist | [SamieVargas/guideline-assist](https://github.com/SamieVargas/guideline-assist) | `README.md`, `docs/`, `evals/results/` |
| Signal | [SamieVargas/signal](https://github.com/SamieVargas/signal) | `README.md`, `evals/results/`, `config.py` |
| Brain Dump | [SamieVargas/brain-dump](https://github.com/SamieVargas/brain-dump) | `README.md`, `evals/results/`, `worker/` |

## Timeline

| Date | Event | Source |
| --- | --- | --- |
| May 2018 | Graduated, B.S.A. Biochemistry, UT Austin | resume.html |
| Jul 2018 | Joined GLG, Client Solutions Associate | resume.html |
| May 2022 | Team Leader | resume.html |
| Oct 2023 | Senior Manager, Service (Senior Team Leader until the org flattened) | resume.html |
| 2014 | Austin, since | life.html eyebrow |
| 2020 | Journaling daily since | content.js LIFE_FIELD |
| 20 May 2026 | First commit of the site | toolkit.html stat |
| 10 Jun 2026 | Site rebuilt as vanilla modules, no framework | content.js TK_FALLBACK |
| 28 Jul 2026 | Brain Dump shipped | TK_FALLBACK |
| 14 Aug 2026 | Signal shipped | TK_FALLBACK |
| 18 Aug 2026 | Projects annotated with what each found | TK_FALLBACK |
| 20 Aug 2026 | /life split out of the work page | TK_FALLBACK |
| 22 Aug 2026 | Launch kit: favicon set, social card, 404, manifest | TK_FALLBACK |
| 9 Sep 2026 | Change log snapshotted by an Action on every push | TK_NOTES |
| 21 Sep 2026 | Signal golden labels written; prompt-contract pass and arm A run | signal README |
| 22 Sep 2026 | Signal arm B; Field discovery eval run; Pixels golden, ablation and follow-ups | signal, Field-Sales-Build, pixels-rag results |
| 23 Sep 2026 | Haiku / Sonnet list prices read for cost columns | pixels-rag, signal config |
| 24 Sep 2026 | Guideline Assist assist, QA, shadow and injection runs; Brain Dump sort@v3 and sort@v4 grid; Brain Dump live-page runs exported | guideline-assist, brain-dump results |
| 25 Sep 2026 | Guideline Assist readout docs; homepage copy pass | guideline-assist docs, this repo |
| 25–26 Sep 2026 | Guideline Assist prompt tuning, held-out confirm and Gemini Flash runs | guideline-assist `docs/prompt-tuning.md`, results |
| Sep 2026 | Knowledge-base pilot with a 60-person team, through September | resume.html |
| Oct 2026 | Planned rollout to four more pods (about 240 people), gated | resume.html |
| 23 Apr – 10 May 2026 | Raccoon window (found 29 Apr, removed 3 May) | content.js RACCOON_LIFE |

## Résumé facts

| Fact | Value |
| --- | --- |
| Employer | GLG, PE-backed global expert network, Jul 2018 – present |
| Book | $14M+ enterprise portfolio, 100% retention, ~$3.5M quarterly target |
| Clients named | Deloitte, Accenture, Gartner, KPMG, AlixPartners, Kearney, Roland Berger |
| Team | 5 client-facing managers (between 5 and 10 per quarter) |
| Knowledge base | ~110-document library; cut an average of three back-and-forth turns; accurate on 10 of 10 simple requests |
| MBR prep | 3 hours per account per month to 1 hour, across four accounts |
| AI tooling outcome | deliverables in the first hour, 10% to ~25% in one quarter |
| SharePoint | used daily by 60+ people, model for three other BUs |
| Growth | 5% YoY portfolio growth |
| Ramp | new-hire ramp to revenue, 3 months to 1 |
| Renewal forecasting | $300K per quarter in previously untracked opportunities |
| Promotions | three in under four years |
| Education | B.S.A. Biochemistry (Bachelor of Science and Arts), The University of Texas at Austin, graduated May 2018 |
| Certifications on the résumé | Anthropic AI Fluency (six courses); Databricks AI Agent Fundamentals, Generative AI Fundamentals, Databricks Fundamentals; dbt Fundamentals; Snowflake Hands-On Essentials; Google AI Professional, Advanced Data Analytics, Business Intelligence. Google Data Analytics, GA4 and PMP · PMI were dropped from the résumé on 26 Sep 2026 |
| Years at GLG | eight |

## Field discovery (repo: SamieVargas/Field-Sales-Build, run 22 Sep 2026 unless a row says otherwise)

| Measure | Value |
| --- | --- |
| Golden transcripts | 8 of 8 pass, 0 hard fails, 2 of 2 viability cards recalled |
| Closed-enum ablation | 0 invented requirement IDs against 99 outside the library, 20 runs each, measured 29 Aug 2026 on a fixture since renamed, not re-run since the golden set changed on 20 Sep 2026 |
| Proposal fixtures | 12, 10 pass (T06 missed an update, T09 gave the wrong escalation reason); 100% escalation recall and precision; 0 unneeded writes; read-first ablation: repeat escalations 0 of 20 with the rule against 14 of 20 without |
| Shadow run | 77.8% status agreement over 9 deals with an update; an escalation proposed on 5 of 5 slipped go-lives; missing-card recall 69.4% over 6 deals; 0 of 7 false escalations; against hand-written outcomes for 12 fixture deals, no pilot has run |
| Injection | 10 fixtures × 5 runs; 40 of 50 unchanged (80%); 6 of 10 fixtures moved a proposal at least once (I01 run 2, I04 run 0, I05 runs 0, 1, 4, I07 runs 0, 4, I08 run 0, I10 runs 0, 2); 9 of 50 rationales echoed the planted phrase; 11 guard trips |
| Cost / latency | claude-sonnet-5; $0.0313 and 21.5 s mean per extraction; $0.0561 and 18.8 s per action-loop run; priced at $2 / $10 per M tokens, marked in the repo as an assumption to re-check; $0 on the site (demo runs canned, per the site, not the README) |
| Library | hardware_rental, 19 cards (11 universal plus 8 vertical); 38 cards across 5 verticals |
| Stability | 9 of 20 runs gave the modal id set with the closed enum and 3 of 20 without, 29 Aug 2026, not re-run since 20 Sep |
| Kestrel transcript | G02_kestrel_buried_lede, an end-of-week catch-up; decision_maker is not_discussed and restricted_chemicals is not_discussed; 4 cards confirmed, 8 not discussed |

## Life in Pixels RAG (repo: SamieVargas/pixels-rag, run 22 Sep 2026, Haiku 4.5)

| Measure | Value |
| --- | --- |
| Data | six months of own daily data; the site runs a seeded synthetic export (118 days) |
| Golden set | 28 questions, 26 scored plus 2 follow-ups |
| Route accuracy | 100% of 26 |
| Citations valid | 26 of 26 (100%), 0 hard fails |
| Unanswerable refused | 5 of 5; abstained on 2 of 21 answerable |
| Expected facts | 85% |
| Semantic recall@5 | 74% keyed, 89% offline |
| Validator retries | 10 across 26; S01 still failed after its retry |
| Cost | $0.0062 per question mean; $0.1611 for the run; list prices $1 / $5 per M tokens, read 23 Sep 2026 |
| Latency | 4.0 s mean |
| Chunk ablation | recall@5 89% to 93%; S06 week question 71% to 100% |
| Routes | 4: search, filter, sum and unanswerable, which is answered with an admission and no model call |
| MCP | 2 read-only tools, stdio, `list_days` capped at 100 days |
| Finding | hot yoga plus walking sleeping better came from asking the model (README:19-20); on the synthetic fixture, which plants that pattern, analysis/recovery.py gives same-day sleep +8.0 [+2.2, +13.6] and body battery +14.2 [+3.3, +22.8], n 9, and the morning after −3.8 and −3.7 with intervals crossing zero; the real-data table is not in the repo, so the site does not state the finding as fact |
| Still misses | S01 fails validation after its retry (unit-glued 8.2hrs), S03 and S07 abstained on answerable questions; spine dots 0, 2 and 6 |
| Privacy | the data stays on disk; a question sends its retrieved days or computed table to the model provider, and `list_days` sends nothing |

## Guideline Assist (repo: SamieVargas/guideline-assist, 24 Sep 2026)

| Measure | Value |
| --- | --- |
| Test set | 100 frozen ABCD test chats (ASAPP, MIT; a fictional retailer, role-played by trained crowdworkers, real conversations between people with no real customers), 349 action points, 693 call points |
| Baseline | a no-model guideline-order baseline told the gold intent scores 73.4%; 11.4% of gold actions are not in their section, so validated accuracy tops out at 88.6% |
| Sonnet 5, arm A | next action 73.9% (258/349); intent 88.0%; p50 / p95 2.1 / 3.2 s; $121.83 per 1,000 chats |
| Haiku 4.5, arm A | next action 50.1% (175/349); intent 79.9%; 1.6 / 2.7 s; $47.89 per 1,000 |
| Arm B | Haiku $55.13, 2.7 / 4.3 s; Sonnet $147.49, 3.7 / 5.8 s |
| Library | 55 subflow sections plus 10 flow sections; 27,563 tokens on Haiku 4.5, 37,708 on Sonnet 5, cached; 13.10 triggers per conversation |
| Shadow | 79.5% (140/176) over 50 conversations; 36 disagreements: 13 agent drifted, 11 assist wrong, 12 both off |
| QA | flags 20 of 100 clean chats (rules-only 63); recall 100/100 removed, 99/99 swapped, 57/59 changed values; wrong-value precision 51.8% (57/110); 358 copies graded |
| Injection | 47 of 50 runs held; 2 of 10 fixtures moved a suggestion (inj01 2 of 5 to a refund, inj08 1 of 5 to none_yet); a measured rate, not a claim of injection resistance |
| Prompt tuning (tune_60, dev split, 25 and 26 Sep 2026) | gates set before any call: no more than 3 points lost on next action or intent, at least 20% cheaper; six library renderings tried; dedupe −1.4 next action at 14% cheaper, nosub −6.0 at 44%, outline −10.2 at 60%, bare −10.2 at 67%, keysub −7.0 at 24%; none passed all gates (`docs/prompt-tuning.md`) |
| Held-out confirm (assist_100, 26 Sep 2026) | Sonnet 5 full 73.4% (256/349), $121.98, p95 2.4 s; Sonnet 5 dedupe 76.2% (266/349), +2.9 [0.0, +5.7], $104.55, 14% cheaper, p95 2.6 s (`tuning-confirm-assist_100-2026-09-26.json`) |
| Gemini 3.8 Flash (assist_100, 26 Sep 2026, Vertex AI) | explicit cache: full 82.2% (287/349), intent 87.7%, false alarms 25.0%, $47.23 per 1,000, p50 / p95 3.0 / 22.4 s; dedupe 82.0%, $39.11, 2.3 / 5.8 s; automatic cache (hit on 20 of 693 turns): 82.2%, $262.50; +8.9 [+5.2, +12.5] next action over Sonnet full, paired; prices from third-party listings, UNCONFIRMED against Google's page (`tuning-gemini-assist_100-2026-09-26.json`, `assist-gemini-2026-09-26.json`) |
| Stop lines | after two weeks on the customer's own traffic, pull back if shadow agreement stays below 75%, p95 goes above 4 s, assist-wrong outnumbers agent drift, supervisors overturn more than one QA flag in five, any line moves toward skipping verification or refunding, or cost runs over budget ($121.83 as the reference) |

## Signal (repo: SamieVargas/signal)

| Measure | Value |
| --- | --- |
| Models | claude-haiku-4-5 per-document summaries (at most 300 tokens out), claude-sonnet-4-6 analysis; list prices read 23 Sep 2026, Sonnet $3 / $15 and Haiku $1 / $5 per M tokens; cost covers the analysis call only |
| Default contract | prompt contract in the CLI and the browser app; native only behind a flag (`?contract=native`) |
| Token cut | 22,976 to at most 1,012 input tokens (~96%) on two long transcripts, measured with `--dry-run`, shown as ~23k to ~1k; eval mean analysis input 3,004 tokens (arm A) |
| Golden set | 13 synthetic accounts, labels written 21 Sep 2026 |
| Prompt contract, 21 Sep | recall 96%, precision 100%, buyer 92%, attribution 92%, parse 5 / 8 / 0, $0.0323 per run, $0.4205 total |
| Native arm A, 21 Sep, 20 runs | recall 90%, precision 94%, buyer 93%, attribution 92%, 260 / 0 / 0, $0.0308 per run, $7.9974 total |
| Native arm B, 22 Sep, 20 runs | recall 90%, precision 93%, buyer 69%, attribution 95%, 260 / 0 / 0, $0.0292 per run, $7.6039 total |
| Parse | 0 failures in 520 native runs; 8 of 13 recovered by the parser under the prompt contract |
| Failure: vibe-risk | read right 7 of 20 with the weighting block, 14 of 20 without |
| Failure: champion-loss | wrong buyer 19 of 20 with the block |
| Failure: truncated-transcript | 50% on every run |
| Failure: silent-decay | cites its usage CSV in 1 of 20 runs |
| Attribution | asked of the model, not enforced; 92% of required sources in arm A |
| Latency | mean analysis call 35,921 ms arm A, 34,479 ms arm B, 41,359 ms prompt contract (results .md files); end to end `total_ms` 42,747 ms arm A, 48,745 ms prompt contract (JSON only) |
| Scope | only `full` mode scored; the other three focus modes have no results file |
| Prep time | about an hour to one minute |
| Resolved 26 Sep 2026 | the homepage "51 seconds" had no source in the repo or its history, and now reads "in about a minute" (README) with a 35.9 s mean analysis-call stat |

## Brain Dump (repo: SamieVargas/brain-dump, 24 Sep 2026, claude-sonnet-5)

| Measure | Value |
| --- | --- |
| Grid | 20 dumps × 3 levels × anxious off and on, 120 plans per run |
| sort@v3, effort high | median 14.0 s, p90 23.8 s, $0.0134 per plan, 8 gentle-item misses, 10 banned phrases |
| sort@v4, effort medium (live) | 7.3 s, 13.4 s, $0.0071, 7 misses, 12 banned |
| sort@v4, effort low | 4.6 s, 6.6 s, $0.0040, 16 misses, 10 banned |
| Levels | plenty: cap 3, 25-min timer; a little: cap 2, 15 min; none: cap 1, 5 min |
| Live-page runs | one dump of 2,732 characters; 4 recorded, $0.05 total; 3 shown on the site |
| Banned phrases | any banned phrase ("need to", "should", "you have to", "lazy") in 10, 12 and 10 of 120 plans; "need to" alone in 8 of 60 anxious plans on sort@v3 (3 plenty, 3 a little, 2 none), 9 of 60 on sort@v4 medium (live), 7 of 60 on sort@v4 low |
| Live setting | worker/prompts.js `sort@v4`, worker/contracts.js and wrangler.toml `EFFORT = "medium"`, `MAX_TOKENS` 16000 |
| Anxious switch | keeps the level's cap and timer, bans "should" and "need to" |
| Eval dump length | median 181 characters, against about 3,700 for a real dump |
| Resolved 26 Sep 2026 | "8 of 60" is sort@v3 at the default effort (…-x1-sort-v3.json); the live run's match is 9 of 60 |

## Structured outputs

| Measure | Value |
| --- | --- |
| Parse failures | 0 of 520 |
| Scope | Signal only: 260 native-contract runs in each ablation arm, 0 recovered, 0 failed; Brain Dump and Field discovery keep their own tallies (resolved 26 Sep 2026) |

## Analysis work

| Project | Values |
| --- | --- |
| Instacart dbt | 3.4M orders; pooled reorder 0.60; new 0.221, regular 0.670; 5 staging models, 1 join, 3 marts, 35 tests; random forest AUC 0.989 vs 0.857; days-since-prior capped at 30 |
| ATX Foodie | 21,160 records via Socrata; 84 brands; follow-up 84.4 (110 visits) vs routine 90.9 (18,440), 6.45 apart; drift 90.5 to 92.6 by the 15th inspection (2.1, higher is more violations) |

## Life page

| Fact | Value |
| --- | --- |
| Raccoon | body battery floor 5/100 for 5 consecutive days; sleep score 53 vs baseline 81; HRV 26 ms; 11 nights interrupted; 9 calls; 8 days to recover; 17 days total |
| Greenbelt | 15 of 21 miles |
| Poirot | 26 of 33, on Dead Man's Folly |
| Ring Fit | level 32 |
| Records | 35, from the Discogs export, Aug 2026 |
| Tarot | 78 cards, seven decks |
| Arcade | 15 apps, 6 pull live data |

## History

When a row changes, move the old value here with the date it stopped being current.

| Until | Row | Old value | Why it changed |
| --- | --- | --- | --- |
| 26 Sep 2026 | Field discovery shadow | 78% status agreement | the README says 77.8% |
| 26 Sep 2026 | Field discovery closed-enum and stability | dated 22 Sep 2026 | measured 29 Aug 2026 and not re-run since 20 Sep |
| 26 Sep 2026 | Pixels routes | 3 plus unanswerable | the README counts four routes |
| 26 Sep 2026 | Pixels finding | hot yoga plus walking beat everything else for sleep and recovery | it came from asking the model, and the committed data is a synthetic fixture that plants it |
| 26 Sep 2026 | Guideline Assist costs | shown as $122 and $48 | the results files say $121.83 and $48.47, and rule 3 does not round |
| 26 Sep 2026 | Guideline Assist Haiku arm A and arm B costs | $48.47, $55.02, $148.03 | the exporter averaged cost per turn through a four-place rounding; recomputed unrounded it is $47.89, $55.13 and $147.49 (guideline-assist PR #10) |
| 26 Sep 2026 | Signal latency | "51 seconds" (UNSOURCED) | no source anywhere in the repo |
| 26 Sep 2026 | Structured outputs scope | "across the earlier builds" | 520 is Signal alone |
