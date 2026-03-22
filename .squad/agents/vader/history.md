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
