#!/usr/bin/env node
/**
 * Squad Monitor — Live dev server.
 * Serves the dashboard with auto-refresh on .squad/ file changes.
 * Supports multi-squad mode via squads.config.json.
 *
 * Usage: node scripts/serve.js [--squad-root <path>] [--db <path>] [--port <port>]
 */
import express from 'express';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { readSquadData } from '../src/data-reader.js';
import { readSessionStore } from '../src/session-reader.js';
import { generateHtml, generateHubHtml } from '../src/html-generator.js';
import { readSquadsConfig } from '../src/config-reader.js';

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

// GET / — serve fresh dashboard or hub page
app.get('/', async (_req, res) => {
  try {
    const config = readSquadsConfig(squadRoot);

    if (config) {
      // Multi-squad: serve hub
      const squadsData = {};
      for (const sq of config.squads) {
        if (!existsSync(sq.resolved.squadDir)) continue;
        try {
          const squadData = readSquadData(sq.resolved.root);
          const sessions = await readSessionStore(dbPath);
          squadsData[sq.id] = { ...squadData, sessions };
        } catch (err) {
          console.warn(`⚠️  Failed to read squad "${sq.name}": ${err.message}`);
        }
      }
      const html = generateHubHtml(config, squadsData, { liveMode: true });
      res.type('html').send(html);
    } else {
      // Single-squad: serve dashboard
      const squadData = readSquadData(squadRoot);
      const sessions = await readSessionStore(dbPath);
      const html = generateHtml({ ...squadData, sessions }, { liveMode: true });
      res.type('html').send(html);
    }
  } catch (err) {
    console.error('❌ Error generating page:', err);
    res.status(500).send('Internal server error — check console for details.');
  }
});

// GET /squads/:id — serve individual squad dashboard (multi-squad mode)
app.get('/squads/:squadId', async (req, res) => {
  try {
    const config = readSquadsConfig(squadRoot);
    if (!config) {
      return res.status(404).send('Multi-squad mode not configured.');
    }

    const squad = config.squads.find(s => s.id === req.params.squadId);
    if (!squad) {
      return res.status(404).send('Squad not found: ' + req.params.squadId);
    }

    if (!existsSync(squad.resolved.squadDir)) {
      return res.status(404).send('Squad directory not found: ' + squad.resolved.squadDir);
    }

    const squadData = readSquadData(squad.resolved.root);
    const sessions = await readSessionStore(dbPath);
    const html = generateHtml({ ...squadData, sessions }, { liveMode: true });
    res.type('html').send(html);
  } catch (err) {
    console.error('❌ Error generating squad page:', err);
    res.status(500).send('Internal server error — check console for details.');
  }
});

// GET /api/timestamp — latest mtime across all monitored squad roots
app.get('/api/timestamp', (_req, res) => {
  const config = readSquadsConfig(squadRoot);

  if (config) {
    let maxTimestamp = 0;
    for (const sq of config.squads) {
      if (!existsSync(sq.resolved.squadDir)) continue;
      const ts = getLatestMtime(sq.resolved.squadDir);
      if (ts > maxTimestamp) maxTimestamp = ts;
    }
    res.json({ timestamp: maxTimestamp });
  } else {
    const timestamp = getLatestMtime(squadDir);
    res.json({ timestamp });
  }
});

app.listen(port, () => {
  const config = readSquadsConfig(squadRoot);
  if (config) {
    console.log(`🔴 Squad Monitor Hub live at http://localhost:${port} (${config.squads.length} squads, auto-refresh every 10s)`);
  } else {
    console.log(`🔴 Squad Monitor live at http://localhost:${port} (auto-refresh every 10s)`);
  }
  console.log(`   Squad root: ${squadRoot}`);
  console.log(`   Press Ctrl+C to stop`);
});
