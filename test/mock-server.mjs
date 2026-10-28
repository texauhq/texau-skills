// Mock texau MCP server for skill evals.
// Same tool names, descriptions and argument schemas as frontend/packages/mcp in texau-desktop.
// Every call is appended to $MOCK_LOG as one JSON line, so evals can score what the agent did.
// $MOCK_SCENARIO points at a scenario JSON that sets budgets, result sizes and faults.
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { AUTOMATIONS, ACCOUNTS, rowsFor } from './fixtures.mjs';

const scenario = process.env.MOCK_SCENARIO ? JSON.parse(fs.readFileSync(process.env.MOCK_SCENARIO, 'utf8')) : {};
const LOG = process.env.MOCK_LOG ?? '/dev/null';
const log = (entry) => fs.appendFileSync(LOG, JSON.stringify({ at: Date.now(), ...entry }) + '\n');

// ---- schemas: copied from frontend/packages/mcp/src/schemas.ts ----
const id = z.string().min(1);
const limit = (max) => z.number().int().min(1).max(max).optional();
const offset = z.number().int().min(0).optional();
const pace = z.object({ mode: z.enum(['auto', 'manual', 'off']).optional(), manualSeconds: z.number().min(0).max(3600).optional() }).optional();
const runRef = z.object({ runId: id });
const schemas = {
  get_status: z.object({}),
  list_accounts: z.object({}),
  list_proxies: z.object({}),
  list_automations: z.object({ platformId: id.optional() }),
  describe_automation: z.object({ automationId: id, accountId: id.optional() }),
  list_runs: z.object({ limit: limit(100), offset }),
  get_run: runRef,
  get_run_results: z.object({ runId: id, limit: z.number().int().min(1).optional(), offset }),
  run_automation: z.object({ automationId: id, accountId: id.optional(), inputs: z.record(z.string(), z.unknown()), runName: z.string().max(200).optional(), confirm: z.boolean().optional(), previewId: z.string().optional() }),
  run_batch: z.object({ automationId: id, accountId: id.optional(), rows: z.array(z.record(z.string(), z.unknown())).max(500).optional(), csvPath: id.optional(), columnMap: z.record(z.string(), z.string()).optional(), pace, runName: z.string().max(200).optional(), confirm: z.boolean().optional(), previewId: z.string().optional() }),
  pause_run: runRef,
  resume_run: runRef,
  cancel_run: runRef,
};
// ---- descriptions: copied from frontend/packages/mcp/src/index.ts ----
const descriptions = {
  get_status: 'Show TexAu Desktop status: license, usage minutes, and how many runs are active.',
  list_accounts: 'List the connected accounts (platform, name, proxy) that automations can run with.',
  list_proxies: 'List the proxies saved in TexAu Desktop.',
  list_automations: 'List the available automations, optionally filtered by platformId.',
  describe_automation: 'Describe one automation: its inputs, outputs, and which accounts can run it.',
  list_runs: 'List recent automation runs with their status, newest first.',
  get_run: 'Get the status and progress of one run.',
  get_run_results: 'Get result rows from a run, one page at a time with limit and offset.',
  run_automation: 'Preview, then start, one TexAu automation run; call without confirm to get a preview and previewId, then call again with confirm: true and the same args.',
  run_batch: 'Preview, then start, a TexAu automation on many rows from inline JSON or a .csv path; call without confirm to get a preview and previewId, then call again with confirm: true and the same args.',
  pause_run: 'Pause a running automation run.',
  resume_run: 'Resume a paused automation run.',
  cancel_run: 'Cancel a run that is queued, running, or paused.',
};

class ToolError extends Error {}
const bad = (m) => { throw new ToolError(m); };
const NO_RESPONSE = 'TexAu Desktop did not respond. Make sure the app is open and try again.';

