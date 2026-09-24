# Samie Vargas · 3a design style

A lab-notebook layout set in an editorial serif, with one green accent and evidence drawn as small live visualizations. Apply this to any page, doc, deck or tool that should feel like samievargas.com. Reference builds: `Site - 3a full mockup.dc.html` (work), `Site - 3a Life.dc.html`, `Site - 3a Notes.dc.html`, `Site - 3a Arcade.dc.html`, `Site - 3a Resume.dc.html`, `Site - 3a Toolkit.dc.html`, `Site - 3a Pixels.dc.html`.

## Principles
1. Proof before claims. Every section shows a real number, a real run or a real artifact, and the visual draws that number instead of decorating around it.
2. One reader at a time. Technical detail sits in mono and tables, and every project carries one "In plain terms" sentence for the non-technical reader.
3. Quiet frame, lively content. The page chrome is paper, ink and hairlines; motion and color live only inside the evidence.
4. Honest labels. Anything laid out for the mock (which cells are red, placeholder bars) says so in a small mono caption.

## Color
| Token | Value | Use |
| --- | --- | --- |
| paper | `#fafaf9` | page background |
| card | `#ffffff` | cards, tables, chart frames |
| sunk | `#f3f2ee` / `#eeece6` | wells, empty bar tracks |
| ink | `#161513` | headings, body on light, dark panels |
| body | `#3a3833` | paragraph text |
| muted | `#55534c` · `#77746b` | secondary text, mono meta |
| faint | `#99968c` | captions only, never meaning-carrying |
| rule | `#e4e2dc` (hairline) · `#cfccc4` (control border) · `#161513` (section rule) | |
| accent | `#1a6b5a` | links, eyebrows, primary buttons, the one highlighted series |
| accent on dark | `#8fd6bf` | same roles inside dark panels |
| accent tint | `#e6f1ec` | "In plain terms" box, selected tier, outlined-button fill |
| alert | `oklch(0.6 0.16 28)` | the thing that still breaks, failures, "more violations" |
| dark panel | `#161513` with text `#e9e7e1`, secondary `#b9b6ad` / `#8b887e`, rules `#2e2c28` / `#3a3731` | terminals, hand-off cards, detail panels |

Category colors (data types, pattern kinds, dbt tiers): same lightness and chroma, vary hue only, e.g. `oklch(0.55 0.1 H)` for strokes and `oklch(0.965 0.025 H)` for fills, H from {60, 145, 200, 250, 290, 330}. Never more than one saturated accent in the chrome.

## Type
- **Young Serif 400** for anything that speaks: h1 54px/1.04, h2 40px/1.08 (section) or 28–30px (sub-section), h3 22–26px, card titles 18–22px, big numbers 28–52px. Letter-spacing -.01em at 40px and above.
- **Onest 400/500/600** for reading: 17px/1.6 lead, 15–16px/1.65 body, 13.5–14.5px/1.5 in cards. Bold is 600 and only inside a sentence ("In plain terms:").
- **Geist Mono 400/500** for anything that labels or measures: eyebrows 12px in accent, meta 11–12.5px, uppercase micro-labels 10–11px with .08–.12em tracking, table keys, numbers inside logs.
- `text-wrap: pretty` everywhere. No other fonts.

## Layout
- Content column `max-width:1200px`, 40px side padding. Sections 56–72px vertical padding.
- A major section opens with a `2px solid #161513` top rule; a sub-section with `1px solid #161513`; rows inside are `1px #e4e2dc` hairlines.
- Section header: serif title left, mono note right, `padding-bottom:12px; border-bottom:1px solid #161513`. Use the same header on sibling columns so they read as a pair.
- Two-column blocks: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr))`, `align-items:start` whenever the columns hold different lengths.
- Four-up sets (results strips, step frames) are built as two pairs so they wrap 4 → 2+2 → 1, never 3+1.
- 1px-gap grids on a colored background are only allowed when every cell fills its row; otherwise put borders on the cells.
- Dark bands (a whole section on `#161513`) at most once or twice per page.

