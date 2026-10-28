---
name: texau-operator
description: Use when calling any tool on the texau MCP server (TexAu Desktop). Also use before any LinkedIn, Sales Navigator, Twitter, Reddit, Google, Maps, or enrichment automation, and when the user names a PhantomBuster Phantom or playbook.
---

# Operating TexAu Desktop over MCP

TexAu Desktop runs automations on the user's real accounts, from the user's own machine and IP. A write action (connect, message, InMail, follow, like, comment, post, invite, withdraw, delete) acts as the user and cannot be taken back. The server enforces preview, confirm, pacing, and daily limits. This skill adds what the server cannot know: what the user wants, who was already contacted, and whether the copy is good.

Every other TexAu skill uses this one. Read it fully before the first texau tool call in a conversation.

## Files in this skill

| File | Use it for |
|---|---|
| references/chain-library.md | Proven multi-step chains, warm to cold, with PhantomBuster names |
| references/phantom-map.md | PhantomBuster Phantom name to TexAu automation |
| references/report-formats.md | The exact shape of every deliverable: lead CSV, campaign report, research brief, run summary |
| references/golden-prompts.md | Test prompts to run after any change to the skills |
| scripts/texau-ledger.mjs | Campaign memory across days: steps sent, replies, connections, weekly usage, people to skip |

The ledger needs a shell. Run it as `node <this skill's folder>/scripts/texau-ledger.mjs <command>`. If the assistant has no shell (Claude Desktop without code execution, for example), say that campaign memory is off. Then keep a `contacted.csv` in the user's working folder and ask the user to keep it.

## Stages

Work through the stages in order. Do not start a stage until the previous one is done. Quick questions ("what is running?", "how many minutes are left?") skip to the one tool that answers them.

### 1. Intake

If the user names one automation and gives its inputs, intake is done. Otherwise ask for what is missing, in one message, with your defaults filled in so the user can just say yes:

- Goal: build a list, enrich a list, or reach people
- ICP: titles, industry, company size, location
- Input the user already has: post URL, search URL, CSV path, CRM list
- For outreach: the offer in one sentence, the tone, the sender account, a weekly volume goal
- Delivery: CSV path, CRM, sequencer

Done when: you can say the goal, the ICP, and the source in one sentence each.

### 2. Plan

Compare the request with references/chain-library.md.

- If the user named a Phantom, look it up in references/phantom-map.md. If they named a PhantomBuster playbook, look it up in the "Also known as" column of the chain library. Say in one sentence which TexAu automation or chain replaces it.
- If the user did not name a playbook or bring a list, and a warmer chain fits the goal, propose the warmer chain first. Warm chains get 3 to 5 times the replies of cold search.
- Compare the plan with the named mistakes at the end of this file.

Done when: you have an ordered list of automations, the input of each, and which steps write.

### 3. Resolve

1. `get_status`. If `minutesLeft` is 0 or the license is not `valid`, stop and tell the user.
2. `list_automations` with no arguments. Match each planned step by name and description. `platformId` takes the 24-character id from this result, never a word like `"linkedin"`. If two automations share a name, call `describe_automation` on both and keep the one whose inputs fit.
3. `describe_automation({ automationId, accountId })` for every step. Read `inputs` (name, type, required), `outputs`, `requiresAccount`, and `budget`.
4. If a step has `requiresAccount: true`, call `list_accounts`. Otherwise skip it. If two accounts fit, ask which one. A Sales Navigator automation needs `salesNavigator: true`. A Recruiter automation needs `recruiter: true`.

Done when: every step has a real `automationId` and the input names it expects. Steps that need an account also have an `accountId`.

### 4. Prepare the input

- One row: `run_automation` with `inputs` keyed by the input names from step 3.
- Up to 500 rows: `run_batch` with `rows`.
- More than 500 rows, or rows from a previous run: write a `.csv` file and pass `csvPath`. Up to 50,000 rows.
- If CSV headers differ from input names, pass `columnMap: { "<input name>": "<header>" }`.
- For a write step, remove people first: `node scripts/texau-ledger.mjs exclude --account <id> --csv <in> --out <out>` drops anyone this account already contacted and any duplicate. Also drop people who replied, existing connections (for invites), and pending invites.

Done when: the input file exists, its row count is known, and duplicates and contacted people are out.

### 5. Preview

Call the run tool without `confirm`. Read `rowCount`, `missingRequired`, `unmatchedColumns`, `invalidRows`, `invalidRowCount`, `budget`, `estimate`.

- `missingRequired` not empty: fix `columnMap` and preview again.
- `invalidRowCount` above 0: fix those rows (indexes are 0-based) or drop them, and preview again.
- `rowCount` above what `budget` allows today: cut the batch to today's allowance. Keep the rest for a later day.

Done when: the preview has no missing inputs, no invalid rows, and a row count within budget.

### 6. Approve

| The run | Who approves |
|---|---|
| Only reads or exports data (scraper, export, extractor, finder, search, verifier) | You confirm. The user asked for it, or it is a step inside a task the user asked for. |
| Writes as the user | The user. Send the approval brief below and wait for an explicit yes. "Just do it" approves reads, not copy the user has not seen. |
| Writes more than 20 invites or 20 messages on one account today (ledger `usage` plus this batch) | The user, twice. The second yes must name the number. `budget` stays a hard ceiling either way. |

The approval brief, every time, in this order:

```
Ready to send: <action> to <N> people from <account name>.
Today: <N> of <leftToday> left today (<usedWeek> of <week limit> this week).
Rest: <M> people go in later batches, next on <date>.
Removed: <x> already contacted, <y> duplicates, <z> replied.
Samples:
1. <name>, <headline>: "<exact text>"
2. ...
3. ...
Reply yes to send, or tell me what to change.
```

