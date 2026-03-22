/**
 * HTML generator — produces a single-page dashboard from squad data.
 * Uses marked for markdown rendering. Pico.css for styling.
 */
import { marked } from 'marked';

// Truncate long text for previews
function truncate(text, maxLen = 200) {
  if (!text || text.length <= maxLen) return text || '';
  return text.slice(0, maxLen) + '…';
}

// Escape HTML entities
function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Render markdown to HTML
function md(content) {
  if (!content) return '';
  return marked.parse(content);
}

// Format a timestamp for display
function formatDate(ts) {
  if (!ts) return '';
  try {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return ts; }
}

/**
 * Generate the Dashboard tab content.
 */
function genDashboard(data) {
  const { team, agents, decisions, logs, skills, sessions, subSquads } = data;
  const pendingDecisions = decisions.inbox.length;
  const activeDecisions = (decisions.main.match(/^### D-/gm) || []).length;
  const hasSubSquads = subSquads && subSquads.length > 0;

  return `
    <h2>📊 Dashboard</h2>
    <div class="grid">
      <article>
        <header>👥 Squad</header>
        <p><strong>${esc(team.name)}</strong></p>
        <p>${team.members.length} members</p>
      </article>
      <article>
        <header>📋 Decisions</header>
        <p><strong>${activeDecisions}</strong> active</p>
        <p>${pendingDecisions > 0 ? `<mark>${pendingDecisions} pending review</mark>` : '0 pending'}</p>
      </article>
      <article>
        <header>🤖 Agents</header>
        <p><strong>${agents.length}</strong> registered</p>
        <p>${agents.filter(a => a.history).length} with history</p>
      </article>
      <article>
        <header>📝 Logs</header>
        <p><strong>${logs.length}</strong> entries</p>
        <p>${logs.filter(l => l.type === 'orchestration').length} orchestration</p>
      </article>
    </div>
    <div class="grid">
      <article>
        <header>🧠 Skills</header>
        <p><strong>${skills.length}</strong> installed</p>
      </article>
      <article>
        <header>💬 Sessions</header>
        <p><strong>${sessions.sessions.length}</strong> recorded</p>
        <p>${sessions.available ? '✅ Session store connected' : '⚠️ Session store unavailable'}</p>
      </article>${hasSubSquads ? `
      <article>
        <header>🏢 Sub-Squads</header>
        <p><strong>${subSquads.length}</strong> workstreams</p>
        <p>${subSquads.reduce(function(sum, s) { return sum + s.agents.length; }, 0)} total agents</p>
      </article>` : ''}
    </div>

    ${pendingDecisions > 0 ? `
    <h3>⏳ Pending Decisions</h3>
    ${decisions.inbox.map(d => `
      <details>
        <summary><strong>${esc(d.filename)}</strong></summary>
        <div class="md-content">${md(d.content)}</div>
      </details>
    `).join('')}
    ` : ''}

    <h3>📜 Recent Activity</h3>
    ${logs.slice(0, 5).map(l => `
      <article>
        <header>${l.type === 'orchestration' ? '⚙️' : '📝'} ${esc(l.filename)}</header>
        <p>${esc(truncate(l.content.split('\n').filter(line => line.trim() && !line.startsWith('#'))[0]))}</p>
      </article>
    `).join('') || '<p>No recent activity.</p>'}
  `;
}

/**
 * Generate the Decisions tab content.
 */
function genDecisions(data) {
  const { decisions } = data;

  return `
    <h2>📋 Decisions</h2>
    ${decisions.inbox.length > 0 ? `
      <h3>⏳ Pending Review (${decisions.inbox.length})</h3>
      ${decisions.inbox.map(d => `
        <details>
          <summary><mark>${esc(d.filename)}</mark></summary>
          <div class="md-content">${md(d.content)}</div>
        </details>
      `).join('')}
      <hr>
    ` : ''}
    <h3>Active Decisions</h3>
    <div class="md-content">${md(decisions.main)}</div>
  `;
}

/**
 * Generate the Agents tab content.
 */
function genAgents(data) {
  const { agents } = data;

  return `
    <h2>🤖 Agents</h2>
    <div class="grid">
      ${agents.map(a => {
        const slug = a.name.toLowerCase().replace(/\s+/g, '-');
        return `
        <article class="agent-card" data-agent="${slug}">
          <header>${esc(a.name)}</header>
          <p><small>${esc(a.role)}</small></p>
        </article>
      `;
      }).join('')}
    </div>
  `;
}

/**
 * Generate agent detail sections (one per agent).
 * These are hidden by default and shown when an agent card is clicked.
 */
function genAgentDetails(data) {
  const { agents } = data;

  return agents.map(a => {
    const slug = a.name.toLowerCase().replace(/\s+/g, '-');
    return `
    <section id="agent-detail-${slug}" class="agent-detail">
      <a href="#" class="back-link">← Back to Agents</a>
      <hgroup>
        <h2>${esc(a.name)}</h2>
        <p>${esc(a.role)}</p>
      </hgroup>
      <div class="md-content">${md(a.charter)}</div>
      ${a.history ? `
        <hr>
        <h3>📚 History</h3>
        <div class="md-content">${md(a.history)}</div>
      ` : ''}
    </section>`;
  }).join('\n');
}

/**
 * Generate the Conversations tab content.
 */
function genConversations(data) {
  const { sessions } = data;

  if (!sessions.available) {
    return `
      <h2>💬 Conversations</h2>
      <article>
        <p>⚠️ Session store not found. This tab shows conversation history from Copilot CLI sessions.</p>
        <p>Expected at: <code>~/.copilot/session-store/store.db</code></p>
      </article>
    `;
  }

  return `
    <h2>💬 Conversations</h2>
    <p>${sessions.sessions.length} sessions recorded</p>
    ${sessions.sessions.map(s => {
      const details = sessions.sessionDetails[s.id];
      const turnCount = details ? details.turns.length : '?';
      return `
        <details>
          <summary>
            <strong>${esc(s.branch || 'main')}</strong> — ${esc(truncate(s.summary, 100))}
            <small>(${formatDate(s.created_at)}, ${turnCount} turns)</small>
          </summary>
          ${details ? `
            ${details.checkpoints.length > 0 ? `
              <h4>Checkpoints</h4>
              ${details.checkpoints.map(c => `
                <p><strong>${esc(c.title)}</strong>: ${esc(truncate(c.overview, 300))}</p>
              `).join('')}
            ` : ''}
            <h4>Conversation</h4>
            ${details.turns.map(t => `
              <div class="turn">
                <p><strong>👤 User:</strong> ${esc(truncate(t.user_message, 500))}</p>
                <p><strong>🤖 Assistant:</strong> ${esc(truncate(t.assistant_response, 500))}</p>
              </div>
              <hr>
            `).join('')}
          ` : '<p>Details not loaded for this session.</p>'}
        </details>
      `;
    }).join('')}
  `;
}

/**
 * Generate the Orchestration tab content.
 */
function genOrchestration(data) {
  const { logs } = data;
  const orchLogs = logs.filter(l => l.type === 'orchestration');
  const sessionLogs = logs.filter(l => l.type === 'session');

  return `
    <h2>⚙️ Orchestration</h2>

    <h3>Orchestration Logs (${orchLogs.length})</h3>
    ${orchLogs.map(l => `
      <details>
        <summary>${esc(l.filename)}</summary>
        <div class="md-content">${md(l.content)}</div>
      </details>
    `).join('') || '<p>No orchestration logs found.</p>'}

    <h3>Session Logs (${sessionLogs.length})</h3>
    ${sessionLogs.map(l => `
      <details>
        <summary>${esc(l.filename)}</summary>
        <div class="md-content">${md(l.content)}</div>
      </details>
    `).join('') || '<p>No session logs found.</p>'}
  `;
}

/**
 * Generate the Search functionality (client-side).
 */
function genSearch() {
  return `
    <h2>🔍 Search</h2>
    <input type="search" id="search-input" placeholder="Search across all content..." oninput="doSearch(this.value)">
    <div id="search-results"></div>
  `;
}

/**
 * Generate the Sub-Squads tab content.
 * Only rendered when sub-squads exist.
 */
function genSubSquads(data) {
  const { subSquads } = data;
  if (!subSquads || subSquads.length === 0) return '';

  return `
    <h2>🏢 Sub-Squads</h2>
    <p>${subSquads.length} workstream${subSquads.length !== 1 ? 's' : ''} detected</p>
    ${subSquads.map(function(sq) {
      const activeDecisions = (sq.decisions.main.match(/^### D-/gm) || []).length;
      const pendingDecisions = sq.decisions.inbox.length;
      return `
      <details>
        <summary>
          <strong>${esc(sq.id)}</strong>
          — ${esc(sq.team.name)}
          <small>(${sq.agents.length} agents, ${activeDecisions} decisions)</small>
        </summary>
        <div style="padding-left: 1rem;">
          <h4>Team Roster</h4>
          ${sq.team.members.length > 0 ? `
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              ${sq.team.members.map(function(m) {
                return '<tr><td>' + esc(m.name) + '</td><td>' + esc(m.role) + '</td><td>' + esc(m.status) + '</td></tr>';
              }).join('')}
            </tbody>
          </table>` : '<p>No team members listed.</p>'}

          <h4>Agents (${sq.agents.length})</h4>
          ${sq.agents.length > 0 ? `
          <div class="grid">
            ${sq.agents.map(function(a) {
              return '<article><header>' + esc(a.name) + '</header><p><small>' + esc(a.role) + '</small></p></article>';
            }).join('')}
          </div>` : '<p>No agents registered.</p>'}

          <h4>Decisions</h4>
          <p><strong>${activeDecisions}</strong> active${pendingDecisions > 0 ? ', <mark>' + pendingDecisions + ' pending review</mark>' : ''}</p>
          ${sq.decisions.main ? `
          <details>
            <summary>View decisions</summary>
            <div class="md-content">${md(sq.decisions.main)}</div>
          </details>` : ''}
        </div>
      </details>`;
    }).join('')}
  `;
}

/**
 * Generate the full HTML page.
 */
export function generateHtml(data, options = {}) {
  const liveMode = options.liveMode || false;
  const hasSubSquads = data.subSquads && data.subSquads.length > 0;
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', content: genDashboard(data) },
    { id: 'decisions', label: '📋 Decisions', content: genDecisions(data) },
    { id: 'agents', label: '🤖 Agents', content: genAgents(data) },
    { id: 'conversations', label: '💬 Conversations', content: genConversations(data) },
    { id: 'orchestration', label: '⚙️ Orchestration', content: genOrchestration(data) },
  ];

  if (hasSubSquads) {
    tabs.push({ id: 'sub-squads', label: '🏢 Sub-Squads', content: genSubSquads(data) });
  }

  tabs.push({ id: 'search', label: '🔍 Search', content: genSearch() });

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(data.team.name)} — Squad Monitor</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <style>
    :root { --pico-font-size: 15px; }
    nav { position: sticky; top: 0; z-index: 100; background: var(--pico-background-color); }
    nav ul { display: flex; flex-wrap: wrap; gap: 0; padding: 0; margin: 0; list-style: none; }
    nav ul li a {
      display: block; padding: 0.5rem 1rem; text-decoration: none;
      border-bottom: 3px solid transparent; cursor: pointer;
      color: var(--pico-color); font-size: 0.9rem;
    }
    nav ul li a.active { border-bottom-color: var(--pico-primary); font-weight: bold; }
    nav ul li a:hover { border-bottom-color: var(--pico-primary-hover); }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
    .grid article { margin: 0; }
    .agent-card { cursor: pointer; }
    .agent-card:hover { border-color: var(--pico-primary); }
    .agent-detail { display: none; }
    .agent-detail.active { display: block; }
    .back-link { display: inline-block; margin-bottom: 1rem; text-decoration: none; color: var(--pico-primary); cursor: pointer; }
    .back-link:hover { text-decoration: underline; }
    .turn { padding: 0.5rem 0; }
    .md-content { max-height: 600px; overflow-y: auto; }
    details summary { cursor: pointer; }
    mark { padding: 0.1em 0.3em; border-radius: 3px; }
    .search-hit { border-left: 3px solid var(--pico-primary); padding-left: 1rem; margin: 1rem 0; }
    .search-hit mark { background: var(--pico-primary-focus); }
    .build-info { font-size: 0.75rem; color: var(--pico-muted-color); text-align: center; padding: 1rem; }${liveMode ? `
    .live-badge { display: inline-block; background: #c62828; color: #fff; font-size: 0.7rem; padding: 0.15em 0.5em; border-radius: 4px; margin-left: 0.5rem; vertical-align: middle; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .refresh-btn { background: none; border: none; cursor: pointer; font-size: 1.2rem; padding: 0.2rem 0.5rem; vertical-align: middle; }
    .refresh-btn:hover { opacity: 0.7; }
    .toast { position: fixed; top: 1rem; right: 1rem; background: var(--pico-primary); color: #fff; padding: 0.5rem 1rem; border-radius: 6px; z-index: 9999; font-size: 0.85rem; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
    .toast.show { opacity: 1; }` : ''}
  </style>
</head>
<body>
  <main class="container">
    <hgroup>
      <h1>${esc(data.team.name)}${liveMode ? '<span class="live-badge">LIVE</span><button class="refresh-btn" onclick="location.reload()" title="Refresh now">🔄</button>' : ''}</h1>
      <p>Squad Monitor — Thoughts, Conversations, and Decisions</p>
    </hgroup>${liveMode ? '\n    <div id="live-toast" class="toast">🔄 Refreshing...</div>' : ''}

    <nav>
      <ul>
        ${tabs.map((t, i) => `<li><a href="#" data-tab="${t.id}" class="${i === 0 ? 'active' : ''}">${t.label}</a></li>`).join('\n        ')}
      </ul>
    </nav>

    ${tabs.map((t, i) => `
    <section id="tab-${t.id}" class="tab-content ${i === 0 ? 'active' : ''}">
      ${t.content}
    </section>`).join('\n')}

    ${genAgentDetails(data)}

    <div class="build-info">
      Generated ${new Date().toISOString()} · Squad Monitor v1.0.0
    </div>
  </main>

  ${getInlineScript(liveMode)}
</body>
</html>`;
}

function getInlineScript(liveMode) {
  const lines = [
    '<script>',
    '// Tab switching',
    'document.querySelectorAll("nav a[data-tab]").forEach(link => {',
    '  link.addEventListener("click", e => {',
    '    e.preventDefault();',
    '    const tabId = link.dataset.tab;',
    '    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));',
    '    document.querySelectorAll("nav a").forEach(el => el.classList.remove("active"));',
    '    document.querySelectorAll(".agent-detail").forEach(el => el.classList.remove("active"));',
    '    document.getElementById("tab-" + tabId).classList.add("active");',
    '    link.classList.add("active");',
    '    window.location.hash = "";',
    '  });',
    '});',
    '',
    '// Agent card navigation',
    'document.querySelectorAll(".agent-card").forEach(card => {',
    '  card.addEventListener("click", function() {',
    '    const agentSlug = card.dataset.agent;',
    '    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));',
    '    document.querySelectorAll(".agent-detail").forEach(el => el.classList.remove("active"));',
    '    const detailSection = document.getElementById("agent-detail-" + agentSlug);',
    '    if (detailSection) {',
    '      detailSection.classList.add("active");',
    '      window.location.hash = "agent/" + agentSlug;',
    '    }',
    '  });',
    '});',
    '',
    '// Back to agents link',
    'document.querySelectorAll(".back-link").forEach(link => {',
    '  link.addEventListener("click", function(e) {',
    '    e.preventDefault();',
    '    document.querySelectorAll(".agent-detail").forEach(el => el.classList.remove("active"));',
    '    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));',
    '    document.getElementById("tab-agents").classList.add("active");',
    '    document.querySelectorAll("nav a").forEach(el => el.classList.remove("active"));',
    '    document.querySelector("nav a[data-tab=\'agents\']").classList.add("active");',
    '    window.location.hash = "";',
    '  });',
    '});',
    '',
    '// Handle initial page load with hash',
    'function handleInitialHash() {',
    '  const hash = window.location.hash.slice(1);',
    '  if (hash.startsWith("agent/")) {',
    '    const agentSlug = hash.replace("agent/", "");',
    '    const detailSection = document.getElementById("agent-detail-" + agentSlug);',
    '    if (detailSection) {',
    '      document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));',
    '      document.querySelectorAll(".agent-detail").forEach(el => el.classList.remove("active"));',
    '      detailSection.classList.add("active");',
    '    }',
    '  }',
    '}',
    'handleInitialHash();',
    '',
    '// Client-side search',
    'function doSearch(query) {',
    '  const results = document.getElementById("search-results");',
    '  if (!query || query.length < 2) { results.innerHTML = ""; return; }',
    '  const q = query.toLowerCase();',
    '  const hits = [];',
    '  document.querySelectorAll(".tab-content").forEach(tab => {',
    '    const tabName = tab.id.replace("tab-", "");',
    '    if (tabName === "search") return;',
    '    tab.querySelectorAll("details").forEach(detail => {',
    '      const text = detail.textContent;',
    '      if (text.toLowerCase().includes(q)) {',
    '        const summary = detail.querySelector("summary")?.textContent || "Untitled";',
    '        hits.push({ tab: tabName, title: summary.trim(), snippet: extractSnippet(text, q) });',
    '      }',
    '    });',
    '    tab.querySelectorAll("article").forEach(article => {',
    '      const text = article.textContent;',
    '      if (text.toLowerCase().includes(q)) {',
    '        const header = article.querySelector("header")?.textContent || "Untitled";',
    '        hits.push({ tab: tabName, title: header.trim(), snippet: extractSnippet(text, q) });',
    '      }',
    '    });',
    '  });',
    '  if (hits.length === 0) { results.innerHTML = "<p>No results found.</p>"; return; }',
    '  results.innerHTML = hits.slice(0, 20).map(h =>',
    '    \'<div class="search-hit"><p><strong>\' + escHtml(h.tab) + \'</strong> \\u2192 \' + escHtml(h.title) + \'</p>\' +',
    '    \'<p><small>\' + highlightMatch(h.snippet, q) + \'</small></p></div>\'',
    '  ).join("");',
    '}',
    '',
    'function extractSnippet(text, query) {',
    '  const idx = text.toLowerCase().indexOf(query);',
    '  const start = Math.max(0, idx - 80);',
    '  const end = Math.min(text.length, idx + query.length + 80);',
    '  return (start > 0 ? "\\u2026" : "") + text.slice(start, end).trim() + (end < text.length ? "\\u2026" : "");',
    '}',
    '',
    'function highlightMatch(text, query) {',
    '  const regex = new RegExp("(" + escRegex(query) + ")", "gi");',
    '  return escHtml(text).replace(regex, "<mark>$1</mark>");',
    '}',
    '',
    'function escHtml(str) {',
    '  const div = document.createElement("div");',
    '  div.textContent = str;',
    '  return div.innerHTML;',
    '}',
    '',
    'function escRegex(str) {',
    '  return str.replace(/[\\-\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\]/g, "\\\\$&");',
    '}',
  ];

  if (liveMode) {
    lines.push(
      '',
      '// Auto-refresh: poll /api/timestamp every 10s',
      'var __lastTimestamp = null;',
      'function checkForUpdates() {',
      '  fetch("/api/timestamp").then(function(r) { return r.json(); }).then(function(data) {',
      '    if (__lastTimestamp === null) {',
      '      __lastTimestamp = data.timestamp;',
      '      return;',
      '    }',
      '    if (data.timestamp !== __lastTimestamp) {',
      '      var toast = document.getElementById("live-toast");',
      '      if (toast) { toast.classList.add("show"); }',
      '      setTimeout(function() { location.reload(); }, 800);',
      '    }',
      '  }).catch(function() { /* server unreachable, skip */ });',
      '}',
      'setInterval(checkForUpdates, 10000);',
      'checkForUpdates();',
    );
  }

  lines.push('</script>');
  return lines.join('\n    ');
}

/**
 * Generate the hub landing page for multi-squad mode.
 * Shows a grid of squad cards with name, description, agent count, decision count.
 */
export function generateHubHtml(config, squadsData, options = {}) {
  const liveMode = options.liveMode || false;

  const cards = config.squads.map(function(sq) {
    const data = squadsData[sq.id];
    const agentCount = data ? data.agents.length : 0;
    const decisionCount = data ? (data.decisions.main.match(/^### D-/gm) || []).length : 0;
    const subSquadCount = data && data.subSquads ? data.subSquads.length : 0;
    const linkBase = liveMode ? '/squads/' + sq.id : './squads/' + sq.id + '/index.html';

    return [
      '<article class="squad-card" onclick="window.location.href=\'' + linkBase + '\'">',
      '  <header>' + esc(sq.name) + '</header>',
      sq.description ? '  <p>' + esc(sq.description) + '</p>' : '',
      '  <p><strong>' + agentCount + '</strong> agents · <strong>' + decisionCount + '</strong> decisions' + (subSquadCount > 0 ? ' · <strong>' + subSquadCount + '</strong> sub-squads' : '') + '</p>',
      '</article>'
    ].filter(Boolean).join('\n        ');
  });

  return [
    '<!DOCTYPE html>',
    '<html lang="en" data-theme="dark">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>Squad Monitor — Hub</title>',
    '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">',
    '  <style>',
    '    :root { --pico-font-size: 15px; }',
    '    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }',
    '    .grid article { margin: 0; }',
    '    .squad-card { cursor: pointer; transition: border-color 0.2s; }',
    '    .squad-card:hover { border-color: var(--pico-primary); }',
    '    .build-info { font-size: 0.75rem; color: var(--pico-muted-color); text-align: center; padding: 1rem; }',
    liveMode ? '    .live-badge { display: inline-block; background: #c62828; color: #fff; font-size: 0.7rem; padding: 0.15em 0.5em; border-radius: 4px; margin-left: 0.5rem; vertical-align: middle; animation: pulse 2s infinite; }' : '',
    liveMode ? '    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }' : '',
    liveMode ? '    .refresh-btn { background: none; border: none; cursor: pointer; font-size: 1.2rem; padding: 0.2rem 0.5rem; vertical-align: middle; }' : '',
    liveMode ? '    .refresh-btn:hover { opacity: 0.7; }' : '',
    liveMode ? '    .toast { position: fixed; top: 1rem; right: 1rem; background: var(--pico-primary); color: #fff; padding: 0.5rem 1rem; border-radius: 6px; z-index: 9999; font-size: 0.85rem; opacity: 0; transition: opacity 0.3s; pointer-events: none; }' : '',
    liveMode ? '    .toast.show { opacity: 1; }' : '',
    '  </style>',
    '</head>',
    '<body>',
    '  <main class="container">',
    '    <hgroup>',
    '      <h1>🏠 Squad Monitor Hub' + (liveMode ? '<span class="live-badge">LIVE</span><button class="refresh-btn" onclick="location.reload()" title="Refresh now">🔄</button>' : '') + '</h1>',
    '      <p>' + config.squads.length + ' squad' + (config.squads.length !== 1 ? 's' : '') + ' configured</p>',
    '    </hgroup>',
    liveMode ? '    <div id="live-toast" class="toast">🔄 Refreshing...</div>' : '',
    '',
    '    <div class="grid">',
    '      ' + cards.join('\n      '),
    '    </div>',
    '',
    '    <div class="build-info">',
    '      Generated ' + new Date().toISOString() + ' · Squad Monitor Hub v1.0.0',
    '    </div>',
    '  </main>',
    '',
    getHubInlineScript(liveMode),
    '</body>',
    '</html>'
  ].filter(Boolean).join('\n');
}

/**
 * Hub inline script — uses string-array-join pattern to avoid template literal conflicts.
 */
function getHubInlineScript(liveMode) {
  const lines = [
    '<script>',
    '// Hub page — minimal interactivity',
  ];

  if (liveMode) {
    lines.push(
      '',
      '// Auto-refresh: poll /api/timestamp every 10s',
      'var __lastTimestamp = null;',
      'function checkForUpdates() {',
      '  fetch("/api/timestamp").then(function(r) { return r.json(); }).then(function(data) {',
      '    if (__lastTimestamp === null) {',
      '      __lastTimestamp = data.timestamp;',
      '      return;',
      '    }',
      '    if (data.timestamp !== __lastTimestamp) {',
      '      var toast = document.getElementById("live-toast");',
      '      if (toast) { toast.classList.add("show"); }',
      '      setTimeout(function() { location.reload(); }, 800);',
      '    }',
      '  }).catch(function() { /* server unreachable, skip */ });',
      '}',
      'setInterval(checkForUpdates, 10000);',
      'checkForUpdates();',
    );
  }

  lines.push('</script>');
  return lines.join('\n    ');
}
