// Turn test/catalog-desktop.json (read from a real TexAu Desktop with test/read-catalog.mjs)
// into skills/texau-operator/references/desktop-catalog.md.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const src = JSON.parse(fs.readFileSync(fileURLToPath(new URL('./catalog-desktop.json', import.meta.url)), 'utf8'));
export const PLATFORM_NAMES = {
  '622f03eb770f6bba0b8facaa': 'LinkedIn', '64267ae1dbfc2b4d1fa6628d': 'Sales Navigator', '6541d862e7e500bea9c8b645': 'LinkedIn Recruiter',
  '6307070b15bef68874a6a73c': 'X (Twitter)', '6493d8cf0f7b435e85d61bb6': 'Google Maps', '635bb0ad23dcf87dd4cb89af': 'Websites',
  '65150ee6efb0b869501a232a': 'YouTube', '65d45eca4a553560779a22f6': 'Slack', '66b36b08fcf4de9a762edd78': 'Data cleaning',
};
export const WRITE = /\b(Auto|Delete|Creator|Builder|Inviter|Accept|Reject)\b/;
const KEY_OUTPUTS = /^(fullName|firstName|lastName|name|screenName|headline|jobTitle|jobCompanyName|companyName|liProfileUrl|liPublicProfileUrl|snProfileUrl|twProfileUrl|liPostUrl|twPostUrl|postContent|postDate|commentText|connectionDegree|reactionType|connectionDate|invitationDate|isConnected|invitationState|hasReplied|lastMessageText|lastMessageDate|participantLiProfileUrl|isInvitePending|websiteUrl|siteUrl|email|phones|Phone|averageRatings|reviewsCount|placeId|mapsUrl|isOpen|category|companyLocationAddress|reviewText|rating|technologies|advertising|analytics|crm|ecommerce|companyStage|followersCount|description|location|canDm|industry|profileLocation|liCompanyUrl|liJobUrl|jobTitle|cleaned\w*|\w*Cleaned)$/;
const lines = [
  '# TexAu Desktop catalog',
  '',
  `Read from a real TexAu Desktop ${src.appVersion} on ${src.readAt.slice(0, 10)} with \`list_automations\` and \`describe_automation\`. ${src.automations.length} automations. Regenerate with \`node test/gen-catalog.mjs\` after reading a newer build.`,
  '',
  'Use it to plan. Always resolve the id with `list_automations` at run time, because builds differ. Input names marked `*` are required. "Writes" means the automation acts as the user and needs the user\'s approval. Limits are the app defaults per account: rows per day and per week.',
  '',
];
const by = {};
for (const a of src.automations) (by[PLATFORM_NAMES[a.platformId] ?? a.platformId] ??= []).push(a);
for (const [p, ops] of Object.entries(by)) {
  lines.push(`## ${p} (${ops.length})`, '', '| Automation | Writes | Inputs | Key outputs | Limit (day / week) |', '|---|---|---|---|---|');
  for (const a of ops) {
    const ins = a.inputs.map((i) => `\`${i.name}\`${i.required ? '*' : ''}`).join(', ') || 'none (own account)';
    const outs = a.outputs.map((o) => o.name).filter((n) => KEY_OUTPUTS.test(n)).map((n) => `\`${n}\``).join(', ');
    const l = a.defaultLimits ?? {};
    lines.push(`| ${a.name} | ${WRITE.test(a.name) ? 'yes' : ''} | ${ins} | ${outs} | ${l.day ?? '-'} / ${l.week ?? '-'} |`);
  }
  lines.push('');
}
lines.push('## Not in this build', '', 'These are in the TexAu V2 cloud catalog but not in TexAu Desktop 1.1.4: Reddit, Google Search, Crunchbase, Product Hunt, GitHub, Instagram, Facebook, email finders (Hunter, Snov, Datagma), email verifiers, CRMs (HubSpot, Pipedrive, Close), sequencers (Lemlist, Instantly), LinkedIn profile visit, invitation withdraw, groups, events attendees, people search export, tracking pixel extractor, company website finder. Call `list_automations` before telling the user one is missing. A newer build can have it.', '');
fs.writeFileSync(fileURLToPath(new URL('../skills/texau-operator/references/desktop-catalog.md', import.meta.url)), lines.join('\n'));
console.log('wrote', src.automations.length);
