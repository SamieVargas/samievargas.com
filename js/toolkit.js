// ============================================================
// js/toolkit.js
// /toolkit — the change log is live from the GitHub commits API,
// with a hand-written fallback if the fetch fails.
// ============================================================

import { TK_REPO, TK_FALLBACK, TK_NOTES, TK_META, TK_TOKENS } from '../data/content.js?v=20260831';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Relative ages, always recomputed at render.
function ago(iso) {
  if (!iso) return '';
  const then = new Date(iso.length <= 10 ? `${iso}T12:00:00Z` : iso);
  const days = Math.max(0, Math.round((Date.now() - then) / 86400000));
  if (days < 1) return 'today';
  if (days < 7) return `${days}${days === 1 ? ' day ago' : ' days ago'}`;
  if (days < 31) { const w = Math.round(days / 7); return `${w}${w === 1 ? ' week ago' : ' weeks ago'}`; }
  if (days < 365) { const m = Math.max(1, Math.round(days / 30.4)); return `${m}${m === 1 ? ' month ago' : ' months ago'}`; }
  const y = days / 365.25;
  return y < 1.2 ? '1 year ago' : `${y.toFixed(1).replace('.0', '')} years ago`;
}

function fmt(iso) {
  if (!iso) return '';
  const d = new Date(iso.length <= 10 ? `${iso}T12:00:00Z` : iso);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function renderCommits(list, live) {
  $('#commits').innerHTML = list.map((c) => `
    <a class="commit" href="${c.href || `https://github.com/${TK_REPO}/commits/main`}">
      <span class="msg">${esc(c.message)}</span>
      <span class="when">${esc(ago(c.date))}</span>
    </a>`).join('');
  $('#feed-note').textContent = live
    ? 'Ten most recent commits, newest first, straight from the repo.'
    : 'These are the ones I would have listed by hand.';
}

function renderStatus(state) {
  const el = $('#feed-status');
  if (state === 'live') { el.textContent = 'Live from GitHub'; el.style.color = 'var(--accent)'; }
  else if (state === 'failed') { el.textContent = 'GitHub unreachable · showing my own list'; el.style.color = 'var(--faint)'; }
  else { el.textContent = 'Loading from GitHub…'; el.style.color = 'var(--faint)'; }
}

function renderAge(firstDate) {
  $('#tk-age').textContent = ago(firstDate);
  $('#footer-line').textContent = `Started ${fmt(firstDate)} · ${ago(firstDate)} · built with Claude Opus`;
}

function loadGithub() {
  const base = `https://api.github.com/repos/${TK_REPO}`;
  Promise.all([
    fetch(`${base}/commits?per_page=10`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    fetch(base).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
  ]).then(([commits, repo]) => {
    renderCommits(commits.map((c) => ({
      message: (c.commit.message || '').split('\n')[0],
      date: c.commit.author && c.commit.author.date,
      href: c.html_url,
    })), true);
    $('#tk-count').textContent = commits.length >= 10 ? '10+' : String(commits.length);
    renderStatus('live');
    renderAge(repo.created_at);
  }).catch(() => {
    renderStatus('failed');
  });
}

function renderNotes() {
  $('#notes').innerHTML = TK_NOTES.map((n) => `
    <div class="why">
      <div class="why__head">
        <p class="t">${esc(n.title)}</p>
        <p class="w">${esc(ago(n.date))}</p>
      </div>
      <p>${esc(n.body)}</p>
    </div>`).join('');
}

function renderMeta() {
  $('#meta-rows').innerHTML = TK_META.map((m) => `
    <div class="copyrow">
      <div>
        <h3>${esc(m.name)}</h3>
        <span class="attr">${esc(m.attr)}</span>
      </div>
      <div>
        <p class="current">${esc(m.current)}</p>
        <span class="stat">${esc(m.status)}</span>
      </div>
      <p class="why-p">${esc(m.why)}</p>
    </div>`).join('');
}

// T3 — read the live document rather than a pasted copy, so the
// snippet cannot drift from what actually ships.
function liveHead() {
  try {
    const keep = ['META', 'TITLE', 'LINK'];
    const lines = [...document.head.children]
      .filter((el) => keep.includes(el.tagName))
      .map((el) => '  ' + el.outerHTML.replace(/\s+/g, ' ').trim());
    if (!lines.length) throw new Error('empty');
    return lines.join('\n');
  } catch (err) {
    return '<!-- head unavailable -->';
  }
}

function renderHead() {
  const snippet = liveHead();
  $('#head-snippet').textContent = snippet;
  const btn = $('#copy-head');
  let timer;
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(snippet); } catch (err) { /* nothing to add */ }
    btn.textContent = 'Copied';
    clearTimeout(timer);
    timer = setTimeout(() => { btn.textContent = 'Copy the whole block'; }, 2000);
  });
}

function renderTokens() {
  $('#tokens').innerHTML = TK_TOKENS.map((t) => `
    <div>
      <span class="swatch" style="background:${t.hex}"></span>
      <strong>${esc(t.name)}</strong>
      <span class="hex">${t.hex}</span>
      <span class="use">${esc(t.use)}</span>
    </div>`).join('');
}


// ── T2 ── Pushes per week, from the participation endpoint (one call
// for 52 weeks) and cached, because /toolkit should not spend rate
// limit on every load.
const WEEKS = 20;
const CACHE_KEY = 'tk-participation';
const CACHE_TTL = 6 * 60 * 60 * 1000;

