# Squad Monitor

A browser dashboard for visualizing squad activity, decisions, and agent interactions from the Copilot CLI session store and `.squad/` directory. Choose static mode for zero cost or live mode for auto-refresh.

## Getting Started

### Install and Build

```bash
npm install
npm run build
```

### View the Dashboard

**Windows:**
```bash
npm run view
```

**macOS / Linux:**
```bash
open dist/index.html
```

The `dist/index.html` is a complete, self-contained dashboard. No server, no runtime cost.

## Static Mode (Zero Cost)

**Perfect for:** Sharing reports, archiving decisions, offline browsing.

```bash
npm run build      # Generates dist/index.html
start dist/index.html   # Windows
open dist/index.html    # macOS/Linux
```

The output is a single HTML file with all data embedded. To refresh, re-run `npm run build` and reload the browser.

## Live Mode (Auto-Refresh)

**Perfect for:** Development and real-time monitoring.

```bash
npm run dev
```

- Starts Express server at `http://localhost:3000`
- Dashboard auto-refreshes every 10 seconds when `.squad/` files change
- Shows toast notification before reloading
- Includes manual 🔄 refresh button in the header
- Server uses ~20MB RAM while running

**Stop the server:** Press `Ctrl+C`

**Arguments:**
```bash
npm run dev -- --port 8080 --squad-root ./my-squad --db ~/.copilot/session-store.db
```

## Dashboard Tabs

1. **📊 Dashboard** — Overview stats (agent count, decisions, sessions, pending items), recent activity feed
2. **📋 Decisions** — Full decisions.md rendered, pending inbox items with badges
3. **🤖 Agents** — Clickable agent cards → expand to view full charter and history
4. **💬 Conversations** — Session list from Copilot → expandable turns and checkpoints
5. **⚙️ Orchestration** — Timeline of orchestration logs and session logs
6. **🔍 Search** — Client-side full-text search across all rendered content

## Architecture

| File | Purpose |
|------|---------|
| `src/data-reader.js` | Reads `.squad/` markdown files |
| `src/session-reader.js` | Reads Copilot session-store.db (sql.js WASM) |
| `src/html-generator.js` | Generates HTML with Pico.css dark theme |
| `scripts/build.js` | Static build: `.squad/` + DB → dist/index.html |
| `scripts/serve.js` | Live server: Express + auto-refresh |

## Data Sources

- `.squad/decisions.md` + `.squad/decisions/inbox/*.md` — Decisions
- `.squad/agents/*/charter.md` + `history.md` — Agent identities and learnings
- `.squad/team.md` — Squad roster
- `.squad/orchestration-log/*.md` — Orchestration history
- `.squad/log/*.md` — Session logs
- `.squad/skills/*/SKILL.md` — Knowledge library
- `.squad/ceremonies.md` — Ceremony definitions
- `~/.copilot/session-store.db` (optional) — Copilot CLI conversation history

## Requirements

- Node.js 18+
- A `.squad/` directory (Squad framework)
- `~/.copilot/session-store.db` (optional) — Conversations tab degrades gracefully without it

## Design Principles

- **Zero runtime cost** in static mode
- **Graceful degradation** — works without session store
- **Dark theme** — built with [Pico.css](https://picocss.com)
- **Single-file output** — easy sharing and archival
- **Smart polling** — live mode only reloads when data changes

## License

MIT
