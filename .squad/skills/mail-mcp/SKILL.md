# Mail MCP Server

**Status:** ✅ Available in Agency CLI
**Recommendation:** ✅ ADOPT

## What It Provides

| Operation | Capability |
|-----------|-----------|
| **Send Email** | Send with To/CC/BCC, HTML/text support |
| **Create Drafts** | Compose, save as drafts, send later |
| **Reply/Reply-All** | Respond with HTML formatting |
| **Search Messages** | KQL-style queries across subject, body, attachments |
| **Get/Delete Messages** | Retrieve or remove by ID |
| **Update Messages** | Modify subject, body, categories, importance |

## How to Add

```json
{
  "mcpServers": {
    "mail": {
      "type": "local",
      "command": "agency",
      "args": ["mcp", "mail"],
      "tools": ["*"]
    }
  }
}
```

## Available Tools

- `graph_mail_createMessage` — Create draft
- `graph_mail_sendMail` — Send email
- `graph_mail_searchMessages` — Search with KQL
- `graph_mail_reply` / `graph_mail_replyAll` — Reply
- `graph_mail_getMessage` / `graph_mail_deleteMessage` — Get/Delete
- `graph_mail_listSent` — List sent items
- `graph_mail_sendDraft` — Send existing draft
- `graph_mail_updateMessage` — Update properties

## Security

- OAuth via Microsoft Entra ID (signed-in user context)
- No credentials stored — uses existing M365 session
- All actions logged in Microsoft 365 audit logs

## Limitations

- Microsoft 365 only (no Gmail, iCloud)
- Must be authenticated user; no shared mailbox delegation yet
- Subject to Microsoft Graph API throttling
