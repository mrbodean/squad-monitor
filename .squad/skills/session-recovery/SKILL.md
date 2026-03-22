---
name: session-recovery
description: "Find and resume recently closed Copilot CLI sessions. Use when a session was accidentally closed, or to find past sessions by topic, working directory, or time range."
domain: "workflow-recovery"
confidence: "high"
source: "manual"
tools:
  - name: "sql"
    description: "Query session_store database for past session history"
    when: "Always — session_store is the source of truth for session history"
---

# Session Recovery

## When to Use

- A Copilot CLI session was accidentally closed and needs to be resumed
- You need to find a past session by topic
- You want to see what sessions ran in a specific directory recently
- You need to recover work from a session that was interrupted

## When Not to Use

- The session completed normally and work was committed
- You're looking for git history (use `git log` instead)

## How It Works

Copilot CLI stores session history in a SQLite database called `session_store`. This database is read-only and contains:

| Table | Key Columns | Purpose |
|-------|-------------|---------|
| `sessions` | id, cwd, repository, branch, summary, created_at, updated_at | Session metadata |
| `turns` | session_id, turn_index, user_message, assistant_response, timestamp | Conversation history |
| `checkpoints` | session_id, checkpoint_number, title, overview | Progress snapshots |
| `session_files` | session_id, file_path, tool_name, turn_index | Files touched |
| `session_refs` | session_id, ref_type, ref_value | Linked PRs/commits/issues |
| `search_index` | content, session_id, source_type | FTS5 full-text search |

## Core Queries

### 1. Find Recent Sessions (Last 24 Hours)

```sql
SELECT s.id, s.summary, s.cwd, s.branch, s.updated_at,
  (SELECT title FROM checkpoints WHERE session_id = s.id ORDER BY checkpoint_number DESC LIMIT 1) AS last_checkpoint
FROM sessions s
WHERE s.updated_at >= datetime('now', '-24 hours')
ORDER BY s.updated_at DESC;
```

### 2. Search by Topic (FTS5)

```sql
SELECT DISTINCT s.id, s.summary, s.cwd, s.updated_at
FROM search_index si
JOIN sessions s ON si.session_id = s.id
WHERE search_index MATCH 'keyword1 OR keyword2 OR keyword3'
  AND s.updated_at >= datetime('now', '-48 hours')
ORDER BY s.updated_at DESC
LIMIT 10;
```

### 3. Find Sessions by Working Directory

```sql
SELECT s.id, s.summary, s.updated_at,
  (SELECT title FROM checkpoints WHERE session_id = s.id ORDER BY checkpoint_number DESC LIMIT 1) AS last_checkpoint
FROM sessions s
WHERE s.cwd LIKE '%project-name%'
  AND s.updated_at >= datetime('now', '-48 hours')
ORDER BY s.updated_at DESC;
```

### 4. Get Session Details Before Resuming

```sql
SELECT turn_index, substr(user_message, 1, 200) AS ask, timestamp
FROM turns WHERE session_id = 'SESSION_ID_HERE'
ORDER BY turn_index;

SELECT checkpoint_number, title, overview
FROM checkpoints WHERE session_id = 'SESSION_ID_HERE'
ORDER BY checkpoint_number;

SELECT file_path, tool_name
FROM session_files WHERE session_id = 'SESSION_ID_HERE';
```

## How to Resume a Session

Once you have the session ID:

```powershell
agency copilot --resume SESSION_ID
```

## Tips

- **FTS5 query expansion**: Search for synonyms: `'auth OR login OR token OR JWT'`
- **Time windows**: Start with `-24 hours`, expand to `-48 hours` or `-7 days` if needed
- **Session IDs are UUIDs**: Always copy the full ID for `--resume`
- **Check checkpoints first**: They show what stage the session was at when it closed

## Anti-Patterns

- Don't search by partial session IDs — always use full UUIDs
- Don't try to resume sessions that completed successfully
- Don't use `MATCH` with special characters without escaping