const previews = new Map();
const runs = []; // newest last
const budgetFor = (op) => scenario.budget?.[op.key] ?? op.budget ?? 500;
const stable = (v) => Array.isArray(v) ? `[${v.map(stable).join(',')}]` : v && typeof v === 'object'
  ? `{${Object.keys(v).filter((k) => v[k] !== undefined).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}` : JSON.stringify(v) ?? 'null';
const keyOf = ({ confirm, previewId, ...rest }) => stable(rest);
const findOp = (automationId) => AUTOMATIONS.find((a) => a.id === automationId) ?? bad(`Automation ${automationId} was not found.`);

function parseCsv(path) {
  if (!path.toLowerCase().endsWith('.csv')) bad('csvPath must be a .csv file.');
  let text;
  try { text = fs.readFileSync(path, 'utf8'); } catch { bad('Could not read the CSV file.'); }
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const split = (l) => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).slice(0, -1).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
  const headers = split(lines[0] ?? '');
  return { headers, rows: lines.slice(1).map((l) => Object.fromEntries(split(l).map((c, i) => [headers[i], c]))) };
}

function resolveAccount(op, accountId) {
  if (!op.requiresAccount) return null;
  if (!accountId) bad('This automation needs an account. Pass accountId (see list_accounts).');
  const acc = ACCOUNTS.find((a) => a.id === accountId && a.platform === op.cookiePlatform) ?? bad('No connected account with that id.');
  if ((op.needsSalesNav && !acc.salesNavigator) || (op.needsRecruiter && !acc.recruiter)) bad('That account does not have the access this automation needs.');
  return acc;
}

function startRun(op, args, rowCount) {
  const total = op.kind === 'read' ? (scenario.resultTotal?.[op.key] ?? (op.defaultResults ?? 25) * Math.max(1, rowCount)) : rowCount;
  const run = { runId: randomUUID(), automation: op.name, automationId: op.id, key: op.key, kind: op.kind, status: 'completed', totalRows: rowCount, successRows: rowCount, failedRows: 0, startedAt: new Date().toISOString(), source: 'mcp', resultTotal: total, runName: args.runName };
  runs.push(run);
  return run;
}

function runTool(tool, args) {
  const single = tool === 'run_automation';
  const op = findOp(args.automationId);
  const account = resolveAccount(op, args.accountId);
  let rows;
  if (single) rows = [args.inputs];
  else {
    if (!!args.rows === !!args.csvPath) bad('Pass either rows or csvPath.');
    rows = args.csvPath ? parseCsv(args.csvPath).rows : args.rows;
  }
  const mapped = rows.map((r) => {
    const out = {};
    for (const inp of op.inputs) {
      const col = args.columnMap?.[inp.name] ?? inp.name;
      out[inp.name] = r[col] ?? r[inp.name];
    }
    return out;
  });
  const missingRequired = op.inputs.filter((i) => i.required && mapped.every((r) => r[i.name] == null || r[i.name] === '')).map((i) => i.name);
  const invalidRows = mapped.map((r, index) => ({ index, errors: Object.fromEntries(op.inputs.filter((i) => i.required && (r[i.name] == null || r[i.name] === '')).map((i) => [i.name, 'required'])) }))
    .filter((r) => Object.keys(r.errors).length && missingRequired.length === 0);
  const budget = { remainingToday: budgetFor(op), dailyLimit: op.budget ?? 500 };

  if (!args.confirm) {
    const previewId = randomUUID();
    previews.set(previewId, keyOf(args));
    return {
      previewId,
      automation: { id: op.id, name: op.name },
      account: account ? { id: account.id, name: account.name } : null,
      rowCount: rows.length,
      missingRequired,
      unmatchedColumns: [],
      invalidRows: invalidRows.slice(0, 20),
      invalidRowCount: invalidRows.length,
      budget,
      estimate: { rowsToday: Math.min(rows.length, budget.remainingToday), rowsLater: Math.max(0, rows.length - budget.remainingToday) },
    };
  }
  if (missingRequired.length) bad(`No column maps to the required inputs: ${missingRequired.join(', ')}. Pass columnMap.`);
  if (invalidRows.length) bad(`${invalidRows.length} rows are invalid. See invalidRows in the preview.`);
  const key = previews.get(args.previewId);
  if (!key || key !== keyOf(args)) bad('No matching preview: it expired, was already used, or the arguments changed. Call again without confirm to preview.');
  previews.delete(args.previewId);
  const run = startRun(op, args, rows.length);
  run.inputs = mapped;
  if (scenario.faults?.confirmTimeout && op.key === scenario.faults.confirmTimeout && !scenario._timedOut) {
    scenario._timedOut = true;
    throw new ToolError(NO_RESPONSE); // the run exists, but the agent only sees a timeout
  }
  return { runId: run.runId, status: run.status };
}

