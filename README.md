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
index.html
css/
  variables.css      -- design tokens, light + dark mode
  styles.css         -- all the actual styles
js/
  main.js            -- boot sequence, all interactive behavior
  render.js          -- renders each section from data files
data/
  about.js           -- bio, quick facts, interests, contact
  experience.js      -- work history
  projects.js        -- featured and grid projects
  skills.js          -- skill groups and certifications
  building.js        -- currently building section
  observations.js    -- writing/observations carousel
assets/
  atx-foodie-inspection/   -- charts and visuals for that project
```

The data files are just exported JS objects. If I want to update a project description or add a new interest card I go to one file, change the text, push. That's the whole update flow.

---

## Features worth noting

**Dark mode** -- system preference respected, toggle in the nav, persisted to localStorage.

**Command palette** -- Cmd+K or Ctrl+K. I built this because I wanted it, not because anyone asked for it. You can navigate sections, toggle dark mode, copy my email, download my resume. It's maybe a little extra for a personal site. I don't regret it.

**Scroll reveal** -- IntersectionObserver, CSS transitions, no library.

**Project carousels** -- the featured projects have image carousels built from scratch. They gave me more trouble than they should have and I now have opinions about timing and DOM paint order that I did not have before. If you read my code you may see "plz work" more than once. 

**Observations section** -- a carousel of short-form writing about things I've noticed in data. This is the part of the site I want to keep adding to the most.

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
