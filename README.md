# samievargas.github.io
My portfolio site. Live at [samievargas.com](https://samievargas.com).

---

## What this is

This started as an upskilling thing and then it became something else too, because the portfolio part is real and the projects are real and I genuinely needed a place to put all of it that was not a LinkedIn PDF, and somewhere along the way it also just became a place that is actually me, which felt more honest anyway. The Agatha Christie read-through and the Ring Fit dragon are not going to help me learn how to use SQL, but they are on here anyway.

I have been in operations for eight years building systems that did not exist before I built them, and a big part of what I do is sit with a messy problem long enough that something useful shows up, so the data projects on here came from that same instinct. The ATX Foodie health inspection analysis started because of a JuiceLand pest sighting on TikTok or Reddit and then turned into 21,160 inspection records and a choropleth map of Austin zip codes, which is basically how I work.

---

## What is on it now

| Page | Route | What it is |
| --- | --- | --- |
| Work | `/` | The portfolio, with the Signal and Brain Dump case studies, the annotated dbt and inspection projects, experience, skills, observations, and contact. |
| Life | `/life` | The personal half, split off the homepage so it stops standing between a hiring manager and the projects. |
| Apps | `/apps` | The arcade, fifteen small browser apps that each do one thing. |
| Toolkit | `/toolkit` | How the site is built, linked from the homepage footer. |
| Résumé | `/resume` | A printable one-file résumé. |
| Raccoon | `/raccoon` | The raccoon invoice, which is exactly what it sounds like. |

---

## Tech

No framework, no build step, just vanilla JS modules, CSS custom properties, and GitHub Pages.

I made this decision early and I would make it the same way again, because I did not want to fight a bundler or manage a dependency tree for what is ultimately a personal site, and this way everything is readable and nothing is compiled and if something breaks I can open DevTools and find it in under a minute, which is the whole pitch.

**Structure:**

```
index.html           -- the work page: nav, hero, Signal, Brain Dump,
                        projects, experience, skills, observations, contact
life.html            -- /life
apps/                -- the arcade index plus fifteen self-contained apps
toolkit.html         -- /toolkit, the build notes
resume.html          -- printable résumé
raccoon/             -- the raccoon invoice
css/
  styles.css         -- design tokens and every style, one accent colour
js/
  app.js             -- renders the work page from data/, wires every control
  life.js            -- the field, the crate, the Christie ledger
  arcade.js          -- the apps index
  toolkit.js         -- the GitHub commits feed and repo age
data/
  content.js         -- projects, roles, skills, certs, observations,
                        quick facts, interests, contact links, the field
assets/              -- charts and screenshots, one folder per project
```

`data/content.js` is just exported JS objects, so if I want to update a project description or add a new interest card I go to one file, change the text, and push, and that is the whole update flow. Prose that only appears once, like the hero and the bio and the Signal writeup, sits directly in `index.html`.

The two agents, Signal and Brain Dump, talk to the Anthropic API through a Cloudflare Worker, so the key stays on the server and the front end can stay public, and it is the same pattern both times.

---

## Features worth noting

**Signal and Brain Dump** -- the two AI tools are on the homepage as working case studies rather than screenshots, so you can see what goes in, what comes back, and how long it took, and both of them are things I built because I was doing the work by hand.

**The field** -- a plot of everything on /life, placed by whether I only noticed it or actually built something, and whether it came from work or from my life, so you click a dot and the panel next to it changes, and the two halves turn out to look the same.

**Observations** -- a carousel of short-form writing about things I have noticed in data, and the raccoon one has a scrubable chart of my body battery going to the floor for ten days, and this is the part of the site I want to keep adding to the most.

**The arcade** -- fifteen small apps at /apps, where six pull live public data from keyless APIs like Wikidata and Open Library and the City of Austin, a few read exports you bring yourself, two track what you tap, and the rest need nothing but a browser.

**Site toolkit** -- a public page about how the site is built, linked from the footer at the bottom of the homepage instead of the nav since it is for the people who want to look under it, with the design tokens, the component set, the copy decisions and why each one reads the way it does, the `<head>` block, and a change log fed by the GitHub commits API on this repo, so it updates itself when I push.

**Mobile as an app** -- under 820px the layout collapses to one column and a four-item tab bar pins to the bottom, so navigation stays under a thumb.

**Scroll reveal** -- IntersectionObserver and CSS transitions with no library, and content is visible by default so nothing depends on the animation firing.

---

## Projects on here

**ATX Foodie Inspection Analysis** -- health inspection records for Austin restaurants, fetched from the City of Austin Open Data Portal API, where I pulled 21,160 records and built a brand compliance scorecard across 84 local chains and then audited my own regular spots because of course I did. The findings are real and a couple of them are genuinely concerning if you eat at fast food chains in certain Austin zip codes.

**Instacart Market Basket Analysis** -- dbt Cloud and BigQuery across 3.4M orders, five staging models into three marts with 35 passing tests, and the reorder rate that everybody cites at 0.60 splits into 0.221 for new shoppers and 0.670 for veterans once you segment it. The repo is also public at [github.com/SamieVargas/instacart-dbt](https://github.com/SamieVargas/instacart-dbt).

**Wearable GDA Capstone** -- a Google Data Analytics capstone using wearable fitness data, and this one is what got me properly into analytics after years of building the operational side of things and watching the data insights sit unused.

**IBM HR Churn Analysis** -- attrition modeling on a synthetic HR dataset.

---

## Why it's public

The site is already live so the repo being private would not accomplish much, and also the code is the point, or part of the point. If you are a recruiter or hiring manager who clicked through from the live site, hello, the projects tab is probably what you are looking for but feel free to poke around here too.

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
grep -rln "?v=20260901" --include=*.html --include=*.js .
```

Every hit needs the same new value, including the `data/content.js` imports at the top of each module, since a module import is cached under its own URL.

---

## Contact

[samievargas.com](https://samievargas.com) has everything, and email is on the contact section. LinkedIn is [linkedin.com/in/samievargas12](https://www.linkedin.com/in/samievargas12/), and Kaggle is [kaggle.com/samievargas](https://www.kaggle.com/samievargas) if you want to see the notebooks.
