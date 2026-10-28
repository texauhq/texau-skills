# Report formats

Every TexAu deliverable uses one of these shapes. Keep the column names exactly. Other tools and later runs read them.

## Lead list CSV

One row per person or business. If the data is missing, leave the cell empty. Never fill it with a guess.

| Column | Required | Notes |
|---|---|---|
| `source` | yes | The TexAu automation that found the row, for example `LinkedIn Post Likers Export` |
| `source_run_id` | yes | The `runId`, so the user can open the run in TexAu |
| `signal` | yes | Why this lead, in plain words: "liked post on outbound, 2026-10-27" |
| `full_name`, `first_name` | people | |
| `title`, `company` | people | |
| `profile_url` | people | LinkedIn, X, or Reddit URL |
| `business_name`, `category`, `address`, `phone`, `website`, `rating`, `reviews`, `place_id` | businesses | From Google Maps |
| `email` | if found | |
| `email_status` | if `email` | `valid`, `catch-all`, `invalid`, or `unknown` |
| `fit` | if scored | `high`, `medium`, `low` |
| `fit_reason` | if scored | One sentence that names the columns behind the score |
| `notes` | no | Anything the user asked to capture |

After the file, report in chat:

```
Saved <path>: <N> rows (<total> found, <dropped> dropped).
Dropped: <x> duplicates, <y> outside the ICP, <z> with no <required field>.
Emails: <v> valid, <c> catch-all (kept in their own column), <i> invalid (dropped).
Next: <one concrete next step, with the automation and the row count>.
```

## Campaign report

Use the ledger: `node scripts/texau-ledger.mjs status --campaign <name>` and `usage --account <id>`.

```
Campaign <name> on <account name>, day <n>.
Sent: <invites> invites, <messages> messages (this week <usedWeek> of <limit>).
Accepted: <connected> of <invited> (<acceptanceRate>%). Replied: <replied> (<replyRate>%).
Due today: <count by step>. Next batch: <date>.
Health: <ok, or the first rule from linkedin-outreach "Account health" that fails, and the fix>.
Replies to handle: <name>: "<first line of reply>" -> <suggested next move>
```

## Research brief

```
Question: <one sentence the user will act on>
Answer: <three sentences or fewer>

| <entity> | <metric 1> | <metric 2> | <metric 3> | Source |
|---|---|---|---|---|

Evidence
- "<quote>" (<URL or run id>, <date>)
- <number> (<sample size>, <source>)

Gaps
- <what the data cannot show>
- <sample sizes, estimates marked as estimates>
```

## Run summary

For a single run that the user asked for:

```
<automation name>: <status>. <successRows> of <totalRows> rows done, <failedRows> failed.
Results: <path or "in TexAu, run <runId>">, <N> rows.
<If waiting: why, from pauseReason, and nextRowAt.>
```
