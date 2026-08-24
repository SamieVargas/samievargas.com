// ============================================================
// js/life.js
// /life — the field (with its little visualizations), the
// raccoon receipt, the record crate and turntable, the Christie
// ledger, and the eq card. Content lives in data/content.js.
// Sections choreograph their entrance when they scroll into view.
// ============================================================

import {
  LIFE_FIELD, LIFE_RELATED, INVOICE_ROWS, RACCOON_LIFE, PROGRESS,
  PLACES, LIFE_FACTS, RECORDS, CHRISTIE,
} from '../data/content.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_IO = 'IntersectionObserver' in window;
const RATING_COLORS = { 5: '#0f6e56', 4: '#4daa91', 3: '#d97706', 2: '#b4552f' };

const gates = { progIn: false, racIn: false, eatIn: false, rotIn: false, recIn: false, chrIn: false };

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

// ── The field: little visualizations for the note-only items ─
const MONO = (fs, c) => `font:400 ${fs}px 'IBM Plex Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:${c || '#77735f'}`;
const wrapViz = (inner, gap) => `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${gap || 16}px;padding:20px">${inner}</div>`;
const vizCap = (t) => `<span style="${MONO(9)};text-align:center;line-height:1.8">${t}</span>`;
const vizTile = (bg, big, small) => `<div style="width:108px;height:108px;background:${bg};padding:10px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)">
  <span style="font:italic 300 16px/1.15 Newsreader,Georgia,serif;color:rgba(251,249,243,.95)">${big}</span>
  <span style="${MONO(7, 'rgba(251,249,243,.6)')}">${small}</span></div>`;

