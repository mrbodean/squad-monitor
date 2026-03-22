---
name: "reflect"
description: "Captures corrections and learnings from conversations, classifies them by confidence, and routes them to the right place in squad knowledge"
domain: "agent-learning"
confidence: "low"
source: "manual — inspired by Tamir Dresher's squad evolution blog and Richard Murillo's original design"
---

## Context

Agents make mistakes. Users correct them. Those corrections are gold — but only if they persist across sessions.

The reflect skill is a structured system for capturing learnings from conversations and routing them to the right place in the squad's knowledge architecture. When a user says "no, use X instead of Y," that correction gets classified, proposed for review, and — if approved — written where it won't be forgotten.

**Any agent** can invoke reflect. It is not owned by a single role; it is a shared protocol. Plagueis maintains the skill definition; every agent executes it.

## Patterns

### Classification Tiers

Every detected learning is classified into one of three confidence tiers. The tier determines urgency and handling.

#### HIGH Confidence — Explicit Corrections

The user directly corrects the agent. There is no ambiguity.

**Trigger phrases:**
- "No," "Wrong," "Never do this," "Always do X instead"
- "Stop doing Y," "That's incorrect," "Don't use Z"
- Any direct negation or imperative override

**Handling:** Propose immediately. Do not accumulate. The user sees the proposal in the same response where the correction was detected.

#### MEDIUM Confidence — Praised Patterns & Discovered Edge Cases

The user affirms a behavior, or the agent discovers something that worked unexpectedly well (or failed unexpectedly).

**Trigger phrases:**
- "Yes, exactly like that," "This is great," "Perfect"
- "That's the right approach," "Keep doing this"
- Agent discovers an edge case that changes how work should be done

**Handling:** Accumulate. Propose in batches — either at session end or during Reskill ceremonies. Do not interrupt flow for medium-confidence learnings.

#### LOW Confidence — Observed Preferences

No explicit statement, but a pattern emerges over time. The user consistently makes the same choice when alternatives exist.

**Examples:**
- User always picks concise output over verbose
- User consistently prefers option A over option B
- User restructures agent output the same way every time

**Handling:** Track silently. Propose only when the pattern is clear — 3 or more consistent observations across at least 2 sessions. When proposing, cite the observations.

### Invocation Protocol

When an agent detects a correction or learning, they include a reflect block in their response:

```
📌 Reflect: {description of the learning}
   Confidence: {HIGH | MEDIUM | LOW}
   Scope: {team | agent}
   Agent: {name of the agent proposing}
```

- **HIGH** learnings include `Approve? (y/n)` — the agent waits for confirmation before writing.
- **MEDIUM** learnings are noted inline but not actioned until batch review.
- **LOW** learnings are tracked in the agent's history only — the user does not see them until the pattern solidifies.

### Routing Rules

Where the learning gets written depends on its scope.

| Scope | Destination | When |
|-------|-------------|------|
| **team** | `.squad/decisions/inbox/{agent}-reflect-{slug}.md` | Learning applies to all agents (e.g., "never use library X in this project") |
| **agent** | `.squad/agents/{name}/history.md` under `## Learnings` | Learning is specific to one agent's domain (e.g., "Vader should use async/await, not callbacks") |
| **uncertain** | Default to **agent-specific** | Less noise. Can be promoted to team-wide later. |

#### Decisions Inbox Format

Files routed to the inbox are picked up by Scribe during journal updates and merged into `decisions.md` when appropriate.

```markdown
# Reflect: {slug}

- **Proposed by:** {agent name}
- **Date:** {ISO date}
- **Confidence:** {HIGH | MEDIUM | LOW}
- **Source:** User correction during session

## Learning

{What was learned — be specific}

## Context

{What the agent was doing when corrected, and what the user said}
```

#### Agent History Format

Append to the agent's `history.md` under `## Learnings`:

```markdown
### {Short title} — {date}
- **Confidence:** {tier}
- **Detail:** {What was learned}
```

### Reskill Integration

During Reskill ceremonies (see `.squad/ceremonies.md`):
1. Review all MEDIUM learnings accumulated since last reskill
2. Review any LOW learnings that have reached the 3-observation threshold
3. Decide: promote to team-wide decision, keep as agent-specific, or discard
4. Scribe merges approved team-wide learnings into `decisions.md`

## Examples

### HIGH — Explicit Correction

**User:** "No, don't use `fs.readFileSync` in this project. We always use async I/O."

**Agent response includes:**
```
📌 Reflect: Never use synchronous file I/O (fs.readFileSync, fs.writeFileSync, etc.) in this project. Always use async equivalents.
   Confidence: HIGH
   Scope: team
   Agent: Vader

Approve? (y/n)
```

On approval → writes to `.squad/decisions/inbox/vader-reflect-no-sync-io.md` and Scribe merges it into `decisions.md`.

### MEDIUM — Praised Pattern

**User:** "Yes, exactly — I love that you included the error codes in the response. Keep doing that."

**Agent notes internally:**
```
📌 Reflect: Include specific error codes (not just messages) in API error responses. User praised this pattern.
   Confidence: MEDIUM
   Scope: agent
   Agent: Vader
```

Appended to `.squad/agents/vader/history.md` under `## Learnings`. Reviewed at next Reskill.

### LOW — Observed Preference

**Agent notices (session 1):** User reformats table output to use bullet lists.
**Agent notices (session 2):** User again converts table to bullets.
**Agent notices (session 3):** Third time — pattern confirmed.

```
📌 Reflect: User prefers bullet-list format over tables for summary output. Observed 3 times across sessions.
   Confidence: LOW → promoted to MEDIUM
   Scope: team
   Agent: Plagueis
```

Now proposed for review at next Reskill ceremony.

## Anti-Patterns

- **Writing without approval.** HIGH confidence learnings still require user confirmation. Never auto-write to `decisions.md` or history without the user saying yes.
- **Over-reflecting.** Not every user comment is a learning. "Thanks" is not a MEDIUM-confidence praised pattern. Look for specific, actionable feedback.
- **Team-wide by default.** When scope is unclear, default to agent-specific. Promoting is easy; retracting a team-wide decision is noisy.
- **Losing context.** A learning without context ("don't do X") is less useful than one with context ("don't do X because Y, as discovered when Z"). Always capture the why.
- **Ignoring LOW signals.** Low-confidence observations are the early-warning system. Track them even if they seem minor — patterns reveal themselves over time.
- **Reflecting on reflect.** Don't meta-reflect on the reflect process itself during normal work. Save process improvements for dedicated retros.
