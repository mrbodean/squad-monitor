/**
 * Session store reader — queries Copilot's session_store SQLite DB.
 * Uses sql.js (WASM-based, no native deps).
 * Gracefully returns empty data if DB is unavailable.
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import initSqlJs from 'sql.js';

/**
 * Find the session_store database path.
 */
function findSessionStorePath() {
  const candidates = [
    join(homedir(), '.copilot', 'session-store.db'),
    join(homedir(), '.copilot', 'session-store', 'store.db'),
    join(homedir(), '.copilot', 'session-state', 'store.db'),
    join(homedir(), '.copilot', 'store.db'),
  ];

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

/**
 * Open the session_store DB. Returns null if unavailable.
 */
async function openDb(dbPath) {
  if (!dbPath || !existsSync(dbPath)) return null;

  try {
    const SQL = await initSqlJs();
    const buffer = readFileSync(dbPath);
    return new SQL.Database(buffer);
  } catch (err) {
    console.warn(`Could not open session_store: ${err.message}`);
    return null;
  }
}

/**
 * Run a query and return results as array of objects.
 */
function query(db, sql, params = []) {
  try {
    const stmt = db.prepare(sql);
    if (params.length) stmt.bind(params);

    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (err) {
    console.warn(`Query failed: ${err.message}`);
    return [];
  }
}

/**
 * Read recent sessions (last 30 days).
 */
function readSessions(db) {
  return query(db, `
    SELECT id, cwd, repository, branch, summary, created_at, updated_at
    FROM sessions
    ORDER BY created_at DESC
    LIMIT 50
  `);
}

/**
 * Read turns for a specific session.
 */
function readTurns(db, sessionId) {
  return query(db, `
    SELECT turn_index, user_message, assistant_response, timestamp
    FROM turns
    WHERE session_id = ?
    ORDER BY turn_index ASC
  `, [sessionId]);
}

/**
 * Read checkpoints for a specific session.
 */
function readCheckpoints(db, sessionId) {
  return query(db, `
    SELECT checkpoint_number, title, overview, work_done
    FROM checkpoints
    WHERE session_id = ?
    ORDER BY checkpoint_number ASC
  `, [sessionId]);
}

/**
 * Read files modified across sessions.
 */
function readRecentFiles(db) {
  return query(db, `
    SELECT sf.file_path, sf.tool_name, s.id as session_id, s.summary, sf.first_seen_at
    FROM session_files sf
    JOIN sessions s ON sf.session_id = s.id
    ORDER BY sf.first_seen_at DESC
    LIMIT 100
  `);
}

/**
 * Read all session store data. Returns empty structure if DB unavailable.
 */
export async function readSessionStore(customDbPath) {
  const dbPath = customDbPath || findSessionStorePath();

  const empty = {
    available: false,
    dbPath: null,
    sessions: [],
    recentFiles: [],
    sessionDetails: {}
  };

  if (!dbPath) {
    console.warn('Session store not found. Conversations tab will be empty.');
    return empty;
  }

  const db = await openDb(dbPath);
  if (!db) return empty;

  try {
    const sessions = readSessions(db);
    const recentFiles = readRecentFiles(db);

    // Load details for recent sessions (top 10)
    const sessionDetails = {};
    for (const s of sessions.slice(0, 10)) {
      sessionDetails[s.id] = {
        turns: readTurns(db, s.id),
        checkpoints: readCheckpoints(db, s.id)
      };
    }

    return {
      available: true,
      dbPath,
      sessions,
      recentFiles,
      sessionDetails
    };
  } finally {
    db.close();
  }
}
