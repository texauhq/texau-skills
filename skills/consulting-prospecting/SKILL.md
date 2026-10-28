---
name: consulting-prospecting
description: Use when a consultant, fractional executive, or advisory firm wants prospects through TexAu Desktop. Covers target accounts, trigger events, account briefs, and warm introductions.
---

# Consulting and advisory prospecting

**REQUIRED:** texau-operator. Use linkedin-specialist for sourcing and linkedin-outreach for sending.

Consulting deals are few and large. Work a short list of accounts in depth. Time each approach to a dated trigger event. If a warm path to the buyer exists, use it before any cold note.

## Trigger events

| Trigger | How to find it in TexAu Desktop | Why it matters |
|---|---|---|
| New leader in the buyer's seat | Sales Navigator Lead Search Export with the "changed jobs in the last 90 days" filter in the URL the user pastes. Without Sales Navigator: LinkedIn Profile Scraper on known leaders, compared with the last run. | New leaders buy in their first 90 days |
| Hiring for the role the user replaces or supports | LinkedIn Job Search Export, then LinkedIn Job Scraper for the full job text | A gap the consultant can fill now |
| Fast headcount growth | Sales Navigator Account Search Export with headcount growth filters | Process and leadership strain |
| Public pain from the buyer | LinkedIn Profile Posts Export on the buyer and peers | The buyer's own words |
| Past client changed jobs | LinkedIn Profile Scraper on the user's past clients, compared with the last run by company | The warmest lead there is |
| Funding or launch news | The assistant's web search (Desktop has no funding source). Mark it as a web source. | Budget and a mandate to scale |

## Stages

### 1. Brief

Ask for the offer, the buyer title, account criteria, and the short list size. Default: 25 accounts.

Done when: account criteria are filters a Sales Navigator account search or a company list can express.

### 2. Accounts with a trigger

Build the account list, then keep only accounts with at least one trigger from the last 90 days. Record `trigger` and `trigger_date`.

Done when: every account has a dated trigger, and the list is at most the agreed size.

### 3. People

For each account, find the buyer and one or two peers: LinkedIn Company Employees Export with `keyword` = the buyer title, or LinkedIn Company Lead Search Export on Sales Navigator.

### 4. Warm paths

Run LinkedIn Mutual Connections Export on each buyer (`liProfileUrl` = buyer). List the user's mutual connections, and rank them by how well the user knows them (ask the user). An intro ask goes before any cold note.

### 5. Account brief

One page per account, using the research brief format in texau-operator/references/report-formats.md:

- What the company does, in one sentence
- The trigger and its date
- The buyer: role, tenure, and what they posted in the last 90 days
- The likely problem, stated as a guess
- One idea the user can offer for free
- Warm paths, or "none found"

Cite each line to a run id or a URL.

### 6. Outreach

The user picks which accounts get an intro ask and which get a direct note. Draft both. Send nothing without the user's yes. Direct notes go through linkedin-outreach, with the trigger in `signal`.

## Named mistakes

| Mistake | Do instead |
|---|---|
| A list of 2,000 accounts | Consulting needs depth. 20 to 50 accounts. |
| A trigger without a date | Funding from two years ago is not a trigger |
| Cold note to a buyer with mutual connections | Ask for the intro first |
| The likely problem stated as fact | Say it is a guess, and ask |
| Web search facts mixed in without a label | Mark web sources |
