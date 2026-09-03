# Agent sync log

Shared log for agents working this repo (Claude, Codex). Newest first.
Record: date, agent, what changed, where, and anything the next agent must not redo.

---

## 2026-09-03 — Claude (project setup)

- This repo is now its own working project, separate from Mining Disrupt.
- Added `CLAUDE.md` (hosting facts, layout, working rules) and this log.
- Render: static site `mark-website` is live from `main` via Blueprint
  (`render.yaml`, deploy trigger `blueprint_sync`). It is to be housed in its
  own Render project named "Mark", not in the Mining Disrupt project.
- No page content changed.
