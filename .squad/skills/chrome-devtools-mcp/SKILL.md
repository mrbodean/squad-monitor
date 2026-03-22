# Chrome DevTools MCP Skill

## Overview

Chrome DevTools MCP allows AI agents to connect directly to Chrome DevTools for remote debugging, inspecting live browser sessions, and accessing DevTools capabilities programmatically.

**Repository:** [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)

## Capabilities

1. **Live Browser Session Debugging** — Connect to active Chrome instances, access DevTools data
2. **Automated Web Debugging** — Inspect DOM, analyze network, capture performance, read console
3. **Hybrid Manual + AI Debugging** — Developer inspects in DevTools, AI investigates via MCP

## Installation

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest", "--autoConnect"]
    }
  }
}
```

**Requires:** Node.js, Chrome 144+ for auto-connect

## Why Use This

- **Complements Playwright** — Playwright automates, Chrome DevTools debugs
- **Low setup cost** — Single npm command, no plugins needed
- **Reduces context-switching** — "I was debugging this, now let AI investigate"

## Use Cases

### Debugging Failed Tests
```
Playwright test fails → Open Chrome DevTools MCP
→ "Inspect DOM at selector #widget-container"
→ MCP returns actual structure → AI suggests fix
```

### Network Request Debugging
```
Unexpected API calls → "What requests failed with 401?"
→ MCP returns failed requests with headers → Identify auth issue
```

### Performance Analysis
```
Slow page → "Get performance metrics"
→ MCP returns FCP, LCP, CLS → Identify bottleneck
```

## Limitations

- Chrome 144+ required for auto-connect
- Chrome-only (no Firefox/Safari/Edge)
- Only Elements and Network panels currently exposed
- Requires user consent for each debugging session
- Not suitable for fully headless/unattended workflows
