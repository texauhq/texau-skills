---
name: consulting-prospecting
description: Use when a consultant, fractional executive, or advisory firm wants prospects through TexAu Desktop. Covers target accounts, trigger events, account briefs, and warm introductions.
---

# Consulting and advisory prospecting

**REQUIRED:** Follow texau-operator. Use linkedin-specialist for sourcing and linkedin-outreach for sending.

## Overview

Consulting deals are few and large. Work a short list of accounts in depth. Time each approach to a trigger event. If a warm path to the buyer exists, use it.

## Trigger events

| Trigger | How to find it | Why it matters |
|---|---|---|
| New leader in the buyer's seat | LinkedIn People Search Export or Sales Navigator Lead Search Export with "started new position" filters in the URL the user pastes | New leaders buy in their first 90 days |
| Funding round | Crunchbase Company Funding Scraper | Budget and a mandate to scale |
| Hiring for the role the user replaces or supports | LinkedIn Job Search Export | A gap the consultant can fill now |
| Fast headcount growth | Sales Navigator Account Search Export with growth filters | Process and leadership strain |
| Public pain in posts | LinkedIn Profile Posts Export on the leaders | The buyer's own words |
| Past client changed jobs | Rerun LinkedIn Profile Scraper on the user's past clients and compare company with the last run | Warmest possible lead |

## Pipeline

1. Ask for the offer, the buyer title, and the account criteria. Agree a short list size, usually 20 to 50 accounts.
2. Find accounts with at least one trigger. Record the trigger and its date.
3. For each account, find the buyer and one or two peers.
4. Warm paths: run LinkedIn Mutual Connections Export on the buyer. List the user's mutual connections. Suggest an intro ask before any cold note.
5. Account brief, one page per account: what the company does, the trigger, the buyer's recent posts, the likely problem, one idea the user can offer. Cite each line to a run id or URL.
6. Outreach: the user picks which accounts get an intro ask and which get a direct note. Draft both. Send nothing without the user's yes.

## Common mistakes

- A list of 2,000 accounts. Consulting needs depth, not volume.
- A trigger without a date. A funding round from two years ago is not a trigger.
- Cold pitching a buyer who shares five mutual connections with the user.

## Deliverable

Deliver one research brief per account from texau-operator/references/report-formats.md, plus a lead list CSV of buyers with `signal` set to the trigger and its date.
