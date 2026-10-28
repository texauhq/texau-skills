#!/usr/bin/env node
// Campaign ledger for TexAu outreach. Plain JSON in ~/.texau-skills/ledger.json (override with TEXAU_LEDGER).
// Keeps what the texau MCP server does not: who got which step of which campaign, who replied,
// and how many invites and messages each account sent this week.
//
//   node scripts/texau-ledger.mjs campaign-add  --name <c> --account <id> --steps visit,invite,message1,message2 --gaps 0,1,4,6
//   node scripts/texau-ledger.mjs record        --campaign <c> --step invite --run <runId> --csv sent.csv   (column profileUrl)
//   node scripts/texau-ledger.mjs reply         --campaign <c> --csv replies.csv
//   node scripts/texau-ledger.mjs connected     --campaign <c> --csv connections.csv
//   node scripts/texau-ledger.mjs due           --campaign <c> [--date YYYY-MM-DD] [--out due.csv]
//   node scripts/texau-ledger.mjs exclude       --account <id> --csv candidates.csv --out clean.csv
//   node scripts/texau-ledger.mjs usage         --account <id> [--date YYYY-MM-DD]
//   node scripts/texau-ledger.mjs status        [--campaign <c>]
// Every command prints one JSON object on stdout. Errors print {"error":code,"message",...} on stderr and exit 2.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const LIMITS = { invite: { day: 20, week: 100 }, message: { day: 50, week: 250 }, like: { day: 40, week: 200 }, follow: { day: 50, week: 300 }, visit: { day: 80, week: 400 } };
const WRITE_KIND = (step) => (step === 'invite' ? 'invite' : step.startsWith('message') || step === 'inmail' ? 'message' : step === 'like' ? 'like' : step === 'follow' ? 'follow' : step === 'visit' ? 'visit' : null);

export class LedgerError extends Error {
  constructor(code, message, fix) { super(message); this.code = code; this.fix = fix; }
}

const ledgerPath = () => process.env.TEXAU_LEDGER ?? path.join(os.homedir(), '.texau-skills', 'ledger.json');
export function load(file = ledgerPath()) {
  if (!fs.existsSync(file)) return { version: 1, campaigns: {}, people: {}, sends: [] };
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { throw new LedgerError('LEDGER_CORRUPT', `Cannot parse ${file}.`, `Restore ${file}.bak or move the file away to start a new ledger.`); }
}
export function save(db, file = ledgerPath()) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file)) fs.copyFileSync(file, `${file}.bak`);
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, file);
}

// Normalize LinkedIn URLs so the same person matches across exports.
export const personKey = (url) => String(url ?? '').trim().toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/+$/, '');

