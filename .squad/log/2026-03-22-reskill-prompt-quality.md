# Reskill — Prompt Quality Review

**Date:** 2026-03-22  
**Reviewed by:** Plagueis (Prompt Engineer)  
**Scope:** All agent charters (sidious, vader, maul, tyranus, plagueis, revan, nihilus, traya, ventress, scribe)

## Overall Assessment

**Grade: B+** — Solid foundation with clear role definitions and operational instructions. Recent enhancements (reflect, reskill, dream reports, model monitoring) demonstrate intentional evolution. Primary issues: inconsistent depth in "How I {Role}" sections, reflect skill integration varies widely, and some anti-patterns (vague voice statements) persist.

## Agent Reviews

### Sidious — Lead / Architect
**Clarity:** 4/5 — Role definition is clear. Scope/trade-off focus well-defined.  
**Boundaries:** 4/5 — Explicit domain (architecture, scope) but "code review" in expertise not operationalized.  
**Actionability:** 5/5 — "Before implementation: define scope" and decision logging format are exemplary.  
**Consistency:** 5/5 — Reskill Ceremony section integrates naturally with existing leadership role.  
**Key issues:**  
- "Code review" in expertise line has no corresponding operational section
- Voice ("Prefers simple solutions") is abstract — needs concrete examples  
**Proposed fixes:**  
- Add "Code Review" subsection under "How I Architect" with specific review criteria (architecture coherence, decision alignment, scope drift)
- Replace voice with: "Will ask 'do we actually need this?' before approving new dependencies or abstractions."

---

### Vader — Core Dev
**Clarity:** 5/5 — "Makes it work" is clear. Implementation focus unambiguous.  
**Boundaries:** 4/5 — "Build first, optimize later" implied but not explicit about when to defer to performance specialist.  
**Actionability:** 5/5 — "Before writing code: check decisions.md" + "All tests must pass" are concrete.  
**Consistency:** 5/5 — Code standards section is tight and specific.  
**Key issues:**  
- "For code generation and IaC: **gpt-5.4-mini** minimum (if available in region)" — model preference is oddly specific for a charter, should be in team config
- Voice ("best abstraction is a good function name") is pithy but not actionable  
**Proposed fixes:**  
- Move model preference to `.squad/team.md` or a shared config file
- Expand voice: "Prefers working code over clever code. Will choose readable over optimal until performance becomes measurable problem."

---

### Maul — Tester / QA
**Clarity:** 5/5 — "Finds what's broken before users do" is precise.  
**Boundaries:** 5/5 — Testing domain is clear. No overlap with Vader (implementation) or Nihilus (evals).  
**Actionability:** 5/5 — Test categories + quality bar are concrete and verifiable.  
**Consistency:** 5/5 — Recent additions fit naturally.  
**Key issues:**  
- "Will block a PR for missing tests" — no mechanism defined for actually blocking (is this metaphorical or literal?)  
- Speed baseline mentioned but no threshold specified  
**Proposed fixes:**  
- Add: "When tests are missing: flag in response, refuse to approve merge until coverage added"
- Add: "Speed regression threshold: >10% increase in init time is a P0 block"

---

### Tyranus — Docs / DevRel
**Clarity:** 5/5 — "Makes the project approachable" is clear.  
**Boundaries:** 5/5 — Docs/examples domain well-defined.  
**Actionability:** 5/5 — "Honesty Rule" (never write untested commands) is exemplary prompt engineering.  
**Consistency:** 5/5 — Recent additions integrate smoothly.  
**Key issues:**  
- Voice ("README is the front door") is metaphorical — needs operational translation  
**Proposed fixes:**  
- Expand voice: "The README is the first thing users see. If a new user can't run their first command successfully within 3 minutes of finding the repo, the docs have failed."

---

### Plagueis — Prompt Engineer (self-review)
**Clarity:** 4/5 — Role is clear but "manifest curation" in expertise is undefined.  
**Boundaries:** 5/5 — Prompt design vs. implementation well-separated.  
**Actionability:** 5/5 — Charter quality checks + anti-patterns section is gold.  
**Consistency:** 5/5 — Reflect skill ownership integrates naturally with prompt design role.  
**Key issues:**  
- "Manifest curation" never explained — what is being curated and how?  
- Voice ("Every token earns its place") is aspirational but not actionable  
**Proposed fixes:**  
- Define "manifest curation": reviewing team.md for role clarity, checking that agent assignments match capabilities
- Expand voice: "Write prompts where every instruction has a clear trigger condition and expected outcome. No filler, no vague imperatives."

---

