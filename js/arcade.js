// ============================================================
// js/arcade.js
// /apps — the arcade machine, the cabinets, and the effects:
// CRT power-on, attract mode, coin drop, cursor trail, ticket
// dispenser, high-score initials. All motion respects
// prefers-reduced-motion.
// ============================================================

import { ARCADE_APPS } from '../data/content.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const N = ARCADE_APPS.length;

const state = {
  reelIdx: 0, spinning: false, coinDropping: false, landed: false, credits: 0,
  attract: false, ticketOut: false, ticketTorn: false,
  initialsEditing: false, initials: null, letters: [0, 0, 0],
};

// ── Cards and table ──────────────────────────────────────────
function renderApps() {
  $('#featured').innerHTML = ARCADE_APPS.filter((a) => a.feat).map((a) => `
    <a class="fcard" href="${a.slug}">
      <span class="fcard__marquee"><span>${esc(a.title)}</span><i style="background:${a.accent}"></i></span>
      <span class="fcard__shot"><img src="${a.shot}" alt="${esc(a.title)}" loading="lazy"></span>
      <span class="fcard__body">
        <span class="fcard__head">
          <span class="fcard__title">${esc(a.title)}</span>
          <span class="arc-badge" style="color:${a.accent}">${esc(a.badge)}</span>
        </span>
        <span class="fcard__hook">${esc(a.hook)}</span>
        <span class="fcard__start" style="color:${a.accent}">Press start →</span>
      </span>
    </a>`).join('');

  $('#others').innerHTML = ARCADE_APPS.filter((a) => !a.feat).map((a, i) => `
    <a class="hst-row" href="${a.slug}">
      <span class="rank">${String(i + 7).padStart(2, '0')}</span>
      <span class="game">${esc(a.title)}</span>
      <span class="what">${esc(a.hook)}</span>
      <span class="arc-badge" style="color:${a.accent}">${esc(a.badge)}</span>
    </a>`).join('');
}

// ── The machine ──────────────────────────────────────────────
function renderReel() {
  $('#reel-prev').textContent = ARCADE_APPS[(state.reelIdx + N - 1) % N].title;
  $('#reel-cur').textContent = ARCADE_APPS[state.reelIdx].title;
  $('#reel-next').textContent = ARCADE_APPS[(state.reelIdx + 1) % N].title;
}

function renderMachine() {
  const btn = $('#insert-coin');
  btn.textContent = (state.spinning || state.coinDropping) ? 'Dealing…'
    : (state.credits > 0 ? 'Insert another coin' : 'Insert coin');
  $('#credit-readout').innerHTML = `CREDITS&nbsp;${String(state.credits).padStart(2, '0')}`;
  const play = $('#play-it');
  if (state.landed && !state.spinning) {
    const href = ARCADE_APPS[state.reelIdx].slug;
    if (play) { play.href = href; }
    else $('#btnrow').insertAdjacentHTML('beforeend', `<a class="cab__play" id="play-it" href="${href}">Play it →</a>`);
  } else if (play) {
    play.remove();
  }
  renderReel();
  renderScore();
}

function runSpin() {
  const total = 22 + Math.floor(Math.random() * 8);
  let step = 0;
  const tick = () => {
    step++;
    state.reelIdx = (state.reelIdx + 1) % N;
    renderReel();
    if (step < total) {
      setTimeout(tick, step < total - 6 ? 60 : 60 + (step - (total - 6)) * 55);
    } else {
      state.spinning = false;
      state.landed = true;
      renderMachine();
      renderBulbs();
    }
  };
  tick();
}

function wireSpin() {
  $('#insert-coin').addEventListener('click', () => {
    if (state.spinning || state.coinDropping) return;
    state.credits += 1;
    if (REDUCED) {
      state.reelIdx = Math.floor(Math.random() * N);
      state.landed = true;
      renderMachine();
      return;
    }
    state.coinDropping = true;
    state.landed = false;
    renderMachine();
    renderBulbs();
    const coin = document.createElement('i');
    coin.className = 'cab__coin';
    $('#btnrow').appendChild(coin);
    setTimeout(() => {
      coin.remove();
      state.coinDropping = false;
      state.spinning = true;
      renderMachine();
      renderBulbs();
      runSpin();
    }, 480);
  });
}

// ── Marquee bulbs: one chases; all light during a spin ───────
let bulbOn = 0;
function renderBulbs() {
  [...$('#bulbs').children].forEach((b, i) =>
    b.classList.toggle('is-lit', state.spinning || i === bulbOn));
}
function startBulbs() {
  if (REDUCED) return;
  setInterval(() => { bulbOn = (bulbOn + 1) % 5; renderBulbs(); }, 700);
}

// ── CRT power-on, once per session ───────────────────────────
function crtPowerOn() {
  if (REDUCED) return;
  try {
    if (sessionStorage.getItem('samie-arcade-crt')) return;
    sessionStorage.setItem('samie-arcade-crt', '1');
  } catch (err) { return; }
  const crt = document.createElement('div');
  crt.className = 'crt';
  crt.innerHTML = '<i class="half half--top"></i><i class="line"></i><i class="half half--bot"></i>';
  document.body.appendChild(crt);
  setTimeout(() => crt.remove(), 750);
}

