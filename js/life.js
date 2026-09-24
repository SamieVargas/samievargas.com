// ============================================================
// js/life.js
// /life and /life#notes. The noticing field, progress and the Ring Fit
// strip, the Christie shelf, the record shelf, the raccoon invoice, and
// the four notes, each with a chart that stays in view beside it.
// Every string and number comes from data/content.js; this file only
// shapes the DOM and times the load-ins.
//
// State: the selected field item, the kind filter, the selected Christie
// book, the selected record and the selected raccoon day. None of it
// persists across visits.
// ============================================================

import {
  LIFE_FIELD, LIFE_RELATED, INVOICE_ROWS, RACCOON_LIFE, PROGRESS,
  RECORDS, CHRISTIE, RING_FIT, READING, PLAYING, OBSERVATIONS, LIFE_NOTES,
} from '../data/content.js?v=20260924a';
import { REDUCED, $, $$, esc, onSeen, autoReveal, tween, countUp } from './reveal.js?v=20260924a';

// Category hues: same lightness and chroma, hue only. "Built" is the accent.
const KIND_COLOR = {
  'Noticed': 'oklch(0.62 0.12 70)',
  'Built': 'var(--accent)',
  'Noticed → built': 'oklch(0.55 0.13 330)',
  'In progress': 'oklch(0.58 0.12 145)',
  'Built, sort of': 'oklch(0.58 0.12 250)',
  'Rabbit hole': 'oklch(0.6 0.14 28)',
  'Collected': 'oklch(0.58 0.12 290)',
};
const kindColor = (k) => KIND_COLOR[k] || 'var(--meta)';
const KINDS = Object.keys(KIND_COLOR).filter((k) => LIFE_FIELD.some((f) => f.kind === k));

const state = {
  sel: LIFE_FIELD.some((f) => f.id === 'walk') ? 'walk' : LIFE_FIELD[0].id,
  kind: null,
  book: Math.max(0, CHRISTIE.findIndex((c) => c.cur)),
  rec: Math.min(1, RECORDS.length - 1),
  linksOn: REDUCED,
};

// ── The noticing field ───────────────────────────────────────
const pts = new Map();

function buildField() {
  const area = $('#life-area');
  LIFE_FIELD.forEach((p, i) => {
    const right = parseFloat(p.x) > 60;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `life-pt${right ? ' life-pt--flip' : ''}`;
    b.dataset.id = p.id;
    b.style.cssText = `left:${p.x};top:${p.y};--k:${kindColor(p.kind)};--d:${((200 + i * 60) / 1000).toFixed(2)}s`;
    b.setAttribute('aria-label', `${p.short}, ${p.kind}`);
    b.innerHTML = `<i></i><span>${esc(p.short)}</span>`;
    b.addEventListener('click', () => { state.sel = p.id; renderField(); });
    area.appendChild(b);
    pts.set(p.id, b);
  });

  const kinds = $('#life-kinds');
  kinds.innerHTML = KINDS.map((k) => `<button type="button" class="life-kind" data-kind="${esc(k)}" aria-pressed="false" style="--k:${kindColor(k)}"><i></i>${esc(k)}</button>`).join('');
  kinds.addEventListener('click', (e) => {
    const b = e.target.closest('[data-kind]');
    if (!b) return;
    state.kind = state.kind === b.dataset.kind ? null : b.dataset.kind;
    renderField();
  });

  $('#life-card').addEventListener('click', (e) => {
    const b = e.target.closest('[data-rel]');
    if (!b) return;
    state.sel = b.dataset.rel;
    renderField();
  });
}

