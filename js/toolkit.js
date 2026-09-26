// ============================================================
// js/toolkit.js
// /toolkit. The change log, pushes per week and repo age all come from
// data/changelog.json, which the repo snapshots on every push to main;
// a hand-written list (TK_FALLBACK) stands in if the file cannot be read.
// The notes and copy rows come from data/content.js. Swatches read their
// colour from the live custom properties on :root, and every component
// sample in the HTML is the real class from css/styles.css.
// ============================================================

import { $, $$, esc, onSeen, autoReveal, wait } from './reveal.js?v=20260925i';
import { TK_REPO, TK_FALLBACK, TK_NOTES, TK_META, TK_TOKENS } from '../data/content.js?v=20260925i';

const TZ = 'America/Chicago';
const day = (iso) => new Date(iso.length <= 10 ? `${iso}T12:00:00Z` : iso);

// Relative ages, always recomputed at render.
function ago(iso) {
  if (!iso) return '';
  const days = Math.max(0, Math.round((Date.now() - day(iso)) / 86400000));
  if (days < 1) return 'today';
  if (days < 7) return `${days}${days === 1 ? ' day ago' : ' days ago'}`;
  if (days < 31) { const w = Math.round(days / 7); return `${w}${w === 1 ? ' week ago' : ' weeks ago'}`; }
  if (days < 365) { const m = Math.max(1, Math.round(days / 30.4)); return `${m}${m === 1 ? ' month ago' : ' months ago'}`; }
  const y = days / 365.25;
  return y < 1.2 ? '1 year ago' : `${y.toFixed(1).replace('.0', '')} years ago`;
}
const ymd = (iso) => day(iso).toLocaleDateString('en-CA', { timeZone: TZ });
const mdy = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: TZ });
const md = (iso) => day(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: TZ });
const yr = (iso) => day(iso).toLocaleDateString('en-US', { year: 'numeric', timeZone: TZ });

// ── Staging ──────────────────────────────────────────────────
// Some pieces are built from data after their section is already on
// screen (the snapshot arrives async), so each section remembers it was
// seen and anything rendered into it later still gets its entrance.
const seen = new Set();
const queued = new Map();

function watch(el) {
  onSeen(el, () => {
    seen.add(el);
    (queued.get(el) || []).forEach((fn) => fn());
    queued.delete(el);
  });
}
function whenSeen(el, fn) {
  if (seen.has(el)) { fn(); return; }
  if (!queued.has(el)) queued.set(el, []);
  queued.get(el).push(fn);
}
// Stagger .is-on onto nodes: delay(i) in ms, after their section is seen.
function stage(section, nodes, delay) {
  nodes.forEach((n, i) => n.style.setProperty('--d', `${delay(i) / 1000}s`));
  whenSeen(section, () => requestAnimationFrame(() => requestAnimationFrame(() => nodes.forEach((n) => n.classList.add('is-on')))));
}

const secLog = $('#tk-log');
const secDs = $('#tk-ds');
const secCopy = $('#tk-copy');

// ── Hero stats ───────────────────────────────────────────────
function renderAge(first) {
  $('#tk-first').textContent = md(first);
  $('#tk-age').textContent = `first commit, ${yr(first)} · ${ago(first)}`;
}

// ── 01 · Commits and the push strip ──────────────────────────
function renderCommits(list) {
  const host = $('#tk-commits');
  host.innerHTML = list.map((c) => `
    <a class="tk-commit tk-c tk-c--y" href="${esc(c.href || `https://github.com/${TK_REPO}/commits/main`)}" title="${esc(ago(c.date))}">
      <span class="tk-commit__d">${esc(ymd(c.date))}</span>
      <span class="tk-commit__m">${esc(c.message)}</span>
    </a>`).join('');
  stage(secLog, $$('.tk-commit', host), (i) => 300 + i * 90);
}

function renderStatus(state, generated) {
  const st = $('#tk-feed-status');
  const note = $('#tk-feed-note');
  if (state === 'live') {
    st.textContent = 'latest first · live from the repo';
    note.textContent = `Ten most recent commits, written into the site by the repo's own Action on the last push, ${ago(generated)}.`;
  } else if (state === 'failed') {
    st.textContent = 'snapshot unavailable · my own list';
    note.textContent = 'These are the ones I would have listed by hand.';
  } else {
    st.textContent = 'latest first · reading the snapshot…';
    note.textContent = '';
  }
}

// One stem per week; stems place by date across the strip, the tallest
// week sets the scale, and the latest week with a push is green.
function drawStrip(points, from, to, cap) {
  const host = $('#tk-strip');
  const max = Math.max(1, ...points.map((p) => p.n));
  const lastIdx = points.reduce((k, p, i) => (p.n > 0 ? i : k), -1);
  host.innerHTML = points.map((p, i) => {
    if (!p.n) return '';
    const h = p.fixed ?? Math.round(8 + (p.n / max) * 28);
    return `<span class="tk-strip__w tk-c${i === lastIdx ? ' is-last' : ''}" style="left:${p.x.toFixed(2)}%" title="${esc(p.title)}"><i></i><i style="height:${i === lastIdx && p.fixed ? 30 : h}px"></i></span>`;
  }).join('');
  $('#tk-strip-from').textContent = mdy(from);
  $('#tk-strip-to').textContent = mdy(to);
  $('#tk-strip-cap').textContent = cap;
  const stems = $$('.tk-strip__w', host);
  stage(secLog, stems, (i) => 200 + (i + 1) * Math.min(120, 840 / stems.length));
}

