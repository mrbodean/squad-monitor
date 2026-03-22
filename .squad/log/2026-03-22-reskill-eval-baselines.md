# Reskill — Eval Baseline Assessment

**Timestamp:** 2026-03-22  
**Conductor:** Nihilus (Evals / Quality Baseline)  
**Context:** First RESKILL REVIEW ceremony post-recast (default → Sith Squad, +Ventress, +4 processes)

---

## Current State

This is the first formal eval baseline assessment for the Sith Squad. The squad is transitioning from:
- **Old baseline:** Default community builders preset with generic roles (9 members)
- **New baseline:** Sith-themed character roles, +Ventress (News/Intelligence), +4 processes (Reflect, Reskill, Dream Reports, Self-Review)
- **Existing eval infrastructure:** None documented in `docs/evals.md`. No historical baselines, no regression baselines.

**Key insight:** We have zero institutional measurement of agent performance. We're starting from scratch.

---

## Agent Eval Priorities

### Priority 1 — NEED BASELINES NOW

These agents have measurable, high-impact outputs that changed with the recast or new processes. Starting baselines is **critical before behavior diverges further**.

| Agent | What to Measure | Proposed Metric | Why Urgent |
|-------|----------------|-----------------|-----------|
| **Plagueis** (Prompter) | Charter quality & reflect classification accuracy | • Charters score ≥8/10 on clarity (has "How I Work" sections, specific actions, no vague verbs)<br>• Reflect skill classifications: ≥90% precision on HIGH/MEDIUM/LOW tiers (validate against user intent)<br>• Charter adoption: agents follow at least 80% of "Always-On Duties" by session end | Reflect skill is **live right now**. Misclassifications will compound. Plagueis must validate charter effectiveness immediately. |
| **Ventress** (News / Intelligence) | Signal-to-noise ratio & work item quality | • Daily scan output: >80% of stories relevant to project scope (no hallucinated threats)<br>• Work items generated: ≥1 per 10 stories scanned, ≥70% acted upon within 2 weeks<br>• False positive rate: <5% (stories marked urgent but turned out not to be) | Ventress is brand new. Early baselines prevent drift into noise. High false-positive rate will sink credibility. |
| **Vader** (Coder) | Post-recast code quality & compliance | • Build pass rate: 100% before push (already chartered, but verify)<br>• Test coverage for new code: ≥80%<br>• Charter compliance: 100% ESM, async I/O, no sync file ops<br>• Code review acceptance: ≥85% (charters adopted, fewer objections) | Charter was recast. Need to verify the character-based voice doesn't degrade execution discipline. |
| **Maul** (Tester) | Test suite health post-recast | • Test execution time baseline: current speed snapshot (need to detect regressions later)<br>• Coverage for new features: 100% happy path + edge cases + error paths<br>• Charter compliance: all tests passing before any PR, speed regressions flagged as P0<br>• New test categories added: validation tests (schema, input sanitization, charter quality) | Maul's charter was significantly recast. New test categories (validation tests) are mentioned but not yet implemented. |
| **Scribe** (Historian / Journaler) | Dream Report effectiveness & JOURNAL.md quality | • Dream Report signal-to-noise: ≥80% of surfaced patterns are actionable (not just observational)<br>• Recurring decision patterns captured: ≥1 per 3 sessions with specific citations<br>• JOURNAL.md maintainability: ≥95% of entries have timestamps, steering quotes, and Level-Up moment<br>• Post-Dream-Report action rate: ≥70% of recommendations acted upon within 2 weeks | Dream Reports are **new right now**. Scribe needs to validate the monthly synthesis is actually producing insights, not noise. |

---

### Priority 2 — NEED BASELINES SOON

These agents have clear responsibilities but less direct measurement opportunity. Still need baselines before the end of Q2 to catch drift.

| Agent | What to Measure | Proposed Metric | Why Not Urgent |
|-------|----------------|-----------------|-----------|
| **Sidious** (Lead / Architect) | Decision velocity & architecture stability | • Decision logging: ≥80% of architectural choices documented in `decisions.md` with context/decision/alternatives/trade-offs<br>• Architecture docs (if they exist): updated within 2 weeks of changes<br>• Charter facilitation: Self-Review Ceremony runs quarterly; ≥1 decision logged per ceremony<br>• Scope creep detection: ≤20% of tasks grow beyond their original boundary | Sidious' output is strategic but low-frequency (decisions are logged, not generated constantly). Can baseline after 2-3 cycles. |
| **Traya** (Researcher) | Model monitoring report quality & research actionability | • Model monitoring accuracy: baseline model selections accurate for ≥2 quarters (track actual performance vs. recommendations)<br>• Research signal-to-noise: ≥80% of findings have explicit "Recommended Action" (not just observation)<br>• Upstream dependency tracking: zero missed critical updates/breaking changes<br>• Time-to-recommendation: <5 days from upstream change to Traya proposal | Traya's new model-monitoring role needs validation, but she has seasonal rhythm. Can establish quarterly baseline by end of Q2. |
| **Tyranus** (DevRel / Docs) | Documentation accuracy & user impact (if measured) | • Honesty Rule compliance: 100% (every command tested before writing, no hallucinated flags)<br>• Docs freshness: ≥95% of examples/commands still work in latest version<br>• README onboarding steps: ≤3 major sections to get started (current baseline unknown)<br>• Doc review cycle: ≥1 review after behavior changes (already chartered, verify adoption) | Tyranus' domain is reactive (docs update when behavior changes). Baselines depend on frequency of changes. Can sample and snapshot. |
| **Revan** (GitOps / Release) | Release process compliance & ship velocity | • Release checklist adherence: 100% green on: tests, version bump, git tag, npm publish, smoke test, cleanup<br>• Time-to-production: baseline commit→published time (currently unknown)<br>• Secret management: 0 credentials committed (critical baseline)<br>• Release frequency: establish baseline (how often do we ship?) | Revan's work is low-frequency (releases are episodic). Baselines are easier to establish after a few releases. No rush. |

