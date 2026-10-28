# TexAu chain library

Each chain lists TexAu automations in run order. `>` means the next run takes the previous run's output as a CSV (`csvPath`). Resolve names with `list_automations`. Temperature tells you how warm the audience is: warm chains reply most, so offer them before cold ones.

The "Also known as" column gives the PhantomBuster name for the same job, so a user can ask in either vocabulary.

## Warm: people who already know the user

| Chain | Steps | Also known as |
|---|---|---|
| Network activation | LinkedIn Connections Export > filter by title > LinkedIn Auto Message | Network Activation |
| Profile viewers | LinkedIn Profile Views Export > LinkedIn Profile Scraper > LinkedIn Auto Connect > LinkedIn Auto Message | Hottest Viewer Outreach |
| Inbound accept and welcome | LinkedIn Auto Accept Pending Connection > LinkedIn Received Connection Extractor > LinkedIn Auto Message | Inbound Accelerator, New Connection Welcome Message |
| Own post engagers | LinkedIn Profile Posts Export > LinkedIn Post Likers Export + LinkedIn Comments Scraper > filter > LinkedIn Auto Connect | Post Engagers to Lead Outreach |
| Post as lead magnet | LinkedIn Auto Post (keyword CTA) > LinkedIn Comments Scraper > filter on keyword > LinkedIn Auto Message with the resource | Posts as lead magnets |
| Own followers | Extract Your LinkedIn Followers > filter > LinkedIn Auto Connect | Profile Follower Collector |
| Company page followers | LinkedIn Company Followers Export > filter > LinkedIn Auto Connect > LinkedIn Auto Message | Company Follower Collector to Outreach |
| Job changers among past clients | LinkedIn Profile Scraper on the client list > compare company with the last run > LinkedIn Auto Message | HubSpot Contact Career Tracker |

## Lukewarm: people who engaged with someone else

| Chain | Steps | Also known as |
|---|---|---|
| Competitor post engagers | LinkedIn Profile Posts Export (competitor) > LinkedIn Post Likers Export + LinkedIn Comments Scraper > filter > LinkedIn Auto Connect | Competitor posts playbook |
| Topic post engagers | LinkedIn Post Search Export > LinkedIn Post Likers Export + LinkedIn Comments Scraper > filter > LinkedIn Auto Connect | ICPs engaging topic posts |
| Event attendees | LinkedIn Event Search Export > LinkedIn Event Attendees Export > LinkedIn Auto Connect (note names the event) | Event Guests Export |
| Group members, no invite | LinkedIn Group Members Extractor > filter by headline > LinkedIn Group Auto Message | Group-Message Bypass |
| Content warm-up | LinkedIn Profile Activity Export > LinkedIn Auto Like > wait 3 to 7 days > Linkedin Profile Viewer > LinkedIn Auto Connect | Content-Led Warm-Up, Warm up leads |
| Reddit solution requests | Reddit Posts Search Export ("alternative to", "recommend") > Reddit Post Commenters Export > research only | none |

## Cold: people who match the ICP only

| Chain | Steps | Also known as |
|---|---|---|
| Account-based | Sales Navigator Account Search Export > Sales Navigator Lead Search Export by role > Sales Navigator Auto Connect | Account-based prospecting |
| Search to outreach | LinkedIn People Search Export > LinkedIn Profile Scraper > LinkedIn Auto Connect > LinkedIn Auto Message | Search to Lead Outreach |
| Search to email | Sales Navigator Lead Search Export > Find An Email Address > Hunter - Find Email Using Email Finder > Email Verifier > Lemlist or Instantly | Search To Emails |
| Hiring signal | LinkedIn Job Search Export > LinkedIn Company Scraper > LinkedIn Company Employees Export (hiring manager) | Hiring Signal Hunter |
| Funded companies | Crunchbase Company Funding Scraper > LinkedIn Company Employees Export > email waterfall | none |
| Local business | Google Maps Extractor > Website Email Scraper > Email Verifier | Google Maps Search To Contact Data, Local Business Multichannel |
| Tech stack displacement | Google Search Results Extractor (footprint) > Website Technographic Data Finder > Website Email Scraper | none |
| X audience | Twitter Search Export > Twitter Profile Scraper > Twitter Auto Follow > Twitter Auto Message | X Audience Growth Flywheel |
| Developers | GitHub Contributors Export or GitHub User Search Export > email waterfall | GitHub Contributors Export |

## Maintenance

| Chain | Steps | Also known as |
|---|---|---|
| Invite cleanup | LinkedIn Sent Request Extractor > keep invites older than 14 days > LinkedIn Withdraw Invitation | Connection-Slot Reclaim |
| Inbox triage | LinkedIn Inbox Scraper > the assistant tags replies (interested, objection, not now) | Inbox Reply Mining |
| CRM refresh | Hubspot: Get Contact > LinkedIn Profile Scraper > Hubspot: Update Contact | HubSpot Contact Data Refresher |

## What TexAu does differently from PhantomBuster

- No schedule or watcher mode. To repeat a chain, the user asks again. Compare with the last run by profile URL or post id, and report only new rows.
- No built-in sequence. Each step is its own run, and the assistant returns days later for the next one.
- Runs use the user's own machine and IP, paced by account lanes. There are no per-launch slot limits.
- CSV files pass between steps with `csvPath`, up to 50,000 rows.