function stripFromWeeks(weeks, generated) {
  const end = day(generated).getTime();
  const W = 7 * 86400000;
  const n = weeks.length;
  const from = new Date(end - n * W);
  const points = weeks.map((c, i) => {
    const wk = new Date(end - (n - i) * W);
    return { n: c, x: (n === 1 ? 50 : (i / (n - 1)) * 94 + 3), title: `${c} commit${c === 1 ? '' : 's'}, week of ${mdy(wk)}` };
  });
  const total = weeks.reduce((a, b) => a + b, 0);
  drawStrip(points, from, new Date(end), `${n} weeks, ${total.toLocaleString()} commits · one stem per week, taller is more · latest in green`);
}

function stripFromDates(list) {
  const ts = list.map((c) => day(c.date).getTime());
  const d0 = Math.min(...ts);
  const d1 = Math.max(...ts);
  const points = list.map((c, i) => ({
    n: 1,
    fixed: 16,
    x: d1 === d0 ? 50 : ((ts[i] - d0) / (d1 - d0)) * 94 + 3,
    title: `${ymd(c.date)} · ${c.message}`,
  })).reverse();
  drawStrip(points, new Date(d0), new Date(d1), 'each dot is a push · latest in green');
}

function applyFallback() {
  renderCommits(TK_FALLBACK);
  stripFromDates(TK_FALLBACK);
  $('#tk-count').textContent = String(TK_FALLBACK.length);
  $('#tk-count-l').textContent = 'pushes worth a line, below';
}

// The change log is a snapshot the repo writes about itself. A small
// Action (.github/workflows/changelog.yml) runs on every push to main and
// commits data/changelog.json, so this page reads a same-origin file
// instead of asking the GitHub API from a visitor's browser. The list can
// never show a commit that is not deployed yet.
function applySnapshot(snap) {
  if (!snap || !Array.isArray(snap.commits) || !snap.commits.length) throw new Error('empty snapshot');
  renderCommits(snap.commits.map((c) => ({
    message: c.message,
    date: c.date,
    href: c.sha ? `https://github.com/${TK_REPO}/commit/${c.sha}` : undefined,
  })));
  renderStatus('live', snap.generated);
  $('#tk-count').textContent = snap.total ? String(snap.total) : `${snap.commits.length}+`;
  $('#tk-count-l').textContent = `commits, the latest ${snap.commits.length} below`;
  if (snap.first) renderAge(snap.first);
  if (Array.isArray(snap.weeks) && snap.weeks.some((n) => n > 0)) stripFromWeeks(snap.weeks, snap.generated || snap.commits[0].date);
  else stripFromDates(snap.commits);
  if (Array.isArray(snap.notes) && snap.notes.length) renderNotes(snap.notes);
  renderPages(snap.pages);
}

// When each page last changed, newest first, from the same snapshot.
function renderPages(pages) {
  const host = $('#tk-pages');
  if (!host) return;
  if (!Array.isArray(pages) || !pages.length) { host.hidden = true; return; }
  host.hidden = false;
  const rows = [...pages].sort((a, b) => day(b.date) - day(a.date));
  $('#tk-pages-rows').innerHTML = rows.map((p) => `
    <a class="tk-page tk-c tk-c--y" href="https://github.com/${TK_REPO}/commit/${esc(p.sha)}" title="${esc(p.message)}">
      <span class="tk-page__l">${esc(p.label)}</span>
      <span class="tk-page__m">${esc(p.message)}</span>
      <span class="tk-page__d">${esc(ago(p.date))}</span>
    </a>`).join('');
  stage(secLog, $$('.tk-page', host), (i) => 300 + i * 60);
}