function fieldViz(sel) {
  switch (sel.id) {
    case 'greenbelt':
      return `<div style="width:100%;height:100%;position:relative"><svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" style="position:absolute;inset:0;width:100%;height:100%">
        <path d="M10,200 C90,150 150,190 220,130 C280,85 320,105 355,60" fill="none" stroke="#8fb9b0" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
        <path d="M20,180 C80,120 140,160 200,110 C260,70 300,90 340,50" fill="none" stroke="#9a9686" stroke-width="2" stroke-dasharray="4 5"/>
        <path d="M20,180 C80,120 140,160 200,110 C260,70 300,90 340,50" fill="none" stroke="#1a6b5a" stroke-width="3.5" pathLength="1" stroke-dasharray="0.715 1" stroke-linecap="round"/>
        <circle cx="20" cy="180" r="4" fill="#16150f"/>
        <circle cx="258" cy="76" r="6" fill="#1a6b5a" style="animation:pulsegreen 2s ease-out infinite"/>
        <text x="16" y="204" fill="#77735f" style="font:400 8.5px 'IBM Plex Mono',monospace;letter-spacing:.08em">MILE 0 · ZILKER</text>
        <text x="196" y="58" fill="#1a6b5a" style="font:500 8.5px 'IBM Plex Mono',monospace;letter-spacing:.08em">MILE 15 — HERE</text>
        <text x="296" y="40" fill="#77735f" style="font:400 8.5px 'IBM Plex Mono',monospace;letter-spacing:.08em">MILE 21</text>
        <text x="30" y="152" fill="#8fb9b0" style="font:italic 400 9px Newsreader,Georgia,serif">Barton Creek</text>
      </svg></div>`;
    case 'raccoon':
      return wrapViz(`<div style="display:flex;align-items:flex-end;gap:3px;height:110px;width:80%">${RACCOON_LIFE.map((d) =>
        `<i style="flex:1;display:block;height:${Math.max(4, d.v)}%;background:${d.v <= 10 ? '#b4552f' : 'rgba(26,107,90,.5)'}"></i>`).join('')}</div>`
        + vizCap('BODY BATTERY · APR 24 – MAY 11 · ITEMIZED BELOW ↓'));
    case 'toothbrush':
      return wrapViz(`<div style="display:grid;grid-template-columns:repeat(4,34px);gap:5px">${Array.from({ length: 16 }, (_, i) =>
        `<i style="width:34px;height:34px;display:block;background:${(i === 12 || i === 15) ? '#b4552f' : `rgba(26,107,90,${(0.25 + ((i * 7) % 5) * 0.1).toFixed(2)})`}"></i>`).join('')}</div>`
        + vizCap('16 ZONES · THE BACK MOLARS WERE THE GAP'));
    case 'caesar':
      return wrapViz(`<div style="display:flex;flex-direction:column;gap:10px">${['Cold plate', 'No anchovy', 'Croutons that were bread yesterday'].map((t) =>
        `<span style="display:flex;align-items:center;gap:10px"><i style="width:13px;height:13px;border:1.5px solid #9a9686;display:block;flex:none"></i><span style="font:400 12px 'IBM Plex Mono',monospace;color:#3a382e">${t}</span></span>`).join('')}</div>`
        + vizCap('FOUND TOGETHER IN AUSTIN: 0 OF 3 · SEARCH CONTINUES'), 18);
    case 'poirot':
      return wrapViz(`<div style="display:flex;align-items:flex-end;gap:2px;height:96px;width:84%">${CHRISTIE.map((c) =>
        `<i style="flex:1;display:block;height:${c.r ? c.r * 20 : 8}%;background:${c.cur ? '#9a6c00' : c.u ? '#c9c3b4' : RATING_COLORS[c.r]}"></i>`).join('')}</div>`
        + vizCap('33 RATED · AVG 3.9 · THE FULL LEDGER IS BELOW ↓'));
    case 'journal':
      return wrapViz(`<div style="display:grid;grid-template-columns:repeat(16,10px);gap:4px">${Array.from({ length: 112 }, (_, i) =>
        `<i style="width:10px;height:10px;display:block;border-radius:2px;background:rgba(26,107,90,${(0.2 + ((i * 13) % 7) * 0.11).toFixed(2)})"></i>`).join('')}</div>`
        + vizCap('DAILY SINCE 2020 · IN AN APP I BUILT'));
    case 'knee':
      return wrapViz(`<div style="width:78%">
        <div style="position:relative;height:10px;background:#d8d3c4">
          <i style="position:absolute;left:0;top:0;bottom:0;width:71%;background:#1a6b5a;display:block"></i>
          <i style="position:absolute;left:71%;top:-5px;width:2px;height:20px;background:#b4552f;display:block"></i>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px">
          <span style="${MONO(8.5, '#1a6b5a')}">THE KNEE SAYS 15</span>
          <span style="${MONO(8.5)}">FITNESS SAYS 21</span>
        </div></div>`
        + vizCap('THE GATING FACTOR IS NOT CARDIO'), 20);
    case 'flipper':
      return wrapViz(`<div style="width:210px;height:130px;background-color:#e8e2d2;background-image:linear-gradient(90deg,#4a3a28 0 12px,rgba(0,0,0,0) 12px calc(100% - 12px),#4a3a28 calc(100% - 12px)),linear-gradient(180deg,#4a3a28 0 12px,rgba(0,0,0,0) 12px calc(100% - 12px),#4a3a28 calc(100% - 12px)),linear-gradient(52deg,rgba(0,0,0,0) 46%,#4a3a28 46% 54%,rgba(0,0,0,0) 54%),linear-gradient(-52deg,rgba(0,0,0,0) 46%,#4a3a28 46% 54%,rgba(0,0,0,0) 54%);box-shadow:0 8px 16px -8px rgba(22,21,15,.4)"></div>`
        + vizCap('HALF-TIMBERING · ACHIEVED, POINTLESSLY, WITH LOVE'));
    case 'matcha':
      return wrapViz(`<div style="display:flex;gap:34px;align-items:flex-end">
        <div style="text-align:center"><div style="width:58px;height:70px;border-radius:0 0 18px 18px;background:linear-gradient(180deg,#c9a97e 0 26%,#8a5a34 26%);box-shadow:inset 0 0 0 2px rgba(22,21,15,.15);margin:0 auto 8px"></div><span style="${MONO(7.5)}">BROWN SUGAR MISO</span></div>
        <div style="text-align:center"><div style="width:58px;height:70px;border-radius:0 0 18px 18px;background:linear-gradient(180deg,#d98a9e 0 34%,#a9c98a 34%);box-shadow:inset 0 0 0 2px rgba(22,21,15,.15);margin:0 auto 8px"></div><span style="${MONO(7.5)}">STRAWBERRY MATCHA</span></div></div>`
        + vizCap('THE DESNUDO ORDER · PICK A LANE'));
    case 'bobs':
      return wrapViz(`<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
        <i style="width:120px;height:30px;border-radius:60px 60px 8px 8px;background:#d9a441;display:block"></i>
        <i style="width:132px;height:8px;border-radius:4px;background:#7fae52;display:block"></i>
        <i style="width:124px;height:6px;border-radius:2px;background:#e8b23c;display:block"></i>
        <i style="width:126px;height:17px;border-radius:6px;background:#6b4426;display:block"></i>
        <i style="width:120px;height:18px;border-radius:6px 6px 18px 18px;background:#d9a441;display:block"></i></div>`
        + vizCap("BOB'S BURGERS · THE COMFORT STACK · NO REASON TO CHANGE"));
    case 'karaoke':
      return wrapViz(`<div style="width:250px;background:#16150f;padding:16px 18px">
        <p style="margin:0 0 10px;${MONO(8, '#3fae8f')}">UP NEXT · SAMIE</p>
        <p style="margin:0 0 6px;font:italic 300 15px Newsreader,Georgia,serif;color:#f7f5ee">1. Dancing Queen — ABBA</p>
        <p style="margin:0 0 6px;font:italic 300 15px Newsreader,Georgia,serif;color:#f7f5ee">2. Voulez-Vous — ABBA</p>
        <p style="margin:0;font:italic 300 15px Newsreader,Georgia,serif;color:#f7f5ee">3. Fishing in the Dark — NGDB</p></div>`
        + vizCap('THE SETLIST DOES NOT CHANGE'));
    case 'podcasts':
      return wrapViz(`<div style="display:flex;gap:12px">${vizTile('#c96018', '100% Eat', 'FORMERLY FACE JAM')}${vizTile('#2a4f68', 'Regulation', 'FORMERLY UNPRINTABLE')}</div>`
        + vizCap('THE COMEDY ROTATION'));
    case 'truecrime':
      return wrapViz(`<div style="display:flex;gap:12px">${vizTile('#1a6b5a', 'That Chapter', 'MIKE, OF COURSE')}${vizTile('#7c3444', 'Crime Junkie', 'FULL BODY CHILLS')}</div>`
        + vizCap('VICTIMS AS HUMANS, ALWAYS'));
    case 'leather':
      return wrapViz(`<div style="position:relative;width:170px;height:96px;background:#8a5a34;padding:18px 16px 14px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)">
        <i style="position:absolute;left:10px;top:10px;width:9px;height:9px;border-radius:50%;background:#eae6d9;display:block"></i>
        <i style="position:absolute;inset:5px;border:1.5px dashed rgba(251,249,243,.5);display:block"></i>
        <p style="margin:0 0 4px;text-align:center;${MONO(10.5, 'rgba(251,249,243,.95)')};letter-spacing:.18em">GENUINE LEATHER*</p>
        <p style="margin:0;text-align:center;font:italic 400 9.5px Newsreader,Georgia,serif;color:rgba(251,249,243,.7)">*legally, this means almost nothing</p></div>`
        + vizCap('THE RABBIT HOLE, SUMMARIZED'));
    case 'records':
      return wrapViz(`<div style="display:flex;align-items:flex-end;gap:3px;height:92px">${RECORDS.map((r, i) =>
        `<i style="width:11px;height:${78 + ((i * 29) % 22)}%;display:block;background:${r.c}"></i>`).join('')}</div>`
        + vizCap('SIXTEEN LPs · THE CRATE IS BELOW ↓'));
    case 'stickers':
      return wrapViz(`<div style="position:relative;width:240px;height:130px">${[
        ['PAPRIKA', '#b4552f', 6, 8, -6], ['DESNUDO', '#16150f', 120, 2, 4], ['TERRIBLE LOVE', '#7c3444', 44, 48, 3],
        ['BARTON SPRINGS', '#1a6b5a', 128, 84, -4], ['ATX', '#d97706', 10, 88, 7],
      ].map((p) => `<span style="position:absolute;left:${p[2]}px;top:${p[3]}px;transform:rotate(${p[4]}deg);background:${p[1]};padding:7px 12px;border-radius:14px;${MONO(8.5, '#fbf9f3')};box-shadow:0 3px 8px -3px rgba(22,21,15,.4)">${p[0]}</span>`).join('')}</div>`
        + vizCap('LAPTOP REAL ESTATE · EARNED, NOT BOUGHT'));
    default:
      return `<p style="margin:0;${MONO(10, '#8d8975')};text-align:center;max-width:30ch;line-height:1.9;padding:0 20px">Nothing to open — this one is just something I noticed</p>`;
  }
}

