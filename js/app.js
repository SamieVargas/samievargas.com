// ============================================================
// js/app.js
// Work page. Content lives in data/content.js; this file gives it
// shape and motion. Every sequence starts when its section scrolls
// into view (js/reveal.js) and lands on the source value.
// ============================================================

import {
  HERO_LOG, SPINE, FD_SEGMENTS, FD_MATCH, FD_RECORD, FD_CASE, FD_INJECTION,
  PX_REPLAY, AS_REPLAY, SIGNAL_PILE, BD_V3, BD_TUNING, DAG, REORDER, ATX_DRIFT,
  ROLES, SKILL_AREAS, CERT_LIST, OFF_CLOCK, CONTACT_CMD, CONTACT_LINKS,
  RESULT_FIELDS, RESULTS,
} from '../data/content.js?v=20260925i';
import { driftChart, revealDrift } from './drift-chart.js?v=20260925i';
import { REDUCED, $, $$, esc, onSeen, autoReveal, tween, countUp, typeText, wait, wireCopyEmail } from './reveal.js?v=20260925i';

const on = (el, ms = 0) => { if (!el) return; if (REDUCED || !ms) el.classList.add('is-on'); else setTimeout(() => el.classList.add('is-on'), ms); };
const hue = (h, l = 0.52, c = 0.12) => `oklch(${l} ${c} ${h})`;

// ── Hero: the eval log types in one row every 400ms ──────────
function hero() {
  $('#log-head').textContent = HERO_LOG.head;
  const rows = $('#log-rows');
  rows.innerHTML = HERO_LOG.rows.map((r) =>
    `<div class="term__row"><span>${esc(r.p)}</span><span>${esc(r.k)}</span><span class="${r.tone}">${esc(r.v)}</span></div>`).join('');
  onSeen($('.hero'), () => {
    $$('.term__row', rows).forEach((el, i) => on(el, 700 + i * 400));
    const clock = $('#log-clock');
    tween(3600, (p) => {
      const s = p * 3.6;
      clock.textContent = `00:0${Math.floor(s)}.${Math.floor((s % 1) * 10)}`;
    });
  });
}

// ── Spine: one dot per test case ─────────────────────────────
function spine() {
  $('#spine-title').textContent = SPINE.title;
  $('#spine-note').textContent = SPINE.note;
  $('#spine-rule').textContent = SPINE.rule;
  $('#spine-plain').textContent = SPINE.plain;
  $('#spine-rows').innerHTML = SPINE.rows.map((r, i) => {
    let viz;
    if (r.pending) viz = `<div class="spine__viz"><div class="spine__dash"></div><span class="spine__cap">${esc(r.cap)}</span></div>`;
    else if (r.tags) viz = `<div class="spine__tags">${r.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}<span class="meta">${esc(r.cap)}</span></div>`;
    else viz = `<div class="spine__viz"><div class="spine__dots${r.bad.length ? '' : ' spine__dots--acc'}" data-bad="${r.bad.join(',')}">${'<i></i>'.repeat(r.dots)}</div><span class="spine__cap">${esc(r.cap)}</span></div>`;
    const ext = /^https?:/.test(r.href) ? ' rel="noopener"' : '';
    return `<div class="spine__row${r.pending ? ' spine__row--pending' : ''} rv" style="--d:${(0.1 + i * 0.15).toFixed(2)}s">
      <span class="spine__label">${esc(r.label)}</span>
      <span class="spine__line"><strong>${esc(r.name)}</strong> · ${esc(r.line)}${r.plain ? `<span class="spine__plain">${esc(r.plain)}</span>` : ''}</span>
      ${viz}
      <a class="spine__cta" href="${esc(r.href)}"${ext}>${esc(r.cta)}</a>
    </div>`;
  }).join('');
  onSeen($('#patterns'), () => {
    $$('.spine__dots').forEach((row, ri) => {
      const bad = row.dataset.bad ? row.dataset.bad.split(',').map(Number) : [];
      const step = bad.length ? 80 : 30;
      const start = ri === 0 ? 500 : 700;
      $$('i', row).forEach((d, i) => {
        on(d, start + i * step);
        if (bad.includes(i)) { if (REDUCED) d.classList.add('is-bad'); else setTimeout(() => d.classList.add('is-bad'), 1500); }
      });
    });
    const fill = $('#spine-fill');
    tween(1400, (p) => { fill.style.width = `${(p * 100).toFixed(1)}%`; }, 1200);
  });
}

