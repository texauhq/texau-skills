---
name: x-twitter-specialist
description: Use when the user wants X (Twitter) data or outreach through TexAu Desktop. Covers followers of a competitor, people talking about a topic, list members, tweet engagers, DMs, follows, replies, and posting.
---

# X (Twitter) sourcing and outreach

**REQUIRED:** texau-operator. Every write here (follow, like, reply, retweet, DM, post) acts as the user and needs the approval brief.

X audiences are open. Anyone's followers, lists, and conversations can be exported. The best X lists come from accounts that follow two or more competitors, and from people who joined a conversation about the problem.

## Automations

From texau-operator/references/desktop-catalog.md. All need a connected X account.

| Job | Automation | Key input |
|---|---|---|
| Followers or following of any account | Twitter Followers/Following Export | `twExtractionMode` (select: Followers or Following), `twProfileUrl`, `maxCount` |
| Search tweets | Twitter Search Extractor | `twAdvancedSearchUrl` (an x.com/search URL), `category`, `maxCountTwitterSearch` |
| Search lists by keyword | Twitter List Search Export | `searchKeyword` |
| List members or subscribers | Twitter List Members Export, Twitter List Subscribers Export | `twListUrl` |
| Engagers of one tweet | Twitter Retweet List Extractor, Twitter Quote Retweets Export, Twitter Thread Export | `twPostUrl` |
| Profile detail | Twitter Profile Scraper | `twProfileUrl` |
| A profile's tweets | Twitter Profile Tweets Export, Twitter Profile Tweets and Replies Export | `twProfileUrl` |
| Writes | Twitter Auto Follow, Twitter Auto Like, Twitter Auto Reply, Twitter Auto Retweet, Twitter Auto Message, Twitter Auto Post | see `describe_automation` |
| The user's own data | Twitter Inbox Scraper, Twitter Direct Messages Export, Twitter Bookmarks Export, Twitter Home Timeline Export, Twitter Impressions Export | |

Desktop 1.1.4 has no tweet likers export. Retweeters and quote tweeters are the closest engagers.

## Playbooks

| Goal | Steps | Done when |
|---|---|---|
| Competitor audience | Followers export on 2 to 5 competitors. Count how many competitors each account follows. Rank by that count, then by bio match. | A ranked CSV with `competitors_followed` |
| Topic conversation | Build an x.com advanced search URL (`"<phrase>" min_faves:5 -filter:replies lang:en`). Run Search Extractor. Keep authors whose `description` matches the ICP. | A CSV of authors with the tweet that qualified them |
| Curated lists | List Search Export on the niche keyword. Members export on the 3 lists with the most subscribers. | A CSV of members with `list_name` |
| Thread joiners | Thread Export on a popular thread about the problem. Keep repliers who match the ICP. | A CSV with the reply text |
| Warm-up then DM | Auto Like one recent tweet. 2 to 3 days later, Auto Follow. DM only accounts with `canDm` true. | Ledger campaign with `like,follow,message1` |

## Outreach rules

- DM only accounts with `canDm` true. The rest get a follow and a reply instead.
- DMs: under 160 characters for the first one, no link, one question about something they posted.
- Replies: add something to the conversation. Never paste a pitch into replies. The user approves each reply text.
- Limits per account, per day: 50 follows, 50 DMs, 100 likes, 30 replies. Use the lower of these and `budget`.
- Record writes in the ledger with campaign steps such as `like,follow,message1`. The ledger counts `message1` against messages and `like` against likes.

## Deliver

The lead list CSV in texau-operator/references/report-formats.md. Put the X URL in `profile_url` and the reason (follows 3 competitors, tweeted about X on date) in `signal`.

## Named mistakes

| Mistake | Do instead |
|---|---|
| Followers of one big account | Overlap of 2 to 5 smaller competitors |
| DM to accounts with `canDm` false | Follow and reply instead |
| Mass identical replies | One approved reply per thread, written for that thread |
| Search URL typed as plain keywords | Build an x.com/search URL with operators |
| Following hundreds in one day | 50 a day, and unfollow manually later |
