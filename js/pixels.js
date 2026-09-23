// ============================================================
// js/pixels.js
// /pixels — Life in Pixels, replayed.
//
// Every run on this page is copied from the eval results in
// github.com/SamieVargas/pixels-rag (data/pixels-runs.json is
// built from evals/results/2026-09-22.json, the golden set, the
// follow-up run and the chunking ablation). Nothing is live and
// nothing is computed here beyond formatting; if a number is on
// the page it is in that file.
// ============================================================

const DATA_URL = '../data/pixels-runs.json?v=20260923f';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`);
const usd = (x) => (x == null ? '—' : `$${x.toFixed(4)}`);
const secs = (ms) => (ms == null ? '—' : `${(ms / 1000).toFixed(1)} s`);
const num = (n) => (n == null ? '—' : Number(n).toLocaleString('en-US'));

// The router's four kinds, in the words the site already uses.
const KIND = {
  semantic: { word: 'a search', order: 1, head: 'Search', sub: 'dense retrieval over day chunks' },
  filter: { word: 'a filter', order: 2, head: 'Filter', sub: 'runs in code, no retrieval' },
  aggregate: { word: 'a sum', order: 3, head: 'Sum', sub: 'computed in code over the matching days' },
  unanswerable: { word: 'unanswerable', order: 4, head: 'Unanswerable', sub: 'the log does not track it' },
};

let DATA = null;
let current = null;

// ── Stats strip ───────────────────────────────────────────────
function renderStats(a) {
  const cells = [
    [pct(a.route_accuracy), 'Route accuracy, 26 questions'],
    [pct(a.citations_valid), 'Answers whose every cited day exists'],
    [pct(a.facts), 'Expected facts found in the answer'],
    [`${a.abstained_when_should[0]} of ${a.abstained_when_should[1]}`, 'Unanswerable questions refused'],
    [String(a.hard_fails), 'Hard fails'],
    [secs(a.mean_latency_ms), 'Mean latency per question'],
    [usd(a.mean_cost_usd), `Per question at ${DATA.prices.model} list price`],
  ];
  $('#px-stats').innerHTML = cells.map(([v, l]) => `<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('');
}

// ── Question list ─────────────────────────────────────────────
function renderList() {
  const groups = {};
  DATA.records.forEach((r) => { (groups[r.kind] = groups[r.kind] || []).push(r); });
  const kinds = Object.keys(groups).sort((a, b) => KIND[a].order - KIND[b].order);
  $('#px-list').innerHTML = kinds.map((k) => `
    <div class="px-group">
      <p class="px-group__head"><span>${esc(KIND[k].head)}</span><em>${esc(KIND[k].sub)}</em></p>
      ${groups[k].map((r) => `
        <button type="button" class="px-q" data-id="${esc(r.id)}" aria-pressed="false">
          <span class="px-q__id">${esc(r.id)}</span>
          <span class="px-q__text">${esc(r.question)}</span>
          <span class="px-q__mark" aria-hidden="true">${r.hard_fail ? '✕' : (r.violations.length || (r.abstained && !r.should_abstain)) ? '△' : '✓'}</span>
        </button>`).join('')}
    </div>`).join('');
  $('#px-list').addEventListener('click', (e) => {
    const b = e.target.closest('.px-q');
    if (b) select(b.dataset.id, true);
  });
}

// ── One trace ─────────────────────────────────────────────────
function planLine(r) {
  const p = r.plan || {};
  const bits = [];
  if (p.date_phrase) bits.push(`date phrase <b>“${esc(p.date_phrase)}”</b>, resolved in code`);
  if (p.filters && p.filters.length) bits.push('filters ' + p.filters.map((f) => `<code>${esc(f.field)} ${esc(f.op)} ${esc(String(f.value))}</code>`).join(', '));
  const a = p.aggregate || {};
  if (a.stat || a.metric) bits.push(`<code>${esc(a.stat || '')} ${esc(a.metric || '')}${a.group_by ? ' by ' + esc(a.group_by) : ''}</code>`.replace(/\s+/g, ' '));
  if (p.rewritten_query) bits.push(`search text <b>“${esc(p.rewritten_query)}”</b>`);
  return bits.length ? bits.join(' · ') : 'no filters, no dates, no rewrite';
}

function datesBlock(r) {
  if (!r.retrieved || !r.retrieved.length) return '';
  const exp = new Set(r.expected_dates || []);
  const shown = r.retrieved.slice(0, 48);
  return `<div class="px-dates" aria-label="Days used">${shown.map((d) => `<span class="${exp.has(d) ? 'is-expected' : ''}">${esc(d)}</span>`).join('')}${r.retrieved.length > shown.length ? `<span class="px-dates__more">+${r.retrieved.length - shown.length} more</span>` : ''}</div>`;
}

