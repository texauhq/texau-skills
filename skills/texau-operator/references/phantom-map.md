# PhantomBuster Phantom to TexAu automation map

Use this map when the user names a Phantom or a PhantomBuster playbook. Resolve every TexAu name with `list_automations` before use. The desktop catalog can differ from this map.

Match values:

- exact: one TexAu automation does the same job.
- close: a TexAu automation does most of the job. Tell the user the difference.
- chain: run the TexAu automations in the order shown. `>` means the next step, `+` means both, and `/` means either.
- none: TexAu has no equivalent. Tell the user, and offer the nearest skill or a CSV hand-off.

Source: the public PhantomBuster Phantom Database snapshot of 2026-10-09 (145 Phantoms), mapped to the TexAu V2 public catalog on 2026-10-28.

| Phantom | TexAu automation | Match | Note |
|---|---|---|---|
| AI LinkedIn Message Writer | LinkedIn AI Message | close | Or the assistant writes the text itself from scraped columns. |
| AI LinkedIn Post Responder | none (assistant drafts) + LinkedIn Auto Comment | chain | The user approves every comment. |
| AI LinkedIn Profile Enricher | LinkedIn Profile Scraper + assistant scoring | chain | The assistant scores ICP fit from scraped columns. |
| LinkedIn Activity Extractor | LinkedIn Profile Activity Export / LinkedIn Company Activity Extractor | exact |  |
| LinkedIn Auto Commenter | LinkedIn Auto Comment | exact |  |
| LinkedIn Auto Connect | LinkedIn Auto Connect | exact |  |
| LinkedIn Auto Connection Remover | LinkedIn Connection Remover | exact |  |
| LinkedIn Auto Endorser | none | none | No endorse automation in the TexAu catalog. |
| LinkedIn Auto Follow | LinkedIn Profile Auto Follow | exact |  |
| LinkedIn Auto Invitation Accepter | LinkedIn Auto Accept Pending Connection | exact |  |
| LinkedIn Auto Invitation Withdrawer | LinkedIn Withdraw Invitation | exact |  |
| LinkedIn Auto Liker | LinkedIn Auto Like / Linkedin Recent Posts Liker | exact |  |
| LinkedIn Auto Poster | LinkedIn Auto Post | exact |  |
| LinkedIn Auto Unfollow | LinkedIn Profile Auto Unfollow | exact |  |
| LinkedIn Company Employees Export | LinkedIn Company Employees Export | exact |  |
| LinkedIn Company Follow Inviter | LinkedIn Company Follow Inviter | exact |  |
| LinkedIn Company Follower Collector | LinkedIn Company Followers Export | exact | Own pages only. |
| LinkedIn Company Follower Collector to Outreach | LinkedIn Company Followers Export > LinkedIn Auto Connect > LinkedIn Auto Message | chain |  |
| LinkedIn Company Page Inviter | LinkedIn Company Follow Inviter | exact |  |
| LinkedIn Company Post Commenter and Liker Scraper | LinkedIn Company Activity Extractor > LinkedIn Post Likers Export + LinkedIn Comments Scraper | chain |  |
| LinkedIn Company Scraper | LinkedIn Company Scraper | exact |  |
| LinkedIn Company URL Finder | LinkedIn Company URL Finder | exact |  |
| LinkedIn Connections Export | LinkedIn Connections Export / Extract Your Connections | exact |  |
| LinkedIn Connections to Emails | LinkedIn Connections Export > email waterfall | chain | See lead-gen-expert. |
| LinkedIn Event Guests Export | LinkedIn Event Attendees Export | exact | The account must attend the event. |
| LinkedIn Event Inviter | LinkedIn Event Inviter | exact |  |
| LinkedIn Group Member Message Sender | LinkedIn Group Auto Message | exact |  |
| LinkedIn Group Members Export | LinkedIn Group Members Extractor | exact |  |
| LinkedIn Group Members to Emails | LinkedIn Group Members Extractor > email waterfall | chain |  |
| LinkedIn Group Members to Outreach | LinkedIn Group Members Extractor > LinkedIn Auto Connect > LinkedIn Auto Message | chain |  |
| LinkedIn Inbox Scraper | LinkedIn Inbox Scraper | exact |  |
| LinkedIn Job Scraper | LinkedIn Job Scraper / LinkedIn Job Search Export | exact |  |
| LinkedIn Join Group Inviter | LinkedIn Group Inviter | exact |  |
| LinkedIn Message Sender | LinkedIn Auto Message | exact | 1st-degree connections only. |
| LinkedIn Message Thread Scraper | LinkedIn Message Thread Scraper | exact |  |
| LinkedIn New Connection Welcome Message | LinkedIn Received Connection Extractor > LinkedIn Auto Message | chain | Rerun on request. TexAu has no schedule. |
| LinkedIn Outreach | Linkedin Profile Viewer (cold lists only) > LinkedIn Auto Connect > Check If LinkedIn Profile Is Connected or Not > LinkedIn Auto Message | chain | See linkedin-outreach. A list is cold if the people never engaged with the user. |
| LinkedIn Personal Email Extractor | none | none | No personal email export in the TexAu catalog. |
| LinkedIn Poll Voters Export | LinkedIn Poll Results Export | exact |  |
| LinkedIn Post Commenters Export | LinkedIn Comments Scraper | exact |  |
| LinkedIn Post Commenters to Emails | LinkedIn Comments Scraper > email waterfall | chain |  |
| LinkedIn Post Engagers to Lead Outreach | LinkedIn Post Likers Export + LinkedIn Comments Scraper > assistant filter > LinkedIn Auto Connect > LinkedIn Auto Message | chain |  |
| LinkedIn Post Likers Export | LinkedIn Post Likers Export | exact |  |
| LinkedIn Profile Follower Collector | Extract Your LinkedIn Followers / LinkedIn Followers Export | exact |  |
| LinkedIn Profile Post Commenter and Liker Scraper | LinkedIn Profile Posts Export > LinkedIn Post Likers Export + LinkedIn Comments Scraper | chain |  |
| LinkedIn Profile Scraper | LinkedIn Profile Scraper | exact |  |
| LinkedIn Profile URL Finder | LinkedIn Profile URL Finder | exact |  |
| LinkedIn Profile Visitor | Linkedin Profile Viewer | exact |  |
| LinkedIn Profiles to lemlist Campaign | Lemlist: Add Lead to Campaign | exact |  |
| LinkedIn Recruiter Profile Scraper | LinkedIn Recruiter Search Export | close | Needs Recruiter Lite. |
| LinkedIn Search Export | LinkedIn People Search Export / Extract Profiles From LinkedIn Search | exact |  |
| LinkedIn Search To Emails | LinkedIn People Search Export > email waterfall | chain |  |
| LinkedIn Search to Lead Connection | LinkedIn People Search Export > LinkedIn Auto Connect > LinkedIn Sent Request Extractor | chain |  |
| LinkedIn Search to Lead Outreach | LinkedIn People Search Export > LinkedIn Auto Connect > LinkedIn Auto Message | chain |  |
| LinkedIn Search to Outreach | LinkedIn People Search Export or Sales Navigator Lead Search Export > LinkedIn Auto Connect > LinkedIn Auto Message | chain |  |
| LinkedIn Search to Profile Data | LinkedIn People Search Export > LinkedIn Profile Scraper > LinkedIn Company Scraper | chain |  |
| LinkedIn Search to lemlist Campaign | LinkedIn People Search Export > Lemlist: Add Lead to Campaign | chain |  |
| LinkedIn Sent Request Extractor | LinkedIn Sent Request Extractor | exact |  |
| Sales Navigator Account Employees Export | LinkedIn Company Employees Export / Sales Navigator Lead Search Export filtered by account | close |  |
| Sales Navigator Account Scraper | Sales Navigator Account Scraper | exact |  |
| Sales Navigator Alert Extractor | none | none | No alerts export in the TexAu catalog. |
| Sales Navigator Auto Connect | Sales Navigator Auto Connect | exact |  |
| Sales Navigator Inbox Scraper | Sales Navigator Inbox Scraper | exact |  |
| Sales Navigator Lead Sender | Create Lead List / Sales Navigator Lead List Generator | close |  |
| Sales Navigator List Export | Sales Navigator Lead List Export / Sales Navigator Account List Export | exact |  |
| Sales Navigator Message Sender | Sales Navigator Auto Message / Sales Navigator AI InMail | exact |  |
| Sales Navigator Profile Scraper | Sales Navigator Lead Scraper | exact |  |
| Sales Navigator Profile Viewers Export | LinkedIn Profile Views Export | close | Standard LinkedIn viewers, not the Sales Navigator view. |
| Sales Navigator Search Export | Sales Navigator Lead Search Export / Sales Navigator Account Search Export | exact | Up to 2,500 per search. |
| Sales Navigator Search To Emails | Sales Navigator Lead Search Export > email waterfall | chain |  |
| Sales Navigator Search to Lead Outreach | Sales Navigator Lead Search Export > Sales Navigator Auto Connect > Sales Navigator Auto Message | chain |  |
| Sales Navigator URL Converter | LinkedIn Profile URL Finder | close | Pass name and company. No direct URL converter. |
| HubSpot CRM Enricher | Hubspot: Create Contact / Update Contact | exact |  |
| HubSpot Contact Career Tracker | Hubspot: Get Contact > LinkedIn Profile Scraper > compare > Update Contact (or Datagma: Get Job Change) | chain |  |
| HubSpot Contact Data Enricher | LinkedIn Profile Scraper > Hubspot: Update Contact | chain |  |
| HubSpot Contact Data Refresher | Hubspot: Get Contact > LinkedIn Profile Scraper > Hubspot: Update Contact | chain |  |
| HubSpot Contact LinkedIn Outreach | Hubspot: Find Contact > linkedin-outreach | chain |  |
| HubSpot Contact LinkedIn URL Finder | LinkedIn Profile URL Finder > Hubspot: Update Contact | chain |  |
| HubSpot Contact Sender | Hubspot: Add leads to Hubspot / Create Contact | exact |  |
| Pipedrive CRM Enricher | Pipedrive - Create Person / Pipedrive - Update Person | exact |  |
| Salesforce CRM Enricher | none | none | No Salesforce automation in the TexAu catalog. Write a CSV for import. |
| Twitter Auto Follow | Twitter Auto Follow | exact |  |
| Twitter Auto Liker | Twitter Auto Like | exact |  |
| Twitter Auto Poster | Twitter Auto Post | exact |  |
| Twitter Auto Retweeter | Twitter Auto Retweet | exact |  |
| Twitter Auto Unfollow | Twitter Auto Unfollow | exact |  |
| Twitter Follower Collector | Twitter List Members Export / Twitter People List Builder | close | No direct followers-of-account export in the V2 list. Look in list_automations. |
| Twitter Following Collector | none | none | Look in list_automations. Not in the V2 list. |
| Twitter Hashtag Search Export | Twitter Search Export | exact | Search for the hashtag. |
| Twitter Media Extractor | Twitter Profile Media Export | exact |  |
| Twitter Message Sender | Twitter Auto Message | exact |  |
| Twitter Profile Likes Extractor | Twitter Profile Likes Export | exact |  |
| Twitter Profile Scraper | Twitter Profile Scraper | exact |  |
| Twitter Profile URL Finder | Twitter Profile URL Finder | exact |  |
| Twitter Search Export | Twitter Search Export | exact |  |
| Twitter Tweet Extractor | Twitter Profile Tweets Export | exact |  |
| Twitter Tweet Likers Export | Twitter Likers Export | exact |  |
| Facebook Group Members Export | none | none | Not in the V2 public list. Look in list_automations. |
| Facebook Profile Scraper | none | none | Only a profile screenshot automation exists. |
| Facebook Profile URL Finder | none | none |  |
| Google Maps Search Export | Google Maps Extractor | exact |  |
| Google Maps Search To Contact Data | Google Maps Extractor > Website Email Scraper | chain | See local-maps-leads. |
| Pages Jaunes Business Scraper | none | none |  |
| Pages Jaunes Search Export | none | none |  |
| Yellow Pages Business Scraper | none | none | Use Google Maps Extractor. |
| Yellow Pages Search Export | none | none | Use Google Maps Extractor. |
| Chrome Extension Review Extractor | none | none |  |
| Data Scraping Crawler | Website Metadata Extractor / Website Schema Extractor | close | No general crawler. |
| Domain Name Finder | Company Website Finder | exact |  |
| Email Extractor | Website Email Scraper | exact |  |
| Professional Email Finder | Find An Email Address / Hunter - Find Email Using Email Finder / Snov - Find Email From Database | exact | Run as a waterfall. |
| Web Element Extractor | none | none |  |
| Advanced AI Enricher | AI Summarizer / AI Sentiment Analysis, or the assistant itself | close | The assistant classifies rows itself without extra credits. |
| GitHub Contributors Export | GitHub Contributors Export | exact |  |
| GitHub Profile Scraper | none | none |  |
| GitHub Stargazers Export | none | none |  |
| GitHub User Search Export | GitHub User Search Export | exact |  |
| YouTube Channel Scraper | YouTube Channel Videos Scraper | close |  |
| YouTube Channel Video Extractor | YouTube Channel Videos Scraper | exact |  |
| YouTube Video Scraper | YouTube Comment Scraper / Youtube Search Export | close |  |
| Reddit Profile Scraper | Reddit User Comments Scraper | close |  |
| Instagram Auto Commenter | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Auto Follow | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Auto Liker | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Auto Unfollow | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Follower Collector | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Followers Auto Follow | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Following Collector | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Hashtag Search Export | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Hashtag Search To Post Engagement | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Multiple Hashtag Collector | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Notification Extractor | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Photo Likers | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Post Commenters Export | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Post Scraper | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Profile Post Extractor | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Profile Scraper | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Profile URL Finder | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Story Auto Watcher | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Story Extractor | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Story Viewers Export | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Instagram Tagged Post Extractor | none | none | No Instagram in the TexAu V2 public list. Look in list_automations. |
| Slack Channel User Extractor | none | none |  |
| Slack Message Sender | none | none |  |
| Slack Search Export | none | none |  |