Done when: reads are confirmed, or the user said yes to this exact brief.

### 7. Run and follow

Confirm with the same arguments plus `confirm: true` and the `previewId`. A preview works once and lasts 10 minutes. Then call `get_run` until `status` is final. `pauseReason` and `nextRowAt` explain a run that waits. Waiting for a lane or for the next day is normal.

After a write run finishes, record it in the ledger with the rows that were sent: `node scripts/texau-ledger.mjs record --campaign <name> --step <step> --run <runId> --csv <sent rows>`. Create the campaign first with `campaign-add` (see linkedin-outreach).

Done when: the run is final and write steps are in the ledger.

### 8. Deliver

- Results: page `get_run_results` with `limit: 200`, `offset` 0, 200, 400, and on until `offset >= total`. Write each page to the file as you go. Do not hold thousands of rows in the conversation.
- Compare the rows written with `total`. If they differ, say so.
- Use the matching shape from references/report-formats.md.
- Report what `get_run` says. A run that is `running` has not "sent" anything yet.

Done when: the user has the file path, the row count against `total`, and the next step with its date.

## Errors

| Message from the server | What it means | What to do |
|---|---|---|
| "TexAu Desktop is not running" | The shim cannot reach the app, or AI access was never switched on | Ask the user to open TexAu. If it is open, ask them to switch on Settings > Extension > AI assistants. |
| "did not respond" | Timeout. After a confirm, the run can already exist. | Call `list_runs` and look for the run by name and time. If it exists, follow it. If not, preview again and confirm once. Never confirm twice without looking. |
| "AI assistant access is off" | The switch is off | Ask the user to switch it on. |
| "does not include AI assistant access" | The license has no MCP feature | Tell the user. Do not retry. |
| "connection token changed" | The token was regenerated | Ask the user to reconnect this client from the AI assistants section. |
| "No matching preview" | Expired, already used, or the arguments changed | Preview again with the final arguments. |
| "The CSV changed since the preview" | The file was edited after the preview | Preview again. |
| "proxy changed since the preview" | The account's proxy changed | Preview again. |
| "No column maps to the required inputs" | Headers do not match input names | Add `columnMap` and preview again. |
| "rows are invalid" | Some rows fail validation | Read `invalidRows` from the preview. Fix or drop those rows. |
| "needs an account" | `accountId` missing | Take one from `list_accounts`. |
| "does not have the access this automation needs" | No Sales Navigator or Recruiter on that account | Use another account, or the standard LinkedIn automation. |
| "is not part of your license" / "was not found" | Wrong id or the platform is not licensed | Call `list_automations` again. If the platform is missing, tell the user. |
| "csvPath must be a .csv file" / "Could not read the CSV" / "too large" | Bad path or file | Pass an absolute path to a `.csv` under 50 MB. |
| "Pass either rows or csvPath" | Both or neither were given | Pass exactly one. |
| "The tool failed unexpectedly" | Internal error in the app | Retry once. If it fails again, stop and tell the user the tool name and the time. |

## Named mistakes

Compare every plan with this table before step 6.

| # | Mistake | Why it hurts | Do instead |
|---|---|---|---|
| 1 | Guessing an id or input name | The call fails, or worse, the wrong automation runs | Read them from `list_automations` and `describe_automation` |
| 2 | Cold search, with a warm source available | Cold lists reply 3 to 5 times less | Offer post engagers, event attendees, followers, or connections first |
| 3 | Pitch in the connection note | Acceptance drops and reports rise | The note gives one reason to connect. The pitch waits for message 1. |
| 4 | Invite note over 200 characters | Free accounts cut or reject it | Count characters in every row |
| 5 | Message to people who are not 1st-degree | The message fails or uses InMail credits | Invite first, or use a group message, or InMail on Sales Navigator |
| 6 | One text for every row | Reads as spam | Build each text from that row's columns |
| 7 | A detail the row does not contain | Invented personalization is a lie in the user's name | For an empty column, use the approved fallback text |
| 8 | Contacting the same person twice | Looks like a bot, annoys the prospect | Run ledger `exclude` before every write batch |
| 9 | More than the daily budget | Restrictions and account bans | Cut the batch. Schedule the rest. |
| 10 | A spike after a quiet week | "Slide and spike" triggers LinkedIn checks | New or quiet accounts start at half volume and grow 10 to 20% a week |
| 11 | Follow-up the same day as the invite | Nobody accepted yet | Ledger `due` respects the gaps |
| 12 | Messaging someone who replied | Breaks the conversation | Ledger `reply` stops their sequence |
| 13 | Pending invites over 100 | Lowers trust in the account | Withdraw invites older than 14 days first |
| 14 | Full profile scrape before filtering | Burns budget on rows you drop | Filter by headline first, then scrape the rest |
| 15 | Pulling 5,000 rows into the chat | Context fills up, rows get lost | Page results into a file. Pass the file with `csvPath`. |
| 16 | Retrying a confirm after a timeout | Can send everything twice | `list_runs` first |
| 17 | Claiming "sent" for a running run | False report | Report the status `get_run` returns |
| 18 | Sales Navigator automation on a normal account | The server refuses it | Check `salesNavigator` in `list_accounts` |
| 19 | Promising a Phantom TexAu does not have | The user plans around a feature that is missing | phantom-map.md says `none`. Offer the nearest TexAu option. |
| 20 | Search export far above 1,000 (LinkedIn) or 2,500 (Sales Navigator) results | The export stops at the cap | Split the search by location, seniority, or company size |

## Testing

After any change to these skills, run references/golden-prompts.md, or the automated evals in the repo's `test/` folder.
