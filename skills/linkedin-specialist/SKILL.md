---
name: linkedin-specialist
description: Use when the user wants to find, scrape, or research people, companies, posts, or jobs on LinkedIn, Sales Navigator, or LinkedIn Recruiter through TexAu Desktop. Also use for building a LinkedIn audience or lead list.
---

# LinkedIn and Sales Navigator sourcing

**REQUIRED:** texau-operator. For invites and messages, hand the list to linkedin-outreach.

Every good LinkedIn list starts from a signal: someone engaged, follows, works at, studied at, or is hiring. Pick the source by the signal. Plain search comes last because it carries no intent.

## Source by signal

All names are in texau-operator/references/desktop-catalog.md.

| The user wants | Start with (key input) | Then |
|---|---|---|
| Warm leads from the user's posts | LinkedIn Profile Posts Export (`liProfileUrl` = the user), then LinkedIn Post Likers Export + LinkedIn Comments Scraper (`liPostUrl`) | Filter by `headline`, `jobTitle` |
| A competitor's or creator's audience | Same chain on their profile, or LinkedIn Company Activity Extractor (`liCompanyUrl`, `mode` = All) for a company page | Drop the user's existing connections (`connectionDegree` = 1st) |
| Viral post spread | LinkedIn Reposters Export (`liPostUrl`) | Reposters are more engaged than likers |
| People at named accounts | LinkedIn Company Employees Export (`liCompanyUrl`, `keyword` = title) | LinkedIn Profile Scraper only for rows that pass the title filter |
| Companies that are hiring | LinkedIn Job Search Export (`liJobSearchUrl`) | LinkedIn Company Employees Export for the hiring manager |
| Alumni of a school | LinkedIn Alumni Search Export (`liSchoolUrl`, `keyword`, `startYear`, `endYear`) | Note names the school |
| Title and filter search | Sales Navigator Lead Search Export (`snLeadSearchUrl` takes a Sales Navigator search URL or a keyword) | Needs `salesNavigator: true` |
| Account lists | Sales Navigator Account Search Export, Sales Navigator Account List Export | LinkedIn Company Lead Search Export per account |
| Recruiting | LinkedIn Recruiter Search Export (`reSearchUrl`) | Needs `recruiter: true` |
| The user's own network | LinkedIn Connections Export (`filterDate`), LinkedIn Followers Export, LinkedIn Received Connection Extractor | Segment by `jobTitle`, `companyName` |
| Mutual connections for a warm intro | LinkedIn Mutual Connections Export (`liProfileUrl` = the target) | List intros for the user to ask |

Desktop 1.1.4 has no people search export without Sales Navigator, no group members, and no event attendees. LinkedIn Event Scraper reads one event's details and host, not its attendees. If a user without Sales Navigator asks for a search, offer post engagers, company employees, or alumni instead.

## Search URLs and limits

- Search exports take a URL. Ask the user to build the search in Sales Navigator or LinkedIn and paste the URL. Do not build filter URLs by hand. The parameters change.
- Sales Navigator Lead Search Export stops at 2,500 results per search. For more, split by location, seniority, company size, or function. One search URL per row in a CSV.
- If the URL came from someone else's account, set `rejectPrivateFilters` to true. Private filters (lead lists, "viewed") do not carry over.
- `isInvitePending` in Sales Navigator results marks people with a pending invite. Drop them before linkedin-outreach.

## Shape the output

1. Merge sources. Remove duplicates by `liProfileUrl`. When it is empty, use "LinkedIn Universal Profile Converter" to turn `snProfileUrl` into `liProfileUrl`.
2. Keep the first source per person in `source`, and write `signal`, for example "commented on <author>'s post about <topic>, 2026-10-20". linkedin-outreach uses it in the note.
3. Filter by `headline` and `jobTitle` before any LinkedIn Profile Scraper run. Profile Scraper is the heaviest action (50 a day by default).
4. If names carry emoji or titles, clean them with "Personal Name Cleaner" and "Social Headline Cleaner".

## Deliver

The lead list CSV in texau-operator/references/report-formats.md. Report counts per source, duplicates removed, and rows dropped by the title filter.

## Named mistakes

| Mistake | Do instead |
|---|---|
| Full profile scrapes before filtering | Filter on `headline` first |
| Promising competitor page followers | LinkedIn shows page followers only to admins. Use the page's post engagers. |
| Promising event attendees or group members | Not in Desktop 1.1.4. Offer engagers of the event's posts. |
| Sales Navigator automations on an account without Sales Navigator | Read `salesNavigator` from `list_accounts` first |
| One search above 2,500 results | Split the search |
| Mixing `snProfileUrl` and `liProfileUrl` as the same key | Convert to `liProfileUrl` first |