export function readCsv(file) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { throw new LedgerError('CSV_UNREADABLE', `Cannot read ${file}.`, 'Pass the path of an existing .csv file.'); }
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [headers = [], ...body] = rows.filter((r) => r.some((c) => c !== ''));
  return { headers, rows: body.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? '']))) };
}
export function writeCsv(file, headers, rows) {
  const esc = (v) => { const s = v == null ? '' : String(v); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  fs.writeFileSync(file, [headers.join(','), ...rows.map((r) => headers.map((h) => esc(r[h])).join(','))].join('\n') + '\n');
}
const URL_COLUMNS = ['profileurl', 'profile_url', 'liprofileurl', 'lipublicprofileurl', 'participantliprofileurl', 'twprofileurl', 'snprofileurl', 'linkedinurl', 'linkedin_url', 'url'];
const urlColumn = (headers) => URL_COLUMNS.map((c) => headers.find((h) => h.toLowerCase() === c)).find(Boolean)
  ?? (() => { throw new LedgerError('CSV_NO_URL_COLUMN', `No profile URL column in: ${headers.join(', ')}.`, 'Name the column profileUrl or liProfileUrl.'); })();

const day = (d) => (d ? new Date(`${d}T12:00:00Z`) : new Date());
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
const weekStart = (d) => { const x = new Date(d); const dow = (x.getUTCDay() + 6) % 7; return iso(addDays(x, -dow)); }; // Monday

function campaignOf(db, name) {
  const c = db.campaigns[name];
  if (!c) throw new LedgerError('CAMPAIGN_NOT_FOUND', `No campaign named "${name}".`, `Run status to list campaigns, or campaign-add --name "${name}".`);
  return c;
}

export function usage(db, account, onDate) {
  const d = day(onDate), today = iso(d), wk = weekStart(d);
  const out = {};
  for (const kind of Object.keys(LIMITS)) {
    const s = db.sends.filter((x) => x.account === account && x.kind === kind);
    const usedToday = s.filter((x) => x.date === today).reduce((a, x) => a + x.count, 0);
    const usedWeek = s.filter((x) => x.date >= wk && x.date <= today).reduce((a, x) => a + x.count, 0);
    out[kind] = { usedToday, usedWeek, leftToday: Math.max(0, Math.min(LIMITS[kind].day - usedToday, LIMITS[kind].week - usedWeek)), limits: LIMITS[kind] };
  }
  return { account, date: today, weekStart: wk, ...out };
}

export function due(db, name, onDate) {
  const c = campaignOf(db, name), d = iso(day(onDate));
  const rows = [];
  for (const [key, p] of Object.entries(db.people)) {
    const st = p.campaigns?.[name];
    if (!st || st.replied || st.stopped) continue;
    const doneSteps = c.steps.filter((s) => st.steps[s]);
    const next = c.steps[doneSteps.length];
    if (!next) continue;
    const prev = doneSteps.at(-1);
    const gap = c.gaps[c.steps.indexOf(next)] ?? 0;
    const readyOn = prev ? iso(addDays(day(st.steps[prev]), gap)) : d;
    // A message after an invite needs the connection first.
    const needsConnection = next.startsWith('message') && c.steps.includes('invite') && !st.connected;
    if (readyOn <= d && !needsConnection) rows.push({ profileUrl: p.url, step: next, readyOn, ...p.fields });
  }
  return { campaign: name, date: d, count: rows.length, byStep: rows.reduce((a, r) => ({ ...a, [r.step]: (a[r.step] ?? 0) + 1 }), {}), rows };
}

export function contactedKeys(db, account) {
  return new Set(Object.entries(db.people).filter(([, p]) => Object.entries(p.campaigns ?? {}).some(([cn, st]) => db.campaigns[cn]?.account === account && Object.keys(st.steps).length)).map(([k]) => k));
}

function opts(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) o[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  return o;
}
const need = (o, ...keys) => { for (const k of keys) if (!o[k]) throw new LedgerError('MISSING_ARG', `Missing --${k}.`, `Pass --${k} <value>. Run without arguments for usage.`); };

export function main(argv) {
  const [cmd, ...rest] = argv;
  const o = opts(rest);
  const db = load();
  switch (cmd) {
    case 'campaign-add': {
      need(o, 'name', 'account', 'steps');
      const steps = o.steps.split(',').map((s) => s.trim());
      const gaps = (o.gaps ?? steps.map(() => 0).join(',')).split(',').map(Number);
      if (gaps.length !== steps.length || gaps.some(Number.isNaN)) throw new LedgerError('BAD_GAPS', '--gaps needs one number of days per step.', `Example: --steps ${steps.join(',')} --gaps ${steps.map((_, i) => (i ? 3 : 0)).join(',')}`);
      if (db.campaigns[o.name]) throw new LedgerError('CAMPAIGN_EXISTS', `Campaign "${o.name}" exists.`, 'Pick another name, or keep using the existing one.');
      db.campaigns[o.name] = { account: o.account, steps, gaps, createdAt: iso(new Date()) };
      save(db);
      return { ok: true, campaign: o.name, ...db.campaigns[o.name] };
    }
    case 'record': {
      need(o, 'campaign', 'step', 'csv');
      const c = campaignOf(db, o.campaign);
      if (!c.steps.includes(o.step)) throw new LedgerError('UNKNOWN_STEP', `Step "${o.step}" is not in ${o.campaign}: ${c.steps.join(', ')}.`, 'Use one of the campaign steps.');
      const { headers, rows } = readCsv(o.csv);
      const col = urlColumn(headers), date = iso(day(o.date));
      let added = 0;
      for (const r of rows) {
        const key = personKey(r[col]);
        if (!key) continue;
        const p = (db.people[key] ??= { url: r[col], fields: {}, campaigns: {} });
        for (const h of headers) if (h !== col && r[h] && !/note|message/i.test(h)) p.fields[h] = r[h];
        const st = (p.campaigns[o.campaign] ??= { steps: {} });
        if (!st.steps[o.step]) { st.steps[o.step] = date; added++; }
      }
      const kind = WRITE_KIND(o.step);
      if (kind && added) db.sends.push({ account: c.account, kind, date, count: added, campaign: o.campaign, run: o.run ?? null });
      save(db);
      return { ok: true, recorded: added, skippedAlreadyRecorded: rows.length - added, usage: usage(db, c.account, o.date) };
    }
    case 'reply':
    case 'connected': {
      need(o, 'campaign', 'csv');
      campaignOf(db, o.campaign);
      const { headers, rows } = readCsv(o.csv);
      const col = urlColumn(headers);
      let marked = 0;
      for (const r of rows) {
        const st = db.people[personKey(r[col])]?.campaigns?.[o.campaign];
        if (!st) continue;
        const field = cmd === 'reply' ? 'replied' : 'connected';
        if (!st[field]) { st[field] = iso(day(o.date)); marked++; }
      }
      save(db);
      return { ok: true, marked, notInCampaign: rows.length - marked };
    }
    case 'due': {
      need(o, 'campaign');
      const r = due(db, o.campaign, o.date);
      if (o.out) { writeCsv(o.out, [...new Set(r.rows.flatMap(Object.keys))], r.rows); return { ...r, rows: undefined, out: o.out }; }
      return r;
    }
    case 'exclude': {
      need(o, 'account', 'csv', 'out');
      const { headers, rows } = readCsv(o.csv);
      const col = urlColumn(headers), seen = contactedKeys(db, o.account), batch = new Set();
      const kept = rows.filter((r) => { const k = personKey(r[col]); if (!k || seen.has(k) || batch.has(k)) return false; batch.add(k); return true; });
      writeCsv(o.out, headers, kept);
      return { ok: true, input: rows.length, kept: kept.length, removedContacted: rows.filter((r) => seen.has(personKey(r[col]))).length, removedDuplicates: rows.length - kept.length - rows.filter((r) => seen.has(personKey(r[col]))).length, out: o.out };
    }
    case 'usage': need(o, 'account'); return usage(db, o.account, o.date);
    case 'status': {
      const names = o.campaign ? [o.campaign] : Object.keys(db.campaigns);
      return { campaigns: names.map((n) => {
        const c = campaignOf(db, n);
        const people = Object.values(db.people).map((p) => p.campaigns?.[n]).filter(Boolean);
        const invited = people.filter((s) => s.steps.invite).length, connected = people.filter((s) => s.connected).length, replied = people.filter((s) => s.replied).length;
        return { name: n, account: c.account, steps: c.steps, people: people.length, perStep: Object.fromEntries(c.steps.map((s) => [s, people.filter((p) => p.steps[s]).length])), connected, replied,
          acceptanceRate: invited ? Math.round((connected / invited) * 100) : null, replyRate: people.length ? Math.round((replied / people.length) * 100) : null, dueToday: due(db, n).count };
      }) };
    }
    default:
      throw new LedgerError('UNKNOWN_COMMAND', `Unknown command "${cmd ?? ''}".`, 'Commands: campaign-add, record, reply, connected, due, exclude, usage, status. See the header of scripts/texau-ledger.mjs.');
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { console.log(JSON.stringify(main(process.argv.slice(2)), null, 2)); }
  catch (e) {
    if (!(e instanceof LedgerError)) { console.error(JSON.stringify({ error: 'INTERNAL', message: e.message, trace: e.stack?.split('\n').slice(0, 4).join(' | ') })); process.exit(1); }
    console.error(JSON.stringify({ error: e.code, message: e.message, fix: e.fix }));
    process.exit(2);
  }
}
