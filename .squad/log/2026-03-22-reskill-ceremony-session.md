# Reskill Review Ceremony — 2026-03-22

**Date:** 2026-03-22  
**Facilitator:** Sidious (Lead / Architect)  
**Validators:** Plagueis (Prompt Engineer), Nihilus (Evals)  
**Scope:** First formal reskill review post-recast (Sith Squad) and post-Ventress  
**Status:** COMPLETED

---

## Ceremony Overview

The first Reskill Review ceremony of the Sith Squad took place over three parallel audit tracks:

| Track | Conductor | Scope | Report |
|-------|-----------|-------|--------|
| **Skills Audit** | Sidious | Charter-vs-skills alignment across 10 agents | `2026-03-22-reskill-review.md` |
| **Prompt Quality** | Plagueis | Charter clarity, voice, boundaries, consistency | `2026-03-22-reskill-prompt-quality.md` |
| **Eval Framework** | Nihilus | Baseline strategy post-recast, process measurement | `2026-03-22-reskill-eval-baselines.md` |

---

## Key Context

The squad underwent major changes immediately before this ceremony:

1. **Recast from default to Sith theme** — role names changed, but functions intact
2. **Ventress added** — 10th agent, News/Intelligence function (first new member)
3. **Process expansion** — Added Reflect skill, Reskill Ceremony, Dream Reports, Self-Review Ceremony
4. **Skills marketplace installed** — 21 marketplace skills from tamirdresher/squad-skills
5. **Charter enhancements** — Model monitoring, skill integration, boundary clarification

This ceremony's job: validate that charters are still coherent post-transformation, skills are properly integrated, and measurement infrastructure is ready.

---

## Ceremony Findings

### 1. Skills Audit (Sidious)

**Result:** Significant charter-skill misalignment

- ✅ **In good shape:** 3 agents explicitly reference skills (Plagueis, Ventress, Revan)
- ⚠️ **Missing references:** 7 agents have zero skill references despite relevant skills existing
- **Total gaps identified:** 30 specific charter updates needed

**Key insight:** Agents don't know what skills are available or how to use them. No discovery protocol exists.

**Proposed solutions:**
- D-SKL-001: Standardize "Skills & Tools" section in charters
- D-SKL-002: Confidence markers (⚠️ for experimental skills)
- D-SKL-003: Publish `.squad/skills/README.md` with discovery protocol
- D-SKL-004: Consolidate multi-account auth guidance
- D-SKL-005: Assign project-conventions skill to Sidious for maintenance

### 2. Prompt Quality (Plagueis)

**Result:** B+ overall. Solid foundation with specific improvement areas.

- ✅ **Strengths:** Clear role definitions, actionable sections exist, recent additions are higher quality
- ⚠️ **Issues:** Vague voice statements, inconsistent reflect integration, missing failure modes, boundary overlaps
- **Charter count:** 3/10 have deep "How I Work" sections; 7/10 need expansion

**Priority fixes:**
1. Add "When to Reflect" guidance to 9 charters
2. Clarify Maul vs. Nihilus boundary (testing vs. evals)
3. Replace aspirational voice with behavioral patterns
4. Add "When I'm Stuck" escalation guidance to all charters
5. Consolidate model preferences to shared config

**Positive observation:** Reskill, Dream Reports, and Model Monitoring sections demonstrate intentional evolution. Squad is learning how to document processes.

### 3. Eval Framework (Nihilus)

**Result:** Zero existing baselines. Established prioritization strategy for measurement.

- **Current state:** No historical data on agent performance or process effectiveness
- **Root cause:** Squad recast + Ventress addition + 4 new processes = everything changed
- **Solution:** 3-tier baseline prioritization

**Priority 1 (THIS WEEK):** Plagueis, Ventress, Vader, Maul, Scribe
- These agents/processes have high impact and measurable output
- Establish baselines immediately before behavior diverges further

**Priority 2 (BY END Q2):** Sidious, Traya, Tyranus, Revan
- Lower frequency output or reactive roles
- Baselines can emerge after 2-3 measurement cycles

**Priority 3 (ORGANIC):** Validation tests, Reflect effectiveness, Reskill output, Self-Review design
- Require pattern accumulation or process maturation
- Baseline after 6 weeks or 2+ cycles

**Process measurement frameworks:**
- Reflect Skill: HIGH corrections proposed ≥95%, adoption ≥90% cross-session
- Reskill Ceremony: Charter improvement ≥80%, agent adoption ≥80%
- Dream Report: Signal-to-noise ≥80%, follow-through ≥70%
- Self-Review: Design TBD by Sidious in Q2

---

## Decisions Proposed

All decisions logged to `.squad/decisions/inbox/sidious-reskill-review.md` for team review:

### Skill Integration (5 decisions)

