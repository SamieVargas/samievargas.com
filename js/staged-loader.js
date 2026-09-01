// ============================================================
// js/staged-loader.js
// A3 — one staged loader, shared by the API-backed apps.
//
// Three stages, each advanced by a real event rather than a
// timer: the fetch going out, the response being counted, and
// the paint. A budget trips the failure path so it can never
// spin forever.
//
// The apps each have their own palette, so the loader paints
// itself from custom properties and every app can retheme it
// without forking the markup:
//   --sl-accent  reached dot, progress fill
//   --sl-track   unreached dot, empty track
//   --sl-ink     reached label
//   --sl-faint   unreached label
//   --sl-alert   failed dot and label
// ============================================================

const STYLE_ID = 'staged-loader-css';

const CSS = `
.sl { display: flex; flex-direction: column; gap: 12px; }
.sl__row { display: flex; align-items: center; gap: 11px; }
.sl__dot { width: 9px; height: 9px; border-radius: 50%; flex: none;
  background: var(--sl-track, #e2ddce); transition: background .3s ease; }
.sl__row.is-on .sl__dot { background: var(--sl-accent, #1a6b5a); }
.sl__row.is-bad .sl__dot { background: var(--sl-alert, #c34a3a); }
.sl__label { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px;
  color: var(--sl-faint, #9a9686); transition: color .3s ease; }
.sl__row.is-on .sl__label { color: var(--sl-ink, #16150f); }
.sl__row.is-bad .sl__label { color: var(--sl-alert, #c34a3a); }
.sl__track { height: 4px; background: var(--sl-track, #e2ddce); margin-top: 2px; }
.sl__fill { height: 100%; width: 0; background: var(--sl-accent, #1a6b5a);
  transition: width .4s cubic-bezier(.2,.8,.2,1); }
.sl__fill.is-bad { background: var(--sl-alert, #c34a3a); }
@media (prefers-reduced-motion: reduce) {
  .sl__dot, .sl__label, .sl__fill { transition: none; }
}`;

function injectCss(doc) {
  if (doc.getElementById(STYLE_ID)) return;
  const el = doc.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CSS;
  doc.head.appendChild(el);
}

/**
 * Mount a three-stage loader.
 *
 * @param {Element} mount    where the loader lives; its contents are replaced
 * @param {object}  opts
 * @param {string}  opts.source   named in stage one, e.g. 'Wikidata'
 * @param {number}  [opts.budgetMs=15000]  past this, the live stage fails
 * @param {string}  [opts.recovery]  what the reader can do when it fails
 * @returns {{request:Function, parse:Function, render:Function,
 *            done:Function, fail:Function}}
 */
export function stagedLoader(mount, opts = {}) {
  const doc = mount.ownerDocument;
  injectCss(doc);

  const source = opts.source || 'the source';
  const budgetMs = opts.budgetMs || 15000;
  const recovery = opts.recovery || 'Reload to try again.';

  const labels = [`requesting ${source}`, 'parsing records', 'rendering'];
  mount.innerHTML = '';

  const root = doc.createElement('div');
  root.className = 'sl';
  root.setAttribute('role', 'status');
  root.setAttribute('aria-live', 'polite');

  const rows = labels.map((text) => {
    const row = doc.createElement('div');
    row.className = 'sl__row';
    const dot = doc.createElement('i');
    dot.className = 'sl__dot';
    const label = doc.createElement('span');
    label.className = 'sl__label';
    label.textContent = text;
    row.append(dot, label);
    root.appendChild(row);
    return { row, label };
  });

  const track = doc.createElement('div');
  track.className = 'sl__track';
  const fill = doc.createElement('i');
  fill.className = 'sl__fill';
  track.appendChild(fill);
  root.appendChild(track);
  mount.appendChild(root);

  let stage = -1;
  let settled = false;
  let timer;

  const armBudget = () => {
    clearTimeout(timer);
    if (settled) return;
    timer = setTimeout(() => {
      // Name the stage that never resolved, so the message is specific.
      const stuck = Math.max(0, stage);
      fail(`${labels[stuck]} timed out`, recovery);
    }, budgetMs);
  };

  const reach = (i, text) => {
    if (settled || i <= stage) return;
    stage = i;
    for (let n = 0; n <= i; n++) rows[n].row.classList.add('is-on');
    if (text) rows[i].label.textContent = text;
    fill.style.width = `${((i + 1) / rows.length) * 100}%`;
    armBudget();
  };

  function fail(what, how) {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    const i = Math.max(0, stage);
    rows[i].row.classList.remove('is-on');
    rows[i].row.classList.add('is-bad');
    rows[i].label.textContent = how ? `${what} — ${how}` : what;
    fill.classList.add('is-bad');
  }

  return {
    request: () => reach(0),
    // The count is real: it comes from the parsed response, not an estimate.
    parse: (n) => reach(1, typeof n === 'number'
      ? `parsing ${n.toLocaleString()} record${n === 1 ? '' : 's'}`
      : 'parsing records'),
    render: () => reach(2),
    done: () => {
      settled = true;
      clearTimeout(timer);
      mount.innerHTML = '';
    },
    fail,
  };
}
