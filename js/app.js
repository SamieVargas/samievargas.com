// ============================================================
// js/app.js
// Work page — no build step, no framework. Content lives in
// data/content.js; this file gives it shape and behaviour.
// ============================================================

import {
  HERO_STATS, SIGNAL_TYPED, SIGNAL_SCRAPS, SIGNAL_OUT, SIGNAL_NOTES,
  DUMP_BITS, BRAIN_STATES, ANNOTATED, ATX_ZIPS, ROLES, RAIL_TICKS,
  SKILLS, CERTS, OBSERVATIONS, LIFE_TEASERS, CONTACT_LINKS,
} from '../data/content.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_IO = 'IntersectionObserver' in window;

// ── Hero ─────────────────────────────────────────────────────
function renderHeroStats() {
  $('#hero-stats').innerHTML = HERO_STATS.map((s) =>
    `<div><strong>${esc(s.stat)}</strong><span>${esc(s.label)}</span></div>`).join('');
}

// ── Signal: scrap sort + typewriter ──────────────────────────
function renderSignal() {
  $('#sig-scraps').innerHTML = SIGNAL_SCRAPS.map((sc, i) => `
    <div class="sig-scrap" style="left:${sc.left};top:${sc.top};transform:rotate(${sc.rot}deg);--d:${(i * 0.14).toFixed(2)}s;--stack-top:${i * 39}px">${esc(sc.text)}</div>`).join('');

  $('#sig-rows').innerHTML = SIGNAL_OUT.map((o, i) => `
    <div class="sig-out__row" style="--d:${(0.5 + i * 0.18).toFixed(2)}s">
      <span>${esc(o.k)}</span>
      <span class="v"${o.typing ? ' data-typed' : ''}>${o.typing ? '' : esc(o.v)}</span>${o.typing ? '<span class="sig-cursor">▍</span>' : ''}
    </div>`).join('');

  $('#sig-notes').innerHTML = SIGNAL_NOTES.map((c) => `
    <div class="callout">
      <span>${c.n}</span>
      <div><strong>${esc(c.title)}</strong><span class="callout__body">${esc(c.body)}</span></div>
    </div>`).join('');
}

function signalIn() {
  $('#sig-in').classList.add('is-in');
  $('#sig-out').classList.add('is-in');
}

function typeSignal(instant) {
  const target = $('[data-typed]');
  const cursor = $('.sig-cursor');
  if (instant) {
    target.textContent = SIGNAL_TYPED;
    if (cursor) cursor.hidden = true;
    return;
  }
  let len = 0;
  const timer = setInterval(() => {
    len += 1;
    target.textContent = SIGNAL_TYPED.slice(0, len);
    if (len >= SIGNAL_TYPED.length) {
      clearInterval(timer);
      if (cursor) cursor.hidden = true;
    }
  }, 26);
}

function watchSignal() {
  if (REDUCED || !HAS_IO) { signalIn(); typeSignal(true); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      signalIn();
      setTimeout(() => typeSignal(false), 1100);
    });
  }, { threshold: 0.3 });
  io.observe($('#signal'));
}

// ── Brain Dump: scatter + pour ───────────────────────────────
let energy = 'Foggy';

function renderDumpBits() {
  $('#bd-bits').innerHTML = DUMP_BITS.map((d, i) => `
    <span class="bd-bit" style="left:${d.x}%;top:${d.y}%;transform:rotate(${d.r}deg);--dx:${d.dx}px;--dy:${d.dy}px;--dr:${d.dr}deg;--d:${(i * 0.11).toFixed(2)}s">${esc(d.t)}</span>`).join('');
}

function renderStates() {
  $('#bd-states').innerHTML = Object.keys(BRAIN_STATES).map((k) =>
    `<button type="button" class="bd-state${k === energy ? ' is-on' : ''}" data-state="${k}">${k}</button>`).join('');
}

