# Ceremonies

> Team meetings that happen before or after work. Each squad configures their own.

## Design Review

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | before |
| **Condition** | multi-agent task involving 2+ agents modifying shared systems |
| **Facilitator** | lead |
| **Participants** | all-relevant |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Review the task and requirements
2. Agree on interfaces and contracts between components
3. Identify risks and edge cases
4. Assign action items

---

## Reskill Review

| Field | Value |
|-------|-------|
| **Trigger** | manual |
| **When** | before |
| **Condition** | quarterly or when user requests "reskill" / "review charters" |
| **Facilitator** | Sidious |
| **Participants** | Plagueis, Nihilus |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Review each agent's charter against accumulated learnings in their history.md
2. Identify patterns: corrections that recur, preferences that have solidified, new capabilities
3. Propose charter updates — specific line-level changes with reasoning
4. Plagueis validates prompt quality of proposed changes
5. Nihilus checks if eval baselines need updating for changed behavior

---

## Dream Report (Nap)

| Field | Value |
|-------|-------|
| **Trigger** | manual |
| **When** | after |
| **Condition** | monthly or when user requests "nap" / "dream report" / "pattern synthesis" |
| **Facilitator** | Scribe |
| **Participants** | Sidious, Traya |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. Scribe synthesizes all orchestration logs and session logs from the period
2. Surface recurring themes: repeated blockers, common patterns, unfollowed decisions
3. Traya cross-references with external signals (model changes, ecosystem shifts)
4. Sidious reviews and produces action items
5. Output: `.squad/log/{timestamp}-dream-report.md` with patterns and recommendations

---

## Retrospective

| Field | Value |
|-------|-------|
| **Trigger** | auto |
| **When** | after |
| **Condition** | build failure, test failure, or reviewer rejection |
| **Facilitator** | lead |
| **Participants** | all-involved |
| **Time budget** | focused |
| **Enabled** | ✅ yes |

**Agenda:**
1. What happened? (facts only)
2. Root cause analysis
3. What should change?
4. Action items for next iteration
