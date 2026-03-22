# Skill: GitHub-Native Distributed Coordination

**Confidence:** high
**Domain:** distributed-systems, coordination, multi-machine
**Last validated:** 2026-03-12

## Context

When multiple autonomous agents need to coordinate work without duplicate effort, **GitHub can serve as the coordination backend** using native features (comments, labels, timestamps) instead of external infrastructure.

## Use Cases

✅ **Good fit for:**
- Multi-machine agents working same issue board
- Distributed job processors claiming tasks from GitHub issues
- Automated workflows with failover

❌ **Not suitable for:**
- High-frequency coordination (>100 ops/min) — GitHub API rate limits
- Real-time locking (<1s latency)
- Large-scale coordination (>1000 concurrent workers)

## Architecture Pattern

### 1. Machine Identity

Each process identifies itself with a stable, unique machine ID (hostname or `$env:MACHINE_ID`).

### 2. Work Claiming Protocol

**Claim via atomic GitHub comment:**

```powershell
function Claim-Work {
    param([int]$IssueNumber, [string]$MachineId, [int]$LeaseMinutes = 15)
    # Check existing claims, verify lease expiration
    # Post claim comment (atomic operation)
    $timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    gh issue comment $IssueNumber --body "🔄 Claimed by $MachineId at $timestamp (lease: ${LeaseMinutes}m)"
    gh issue edit $IssueNumber --add-label "machine:$MachineId:active"
    return $true
}
```

### 3. Stale Work Recovery

Automatic reclaim of orphaned work when lease expires.

### 4. Heartbeat Protocol

Keep lease active for long-running work by updating claim comment timestamp.

## Key Design Principles

1. **Comments as immutable logs** — GitHub preserves creation timestamps
2. **Labels for visibility** — Human operators see machine activity at a glance
3. **Lease-based claiming** — Prevents indefinite starvation if a machine fails
4. **UTC timestamps** — Avoids clock skew issues
5. **Idempotent operations** — Re-claiming own work is safe
6. **Graceful degradation** — API failures delay coordination, don't break it

## Limitations

- **Rate Limits:** 5,000 requests/hour for authenticated users
- **Latency:** 1-3 seconds typical roundtrip
- **Race Conditions:** Mitigated by post-claim verification
- **Clock Skew:** Use UTC + ±2 min tolerance window

## Related Patterns

- **Leader election:** Use "claim issue #0" convention
- **Job queue:** Issues as jobs, labels as queue metadata
- **Failover coordination:** Primary/secondary machine coordination
