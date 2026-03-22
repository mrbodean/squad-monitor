---
name: restart-recovery
description: "Snapshot and restore full dev environment after machine restart. Captures running services, agency sessions, backlog state, and auto-recovers on login."
domain: "workflow-recovery"
confidence: "high"
source: "manual"
tools:
  - name: "powershell"
    description: "Execute recovery scripts and register Task Scheduler"
    when: "Always — scripts are OS-level"
---

# Restart Recovery

## When to Use

- You're about to restart/reboot the machine and want to preserve state
- The machine just rebooted and you need everything back
- You want auto-recovery on login (Task Scheduler)

## When Not to Use

- Session was closed normally (use session-recovery plugin instead)
- Looking for git history (use `git log`)

## How It Works

Three phases: **Snapshot** → **Recovery** → **Auto-trigger**

### Phase 1: Snapshot (Before Restart)

Create `.squad/restart-snapshot.json` capturing:

```json
{
  "timestamp": "2026-03-17T18:00:00Z",
  "services": [
    { "name": "Squad Monitor", "status": "running" },
    { "name": "Dashboard UI", "status": "running" }
  ],
  "agency_sessions": [
    { "id": "SESSION_UUID", "name": "Current Work", "cwd": ".", "status": "running" }
  ],
  "pending_git": {
    "uncommitted_changes": false,
    "unpushed_commits": 2
  }
}
```

**How to create the snapshot:**
1. Scan running processes for known services
2. Query session_store for active agency sessions
3. Check git status for uncommitted/unpushed work
4. Write to `.squad/restart-snapshot.json`

### Phase 2: Recovery (After Restart)

The recovery script:
1. Reads `.squad/restart-snapshot.json`
2. Validates all inputs (path traversal protection, UUID format checks)
3. Launches services via an **allowlist** (only known service names accepted)
4. Resumes agency sessions with validated session IDs
5. Prints a recovery summary

### Phase 3: Auto-trigger (Optional)

**Windows (Task Scheduler):**
```powershell
$action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$PWD\scripts\recover-from-restart.ps1`""
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "Squad-RecoverFromRestart" -Action $action -Trigger $trigger -Settings $settings -Description "Auto-recover Squad services after restart"
```

## Security

- **Allowlist-only service launching** — only known service names trigger pre-defined commands
- **Path validation** — all paths checked against repo root (no directory traversal)
- **UUID format validation** — session IDs must match strict UUID v4 pattern
- **No shell injection** — snapshot fields are never interpolated into shell commands

## Related

- **session-recovery** plugin — for finding and resuming individual past sessions
- This plugin handles full environment restore (multiple services + sessions + state)
