// ============================================================
// js/app.js
// Portfolio v2 — no build step, no framework. Content lives in
// data/content.js; this file gives it shape and behaviour.
// ============================================================

import {
  NAV, TABS, FILTERS, PROJECTS, ALSO, BUILDING, ROLES,
  SKILL_GROUPS, CERTS, OTHER_CERTS, OBSERVATIONS,
  QUICK_FACTS, INTERESTS, CONTACT_LINKS, FIELD,
} from '../data/content.js';

const $  = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MOBILE = () => window.matchMedia('(max-width: 820px)').matches;

// ── Nav and tab bar ──────────────────────────────────────────
function renderNav() {
  $('#nav-links').innerHTML =
    NAV.map((n) => `<li><a href="${n.href}" data-nav="${n.id}">${esc(n.label)}</a></li>`).join('') +
    '<li><a class="nav__cta" href="#contact">Contact</a></li>';

  $('#tabbar').innerHTML = TABS.map((t) =>
    `<a href="${t.href}" data-tab="${t.href.slice(1)}"><i></i>${esc(t.label)}</a>`).join('');
}

function trackSections() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      document.querySelectorAll('[data-nav]').forEach((a) =>
        a.classList.toggle('is-active', a.dataset.nav === id));
      document.querySelectorAll('[data-tab]').forEach((a) =>
        a.classList.toggle('is-active', a.dataset.tab === id || (a.dataset.tab === 'top' && id === 'signal')));
    });
  }, { threshold: 0.25 });
  NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
}

// ── Work: filters, plain/technical, project cards ────────────
const work = { filter: 'All', tech: false, open: [] };

function matches(item) {
  return work.filter === 'All' || (item.filters || []).includes(work.filter);
}

function renderFilters() {
  $('#filters').innerHTML = FILTERS.map((f) =>
    `<button type="button" class="chip${f === work.filter ? ' is-on' : ''}" data-filter="${esc(f)}">${esc(f)}</button>`).join('');
}

function renderCards() {
  $('#cards').innerHTML = PROJECTS.map((p) => {
    const open = work.open.includes(p.id);
    return `
    <article class="card" data-card="${p.id}"${matches(p) ? '' : ' hidden'}>
      <img class="card__shot" src="${p.img}" alt="${esc(p.title)}" loading="lazy" width="1200" height="800">
      <div class="card__body">
        <div class="card__meta">
          <span class="label label--accent">${esc(p.kicker)}</span>
          <span class="label label--mid">${esc(p.year)}</span>
        </div>
        <h3>${esc(p.title)}</h3>
        <p data-copy>${esc(work.tech ? p.how : p.plain)}</p>
        <div class="card__detail"${open ? '' : ' hidden'}>
          <div>
            <span class="label label--mid">How it works</span>
            <p>${esc(p.how)}</p>
          </div>
          <div>
            <span class="label label--mid">What it found</span>
            <p>${esc(p.found)}</p>
          </div>
          <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        </div>
        <div class="card__actions">
          <button type="button" class="btn btn--ghost btn--sm" data-detail="${p.id}">${open ? 'Less detail' : 'How it works'}</button>
          <a class="label label--accent" href="${p.href}" target="_blank" rel="noopener">${esc(p.linkLabel)}</a>
        </div>
      </div>
    </article>`;
  }).join('');

  $('#also').innerHTML = ALSO.map((a) => `
    <article class="mini-card" data-mini="${esc(a.title)}"${matches(a) ? '' : ' hidden'}>
      <span class="label label--accent">${esc(a.kicker)}</span>
      <h4>${esc(a.title)}</h4>
      <p>${esc(a.plain)}</p>
    </article>`).join('');

  const shown = PROJECTS.filter(matches).length + ALSO.filter(matches).length;
  $('#work-count').textContent = `${shown} of ${PROJECTS.length + ALSO.length} shown`;
}

