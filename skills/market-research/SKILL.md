---
name: market-research
description: Use when the user wants market research or competitor analysis from TexAu Desktop data. Covers competitive briefs, ICP definition, customer quotes, content and audience analysis, pricing comparisons, and market maps.
---

# Market research with TexAu

**REQUIRED:** texau-operator. Use google-web-research for websites, reddit-specialist for Reddit, x-twitter-specialist for X.

Research answers one question the user will act on. Write the question down first. Collect only the data that answers it. Cite every claim to a run id or a URL, and give every number its sample size.

## Pick the method by question

| Question | Data | TexAu automations |
|---|---|---|
| Who are the players? | Search, LinkedIn companies, Sales Navigator accounts | assistant web search, Sales Navigator Account Search Export, LinkedIn Company Scraper |
| How big and how fast is each? | Headcount, open roles, tech spend | LinkedIn Company Scraper, LinkedIn Job Search Export, Website Technographic Data Finder (`companyStage`, `estimatedMonthlyTechSpend`) |
| What do buyers complain about? | Reviews, comments, Reddit | Google Maps Reviews Scraper, YouTube Video Comment Scraper, LinkedIn Comments Scraper, reddit-specialist |
| How does each one sell? | Site, metadata, tools | Website Metadata Extractor, Website Schema Extractor, Website Technographic Data Finder |
| What do they say in public? | Company posts, founder posts, tweets, videos | LinkedIn Company Activity Extractor, LinkedIn Profile Posts Export, Twitter Profile Tweets Export, YouTube Channel Videos Scraper |
| Which content works in this market? | Engagement per post or video | LinkedIn Profile Posts Export, LinkedIn Post Scraper, YouTube Search Export (`viewsCount`), Twitter Search Extractor |
| Who is the audience? | Engagers and followers | LinkedIn Post Likers Export, LinkedIn Comments Scraper, Twitter Followers/Following Export, Slack People Search Export |
| Who is the ICP? | The user's customers and engaged audience | LinkedIn Connections Export or the user's customer CSV, then group by `jobTitle`, industry, size |

Desktop 1.1.4 has no Google search, Crunchbase, or ads library automation. Use the assistant's web tools for those, and mark them as web sources.

## Stages

### 1. Question

Write the question in one sentence, and the decision it informs. Agree on the competitors or segments (3 to 6), the time window (default: last 90 days), and the sources. Use the same window and the same sources for every entity in one comparison.

Done when: the user confirmed the question, the entity list, and the window.

### 2. Collect

Run one automation per question, for every entity. Save each run's rows to a CSV named `<entity>-<source>.csv`. Keep the run ids.

### 3. Analyze

| Analysis | Method |
|---|---|
| Themes in reviews or comments | One label per item. Count per label per entity. Quote the 3 strongest per label, with date and link. |
| Content performance | Median engagement per post type per entity, and the top 5 posts with their hooks |
| Audience overlap | Profiles that engage with 2 or more competitors, by `liProfileUrl` or `twProfileUrl` |
| Positioning | Home page title and description, schema types, pricing page wording, side by side |
| Growth signals | Open roles by function, `companyStage`, tech added |

### 4. Brief

The research brief in texau-operator/references/report-formats.md:

1. The question, in one sentence.
2. The answer, in three sentences or fewer.
3. A table, one row per entity, the same columns for every row.
4. Evidence: quotes and numbers, each with its source URL or run id.
5. Gaps: what the data cannot show, and the sample size behind each number.

## Named mistakes

| Mistake | Do instead |
|---|---|
| Collecting everything, then looking for a story | Question first, then only the data that answers it |
| Different windows or sources per competitor | Same window and source for all |
| One angry review as a trend | Counts with sample sizes |
| LinkedIn headcount as exact | Mark it as an estimate |
| Web sources mixed in without a label | Mark which numbers came from web search, not TexAu |
