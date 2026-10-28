---
name: lead-gen-expert
description: Use when the user asks TexAu Desktop for leads, a prospect list, enriched contacts, or a prospecting campaign without naming one platform. Also use for email finding and CRM or sequencer hand-off.
---

# Lead generation with TexAu

**REQUIRED:** Follow texau-operator. Hand off to linkedin-specialist, local-maps-leads, reddit-specialist, or google-web-research for the sourcing step.

## Overview

A lead list has four stages: source, qualify, enrich, deliver. Most bad lists skip qualify and pay for enrichment on rows that never had a chance.

## 1. Pin down the ICP

Ask for anything missing. Do not guess these.

- Who buys: title or role, seniority
- Which companies: industry, size, location, and any trigger (hiring, funding, new leader, uses tool X)
- What counts as done: row count, required fields (email, phone, LinkedIn URL), where the list goes

## 2. Pick the source by trigger

| Trigger or ICP | Source skill |
|---|---|
| B2B roles at companies of a size | linkedin-specialist (Sales Navigator search) |
| Engaged with a post, event, group | linkedin-specialist |
| Local or SMB businesses | local-maps-leads |
| People asking for a solution in public | reddit-specialist |
| Companies using a tech, running ads, with a site feature | google-web-research |
| Funded companies | Crunchbase Company Funding Scraper, then linkedin-specialist for people |
| Product launches | Product Hunt Launch Archive Export, Product Hunt Founder Scraper |
| Developers | GitHub Contributors Export, GitHub User Search Export |

## 3. Qualify before you enrich

Score each row with the columns you already have. Keep a `reason` column with the trigger in plain words. Show the user the kept and dropped counts.

## 4. Email waterfall

Run finders in order on rows that still have no email. Stop for a row as soon as one finder returns an address.

1. For small companies with a domain: Website Email Scraper
2. Hunter (email finder by name plus domain)
3. Snov or Datagma
4. Verify every found email ("Email Verifier", "Hunter - Verify Email", "Verify Email Using ClearOut"). Keep `valid`. Put `catch-all` in its own column.

Finders and CRMs need the user's own API key. Before step 2, run `list_automations` and ask which finders the user has. If no finder automation is in the list, tell the user that this desktop build has none.

## 5. Deliver

- CSV: write the file and report the row count.
- CRM: HubSpot, Pipedrive, Close CRM, GoHighLevel, ActiveCampaign automations.
- Sequencer: Instantly, Lemlist, Reply, Mailshake, Snov automations.
- LinkedIn sequence: linkedin-outreach.

Before a CRM or sequencer push, preview with 5 rows and show the user the field mapping.

## Common mistakes

- Starting with a broad search and no trigger. The list is big and nobody replies.
- Pushing catch-all emails into a sequencer without a label.
- Losing the `reason` column. The copy writer needs it.

## Deliverable

Deliver the lead list CSV from texau-operator/references/report-formats.md, with `source`, `source_run_id`, `signal`, `fit`, and `fit_reason` filled. Done when the chat report gives kept and dropped counts and the email status split.
