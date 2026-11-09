# TexAu skills

Skills that teach an AI assistant to run TexAu Desktop: LinkedIn and X outreach, lead lists, Google Maps leads, website research, Reddit research, market research, and agency and consulting prospecting. They work in Claude Code, Cursor, Codex, Claude Desktop, and any assistant that reads `SKILL.md` folders and connects to MCP servers.

## Set it up

Open TexAu Desktop 1.1 or later. In the sidebar, open AI assistants, and switch on "Allow AI assistants". The page shows for a license that includes AI assistants. Then paste this prompt into your assistant (Claude Code, Cursor, Codex, or any agent that can run shell commands):

```text
Set up TexAu Desktop for me in this assistant. Run each step, show me the output, and stop if a step fails.

1. Get the skills. Run: git clone https://github.com/texauhq/texau-skills.git ~/texau-skills
   If ~/texau-skills exists, run: git -C ~/texau-skills pull

2. Run the installer with TexAu's own runtime, so Node does not need to be installed:
   - macOS:   ELECTRON_RUN_AS_NODE=1 /Applications/TexAu.app/Contents/MacOS/TexAu ~/texau-skills/install.mjs
   - Windows (PowerShell): $env:ELECTRON_RUN_AS_NODE=1; & "$env:LOCALAPPDATA\Programs\TexAu\TexAu.exe" "$HOME\texau-skills\install.mjs"
   - Linux or a custom folder: node ~/texau-skills/install.mjs --app <TexAu binary> --shim <TexAu folder>/resources/mcp/texau-mcp.cjs
   If the TexAu binary is not at that path, run node ~/texau-skills/install.mjs instead (Node 20 or later). It searches the standard folders.

3. Read the JSON the installer prints.
   - "test": { "ok": true, "tools": 13 } means TexAu is connected.
   - If there is an "error" or "fix" field, do what "fix" says, then run the installer again.

4. Tell me to restart this assistant. Do not run any TexAu automation during setup.
```

The installer finds TexAu, finds which assistants are installed, copies the skills to each one, and adds the texau MCP server to each assistant's configuration. It backs up every configuration file it changes. Then it starts the server the way an assistant does and calls `get_status`. Options: `--clients claude-code,cursor,codex,agents`, `--dry-run`, `--test-only`, `--app` and `--shim`.

Claude Desktop: open AI assistants in the TexAu sidebar. On the Claude Desktop row, click Connect, and approve the install. Then upload each folder in `skills/` as a skill in Claude Desktop.

Never paste a TexAu token, cookie, or password into the assistant. Setup does not need them.

## Skills

| Skill | Use it for |
|---|---|
| texau-operator | Any call to the texau MCP server. All other skills use it. |
| linkedin-outreach | Connection requests, messages, sequences over days, "continue my campaigns", replies |
| linkedin-specialist | LinkedIn, Sales Navigator, and Recruiter lists from posts, companies, jobs, alumni, your network |
| x-twitter-specialist | X followers, searches, lists, thread joiners, DMs, follows, replies |
| lead-gen-expert | A full lead list: ICP, source, score, enrich, deliver |
| local-maps-leads | Google Maps businesses by category and area, reviews, website contacts |
| google-web-research | Website emails, social links, tech stack, ad tools, metadata, schema |
| reddit-specialist | Subreddit research, pain points, solution requests, brand mentions |
| market-research | Competitor briefs, ICP, customer quotes, content analysis, market maps |
| agency-client-acquisition | Agencies that find and pitch clients with an observed problem |
| consulting-prospecting | Consultants who work a short account list from dated trigger events |

## Built on the real catalog

`skills/texau-operator/references/desktop-catalog.md` lists all 119 automations in TexAu Desktop 1.2.0, with their inputs, key outputs, default limits, and which ones write. It was read from a running app with `test/read-catalog.mjs` on 2026-11-09. If a skill names an automation that is not in it, a test fails. Desktop 1.2.0 has five Reddit automations. It has no Google search automation. `google-web-research` uses the assistant's own web search for that step.

## PhantomBuster names

You can ask in PhantomBuster terms, for example "run the Post Likers Export Phantom" or "do the competitor posts playbook". `skills/texau-operator/references/phantom-map.md` maps each of the 145 public Phantoms to TexAu Desktop: 47 exact, 16 close, 19 as a chain of TexAu runs, and 63 with no equivalent (Instagram, Facebook, GitHub, groups, events, CRMs, email finders). The skills run on the texau MCP server only. They do not call PhantomBuster.

## Campaign memory

LinkedIn and X sequences run over days. `skills/texau-operator/scripts/texau-ledger.mjs` keeps each campaign in `~/.texau-skills/ledger.json`: who got which step, who accepted, who replied, and how many invites, messages, likes, and follows each account sent today and this week. The skills call it themselves. It runs with Node 20+ or TexAu's runtime. Say "continue my campaigns" to run the next due step of every campaign.

## Tests

```
cd test && npm install
npm test                                   # mock server, ledger, installer, and skill file checks (no model calls)
node run-evals.mjs --mode both --jobs 4    # live model evals against the mock texau server (uses API credits)
```

The mock server uses the real tool schemas and descriptions, and the real catalog. The evals run `claude -p` in a temp folder with only these skills and the mock server. Each scenario is scored from the tool calls the model made and the files it wrote, not from its reply. Every scenario runs twice, with the skills and without, so the gain is measured. The latest results are in `test/RESULTS.md`.

## Updating

Run `git -C ~/texau-skills pull`, then the installer again. See `CHANGELOG.md`. After a TexAu Desktop update, run `node test/read-catalog.mjs <shim> test/catalog-desktop.json` and `node test/gen-catalog.mjs`, then `npm test`.

## Research

`research/` holds the inputs: the MCP developer experience audit, the PhantomBuster playbook audit, and the competitor playbook audit.
