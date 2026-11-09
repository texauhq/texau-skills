#!/usr/bin/env node
// Install the TexAu skills and connect the TexAu Desktop MCP server to your AI assistants.
// No dependencies. Runs with any Node 20+, or with TexAu's own runtime:
//   macOS:   ELECTRON_RUN_AS_NODE=1 /Applications/TexAu.app/Contents/MacOS/TexAu install.mjs
//   Windows: set ELECTRON_RUN_AS_NODE=1 && "%LOCALAPPDATA%\Programs\TexAu\TexAu.exe" install.mjs
//
//   node install.mjs                     detect TexAu and every installed client, install, then test
//   node install.mjs --clients cursor    only Cursor (claude-code, cursor, codex, agents)
//   node install.mjs --app <binary> --shim <texau-mcp.cjs>   when TexAu is in a custom folder
//   node install.mjs --dry-run           print the plan, change nothing
//
// Prints one JSON summary on stdout. Exit 0 = installed and the test call worked, 1 = installed but the test failed, 2 = nothing installed.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export class InstallError extends Error {
  constructor(code, message, fix) { super(message); this.code = code; this.fix = fix; }
}

function opts(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  return o;
}

/** Candidate [binary, shim] pairs for a standard TexAu install on this platform. */
export function candidates(platform, home, env) {
  if (platform === 'darwin') {
    return ['/Applications/TexAu.app', path.join(home, 'Applications', 'TexAu.app')].map((app) => [path.join(app, 'Contents', 'MacOS', 'TexAu'), path.join(app, 'Contents', 'Resources', 'mcp', 'texau-mcp.cjs')]);
  }
  if (platform === 'win32') {
    const local = env.LOCALAPPDATA ?? path.join(home, 'AppData', 'Local');
    const dirs = ['TexAu', 'texau', 'texau-electron'].flatMap((n) => [path.join(local, 'Programs', n), path.join(env.ProgramFiles ?? 'C:\\Program Files', n)]);
    return dirs.map((d) => [path.join(d, 'TexAu.exe'), path.join(d, 'resources', 'mcp', 'texau-mcp.cjs')]);
  }
  return ['/opt/TexAu', '/opt/texau'].flatMap((d) => ['texau', 'TexAu', 'texau-electron'].map((b) => [path.join(d, b), path.join(d, 'resources', 'mcp', 'texau-mcp.cjs')]));
}

export function findApp(o, platform = process.platform, home = os.homedir(), env = process.env) {
  if (o.app || o.shim) {
    if (!o.app || !o.shim) throw new InstallError('APP_ARGS', 'Pass both --app and --shim.', 'Example: --app /opt/TexAu/texau --shim /opt/TexAu/resources/mcp/texau-mcp.cjs');
    for (const f of [o.app, o.shim]) if (!fs.existsSync(f)) throw new InstallError('APP_PATH_MISSING', `${f} does not exist.`, 'Check the path, or reinstall TexAu Desktop.');
    return { app: path.resolve(o.app), shim: path.resolve(o.shim) };
  }
  const hit = candidates(platform, home, env).find(([a, s]) => fs.existsSync(a) && fs.existsSync(s));
  if (!hit) throw new InstallError('APP_NOT_FOUND', 'TexAu Desktop was not found in the standard install folders.', 'Install TexAu Desktop 1.1 or later. For a custom folder or an AppImage, pass --app <TexAu binary> --shim <resources/mcp/texau-mcp.cjs>. The Claude Code command on the AI assistants page shows both paths.');
  return { app: hit[0], shim: hit[1] };
}

const has = (cmd) => spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { stdio: 'ignore' }).status === 0;

export function detectClients(home) {
  const c = [];
  if (has('claude') || fs.existsSync(path.join(home, '.claude'))) c.push('claude-code');
  if (fs.existsSync(path.join(home, '.cursor'))) c.push('cursor');
  if (fs.existsSync(path.join(home, '.codex'))) c.push('codex');
  return c;
}

