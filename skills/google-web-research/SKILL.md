---
name: google-web-research
description: Use when the user wants Google search results, company websites, domains, emails from websites, tech stack, tracking pixels, site metadata, or screenshots through TexAu Desktop. Also use to find companies by what their site uses.
---

# Google search and website intelligence

**REQUIRED:** Follow texau-operator.

## Overview

Google finds the companies. The website tells you what they use and who to contact. Run search first, clean to one row per domain, then run the website automations on the domains.

## Automations

Resolve each name with `list_automations`.

- Search: "Google Search Results Extractor"
- Domain lookup: "Company Website Finder" (company name to domain)
- Website: "Website Email Scraper", "Website Technographic Data Finder", "Website Tracking Pixel Extractor", "Website Metadata Extractor", "Website Schema Extractor", "Website Screenshot Generator"

## Playbooks

| Goal | Steps |
|---|---|
| Companies that use a tool | Search for the tool's footprint, for example `"powered by Shopify" <niche>`. Get domains. Run the technographic finder to confirm the tool. |
| Sites with no ads tracking | Domains from search or Maps. Run the pixel extractor. Keep sites with no Meta or Google Ads pixel. |
| Directory and list pages | Search `"top 10 <category> <city>"` or `site:<directory> <category>`. Pull domains from the results. |
| Company list to domains | Company Website Finder on a CSV of names. Mark rows where the match is unclear. |
| Contact emails | Website Email Scraper on the domains. Prefer named people over `info@`. |
| Competitor page snapshot | Metadata, schema, and a screenshot of the competitor home and pricing pages. |
| SEO and AEO audit inputs | Metadata and schema extractors on the user's pages and 3 competitors. Compare titles, descriptions, and schema types. |

## Search query rules

- One intent per query. Split "agencies in London or Paris" into two queries.
- Write the queries to a CSV and run them as one batch.
- Remove duplicate domains across queries before you run the website steps.

## Common mistakes

- Running website automations on Google result URLs that are directories, social profiles, or news sites. Filter those domains out first.
- Treating a footprint search hit as proof. Confirm with the technographic finder.
- Calling a tech list complete. Detection misses tools that load late or run server-side.