function loadSnapshot() {
  // The file changes on every push, so revalidate rather than version it.
  fetch('data/changelog.json', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(applySnapshot)
    .catch(() => { renderStatus('failed'); applyFallback(); });
}

// The reasons: commits with a "Why:" line come first, from the snapshot,
// then the hand-written notes in content.js for anything older.
function renderNotes(fromRepo = []) {
  const host = $('#tk-notes');
  const repo = fromRepo.map((n) => ({ date: ymd(n.date), title: n.title, body: n.body }));
  const seenT = new Set(repo.map((n) => n.title));
  const list = [...repo, ...TK_NOTES.filter((n) => !seenT.has(n.title))].slice(0, 8);
  host.innerHTML = list.map((n) => `
    <div class="tk-why tk-c tk-c--y">
      <span class="tk-why__d">${esc(n.date)}</span>
      <span class="tk-why__t">${esc(n.title)}</span>
      <p>${esc(n.body)}</p>
    </div>`).join('');
  stage(secLog, $$('.tk-why', host), (i) => 300 + i * 90);
}

// ── 02 · Swatches read from :root ────────────────────────────
function renderTokens() {
  const css = getComputedStyle(document.documentElement);
  const host = $('#tk-tokens');
  host.innerHTML = TK_TOKENS.map((t) => {
    const val = css.getPropertyValue(t.prop).trim() || t.prop;
    return `
    <div class="tk-token tk-c" title="var(${esc(t.prop)})">
      <i style="background:var(${esc(t.prop)})"></i>
      <b>${esc(t.name)}</b>
      <span>${esc(val)} · ${esc(t.use)}</span>
    </div>`;
  }).join('');
  stage(secDs, $$('.tk-token', host), (i) => 400 + i * 50);
}

// Ten test cases, six of which still break; laid out for the sample.
const BAD = [0, 2, 3, 5, 7, 8];
function renderDots() {
  const host = $('#tk-dots');
  host.innerHTML = Array.from({ length: 10 }, () => '<i></i>').join('');
  const dots = $$('i', host);
  dots.forEach((d, i) => { d.style.transitionDelay = `${(800 + i * 70) / 1000}s`; });
  whenSeen(secDs, () => {
    requestAnimationFrame(() => requestAnimationFrame(() => dots.forEach((d) => d.classList.add('is-on'))));
    wait(1700).then(() => dots.forEach((d, i) => {
      d.style.transitionDelay = '0s';
      if (BAD.includes(i)) d.classList.add('is-bad');
    }));
  });
}

// The accent lab: lightness and chroma pinned, hue free. Only the sample
// row takes the new --accent, and the classes inside it are the real ones.
function wireHue() {
  const range = $('#tk-hue');
  const out = $('#tk-hue-css');
  const box = $('#tk-hue-samples');
  const copy = $('#tk-hue-copy');
  const decl = () => `--accent: oklch(0.47 0.08 ${range.value});`;
  const apply = () => {
    box.style.setProperty('--accent', `oklch(0.47 0.08 ${range.value})`);
    box.style.setProperty('--accent-tint', `oklch(0.95 0.025 ${range.value})`);
    out.textContent = decl();
  };
  apply();
  range.addEventListener('input', apply);
  let timer;
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(decl()); } catch (e) { /* the label still confirms */ }
    copy.textContent = 'Copied ✓';
    clearTimeout(timer);
    timer = setTimeout(() => { copy.textContent = 'Copy'; }, 1400);
  });
}

// ── 04 · Copy against each surface's limit ───────────────────
// The current value of each row is read from the live home page's <head>,
// so it can never drift from what ships; content.js only holds the limit
// and the reason, and its `current` is the fallback if the fetch fails.
const META_ORDER = ['<title>', 'description', 'og:title', 'og:description'];
function readHead(doc) {
  const get = (sel) => doc.querySelector(sel)?.getAttribute('content')?.trim();
  return {
    '<title>': doc.querySelector('title')?.textContent.trim(),
    description: get('meta[name="description"]'),
    'og:title': get('meta[property="og:title"]'),
    'og:description': get('meta[property="og:description"]'),
  };
}
function loadMeta() {
  fetch('./', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((html) => renderMeta(readHead(new DOMParser().parseFromString(html, 'text/html'))))
    .catch(() => renderMeta({}));
}
function renderMeta(live = {}) {
  const rows = META_ORDER.map((k) => TK_META.find((m) => m.key === k)).filter(Boolean)
    .map((m) => ({ ...m, current: live[m.key] || m.current }));
  const host = $('#tk-meta');
  host.innerHTML = rows.map((m) => {
    const n = m.current.length;
    return `
    <div class="tk-meta" title="${esc(m.why)}">
      <span class="tk-meta__k">${esc(m.key)}</span>
      <span class="tk-meta__v">${esc(m.current)}</span>
      <span class="tk-meta__m">
        <span class="tk-meta__bar"><i class="${n > m.max ? 'is-over' : ''}" data-w="${Math.min(100, (n / m.max) * 100).toFixed(1)}"></i></span>
        <span class="tk-meta__n">${n} / ${m.max} chars</span>
      </span>
    </div>`;
  }).join('');
  const bars = $$('.tk-meta__bar i', host);
  bars.forEach((b, i) => b.style.setProperty('--d', `${(200 + i * 150) / 1000}s`));
  whenSeen(secCopy, () => requestAnimationFrame(() => requestAnimationFrame(() => bars.forEach((b) => { b.style.width = `${b.dataset.w}%`; }))));
}

// ── Boot ─────────────────────────────────────────────────────
[secLog, secDs, $('#tk-mark'), secCopy].forEach(watch);
autoReveal();
renderAge('2026-05-20');
renderStatus('loading');
renderNotes();
renderTokens();
renderDots();
wireHue();
loadMeta();
loadSnapshot();
