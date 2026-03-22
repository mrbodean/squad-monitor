# JOURNAL.md — Build Story

> How this project was built, the steering moments that shaped it, and why things are the way they are.
> Maintained by **Scribe** (Historian / Build Journalist). Update after milestones.

---

## 2026-03-22 — Project Bootstrapped

**Squad:** The Default Squad · **Vibe:** friendly · **Theme:** Community Builders

### The Team

Architect, Coder, Tester, DevRel, Prompter, GitOps, Evaluator, Researcher, Scribe

### What Happened

Project initialized with the **The Default Squad** squad preset via `npx snap-squad init`. The full `.squad/` directory, hook chain (AGENTS.md, CLAUDE.md, copilot-instructions.md), and this journal were generated automatically.

### Steering Moment

The builder chose **default** — default generalist squad — reliable, well-rounded, good for any project. This shapes everything that follows: who reviews code, how decisions get made, what gets tested first.

### What's Next

- [ ] First real feature or task
- [ ] Builder configures project context in `.squad/team.md`
- [ ] First decision logged to `.squad/decisions.md`

---

## 2026-03-22 — The `reflect` Skill: Corrections That Persist

**Squad:** The Sith Squad · **Agent:** Plagueis (Prompt Engineer) · **Decision:** D-002

### What Happened

Jonathan Warnken demanded something the squad lacked — *memory that survives death.* When an agent is corrected, that correction should echo forward through every future session. No more repeating the same mistakes. No more wisdom lost to the void between conversations.

Plagueis answered with the **`reflect` skill** (`.squad/skills/reflect/SKILL.md`). Any agent can now invoke it to:

- **Detect corrections** from the user — explicit redirects, praised patterns, observed preferences
- **Classify confidence** — HIGH (direct correction), MEDIUM (praised behavior), LOW (inferred preference)
- **Route learnings** to the right place:
  - Team-wide insights → `.squad/decisions/inbox/` for Scribe to merge into `decisions.md`
  - Agent-specific lessons → that agent's `history.md`

The `.squad/decisions/inbox/` directory was created as part of the routing pipeline.

### Why

Before `reflect`, corrections were ghosts — they haunted a single session, then vanished. An agent told *"don't do X"* would do X again next time with no remorse and no memory. The dark side demands better. Power without memory is just chaos.

Inspired by Tamir Dresher's writing on squad evolution and Richard Murillo's original design, this skill turns one-time corrections into permanent knowledge — etched into the squad's collective memory like Sith holocron inscriptions.

### Steering Moment

> *"I want a structured learning-capture skill for the squad."*

The builder didn't ask for a changelog or a retro process. He asked for **learning that routes itself** — corrections that know where they belong and file themselves there. Plagueis delivered a skill, not a workflow.

### Level-Up 🆙

**The squad now learns from its mistakes.** Correct an agent once, and the correction propagates — to the agent's own memory, or to the whole squad's decision log. Sessions end, but lessons don't.

*"The dark side of the Force is a pathway to many abilities some consider to be… unnatural."* — Including remembering what you were told.

---

## 2026-03-22 — Squad Monitor v1.0 — Static Site Generator

**Squad:** The Sith Squad · **Agents:** Sidious (recommendation), Vader (implementation) · **Decision:** D-006

### What Happened

The builder requested a lightweight interface for viewing squad state without persistent infrastructure. Sidious evaluated four architectural options. The squad built **Squad Monitor** — a Node.js static site generator that reads `.squad/` metadata and the session-store.db SQLite database, then generates a single-page HTML dashboard.

**Output:** `dist/index.html` (383.8 KB)  
**Coverage:**
- 9 agents (roles, charters, history)
- 9 decisions (active decisions registry)
- 12 logs (journal entries, ceremonies)
- 21 skills (installed marketplace catalog)
- 29 sessions (session store with turn history and full-text search)

**Tech Stack:**
- Node.js script (`build.js`)
- `marked` for markdown rendering
- `sql.js` (WASM) for in-browser SQLite queries
- `Pico.css` for dark-theme responsive UI
- Tabbed interface: Dashboard, Decisions, Agents, Conversations, Orchestration, Search

**Commit:** ac68617

### Why

Before this, squad state was scattered:
- Decisions lived in markdown files (static, hard to navigate)
- Agent charters buried in `.squad/agents/*/charter.md` (opaque structure)
- Session history locked in `session_store.db` (inaccessible without CLI)
- Logs and skills had no discovery UI

Jonathan wanted to *see* the squad without building a web service. Sidious proposed 4 options — from serverless REST API to real-time web server. The builder chose **Option 1: Static Site** for lowest operational cost.

### Steering Moment

> *"I want something I can open in a browser to see what the squad is doing. No servers. No deployment."*

Sidious recommended static generation. Vader implemented it. Decision: **Generate once, ship once, open forever.** Trade-off: must rebuild to reflect changes. Win: zero runtime footprint.

### Trade-offs

**Accepted:**
- Static output must be regenerated to see changes (vs. real-time server)
- Browser can't modify squad state (vs. web server with write API)
- Single-page architecture (vs. multi-page site) — simpler, but all content loads upfront

**Mitigations:**
- `npm run build` is fast (~2 seconds) — regenerate before viewing new data
- In-browser search (full-text on 29 sessions) — responsive, no server needed
- Pico.css reduces CSS bundle size — lean HTML payload

### Impact

**Immediate:**
- Squad state is discoverable — see decisions, agents, skills, sessions in one place
- Session store is queried in-browser — no SQL backend required
- Dashboard becomes the "source of truth view" for squad health

**Next:**
- Add Ventress (News) feed to dashboard
- Expand search: filter by agent, decision tag, skill category
- Export session transcripts (for audit, learning)

### Level-Up 🆙

**The squad's internal state is now visible.** This is the foundation for future introspection: trend analysis, agent workload metrics, decision impact tracking. The dashboard is the first step toward *observed* squad improvement.

*"I find your lack of observability disturbing."* — The dark side demands transparency.

---

## How to Use This Journal

> *Scribe's guide for the builder and future contributors.*

This isn't a changelog. It's the **story of how the project was built** — the decisions, the pivots, the moments where the builder steered the squad in a new direction.

### What to capture

| Entry Type | When | Example |
|-----------|------|---------|
| **Steering Moment** | Builder redirects the squad | "Switched from REST to GraphQL after seeing the query complexity" |
| **Key Decision** | Trade-off was made | "Chose SQLite over Postgres — this is a CLI tool, not a service" |
| **Evolution** | Architecture shifted | "Split monolith into 3 modules after hitting circular deps" |
| **Milestone** | Something shipped | "v0.1.0 published to npm — first public release" |
| **Lesson Learned** | Something surprised you | "Vitest runs 10x faster than Jest for this project — switching permanently" |

### Template for new entries

```markdown
## YYYY-MM-DD — Title

### What Happened

(What was built, changed, or decided)

### Why

(The reasoning — what alternatives existed, what trade-offs were made)

### Steering Moment

(How the builder directed the work — what prompt, feedback, or redirection shaped the outcome)

### Impact

(What this changes going forward)
```

### Rules

1. **Write for future-you.** Six months from now, this journal explains *why* the code looks the way it does.
2. **Capture the steering, not the typing.** The git log shows what changed. The journal shows *why it changed*.
3. **Be honest about pivots.** The best journals include "we tried X, it didn't work, here's why we switched to Y."
4. **Update after milestones, not after every commit.** Quality over quantity.

---

*The code shows what was built. The journal shows why.*
