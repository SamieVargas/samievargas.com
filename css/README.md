# css/

One file, `styles.css`, and every style on the site is in it.

- Tokens sit at the top of the file on `:root`: paper and ink, one accent green, one caveat brown for "what still breaks" lines, the dark surfaces for Brain Dump and contact, three type families, and `--edge` for the page gutter. Components use the tokens, never a literal colour.
- Sections are grouped by page and marked with a `/* ── Name ── */` rule so a search for the page name lands on its block. New page-specific styles go at the end of the file under their own rule, not inline in the page.
- Reduced motion is handled at the bottom: anything that animates in from `opacity: 0` is forced visible there, so nothing depends on an animation firing.
- The stylesheet is referenced everywhere with a `?v=` token. Bump it in one pass when this file changes (the root README has the grep).
