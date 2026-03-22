#!/usr/bin/env node
/**
 * Squad Monitor — Static site build script.
 * Reads .squad/ files + session_store DB → generates .squad-monitor/index.html
 * Supports multi-squad mode via squads.config.json → generates hub.html + per-squad dashboards
 *
 * Usage: node scripts/build.js [--squad-root <path>] [--db <path>]
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { readSquadData } from '../src/data-reader.js';
import { readSessionStore } from '../src/session-reader.js';
import { generateHtml, generateHubHtml } from '../src/html-generator.js';
import { readSquadsConfig } from '../src/config-reader.js';



export async function build(options = {}) {
  const effectiveSquadRoot = resolve(options.squadRoot || process.cwd());
  const effectiveDbPath = options.dbPath || null;
  const effectiveOutDir = options.outDir || join(effectiveSquadRoot, '.squad-monitor');

  const config = readSquadsConfig(effectiveSquadRoot);

  if (config) {
    await buildMultiSquadInternal(config, effectiveSquadRoot, effectiveDbPath, effectiveOutDir);
  } else {
    await buildSingleSquadInternal(effectiveSquadRoot, effectiveDbPath, effectiveOutDir);
  }
}

async function buildMultiSquadInternal(config, effectiveSquadRoot, effectiveDbPath, effectiveOutDir) {
  console.log(`🏗️  Squad Monitor — Building multi-squad hub`);
  console.log(`   Squad root: ${effectiveSquadRoot}`);
  console.log(`   Squads configured: ${config.squads.length}`);

  const squadsData = {};

  for (const sq of config.squads) {
    console.log(`\n📂 Reading squad: ${sq.name} (${sq.resolved.root})`);

    if (!existsSync(sq.resolved.squadDir)) {
      console.warn(`   ⚠️  Squad dir not found: ${sq.resolved.squadDir} — skipping`);
      continue;
    }

    try {
      const squadData = readSquadData(sq.resolved.root);
      console.log(`   ✅ Team: ${squadData.team.name} (${squadData.team.members.length} members)`);
      console.log(`   ✅ Agents: ${squadData.agents.length}`);
      if (squadData.subSquads.length > 0) {
        console.log(`   ✅ Sub-squads: ${squadData.subSquads.length}`);
      }

      const sessions = await readSessionStore(effectiveDbPath);
      squadsData[sq.id] = { ...squadData, sessions };

      // Build individual squad dashboard
      const squadHtml = generateHtml({ ...squadData, sessions }, { liveMode: false });
      const squadOutDir = join(effectiveOutDir, 'squads', sq.id);
      mkdirSync(squadOutDir, { recursive: true });
      const squadOutPath = join(squadOutDir, 'index.html');
      writeFileSync(squadOutPath, squadHtml, 'utf-8');
      console.log(`   ✅ Built: ${squadOutPath}`);
    } catch (err) {
      console.warn(`   ⚠️  Failed to build squad "${sq.name}": ${err.message}`);
    }
  }

  // Build hub page
  console.log(`\n🎨 Generating hub page...`);
  const hubHtml = generateHubHtml(config, squadsData, { liveMode: false });
  mkdirSync(effectiveOutDir, { recursive: true });
  const hubPath = join(effectiveOutDir, 'hub.html');
  writeFileSync(hubPath, hubHtml, 'utf-8');

  const sizeKb = (Buffer.byteLength(hubHtml, 'utf-8') / 1024).toFixed(1);
  const builtCount = Object.keys(squadsData).length;
  console.log(`\n✅ Built hub: ${hubPath} (${sizeKb} KB)`);
  console.log(`✅ Built ${builtCount} squad dashboard${builtCount !== 1 ? 's' : ''} in .squad-monitor/squads/`);
  console.log(`\n📖 Open in browser:\n   start .squad-monitor\\hub.html`);
}

async function buildSingleSquadInternal(effectiveSquadRoot, effectiveDbPath, effectiveOutDir) {
  console.log(`🏗️  Squad Monitor — Building static site`);
  console.log(`   Squad root: ${effectiveSquadRoot}`);

  // Read .squad/ data
  console.log(`📂 Reading .squad/ files...`);
  const squadData = readSquadData(effectiveSquadRoot);
  console.log(`   ✅ Team: ${squadData.team.name} (${squadData.team.members.length} members)`);
  console.log(`   ✅ Agents: ${squadData.agents.length}`);
  console.log(`   ✅ Decisions: ${(squadData.decisions.main.match(/^### D-/gm) || []).length} active, ${squadData.decisions.inbox.length} pending`);
  console.log(`   ✅ Logs: ${squadData.logs.length}`);
  console.log(`   ✅ Skills: ${squadData.skills.length}`);
  if (squadData.subSquads.length > 0) {
    console.log(`   ✅ Sub-squads: ${squadData.subSquads.length}`);
  }

  // Read session store
  console.log(`💾 Reading session store...`);
  const sessions = await readSessionStore(effectiveDbPath);
  if (sessions.available) {
    console.log(`   ✅ ${sessions.sessions.length} sessions found (${sessions.dbPath})`);
  } else {
    console.log(`   ⚠️  Session store not found — conversations tab will be empty`);
  }

  // Generate HTML
  console.log(`🎨 Generating HTML...`);
  const html = generateHtml({ ...squadData, sessions }, { liveMode: false });

  // Write output
  mkdirSync(effectiveOutDir, { recursive: true });
  const outPath = join(effectiveOutDir, 'index.html');
  writeFileSync(outPath, html, 'utf-8');

  const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`\n✅ Built: ${outPath} (${sizeKb} KB)`);
  console.log(`\n📖 Open in browser:\n   start .squad-monitor\\index.html`);
}

// Self-execution when run directly
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  const args = process.argv.slice(2);
  function getArg(name) {
    const idx = args.indexOf(name);
    return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
  }

  const squadRoot = getArg('--squad-root') || process.cwd();
  const dbPath = getArg('--db') || null;

  build({ squadRoot, dbPath }).catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
}
