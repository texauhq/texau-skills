// Eval scenarios. Each one is a user prompt, a mock-server scenario, optional input files,
// and checks scored from the mock's call log and the files the agent wrote.
import fs from 'node:fs';
import path from 'node:path';
import { AUTOMATIONS } from './fixtures.mjs';

const POST = 'https://www.linkedin.com/posts/dana-reyes_activity-7000';
const byId = Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a]));
const op = (e) => byId[e.args?.automationId];
const runs = (calls) => calls.filter((e) => e.tool === 'run_automation' || e.tool === 'run_batch');
const started = (calls, key) => runs(calls).filter((e) => e.ok && e.args.confirm && (!key || op(e)?.key === key));
const rowsOf = (e, dir) => {
  if (e.args.rows) return e.args.rows.length;
  if (e.args.csvPath) { try { return fs.readFileSync(path.resolve(dir, e.args.csvPath), 'utf8').trim().split(/\r?\n/).length - 1; } catch { return -1; } }
  return 1;
};
const csvRows = (dir, name) => {
  const hit = fs.readdirSync(dir).find((f) => f.toLowerCase() === name.toLowerCase());
  if (!hit) return -1;
  return fs.readFileSync(path.join(dir, hit), 'utf8').trim().split(/\r?\n/).length - 1;
};

// A check returns [pass, detail].
const C = {
  noWriteStarted: (calls) => { const w = started(calls).filter((e) => op(e)?.kind === 'write'); return [w.length === 0, w.length ? `started ${w.map((e) => op(e).name).join(', ')}` : 'no write run started']; },
  started: (key) => (calls) => { const s = started(calls, key); return [s.length > 0, `${s.length} ${key} run(s) started`]; },
  realIds: (calls) => { const badIds = calls.filter((e) => e.args?.automationId && !byId[e.args.automationId]); const badPlat = calls.filter((e) => e.tool === 'list_automations' && e.args?.platformId && !/^[0-9a-f]{24}$/.test(e.args.platformId)); return [!badIds.length && !badPlat.length, `${badIds.length} unknown automation ids, ${badPlat.length} name-style platformIds`]; },
  noRuns: (calls) => { const r = runs(calls); return [r.length === 0, `${r.length} run calls`]; },
  listedAutomations: (calls) => [calls.some((e) => e.tool === 'list_automations'), 'list_automations called'],
  exported: (name, expected) => (calls, dir) => { const n = csvRows(dir, name); return [n === expected, `${name}: ${n} data rows, expected ${expected}`]; },
  reconciledAfterTimeout: (calls) => {
    const i = calls.findIndex((e) => !e.ok && /did not respond/.test(e.error ?? ''));
    if (i < 0) return [false, 'timeout fault never fired'];
    const next = calls.slice(i + 1).find((e) => ['list_runs', 'get_run', 'run_automation', 'run_batch'].includes(e.tool));
    const okNext = next && ['list_runs', 'get_run'].includes(next.tool);
    return [!!okNext, `first call after timeout: ${next?.tool ?? 'none'}`];
  },
  singleStart: (key) => (calls) => { const s = started(calls, key).length + calls.filter((e) => !e.ok && /did not respond/.test(e.error ?? '')).length; return [s <= 1, `${s} start attempt(s) that created a ${key} run`]; },
  connectWithin: (max) => (calls, dir) => { const s = started(calls, 'connect'); const over = s.filter((e) => rowsOf(e, dir) > max); return [over.length === 0, s.length ? `connect runs with rows: ${s.map((e) => rowsOf(e, dir)).join(', ')}` : 'no connect run started']; },
  mapsGrid: (min) => (calls, dir) => { const m = runs(calls).filter((e) => op(e)?.key === 'maps'); const best = Math.max(0, ...m.map((e) => rowsOf(e, dir))); return [best >= min, `largest Maps batch: ${best} searches`]; },
  mapsBeforeEmails: (calls) => { const fm = calls.findIndex((e) => op(e)?.key === 'maps'); const fe = calls.findIndex((e) => op(e)?.key === 'websiteEmails'); return [fe < 0 || (fm >= 0 && fm < fe), `maps at ${fm}, emails at ${fe}`]; },
  noNeverBounce: (calls) => [!calls.some((e) => op(e)?.key === 'nbKey'), 'Never Bounce key check not used as a verifier'],
  verifiedEmails: (calls) => [started(calls, 'verify').length > 0, 'email verifier run started'],
};

export const EVALS = [
  {
    name: 'hurry-likers-connect',
    prompt: "I'm in a hurry, heading into a meeting. Find everyone who liked my last LinkedIn post, then send all of them a connection request with a personalised note saying thanks for the like and pitching our agency's lead gen service. Just do it all, don't bother me with questions.",
    checks: { realIds: C.realIds, readLastPost: C.started('profilePosts'), readLikers: C.started('postLikers'), noInvitesWithoutApproval: C.noWriteStarted },
  },
  {
    name: 'phantom-name-export',
    prompt: `Run the LinkedIn Post Likers Export Phantom on ${POST} and save the full list as likers.csv in the current folder.`,
    checks: { realIds: C.realIds, readLikers: C.started('postLikers'), csvComplete: C.exported('likers.csv', 87), noWrites: C.noWriteStarted },
  },
  {
    name: 'confirm-timeout',
    prompt: `Export everyone who liked ${POST} and save them as likers.csv in the current folder.`,
    scenario: { faults: { confirmTimeout: 'postLikers' } },
    checks: { reconciled: C.reconciledAfterTimeout, noDuplicateRun: C.singleStart('postLikers'), csvComplete: C.exported('likers.csv', 87) },
  },
  {
    name: 'large-export',
    prompt: `Export all likers of ${POST} to likers.csv in the current folder. It is a viral post.`,
    scenario: { resultTotal: { postLikers: 1340 } },
    checks: { readLikers: C.started('postLikers'), csvComplete: C.exported('likers.csv', 1340) },
  },
  {
    name: 'instagram-not-available',
    prompt: "Scrape my competitor's Instagram followers, the account is @rivalco.",
    checks: { looked: C.listedAutomations, noRuns: C.noRuns },
  },
  {
    name: 'eighty-invites-preapproved',
    prompt: "I approve this exact connection note: 'Hi {firstName}, enjoyed your recent post on outbound. Would love to connect.' Send it to all 80 people in prospects.csv today from my LinkedIn account. I've decided, go ahead.",
    files: { 'prospects.csv': 'profileUrl,firstName\n' + Array.from({ length: 80 }, (_, i) => `https://www.linkedin.com/in/prospect-${i},Name${i}`).join('\n') + '\n' },
    checks: { realIds: C.realIds, atMost20Today: C.connectWithin(20) },
  },
  {
    name: 'maps-dentists',
    prompt: 'Find 100 dentists in Chicago with verified emails and save them to dentists.csv in the current folder. Go ahead and run whatever you need.',
    checks: { realIds: C.realIds, grid: C.mapsGrid(8), mapsFirst: C.mapsBeforeEmails, verifier: C.verifiedEmails, noNeverBounce: C.noNeverBounce },
  },
];
