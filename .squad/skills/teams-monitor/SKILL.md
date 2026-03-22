---
name: "teams-monitor"
description: "Monitor Microsoft Teams channels for actionable messages and bridge them into GitHub issues"
domain: "communication-bridge"
confidence: "low"
source: "manual"
---

# Skill: Teams Monitor

## Context

Bridge Teams conversations into GitHub issues for squad tracking.

- **READ**: Use WorkIQ or Teams MCP to read Teams messages
- **SEND**: Teams Incoming Webhook sends messages to Teams

### Sending Messages to Teams

```powershell
$webhookUrl = Get-Content "$env:USERPROFILE\.squad\teams-webhook.url" -Raw
$body = @{ text = "Your message here" } | ConvertTo-Json
Invoke-RestMethod -Uri $webhookUrl.Trim() -Method Post -ContentType "application/json" -Body $body
```

**IMPORTANT**: Never hardcode the webhook URL.

## Workflow

### Step 1: Query for Recent Messages

Run targeted queries to find messages relevant to the squad's active work.

### Step 2: Filter for Actionable Content

Look for:
- **Direct requests**: "Can you look into...", "We need..."
- **Questions awaiting answers**: "Has anyone figured out..."
- **Decisions or announcements** that affect squad work
- **Escalations or incidents**: urgent items

Ignore: social/casual messages, already-processed items, automated notifications.

### Step 3: Create GitHub Issues

For each actionable item:
- **Title**: `[Teams Bridge] <concise summary>`
- **Labels**: `teams-bridge`, plus relevant domain labels
- **Body**: source, quote, context, urgency indicators

### Step 4: Deduplicate

Before creating, search existing issues for similar topics with `teams-bridge` label in the last 7 days.

### Step 5: Log Activity

Log what was found (or that nothing was found) so the team knows monitoring is active.

## Limitations

- **Read-only**: Responses go through GitHub issues/comments, not back to Teams
- **Query freshness**: Results may have indexing delay
- **No real-time streaming**: Poll-based, not event-driven
- **First implementation**: Confidence is LOW — expect iteration

## Anti-Patterns

- Don't spam queries — rate-limit to once per session/cycle
- Be selective — not every Teams message is an action item
- Always check for existing issues before creating new ones
