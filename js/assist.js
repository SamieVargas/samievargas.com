// ============================================================
// js/assist.js
// /assist · Guideline Assist, replayed.
//
// Every suggestion and every QA status on this page is copied from
// the keyed eval results in github.com/SamieVargas/guideline-assist
// (data/assist-replay.json is written by evals/export_viewer.py from
// evals/results/assist-2026-09-24.json, qa-2026-09-24.json and the
// shadow, injection, intent and hand-label files beside them). Nothing
// is live and nothing is computed here beyond formatting and counting
// what is in that file.
//
// State: the selected chat, how many of its turns are shown, and
// whether it is playing. The assist at call point p saw turns[:p.i],
// so its suggestion shows once p.i turns are on screen, and turn p.i
// (what the agent actually did) shows after it.
// ============================================================

import { REDUCED, $, esc, onSeen, autoReveal } from './reveal.js?v=20260925f';

const DATA_URL = '../data/assist-replay.json?v=20260925f';
const REPO = 'https://github.com/SamieVargas/guideline-assist';
const TURN_MS = 750;
const HOLD_MS = 2200;
// Flow hues from the style guide's category set, one per ABCD flow.
const FLOW_HUE = { account_access: 200, troubleshoot_site: 145, manage_account: 250, order_issue: 60, storewide_query: 290, subscription_inquiry: 330, product_defect: 60, shipping_issue: 145, purchase_dispute: 330, single_item_query: 200 };
const MODEL = { 'claude-sonnet-5': 'Sonnet 5', 'claude-haiku-4-5-20251001': 'Haiku 4.5' };

const state = { data: null, conv: null, shown: 0, playing: false };
let timer = 0;

const pct = (x, d = 1) => `${(x * 100).toFixed(d)}%`;
const kn = (o) => `${o.k} of ${o.n}`;
const secs = (ms) => `${(ms / 1000).toFixed(1)} s`;
const words = (s) => String(s).replace(/_/g, ' ');
const chip = (t, tone = '') => `<span class="px-chip${tone ? ` px-chip--${tone}` : ''}">${esc(t)}</span>`;
const call = (a, v) => `${a}${v && v.length ? `(${v.join(', ')})` : ''}`;

// ── Stats strip: four cells, two pairs ────────────────────────
function renderStats(s) {
  const cell = (v, l) => `<div class="px-stat"><span class="px-stat__v">${esc(v)}</span><span class="px-stat__l">${esc(l)}</span></div>`;
  $('#as-stats').innerHTML =
    `<div class="as-stats__pair">${cell(pct(s.shadow.k / s.shadow.n), `shadow: matched what the agent did next, ${kn(s.shadow)}`)}${cell(pct(s.hand_labels.k / s.hand_labels.n), `QA steps where it agreed with my hand labels, ${kn(s.hand_labels)}`)}</div>` +
    `<div class="as-stats__pair">${cell(kn(s.injection), 'injected customer lines that left the suggestion where it was')}${cell(pct(s.conversation_intent.k / s.conversation_intent.n), `whole-chat intent over 55 subflows, ${kn(s.conversation_intent)}`)}</div>`;
}

// ── Chat list ─────────────────────────────────────────────────
function renderList(d) {
  $('#as-list').innerHTML = d.replay.map((c) => {
    const acts = c.points.filter((p) => p.kind === 'action');
    return `<button type="button" class="px-q" style="--k:oklch(0.5 0.1 ${FLOW_HUE[c.flow] ?? 200})" data-id="${esc(c.id)}" aria-pressed="false">
      <span class="px-q__id">${esc(c.id)}</span><span class="px-q__text">${esc(c.section)}<span class="as-q__sub">${c.turns.length} turns · ${acts.length} agent actions · ${c.points.length} assist calls</span></span>
    </button>`;
  }).join('');
  $('#as-pick-cap').textContent = `Six chats from the frozen 100-chat test sample (assist_100, ${d.samples.assist_100}), taking the first chat in each flow with three or more agent actions, so none were picked for how the assist did on them.`;
}