// ── Field discovery: the transcript drives the four steps ────
function fieldDiscovery() {
  const LEN = FD_SEGMENTS.reduce((n, s) => n + s.t.length, 0);
  const T0 = 500, TD = 4200, END = T0 + TD;
  const hit = {};
  let cum = 0;
  FD_SEGMENTS.forEach((s) => { cum += s.t.length; if (s.at) hit[s.at] = T0 + (cum / LEN) * TD; });
  hit.end = END;

  $('#fd-match-head').textContent = FD_MATCH.head;
  $('#fd-match').innerHTML = FD_MATCH.rows.map((r) => `<div data-at="${r.at}" data-after="${r.after || 0}"><span>${esc(r.k)}</span><span class="${r.tone}">${esc(r.v)}</span></div>`).join('');
  $('#fd-rec-head').textContent = FD_RECORD.head;
  $('#fd-rec').innerHTML = FD_RECORD.rows.map((r) => `<div><span>${esc(r.k)}</span><span class="${r.tone || ''}">${esc(r.v)}</span></div>`).join('');
  $('#fd-wave').innerHTML = '<i></i>'.repeat(18);
  $('#fd-case').innerHTML = FD_CASE.map((r) => `<span>${esc(r.k)}</span><p${r.mono ? ' class="case__mono"' : ''}>${esc(r.v)}</p>`).join('');

  const typed = $('#fd-typed');
  const render = (len) => {
    let left = len;
    typed.innerHTML = FD_SEGMENTS.map((s) => {
      const part = s.t.slice(0, Math.max(0, left));
      left -= s.t.length;
      return s.hl ? `<u>${esc(part)}</u>` : esc(part);
    }).join('');
  };

  onSeen($('#field-discovery'), () => {
    const timer = $('#fd-timer');
    const bars = $$('#fd-wave i');
    if (REDUCED) { render(LEN); timer.textContent = '0:58'; }
    else {
      linearTween(TD, (p) => { render(Math.round(p * LEN)); timer.textContent = `0:${String(Math.round(p * 58)).padStart(2, '0')}`; }, T0);
      const t0 = performance.now();
      const wave = (now) => {
        const t = now - t0;
        const talking = t > T0 && t < END;
        bars.forEach((b, i) => { b.style.height = `${talking ? 6 + Math.abs(Math.sin(now / 130 + i * 1.3)) * 34 : 4}px`; });
        if (t < END + 200) requestAnimationFrame(wave);
      };
      requestAnimationFrame(wave);
    }
    // Linear typing, so the cue times are exact.
    $$('#fd-match > div').forEach((el) => on(el, hit[el.dataset.at] + Number(el.dataset.after)));
    on($('[data-fd="dm"]'), hit.dm + 320);
    on($('[data-fd="rent"]'), hit.rent + 320);
    on($('[data-fd="gap"]'), END + 900);
    on($('#fd-note'), END + 400);
    $$('#fd-rec > div').forEach((el, i) => on(el, END + 1300 + i * 250));
  });
}
// The tween above eases; the transcript should type at an even pace.
function linearTween(ms, fn, delay) {
  return new Promise((resolve) => {
    const start = performance.now() + delay;
    const step = (now) => {
      const x = Math.min(1, (now - start) / ms);
      if (x >= 0) fn(x);
      if (x < 1) requestAnimationFrame(step); else resolve();
    };
    requestAnimationFrame(step);
  });
}

function injection() {
  const { fixtures, runs, moved } = FD_INJECTION;
  let html = '';
  for (let r = 0; r < fixtures; r++) {
    html += `<span>F${String(r + 1).padStart(2, '0')}</span>`;
    for (let c = 0; c < runs; c++) html += `<i class="${(moved[r] || []).includes(c) ? 'is-bad' : ''}"></i>`;
  }
  $('#inj-grid').innerHTML = html;
  onSeen($('#fd-inj'), () => $$('#inj-grid i').forEach((el, i) => on(el, 400 + i * 40)));
}

