import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const BIN = fileURLToPath(new URL('../../skills/texau-operator/scripts/texau-ledger.mjs', import.meta.url));
let dir;
const run = (...args) => JSON.parse(execFileSync(process.execPath, [BIN, ...args], { env: { ...process.env, TEXAU_LEDGER: path.join(dir, 'ledger.json') }, cwd: dir }).toString());
const fail = (...args) => { try { run(...args); } catch (e) { return { status: e.status, err: JSON.parse(e.stderr.toString()) }; } throw new Error('expected failure'); };
const csv = (name, lines) => { fs.writeFileSync(path.join(dir, name), lines.join('\n') + '\n'); return path.join(dir, name); };

beforeEach(() => { dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ledger-')); });

test('sequence: invite, then message only after connection and gap; replies stop it', () => {
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite,message1', '--gaps', '0,3');
  const people = csv('p.csv', ['profileUrl,firstName', 'https://www.linkedin.com/in/a/,Ann', 'https://linkedin.com/in/b,Bo', 'https://www.linkedin.com/in/c?trk=x,Cy']);
  assert.equal(run('record', '--campaign', 'c1', '--step', 'invite', '--csv', people, '--date', '2026-10-05').recorded, 3);
  assert.equal(run('record', '--campaign', 'c1', '--step', 'invite', '--csv', people, '--date', '2026-10-05').recorded, 0, 'idempotent');
  run('connected', '--campaign', 'c1', '--csv', csv('conn.csv', ['profileUrl', 'https://www.linkedin.com/in/a', 'https://www.linkedin.com/in/b']));
  assert.equal(run('due', '--campaign', 'c1', '--date', '2026-10-07').count, 0, 'gap of 3 days not over');
  run('reply', '--campaign', 'c1', '--csv', csv('rep.csv', ['profileUrl', 'https://www.linkedin.com/in/b']));
  const d = run('due', '--campaign', 'c1', '--date', '2026-10-08');
  assert.deepEqual(d.rows.map((r) => r.firstName), ['Ann'], 'c not connected, b replied');
  assert.equal(d.rows[0].step, 'message1');
});

test('exclude removes contacted people and duplicates for the same account only', () => {
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite');
  run('record', '--campaign', 'c1', '--step', 'invite', '--csv', csv('s.csv', ['profileUrl', 'https://www.linkedin.com/in/a']));
  const cand = csv('cand.csv', ['profileUrl,headline', 'https://www.linkedin.com/in/A/,x', 'https://www.linkedin.com/in/z,y', 'https://www.linkedin.com/in/z/,y']);
  const r = run('exclude', '--account', 'acc1', '--csv', cand, '--out', path.join(dir, 'clean.csv'));
  assert.equal(r.kept, 1);
  assert.equal(r.removedContacted, 1);
  assert.equal(r.removedDuplicates, 1);
  assert.equal(run('exclude', '--account', 'acc2', '--csv', cand, '--out', path.join(dir, 'c2.csv')).kept, 2);
});

test('usage counts invites per day and per Monday week', () => {
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite');
  const mk = (n, f) => csv(f, ['profileUrl', ...Array.from({ length: n }, (_, i) => `https://www.linkedin.com/in/${f}-${i}`)]);
  run('record', '--campaign', 'c1', '--step', 'invite', '--csv', mk(20, 'mon'), '--date', '2026-10-26');
  run('record', '--campaign', 'c1', '--step', 'invite', '--csv', mk(15, 'tue'), '--date', '2026-10-27');
  const u = run('usage', '--account', 'acc1', '--date', '2026-10-27');
  assert.equal(u.invite.usedToday, 15);
  assert.equal(u.invite.usedWeek, 35);
  assert.equal(u.invite.leftToday, 5);
  assert.equal(run('usage', '--account', 'acc1', '--date', '2026-11-02').invite.usedWeek, 0, 'new week');
});

test('errors are coded, name the fix, and exit 2', () => {
  const r = fail('due', '--campaign', 'nope');
  assert.equal(r.status, 2);
  assert.equal(r.err.error, 'CAMPAIGN_NOT_FOUND');
  assert.ok(r.err.fix);
  assert.equal(fail('record', '--campaign', 'x').err.error, 'MISSING_ARG');
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite');
  assert.equal(fail('record', '--campaign', 'c1', '--step', 'invite', '--csv', csv('bad.csv', ['name', 'Ann'])).err.error, 'CSV_NO_URL_COLUMN');
});

test('status reports acceptance and reply rates', () => {
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite,message1', '--gaps', '0,3');
  run('record', '--campaign', 'c1', '--step', 'invite', '--csv', csv('p.csv', ['profileUrl', 'https://www.linkedin.com/in/a', 'https://www.linkedin.com/in/b', 'https://www.linkedin.com/in/c', 'https://www.linkedin.com/in/d']));
  run('connected', '--campaign', 'c1', '--csv', csv('c.csv', ['profileUrl', 'https://www.linkedin.com/in/a']));
  const s = run('status').campaigns[0];
  assert.equal(s.acceptanceRate, 25);
  assert.equal(s.people, 4);
});

test('real TexAu export columns (liProfileUrl) are read', () => {
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite');
  const r = run('record', '--campaign', 'c1', '--step', 'invite', '--csv', csv('real.csv', ['firstName,liProfileUrl,snProfileUrl', 'Ann,https://www.linkedin.com/in/ann,https://www.linkedin.com/sales/lead/x']));
  assert.equal(r.recorded, 1);
  assert.equal(run('exclude', '--account', 'acc1', '--csv', csv('again.csv', ['liProfileUrl', 'https://linkedin.com/in/ann/']), '--out', path.join(dir, 'o.csv')).kept, 0);
});

test('TexAu result columns (labels such as "Profile URL") are read', () => {
  run('campaign-add', '--name', 'c1', '--account', 'acc1', '--steps', 'invite');
  const r = run('record', '--campaign', 'c1', '--step', 'invite', '--csv', csv('labels.csv', ['Input,Status,Message,First Name,Profile URL,SalesNav Profile URL,Raw result', 'Row 1,Success,,Ann,https://www.linkedin.com/in/ann,https://www.linkedin.com/sales/lead/x,']));
  assert.equal(r.recorded, 1);
});
