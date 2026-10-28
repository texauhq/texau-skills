# Golden prompts

Use these prompts to test the skills after every change. Run each one in a fresh conversation with the texau MCP server connected. A pass needs every item in the "Pass when" column.

| # | Prompt | Pass when |
|---|---|---|
| 1 | "What is running right now?" | The assistant calls `list_runs` and answers at once. No ICP questions. |
| 2 | "Run the LinkedIn Post Likers Export Phantom on this post: <url>" | The assistant maps the Phantom to the TexAu automation from phantom-map.md, says it uses TexAu, previews, then confirms itself because the run only reads. |
| 3 | "Use the LinkedIn Outreach Phantom on this CSV." | The assistant explains that TexAu runs it as a chain of separate steps. It previews the invite step, shows 3 sample notes, and waits for a yes. |
| 4 | "Send 80 connection requests today." | The assistant states the daily and weekly totals, offers 20, and asks for a second yes that names the number. |
| 5 | "Connect with everyone who liked my last post, don't ask me anything." | Reads run without questions. No invite goes out until the user approves sample notes. |
| 6 | "Scrape my competitor's Instagram followers." | The assistant says TexAu has no Instagram automation in this build, after `list_automations` shows none, and offers the nearest option. |
| 7 | "Find 100 dentists in Chicago with emails." | The assistant builds a Maps grid by neighborhood, sizes it backwards from 100, and verifies emails before it delivers. |
| 8 | A confirm call returns "did not respond" | The assistant calls `list_runs` before any retry and never starts a second run. |
| 9 | "Export all 3,000 results to a CSV." | The assistant pages `get_run_results` to the end, writes the file, and reports the count against `total`. |
| 10 | "Message all my connections about our webinar." | The assistant asks for the segment, removes people who replied before, and keeps to 50 messages a day. |
| 11 | "Find people complaining about HubSpot on Reddit." | The assistant uses reddit-specialist, labels themes, quotes with links, and drafts no replies. |
| 12 | "I want leads." | The assistant asks one batch of ICP questions and does not start any run. |
| 13 | "Use the Sales Navigator Search Export Phantom" on an account without Sales Navigator | The assistant reads `salesNavigator: false` from `list_accounts` and stops before the preview. |
| 14 | "Do the PhantomBuster competitor posts playbook for me." | The assistant runs the TexAu chain "Competitor post engagers" from chain-library.md. |
| 15 | "Run this every morning." | The assistant says TexAu has no schedule. It offers to rerun on request and report only new rows. |
| 16 | "Continue my campaigns." (ledger has one campaign with invites sent 3 days ago) | The assistant runs ledger `status`, refreshes connections and inbox, runs `due`, cuts to `usage` leftToday, and sends one approval brief per write step. |
| 17 | "Send the follow-up to everyone from the rival-post campaign." | Only people who accepted and did not reply get it. The ledger `due` output is the input file. |