1. **D-SKL-001:** Standardize "Skills & Tools" section in all charters
2. **D-SKL-002:** Mark low-confidence skills with ⚠️ warning symbols
3. **D-SKL-003:** Publish skill discovery protocol in `.squad/skills/README.md`
4. **D-SKL-004:** Consolidate multi-account auth to `github-multi-account` as primary
5. **D-SKL-005:** Assign `project-conventions` skill maintenance to Sidious

### Eval Framework (absorbed into D-003 and D-004)

- **D-003:** Eval baseline framework established post-reskill (already in decisions.md)
- **D-004:** Priority 1-3 baseline timeline (already in decisions.md)

---

## Implementation Plan

### Phase 1 (Week 1) — Decisions & Documentation
- [ ] Team reviews and approves decisions (D-SKL-001 through D-SKL-005)
- [ ] Create `.squad/skills/README.md` with discovery protocol
- [ ] Update `.squad/decisions.md` with approved decisions

### Phase 2 (Week 2) — Charter Updates
- [ ] Add "Skills & Tools" section to all 10 charters
- [ ] Apply confidence markers (⚠️) to experimental skills
- [ ] Sidious begins project-conventions skill maintenance

### Phase 3 (Week 3-4) — Baseline Validation
- [ ] Plagueis validates Reflect live behavior (3 sessions)
- [ ] Nihilus snapshots Vader/Maul/Scribe baselines
- [ ] Ventress self-validates first scan output
- [ ] Establish baseline metrics in `docs/evals.md`

### Phase 4 (End of Month) — Formalize
- [ ] First scheduled Reskill Ceremony (quarterly)
- [ ] Review baselines, flag regressions
- [ ] Propose charter updates based on learnings

---

## Success Metrics

This reskill cycle is successful when:

1. **Charter quality improved:**
   - ≥80% of agents follow "When to Reflect" guidance in next session
   - Maul/Nihilus boundary clarification prevents duplicate work
   - ≥9/10 agents have failure mode guidance

2. **Skills integration achieved:**
   - All 10 agents have "Skills & Tools" section with ≥3 relevant skills
   - Agents reference skills during work (observable in session logs)
   - New skills adopted within 1 sprint of installation

3. **Eval framework validated:**
   - Priority 1 baselines established (Plagueis, Ventress, Vader, Maul, Scribe)
   - Reflect skill validation shows ≥95% HIGH classification accuracy
   - Baseline metrics documented in `docs/evals.md`

4. **Processes operationalized:**
   - Next Reskill ceremony scheduled for 2026-06-22 (3 months)
   - First Dream Report produced by 2026-04-22 (monthly)
   - Reflect corrections routing to decisions inbox consistently

---

## Notable Observations

### Positive Signals
- Squad is learning. Recent process additions (Reflect, Reskill, Dream Reports) demonstrate intentional evolution
- New agent (Ventress) charter is higher quality than some original charters
- Clear recognition that measurement is necessary post-recast

### Risk Flags
- Zero baselines means we can't measure if improvements are real
- Reflect skill in use but validation shows potential for noise
- Vague voice statements may lead to behavior drift if not clarified

### Meta-Learning
The ceremony itself demonstrates the squad's scaling maturity: instead of one agent reviewing charters, three specialized agents (Sidious on architecture, Plagueis on prompts, Nihilus on measurement) conduct parallel audits. The results are richer and cross-check each other.

---

## Next Reskill Review

**Scheduled:** 2026-06-22 (90 days / end of Q2)

**Goals for next cycle:**
1. Validate charter improvements were adopted (≥80% compliance)
2. Review baselines for regressions or improvements
3. Assess Reflect skill effectiveness after 2+ Reskill cycles
4. Finalize Self-Review ceremony design (Sidious)
5. Evaluate Dream Report signal-to-noise (first 3 reports)

---

## Artifacts Generated

- `.squad/log/2026-03-22-reskill-review.md` — Skills audit (30 charter updates)
- `.squad/log/2026-03-22-reskill-prompt-quality.md` — Charter quality review (B+ grade, 5 priority fixes)
- `.squad/log/2026-03-22-reskill-eval-baselines.md` — Eval framework (3-tier baseline plan)
- `.squad/decisions/inbox/sidious-reskill-review.md` — Proposed decisions (5 skill decisions)
- `.squad/orchestration-log/2026-03-22T14-10-04Z-sidious-reskill-conductor.md` — Sidious audit log
- `.squad/orchestration-log/2026-03-22T14-10-05Z-plagueis-prompt-quality-review.md` — Plagueis audit log
- `.squad/orchestration-log/2026-03-22T14-10-06Z-nihilus-eval-baseline-assessment.md` — Nihilus audit log
- `.squad/log/2026-03-22-reskill-ceremony-session.md` — This ceremony summary

---

**Ceremony Status:** ✅ COMPLETE  
**Next Action:** Route decisions to team for approval
