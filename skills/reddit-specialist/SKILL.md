---
name: reddit-specialist
description: Use when the user wants Reddit research next to a TexAu workflow. Covers subreddit research, pain points, people asking for a tool, brand or competitor mentions, and customer language for copy.
---

# Reddit research

**REQUIRED:** texau-operator.

TexAu Desktop 1.2.0 has five Reddit automations. All five read. None of them post, comment, or vote. Call `list_automations` and use the names below. This skill never drafts replies for the user to post at scale. Reddit bans accounts for promotion.

`requiresAccount` is false on all five. The cookie platform is `reddit`. If a run fails because Reddit cookies are missing, ask the user to connect Reddit in TexAu. Then run it again.

## Automations

| Goal | Automation | Input |
|---|---|---|
| Find subreddits | "Reddit Communities Search Export" | `keywords` is required. `maxCount` is optional (max 500). The day limit is 50. |
| Posts for a keyword | "Reddit Posts Search Export" | `redSearchUrl` is required (keyword, search URL, or subreddit URL). Optional: `subReddit`, `sort`, `timeRange`, `safeSearch`, `restrictSubreddit`, `maxCount` (max 500). Search often stops near 250. |
| Posts in one subreddit | "Reddit Subreddit Posts Export" | `subRedditUrl` is required (URL or name). Optional: `sort`, `maxCount` (max 500). |
| Front-page trends | "Reddit Trends Export" | Optional: `locationFilter` (Hot sort only), `sortBy`. |
| People | "Reddit User Search Export" | `keyword` is required (handle, keyword, or search URL). `maxCount` is optional (max 100). |

This build has no Reddit comment export. For comments on one thread, use the public JSON URL in the fallback section.

Result rows use the output label as the column name. Keep `Post URL`, `SubReddit Name`, `Post Title`, `Profile Handle`, `Upvotes Count`, `Comments Count`, `Post Date`, and `Post Content`.

## Stages

### 1. Audience

Run "Reddit Communities Search Export" for the topic. Keep communities with posts in the last 30 days. Show `SubReddit Name`, `SubReddit URL`, `Subscribers Count`, and `Public Description`. Do not mix audiences (founders and students) in one count.

Done when: the user agrees on the subreddit list, or says "use your list".

### 2. Collect

| Goal | Run |
|---|---|
| Pain points | "Reddit Subreddit Posts Export" on each agreed subreddit, sort Top. Also "Reddit Posts Search Export" for "frustrated", "hate", "problem with", and "<category> sucks". |
| Solution requests (leads) | "Reddit Posts Search Export" for "recommend", "alternative to", "looking for a tool", "anyone use", and "what do you use for", plus the category. |
| Brand and competitor mentions | "Reddit Posts Search Export" for each brand name, in quotes. |
| Money talk | "Reddit Posts Search Export" for "pricing", "worth it", "too expensive", and "cancelled", plus the category. |

Save the rows to `reddit_posts.csv`. If a run hits `maxCount`, say that the list is cut off.

Done when: the CSV exists and each query's row count is reported.

### 3. Label

One label per post: solution request, pain or anger, advice request, money talk, idea, opportunity, other. Count by label, per subreddit. Quote the 3 strongest posts per label, with links.

### 4. Turn it into action

- Copy: list the exact phrases people use for the problem. These go into landing page, ad, and outreach copy.
- Leads: Reddit usernames are not contact data. For solution requests, record the company or role that the poster states. If the post names none, leave the company empty. Then find the company with linkedin-specialist or google-web-research. Never try to unmask an anonymous user.
- Competitors: compare mention counts and the share of negative posts per brand, over the same window.

## Fallback for an older build

If `list_automations` returns no Reddit automation, say so once. Then read public Reddit JSON with the assistant's web fetch tool.

| Need | URL |
|---|---|
| Search one subreddit | `https://www.reddit.com/r/<sub>/search.json?q=<query>&restrict_sr=1&sort=new&t=year&limit=100` |
| Search all of Reddit | `https://www.reddit.com/search.json?q=<query>&sort=relevance&t=year&limit=100` |
| Top posts of a subreddit | `https://www.reddit.com/r/<sub>/top.json?t=year&limit=100` |
| A thread with comments | `https://www.reddit.com/r/<sub>/comments/<id>.json` |
| Find subreddits | `https://www.reddit.com/subreddits/search.json?q=<topic>&limit=25` |

Fetch slowly, one request every few seconds. If Reddit blocks the request, tell the user. Then offer the web search tool with `site:reddit.com <query>`.

## Deliver

The research brief in texau-operator/references/report-formats.md, plus `reddit_posts.csv` with a `label` and `quote` column.

## Named mistakes

| Mistake | Do instead |
|---|---|
| Saying this build has no Reddit export | Call `list_automations`. Desktop 1.2.0 has the five automations above. |
| Drafting promotional replies for the user to post | Read only. Suggest the user join threads manually where they can help. |
| Treating upvotes as volume | Count posts and distinct authors |
| One angry post quoted as a trend | Report counts with the sample size |
| Profiling a private person from their comment history | Only aggregate patterns, no personal dossiers |
| Using a Reddit username as contact data | Record only a company or role that the post itself states |
