# TexAu Desktop MCP: DX live audit (2026-10-28, branch feat/mcp, PR #142)

Product type: Claude Code Skill / MCP server (stdio shim -> local HTTP API at 127.0.0.1:7842/mcp/v1/call).
Evidence comes from three sources. I read `frontend/packages/mcp` and `electron/src/main/mcp`. I probed the built shim with a live MCP client while the app was closed. The unit tests pass (71 vitest, 5 shim). The app was not running, so happy-path calls were not tested live.

## Scorecard

| Dimension | Score | Evidence | Method |
|---|---|---|---|
| Getting started | 6/10 | AiAssistantsSection.tsx, connect.ts, stage 1 checklist | INFERRED |
| API / tool surface | 6/10 | probe: 13 tools, ~1.3k tokens, 0 annotations, 0 outputSchema, no instructions | TESTED |
| Error messages | 5/10 (CAP6) | probe + appClient.ts, api.ts | PARTIAL |
| Documentation | 2/10 | no README in packages/mcp, help article not written | INFERRED |
| Upgrade path | 4/10 | shim version hardcoded 0.1.0, manifest version from app | INFERRED |
| Dev environment | 7/10 | Inspector steps in checklist, tests, pack script | INFERRED |
| Community | N/A | internal stage 1 | none |
| DX measurement | 3/10 | local activity log only, no usage telemetry | INFERRED |
| TTHW (estimated) | ~4-6 min | enable switch -> Connect -> restart client -> first call | INFERRED |
| Overall | 5/10 | | |

## Findings, most severe first

1. CAP6 unknown-outcome recovery. If `run_automation` or `run_batch` with `confirm: true` times out at 55 s, `appClient.ts` returns NO_RESPONSE ("did not respond... try again"). At that point the run can already be in the queue. An agent that tries again makes a new preview and starts a second run. That run sends a second set of LinkedIn connection requests. Fix: for confirm calls, say "The run can already be running. Call list_runs before you retry." A stronger fix is a client `idempotencyKey` on confirm.
2. CAP6 error code dropped. The app returns `{error: 'not_found' | 'bad_request' | ...}` but the shim returns only the message text. An agent cannot branch on a code. Fix: prefix text with the code, or return `structuredContent: {code, message, fix}`.
3. CAP6 no trace for internal errors. `api.ts` answers "The tool failed unexpectedly." and logs only "failed". No correlation id, nothing in the activity log to look up. Fix: generate an id, log `{id, err.stack}` to a local file, return the id.
4. describe_automation drops `choices`, `defaultValue`, `placeholder`, `sample`, `validation` (readTools.ts). row-inputs.ts rejects a `select` value that is not in `choices`, so the agent must guess the allowed values. Message inputs give no merge-variable syntax. Fix: pass these fields through.
5. No tool annotations. Every one of the 13 tools look writable, so Claude Desktop asks the same permission for `list_runs` as for `run_batch`. Fix: `readOnlyHint: true` on the 8 read tools, `destructiveHint`/`openWorldHint: true` on run tools.
6. No server `instructions`. The preview/confirm contract, limits, pacing, and "show the preview to the user before confirm" exist only in tool descriptions. Fix: add a short `instructions` string to McpServer. Ship the texau-operator skill.
7. No chaining. Output of run A reaches run B only through the model context (get_run_results 200 rows per page, then run_batch rows max 500). A 2,000-row Sales Navigator export cannot feed an enrichment run. Fix: `run_batch({ fromRunId, columnMap })`.
8. No export. No way to write results to a CSV file. Agents page get_run_results and rebuild CSV in context. Fix: `export_run_results({ runId, path })` with the same .csv-only path rule.
9. No dedupe across runs. V2 automations have `dedupeKeys`, but the desktop ignores them. "Connect with everyone who liked my post" run weekly sends duplicates to pending invites. Fix: an `excludeFromRunIds` or a per-account contacted ledger.
10. No scheduling. Recurring playbooks (daily engager scrape, weekly Reddit monitoring) need a human to ask again. Move this to stage 2.
11. list_automations has no search and returns every automation with descriptions. The V2 catalog has duplicates ("Connection scraper" x3, "LinkedIn Poll Results Exportr") and test entries ("jokes", "Poem", "Ankur Prompt 1"). If any reach desktop, agents pick the wrong one. Fix: add a `query` param. Hide test entries. Remove duplicate names.
12. Discoverability. The AI assistants section is inside Settings > Extension. There is no "Connect another client" JSON snippet for Windsurf, VS Code, Codex or ChatGPT.
13. Shim version is hardcoded `0.1.0` in index.ts. Use the manifest/app version so a stale shim is visible.
14. Error copy gaps: `not_licensed` gives no upgrade link. If mcp.json is missing because access was never turned on, the shim still says NOT_RUNNING. That message points the user to the wrong fix.

## What works well

Token-cheap surface (~1.3k tokens for 13 tools). Preview + single-use previewId + CSV fingerprint + proxy check before confirm. Browser Origin refusal and token auth. Social platforms cannot run unpaced. Activity log never stores argument values. CSV path limited to .csv to stop file exfiltration.
15. Result pages are too large for an assistant. `get_run_results` returns every output field as pretty-printed JSON. One 200-row page of LinkedIn Connections Export is 128 KB, and Sales Navigator Lead Scraper has 182 fields. Fix: add a `fields` argument, return compact JSON, and default to the fields that `describe_automation` marks as key.
16. `describe_automation` drops `choices` for select inputs. Confirmed on 1.1.4: `reactionType`, `twExtractionMode`, `mode`, `crawlDepth`, and `sortOrder` show no allowed values.