function wireWork() {
  $('#filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    work.filter = btn.dataset.filter;
    renderFilters();
    renderCards();
  });

  $('#read-as').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-mode]');
    if (!btn) return;
    work.tech = btn.dataset.mode === 'tech';
    $('#read-as').querySelectorAll('button').forEach((b) => b.classList.toggle('is-on', b === btn));
    renderCards();
  });

  $('#cards').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-detail]');
    if (!btn) return;
    const id = btn.dataset.detail;
    work.open = work.open.includes(id) ? work.open.filter((x) => x !== id) : [...work.open, id];
    const card = $(`[data-card="${id}"]`);
    card.querySelector('.card__detail').hidden = !work.open.includes(id);
    btn.textContent = work.open.includes(id) ? 'Less detail' : 'How it works';
  });
}

// ── The field ────────────────────────────────────────────────
let fieldSel = FIELD[0].id;

function renderField() {
  const plot = $('#plot');
  plot.querySelectorAll('.plot__pt').forEach((el) => el.remove());
  plot.insertAdjacentHTML('beforeend', FIELD.map((d) => `
    <button type="button" class="plot__pt${parseFloat(d.x) > 50 ? ' plot__pt--flip' : ''}${d.art ? ' plot__pt--art' : ''}${d.id === fieldSel ? ' is-on' : ''}"
            data-pt="${d.id}" style="left:${d.x};top:${d.y}" aria-label="${esc(d.title)}"><i></i><span>${esc(d.short)}</span></button>`).join(''));

  const f = FIELD.find((d) => d.id === fieldSel) || FIELD[0];
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
        ? `<a class="btn btn--accent" href="${f.href}" target="_blank" rel="noopener">${esc(f.linkLabel)}</a>`
        : '<p class="field__note">No link — just something I noticed</p>'}
    </div>`;
}

function wireField() {
  $('#plot').addEventListener('click', (e) => {
    const pt = e.target.closest('[data-pt]');
    if (!pt) return;
    fieldSel = pt.dataset.pt;
    renderField();
  });
}

// ── Currently building ───────────────────────────────────────
function renderBuilding() {
  $('#building-rows').innerHTML = BUILDING.map((b) => `
    <div class="row">
      <p class="row__status"><i></i><span class="label label--mid">In progress</span></p>
      <div>
        <h4>${esc(b.title)}</h4>
        <p>${esc(b.body)}</p>
      </div>
    </div>`).join('');
}

// ── Experience ───────────────────────────────────────────────
let openRoles = [];

function renderRoles() {
  $('#roles').innerHTML = ROLES.map((r, i) => {
    const open = openRoles.includes(i);
    return `
    <div class="role">
      <div class="role__head">
        <h4>${esc(r.title)}</h4>
        <div class="role__head-r">
          <span class="label label--mid">${esc(r.period)}</span>
          <button type="button" class="btn btn--ghost btn--sm" data-role="${i}">${open ? 'Hide' : 'Detail'}</button>
        </div>
      </div>
      <ul${open ? '' : ' hidden'}>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      <div class="tags">${r.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>`;
  }).join('');
  $('#roles-toggle-all').textContent = openRoles.length === ROLES.length ? 'Collapse all' : 'Expand all';
}

function wireRoles() {
  $('#roles').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-role]');
    if (!btn) return;
    const i = Number(btn.dataset.role);
    openRoles = openRoles.includes(i) ? openRoles.filter((x) => x !== i) : [...openRoles, i];
    renderRoles();
  });
  $('#roles-toggle-all').addEventListener('click', () => {
    openRoles = openRoles.length === ROLES.length ? [] : ROLES.map((_, i) => i);
    renderRoles();
  });
}

// ── Skills and credentials ───────────────────────────────────
function renderSkills() {
  $('#skill-tabs').innerHTML = SKILL_GROUPS.map((g, i) =>
    `<button type="button" role="tab" class="tab${i === 0 ? ' is-on' : ''}" data-tab-i="${i}" aria-selected="${i === 0}">${esc(g.label)}</button>`).join('');

  $('#skill-panels').innerHTML = SKILL_GROUPS.map((g, i) => `
    <div class="panel${i === 0 ? ' is-on' : ''}" data-panel="${i}">
      ${g.items.map((it) => `<div class="skill"><strong>${esc(it.name)}</strong>${it.note ? `<span>${esc(it.note)}</span>` : ''}</div>`).join('')}
    </div>`).join('');

  $('#certs').innerHTML = CERTS.map((c) => `
    <div class="cert">
      <div>
        <h4>${esc(c.name)}</h4>
        <p>${esc(c.issuer)}</p>
      </div>
      <a class="cert__verify" href="${c.href}" target="_blank" rel="noopener">Verify ↗</a>
    </div>`).join('');

  $('#other-certs').innerHTML = OTHER_CERTS.map((c) =>
    `<div><strong>${esc(c.name)}</strong><span>${esc(c.issuer)}</span></div>`).join('');
}

function wireSkills() {
  $('#skill-tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab-i]');
    if (!btn) return;
    const i = btn.dataset.tabI;
    $('#skill-tabs').querySelectorAll('.tab').forEach((t) => {
      const on = t === btn;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', String(on));
    });
    $('#skill-panels').querySelectorAll('.panel').forEach((p) =>
      p.classList.toggle('is-on', p.dataset.panel === i));
  });

  $('#certs-toggle').addEventListener('click', (e) => {
    const list = $('#other-certs');
    list.hidden = !list.hidden;
    e.currentTarget.textContent = list.hidden ? 'Show all' : 'Hide';
  });
}

// ── Observations ─────────────────────────────────────────────
let obsIdx = 0;
let dayIdx = -1;

function renderObs() {
  const o = OBSERVATIONS[obsIdx];
  $('#obs-tag').textContent = o.tag;
  $('#obs-title').textContent = o.title;
  $('#obs-counter').textContent = `${obsIdx + 1} of ${OBSERVATIONS.length}`;
  $('#obs-body').innerHTML = o.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#obs-src').innerHTML = o.linkText
    ? `${esc(o.sourceText)} <a href="${o.linkHref}" target="_blank" rel="noopener">${esc(o.linkText)}</a> ${esc(o.suffix || '')}`
    : esc(o.sourceText);
  $('#obs-dots').innerHTML = OBSERVATIONS.map((_, i) =>
    `<button type="button" class="dot${i === obsIdx ? ' is-on' : ''}" data-obs="${i}" aria-label="Observation ${i + 1}"></button>`).join('');
  renderChart();
}

function renderChart() {
  const chart = OBSERVATIONS[obsIdx].chart;
  const host = $('#obs-chart');
  if (!chart) { host.innerHTML = ''; return; }
  host.innerHTML = `
    <div class="chart">
      <div class="chart__head">
        <span class="label label--accent">${esc(chart.title)}</span>
        <span class="label label--mid">${esc(chart.hint)}</span>
      </div>
      <div class="chart__bars">
        ${chart.days.map((d, i) => `
          <button type="button" data-day="${i}" aria-label="${esc(d.d)}: ${d.v}"
                  class="${d.v <= 10 ? 'is-low' : ''}${dayIdx === i ? ' is-on' : ''}">
            <i style="height:${Math.max(4, Math.round((d.v / chart.max) * 100))}%"></i>
          </button>`).join('')}
      </div>
      <div class="chart__scale">
        <span class="label label--mid">${esc(chart.days[0].d)}</span>
        <span class="label label--mid">${esc(chart.days[chart.days.length - 1].d)}</span>
      </div>
      <p class="chart__readout">${dayIdx > -1
        ? `${esc(chart.days[dayIdx].d)} — ${chart.days[dayIdx].v} — ${esc(chart.days[dayIdx].note)}`
        : `${chart.days.length} days, from normal to the floor and back`}</p>
    </div>`;
}

function wireObs() {
  $('#obs-prev').addEventListener('click', () => { obsIdx = (obsIdx - 1 + OBSERVATIONS.length) % OBSERVATIONS.length; dayIdx = -1; renderObs(); });
  $('#obs-next').addEventListener('click', () => { obsIdx = (obsIdx + 1) % OBSERVATIONS.length; dayIdx = -1; renderObs(); });
  $('#obs-dots').addEventListener('click', (e) => {
    const dot = e.target.closest('[data-obs]');
    if (!dot) return;
    obsIdx = Number(dot.dataset.obs); dayIdx = -1; renderObs();
  });

  const scrub = (e) => {
    const bar = e.target.closest('[data-day]');
    if (!bar) return;
    dayIdx = Number(bar.dataset.day);
    renderChart();
  };
  $('#obs-chart').addEventListener('mouseover', scrub);
  $('#obs-chart').addEventListener('click', scrub);
  $('#obs-chart').addEventListener('mouseleave', () => { if (dayIdx > -1) { dayIdx = -1; renderChart(); } });
}

// ── About: facts and the interests carousel ──────────────────
let intPage = 0;

function renderFacts() {
  $('#facts').innerHTML = QUICK_FACTS.map((f) => `
    <div class="fact">
      <strong class="label label--mid">${esc(f.label)}</strong>
      <span>${esc(f.value)}</span>
    </div>`).join('');
}

function renderInterests() {
  $('#interests').innerHTML = INTERESTS.map((it) => `
    <article class="interest">
      <h4>${esc(it.title)}</h4>
      <p>${esc(it.body)}</p>
    </article>`).join('');
  moveCarousel();
}

function pages() { return Math.ceil(INTERESTS.length / (MOBILE() ? 1 : 2)); }

function moveCarousel() {
  const total = pages();
  if (intPage > total - 1) intPage = total - 1;
  $('#interests').style.transform = `translateX(calc(${-100 * intPage}% - ${intPage * 16}px))`;
  $('#int-dots').innerHTML = Array.from({ length: total }, (_, i) =>
    `<button type="button" class="dot${i === intPage ? ' is-on' : ''}" data-int="${i}" aria-label="Page ${i + 1}"></button>`).join('');
}

function wireInterests() {
  $('#int-prev').addEventListener('click', () => { intPage = (intPage - 1 + pages()) % pages(); moveCarousel(); });
  $('#int-next').addEventListener('click', () => { intPage = (intPage + 1) % pages(); moveCarousel(); });
  $('#int-dots').addEventListener('click', (e) => {
    const dot = e.target.closest('[data-int]');
    if (!dot) return;
    intPage = Number(dot.dataset.int);
    moveCarousel();
  });
  window.addEventListener('resize', moveCarousel);
}

// ── Contact ──────────────────────────────────────────────────
function renderContact() {
  $('#contact-links').innerHTML = CONTACT_LINKS.map((l) => `
    <a href="${l.href}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>
      <span class="label label--mid">${esc(l.label)}</span>${esc(l.value)}
    </a>`).join('');
}

function wireCopyEmail() {
  const btn = $('#copy-email');
  const toast = $('#toast');
  let timer;
  btn.addEventListener('click', async () => {
    const email = 'sammisnv@gmail.com';
    try { await navigator.clipboard.writeText(email); } catch (err) { /* clipboard blocked — the toast still names the address */ }
    toast.textContent = `Email copied — ${email}`;
    toast.classList.add('is-on');
    btn.textContent = 'Copied';
    clearTimeout(timer);
    timer = setTimeout(() => {
      toast.classList.remove('is-on');
      btn.textContent = 'Copy my email';
    }, 2200);
  });
}

// ── Reveal on first view ─────────────────────────────────────
function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}

// ── Boot ─────────────────────────────────────────────────────
renderNav();
renderFilters();
renderCards();
renderField();
renderBuilding();
renderRoles();
renderSkills();
renderObs();
renderFacts();
renderInterests();
renderContact();

wireWork();
wireField();
wireRoles();
wireSkills();
wireObs();
wireInterests();
wireCopyEmail();
trackSections();
initReveal();
