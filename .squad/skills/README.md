# Squad Skills Library

> Reusable knowledge plugins that agents reference during work.

## How Skills Work

Skills are documented patterns stored in `.squad/skills/{name}/SKILL.md`. Any agent can reference any skill. Skills are NOT executable code — they are instructions, templates, and protocols that guide agent behavior.

## Browsing Skills

List available skills: check the directories in `.squad/skills/`

Each skill has a `SKILL.md` file with:
- **Frontmatter** — name, description, domain, confidence level
- **Context** — when and why to use the skill
- **Patterns** — the actual instructions, templates, or protocols
- **Examples** — concrete usage scenarios

## Confidence Levels

| Level | Meaning | Marker |
|-------|---------|--------|
| **high** | Established — consistently applied, well-tested, team-agreed | (none) |
| **medium** | Confirmed — multiple agents/sessions validated the pattern | (none) |
| **low** | First observation — new pattern, expect iteration | ⚠️ |

## Installed Skills

| Name | Domain | Confidence | Description |
|------|--------|-----------|-------------|
| **reflect** | agent-learning | low ⚠️ | Captures corrections and learnings from conversations, classifies them by confidence, and routes them to the right place in squad knowledge |
| **agency-optimal-config** | agency, infrastructure | - | Agency Copilot — optimal configuration reference for MCP servers and flags |
| **blog-writing** | documentation, communications | high | Blog post quality patterns for technical writing — storytelling structure, code block rules, series conventions, and pre-publish checklists |
| **chrome-devtools-mcp** | debugging, browser-automation | - | Chrome DevTools MCP allows AI agents to connect directly to Chrome DevTools for remote debugging and live browser session inspection |
| **cross-machine-coordination** | distributed-systems, coordination | - | Enables squad agents running on different machines to securely share work, coordinate execution, and pass results via Git task queuing |
| **fact-checking** | quality, verification | low ⚠️ | Codifies review output format and methodology so any agent performing fact-checking or review produces consistent, structured output |
| **gh-auth-isolation** | github, authentication | - | Prevent multiple Squad instances from fighting over global gh auth state when running across repos with different GitHub accounts |
| **github-distributed-coordination** | distributed-systems, coordination | high | GitHub-native distributed coordination using comments, labels, and timestamps as coordination backend instead of external infrastructure |
| **github-multi-account** | github, authentication | medium | Transparent gh proxy that auto-routes commands to the correct GitHub account based on repo context using GH_CONFIG_DIR isolation |
| **github-project-board** | issue-lifecycle, project-management | medium | Management patterns for GitHub Projects V2 board — when to move items, column semantics, and atomic operations |
| **incident-response** | incident-response, reliability | medium | On-call incident triage patterns — Azure Status checks, incident correlation, and systematic response procedures |
| **mail-mcp** | communications, microsoft365 | - | Mail MCP server provides send email, create drafts, reply, search messages, get/delete messages, and update message operations |
| **news-broadcasting** | communication, reporting | low ⚠️ | Codifies news report formats, team channel delivery mechanics (webhooks), styling patterns, and humor guidelines |
| **outlook-automation** | communications, windows | - | Control Microsoft Outlook on Windows via COM automation — create meetings, send emails, search emails, read inbox, manage calendar |
| **project-conventions** | project-conventions | medium | Core conventions and patterns for this codebase — error handling, testing, code style, file structure |
| **restart-recovery** | workflow-recovery | high | Snapshot and restore full dev environment after machine restart. Captures running services, agency sessions, backlog state, and auto-recovers on login |
| **secrets-management** | security, infrastructure | high | Centralized secrets management pattern for Squad — secrets never in git, always accessible at runtime via Credential Manager or machine-local files |
| **session-recovery** | workflow-recovery | high | Find and resume recently closed Copilot CLI sessions using session_store database queries. Recover work by topic, directory, or time range |
| **squad-email-headless** | communications, microsoft365 | - | Send emails from a squad account headlessly via Microsoft Graph API. No browser needed after one-time setup |
| **teams-monitor** | communication-bridge | low ⚠️ | Monitor Microsoft Teams channels for actionable messages and bridge them into GitHub issues for squad tracking |
| **teams-ui-automation** | automation, microsoft-teams | medium | Hybrid Teams automation using Playwright MCP (primary), keyboard shortcuts (secondary), and UIA window management (tertiary) |

## Skill Ownership

- **Plagueis** (Prompt Engineer) reviews skill quality and SKILL.md format
- **Domain agents** maintain skill content in their area
- **Any agent** can create new skills — write to `.squad/skills/{name}/SKILL.md`
- See `.squad/skills/reflect/SKILL.md` for an exemplary skill format

## Creating New Skills

1. Create directory: `.squad/skills/{skill-name}/`
2. Create `SKILL.md` with frontmatter (name, description, domain, confidence: low)
3. Add Context, Patterns, and Examples sections
4. Reference the skill in relevant agent charters under "Skills & Tools"
5. Confidence starts at `low` — bumps to `medium` after independent validation, `high` after team agreement

## Marketplace

Skills can be sourced from external marketplaces. See `.squad/plugins/marketplaces.json` for configured sources. Currently registered: `tamirdresher/squad-skills`.