function stepTwo(r) {
  const n = r.retrieved ? r.retrieved.length : 0;
  const expN = (r.expected_dates || []).length;
  if (r.kind === 'semantic') {
    const rec = r.recall || {};
    return {
      title: `Retrieved ${n} day${n === 1 ? '' : 's'} by similarity`,
      body: `The golden set expected ${expN} day${expN === 1 ? '' : 's'}, marked below. Recall@5 <b>${pct(rec['5'])}</b> · MRR <b>${r.mrr == null ? '—' : r.mrr.toFixed(2)}</b>.${datesBlock(r)}`,
    };
  }
  if (r.kind === 'filter') {
    return {
      title: `${n} day${n === 1 ? '' : 's'} matched the filter, in code`,
      body: `No embeddings were consulted. The filter above ran over the whole export and the result is ${r.exact === true ? '<b>exactly</b> the expected set' : r.exact === false ? '<b>not</b> the expected set' : 'listed below'}.${datesBlock(r)}`,
    };
  }
  if (r.kind === 'aggregate') {
    return {
      title: `Computed in code over ${n} day${n === 1 ? '' : 's'}`,
      body: `The statistic is calculated from the table, not asked of the model. The model only gets the computed rows and the days behind them to write from.${datesBlock(r)}`,
    };
  }
  return {
    title: 'No retrieval',
    body: 'The router marked the question unanswerable, so nothing was fetched and the answer step was asked to say so rather than guess.',
  };
}

function stepFour(r) {
  const rows = [];
  rows.push(`Cited days all exist: <b>${r.citations_valid ? 'yes' : 'no'}</b>`);
  if (r.violations && r.violations.length) {
    rows.push(`Kept violation: <span class="px-violation">${r.violations.map(esc).join('; ')}</span>`);
  } else if (r.kind !== 'unanswerable') {
    rows.push('Every number in the answer appears in a cited day: <b>yes</b>');
  }
  // `retries` is how many times the validator sent the reply back (max 1);
  // `violations` are the ones that still stood after that.
  if (r.retries === 0) rows.push('Passed validation on the first reply: <b>yes</b>');
  else if (r.retries === 1 && !(r.violations && r.violations.length)) rows.push('First reply failed validation, the one retry passed: <b>yes</b>');
  else if (r.retries === 1) rows.push('Retried once; the violation above stood, and the answer was kept because it was not a hard fail');
  else rows.push(`Reject-and-retry used: <b>${r.retries == null ? '—' : r.retries}</b>`);
  if (r.facts != null && (r.expected_facts || []).length) {
    const k = Math.round(r.facts * r.expected_facts.length);
    rows.push(`Expected facts present: <b>${k} of ${r.expected_facts.length}</b> (${r.expected_facts.map((f) => `“${esc(f)}”`).join(', ')})`);
  }
  if (r.abstained && !r.should_abstain) rows.push('Abstained when the golden set expected an answer: <span class="px-violation">a miss, counted against recall</span>');
  if (r.abstained && r.should_abstain) rows.push('Refused, as the golden set expected: <b>yes</b>');
  rows.push(`Hard fail: <b>${r.hard_fail ? 'yes' : 'no'}</b>`);
  return rows;
}

function renderTrace(r) {
  const two = stepTwo(r);
  const t = r.tokens || {};
  $('#px-trace').innerHTML = `
    <div class="px-trace__head">
      <p class="label label--mid">${esc(r.id)} · ${esc(KIND[r.kind].head)}${r.notes ? ` · <span class="px-notes">${esc(r.notes)}</span>` : ''}</p>
      <h3 class="px-question">“${esc(r.question)}”</h3>
    </div>

    <ol class="px-steps">
      <li class="px-step">
        <div class="px-step__k"><span class="px-n">1</span><span class="px-tag px-tag--model">model</span></div>
        <div class="px-step__b">
          <h4>Route: ${esc(KIND[r.route] ? KIND[r.route].word : r.route)} ${r.route_ok ? '<span class="px-ok">matched the golden plan</span>' : '<span class="px-violation">did not match the golden plan</span>'}</h4>
          <p>${planLine(r)}</p>
          <p class="px-fine">The router returns a plan under a schema, and the plan is validated in code before anything runs: an unknown field or operator is rejected here, not discovered in the answer.</p>
        </div>
      </li>
      <li class="px-step">
        <div class="px-step__k"><span class="px-n">2</span><span class="px-tag px-tag--code">code</span></div>
        <div class="px-step__b">
          <h4>${two.title}</h4>
          <p>${two.body}</p>
        </div>
      </li>
      <li class="px-step">
        <div class="px-step__k"><span class="px-n">3</span><span class="px-tag px-tag--model">model</span></div>
        <div class="px-step__b">
          <h4>Answer, as recorded</h4>
          <blockquote class="px-answer">${esc(r.answer) || '<i>empty</i>'}</blockquote>
          <p class="px-metrics"><span>parse <b>${esc(r.parse_path || '—')}</b></span><span>in <b>${num(t.input_tokens)}</b> tok</span><span>out <b>${num(t.output_tokens)}</b> tok</span><span><b>${secs(r.latency_ms)}</b></span><span><b>${usd(r.cost_usd)}</b> at list price</span></p>
        </div>
      </li>
      <li class="px-step">
        <div class="px-step__k"><span class="px-n">4</span><span class="px-tag px-tag--code">code</span></div>
        <div class="px-step__b">
          <h4>Validate before showing</h4>
          <ul class="px-checks">${stepFour(r).map((x) => `<li>${x}</li>`).join('')}</ul>
        </div>
      </li>
    </ol>`;
}

