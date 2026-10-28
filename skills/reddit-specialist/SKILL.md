---
name: reddit-specialist
description: Use when the user wants Reddit data through TexAu Desktop. Covers subreddit research, pain points, people asking for a tool, brand or keyword mentions, commenters on a thread, or a user's comment history.
---

# Reddit research and social listening

**REQUIRED:** Follow texau-operator.

## Overview

TexAu reads Reddit. It does not post or comment there, and you do not draft auto-replies. Reddit bans accounts for promotion. The value is in what people say: pain, requests, and the words they use.

## Automations

Resolve each name with `list_automations`.

- Subreddits and posts: "Reddit SubReddit Search Export", "SubReddit Posts Search Export", "Reddit Posts Search Export", "Reddit Trends Export"
- People: "Reddit Post Commenters Export", "Reddit User Comments Scraper", "Reddit User Comments Search Export", "Reddit User Search Export"
- Domains: "Reddit Domain Search Export"

## Playbooks

| Goal | Steps |
|---|---|
| Find the audience | Search subreddits by topic. Keep 5 to 15 with real activity. Show the list to the user. |
| Pain-point mining | Pull top and recent posts from those subreddits. Label each post with one theme (below). Count themes. Quote the 3 strongest posts per theme with links. |
| Solution requests (leads) | Search posts for "recommend", "alternative to", "looking for a tool", "anyone use", plus the category. Pull commenters of the best threads. |
| Brand and competitor mentions | Search posts for each brand name. Compare volume and sentiment per brand. |
| Domain mentions | Reddit Domain Search Export on the user's or a competitor's domain. |
| Person research | Reddit User Comments Scraper on one username. Summarize topics. Do not build a profile of a private person beyond what the user needs for the task. |

## Theme labels

Use these labels, after GummySearch: solution request, pain or anger, advice request, money talk, idea, opportunity. One label per post. Add `other` instead of inventing a new one.

## Output

A short report plus a CSV. The report has the theme counts, the top quotes with links, and the exact phrases people use. The phrases become landing page and ad copy. Reddit caps a listing at about 1,000 items. If a search returns that many, tell the user the list is cut off.

## Monitoring

TexAu has no schedule. To monitor, run the same search on request and compare with the last run by post id. Report only new posts.

## Common mistakes

- Drafting promotional replies for the user to post at scale.
- Treating upvotes as volume. Count posts and distinct authors.
- Mixing subreddits with different audiences in one theme count.
