# Skill: GitHub Project Board Management

**Confidence:** medium
**Domain:** issue-lifecycle, project-management
**Last validated:** 2026-03-08

## Context

The team uses a GitHub Projects V2 board to track issue status visually. Issues MUST be moved on the board when their status changes — labels alone are not sufficient.

## Board Columns

| Column | When to use |
|--------|------------|
| **Todo** | Issue is triaged and assigned but work hasn't started |
| **In Progress** | Agent is actively working on the issue (branch created, PR in draft) |
| **Done** | Issue is closed, PR merged |
| **Blocked** | Issue cannot proceed — dependency, CI issue, or technical blocker |
| **Pending User** | Waiting for user input — decision needed, clarification required, or review requested |

## How to Move Items

### 1. Add an issue to the board (if not already there)

```bash
gh project item-add 1 --owner {OWNER} --url https://github.com/{OWNER}/{REPO}/issues/{NUMBER}
```

### 2. Get the item ID for an issue already on the board

```bash
gh project item-list 1 --owner {OWNER} --format json | python -c "
import json,sys
items = json.load(sys.stdin)['items']
for item in items:
    if 'content' in item and item['content'].get('number') == {NUMBER}:
        print(item['id'])
        break
"
```

### 3. Move an item to a column

```bash
gh project item-edit --project-id {PROJECT_ID} --id {ITEM_ID} --field-id {FIELD_ID} --single-select-option-id {OPTION_ID}
```

## When to Update the Board

Agents MUST update the board in these situations:

1. **Triage:** When an issue is triaged → set to `Todo`
2. **Starting work:** When creating a branch/PR → set to `In Progress`
3. **Blocked:** When encountering a blocker → set to `Blocked` + comment explaining why
4. **Needs user input:** When waiting for user → set to `Pending User`
5. **Closing:** When closing an issue → set to `Done`
6. **Review:** When PR is open and ready for review → set to `Review`

## Important

- Always update the board AND the label together — they serve different audiences (board = visual, labels = automation)
- If `gh project` commands fail, log the failure but don't block the main work
- **When closing ANY issue, ALWAYS move it to Done**. Closed issues must be in Done regardless of how they were closed.