### Revan — GitOps / Release
**Clarity:** 5/5 — Git workflow + releases + multi-account auth is precise.  
**Boundaries:** 5/5 — Clear separation from code (Vader) and quality (Maul/Nihilus).  
**Actionability:** 5/5 — Release checklist is exemplary operational guidance.  
**Consistency:** 5/5 — Recent additions fit naturally.  
**Key issues:**  
- "If you can't push, check gh auth status first" in voice is advice, not identity  
- Multi-account auth mentioned in identity but no operational section  
**Proposed fixes:**  
- Add "Multi-Account Auth" subsection under "How I Ship" with gh CLI auth patterns
- Replace voice: "Releases fail when steps are manual. Automate the checklist or it won't happen consistently."

---

### Nihilus — Evals / Quality Baseline
**Clarity:** 4/5 — Role clear but overlap with Maul (testing) not explicitly addressed.  
**Boundaries:** 3/5 — "agent-as-judge" and "quality scoring" not operationalized. What's the difference between Nihilus evals and Maul tests?  
**Actionability:** 4/5 — "What I Track" section is good but "Quality Gates" is vague ("no open P0s" — who defines P0?).  
**Consistency:** 4/5 — Baseline tracking fits, but Waza/Sensei reference in voice feels bolted on (not in operational section).  
**Key issues:**  
- Maul vs. Nihilus boundary is fuzzy — both run tests, both check quality
- "agent-as-judge" mentioned but no protocol defined
- Waza/Sensei reference in voice but not integrated into "How I Eval"  
**Proposed fixes:**  
- Add boundary clarification: "Maul verifies behavior correctness (unit/e2e tests). Nihilus verifies *quality* of that behavior (accuracy, speed baselines, regression detection)."
- Add "Agent-as-Judge Protocol" subsection with concrete steps for running eval + scoring
- Move Waza/Sensei to "Advanced Evals" subsection in "How I Eval" with when-to-use guidance

---

### Traya — Researcher / Opportunity Finder
**Clarity:** 4/5 — Research role clear, but "grounding content review" not defined.  
**Boundaries:** 4/5 — Research vs. intelligence (Ventress) boundary exists but not explicit.  
**Actionability:** 5/5 — "Research Format" section is exemplary (what/why/action/effort).  
**Consistency:** 5/5 — Model monitoring section integrates naturally.  
**Key issues:**  
- "Grounding content review" mentioned but never explained — what is grounding content?  
- Traya vs. Ventress overlap: both scan external sources, both identify opportunities  
- Voice is long and runs-on without punctuation  
**Proposed fixes:**  
- Define "grounding content": ".squad/grounding/* files, external docs integrated into squad context"
- Add boundary: "Traya does deep research on specific opportunities. Ventress does daily news scanning for signals. Traya is pull (responds to questions), Ventress is push (proactive alerts)."
- Shorten voice to two sentences max

---

### Ventress — News / Intelligence
**Clarity:** 5/5 — "Scans the horizon. Turns signals into work." is crystal clear.  
**Boundaries:** 4/5 — News vs. research (Traya) boundary implied but not explicit.  
**Actionability:** 5/5 — "Signal → Work Item Pipeline" is exceptional operational guidance.  
**Consistency:** 5/5 — Recent addition; well-integrated from the start.  
**Key issues:**  
- Daily scan cadence hardcoded but no mechanism for user to adjust frequency
- "Proactive, concise, surfaces what matters and discards the noise" — noise filtering criteria not defined  
**Proposed fixes:**  
- Add: "Scan frequency defaults to daily but can be adjusted per-project (check `.squad/config.yml` if it exists)"
- Add "Signal Filtering Criteria" subsection: relevance thresholds, noise patterns to skip

---

