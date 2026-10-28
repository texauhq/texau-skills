---
name: texau-operator
description: Use when calling any tool on the texau MCP server (TexAu Desktop). Also use before any LinkedIn, Sales Navigator, Twitter, Reddit, Google, Maps, or enrichment automation, and when the user names a PhantomBuster Phantom or playbook.
---

# Operating TexAu Desktop over MCP

## Overview

TexAu Desktop runs automations on the user's real accounts, from the user's own machine. Every write action (connect, message, follow, comment, post) acts as the user and cannot be taken back. The MCP server enforces preview, confirm, pacing, and daily limits. Your job has three parts. Resolve real ids. Show the user an honest preview. Keep large results out of your context.

## Before the first run

Answer quick status questions ("what is running?") at once. If the user names one automation and gives its inputs, run the loop below with no extra questions. For a list-building or outreach goal, collect what is missing in one batch of questions. Do not start that work until you have these:

- Goal: build a list, enrich a list, or reach people
- ICP: title, industry, company size, location
- What the user already has: a post URL, a search URL, a CSV, a CRM list
- For outreach: the offer in one sentence, the tone, and a weekly volume goal

Then compare the plan with references/chain-library.md. If the user did not name a playbook or bring a list, and a warmer chain fits the goal, propose it first in one sentence. If the user named a playbook or brought a list, run it and mention the warmer option once at the end.

## PhantomBuster names

If the user names a Phantom, look it up in references/phantom-map.md. If the user names a PhantomBuster playbook or workflow, look it up in the "Also known as" column of references/chain-library.md. Tell the user the TexAu automation or chain you will run in its place, in one sentence. Then run the TexAu version with this skill.

- exact or close: run the mapped automation. For close, state the difference.
- chain: run each step as its own TexAu run.
- none: say TexAu has no equivalent in this build. Call `list_automations` first, because the desktop build can have more. Offer the same job on a platform TexAu has (LinkedIn or X instead of Instagram or Facebook), or to enrich a CSV the user gets elsewhere.

Do not call PhantomBuster tools for a TexAu task. If a PhantomBuster MCP server is also connected, ask the user which account and tool to use.

## The run loop

1. `get_status`. If `minutesLeft` is 0 or the license is not `valid`, stop and tell the user.
2. `list_accounts`. Only automations with `requiresAccount: true` in `describe_automation` need one. Take `id` from the result. If two accounts match the platform, ask which one. Note `salesNavigator` and `recruiter` flags.
3. `list_automations`. Call it with no arguments first. `platformId` takes the 24-character id from that result, never a name like `"linkedin"`. Pick by name and description. If two automations share a name, call `describe_automation` on both and pick by inputs.
4. `describe_automation({ automationId, accountId })`. Read `inputs` (name, type, required), `outputs`, and `budget`. The budget says how many rows the account can still run today.
5. Preview: `run_automation` or `run_batch` without `confirm`. Read `rowCount`, `missingRequired`, `unmatchedColumns`, `invalidRows`, `budget`, `estimate`.
6. Confirm (rules below): same arguments plus `confirm: true` and the `previewId`.
7. Follow: `get_run` until `status` is final. `pauseReason` and `nextRowAt` explain a waiting run. Waiting for a lane or the next day is normal, not an error.
8. Results: `get_run_results` pages of up to 200 rows. Loop on `offset` until `offset >= total`.

## When you can confirm without asking

| Automation does | Confirm yourself? |
|---|---|
| Reads or exports data (scraper, export, extractor, finder, search) | Yes. The user must have asked for it, or it is a step (such as removing duplicates) inside a task the user asked for. |
| Writes as the user (connect, message, InMail, comment, like, follow, post, invite, withdraw, delete) | No. Show the preview and 3 sample rows of the final text. Wait for an explicit yes. |

"Just do it" or "no questions" approves reading. It does not approve text you wrote that the user has not seen.

## Volume and pacing

- Keep `pace.mode: "auto"`. LinkedIn and Twitter always run paced. The server ignores `off` for them.
- Never plan more rows than `budget` allows today. Split the rest into a later batch and say so.
- LinkedIn connection requests: 10 a day on a new or quiet account, 20 a day and 100 a week on an established one. linkedin-outreach has the full table.
- `budget` is a hard ceiling. A second yes from the user can raise a plan up to `budget`, never past it.
- Before a connect or message batch, drop rows the user already contacted: past runs in `list_runs`, pending invites (the sent-request export), existing connections.

## Moving data between runs

- Inline `rows` holds at most 500 rows. For more, write a `.csv` file and pass `csvPath` (up to 50,000 rows).
- If headers differ from input names, map them with `columnMap: { "<input name>": "<column header>" }`.
- The server has no export tool. To give the user a CSV, page all results and write the file yourself. Report the row count you wrote and compare it with `total`.

## Errors

| Message | What to do |
|---|---|
| "TexAu Desktop is not running" | Ask the user to open the app. If it is open, ask them to switch on AI assistants (Settings, Extension). |
| "did not respond" after a confirm | The run can already exist. Call `list_runs` and look for it before any retry. Never confirm twice blind. |
| "No matching preview" | Preview again. Arguments must match exactly, and a preview lasts 10 minutes and works once. |
| "rows are invalid" | Read `invalidRows` from the preview, fix those rows, preview again. |
| "access this automation needs" | The account lacks Sales Navigator or Recruiter. Pick another account or automation. |

## Common mistakes

- Guessing ids or input names instead of reading them from list and describe calls.
- Pulling 5,000 result rows into the conversation to build a CSV. Pass the file with `csvPath` to the next run instead.
- Writing one generic pitch for every row. Personalize from columns the previous run produced, and keep LinkedIn invite notes under 200 characters.
- Reporting "sent" for a run that is still `running`. Report what `get_run` says.

## Testing

After any change to these skills, run references/golden-prompts.md.