function renderPushes(weeks) {
  const host = $('#pushes');
  if (!host || !weeks || !weeks.length) return;
  const max = Math.max(...weeks, 1);
  $('#pushes-strip').innerHTML = weeks.map((n, i) => {
    const h = Math.max(18, Math.round((n / max) * 100));
    return `<i style="height:${h}%;animation:pushgrow .5s ease-out ${(i * 0.04).toFixed(2)}s both" title="${n} commit${n === 1 ? '' : 's'}"></i>`;
  }).join('');
  $('#pushes-window').textContent = `${weeks.length} weeks`;
  const total = weeks.reduce((a, b) => a + b, 0);
  $('#pushes-total').textContent = `${total.toLocaleString()} commits`;
  host.hidden = false;
}

function cachedParticipation() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, weeks } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? weeks : null;
  } catch (err) { return null; }
}

function loadPushes() {
  const hit = cachedParticipation();
  if (hit) { renderPushes(hit); return; }
  fetch(`https://api.github.com/repos/${TK_REPO}/stats/participation`)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((json) => {
      const weeks = (json.all || []).slice(-WEEKS);
      if (!weeks.length) return;
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), weeks })); } catch (err) { /* private mode */ }
      renderPushes(weeks);
    })
    // The strip stays hidden and the change log is untouched.
    .catch(() => {});
}

// ── T1 ── Accent playground. Lightness and chroma are pinned so every
// hue lands at the same weight; only the samples recolour.
function wireAccentLab() {
  const lab = $('#accent-lab');
  const slider = $('#hue');
  const out = $('#accent-css');
  const copy = $('#copy-accent');
  if (!lab || !slider) return;
  const apply = () => {
    const decl = `--accent: oklch(0.48 0.09 ${slider.value});`;
    lab.style.setProperty('--accent', `oklch(0.48 0.09 ${slider.value})`);
    out.textContent = decl;
    return decl;
  };
  apply();
  slider.addEventListener('input', apply);
  let timer;
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(apply()); } catch (err) { /* nothing to add */ }
    copy.textContent = 'Copied';
    clearTimeout(timer);
    timer = setTimeout(() => { copy.textContent = 'Copy'; }, 2000);
  });
}

// ── X5 ── The component set as data: each entry pairs a live rendering
// with the markup it emits, and the markup uses the real class names so
// a copied snippet works against css/styles.css.
const REGISTRY = [
  { key: 'solid', label: 'Solid button', html: '<a class="btn btn--solid" href="#">See the work</a>' },
  { key: 'accent', label: 'Accent button', html: '<a class="btn btn--accent" href="#">Try Signal</a>' },
  { key: 'ghost', label: 'Ghost button', html: '<a class="btn btn--ghost" href="#">LinkedIn</a>' },
  { key: 'chip', label: 'Chip', html: '<button class="chip is-on">Data</button>' },
  { key: 'label', label: 'Label', html: '<span class="label">Observations</span>' },
  { key: 'seg', label: 'Segmented', html: '<span class="seg"><span class="is-on">Scatter</span><span>Cluster</span></span>' },
  { key: 'tag', label: 'Tech tag', html: '<span class="tag">dbt</span>' },
  { key: 'verify', label: 'Verify pill', html: '<a class="cert__verify" href="#">Verify ↗</a>' },
  { key: 'status', label: 'Status dot', html: '<span class="status"><i class="status__dot"></i><span>Exploring roles</span></span>' },
  { key: 'dot', label: 'Carousel dot', html: '<button class="dot is-on" aria-label="Observation 1"></button>' },
];

let composed = [];

function renderSandbox() {
  const canvas = $('#sandbox-canvas');
  const out = $('#sandbox-out');
  if (!canvas) return;
  if (!composed.length) {
    canvas.innerHTML = '<span class="sandbox__empty">nothing yet, add from the left</span>';
    out.textContent = '<!-- empty -->';
    return;
  }
  canvas.innerHTML = composed.map((c, i) => {
    const entry = REGISTRY.find((r) => r.key === c);
    return `<span class="sandbox__inst">${entry.html}<button type="button" class="sandbox__x" data-remove="${i}" aria-label="Remove ${esc(entry.label)}">×</button></span>`;
  }).join('');
  out.textContent = composed.map((c) => REGISTRY.find((r) => r.key === c).html).join('\n');
}

function wireSandbox() {
  const palette = $('#sandbox-palette');
  const canvas = $('#sandbox-canvas');
  if (!palette) return;
  palette.innerHTML = REGISTRY.map((r) =>
    `<button type="button" data-add="${r.key}">+ ${esc(r.label)}</button>`).join('');
  palette.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]');
    if (!b) return;
    composed.push(b.dataset.add);
    renderSandbox();
  });
  // Removal is a real focusable control, not a click-only affordance.
  canvas.addEventListener('click', (e) => {
    const x = e.target.closest('[data-remove]');
    if (!x) return;
    e.preventDefault();
    composed.splice(Number(x.dataset.remove), 1);
    renderSandbox();
  });
  const copy = $('#copy-sandbox');
  let timer;
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText($('#sandbox-out').textContent); } catch (err) { /* nothing to add */ }
    copy.textContent = 'Copied';
    clearTimeout(timer);
    timer = setTimeout(() => { copy.textContent = 'Copy'; }, 2000);
  });
  renderSandbox();
}

// ── Boot ─────────────────────────────────────────────────────
renderCommits(TK_FALLBACK, false);
renderStatus('loading');
renderAge('2026-06-10');
renderNotes();
renderMeta();
renderHead();
renderTokens();
loadGithub();
loadPushes();
wireAccentLab();
wireSandbox();
