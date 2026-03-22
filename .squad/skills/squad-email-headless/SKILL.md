---
name: squad-email-headless
description: Send emails from a squad account headlessly via Microsoft Graph API. No browser needed after one-time setup.
---

# Squad Email - Headless Sending

## Overview

Send emails from a squad email account using Microsoft Graph API with OAuth2. Works headlessly after one-time device code authentication.

## Quick Start

```powershell
# Send an email
.\scripts\squad-email\Send-SquadEmail.ps1 `
  -To "recipient@example.com" `
  -Subject "Hello from Squad" `
  -Body "This is a test email"

# Send HTML email
.\scripts\squad-email\Send-SquadEmail.ps1 `
  -To "recipient@example.com" `
  -Subject "Report" `
  -Body "<h1>Report</h1><p>Details</p>" `
  -BodyType html
```

## First-Time Setup (per machine)

```powershell
.\scripts\squad-email\Setup-SquadEmailAuth.ps1
# Displays a code — go to https://microsoft.com/link and enter it
# Sign in with squad email account
```

## How It Works

1. **Setup** (one-time): Device Code Flow → user visits microsoft.com/link → signs in
2. **Token storage**: Refresh token saved to Windows Credential Manager
3. **Sending**: Script auto-refreshes access token → sends via Graph API
4. **Token rotation**: Microsoft rotates refresh tokens; script saves new ones automatically

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `-To` | Yes | - | Recipient(s), comma-separated |
| `-Subject` | Yes | - | Email subject |
| `-Body` | Yes | - | Email body content |
| `-BodyType` | No | `text` | `text` or `html` |
| `-Cc` | No | - | CC recipients |
| `-Importance` | No | `normal` | `low`, `normal`, `high` |

## Troubleshooting

- **"No refresh token found"** → Run `Setup-SquadEmailAuth.ps1`
- **"Token refresh failed"** → Token expired (90 days inactive). Re-run setup
- **HTTP 403** → App needs Mail.Send consent. Re-run setup
