#!/usr/bin/env node
/**
 * Squad Monitor CLI
 * 
 * Usage:
 *   squad-monitor build [options]
 *   squad-monitor dev [options]
 *   squad-monitor --help
 *   squad-monitor --version
 * 
 * Options:
 *   --squad-root <path>    Path to squad directory (default: cwd)
 *   --db <path>            Path to session store database
 *   --port <port>          Port for dev server (default: 3000, dev mode only)
 */

import { readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJsonPath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

// Parse CLI args
const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(name);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : null;
}

function hasFlag(name) {
  return args.includes(name);
}

const command = args.find(arg => !arg.startsWith('--'));

// Show version (check before help)
if (hasFlag('--version') || hasFlag('-v')) {
  console.log(`Squad Monitor v${version}`);
  process.exit(0);
}

// Show help
if (hasFlag('--help') || hasFlag('-h') || !command) {
  console.log(`
Squad Monitor v${version}

Usage:
  squad-monitor build [options]    Build static dashboard
  squad-monitor dev [options]      Start live dev server
  squad-monitor --help              Show this help
  squad-monitor --version           Show version

Options:
  --squad-root <path>    Path to squad directory (default: current directory)
  --db <path>            Path to session store database
  --port <port>          Port for dev server (default: 3000, dev mode only)

Examples:
  squad-monitor build
  squad-monitor dev --port 4000
  squad-monitor build --squad-root /path/to/squad --db /path/to/db
`);
  process.exit(0);
}

// Parse common options
const squadRoot = getArg('--squad-root') || process.cwd();
const dbPath = getArg('--db') || null;
const port = parseInt(getArg('--port') || '3000', 10);

// Validate squad root
const squadDir = resolve(join(squadRoot, '.squad'));
if (!existsSync(squadDir)) {
  console.error(`❌ No .squad/ directory found at ${resolve(squadRoot)}`);
  console.error(`   Run this from a squad project directory or use --squad-root.`);
  process.exit(1);
}

// Print header
console.log(`\nSquad Monitor v${version}\n`);

// Execute command
if (command === 'build') {
  const { build } = await import('../scripts/build.js');
  await build({ squadRoot, dbPath });
} else if (command === 'dev') {
  const { serve } = await import('../scripts/serve.js');
  await serve({ squadRoot, dbPath, port });
} else {
  console.error(`❌ Unknown command: ${command}`);
  console.error(`   Run 'squad-monitor --help' for usage information.`);
  process.exit(1);
}