function renderPiles() {
  const st = BRAIN_STATES[energy];
  $('#bd-piles').innerHTML = st.piles.map((p, i) => `
    <div class="bd-pile" style="--d:${(i * 0.09).toFixed(2)}s"><span>${esc(p.k)}</span><span>${esc(p.v)}</span></div>`).join('');
  $('#bd-note').textContent = st.note;
}

function wireBrainDump() {
  $('#bd-states').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-state]');
    if (!btn || btn.dataset.state === energy) return;
    energy = btn.dataset.state;
    renderStates();
    const piles = $('#bd-piles');
    piles.classList.add('is-reset');
    renderPiles();
    // Two frames so the reset state paints before the pour transition runs.
    requestAnimationFrame(() => requestAnimationFrame(() => piles.classList.remove('is-reset')));
  });
}

// ── dbt DAG edges ────────────────────────────────────────────
function renderDagEdges() {
  const stgRight = 47, intLeft = 52, intRight = 78, martLeft = 82;
  const y = { src: 82, sop: 17, sp: 32, sa: 47, sd: 62, so: 82, int: 36, fct: 82, dimP: 36, dimU: 82 };
  const curve = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  };
  // The real lineage: orders → stg_orders; four staging models → int;
  // int → dim_products; stg_orders + int → fct_orders → dim_users.
  const edges = [
    [22, y.src, 25, y.so], [stgRight, y.sop, intLeft, y.int], [stgRight, y.sp, intLeft, y.int],
    [stgRight, y.sa, intLeft, y.int], [stgRight, y.sd, intLeft, y.int],
    [intRight, y.int, martLeft, y.dimP], [stgRight, y.so, intLeft, y.fct],
    [intRight - 10, y.int + 4, intLeft, y.fct - 2], [intRight, y.fct, martLeft, y.dimU],
  ];
  const paths = edges.map((e, i) =>
    `<path d="${curve(e[0], e[1], e[2], e[3])}" fill="none" stroke="#1a6b5a" stroke-width="0.28" opacity="0.55" stroke-dasharray="1.6 1.2" style="--d:${(i * 0.08).toFixed(2)}s"/>`).join('');
  $('#dag').insertAdjacentHTML('afterbegin',
    `<svg viewBox="0 0 100 100" preserveAspectRatio="none">${paths}</svg>`);
}

// ── ATX choropleth ───────────────────────────────────────────
function zipColor(score) {
  if (score <= 89.0) return '#0f6e56';
  if (score <= 90.6) return '#4daa91';
  if (score <= 92.0) return '#d97706';
  return '#b91c1c';
}

// A jittered 4×5 lattice tessellates the box into 18 organic tiles (two
// corner cells skipped); zips fill them north-to-south by real latitude.
function zipLattice() {
  const W = [0.86, 1.2, 0.96, 0.98], H = [0.8, 1.14, 0.94, 1.08, 1.04];
  const w = 360, h = 430, padX = 6, padY = 8;
  const uw = w - padX * 2, uh = h - padY * 2;
  const sw = W.reduce((a, b) => a + b, 0), sh = H.reduce((a, b) => a + b, 0);
  const xs = [padX], ys = [padY];
  W.forEach((k) => xs.push(xs[xs.length - 1] + (k / sw) * uw));
  H.forEach((k) => ys.push(ys[ys.length - 1] + (k / sh) * uh));
  const rnd = (a, b) => { const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return v - Math.floor(v); };
  const grid = [];
  for (let r = 0; r < ys.length; r++) {
    grid[r] = [];
    for (let c = 0; c < xs.length; c++) {
      const lastC = c === xs.length - 1, lastR = r === ys.length - 1;
      let x = xs[c] + (rnd(c, r) - 0.5) * (c === 0 || lastC ? 20 : 34);
      let y = ys[r] + (rnd(r + 9, c + 3) - 0.5) * (r === 0 || lastR ? 16 : 30);
      if (c === 0) x = Math.max(2, x); if (lastC) x = Math.min(w - 2, x);
      if (r === 0) y = Math.max(3, y); if (lastR) y = Math.min(h - 3, y);
      grid[r][c] = [+x.toFixed(1), +y.toFixed(1)];
    }
  }
  return grid;
}