// ── Attract mode after 20s idle ──────────────────────────────
function startAttract() {
  if (REDUCED) return;
  let idleT, attractT = null;
  const stop = () => {
    clearTimeout(idleT);
    if (attractT) {
      clearInterval(attractT);
      attractT = null;
      state.attract = false;
      const o = $('#attract');
      if (o) o.remove();
    }
    idleT = setTimeout(() => {
      if (state.spinning || state.coinDropping) { stop(); return; }
      state.attract = true;
      state.landed = false;
      renderMachine();
      $('#reel').insertAdjacentHTML('beforeend',
        '<div class="reel__attract" id="attract"><span>INSERT&nbsp;COIN</span></div>');
      attractT = setInterval(() => {
        state.reelIdx = (state.reelIdx + 1) % N;
        renderReel();
      }, 480);
    }, 20000);
  };
  ['pointermove', 'pointerdown', 'keydown', 'wheel'].forEach((ev) =>
    window.addEventListener(ev, stop, { passive: true }));
  stop();
}

// ── Pixel cursor trail ───────────────────────────────────────
function startTrail() {
  if (REDUCED) return;
  let last = 0;
  window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - last < 45) return;
    last = now;
    const d = document.createElement('i');
    d.style.cssText = `position:fixed;z-index:300;pointer-events:none;width:5px;height:5px;background:#1a6b5a;left:${e.clientX - 2}px;top:${e.clientY + 8}px;animation:spark .5s ease-out forwards`;
    d.addEventListener('animationend', () => d.remove());
    document.body.appendChild(d);
  }, { passive: true });
}

// ── Ticket dispenser ─────────────────────────────────────────
function wireTicket() {
  const ticket = $('#ticket');
  // A plain scroll check, not IntersectionObserver — simpler and reliable here.
  const check = () => {
    if (state.ticketOut) return;
    const f = $('#arcade-footer');
    if (f && f.getBoundingClientRect().top < window.innerHeight * 0.8) {
      state.ticketOut = true;
      ticket.classList.add('is-out');
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }
  };
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check, { passive: true });
  check();

  ticket.addEventListener('click', () => {
    if (state.ticketTorn) return;
    state.ticketTorn = true;
    $('#ticket-well').classList.add('is-open');
    ticket.classList.add('is-torn');
    setTimeout(() => {
      ticket.remove();
      state.credits += 10;
      $('#ticket-redeemed').hidden = false;
      renderMachine();
    }, 900);
  });
}

// ── High-score initials ──────────────────────────────────────
function renderScore() {
  const host = $('#hiscore-body');
  if (!host) return;
  if (state.initialsEditing) {
    if (!host.querySelector('.hiscore__edit')) {
      host.innerHTML = `
        <div class="hiscore__edit">
          ${[0, 1, 2].map((i) => `
            <div class="hiscore__col">
              <button type="button" data-up="${i}">▲</button>
              <span class="hiscore__ch" data-ch="${i}">${AZ[state.letters[i]]}</span>
              <button type="button" data-down="${i}">▼</button>
            </div>`).join('')}
          <button type="button" class="hiscore__end" id="save-initials">END</button>
        </div>`;
    } else {
      [0, 1, 2].forEach((i) => { host.querySelector(`[data-ch="${i}"]`).textContent = AZ[state.letters[i]]; });
    }
  } else {
    const line = state.initials
      ? `PLAYER ${state.initials} · ${String(state.credits * 100).padStart(6, '0')}`
      : 'ENTER YOUR INITIALS ▸';
    host.innerHTML = `<button type="button" class="hiscore__idle" id="edit-initials">${esc(line)}</button>`;
  }
}

function wireScore() {
  $('#hiscore-body').addEventListener('click', (e) => {
    const t = e.target;
    if (t.id === 'edit-initials') {
      state.initialsEditing = true;
      state.letters = (state.initials || 'AAA').split('').map((c) => Math.max(0, AZ.indexOf(c)));
      renderScore();
    } else if (t.dataset.up !== undefined) {
      const i = Number(t.dataset.up);
      state.letters[i] = (state.letters[i] + 25) % 26;
      renderScore();
    } else if (t.dataset.down !== undefined) {
      const i = Number(t.dataset.down);
      state.letters[i] = (state.letters[i] + 1) % 26;
      renderScore();
    } else if (t.id === 'save-initials') {
      state.initials = state.letters.map((i) => AZ[i]).join('');
      try { localStorage.setItem('samie-arcade-initials', state.initials); } catch (err) { /* fine */ }
      state.initialsEditing = false;
      renderScore();
    }
  });
}

// ── Boot ─────────────────────────────────────────────────────
try { state.initials = localStorage.getItem('samie-arcade-initials') || null; } catch (err) { /* fine */ }
renderApps();
renderMachine();
renderBulbs();
wireSpin();
wireTicket();
wireScore();
startBulbs();
crtPowerOn();
startAttract();
startTrail();
