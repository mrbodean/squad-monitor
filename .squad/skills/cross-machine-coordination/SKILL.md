# Skill: Cross-Machine Coordination Pattern

**Skill ID:** `cross-machine-coordination`
**Squad Integration:** All agents
**Status:** Specification (ready for implementation)

---

## Overview

Enables squad agents running on different machines to securely share work, coordinate execution, and pass results without manual intervention.

**Pattern:** Git-based task queuing + GitHub Issues supplement

---

## Usage

### For Task Sources

**To assign work to another machine:**

```yaml
# .squad/cross-machine/tasks/{timestamp}-{machine}-{task-id}.yaml
id: gpu-voice-clone-001
source_machine: laptop
target_machine: devbox
priority: high
created_at: 2026-03-14T15:30:00Z
task_type: gpu_workload
payload:
  command: "python scripts/voice-clone.py --input voice.wav --output cloned.wav"
  expected_duration_min: 15
  resources:
    gpu: true
    memory_gb: 8
status: pending
```

```bash
git add .squad/cross-machine/tasks/
git commit -m "Cross-machine task: GPU voice cloning [squad:machine-devbox]"
git push origin main
```

### For Task Executors

Watches `.squad/cross-machine/tasks/` for work targeted at this machine.

**On each cycle (5-10 min):**
1. `git pull origin main`
2. Load all `.yaml` files in `.squad/cross-machine/tasks/`
3. Filter for `status=pending AND target_machine=HOSTNAME`
4. Validate schema, validate command against whitelist
5. Execute task (with timeout)
6. Write result to `.squad/cross-machine/results/{id}.yaml`
7. Commit & push result

### For Urgent/Ad-Hoc Tasks

**Use GitHub Issues with machine labels:**

```bash
gh issue create \
  --title "DevBox: Debug voice model failure" \
  --body "Error: Model failed to load. Check /tmp/model.log and report." \
  --label "squad:machine-devbox" \
  --label "urgent"
```

---

## File Formats

### Task File (YAML)

**Location:** `.squad/cross-machine/tasks/{timestamp}-{machine}-{task-id}.yaml`

**Required Fields:**
- `id` — Unique identifier
- `source_machine` — Where task was created
- `target_machine` — Where task will execute
- `priority` — high|normal|low
- `created_at` — ISO 8601 timestamp
- `task_type` — Category
- `payload.command` — Shell command to execute
- `status` — pending|executing|completed|failed

### Result File (YAML)

**Location:** `.squad/cross-machine/results/{task-id}.yaml`

Contains: id, target_machine, completed_at, status, exit_code, stdout, stderr, duration_seconds, artifacts.

---

## Security Model

1. **Schema Validation** — YAML structure matches spec, required fields present
2. **Command Whitelist** — Only approved commands allowed, no inline shell operators
3. **Resource Limits** — Timeout enforced, memory/CPU caps
4. **Execution Isolation** — Runs as unprivileged user, temp dir cleaned after execution
5. **Audit Trail** — All executions logged to git

---

## Error Handling

- **Task failure:** Result written with `status: failed` + stderr captured
- **Stalled tasks:** Process killed on timeout, result written with `status: timeout`
- **Network failures:** Retries on next cycle, tasks queue locally until connectivity restored

---

## Configuration

Config in `.squad/config.json`:

```json
{
  "cross_machine": {
    "enabled": true,
    "poll_interval_seconds": 300,
    "this_machine": "devbox",
    "max_concurrent_tasks": 2,
    "task_timeout_minutes": 60,
    "command_whitelist": ["python scripts/...", "bash scripts/..."],
    "result_ttl_days": 30
  }
}
```
