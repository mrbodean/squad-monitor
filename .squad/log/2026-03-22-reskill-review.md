# Reskill Review — 2026-03-22

**Facilitator:** Sidious  
**Requested by:** Jonathan Warnken  
**Date:** 2026-03-22  
**Scope:** All 10 active agents  
**Skills audited:** 21 installed marketplace skills

## Summary

The squad was initialized today with major transformations:
- Recast from default names to Sith universe
- Ventress added as 10th member (News/Intelligence)
- 19 marketplace plugins installed from tamirdresher/squad-skills
- Reflect skill enhanced with upstream improvements
- Process improvements added: reskill ceremony, dream reports, model monitoring

**Overall finding:** Significant charter-skill misalignment. Agents are missing critical skill references for their domains. Process sections (reflect, reskill, dream report, model monitoring) exist in some charters but are inconsistent or incomplete.

**Charter completeness:** 3/10 agents reference skills explicitly. 7/10 have no skill integration. Process sections are present but vary in detail and accuracy.

**Priority actions:** 30 specific charter updates required across all agents, plus 2 team-level decisions about skill discovery and documentation standards.

---

## Agent-by-Agent Findings

### Sidious — Lead / Architect
**Skills alignment:**
- ✅ `reflect` — Charter mentions Reskill Ceremony, should reference reflect skill explicitly
- ✅ `github-project-board` — Architectural oversight includes board structure, no reference
- ⚠️ `agency-optimal-config` — Should know how to configure agency for agents
- ⚠️ `project-conventions` — Template exists, Sidious should maintain it
- ⚠️ `incident-response` — Architectural decisions during incidents, no reference
- ⚠️ `session-recovery` — Architecture review may need past session context

**Charter gaps:**
- Reskill Ceremony section exists but doesn't reference reflect skill
- No mention of skills directory or skill discovery protocol
- Model monitoring mentioned in team decisions but not in charter
- No guidance on coordinating with skills during architecture reviews

**Proposed changes:**
1. Line 38-42: Add explicit reference to reflect skill in Reskill Ceremony section
2. New section after "Reskill Ceremony": Add "Skills & Tools" section listing relevant skills:
   - `reflect` for Reskill ceremonies
   - `github-project-board` for board oversight
   - `agency-optimal-config` for agent configuration
   - `project-conventions` for codebase standards
   - `incident-response` for architectural triage
   - `session-recovery` for historical context
3. Line 63-65: Enhance collaboration section to mention checking `.squad/skills/` for available capabilities

**Priority:** HIGH — Sidious facilitates Reskill, must understand reflect skill deeply

---

### Vader — Core Dev
**Skills alignment:**
- ✅ `github-project-board` — Should update board when starting/completing work
- ✅ `secrets-management` — Credential handling in code, no reference
- ⚠️ `gh-auth-isolation` — Multi-account scenarios, no guidance
- ⚠️ `github-multi-account` — Same as above
- ⚠️ `session-recovery` — May need to resume interrupted work
- ⚠️ `restart-recovery` — Services and dev environment management
- ⚠️ `cross-machine-coordination` — GPU workloads or multi-machine dev
- ⚠️ `chrome-devtools-mcp` — Debugging web components or browser-based tools

**Charter gaps:**
- No skills section at all
- Code standards mention no secrets in code but don't reference secrets-management skill
- No guidance on GitHub auth when working across repos
- No mention of session recovery for interrupted work
- Testing section doesn't mention chrome-devtools for debugging test failures