// ── Results strips (four cells, two pairs) and key/value tables ──
function results() {
  const rows = RESULTS.rows;
  $$('[data-results]').forEach((el) => {
    const r = rows[el.dataset.results];
    const cell = (i) => `<div class="results__cell"><span class="results__k">${esc(RESULT_FIELDS[i])}</span><span class="results__v">${esc(r[i])}</span></div>`;
    el.innerHTML = `<div class="results__pair">${cell(0)}${cell(1)}</div><div class="results__pair">${cell(2)}${cell(3)}</div>`;
  });
  $$('[data-results-kv]').forEach((el) => {
    const r = rows[el.dataset.resultsKv];
    el.innerHTML = r.map((v, i) => `<div><span>${esc(RESULT_FIELDS[i])}</span><span>${esc(v)}</span></div>`).join('');
  });
}

// ── Life in Pixels: one replayed run, and the MCP packet ─────
function pixels() {
  const R = PX_REPLAY;
  $('#px-route').innerHTML = `<span>router →</span>${R.routes.map((r, i) => `<span class="${i === R.picked ? 'is-pick' : ''}">${esc(r)}</span>`).join('')}`;
  $('#px-days').innerHTML = R.days.map((d) => `<span>${esc(d)}</span>`).join('');
  $('#px-check-t').textContent = R.check;
  onSeen($('#pixels'), () => {
    typeText($('#px-q'), R.q, { cps: R.q.length, delay: 400 });
    on($('#px-route'), 1600);
    $$('#px-days span').forEach((el, i) => on(el, 2000 + i * 150));
    typeText($('#px-a'), R.a, { cps: R.a.length / 2.6, delay: 3000 });
    on($('#px-check'), 5800);
    countUp($('#px-valid'), 26, { ms: 1800, delay: 800, fmt: (v) => `${Math.round(v)}/26` });
    const pkt = $('#mcp-pkt');
    if (REDUCED) return;
    const t0 = performance.now();
    const move = (now) => {
      const t = now - t0;
      if (t > 1000 && t < 8500) {
        const k = ((t - 1000) % 1800) / 1800;
        pkt.style.opacity = '1';
        pkt.style.left = `${(8 + k * 84).toFixed(1)}%`;
      } else pkt.style.opacity = '0';
      if (t < 8600) requestAnimationFrame(move);
    };
    requestAnimationFrame(move);
  });
}

// ── Guideline Assist: one recorded call, typed in order ──────
function assist() {
  const R = AS_REPLAY;
  $('#as-chat').textContent = R.chat;
  $('#as-r-intent span:last-child').textContent = R.intent;
  $('#as-r-section span:last-child').textContent = R.section;
  $('#as-r-next span:last-child').textContent = R.next;
  $('#as-check-t').textContent = R.check;
  $('#as-ms').textContent = R.ms;
  onSeen($('#assist'), () => {
    typeText($('#as-cust'), R.customer, { cps: R.customer.length, delay: 400 });
    on($('#as-r-intent'), 1600);
    on($('#as-r-section'), 2000);
    on($('#as-r-next'), 2400);
    typeText($('#as-say'), R.say, { cps: R.say.length / 1.6, delay: 2900 });
    on($('#as-check'), 4800);
    countUp($('#as-next-pct'), 73.9, { ms: 1800, delay: 800, fmt: (v) => `${v.toFixed(1)}%` });
  });
}

