// ============================================================
// js/toolkit.js
// /toolkit — the change log is live from the GitHub commits API,
// with a hand-written fallback if the fetch fails.
// ============================================================

import { TK_REPO, TK_FALLBACK, TK_NOTES, TK_META, TK_HEAD, TK_TOKENS } from '../data/content.js?v=20260831';

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

function renderHead() {
  $('#head-snippet').textContent = TK_HEAD;
  const btn = $('#copy-head');
  let timer;
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(TK_HEAD); } catch (err) { /* nothing to add */ }
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

// ── Boot ─────────────────────────────────────────────────────
renderCommits(TK_FALLBACK, false);
renderStatus('loading');
renderAge('2026-06-10');
renderNotes();
renderMeta();
renderHead();
renderTokens();
loadGithub();
