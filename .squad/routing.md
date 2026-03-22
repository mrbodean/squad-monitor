# Routing Rules — The Sith Squad

## Work Type → Agent

| Work Type | Agent | Examples |
|-----------|-------|---------|
| architecture | Sidious | System design, scope, trade-offs, code review |
| implementation | Vader | Feature code, CLI, runtime, file operations |
| testing | Maul | Tests, quality gates, edge cases, CI/CD |
| documentation | Tyranus | README, docs, messaging, onboarding, examples |
| prompts | Plagueis | Agent charters, system prompts, manifest design |
| git | Revan | Git workflow, pushes, PRs, releases, GitHub auth, CI/CD |
| evals | Nihilus | Eval design, baselines, agent-as-judge, quality scoring |
| research | Traya | Ecosystem research, grounding content review, upstream tracking, weekly opportunity check-ins |
| news | Ventress | Daily tech news scanning, signal filtering, relevance ranking, work item generation from external signals |
| history | Scribe | Build journal, decision history, evolution narrative, prompt curation, markdown review |
| async issues (bugs, tests, small features) | @copilot 🤖 | Well-defined tasks matching capability profile |
| dependency updates & version bumps | @copilot 🤖 | npm updates, security patches, lockfile refresh |
| scaffolding & boilerplate | @copilot 🤖 | New module stubs, CLI option additions |

## Routing Principles

1. **Eager by default** — dispatch agents who could usefully start work in parallel.
2. **"Spawn" means dispatch a sub-agent.** Use the `task` tool with `mode: "background"` to launch squad members as parallel sub-agents. Include the agent's charter from `.squad/agents/<name>/charter.md` in the dispatch prompt.
3. **Scribe always runs** after substantial work, dispatched in background. Never blocks.
4. **Quick facts → lead agent answers directly.** Don't dispatch for trivial questions.
5. **Two agents could handle it** → pick the one whose domain is the primary concern.
6. **Anticipate downstream.** Feature being built? Dispatch tester simultaneously as a background sub-agent.

## Automatic Secondary Routing

These triggers fire every session, regardless of user request:

| When this happens... | Also activate... |
|---------------------|-----------------|
| Implementation work | Testing review (Tester/equivalent) |
| User-visible behavior changes | Documentation update (DevRel/equivalent) |
| Prompt or agent changes | Eval baseline check (Evaluator/equivalent) |
| Significant trade-off or decision | Decision logging (any agent) |
| Meaningful milestone reached | Journal update (Scribe/equivalent) |

## Completion Routing Check

Before finishing, ask: **"Which squad roles should have touched this work but haven't?"**
Resolve those gaps or explicitly report them before ending the session.

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, evaluate @copilot fit, assign `squad:{member}` label | Sidious (Lead) |
| `squad:{name}` | Pick up issue and complete the work | Named member |
| `squad:copilot` | Assign to @copilot for autonomous work (if enabled) | @copilot 🤖 |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, **Sidious** triages it — analyzing content, evaluating @copilot's capability profile, assigning the right `squad:{member}` label, and commenting with triage notes.
2. **@copilot evaluation:** Sidious checks if the issue matches @copilot's capability profile (🟢 good fit / 🟡 needs review / 🔴 not suitable). If it's a good fit, Sidious may route to `squad:copilot` instead of a squad member.
3. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
4. When `squad:copilot` is applied and auto-assign is enabled, `@copilot` is assigned on the issue and picks it up autonomously.
5. Members can reassign by removing their label and adding another member's label.
6. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

### Lead Triage Guidance for @copilot

When triaging, Sidious should ask:

1. **Is this well-defined?** Clear title, reproduction steps or acceptance criteria, bounded scope → likely 🟢
2. **Does it follow existing patterns?** Adding a test, fixing a known bug, updating a dependency → likely 🟢
3. **Does it need design judgment?** Architecture, API design, UX decisions → likely 🔴
4. **Does it touch the eval framework or quality baselines?** Eval logic, scorecard, agent-as-judge → always 🔴
5. **Is it medium complexity with specs?** Feature with clear requirements, refactoring with tests → likely 🟡
