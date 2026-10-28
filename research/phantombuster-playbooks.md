# PhantomBuster playbook audit (2026-10-28)

Sources: phantombuster.com/sitemap.xml, the playbooks REST API at phantombuster.com/playbooks/wp-json/wp/v2/posts (24 playbooks), and their public Claude skill at github.com/phantombuster/mcp-assistant-skill (created 2026-10-08).

## Main finding

PhantomBuster ships one Claude skill for its MCP server. The skill does ICP intake, coaching against about 40 mistakes, a library of 54 chains, rate-limit math, and one confirmation per step. Their own playbook lists these MCP limits: no output schemas, no chaining between Phantoms, and no CSV input. TexAu already takes CSV input. With output schemas, chaining (`fromRunId`), and an export tool, TexAu leads on all three.

## Catalog size by platform

| Platform | Phantoms |
|---|---|
| LinkedIn | 52 |
| Sales Navigator | 14 |
| Instagram | 22 |
| Twitter/X | 16 |
| Facebook | 9 |
| CRM | 9 |
| Email and web tools | 7 |
| Reddit, GitHub, AI, directories | 4 each |
| YouTube, Slack | 3 each |
| Google Maps | 2 |
| Product Hunt | 0 |

## Playbooks that matter for TexAu

| Playbook | Chain | TexAu skill |
|---|---|---|
| Account-based prospecting | SN account search, SN account list, SN lead search by list and role, export | linkedin-specialist |
| Warm up leads before outreach | Profile visit, follow, activity export, likes | linkedin-outreach |
| Recently promoted or job changers | SN filter search, note plus up to 3 follow-ups | consulting-prospecting |
| Competitor post engagers | Competitor activity, likers and commenters, merge, outreach | linkedin-specialist |
| LinkedIn ad engagers | Ad post likers and commenters, profile scrape, outreach | linkedin-specialist |
| ICPs in groups | Group members, headline filter, outreach or group message | linkedin-specialist |
| Daily new leads | SN "posted recently" search exported once a day | linkedin-specialist (no schedule in TexAu) |
| Post as lead magnet | Keyword CTA post, accept invites, commenter export, send the resource | linkedin-outreach |
| AI lead scoring | ICP sentence, score high, medium, low with reasons, 3 samples, keep top tier | lead-gen-expert |
| Hiring signal hunter | Job scrape, company scrape, employees, enrich | agency-client-acquisition, consulting-prospecting |
| Local business multichannel | Maps to contact data, Facebook and LinkedIn company URL, email finder | local-maps-leads |
| Connection-slot reclaim | Withdraw old invites, remove dead connections, message | linkedin-outreach |
| Inbox reply mining | Inbox scrape, sentiment and objection tags | not covered yet |

## LinkedIn limits they publish

| Action | Limit |
|---|---|
| Connection requests | new account 10-15 a day, warm 15-25 a day, about 100 a week |
| Messages | 80 a week, 150 on Premium or Sales Navigator |
| Profile visits | 80 a working day |
| Search export | 1,000 results a day on LinkedIn, 2,500 on Sales Navigator |
| Profile scraper | 1,500 a day |
| Invite note | 200 characters |

Over 20 invites or 20 messages a day, their skill stops, shows the totals, and asks for a second yes that names the number. Health signals: acceptance 30% or more, pending invites under 100, replies 10% or more.
