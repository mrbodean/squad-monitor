# The Sith Squad

> A powerful squad drawn from the dark side of the Force.

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Squad | Coordinator | Routes work, enforces handoffs and reviewer gates. Does not generate domain artifacts. |

## Members

| Name | Role | Charter | Status |
|------|------|---------|--------|
| Sidious | Lead / Architect | `.squad/agents/sidious/charter.md` | ✅ Active |
| Vader | Core Dev | `.squad/agents/vader/charter.md` | ✅ Active |
| Maul | Tester / QA | `.squad/agents/maul/charter.md` | ✅ Active |
| Tyranus | Docs / DevRel | `.squad/agents/tyranus/charter.md` | ✅ Active |
| Plagueis | Prompt Engineer | `.squad/agents/plagueis/charter.md` | ✅ Active |
| Revan | GitOps / Release | `.squad/agents/revan/charter.md` | ✅ Active |
| Nihilus | Evals / Quality Baseline | `.squad/agents/nihilus/charter.md` | ✅ Active |
| Traya | Researcher / Opportunity Finder | `.squad/agents/traya/charter.md` | ✅ Active |
| Scribe | Historian / Build Scribe | `.squad/agents/scribe/charter.md` | ✅ Active |
| Ventress | News / Intelligence | `.squad/agents/ventress/charter.md` | ✅ Active |
| Ralph | Work Monitor | — | 🔄 Monitor |

## Coding Agent

<!-- copilot-auto-assign: true -->

| Name | Role | Charter | Status |
|------|------|---------|--------|
| @copilot | Coding Agent | — | 🤖 Coding Agent |

### Capabilities

**🟢 Good fit — auto-route when enabled:**
- Bug fixes with clear reproduction steps
- Test coverage (adding missing tests, fixing flaky tests)
- Lint/format fixes and code style cleanup
- Dependency updates and version bumps
- Small isolated features with clear specs
- Boilerplate/scaffolding generation
- Documentation fixes and README updates

**🟡 Needs review — route to @copilot but flag for squad member PR review:**
- Medium features with clear specs and acceptance criteria
- Refactoring with existing test coverage
- New module scaffolding following established patterns (data-reader, html-generator)
- CLI option additions following existing hand-written parser pattern

**🔴 Not suitable — route to squad member instead:**
- Architecture decisions and system design
- Multi-module integration requiring coordination
- Ambiguous requirements needing clarification
- Dashboard UX/layout changes requiring visual judgment
- Changes to the eval framework or quality baselines
- Changes requiring cross-team discussion

## Project Context

- **Owner:** Jonathan Warnken
- **Stack:** Node.js (ESM), Express, Marked, sql.js, Glob — static site generator + live dev server
- **Description:** Browser dashboard for visualizing squad activity, decisions, and agent interactions from the Copilot CLI session store and `.squad/` directory. Supports static build, live dev server, multi-squad hubs, sub-squads, and LAN/kiosk access. Published as npx-runnable CLI tool.
- **Universe:** Star Wars — Sith
- **Created:** 2026-03-22
