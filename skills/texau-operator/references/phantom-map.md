# PhantomBuster Phantom to TexAu automation map

Use this map when the user names a Phantom or a PhantomBuster playbook. Resolve every TexAu name with `list_automations` before use. The desktop catalog can differ from this map.

Match values:

- exact: one TexAu automation does the same job.
- close: a TexAu automation does most of the job. Tell the user the difference.
- chain: run the TexAu automations in the order shown. `>` means the next step, `+` means both, and `/` means either.
- none: TexAu has no equivalent. Tell the user, and offer the nearest skill or a CSV hand-off.

Source: the public PhantomBuster Phantom Database snapshot of 2026-10-09 (145 Phantoms), mapped to the TexAu Desktop 1.1.4 catalog (references/desktop-catalog.md) on 2026-10-28.

| Phantom | TexAu automation | Match | Note |
|---|---|---|---|
| AI LinkedIn Message Writer | assistant (writes from scraped columns) | close | The assistant writes the text. No TexAu automation needed. |
| AI LinkedIn Post Responder | assistant drafts > LinkedIn Auto Comment | chain | The user approves every comment. |
| AI LinkedIn Profile Enricher | LinkedIn Profile Scraper + assistant scoring | chain | The assistant scores ICP fit from the scraped columns. |
| LinkedIn Activity Extractor | LinkedIn Profile Activity Export / LinkedIn Company Activity Extractor | exact |  |
| LinkedIn Auto Commenter | LinkedIn Auto Comment | exact |  |
| LinkedIn Auto Connect | LinkedIn Auto Connect | exact |  |
| LinkedIn Auto Connection Remover | none | none |  |
| LinkedIn Auto Endorser | none | none |  |
| LinkedIn Auto Follow | none | none | Only company pages: LinkedIn Company Auto Follow. |
| LinkedIn Auto Invitation Accepter | LinkedIn Auto Accept Pending Connection | exact | Feed it LinkedIn Received Connection Extractor output. |
| LinkedIn Auto Invitation Withdrawer | none | none | List old invites with LinkedIn Sent Request Extractor. The user withdraws them in LinkedIn. |
| LinkedIn Auto Liker | LinkedIn Post Auto Like | exact |  |
| LinkedIn Auto Poster | none | none |  |
| LinkedIn Auto Unfollow | none | none |  |
| LinkedIn Company Employees Export | LinkedIn Company Employees Export | exact |  |
| LinkedIn Company Follow Inviter | LinkedIn Company Follow Inviter | exact |  |
| LinkedIn Company Follower Collector | none | none |  |
| LinkedIn Company Follower Collector to Outreach | none | none |  |
| LinkedIn Company Page Inviter | LinkedIn Company Follow Inviter | exact |  |
| LinkedIn Company Post Commenter and Liker Scraper | LinkedIn Company Activity Extractor > LinkedIn Post Likers Export + LinkedIn Comments Scraper | chain |  |
| LinkedIn Company Scraper | LinkedIn Company Scraper | exact |  |
| LinkedIn Company URL Finder | LinkedIn Universal Company Converter | close | Converts an id or Sales Navigator URL. It does not search by name. |
| LinkedIn Connections Export | LinkedIn Connections Export | exact |  |
| LinkedIn Connections to Emails | LinkedIn Connections Export > LinkedIn Profile Scraper | chain | Profile Scraper returns the email a 1st-degree connection shares. |
| LinkedIn Event Guests Export | none | none | LinkedIn Event Scraper reads event details, not attendees. |
| LinkedIn Event Inviter | none | none |  |
| LinkedIn Group Member Message Sender | none | none |  |
| LinkedIn Group Members Export | none | none |  |
| LinkedIn Group Members to Emails | none | none |  |
| LinkedIn Group Members to Outreach | none | none |  |
| LinkedIn Inbox Scraper | LinkedIn Inbox Scraper | exact |  |
| LinkedIn Job Scraper | LinkedIn Job Scraper / LinkedIn Job Search Export | exact |  |
| LinkedIn Join Group Inviter | none | none |  |
| LinkedIn Message Sender | LinkedIn Auto Message | exact | 1st-degree connections only. |
| LinkedIn Message Thread Scraper | LinkedIn Message Thread Scraper | exact |  |
| LinkedIn New Connection Welcome Message | LinkedIn Connections Export > LinkedIn Auto Message | chain | Use filterDate to get only new connections. TexAu has no schedule. |
| LinkedIn Outreach | LinkedIn Auto Connect > LinkedIn Connection Checker > LinkedIn Auto Message | chain | See linkedin-outreach. |
| LinkedIn Personal Email Extractor | LinkedIn Profile Scraper | close | Returns the email a 1st-degree connection shares. |
| LinkedIn Poll Voters Export | none | none |  |
| LinkedIn Post Commenters Export | LinkedIn Comments Scraper | exact |  |
| LinkedIn Post Commenters to Emails | LinkedIn Comments Scraper > LinkedIn Profile Scraper | chain | Emails only for 1st-degree connections. |
| LinkedIn Post Engagers to Lead Outreach | LinkedIn Post Likers Export + LinkedIn Comments Scraper > assistant filter > LinkedIn Auto Connect > LinkedIn Auto Message | chain |  |
| LinkedIn Post Likers Export | LinkedIn Post Likers Export | exact |  |
| LinkedIn Profile Follower Collector | LinkedIn Followers Export | exact | Your own followers. |
| LinkedIn Profile Post Commenter and Liker Scraper | LinkedIn Profile Posts Export > LinkedIn Post Likers Export + LinkedIn Comments Scraper | chain |  |
| LinkedIn Profile Scraper | LinkedIn Profile Scraper | exact |  |
| LinkedIn Profile URL Finder | none | none |  |
| LinkedIn Profile Visitor | none | none |  |
| LinkedIn Profiles to lemlist Campaign | none | none | Write a CSV for the user to import into lemlist. |
| LinkedIn Recruiter Profile Scraper | LinkedIn Recruiter Search Export | close | Needs Recruiter. |
| LinkedIn Search Export | Sales Navigator Lead Search Export | close | Needs Sales Navigator. It takes a keyword or a search URL. |
| LinkedIn Search To Emails | Sales Navigator Lead Search Export > LinkedIn Profile Scraper | chain | Needs Sales Navigator. Emails only for 1st-degree connections. |
| LinkedIn Search to Lead Connection | Sales Navigator Lead Search Export > LinkedIn Auto Connect > LinkedIn Sent Request Extractor | chain | Needs Sales Navigator. |
| LinkedIn Search to Lead Outreach | Sales Navigator Lead Search Export > LinkedIn Auto Connect > LinkedIn Auto Message | chain | Needs Sales Navigator. |
| LinkedIn Search to Outreach | Sales Navigator Lead Search Export > LinkedIn Auto Connect > LinkedIn Auto Message | chain | Needs Sales Navigator. |
| LinkedIn Search to Profile Data | Sales Navigator Lead Search Export > LinkedIn Profile Scraper > LinkedIn Company Scraper | chain | Needs Sales Navigator. |
| LinkedIn Search to lemlist Campaign | none | none | Write a CSV for the user to import. |
| LinkedIn Sent Request Extractor | LinkedIn Sent Request Extractor | exact |  |
| Sales Navigator Account Employees Export | LinkedIn Company Lead Search Export | close |  |
| Sales Navigator Account Scraper | Sales Navigator Account Scraper | exact |  |
| Sales Navigator Alert Extractor | none | none |  |
| Sales Navigator Auto Connect | Sales Navigator Auto Connect | exact |  |
| Sales Navigator Inbox Scraper | Sales Navigator Inbox Scraper | exact |  |
| Sales Navigator Lead Sender | Sales Navigator Lead List Builder | close |  |
| Sales Navigator List Export | Sales Navigator Lead List Export / Sales Navigator Account List Export | exact |  |
| Sales Navigator Message Sender | Sales Navigator Auto Message | exact | Turn on replyDetect. |
| Sales Navigator Profile Scraper | Sales Navigator Lead Scraper | exact |  |
| Sales Navigator Profile Viewers Export | none | none |  |
| Sales Navigator Search Export | Sales Navigator Lead Search Export / Sales Navigator Account Search Export | exact | Up to 2,500 per search. |
| Sales Navigator Search To Emails | Sales Navigator Lead Search Export > LinkedIn Profile Scraper | chain | Emails only for 1st-degree connections. |
| Sales Navigator Search to Lead Outreach | Sales Navigator Lead Search Export > Sales Navigator Auto Connect > Sales Navigator Auto Message | chain |  |
| Sales Navigator URL Converter | Sales Navigator Universal Profile Converter / LinkedIn Universal Profile Converter | exact |  |
| HubSpot CRM Enricher | none | none | Write a CSV in the lead list format for import. |
| HubSpot Contact Career Tracker | LinkedIn Profile Scraper on the contact list > compare with the last run | chain | The user exports contacts from HubSpot as CSV. |
| HubSpot Contact Data Enricher | LinkedIn Profile Scraper | close | CSV in, CSV out. No HubSpot write. |
| HubSpot Contact Data Refresher | LinkedIn Profile Scraper | close | CSV in, CSV out. No HubSpot write. |
| HubSpot Contact LinkedIn Outreach | linkedin-outreach on a HubSpot CSV export | chain |  |
| HubSpot Contact LinkedIn URL Finder | none | none |  |
| HubSpot Contact Sender | none | none | Write a CSV for import. |
| Pipedrive CRM Enricher | none | none | Write a CSV for import. |
| Salesforce CRM Enricher | none | none | Write a CSV for import. |
| Twitter Auto Follow | Twitter Auto Follow | exact |  |
| Twitter Auto Liker | Twitter Auto Like | exact |  |
| Twitter Auto Poster | Twitter Auto Post | exact |  |
| Twitter Auto Retweeter | Twitter Auto Retweet | exact |  |
| Twitter Auto Unfollow | none | none |  |
| Twitter Follower Collector | Twitter Followers/Following Export | exact | twExtractionMode Followers. |
| Twitter Following Collector | Twitter Followers/Following Export | exact | twExtractionMode Following. |
| Twitter Hashtag Search Export | Twitter Search Extractor | exact | Search URL for the hashtag. |
| Twitter Media Extractor | Twitter Profile Media Export | exact |  |
| Twitter Message Sender | Twitter Auto Message | exact | Only accounts with canDm true. |
| Twitter Profile Likes Extractor | none | none |  |
| Twitter Profile Scraper | Twitter Profile Scraper | exact |  |
| Twitter Profile URL Finder | none | none |  |
| Twitter Search Export | Twitter Search Extractor | exact |  |
| Twitter Tweet Extractor | Twitter Profile Tweets Export | exact |  |
| Twitter Tweet Likers Export | Twitter Retweet List Extractor / Twitter Quote Retweets Export | close | Retweeters and quote tweeters, not likers. |
| Facebook Group Members Export | none | none |  |
| Facebook Profile Scraper | none | none |  |
| Facebook Profile URL Finder | none | none |  |
| Google Maps Search Export | Google Maps Search Export | exact | Up to 80 places per search. |
| Google Maps Search To Contact Data | Google Maps Search Export > Website Email And Social Links Scraper | chain | See local-maps-leads. |
| Pages Jaunes Business Scraper | none | none |  |
| Pages Jaunes Search Export | none | none |  |
| Yellow Pages Business Scraper | Google My Business Scraper | close | Google listing instead of Yellow Pages. |
| Yellow Pages Search Export | Google Maps Search Export | close | Google Maps instead of Yellow Pages. |
| Chrome Extension Review Extractor | none | none |  |
| Data Scraping Crawler | Website Email And Social Links Scraper | close | crawlDepth and markdownOutput give page text. |
| Domain Name Finder | none | none | The assistant's own web search can find the domain. |
| Email Extractor | Website Email And Social Links Scraper | exact |  |
| Professional Email Finder | LinkedIn Profile Scraper / Website Email And Social Links Scraper | close | No name-plus-domain finder. Profile Scraper covers 1st-degree connections, the site scraper covers company inboxes. |
| Web Element Extractor | none | none |  |
| Advanced AI Enricher | assistant + Company Name Cleaner / Personal Name Cleaner / Social Headline Cleaner | close | The assistant classifies rows. Cleaners normalize names and headlines. |
| GitHub Contributors Export | none | none |  |
| GitHub Profile Scraper | none | none |  |
| GitHub Stargazers Export | none | none |  |
| GitHub User Search Export | none | none |  |
| Slack Channel User Extractor | Slack Channel Members Extractor | exact |  |
| Slack Message Sender | Slack Auto Message | exact |  |
| Slack Search Export | Slack Message Search Export / Slack People Search Export | exact |  |
| YouTube Channel Scraper | YouTube Channel Scraper | exact |  |
| YouTube Channel Video Extractor | YouTube Channel Videos Scraper | exact |  |
| YouTube Video Scraper | YouTube Video Scraper | exact |  |
| Reddit Profile Scraper | none | none | reddit-specialist reads public Reddit pages with the assistant's web tools. |
| Instagram Auto Commenter | none | none |  |
| Instagram Auto Follow | none | none |  |
| Instagram Auto Liker | none | none |  |
| Instagram Auto Unfollow | none | none |  |
| Instagram Follower Collector | none | none |  |
| Instagram Followers Auto Follow | none | none |  |
| Instagram Following Collector | none | none |  |
| Instagram Hashtag Search Export | none | none |  |
| Instagram Hashtag Search To Post Engagement | none | none |  |
| Instagram Multiple Hashtag Collector | none | none |  |
| Instagram Notification Extractor | none | none |  |
| Instagram Photo Likers | none | none |  |
| Instagram Post Commenters Export | none | none |  |
| Instagram Post Scraper | none | none |  |
| Instagram Profile Post Extractor | none | none |  |
| Instagram Profile Scraper | none | none |  |
| Instagram Profile URL Finder | none | none |  |
| Instagram Story Auto Watcher | none | none |  |
| Instagram Story Extractor | none | none |  |
| Instagram Story Viewers Export | none | none |  |
| Instagram Tagged Post Extractor | none | none |  |
