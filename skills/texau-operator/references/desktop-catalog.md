# TexAu Desktop catalog

Read from a real TexAu Desktop 1.2.0 on 2026-11-09 with `list_automations` and `describe_automation`. 119 automations. Regenerate with `node test/gen-catalog.mjs` after reading a newer build.

Use it to plan. Always resolve the id with `list_automations` at run time, because builds differ. Input names marked `*` are required. "Writes" means the automation acts as the user and needs the user's approval. Limits are the app defaults per account: rows per day and per week.

Key outputs show the output name and, in brackets, its label. `get_run_results` rows use the label as the column name, after `Input`, `Status`, and `Message`, and before `Raw result`. Every value is a string.

## LinkedIn (37)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| LinkedIn Alumni Search Export |  | `liSchoolUrl`*, `keyword`, `startYear`, `endYear`, `maxCountAlumni` | `fullName` (Full Name), `firstName` (First Name), `lastName` (LastName), `headline` (Headline), `jobTitle` (Job Title), `jobCompanyName` (Company Name), `liProfileUrl` (Profile URL), `liPublicProfileUrl` (Profile Public URL), `snProfileUrl` (SalesNav Profile URL), `connectionDegree` (Connection Degree) | 10 / 70 |
| LinkedIn Auto Accept Pending Connection | yes | `liProfileUrl`* |  | 40 / 280 |
| LinkedIn Auto Comment | yes | `liPostUrl`*, `liProfileUrl`, `comment`* | `liPostUrl` (Post URL), `fullName` (Full Name), `headline` (Headline), `liProfileUrl` (Profile URL) | 10 / 70 |
| LinkedIn Auto Connect | yes | `liProfileUrl`*, `messageContent` | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `companyName` (Company Name), `liPublicProfileUrl` (Public Profile URL), `liProfileUrl` (Profile URL), `snProfileUrl` (SalesNav Profile URL) | 80 / 560 |
| LinkedIn Auto Message | yes | `liProfileUrl`*, `message`* | `lastMessageDate` (Last Message Date), `hasReplied` (Replied), `liProfileUrl` (Profile URL) | 80 / 560 |
| LinkedIn Auto Reject Pending Connection | yes | `liProfileUrl`* |  | 40 / 280 |
| Linkedin Birthday Export |  | none (own account) | `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `liPublicProfileUrl` (Profile Public URL) | - / - |
| LinkedIn Comments Scraper |  | `liPostUrl`*, `sortOrder`, `maxCountPostCommenters` | `commentText` (Comment), `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `liProfileUrl` (Public Profile URL), `snProfileUrl` (SalesNav Profile URL), `connectionDegree` (Connection Degree), `headline` (Headline), `jobTitle` (Job Title), `jobCompanyName` (Job Company Name), `followersCount` (Followers Count) | 40 / 280 |
| LinkedIn Company Activity Extractor |  | `liCompanyUrl`*, `mode`*, `maxCountCompanyActivity` | `companyName` (Company Name), `postContent` (Post Content), `liPostUrl` (Post URL), `postDate` (Time Elapsed), `liJobUrl` (Job Ad URL), `commentsCount` (Comments Count) | 40 / 280 |
| LinkedIn Company Auto Follow | yes | `liCompanyUrl`* | `liCompanyUrl` (Company URL) | 40 / 280 |
| LinkedIn Company Employees Export |  | `liCompanyUrl`*, `keyword`, `maxCountCompanyEmployee` | `fullName` (Full Name), `firstName` (First Name), `lastName` (lastName), `headline` (Headline), `jobTitle` (Job Title), `companyName` (Company Name), `liProfileUrl` (Profile URL), `liPublicProfileUrl` (Profile Public URL), `snProfileUrl` (SalesNav Profile URL), `connectionDegree` (Relationship) | 40 / 280 |
| LinkedIn Company Follow Inviter | yes | `liProfileUrl`*, `liCompanyUrl`* | `liProfileUrl` (Profile Url) | - / - |
| LinkedIn Company Scraper |  | `liCompanyUrl`* | `companyName` (Company Name) | 30 / 210 |
| LinkedIn Connection Checker |  | `liProfileUrl`* | `isConnected` (Connected), `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `companyName` (Company Name), `connectionDegree` (Connection Degree), `snProfileUrl` (SalesNav Profile URL), `invitationState` (Invitation State) | 40 / 280 |
| LinkedIn Connections Export |  | `maxCountConnectionExport`, `filterDate` | `connectionDate` (Connection Date), `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `companyName` (Company Name), `liPublicProfileUrl` (Profile Public URL), `liProfileUrl` (Profile URL), `snProfileUrl` (SalesNav Profile URL) | - / - |
| LinkedIn Delete Post | yes | `liPostUrl`* | `liPostUrl` (Post URL) | - / - |
| LinkedIn Event Scraper |  | `liEventUrl`* | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `connectionDegree` (Connection Degree), `companyName` (Company Name) | - / - |
| LinkedIn Feed Scraper |  | `sortBy`, `maxCountLiFeedExtractor` | `liPostUrl` (Public Post Url) | - / - |
| LinkedIn Followers Export |  | `maxCountLiFollowerExport` | `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `liProfileUrl` (Profile URL), `headline` (Headline), `jobTitle` (Job Title), `companyName` (Company Name), `followersCount` (Followers Count) | - / - |
| LinkedIn Following Export |  | `maxCountLiFollowerExport` | `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `liProfileUrl` (Profile URL), `headline` (Headline), `jobTitle` (Job), `companyName` (Company Name), `followersCount` (Followers Count) | - / - |
| LinkedIn Inbox Scraper |  | `maxCountInboxThread` | `participantLiProfileUrl` (Participant Profile URL), `lastMessageText` (Last Message), `lastMessageDate` (Last Message Date), `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `liProfileUrl` (Profile URL), `liCompanyUrl` (Company Url) | 50 / 350 |
| LinkedIn Job Scraper |  | `liJobUrl`* | `jobTitle` (Job), `liJobUrl` (Job URL), `industry` (Industries), `companyName` (Company Name), `liCompanyUrl` (Company URL), `followersCount` (Followers Count) | - / - |
| LinkedIn Job Search Export |  | `liJobSearchUrl`*, `maxCountJobSearch` | `category` (Category), `companyName` (Company Name), `liCompanyUrl` (Company URL), `liJobUrl` (Job URL) | 80 / 560 |
| LinkedIn Message Thread Scraper |  | `liThreadUrl`* | `lastMessageDate` (Message Date), `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `liProfileUrl` (Profile Public URL) | - / - |
| LinkedIn Mutual Connections Export |  | `liProfileUrl`*, `maxCountMutualConnectionExport` | `fullName` (Full Name), `headline` (Headline), `connectionDegree` (Connection Degree) | 12000 / 84000 |
| LinkedIn Post Auto Like | yes | `liPostUrl`*, `reactionType`* | `liPostUrl` (Post URL) | - / - |
| LinkedIn Post Likers Export |  | `liPostUrl`*, `maxCountPostLikers` | `liPostUrl` (Post URL), `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `liProfileUrl` (Profile URL), `liPublicProfileUrl` (Public Profile URL), `snProfileUrl` (SalesNav Profile URL), `headline` (Headline), `jobTitle` (Job Title), `jobCompanyName` (Company Name), `connectionDegree` (Connection Degree), `reactionType` (Reaction Type) | 10 / 70 |
| LinkedIn Post Scraper |  | `liPostUrl`* | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `jobCompanyName` (Job Company Name), `snProfileUrl` (SalesNav Profile URL), `companyName` (Company Name), `liCompanyUrl` (Company URL), `postContent` (Post Content), `liPostUrl` (Post URL), `postDate` (Post Date), `commentsCount` (Comments Count), `liJobUrl` (Job URL) | 50 / 350 |
| LinkedIn Profile Activity Export |  | `liProfileUrl`*, `maxCount` | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `jobCompanyName` (Job Company Name), `liProfileUrl` (Profile Public URL), `snProfileUrl` (SalesNav Profile URL), `liCompanyUrl` (Company URL), `liPostUrl` (Post URL), `postContent` (Post Content), `postDate` (Post Date), `liJobUrl` (Job Ad URL), `commentsCount` (Comments Count) | 40 / 280 |
| LinkedIn Profile Posts Export |  | `liProfileUrl`*, `maxCount` | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `jobCompanyName` (Job Company Name), `liPublicProfileUrl` (Profile Public URL), `snProfileUrl` (SalesNav Profile URL), `companyName` (Company Name), `liPostUrl` (Post URL), `postContent` (Post Content), `postDate` (Post Date), `liJobUrl` (Job Ad URL), `commentsCount` (Comments Count) | - / - |
| LinkedIn Profile Scraper |  | `liProfileUrl`* | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `liProfileUrl` (Profile URL), `liPublicProfileUrl` (Profile Public URL), `industry` (Profile Industry), `companyName` (Company Name), `jobTitle` (Job Title), `liJobUrl` (Job Ad URL) | 50 / 350 |
| LinkedIn Received Connection Extractor |  | none (own account) | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `jobTitle` (Job Title), `companyName` (Company Name), `liPublicProfileUrl` (Profile Public URL), `liProfileUrl` (Profile URL), `snProfileUrl` (SalesNav Profile URL), `invitationDate` (Invitation Date) | 40 / 280 |
| LinkedIn Reposters Export |  | `liPostUrl`*, `maxCountReposters` | `firstName` (First Name), `lastName` (Last Name), `liProfileUrl` (Profile URL), `liPublicProfileUrl` (Public Profile URL), `snProfileUrl` (SalesNav Profile URL), `companyName` (Reposted Company Name), `liCompanyUrl` (Reposted Company URL) | 100 / 700 |
| LinkedIn Saved Jobs Export |  | `mode`*, `maxCountSavedJobsExport` | `category` (Category), `companyName` (Company Name), `liCompanyUrl` (Company URL), `jobTitle` (Job Title), `liJobUrl` (Job URL) | - / - |
| LinkedIn School Scraper |  | `liSchoolUrl`* |  | - / - |
| LinkedIn Sent Request Extractor |  | none (own account) | `firstName` (First Name), `lastName` (Last Name), `headline` (Headline), `liPublicProfileUrl` (Profile Public URL), `liProfileUrl` (Profile URL), `snProfileUrl` (SalesNav Profile URL), `invitationDate` (Invitation Date) | 40 / 280 |
| LinkedIn Universal Profile Converter |  | `liProfileUrl`* | `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name), `liProfileUrl` (LinkedIn Profile URL), `snProfileUrl` (Sales Navigator Profile URL), `invitationState` (Invitation State) | 80 / 560 |

