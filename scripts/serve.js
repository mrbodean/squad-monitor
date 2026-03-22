#!/usr/bin/env node
/**
 * Squad Monitor — Live dev server.
 * Serves the dashboard with auto-refresh on .squad/ file changes.
 *
 * Usage: node scripts/serve.js [--squad-root <path>] [--db <path>] [--port <port>]
 */
import express from 'express';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { readSquadData } from '../src/data-reader.js';
import { readSessionStore } from '../src/session-reader.js';
import { generateHtml } from '../src/html-generator.js';

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(name);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
}

const squadRoot = resolve(getArg('--squad-root') || process.cwd());
const dbPath = getArg('--db') || null;
const port = parseInt(getArg('--port') || process.env.PORT || '3000', 10);
const squadDir = join(squadRoot, '.squad');

const app = express();

// Recursively find the latest mtime in a directory
function getLatestMtime(dir) {
  let latest = 0;
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      try {
        if (entry.isDirectory()) {
          const sub = getLatestMtime(fullPath);
          if (sub > latest) latest = sub;
        } else {
          const mtime = statSync(fullPath).mtimeMs;
          if (mtime > latest) latest = mtime;
        }
      } catch { /* skip inaccessible files */ }
    }
  } catch { /* directory unreadable */ }
  return latest;
}

// GET / — serve fresh dashboard HTML
app.get('/', async (_req, res) => {
  try {
    const squadData = readSquadData(squadRoot);
    const sessions = await readSessionStore(dbPath);
    const html = generateHtml({ ...squadData, sessions }, { liveMode: true });
    res.type('html').send(html);
  } catch (err) {
    console.error('❌ Error generating page:', err);
    res.status(500).send('Internal server error — check console for details.');
  }
});

// GET /api/timestamp — latest mtime of any file in .squad/
app.get('/api/timestamp', (_req, res) => {
  const timestamp = getLatestMtime(squadDir);
  res.json({ timestamp });
});

app.listen(port, () => {
  console.log(`🔴 Squad Monitor live at http://localhost:${port} (auto-refresh every 10s)`);
  console.log(`   Squad root: ${squadRoot}`);
  console.log(`   Press Ctrl+C to stop`);
});
