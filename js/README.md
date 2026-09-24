# js/

Vanilla ES modules, one per page, no bundler.

| File | Page | What it does |
| --- | --- | --- |
| `reveal.js` | every page | The shared scroll load-in (`onSeen`, `autoReveal`), the `REDUCED` flag, and the tween, counter, typing and copy-email helpers. |
| `app.js` | `/` | Renders the work page from `data/content.js`: the eval log, the four-pattern spine, field discovery, Pixels, Signal, Brain Dump, the analysis visualisations, experience, skills and certs. |
| `life.js` | `/life` | The noticing field, progress, Ring Fit, the Christie shelf, the records, the raccoon invoice, and the four notes at `#notes`. |
| `pixels.js` | `/pixels/` | Replays the recorded Life in Pixels runs from `data/pixels-runs.json`. Formats only; computes nothing. |
| `arcade.js` | `/apps/` | The apps index. |
| `staged-loader.js` | `/apps/*` | One three-stage loader shared by the API-backed apps, advanced by real events with a budget that trips a failure path. |
| `toolkit.js` | `/toolkit` | The change log, pushes per week and repo age, read from `data/changelog.json`. |

Conventions: content is imported from `data/content.js`, never inlined here; anything that scrolls in is gated with `onSeen` from `reveal.js` and is visible by default if IntersectionObserver or motion is unavailable; every import carries the same `?v=` token as the page that loads it, because a module import is cached under its own URL.
