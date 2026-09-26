// ============================================================
// js/drift-chart.js
// The ATX Foodie drift line, shared by the work page and /life#notes.
// A real y-scale with whole-point gridlines, so a two-point change
// reads as two points, flipped the way the notebook draws it because a
// higher score here is more violations, so down is worse, dots on the first and last inspection with
// their labels beside them, and a clip-path wipe (never dash-offset,
// since the line uses a non-scaling stroke).
// ============================================================

import { REDUCED, esc, tween } from './reveal.js?v=20260925j';

// Whole-point bounds around the data, e.g. 89.8–92.6 → 89–93.
function bounds(scores) {
  const lo = Math.floor(Math.min(...scores));
  const hi = Math.ceil(Math.max(...scores));
  return hi - lo < 2 ? [lo - 1, hi + 1] : [lo, hi];
}

export function driftChart(scores, { first, last, axis = '↑ fewer violations · ↓ more', end = String(scores.length) } = {}) {
  const [lo, hi] = bounds(scores);
  const n = scores.length - 1;
  const y = (s) => ((s - lo) / (hi - lo)) * 100;
  const x = (i) => (i / n) * 100;
  const ticks = [];
  for (let t = lo; t <= hi; t += 1) ticks.push(t);
  const pts = scores.map((s, i) => `${x(i).toFixed(2)},${y(s).toFixed(2)}`).join(' ');
  const y0 = y(scores[0]).toFixed(2);
  const yN = y(scores[n]).toFixed(2);
  return `
    <figure class="dc">
      <div class="dc__plot">
        <div class="dc__y" aria-hidden="true">${ticks.map((t) => `<span style="top:${y(t).toFixed(2)}%">${t}</span>`).join('')}</div>
        <div class="dc__area">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${ticks.map((t) => `<line x1="0" x2="100" y1="${y(t).toFixed(2)}" y2="${y(t).toFixed(2)}" vector-effect="non-scaling-stroke"></line>`).join('')}
            <polyline class="dc__line" points="${pts}" vector-effect="non-scaling-stroke"></polyline>
          </svg>
          <i class="dc__dot" style="left:0%;top:${y0}%"></i>
          <i class="dc__dot dc__dot--last" style="left:100%;top:${yN}%"></i>
          <span class="dc__lab dc__lab--first" style="top:${y0}%">${first.split(' · ').map(esc).join('<br>')}</span>
          <span class="dc__lab dc__lab--last" style="top:${yN}%">${esc(last)}</span>
        </div>
      </div>
      <figcaption class="dc__x"><span>inspection 1</span><span>${esc(axis)}</span><span>${esc(end)}</span></figcaption>
    </figure>`;
}

// Wipe the line in from the left, then show the end dots and labels.
export function revealDrift(root, delay = 300) {
  const fig = root.querySelector('.dc');
  if (!fig) return;
  const line = fig.querySelector('.dc__line');
  if (REDUCED) { line.style.clipPath = 'none'; fig.classList.add('is-on'); return; }
  tween(1800, (p) => { line.style.clipPath = `inset(-10px ${((1 - p) * 100).toFixed(1)}% -10px -10px)`; }, delay)
    .then(() => fig.classList.add('is-on'));
}
