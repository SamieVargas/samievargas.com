// ============================================================
// js/console.js
// Item 07 — the query console.
//
// Presets come from a keyed allowlist in data/content.js. No
// user-supplied SQL reaches anything, because nothing is executed:
// the result sets are shipped cached, which buys the whole experience
// with none of the cost or failure surface of a live warehouse.
//
// The millisecond figure is the real time this page took to render the
// cached set, measured with performance.now(), and it is labelled as a
// render rather than a query time. An invented query duration would be
// the one thing this component must not do.
// ============================================================

import { CONSOLE_QUERIES } from '../data/content.js?v=20260901';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let active = CONSOLE_QUERIES[0].key;

function renderPresets() {
  $('#qc-presets').innerHTML = CONSOLE_QUERIES.map((q) => `
    <button type="button" class="qc-preset${q.key === active ? ' is-on' : ''}" data-q="${q.key}"
      aria-pressed="${q.key === active}">${esc(q.label)}</button>`).join('');
}

function renderResult() {
  const q = CONSOLE_QUERIES.find((x) => x.key === active);
  const t0 = performance.now();

  $('#qc-sql').innerHTML = `${esc(q.sql)}<span class="qc-caret"></span>`;

  $('#qc-table').innerHTML = [
    `<div class="qc-row qc-row--head">${q.cols.map((c) => `<span>${esc(c)}</span>`).join('')}</div>`,
    ...q.rows.map((r, i) => `<div class="qc-row"${REDUCED ? '' : ` style="animation:fadein .25s ease ${(i * 0.035).toFixed(2)}s both"`}>${
      r.map((cell) => `<span>${esc(cell)}</span>`).join('')}</div>`),
  ].join('');

  $('#qc-note').textContent = q.note;

  // Measured after the writes above, so it is a real number.
  const ms = performance.now() - t0;
  $('#qc-meta').textContent =
    `${q.rows.length} row${q.rows.length === 1 ? '' : 's'} · ${ms.toFixed(1)} ms render · ${q.source} · cached result set`;
}

function wire() {
  $('#qc-presets').addEventListener('click', (e) => {
    const b = e.target.closest('[data-q]');
    if (!b || b.dataset.q === active) return;
    active = b.dataset.q;
    renderPresets();
    renderResult();
  });
}

if ($('#qconsole')) {
  renderPresets();
  renderResult();
  wire();
}