// ── Signal: scraps land, the read comes back, counters run ───
function signal() {
  const S = SIGNAL_PILE;
  $('#sig-pile').innerHTML =
    S.ghosts.map((g) => `<span class="sig-ghost" style="--h:${hue(g.h, 0.6, 0.09)};left:${g.l};top:${g.t};filter:blur(${g.bl}px);transform:translate(20px,-14px) rotate(${g.r * 2}deg)" data-r="${g.r}"><b>${esc(g.ty)}</b><span>${esc(g.x)}</span></span>`).join('') +
    S.scraps.map((s) => `<span class="sig-scrap" style="--h:${hue(s.h)};--hb:${hue(s.h, 0.95, 0.03)};left:${s.l};top:${s.t};transform:translate(-30px,-20px) rotate(${s.r * 3}deg)" data-r="${s.r}"><b><span>${esc(s.g)}</span><span>${esc(s.ty)}</span></b><span>${esc(s.x)}</span></span>`).join('');
  $('#sig-legend').innerHTML = S.scraps.map((s) => `<span><i class="d" style="background:${hue(s.h)}"></i>${esc(s.lg)}</span>`).join('');
  $('#sig-out').innerHTML = S.out.map((o) => `<div class="sig-out__row"><span>${esc(o.k)}</span><span${o.typed ? ' data-typed' : ''}>${o.typed ? '' : esc(o.v)}</span></div>`).join('');
  $('#sig20').innerHTML = Array.from({ length: S.strip.runs }, (_, i) => `<i class="${S.strip.right.includes(i) ? 'is-right' : ''}"></i>`).join('');

  onSeen($('#signal'), () => {
    const land = (el, at) => {
      const go = () => { el.classList.add('is-on'); el.style.transform = `rotate(${el.dataset.r}deg)`; };
      if (REDUCED) go(); else setTimeout(go, at);
    };
    $$('.sig-ghost').forEach((el, i) => land(el, 150 + i * 110));
    $$('.sig-scrap').forEach((el, i) => land(el, 300 + i * 250));
    on($('#sig-legend'), 1400);
    on($('#sig-arrow'), 1400);
    $$('.sig-out__row').forEach((el, i) => on(el, 1600 + i * 400));
    const last = S.out.find((o) => o.typed);
    typeText($('[data-typed]'), last.v, { cps: last.v.length / 1.4, delay: 3000 });
    $$('#sig20 i').forEach((el, i) => on(el, 2000 + i * 60));
    const tok = $('#sig-tok'), prep = $('#sig-prep'), sec = $('#sig-sec');
    tween(1800, (p) => {
      tok.textContent = `~${Math.round(23 - 22 * p)}k`;
      prep.textContent = String(Math.round(60 - 59 * p));
      sec.textContent = `${Math.round(51 * p)}s`;
    }, 1800);
  });
}

// ── Brain Dump: the dump types, then a recorded plan drops in ──
// Three real sort@v3 runs of one dump (BD_V3). Picking a run swaps the plan and
// lights the words in the dump that its "now" steps quote back.
const BD_SHOW = { later: 5, letGo: 3 };
const bdLabel = (r, i, all) => {
  const again = all.slice(0, i).some((o) => o.level === r.level && o.anxious === r.anxious);
  return `${r.level}${r.anxious ? ' · anxious' : ''}${again ? ' · again' : ''}`;
};

