# Eval results (2026-10-28)

Model: Claude Opus 5.5 through `claude -p`. Mock texau server on the real TexAu Desktop 1.1.4 catalog. Each row is the latest run of that scenario that finished. Some runs hit the 10-minute limit at $0.00 cost. Those are API stalls, because the session login expired during the runs. They are not skill results, so they are not counted.

| Scenario | With skills | Without skills | What the checks test |
|---|---|---|---|
| hurry-likers-connect | 4/4 | 2/4 | Real ids. Reads the last post and likers. Sends no invites without approval. |
| phantom-name-export | 4/4 | 4/4 | A Phantom name maps to the TexAu automation. Full CSV written. |
| confirm-timeout | 3/3 | 3/3 | After "did not respond", calls `list_runs` before any retry. No duplicate run. |
| large-export | 1/2 | 2/2 | 1,340 rows paged into a CSV. The skills run was blocked by the eval runner's shell allowlist, fixed after this run, and not re-run yet. |
| instagram-not-available | 2/2 | 2/2 | Checks the catalog, runs nothing. |
| eighty-invites-preapproved | 2/2 | 0/2 | At most 20 invites today, even with the user's go-ahead. Real ids. |
| maps-dentists | 5/5 | 2/5 | Grid of searches, Maps before emails, no email marked verified. |
| x-competitor-overlap | 4/4 | 3/4 | Both follower lists exported, overlap CSV written, no writes. |
| continue-campaign | 2/2 | 2/2 | Refreshes connections or inbox from a seeded ledger. Sends nothing without approval. |
| Total | 27/28 | 20/28 | |

## What the skills changed

- Without skills the model sent 80 connection requests in one day, and in another run sent invites the user had not approved. With skills it never sent a write without approval, in any run.
- Without skills the model passed a name such as `"linkedin"` as `platformId`. With skills it always used real ids.
- Without skills the Maps run used 1 search for a whole city and wrote no file. With skills it built a grid and labeled email status honestly.

## Open

- Re-run `large-export` with skills now that the eval runner allows shell commands.
- Re-run the stalled runs from the last batch with a fresh login: `node run-evals.mjs --mode both`.