function renderField() {
  const f = LIFE_FIELD.find((d) => d.id === state.sel) || LIFE_FIELD[0];
  const rel = (LIFE_RELATED[f.id] || []).filter((id) => pts.has(id));

  pts.forEach((b, id) => {
    const p = LIFE_FIELD.find((d) => d.id === id);
    b.classList.toggle('is-on', id === f.id);
    b.classList.toggle('is-rel', rel.includes(id));
    b.classList.toggle('is-dim', !!state.kind && p.kind !== state.kind);
    b.setAttribute('aria-pressed', String(id === f.id));
  });
  $$('#life-kinds [data-kind]').forEach((b) => {
    const on = b.dataset.kind === state.kind;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', String(on));
  });

  $('#life-links').innerHTML = state.linksOn ? rel.map((id) => {
    const t = LIFE_FIELD.find((d) => d.id === id);
    return `<line x1="${parseFloat(f.x)}" y1="${parseFloat(f.y)}" x2="${parseFloat(t.x)}" y2="${parseFloat(t.y)}"/>`;
  }).join('') : '';

  const card = $('#life-card');
  card.style.setProperty('--k', kindColor(f.kind));
  card.innerHTML = `
    <div class="life-card__top"><span class="life-card__kind"><i></i>${esc(f.kind)}</span><span class="life-card__year">${esc(f.year)}</span></div>
    <h3 class="life-card__title">${esc(f.title)}</h3>
    ${f.art ? '<div class="life-card__art"></div>' : ''}
    <p class="life-card__line">${esc(f.line)}</p>
    ${f.href ? `<a class="life-card__link" href="${esc(f.href)}">${esc(f.linkLabel || 'Open ↗')}</a>` : ''}
    <div class="life-card__rel">
      <span class="life-micro life-micro--dark">connected to</span>
      <div class="life-card__chips">${rel.map((id) => `<button type="button" data-rel="${id}">${esc(LIFE_FIELD.find((d) => d.id === id).short)}</button>`).join('')}</div>
    </div>`;
  // The image is set only once its URL is known, never templated into src.
  const art = $('.life-card__art', card);
  if (art) art.style.backgroundImage = `url('${f.art}')`;
}

function playField() {
  // Points drop in one by one (their --d delays), then the delays are
  // cleared so a later filter or selection answers at once.
  const last = (200 + LIFE_FIELD.length * 60 + 500);
  setTimeout(() => $$('.life-pt').forEach((b) => b.style.setProperty('--d', '0s')), REDUCED ? 0 : last);
  setTimeout(() => { state.linksOn = true; renderField(); }, REDUCED ? 0 : 1400);
}

// ── In progress + the dragon ─────────────────────────────────
function buildProgress() {
  $('#life-bars').innerHTML = PROGRESS.map((p) => `
    <div class="life-bar">
      <div class="life-bar__top"><span>${esc(p.title)}</span><span class="life-bar__n">${esc(p.note)}</span></div>
      <div class="life-bar__track"><i style="width:0%"></i></div>
    </div>`).join('');

  const total = RING_FIT.track || 40;
  const bossAt = RING_FIT.bossAt || total;
  $('#life-ring').innerHTML = Array.from({ length: total }, (_, i) => `<i class="${i >= bossAt ? 'is-boss' : ''}"></i>`).join('');
  $('#ring-save').textContent = `${RING_FIT.level} · the save file`;
  $('#ring-boss').textContent = `${RING_FIT.boss} waits past here`;
  $('#ring-quote').textContent = RING_FIT.quote;
  $('#life-reading').innerHTML = READING.map((r) => `<span>${esc(r)}</span>`).join('');
  $('#life-playing').innerHTML = PLAYING.map((r) => `<span>${esc(r)}</span>`).join('');
}

function playProgress() {
  const fills = $$('#life-bars .life-bar__track i');
  tween(1400, (p) => fills.forEach((el, i) => { el.style.width = `${(PROGRESS[i].pct * p).toFixed(1)}%`; }), 200);
  const cells = $$('#life-ring i');
  const meta = $('#ring-meta');
  tween(1800, (p) => {
    const lvl = Math.round(RING_FIT.level * p);
    meta.textContent = `Ring Fit · level ${lvl}`;
    cells.forEach((c, i) => c.classList.toggle('is-on', i < lvl));
  }, 400);
}

// ── The Christie shelf ───────────────────────────────────────
const bookClass = (c) => (c.cur ? 'c' : c.u ? 'u' : String(c.r));

