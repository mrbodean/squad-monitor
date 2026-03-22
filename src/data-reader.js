/**
 * Squad data reader — reads .squad/ directory files into structured data.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, basename, dirname } from 'path';

/**
 * Read and parse a markdown file, returning raw content.
 * Returns null if file doesn't exist.
 */
function readMd(filePath) {
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, 'utf-8');
}

/**
 * List subdirectories in a directory.
 */
function listDirs(dirPath) {
  if (!existsSync(dirPath)) return [];
  return readdirSync(dirPath).filter(name => {
    const full = join(dirPath, name);
    return statSync(full).isDirectory();
  });
}

/**
 * List markdown files in a directory.
 */
function listMdFiles(dirPath) {
  if (!existsSync(dirPath)) return [];
  return readdirSync(dirPath).filter(name => name.endsWith('.md'));
}

/**
 * Read team.md and extract squad metadata.
 */
export function readTeam(squadRoot) {
  const content = readMd(join(squadRoot, '.squad', 'team.md'));
  if (!content) return { raw: '', name: 'Unknown Squad', members: [] };

  const nameMatch = content.match(/^#\s+(.+)/m);
  const name = nameMatch ? nameMatch[1].replace(/\s*—.*$/, '') : 'Unknown Squad';

  const members = [];
  const tableRegex = /\|\s*(\S+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/g;
  let match;
  while ((match = tableRegex.exec(content)) !== null) {
    if (match[1] === 'Name' || match[1].startsWith('-')) continue;
    members.push({
      name: match[1],
      emoji: match[2].trim(),
      role: match[3].trim(),
      status: match[4].trim()
    });
  }

  return { raw: content, name, members };
}

/**
 * Read all agent data (charters, histories).
 */
export function readAgents(squadRoot, teamMembers = []) {
  const agentsDir = join(squadRoot, '.squad', 'agents');
  const agents = [];
  const memberNames = teamMembers.map(m => m.name.toLowerCase());

  for (const name of listDirs(agentsDir)) {
    if (memberNames.length > 0 && !memberNames.includes(name.toLowerCase())) continue;

    const charter = readMd(join(agentsDir, name, 'charter.md'));
    const history = readMd(join(agentsDir, name, 'history.md'));
    if (charter) {
      const roleMatch = charter.match(/\*\*Role:\*\*\s*(.+)/);
      const emojiMatch = charter.match(/\*\*Emoji:\*\*\s*(.+)/);
      agents.push({
        name,
        role: roleMatch ? roleMatch[1].trim() : 'Unknown',
        emoji: emojiMatch ? emojiMatch[1].trim() : '🤖',
        charter,
        history: history || null
      });
    }
  }

  return agents;
}

/**
 * Read decisions.md and inbox.
 */
export function readDecisions(squadRoot) {
  const main = readMd(join(squadRoot, '.squad', 'decisions.md')) || '';
  const inboxDir = join(squadRoot, '.squad', 'decisions', 'inbox');
  const inbox = [];

  if (existsSync(inboxDir)) {
    for (const file of listMdFiles(inboxDir)) {
      const content = readMd(join(inboxDir, file));
      if (content) {
        inbox.push({ filename: file, content });
      }
    }
  }

  return { main, inbox };
}

/**
 * Read orchestration logs and session logs.
 */
export function readLogs(squadRoot) {
  const logs = [];

  // Orchestration logs
  const orchDir = join(squadRoot, '.squad', 'orchestration-log');
  if (existsSync(orchDir)) {
    for (const file of listMdFiles(orchDir)) {
      const content = readMd(join(orchDir, file));
      if (content) {
        logs.push({ type: 'orchestration', filename: file, content });
      }
    }
  }

  // Session logs
  const logDir = join(squadRoot, '.squad', 'log');
  if (existsSync(logDir)) {
    for (const file of listMdFiles(logDir)) {
      const content = readMd(join(logDir, file));
      if (content) {
        logs.push({ type: 'session', filename: file, content });
      }
    }
  }

  return logs.sort((a, b) => b.filename.localeCompare(a.filename));
}

/**
 * Read ceremonies.md.
 */
export function readCeremonies(squadRoot) {
  return readMd(join(squadRoot, '.squad', 'ceremonies.md')) || '';
}

/**
 * Read all skills.
 */
export function readSkills(squadRoot) {
  const skillsDir = join(squadRoot, '.squad', 'skills');
  const skills = [];

  for (const name of listDirs(skillsDir)) {
    const content = readMd(join(skillsDir, name, 'SKILL.md'));
    if (content) {
      skills.push({ name, content });
    }
  }

  return skills;
}

/**
 * Read sub-squads from .squad/sub-squads/{name}/ directories.
 * Each sub-squad dir must contain a .squad/ subdirectory to be recognized.
 * Returns empty array if no sub-squads directory exists.
 */
export function readSubSquads(squadRoot) {
  const subSquadsDir = join(squadRoot, '.squad', 'sub-squads');
  if (!existsSync(subSquadsDir)) return [];

  const subSquads = [];
  for (const name of listDirs(subSquadsDir)) {
    const subRoot = join(subSquadsDir, name);
    const subSquadDir = join(subRoot, '.squad');
    if (!existsSync(subSquadDir) || !statSync(subSquadDir).isDirectory()) continue;

    const team = readTeam(subRoot);
    const agents = readAgents(subRoot, team.members);
    const decisions = readDecisions(subRoot);
    subSquads.push({
      id: name,
      isSubSquad: true,
      team,
      agents,
      decisions
    });
  }

  return subSquads;
}

/**
 * Read all squad data into a single object.
 */
export function readSquadData(squadRoot) {
  const team = readTeam(squadRoot);
  return {
    team,
    agents: readAgents(squadRoot, team.members),
    decisions: readDecisions(squadRoot),
    logs: readLogs(squadRoot),
    ceremonies: readCeremonies(squadRoot),
    skills: readSkills(squadRoot),
    subSquads: readSubSquads(squadRoot)
  };
}
