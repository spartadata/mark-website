# Mark website

Marketing site for **Mark**, the visual website annotation companion for Safari.
Static HTML/CSS/JS, no build step, no framework. This repository is its own
project, independent of Mining Disrupt and the CRM: nothing here touches that
repo or its data.

## Hosting (Render)

- Render static site **mark-website**, Blueprint-managed by `render.yaml` in
  this repo. It belongs in its own Render project, **Mark**.
- Live: https://mark-website-y5hm.onrender.com (no custom domain yet).
- Every push to `main` triggers a Blueprint sync and deploy (about ten seconds).
- `staticPublishPath: .` publishes the repository root, so **every committed
  file is served publicly**, this file included. Nothing sensitive goes here.
- `render.yaml` also owns the security and cache headers and the `/privacy`,
  `/support` and `/app-store` rewrites. Change routing there, not in the HTML.
- Render MCP tools (`list_services`, `list_deploys`, `list_logs`) confirm
  deploy state. Verify on the live URL after every push.

## Layout

- Pages: `index.html` (home), `v2.html` (alternative home under review, served
  at `/v2`, noindex, uses `v2.css` + shared `site.js`), `app-store.html` (App Store preview),
  `privacy.html`, `support.html`, `wordmarks.html` (wordmark playground),
  `demo/index.html` (annotation palette prototype).
- Shared code: `styles.css`, `site.js`, `app-store.css`, `wordmarks.css`,
  `wordmarks.js`.
- Assets: `public/icon/*` (favicons, toolbar icons), `app-icons/*` (App Store
  icons), `social-card.png`.
- Discovery: `sitemap.xml`, `robots.txt`, `site.webmanifest`.

## Working rules

- Absolute URLs (canonical, `og:url`, `og:image`, `twitter:image`,
  `sitemap.xml`, `robots.txt`) all point at the onrender.com host. When a
  custom domain lands, change every one of them in a single commit.
- Stylesheet and script links carry a `?v=N` cache-buster. Bump `N` on every
  page that links the file you changed (they are not kept in sync
  automatically: `privacy.html` still links `styles.css?v=9`).
- The app and Safari extension source live in the private repo
  `spartadata/mark-safari-extension`. Never copy its contents into this repo.
- Log substantial work in `docs/agent-sync-log.md`. Claude and Codex both work
  here.