function buildChristie() {
  const shelf = $('#life-books');
  shelf.innerHTML = CHRISTIE.map((c, i) => {
    const state_ = c.cur ? 'reading now' : c.u ? 'not read yet' : `${c.r} stars`;
    return `<button type="button" class="life-b life-b--${bookClass(c)}" data-book="${i}" style="--d:${((150 + i * 28) / 1000).toFixed(3)}s" aria-label="${esc(`${c.t}, ${c.y}, ${state_}`)}"></button>`;
  }).join('');
  shelf.addEventListener('click', (e) => {
    const b = e.target.closest('[data-book]');
    if (!b) return;
    state.book = Number(b.dataset.book);
    renderBook();
  });
  renderBook();
}

function renderBook() {
  $$('#life-books [data-book]').forEach((b, i) => {
    b.classList.toggle('is-sel', i === state.book);
    b.setAttribute('aria-pressed', String(i === state.book));
  });
  const c = CHRISTIE[state.book];
  const m = c.u ? 'not read yet' : c.cur ? 'reading now' : `${'★'.repeat(c.r)} · ${c.d}${c.n ? ` · ${c.n}` : ''}`;
  $('#life-book').innerHTML = `<span class="life-book__y">${c.y}</span><span class="life-book__b"><span class="life-book__t">${esc(c.t)}</span><span class="life-book__m">${esc(m)}</span></span>`;
}

// ── The record shelf ─────────────────────────────────────────
function buildRecords() {
  const shelf = $('#life-recs');
  shelf.innerHTML = RECORDS.map((r, i) => `<button type="button" class="life-lp" data-rec="${i}" style="background:${r.g},${r.c};--d:${((150 + i * 40) / 1000).toFixed(2)}s" aria-label="${esc(`${r.t}, ${r.a}`)}"></button>`).join('');
  shelf.addEventListener('click', (e) => {
    const b = e.target.closest('[data-rec]');
    if (!b) return;
    state.rec = Number(b.dataset.rec);
    renderRecord();
  });
  renderRecord();
}

function renderRecord() {
  $$('#life-recs [data-rec]').forEach((b, i) => {
    b.classList.toggle('is-sel', i === state.rec);
    b.setAttribute('aria-pressed', String(i === state.rec));
  });
  const r = RECORDS[state.rec];
  $('#life-rec').innerHTML = `
    <div class="life-rec__cover" style="background:${r.g},${r.c}"><i></i></div>
    <div class="life-rec__b">
      <span class="life-rec__cat">${esc(r.cat)}</span>
      <span class="life-rec__t">${esc(r.t)}</span>
      <span class="life-rec__a">${esc(r.a)}</span>
      <span class="life-rec__n">${r.n ? esc(r.n) : '&nbsp;'}</span>
    </div>`;
}

// ── The raccoon invoice ──────────────────────────────────────
function buildInvoice() {
  $('#life-inv-rows').innerHTML = INVOICE_ROWS.map((r, i) => (r.sec
    ? `<div class="life-inv-row life-inv-row--sec" style="--d:${((200 + i * 110) / 1000).toFixed(2)}s"><span>${esc(r.sec)}</span></div>`
    : `<div class="life-inv-row" style="--d:${((200 + i * 110) / 1000).toFixed(2)}s"><span>${esc(r.item)}</span><span class="life-inv-row__q">${esc(r.qty)}</span></div>`)).join('');
  $('#life-inv-total').style.setProperty('--d', `${((200 + INVOICE_ROWS.length * 110) / 1000).toFixed(2)}s`);
}

// ── Notes ────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, '0');
const racState = { day: 3 };

