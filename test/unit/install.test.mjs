import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { main, candidates, connectCodex, findApp } from '../../install.mjs';

const MOCK = fileURLToPath(new URL('../mock-server.mjs', import.meta.url));
const tmpHome = () => fs.mkdtempSync(path.join(os.tmpdir(), 'texau-home-'));

test('standard install candidates per platform', () => {
  assert.equal(candidates('darwin', '/Users/x', {})[0][1], '/Applications/TexAu.app/Contents/Resources/mcp/texau-mcp.cjs');
  assert.ok(candidates('win32', 'C:\\Users\\x', { LOCALAPPDATA: 'C:\\Users\\x\\AppData\\Local' }).some(([a]) => a.includes('Programs') && a.endsWith('TexAu.exe')));
  assert.ok(candidates('linux', '/home/x', {}).some(([, s]) => s === '/opt/TexAu/resources/mcp/texau-mcp.cjs'));
});

test('custom paths need both --app and --shim, and must exist', () => {
  assert.throws(() => findApp({ app: process.execPath }), { code: 'APP_ARGS' });
  assert.throws(() => findApp({ app: process.execPath, shim: '/nope.cjs' }), { code: 'APP_PATH_MISSING' });
});

test('installs skills and Cursor and Codex configs, keeps other servers, backs up, then tests the server', async () => {
  const home = tmpHome();
  fs.mkdirSync(path.join(home, '.cursor'));
  fs.writeFileSync(path.join(home, '.cursor', 'mcp.json'), JSON.stringify({ mcpServers: { other: { command: 'x' } } }));
  fs.mkdirSync(path.join(home, '.codex'));
  fs.writeFileSync(path.join(home, '.codex', 'config.toml'), 'model = "o3"\n\n[mcp_servers.other]\ncommand = "y"\n');
  const r = await main(['--clients', 'cursor,codex', '--app', process.execPath, '--shim', MOCK], home);
  const cursor = JSON.parse(fs.readFileSync(path.join(home, '.cursor', 'mcp.json'), 'utf8'));
  assert.equal(cursor.mcpServers.other.command, 'x');
  assert.equal(cursor.mcpServers.texau.args[0], MOCK);
  assert.equal(cursor.mcpServers.texau.env.ELECTRON_RUN_AS_NODE, '1');
  const toml = fs.readFileSync(path.join(home, '.codex', 'config.toml'), 'utf8');
  assert.match(toml, /\[mcp_servers\.other\]/);
  assert.match(toml, /\[mcp_servers\.texau\]/);
  assert.ok(fs.readdirSync(path.join(home, '.cursor')).some((f) => f.includes('texau-backup')));
  assert.ok(fs.existsSync(path.join(home, '.cursor', 'skills', 'texau-operator', 'scripts', 'texau-ledger.mjs')));
  assert.ok(fs.existsSync(path.join(home, '.agents', 'skills', 'linkedin-outreach', 'SKILL.md')));
  assert.equal(r.test.ok, true);
  assert.equal(r.test.tools, 13);
  assert.equal(r.test.status.license, 'valid');
});

test('codex block is replaced, not duplicated, on a second run', () => {
  const home = tmpHome();
  connectCodex(home, '/a/TexAu', '/a/shim.cjs', false, []);
  connectCodex(home, '/b/TexAu', '/b/shim.cjs', false, []);
  const toml = fs.readFileSync(path.join(home, '.codex', 'config.toml'), 'utf8');
  assert.equal(toml.match(/\[mcp_servers\.texau\]/g).length, 1);
  assert.match(toml, /\/b\/shim\.cjs/);
});

test('dry run changes nothing', async () => {
  const home = tmpHome();
  fs.mkdirSync(path.join(home, '.cursor'));
  const r = await main(['--clients', 'cursor', '--app', process.execPath, '--shim', MOCK, '--dry-run'], home);
  assert.equal(r.dryRun, true);
  assert.ok(!fs.existsSync(path.join(home, '.cursor', 'mcp.json')));
  assert.ok(!fs.existsSync(path.join(home, '.cursor', 'skills')));
});