### Scribe — Historian / Build Scribe
**Clarity:** 5/5 — "Writes the 'How Was This Built?' story" is unambiguous.  
**Boundaries:** 5/5 — Clear distinction from decision logging (Sidious) and news (Ventress).  
**Actionability:** 5/5 — Table format + "Rules" section is model prompt engineering.  
**Consistency:** 5/5 — Dream Reports section integrates beautifully with journaling role.  
**Key issues:**  
- "Nap Synthesis" in Dream Reports header is cute but unexplained (what's a "nap"?)  
- Voice is one long run-on sentence  
**Proposed fixes:**  
- Remove "Nap Synthesis" or explain the metaphor (e.g., "dream reports = what the squad 'dreams' during monthly reflection on accumulated logs")
- Break voice into 2-3 sentences with clear punctuation

---

## Cross-Cutting Prompt Issues

### 1. Voice Statements Are Often Vague or Metaphorical
**Pattern:** Most agents have voice sections that sound nice but don't translate to behavior.  
**Examples:**  
- "Prefers simple solutions" (Sidious)  
- "Best abstraction is a good function name" (Vader)  
- "If onboarding takes more than 3 steps, something is wrong" (Tyranus)  

**Fix:** Every voice statement should be rewritable as "When X happens, I do Y" or "I prefer A over B because measurable reason C."

---

### 2. Reflect Skill Integration Is Inconsistent
**Pattern:** Only Plagueis charter explicitly mentions reflect skill. Other agents have no guidance on when/how to invoke it.  
**Impact:** Reflect won't be used consistently across the squad.  
**Fix:** Add to every agent's "How I Work" section:  
```
### When to Reflect
- User corrects my work explicitly ("no, do X instead") → HIGH confidence, propose immediately
- User praises a pattern ("exactly like that") → MEDIUM confidence, note for reskill
- I discover an edge case that changes approach → MEDIUM confidence, document in history.md
```

---

### 3. Model Preferences Are Scattered and Inconsistent
**Pattern:** All agents list "Preferred: auto" + "Fallback: Standard chain" except Ventress ("Fast chain"). One agent (Vader) has code-generation-specific model preference buried in operational section.  
**Impact:** Model selection logic is unclear. What does "auto" mean? Who decides?  
**Fix:** Move model preferences to `.squad/team.md` as a shared config table. Remove from individual charters unless agent has unique model requirements (e.g., Ventress legitimately needs speed).

---

### 4. Boundary Overlaps Not Explicitly Addressed
**Pattern:** Multiple agents have overlapping domains but don't acknowledge the boundaries:  
- Maul (testing) vs. Nihilus (evals) — both verify quality  
- Traya (research) vs. Ventress (intelligence) — both scan external sources  
- Sidious (code review) vs. Vader (implementation) — review vs. build  

**Impact:** Agents may duplicate work or defer incorrectly.  
**Fix:** Add "Boundary Notes" subsection to each charter clarifying adjacent roles.

---

### 5. Failure Modes Missing
**Pattern:** No charter includes "When I'm stuck" or "When to escalate" guidance.  
**Impact:** Agents may spin on blockers instead of flagging for help.  
**Fix:** Add to every charter's "How I Work" section:  
```
### When I'm Stuck
- If blocked on technical issue: state the blocker, propose 2-3 alternatives, suggest who might unblock
- If scope unclear: flag ambiguity, ask clarifying questions before proceeding
- If decision required beyond my domain: defer to Sidious with context
```

---

### 6. Recent Additions (Reskill, Dream Reports, Model Monitoring) Are Well-Integrated
**Pattern:** The newest sections (post-Ventress decision) are consistently higher quality than original charter content.  
**Observation:** This suggests the squad is learning. Recent additions are more concrete, better scoped, and include clear triggers.  
**Action:** Use these sections as templates for improving older content.

---

## Priority Fixes

### 1. Add "When to Reflect" subsection to all charters (except Plagueis)
**Impact:** HIGH — Enables systematic learning capture across the squad  
**Effort:** Small — Copy template to 9 charters  
**Reason:** Reflect skill won't be used consistently without explicit invocation guidance in every charter.

---

### 2. Clarify Maul vs. Nihilus boundary with explicit "What's Mine vs. Theirs" section
**Impact:** HIGH — Prevents work duplication and confusion  
**Effort:** Small — Add 3-4 sentences to each charter  
**Reason:** Testing vs. evals overlap is the most ambiguous boundary in the current squad.

---

### 3. Replace abstract voice statements with concrete behavioral patterns
**Impact:** MEDIUM — Makes prompts more actionable  
**Effort:** Medium — Rewrite voice for 10 agents  
**Reason:** Voice sections currently don't change agent behavior. They should.

---

### 4. Add "When I'm Stuck" failure mode guidance to all charters
**Impact:** MEDIUM — Reduces wasted cycles on blockers  
**Effort:** Small — Add 3-4 bullets per charter  
**Reason:** No agent should spin indefinitely. Escalation paths should be explicit.

---

### 5. Move model preferences to shared config, remove "Preferred: auto" boilerplate
**Impact:** LOW — Reduces charter noise  
**Effort:** Medium — Create config file, update 10 charters  
**Reason:** Model selection is a team concern, not agent-specific (except edge cases like Ventress).

---

## Recommendations

1. **Immediate action:** Implement fixes #1 and #2 (reflect guidance + Maul/Nihilus boundary). These are small edits with high impact.

2. **Next reskill:** Tackle fix #3 (voice rewrite). This requires thoughtful rewrites — batch it for next quarterly review.

3. **Ongoing:** Use Dream Reports to surface patterns that suggest charter updates. Scribe's monthly synthesis should flag repeated failures or confusion that indicate prompt gaps.

4. **Meta-observation:** The squad's prompt quality is improving over time. Recent additions are tighter than original content. Continue this trajectory — treat charters as living documents, not fixed artifacts.

---

**Reviewed by:** Plagueis  
**Confidence:** HIGH — Comprehensive review of all 10 charters against defined criteria  
**Next step:** Route to Sidious for decision on which fixes to implement now vs. defer to next reskill