let sel = 'toothbrush';

function renderField() {
  const plot = $('#plot');
  const f = LIFE_FIELD.find((d) => d.id === sel) || LIFE_FIELD[0];
  const rel = LIFE_RELATED[f.id] || [];
  plot.querySelectorAll('.plot__pt').forEach((el) => el.remove());
  plot.insertAdjacentHTML('beforeend', LIFE_FIELD.map((p, pi) => {
    const on = p.id === sel, relOn = rel.includes(p.id), flip = parseFloat(p.x) > 50, art = !!p.art;
    const size = art ? (on ? 20 : 15) : 11;
    return `
    <button type="button" class="plot__pt${flip ? ' plot__pt--flip' : ''}${art ? ' plot__pt--art' : ''}${on ? ' is-on' : ''}"
            data-pt="${p.id}" style="left:${p.x};top:${p.y};z-index:${on ? 3 : art ? 2 : 1}" aria-label="${esc(p.title)}">
      <i style="width:${size}px;height:${size}px;animation:bob ${(3.2 + (pi % 5) * 0.4).toFixed(1)}s ease-in-out ${(pi * 0.22).toFixed(2)}s infinite${relOn ? ',pulsegreen 1.6s ease-out infinite' : ''};background:${art ? (on ? '#1a6b5a' : relOn ? 'rgba(26,107,90,.8)' : 'rgba(26,107,90,.5)') : relOn ? 'rgba(26,107,90,.18)' : 'transparent'};border-color:${art || relOn ? '#1a6b5a' : '#9a9686'}"></i>
      <span style="color:${on ? '#16150f' : relOn ? '#1a6b5a' : '#6d6a5c'}">${esc(p.short)}</span>
    </button>`;
  }).join(''));

  $('#plot-lines').innerHTML = rel.map((id) => {
    const t = LIFE_FIELD.find((d) => d.id === id);
    if (!t) return '';
    return `<line x1="${parseFloat(f.x)}" y1="${parseFloat(f.y)}" x2="${parseFloat(t.x)}" y2="${parseFloat(t.y)}"
      stroke="#1a6b5a" stroke-width="0.35" stroke-dasharray="2 1.6" opacity="0.5"/>`;
  }).join('');

  $('#field-card').innerHTML = `
    <div class="field__shot" style="background-image:${f.art ? `url('${f.art}')` : 'none'}">
      ${f.art ? '' : fieldViz(f)}
    </div>
    <div class="field__body">
      <div class="field__meta">
        <span class="label label--accent">${esc(f.kind)}</span>
        <span class="label label--mid">${esc(f.year)}</span>
      </div>
      <h3>${esc(f.title)}</h3>
      <p>${esc(f.line)}</p>
      ${f.art
        ? `<a class="btn btn--accent btn--md" href="${f.href}">${esc(f.linkLabel)}</a>`
        : '<p class="field__note">No link — just something I noticed</p>'}
    </div>`;
}