function select(id, push) {
  const r = DATA.records.find((x) => x.id === id) || DATA.records[0];
  current = r.id;
  document.querySelectorAll('.px-q').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === r.id)));
  renderTrace(r);
  if (push) {
    try { history.replaceState(null, '', `#${r.id}`); } catch (e) { /* fine */ }
    if (window.innerWidth < 861) $('#px-trace').scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}

// ── Follow-ups ────────────────────────────────────────────────
function renderFollowups(rows) {
  const ids = [...new Set(rows.map((x) => x.id))];
  const cell = (row) => (!row ? '<td colspan="3">—</td>' : `
    <td>${row.rewritten ? `“${esc(row.rewritten)}”` : '<i>no rewrite</i>'}</td>
    <td>${esc(row.route)} ${row.route_ok ? '<span class="px-ok">✓</span>' : '<span class="px-violation">✕</span>'}</td>
    <td>${row.facts == null ? (row.exact == null ? '—' : row.exact ? 'exact' : 'wrong') : pct(row.facts)}</td>`);
  $('#px-followups').innerHTML = `
    <table class="px-table">
      <thead><tr><th>Turn</th><th colspan="3">With the first question in history</th><th colspan="3">The same words alone</th></tr>
      <tr><th></th><th>Rewritten to</th><th>Route</th><th>Facts</th><th>Rewritten to</th><th>Route</th><th>Facts</th></tr></thead>
      <tbody>${ids.map((id) => `<tr><td class="px-mono">${esc(id)}</td>${cell(rows.find((x) => x.id === id && x.arm === 'with history'))}${cell(rows.find((x) => x.id === id && x.arm === 'alone'))}</tr>`).join('')}</tbody>
    </table>
    <p class="px-fine">Two of the five recorded turns are in the results file; the rest of the follow-up run is summarized in the repo's README. “Facts” is the share of expected facts in the answer; “exact” means the filter returned precisely the expected days.</p>`;
}

// ── Ablation ──────────────────────────────────────────────────
function renderAblation(ab) {
  $('#px-ablation-title').textContent = ab.title;
  $('#px-ablation').innerHTML = `
    <div class="px-ablation__grid">
      <table class="px-table">
        <thead><tr><th>Measure</th><th>A · day chunks</th><th>B · day + week rollups</th></tr></thead>
        <tbody>${ab.measures.map((m) => `<tr><td>${esc(m[0])}</td><td class="px-mono">${esc(m[1])}</td><td class="px-mono">${esc(m[2])}</td></tr>`).join('')}</tbody>
      </table>
      <table class="px-table">
        <thead><tr><th>Question</th><th>A recall@5</th><th>B recall@5</th></tr></thead>
        <tbody>${ab.per_question.map((m) => `<tr><td class="px-mono"><a href="#${esc(m[0])}" data-jump="${esc(m[0])}">${esc(m[0])}</a></td><td class="px-mono">${esc(m[1])}</td><td class="px-mono ${m[1] !== m[2] ? 'is-changed' : ''}">${esc(m[2])}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="px-fine">Arm B adds one deterministic rollup chunk per week. It lifted the one whole-week question, S06, and changed nothing else, which is the finding: the rollup earns its place for exactly the shape of question it was written for. S03, “the day after”, is adjacency, and similarity cannot do adjacency in either arm.</p>`;
  $('#px-ablation').addEventListener('click', (e) => {
    const a = e.target.closest('[data-jump]');
    if (!a) return;
    e.preventDefault();
    select(a.dataset.jump, true);
    $('#runs').scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}

// ── Boot ──────────────────────────────────────────────────────
async function boot() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(String(res.status));
    DATA = await res.json();
  } catch (e) {
    $('#px-trace').innerHTML = '<p class="px-loading">The recorded runs did not load. They live in <a href="https://github.com/SamieVargas/pixels-rag/tree/main/evals/results">evals/results</a> in the repo.</p>';
    return;
  }
  renderStats(DATA.aggregate);
  renderList();
  renderFollowups(DATA.followups || []);
  renderAblation(DATA.ablation);
  const want = (location.hash || '').replace('#', '');
  select(DATA.records.some((r) => r.id === want) ? want : 'S01', false);
}

boot();