## X (Twitter) (32)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Twitter Auto Follow | yes | `twProfileUrl`* | `name` (Name), `screenName` (Handle), `description` (Bio), `email` (Email), `websiteUrl` (Website URL), `followersCount` (Followers Count), `location` (Location) | 400 / 2800 |
| Twitter Auto Like | yes | `twPostUrl`* |  | 4000 / 28000 |
| Twitter Auto Message | yes | `twProfileUrl`*, `message`*, `replyDetection` | `twProfileUrl` (Twitter Profile URL), `lastMessageDate` (Message Date) | 50 / 350 |
| Twitter Auto Post | yes | `messageText`*, `sharingPermission` | `postContent` (Post Content), `twPostUrl` (Post URL), `postDate` (Post Date), `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website URL), `followersCount` (Followers Count), `location` (Location) | 1200 / 8400 |
| Twitter Auto Reply | yes | `twPostUrl`*, `comment`* | `screenName` (Replying to Profile Handle), `name` (Replying to Profile Name), `twProfileUrl` (Replying to Profile URL), `twPostUrl` (Replying To Tweet URL) | 1200 / 8400 |
| Twitter Auto Retweet | yes | `twPostUrl`* | `twPostUrl` (Post URL) | 40 / 280 |
| Twitter Bookmarks Export |  | none (own account) | `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile), `description` (Bio), `canDm` (DM Open), `followersCount` (Followers), `twPostUrl` (Post URL), `postDate` (Post Date), `postContent` (Post Content), `location` (Location) | 4000 / 28000 |
| Twitter Direct Messages Export |  | `twProfileUrl`* | `twProfileUrl` (Input Profile URL), `lastMessageDate` (Message Date), `name` (Name), `screenName` (Handle), `description` (Bio), `email` (Email), `websiteUrl` (Website URLs), `location` (Location Search), `followersCount` (Followers Count) | 14400 / 100800 |
| Twitter Followers/Following Export |  | `twExtractionMode`*, `twProfileUrl`*, `maxCount` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Description), `canDm` (DM Open), `followersCount` (Followers), `location` (Location) | 1600 / 11200 |
| Twitter Home Timeline Export |  | none (own account) | `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile), `description` (Bio), `websiteUrl` (Website  URL), `canDm` (DM Open), `followersCount` (Followers), `twPostUrl` (Post URL), `postDate` (Post Date), `postContent` (Post Content), `location` (Location) | 4000 / 28000 |
| Twitter Impressions Export |  | `twPostUrl`* |  | 16000 / 112000 |
| Twitter Inbox Scraper |  | none (own account) | `lastMessageDate` (Last Message Date) | 28800 / 201600 |
| Twitter List Export |  | `twListUrl`* | `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website URL), `canDm` (DM Open), `followersCount` (Followers Count), `twPostUrl` (Post URL), `postDate` (Post Date), `postContent` (Post Content), `location` (Location Search) | 4000 / 28000 |
| Twitter List Members Export |  | `twListUrl`*, `twListMemberMaxCount` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website URLs), `canDm` (DM Open), `followersCount` (Followers Count), `location` (Location) | - / - |
| Twitter List Membership Export |  | `twProfileUrl`* | `twProfileUrl` (Profile URL), `canDm` (DM Open), `description` (Bio), `email` (Email), `followersCount` (Followers Count), `location` (Location), `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `websiteUrl` (Website URL) | 16000 / 112000 |
| Twitter List Search Export |  | `searchKeyword`*, `maxCountTwitterSearch` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website URL), `canDm` (DM Open), `followersCount` (Followers Count), `location` (Location) | 20 / 140 |
| Twitter List Subscribers Export |  | `twListUrl`*, `maxCount` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Bio), `email` (Email), `canDm` (DM Open), `followersCount` (Followers Count), `location` (Location) | 16000 / 112000 |
| Twitter People List Builder | yes | `twListUrl`*, `twProfileUrl`* | `twProfileUrl` (Profile URL), `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `email` (Email), `description` (Bio), `websiteUrl` (Website URL), `canDm` (DM Open), `followersCount` (Followers Count), `location` (Location) | 4000 / 28000 |
| Twitter Poll Votes Export |  | `twPostUrl`* | `twPostUrl` (Post URL) | 300 / 2100 |
| Twitter Profile Followed Topics Export |  | `twProfileUrl`* | `twProfileUrl` (Twitter Profile URL) | 800 / 5600 |
| Twitter Profile Media Export |  | `twProfileUrl`*, `maxCountProfileMedia` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website URL), `canDm` (DM Open), `followersCount` (Followers), `twPostUrl` (Post URL), `postDate` (Post Date), `postContent` (Post Content), `location` (Location) | 4000 / 28000 |
| Twitter Profile Scraper |  | `twProfileUrl`* | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `email` (Email), `description` (Bio), `websiteUrl` (Websites), `canDm` (DM Open), `followersCount` (Followers), `location` (Location) | 760 / 5320 |
| Twitter Profile Subscribed Lists |  | `twProfileUrl`* | `canDm` (DM Open), `description` (Bio), `email` (Email), `followersCount` (Followers Count), `location` (Location), `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `websiteUrl` (Website URL) | 16000 / 112000 |
| Twitter Profile Tweets and Replies Export |  | `twProfileUrl`*, `maxProfileTweetAndRepliesCount` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile), `description` (Bio), `email` (Email), `websiteUrl` (Website  URL), `canDm` (DM Open), `followersCount` (Followers), `twPostUrl` (Post URL), `postDate` (Post Date), `postContent` (Post Content), `location` (Location) | 100 / 700 |
| Twitter Profile Tweets Export |  | `twProfileUrl`*, `maxProfileTweetCount` | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website URL), `canDm` (DM Open), `followersCount` (Followers Count), `twPostUrl` (Post URL), `postDate` (Post Date), `postContent` (Post Content), `location` (Location) | 100 / 700 |
| Twitter Quote Retweets Export |  | `twPostUrl`*, `maxCount` | `twPostUrl` (Post URL), `postContent` (Post Content), `postDate` (Post Date), `name` (Full Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `canDm` (DM Open), `location` (Location ), `description` (Bio), `email` (Email), `websiteUrl` (Website URLs), `followersCount` (Followers Count) | 200 / 1400 |
| Twitter Retweet List Extractor |  | `twPostUrl`*, `maxCount` | `twPostUrl` (Post URL), `postDate` (Post Date), `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile URL), `description` (Bio), `websiteUrl` (Websites), `canDm` (DM Open), `followersCount` (Followers), `location` (Location) | 4000 / 28000 |
| Twitter Search Extractor |  | `twAdvancedSearchUrl`*, `category`, `maxCountTwitterSearch` | `twPostUrl` (Post URL), `postContent` (Post Content), `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile URL), `description` (Bio), `websiteUrl` (Website URL), `canDm` (DM Open), `followersCount` (Followers Count), `postDate` (Post Date), `location` (Location Search) | 10 / 70 |
| Twitter Space Scraper |  | `twSpaceUrl`* | `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL) | 16000 / 112000 |
| Twitter Thread Export |  | `twPostUrl`*, `maxCount` | `twPostUrl` (Tweet URL), `name` (Name), `screenName` (Handle), `twProfileUrl` (Twitter Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website  URL), `postContent` (Post Content), `postDate` (Post Date), `canDm` (DM Open), `followersCount` (Followers) | 1000 / 7000 |
| Twitter Trends Export |  | none (own account) | `location` (Location) | - / - |
| Twitter Tweet Scraper |  | `twPostUrl`* | `twPostUrl` (Post URL), `postDate` (Post Date), `name` (Name), `screenName` (Handle), `twProfileUrl` (Profile URL), `description` (Bio), `email` (Email), `websiteUrl` (Website  URL), `postContent` (Post Content), `canDm` (DM Open), `followersCount` (Followers Count), `location` (Location) | 1200 / 8400 |