function brainDump() {
  const B = BD_V3;
  const dumpEl = $('#bd-dump');
  dumpEl.innerHTML = B.dump.map((d) => (d.gap
    ? `<span class="bd-gap"></span>`
    : `<span${d.hl ? ` class="bd-hl" data-hl="${d.hl}"` : ''}></span>`)).join('') + '<span class="cursor cursor--dark" id="bd-cursor" aria-hidden="true">▍</span>';
  const parts = $$('span:not(.cursor)', dumpEl);
  const full = B.dump.reduce((n, d) => n + d.t.length, 0);
  const renderDump = (len) => {
    let left = len;
    B.dump.forEach((d, i) => { parts[i].textContent = d.t.slice(0, Math.max(0, left)); left -= d.t.length; });
  };
  $('#bd-caption').textContent = `an excerpt of the ${B.dumpChars.toLocaleString()}-character dump · lit where the plan quotes it back`;

  let current = 0;
  let seen = false;
  let typed = REDUCED;
  const runsEl = $('#bd-runs');
  runsEl.innerHTML = B.runs.map((r, i, all) => `<button type="button" aria-pressed="${i === current}">${esc(bdLabel(r, i, all))}</button>`).join('');

  const light = () => {
    const srcs = new Set(B.runs[current].now.map((n) => n.src));
    $$('.bd-hl', dumpEl).forEach((el) => el.classList.toggle('is-lit', typed && srcs.has(el.dataset.hl)));
  };
  const renderPlan = (animate) => {
    const r = B.runs[current];
    const lv = B.levels[r.level];
    $('#bd-cap').textContent = `now cap ${lv.cap} · ${lv.timer}-minute timer${r.anxious ? ' · no "should" or "need to"' : ''}`;
    const more = (n, shown) => (n > shown ? `<li class="bd-more">+ ${n - shown} more</li>` : '');
    $('#bd-plan').innerHTML = `
      <div class="bd-sec">
        <div class="bd-sec__h"><span>now</span><span>one at a time, in this order</span></div>
        <ol class="bd-now">${r.now.map((n, i) => `<li class="bd-step bd-in" data-k="${i}"><span class="bd-step__n">${i + 1}</span><div><strong>${esc(n.label)}</strong><p>${esc(n.detail)}</p><span class="bd-step__why">${esc(n.why)} · ${esc(n.strategy)}</span></div></li>`).join('')}</ol>
      </div>
      <div class="bd-sec">
        <div class="bd-sec__h"><span>later</span><span>safe here for later</span></div>
        <ul class="bd-list">${r.later.slice(0, BD_SHOW.later).map((l, i) => `<li class="bd-in" data-k="${r.now.length + i}"><span class="bd-tag bd-tag--${l.t}">${esc(l.t)}</span>${esc(l.x)}</li>`).join('')}${more(r.later.length, BD_SHOW.later)}</ul>
      </div>
      <div class="bd-sec">
        <div class="bd-sec__h"><span>let go</span><span>you can set these down</span></div>
        <ul class="bd-list bd-list--go">${r.letGo.slice(0, BD_SHOW.letGo).map((l, i) => `<li class="bd-in" data-k="${r.now.length + BD_SHOW.later + i}">${esc(l)}</li>`).join('')}${more(r.letGo.length, BD_SHOW.letGo)}</ul>
      </div>`;
    const items = $$('.bd-in', $('#bd-plan'));
    if (REDUCED || animate === 'now') { items.forEach((el) => el.classList.add('is-on')); return; }
    if (animate == null) return;
    items.forEach((el) => setTimeout(() => requestAnimationFrame(() => el.classList.add('is-on')), animate + Number(el.dataset.k) * 110));
  };
  $('#bd-source').textContent = `three real runs of the same dump, ${B.date}, ${B.model}, prompt ${B.prompt}, ${B.cost} · the page shows the first few of each list`;
  renderPlan(null);

  $$('button', runsEl).forEach((b, i) => b.addEventListener('click', () => {
    current = i;
    $$('button', runsEl).forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
    light();
    renderPlan(seen ? 150 : null);
  }));

  onSeen($('#braindump'), () => {
    seen = true;
    const cursor = $('#bd-cursor');
    if (REDUCED) { renderDump(full); cursor.hidden = true; light(); renderPlan('now'); return; }
    linearTween(3400, (p) => renderDump(Math.round(p * full)), 300).then(() => {
      cursor.hidden = true;
      typed = true;
      light();
      renderPlan(300);
    });
  });
}

// ── Brain Dump tuning: one row per prompt and effort on the same grid ──
// The latency bar is the median against the slowest median, with the p90 as a
// tick; "one gentle item" goes alert red on the row where it got worse.
function bdTuning() {
  const T = BD_TUNING;
  const max = Math.max(...T.runs.map((r) => r.p90));
  const worst = Math.max(...T.runs.map((r) => r.routing));
  $('#bd-tune-cap').textContent = `${T.plans} eval plans a row · ${T.date}`;
  $('#bd-tune-rows').innerHTML = `
    <div class="bd-tune__row bd-tune__row--h" role="row"><span role="columnheader">prompt · effort</span><span role="columnheader">seconds per sort, median · p90</span><span role="columnheader">per plan</span><span role="columnheader">one gentle item missed</span></div>
    ${T.runs.map((r) => `
    <div class="bd-tune__row${r.live ? ' is-live' : ''}" role="row">
      <span class="bd-tune__k" role="cell">${esc(r.label)} · ${esc(r.effort)}${r.live ? ' <b>live</b>' : ''}</span>
      <span class="bd-tune__bar" role="cell"><span class="bd-tune__track"><i style="--w:${(100 * r.median / max).toFixed(1)}%"></i><em style="left:${(100 * r.p90 / max).toFixed(1)}%"></em></span><span class="bd-tune__v">${r.median.toFixed(1)} · ${r.p90.toFixed(1)} s</span></span>
      <span class="bd-tune__v" role="cell">${esc(r.cost)}<span class="bd-tune__sfx"> a plan</span></span>
      <span class="bd-tune__v${r.routing === worst ? ' is-bad' : ''}" role="cell">${r.routing} of ${T.plans}<span class="bd-tune__sfx"> missed one gentle item</span></span>
    </div>`).join('')}`;
  $('#bd-tune-source').textContent = `the brain-dump eval grid, 20 dumps × 3 levels × anxious off and on, claude-sonnet-5 · the Worker runs the live row · banned phrases, ${T.runs.map((r) => r.banned).join(', ')} of ${T.plans} in the same order, are rewritten on the page`;
  onSeen($('#bd-tune'), () => $('#bd-tune').classList.add('is-in'));
}

