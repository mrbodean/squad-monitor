# Agency Copilot — Optimal Configuration Reference

> **Agency version:** 2026.3.14.2

## TL;DR

For squad agents, the recommended command line is:
```
agency copilot --yolo --autopilot --agent squad --mcp mail --mcp calendar -p $prompt --resume=$sessionId
```

## How MCPs Load (3 sources, merged at startup)

| Source | What loads |
|--------|-----------|
| **Defaults** | `bluebird`, `workiq` — always on |
| **mcp-config.json** | `~/.copilot/mcp-config.json` entries — auto-loaded |
| **`--mcp` flag** | Agency built-in MCPs added per-session |

## Available Built-in MCPs

| Name | Description | Recommended? |
|------|-------------|--------------|
| `ado` | Azure DevOps | ✅ Use npx version in config |
| `bluebird` | Engineering Copilot Mini | ✅ Default — always on |
| `workiq` | WorkIQ (M365 Copilot) | ✅ Default — always on |
| `teams` | Microsoft Teams | ✅ In mcp-config.json |
| `mail` | Microsoft Mail | ⚠️ Add via --mcp |
| `calendar` | Microsoft Calendar | ⚠️ Add via --mcp |
| `enghub` | EngineeringHub | ✅ In mcp-config.json |
| `kusto` | Azure Kusto | 🔵 Optional (needs cluster URL) |
| `icm` | ICM incidents | 🔵 Optional |

## Key Flags

| Flag | Purpose |
|------|---------|
| `--yolo` | Allow all tools/paths/URLs without prompts |
| `--autopilot` | Continue automatically in prompt mode |
| `--agent <name>` | Load a named agent |
| `-p <prompt>` | Non-interactive prompt |
| `--resume=<id>` | Resume session with specific ID |
| `--mcp <name>` | Add a built-in MCP server |
| `--no-default-mcps` | Skip default MCPs (don't use) |

## Troubleshooting

- **"MCP server failed to start"** — Check if `agency mcp <name>` works standalone
- **Duplicate MCP servers** — Don't use `--mcp` for services already in mcp-config.json
- **Check loaded MCPs** — Session log in `~/.agency/logs/session_*/` lists all MCPs at startup
