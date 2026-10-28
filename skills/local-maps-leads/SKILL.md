---
name: local-maps-leads
description: Use when the user wants local business leads, Google Maps or Google My Business data, or reviews through TexAu Desktop. Covers "find dentists in Austin", "businesses without a website", review mining, and contact data for local businesses.
---

# Local business leads from Google Maps

**REQUIRED:** texau-operator. Its stages, approval rules, and report formats apply here.

One Google Maps search returns at most 80 places. Coverage comes from a grid: category terms crossed with neighborhoods or ZIP codes. Then you clean, qualify on the Maps fields, enrich from the website, and deliver.

## Automations

From texau-operator/references/desktop-catalog.md. None of them needs an account.

| Automation | Input | Use it for | Key outputs |
|---|---|---|---|
| Google Maps Search Export | `search` (text query or Maps search URL), `maxCount` (max 80) | The grid | `companyName`, `placeId`, `mapsUrl`, `websiteUrl`, `Phone`, `averageRatings`, `reviewsCount`, `isOpen`, `isClaimed`, `companyLocationAddress` |
| Google My Business Scraper | `search`, `location` (select), `maxCount` | Adds `category` and `summary` | same plus `category` |
| Google Maps Reviews Scraper | `mapsPlaceUrl`, `maxCount` (max 300) | Review mining on a shortlist | `fullName`, `reviewText`, `rating`, `placeReviewDate` |
| Website Email And Social Links Scraper | `companyWebsiteUrl`, `crawlDepth` | Emails, phones, social links | `email`, `phones`, `fbLinks`, `igLinks`, `liLinks` |
| Website Technographic Data Finder | `siteUrl` | Ads, analytics, CMS, booking tools | `advertising`, `analytics`, `cms`, `ecommerce`, `scheduling`, `buyingSignals` |
| Google Business Name Cleaner | `googleBusinessName` | Clean names for copy | the cleaned name |

TexAu Desktop 1.1.4 has no email verifier and no name-plus-domain email finder. If the user asks for verified emails, say so.

## Stages

### 1. Brief

Ask in one message, with defaults:

- Business type and area ("dentists, Chicago city limits")
- What makes a good lead. If another skill set it (agency-client-acquisition does), do not ask.
- Target count and the fields the user needs (email, phone, website)
- Whether a company inbox (`info@`) counts as an email. Default: yes, labeled `role inbox`.

Done when: you can write the qualifier as a rule on named fields, for example `websiteUrl` empty, or `reviewsCount` under 20.

### 2. Size the grid

Work backwards from the target. Use these planning yields until the first wave shows real numbers:

| Step | Keeps about |
|---|---|
| Duplicates and closed places removed | 80% of raw rows |
| A site-based qualifier (no ads, old CMS) | 50% |
| A Maps-field qualifier (few reviews, no website) | 30 to 50% |
| Website has a findable email | 45% |

For 100 leads with email and one site qualifier: 100 / 0.45 / 0.5 / 0.8 = about 560 raw rows, so at least 7 full searches of 80. Plan 1.5 times that, about 11 searches, because dense areas repeat places.

Build searches as `<synonym> <neighborhood or ZIP> <city>`. Use 2 to 4 synonyms per category ("dentist", "dental clinic", "family dentist"). Split a big city into neighborhoods or ZIP codes. A metro area needs 20 to 60 searches. A whole state needs its top 10 to 15 metros.

Write the grid to `grid.csv` with a `search` column and `maxCount` 80. Run a first wave of a third of the rows.

Done when: the first wave has run and you know the real duplicate rate and qualifier yield.

### 3. Run and clean

1. `run_batch` with `csvPath` = grid. Confirm it yourself (it only reads).
2. Page all results to `maps_raw.csv`.
3. Remove duplicates by `placeId`, then `Phone`, then `companyName` plus `companyLocationAddress`.
4. Drop rows with `isOpen` false.
5. If the yield is short of the target, add grid rows and run again. Report how many searches you added.

Done when: `maps_clean.csv` exists and its row count is reported against raw.

### 4. Qualify

Apply the Maps-field rule first. Then, only for rows that pass, run the website automation the rule needs. Keep the evidence as a value, not a yes or no: "no `advertising` found", "31 reviews, 3.6 average".

| Qualifier | Field | Pitch it supports |
|---|---|---|
| No website | `websiteUrl` empty | Web design |
| Few reviews or low rating | `reviewsCount` under 20, or `averageRatings` under 4.0 | Reputation, review generation |
| Listing not claimed | `isClaimed` false | Local SEO, listing management |
| No ads tag found | technographic `advertising` empty | Paid ads. Tag managers can hide tags, so say "no ads tag found". |
| No booking tool | technographic `scheduling` empty | Online booking |
| Old or no CMS | technographic `cms` | Redesign |
| Recent complaints | Reviews Scraper `reviewText` with the same issue twice in 90 days | Operations, the review as the opener |

Done when: every kept row has a `signal` with the value that qualified it.

### 5. Contacts

Run "Website Email And Social Links Scraper" on kept rows that have a `websiteUrl`. Use `crawlDepth` at its lowest level first. Raise it only for rows with no email.

- Prefer a named inbox (`dr.patel@`) over a role inbox (`info@`). Label role inboxes in `email_status` as `role inbox`.
- `email_status` is `unknown` for every other email, because Desktop has no verifier. Tell the user to run the emails through their own email verifier before a cold email send.
- Keep `liLinks` and `fbLinks`. linkedin-specialist can find the owner from `liLinks`.

Done when: each kept row has an email, a phone, or a social link, or is marked `no contact`.

### 6. Deliver

Use the lead list CSV in texau-operator/references/report-formats.md, with the business columns. Report: searches run, raw rows, after cleaning, after qualifying, with email, with phone only.

## Named mistakes

| Mistake | Do instead |
|---|---|
| One search for a whole city | A grid by neighborhood or ZIP |
| `maxCount` above 80 | 80 is the cap per search |
| Enriching every row before qualifying | Maps-field rule first, then website automations on the rest |
| Calling an email "verified" | Desktop has no verifier. `email_status` is `unknown` or `role inbox`. |
| A Maps phone or a contact form treated as an email | Leave `email` empty |
| Reviews for every place | Reviews Scraper on the shortlist only |
| "No ads" as a fact | "No ads tag found" |