// ── One chat ──────────────────────────────────────────────────
function turnHTML(t, c) {
  const called = c.points.find((p) => p.i === t.i);
  const mark = called ? `<li class="as-t as-t--call" data-call="${t.i}"><span class="as-t__who">assist</span><span>${esc(called.next_action === 'none_yet' ? 'wait for the customer' : call(called.next_action, called.slot_values))}</span></li>` : '';
  const body = t.speaker === 'action' ? `<code>${esc(call(t.action, t.values))}</code>` : esc(t.text);
  return `${mark}<li class="as-t as-t--${esc(t.speaker)}" data-i="${t.i}"><span class="as-t__who">${t.i} · ${esc(t.speaker)}</span><span class="as-t__text">${body}</span></li>`;
}

function renderConv(c) {
  const acts = c.points.filter((p) => p.kind === 'action');
  $('#as-cur-meta').textContent = `chat ${c.id} · ${words(c.flow)} · ${acts.filter((p) => p.action_ok).length} of ${acts.length} next actions right`;
  $('#as-cur-q').textContent = c.section;
  $('#as-trace').style.setProperty('--k', `oklch(0.5 0.1 ${FLOW_HUE[c.flow] ?? 200})`);
  $('#as-log').innerHTML = c.turns.map((t) => turnHTML(t, c)).join('');
}

// What the agent did at turn i or later, for a no-action point.
const nextLogged = (c, i) => (c.turns.find((t) => t.i >= i && t.speaker === 'action') || {}).action;

function outcome(c, p) {
  if (p.kind === 'action') {
    const did = call(p.gold_action, p.gold_values);
    return p.action_ok
      ? `<p class="as-out as-out--ok">✓ The agent did <code>${esc(did)}</code> next.</p>`
      : `<p class="as-out as-out--bad">✕ The agent did <code>${esc(did)}</code> next.</p>`;
  }
  if (p.action_ok) return '<p class="as-out as-out--ok">✓ Nothing was due until the customer replied, and the assist said to wait.</p>';
  const later = nextLogged(c, p.i);
  if (later === p.next_action) return `<p class="as-out as-out--early">Early: nothing was due until the customer replied, and <code>${esc(later)}</code> is what the agent did after they did.</p>`;
  return '<p class="as-out as-out--bad">✕ Nothing was due until the customer replied, and the agent never took this step here.</p>';
}

function renderPanel() {
  const c = state.conv;
  const past = c.points.filter((p) => p.i <= state.shown);
  const p = past[past.length - 1];
  const n = c.points.indexOf(p);
  $('#as-pos').textContent = p ? `call ${n + 1} of ${c.points.length}` : `${c.points.length} calls in this chat`;
  document.querySelectorAll('#as-log .as-t--call').forEach((el) => el.classList.toggle('is-cur', p && Number(el.dataset.call) === p.i));
  const panel = $('#as-panel');
  if (!p) {
    panel.innerHTML = `<span class="as-k">live assist</span><p class="as-panel__wait">The assist runs before each agent turn, and the first recorded call in this chat is before turn ${c.points[0].i}.</p>`;
    return;
  }
  const next = p.next_action === 'none_yet' ? chip('wait for the customer') : chip(p.next_action, 'kind');
  panel.innerHTML = `
    <span class="as-k">live assist · before turn ${p.i} · ${secs(p.latency_ms)}</span>
    <div class="as-panel__row"><span class="as-k">intent</span><span class="px-chips">${chip(p.intent, p.intent_ok ? 'ok' : 'bad')}</span></div>
    <div class="as-panel__row"><span class="as-k">section</span><span>${esc(p.section || p.section_id)}</span></div>
    <div class="as-panel__row"><span class="as-k">next step</span><span class="px-chips">${next}${(p.slot_values || []).map((v) => chip(v)).join('')}</span></div>
    <p class="as-panel__say">${esc(p.suggestion)}</p>
    ${state.shown > p.i ? outcome(c, p) : '<p class="as-out as-out--wait">what the agent did shows with the next turn</p>'}`;
}

