// ============================================================
// js/reveal.js
// The one scroll load-in every page shares, plus the small motion
// helpers the pages build on. No framework.
//
// onSeen(el, fn) runs fn once, the first time el is on screen. It uses
// one IntersectionObserver with a zero threshold and a -10% bottom
// margin, plus a 50ms tick that also fires once the top of el passes
// 90% of the viewport, because a whole-section threshold never fires for
// a section taller than a phone. When motion is reduced, fn runs at once
// and every helper below lands on its end state immediately.
// ============================================================

export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const easeOut = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
export const wait = (ms) => new Promise((r) => setTimeout(r, REDUCED ? 0 : ms));

document.documentElement.classList.add('js');

const pending = new Map();
let io = null;
let tick = null;

function fire(el) {
  const fns = pending.get(el);
  if (!fns) return;
  pending.delete(el);
  if (io) io.unobserve(el);
  el.classList.add('is-in');
  fns.forEach((fn) => fn(el));
  if (!pending.size && tick) { clearInterval(tick); tick = null; }
}

function check() {
  const h = window.innerHeight || 800;
  pending.forEach((_, el) => {
    if (!el.isConnected) return;
    const r = el.getBoundingClientRect();
    if (r.top < h * 0.9 && r.bottom > 0) fire(el);
  });
}

export function onSeen(el, fn = () => {}) {
  if (typeof el === 'string') el = document.querySelector(el);
  if (!el) return;
  if (REDUCED || !('IntersectionObserver' in window)) { el.classList.add('is-in'); fn(el); return; }
  if (!io) {
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) fire(e.target); }), { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  }
  const list = pending.get(el);
  if (list) { list.push(fn); return; }
  pending.set(el, [fn]);
  io.observe(el);
  if (!tick) tick = setInterval(check, 50);
  requestAnimationFrame(check);
}

// Every [data-in] element on the page gets .is-in when seen, so CSS alone
// can stage its .rv children.
export function autoReveal(root = document) {
  $$('[data-in]', root).forEach((el) => onSeen(el));
}

// Run fn(p) with p eased from 0 to 1 over ms; lands exactly on 1.
export function tween(ms, fn, delay = 0) {
  return new Promise((resolve) => {
    if (REDUCED) { fn(1); resolve(); return; }
    const start = performance.now() + delay;
    const step = (now) => {
      const x = (now - start) / ms;
      if (x < 0) { requestAnimationFrame(step); return; }
      fn(x >= 1 ? 1 : easeOut(x));
      if (x < 1) requestAnimationFrame(step); else resolve();
    };
    requestAnimationFrame(step);
  });
}

// Count el up to `to`, easing out, and land on the source value as written.
export function countUp(el, to, { ms = 1500, delay = 0, fmt = (v) => String(Math.round(v)), final } = {}) {
  if (!el) return Promise.resolve();
  return tween(ms, (p) => { el.textContent = p >= 1 && final != null ? final : fmt(to * p); }, delay);
}

// Type text into el at `cps` characters a second. onChar(len) runs on every
// step so a caller can cue things off the typing.
export function typeText(el, text, { cps = 40, delay = 0, onChar } = {}) {
  return new Promise((resolve) => {
    if (!el) { resolve(); return; }
    if (REDUCED) { el.textContent = text; if (onChar) onChar(text.length); resolve(); return; }
    let len = 0;
    const start = () => {
      const t0 = performance.now();
      const step = (now) => {
        const next = Math.min(text.length, Math.floor(((now - t0) / 1000) * cps));
        if (next !== len) { len = next; el.textContent = text.slice(0, len); if (onChar) onChar(len); }
        if (len < text.length) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    };
    setTimeout(start, delay);
  });
}

// Copy the email on every [data-copy-email] button; the label flips to
// "Copied ✓" for 1.6s.
export function wireCopyEmail(email = 'sammisnv@gmail.com') {
  const btns = $$('[data-copy-email]');
  btns.forEach((b) => { b.dataset.label = b.textContent; });
  let timer;
  btns.forEach((btn) => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(email); } catch (e) { /* the label still confirms */ }
    btns.forEach((b) => { b.textContent = 'Copied ✓'; });
    clearTimeout(timer);
    timer = setTimeout(() => btns.forEach((b) => { b.textContent = b.dataset.label; }), 1600);
  }));
}
