---
name: local-maps-leads
description: Use when the user wants local business leads, Google Maps or Google My Business data, or reviews through TexAu Desktop. Covers "find dentists in Austin", "businesses without a website", and review mining.
---

# Local business leads from Google Maps

**REQUIRED:** Follow texau-operator.

## Overview

One Maps search returns a limited number of places. Coverage comes from a grid: every category term crossed with every city or neighborhood. Then you clean, enrich from the website, and qualify.

## Automations

Resolve each name with `list_automations`.

- Maps: "Google Maps Extractor", "Google Maps Reviews Extractor", "Google My Business Export"
- Websites: "Website Email Scraper", "Website Technographic Data Finder", "Website Tracking Pixel Extractor", "Company Website Finder"
- Email verifiers: "Email Verifier", "Hunter - Verify Email", "Verify Email Using ClearOut", Verifybee. The Never Bounce automation only tests an API key.

## Pipeline

1. Ask for the business type and the area. If no other skill already set the qualifier, ask what makes a good lead. Examples are no website, few reviews, a low rating, no ads pixel, or a specific tech.
   Also ask whether `catch-all` emails count toward the target. The default is no.
2. Size the grid from the target backwards. Plan on these yields until the first wave shows real ones: about 45% of sites give an email, about 70% of found emails are valid, and each extra qualifier keeps about half. 100 valid emails with one site qualifier needs about 650 sites, so about 1,000 to 1,300 raw Maps rows. Run a first wave of about a third of the grid, measure, then add rows.
   Build the grid. Use 2 to 4 synonyms per category ("dentist", "dental clinic", "orthodontist") and split big cities into neighborhoods or ZIP codes. Write the grid to a CSV, one search per row, and run it with `run_batch` and `csvPath`.
3. Clean. Remove duplicates by place id, else by phone, else by name plus address. Drop rows that are closed.
4. Pre-filter with the fields the Maps run returned (website empty, rating, review count, category). A review floor of about 15 drops tiny and inactive shops.
5. If the qualifier needs the website (pixel, tech), run that finder next and filter again.
6. Run Website Email Scraper only on the rows still kept.
7. Verify emails. Keep `valid`, keep `catch-all` in a separate column, drop `invalid`.
8. Deliver a CSV with: name, category, address, phone, website, rating, reviews, email, email status, and the qualifying reason.

## Lead qualifiers that sell

| Qualifier | Pitch it supports |
|---|---|
| Website empty | Web design |
| Rating under 4.0 or fewer than 20 reviews | Reputation and review generation |
| No Google Ads tag (`AW-` id) for a Google Ads pitch, no Meta pixel for a Meta pitch | Paid ads. Tags loaded through Google Tag Manager can hide from the extractor. Say "no tag found", not "no tracking". |
| Old site tech or no mobile meta tags | Redesign, SEO |
| Recent negative reviews about the same issue | Operations consulting, the review quote as an opener |

Review mining: run Google Maps Reviews Extractor on the shortlist only. Reviews are heavy.

## Common mistakes

- One search for a whole metro area. You get the top results and miss most businesses.
- Enriching every row before qualifying. Most rows get dropped anyway.
- Treating a Maps phone or a contact form as an email. Mark the email column empty.
- Cold email to a catch-all address without telling the user the bounce risk.

## Deliverable

Deliver the lead list CSV from texau-operator/references/report-formats.md, with the business columns and the qualifying reason in `signal`. Done when the chat report gives the grid size, raw rows, kept rows, and the email status split.
