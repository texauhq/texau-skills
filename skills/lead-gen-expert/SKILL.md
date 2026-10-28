---
name: lead-gen-expert
description: Use when the user asks TexAu Desktop for leads, a prospect list, enriched contacts, lead scoring, or a prospecting campaign without naming one platform. Also use for email finding and CRM or sequencer hand-off.
---

# Lead generation with TexAu

**REQUIRED:** texau-operator. This skill picks the source and runs qualify, enrich, and deliver. The source skills (linkedin-specialist, local-maps-leads, x-twitter-specialist, google-web-research) run the sourcing step.

A lead list has four stages: source, qualify, enrich, deliver. Most bad lists skip qualify and spend enrichment on rows that never had a chance.

## Stages

### 1. Lock the ICP

Ask for anything missing, in one message, with your defaults:

- Buyer: titles or roles, seniority
- Company: industry, size, location
- Trigger: hiring, new leader, engaged with a topic, uses a tool, no website. Ask for at least one.
- Done: row count, required fields (LinkedIn URL, email, phone), where the list goes

Done when: you can write the ICP as filters on named columns, for example `jobTitle` contains "Head of Growth" and `companyName` is in the account list.

### 2. Pick the source by trigger

| Trigger or ICP | Source | Skill |
|---|---|---|
| Engaged with the user's or a competitor's posts | LinkedIn Post Likers Export, LinkedIn Comments Scraper, LinkedIn Reposters Export | linkedin-specialist |
| Roles at companies by size and industry | Sales Navigator Lead Search Export (needs Sales Navigator) | linkedin-specialist |
| People at named accounts | LinkedIn Company Employees Export, LinkedIn Company Lead Search Export | linkedin-specialist |
| Companies hiring for a role | LinkedIn Job Search Export | linkedin-specialist |
| Alumni of a school | LinkedIn Alumni Search Export | linkedin-specialist |
| Local or SMB businesses | Google Maps Search Export | local-maps-leads |
| Followers of a competitor or creator on X | Twitter Followers/Following Export | x-twitter-specialist |
| People talking about a topic on X | Twitter Search Extractor | x-twitter-specialist |
| Members of a Slack community the user belongs to | Slack People Search Export, Slack Channel Members Extractor | this skill, below |
| YouTube creators in a niche | YouTube Search Export, YouTube Channel Scraper | market-research |
| Companies that use a tool or run ads | Website Technographic Data Finder | google-web-research |

If two sources fit, start with the warmer one (references/chain-library.md, warm to cold).

Slack: the user's own workspaces appear in the `slWorkspaceIdToken` select. Search people by role keywords. If members filled them in, rows include `jobTitle`, `email`, and `liProfileUrl`. Never message a Slack community in bulk. Use the rows for LinkedIn or email outreach instead.

Done when: the source run is final and its rows are in `raw.csv`.

### 3. Qualify and score

Score every row before any enrichment, from the columns you already have:

| Fit | Rule |
|---|---|
| high | Title and company match the ICP, and the row has a trigger |
| medium | Title or company matches, and the row has a trigger, or both match with no trigger |
| low | Neither matches, or the row is a student, recruiter, or job seeker for a B2B offer |

Write `fit` and `fit_reason` (one sentence that names the columns). Drop `low`. If headlines or company names are messy, run "Social Headline Cleaner" and "Company Name Cleaner" first. Show the user the counts per tier and 3 sample rows per tier before you enrich.

Done when: `qualified.csv` has `fit` and `fit_reason` on every row, and the user saw the tier counts.

### 4. Enrich

Desktop 1.1.4 email sources, in order. Stop for a row at the first source that returns an email.

1. 1st-degree LinkedIn connections: "LinkedIn Profile Scraper" returns `emailAddressPersonal` or `emailPrimary` for people who share an email with connections.
2. Small companies with a website: "Website Email And Social Links Scraper" on the company site. Mostly role inboxes.
3. Slack rows: the `email` column from Slack People Search Export.

There is no name-plus-domain email finder and no verifier in Desktop 1.1.4. If the user needs coverage beyond this, export the CSV for their own finder or verifier, and say so before step 4 starts.

Done when: every row has `email` and `email_status` (`shared by person`, `role inbox`, `unknown`), or `email` is empty.

### 5. Deliver

- CSV: the lead list format in texau-operator/references/report-formats.md. Keep `source`, `source_run_id`, `signal`, `fit`, `fit_reason`.
- CRM or sequencer: Desktop 1.1.4 has no CRM or sequencer automations. Write a CSV with the column names the target tool imports (HubSpot: First Name, Last Name, Email, Company Name, LinkedIn URL). Name the file `<tool>-import.csv`.
- LinkedIn outreach: hand `qualified.csv` to linkedin-outreach. It uses `signal` in the note.

Done when: the chat report gives kept and dropped counts per stage and the email source split.

## Named mistakes

| Mistake | Do instead |
|---|---|
| Broad search with no trigger | Ask for one trigger. A list with no reason to talk gets no replies. |
| Enriching before scoring | Score first. Enrich `high` and `medium` only. |
| Profile Scraper on 2nd-degree people for email | It returns email only for 1st-degree connections who share it |
| Promising verified emails | Desktop has no verifier. Say so. |
| Losing `signal` and `fit_reason` | The copy writer needs both |
| Bulk messages to Slack members | Use the rows for outreach on other channels |
