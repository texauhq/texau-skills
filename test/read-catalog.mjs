// Read the catalog from a running TexAu Desktop: node test/read-catalog.mjs <path to texau-mcp.cjs> test/catalog-desktop.json
// Only read tools are called. Account details are not saved.
import fs from 'node:fs';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
const [shim, out] = process.argv.slice(2);
const c = new Client({ name: 'catalog-reader', version: '0' });
await c.connect(new StdioClientTransport({ command: process.execPath, args: [shim] }));
const call = async (name, args = {}) => { const r = await c.callTool({ name, arguments: args }); if (r.isError) throw new Error(`${name}: ${r.content[0].text}`); return JSON.parse(r.content[0].text); };
const status = await call('get_status');
const accounts = await call('list_accounts');
const ops = await call('list_automations');
console.log('license', status.license, 'accounts', accounts.length, 'automations', ops.length);
const detail = [];
let i = 0, errors = 0;
async function worker() { while (i < ops.length) { const op = ops[i++]; try { const d = await call('describe_automation', { automationId: op.id }); detail.push({ ...op, ...d }); } catch (e) { errors++; detail.push({ ...op, error: String(e.message).slice(0, 200) }); } } }
await Promise.all([1, 2, 3, 4].map(worker));
fs.writeFileSync(out, JSON.stringify({ readAt: new Date().toISOString(), appVersion: status.appVersion, automations: detail.sort((a, b) => a.platformId.localeCompare(b.platformId) || a.name.localeCompare(b.name)) }, null, 2));
console.log('described', detail.length, 'errors', errors);
await c.close();