function wireField() {
  $('#plot').addEventListener('click', (e) => {
    const pt = e.target.closest('[data-pt]');
    if (!pt) return;
    sel = pt.dataset.pt;
    renderField();
  });
}

// ── In progress: bars fill, percentages count up ─────────────
let progT = 0;
let progTimer;

function renderProgress(on) {
  $('#progress-rows').innerHTML = PROGRESS.map((p, i) => `
    <div class="progress-row">
      <div>
        <span class="title">${esc(p.title)}</span>
        <span class="note">${esc(p.note)} · <span data-prog="${i}">${Math.round(p.pct * progT)}</span>%</span>
      </div>
      <span class="track"><i style="width:${p.pct}%;${on ? `--d:${(i * 0.12).toFixed(2)}s` : 'opacity:0;animation:none'}"></i></span>
    </div>`).join('');
}

function startProgressCount() {
  if (REDUCED) { progT = 1; renderProgress(true); return; }
  clearInterval(progTimer);
  progTimer = setInterval(() => {
    if (progT >= 1) { clearInterval(progTimer); return; }
    progT = Math.min(1, progT + 0.05);
    PROGRESS.forEach((p, i) => {
      const el = document.querySelector(`[data-prog="${i}"]`);
      if (el) el.textContent = Math.round(p.pct * progT);
    });
  }, 50);
}

