// ============================================================
// js/app.js
// Work page — no build step, no framework. Content lives in
// data/content.js; this file gives it shape and behaviour.
// ============================================================

import {
  HERO_STATS, SIGNAL_TYPED, SIGNAL_SCRAPS, SIGNAL_OUT, SIGNAL_NOTES,
  READ_ROWS, SEC_CONTACTS,
  DUMP_BITS, BRAIN_STATES, ANNOTATED, ATX_ZIPS, ROLES, RAIL_TICKS,
  SKILLS, CERTS, OBSERVATIONS, LIFE_TEASERS, CONTACT_LINKS, ARCADE_TITLES,
} from '../data/content.js?v=20260831';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_IO = 'IntersectionObserver' in window;

// Sections choreograph their entrance when they scroll into view.
const gates = { workIn: false, skillsIn: false, notesIn: false, lifeIn: false, alsoIn: false, readIn: false, instaIn: false, atxIn: false, driftIn: false };

function watchGate(id, key, onIn) {
  const fire = () => { if (gates[key]) return; gates[key] = true; onIn(); };
  if (REDUCED || !HAS_IO) { fire(); return; }
  const el = document.getElementById(id);
  if (!el) return;
  const r = el.getBoundingClientRect();
  if (r.height > 0 && r.bottom > 60 && r.top < (window.innerHeight || 800) - 60) { fire(); return; }
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fire(); } });
  }, { threshold: 0.18 });
  io.observe(el);
}

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

// ── Signal: the contact read, typed back in live ─────────────
function renderContactRead(on) {
  $('#read-rows').innerHTML = READ_ROWS.map((r, i) => `
    <div style="display:grid;grid-template-columns:104px 1fr;gap:14px;padding:10px 0;border-bottom:1px solid #eeebe1;${on ? `animation:driftup .5s ease ${(0.35 + i * 0.28).toFixed(2)}s both` : 'opacity:0'}">
      <span style="font:400 9.5px/1.5 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#9a9686;padding-top:2px">${esc(r.k)}</span>
      <p style="margin:0;font-size:12.5px;line-height:1.62;color:#3a382e">${esc(r.v)}</p>
    </div>`).join('');
  $('#read-sec').innerHTML = SEC_CONTACTS.map((c, i) => `
    <p style="margin:${i ? '10px' : '0'} 0 0;font-size:12px;line-height:1.6;color:#6d6a5c;${on ? `animation:driftup .5s ease ${(1.9 + i * 0.25).toFixed(2)}s both` : 'opacity:0'}"><strong style="font-weight:500;color:#16150f">${esc(c.name)}</strong> — ${esc(c.body)}${i === SEC_CONTACTS.length - 1 ? `<span style="display:inline-block;margin-left:2px;color:#1a6b5a;${on ? 'animation:blink 1s step-end infinite' : 'opacity:0'}">▍</span>` : ''}</p>`).join('');
  const hd = $('#read-sec-hd');
  if (hd) {
    hd.style.opacity = on ? '' : '0';
    hd.style.animation = on ? 'fadein .5s ease 1.8s both' : '';
  }
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

// ── dbt DAG: nodes tile in by tier, edges draw then flow ─────
const DAG_NODES = [
  { x: '2%', y: '6%', t: 'lab', d: 0, text: 'Source' },
  { x: '2%', y: '79%', t: 'src', d: 0.05, text: 'instacart.orders' },
  { x: '25%', y: '6%', t: 'lab', d: 0.3, text: 'Staging · 5 models' },
  { x: '25%', y: '14%', t: 'stg', d: 0.35, text: 'stg_order_products' },
  { x: '25%', y: '29%', t: 'stg', d: 0.41, text: 'stg_products' },
  { x: '25%', y: '44%', t: 'stg', d: 0.47, text: 'stg_aisles' },
  { x: '25%', y: '59%', t: 'stg', d: 0.53, text: 'stg_departments' },
  { x: '25%', y: '79%', t: 'stg', d: 0.59, text: 'stg_orders' },
  { x: '52%', y: '24%', t: 'lab', d: 1.0, text: 'Intermediate' },
  { x: '52%', y: '32%', t: 'int', d: 1.05, text: 'int_order_products_joined' },
  { x: '52%', y: '79%', t: 'int', d: 1.12, text: 'fct_orders' },
  { x: '82%', y: '24%', t: 'lab', d: 1.5, text: 'Marts' },
  { x: '82%', y: '32%', t: 'mart', d: 1.55, text: 'dim_products' },
  { x: '82%', y: '79%', t: 'mart', d: 1.62, text: 'dim_users' },
];

function renderDag(on) {
  const curve = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  };
  // The real lineage: orders → stg_orders; four staging models → int;
  // int → dim_products; stg_orders + int → fct_orders → dim_users.
  const edges = [
    [11.5, 82, 24, 82, 0],
    [36, 17, 51, 36, 1], [36, 32, 51, 36, 1], [36, 47, 51, 36, 1], [36, 62, 51, 36, 1], [36, 82, 51, 82, 1],
    [64.5, 36, 81, 36, 2], [62, 41, 52.5, 77, 2], [58.5, 82, 81, 82, 2],
  ];
  const paths = edges.map((e, i) => {
    const d = curve(e[0], e[1], e[2], e[3]);
    const delay = 0.45 + e[4] * 0.35 + i * 0.04;
    return `<g>
      <path d="${d}" fill="none" stroke="#1a6b5a" stroke-width="0.34" pathLength="1" stroke-dasharray="1" style="${on ? `animation:dagdraw 1s ease ${delay.toFixed(2)}s both` : 'opacity:0'}"/>
      <path d="${d}" fill="none" stroke="#1a6b5a" stroke-width="0.28" opacity="0.55" stroke-dasharray="1.6 1.2" style="${on ? `animation:fadein .4s ease ${(delay + 0.8).toFixed(2)}s both,dagflow 1.4s linear ${(delay + 0.8).toFixed(2)}s infinite` : 'opacity:0'}"/>
    </g>`;
  }).join('');
  const kindClass = { lab: 'dag__tier', src: 'dag__node dag__node--src', stg: 'dag__node', int: 'dag__node dag__node--int', mart: 'dag__node dag__node--mart' };
  const nodes = DAG_NODES.map((n) => `
    <span class="${kindClass[n.t]}" style="left:${n.x};top:${n.y};${on
      ? `animation:${n.t === 'lab' ? 'fadein .5s ease ' : 'tilein .5s cubic-bezier(.34,1.15,.64,1) '}${n.d.toFixed(2)}s both`
      : 'opacity:0'}">${n.text}</span>`).join('');
  $('#dag').innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none">${paths}</svg>${nodes}`;
}

