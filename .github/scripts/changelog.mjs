// Writes data/changelog.json from the git history of the checked-out
// branch. The /toolkit change log, the pushes-per-week strip, the page
// freshness list, the reasons column and the résumé freshness stamp all
// read that one file, so the site never has to call the GitHub API from a
// visitor's browser. Run by .github/workflows/changelog.yml on every push
// to main; can also be run by hand from the repo root:
//   node .github/scripts/changelog.mjs
//
// A commit becomes a note on /toolkit when its message body has a line
// that starts with "Why:", for example
//   git commit -m "Split the Christie shelf by series" -m "Why: the Poirot run is the one I track, and the rest are maybes."
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = 'data/changelog.json';
const REPO = 'SamieVargas/samievargas.github.io';
// The snapshot commits themselves never count, or every push would show
// up twice.
const SKIP = '^Snapshot the change log';
const LATEST = 10;
const WEEKS = 20;
const NOTES = 8;
// The pages the freshness list tracks, with the label /toolkit shows.
const PAGES = [
  ['index.html', 'Work'], ['life.html', 'Life'], ['resume.html', 'Résumé'],
  ['pixels/index.html', 'Pixels replay'], ['assist/index.html', 'Assist replay'],
  ['apps/index.html', 'Arcade'], ['raccoon/index.html', 'Raccoon'],
  ['toolkit.html', 'Toolkit'], ['404.html', '404'],
];

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const parse = (out) => out.split('\n').filter(Boolean).map((line) => {
  const [sha, date, message] = line.split('\x1f');
  return { sha, date, message };
});

const all = parse(git('log', 'HEAD', '--invert-grep', `--grep=${SKIP}`, '--format=%H%x1f%cI%x1f%s'));
const latest = parse(git('log', 'HEAD', '--no-merges', '--invert-grep', `--grep=${SKIP}`, `-n${LATEST}`, '--format=%H%x1f%cI%x1f%s'));
const lastTouch = (file) => parse(git('log', 'HEAD', '-n1', '--invert-grep', `--grep=${SKIP}`, '--format=%H%x1f%cI%x1f%s', '--', file))[0] || null;
const resume = lastTouch('resume.html');

const pages = PAGES.map(([file, label]) => {
  const c = lastTouch(file);
  return c ? { file, label, date: c.date, sha: c.sha, message: c.message } : null;
}).filter(Boolean);

// Commits that carry a "Why:" line, newest first.
const notes = git('log', 'HEAD', '--no-merges', '--extended-regexp', '--grep=^Why:', `-n${NOTES}`, '--format=%H%x1f%cI%x1f%s%x1f%b%x1e')
  .split('\x1e').map((r) => r.trim()).filter(Boolean).map((r) => {
    const [sha, date, title, body = ''] = r.split('\x1f');
    const why = body.split('\n').find((l) => /^Why:/i.test(l.trim()));
    return why ? { sha, date, title, body: why.trim().replace(/^Why:\s*/i, '') } : null;
  }).filter(Boolean);

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
  pages,
  notes,
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
  console.log(`${OUT}: ${snapshot.total} commits, ${pages.length} pages, ${notes.length} notes, latest ${snapshot.commits[0].sha.slice(0, 7)}`);
}
