# Decisions — The Sith Squad

> Significant decisions made during development. Check before starting work.

## Active Decisions

### D-001: Squad initialized with The Default Squad preset, then recast as Sith Squad
- **By:** snap-squad (init), Coordinator (recast)
- **Date:** 2026-03-22
- **Context:** Project initialized using snap-squad warm-start with "default" preset (Community Builders theme). Recast to Sith universe with character-based roles.
- **Decision:** 
  - Role mapping: Architect→Sidious, Coder→Vader, Tester→Maul, DevRel→Tyranus, Prompter→Plagueis, GitOps→Revan, Evaluator→Nihilus, Researcher→Traya, Scribe/Copilot unchanged.
  - Theme: Star Wars — Sith (dark side, power-focused team dynamic)

### D-002: Scale Squad from 9 to 10 Members — Add Ventress (News / Intelligence)
- **By:** Sidious (recommendation), Coordinator (implementation)
- **Date:** 2026-03-22
- **Decision State:** APPROVED & IMPLEMENTED
- **Context:** External blog review identified systematic gaps in squad composition (Tamir Dresher "Scaling AI Squads")
- **Decision:** 
  - **Add:** Ventress — News Reporter / Intelligence agent for systematic tech monitoring (HackerNews, Reddit, CVE scanning)
  - **Why:** Creates proactive market intelligence and work generation (security alerts, framework updates, model releases)
  - **Enhance:** Four existing roles with new responsibilities:
    - Traya: Add decision synthesis & confidence scoring
    - Scribe: Add Dream Reports (monthly pattern synthesis from logs)
    - Plagueis: Add Reskill Ceremony (quarterly charter self-review)
    - Sidious: Formalize Self-Review Ceremony (quarterly performance eval)
- **Tooling:** Model monitoring script (Traya + Nihilus to build)
- **Impact:** Squad moves from reactive research to proactive market scanning. Self-improvement cycles (Reflect, Reskill, Dream Reports) become systematic.
- **Status:** Ventress charter created. Ceremonies documented. Enhanced charters staged for update.
- **Next Steps:**
  1. Reflect Skill implementation (Plagueis) — formal correction classification system
  2. Reskill Ceremony setup with Plagueis
  3. Dream Report template & monthly schedule with Scribe
  4. Model monitoring script design (Traya + Nihilus)

### D-002: Reflect skill created — structured learning capture for the squad
- **By:** Plagueis
- **Date:** 2025-07-25
- **Context:** Requested by Jonathan Warnken. Inspired by Tamir Dresher's blog on squad evolution and Richard Murillo's original design. The squad needed a way to persist corrections across sessions so agents stop repeating mistakes.
- **Decision:** Created `.squad/skills/reflect/SKILL.md` with three-tier classification (HIGH/MEDIUM/LOW), routing to decisions inbox (team-wide) or agent history (agent-specific), and Reskill ceremony integration. Also created `.squad/decisions/inbox/` directory for the routing pipeline. Confidence starts at LOW — first observation of this pattern in practice.
