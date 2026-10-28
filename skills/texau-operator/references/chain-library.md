# TexAu chain library

Each chain lists TexAu Desktop automations in run order. `>` means the next run takes the previous run's output as a CSV (`csvPath`), `+` means both, `/` means either. Every name here is in references/desktop-catalog.md. Resolve ids with `list_automations` at run time.

Temperature says how warm the audience is. Warm chains reply most, so offer them before cold ones. "Also known as" gives the PhantomBuster name for the same job.

## Warm: people who already know the user

| Chain | Steps | Also known as |
|---|---|---|
| Network activation | LinkedIn Connections Export > assistant filter by title > LinkedIn Auto Message | Network Activation |
| New connections welcome | LinkedIn Connections Export (filterDate = last run) > LinkedIn Auto Message | New Connection Welcome Message |
| Inbound accept and welcome | LinkedIn Received Connection Extractor > assistant filter > LinkedIn Auto Accept Pending Connection > LinkedIn Auto Message | Inbound Accelerator |
| Own post engagers | LinkedIn Profile Posts Export > LinkedIn Post Likers Export + LinkedIn Comments Scraper > assistant filter > LinkedIn Auto Connect | Post Engagers to Lead Outreach |
| Post as lead magnet | user posts a keyword CTA > LinkedIn Comments Scraper > assistant filter on keyword > LinkedIn Auto Message with the resource (1st-degree) or LinkedIn Auto Connect (others) | Posts as lead magnets |
| Own followers | LinkedIn Followers Export > assistant filter > LinkedIn Auto Connect | Profile Follower Collector |
| Birthdays and anniversaries | Linkedin Birthday Export > LinkedIn Auto Message | none |
| Past clients who changed jobs | LinkedIn Profile Scraper on the client list > compare company with the last run > LinkedIn Auto Message | HubSpot Contact Career Tracker |

## Lukewarm: people who engaged with someone else

| Chain | Steps | Also known as |
|---|---|---|
| Competitor post engagers | LinkedIn Profile Posts Export (competitor) > LinkedIn Post Likers Export + LinkedIn Comments Scraper > assistant filter > LinkedIn Auto Connect | Competitor posts playbook |
| Competitor company page engagers | LinkedIn Company Activity Extractor > LinkedIn Post Likers Export + LinkedIn Comments Scraper > assistant filter > LinkedIn Auto Connect | Company Post Commenter and Liker Scraper |
| Viral post reposters | LinkedIn Reposters Export > assistant filter > LinkedIn Auto Connect | none |
| Content warm-up | LinkedIn Profile Activity Export > LinkedIn Post Auto Like > wait 3 to 7 days > LinkedIn Auto Connect | Content-Led Warm-Up, Warm up leads |
| X competitor audience | Twitter Followers/Following Export (competitor, Followers) > assistant filter by bio > Twitter Auto Follow > Twitter Auto Message (canDm only) | Twitter Follower Collector |
| X conversation joiners | Twitter Search Extractor > Twitter Thread Export > assistant filter > Twitter Auto Reply (user approves each reply) | none |
| Slack community members | Slack People Search Export or Slack Channel Members Extractor > assistant filter by title > linkedin-outreach on `liProfileUrl` | Slack Channel User Extractor |

## Cold: people who match the ICP only

| Chain | Steps | Also known as |
|---|---|---|
| Account-based | Sales Navigator Account Search Export > LinkedIn Company Lead Search Export > Sales Navigator Auto Connect | Account-based prospecting |
| Search to outreach | Sales Navigator Lead Search Export > assistant filter > LinkedIn Auto Connect > LinkedIn Auto Message | Search to Lead Outreach |
| Named accounts | LinkedIn Company Employees Export (keyword = title) > LinkedIn Profile Scraper > LinkedIn Auto Connect | Company Employees Export |
| Hiring signal | LinkedIn Job Search Export > LinkedIn Company Scraper > LinkedIn Company Employees Export (keyword = hiring manager title) | Hiring Signal Hunter |
| Alumni | LinkedIn Alumni Search Export > assistant filter > LinkedIn Auto Connect (note names the school) | none |
| Local business | Google Maps Search Export > Website Email And Social Links Scraper | Google Maps Search To Contact Data |
| Tech stack displacement | assistant web search for the footprint > Website Technographic Data Finder > Website Email And Social Links Scraper | none |
| YouTube creators | YouTube Search Export > YouTube Channel Scraper > Website Email And Social Links Scraper on the channel links | none |

## Maintenance

| Chain | Steps | Also known as |
|---|---|---|
| Pending invite audit | LinkedIn Sent Request Extractor > list invites older than 14 days for the user to withdraw in LinkedIn | Connection-Slot Reclaim (manual withdraw) |
| Reply detection | LinkedIn Inbox Scraper > LinkedIn Message Thread Scraper on campaign threads > ledger `reply` | Inbox Reply Mining |
| Connection check | LinkedIn Connection Checker on invited people > ledger `connected` | none |
| Clean names before copy | Personal Name Cleaner + Company Name Cleaner + Social Headline Cleaner | none |

## What TexAu does differently from PhantomBuster

- No schedule or watcher mode. To repeat a chain, the user asks again. Compare with the last run by profile URL or post URL, and report only new rows.
- No built-in sequence. Each step is its own run. The ledger in scripts/texau-ledger.mjs remembers who got which step.
- Runs use the user's own machine and IP, paced by account lanes.
- CSV files pass between steps with `csvPath`, up to 50,000 rows.
- No profile visit, invite withdraw, groups, or event attendees in Desktop 1.1.4. The chains above work without them.