function noteChart(i) {
  const c = (LIFE_NOTES[i] || {}).chart;
  if (!c) return '';
  if (c.split) {
    const [a, b] = c.split;
    return `
      <div class="nc nc--split" data-chart="split">
        <span class="life-micro life-micro--faint">${esc(c.label)}</span>
        <div class="nc-pool"><i style="width:${c.pooled * 100}%"></i><span style="left:${c.pooled * 100}%">${c.pooled.toFixed(2)} pooled</span></div>
        <div class="nc-split">
          <div class="nc-split__t"><i class="nc-split__a" style="width:${c.pooled * 100}%"></i></div><span>${esc(a.k)} · ${a.v.toFixed(3)}</span>
          <div class="nc-split__t"><i class="nc-split__b" style="width:${c.pooled * 100}%"></i></div><span>${esc(b.k)} · ${b.v.toFixed(3)}</span>
        </div>
        <span class="nc-big"><span class="nc-x">1.0</span>× apart</span>
      </div>`;
  }
  if (c.found) {
    return `
      <div class="nc nc--days" data-chart="days">
        <div class="nc-head"><span class="life-micro life-micro--faint">${esc(c.label)}</span><span class="nc-hint">${esc(c.hint)}</span></div>
        <div class="nc-days">${RACCOON_LIFE.map((d, k) => `<button type="button" data-day="${k}" aria-label="${esc(`${d.d}: ${d.v}`)}" class="${d.d === c.found ? 'is-found' : ''}"><i style="height:0%"></i></button>`).join('')}</div>
        <div class="nc-days__lab">${RACCOON_LIFE.map((d) => `<span>${esc(d.d.split(' ')[1] || d.d)}</span>`).join('')}</div>
        <div class="nc-read"><span class="nc-read__v"></span><span class="nc-read__b"><span class="nc-read__d"></span><span class="nc-read__n"></span></span></div>
      </div>`;
  }
  if (c.scores) {
    const lo = Math.min(...c.scores) - 0.3;
    const hi = Math.max(...c.scores) + 0.2;
    const n = c.scores.length - 1;
    const points = c.scores.map((s, k) => `${((k / n) * 100).toFixed(2)},${(((s - lo) / (hi - lo)) * 100).toFixed(2)}`).join(' ');
    return `
      <div class="nc nc--line" data-chart="line">
        <span class="life-micro life-micro--faint">${esc(c.label)}</span>
        <div class="nc-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" vector-effect="non-scaling-stroke"/></svg>
          <span class="nc-line__first">${esc(c.first)}</span><span class="nc-line__last">${esc(c.last)}</span>
          <span class="nc-line__up">↑ fewer</span><span class="nc-line__down">↓ more</span>
        </div>
        <div class="nc-foot"><span>${esc(c.gapLabel)}</span><span class="nc-foot__n"><span class="nc-gap">−0</span> pts</span></div>
      </div>`;
  }
  if (c.versions) {
    return `
      <div class="nc nc--vers" data-chart="vers">
        <span class="life-micro life-micro--faint">${esc(c.label)}</span>
        ${c.versions.map((v, k) => `
          <div class="nc-ver" style="--d:${((200 + k * 220) / 1000).toFixed(2)}s">
            <span class="nc-ver__n">${esc(v)}</span>
            <div class="nc-ver__t"><i style="--w:${40 + k * 18}%"></i></div>
            <span class="nc-ver__gap"><i></i>${esc(c.gapLabel)}</span>
          </div>`).join('')}
        <span class="nc-cap">${esc(c.caption)}</span>
        <span class="nc-cap nc-cap--faint">${esc(c.illustrative)}</span>
      </div>`;
  }
  return '';
}

function buildNotes() {
  $('#notes-index').innerHTML = OBSERVATIONS.map((o, i) => `
    <a href="#n${i + 1}" class="notes-index__row"><span class="notes-index__n">${pad(i + 1)}</span><span class="notes-index__t">${esc(o.title)}</span><span class="notes-index__d">${esc(o.tag.split(' · ')[0])}</span></a>`).join('');

  $('#notes-list').innerHTML = OBSERVATIONS.map((o, i) => {
    const src = o.linkText
      ? `${esc(o.sourceText)} <a href="${esc(o.linkHref)}">${esc(o.linkText)}</a>`
      : esc(o.sourceText);
    const plain = (LIFE_NOTES[i] || {}).plain;
    return `
    <article class="note" id="n${i + 1}" data-note="${i}">
      <div class="note__text rv">
        <span class="eyebrow">${pad(i + 1)} · ${esc(o.tag)}</span>
        <h3 class="life-h2 life-h2--36">${esc(o.title)}</h3>
        ${o.paragraphs.map((p) => `<p class="note__p">${esc(p)}</p>`).join('')}
        <span class="note__src">${src}</span>
      </div>
      <div class="note__side">
        ${noteChart(i)}
        ${plain ? `<p class="plain"><strong>In plain terms:</strong> ${esc(plain)}</p>` : ''}
      </div>
    </article>`;
  }).join('');

  const days = $('.nc-days');
  if (days) {
    const start = RACCOON_LIFE.findIndex((d) => d.d === LIFE_NOTES[1].chart.start);
    racState.day = start > -1 ? start : 0;
    days.addEventListener('click', (e) => {
      const b = e.target.closest('[data-day]');
      if (!b) return;
      racState.day = Number(b.dataset.day);
      renderDay();
    });
    renderDay();
  }
}