function zipMapSvg() {
  const W = 360, H = 430;
  const grid = zipLattice();
  const skip = { '0-0': 1, '4-3': 1 };
  const order = ATX_ZIPS.slice().sort((a, b) => b.box[0] - a.box[0]);
  const cells = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) if (!skip[`${r}-${c}`]) cells.push([r, c]);
  const river = (() => {
    const p = grid[3];
    let d = `M${p[0][0]},${p[0][1]}`;
    for (let i = 0; i < p.length - 1; i++) {
      const a = p[i], b = p[i + 1], mx = (a[0] + b[0]) / 2, bend = i % 2 ? 14 : -14;
      d += ` C${mx.toFixed(1)},${(a[1] + bend).toFixed(1)} ${mx.toFixed(1)},${(b[1] - bend).toFixed(1)} ${b[0]},${b[1]}`;
    }
    return d;
  })();
  const tiles = cells.map(([r, c], i) => {
    const z = order[i];
    const v = [grid[r][c], grid[r][c + 1], grid[r + 1][c + 1], grid[r + 1][c]];
    const cx = v.reduce((s, q) => s + q[0], 0) / 4, cy = v.reduce((s, q) => s + q[1], 0) / 4;
    return { z, pts: v.map((q) => q.join(',')).join(' '), cx, cy, i };
  });
  const scores = ATX_ZIPS.map((s) => s.score);
  const worst = Math.min(...scores), best = Math.max(...scores);
  const fills = tiles.map((t) => `
    <polygon points="${t.pts}" fill="${zipColor(t.z.score)}" stroke="#f8f6ef" stroke-width="1.4"
      style="animation:tilein .5s cubic-bezier(.34,1.15,.64,1) ${(t.i * 0.04).toFixed(2)}s both"><title>${t.z.zip} · ${esc(t.z.label)} · ${t.z.score.toFixed(1)} avg score</title></polygon>`).join('');
  const extremes = tiles.filter((t) => t.z.score === worst || t.z.score === best).map((t) =>
    `<polygon points="${t.pts}" fill="none" stroke="rgba(251,249,243,.85)" stroke-width="1.4" stroke-dasharray="4 3"/>`).join('');
  const labels = tiles.map((t) => `
    <g style="animation:fadein .4s ease ${(0.3 + t.i * 0.04).toFixed(2)}s both">
      <text x="${t.cx.toFixed(1)}" y="${(t.cy - 4).toFixed(1)}" text-anchor="middle" style="font:500 10.5px 'IBM Plex Mono',monospace;letter-spacing:.02em;fill:rgba(255,255,255,.95)">${t.z.zip}</text>
      <text x="${t.cx.toFixed(1)}" y="${(t.cy + 15).toFixed(1)}" text-anchor="middle" style="font:300 20px Newsreader,Georgia,serif;fill:rgba(255,255,255,.95)">${t.z.score.toFixed(1)}</text>
    </g>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;max-width:${W}px" role="img" aria-label="Choropleth of average Austin food-inspection score across 18 zip codes">
    <defs>
      <linearGradient id="riverfade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#8fb9b0" stop-opacity="0.4"/>
        <stop offset="45%" stop-color="#7ba9a0" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#8fb9b0" stop-opacity="0.4"/>
      </linearGradient>
    </defs>
    <g>${fills}</g>
    <g pointer-events="none">${extremes}</g>
    <path d="${river}" fill="none" stroke="#f8f6ef" stroke-width="7" stroke-linecap="round" opacity="0.85"/>
    <path d="${river}" fill="none" stroke="url(#riverfade)" stroke-width="3" stroke-linecap="round"/>
    <g pointer-events="none">${labels}</g>
    <g pointer-events="none">
      <circle cx="${W - 27}" cy="27" r="13" fill="rgba(251,249,243,.94)"/>
      <path d="M${W - 27},18 l4,12 l-4,-3 l-4,3 z" fill="#1a6b5a"/>
    </g>
  </svg>`;
}

