---
name: google-web-research
description: Use when the user wants website data through TexAu Desktop: emails, social links, tech stack, ad tools, metadata, or schema. Also use to find companies by what their site uses, and for Google search steps in a TexAu workflow.
---

# Website intelligence and search

**REQUIRED:** texau-operator.

TexAu Desktop reads websites well: emails, phones, social links, 30+ technology categories, metadata, and schema. It has no Google search automation. For the search step, use the assistant's own web search tool, then pass the domains to TexAu.

## Automations

| Automation | Input | Key outputs |
|---|---|---|
| Website Email And Social Links Scraper | `companyWebsiteUrl`, `crawlDepth` | `email`, `phones`, `liLinks`, `twLinks`, `fbLinks`, `igLinks`, `ytLinks`, `markdownOutput` |
| Website Technographic Data Finder | `siteUrl` | `technologies`, `cms`, `ecommerce`, `advertising`, `analytics`, `crm`, `marketingAutomation`, `liveChat`, `scheduling`, `payments`, `companyStage`, `estimatedMonthlyTechSpend`, `buyingSignals` |
| Website Metadata Extractor | `siteUrl` | title, description, Open Graph fields |
| Website Schema Extractor | `siteUrl` | JSON-LD schema types |
| Company Name Cleaner | `companyName` | a clean company name for copy |

None of them needs an account. Each takes one URL per row, so pass a CSV of domains with `csvPath`.

## Stages

### 1. Get domains

| Starting point | How |
|---|---|
| The user has a CSV of companies with websites | Use it |
| A list of company names without websites | The assistant's web search, one query per name. Mark unclear matches in `notes`. |
| Companies that use a tool | The assistant's web search for the tool's footprint, for example `"powered by Shopify" <niche>` or `"cdn.shopify.com" <niche>` |
| Local businesses | local-maps-leads gives `websiteUrl` |
| LinkedIn companies | LinkedIn Company Scraper gives the website |
| X or YouTube creators | Their bio links (`bioLinks`, channel links) |

Say once that the search step uses the assistant's web search, not TexAu. Remove duplicate domains. Drop directories, social sites, marketplaces, and news sites (yelp.com, linkedin.com, facebook.com, amazon.com, medium.com).

Done when: `domains.csv` has one row per root domain, with a `siteUrl` column.

### 2. Read the sites

Run the automation each question needs. Do not run all four by default.

| Question | Automation | Rule |
|---|---|---|
| Who do I email? | Website Email And Social Links Scraper | Prefer named inboxes over `info@` |
| Do they run ads? | Technographic | `advertising` empty means "no ads tag found" |
| What do they sell with? | Technographic | `ecommerce`, `payments`, `cms` |
| Are they growing? | Technographic | `companyStage`, `estimatedMonthlyTechSpend`, `buyingSignals` |
| Is their SEO basic? | Metadata, Schema | Missing title or description, no schema |

Done when: each row has the columns its question needs, and failures are listed with the URL.

### 3. Deliver

The lead list CSV in texau-operator/references/report-formats.md, one row per domain. Put the finding that qualified the row in `signal`, with the value ("uses Shopify, no ads tag found").

## Common playbooks

| Goal | Chain |
|---|---|
| Tech stack displacement | footprint search > Technographic (confirm the tool) > Email And Social Links |
| E-commerce with no ads | footprint search for the store platform > Technographic, keep `advertising` empty > Email And Social Links |
| Competitor teardown | Metadata + Schema + Technographic on the competitor and the user's own site, side by side |
| SEO and AEO gaps | Metadata + Schema on the user's top pages and 3 competitors. Compare titles, descriptions, schema types. |

## Named mistakes

| Mistake | Do instead |
|---|---|
| Running website automations on directory or social URLs | Filter those domains first |
| A footprint search hit treated as proof | Confirm with the technographic finder |
| "They have no analytics" as a fact | Detection misses server-side and late-loading tools. Say "not detected". |
| All four automations on every row | Only the one each question needs |
| Hiding that search came from the web | Say the search step used the assistant's web search |