// ── The raccoon receipt + battery chart ──────────────────────
let dayIdx = -1;
let scrubTimer, scrubEndTimer, scrubbed = false;

function renderInvoice(on) {
  $('#invoice-rows').innerHTML = INVOICE_ROWS.map((r, i) => r.sec
    ? `<span class="receipt__sec" style="${on ? `--d:${(i * 0.07).toFixed(2)}s` : 'opacity:0;animation:none'}">${esc(r.sec)}</span>`
    : `<div class="receipt__row" style="${on ? `--d:${(i * 0.07).toFixed(2)}s` : 'opacity:0;animation:none'}">
        <span class="item">${esc(r.item)}</span>
        <span class="qty${r.qty === '$0.00' ? ' qty--zero' : ''}">${esc(r.qty)}</span>
      </div>`).join('');
}

function renderBattery(on) {
  $('#battery').innerHTML = RACCOON_LIFE.map((d, i) => `
    <button type="button" data-day="${i}" aria-label="${esc(d.d)}: ${d.v}" class="${d.v <= 10 ? 'is-low' : ''}">
      <i style="height:${Math.max(4, d.v)}%;${on ? `--d:${(i * 0.07).toFixed(2)}s` : 'opacity:0;animation:none'}"></i>
    </button>`).join('');
  updateReadout();
}

function updateReadout() {
  $('#battery-readout').textContent = dayIdx > -1
    ? `${RACCOON_LIFE[dayIdx].d} — ${RACCOON_LIFE[dayIdx].v} — ${RACCOON_LIFE[dayIdx].note}`
    : 'Six days pinned at the floor, then eight more to climb back after the raccoons were already gone.';
  $('#battery').querySelectorAll('[data-day]').forEach((b, i) =>
    b.classList.toggle('is-on', i === dayIdx));
}

function stopScrub() { clearInterval(scrubTimer); clearTimeout(scrubEndTimer); }

// Once the section arrives, the chart walks its own days, then lets go.
function startAutoScrub() {
  if (REDUCED || scrubbed) return;
  scrubbed = true;
  scrubTimer = setInterval(() => {
    const n = dayIdx + 1;
    if (n >= RACCOON_LIFE.length) {
      clearInterval(scrubTimer);
      scrubEndTimer = setTimeout(() => { dayIdx = -1; updateReadout(); }, 1400);
      return;
    }
    dayIdx = n;
    updateReadout();
  }, 650);
}

function wireBattery() {
  const scrub = (e) => {
    const bar = e.target.closest('[data-day]');
    if (!bar) return;
    stopScrub();
    dayIdx = Number(bar.dataset.day);
    updateReadout();
  };
  $('#battery').addEventListener('mouseover', scrub);
  $('#battery').addEventListener('click', scrub);
  $('#battery').addEventListener('mouseleave', () => {
    if (dayIdx > -1) { dayIdx = -1; updateReadout(); }
  });
}

// ── Eating here ──────────────────────────────────────────────
function placeBarColor(score) {
  if (score <= 89) return '#0f6e56';
  if (score <= 90.6) return '#4daa91';
  return '#d97706';
}

