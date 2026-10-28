# TexAu Desktop catalog

Read from a real TexAu Desktop 1.1.4 on 2026-10-28 with `list_automations` and `describe_automation`. 113 automations. Regenerate with `node test/gen-catalog.mjs` after reading a newer build.

Use it to plan. Always resolve the id with `list_automations` at run time, because builds differ. Input names marked `*` are required. "Writes" means the automation acts as the user and needs the user's approval. Limits are the app defaults per account: rows per day and per week.

## LinkedIn (37)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| LinkedIn Alumni Search Export |  | `liSchoolUrl`*, `keyword`, `startYear`, `endYear`, `maxCountAlumni` | `fullName`, `firstName`, `lastName`, `headline`, `jobTitle`, `jobCompanyName`, `liProfileUrl`, `liPublicProfileUrl`, `snProfileUrl`, `connectionDegree` | 10 / 70 |
| LinkedIn Auto Accept Pending Connection | yes | `liProfileUrl`* |  | 40 / 280 |
| LinkedIn Auto Comment | yes | `liPostUrl`*, `liProfileUrl`, `comment`* | `liPostUrl`, `fullName`, `headline`, `liProfileUrl` | 10 / 70 |
| LinkedIn Auto Connect | yes | `liProfileUrl`*, `messageContent` | `firstName`, `lastName`, `headline`, `jobTitle`, `companyName`, `liPublicProfileUrl`, `liProfileUrl`, `snProfileUrl` | 80 / 560 |
| LinkedIn Auto Message | yes | `liProfileUrl`*, `message`* | `lastMessageDate`, `hasReplied`, `liProfileUrl` | 80 / 560 |
| LinkedIn Auto Reject Pending Connection | yes | `liProfileUrl`* |  | 40 / 280 |
| Linkedin Birthday Export |  | none (own account) | `fullName`, `firstName`, `lastName`, `liPublicProfileUrl` | - / - |
| LinkedIn Comments Scraper |  | `liPostUrl`*, `sortOrder`, `maxCountPostCommenters` | `commentText`, `fullName`, `firstName`, `lastName`, `liProfileUrl`, `snProfileUrl`, `connectionDegree`, `headline`, `jobTitle`, `jobCompanyName`, `followersCount` | 40 / 280 |
| LinkedIn Company Activity Extractor |  | `liCompanyUrl`*, `mode`*, `maxCountCompanyActivity` | `companyName`, `postContent`, `liPostUrl`, `postDate`, `liJobUrl` | 40 / 280 |
| LinkedIn Company Auto Follow | yes | `liCompanyUrl`* | `liCompanyUrl` | 40 / 280 |
| LinkedIn Company Employees Export |  | `liCompanyUrl`*, `keyword`, `maxCountCompanyEmployee` | `fullName`, `firstName`, `lastName`, `headline`, `jobTitle`, `companyName`, `liProfileUrl`, `liPublicProfileUrl`, `snProfileUrl`, `connectionDegree` | 40 / 280 |
| LinkedIn Company Follow Inviter | yes | `liProfileUrl`*, `liCompanyUrl`* | `liProfileUrl` | - / - |
| LinkedIn Company Scraper |  | `liCompanyUrl`* | `companyName` | 30 / 210 |
| LinkedIn Connection Checker |  | `liProfileUrl`* | `isConnected`, `firstName`, `lastName`, `headline`, `jobTitle`, `companyName`, `connectionDegree`, `snProfileUrl`, `invitationState` | 40 / 280 |
| LinkedIn Connections Export |  | `maxCountConnectionExport`, `filterDate` | `connectionDate`, `firstName`, `lastName`, `headline`, `jobTitle`, `companyName`, `liPublicProfileUrl`, `liProfileUrl`, `snProfileUrl` | - / - |
| LinkedIn Delete Post | yes | `liPostUrl`* | `liPostUrl` | - / - |
| LinkedIn Event Scraper |  | `liEventUrl`* | `firstName`, `lastName`, `headline`, `connectionDegree`, `companyName` | - / - |
| LinkedIn Feed Scraper |  | `sortBy`, `maxCountLiFeedExtractor` | `liPostUrl` | - / - |
| LinkedIn Followers Export |  | `maxCountLiFollowerExport` | `fullName`, `firstName`, `lastName`, `liProfileUrl`, `headline`, `jobTitle`, `companyName`, `followersCount` | - / - |
| LinkedIn Following Export |  | `maxCountLiFollowerExport` | `fullName`, `firstName`, `lastName`, `liProfileUrl`, `headline`, `jobTitle`, `companyName`, `followersCount` | - / - |
| LinkedIn Inbox Scraper |  | `maxCountInboxThread` | `participantLiProfileUrl`, `lastMessageText`, `lastMessageDate`, `firstName`, `lastName`, `headline`, `liProfileUrl`, `liCompanyUrl` | 50 / 350 |
| LinkedIn Job Scraper |  | `liJobUrl`* | `jobTitle`, `liJobUrl`, `industry`, `companyName`, `liCompanyUrl`, `followersCount` | - / - |
| LinkedIn Job Search Export |  | `liJobSearchUrl`*, `maxCountJobSearch` | `category`, `companyName`, `liCompanyUrl`, `liJobUrl` | 80 / 560 |
| LinkedIn Message Thread Scraper |  | `liThreadUrl`* | `lastMessageDate`, `firstName`, `lastName`, `headline`, `liProfileUrl` | - / - |
| LinkedIn Mutual Connections Export |  | `liProfileUrl`*, `maxCountMutualConnectionExport` | `fullName`, `headline`, `connectionDegree` | 12000 / 84000 |
| LinkedIn Post Auto Like | yes | `liPostUrl`*, `reactionType`* | `liPostUrl` | - / - |
| LinkedIn Post Likers Export |  | `liPostUrl`*, `maxCountPostLikers` | `liPostUrl`, `fullName`, `firstName`, `lastName`, `liProfileUrl`, `liPublicProfileUrl`, `snProfileUrl`, `headline`, `jobTitle`, `jobCompanyName`, `connectionDegree`, `reactionType` | 10 / 70 |
| LinkedIn Post Scraper |  | `liPostUrl`* | `firstName`, `lastName`, `headline`, `jobTitle`, `jobCompanyName`, `snProfileUrl`, `companyName`, `liCompanyUrl`, `postContent`, `liPostUrl`, `postDate`, `liJobUrl` | 50 / 350 |
| LinkedIn Profile Activity Export |  | `liProfileUrl`*, `maxCount` | `firstName`, `lastName`, `headline`, `jobTitle`, `jobCompanyName`, `liProfileUrl`, `snProfileUrl`, `liCompanyUrl`, `liPostUrl`, `postContent`, `postDate`, `liJobUrl` | 40 / 280 |
| LinkedIn Profile Posts Export |  | `liProfileUrl`*, `maxCount` | `firstName`, `lastName`, `headline`, `jobTitle`, `jobCompanyName`, `liPublicProfileUrl`, `snProfileUrl`, `companyName`, `liPostUrl`, `postContent`, `postDate`, `liJobUrl` | - / - |
| LinkedIn Profile Scraper |  | `liProfileUrl`* | `firstName`, `lastName`, `headline`, `liProfileUrl`, `liPublicProfileUrl`, `industry`, `companyName`, `jobTitle`, `liJobUrl` | 50 / 350 |
| LinkedIn Received Connection Extractor |  | none (own account) | `firstName`, `lastName`, `headline`, `jobTitle`, `companyName`, `liPublicProfileUrl`, `liProfileUrl`, `snProfileUrl`, `invitationDate` | 40 / 280 |
| LinkedIn Reposters Export |  | `liPostUrl`*, `maxCountReposters` | `firstName`, `lastName`, `liProfileUrl`, `liPublicProfileUrl`, `snProfileUrl`, `companyName`, `liCompanyUrl` | 100 / 700 |
| LinkedIn Saved Jobs Export |  | `mode`*, `maxCountSavedJobsExport` | `category`, `companyName`, `liCompanyUrl`, `jobTitle`, `liJobUrl` | - / - |
| LinkedIn School Scraper |  | `liSchoolUrl`* |  | - / - |
| LinkedIn Sent Request Extractor |  | none (own account) | `firstName`, `lastName`, `headline`, `liPublicProfileUrl`, `liProfileUrl`, `snProfileUrl`, `invitationDate` | 40 / 280 |
| LinkedIn Universal Profile Converter |  | `liProfileUrl`* | `firstName`, `lastName`, `fullName`, `liProfileUrl`, `snProfileUrl`, `invitationState` | 80 / 560 |

