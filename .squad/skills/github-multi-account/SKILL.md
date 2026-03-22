---
name: github-multi-account
description: Transparent gh proxy that auto-routes commands to the correct GitHub account based on repo context. Uses GH_CONFIG_DIR isolation.
confidence: medium
---

# GitHub Multi-Account Proxy

## Problem

When you have two GitHub accounts (work + personal), every `gh` command risks running against the wrong identity.

## Solution

A transparent `gh` PowerShell function that intercepts every `gh` call, detects which account to use from the git remote URL, sets `GH_CONFIG_DIR`, and delegates to `gh.exe`.

```
User types: gh pr list
    │
    ├─ GH_CONFIG_DIR already set? ──YES──► delegate to gh.exe
    │
    └─ NO → detect from git remote URL
         ├─ Remote matches "work_org" → GH_CONFIG_DIR = ~/.config/gh-emu
         ├─ Remote matches "personal/" → GH_CONFIG_DIR = ~/.config/gh-public
         └─ No match → GH_CONFIG_DIR = ~/.config/gh-emu (default = work)
```

## Setup

```powershell
# One-time setup:
.\setup.ps1

# Or manually: dot-source the proxy in your $PROFILE
. "path\to\gh-proxy.ps1"
git config --global credential.helper '!gh auth git-credential'
```

## Token Health Monitor

```powershell
Test-GhTokenHealth           # Check all profiles
Test-GhTokenHealth -Profile emu  # Check specific profile
Repair-GhToken -Profile public   # Repair expired token
```

## Backward Compatibility

- Explicit `ghe`/`ghp` wrappers continue to work
- Agents can gradually switch from explicit wrappers to bare `gh`

## For Squad Agents

Use bare `gh` freely in-repo — the proxy auto-detects the correct account. Use explicit `ghe`/`ghp` only when outside a git repo.