function renderPlaces(on) {
  $('#places').innerHTML = PLACES.map((p, i) => `
    <div class="eat__row" style="${on ? `--d:${(i * 0.1).toFixed(2)}s` : 'opacity:0;animation:none'}">
      <span class="idx">0${i + 1}</span>
      <div>
        <span class="name">${esc(p.name)}</span>
        <span class="note">${esc(p.note)}</span>
      </div>
      <span class="zip">${esc(p.zip)}</span>
      <span class="track">${p.score === null ? '' : `<i style="width:${Math.round(((93 - p.score) / 5) * 100)}%;background:${placeBarColor(p.score)};${on ? `--d:${(0.2 + i * 0.12).toFixed(2)}s` : 'opacity:0;animation:none'}"></i>`}</span>
      <span class="score${p.score === null ? ' score--open' : ''}">${p.score === null ? '—' : p.score.toFixed(1)}</span>
    </div>`).join('');
}

// ── The record shelf + turntable ─────────────────────────────
let selRec = 0;
const RINGWEAR = 'radial-gradient(circle at 50% 52%,rgba(0,0,0,0) 56%,rgba(255,255,255,.07) 58%,rgba(255,255,255,.07) 61%,rgba(0,0,0,0) 63%)';
const SPINE_EDGE = 'linear-gradient(90deg,rgba(255,255,255,.14),rgba(255,255,255,0) 40%,rgba(0,0,0,.3))';

// The spines render once; selection only mutates styles in place, so the
// crate's entrance animation never replays on hover.
function renderCrate(on) {
  $('#rec-crate').innerHTML = RECORDS.map((r, i) => `
    <button type="button" data-rec="${i}" aria-label="${esc(`${r.t} — ${r.a}`)}"
      style="position:relative;min-width:0;border:none;padding:0;cursor:pointer;overflow:hidden;text-align:left;background-color:${r.c};box-shadow:inset 0 0 0 1px rgba(0,0,0,.35);transition:flex-basis .5s cubic-bezier(.4,0,.2,1),height .5s cubic-bezier(.4,0,.2,1);${on ? `animation:growup .6s cubic-bezier(.4,0,.2,1) ${(i * 0.05).toFixed(2)}s both` : 'opacity:0'}">
      <span class="spine-label" style="position:absolute;left:0;top:0;bottom:0;width:100%;display:flex;justify-content:flex-start;padding:10px 0;writing-mode:vertical-rl;font:400 8.5px 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(251,249,243,.85);white-space:nowrap;overflow:hidden;transition:opacity .25s ease">${esc(r.t)}</span>
      <span class="spine-cover" style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:14px 16px;transition:opacity .4s ease">
        <span style="display:flex;justify-content:space-between;gap:8px;min-width:180px">
          <span style="font:400 8.5px 'IBM Plex Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:rgba(251,249,243,.75);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.a)}</span>
          <span style="font:400 8px 'IBM Plex Mono',monospace;letter-spacing:.1em;color:rgba(251,249,243,.45);white-space:nowrap">${r.cat}</span>
        </span>
        <span style="font:italic 300 23px/1.05 Newsreader,Georgia,serif;color:rgba(251,249,243,.96);display:block">${esc(r.t)}</span>
      </span>
    </button>`).join('');
  updateCrateSel();
}

function updateCrateSel() {
  $('#rec-crate').querySelectorAll('[data-rec]').forEach((b, i) => {
    const r = RECORDS[i];
    const isOn = selRec === i;
    b.style.height = `${isOn ? 226 : 200 + ((i * 17) % 16)}px`;
    b.style.flex = isOn ? '0 1 226px' : '1 1 22px';
    b.style.backgroundImage = isOn ? `${r.g},${RINGWEAR}` : SPINE_EDGE;
    b.style.boxShadow = `inset 0 0 0 1px rgba(0,0,0,.35)${isOn ? ',0 14px 24px -10px rgba(0,0,0,.85)' : ''}`;
    const label = b.querySelector('.spine-label');
    const cover = b.querySelector('.spine-cover');
    label.style.opacity = isOn ? '0' : '1';
    cover.style.opacity = isOn ? '1' : '0';
    cover.style.transitionDelay = isOn ? '.18s' : '0s';
  });
  updateDeck();
}

