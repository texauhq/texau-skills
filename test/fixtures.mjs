// Fixture catalog for the mock server, built from a real TexAu Desktop catalog (test/catalog-desktop.json).
// Ids, names, inputs, outputs and default limits are real. Result rows are synthetic but use the real output names.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = JSON.parse(fs.readFileSync(fileURLToPath(new URL('./catalog-desktop.json', import.meta.url)), 'utf8'));
const WRITE = /\b(Auto|Delete|Creator|Builder|Inviter|Accept|Reject)\b/;

// Short keys that evals use to find an automation.
const KEYS = {
  'LinkedIn Post Likers Export': 'postLikers',
  'LinkedIn Comments Scraper': 'postComments',
  'LinkedIn Profile Posts Export': 'profilePosts',
  'LinkedIn Auto Connect': 'connect',
  'LinkedIn Auto Message': 'message',
  'LinkedIn Sent Request Extractor': 'sentRequests',
  'LinkedIn Connections Export': 'connections',
  'LinkedIn Inbox Scraper': 'inbox',
  'LinkedIn Connection Checker': 'connChecker',
  'LinkedIn Profile Scraper': 'profileScraper',
  'Sales Navigator Lead Search Export': 'snSearch',
  'Google Maps Search Export': 'maps',
  'Google My Business Scraper': 'gmb',
  'Google Maps Reviews Scraper': 'reviews',
  'Website Email And Social Links Scraper': 'websiteEmails',
  'Website Technographic Data Finder': 'techno',
  'Twitter Followers/Following Export': 'twFollowers',
};
const SN_PLATFORM = '64267ae1dbfc2b4d1fa6628d';
const RECRUITER_PLATFORM = '6541d862e7e500bea9c8b645';
// How many result rows one input row produces, by key. Others default to 25.
const PER_ROW = { postLikers: 87, postComments: 24, profilePosts: 10, connections: 640, sentRequests: 12, inbox: 30, maps: 60, gmb: 60, reviews: 40, websiteEmails: 1, techno: 1, connChecker: 1, profileScraper: 1, connect: 1, message: 1, snSearch: 300, twFollowers: 200 };

export const AUTOMATIONS = src.automations.map((a) => ({
  id: a.id,
  key: KEYS[a.name] ?? a.name,
  name: a.name,
  platformId: a.platformId,
  description: a.description,
  kind: WRITE.test(a.name) ? 'write' : 'read',
  inputs: a.inputs,
  outputs: a.outputs,
  requiresAccount: a.requiresAccount,
  cookiePlatform: a.cookiePlatform,
  needsSalesNav: a.platformId === SN_PLATFORM && !/Universal|Company Lead Search|Company Converter/.test(a.name),
  needsRecruiter: a.platformId === RECRUITER_PLATFORM,
  budget: a.defaultLimits?.day ?? 500,
  defaultLimits: a.defaultLimits,
  defaultResults: PER_ROW[KEYS[a.name]] ?? 25,
}));

export const ACCOUNTS = [
  { id: 'acc_li_01', platform: 'linkedin', name: 'Dana Reyes', profileUrl: 'https://www.linkedin.com/in/dana-reyes', salesNavigator: false, recruiter: false, proxyId: null, lane: 'linkedin:direct' },
  { id: 'acc_tw_01', platform: 'twitter', name: 'Dana Reyes', profileUrl: 'https://x.com/danareyes', salesNavigator: false, recruiter: false, proxyId: null, lane: 'twitter:direct' },
];

const FIRST = ['Priya', 'Marcus', 'Elena', 'Tom', 'Aisha', 'Ken', 'Sofia', 'Raj', 'Lena', 'Omar'];
const TITLES = ['Head of Growth', 'Founder', 'VP Sales', 'Marketing Manager', 'Student', 'Recruiter', 'CEO', 'SDR'];
const COMPANIES = ['Brightline', 'Kitebox', 'Northwind', 'Acme', 'State University', 'TalentCo', 'Fieldwork', 'Cloudly'];