// ── Analysis: the DAG grows in, the bar splits, the line wipes ──
function analysis() {
  const D = DAG;
  $('#dag-head').textContent = D.head;
  const curve = (x1, y1, x2, y2) => { const m = (x1 + x2) / 2; return `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`; };
  $('#dag').innerHTML =
    D.bands.map(([l, w, h, d]) => `<i class="dag__band" data-d="${d}" style="left:${l};width:${w};background:oklch(0.965 0.025 ${h})"></i>`).join('') +
    `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${D.edges.map((e, i) => `<path d="${curve(e[0], e[1], e[2], e[3])}" data-a="${450 + e[4] * 350 + i * 40}" fill="none" stroke="oklch(0.55 0.1 ${e[5]})" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1 7" vector-effect="non-scaling-stroke"></path>`).join('')}</svg>` +
    D.nodes.map(([x, y, t, d, text]) => `<span class="dag__node${t === 'lab' ? ' dag__node--lab' : ''}" data-d="${d}" style="left:${x};top:${y};--h:oklch(0.6 0.09 ${D.hues[t] || 0})">${esc(text)}</span>`).join('');
  onSeen($('#dag-card'), () => {
    $$('.dag__band').forEach((el) => on(el, 100 + Number(el.dataset.d) * 1000));
    $$('.dag__node').forEach((el) => on(el, 200 + Number(el.dataset.d) * 1000));
    $$('#dag path').forEach((el) => on(el, Number(el.dataset.a)));
    countUp($('#dag-tests'), D.tests, { ms: 1600, delay: 1800 });
  });

  onSeen($('#reorder'), () => {
    const pooled = $('#split-pooled'), label = $('#split-pooled-l');
    const nw = $('#split-new'), vet = $('#split-vet');
    const base = REORDER.pooled * 100;
    tween(1200, (p) => {
      pooled.style.opacity = label.style.opacity = (1 - p * 0.7).toFixed(2);
      nw.style.width = `${(base - (base - REORDER.fresh * 100) * p).toFixed(1)}%`;
      vet.style.width = `${(base + (REORDER.veteran * 100 - base) * p).toFixed(1)}%`;
    }, 900);
  });

  $('#drift-chart').innerHTML = driftChart(ATX_DRIFT, { first: '90.5 · 1st visit', last: '92.6 · 15th', end: '15' });
  onSeen($('#drift'), () => revealDrift($('#drift-chart')));
}

// ── Experience: the rail fills, rows open with + / − ─────────
function experience() {
  const list = $('#roles');
  list.innerHTML = ROLES.map((r, i) => `
    <div class="role rv" style="--d:${(0.3 + i * 0.14).toFixed(2)}s">
      <button type="button" class="role__btn" aria-expanded="false" aria-controls="role-${i}">
        <span class="role__t">${esc(r.title)}</span><span class="role__m">${esc(r.meta)}</span><span class="role__p">${esc(r.period)}</span><span class="role__sign" aria-hidden="true">+</span>
      </button>
      <ul id="role-${i}" hidden>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`).join('');
  const all = $('#roles-all');
  const set = (btn, open) => {
    btn.setAttribute('aria-expanded', String(open));
    $('.role__sign', btn).textContent = open ? '−' : '+';
    btn.nextElementSibling.hidden = !open;
  };
  const sync = () => {
    const open = $$('.role__btn', list).every((b) => b.getAttribute('aria-expanded') === 'true');
    all.textContent = open ? 'Collapse all' : 'Expand all';
    return open;
  };
  $$('.role__btn', list).forEach((b) => b.addEventListener('click', () => { set(b, b.getAttribute('aria-expanded') !== 'true'); sync(); }));
  all.addEventListener('click', () => { const open = sync(); $$('.role__btn', list).forEach((b) => set(b, !open)); sync(); });
  onSeen($('#experience'), () => {
    const fill = $('#rail-fill');
    tween(1600, (p) => { fill.style.width = `${(p * 100).toFixed(1)}%`; }, 200);
  });
}

