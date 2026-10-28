# Playbook audit: PhantomBuster competitors (2026-10-28)

Sources: vendor help pages and public template lists. Items marked UNVERIFIED come from a title or a third-party listing only. Captain Data, Expandi, Instantly and Bardeen keep their template libraries behind a login.

## Recurring playbook patterns, with TexAu Desktop coverage

| Pattern | Seen at | TexAu automations (V2 catalog names) | Gap |
|---|---|---|---|
| Invite, then message, then follow-up | Waalaxy, Dripify, HeyReach, Expandi | LinkedIn Auto Connect, LinkedIn Auto Message, Check If LinkedIn Profile Is Connected or Not | No built-in sequence. The agent runs each step and waits days between them. |
| Visit, then invite (warm-up) | Waalaxy, lemlist, Dripify | Linkedin Profile Viewer, LinkedIn Auto Connect | none |
| Invite not accepted, then email | Waalaxy Ganymede, lemlist | LinkedIn Sent Request Extractor, Hunter, Snov, Website Email Scraper | none |
| Post likers or commenters, then outreach | Clay | LinkedIn Post Likers Export, LinkedIn Comments Scraper | none |
| Event attendees, then outreach | Clay, Dripify, Expandi | LinkedIn Event Attendees Export, LinkedIn Event Inviter | The account must join the event first. |
| Company page or competitor followers | Clay, Dripify | LinkedIn Company Followers Export (own pages only on LinkedIn) | Competitor followers are not visible on LinkedIn. Twitter Followers covers it on X. |
| Group members, message without connecting | Expandi | LinkedIn Group Members Extractor, LinkedIn Group Auto Message | none |
| Sales Navigator search, then email waterfall, then CRM | Captain Data, Bardeen | Sales Navigator Lead Search Export, Hunter, Snov, Datagma, HubSpot, Pipedrive | No waterfall helper. The agent chains finders by hand. |
| Headcount-growth or hiring signal | Captain Data, Clay, Apify | Sales Navigator Account Search Export, LinkedIn Job Search Export | none |
| Website or domain, then decision makers | Clay, Apify | LinkedIn Company URL Finder, LinkedIn Company Employees Export | none |
| Job changers (past clients) | Clay | LinkedIn Profile Scraper run on a saved list, with a diff against last run | No diff tool. The agent compares two runs. |
| Maps category x city grid, then website emails, then remove bad emails | Apify, Bright Data | Google Maps Extractor, Website Email Scraper, Email Verifier, Hunter - Verify Email, Verify Email Using ClearOut | none |
| Local businesses with no website | Clay, Outscraper | Google Maps Extractor (filter on empty website) | none |
| Review mining for reputation pitches | Bright Data | Google Maps Reviews Extractor | none |
| E-commerce needing SEO or ads | Clay | Website Technographic Data Finder, Website Tracking Pixel Extractor | none |
| Reddit pain-point mining | GummySearch | SubReddit Posts Search Export, Reddit Posts Search Export, Reddit Post Commenters Export | No theme labels. The agent classifies. |
| Reddit keyword monitoring | F5Bot, Syften, Apify | Reddit Posts Search Export | No schedule. The agent reruns on request. |
| Competitor followers on X | Apify | Twitter Profile Scraper, Twitter List Members Export | No followers-of-account export in the V2 list. Check the desktop catalog. |
| ICP and competitive brief | Clay | Google Search Results Extractor, Website Metadata Extractor, Crunchbase Company Scraper, LinkedIn Company Scraper | none |
| Multi-sender rotation | HeyReach | Several accounts with their own proxies run in parallel lanes | No built-in rotation. The agent splits the rows by account. |

## Safe LinkedIn limits as vendors publish them (none are official LinkedIn numbers)

| Source | Connection requests | Messages | Profile views |
|---|---|---|---|
| HeyReach | 25/day after warm-up, 40/day hard max, 200/week | not stated | not stated |
| Waalaxy | 80-100/day, 200/week max | 100-150/day | not stated |
| Expandi | about 20/day, 5 days a week, 80-100/week | not stated | not stated |
| Dripify | new 10-15/day, established 20-30/day | 40-60/day | new 20-40/day, 60-100/day |
| Reply.io | 25-35/day | 35-50/day | 25-35/day |

Defaults chosen for the TexAu skills: 20 connection requests a day and 100 a week, 50 messages a day, 80 profile views a day. New accounts start at half of that.

## Sources

- https://www.clay.com/templates, https://www.clay.com/tools/companies-that-need-websites
- https://use-apify.com/docs/best-apify-actors/best-lead-generation-actors
- https://intercom.help/waalaxy/en/articles/5496541-how-to-choose-the-right-sequence
- https://help.dripify.com/en/articles/12478338-how-to-use-templates-in-dripify
- https://help.lemlist.com/en/articles/4565994-choose-a-multichannel-sequence-to-build
- https://help.heyreach.io/en/articles/15128619-how-do-connection-request-limits-work-in-heyreach
- https://intercom.help/waalaxy/en/articles/5463827-daily-quotas-and-linkedin-restrictions
- https://expandi.io/blog/linkedin-connections-limit
- https://help.dripify.com/en/articles/12821791-how-to-set-up-your-dripify-limits-safely-and-efficiently
- https://support.reply.io/en/articles/6268391-limits-for-linkedin-automatic-steps
- https://gummysearch.com/docs/customer-discovery-using-reddit-y1p4c
- https://redship.io/blog/f5bot-alternatives-reddit-monitoring
- https://docs.getcargo.io/use-cases/outbound-company-headcount-intent-strategy-with-captain-data
