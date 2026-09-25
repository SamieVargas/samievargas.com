// Writes data/changelog.json from the git history of the checked-out
// branch. The /toolkit change log, the pushes-per-week strip, and the
// résumé freshness stamp all read that one file, so the site never has
// to call the GitHub API from a visitor's browser. Run by
// .github/workflows/changelog.yml on every push to main; can also be run
// by hand from the repo root: node .github/scripts/changelog.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = 'data/changelog.json';
const REPO = 'SamieVargas/samievargas.github.io';
// The snapshot commits themselves never count, or every push would show
// up twice.
const SKIP = '^Snapshot the change log';
const LATEST = 10;
const WEEKS = 20;

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const parse = (out) => out.split('\n').filter(Boolean).map((line) => {
  const [sha, date, message] = line.split('\x1f');
  return { sha, date, message };
});

const all = parse(git('log', 'HEAD', '--invert-grep', `--grep=${SKIP}`, '--format=%H%x1f%cI%x1f%s'));
const latest = parse(git('log', 'HEAD', '--no-merges', '--invert-grep', `--grep=${SKIP}`, `-n${LATEST}`, '--format=%H%x1f%cI%x1f%s'));
const resume = parse(git('log', 'HEAD', '-n1', '--format=%H%x1f%cI%x1f%s', '--', 'resume.html'))[0] || null;

// Commits per seven-day bucket, oldest first, the newest bucket ending now.
const now = Date.now();
const weeks = Array.from({ length: WEEKS }, () => 0);
for (const c of all) {
  const age = now - new Date(c.date).getTime();
  const bucket = WEEKS - 1 - Math.floor(age / (7 * 86400000));
  if (bucket >= 0 && bucket < WEEKS) weeks[bucket] += 1;
}

const snapshot = {
  generated: new Date(now).toISOString().replace(/\.\d{3}Z$/, 'Z'),
  repo: REPO,
  first: all[all.length - 1].date,
  total: all.length,
  commits: latest.map(({ sha, date, message }) => ({ sha, date, message })),
  weeks,
  resume: resume ? { sha: resume.sha, date: resume.date } : null,
};

let previous = null;
try { previous = JSON.parse(readFileSync(OUT, 'utf8')); } catch (err) { /* first run */ }
// Nothing but the timestamp moved: leave the file alone so the workflow
// has nothing to commit.
const same = previous && JSON.stringify({ ...previous, generated: null }) === JSON.stringify({ ...snapshot, generated: null });
if (same) {
  console.log(`${OUT} unchanged`);
} else {
  writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`${OUT}: ${snapshot.total} commits, latest ${snapshot.commits[0].sha.slice(0, 7)}`);
}
