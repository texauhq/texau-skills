---
name: market-research
description: Use when the user wants market research or competitor analysis from TexAu Desktop data. Covers competitive briefs, ICP definition, customer quotes, pricing comparisons, and market maps.
---

# Market research with TexAu

**REQUIRED:** Follow texau-operator. Use reddit-specialist for Reddit and google-web-research for websites.

## Overview

Research answers one question the user will act on. Write that question down first. Collect only the data that answers it, and cite every claim to a row or a URL.

## Pick the method by question

| Question | Data | Automations |
|---|---|---|
| Who are the players? | Search results, Product Hunt, Crunchbase, LinkedIn company search | Google Search Results Extractor, Product Hunt Topic Search Export, Crunchbase Company Scraper, LinkedIn Company Search Export |
| How big and how fast is each? | Headcount, funding, open roles | LinkedIn Company Scraper, Crunchbase Company Funding Scraper, LinkedIn Job Search Export |
| What do buyers complain about? | Reddit posts, Google reviews, YouTube comments | reddit-specialist, Google Maps Reviews Extractor, YouTube Comment Scraper |
| How does each one sell? | Home and pricing pages, ads | Website Metadata Extractor, Website Screenshot Generator, LinkedIn Ads Library Export |
| What do they say in public? | Company posts, founder posts, tweets | LinkedIn Company Activity Extractor, LinkedIn Profile Posts Export, Twitter Profile Tweets Export |
| Who is the ICP? | The user's customers and engaged audience | LinkedIn Connections Export, LinkedIn Post Likers Export, then group by title, industry, size |

Resolve each name with `list_automations` before use.

## Output: the brief

1. The question, in one sentence.
2. The answer, in three sentences or fewer.
3. A table, one row per competitor or segment, with the same columns for every row.
4. Evidence: quotes and numbers, each with its source URL or run id.
5. Gaps: what the data cannot show, and the sample size behind each number.

## Rules

- Same time window and same source for every competitor in one comparison.
- Report counts with the sample size ("31 of 120 posts").
- Mark estimates as estimates. Headcount from LinkedIn is an estimate.
- Keep raw runs. Put the run ids in the brief so the user can open them in TexAu.

## Common mistakes

- Collecting everything about every competitor, then looking for a story.
- Comparing a competitor's Reddit sentiment with another's G2 reviews.
- Quoting a single angry post as a trend.
