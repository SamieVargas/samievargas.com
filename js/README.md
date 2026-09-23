# js/

Vanilla ES modules, one per page, no bundler.

| File | Page | What it does |
| --- | --- | --- |
| `app.js` | `/` | Renders the work page from `data/content.js` and wires every control: the front doors, the pattern index, the Signal and Brain Dump case studies, the project visualisations, the skills tabs. |
| `console.js` | `/` | The query console: keyed presets, cached result sets, the real render time labelled as such. Nothing is executed. |
| `life.js` | `/life` | The field, the crate, the Christie ledger, the notes carousel, the dragon. |
| `pixels.js` | `/pixels/` | Replays the recorded Life in Pixels runs from `data/pixels-runs.json`. Formats only; computes nothing. |
| `arcade.js` | `/apps/` | The apps index. |
| `staged-loader.js` | `/apps/*` | One three-stage loader shared by the API-backed apps, advanced by real events with a budget that trips a failure path. |
| `toolkit.js` | `/toolkit` | The change log, pushes per week and repo age, read from `data/changelog.json`. |

Conventions: content is imported from `data/content.js`, never inlined here; anything that scrolls in is gated with `watchGate` and is visible by default if IntersectionObserver or motion is unavailable; every import carries the same `?v=` token as the page that loads it, because a module import is cached under its own URL.
