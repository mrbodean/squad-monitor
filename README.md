# Squad-Monitor

A lightweight static site generator that visualizes squad activity, decisions, and agent interactions from the Copilot CLI session store and `.squad/` directory.

## What It Does

Generates a single-page HTML dashboard with offline browsing and client-side search across:
- **Dashboard** — Squad overview and recent activity
- **Decisions** — Decision log with context and rationale
- **Agents** — Agent charters and team structure
- **Conversations** — Session history and turn-by-turn interactions
- **Orchestration** — Agent skills and ceremony logs
- **Search** — Full-text search across all data

## Quick Start

```bash
npm install
npm run build
start dist/index.html   # Windows
open dist/index.html    # macOS/Linux
```

The generated `index.html` is a complete, self-contained dashboard. No server needed.

## Architecture

| Module | Purpose |
|--------|---------|
| `src/data-reader.js` | Reads `.squad/` markdown files |
| `src/session-reader.js` | Parses Copilot session-store.db (SQLite via sql.js WASM) |
| `src/html-generator.js` | Renders HTML with Pico.css dark theme |
| `scripts/build.js` | Orchestrates the build pipeline |

## Design

- **Zero runtime cost** — No server process; works offline
- **Graceful degradation** — Shows `.squad/` data even without session store
- **Single file output** — One HTML file for easy sharing and archival
- **Dark theme by default** — Built with [Pico.css](https://picocss.com)

## Requirements

- Node.js 18+
- `.squad/` directory in your project (squad framework)
- `~/.copilot/session-store.db` (optional, for session history)

## License

MIT
