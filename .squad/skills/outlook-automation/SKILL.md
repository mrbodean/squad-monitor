---
name: outlook-automation
description: Control Microsoft Outlook on Windows via COM automation — create meetings, send emails, search emails, read inbox, manage calendar.
---

# Outlook Automation (Windows COM)

## When to Use

- Create, update, or delete calendar meetings/appointments
- Send, read, search, or manage emails
- Interact with Outlook contacts, folders, or tasks

## When Not to Use

- macOS or Linux (COM is Windows-only)
- Cloud-only access without local Outlook (use Microsoft Graph API instead)

## Prerequisites

- Windows with Microsoft Outlook installed and configured
- PowerShell 5.1 or later

## Initialization

```powershell
$outlook = New-Object -ComObject Outlook.Application
$namespace = $outlook.GetNameSpace("MAPI")
```

## Email Operations

### Send an Email

```powershell
$mail = $outlook.CreateItem(0)
$mail.Subject = "Subject here"
$mail.Body = "Plain text body"
$mail.To = "recipient@example.com"
$mail.Send()
```

### Read Inbox

```powershell
$inbox = $namespace.GetDefaultFolder(6)
$messages = $inbox.Items
$messages.Sort("[ReceivedTime]", $true)
for ($i = 1; $i -le [Math]::Min(10, $messages.Count); $i++) {
    $msg = $messages.Item($i)
    Write-Host "From: $($msg.SenderEmailAddress) | Subject: $($msg.Subject)"
}
```

### Search Emails

```powershell
$inbox = $namespace.GetDefaultFolder(6)
$filter = "@SQL=""urn:schemas:httpmail:subject"" LIKE '%search term%'"
$results = $inbox.Items.Restrict($filter)
```

## Calendar Operations

### Create a Meeting

```powershell
$meeting = $outlook.CreateItem(1)
$meeting.MeetingStatus = 1  # olMeeting
$meeting.Subject = "Team Sync"
$meeting.Start = [DateTime]"2026-03-15 14:00"
$meeting.Duration = 30
$meeting.Recipients.Add("attendee@example.com")
$meeting.Recipients.ResolveAll()
$meeting.Send()
```

### List Upcoming Events

```powershell
$calendar = $namespace.GetDefaultFolder(9)
$items = $calendar.Items
$items.Sort("[Start]")
$items.IncludeRecurrences = $true
$filter = "[Start] >= '$((Get-Date).ToString("MM/dd/yyyy"))' AND [Start] <= '$((Get-Date).AddDays(7).ToString("MM/dd/yyyy"))'"
$upcoming = $items.Restrict($filter)
```

## Tips

- Outlook may show security dialogs for certain properties
- Use `.Restrict()` filters instead of iterating all items for performance
- Release COM objects after heavy usage: `[System.Runtime.InteropServices.Marshal]::ReleaseComObject($outlook)`
