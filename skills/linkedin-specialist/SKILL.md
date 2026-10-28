---
name: linkedin-specialist
description: Use when the user wants to find, scrape, or research people, companies, posts, events, groups, or jobs on LinkedIn or Sales Navigator through TexAu Desktop. Also use for building a LinkedIn audience or lead list.
---

# LinkedIn and Sales Navigator sourcing

**REQUIRED:** Follow texau-operator. For sending invites or messages, use linkedin-outreach.

## Overview

Every good LinkedIn list starts from a signal: someone engaged, joined, follows, works at, or is hiring. Pick the source by the signal the user cares about. Search results come last because they carry no intent.

## Source by signal

| The user wants | Start with | Then |
|---|---|---|
| Warm leads from content | LinkedIn Post Likers Export, LinkedIn Comments Scraper | LinkedIn Profile Scraper for headline and company |
| A competitor's or thought leader's audience | LinkedIn Profile Posts Export on their profile, then likers and commenters of the top posts | Remove the user's existing connections |
| Event audience | LinkedIn Event Search Export, LinkedIn Event Attendees Export | The account must join the event first |
| Group audience | LinkedIn Group Search Export, LinkedIn Group Members Extractor | LinkedIn Group Auto Message reaches members without an invite |
| People at named accounts | LinkedIn Company URL Finder, LinkedIn Company Employees Export | Filter by title |
| Companies that are hiring | LinkedIn Job Search Export | LinkedIn Company Employees Export for the hiring manager |
| Title and filter search | Sales Navigator Lead Search Export (needs Sales Navigator), else LinkedIn People Search Export | Sales Navigator Lead Scraper for detail |
| Account lists | Sales Navigator Account Search Export, Sales Navigator Account List Export | Employees by title |
| The user's own network | LinkedIn Connections Export, Extract Your LinkedIn Followers, LinkedIn Profile Views Export | Segment by title and company |

Names come from the V2 catalog. Resolve the real id with `list_automations` and read inputs with `describe_automation`.

## Search URLs

Search exports take a search URL. Ask the user to build the search in LinkedIn or Sales Navigator and paste the URL. Do not build filter URLs by hand. The parameters change often.

## Shape the output

- Remove duplicates by profile URL. Keep the first source column, so the outreach note can name it.
- Add a `signal` column (liked post X, attends event Y, hiring for Z). The copy step needs it.
- Search exports stop near 1,000 results for LinkedIn and 2,500 for Sales Navigator. To get more, split the search by location or company size.

## Account safety

Scrapes count against the account's daily budget too. Profile scrapes are the heaviest action. Scrape detail only for rows that pass the title filter.

## Common mistakes

- Scraping full profiles for everyone before filtering by headline.
- Promising competitor page followers. LinkedIn shows followers only to page admins.
- Running Sales Navigator automations on an account where `salesNavigator` is false.

## Deliverable

Deliver the lead list CSV from texau-operator/references/report-formats.md. The `signal` column names the source ("commented on <author>'s post, <date>"), so linkedin-outreach can use it in the note. Done when duplicates by profile URL are removed and the counts are reported.
