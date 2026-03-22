/**
 * Multi-squad config reader — reads squads.config.json for hub mode.
 * Returns null when no config exists (single-squad mode).
 */
import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Derive a URL-safe squad ID from a name.
 * Lowercases and replaces non-alphanumeric chars with hyphens.
 */
export function toSquadId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Read squads.config.json if it exists. Returns null if not found (single-squad mode).
 * Each squad entry gets a derived id and resolved absolute paths.
 */
export function readSquadsConfig(rootPath = process.cwd()) {
  const configPath = join(rootPath, 'squads.config.json');
  if (!existsSync(configPath)) return null;

  try {
    const raw = readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw);

    if (!config.squads || !Array.isArray(config.squads)) {
      console.warn('squads.config.json: "squads" array is missing or invalid');
      return null;
    }

    return {
      squads: config.squads.map(sq => ({
        name: sq.name || 'Unnamed Squad',
        description: sq.description || '',
        root: sq.root,
        id: toSquadId(sq.name || 'unnamed'),
        resolved: {
          root: resolve(rootPath, sq.root),
          squadDir: resolve(rootPath, sq.root, '.squad')
        }
      }))
    };
  } catch (err) {
    console.warn('Failed to read squads.config.json:', err.message);
    return null;
  }
}