// ── Skills tabs and certs ────────────────────────────────────
function skills() {
  const tabs = $('#skill-tabs');
  const line = $('#skill-line');
  tabs.innerHTML = SKILL_AREAS.map((s, i) => `<button type="button" class="chip" role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(s.label)}</button>`).join('');
  const btns = $$('button', tabs);
  const pick = (i, focus) => {
    btns.forEach((b, j) => { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    line.textContent = SKILL_AREAS[i].line;
    if (focus) btns[i].focus();
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => pick(i));
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') pick((i + 1) % btns.length, true);
      if (e.key === 'ArrowLeft') pick((i - 1 + btns.length) % btns.length, true);
    });
  });
  pick(0);

  const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const count = (n) => WORDS[n] || String(n);
  $('#certs').innerHTML = CERT_LIST.map((c, i) => {
    const verify = (href, label) => (href
      ? `<a class="pill" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`
      : '<span class="pill pill--missing">Add verify link</span>');
    const action = c.subs
      ? `<button type="button" class="pill" aria-expanded="false" aria-controls="cert-subs-${i}" data-n="${count(c.subs.length)}">Show ${count(c.subs.length)} +</button>`
      : verify(c.href, 'Verify ↗');
    const subs = c.subs
      ? `<div class="cert__subs" id="cert-subs-${i}" hidden>${c.subs.map((s) => (s.href
        ? `<a class="pill pill--sub" href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.name)}<span>↗</span></a>`
        : `<span class="pill pill--missing">${esc(s.name)} · link needed</span>`)).join('')}</div>`
      : '';
    return `<div class="cert"><div class="cert__row"><span class="stack" style="gap:3px"><span class="cert__n">${esc(c.name)}</span><span class="cert__i">${esc(c.issuer)}</span></span>${action}</div>${subs}</div>`;
  }).join('');
  $$('#certs button[aria-controls]').forEach((b) => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    b.textContent = open ? `Hide ${b.dataset.n} −` : `Show ${b.dataset.n} +`;
    document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
  }));
}

// ── Off the clock: three door rows slide in ──────────────────
function offClock() {
  $('#oc-doors').innerHTML = OFF_CLOCK.map((d, i) => `
    <a class="oc__door rv rv--x" style="--d:${(0.2 + i * 0.15).toFixed(2)}s" href="${esc(d.href)}"><span><strong>${esc(d.name)}</strong><em>${esc(d.line)}</em></span><span>${esc(d.cta)}</span></a>`).join('');
}

// ── Contact: the command lines type in ───────────────────────
function contact() {
  $('#contact-links').innerHTML = CONTACT_LINKS.map((l) => `<a href="${esc(l.href)}"><span>${esc(l.label)}</span><span>${esc(l.value)}</span></a>`).join('');
  const box = $('#contact-cmd');
  box.innerHTML = CONTACT_CMD.map(() => '<span></span>').join('');
  const lines = $$('span', box);
  const total = CONTACT_CMD.reduce((n, l) => n + l.length, 0);
  const render = (budget) => {
    CONTACT_CMD.forEach((l, i) => {
      const t = l.slice(0, Math.max(0, budget));
      budget -= l.length;
      lines[i].textContent = t.length ? `$ ${t}` : '';
    });
  };
  onSeen($('#contact'), () => {
    if (REDUCED) { render(total); return; }
    linearTween(total * 22, (p) => render(Math.round(p * total)), 300);
  });
}

// ── Boot ─────────────────────────────────────────────────────
hero();
spine();
fieldDiscovery();
injection();
results();
pixels();
assist();
signal();
brainDump();
bdTuning();
analysis();
experience();
skills();
offClock();
contact();
wireCopyEmail();
autoReveal();