function paint() {
  const log = $('#as-log');
  log.querySelectorAll('.as-t').forEach((el) => {
    const i = el.dataset.call !== undefined ? Number(el.dataset.call) : Number(el.dataset.i) + 1;
    el.classList.toggle('is-on', i <= state.shown);
  });
  renderPanel();
  const on = log.querySelectorAll('.as-t.is-on');
  const last = on[on.length - 1];
  if (last) log.scrollTop = Math.max(0, last.offsetTop + last.offsetHeight - log.clientHeight + 8);
}

function stop() { clearTimeout(timer); state.playing = false; }

function tick() {
  const c = state.conv;
  if (state.shown >= c.turns.length) { state.playing = false; return; }
  state.shown += 1;
  paint();
  const hold = c.points.some((p) => p.i === state.shown);
  timer = setTimeout(tick, hold ? HOLD_MS : TURN_MS);
}

function play(fromStart) {
  stop();
  const c = state.conv;
  if (REDUCED) { state.shown = c.turns.length; paint(); return; }
  if (fromStart) state.shown = 0;
  state.playing = true;
  paint();
  timer = setTimeout(tick, TURN_MS);
}

function jump(dir) {
  stop();
  const c = state.conv;
  const cur = c.points.filter((p) => p.i <= state.shown).length - 1;
  const p = c.points[Math.min(c.points.length - 1, Math.max(0, cur + dir))];
  state.shown = p.i;
  paint();
  timer = setTimeout(() => { state.shown = p.i + 1; paint(); }, REDUCED ? 0 : 900);
}

function select(id, fromClick) {
  state.conv = state.data.replay.find((c) => c.id === id) || state.data.replay[0];
  document.querySelectorAll('#as-list .px-q').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === state.conv.id)));
  renderConv(state.conv);
  play(true);
  if (fromClick) {
    try { history.replaceState(null, '', `#conv-${state.conv.id}`); } catch (e) { /* fine */ }
    if (window.innerWidth <= 860) $('#as-trace').scrollIntoView({ block: 'start', behavior: REDUCED ? 'auto' : 'smooth' });
  }
}

// ── 02 · QA on planted defects ────────────────────────────────
function what(e) {
  const d = e.detail;
  if (e.kind === 'remove') return `This copy of chat ${e.twin} has the <code>${esc(e.target[0])}</code> step taken out of its action log, so the right answer is that step marked missed.`;
  if (e.kind === 'swap') return `This copy of chat ${e.twin} has <code>${esc(e.target[0])}</code> and <code>${esc(e.target[1])}</code> logged in each other's places, so the right answer is either one marked out of order.`;
  const m = /value '(.+)' -> '(.+)'/.exec(d) || [];
  return `This copy of chat ${e.twin} has <code>${esc(e.target[0])}</code> logged with “${esc(m[2])}” where the customer typed “${esc(m[1])}”, so the right answer is that step marked wrong value.`;
}

const STATUS_TONE = { followed: 'ok', missed: 'bad', out_of_order: 'bad', wrong_value: 'bad' };
const status = (s) => chip(words(s.status), STATUS_TONE[s.status] || '');

function renderQA(e, d) {
  document.querySelectorAll('#as-qa-tabs .px-kind').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kind === e.kind)));
  $('#as-qa-what').innerHTML = what(e);
  $('#as-qa-steps').innerHTML =
    '<div class="as-steps__row as-steps__row--head"><span>required step</span><span>rules only</span><span>Sonnet 5</span></div>' +
    e.steps.map((s) => `<div class="as-steps__row${s.planted ? ' is-planted' : ''}">
      <span class="px-mono">${esc(s.action)}${s.planted ? '<span class="as-steps__tag">planted</span>' : ''}</span>
      <span>${status(s.rules)}</span>
      <span class="as-steps__m">${status(s.model)}${s.model.note ? `<span class="as-steps__note">${esc(s.model.note)}</span>` : ''}</span>
    </div>`).join('');
  $('#as-qa-cap').textContent = `Chat ${e.twin} (${e.subflow}), copy ${e.id}, from the QA sample (qa_100, ${d.samples.qa_100}): the first copy of each defect kind in sample order, ${e.caught ? 'which Sonnet caught' : 'which Sonnet missed'}. Source: ${d.source_files.qa}.`;
  const planted = new Set(e.target);
  $('#as-qa-log').innerHTML = e.turns.filter((t) => t.speaker === 'action').map((t) =>
    `<li class="${planted.has(t.action) && e.kind !== 'remove' ? 'is-planted' : ''}"><span class="as-actlog__i">turn ${t.i}</span><code>${esc(call(t.action, t.values))}</code></li>`).join('');
}

