---
name: linkedin-outreach
description: Use when the user wants to send LinkedIn connection requests, messages, InMails, or a multi-step LinkedIn sequence through TexAu Desktop. Covers follow-ups, warm-up visits, and thank-you outreach to post likers or event attendees.
---

# LinkedIn outreach with TexAu

**REQUIRED:** Follow texau-operator for ids, preview, confirm, budget, and errors.

## Overview

TexAu has no sequence engine. You run each step as its own batch and come back days later for the next one. The user approves the text of every write step.

## Pick the sequence

| Situation | Sequence | Days between steps |
|---|---|---|
| Cold prospects from search | Visit, then invite with a short note, then message 1, then message 2 | 1, 3 to 4, 5 to 7 |
| People who engaged (liked, commented, attended) | Invite with a note that names the post or event, then message 1 | 0, 3 |
| Existing 1st-degree connections | Message 1, then message 2 | 5 to 7 |
| Invite not accepted after 14 days | Withdraw the invite, then find an email and hand off to email | 14 |
| Sales Navigator users | Sales Navigator Auto Connect or InMail instead of the standard steps | same |

Search `list_automations` for these names. The desktop catalog can differ.

- Visit: "Linkedin Profile Viewer"
- Invite: "LinkedIn Auto Connect", "Sales Navigator Auto Connect"
- Message: "LinkedIn Auto Message", "Sales Navigator Auto Message", "Sales Navigator AI InMail"
- Status: "Check If LinkedIn Profile Is Connected or Not", "LinkedIn Sent Request Extractor", "LinkedIn Inbox Scraper"
- Cleanup: "LinkedIn Withdraw Invitation"

## Before each write step

1. Build the target list from a scrape run, not from memory.
2. Remove people who replied (inbox scrape), people already connected, and people with a pending invite.
3. Write the copy. Show the user 3 sample rows and the row count. Wait for a yes.
4. Run only what today allows (limits below). Tell the user the date of the next batch.

## Limits

| Action | New or quiet account | Established account |
|---|---|---|
| Connection requests | 10 a day | 20 a day, 100 a week |
| Messages | 25 a day | 50 a day |
| Profile visits | 40 a day | 80 a day |

The `budget` from `describe_automation` wins over this table. Limits count per account across all runs, and manual activity counts too.

If a plan goes over 20 invites or 20 messages a day, state the daily and weekly totals and ask for a second yes that names the number.

New or dormant accounts start at half volume and grow 10 to 20% a week.

## Account health

| Signal | Healthy | If not |
|---|---|---|
| Acceptance rate | 30% or more | Cut volume by a quarter to a half, tighten the target list, rewrite the note |
| Pending invites | under 100 | Withdraw invites older than 14 days before new invites |
| Reply rate | 10% or more | Rewrite message 1 |

Work out acceptance from the sent-request export and the connections export before each new invite batch.

## Copy rules

- Invite note: under 200 characters, no link, no pitch. Give one real reason to connect, taken from a column of the source row (post topic, event name, shared group, role).
- Message 1: one question about their work. Message 2: the offer in one sentence plus one low-effort ask.
- Each row gets text built from its own columns. If a column is empty, use the shorter fallback the user approved, never an invented detail.
- Stop the sequence for anyone who replied.

## Common mistakes

- Sending a pitch in the invite note. Acceptance drops and reports go up.
- Running step 2 the same day as step 1.
- Reusing an old target list without removing replies and pending invites.