## Websites (5)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Website Email And Social Links Scraper |  | `companyWebsiteUrl`*, `crawlDepth` | `siteUrl` (Website URL), `companyName` (Company Name), `email` (Email), `phones` (Phone) | 10000 / 70000 |
| Website Metadata Extractor |  | `siteUrl`* | `siteUrl` (Website Url), `description` (Description) | - / - |
| Website Schema Extractor |  | `siteUrl`* | `siteUrl` (Website Url) | - / - |
| Website Scraper |  | `websiteUrl`*, `scrapeAboutUsAsWell`, `scrapeBlog` | `siteUrl` (Website URL) | 10000 / 70000 |
| Website Technographic Data Finder |  | `siteUrl`* | `siteUrl` (Website Url), `technologies` (Technologies), `companyStage` (Company Stage), `analytics` (Analytics), `crm` (CRM), `advertising` (Advertising), `ecommerce` (Ecommerce) | - / - |

## Sales Navigator (17)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| LinkedIn Company Lead Search Export |  | `liCompanyUrl`* | `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name), `snProfileUrl` (SalesNav Profile URL), `liProfileUrl` (Profile URL), `profileLocation` (Profile Location), `companyName` (Company Name), `liCompanyUrl` (Company URL), `industry` (Industry), `jobTitle` (Job Title), `headline` (Headline), `connectionDegree` (Connection Degree), `isInvitePending` (Invite Pending) | 80 / 560 |
| LinkedIn Universal Company Converter |  | `liCompanyUrl`* | `companyName` (Company Name), `liCompanyUrl` (Company URN) | 80 / 560 |
| Sales Navigator Account List Builder | yes | `liAccountListUrl`*, `liCompanyUrl`* |  | 80 / 560 |
| Sales Navigator Account List Creator | yes | `listName`*, `listDescription`* |  | 100 / 700 |
| Sales Navigator Account List Export |  | `accountListUrl`*, `maxCountSnAccountList` | `companyName` (Company Name), `liCompanyUrl` (Company URL), `industry` (Industry) | 100 / 700 |
| Sales Navigator Account Scraper |  | `snCompanyUrl`* | `companyName` (Company Name), `industry` (Industry), `liCompanyUrl` (Company URL) | 100 / 700 |
| Sales Navigator Account Search Export |  | `snAccountSearchUrl`*, `maxCountSnAccountSearch` | `companyName` (Company Name), `liCompanyUrl` (Company URL), `industry` (Industry) | 100 / 700 |
| Sales Navigator Auto Connect | yes | `liProfileUrl`*, `messageContent` |  | 50 / 350 |
| Sales Navigator Auto Message | yes | `liProfileUrl`*, `messageText`*, `replyDetect` | `snProfileUrl` (SalesNav Profile URL), `hasReplied` (Replied) | 80 / 560 |
| Sales Navigator Inbox Scraper |  | `maxCount` | `lastMessageDate` (Message Date) | - / - |
| Sales Navigator Lead List Builder | yes | `liLeadListUrl`*, `liProfileUrl`* |  | 80 / 560 |
| Sales Navigator Lead List Creator | yes | `listName`*, `listDescription`* |  | 100 / 700 |
| Sales Navigator Lead List Export |  | `leadListUrl`*, `maxCountSnLeadList` | `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name), `snProfileUrl` (SalesNav Profile URL), `liProfileUrl` (Profile URL), `profileLocation` (Profile Location), `companyName` (Company Name), `liCompanyUrl` (Company URL), `jobTitle` (Job Title), `connectionDegree` (Relationship) | 80 / 560 |
| Sales Navigator Lead Scraper |  | `snProfileUrl`* | `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name), `headline` (Headline), `snProfileUrl` (SalesNav Profile URL), `liProfileUrl` (Profile URL), `liPublicProfileUrl` (Profile Public URL), `jobTitle` (Job Title), `companyName` (Company Name), `liCompanyUrl` (Company URL), `industry` (Industry), `connectionDegree` (Connection Degree), `email` (Email), `twProfileUrl` (Twitter Profile URL), `websiteUrl` (Website URL), `isInvitePending` (Is Invite Pending) | 100 / 700 |
| Sales Navigator Lead Search Export |  | `snLeadSearchUrl`*, `rejectPrivateFilters`, `maxCountSnLeadsSearch` | `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name), `snProfileUrl` (SalesNav Profile URL), `liProfileUrl` (Profile URL), `profileLocation` (Profile Location), `companyName` (Company Name), `liCompanyUrl` (Company URL), `industry` (Industry), `jobTitle` (Job Title), `headline` (Headline), `connectionDegree` (Connection Degree), `isInvitePending` (Invite Pending) | 80 / 560 |
| Sales Navigator Message Thread Scraper |  | `snThreadUrl`*, `count` | `lastMessageDate` (Last Message Date), `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name) | 100 / 700 |
| Sales Navigator Universal Profile Converter |  | `snProfileUrl`* | `firstName` (First Name), `lastName` (Last Name), `fullName` (Full Name), `liProfileUrl` (LinkedIn Profile URL), `liPublicProfileUrl` (LinkedIn Profile Public URL), `invitationState` (Invitation State) | 80 / 560 |

