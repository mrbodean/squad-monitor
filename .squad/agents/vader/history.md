# Vader — History

> Agent-specific learnings and corrections. Persists across sessions.

## Learnings

### Output directory renamed: `dist` → `.squad-monitor`
- **Date:** 2025-07-21
- **Requested by:** Jonathan Warnken
- **What:** Build output directory renamed from `dist/` to `.squad-monitor/` across the entire codebase.
- **Files changed:**
  - `scripts/build.js` — default output path + console messages
  - `package.json` — `view` script path
  - `README.md` — all documentation references (4 locations)
  - `.gitignore` — ignore pattern
  - `JOURNAL.md` — output path reference
- **Files NOT changed (no references):** `scripts/serve.js`, `bin/squad-monitor.js`, `src/html-generator.js`
- **Files intentionally left (historical records):** `.squad/decisions.md` (D-006, D-008, D-009 describe past decisions accurately)
- **Why:** `.squad-monitor` is more descriptive than generic `dist` and signals this is squad tooling output, not a generic build artifact.

### Added `--host` flag for LAN/kiosk access (DAKboard)
- **Date:** 2025-07-22
- **Requested by:** Jonathan Warnken
- **What:** Added `--host <address>` option to the dev server so it can bind to network interfaces beyond localhost. Needed for DAKboard / kiosk wall displays on the LAN.
- **Files changed:**
  - `scripts/serve.js` — `serve()` accepts `host` param, passes to `app.listen(port, host, cb)`. When `0.0.0.0`, logs "all interfaces — accessible from LAN". Default remains `localhost` (safe).
  - `bin/squad-monitor.js` — `--host` parsing in help text, arg parsing, and passed to `serve()` call.
  - `README.md` — Added `--host` to Common options and Live Mode arguments with DAKboard/kiosk use case mention.
- **Why:** Squad Monitor dashboard needs to be viewable from other devices on the LAN (e.g., a DAKboard or Raspberry Pi kiosk). Binding to `0.0.0.0` enables this. Default stays `localhost` for safety.