// ── Annotated analysis projects ──────────────────────────────
function renderAnnotated() {
  $('#annotated').innerHTML = ANNOTATED.map((p) => `
    <div class="annotated">
      <div class="annotated__head">
        <div>
          <span class="label label--accent">${esc(p.kicker)}</span>
          <h3>${esc(p.headline)}</h3>
        </div>
        <a class="btn btn--accent" style="padding:12px 20px" href="${p.href}">${esc(p.cta)}</a>
      </div>
      <div class="annotated__grid" style="grid-template-columns:${p.cols}">
        <div class="annotated__shot" style="order:${p.imgFirst ? 1 : 2}"><img src="${p.img}" alt="${esc(p.alt)}"></div>
        <div style="order:${p.imgFirst ? 2 : 1}">
          <p class="input-line">${esc(p.inputLine)}</p>
          ${p.notes.map((c) => `
            <div class="callout">
              <span>${c.n}</span>
              <div><strong>${esc(c.title)}</strong><span class="callout__body">${esc(c.body)}</span></div>
            </div>`).join('')}
          <p class="finding"><strong>What it found — </strong>${esc(p.finding)}</p>
        </div>
      </div>
      ${p.isAtx ? `
      <div class="choro">
        <div class="choro__map">${zipMapSvg()}</div>
        <div class="choro__body">
          <span class="label label--accent">Compliance by zip · avg inspection score · city avg 90.8</span>
          <p>All eighteen high-restaurant-density zips. Lower score means fewer violations, so the dark tiles are the good ones: South Congress at 88.7, Rundberg and South Lamar at 88.8. Crestview and North Burnet sit a full point above the city average, and Pflugerville is the outlier at 92.3.</p>
          <div class="choro-legend">
            <span>Score · lower is better</span>
            <span class="swatch"><i style="background:#0f6e56"></i><span>≤ 89.0 — best</span></span>
            <span class="swatch"><i style="background:#4daa91"></i><span>89.0 – 90.6</span></span>
            <span class="swatch"><i style="background:#d97706"></i><span>90.6 – 92.0</span></span>
            <span class="swatch"><i style="background:#b91c1c"></i><span>&gt; 92.0 — highest scrutiny</span></span>
          </div>
          <a class="choro__src" href="https://www.kaggle.com/code/samievargas/atx-foodie-inspection">21,160 records · City of Austin open data · the pannable version ↗</a>
        </div>
      </div>` : ''}
    </div>`).join('');
}

// ── Experience: rail + roles ─────────────────────────────────
let openRoles = [];

function renderRailTicks() {
  $('#rail-ticks').innerHTML = RAIL_TICKS.map((t) => `<span>${t}</span>`).join('');
}

function watchExperience() {
  const rail = $('#rail');
  if (REDUCED || !HAS_IO) { rail.classList.add('is-in'); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      rail.classList.add('is-in');
    });
  }, { threshold: 0.25 });
  io.observe($('#experience'));
}

function renderRoles() {
  $('#roles').innerHTML = ROLES.map((r, i) => {
    const open = openRoles.includes(i);
    return `
    <div class="role">
      <div class="role__head">
        <h4>${esc(r.title)}</h4>
        <span class="label label--mid" style="letter-spacing:.1em;white-space:nowrap">${esc(r.period)}</span>
        <button type="button" class="btn btn--ghost btn--sm" data-role="${i}">${open ? 'Hide' : 'Detail'}</button>
      </div>
      <p class="role__meta">${esc(r.meta)}</p>
      ${open ? `<div class="role__bullets">${r.bullets.map((b, bi) => `
        <p><i style="--d:${(bi * 0.14).toFixed(2)}s"></i><span>${esc(b)}</span></p>`).join('')}</div>` : ''}
    </div>`;
  }).join('');
  $('#roles-toggle-all').textContent = openRoles.length === ROLES.length ? 'Collapse all' : 'Expand all';
}