## Google Maps (3)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Google Maps Reviews Scraper |  | `mapsPlaceUrl`*, `maxCount` | `fullName` (Full Name), `reviewText` (Review), `rating` (Rating) | 150 / 1050 |
| Google Maps Search Export |  | `search`*, `maxCount` | `companyName` (Company Name), `mapsUrl` (Maps URL), `averageRatings` (Ratings), `reviewsCount` (Reviews Count), `description` (Description), `companyLocationAddress` (Address), `placeId` (Place ID), `websiteUrl` (Website URL), `Phone` (phone), `isOpen` (Open) | 150 / 1050 |
| Google My Business Scraper |  | `search`*, `location`, `maxCount` | `companyName` (Company Name), `mapsUrl` (Maps URL), `averageRatings` (Ratings), `category` (Category), `description` (Description), `companyLocationAddress` (Address), `placeId` (Place ID), `websiteUrl` (Website URL), `Phone` (Phone), `isOpen` (Open) | 150 / 1050 |

## Reddit (5)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Reddit Communities Search Export |  | `keywords`*, `maxCount` | `subredditName` (SubReddit Name), `redSubUrl` (SubReddit URL), `subscribersCount` (Subscribers Count) | 50 / 350 |
| Reddit Posts Search Export |  | `redSearchUrl`*, `subReddit`, `sort`, `timeRange`, `safeSearch`, `restrictSubreddit`, `maxCount` | `subredditName` (SubReddit Name), `redSubUrl` (SubReddit URL), `subscribersCount` (Subscribers Count), `redPostUrl` (Post URL), `postContent` (Post Content), `postTitle` (Post Title), `postDate` (Post Date), `handle` (Profile Handle), `redProfileUrl` (Profile URL), `commentsCount` (Comments Count), `upvotesCount` (Upvotes Count) | - / - |
| Reddit Subreddit Posts Export |  | `subRedditUrl`*, `maxCount`, `sort` | `subredditName` (SubReddit Name), `redSubUrl` (SubReddit URL), `subscribersCount` (Subscribers Count), `redPostUrl` (Post URL), `postContent` (Post Content), `postTitle` (Post Title), `postDate` (Post Date), `handle` (Profile Handle), `redProfileUrl` (Profile URL), `commentsCount` (Comments Count), `upvotesCount` (Upvotes Count) | - / - |
| Reddit Trends Export |  | `locationFilter`, `sortBy` | `subredditName` (SubReddit Name), `redSubUrl` (SubReddit URL), `subscribersCount` (Subscribers Count), `redPostUrl` (Post URL), `postTitle` (Post Title), `postDate` (Post Date), `handle` (Handle), `redProfileUrl` (Profile URL), `commentsCount` (Comments Count), `upvotesCount` (Upvotes Count) | - / - |
| Reddit User Search Export |  | `keyword`*, `maxCount` | `name` (Name), `handle` (Handle), `redProfileUrl` (Profile URL), `description` (Description), `subscribersCount` (Subscribers Count) | - / - |

