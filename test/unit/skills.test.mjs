import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../skills/', import.meta.url));
const catalog = new Set(JSON.parse(fs.readFileSync(fileURLToPath(new URL('../catalog-desktop.json', import.meta.url)), 'utf8')).automations.map((a) => a.name));
const skills = fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'SKILL.md')));
const read = (d) => fs.readFileSync(path.join(root, d, 'SKILL.md'), 'utf8');

test('frontmatter: name matches folder, description starts with "Use when" and fits 1024 chars', () => {
  for (const d of skills) {
    const fm = read(d).match(/^---\nname: (.+)\ndescription: (.+)\n---\n/);
    assert.ok(fm, `${d}: frontmatter`);
    assert.equal(fm[1], d);
    assert.ok(fm[2].startsWith('Use when'), `${d}: description`);
    assert.ok(fm[1].length + fm[2].length < 1024, `${d}: length`);
  }
});

test('every skill a skill requires exists', () => {
  for (const d of skills) for (const m of read(d).matchAll(/\b([a-z]+(?:-[a-z]+)+)\b/g)) {
    if (/-(specialist|outreach|operator|expert|leads|research|acquisition|prospecting)$/.test(m[1]) && !m[1].startsWith('the-')) assert.ok(skills.includes(m[1]), `${d} mentions missing skill ${m[1]}`);
  }
});

test('referenced files exist', () => {
  for (const d of skills) for (const m of read(d).matchAll(/((?:references|scripts)\/[\w-]+\.(?:md|mjs))/g)) {
    const base = read(d).includes(`texau-operator/${m[1]}`) || d === 'texau-operator' ? 'texau-operator' : d;
    assert.ok(fs.existsSync(path.join(root, base, m[1])) || fs.existsSync(path.join(root, 'texau-operator', m[1])), `${d}: ${m[1]}`);
  }
});

const PREFIX = /^(LinkedIn|Linkedin|Sales Navigator|Google|Website|Twitter|YouTube|Slack|Company Name|Personal Name|Social Headline)\b/;
test('automation names in the chain library exist in the desktop catalog', () => {
  const text = fs.readFileSync(path.join(root, 'texau-operator/references/chain-library.md'), 'utf8');
  const missing = [];
  for (const line of text.split('\n').filter((l) => l.startsWith('| ') && !l.startsWith('| Chain'))) {
    const steps = line.split('|')[2] ?? '';
    for (const part of steps.split(/ > | \+ | \/ | or /)) {
      const n = part.replace(/\(.*?\)/g, '').replace(/ (on|with|for) .*$/, '').trim();
      if (PREFIX.test(n) && !catalog.has(n)) missing.push(n);
    }
  }
  assert.deepEqual([...new Set(missing)], []);
});

test('quoted automation names exist in the desktop catalog', () => {
  const missing = [];
  const files = [...skills.map((d) => path.join(root, d, 'SKILL.md')), path.join(root, 'texau-operator/references/chain-library.md')];
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(/"([A-Z][^"]{3,80})"/g)) {
      const n = m[1];
      if ((PREFIX.test(n) || /^(Reddit|SubReddit|Crunchbase|Product Hunt|GitHub|Youtube|Hunter|Company Website|Email Verifier|Verify Email|Check If|Snov)/.test(n)) && !/[{}]/.test(n) && !catalog.has(n)) missing.push(`${path.basename(path.dirname(f))}: ${n}`);
    }
  }
  assert.deepEqual(missing, []);
});

const SUFFIX = /(Export|Scraper|Extractor|Connect|Message|Finder|Builder|Creator|Converter|Like|Comment|Follow|Post|Reply|Retweet|Cleaner|Inviter|Checker|Connection|Viewer|Invitation|InMail)$/;
test('automation names in skill tables and lists exist in the desktop catalog', () => {
  const missing = [];
  for (const d of skills) for (const line of read(d).split('\n').filter((l) => l.startsWith('|') || l.startsWith('- '))) {
    for (const cell of line.split(/\||, | > | \+ | \/ | or |: /)) {
      const n = cell.replace(/[`"*]/g, '').replace(/\(.*?\)/g, '').replace(/ (on|with|for|by) .*$/, '').trim();
      if (PREFIX.test(n) && SUFFIX.test(n) && n.split(' ').length <= 7 && !catalog.has(n)) missing.push(`${d}: ${n}`);
    }
  }
  assert.deepEqual([...new Set(missing)], []);
});