function wireRoles() {
  $('#roles').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-role]');
    if (!btn) return;
    const i = Number(btn.dataset.role);
    openRoles = openRoles.includes(i) ? openRoles.filter((x) => x !== i) : [...openRoles, i];
    renderRoles();
  });
  $('#roles-toggle-all').addEventListener('click', () => {
    openRoles = openRoles.length === ROLES.length ? [] : ROLES.map((_, i) => i);
    renderRoles();
  });
}

// ── Skills: measured tab indicator ───────────────────────────
let skillTab = 0;
let tabEls = [];

function renderSkillTabs() {
  const host = $('#skill-tabs');
  host.innerHTML = SKILLS.map((g, i) =>
    `<button type="button" role="tab" class="${i === skillTab ? 'is-on' : ''}" data-tab="${i}" aria-selected="${i === skillTab}">${esc(g.label)}</button>`).join('')
    + '<i class="indicator"></i>';
  tabEls = [...host.querySelectorAll('button')];
  measureTab();
}

function measureTab() {
  // Measured, not computed: equal-width columns clip "AI ENABLEMENT".
  const el = tabEls[skillTab];
  const ind = $('#skill-tabs .indicator');
  if (!el || !ind) return;
  ind.style.width = `${el.offsetWidth}px`;
  ind.style.transform = `translateX(${el.offsetLeft}px)`;
}

function renderSkillLine() {
  const line = $('#skill-line');
  line.textContent = SKILLS[skillTab].line;
  line.style.animation = 'none';
  void line.offsetHeight; // restart the crossfade
  line.style.animation = '';
}

function wireSkills() {
  $('#skill-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    skillTab = Number(btn.dataset.tab);
    tabEls.forEach((t, i) => {
      t.classList.toggle('is-on', i === skillTab);
      t.setAttribute('aria-selected', String(i === skillTab));
    });
    measureTab();
    renderSkillLine();
  });
  window.addEventListener('resize', measureTab);
  // Re-measure once the mono font loads and tab widths settle.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureTab);
}

function renderCerts() {
  $('#certs').innerHTML = CERTS.map((c) => `
    <div class="cert">
      <div>
        <h4>${esc(c.name)}</h4>
        <p>${esc(c.issuer)}</p>
      </div>
      <a class="cert__verify" href="${c.href}">Verify ↗</a>
    </div>`).join('');
}

// ── Notes / observations ─────────────────────────────────────
let obsIdx = 0;
let dayIdx = -1;

function renderObs() {
  const o = OBSERVATIONS[obsIdx];
  $('#obs-tag').textContent = o.tag;
  $('#obs-title').textContent = o.title;
  $('#obs-counter').textContent = `${obsIdx + 1} of ${OBSERVATIONS.length}`;
  $('#obs-body').innerHTML = o.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#obs-src').innerHTML = o.linkText
    ? `${esc(o.sourceText)} <a href="${o.linkHref}">${esc(o.linkText)}</a>`
    : esc(o.sourceText);
  $('#obs-dots').innerHTML = OBSERVATIONS.map((_, i) =>
    `<button type="button" class="dot${i === obsIdx ? ' is-on' : ''}" data-obs="${i}" aria-label="Observation ${i + 1}"></button>`).join('');
  renderChart();
}