## YouTube (5)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| YouTube Channel Scraper |  | `ytChannelUrl`* | `handle` (Handle), `subscribersCount` (Subscribers Count), `twProfileUrl` (Twitter Profile) | - / - |
| YouTube Channel Videos Scraper |  | `ytChannelUrl`*, `maxCount` | `handle` (Handle), `subscribersCount` (Subscribers Count) | - / - |
| YouTube Search Export |  | `ytSearchUrl`*, `maxCount` | `handle` (Handle) | - / - |
| YouTube Video Comment Scraper |  | `ytVideoUrl`*, `maxCount` | `commentText` (Comment), `handle` (Handle) | - / - |
| YouTube Video Scraper |  | `ytVideoUrl`* | `description` (Description), `category` (Category), `commentsCount` (Comments Count) | - / - |

## LinkedIn Recruiter (2)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| LinkedIn Recruiter Auto Message | yes | `reProfileUrl`*, `subject`*, `body`*, `signature`* |  | 50 / 350 |
| LinkedIn Recruiter Search Export |  | `reSearchUrl`*, `maxCount` | `firstName` (First Name), `lastName` (Last Name), `snProfileUrl` (SalesNav Profile URL), `liProfileUrl` (Profile URL), `connectionDegree` (Connection Degree), `companyName` (Company Name), `followersCount` (Followers Count), `liCompanyUrl` (Company URL), `industry` (Industry), `jobTitle` (Job Title), `headline` (Headline) | - / - |