**Proposed changes:**
1. After line 17: Add new "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   Reference these skills during implementation:
   - `secrets-management` — Never commit secrets; use Credential Manager or .env patterns
   - `github-project-board` — Update board status when starting/completing work
   - `gh-auth-isolation` — Multi-account GitHub scenarios
   - `session-recovery` — Resume interrupted sessions
   - `restart-recovery` — Snapshot state before machine restarts
   - `chrome-devtools-mcp` — Debug browser-based components
   ```
2. Line 30: Enhance "Sanitize user input" to reference secrets-management skill
3. Line 37: Add note after test requirements to check chrome-devtools-mcp for debugging failures

**Priority:** HIGH — Vader is the primary implementer, needs skill awareness most

---

### Maul — Tester / QA
**Skills alignment:**
- ✅ `github-project-board` — Update board when tests fail/block
- ⚠️ `fact-checking` — Quality reviews and verification align with fact-checking patterns
- ⚠️ `chrome-devtools-mcp` — Debugging test failures in browser contexts
- ⚠️ `incident-response` — Test failures may trigger incidents

**Charter gaps:**
- No skills section
- Quality bar doesn't mention fact-checking skill for systematic verification
- No reference to chrome-devtools for debugging
- Test categories don't mention tools/skills that support them

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `github-project-board` — Update board when blocking issues found
   - `fact-checking` — Use systematic verification methodology
   - `chrome-devtools-mcp` — Debug browser-based test failures
   - `incident-response` — Follow triage patterns for P0 test failures
   ```
2. Line 35: Enhance quality bar to reference fact-checking methodology

**Priority:** MEDIUM — Testing benefits from structured verification, not urgent

---

### Tyranus — Docs / DevRel
**Skills alignment:**
- ✅ `blog-writing` — Directly relevant, not mentioned
- ⚠️ `fact-checking` — Verify docs accuracy, avoid hallucinated commands
- ⚠️ `news-broadcasting` — Team communication and update formats
- ⚠️ `project-conventions` — Document project standards

**Charter gaps:**
- No skills section
- Honesty Rule (line 26-29) aligns with fact-checking but doesn't reference it
- Writing style and docs patterns exist in blog-writing skill, not referenced
- No mention of news-broadcasting for team announcements
- Project conventions skill exists as template but Tyranus should maintain it

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `blog-writing` — Technical writing patterns, storytelling structure
   - `fact-checking` — Verify all commands, APIs, and references before documenting
   - `news-broadcasting` — Format team updates and release announcements
   - `project-conventions` — Maintain codebase standards documentation
   ```
2. Line 28: Reference fact-checking skill in Honesty Rule section
3. After line 29: Add note about blog-writing skill for blog posts and longer content

**Priority:** MEDIUM — Docs quality improves with skill references

---

### Plagueis — Prompt Engineer
**Skills alignment:**
- ✅ `reflect` — Owns and maintains it, already referenced ✅
- ⚠️ All other skills — Should review all skill definitions for prompt quality
- ⚠️ `agency-optimal-config` — Prompt engineering includes agent configuration

**Charter gaps:**
- Reflect skill is well-integrated (lines 37-42) ✅
- No mention of reviewing other skills' prompt quality
- Charter quality checks (line 28-34) could apply to skill definitions
- No guidance on skill creation or maintenance beyond reflect

**Proposed changes:**
1. Line 42: Expand reflect skill ownership to include periodic reviews of all skill definitions for prompt quality
2. After line 34: Add new subsection:
   ```
   ### Skill Quality Reviews
   
   Extend charter quality principles to `.squad/skills/`:
   - Review skill definitions for clarity, actionability, specificity
   - Ensure skills have clear "When to Use" and "When Not to Use" sections
   - Verify skill references in charters are accurate and up-to-date
   - Propose new skills when repeated patterns emerge
   ```
3. Line 60: Add agency-optimal-config to collaboration section

**Priority:** HIGH — Plagueis maintains reflect skill and should ensure all skills meet quality standards

---

### Revan — GitOps / Release
**Skills alignment:**
- ✅ `github-multi-account` — Multi-account auth, mentioned in charter but skill exists
- ✅ `gh-auth-isolation` — Process isolation for multi-account scenarios
- ⚠️ `github-project-board` — Update board during release workflow
- ⚠️ `github-distributed-coordination` — Multi-machine release coordination
- ⚠️ `secrets-management` — Release credentials and tokens
- ⚠️ `incident-response` — Release incidents and rollbacks

**Charter gaps:**
- Line 9: Multi-account auth mentioned but skills not referenced
- No skills section despite having relevant tools
- Release checklist (line 29-36) doesn't mention board updates or secrets management
- Git hygiene section doesn't reference coordination skills

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `github-multi-account` — Transparent multi-account routing
   - `gh-auth-isolation` — Process-local auth for concurrent workflows
   - `github-project-board` — Update board during releases
   - `github-distributed-coordination` — Multi-machine release coordination
   - `secrets-management` — Secure credential handling for CI/CD
   - `incident-response` — Release incident triage and rollback procedures
   ```
