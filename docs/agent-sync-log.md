# Agent sync log

Shared log for agents working this repo (Claude, Codex). Newest first.
Record: date, agent, what changed, where, and anything the next agent must not redo.

---

## 2026-09-03 — Claude (v2 alternative home page)

- Added `v2.html` + `v2.css`: a redesigned home page served at `/v2` (rewrite in
  `render.yaml`) so the owner can compare it with the live `index.html`. The live
  page, its CSS and `site.js` are untouched; `v2.html` reuses `site.js` unchanged
  (same data-attribute hooks) and embeds the real `demo/index.html` iframe.
- `v2.html` carries `<meta name="robots" content="noindex">` and is not in the
  sitemap. Design source and mockup: Claude Design canvas
  https://claude.ai/code/artifact/762d6d09-29c8-450e-a3cb-c21bc134bb26
- Fonts on v2 come from Google Fonts (Fredoka, Permanent Marker); everything else
  is self-hosted. If v2 is promoted to `/`, rename files, update canonical/OG
  URLs, sitemap, and drop the noindex.

## 2026-09-03 — Claude (project setup)

- This repo is now its own working project, separate from Mining Disrupt.
- Added `CLAUDE.md` (hosting facts, layout, working rules) and this log.
- Render: static site `mark-website` is live from `main` via Blueprint
  (`render.yaml`, deploy trigger `blueprint_sync`). It is to be housed in its
  own Render project named "Mark", not in the Mining Disrupt project.
- No page content changed.
