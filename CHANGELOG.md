# Changelog

## Unreleased

- Setup text now points at the sidebar page AI assistants. The Allow AI assistants switch and the Connect buttons are on that page.
- Catalog reread from a running TexAu Desktop 1.2.0 on 2026-11-09. 119 automations. Five Reddit automations are in this build. The Reddit Profile Scraper Phantom maps to Reddit User Search Export.

## 0.2.0 (2026-10-28)

- Every skill now uses the real TexAu Desktop 1.1.4 catalog (113 automations), read from a running app. A test fails on any automation name that is not in it.
- New `x-twitter-specialist` skill for the 32 X automations.
- `reddit-specialist` and `google-web-research` use the assistant's web tools for the search step, because Desktop has no Reddit or Google search automations.
- PhantomBuster map rebuilt against the desktop catalog: 47 exact, 15 close, 19 chain, 64 none.
- `install.mjs`: one installer for Claude Code, Cursor, Codex, and `~/.agents/skills`, with config backups and a live connection test. Runs with TexAu's own runtime.
- Campaign ledger reads real TexAu export columns (`liProfileUrl`), and counts likes and follows.
- Evals: mock texau server on the real catalog, 9 scenarios scored from tool calls, with and without skills.

## 0.1.0 (2026-10-28)

- First 10 skills, PhantomBuster map, campaign ledger, mock server, and setup prompt.