## Components
- **Eyebrow**: Geist Mono 12px in accent, `Pattern · Project · kind` separated by ` · `.
- **Buttons**: primary is accent fill + white Geist Mono 12.5–13px, 44–46px tall, square corners; secondary is `1px solid accent` + accent text on accent tint, hover fills solid; neutral is `1px #bdbab1` outline. Arrows: `→` internal, `↗` external, `↓` download.
- **Chips / tabs**: Geist Mono 12px, `1px #cfccc4` border; selected is ink fill with white text (on dark: accent-on-dark fill with ink text).
- **Verify pill**: outlined accent, `Verify ↗`; grey outline + "Add verify link" when the URL is missing.
- **In plain terms**: `background: accent tint; padding:12px 14px; font 14.5px/1.6`, starts with **In plain terms:** and is one sentence.
- **Results strip**: four cells, What it replaced · What it took · What it costs to run · What still breaks, mono uppercase key over a 13.5px value.
- **Case table**: 110px mono key column (Problem, Approach, Went wrong, Result, Next time) against body text, hairline rows, top rule in ink.
- **Terminal / log panel**: dark panel, 12.5px mono, three-column rows (source, measure, value), values in accent-on-dark, alert values in `#f08a7a`, a blinking `▍`.
- **Stat cell**: serif number over an 11px mono caption.
- **Timeline rail**: 4px track in `#eeece6` filling with accent, mono year ticks, rows below that expand with `+` / `−`.

## Data visualization
- Dots or cells per test case (10 fixtures, 26 questions, 50 runs), filled in accent or ink, failures in alert red.
- Bars on a `#eeece6` track; a pooled bar that splits into its segments beats a single average.
- Line charts: SVG polyline, `vector-effect: non-scaling-stroke`, revealed with a `clip-path` wipe (never dash-offset on a non-scaling stroke). If "higher is worse", flip the axis so down is worse and label it `↑ fewer` / `↓ more`.
- Pipelines (dbt DAG, capture → match → confirm → hand off): tier columns tinted by category hue, dotted flowing edges (`stroke-dasharray:1 7`, round caps, 1s linear dash animation), a live counter (tests passing, cards matched).
- Always a mono caption with the source and date; say "laid out for the mock" when placement is illustrative.

## Motion
- Everything below the fold loads in when it scrolls into view: IntersectionObserver with `rootMargin: 0 0 -10% 0` plus a bounding-rect safety check, never a whole-section threshold.
- Load-in: opacity 0 → 1 and translateY 16–18px → 0 over .5–.8s, `cubic-bezier(.2,.7,.2,1)`, staggered 60–150ms.
- Counters ease out (cubic) over 1.2–1.8s and land on the real value. Bars grow, cells fill in order, text types at roughly 40 characters a second for transcripts.
- Chips dropping into bins use a small overshoot `cubic-bezier(.3,1.4,.5,1)`.
- Loops only for a blinking cursor, a pulsing "reading now", a marquee ticker or dotted data flow. Provide an `animate` toggle that shows the end state.

## Copy
- Follow the voice rules in `CLAUDE.md`: no em dashes, run-on sentences joined with commas and "and", no "not X, it's Y".
- Headlines are a full claim in sentence case. Labels are lower-case facts in mono. Numbers are never rounded past what the source says.
- Every project gets exactly one "In plain terms" sentence.

## Don'ts
- No gradients in the chrome, no emoji, no drop shadows beyond a hover lift, no rounded cards, no left-border accent stripes.
- No `<img src="{{ hole }}">` in templates; use a computed `background-image`.
- No labels that can spill out of their box: right-side points put their label on the left, long file names truncate.
- No stat rows that repeat numbers already shown elsewhere on the page.
