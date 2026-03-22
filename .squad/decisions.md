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

### D-003: Reflect skill created — structured learning capture for the squad
- **By:** Plagueis
- **Date:** 2026-03-22
- **Context:** Requested by Jonathan Warnken. Inspired by Tamir Dresher's blog on squad evolution and Richard Murillo's original design. The squad needed a way to persist corrections across sessions so agents stop repeating mistakes.
- **Decision:** Created `.squad/skills/reflect/SKILL.md` with three-tier classification (HIGH/MEDIUM/LOW), routing to decisions inbox (team-wide) or agent history (agent-specific), and Reskill ceremony integration. Also created `.squad/decisions/inbox/` directory for the routing pipeline. Confidence starts at LOW — first observation of this pattern in practice.

### D-004: Eval Baseline Framework Established Post-Reskill
- **By:** Nihilus (Evals / Quality Baseline)
- **Date:** 2026-03-22
- **Context:** First RESKILL REVIEW ceremony. Squad recast + Ventress added + 4 new processes (Reflect, Reskill, Dream Reports, Self-Review). Zero existing eval baselines. Cannot measure progress without measurement infrastructure.
- **Decision:** 
  - **Priority 1 (THIS WEEK):** Establish baselines for Plagueis (charter quality), Ventress (signal-to-noise), Vader/Maul (code quality), Scribe (Dream Report effectiveness)
  - **Priority 2 (BY END Q2):** Sidious (decision velocity), Traya (model monitoring), Tyranus (docs accuracy), Revan (release process)
  - **Priority 3 (ORGANIC):** Reflect effectiveness, Reskill output quality, Self-Review design (Sidious owns)
  - **Where:** Output: `.squad/log/2026-03-22-reskill-eval-baselines.md` (detailed framework) + `docs/evals.md` (registry)
  - **Why urgent:** Squad behavior changed significantly. Without baselines, cannot detect drift or measure if improvements are real.
- **Trade-offs:** 
  - Requires manual validation first (~3 sessions of spot-checking). Automated tracking can wait.
  - Reflects reality: not all agent work is easily quantifiable. Accept qualitative metrics (charter quality, signal-to-noise) alongside quantitative (test coverage, speed).
- **Next:** Plagueis validates Reflect live behavior (sample 3 sessions). Nihilus snapshots Vader/Maul post-recast baselines. Ventress audits first scans.

### D-SKL-001: Skill Reference Format in Charters
- **By:** Sidious (recommendation from Reskill Review)
- **Date:** 2026-03-22
- **Context:** Reskill audit revealed 21 marketplace skills installed but only 3 agents reference skills in charters. This creates waste: agents reinvent patterns, miss opportunities to use proven tools.
- **Decision:** Adopt standardized "Skills & Tools" section in every agent charter.
- **Format:**
  ```markdown
  ## Skills & Tools
  Reference these skills during [domain] work:
  - `skill-name` — When/why to use it
  - ⚠️ `experimental-skill` — Low-confidence, use with caution
  ```
- **Placement:** Immediately after "How I Work" collaboration section
- **Success criteria:** All 10 agents have "Skills & Tools" section with ≥3 relevant skills
- **Next:** Implement in Phase 2 of reskill rollout

### D-SKL-002: Skill Confidence Thresholds
- **By:** Sidious (recommendation from Reskill Review)
- **Date:** 2026-03-22
- **Context:** Reflects skill infrastructure needs clear confidence signaling for adoption and iteration.
- **Decision:** Reference all confidence levels (high/medium/low) in charters. Mark low-confidence skills with ⚠️ warning symbol.
- **Rationale:** Low-confidence skills need usage to improve confidence. Hiding them prevents ecosystem growth. Warning symbol manages expectations.
- **Format:** `high-confidence-skill`, `medium-confidence-skill`, ⚠️ `low-confidence-skill`
- **Trade-offs:** Adds visual complexity. Benefit: prevents over-reliance on experimental features.

### D-SKL-003: Skill Discovery Protocol
- **By:** Sidious (recommendation from Reskill Review)
- **Date:** 2026-03-22
- **Context:** No onboarding for the skills directory. Agents and humans need guidance.
- **Decision:** Document skill discovery in `.squad/skills/README.md`.
- **Required content:**
  1. How to browse skills (list `.squad/skills/` directory)
  2. SKILL.md file format explanation
  3. Confidence tiers and what they mean
  4. When to create new skills vs. use existing
  5. How to reference skills in charters
  6. Skill maintenance ownership (Plagueis reviews quality, domain agents maintain content)
- **Next:** Create in Phase 1 of reskill rollout

