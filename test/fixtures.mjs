// Fixture catalog for the mock server. Names match the TexAu V2 public catalog.
// Ids are fake 24-character hex strings, like real platform and automation ids.
export const PLATFORMS = {
  linkedin: '622f03eb770f6bba0b8f0001',
  salesnav: '622f03eb770f6bba0b8f0002',
  google: '622f03eb770f6bba0b8f0003',
  websites: '622f03eb770f6bba0b8f0004',
  email: '622f03eb770f6bba0b8f0005',
  reddit: '622f03eb770f6bba0b8f0006',
  twitter: '622f03eb770f6bba0b8f0007',
  neverbounce: '622f03eb770f6bba0b8f0008',
};

let n = 0;
const oid = () => `6500000000000000000${String(++n).padStart(5, '0')}`;
const input = (name, label, extra = {}) => ({ name, label, type: 'text', required: true, description: '', ...extra });
const li = { platformId: PLATFORMS.linkedin, requiresAccount: true, cookiePlatform: 'linkedin' };

const A = (key, name, kind, props) => ({ id: oid(), key, name, kind, description: '', outputs: [], requiresAccount: false, ...props });

export const AUTOMATIONS = [
  A('postLikers', 'LinkedIn Post Likers Export', 'read', { ...li, description: 'Export the people who liked a LinkedIn post.', inputs: [input('postUrl', 'Post URL')], outputs: ['profileUrl', 'fullName', 'firstName', 'headline', 'degree'].map((o) => ({ name: o, label: o })), budget: 500, defaultResults: 87 }),
  A('postComments', 'LinkedIn Comments Scraper', 'read', { ...li, description: 'Export the commenters and comments of a post.', inputs: [input('postUrl', 'Post URL')], outputs: ['profileUrl', 'fullName', 'firstName', 'headline', 'comment'].map((o) => ({ name: o, label: o })), budget: 500, defaultResults: 24 }),
  A('profilePosts', 'LinkedIn Profile Posts Export', 'read', { ...li, description: 'Export the recent posts of a profile.', inputs: [input('profileUrl', 'Profile URL'), input('numberOfPosts', 'Number of posts', { type: 'number', required: false })], outputs: ['postUrl', 'postText', 'postedAt', 'likes', 'comments', 'isRepost'].map((o) => ({ name: o, label: o })), budget: 200, defaultResults: 10 }),
  A('connect', 'LinkedIn Auto Connect', 'write', { ...li, description: 'Send connection requests, with an optional note.', inputs: [input('profileUrl', 'Profile URL'), input('message', 'Connection note', { type: 'message', required: false, description: 'Max 200 characters on free accounts.' })], outputs: [{ name: 'status', label: 'status' }], budget: 20 }),
  A('message', 'LinkedIn Auto Message', 'write', { ...li, description: 'Send a message to 1st-degree connections.', inputs: [input('profileUrl', 'Profile URL'), input('message', 'Message', { type: 'message' })], outputs: [{ name: 'status', label: 'status' }], budget: 50 }),
  A('sentRequests', 'LinkedIn Sent Request Extractor', 'read', { ...li, description: 'Export the pending connection requests you sent.', inputs: [], outputs: ['profileUrl', 'sentAt'].map((o) => ({ name: o, label: o })), budget: 500, defaultResults: 12 }),
  A('connections', 'LinkedIn Connections Export', 'read', { ...li, description: 'Export your 1st-degree connections.', inputs: [], outputs: ['profileUrl', 'fullName', 'headline', 'connectedAt'].map((o) => ({ name: o, label: o })), budget: 500, defaultResults: 640 }),
  A('peopleSearch', 'LinkedIn People Search Export', 'read', { ...li, description: 'Export the results of a LinkedIn people search URL.', inputs: [input('searchUrl', 'Search URL')], outputs: ['profileUrl', 'fullName', 'headline', 'location'].map((o) => ({ name: o, label: o })), budget: 1000, defaultResults: 300 }),
  A('withdraw', 'LinkedIn Withdraw Invitation', 'write', { ...li, description: 'Withdraw pending connection requests.', inputs: [input('profileUrl', 'Profile URL')], outputs: [], budget: 100 }),
  A('connScraperA', 'Connection scraper', 'read', { ...li, description: 'Legacy connection scraper.', inputs: [input('sheetUrl', 'Google Sheet URL')], outputs: [], budget: 500 }),
  A('connScraperB', 'Connection scraper', 'read', { ...li, description: 'Legacy connection scraper (cloned).', inputs: [input('sheetUrl', 'Google Sheet URL')], outputs: [], budget: 500 }),
  A('snSearch', 'Sales Navigator Lead Search Export', 'read', { platformId: PLATFORMS.salesnav, requiresAccount: true, cookiePlatform: 'linkedin', needsSalesNav: true, description: 'Export a Sales Navigator lead search.', inputs: [input('searchUrl', 'Search URL')], outputs: ['profileUrl', 'fullName', 'title', 'company'].map((o) => ({ name: o, label: o })), budget: 2500 }),
  A('maps', 'Google Maps Extractor', 'read', { platformId: PLATFORMS.google, description: 'Extract places from a Google Maps search.', inputs: [input('query', 'Search query'), input('location', 'Location')], outputs: ['placeId', 'name', 'category', 'address', 'phone', 'website', 'rating', 'reviews', 'status'].map((o) => ({ name: o, label: o })), defaultResults: 60 }),
  A('websiteEmails', 'Website Email Scraper', 'read', { platformId: PLATFORMS.websites, description: 'Find email addresses on a website.', inputs: [input('websiteUrl', 'Website URL')], outputs: ['websiteUrl', 'email'].map((o) => ({ name: o, label: o })), defaultResults: 1 }),
  A('pixels', 'Website Tracking Pixel Extractor', 'read', { platformId: PLATFORMS.websites, description: 'Detect tracking pixels on a website.', inputs: [input('websiteUrl', 'Website URL')], outputs: ['websiteUrl', 'googleAdsTag', 'metaPixel', 'gtm'].map((o) => ({ name: o, label: o })), defaultResults: 1 }),
  A('verify', 'Email Verifier', 'read', { platformId: PLATFORMS.email, description: 'Verify an email address.', inputs: [input('email', 'Email')], outputs: ['email', 'status'].map((o) => ({ name: o, label: o })), defaultResults: 1 }),
  A('nbKey', 'Api Key Validation', 'read', { platformId: PLATFORMS.neverbounce, description: 'Never Bounce: check that an API key is valid.', inputs: [input('apiKey', 'API key')], outputs: [{ name: 'valid', label: 'valid' }] }),
  A('redditSearch', 'Reddit Posts Search Export', 'read', { platformId: PLATFORMS.reddit, description: 'Search Reddit posts by keyword.', inputs: [input('keyword', 'Keyword'), input('sort', 'Sort', { type: 'select', required: false, choices: [{ label: 'Relevance', value: 'relevance' }, { label: 'New', value: 'new' }, { label: 'Top', value: 'top' }] })], outputs: ['postUrl', 'title', 'subreddit', 'author', 'score', 'createdAt', 'text'].map((o) => ({ name: o, label: o })), defaultResults: 40 }),
  A('twitterSearch', 'Twitter Search Export', 'read', { platformId: PLATFORMS.twitter, requiresAccount: true, cookiePlatform: 'twitter', description: 'Export tweets from a search.', inputs: [input('query', 'Query')], outputs: ['tweetUrl', 'author', 'text'].map((o) => ({ name: o, label: o })), defaultResults: 50 }),
];