## X (Twitter) (32)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Twitter Auto Follow | yes | `twProfileUrl`* | `name`, `screenName`, `description`, `email`, `websiteUrl`, `followersCount`, `location` | 400 / 2800 |
| Twitter Auto Like | yes | `twPostUrl`* |  | 4000 / 28000 |
| Twitter Auto Message | yes | `twProfileUrl`*, `message`*, `replyDetection` | `twProfileUrl`, `lastMessageDate` | 50 / 350 |
| Twitter Auto Post | yes | `messageText`*, `sharingPermission` | `postContent`, `twPostUrl`, `postDate`, `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `followersCount`, `location` | 1200 / 8400 |
| Twitter Auto Reply | yes | `twPostUrl`*, `comment`* | `screenName`, `name`, `twProfileUrl`, `twPostUrl` | 1200 / 8400 |
| Twitter Auto Retweet | yes | `twPostUrl`* | `twPostUrl` | 40 / 280 |
| Twitter Bookmarks Export |  | none (own account) | `name`, `screenName`, `twProfileUrl`, `description`, `canDm`, `followersCount`, `twPostUrl`, `postDate`, `postContent`, `location` | 4000 / 28000 |
| Twitter Direct Messages Export |  | `twProfileUrl`* | `twProfileUrl`, `lastMessageDate`, `name`, `screenName`, `description`, `email`, `websiteUrl`, `location`, `followersCount` | 14400 / 100800 |
| Twitter Followers/Following Export |  | `twExtractionMode`*, `twProfileUrl`*, `maxCount` | `name`, `screenName`, `twProfileUrl`, `description`, `canDm`, `followersCount`, `location` | 1600 / 11200 |
| Twitter Home Timeline Export |  | none (own account) | `name`, `screenName`, `twProfileUrl`, `description`, `websiteUrl`, `canDm`, `followersCount`, `twPostUrl`, `postDate`, `postContent`, `location` | 4000 / 28000 |
| Twitter Impressions Export |  | `twPostUrl`* |  | 16000 / 112000 |
| Twitter Inbox Scraper |  | none (own account) | `lastMessageDate` | 28800 / 201600 |
| Twitter List Export |  | `twListUrl`* | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `canDm`, `followersCount`, `twPostUrl`, `postDate`, `postContent`, `location` | 4000 / 28000 |
| Twitter List Members Export |  | `twListUrl`*, `twListMemberMaxCount` | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `canDm`, `followersCount`, `location` | - / - |
| Twitter List Membership Export |  | `twProfileUrl`* | `twProfileUrl`, `canDm`, `description`, `email`, `followersCount`, `location`, `name`, `screenName`, `twProfileUrl`, `websiteUrl` | 16000 / 112000 |
| Twitter List Search Export |  | `searchKeyword`*, `maxCountTwitterSearch` | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `canDm`, `followersCount`, `location` | 20 / 140 |
| Twitter List Subscribers Export |  | `twListUrl`*, `maxCount` | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `canDm`, `followersCount`, `location` | 16000 / 112000 |
| Twitter People List Builder | yes | `twListUrl`*, `twProfileUrl`* | `twProfileUrl`, `name`, `screenName`, `twProfileUrl`, `email`, `description`, `websiteUrl`, `canDm`, `followersCount`, `location` | 4000 / 28000 |
| Twitter Poll Votes Export |  | `twPostUrl`* | `twPostUrl` | 300 / 2100 |
| Twitter Profile Followed Topics Export |  | `twProfileUrl`* | `twProfileUrl` | 800 / 5600 |
| Twitter Profile Media Export |  | `twProfileUrl`*, `maxCountProfileMedia` | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `canDm`, `followersCount`, `twPostUrl`, `postDate`, `postContent`, `location` | 4000 / 28000 |
| Twitter Profile Scraper |  | `twProfileUrl`* | `name`, `screenName`, `twProfileUrl`, `email`, `description`, `websiteUrl`, `canDm`, `followersCount`, `location` | 760 / 5320 |
| Twitter Profile Subscribed Lists |  | `twProfileUrl`* | `canDm`, `description`, `email`, `followersCount`, `location`, `name`, `screenName`, `twProfileUrl`, `websiteUrl` | 16000 / 112000 |
| Twitter Profile Tweets and Replies Export |  | `twProfileUrl`*, `maxProfileTweetAndRepliesCount` | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `canDm`, `followersCount`, `twPostUrl`, `postDate`, `postContent`, `location` | 100 / 700 |
| Twitter Profile Tweets Export |  | `twProfileUrl`*, `maxProfileTweetCount` | `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `canDm`, `followersCount`, `twPostUrl`, `postDate`, `postContent`, `location` | 100 / 700 |
| Twitter Quote Retweets Export |  | `twPostUrl`*, `maxCount` | `twPostUrl`, `postContent`, `postDate`, `name`, `screenName`, `twProfileUrl`, `canDm`, `location`, `description`, `email`, `websiteUrl`, `followersCount` | 200 / 1400 |
| Twitter Retweet List Extractor |  | `twPostUrl`*, `maxCount` | `twPostUrl`, `postDate`, `name`, `screenName`, `twProfileUrl`, `description`, `websiteUrl`, `canDm`, `followersCount`, `location` | 4000 / 28000 |
| Twitter Search Extractor |  | `twAdvancedSearchUrl`*, `category`, `maxCountTwitterSearch` | `twPostUrl`, `postContent`, `name`, `screenName`, `twProfileUrl`, `description`, `websiteUrl`, `canDm`, `followersCount`, `postDate`, `location` | 10 / 70 |
| Twitter Space Scraper |  | `twSpaceUrl`* | `name`, `screenName`, `twProfileUrl` | 16000 / 112000 |
| Twitter Thread Export |  | `twPostUrl`*, `maxCount` | `twPostUrl`, `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `postContent`, `postDate`, `canDm`, `followersCount` | 1000 / 7000 |
| Twitter Trends Export |  | none (own account) | `location` | - / - |
| Twitter Tweet Scraper |  | `twPostUrl`* | `twPostUrl`, `postDate`, `name`, `screenName`, `twProfileUrl`, `description`, `email`, `websiteUrl`, `postContent`, `canDm`, `followersCount`, `location` | 1200 / 8400 |

## Websites (4)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Website Email And Social Links Scraper |  | `companyWebsiteUrl`*, `crawlDepth` | `siteUrl`, `companyName`, `email`, `phones` | 10000 / 70000 |
| Website Metadata Extractor |  | `siteUrl`* | `siteUrl`, `description` | - / - |
| Website Schema Extractor |  | `siteUrl`* | `siteUrl` | - / - |
| Website Technographic Data Finder |  | `siteUrl`* | `siteUrl`, `technologies`, `companyStage`, `analytics`, `crm`, `advertising`, `ecommerce` | - / - |

## Sales Navigator (17)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| LinkedIn Company Lead Search Export |  | `liCompanyUrl`* | `firstName`, `lastName`, `fullName`, `snProfileUrl`, `liProfileUrl`, `profileLocation`, `companyName`, `liCompanyUrl`, `industry`, `jobTitle`, `headline`, `connectionDegree`, `isInvitePending` | 80 / 560 |
| LinkedIn Universal Company Converter |  | `liCompanyUrl`* | `companyName`, `liCompanyUrl` | 80 / 560 |
| Sales Navigator Account List Builder | yes | `liAccountListUrl`*, `liCompanyUrl`* |  | 80 / 560 |
| Sales Navigator Account List Creator | yes | `listName`*, `listDescription`* |  | 100 / 700 |
| Sales Navigator Account List Export |  | `accountListUrl`*, `maxCountSnAccountList` | `companyName`, `liCompanyUrl`, `industry` | 100 / 700 |
| Sales Navigator Account Scraper |  | `snCompanyUrl`* | `companyName`, `industry`, `liCompanyUrl` | 100 / 700 |
| Sales Navigator Account Search Export |  | `snAccountSearchUrl`*, `maxCountSnAccountSearch` | `companyName`, `liCompanyUrl`, `industry` | 100 / 700 |
| Sales Navigator Auto Connect | yes | `liProfileUrl`*, `messageContent` |  | 50 / 350 |
| Sales Navigator Auto Message | yes | `liProfileUrl`*, `messageText`*, `replyDetect` | `snProfileUrl`, `hasReplied` | 80 / 560 |
| Sales Navigator Inbox Scraper |  | `maxCount` | `lastMessageDate` | - / - |
| Sales Navigator Lead List Builder | yes | `liLeadListUrl`*, `liProfileUrl`* |  | 80 / 560 |
| Sales Navigator Lead List Creator | yes | `listName`*, `listDescription`* |  | 100 / 700 |
| Sales Navigator Lead List Export |  | `leadListUrl`*, `maxCountSnLeadList` | `firstName`, `lastName`, `fullName`, `snProfileUrl`, `liProfileUrl`, `profileLocation`, `companyName`, `liCompanyUrl`, `jobTitle`, `connectionDegree` | 80 / 560 |
| Sales Navigator Lead Scraper |  | `snProfileUrl`* | `firstName`, `lastName`, `fullName`, `headline`, `snProfileUrl`, `liProfileUrl`, `liPublicProfileUrl`, `jobTitle`, `companyName`, `liCompanyUrl`, `industry`, `connectionDegree`, `email`, `twProfileUrl`, `websiteUrl`, `isInvitePending` | 100 / 700 |
| Sales Navigator Lead Search Export |  | `snLeadSearchUrl`*, `rejectPrivateFilters`, `maxCountSnLeadsSearch` | `firstName`, `lastName`, `fullName`, `snProfileUrl`, `liProfileUrl`, `profileLocation`, `companyName`, `liCompanyUrl`, `industry`, `jobTitle`, `headline`, `connectionDegree`, `isInvitePending` | 80 / 560 |
| Sales Navigator Message Thread Scraper |  | `snThreadUrl`*, `count` | `lastMessageDate`, `firstName`, `lastName`, `fullName` | 100 / 700 |
| Sales Navigator Universal Profile Converter |  | `snProfileUrl`* | `firstName`, `lastName`, `fullName`, `liProfileUrl`, `liPublicProfileUrl`, `invitationState` | 80 / 560 |

## Google Maps (3)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Google Maps Reviews Scraper |  | `mapsPlaceUrl`*, `maxCount` | `fullName`, `reviewText`, `rating` | 150 / 1050 |
| Google Maps Search Export |  | `search`*, `maxCount` | `companyName`, `mapsUrl`, `averageRatings`, `reviewsCount`, `description`, `companyLocationAddress`, `placeId`, `websiteUrl`, `Phone`, `isOpen` | 150 / 1050 |
| Google My Business Scraper |  | `search`*, `location`, `maxCount` | `companyName`, `mapsUrl`, `averageRatings`, `category`, `description`, `companyLocationAddress`, `placeId`, `websiteUrl`, `Phone`, `isOpen` | 150 / 1050 |

## YouTube (5)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| YouTube Channel Scraper |  | `ytChannelUrl`* | `twProfileUrl` | - / - |
| YouTube Channel Videos Scraper |  | `ytChannelUrl`*, `maxCount` |  | - / - |
| YouTube Search Export |  | `ytSearchUrl`*, `maxCount` |  | - / - |
| YouTube Video Comment Scraper |  | `ytVideoUrl`*, `maxCount` | `commentText` | - / - |
| YouTube Video Scraper |  | `ytVideoUrl`* | `description`, `category` | - / - |

## LinkedIn Recruiter (2)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| LinkedIn Recruiter Auto Message | yes | `reProfileUrl`*, `subject`*, `body`*, `signature`* |  | 50 / 350 |
| LinkedIn Recruiter Search Export |  | `reSearchUrl`*, `maxCount` | `firstName`, `lastName`, `snProfileUrl`, `liProfileUrl`, `connectionDegree`, `companyName`, `followersCount`, `liCompanyUrl`, `industry`, `jobTitle`, `headline` | - / - |

## Slack (9)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Slack Auto Message | yes | `slWorkspaceIdToken`*, `slChannelId`*, `slUserId`, `slackMessageContent`* |  | 50 / 350 |
| Slack Channel Members Extractor |  | `slWorkspaceIdToken`*, `slChannelUrl`*, `maxCount` | `fullName`, `firstName`, `lastName`, `jobTitle`, `headline`, `liProfileUrl`, `twProfileUrl`, `email`, `Phone` | - / - |
| Slack Channel Threads Export |  | `slWorkspaceIdToken`*, `slChannelId`* | `fullName`, `firstName`, `reactionType` | - / - |
| Slack File Search Export |  | `slWorkspaceIdToken`*, `keywords`*, `maxCount` | `category` | - / - |
| Slack Message Search Export |  | `slWorkspaceIdToken`*, `keywords`*, `maxCount` | `category` | - / - |
| Slack People Search Export |  | `slWorkspaceIdToken`*, `keywords`*, `maxCount` | `category`, `fullName`, `firstName`, `lastName`, `jobTitle`, `liProfileUrl`, `twProfileUrl`, `email` | - / - |
| Slack Profile Scraper |  | `slWorkspaceIdToken`*, `slProfileUrl`* | `fullName`, `firstName`, `lastName`, `jobTitle`, `liProfileUrl`, `twProfileUrl`, `email` | - / - |
| Slack Thread Messages Export |  | `slWorkspaceIdToken`*, `slThreadUrl`* | `fullName`, `firstName`, `reactionType` | - / - |
| Slack Workspace Channels Export |  | `slWorkspaceIdToken`*, `maxCount` | `category` | - / - |

## Data cleaning (4)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Company Name Cleaner |  | `companyName`* | `cleanedCompanyName` | 10000 / 70000 |
| Google Business Name Cleaner |  | `googleBusinessName`* | `cleanedCompanyName` | 10000 / 70000 |
| Personal Name Cleaner |  | `personalName`* | `cleanedPersonalName` | 10000 / 70000 |
| Social Headline Cleaner |  | `liHeadline`* |  | 10000 / 70000 |

## Not in this build

These are in the TexAu V2 cloud catalog but not in TexAu Desktop 1.1.4: Reddit, Google Search, Crunchbase, Product Hunt, GitHub, Instagram, Facebook, email finders (Hunter, Snov, Datagma), email verifiers, CRMs (HubSpot, Pipedrive, Close), sequencers (Lemlist, Instantly), LinkedIn profile visit, invitation withdraw, groups, events attendees, people search export, tracking pixel extractor, company website finder. Call `list_automations` before telling the user one is missing. A newer build can have it.
