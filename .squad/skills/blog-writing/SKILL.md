---
name: blog-writing
description: Blog post quality patterns for technical writing — storytelling structure, code block rules, series conventions, and pre-publish checklists.
confidence: high
---

# Skill: Blog Writing

> Patterns for high-quality technical blog posts that read like a conversation, not a manual.

## 1. Writing Voice

Write like you're talking to another engineer over coffee. Casual but precise.

| Pattern | Detail |
|---------|--------|
| **Storytelling-first** | Open with a personal story, not a feature list |
| **Casual but precise** | Technical claims always have specifics: real numbers, real repos |
| **Real experiments** | Every concept backed by something you actually did |
| **Honest reflection** | "Here's what actually broke" moments build credibility |
| **Direct address** | "Here's the thing nobody tells you about..." |

### Anti-patterns

- Marketing voice ("leverage," "unlock," "empower")
- Hedging ("it might be useful to consider")
- Abstract without concrete (every claim needs a real example)

## 2. Blog Post Structure

```
Hook → Context → Experiment → What Worked → What Broke → Insight → Solution → What's Next
```

## 3. Code Block Rules

- **Always link to real repos** — every block references a real file or PR
- **Keep blocks short** — 5-15 lines ideal
- **Use correct language tags** — always explicit
- **Never show theoretical code** — if it doesn't exist in a repo, don't show it
- **Never show credentials** — use `<url>` placeholders

## 4. Series Conventions

Every post in a series ends with identical navigation block. Current post marked with `← You are here`.

**Critical:** When adding a new post, update nav in ALL existing posts.

## 5. Pre-Publish Checklist

```markdown
- [ ] Links work
- [ ] Images exist with alt text
- [ ] Series nav updated in ALL posts
- [ ] No "coming soon" placeholders
- [ ] Code blocks have language tags
- [ ] Front matter complete
- [ ] No sensitive data
- [ ] Repo links valid
```
