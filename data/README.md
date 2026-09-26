# data/

Everything the pages render from, as plain files.

- `content.js` is exported JS objects: projects, roles, skills, certs, result lines, the pattern index, observations, the field, the arcade, the toolkit notes. Change the text here and push; that is the whole update flow. Prose that appears once, like the hero and the bio, sits in the page instead.
- `changelog.json` is written by `.github/workflows/changelog.yml` on every push to main and read by `/toolkit`. Do not edit it by hand; the next push overwrites it.
- `pixels-runs.json` is built from the eval files in `github.com/SamieVargas/pixels-rag` (`evals/results/2026-09-22.json`, the golden set, the follow-up run and the chunking ablation) and read by `/pixels/`. Every number on that page is in this file. Rebuild it from the repo's results when a new eval lands rather than editing it.
- `assist-replay.json` is written by `evals/export_viewer.py` in `github.com/SamieVargas/guideline-assist` from its `evals/results/` files for 24 and 25 Sep 2026 (assist, QA, shadow, injection, intent and the hand-label agreement) and read by `/assist/`. Every suggestion, status and number on that page is in this file, so rerun the exporter with `--out` pointed here when a new eval lands rather than editing it. `AS_REPLAY` in `content.js` is one call copied from it for the work page.
- The Brain Dump tuning rows (`BD_TUNING` in `content.js`) are read from the brain-dump repo's `evals/results/` files for 24 Sep 2026, one row per prompt and effort on the same 120-plan grid; add a row when a new run lands.
- The Brain Dump runs on the work page (`BD_V3` in `content.js`) are copied from plans exported from the live page on 24 Sep 2026, one long dump; four were recorded and three are shown (a little, none, none with anxious on), the repeat "a little" run was cut on 25 Sep 2026; replace them with new exports when the prompt changes.

Numbers that reach a page have to trace to a results file, a notebook or the code. The comments above `RESULTS` in `content.js` say where each result line came from; keep that habit.


Every number that reaches a page is also listed in `FACTS.md` at the repo root, which is the locked copy: change a number there first, with its source, and then on the page.