## Slack (9)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Slack Auto Message | yes | `slWorkspaceIdToken`*, `slChannelId`*, `slUserId`, `slackMessageContent`* |  | 50 / 350 |
| Slack Channel Members Extractor |  | `slWorkspaceIdToken`*, `slChannelUrl`*, `maxCount` | `handle` (Handle), `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `jobTitle` (jobTitle), `headline` (Headline), `liProfileUrl` (LinkedIn Profile), `twProfileUrl` (Twitter Profile), `email` (Email), `Phone` (Phone) | - / - |
| Slack Channel Threads Export |  | `slWorkspaceIdToken`*, `slChannelId`* | `fullName` (Full Name), `firstName` (First Name), `reactionType` (Reaction Type) | - / - |
| Slack File Search Export |  | `slWorkspaceIdToken`*, `keywords`*, `maxCount` | `category` (Category) | - / - |
| Slack Message Search Export |  | `slWorkspaceIdToken`*, `keywords`*, `maxCount` | `category` (Category), `handle` (Handle) | - / - |
| Slack People Search Export |  | `slWorkspaceIdToken`*, `keywords`*, `maxCount` | `category` (Category), `handle` (Handle), `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `jobTitle` (Job Title), `liProfileUrl` (LinkedIn Profile), `twProfileUrl` (Twitter Profile), `email` (Email) | - / - |
| Slack Profile Scraper |  | `slWorkspaceIdToken`*, `slProfileUrl`* | `handle` (Handle), `fullName` (Full Name), `firstName` (First Name), `lastName` (Last Name), `jobTitle` (Job Title), `liProfileUrl` (LinkedIn Profile), `twProfileUrl` (Twitter Profile), `email` (Email) | - / - |
| Slack Thread Messages Export |  | `slWorkspaceIdToken`*, `slThreadUrl`* | `fullName` (Full Name), `firstName` (First Name), `reactionType` (Reaction Type) | - / - |
| Slack Workspace Channels Export |  | `slWorkspaceIdToken`*, `maxCount` | `category` (Category) | - / - |

## Data cleaning (4)

| Automation | Writes | Inputs | Key outputs | Limit (day / week) |
|---|---|---|---|---|
| Company Name Cleaner |  | `companyName`* | `cleanedCompanyName` (Output Company Name) | 10000 / 70000 |
| Google Business Name Cleaner |  | `googleBusinessName`* | `cleanedCompanyName` (Output Google Business Name) | 10000 / 70000 |
| Personal Name Cleaner |  | `personalName`* | `cleanedPersonalName` (Output Personal Name) | 10000 / 70000 |
| Social Headline Cleaner |  | `liHeadline`* |  | 10000 / 70000 |

## Not in this build

These products are in the TexAu V2 cloud catalog. They are not in TexAu Desktop 1.2.0.

- Google Search, Crunchbase, Product Hunt, GitHub, Instagram, and Facebook.
- Email finders (Hunter, Snov, Datagma) and email verifiers.
- CRMs (HubSpot, Pipedrive, Close) and sequencers (Lemlist, Instantly).
- LinkedIn profile visit, invitation withdraw, groups, event attendees, and people search export.
- Tracking pixel extractor and company website finder.

Reddit is in this build. Call `list_automations` before you say that one of the items above is missing. A newer build can add it.
