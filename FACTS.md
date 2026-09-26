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

## Field discovery (repo: SamieVargas/Field-Sales-Build, run 22 Sep 2026)

| Measure | Value |
| --- | --- |
| Golden transcripts | 8 of 8 pass, 0 hard fails, 2 of 2 viability cards recalled |
| Closed-enum ablation | 0 invented requirement IDs against 99, 20 runs each |
| Proposal fixtures | 12; 100% escalation recall and precision; 0 unneeded writes |
| Shadow run | 78% status agreement; 5 of 5 slipped go-lives flagged |
| Injection | 10 fixtures × 5 runs; 40 of 50 unchanged (80%); 6 of 10 fixtures moved a proposal at least once |
| Cost / latency | $0.0313 and 21.5 s per capture on Sonnet; $0 on the site (demo runs canned) |
| Library | hardware_rental, 19 cards |
| Stability | 9-in-20 modal id set |

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
| Routes | 3 (search, filter, sum) plus unanswerable |
| MCP | 2 read-only tools, stdio, `list_days` capped at 100 days |
| Finding | hot yoga plus walking beat everything else for sleep and recovery |

## Guideline Assist (repo: SamieVargas/guideline-assist, 24 Sep 2026)

| Measure | Value |
| --- | --- |
| Test set | 100 frozen ABCD test chats (ASAPP, MIT), 349 action points |
| Sonnet 5, arm A | next action 73.9% (258/349); intent 88.0%; p50 / p95 2.1 / 3.2 s; $121.83 per 1,000 chats (shown as $122) |
| Haiku 4.5, arm A | next action 50.1% (175/349); intent 79.9%; 1.6 / 2.7 s; $48.47 per 1,000 (shown as $48) |
| Arm B | Haiku $55.02, 2.7 / 4.3 s; Sonnet $148.03, 3.7 / 5.8 s |
| Library | 55 sections, 27,563 tokens, cached; 13.10 triggers per conversation |
| Shadow | 79.5% (140/176) over 50 conversations; 36 disagreements: 13 agent drifted, 11 assist wrong, 12 both off |
| QA | flags 20 of 100 clean chats; 358 copies graded |
| Injection | 2 of 10 fixtures (inj01, inj08) moved a suggestion; one planted line pulled toward a refund in 2 of 5 runs |
| Stop lines | pull back if shadow agreement goes below 75% or p95 goes above 4 s |

## Signal (repo: SamieVargas/signal)

| Measure | Value |
| --- | --- |
| Models | Haiku 4.5 per-document summaries (300 tokens out), Sonnet 4.6 synthesis |
| Token cut | 22,976 to at most 1,012 input tokens (~96%), shown as ~23k to ~1k |
| Golden set | 13 synthetic accounts, labels written 21 Sep 2026 |
| Prompt contract, 21 Sep | recall 96%, precision 100%, buyer 92%, attribution 92%, parse 5 / 8 / 0, $0.0323 per run, $0.4205 total |
| Native arm A, 21 Sep, 20 runs | recall 90%, precision 94%, buyer 93%, attribution 92%, 260 / 0 / 0, $0.0308 per run, $7.9974 total |
| Native arm B, 22 Sep, 20 runs | recall 90%, precision 93%, buyer 69%, attribution 95%, 260 / 0 / 0, $0.0292 per run, $7.6039 total |
| Parse | 0 failures in 520 native runs; 8 of 13 recovered by the parser under the prompt contract |
| Failure: vibe-risk | read right 7 of 20 with the weighting block, 14 of 20 without |
| Failure: champion-loss | wrong buyer 19 of 20 with the block |
| Failure: truncated-transcript | 50% on every run |
| Prep time | about an hour to one minute |
| **UNSOURCED** | "51 seconds, paste to read" on the homepage is not in the README |

## Brain Dump (repo: SamieVargas/brain-dump, 24 Sep 2026, claude-sonnet-5)

| Measure | Value |
| --- | --- |
| Grid | 20 dumps × 3 levels × anxious off and on, 120 plans per run |
| sort@v3, effort high | median 14.0 s, p90 23.8 s, $0.0134 per plan, 8 gentle-item misses, 10 banned phrases |
| sort@v4, effort medium (live) | 7.3 s, 13.4 s, $0.0071, 7 misses, 12 banned |
| sort@v4, effort low | 4.6 s, 6.6 s, $0.0040, 16 misses, 10 banned |
| Levels | plenty: cap 3, 25-min timer; a little: cap 2, 15 min; none: cap 1, 5 min |
| Live-page runs | one dump of 2,732 characters; 4 recorded, $0.05 total; 3 shown on the site |
| **RECONCILE** | the old résumé said "need to" in 8 of 60 anxious plans; the 26 Sep résumé rewrite dropped it, and the grid counts 10 to 12 banned phrases of 120; keep 8 of 60 off the site until its run is named |

## Structured outputs

| Measure | Value |
| --- | --- |
| Parse failures | 0 of 520 |
| **RECONCILE** | the homepage spine rule says "across the earlier builds", but 520 matches Signal's native runs alone; confirm the scope |

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

Nothing superseded yet. When a row changes, move the old value here with the date it stopped being current.