2. Line 29: Add step to checklist: "Verify no secrets in code (see secrets-management skill)"
3. Line 36: Add step: "Update project board to reflect release status"

**Priority:** MEDIUM — GitOps already functional, skills would add rigor

---

### Nihilus — Evals / Quality Baseline
**Skills alignment:**
- ⚠️ `fact-checking` — Baseline verification aligns with fact-checking
- ⚠️ `github-project-board` — Track quality gates on board
- ⚠️ `agency-optimal-config` — Eval infrastructure configuration

**Charter gaps:**
- No skills section
- Quality gates and baseline tracking would benefit from fact-checking methodology
- No mention of project board for quality tracking
- External eval tools (Waza, Sensei) mentioned but no skill integration

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `fact-checking` — Systematic verification methodology for baselines
   - `github-project-board` — Track quality gates and baseline status
   - `agency-optimal-config` — Configure eval infrastructure
   ```
2. Line 36: Reference fact-checking skill for baseline validation methodology

**Priority:** LOW — Evals are working, skills would standardize approach

---

### Traya — Researcher / Opportunity Finder
**Skills alignment:**
- ✅ `fact-checking` — Research verification methodology
- ✅ `news-broadcasting` — Present findings to team
- ⚠️ `session-recovery` — Historical research context
- ⚠️ `blog-writing` — Document research findings

**Charter gaps:**
- Model monitoring section added (lines 27-32) but no skills referenced
- Research format exists but doesn't reference fact-checking for verification
- No mention of news-broadcasting for presenting findings
- Sources section doesn't mention session-recovery for past context

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `fact-checking` — Verify research findings systematically
   - `news-broadcasting` — Format and present research reports to team
   - `session-recovery` — Access historical research and decisions
   - `blog-writing` — Document deep research in blog format
   ```
2. Line 41: Reference fact-checking for "What I found" verification
3. Line 32: Add note to model monitoring about collaborating with Nihilus using agency-optimal-config

**Priority:** MEDIUM — Research quality improves with verification patterns

---

### Ventress — News / Intelligence
**Skills alignment:**
- ✅ `news-broadcasting` — Core responsibility, not explicitly referenced
- ✅ `fact-checking` — Filter false signals, verify sources
- ⚠️ `github-project-board` — Create/update board items from signals
- ⚠️ `incident-response` — CVE scanning triggers incident response