// ── ATX choropleth ───────────────────────────────────────────
// Continuous color ramp — every tile gets its own shade, so the map
// reads as a gradient instead of three flat buckets. `dark` flags
// tiles light enough to need dark label ink.
function zipRamp(score) {
  const stops = [[88.7, [15, 110, 86]], [89.6, [60, 145, 121]], [90.6, [143, 195, 174]], [91.0, [226, 178, 92]], [91.7, [217, 119, 6]]];
  const v = Math.max(stops[0][0], Math.min(stops[stops.length - 1][0], score));
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (v >= stops[i][0] && v <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
  }
  const t = b[0] === a[0] ? 0 : (v - a[0]) / (b[0] - a[0]);
  const c = a[1].map((ch, i) => Math.round(ch + (b[1][i] - ch) * t));
  return { fill: `rgb(${c.join(',')})`, dark: c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114 > 150 };
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

function zipMapSvg(on) {
  const W = 360, H = 430;
  const grid = zipLattice();
  const skip = { '0-0': 1, '0-3': 1, '4-3': 1 };
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
  // Tiles enter in score order — best zip first — so the reveal itself
  // ranks the map before you read a single number.
  const rank = {};
  tiles.slice().sort((a, b) => a.z.score - b.z.score).forEach((t, i) => { rank[t.z.zip] = i; });
  const gate = (name, delay, timing) => on ? `animation:${name} ${timing || '.5s ease'} ${delay.toFixed(2)}s both` : 'opacity:0';
  const fills = tiles.map((t) => `
    <polygon points="${t.pts}" fill="${zipRamp(t.z.score).fill}" stroke="#fbf9f3" stroke-width="2"
      style="${gate('tilein', 0.08 + rank[t.z.zip] * 0.055, '.5s cubic-bezier(.34,1.15,.64,1)')}"><title>${t.z.zip} · ${esc(t.z.label)} · ${t.z.score.toFixed(1)} avg score</title></polygon>`).join('');
  const labels = tiles.map((t) => {
    const ink = zipRamp(t.z.score).dark ? 'rgba(22,42,36,.92)' : 'rgba(255,255,255,.95)';
    return `
    <g style="${gate('fadein', 0.38 + rank[t.z.zip] * 0.055, '.45s ease')}">
      <text x="${t.cx.toFixed(1)}" y="${(t.cy - 4).toFixed(1)}" text-anchor="middle" style="font:500 10.5px 'IBM Plex Mono',monospace;letter-spacing:.02em;fill:${ink}">${t.z.zip}</text>
      <text x="${t.cx.toFixed(1)}" y="${(t.cy + 15).toFixed(1)}" text-anchor="middle" style="font:300 20px Newsreader,Georgia,serif;fill:${ink}">${t.z.score.toFixed(1)}</text>
    </g>`;
  }).join('');
  return `<a class="zipmap-link" href="https://www.kaggle.com/code/samievargas/atx-foodie-inspection" target="_blank" rel="noopener noreferrer">
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Choropleth of average Austin food-inspection score across 17 zip codes — opens the pannable version">
    <defs>
      <linearGradient id="riverfade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#8fb9b0" stop-opacity="0.4"/>
        <stop offset="45%" stop-color="#7ba9a0" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#8fb9b0" stop-opacity="0.4"/>
      </linearGradient>
    </defs>
    <g>${fills}</g>
    <path d="${river}" fill="none" stroke="#f8f6ef" stroke-width="7" stroke-linecap="round" style="${gate('fadein', 1.15)}"/>
    <path d="${river}" fill="none" stroke="url(#riverfade)" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="1" style="${on ? 'animation:linedraw 1.1s cubic-bezier(.4,0,.2,1) 1.15s both' : 'opacity:0'}"/>
    <g pointer-events="none">${labels}</g>
    <g pointer-events="none" style="${gate('fadein', 1.5)}">
      <circle cx="${W - 27}" cy="27" r="13" fill="rgba(251,249,243,.94)"/>
      <path d="M${W - 27},18 l4,12 l-4,-3 l-4,3 z" fill="#1a6b5a"/>
    </g>
  </svg>
  <div class="zipmap-link__foot" style="${gate('fadein', 1.6)}">
    <span>17 zips · city avg 90.6</span>
    <span class="zipmap-pill">Open the pannable version ↗</span>
  </div>
</a>`;
}

// ── Instacart reorder viz: scorecards count up, charts build ─
let reorderT = 0;
let reorderTimer;

function reorderVals() {
  const t = 1 - Math.pow(1 - Math.min(1, reorderT), 3);
  return [
    `${(3.4 * t).toFixed(1)}M`,
    `${(11.5 * t).toFixed(1)}%`,
    t >= 1 ? '0.6' : (0.6 * t).toFixed(2),
  ];
}

// The counting mutates the value spans in place — re-rendering the
// block would replay every entrance animation on each tick.
function startReorderCount() {
  clearInterval(reorderTimer);
  reorderTimer = setInterval(() => {
    if (reorderT >= 1) { clearInterval(reorderTimer); return; }
    reorderT = Math.min(1, reorderT + 0.05);
    const vals = reorderVals();
    document.querySelectorAll('[data-rv]').forEach((el) => { el.textContent = vals[Number(el.dataset.rv)]; });
  }, 40);
}

function reorderVizHtml(on) {
  const mono = "'IBM Plex Mono',monospace";
  const anim = (name, delay, timing) => on ? `animation:${name} ${timing || '.5s ease'} ${delay.toFixed(2)}s both` : 'opacity:0';
  const vals = reorderVals();
  const cardKeys = ['Total orders analyzed', 'Repeat orders w/ 30+ day gap', 'Avg reorder ratio'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayV = [0.592, 0.607, 0.6, 0.598, 0.601, 0.606, 0.591];
  const hrs = [10.15, 10.05, 9.95, 10.1, 10.4, 9.8, 10.05, 10.2, 10.25, 10.2, 10.15, 10.2, 10.25, 10.2, 10.15, 10.1, 10.05, 9.95, 9.7, 9.65, 9.9, 10.5, 11, 10.75];
  const LW = 300, LH = 150, padL = 24, padR = 8, padT = 16, padB = 20;
  const xAt = (i) => padL + (i / (hrs.length - 1)) * (LW - padL - padR);
  const yAt = (v) => padT + ((11.6 - v) / (11.6 - 9.3)) * (LH - padT - padB);
  const lineD = `M${hrs.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' L')}`;
  const areaD = `${lineD} L${xAt(hrs.length - 1).toFixed(1)},${LH - padB} L${padL},${LH - padB} Z`;
  const ticksX = [[0, '12a'], [4, '4a'], [8, '8a'], [12, '12p'], [16, '4p'], [20, '8p'], [23, '11p']];
  const titleS = `margin:0 0 10px;font:400 10px ${mono};letter-spacing:.14em;text-transform:uppercase;color:#16150f`;
  const noteS = `margin:10px 0 0;font:400 9.5px ${mono};letter-spacing:.06em;color:#9a9686;line-height:1.5`;
  return `<div style="padding:18px 20px 16px">
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:1px solid #16150f;padding-bottom:10px;margin-bottom:14px;${anim('fadein', 0)}">
      <span style="font:400 10px ${mono};letter-spacing:.16em;text-transform:uppercase">Reorder behavior · key findings</span>
      <span style="font:400 9px ${mono};letter-spacing:.1em;text-transform:uppercase;color:#9a9686">Rebuilt live from the Looker report</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px">
      ${cardKeys.map((k, i) => `
      <div style="background:#1a6b5a;color:#fbf9f3;padding:11px 13px 10px;${anim('tilein', 0.1 + i * 0.12, '.5s cubic-bezier(.34,1.15,.64,1)')}">
        <span style="display:block;font:400 8.5px ${mono};letter-spacing:.1em;text-transform:uppercase;color:rgba(251,249,243,.72);margin-bottom:6px;min-height:24px">${esc(k)}</span>
        <span data-rv="${i}" style="font:300 30px/1 Newsreader,Georgia,serif">${vals[i]}</span>
      </div>`).join('')}
    </div>
    <p style="margin:0 0 16px;font-size:12.5px;line-height:1.6;color:#6d6a5c;${anim('driftup', 0.5)}">On average, 6 out of every 10 items in an Instacart order are something the customer has bought before, but that average hides a 3x difference by user tenure.</p>
    <div style="display:grid;grid-template-columns:1fr 1.15fr;gap:20px;align-items:start">
      <div>
        <p style="${titleS};${anim('fadein', 0.55)}">Reorder rate by day of week</p>
        <div style="position:relative;height:118px;border-bottom:1px solid #c9c3b1">
          <div style="position:absolute;left:0;width:100%;bottom:25%;border-top:1px solid #eeebe1;${anim('fadein', 0.6)}"></div>
          <div style="position:absolute;left:0;width:100%;bottom:50%;border-top:1px solid #eeebe1;${anim('fadein', 0.6)}"></div>
          <div style="position:absolute;left:0;width:100%;top:0;border-top:1px solid #eeebe1;${anim('fadein', 0.6)}"></div>
          <div style="position:absolute;inset:0 2px;display:flex;align-items:flex-end;gap:7px">
            ${dayV.map((v, i) => `<div style="flex:1;height:${(v / 0.8 * 100).toFixed(1)}%;background:#1a6b5a;${anim('growup', 0.65 + i * 0.07, '.55s cubic-bezier(.4,0,.2,1)')}"></div>`).join('')}
          </div>
          <div style="position:absolute;left:0;width:100%;bottom:75%;border-top:1px dashed #16150f;${anim('dashin', 1.45, '.6s ease')}">
            <span style="position:absolute;right:0;top:-13px;font:400 8px ${mono};letter-spacing:.08em;color:#16150f">AVG 0.6</span>
          </div>
        </div>
        <div style="display:flex;gap:7px;padding:5px 2px 0">
          ${days.map((d, i) => `<span style="flex:1;text-align:center;font:400 8.5px ${mono};color:#9a9686;${anim('fadein', 0.75 + i * 0.05)}">${d}</span>`).join('')}
        </div>
        <p style="${noteS};${anim('fadein', 1.6)}">Note: flat across all days</p>
      </div>
      <div>
        <p style="${titleS};${anim('fadein', 0.8)}">When people shop</p>
        <svg viewBox="0 0 ${LW} ${LH}" style="display:block;width:100%">
          ${[10, 11].map((v) => `
          <g style="${anim('fadein', 0.85)}">
            <line x1="${padL}" x2="${LW - padR}" y1="${yAt(v).toFixed(1)}" y2="${yAt(v).toFixed(1)}" stroke="#eeebe1" stroke-width="1"/>
            <text x="${padL - 5}" y="${(yAt(v) + 2.5).toFixed(1)}" text-anchor="end" style="font:400 8px ${mono};fill:#9a9686">${v}</text>
          </g>`).join('')}
          <line x1="${padL}" x2="${LW - padR}" y1="${LH - padB}" y2="${LH - padB}" stroke="#c9c3b1" stroke-width="1" style="${anim('fadein', 0.85)}"/>
          <path d="${areaD}" fill="rgba(26,107,90,.09)" style="${anim('fadein', 2, '.6s ease')}"/>
          <path d="${lineD}" fill="none" stroke="#1a6b5a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" style="${anim('linedraw', 1, '1.4s cubic-bezier(.4,0,.2,1)')}"/>
          <g style="${anim('fadein', 2.25)}">
            <circle cx="${xAt(22).toFixed(1)}" cy="${yAt(11).toFixed(1)}" r="3.2" fill="#1a6b5a" stroke="#fff" stroke-width="1.4"/>
            <text x="${(xAt(22) - 7).toFixed(1)}" y="${(yAt(11) - 7).toFixed(1)}" text-anchor="end" style="font:500 8.5px ${mono};letter-spacing:.04em;fill:#16150f">9–10p spike</text>
          </g>
          ${ticksX.map((tk, i) => `<text x="${xAt(tk[0]).toFixed(1)}" y="${LH - 7}" text-anchor="${tk[0] === 0 ? 'start' : (tk[0] === 23 ? 'end' : 'middle')}" style="font:400 8px ${mono};fill:#9a9686;${anim('fadein', 1.1 + i * 0.05)}">${tk[1]}</text>`).join('')}
        </svg>
        <p style="${noteS};${anim('fadein', 2.35)}">Note: late evening spike at 9 to 10pm, the largest orders of the day</p>
      </div>
    </div>
  </div>`;
}

// ── ATX operational drift: the inverted-axis line, drawn live ─
function driftVizHtml(on) {
  const mono = "'IBM Plex Mono',monospace";
  const anim = (name, delay, timing) => on ? `animation:${name} ${timing || '.5s ease'} ${delay.toFixed(2)}s both` : 'opacity:0';
  const vals = [90.5, 90.6, 90.55, 91.05, 91.15, 89.8, 90.1, 90.85, 90.5, 91.8, 91.15, 90.9, 91.3, 92.6];
  const W = 340, H = 185, padL = 28, padR = 10, padT = 22, padB = 24;
  const xAt = (i) => padL + (i / (vals.length - 1)) * (W - padL - padR);
  const yAt = (v) => padT + ((v - 89.4) / (93.2 - 89.4)) * (H - padT - padB);
  const lineD = `M${vals.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(' L')}`;
  const areaD = `${lineD} L${xAt(vals.length - 1).toFixed(1)},${H - padB} L${padL},${H - padB} Z`;
  return `<div style="padding:14px 16px 10px">
    <div style="display:flex;justify-content:space-between;gap:12px;margin-bottom:8px;${anim('fadein', 0)}">
      <span style="font:400 8.5px ${mono};letter-spacing:.1em;text-transform:uppercase;color:#9a9686">Avg score · axis inverted</span>
      <span style="font:500 8.5px ${mono};letter-spacing:.1em;text-transform:uppercase;color:#b45309">↓ falling = more violations</span>
    </div>
    <svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%">
      ${[90, 91, 92, 93].map((v) => `
      <g style="${anim('fadein', 0.1)}">
        <line x1="${padL}" x2="${W - padR}" y1="${yAt(v).toFixed(1)}" y2="${yAt(v).toFixed(1)}" stroke="#eeebe1" stroke-width="1"/>
        <text x="${padL - 5}" y="${(yAt(v) + 2.5).toFixed(1)}" text-anchor="end" style="font:400 8px ${mono};fill:#9a9686">${v}</text>
      </g>`).join('')}
      <path d="${areaD}" fill="rgba(26,107,90,.08)" style="${anim('fadein', 1.5, '.6s ease')}"/>
      <path d="${lineD}" fill="none" stroke="#1a6b5a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" style="${anim('linedraw', 0.25, '1.3s cubic-bezier(.4,0,.2,1)')}"/>
      ${vals.map((v, i) => `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="2.6" fill="#1a6b5a" stroke="#fff" stroke-width="1" style="${anim('fadein', 0.3 + i * 0.085, '.3s ease')}"/>`).join('')}
      <g style="${anim('fadein', 1.55)}"><text x="${(xAt(0) + 7).toFixed(1)}" y="${(yAt(90.5) - 8).toFixed(1)}" style="font:400 8.5px ${mono};fill:#9a9686">Inspection 1: 90.5</text></g>
      <g style="${anim('fadein', 1.7)}"><text x="${(xAt(13) - 8).toFixed(1)}" y="${(yAt(92.6) + 8).toFixed(1)}" text-anchor="end" style="font:500 8.5px ${mono};fill:#b45309">Inspection 14: 92.6</text></g>
      ${[2, 4, 6, 8, 10, 12, 14].map((n) => `<text x="${xAt(n - 1).toFixed(1)}" y="${H - 7}" text-anchor="middle" style="font:400 8px ${mono};fill:#9a9686;${anim('fadein', 0.6 + n * 0.03)}">${n}</text>`).join('')}
    </svg>
    <p style="margin:2px 0 0;text-align:center;font:400 8.5px ${mono};letter-spacing:.08em;color:#9a9686;${anim('fadein', 1.8)}">Inspection number (proxy for operational age)</p>
  </div>`;
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
        <div class="annotated__shot"${p.vizId ? ` id="${p.vizId}"` : ''} style="order:${p.imgFirst ? 1 : 2}">${p.viz === 'reorder' ? reorderVizHtml(gates.instaIn) : (p.img ? `<img src="${p.img}" alt="${esc(p.alt)}">` : zipMapSvg(gates.atxIn))}</div>
        <div style="order:${p.imgFirst ? 2 : 1}">
          <p class="input-line">${esc(p.inputLine)}</p>
          ${p.notes.map((c) => `
            <div class="callout">
              <span>${c.n}</span>
              <div><strong>${esc(c.title)}</strong><span class="callout__body">${esc(c.body)}</span></div>
            </div>`).join('')}
          <p class="finding"><strong>What it found: </strong>${esc(p.finding)}</p>
        </div>
      </div>
      ${p.isAtx ? `
      <div class="choro">
        <div>
          <span class="label label--accent" style="letter-spacing:.14em;display:block;margin-bottom:12px">Operational drift · avg score by inspection sequence</span>
          <div id="viz-drift" style="border:1px solid var(--rule);background:#fff">${driftVizHtml(gates.driftIn)}</div>
          <p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:var(--ink-soft);max-width:60ch">I inverted the axis so the line falling is the bad direction, and venues do not converge on compliance as they get inspected more, they drift away from it, which is the part a scorecard alone never shows.</p>
        </div>
        <div class="choro__body">
          <span class="label label--accent">Reading the map above · city avg 90.6</span>
          <p style="max-width:48ch">I mapped seventeen high-restaurant-density zips where lower means fewer violations, so the dark tiles are the good ones, South Congress at 88.7 and Rundberg and South Lamar at 88.8, while Crestview and North Burnet sit a full point above the city average.</p>
          <div class="choro-legend">
            <span>Score · lower is better · shade tracks score</span>
            <span class="swatch"><i style="background:#0f6e56"></i><span>≤ 89.0 · best</span></span>
            <span class="swatch"><i style="background:linear-gradient(90deg,#3c9179,#8fc3ae)"></i><span>89.0 – 90.6</span></span>
            <span class="swatch"><i style="background:linear-gradient(90deg,#e2b25c,#d97706)"></i><span>&gt; 90.6 · highest scrutiny</span></span>
          </div>
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

// ── Skills: staggered reveal, typed line, auto-cycle ─────────
let skillTab = 0;
let skillsAuto = true;
let tabEls = [];
let skillTypeTimer;

function renderSkillTabs(on) {
  const host = $('#skill-tabs');
  host.innerHTML = SKILLS.map((g, i) =>
    `<button type="button" role="tab" class="${i === skillTab ? 'is-on' : ''}" data-tab="${i}" aria-selected="${i === skillTab}"
      style="${on ? `animation:driftup .5s ease ${(i * 0.07).toFixed(2)}s both` : 'opacity:0'}">${esc(g.label)}</button>`).join('')
    + `<i class="indicator" style="${on ? 'animation:fadein .4s ease .35s both' : 'opacity:0'}"></i>`;
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

function typeSkillLine() {
  clearInterval(skillTypeTimer);
  const typed = $('#skill-typed');
  const cursor = $('#skill-cursor');
  const full = SKILLS[skillTab].line;
  if (!gates.skillsIn) { typed.textContent = ''; cursor.hidden = true; return; }
  if (REDUCED) { typed.textContent = full; cursor.hidden = true; return; }
  let len = 0;
  typed.textContent = '';
  cursor.hidden = false;
  skillTypeTimer = setInterval(() => {
    len = Math.min(full.length, len + 2);
    typed.textContent = full.slice(0, len);
    if (len >= full.length) { clearInterval(skillTypeTimer); cursor.hidden = true; }
  }, 30);
}

function setSkillTab(i) {
  skillTab = i;
  tabEls.forEach((t, ti) => {
    t.classList.toggle('is-on', ti === skillTab);
    t.setAttribute('aria-selected', String(ti === skillTab));
  });
  measureTab();
  typeSkillLine();
}

function wireSkills() {
  $('#skill-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    skillsAuto = false;
    setSkillTab(Number(btn.dataset.tab));
  });
  window.addEventListener('resize', measureTab);
  // Re-measure once the mono font loads and tab widths settle.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureTab);
  if (!REDUCED) {
    setInterval(() => {
      if (skillsAuto && gates.skillsIn) setSkillTab((skillTab + 1) % SKILLS.length);
    }, 5000);
  }
}

function renderCerts(on) {
  $('#certs').innerHTML = CERTS.map((c, i) => `
    <div class="cert" style="${on ? `animation:crossfade .5s ease ${(0.15 + i * 0.12).toFixed(2)}s both` : 'opacity:0'}">
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
let obsAuto = true;
let scrubTimer, scrubEndTimer, scrubActive = false, scrubbed = false;

function stopScrub() {
  clearInterval(scrubTimer);
  clearTimeout(scrubEndTimer);
  scrubActive = false;
}

// Once the section is in view, walk the chart's days by itself, then let go.
function maybeAutoScrub() {
  if (REDUCED || scrubbed || !gates.notesIn || !OBSERVATIONS[obsIdx].chart) return;
  scrubbed = true;
  scrubActive = true;
  const days = OBSERVATIONS[obsIdx].chart.days.length;
  scrubTimer = setInterval(() => {
    const n = dayIdx + 1;
    if (n >= days) {
      clearInterval(scrubTimer);
      scrubActive = false;
      scrubEndTimer = setTimeout(() => { dayIdx = -1; updateChartReadout(); }, 1400);
      return;
    }
    dayIdx = n;
    updateChartReadout();
  }, 650);
}

function reanimate(el, anim) {
  el.style.animation = 'none';
  void el.offsetHeight;
  el.style.animation = gates.notesIn && !REDUCED ? anim : '';
  if (!gates.notesIn && !REDUCED) el.style.opacity = '0';
  else el.style.opacity = '';
}

function renderObs() {
  const o = OBSERVATIONS[obsIdx];
  $('#obs-tag').textContent = o.tag;
  $('#obs-title').textContent = o.title;
  reanimate($('#obs-title'), 'crossfade .45s ease both');
  $('#obs-counter').textContent = `${obsIdx + 1} of ${OBSERVATIONS.length}`;
  $('#obs-body').innerHTML = o.paragraphs.map((p, i) => `<p style="${gates.notesIn ? `animation:driftup .55s ease ${(0.1 + i * 0.12).toFixed(2)}s both` : 'opacity:0'}">${esc(p)}</p>`).join('');
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
    <div class="chart" style="${gates.notesIn ? 'animation:crossfade .5s ease both' : 'opacity:0'}">
      <div class="chart__head">
        <span class="label label--accent">${esc(chart.title)}</span>
        <span class="label label--mid">${esc(chart.hint)}</span>
      </div>
      <div class="chart__bars">
        ${chart.days.map((d, i) => `
          <button type="button" data-day="${i}" aria-label="${esc(d.d)}: ${d.v}" class="${d.v <= 10 ? 'is-low' : ''}">
            <i style="height:${Math.max(4, Math.round((d.v / chart.max) * 100))}%;${gates.notesIn ? `--d:${(i * 0.07).toFixed(2)}s` : 'opacity:0;animation:none'}"></i>
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
  const step = (dir, manual) => {
    if (manual) { stopScrub(); obsAuto = false; }
    obsIdx = (obsIdx + dir + OBSERVATIONS.length) % OBSERVATIONS.length;
    dayIdx = -1;
    renderObs();
    maybeAutoScrub();
  };
  $('#obs-prev').addEventListener('click', () => step(-1, true));
  $('#obs-next').addEventListener('click', () => step(1, true));
  $('#obs-dots').addEventListener('click', (e) => {
    const dot = e.target.closest('[data-obs]');
    if (!dot) return;
    stopScrub();
    obsAuto = false;
    obsIdx = Number(dot.dataset.obs);
    dayIdx = -1;
    renderObs();
    maybeAutoScrub();
  });
  const scrub = (e) => {
    const bar = e.target.closest('[data-day]');
    if (!bar) return;
    stopScrub();
    obsAuto = false;
    dayIdx = Number(bar.dataset.day);
    updateChartReadout();
  };
  $('#obs-chart').addEventListener('mouseover', scrub);
  $('#obs-chart').addEventListener('click', scrub);
  $('#obs-chart').addEventListener('mouseleave', () => {
    if (dayIdx > -1 && !scrubActive) { dayIdx = -1; updateChartReadout(); }
  });
  if (!REDUCED) {
    setInterval(() => {
      if (obsAuto && gates.notesIn && !scrubActive) step(1, false);
    }, 8000);
  }
}

// ── Life teaser + contact ────────────────────────────────────
let lifeT = 0;
let lifeCountTimer;

function teaserValue(l) {
  if (l.k === 'Running') return `${Math.round(15 * lifeT)} of 21 miles on the Greenbelt`;
  if (l.k === 'Tarot') return `Seven decks, every pull logged across ${Math.round(78 * lifeT)} cards`;
  return l.v;
}

function renderLifeTeasers(on) {
  $('#life-teasers').innerHTML = LIFE_TEASERS.map((l, i) => `
    <div style="${on ? `animation:tilein .5s cubic-bezier(.34,1.15,.64,1) ${(0.15 + i * 0.1).toFixed(2)}s both` : 'opacity:0'}">
      <span class="label">${esc(l.k)}</span><p data-teaser="${i}">${esc(teaserValue(l))}</p>
    </div>`).join('');
  $('#life-intro').style.cssText = on ? 'animation:driftup .6s ease both' : (REDUCED ? '' : 'opacity:0');
}

// The Greenbelt miles and the 78 cards count up as the section arrives.
function startLifeCount() {
  if (REDUCED) { lifeT = 1; }
  clearInterval(lifeCountTimer);
  lifeCountTimer = setInterval(() => {
    if (lifeT >= 1) { clearInterval(lifeCountTimer); return; }
    lifeT = Math.min(1, lifeT + 0.06);
    LIFE_TEASERS.forEach((l, i) => {
      const el = document.querySelector(`[data-teaser="${i}"]`);
      if (el) el.textContent = teaserValue(l);
    });
  }, 45);
}

function renderContactLinks() {
  $('#contact-links').innerHTML = CONTACT_LINKS.map((l) => `
    <a href="${l.href}">
      <span class="label">${esc(l.label)}</span>
      <span class="value">${esc(l.value)}</span>
    </a>`).join('');
}

// ── Arcade ticker + Konami cheat ─────────────────────────────
function wireArcadeTicker() {
  const el = $('#arcade-ticker');
  if (!el || REDUCED) return;
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % ARCADE_TITLES.length;
    el.textContent = `${ARCADE_TITLES[idx]}.`;
  }, 2200);
}

function wireKonami() {
  const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let seq = [];
  let overlays = [];
  let t1, t2;
  window.addEventListener('keydown', (e) => {
    seq.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    if (seq.length > K.length) seq.shift();
    if (seq.length !== K.length || !K.every((k, i) => seq[i] === k)) return;
    seq = [];
    overlays.forEach((o) => o.remove());
    const scan = document.createElement('div');
    scan.style.cssText = 'position:fixed;inset:0;z-index:500;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(18,19,15,.32) 0px,rgba(18,19,15,.32) 3px,transparent 3px,transparent 6px);animation:blink .16s steps(2,start) 14';
    const vig = document.createElement('div');
    vig.style.cssText = 'position:fixed;inset:0;z-index:499;pointer-events:none;background:radial-gradient(ellipse at center,rgba(63,174,143,.12) 0%,rgba(18,19,15,.38) 100%)';
    const toast = document.createElement('div');
    toast.style.cssText = "position:fixed;left:50%;top:78px;transform:translateX(-50%);z-index:501;background:#12130f;color:#3fae8f;font:500 12px 'IBM Plex Mono',monospace;letter-spacing:.26em;padding:12px 22px;border:1px solid #3fae8f;animation:driftup .3s ease";
    toast.textContent = '+30 CREDITS · CHEAT ACCEPTED';
    overlays = [scan, vig, toast];
    overlays.forEach((o) => document.body.appendChild(o));
    clearTimeout(t1); clearTimeout(t2);
    t1 = setTimeout(() => { scan.remove(); vig.remove(); }, 2400);
    t2 = setTimeout(() => toast.remove(), 4500);
  });
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
renderContactRead(false);
renderDumpBits();
renderStates();
renderPiles();
renderDag(false);
renderAnnotated();
renderRailTicks();
renderRoles();
renderSkillTabs(false);
renderCerts(false);
renderObs();
renderLifeTeasers(false);
renderContactLinks();
if (!REDUCED) { const ab = $('#alsobuilt'); if (ab) ab.style.opacity = '0'; }

wireBrainDump();
wireRoles();
wireSkills();
wireObs();
wireCopyEmail();
wireArcadeTicker();
wireKonami();
watchSignal();
watchExperience();

watchGate('work', 'workIn', () => renderDag(true));
watchGate('viz-read', 'readIn', () => renderContactRead(true));
watchGate('viz-reorder', 'instaIn', () => {
  if (REDUCED) reorderT = 1;
  $('#viz-reorder').innerHTML = reorderVizHtml(true);
  if (!REDUCED) startReorderCount();
});
watchGate('viz-atx', 'atxIn', () => { $('#viz-atx').innerHTML = zipMapSvg(true); });
watchGate('viz-drift', 'driftIn', () => { $('#viz-drift').innerHTML = driftVizHtml(true); });
watchGate('skills', 'skillsIn', () => { renderSkillTabs(true); renderCerts(true); typeSkillLine(); });
watchGate('notes', 'notesIn', () => { renderObs(); maybeAutoScrub(); });
watchGate('life', 'lifeIn', () => { renderLifeTeasers(true); startLifeCount(); });
watchGate('alsobuilt', 'alsoIn', () => {
  const ab = $('#alsobuilt');
  ab.style.opacity = '';
  ab.style.animation = REDUCED ? '' : 'driftup .6s ease .1s both';
});
