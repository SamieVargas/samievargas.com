# samievargas.github.io
My portfolio site. Live at [samievargas.com](https://samievargas.com).

---

## What this is

This started as a upskilling thing and then became something else too. The portfolio part is real, the projects are real, and I genuinely needed a place to put all of it that wasn't a LinkedIn PDF. But somewhere along the way it also just became a place that is actually me, which felt more honest anyway. The Agatha Christie read-through and the Ring Fit dragon are not going to help me learn how to use SQL, but they're on here anyway.

I've been in operations for eight years building systems that didn't exist before I built them, and a big part of what I do is sit with a messy problem long enough that something useful shows up. The data projects on here came from that same instinct. The ATX Foodie health inspection analysis started because of a JuiceLand pest sighting on TikTok or Reddit and then turned into 21,160 inspection records and a choropleth map of Austin zip codes. That's basically how I work.

---

## Tech

No framework. No build step. Vanilla JS modules, CSS custom properties, GitHub Pages.

I made this decision early and I'd make it the same way again. I didn't want to fight a bundler or manage a dependency tree for what is ultimately a personal site. Everything is readable, nothing is compiled, and if something breaks I can open DevTools and find it in under a minute. That's the whole pitch.

**Structure:**

```
index.html           -- the whole page: nav, hero, section shells, footer
css/
  styles.css         -- design tokens and every style, one accent colour
js/
  app.js             -- renders the lists from data/, wires every control
data/
  content.js         -- projects, roles, skills, certs, observations,
                        quick facts, interests, contact links, the field
assets/
  atx-foodie-inspection/   -- charts and visuals for that project
```

`data/content.js` is just exported JS objects. If I want to update a project description or add a new interest card I go to one file, change the text, push. That's the whole update flow. Prose that only appears once — the hero, the bio, the Signal writeup — sits directly in `index.html`.

---

## Features worth noting

**Plain or technical** -- every project card leads with what the thing does in plain language. "How it works" opens the architecture, and the Plain/Technical switch rewrites all four cards at once. Technical readers get everything, nobody else has to wade through it.

**The field** -- a plot of everything on here, placed by whether I only noticed it or actually built something, and whether it came from work or from my life. Click a dot, the panel next to it changes. The two halves turn out to look the same.

**Observations** -- a carousel of short-form writing about things I've noticed in data. The raccoon one has a scrubable chart of my body battery going to the floor for ten days. This is the part of the site I want to keep adding to the most.

**Mobile as an app** -- under 820px the layout collapses to one column and a four-item tab bar pins to the bottom, so navigation stays under a thumb.

**Scroll reveal** -- IntersectionObserver, CSS transitions, no library. Content is visible by default, so nothing depends on the animation firing.

**Spotify embed** -- links to a playlist I actually listen to.

---

## Projects on here

**ATX Foodie Inspection Analysis** -- health inspection records for Austin restaurants, fetched from the City of Austin Open Data Portal API. I pulled 21,160 records, built a brand compliance scorecard across 84 local chains, and then audited my own regular spots because of course I did. The findings are real and a couple of them are genuinely concerning if you eat at fast food chains in certain Austin zip codes.

**Instacart Market Basket Analysis** -- dbt Cloud, BigQuery, product affinity and reorder behavior. The repo for this one is also public at [github.com/SamieVargas/instacart-dbt](https://github.com/SamieVargas/instacart-dbt).

**Wearable GDA Capstone** -- Google Data Analytics capstone using wearable fitness data. This one is what got me properly into analytics after years of building the operational side of things and watching the data insights sit unused.

**IBM HR Churn Analysis** -- attrition modeling on a synthetic HR dataset.

---

## Why it's public

The site is already live so the repo being private wouldn't accomplish much. Also the code is the point, or part of the point. If you're a recruiter or hiring manager who clicked through from the live site, hello, the projects tab is probably what you're looking for but feel free to poke around here too.

---

## Running locally

It's just HTML files. There's no dev server required but if you want one:

```bash
npx serve .
```

or

```bash
python3 -m http.server 8000
```

Open `localhost:8000` or `localhost:3000` depending on which you used. The JS uses ES modules so you do need to serve it over HTTP rather than opening the file directly, otherwise the imports won't resolve.

---

## Contact

[samievargas.com](https://samievargas.com) has everything. Email is on the contact section. LinkedIn is [linkedin.com/in/samievargas12](https://www.linkedin.com/in/samievargas12/). Kaggle is [kaggle.com/samievargas](https://www.kaggle.com/samievargas) if you want to see the notebooks.
