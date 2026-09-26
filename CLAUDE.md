# samievargas.com

Plain HTML, one stylesheet (`css/styles.css`), vanilla ES modules (`js/*.js`), content in `data/content.js`, GitHub Pages, no framework and no build step. Keep it that way.

## Numbers are locked

Read `FACTS.md` before any edit. Every number, date, model name and version on the site is recorded there with its source, and it wins over page copy. Never change a figure on a page, or in `data/content.js`, without changing its row in `FACTS.md` first, and never let a copy edit round, rephrase or drop a number. Rows marked UNSOURCED or RECONCILE stay out of new copy until they are resolved.

## Design

Every page follows the 3a style in `design/samie-3a-style.md`: read it before building or changing a page, a doc, a deck or a tool that should look like this site. Tokens live on `:root` at the top of `css/styles.css`; components use the tokens, never a literal colour.

- Scroll load-ins go through `onSeen` / `autoReveal` in `js/reveal.js` (one IntersectionObserver with a `-10%` bottom margin plus a bounding-rect tick). Never a whole-section threshold.
- Every project carries at least one "In plain terms" sentence (`.plain`). When Claude adds one, it adds exactly one, unless Samie asks for more; extra ones she has added, like the lines that explain RAG, MCP, dbt or Socrata, are on purpose and stay.
- Anything laid out for the mock says so in a mono caption.
- Honour `prefers-reduced-motion` by rendering the end state (`REDUCED` in `js/reveal.js`).

## Voice

No em dashes. Run-on sentences joined with commas and "and", no punchy fragments, no "not X, it's Y". Headlines are full claims in sentence case, labels are lower-case facts in mono, and numbers are never rounded past what the source says.

## Housekeeping

- Numbers that reach a page trace to a results file, a notebook or the code; the comments in `data/content.js` say where, and `FACTS.md` holds the locked copy.
- Bump the `?v=` token on every page and module import in one pass when `css/`, `js/` or `data/` changes (see the root README).
- `raccoon/index.html` and the fifteen `apps/*.html` games keep their own looks and do not load `css/styles.css`.