---

### Priority 3 — CAN WAIT (Or Delegate to Process)

These agents have fuzzy output or depend on downstream ceremonies. Baselines can emerge organically from existing processes.

| Agent | What to Measure | Proposed Metric | Why Wait |
|-------|----------------|-----------------|-----------|
| **Maul's Validation Tests** (new category) | Schema, charter quality, input sanitization coverage | • Validation test suite: ≥10 tests covering schema correctness, charter required fields, input edge cases | Maul hasn't built these yet. They'll emerge as code is written. Baseline after first batch. |
| **Reflect Skill Effectiveness** (process) | Learning persistence across sessions | • HIGH-confidence corrections: ≥95% persist to next session (agent doesn't repeat corrected mistake)<br>• MEDIUM-confidence patterns: ≥70% adopted within 2 Reskill cycles<br>• LOW-confidence observations: ≥3 consistent signals before proposal (already chartered) | Reflect is live, but needs ~3-4 cycles to accumulate data. Baseline after 6 weeks. |
| **Reskill Ceremony Output** (process) | Charter improvement quality | • Charter clarity improvement post-Reskill: ≥80% of proposed changes increase specificity or remove vague language<br>• Agent adoption rate: ≥80% of Reskill recommendations followed in next session | First Reskill is happening now. Will have real data by end of Q2. |
| **Self-Review Ceremony** (process) | Sidious-led agent performance eval | • Performance dimensions tracked: TBD by Sidious + team<br>• Improvement actions generated: ≥1 per agent per ceremony<br>• Longitudinal improvement: track 2+ quarters to see delta | Not yet implemented. Sidious will design this in Q2. Baseline after first run. |

---

## Process Eval Criteria

The Sith Squad is testing four new self-improvement processes. Here's how to measure if they're working.

### 1. Reflect Skill (Owner: Plagueis)

**What it should do:** Capture user corrections, classify them (HIGH/MEDIUM/LOW), and prevent agents from repeating mistakes.

**How to measure:**
- **Immediate:** HIGH corrections proposed and confirmed ≥95% of the time (users see the proposal in the same session)
- **Within-session:** Agent doesn't repeat a correction within the same session (golden signal)
- **Cross-session:** Agent doesn't repeat a HIGH or MEDIUM correction in future sessions (measured after 2+ Reskill cycles)
- **False positive rate:** Reflect should NOT generate proposals for non-learning comments (e.g., "thanks", "fine") — target <5% noise

**Red flags:**
- Agent repeats a HIGH correction 2+ sessions later
- Reflect proposes >3 learnings per session (over-sensitive)
- User says "I never corrected that" (misclassification)

---

### 2. Reskill Ceremony (Facilitator: Sidious, Validators: Plagueis + Nihilus)

**What it should do:** Quarterly review of agent charters. Surface patterns, propose updates, keep charter quality high.

**How to measure:**
- **Charter improvement:** ≥80% of proposed changes increase specificity or remove vague/aspirational language
- **Adoption:** Agents follow ≥80% of approved charter updates in the next session
- **Pattern synthesis:** ≥1 recurring pattern (mistake/preference/capability shift) identified per agent per ceremony
- **Decision logging:** All recommendations documented in `decisions.md` with reasoning

**Red flags:**
- No patterns identified → charter review too shallow
- Proposals rejected ≥30% of the time → bad signal-to-noise
- Agents ignore approved updates → ceremony output not trusted

---

### 3. Dream Report (Monthly) — (Facilitator: Scribe, Cross-check: Traya)

**What it should do:** Synthesize orchestration + session logs. Surface recurring themes, blockers, unfollowed decisions. Generate actionable recommendations.

**How to measure:**
- **Signal-to-noise:** ≥80% of surfaced patterns are actionable recommendations (not just observations)
- **Specificity:** Each pattern includes citations (dates, agent names, specific decisions)
- **Recurrence threshold:** Pattern must be observed ≥2 times before proposal (not one-off noise)
- **Follow-through:** ≥70% of Dream Report recommendations acted upon within 2 weeks

**Red flags:**
- Dream Report is >5 pages of unfocused observations (too verbose, low signal)
- Patterns don't recur (too sensitive to noise)
- No recommendations acted upon (output not trusted)

---

### 4. Self-Review Ceremony (Quarterly) — (Facilitator: Sidious, New, Not Yet Designed)

**What it should do:** Quarterly performance eval of all agents. Identify strengths, flag underperformance, propose skill development.

**How to measure:** (TBD — Sidious will design this in Q2)
- Candidate dimensions:
  - *Accuracy:* % of tasks completed correctly on first try (vs. requiring rework)
  - *Speed:* time-to-completion for standard task categories
  - *Charter adherence:* % of chartered behaviors actually followed
  - *Collaboration:* routing correctness, context handoff quality
  - *Learning velocity:* speed at which agent adopts corrections (from Reflect + Reskill)

---

## Recommended Next Steps

### Immediate (This Week)

1. **Plagueis validates Reflect live behavior** (Priority 1)
   - Pick 3 sessions and manually classify agent corrections
   - Spot-check HIGH/MEDIUM/LOW distribution against reflect skill definition
   - Document false positives, edge cases
   - Output: `.squad/log/{date}-reflect-validation-sample.md`

2. **Nihilus snapshots Vader, Maul, Scribe post-recast** (Priority 1)
   - Baseline test pass rate, coverage, speed for current state (create `docs/evals-baseline-2026-03-22.md`)
   - Validate charter compliance: Vader (ESM, async), Maul (test coverage), Scribe (timestamps in JOURNAL.md)
   - Output: test report with before-after deltas when behavior changes

3. **Ventress self-validates first scan output** (Priority 1)
   - Run 3 days of news scans
   - Manually audit: % relevant stories, % false positives, work items generated
   - Document signal-to-noise ratio
   - Output: `.squad/log/{date}-ventress-signal-audit.md`

### Near-term (End of Month)

4. **Establish baseline metrics in `docs/evals.md`** (Priority 1 + 2)
   - Document all Priority 1 baselines (current values, how measured, regression thresholds)
   - Add Priority 2 placeholder lines (we'll measure after 2 Reskill cycles)
   - Format: `| Agent | Metric | Current | Threshold | Trend |`

5. **First Reskill Ceremony** (Sidious + Plagueis + Nihilus)
   - Review each agent's charter + reflect learnings + eval baselines
   - Identify 1-2 charter updates per agent (specific line changes)
   - Validate Reflect wasn't too noisy, Reskill is extracting real patterns
   - Output: updated charters + `.squad/decisions.md` changes

6. **Design Self-Review Ceremony** (Sidious + Nihilus)
   - Define performance dimensions (accuracy, speed, charter adherence, etc.)
   - Create template for quarterly eval
   - Schedule first run for end of Q2

### Ongoing

7. **Track eval baselines in session logs**
   - Each session: note any new learnings from Reflect
   - Each Reskill: update baseline values, flag regressions
   - Each Dream Report: surface trends in agent performance

---

## Eval Infrastructure Sketch

Once baselines are established, implement tracking (this is **not** this session's scope, but good to roadmap):

```
docs/evals.md — Baseline metrics registry
├─ Per-agent: Current metric value, target, regression threshold
├─ Per-process: Reflect signal classification, Reskill pattern density, Dream Report signal ratio
└─ Trend tracking: quarter-over-quarter delta

.squad/log/{date}-eval-sample.md — Spot-check validation (monthly)
├─ Manual audit of 3 sessions: Reflect, charter adherence, test coverage
└─ Findings: any regressions, new patterns, recommended baselines updates

eval.mjs (already exists in .squad/) — Lightweight measurement script
├─ Test pass rate & speed
├─ Charter compliance checks (grep for required practices)
└─ Output: snapshot for trend tracking
```

---

## Key Decisions for Decisions.md

**Logged for team awareness:**

- **D-003:** Eval baselines established post-recast. Priority 1: Plagueis (charter quality), Ventress (signal ratio), Vader/Maul (code quality), Scribe (Dream Report effectiveness). Reflect + Reskill baselines after 2 cycles, Self-Review designed in Q2.
  - Why: Squad behavior changed significantly (recast, +Ventress, +4 processes). Without baselines, we can't detect drift or measure improvement.
  - Trade-off: Requires manual validation first (~3 sessions). Automated tracking can wait until patterns emerge.
  - Owner: Nihilus (ongoing), Plagueis (Reflect validation), Sidious (design Self-Review).

---

## Summary

The Sith Squad is at an inflection point. The recast + new processes mean we have **zero historical data** on whether agents are actually following charters or whether new processes (Reflect, Reskill, Dream Reports) are working.

**Immediate priority:** Establish baselines for the 5 highest-impact agents/processes (Plagueis, Ventress, Vader, Maul, Scribe) over the next 2 weeks. Start with manual validation, then codify in `docs/evals.md`.

**Longer arc:** After 2 Reskill cycles, we'll have enough pattern data to measure Reflect effectiveness, Reskill signal-to-noise, and Dream Report impact. Self-Review ceremony design happens in Q2.

**No baselines = no measurement = no way to know if improvements are real.** This assessment is the foundation for everything downstream.