function updateDeck() {
  const r = RECORDS[selRec];
  $('#rec-readout').textContent = r
    ? `${r.t} — ${r.a}${r.n ? ` · ${r.n}` : ''}`
    : 'Sixteen and counting. The soundtracks outnumber everything else, which tracks.';
  const label = $('#deck-label');
  label.style.background = r ? r.c : '';
  label.classList.toggle('is-spinning', !REDUCED && gates.recIn && selRec > -1);
  $('#deck-label-t').textContent = r ? r.t : '';
  $('#deck-arm').classList.toggle('is-on', gates.recIn && selRec > -1);
  $('#deck-power').classList.toggle('is-on', gates.recIn && selRec > -1);
  $('#deck-index').textContent = `${`0${selRec + 1}`.slice(-2)} / 16`;
  const sleeve = $('#deck-sleeve');
  sleeve.style.backgroundColor = r ? r.c : '';
  $('#deck-sleeve-t').textContent = r ? r.t : '';
  $('#deck-caption').textContent = r ? `Now spinning · Side A · ${r.t}` : 'Pull a spine to put it on';
}

function wireCrate() {
  const pick = (e) => {
    const b = e.target.closest('[data-rec]');
    if (!b || Number(b.dataset.rec) === selRec) return;
    selRec = Number(b.dataset.rec);
    updateCrateSel();
  };
  $('#rec-crate').addEventListener('mouseover', pick);
  $('#rec-crate').addEventListener('click', pick);
}

// ── The Christie ledger ──────────────────────────────────────
let selChr = 5;

// Spines render once; selection only mutates transform and box-shadow, so
// the shelf's entrance animation never replays on hover.
function renderChristie(on) {
  $('#chr-shelf').innerHTML = CHRISTIE.map((c, i) => {
    const col = c.cur ? '#2e5c4e' : c.u ? '#3c403b' : RATING_COLORS[c.r];
    const h = 152 + ((i * 13) % 38);
    return `
    <button type="button" data-chr="${i}" aria-label="${esc(c.t + (c.u ? ': on the list' : c.cur ? ': currently reading' : `: ${c.r} stars`))}"
      style="position:relative;height:${h}px;flex:1 1 20px;min-width:0;border:none;cursor:pointer;padding:9px 0 7px;overflow:hidden;writing-mode:vertical-rl;display:flex;justify-content:space-between;align-items:center;background-color:${col};background-image:linear-gradient(90deg,rgba(255,255,255,.16),rgba(255,255,255,0) 38%,rgba(0,0,0,.3)),linear-gradient(180deg,rgba(0,0,0,.25) 0,rgba(0,0,0,.25) 7px,rgba(0,0,0,0) 7px),linear-gradient(0deg,rgba(0,0,0,.25) 0,rgba(0,0,0,.25) 7px,rgba(0,0,0,0) 7px);transform-origin:bottom center;transition:transform .28s cubic-bezier(.34,1.3,.64,1);${on ? `animation:growup .55s cubic-bezier(.4,0,.2,1) ${(i * 0.03).toFixed(2)}s both` : 'opacity:0'}">
      <span style="font:400 8px 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:rgba(251,249,243,.92);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-height:74%">${esc(c.t)}</span>
      <span style="font:400 7.5px 'IBM Plex Mono',monospace;letter-spacing:.04em;color:rgba(251,249,243,.6);white-space:nowrap">${c.cur ? 'now' : c.u ? '·' : `${c.r}★`}</span>
    </button>`;
  }).join('');
  updateChristieSel(on);
}

