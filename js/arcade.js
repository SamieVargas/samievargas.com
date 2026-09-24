// ============================================================
// js/arcade.js
// /apps: the title ticker, the badge filter, six featured cards and
// the other nine as rows, all built from ARCADE_APPS. The only state
// is the badge filter. Motion respects prefers-reduced-motion through
// reveal.js and the stylesheet.
// ============================================================

import { ARCADE_APPS } from '../data/content.js?v=20260924b';
import { $, esc, onSeen } from './reveal.js?v=20260924b';

const TOTAL = ARCADE_APPS.length;
const APPS = ARCADE_APPS.map((a, i) => ({ ...a, num: `${String(i + 1).padStart(2, '0')} / ${TOTAL}` }));

const FILTERS = [
  ['All', () => true],
  ['Live data', (a) => a.badge.includes('live')],
  ['No data needed', (a) => a.badge === 'no data needed'],
  ['Tracks your taps', (a) => a.badge === 'tracks your taps'],
  ['Your export', (a) => a.badge.includes('export')],
];

const state = { filter: 'All' };
const seen = { feat: false, rest: false };

// ── Ticker: every title twice, so the -50% loop is seamless ──
function renderTicker() {
  const one = APPS.map((a) => `<span><i></i>${esc(a.title)}</span>`).join('');
  $('#arc-ticker').innerHTML = one + one;
}

// ── Filters ──────────────────────────────────────────────────
function renderFilters() {
  $('#arc-filters').innerHTML = FILTERS.map(([name, fn]) => {
    const on = name === state.filter;
    return `<button type="button" class="chip" data-f="${esc(name)}" aria-pressed="${on}">${esc(name)} <span>${APPS.filter(fn).length}</span></button>`;
  }).join('');
}

function shot(a, cls) {
  return `<div class="${cls}"><img src="${esc(a.shot)}?v=20260924b" alt="${esc(a.title)}" loading="lazy" decoding="async"></div>`;
}

const cardHtml = (a, i) => `
  <a class="arc-card" href="${esc(a.slug)}" style="--hue:${a.accent};--d:${(150 + i * 90) / 1000}s">
    ${shot(a, 'arc-card__shot')}
    <div class="arc-card__body">
      <div class="arc-card__top"><span class="arc-card__badge">${esc(a.badge)}</span><span class="arc-card__num">${a.num}</span></div>
      <span class="arc-card__title">${esc(a.title)}</span>
      <span class="arc-card__hook">${esc(a.hook)}</span>
      <span class="arc-card__play">Play →</span>
    </div>
  </a>`;

const rowHtml = (a, i) => `
  <a class="arc-row" href="${esc(a.slug)}" style="--hue:${a.accent};--d:${(100 + i * 70) / 1000}s">
    ${shot(a, 'arc-row__shot')}
    <span class="arc-row__text">
      <span class="arc-row__line"><span class="arc-row__title">${esc(a.title)}</span><span class="arc-row__badge">${esc(a.badge)}</span></span>
      <span class="arc-row__hook">${esc(a.hook)}</span>
    </span>
  </a>`;

// Rebuild both lists for the current filter; a list lights (and its items
// stagger in) once its section has been seen.
function renderLists() {
  const test = (FILTERS.find((f) => f[0] === state.filter) || FILTERS[0])[1];
  const shown = APPS.filter(test);
  const feat = shown.filter((a) => a.feat);
  const rest = shown.filter((a) => !a.feat);

  const grid = $('#arc-feat-grid');
  const list = $('#arc-rest-list');
  grid.classList.remove('is-lit');
  list.classList.remove('is-lit');
  grid.innerHTML = feat.map(cardHtml).join('');
  list.innerHTML = rest.map(rowHtml).join('');
  $('#arc-feat-n').textContent = `${feat.length} shown`;
  $('#arc-rest-n').textContent = `${rest.length} shown`;
  $('#arc-feat').hidden = !feat.length;
  $('#arc-rest').hidden = !rest.length;

  // Let the hidden state paint before lighting, so the stagger replays.
  void grid.offsetWidth;
  if (seen.feat) grid.classList.add('is-lit');
  if (seen.rest) list.classList.add('is-lit');
}

function wireFilters() {
  $('#arc-filters').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]');
    if (!b || b.dataset.f === state.filter) return;
    state.filter = b.dataset.f;
    renderFilters();
    renderLists();
  });
}

// ── Boot ─────────────────────────────────────────────────────
renderTicker();
renderFilters();
renderLists();
wireFilters();
onSeen($('#arc-head'));
onSeen($('#arc-feat'), () => { seen.feat = true; $('#arc-feat-grid').classList.add('is-lit'); });
onSeen($('#arc-rest'), () => { seen.rest = true; $('#arc-rest-list').classList.add('is-lit'); });
