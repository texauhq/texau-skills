// Run the skill evals against a live model through `claude -p`.
//   node run-evals.mjs                 skills and baseline, all evals
//   node run-evals.mjs --mode skills   only with skills
//   node run-evals.mjs --only maps-dentists --model sonnet
// Each run gets a fresh temp project: the mock texau server, project-only settings
// (no user skills, plugins or hooks), and the repo skills in .claude/skills for skills mode.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { EVALS } from './evals.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const modes = arg('--mode', 'both') === 'both' ? ['skills', 'baseline'] : [arg('--mode')];
const only = arg('--only');
const model = arg('--model');
const concurrency = Number(arg('--jobs', '4'));
const TIMEOUT_MS = Number(arg('--timeout', '480')) * 1000;
const outRoot = path.join(here, 'results', new Date().toISOString().replace(/[:.]/g, '-'));

function runOne(ev, mode) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `texau-eval-${ev.name}-${mode}-`));
  const log = path.join(dir, '.mock-log.jsonl');
  fs.writeFileSync(log, '');
  fs.writeFileSync(path.join(dir, '.scenario.json'), JSON.stringify(ev.scenario ?? {}));
  for (const [f, body] of Object.entries(ev.files ?? {})) fs.writeFileSync(path.join(dir, f), body);
  if (mode === 'skills') fs.cpSync(path.join(repo, 'skills'), path.join(dir, '.claude', 'skills'), { recursive: true });
  const ledger = path.join(dir, '.ledger.json');
  if (ev.ledger === 'seed') seedLedger(ledger);
  fs.writeFileSync(path.join(dir, '.mcp-eval.json'), JSON.stringify({ mcpServers: { texau: { command: process.execPath, args: [path.join(here, 'mock-server.mjs')], env: { MOCK_SCENARIO: path.join(dir, '.scenario.json'), MOCK_LOG: log } } } }));
  const args = ['-p', ev.prompt, '--mcp-config', path.join(dir, '.mcp-eval.json'), '--strict-mcp-config', '--setting-sources', 'project',
    '--allowedTools', 'mcp__texau', 'Read', 'Write', 'Edit', 'Skill', 'Glob', 'Bash(node:*)', '--output-format', 'stream-json', '--verbose'];
  if (model) args.push('--model', model);
  return new Promise((resolve) => {
    const t0 = Date.now();
    const child = spawn('claude', args, { cwd: dir, env: { ...process.env, NODE_PATH: path.join(here, 'node_modules'), TEXAU_LEDGER: ledger }, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    const timer = setTimeout(() => child.kill('SIGTERM'), TIMEOUT_MS);
    child.on('close', (code) => {
      clearTimeout(timer);
      const calls = fs.readFileSync(log, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
      const events = out.split('\n').flatMap((l) => { try { return [JSON.parse(l)]; } catch { return []; } });
      const skillsLoaded = events.flatMap((e) => e.message?.content ?? []).filter((c) => c.type === 'tool_use' && c.name === 'Skill').map((c) => c.input?.skill);
      const final = events.filter((e) => e.type === 'result').pop();
      const results = Object.fromEntries(Object.entries(ev.checks).map(([k, fn]) => { try { const [pass, detail] = fn(calls, dir); return [k, { pass, detail }]; } catch (e) { return [k, { pass: false, detail: `check error: ${e.message}` }]; } }));
      const dest = path.join(outRoot, mode, ev.name);
      fs.mkdirSync(dest, { recursive: true });
      fs.cpSync(dir, dest, { recursive: true, filter: (src) => !src.includes(`${path.sep}.claude${path.sep}`) });
      fs.writeFileSync(path.join(dest, 'transcript.jsonl'), out);
      resolve({ ev: ev.name, mode, code, secs: Math.round((Date.now() - t0) / 1000), cost: final?.total_cost_usd ?? 0, skillsLoaded, results, reply: final?.result ?? '' });
    });
  });
}

// A campaign 3 days in: 20 invites sent, nothing recorded since.
function seedLedger(file) {
  const date = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
  const people = {};
  for (let i = 0; i < 20; i++) people[`linkedin.com/in/prospect-${i}`] = { url: `https://www.linkedin.com/in/prospect-${i}`, fields: { firstName: `Name${i}` }, campaigns: { 'rival-post-likers': { steps: { invite: date } } } };
  fs.writeFileSync(file, JSON.stringify({ version: 1, campaigns: { 'rival-post-likers': { account: 'acc_li_01', steps: ['invite', 'message1', 'message2'], gaps: [0, 2, 5], createdAt: date } }, people, sends: [{ account: 'acc_li_01', kind: 'invite', date, count: 20, campaign: 'rival-post-likers', run: null }] }, null, 2));
}

const jobs = EVALS.filter((e) => !only || e.name === only).flatMap((ev) => modes.map((mode) => () => runOne(ev, mode)));
const done = [];
async function worker() { while (jobs.length) { const j = jobs.shift(); const r = await j(); done.push(r); const p = Object.values(r.results).filter((x) => x.pass).length; console.log(`${r.mode.padEnd(8)} ${r.ev.padEnd(28)} ${p}/${Object.keys(r.results).length}  ${r.secs}s  $${r.cost.toFixed(2)}  skills: ${r.skillsLoaded.join(',') || '-'}`); } }
await Promise.all(Array.from({ length: concurrency }, worker));

fs.mkdirSync(outRoot, { recursive: true });
fs.writeFileSync(path.join(outRoot, 'summary.json'), JSON.stringify(done, null, 2));
console.log('\nFailures:');
for (const r of done.sort((a, b) => a.ev.localeCompare(b.ev) || a.mode.localeCompare(b.mode))) for (const [k, v] of Object.entries(r.results)) if (!v.pass) console.log(`  ${r.mode} ${r.ev} ${k}: ${v.detail}`);
for (const m of modes) { const rs = done.filter((r) => r.mode === m); const all = rs.flatMap((r) => Object.values(r.results)); console.log(`${m}: ${all.filter((x) => x.pass).length}/${all.length} checks, $${rs.reduce((s, r) => s + r.cost, 0).toFixed(2)}`); }
console.log(`Results: ${outRoot}`);
