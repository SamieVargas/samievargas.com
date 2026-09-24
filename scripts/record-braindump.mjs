#!/usr/bin/env node
// Records the Brain Dump piles the work page shows.
//
//   ANTHROPIC_API_KEY=... node scripts/record-braindump.mjs <path-to-brain-dump-checkout> [--runs=5]
//
// Sends the homepage's dump (BD_DUMP in data/content.js) through the real
// sorter once per energy state per run, using the brain-dump Worker's own
// exported requestBody(), so the model, prompt version, schema and token
// budget are exactly what the live app sends. Every reply is kept, parsed
// with the Worker's own parser, and written to data/braindump-runs.json,
// which js/app.js reads: once a state has a recorded run, its bins show that
// run's buckets verbatim and the "predicted" caption goes away.
//
// Which run the page shows is `shown` per state (default 0, the first run);
// change it by hand if you want a different one, the others stay in the file.
// Cost at list price is a few cents a call (see brain-dump's README), so the
// default 5 runs × 5 states is roughly a dollar.

import { writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [bdPath] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const runs = Number((process.argv.find((a) => a.startsWith('--runs=')) || '--runs=5').split('=')[1]);
const key = process.env.ANTHROPIC_API_KEY;
if (!bdPath || !key || !(runs > 0)) {
  console.error('usage: ANTHROPIC_API_KEY=... node scripts/record-braindump.mjs <path-to-brain-dump> [--runs=5]');
  process.exit(1);
}

const bd = (f) => import(pathToFileURL(resolve(bdPath, f)).href);
const { requestBody } = await bd('worker/index.js');
const { MODEL, ENERGY_STATES, costUsd } = await bd('worker/contracts.js');
const { PROMPT_VERSION } = await bd('worker/prompts.js');
const { parseJson } = await bd('worker/parse.js');
const { BD_DUMP } = await import(pathToFileURL(join(root, 'data/content.js')).href);

// The dump exactly as the homepage types it.
const dump = BD_DUMP.map((w) => w.t).join(', ');
const out = { recorded: new Date().toISOString().slice(0, 10), model: MODEL, prompt_version: PROMPT_VERSION, contract: 'native', runs_per_state: runs, dump, states: {} };

for (const state of ENERGY_STATES) {
  const rows = [];
  for (let i = 0; i < runs; i++) {
    const body = requestBody({ mode: 'sort', energy_state: state, dump }, { contract: 'native', stream: false });
    const t0 = Date.now();
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(body),
    });
    if (!res.ok) { console.error(`${state} run ${i + 1}: anthropic ${res.status} ${(await res.text()).slice(0, 200)}`); process.exit(1); }
    const data = await res.json();
    const text = (data.content ?? []).filter((c) => c.type === 'text').map((c) => c.text).join('');
    const parsed = parseJson(text, { stopReason: data.stop_reason });
    rows.push({
      parse: parsed.ok ? parsed.path : 'failed',
      stop_reason: data.stop_reason,
      ms: Date.now() - t0,
      cost_usd: costUsd(data.usage),
      buckets: parsed.ok ? parsed.value.buckets : null,
      output_type: parsed.ok ? parsed.value.output_type : null,
    });
    console.log(`${state} ${i + 1}/${runs} ${rows.at(-1).parse} ${rows.at(-1).ms}ms`);
  }
  const shown = Math.max(0, rows.findIndex((r) => r.buckets));
  out.states[state] = { shown, runs: rows };
}

await writeFile(join(root, 'data/braindump-runs.json'), `${JSON.stringify(out, null, 2)}\n`);
console.log('wrote data/braindump-runs.json; bump the ?v= token and push');
