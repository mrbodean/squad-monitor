---
name: teams-ui-automation
description: Hybrid Teams automation using Playwright MCP (primary), keyboard shortcuts (secondary), and UIA window management (tertiary).
triggers: ["teams ui", "install teams app", "add teams tab", "teams connector", "teams desktop"]
confidence: medium
---

# Teams UI Automation Skill (Hybrid Approach)

## Overview

A **hybrid three-layer automation skill** for Microsoft Teams operations not available via Graph API.

### Architecture: Three Layers

**Layer 1 (Primary): Playwright MCP on teams.microsoft.com**
- Full DOM access with self-healing selectors (data-tid, aria-label, CSS, text)
- Web version has identical features to desktop
- Most reliable for complex operations

**Layer 2 (Secondary): Keyboard Shortcuts via PowerShell**
- Quick navigation using documented Teams shortcuts
- Good for simple navigation when Playwright overhead is unnecessary

**Layer 3 (Tertiary): UIA for Window Management**
- Process detection and window handle retrieval
- NOT used for in-app element discovery (WebView blocks UIA)

## When to Use

✅ Installing Teams apps, adding tabs, configuring connectors, UI-based operations
❌ Sending/reading messages (use Teams MCP), creating teams/channels (use Graph API)

## Layer 1: Playwright MCP Recipes

### Selector Priority Order
1. `data-tid` attributes (most stable)
2. `aria-label` attributes (accessibility)
3. CSS structural selectors
4. Text content matching (least stable)

### Recipe: Install App to a Team
1. Navigate to Apps: `[data-tid="app-bar-apps"]`
2. Search for app in search box
3. Click app card from results
4. Click "Add to a team"
5. Select team from dropdown
6. Confirm installation

### Recipe: Add Tab to a Channel
1. Navigate to team and channel
2. Click "+" button: `[data-tid="add-tab-button"]`
3. Search for tab type
4. Configure tab settings
5. Save

### Self-Healing Strategy
When a selector fails: try next fallback → snapshot page → update selector → cache success

## Layer 2: Keyboard Shortcuts

```powershell
# Navigation shortcuts
Open-TeamsApps     # Ctrl+Shift+6
Open-TeamsChat     # Ctrl+2
Open-TeamsTeams    # Ctrl+3
Open-TeamsCalendar # Ctrl+4
Open-TeamsSearch   # Ctrl+E
```

## Layer 3: UIA Window Management

```powershell
Test-TeamsRunning      # Check if Teams is running
Get-TeamsWindow        # Find Teams window handle
Focus-TeamsWindow      # Bring Teams to foreground
Get-TeamsVersion       # Get Teams version
```

## Best Practices

1. Prefer Playwright for complex operations
2. Use keyboard shortcuts for quick navigation
3. Always verify state with snapshots before interacting
4. Use fallback selector chains
5. Cache successful selectors
