// ============================================================
// js/life.js
// /life — the field, the invoice, the battery chart, the eq card.
// Content lives in data/content.js.
// ============================================================

import {
  LIFE_FIELD, LIFE_RELATED, INVOICE_ROWS, RACCOON_LIFE, PROGRESS,
  PLACES, LIFE_INTERESTS, LIFE_FACTS, READING, PLAYING,
} from '../data/content.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ── The field ────────────────────────────────────────────────
let sel = 'toothbrush';

function renderField() {
  const plot = $('#plot');
  plot.querySelectorAll('.plot__pt').forEach((el) => el.remove());
  plot.insertAdjacentHTML('beforeend', LIFE_FIELD.map((p, pi) => {
    const on = p.id === sel, flip = parseFloat(p.x) > 50, art = !!p.art;
    return `
    <button type="button" class="plot__pt${flip ? ' plot__pt--flip' : ''}${art ? ' plot__pt--art' : ''}${on ? ' is-on' : ''}"
            data-pt="${p.id}" style="left:${p.x};top:${p.y}" aria-label="${esc(p.title)}">
      <i style="--bob:${(3.2 + (pi % 5) * 0.4).toFixed(1)}s;--d:${(pi * 0.22).toFixed(2)}s"></i><span>${esc(p.short)}</span>
    </button>`;
  }).join(''));

  const f = LIFE_FIELD.find((d) => d.id === sel) || LIFE_FIELD[0];
  const rel = LIFE_RELATED[f.id] || [];
  $('#plot-lines').innerHTML = rel.map((id) => {
    const t = LIFE_FIELD.find((d) => d.id === id);
    if (!t) return '';
    return `<line x1="${parseFloat(f.x)}" y1="${parseFloat(f.y)}" x2="${parseFloat(t.x)}" y2="${parseFloat(t.y)}"
      stroke="#1a6b5a" stroke-width="0.35" stroke-dasharray="2 1.6" opacity="0.5"/>`;
  }).join('');

  $('#field-card').innerHTML = `
    <div class="field__shot" style="background-image:${f.art ? `url('${f.art}')` : 'none'}">
      ${f.art ? '' : '<p>Nothing to open — this one is just something I noticed</p>'}
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

// ── In progress ──────────────────────────────────────────────
function renderProgress() {
  $('#progress').innerHTML = PROGRESS.map((p, i) => `
    <div class="progress-row">
      <div>
        <span class="title">${esc(p.title)}</span>
        <span class="note">${esc(p.note)}</span>
      </div>
      <span class="track"><i style="width:${p.pct}%;--d:${(i * 0.12).toFixed(2)}s"></i></span>
    </div>`).join('');
}

// ── The raccoon invoice + battery chart ──────────────────────
let dayIdx = -1;

function renderInvoice() {
  $('#invoice-rows').innerHTML = INVOICE_ROWS.map((r, i) => `
    <div class="invoice__row" style="--d:${(i * 0.11).toFixed(2)}s">
      <span class="item">${esc(r.item)}</span>
      <span class="note">${esc(r.note)}</span>
      <span class="qty">${esc(r.qty)}</span>
    </div>`).join('');
}

function renderBattery() {
  $('#battery').innerHTML = RACCOON_LIFE.map((d, i) => `
    <button type="button" data-day="${i}" aria-label="${esc(d.d)}: ${d.v}" class="${d.v <= 10 ? 'is-low' : ''}">
      <i style="height:${Math.max(4, d.v)}%;--d:${(i * 0.07).toFixed(2)}s"></i>
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

function wireBattery() {
  const scrub = (e) => {
    const bar = e.target.closest('[data-day]');
    if (!bar) return;
    dayIdx = Number(bar.dataset.day);
    updateReadout();
  };
  $('#battery').addEventListener('mouseover', scrub);
  $('#battery').addEventListener('click', scrub);
  $('#battery').addEventListener('mouseleave', () => {
    if (dayIdx > -1) { dayIdx = -1; updateReadout(); }
  });
}

// ── Interests, eating, rotation ──────────────────────────────
function renderInterests() {
  $('#interests').innerHTML = LIFE_INTERESTS.map((i) => `
    <article>
      <h4>${esc(i.title)}</h4>
      <p>${esc(i.body)}</p>
    </article>`).join('');
}

function placeBarColor(score) {
  if (score <= 89) return '#0f6e56';
  if (score <= 90.6) return '#4daa91';
  return '#d97706';
}

function renderPlaces() {
  $('#places').innerHTML = PLACES.map((p, i) => `
    <div class="eat__row" style="--d:${(i * 0.1).toFixed(2)}s">
      <span class="idx">0${i + 1}</span>
      <div>
        <span class="name">${esc(p.name)}</span>
        <span class="note">${esc(p.note)}</span>
      </div>
      <span class="zip">${esc(p.zip)}</span>
      <span class="track">${p.score === null ? '' : `<i style="width:${Math.round(((93 - p.score) / 5) * 100)}%;background:${placeBarColor(p.score)};--d:${(i * 0.12).toFixed(2)}s"></i>`}</span>
      <span class="score${p.score === null ? ' score--open' : ''}">${p.score === null ? '—' : p.score.toFixed(1)}</span>
    </div>`).join('');
}

function renderFacts() {
  $('#facts').innerHTML = LIFE_FACTS.map((f) => `
    <div class="fact"><strong>${esc(f.label)}</strong><span>${esc(f.value)}</span></div>`).join('');
}

function renderEq() {
  $('#eq').innerHTML = Array.from({ length: 28 }, (_, i) => `
    <i class="${i % 4 === 0 ? 'hi' : ''}" style="height:${18 + ((i * 37) % 74)}%;--dur:${(0.9 + ((i * 7) % 9) / 10).toFixed(1)}s;--d:${((i % 9) * 0.11).toFixed(2)}s"></i>`).join('');
}

function renderLists() {
  $('#reading').innerHTML = READING.map((t, i) =>
    `<p style="--d:${(i * 0.1).toFixed(2)}s">${esc(t)}</p>`).join('');
  $('#playing').innerHTML = PLAYING.map((t, i) =>
    `<p style="--d:${(0.3 + i * 0.1).toFixed(2)}s">${esc(t)}</p>`).join('');
}

// ── Boot ─────────────────────────────────────────────────────
renderField();
renderProgress();
renderInvoice();
renderBattery();
renderInterests();
renderPlaces();
renderFacts();
renderEq();
renderLists();

wireField();
wireBattery();
