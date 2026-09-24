// ============================================================
// js/pixels.js
// /pixels · Life in Pixels, replayed.
//
// Every run on this page is copied from the eval results in
// github.com/SamieVargas/pixels-rag (data/pixels-runs.json is
// built from evals/results/2026-09-22.json, the golden set and
// the chunking ablation). Nothing is live and nothing is computed
// here beyond formatting; if a number is on the page it is in
// that file.
//
// State: the selected question, the kind filter, and the time
// since selection, which drives the trace (route at 150ms,
// retrieve at 650ms, the answer box at 1150ms, the answer typing
// from 1300ms over 1800ms, validate at 3300ms).
// ============================================================

import { REDUCED, $, esc, onSeen, autoReveal } from './reveal.js?v=20260925a';

const DATA_URL = '../data/pixels-runs.json?v=20260925a';
const KINDS = ['all', 'semantic', 'filter', 'aggregate', 'unanswerable'];
const AT = { route: 150, retrieve: 650, answerBox: 1150, typeFrom: 1300, typeMs: 1800, validate: 3300 };

const state = { data: null, sel: 'S01', kind: 'all', selAt: 0 };
let frame = 0;

const pct = (x) => `${Math.round(x * 100)}%`;
const secs = (ms) => `${(ms / 1000).toFixed(1)}s`;
const usd = (x) => `$${(x || 0).toFixed(4)}`;

// ── Stats strip ───────────────────────────────────────────────
function renderStats(d) {
  const a = d.aggregate;
  const cells = [
    [pct(a.route_accuracy), `route accuracy, ${a.n} questions`],
    [pct(a.citations_valid), 'valid citations'],
    [pct(a.facts), 'expected facts in the answer'],
    [`${a.abstained_when_should[0]} of ${a.abstained_when_should[1]}`, 'unanswerable, refused'],
    [secs(a.mean_latency_ms), 'mean latency'],
    [usd(a.mean_cost_usd), `mean cost · ${d.prices.model}`],
  ];
  $('#px-stats').innerHTML = cells.map(([v, l]) => `<div class="px-stat"><span class="px-stat__v">${esc(v)}</span><span class="px-stat__l">${esc(l)}</span></div>`).join('');
}

// ── Kind filter and question list ─────────────────────────────
function renderKinds() {
  $('#px-kinds').innerHTML = KINDS.map((k) => `<button type="button" class="px-kind" data-kind="${k}" aria-pressed="${k === state.kind}">${k}</button>`).join('');
}

function renderList() {
  const rows = state.data.records.filter((r) => state.kind === 'all' || r.kind === state.kind);
  $('#px-list').innerHTML = rows.map((r) => `
    <button type="button" class="px-q px-k--${esc(r.kind)}" data-id="${esc(r.id)}" aria-pressed="${r.id === state.sel}">
      <span class="px-q__id">${esc(r.id)}</span><span class="px-q__text">${esc(r.question)}</span>
    </button>`).join('');
}

// ── One trace ─────────────────────────────────────────────────
const chip = (t, tone = '') => `<span class="px-chip${tone ? ` px-chip--${tone}` : ''}">${esc(t)}</span>`;

function step({ n, who, tone, text, chips }) {
  return `<div class="px-step px-step--${tone}">
      <span class="px-step__k"><span class="px-step__n">${esc(n)}</span><span class="px-step__who">${esc(who)}</span></span>
      <span class="px-step__b"><span class="px-step__text">${esc(text)}</span>${chips.length ? `<span class="px-chips">${chips.join('')}</span>` : ''}</span>
    </div>`;
}

function renderTrace(r) {
  const days = r.retrieved || [];
  const shownDays = days.slice(0, 12);
  const q = (r.plan || {}).rewritten_query;
  const ok = r.validation_ok;

  let retrieveText;
  if (days.length) retrieveText = `${days.length} day${days.length === 1 ? '' : 's'} pulled or computed before the model saw anything.`;
  else if (r.should_abstain) retrieveText = 'Nothing retrieved, which is the right outcome for this question.';
  else if (r.abstained) retrieveText = 'Nothing retrieved, so the answer had no days to cite and it declined, which the eval counts as a miss.';
  else retrieveText = 'Nothing retrieved.';

  let validateText = r.citations_valid ? 'Every cited day exists in what was retrieved.' : 'A cited day was not in what was retrieved.';
  if (r.retries) validateText += ` It took ${r.retries} reject-and-retry.`;
  if (r.validator_note) validateText += ` ${r.validator_note}`;
  else if (r.violations && r.violations.length) validateText += ` Kept violation: ${r.violations.join('; ')}.`;

  $('#px-cur-meta').textContent = `${r.id} · ${r.kind}`;
  $('#px-cur-q').textContent = r.question;
  const trace = $('#px-trace');
  trace.className = `px-trace px-k--${r.kind}`;

  $('#px-steps').innerHTML = [
    step({
      n: '1 · Route', who: 'model call', tone: 'kind',
      text: `The router read the question as ${r.route}${r.route_ok ? ', which is the expected route.' : ', which is not the expected route.'}`,
      chips: [chip(r.route, 'kind'), ...(q ? [chip(`query: ${q}`)] : [])],
    }),
    step({
      n: '2 · Retrieve', who: 'code', tone: 'ink', text: retrieveText,
      chips: [...shownDays.map((x) => chip(x)), ...(days.length > shownDays.length ? [chip(`+${days.length - shownDays.length} more`, 'more')] : [])],
    }),
    `<div class="px-step px-step--kind px-step--answer">
      <span class="px-step__k"><span class="px-step__n">3 · Answer</span><span class="px-step__who">model call</span></span>
      <span class="px-answer"><span id="px-typed"></span><span class="cursor" id="px-cur" aria-hidden="true">▍</span></span>
    </div>`,
    step({
      n: '4 · Validate', who: 'code', tone: ok ? 'ok' : 'bad', text: validateText,
      chips: [chip(ok ? '✓ shown' : '✕ flagged', ok ? 'ok' : 'bad'), chip(secs(r.latency_ms)), chip(usd(r.cost_usd))],
    }),
  ].join('');
  // A screen reader gets the whole answer at once, not the typing.
  $('#px-typed').setAttribute('aria-label', r.answer || '');
}

