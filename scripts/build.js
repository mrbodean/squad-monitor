#!/usr/bin/env node
/**
 * Squad Monitor — Static site build script.
 * Reads .squad/ files + session_store DB → generates dist/index.html
 *
 * Usage: node scripts/build.js [--squad-root <path>] [--db <path>]
 */
import { writeFileSync, mkdirSync } from 'fs';
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
const outDir = join(squadRoot, 'dist');

async function build() {
  console.log(`🏗️  Squad Monitor — Building static site`);
  console.log(`   Squad root: ${squadRoot}`);

  // Read .squad/ data
  console.log(`📂 Reading .squad/ files...`);
  const squadData = readSquadData(squadRoot);
  console.log(`   ✅ Team: ${squadData.team.name} (${squadData.team.members.length} members)`);
  console.log(`   ✅ Agents: ${squadData.agents.length}`);
  console.log(`   ✅ Decisions: ${(squadData.decisions.main.match(/^### D-/gm) || []).length} active, ${squadData.decisions.inbox.length} pending`);
  console.log(`   ✅ Logs: ${squadData.logs.length}`);
  console.log(`   ✅ Skills: ${squadData.skills.length}`);

  // Read session store
  console.log(`💾 Reading session store...`);
  const sessions = await readSessionStore(dbPath);
  if (sessions.available) {
    console.log(`   ✅ ${sessions.sessions.length} sessions found (${sessions.dbPath})`);
  } else {
    console.log(`   ⚠️  Session store not found — conversations tab will be empty`);
  }

  // Generate HTML
  console.log(`🎨 Generating HTML...`);
  const html = generateHtml({ ...squadData, sessions });

  // Write output
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, 'index.html');
  writeFileSync(outPath, html, 'utf-8');

  const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`\n✅ Built: ${outPath} (${sizeKb} KB)`);
  console.log(`\n📖 Open in browser:\n   start dist\\index.html`);
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