**Charter gaps:**
- Brand new agent (added today), charter comprehensive
- Lines 20-26 describe scanning/filtering but don't reference news-broadcasting skill
- Signal→work pipeline (lines 28-35) doesn't reference github-project-board
- Digest format (lines 37-43) should reference news-broadcasting patterns
- CVE/security work items should trigger incident-response skill

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `news-broadcasting` — Format digests with humor, styling, and clarity
   - `fact-checking` — Verify signals before generating work items
   - `github-project-board` — Create/update board items from actionable signals
   - `incident-response` — Route security/CVE findings to incident triage
   ```
2. Line 26: Reference news-broadcasting skill for digest formatting
3. Line 31: Reference incident-response skill for CVE/security handling
4. Line 43: Add note: "See news-broadcasting skill for styling patterns and humor guidelines"

**Priority:** HIGH — New agent, establish skill integration from day one

---

### Scribe — Historian / Build Scribe
**Skills alignment:**
- ⚠️ `reflect` — Dream Reports synthesize corrections, should reference reflect
- ⚠️ `session-recovery` — Historical context from past sessions
- ⚠️ `blog-writing` — Journal narrative style aligns with blog writing patterns

**Charter gaps:**
- Dream Reports section (lines 40-46) doesn't reference reflect skill explicitly
- Sources section (line 48-52) doesn't mention session-recovery for historical context
- Narrative style described but blog-writing skill not referenced
- Comprehensive charter overall but missing skill connections

**Proposed changes:**
1. After line 17: Add "Skills & Tools" section:
   ```
   ### Skills & Tools
   
   - `session-recovery` — Access historical sessions for journal context
   - `reflect` — Synthesize corrections during Dream Report ceremonies
   - `blog-writing` — Narrative storytelling patterns for journals
   ```
2. Line 43: Reference reflect skill for synthesizing corrections during Dream Reports
3. Line 50: Reference session-recovery for accessing historical sessions
4. Line 66: Reference blog-writing for storytelling techniques

**Priority:** MEDIUM — Scribe's work benefits from structured historical access

---

## Cross-Cutting Observations

### 1. Skills Section Absence
**Finding:** 7 of 10 agents have no "Skills & Tools" section in their charters. Only Plagueis references a skill (reflect) explicitly, and only because they maintain it.

**Pattern:** Agents were initialized with charters that define their identity and duties but don't connect them to the installed skill ecosystem.

**Impact:** Agents will miss opportunities to use patterns and tools that already exist. Work gets reinvented instead of reused.

---

### 2. Process Section Inconsistency
**Finding:** Process improvements (reflect, reskill, dream reports, model monitoring) mentioned in:
- Team decisions (D-002) — comprehensive
- Some charters (Sidious, Plagueis, Traya, Scribe) — varying detail
- Other charters (Vader, Maul, Tyranus, Revan, Nihilus, Ventress) — absent

**Pattern:** Process improvements were added to decisions and selectively propagated to charters.

**Impact:** Agents won't follow processes they don't know about. Reskill ceremonies won't happen consistently.

---

### 3. Skill Discovery Protocol Missing
**Finding:** No documented method for agents to discover what skills exist or when to use them.

**Pattern:** Skills exist in `.squad/skills/` with SKILL.md files, but charters don't reference the directory or a discovery protocol.

**Impact:** Agents only use skills they're explicitly told about. New skills installed won't be adopted.

---

### 4. GitHub Project Board Underutilized
**Finding:** `github-project-board` skill exists (medium confidence) with clear patterns, but only 3 agents have board-updating responsibilities (Vader, Maul, Revan). No charters reference it.

**Pattern:** Board management exists as a pattern but isn't integrated into agent workflows.

**Impact:** Board status will diverge from actual work status. Manual board updates required.

---

### 5. Fact-Checking as Universal Quality Gate
**Finding:** `fact-checking` skill provides systematic verification methodology relevant to 5+ agents (Maul, Tyranus, Plagueis, Nihilus, Traya, Ventress) but zero references in charters.

**Pattern:** Quality verification described in agent-specific language rather than referencing shared methodology.

**Impact:** Verification quality varies by agent. No consistent "how to verify" protocol.

---

### 6. Multi-Account Auth Fragmentation
**Finding:** Three separate skills for GitHub multi-account scenarios:
- `github-multi-account` — transparent proxy
- `gh-auth-isolation` — process-local tokens
- `agency-optimal-config` — includes auth configuration

**Pattern:** Overlapping coverage for the same problem space. Unclear which to use when.

**Impact:** Confusion about which approach to apply. Revan's charter mentions multi-account but doesn't guide to specific skills.

---

### 7. Template Skills Not Maintained
**Finding:** `project-conventions` skill is a starter template with placeholder content. Sidious (architect) or Tyranus (docs) should maintain it but no charter references it.

**Pattern:** Template skills installed but not assigned ownership or scheduled for completion.

**Impact:** Template remains placeholder, provides no value.

---

## Proposed Actions

### Immediate (High Priority — Complete within 1 week)

1. **Add "Skills & Tools" sections to all 10 agent charters** listing relevant skills from the 21 installed (specific recommendations in agent sections above)

2. **Update Plagueis charter** to include responsibility for periodic skill definition quality reviews (extend beyond just reflect)

3. **Update Ventress charter** to reference news-broadcasting and fact-checking skills explicitly since she was just added today

4. **Update Sidious charter** to reference reflect skill explicitly in Reskill Ceremony section (line 38-42)

5. **Create skill discovery protocol** in `.squad/README.md` or `.squad/skills/README.md`:
   - How to find skills (browse `.squad/skills/`)
   - When to create new skills vs. use existing
   - Skill confidence tiers (high/medium/low) and what they mean
   - How to reference skills in charters

6. **Document multi-account auth decision** in `.squad/decisions.md`:
   - When to use `github-multi-account` (transparent proxy, all scenarios)
   - When to use `gh-auth-isolation` (concurrent processes fighting over global state)
   - Declare `github-multi-account` as the primary pattern, `gh-auth-isolation` as advanced/edge case

### Short-Term (Medium Priority — Complete within 2-4 weeks)

7. **Assign project-conventions skill ownership** to Sidious (architect) or Tyranus (docs) with task to replace template content with actual project conventions

8. **Add github-project-board references** to Vader, Maul, Revan charters with specific "when to update board" instructions

9. **Add process sections to remaining agents** (Vader, Maul, Tyranus, Revan, Nihilus, Ventress):
   - Reflect protocol (all agents)
   - Reskill participation (how they contribute to quarterly reviews)
   - Dream Report synthesis (Scribe-led but all agents' logs feed it)

10. **Create fact-checking integration guide** in `.squad/skills/fact-checking/INTEGRATION.md` showing how different agent types use the methodology

11. **Update secrets-management references** in Vader and Revan charters with specific "never commit secrets, use skill patterns" language

12. **Add incident-response references** to Ventress (CVE scanning) and Nihilus/Revan (release incidents)

### Long-Term (Low Priority — Complete within 1-2 months)

13. **Session-recovery integration** for agents who benefit from historical context (Sidious, Vader, Traya, Scribe)

14. **Chrome-devtools-mcp integration** for Vader and Maul (debugging test failures)

15. **Cross-machine-coordination and restart-recovery** guidance for agents managing services (Vader, Revan)

16. **Agency-optimal-config references** for agents configuring automation (Sidious, Plagueis, Nihilus)

17. **Blog-writing and mail-mcp integration** for Tyranus (DevRel content) and potentially Scribe (journal publication)

18. **Teams/Outlook automation skills** — evaluate whether any agents need these; currently installed but no obvious use cases in this squad

19. **Regular skill audits** — Schedule quarterly Reskill Reviews to check charter-skill alignment (Sidious facilitates, Plagueis reviews quality)

### Team-Level Decisions Needed

20. **Decision: Skill reference format in charters** — Standardize how skills are referenced:
   - Option A: Dedicated "Skills & Tools" section with bullet list
   - Option B: Inline references in relevant duty sections
   - Option C: Both (section for overview, inline for specific contexts)
   - **Recommendation:** Option C for consistency and discoverability

21. **Decision: Skill confidence thresholds for charter integration** — Should low-confidence skills be referenced in charters?
   - Current state: Mix of high/medium/low confidence skills
   - **Recommendation:** Reference all confidence levels but mark low-confidence skills with ⚠️ or "experimental" label

---

## Methodology Note

This review cross-referenced:
- 10 agent charters (`.squad/agents/*/charter.md`)
- 2 agent histories (`.squad/agents/ventress/history.md`, `.squad/agents/scribe/history.md`)
- 21 installed skills (`.squad/skills/*/SKILL.md`)
- Team structure (`.squad/team.md`)
- Routing rules (`.squad/routing.md`)
- Active decisions (`.squad/decisions.md`)

Each agent was evaluated for:
1. Skills relevant to their role (domain match)
2. Skills referenced vs. skills missing
3. Process sections (reflect, reskill, dream reports)
4. Consistency with team decisions and routing rules

Confidence assessments based on skill documentation (`confidence:` field in SKILL.md files) and charter completeness.

---

**Next Steps:**
1. Route this report to team for review
2. Create decision inbox item for skill reference format standardization
3. Schedule charter updates with Plagueis for quality review
4. Update CLAUDE.md with Reskill Review completion and key findings

**Facilitator sign-off:** Sidious, 2026-03-22