// Drive the trace off the time since selection.
function play() {
  cancelAnimationFrame(frame);
  const r = state.data.records.find((x) => x.id === state.sel) || state.data.records[0];
  renderTrace(r);
  const steps = [...document.querySelectorAll('#px-steps .px-step')];
  const [route, retrieve, answer, validate] = steps;
  const typed = $('#px-typed');
  const cur = $('#px-cur');
  const A = r.answer || '';
  const tick = () => {
    const t = REDUCED ? Infinity : performance.now() - state.selAt;
    route.classList.toggle('is-on', t > AT.route);
    retrieve.classList.toggle('is-on', t > AT.retrieve);
    answer.classList.toggle('is-on', t > AT.answerBox);
    validate.classList.toggle('is-on', t > AT.validate);
    const p = Math.min(1, Math.max(0, (t - AT.typeFrom) / AT.typeMs));
    const n = Math.round(p * A.length);
    if (typed.textContent.length !== n) typed.textContent = A.slice(0, n);
    cur.hidden = n >= A.length;
    if (t <= AT.validate || n < A.length) frame = requestAnimationFrame(tick);
  };
  tick();
}

function select(id, fromClick) {
  state.sel = id;
  state.selAt = performance.now();
  document.querySelectorAll('.px-q').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  play();
  if (fromClick) {
    try { history.replaceState(null, '', `#${id}`); } catch (e) { /* fine */ }
    if (window.innerWidth <= 860) $('#px-trace').scrollIntoView({ block: 'start', behavior: REDUCED ? 'auto' : 'smooth' });
  }
}

// ── Ablation ──────────────────────────────────────────────────
function renderAblation(ab) {
  $('#px-abl-title').textContent = ab.title.replace(/`/g, '');
  $('#px-abl-rows').innerHTML = ab.measures.map(([k, a, b]) => `<div class="px-abl__row"><span>${esc(k)}</span><span class="px-mono">${esc(a)}</span><span class="px-mono px-abl__b">${esc(b)}</span></div>`).join('');
  $('#px-bars').innerHTML = ab.per_question.map(([id, a, b], i) => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    return `<div class="px-bar" style="--d:${(i * 0.06).toFixed(2)}s" title="${esc(id)}: ${esc(a)} → ${esc(b)}">
      <div class="px-bar__pair"><i class="d px-bar__a" style="height:${x}%"></i><i class="d px-bar__b${y > x ? ' is-up' : ''}" style="height:${y}%"></i></div>
      <span class="px-bar__id">${esc(id)}</span></div>`;
  }).join('');
}

// ── Boot ──────────────────────────────────────────────────────
async function boot() {
  autoReveal();
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(String(res.status));
    state.data = await res.json();
  } catch (e) {
    $('#px-cur-q').innerHTML = 'The recorded runs did not load. They live in <a href="https://github.com/SamieVargas/pixels-rag/tree/main/evals/results">evals/results</a> in the repo.';
    return;
  }
  const d = state.data;
  const want = (location.hash || '').replace('#', '');
  if (d.records.some((r) => r.id === want)) state.sel = want;

  renderStats(d);
  renderKinds();
  renderList();
  renderAblation(d.ablation);

  $('#px-kinds').addEventListener('click', (e) => {
    const b = e.target.closest('.px-kind');
    if (!b) return;
    state.kind = b.dataset.kind;
    renderKinds();
    renderList();
  });
  $('#px-list').addEventListener('click', (e) => {
    const b = e.target.closest('.px-q');
    if (b) select(b.dataset.id, true);
  });

  // The first trace plays once it is on screen.
  const r = d.records.find((x) => x.id === state.sel);
  $('#px-cur-meta').textContent = `${r.id} · ${r.kind}`;
  $('#px-cur-q').textContent = r.question;
  onSeen($('#px-trace'), () => select(state.sel, false));
}

boot();
