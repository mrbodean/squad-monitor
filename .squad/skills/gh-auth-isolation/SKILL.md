---
name: gh-auth-isolation
description: Prevent multiple Squad instances from fighting over global gh auth state when running across repos with different GitHub accounts.
---

# GitHub Auth Isolation for Multi-Repo Squad

## Problem

When multiple processes run across repos with different GitHub accounts, they fight over the global `gh auth switch` state. Each process switches to its required account, causing the others to fail.

## Root Cause

`gh auth switch --user X` mutates GLOBAL state. All processes on the machine share this state. When process A switches to account X and process B switches to account Y, process A's next API call uses account Y.

## Solution: Per-Process GH_TOKEN

Extract the token for the required account and set it as a process-local environment variable:

```powershell
$remoteUrl = git remote get-url origin
$requiredAccount = if ($remoteUrl -match "work_org") { "work_account" } else { "personal_account" }

$token = gh auth token --user $requiredAccount
$env:GH_TOKEN = $token.Trim()

# All subsequent gh commands in THIS process use the correct account
# Other processes are unaffected
```

## Integration

Add at the start of each automation round (before any gh commands):

```powershell
try {
    $remoteUrl = & git remote get-url origin 2>&1 | Out-String
    $requiredAccount = if ($remoteUrl -match "work_org") { "work_account" } else { "personal_account" }
    $token = & gh auth token --user $requiredAccount 2>&1 | Out-String
    $token = $token.Trim()
    if ($token -and $token.StartsWith("gho_")) {
        $env:GH_TOKEN = $token
    } else {
        & gh auth switch --user $requiredAccount 2>&1 | Out-Null
    }
} catch {
    Write-Warning "gh auth isolation failed: $_"
}
```

## When to Use

- Multiple automated processes across repos with different GitHub accounts
- CI/CD environments where multiple gh-authenticated processes run concurrently
- Dev environments where personal and work repos coexist

## Key Insight

This is a classic distributed systems problem — shared mutable state accessed by concurrent processes. The fix: eliminate shared mutable state by making it process-local.
