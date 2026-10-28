# TexAu skills

Skills that teach an AI assistant to run TexAu Desktop: LinkedIn outreach, lead lists, Google Maps leads, Reddit research, market research, and agency and consulting prospecting. They work in Claude Code, Claude Desktop, Cursor, Codex, and any assistant that reads `SKILL.md` folders and connects to MCP servers.

## Set it up in one step

Open TexAu Desktop. Go to Settings, then Extension, and switch on "Allow AI assistants". Then paste the prompt below into your assistant (Claude Code, Cursor, Codex, or any agent that can run shell commands). It installs the skills and connects TexAu for you.

```text
Set up TexAu Desktop for me in this assistant. Do each step, show me what you did, and stop and ask me if a step fails.

1. Check that TexAu Desktop is installed.
   - macOS: /Applications/TexAu.app/Contents/MacOS/TexAu
   - Windows: %LOCALAPPDATA%\Programs\TexAu\TexAu.exe (else search Program Files for TexAu.exe)
   - Linux: find the TexAu install folder (AppImage mount or /opt/TexAu)
   The MCP server file is resources/mcp/texau-mcp.cjs inside the install folder.
   On macOS that is /Applications/TexAu.app/Contents/Resources/mcp/texau-mcp.cjs.
   If you cannot find either file, ask me to open TexAu, go to Settings > Extension > AI assistants, and paste you the Claude Code command shown there. It holds both paths.

2. Get the skills.
   Run: gh repo clone texauhq/texau-skills ~/texau-skills
   If gh is missing, run: git clone https://github.com/texauhq/texau-skills.git ~/texau-skills
   If ~/texau-skills exists, run git pull inside it instead.

3. Install the skills for the assistant you are.
   - Claude Code: copy every folder in ~/texau-skills/skills/ into ~/.claude/skills/
   - Codex, Gemini CLI, Copilot CLI and other agents that read ~/.agents/skills: copy them into ~/.agents/skills/
   - Cursor: copy them into ~/.cursor/skills/. If this Cursor version does not load skills, add each SKILL.md as a rule in ~/.cursor/rules/ instead, named <skill-name>.mdc
   - Any other assistant: find where it loads skills or rules from and copy them there. Tell me the path you used.
   Overwrite older copies of the same folders. Leave every other skill alone.

4. Connect the TexAu MCP server. Use the two paths from step 1 as <APP> and <SHIM>.
   - Claude Code: claude mcp add texau -e ELECTRON_RUN_AS_NODE=1 -- "<APP>" "<SHIM>"
   - Cursor: add this under "mcpServers" in ~/.cursor/mcp.json and keep every other entry:
     "texau": { "command": "<APP>", "args": ["<SHIM>"], "env": { "ELECTRON_RUN_AS_NODE": "1" } }
     Back up the file before you edit it.
   - Codex: add to ~/.codex/config.toml:
     [mcp_servers.texau]
     command = "<APP>"
     args = ["<SHIM>"]
     env = { ELECTRON_RUN_AS_NODE = "1" }
   - Claude Desktop: tell me to click "Connect to Claude Desktop" in TexAu (Settings > Extension > AI assistants) and approve the install. Then tell me to upload each folder in ~/texau-skills/skills/ as a skill in Claude Desktop settings.
   - Other assistants: add a stdio MCP server named texau with the same command, args and env.

5. Test it. Tell me to restart the assistant if it needs a restart to load MCP servers. Then call the texau get_status tool. Expect 13 texau tools and a status with license and minutesLeft.
   - "TexAu Desktop is not running": ask me to open the app.
   - "AI assistant access is off": ask me to switch on Settings > Extension > AI assistants.
   - "does not include AI assistant access": tell me my plan does not include it.

6. Finish with a short summary: the skills you installed, the MCP config file you changed, and the result of get_status. Do not run any automation during setup.
```

Never paste a TexAu token, cookie, or password into the assistant. The setup does not need them.

## Skills

| Skill | Use it for |
|---|---|
| texau-operator | Any call to the texau MCP server. All other skills use it. |
| linkedin-outreach | Connection requests, messages, InMail, follow-up sequences |
| linkedin-specialist | LinkedIn and Sales Navigator lists from posts, events, groups, companies, jobs |
| lead-gen-expert | A full lead list: ICP, source, qualify, find emails, deliver to CSV, CRM, or sequencer |
| local-maps-leads | Google Maps businesses by category and city, reviews, websites |
| google-web-research | Google search, domains, website emails, tech stack, tracking pixels |
| reddit-specialist | Subreddit research, pain points, solution requests, brand mentions |
| market-research | Competitor briefs, ICP, customer quotes, market maps |
| agency-client-acquisition | Agencies that find and pitch clients with an observed problem |
| consulting-prospecting | Consultants who work a short account list from trigger events |

## PhantomBuster names

You can ask in PhantomBuster terms, for example "run the Post Likers Export Phantom" or "do the competitor posts playbook". `texau-operator` maps each of the 145 public Phantoms to a TexAu automation or chain in `skills/texau-operator/references/phantom-map.md`. 67 map exactly, 12 closely, and 26 as a chain of TexAu runs. 40 have no TexAu equivalent, mostly Instagram, Slack, and Facebook. The skills run on the texau MCP server only. They do not call PhantomBuster.

## Manual install

1. Copy the folders in `skills/` to your assistant's skills folder (step 3 of the prompt).
2. In TexAu, open Settings, then Extension, then AI assistants. Use "Connect to Claude Desktop", "Connect to Cursor", or copy the Claude Code command.

## Status

The skills are drafts. They were tested in written role-play, not against a live TexAu Desktop. Automation names come from the TexAu V2 catalog, so each skill looks up the real names with `list_automations` at run time. Test prompts are in `skills/texau-operator/references/golden-prompts.md`.

## Research

`research/` holds the inputs: the MCP developer experience audit, the PhantomBuster playbook audit, and the competitor playbook audit.
