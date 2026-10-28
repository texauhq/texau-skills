---
name: agency-client-acquisition
description: Use when an agency user wants to find and pitch new clients through TexAu Desktop. Agencies include web design, SEO, paid ads, social media, lead gen, and automation. Covers prospect audits and "permissionless value" outreach.
---

# Agency client acquisition

**REQUIRED:** texau-operator. Source with local-maps-leads, google-web-research, or linkedin-specialist. Send on LinkedIn with linkedin-outreach. For email, deliver a CSV for the user's own sender.

Agencies win with proof that the prospect has a specific problem the agency fixes. Every lead needs one observed problem, stored as a value. Every first message names that problem and offers one small free finding.

## Pick the playbook by service

| Service | Find prospects | Observed problem (field and value) | Opener |
|---|---|---|---|
| Web design | Google Maps Search Export by category and area | `websiteUrl` empty, or technographic `cms` shows an old builder | "Your Maps listing gets calls, but there is no site to send searchers to." |
| Local SEO | Google Maps Search Export | `isClaimed` false, or `reviewsCount` below the top 3 in the same search | Their review count next to the top 3 in their area |
| SEO | google-web-research domains | Website Metadata Extractor: missing title or description. Schema Extractor: no `LocalBusiness` or `Organization` schema. | The missing tag and one competitor that has it |
| Paid ads | Maps `websiteUrl` or google-web-research domains | Technographic `advertising` empty | "No ads tag found on <domain>, so visitors who leave cannot be retargeted." |
| Booking or CRM setup | Maps or domains | Technographic `scheduling` or `crm` empty | "Bookings on <domain> go through a phone call only." |
| Reputation | Maps, then Google Maps Reviews Scraper on the shortlist | `averageRatings` under 4.0, or 2+ recent reviews naming the same issue | The issue, quoted from a review, with the date |
| Social media | LinkedIn Company Activity Extractor on company pages | Last `postDate` older than 60 days | The date of the last post |
| Lead gen or automation | LinkedIn Job Search Export | Hiring SDRs, BDRs, or ops coordinators | The role they are hiring for |
| Recruiting | LinkedIn Job Search Export, LinkedIn Job Scraper | Same role posted 30+ days ago | The role and how long it is open |

## Stages

### 1. Brief

Ask for the service, the niche, the area, and the monthly deal size. The service row above is the qualifier. Do not ask for it again.

Research depth by monthly deal size:

| Deal size | Per lead |
|---|---|
| under $1,000 | The evidence value only |
| $1,000 to $5,000 | Evidence plus one competitor comparison from the same search |
| over $5,000 | Evidence, comparison, and a mini audit: two numbers and one fix |

Done when: the qualifier is a rule on a named field.

### 2. Source and qualify

Size the source backwards from the target (local-maps-leads has the yields). Run the source, then the one automation the qualifier needs, on the rows left after cheap filters. A business that is closed or tiny is not a prospect: drop `isOpen` false and `reviewsCount` under 5 first.

Done when: every kept row has `evidence`, for example "advertising: none found on 2026-10-28".

### 3. Find the decision maker

- Local business: look for the owner name on the website. The `markdownOutput` of Website Email And Social Links Scraper often names the owner. Else use `liLinks` and LinkedIn Company Employees Export with `keyword` = owner, founder, or director.
- B2B: LinkedIn Company Employees Export with `keyword` = the buyer title for this service (marketing, growth, ops).
- No name found: greet the team by the business name.

### 4. Write and deliver

1. Write `opener` per row from `evidence`. Show 3 samples, one per evidence type.
2. If the user only wants drafts, deliver them as a CSV column and send nothing.
3. For LinkedIn sends, hand the CSV to linkedin-outreach.
4. For email, deliver the CSV with `email`, `email_status`, `opener` for the user's sender. Desktop has no email sender or verifier.

## Deliver

The lead list CSV in texau-operator/references/report-formats.md, plus `evidence` and `opener`. A lead without `evidence` is dropped.

## Named mistakes

| Mistake | Do instead |
|---|---|
| "We help businesses grow" copy | Name the observed problem with its value |
| Pitching a closed or tiny business | Filter `isOpen` and `reviewsCount` first |
| Sending the full audit cold | One finding, offer the rest |
| "You have no tracking" as a fact | "No ads tag found." Tag managers can hide tags. |
| A review quote without a date | Quote with the date, and only reviews from the last 90 days |