// A value for one output field of row i, chosen by the field name. `n` is the person index, so
// two inputs can share some people (followers of two competitors overlap by half).
function value(field, i, key, n = i) {
  const first = FIRST[n % FIRST.length], slug = `${first.toLowerCase()}-${n}`;
  const f = field.toLowerCase();
  if (key === 'maps' || key === 'gmb') {
    if (f === 'companyname') return `Smile Dental ${i}`;
    if (f === 'websiteurl') return i % 4 === 0 ? '' : `https://smiledental${i}.com`;
    if (f === 'averageratings') return (3.5 + (i % 15) / 10).toFixed(1);
    if (f === 'reviewscount') return 5 + i * 3;
    if (f === 'isopen') return i % 20 !== 7;
    if (f === 'placeid') return `place_${i}`;
    if (f === 'phone') return `+1 312 555 ${1000 + i}`;
    if (f === 'category') return 'Dentist';
    if (f === 'companylocationaddress') return `${100 + i} Main St, Chicago, IL`;
  }
  if (key === 'websiteEmails' && f === 'email') return i % 3 === 0 ? '' : `${i % 2 ? 'info' : 'dr.patel'}@smiledental${i}.com`;
  if (key === 'techno' && f === 'advertising') return i % 2 ? 'Google Ads' : '';
  if (key === 'message' && f === 'hasreplied') return false;
  if (key === 'connChecker' && f === 'isconnected') return i % 2 === 0;
  if (key === 'profilePosts') {
    if (f === 'liposturl') return `https://www.linkedin.com/posts/dana-reyes_activity-${7000 + i}`;
    if (f === 'postcontent') return i === 0 ? 'Why most cold outreach fails: 3 lessons from 1,000 calls' : `Post ${i}`;
    if (f === 'postdate') return `2026-10-${String(27 - i).padStart(2, '0')}`;
    if (f === 'posttype') return 'post';
  }
  if (f === 'firstname' || f === 'participantfirstname') return first;
  if (f === 'lastname' || f === 'participantlastname') return `Lee${i}`;
  if (f === 'fullname' || f === 'name') return `${first} Lee${i}`;
  if (f === 'headline') return `${TITLES[i % TITLES.length]} at ${COMPANIES[i % COMPANIES.length]}`;
  if (f === 'jobtitle') return TITLES[i % TITLES.length];
  if (f === 'jobcompanyname' || f === 'companyname') return COMPANIES[i % COMPANIES.length];
  if (f === 'connectiondegree') return i % 5 === 0 ? '1st' : '2nd';
  if (f === 'reactiontype') return ['LIKE', 'PRAISE', 'EMPATHY'][i % 3];
  if (/liprofileurl$|lipublicprofileurl$/.test(f)) return `https://www.linkedin.com/in/${slug}`;
  if (f === 'snprofileurl') return `https://www.linkedin.com/sales/lead/${slug}`;
  if (f === 'twprofileurl') return `https://x.com/${slug}`;
  if (f === 'screenname') return slug;
  if (f === 'commenttext') return 'Great point about follow-ups.';
  if (f === 'lastmessagetext') return i % 4 === 0 ? 'Thanks, tell me more about pricing.' : 'Sounds good.';
  if (/date$/.test(f)) return '2026-10-20';
  if (/count$/.test(f)) return 10 + i;
  if (/^is|^has|^can/.test(f)) return false;
  return '';
}

// Shape rows the way TexAu Desktop returns them (shared/src/run-results.ts rowsForItem):
// Input, Status, Message, one column per output label, Raw result. Every value is a string.
export function exportRows(key, total, inputs = []) {
  const op = AUTOMATIONS.find((a) => a.key === key);
  const outs = op ? op.outputs : [];
  const raw = rowsFor(key, total, inputs);
  const per = inputs.length > 1 ? Math.ceil(total / inputs.length) : total;
  const cell = (v) => (v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v));
  return raw.map((r, i) => {
    const j = Math.min(Math.floor(i / Math.max(1, per)), Math.max(0, inputs.length - 1));
    const records = inputs.length > 1 ? per : total;
    const row = { Input: records > 1 ? `Row ${j + 1} (record ${(i % Math.max(1, per)) + 1}/${records})` : `Row ${j + 1}`, Status: 'Success', Message: '' };
    for (const o of outs) if (!(o.label in row)) row[o.label] = cell(r[o.name]);
    row['Raw result'] = '';
    return row;
  });
}

export function rowsFor(key, total, inputs = []) {
  const op = AUTOMATIONS.find((a) => a.key === key);
  const fields = op ? op.outputs.map((o) => o.name) : ['liProfileUrl', 'fullName', 'firstName', 'headline'];
  const per = inputs.length > 1 ? Math.ceil(total / inputs.length) : total;
  return Array.from({ length: total }, (_, i) => {
    const j = Math.min(Math.floor(i / per), Math.max(0, inputs.length - 1));
    const n = inputs.length > 1 ? (i % per) + j * Math.floor(per / 2) : i;
    const input = inputs[j] ?? {};
    const row = Object.fromEntries(fields.map((f) => [f, value(f, i, key, n)]));
    // Echo the input that produced the row, as the real app does in its input* fields.
    for (const f of fields) {
      if (!/^inputs?[A-Z]/.test(f)) continue;
      const norm = (x) => x.toLowerCase().replace('twitter', 'tw').replace('linkedin', 'li').replace('comany', 'company');
      const want = norm(f.replace(/^inputs?/, ''));
      const k = Object.keys(input).find((x) => norm(x) === want || want.endsWith(norm(x)) || norm(x).endsWith(want));
      if (k) row[f] = input[k];
    }
    return row;
  });
}
