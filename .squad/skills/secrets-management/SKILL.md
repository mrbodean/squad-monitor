---
name: secrets-management
description: Centralized secrets management pattern for Squad. Secrets never in git, always accessible at runtime.
triggers: ["secret", "credential", "api key", "token", "password", "env var", ".env", "credential manager"]
confidence: high
---

# Secrets Management

> **Rule Zero:** No secret value is ever committed to git. Period.

## Where Secrets Live (Priority Order)

| Priority | Source | Example | Notes |
|----------|--------|---------|-------|
| 1 | **Windows Credential Manager** | `my-api-key` | Most secure. Survives reboots. |
| 2 | **Machine-local file** | `$env:USERPROFILE\.squad\webhook.url` | For values that are file-based by convention. |
| 3 | **Machine-local .env** | `$env:USERPROFILE\.squad\.env` | Fallback for machines without Credential Manager. |
| 4 | **Environment variable** | `$env:API_KEY` | Already set in session (e.g., by CI). |

## How to Add a New Secret

1. **Add to `.env.example`** — document the variable name, description, and where to get it. No values.
2. **Store the value** in Credential Manager on each machine:
   ```powershell
   New-StoredCredential -Target 'my-new-secret' -UserName 'my-new-secret' -Password 'actual-value' -Persist LocalMachine
   ```
3. **Update the known secrets table** in your repo's documentation.

## Cross-Machine Sync

**Secrets do NOT sync between machines.** Each machine must set up its own secrets independently.

## .gitignore Protection

Must include patterns to prevent accidental secret commits:
- `*.env`, `.env.*` — environment files
- `*secret*`, `*credential*` — anything named with sensitive terms
- `*.key`, `*.pem` — cryptographic material
- `!.env.example` — the template is explicitly allowed

## Rotation Procedures

When a secret is compromised or needs rotation:
1. Generate new value from the provider
2. Update Credential Manager on all machines
3. Revoke the old value at the provider
4. Document that rotation occurred
5. If the secret was ever in git history, consider it permanently compromised