function renderDay() {
  $$('.nc-days [data-day]').forEach((b, k) => {
    b.classList.toggle('is-sel', k === racState.day);
    b.setAttribute('aria-pressed', String(k === racState.day));
  });
  const d = RACCOON_LIFE[racState.day];
  $('.nc-read__v').textContent = String(d.v);
  $('.nc-read__d').textContent = d.d;
  $('.nc-read__n').textContent = d.note;
}

function playNote(article) {
  const kind = $('[data-chart]', article)?.dataset.chart;
  if (kind === 'split') {
    const c = LIFE_NOTES[Number(article.dataset.note)].chart;
    const [a, b] = c.split;
    const pool = $('.nc-pool', article);
    const fa = $('.nc-split__a', article), fb = $('.nc-split__b', article), x = $('.nc-x', article);
    const P = c.pooled * 100;
    tween(1200, (p) => {
      pool.style.setProperty('--o', (1 - p * 0.7).toFixed(2));
      fa.style.width = `${(P + (a.v * 100 - P) * p).toFixed(1)}%`;
      fb.style.width = `${(P + (b.v * 100 - P) * p).toFixed(1)}%`;
      x.textContent = (1 + (b.v / a.v - 1) * p).toFixed(1);
    }, 600);
  } else if (kind === 'days') {
    const bars = $$('.nc-days i', article);
    tween(1200, (p) => bars.forEach((el, k) => { el.style.height = `${(RACCOON_LIFE[k].v * p).toFixed(1)}%`; }), 300);
  } else if (kind === 'line') {
    const svg = $('.nc-line svg', article);
    tween(1800, (p) => { svg.style.clipPath = `inset(-10px ${((1 - p) * 100).toFixed(1)}% -10px -10px)`; }, 400);
    const c = LIFE_NOTES[Number(article.dataset.note)].chart;
    countUp($('.nc-gap', article), c.gap, { ms: 1000, delay: 1600, fmt: (v) => `−${Math.round(v)}`, final: `−${c.gap}` });
  }
  // The rebuild rows stage themselves in CSS off .is-in.
}

// ── Nav: Notes is current once the notes are on screen ───────
function wireNav() {
  const life = $('#nav-life'), notes = $('#nav-notes'), sec = $('#notes');
  let raf = 0;
  const update = () => {
    raf = 0;
    const inNotes = sec.getBoundingClientRect().top < 120;
    life.classList.toggle('is-here', !inNotes);
    notes.classList.toggle('is-here', inNotes);
    if (inNotes) { notes.setAttribute('aria-current', 'location'); life.removeAttribute('aria-current'); } else { life.setAttribute('aria-current', 'page'); notes.removeAttribute('aria-current'); }
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  update();
}

// The page above the notes is built here, after the browser has already
// tried to honour #notes, so land on the anchor again once layout settles.
function honourHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const go = () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' }); };
  go();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
}

// ── Boot ─────────────────────────────────────────────────────
buildField();
renderField();
buildProgress();
buildChristie();
buildRecords();
buildInvoice();
buildNotes();
wireNav();

autoReveal();
onSeen('#field', playField);
onSeen('#progress', playProgress);
$$('.note').forEach((a) => onSeen(a, playNote));
honourHash();