function updateChristieSel(on) {
  $('#chr-shelf').querySelectorAll('[data-chr]').forEach((b, i) => {
    const c = CHRISTIE[i];
    const isOn = selChr === i;
    const lean = (((i % 4) - 1.5) * 0.6).toFixed(1);
    b.style.boxShadow = `inset 0 0 0 1px rgba(0,0,0,.3)${isOn ? ',inset 0 0 0 2px rgba(251,249,243,.4)' : ''}${c.cur ? ',inset 0 0 0 2px rgba(63,174,143,.55)' : ''}`;
    b.style.transform = isOn ? 'translateY(-12px)' : `rotate(${lean}deg)`;
  });
  renderLibCard(on);
}

function renderLibCard(on) {
  const c = CHRISTIE[selChr];
  const returned = c.cur ? 'Checked out · reading it now'
    : c.u ? 'On the list · not yet checked out'
    : c.d.indexOf('lost') > -1 ? `Returned · ${c.d}` : `Returned ${c.d}, 2026`;
  const stampColor = c.cur ? 'border-color:rgba(154,108,0,.6);color:rgba(154,108,0,.8)'
    : c.u ? 'border-color:rgba(122,117,112,.5);color:rgba(122,117,112,.7)'
    : 'border-color:rgba(15,110,86,.6);color:rgba(15,110,86,.75)';
  const card = $('#libcard');
  card.classList.toggle('is-in', !!on);
  card.innerHTML = `
    <p class="libcard__series">THE CHRISTIE LEDGER · CHRISTIE, AGATHA</p>
    <div class="libcard__body">
      <h3>${esc(c.t)}</h3>
      <p class="libcard__meta">Agatha Christie · ${c.y}</p>
      <p class="libcard__stars" style="color:${RATING_COLORS[c.r] || '#c9c3b4'}">${c.r ? '★'.repeat(c.r) + '☆'.repeat(5 - c.r) : '☆☆☆☆☆'}</p>
      ${c.n ? `<p class="libcard__quote">${esc(c.n)}</p>` : ''}
      <p class="libcard__returned">${esc(returned)}</p>
    </div>
    <span class="libcard__stamp" style="${stampColor}">${c.cur ? 'READING' : c.u ? 'TBR' : 'READ'}</span>`;
}

function wireChristie() {
  const pick = (e) => {
    const b = e.target.closest('[data-chr]');
    if (!b || Number(b.dataset.chr) === selChr) return;
    selChr = Number(b.dataset.chr);
    updateChristieSel(gates.chrIn);
  };
  $('#chr-shelf').addEventListener('mouseover', pick);
  $('#chr-shelf').addEventListener('click', pick);
}

// ── On rotation ──────────────────────────────────────────────
function renderFacts() {
  $('#facts').innerHTML = LIFE_FACTS.map((f) => `
    <div class="fact"><strong>${esc(f.label)}</strong><span>${esc(f.value)}</span></div>`).join('');
}

function renderEq(on) {
  $('#eq').innerHTML = Array.from({ length: 44 }, (_, i) => `
    <i style="flex:1;display:block;background:${i % 4 === 0 ? '#3fae8f' : `rgba(63,174,143,${(0.3 + ((i * 13) % 4) * 0.12).toFixed(2)})`};height:${12 + ((i * 37) % 82)}%;${on ? `animation:eqbar ${(0.8 + ((i * 7) % 11) / 10).toFixed(1)}s ease-in-out ${((i % 9) * 0.09).toFixed(2)}s infinite alternate,fadein .4s ease ${(i * 0.02).toFixed(2)}s both` : 'opacity:0'}"></i>`).join('');
}

// ── Boot ─────────────────────────────────────────────────────
renderField();
renderProgress(false);
renderInvoice(false);
renderBattery(false);
renderPlaces(false);
renderCrate(false);
renderChristie(false);
renderFacts();
renderEq(false);

wireField();
wireBattery();
wireCrate();
wireChristie();

watchGate('progress', 'progIn', () => { renderProgress(true); startProgressCount(); });
watchGate('raccoon', 'racIn', () => { renderInvoice(true); renderBattery(true); startAutoScrub(); });
watchGate('eating', 'eatIn', () => renderPlaces(true));
watchGate('records', 'recIn', () => renderCrate(true));
watchGate('christie', 'chrIn', () => renderChristie(true));
watchGate('rotation', 'rotIn', () => renderEq(true));