### D-SKL-004: Multi-Account Auth Consolidation
- **By:** Sidious (recommendation from Reskill Review)
- **Date:** 2026-03-22
- **Context:** Three skills overlap in multi-account auth space. Agents need clear routing.
- **Decision:** Declare `github-multi-account` as primary pattern. Use `gh-auth-isolation` for advanced edge cases only.
- **Routing:**
  - **Primary:** `github-multi-account` — All standard multi-account scenarios
  - **Advanced:** `gh-auth-isolation` — Only when multiple processes fight over global auth state
  - **Config reference:** `agency-optimal-config` — Initial auth setup only

### D-SKL-005: Project Conventions Ownership
- **By:** Sidious (recommendation from Reskill Review)
- **Date:** 2026-03-22
- **Context:** `project-conventions` skill exists (medium confidence) with placeholder content. No owner assigned.
- **Decision:** Assign maintenance to Sidious (Architect) with quarterly review during Reskill ceremonies.
- **Responsibilities:**
  1. Replace template with actual Squad-Monitor conventions
  2. Review quarterly during Reskill
  3. Update when decisions affect conventions
- **Trade-off:** Could assign to Tyranus (docs), but conventions are architectural decisions. Sidious is better fit.

### D-006: Squad Monitor Architecture — Static Site Generator
- **By:** Sidious (recommendation), Vader (implementation)
- **Date:** 2026-03-22
- **Context:** Jonathan Warnken requested lightweight interface for viewing squad state. Sidious evaluated 4 architectural options (REST API, serverless, real-time server, static site). User chose Option 1 (static site) for lowest resource impact and operational complexity.
- **Decision:** Build static site generator. Node.js script (`build.js`) reads `.squad/` metadata + `session_store.db` SQLite database → generates single `dist/index.html`. Pico.css dark theme. Tabbed interface: Dashboard, Decisions, Agents, Conversations, Orchestration, Search. All database queries run in-browser via sql.js (WASM).
- **Trade-offs:**
  - Must rebuild to see changes (vs. real-time server)
  - No write API — squad state remains read-only from dashboard (vs. web server)
  - Single-page architecture loads all content at once (vs. lazy loading)
  - Mitigations: build is fast (~2s), in-browser full-text search on 29 sessions, lightweight CSS keeps payload lean
- **Dependencies:** marked, sql.js, glob, node-glob
- **Usage:** `npm run build && start dist\index.html` (or `open dist/index.html` on macOS/Linux)
- **Output:** dist/index.html (383.8 KB) covers 9 agents, 9 decisions, 12 logs, 21 skills, 29 sessions
- **Commit:** ac68617
- **Impact:** Squad state is now discoverable and searchable without CLI. Foundation for future observability: trend analysis, workload metrics, decision impact tracking.

### D-007: Add Live Mode with Auto-Refresh Dev Server
- **By:** Vader (implementation), Jonathan Warnken (request)
- **Date:** 2025-07-21
- **Context:** Static-only dashboard required manual rebuild (`npm run build`) to see changes. Jonathan requested a live mode where the dashboard auto-refreshes when `.squad/` data changes.
- **Decision:** Add Express-based dev server (`npm run dev`) alongside static build. Server regenerates HTML on each request with `liveMode: true`. Client polls `/api/timestamp` every 10s; reloads on change. Static build (`npm run build`) is unchanged — passes `liveMode: false`.
- **Trade-offs:**
  - Express added as dependency (~65 packages) — acceptable for dev tooling
  - Full page reload on change (not incremental DOM update) — keeps implementation simple, ~50 lines
  - Polling at 10s interval vs. file watcher — simpler, cross-platform, no native deps
- **Dependencies:** express ^5.1.0
- **Usage:** `npm run dev` → opens at http://localhost:3000
- **Commit:** 9cad76a

### D-008: Multi-Squad + Sub-Squad Monitoring (Phase 1 + 2)
- **By:** Vader (implementation), Sidious (architecture — D-inbox proposal)
- **Date:** 2026-03-22
- **Context:** Jonathan approved Sidious's multi-squad/sub-squad architecture design. Implemented both phases in one pass.
- **Decision:**
  - **Phase 1 (Sub-Squads):** `data-reader.js` scans `.squad/sub-squads/{name}/` for nested `.squad/` dirs. Dashboard shows Sub-Squads tab (only when sub-squads exist) with expandable cards showing team roster, agents, and decisions per workstream.
  - **Phase 2 (Multi-Squad Hub):** New `src/config-reader.js` reads optional `squads.config.json`. When present: `build.js` generates `dist/hub.html` + per-squad dashboards in `dist/squads/{id}/`; `serve.js` serves hub at `/` and squads at `/squads/:id`.
  - **Backward compatible:** Without `squads.config.json`, everything works exactly as before.
  - **Template safety:** Hub inline scripts use string-array-join pattern (no `${}` in client JS).
- **Trade-offs:** Hub rebuilds all squads on every build (acceptable for <10 squads). Session store is shared across all squads (same DB path).
- **Files:** Created `src/config-reader.js`. Modified `src/data-reader.js`, `src/html-generator.js`, `scripts/build.js`, `scripts/serve.js`.