const view = ({ resultTotal, key, kind, automationId, ...r }) => r;
const handlers = {
  get_status: () => ({ appVersion: '1.9.0', license: 'valid', minutesLeft: scenario.minutesLeft ?? 900, concurrency: { active: 0, max: 3 } }),
  list_accounts: () => ACCOUNTS.map(({ cookiePlatformOnly, ...a }) => a),
  list_proxies: () => [],
  list_automations: ({ platformId }) => AUTOMATIONS.filter((a) => !platformId || a.platformId === platformId)
    .filter((a) => !(scenario.hidePlatforms ?? []).includes(a.platformId))
    .map((a) => ({ id: a.id, name: a.name, label: a.name, platformId: a.platformId, description: a.description, skipBulkInput: false })),
  describe_automation: ({ automationId, accountId }) => {
    const op = findOp(automationId);
    if (accountId && !ACCOUNTS.some((a) => a.id === accountId)) bad('No connected account with that id.');
    return { inputs: op.inputs, outputs: op.outputs, requiresAccount: op.requiresAccount, cookiePlatform: op.cookiePlatform ?? null, defaultLimits: op.defaultLimits ?? {}, ...(accountId ? { budget: { remainingToday: budgetFor(op), dailyLimit: op.budget ?? 500 } } : {}) };
  },
  list_runs: ({ limit = 20, offset = 0 }) => [...runs].reverse().slice(offset, offset + limit).map(view),
  get_run: ({ runId }) => view(runs.find((r) => r.runId === runId) ?? bad('No run with that id.')),
  get_run_results: ({ runId, limit = 50, offset = 0 }) => {
    const run = runs.find((r) => r.runId === runId) ?? bad('No run with that id.');
    const all = rowsFor(run.key, run.resultTotal, run.inputs);
    return { total: all.length, rows: all.slice(offset, offset + Math.min(limit, 200)) };
  },
  run_automation: (a) => runTool('run_automation', a),
  run_batch: (a) => runTool('run_batch', a),
  pause_run: ({ runId }) => view(runs.find((r) => r.runId === runId) ?? bad('No run with that id.')),
  resume_run: ({ runId }) => view(runs.find((r) => r.runId === runId) ?? bad('No run with that id.')),
  cancel_run: ({ runId }) => view(runs.find((r) => r.runId === runId) ?? bad('No run with that id.')),
};

const server = new McpServer({ name: 'texau', version: '0.1.0' });
for (const name of Object.keys(schemas)) {
  server.registerTool(name, { description: descriptions[name], inputSchema: schemas[name].shape }, async (args) => {
    try {
      const data = await handlers[name](args ?? {});
      log({ tool: name, args, ok: true, summary: summarize(name, data) });
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    } catch (e) {
      const message = e instanceof ToolError ? e.message : 'The tool failed unexpectedly.';
      log({ tool: name, args, ok: false, error: message });
      return { content: [{ type: 'text', text: message }], isError: true };
    }
  });
}

function summarize(name, data) {
  if (name.startsWith('run_')) return data.previewId ? { preview: true, rowCount: data.rowCount } : { started: data.runId };
  if (name === 'get_run_results') return { total: data.total, returned: data.rows.length };
  return undefined;
}

await server.connect(new StdioServerTransport());