function renderChart() {
  const chart = OBSERVATIONS[obsIdx].chart;
  const host = $('#obs-chart');
  if (!chart) { host.innerHTML = ''; return; }
  host.innerHTML = `
    <div class="chart">
      <div class="chart__head">
        <span class="label label--accent">${esc(chart.title)}</span>
        <span class="label label--mid">${esc(chart.hint)}</span>
      </div>
      <div class="chart__bars">
        ${chart.days.map((d, i) => `
          <button type="button" data-day="${i}" aria-label="${esc(d.d)}: ${d.v}" class="${d.v <= 10 ? 'is-low' : ''}">
            <i style="height:${Math.max(4, Math.round((d.v / chart.max) * 100))}%;--d:${(i * 0.07).toFixed(2)}s"></i>
          </button>`).join('')}
      </div>
      <div class="chart__scale">
        <span class="label label--mid">${esc(chart.days[0].d)}</span>
        <span class="label label--mid">${esc(chart.days[chart.days.length - 1].d)}</span>
      </div>
      <p class="chart__readout"></p>
    </div>`;
  updateChartReadout();
}

function updateChartReadout() {
  const chart = OBSERVATIONS[obsIdx].chart;
  if (!chart) return;
  $('#obs-chart .chart__readout').textContent = dayIdx > -1
    ? `${chart.days[dayIdx].d} — ${chart.days[dayIdx].v} — ${chart.days[dayIdx].note}`
    : `${chart.days.length} days, from normal to the floor and back`;
  $('#obs-chart').querySelectorAll('[data-day]').forEach((b, i) =>
    b.classList.toggle('is-on', i === dayIdx));
}

function wireObs() {
  const step = (dir) => {
    obsIdx = (obsIdx + dir + OBSERVATIONS.length) % OBSERVATIONS.length;
    dayIdx = -1;
    renderObs();
  };
  $('#obs-prev').addEventListener('click', () => step(-1));
  $('#obs-next').addEventListener('click', () => step(1));
  $('#obs-dots').addEventListener('click', (e) => {
    const dot = e.target.closest('[data-obs]');
    if (!dot) return;
    obsIdx = Number(dot.dataset.obs);
    dayIdx = -1;
    renderObs();
  });
  const scrub = (e) => {
    const bar = e.target.closest('[data-day]');
    if (!bar) return;
    dayIdx = Number(bar.dataset.day);
    updateChartReadout();
  };
  $('#obs-chart').addEventListener('mouseover', scrub);
  $('#obs-chart').addEventListener('click', scrub);
  $('#obs-chart').addEventListener('mouseleave', () => {
    if (dayIdx > -1) { dayIdx = -1; updateChartReadout(); }
  });
}

// ── Life teaser + contact ────────────────────────────────────
function renderLifeTeasers() {
  $('#life-teasers').innerHTML = LIFE_TEASERS.map((l) => `
    <div><span class="label">${esc(l.k)}</span><p>${esc(l.v)}</p></div>`).join('');
}

function renderContactLinks() {
  $('#contact-links').innerHTML = CONTACT_LINKS.map((l) => `
    <a href="${l.href}">
      <span class="label">${esc(l.label)}</span>
      <span class="value">${esc(l.value)}</span>
    </a>`).join('');
}

// ── Copy email ───────────────────────────────────────────────
function wireCopyEmail() {
  const email = 'sammisnv@gmail.com';
  const toast = $('#toast');
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    let timer;
    const original = btn.textContent;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(email); } catch (err) { /* toast still names the address */ }
      btn.textContent = `Copied — ${email}`;
      if (toast) { toast.textContent = `Email copied — ${email}`; toast.classList.add('is-on'); }
      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.textContent = original;
        if (toast) toast.classList.remove('is-on');
      }, 2200);
    });
  });
}

// ── Boot ─────────────────────────────────────────────────────
renderHeroStats();
renderSignal();
renderDumpBits();
renderStates();
renderPiles();
renderDagEdges();
renderAnnotated();
renderRailTicks();
renderRoles();
renderSkillTabs();
renderSkillLine();
renderCerts();
renderObs();
renderLifeTeasers();
renderContactLinks();

wireBrainDump();
wireRoles();
wireSkills();
wireObs();
wireCopyEmail();
watchSignal();
watchExperience();