export const ACCOUNTS = [
  { id: 'acc_li_01', platform: 'linkedin', name: 'Dana Reyes', profileUrl: 'https://www.linkedin.com/in/dana-reyes', salesNavigator: false, recruiter: false, proxyId: null, lane: 'linkedin:direct' },
];

const FIRST = ['Priya', 'Marcus', 'Elena', 'Tom', 'Aisha', 'Ken', 'Sofia', 'Raj', 'Lena', 'Omar'];
const TITLES = ['Head of Growth at Brightline', 'Founder at Kitebox', 'VP Sales at Northwind', 'Marketing Manager at Acme', 'Student at State University', 'Recruiter at TalentCo', 'CEO at Fieldwork', 'SDR at Cloudly'];

export function rowsFor(key, total) {
  return Array.from({ length: total }, (_, i) => {
    const first = FIRST[i % FIRST.length];
    const base = { profileUrl: `https://www.linkedin.com/in/${first.toLowerCase()}-${i}`, fullName: `${first} Lee${i}`, firstName: first, headline: TITLES[i % TITLES.length] };
    switch (key) {
      case 'profilePosts': return { postUrl: `https://www.linkedin.com/posts/dana-reyes_activity-${7000 + i}`, postText: i === 0 ? 'Why most cold outreach fails: 3 lessons from 1,000 calls' : `Post ${i}`, postedAt: `2026-10-${String(27 - i).padStart(2, '0')}`, likes: 120 - i, comments: 20 - i, isRepost: false };
      case 'postLikers': return { ...base, degree: i % 5 === 0 ? '1st' : '2nd' };
      case 'postComments': return { ...base, comment: 'Great point.' };
      case 'sentRequests': return { profileUrl: `https://www.linkedin.com/in/${FIRST[i % FIRST.length].toLowerCase()}-${i * 7}`, sentAt: '2026-10-01' };
      case 'maps': return { placeId: `place_${i}`, name: `Smile Dental ${i}`, category: 'Dentist', address: `${100 + i} Main St, Chicago, IL`, phone: `+1 312 555 ${String(1000 + i)}`, website: i % 4 === 0 ? '' : `https://smiledental${i}.com`, rating: 3.5 + (i % 15) / 10, reviews: 5 + i * 3, status: i % 20 === 7 ? 'CLOSED_PERMANENTLY' : 'OPERATIONAL' };
      case 'redditSearch': return { postUrl: `https://reddit.com/r/sales/comments/${i}`, title: i % 3 === 0 ? 'Any alternative to HubSpot for a 5-person team?' : 'HubSpot pricing went up again', subreddit: i % 2 ? 'sales' : 'smallbusiness', author: `user${i}`, score: 40 - i, createdAt: '2026-10-20', text: 'Looking for something cheaper.' };
      case 'websiteEmails': return { websiteUrl: `https://smiledental${i}.com`, email: i % 3 === 0 ? '' : `${i % 2 ? 'info' : 'dr.patel'}@smiledental${i}.com` };
      case 'pixels': return { websiteUrl: `https://smiledental${i}.com`, googleAdsTag: i % 2 ? 'AW-1234' : '', metaPixel: i % 3 ? '' : '12345', gtm: i % 4 ? '' : 'GTM-ABC' };
      case 'verify': return { email: `contact${i}@example.com`, status: ['valid', 'valid', 'catch-all', 'invalid'][i % 4] };
      default: return base;
    }
  });
}
