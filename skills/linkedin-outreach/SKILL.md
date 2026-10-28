---
name: linkedin-outreach
description: Use when the user wants to send LinkedIn connection requests, messages, InMails, or a multi-step LinkedIn sequence through TexAu Desktop. Also use for "continue my campaigns", follow-ups, replies to handle, and outreach to post likers or event attendees.
---

# LinkedIn outreach with TexAu

**REQUIRED:** texau-operator. Its stages, approval brief, and named mistakes apply to every step here. This skill adds campaigns, copy, and account health.

TexAu has no sequence engine. A campaign is a list of steps with days between them. You run each step as its own TexAu batch, record it in the ledger, and come back on the due date. The ledger (`texau-operator/scripts/texau-ledger.mjs`) remembers who got which step, who accepted, and who replied.

## Start a campaign

### 1. Pick the sequence

| Audience | Steps (`--steps`) | Days after the previous step (`--gaps`) |
|---|---|---|
| Engaged with the user's post, event, or page | `invite,message1` | `0,2` |
| Engaged with someone else's content | `visit,invite,message1,message2` | `0,1,3,5` |
| Cold search or list | `visit,invite,message1,message2` | `0,1,4,7` |
| Existing 1st-degree connections | `message1,message2` | `0,6` |
| Sales Navigator with InMail credits | `visit,inmail` | `0,1` |

A warm list holds only people who engaged with the user or know the user. Every other list is cold. Do not mix the two in one campaign.

### 2. Create it in the ledger

```
node <texau-operator>/scripts/texau-ledger.mjs campaign-add --name "<short-name>" --account <accountId> --steps visit,invite,message1,message2 --gaps 0,1,4,7
```

Name campaigns after source and date, for example `rival-post-likers-2026-10`.

### 3. Write the copy

Write the copy once per campaign, as templates with columns in braces, for example `{first_name}` and `{signal}`. Show the templates and 3 rendered rows in the approval brief. After the user approves, render every row into the CSV that goes to TexAu, in the column the automation's `describe_automation` input expects.

### 4. Run step 1

Follow texau-operator stages 4 to 7 for the first step. After the run, `record` it with the rows that were sent.

## Continue my campaigns

When the user says "continue", "next step", "follow up", or starts a new day of outreach:

1. `status` in the ledger. List each campaign with its numbers.
2. Refresh the facts the ledger cannot see. Confirm these reads yourself:
   - `LinkedIn Connections Export` (or the last 2 weeks of it). Then `connected --campaign <name> --csv <export>`.
   - `LinkedIn Inbox Scraper`. Then `reply --campaign <name> --csv <threads with a reply from the prospect>`.
3. `due --campaign <name> --out due.csv` for each campaign. The ledger skips people who replied, people who did not accept yet, and steps whose gap is not over.
4. `usage --account <id>`. Cut each due batch to `leftToday`. Split the allowance across campaigns, warmest first.
5. One approval brief per write step. Run, follow, `record`.
6. Report with the campaign report shape in texau-operator/references/report-formats.md. List the replies first, with a suggested next move for each.

## Copy library

Rules for every text:

- Invite note: under 200 characters, no link, no pitch, one reason to connect taken from `{signal}`.
- Message 1: one question about their work. No calendar link.
- Message 2: the offer in one sentence, a proof point the user gave you, and one low-effort ask.
- Use only columns the row has. For an empty column, use the fallback the user approved.
- Never claim a shared experience, a mutual friend, or a compliment the data does not support.

| Signal | Invite note | Message 1 |
|---|---|---|
| Liked or commented on the user's post | "Thanks for the {reaction} on my post about {topic}, {first_name}. Happy to connect." | "Curious what made {topic} land for you. Is it something your team is working on at {company}?" |
| Engaged with a competitor or peer's post | "Saw your comment on {author}'s post about {topic}. I write about the same problem. Glad to connect." | "How is {company} handling {topic} today? I keep hearing two different answers." |
| Attends the same event | "See you at {event}, {first_name}. Connecting before the day." | "What are you hoping to get out of {event}?" |
| Same group | "We are both in {group}. Your take on {topic} stood out." | "What brought you to {group}?" |
| New role | "Congrats on the move to {company}, {first_name}." | "First 90 days at {company}: what is on the list?" |
| Company hiring for a role | "Noticed {company} is hiring a {job_title}. I work with teams in that spot." | "Is the {job_title} hire about growth or about filling a gap?" |
| Cold, ICP match only | "Hi {first_name}, I work with {title_plural} at {industry} companies. Glad to connect." | "How do you handle {problem} at {company} today?" |

Message 2, any signal: "{one-sentence offer}. {proof point}. Worth a 10-minute look, or do you want a 2-minute video instead?"

## Replies

Read each reply and sort it, then draft the next move for the user. Never send a reply without the user's yes.

| Reply type | Next move |
|---|---|
| Interested, asks a question | Answer the question in two sentences, then offer one time slot |
| "Not now" or "maybe later" | Thank them. Ask when to come back. Note the date in the CRM or the lead CSV `notes`. |
| Objection: price, timing, already have a vendor | One sentence that addresses it. One question. No second pitch. |
| Referral to someone else | Thank them. Ask for an intro or permission to use their name. |
| Not interested, or "stop" | Thank them. Mark `reply` in the ledger. Never contact again. |

## Limits

| Action | New or quiet account | Established account |
|---|---|---|
| Connection requests | 10 a day | 20 a day, 100 a week |
| Messages | 25 a day | 50 a day |
| Profile visits | 40 a day | 80 a day |

The ledger enforces the established limits (`usage` gives `leftToday`). For a new or quiet account, halve them. `budget` from `describe_automation` wins over both. Limits count per account across every campaign, and manual activity counts too.

## Account health

Read these at the start of every "continue" session, from ledger `status`:

| Signal | Healthy | If not |
|---|---|---|
| Acceptance rate | 30% or more after 50 invites | Cut invites by half. Tighten the list to warmer signals. Rewrite the note. |
| Reply rate | 10% or more after 30 messages | Rewrite message 1. It is too long or too salesy. |
| Pending invites | under 100 | Run `LinkedIn Sent Request Extractor`, withdraw invites older than 14 days, then invite again. |
| Any LinkedIn warning or captcha reported by the user | none | Stop all write steps on that account for 7 days. |

## Automations

Search `list_automations` for these names:

- Visit: "Linkedin Profile Viewer"
- Invite: "LinkedIn Auto Connect", "Sales Navigator Auto Connect"
- Message: "LinkedIn Auto Message", "Sales Navigator Auto Message", "Sales Navigator AI InMail", "LinkedIn Group Auto Message"
- Facts: "LinkedIn Connections Export", "LinkedIn Inbox Scraper", "LinkedIn Sent Request Extractor", "Check If LinkedIn Profile Is Connected or Not"
- Cleanup: "LinkedIn Withdraw Invitation"
