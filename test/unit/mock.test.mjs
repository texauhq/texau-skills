import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function connect(scenario = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'texau-mock-'));
  fs.writeFileSync(path.join(dir, 's.json'), JSON.stringify(scenario));
  const c = new Client({ name: 't', version: '0' });
  await c.connect(new StdioClientTransport({ command: process.execPath, args: [fileURLToPath(new URL('../mock-server.mjs', import.meta.url))], env: { ...process.env, MOCK_SCENARIO: path.join(dir, 's.json'), MOCK_LOG: path.join(dir, 'log.jsonl') } }));
  const call = async (name, args = {}) => { const r = await c.callTool({ name, arguments: args }); return { err: !!r.isError, text: r.content[0].text, json: r.isError ? null : JSON.parse(r.content[0].text) }; };
  return { c, call, dir };
}

test('exposes the same 13 tools as the real shim', async () => {
  const { c } = await connect();
  const { tools } = await c.listTools();
  assert.equal(tools.length, 13);
  await c.close();
});

test('preview then confirm starts a run; a changed confirm is refused', async () => {
  const { c, call } = await connect();
  const ops = (await call('list_automations')).json;
  const likers = ops.find((o) => o.name === 'LinkedIn Post Likers Export');
  const args = { automationId: likers.id, accountId: 'acc_li_01', inputs: { postUrl: 'https://x' } };
  const p = (await call('run_automation', args)).json;
  assert.ok(p.previewId);
  assert.ok((await call('run_automation', { ...args, inputs: { postUrl: 'https://y' }, confirm: true, previewId: p.previewId })).err);
  const started = (await call('run_automation', { ...args, confirm: true, previewId: p.previewId })).json;
  const res = (await call('get_run_results', { runId: started.runId, limit: 500 })).json;
  assert.equal(res.total, 87);
  assert.equal(res.rows.length, 87);
  await c.close();
});

test('confirm timeout fault creates the run but reports no response', async () => {
  const { c, call } = await connect({ faults: { confirmTimeout: 'postLikers' } });
  const likers = (await call('list_automations')).json.find((o) => o.name === 'LinkedIn Post Likers Export');
  const args = { automationId: likers.id, accountId: 'acc_li_01', inputs: { postUrl: 'https://x' } };
  const p = (await call('run_automation', args)).json;
  const r = await call('run_automation', { ...args, confirm: true, previewId: p.previewId });
  assert.ok(r.err);
  assert.match(r.text, /did not respond/);
  assert.equal((await call('list_runs')).json.length, 1);
  await c.close();
});

test('csvPath batches count rows and Sales Navigator needs access', async () => {
  const { c, call, dir } = await connect();
  const ops = (await call('list_automations')).json;
  const csv = path.join(dir, 'g.csv');
  fs.writeFileSync(csv, 'query,location\ndentist,Lincoln Park Chicago\n"dental clinic",Loop Chicago\n');
  const maps = ops.find((o) => o.name === 'Google Maps Extractor');
  assert.equal((await call('run_batch', { automationId: maps.id, csvPath: csv })).json.rowCount, 2);
  const sn = ops.find((o) => o.name === 'Sales Navigator Lead Search Export');
  assert.match((await call('run_automation', { automationId: sn.id, accountId: 'acc_li_01', inputs: { searchUrl: 'u' } })).text, /access/);
  await c.close();
});