const SKILL_DIRS = { 'claude-code': ['.claude', 'skills'], cursor: ['.cursor', 'skills'], codex: ['.agents', 'skills'], agents: ['.agents', 'skills'] };

function backup(file, log) {
  if (!fs.existsSync(file)) return null;
  const b = `${file}.texau-backup-${Date.now()}`;
  fs.copyFileSync(file, b);
  log.push(`backed up ${file} to ${b}`);
  return b;
}

export function installSkills(client, home, dry, log) {
  const dest = path.join(home, ...SKILL_DIRS[client]);
  const names = fs.readdirSync(path.join(here, 'skills')).filter((d) => fs.existsSync(path.join(here, 'skills', d, 'SKILL.md')));
  if (!dry) {
    fs.mkdirSync(dest, { recursive: true });
    for (const n of names) {
      fs.rmSync(path.join(dest, n), { recursive: true, force: true });
      fs.cpSync(path.join(here, 'skills', n), path.join(dest, n), { recursive: true });
    }
  }
  log.push(`${dry ? 'would copy' : 'copied'} ${names.length} skills to ${dest}`);
  return { dest, skills: names };
}

export function connectCursor(home, app, shim, dry, log) {
  const file = path.join(home, '.cursor', 'mcp.json');
  let cfg = {};
  if (fs.existsSync(file)) {
    try { cfg = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { throw new InstallError('CURSOR_CONFIG_INVALID', `${file} is not valid JSON.`, 'Fix or move the file, then run the installer again.'); }
  }
  cfg.mcpServers = { ...(cfg.mcpServers ?? {}), texau: { command: app, args: [shim], env: { ELECTRON_RUN_AS_NODE: '1' } } };
  if (!dry) { fs.mkdirSync(path.dirname(file), { recursive: true }); backup(file, log); fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n'); }
  log.push(`${dry ? 'would add' : 'added'} texau to ${file}`);
  return file;
}

const tomlString = (s) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
export function codexBlock(app, shim) {
  return `[mcp_servers.texau]\ncommand = ${tomlString(app)}\nargs = [${tomlString(shim)}]\nenv = { ELECTRON_RUN_AS_NODE = "1" }\n`;
}
export function connectCodex(home, app, shim, dry, log) {
  const file = path.join(home, '.codex', 'config.toml');
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  // Replace an existing [mcp_servers.texau] table (up to the next table header), else append.
  const re = /^\[mcp_servers\.texau\][\s\S]*?(?=^\[|(?![\s\S]))/m;
  const next = re.test(old) ? old.replace(re, codexBlock(app, shim) + '\n') : `${old}${old && !old.endsWith('\n') ? '\n' : ''}${old ? '\n' : ''}${codexBlock(app, shim)}`;
  if (!dry) { fs.mkdirSync(path.dirname(file), { recursive: true }); backup(file, log); fs.writeFileSync(file, next); }
  log.push(`${dry ? 'would add' : 'added'} texau to ${file}`);
  return file;
}

export function connectClaudeCode(app, shim, dry, log) {
  const args = ['mcp', 'add', '--scope', 'user', 'texau', '-e', 'ELECTRON_RUN_AS_NODE=1', '--', app, shim];
  if (dry) { log.push(`would run: claude ${args.join(' ')}`); return; }
  if (!has('claude')) throw new InstallError('CLAUDE_CLI_MISSING', 'The claude command is not on PATH.', `Run this yourself after installing Claude Code: claude ${args.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' ')}`);
  spawnSync('claude', ['mcp', 'remove', '--scope', 'user', 'texau'], { stdio: 'ignore' });
  const r = spawnSync('claude', args, { encoding: 'utf8' });
  if (r.status !== 0) throw new InstallError('CLAUDE_MCP_ADD_FAILED', `claude mcp add failed: ${(r.stderr || r.stdout).trim().slice(0, 300)}`, 'Run the command yourself and read the error.');
  log.push('added texau to Claude Code (user scope)');
}

/** Start the shim the way a client would, list its tools, and call get_status. */
export function testConnection(app, shim, timeoutMs = 20000) {
  return new Promise((resolve) => {
    const child = spawn(app, [shim], { env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' }, stdio: ['pipe', 'pipe', 'pipe'] });
    let buf = '', done = false;
    const answers = {};
    const finish = (r) => { if (done) return; done = true; clearTimeout(t); child.kill(); resolve(r); };
    const t = setTimeout(() => finish({ ok: false, error: 'TIMEOUT', message: 'The MCP server did not answer in time.' }), timeoutMs);
    const send = (id, method, params) => child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    child.on('error', (e) => finish({ ok: false, error: 'SPAWN_FAILED', message: e.message }));
    child.stdout.on('data', (d) => {
      buf += d;
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 1);
        let msg; try { msg = JSON.parse(line); } catch { continue; }
        answers[msg.id] = msg;
        if (msg.id === 1) { child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n'); send(2, 'tools/list', {}); }
        if (msg.id === 2) send(3, 'tools/call', { name: 'get_status', arguments: {} });
        if (msg.id === 3) {
          const tools = answers[2]?.result?.tools?.length ?? 0;
          const res = msg.result ?? {};
          const text = res.content?.[0]?.text ?? '';
          finish(res.isError ? { ok: false, tools, error: 'GET_STATUS_FAILED', message: text } : { ok: tools > 0, tools, status: (() => { try { return JSON.parse(text); } catch { return text; } })() });
        }
      }
    });
    send(1, 'initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'texau-skills-installer', version: '1' } });
  });
}

const FIX = {
  'not running': 'Open TexAu Desktop, then run the installer again with --test-only.',
  'access is off': 'In TexAu, open AI assistants in the sidebar, and switch on "Allow AI assistants".',
  'does not include': 'Your TexAu plan does not include AI assistant access. Contact TexAu support.',
};

export async function main(argv, home = os.homedir()) {
  const o = opts(argv);
  const dry = !!o['dry-run'];
  const log = [];
  const { app, shim } = findApp(o, process.platform, home);
  const clients = o.clients ? String(o.clients).split(',') : detectClients(home);
  for (const c of clients) if (!SKILL_DIRS[c]) throw new InstallError('UNKNOWN_CLIENT', `Unknown client "${c}".`, 'Use claude-code, cursor, codex, or agents.');
  if (!clients.length && !o['test-only']) throw new InstallError('NO_CLIENTS', 'No AI assistant was found (Claude Code, Cursor, or Codex).', 'Install one, or pass --clients agents to copy the skills to ~/.agents/skills.');
  const result = { app, shim, clients: [], dryRun: dry };
  if (!o['test-only']) {
    const seen = new Set();
    for (const c of clients) {
      const entry = { client: c };
      const dir = SKILL_DIRS[c].join('/');
      if (!seen.has(dir)) { entry.skills = installSkills(c, home, dry, log).dest; seen.add(dir); }
      if (c === 'claude-code') connectClaudeCode(app, shim, dry, log);
      if (c === 'cursor') entry.config = connectCursor(home, app, shim, dry, log);
      if (c === 'codex') entry.config = connectCodex(home, app, shim, dry, log);
      result.clients.push(entry);
    }
  }
  if (!dry && !o['no-test']) {
    const test = await testConnection(app, shim);
    if (!test.ok && test.message) {
      const k = Object.keys(FIX).find((x) => test.message.includes(x));
      if (k) test.fix = FIX[k];
    }
    result.test = test;
  }
  result.log = log;
  result.next = ['Restart each AI assistant so it loads the texau server and the skills.', 'For Claude Desktop, open AI assistants in the TexAu sidebar. On the Claude Desktop row, click Connect.'];
  return result;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).then((r) => {
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.test && !r.test.ok ? 1 : 0);
  }).catch((e) => {
    if (e instanceof InstallError) console.error(JSON.stringify({ error: e.code, message: e.message, fix: e.fix }, null, 2));
    else console.error(JSON.stringify({ error: 'INTERNAL', message: e.message, trace: e.stack?.split('\n').slice(0, 4).join(' | ') }));
    process.exit(2);
  });
}
