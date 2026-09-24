# samievargas.com

Plain HTML, one stylesheet (`css/styles.css`), vanilla ES modules (`js/*.js`), content in `data/content.js`, GitHub Pages, no framework and no build step. Keep it that way.

## Design

Every page follows the 3a style in `design/samie-3a-style.md`: read it before building or changing a page, a doc, a deck or a tool that should look like this site. Tokens live on `:root` at the top of `css/styles.css`; components use the tokens, never a literal colour.

- Scroll load-ins go through `onSeen` / `autoReveal` in `js/reveal.js` (one IntersectionObserver with a `-10%` bottom margin plus a bounding-rect tick). Never a whole-section threshold.
- Every project carries exactly one "In plain terms" sentence (`.plain`).
- Anything laid out for the mock says so in a mono caption.
- Honour `prefers-reduced-motion` by rendering the end state (`REDUCED` in `js/reveal.js`).

## Voice

No em dashes. Run-on sentences joined with commas and "and", no punchy fragments, no "not X, it's Y". Headlines are full claims in sentence case, labels are lower-case facts in mono, and numbers are never rounded past what the source says.

## Housekeeping

- Numbers that reach a page trace to a results file, a notebook or the code; the comments in `data/content.js` say where.
- Bump the `?v=` token on every page and module import in one pass when `css/`, `js/` or `data/` changes (see the root README).
- `raccoon/index.html` and the fifteen `apps/*.html` games keep their own looks and do not load `css/styles.css`.