function renderQASummary(q) {
  const r = q.summary.rules;
  const m = q.summary['claude-sonnet-5'];
  const rows = [
    ['clean chats flagged anyway', kn(r.false_flag_conversations), kn(m.false_flag_conversations)],
    ['removed steps caught', kn(r.recall.remove), kn(m.recall.remove)],
    ['swapped steps caught', kn(r.recall.swap), kn(m.recall.swap)],
    ['changed values caught', kn(r.recall.value), kn(m.recall.value)],
    ['wrong-value flags that were right', `${kn(r.precision.wrong_value)} · ${pct(r.precision.wrong_value.rate)}`, `${kn(m.precision.wrong_value)} · ${pct(m.precision.wrong_value.rate)}`],
  ];
  $('#as-qa-rows').innerHTML = rows.map(([k, a, b]) => `<div class="px-abl__row as-qa__row"><span>${esc(k)}</span><span class="px-mono">${esc(a)}</span><span class="px-mono px-abl__b">${esc(b)}</span></div>`).join('');
}

// ── 03 · Ablation ─────────────────────────────────────────────
function renderAblation(d) {
  $('#as-abl-rows').innerHTML = d.ablation.map((a) => {
    const pick = a.arm === d.arm && a.model === d.model;
    return `<div class="px-abl__row as-abl__row${pick ? ' is-pick' : ''}"><span>${esc(a.arm)} · ${esc(MODEL[a.model] || a.model)}</span><span class="px-mono">${pct(a.next_action.rate)}</span><span class="px-mono">${pct(a.intent.rate)}</span><span class="px-mono">${secs(a.p95_ms)}</span><span class="px-mono">$${Math.round(a.cost_per_1000)}</span></div>`;
  }).join('');
  const a = d.ablation[0];
  $('#as-abl-cap').textContent = `${a.n_action} action points and ${a.n_points} call points over 100 test chats (assist_100, ${d.samples.assist_100}). Cost is the mean cost per call times ${d.triggers_per_conversation} calls per chat times 1,000, at list prices read on ${d.prices_read_on}. Source: ${d.source_files.assist}.`;
}

// ── Boot ──────────────────────────────────────────────────────
async function boot() {
  autoReveal();
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(String(res.status));
    state.data = await res.json();
  } catch (e) {
    $('#as-cur-q').innerHTML = `The recorded runs did not load. They live in <a href="${REPO}/tree/main/evals/results">evals/results</a> in the repo.`;
    return;
  }
  const d = state.data;
  renderStats(d.stats);
  renderList(d);
  renderQASummary(d.qa);
  renderAblation(d);

  const ex = d.qa.examples;
  $('#as-qa-tabs').innerHTML = ex.map((e) => `<button type="button" class="px-kind" data-kind="${esc(e.kind)}" aria-pressed="false">${esc(e.kind === 'remove' ? 'a step removed' : e.kind === 'swap' ? 'two steps swapped' : 'a value changed')}</button>`).join('');
  renderQA(ex[0], d);
  $('#as-qa-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('.px-kind');
    if (b) renderQA(ex.find((x) => x.kind === b.dataset.kind), d);
  });

  $('#as-list').addEventListener('click', (e) => {
    const b = e.target.closest('.px-q');
    if (b) select(b.dataset.id, true);
  });
  $('#as-prev').addEventListener('click', () => jump(-1));
  $('#as-next').addEventListener('click', () => jump(1));
  $('#as-again').addEventListener('click', () => play(true));

  // The first chat plays once it is on screen.
  const want = (location.hash || '').replace('#conv-', '');
  const first = d.replay.some((c) => c.id === want) ? want : d.replay[0].id;
  state.conv = d.replay.find((c) => c.id === first);
  renderConv(state.conv);
  document.querySelectorAll('#as-list .px-q').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === first)));
  onSeen($('#as-trace'), () => select(first, false));
}

boot();
