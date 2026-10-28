---
name: reddit-specialist
description: Use when the user wants Reddit research next to a TexAu workflow. Covers subreddit research, pain points, people asking for a tool, brand or competitor mentions, and customer language for copy.
---

# Reddit research

**REQUIRED:** texau-operator for any TexAu step that follows.

TexAu Desktop 1.1.4 has no Reddit automations. Call `list_automations` first, because a newer build can add them. If there are none, do the research with the assistant's own web tools on public Reddit pages, and say so once. This skill only reads. It never posts, comments, votes, or drafts replies for the user to post at scale. Reddit bans accounts for promotion.

## Reading Reddit without TexAu

Public JSON endpoints return the same data as the pages. Fetch them with the assistant's web fetch tool:

| Need | URL |
|---|---|
| Search one subreddit | `https://www.reddit.com/r/<sub>/search.json?q=<query>&restrict_sr=1&sort=new&t=year&limit=100` |
| Search all of Reddit | `https://www.reddit.com/search.json?q=<query>&sort=relevance&t=year&limit=100` |
| Top posts of a subreddit | `https://www.reddit.com/r/<sub>/top.json?t=year&limit=100` |
| A thread with comments | `https://www.reddit.com/r/<sub>/comments/<id>.json` |
| Find subreddits | `https://www.reddit.com/subreddits/search.json?q=<topic>&limit=25` |

Fetch slowly, one request every few seconds. If Reddit blocks the request, tell the user, and offer the web search tool with `site:reddit.com <query>` instead.

## Stages

### 1. Audience

Find 5 to 15 subreddits for the topic. Keep ones with posts in the last 30 days and more than a few comments per post. Show the list with subscriber counts. Do not mix audiences (founders and students) in one count.

Done when: the user agrees on the subreddit list, or says "use your list".

### 2. Collect

| Goal | Query pattern |
|---|---|
| Pain points | Top posts of the year, plus searches for "frustrated", "hate", "problem with", "<category> sucks" |
| Solution requests (leads) | "recommend", "alternative to", "looking for a tool", "anyone use", "what do you use for" + category |
| Brand and competitor mentions | Each brand name, in quotes |
| Money talk | "pricing", "worth it", "too expensive", "cancelled" + category |

Save every post to `reddit_posts.csv` with `postUrl`, `subreddit`, `title`, `author`, `score`, `num_comments`, `createdAt`, `text`. Listings stop at about 1,000 items. If a search hits that, say the list is cut off.

Done when: the CSV exists and each query's row count is reported.

### 3. Label

One label per post: solution request, pain or anger, advice request, money talk, idea, opportunity, other. Count by label, per subreddit. Quote the 3 strongest posts per label, with links.

### 4. Turn it into action

- Copy: list the exact phrases people use for the problem. These go into landing page, ad, and outreach copy.
- Leads: Reddit usernames are not contact data. For solution requests, record the company or role that the poster states. Leave it empty if the post names none. Then find the company with linkedin-specialist or google-web-research. Never try to unmask an anonymous user.
- Competitors: compare mention counts and the share of negative posts per brand, over the same window.

## Deliver

The research brief in texau-operator/references/report-formats.md, plus `reddit_posts.csv` with a `label` and `quote` column.

## Named mistakes

| Mistake | Do instead |
|---|---|
| Drafting promotional replies for the user to post | Read only. Suggest the user join threads manually where they can help. |
| Treating upvotes as volume | Count posts and distinct authors |
| One angry post quoted as a trend | Report counts with the sample size |
| Profiling a private person from their comment history | Only aggregate patterns, no personal dossiers |
| Claiming TexAu scraped Reddit | Say the assistant's web tools read public pages |
