# Portfolio Roadmap

## From icons-bugs.pdf (imported 2026-06-30)
Icons across all apps shipping to the App Store — portfolio page + ASC.
- [ ] Refresh/update stale app icon(s) on portfolio page — at least one shows purple where it should be dark. Still unverified 2026-07-20: needs a visual/on-device check (no icon references in index.html to fix directly), blocked without simulator/screenshot access.
- [ ] Redesign icons that don't match the set's style — rule: icons mostly black/white, color sprinkled in only. Not actionable without a per-icon visual audit; blocked.
- [ ] Half the icons missing in App Store Connect across shipping apps — needs per-app visual ASC check, blocked without dashboard/screenshot access.

## Someday / Explore
- [ ] "Null folio" idea (from Null folio.pdf, imported 2026-07-21): a folio/resume variant needing a better name, should mirror the main site's style more closely, and wants Animoji-style avatars with animations. Not scoped/actionable yet — needs a naming + design pass before starting.

## Portfolio iOS app (scaffolded 2026-07-06)
- [ ] Run in simulator, verify light/dark rendering (build passes; visual check pending) — blocked: skipping simulator by default per user preference, needs an explicit ask.

## Deferred (2026-07-21)
- [ ] Custom SVG piece-level animation of the Animoji (e.g. animate.css-style or custom)
- [ ] Port the Animoji float/animation to iOS app
- [ ] Automatic project name/URL refresh in the site when a project is renamed

## Ingested 2026-07-25
- [x] Books (now Spine) and Spark links 404 — repo names changed and broke them. Fixed 2026-07-25: `books.` → `spine.heyitsmejosh.com` (+ label "Books" → "Spine"), `spark.` → `sparkjar.heyitsmejosh.com`; both were DNS-dead, now curl 200. Mirrored in `ios/Sources/PortfolioApp.swift`. All 16 project links re-verified 200.
- [x] **Deploy path was broken — root cause of "fixes that never took" (found + fixed 2026-07-25).** `heyitsmejosh.com`'s apex CNAME pointed at a stale Cloudflare Pages project (`nulljosh-portfolio.pages.dev`) while GitHub Pages (`build_type: workflow`, status `built`) was the real, up-to-date host — so `git push` deployed correctly but the live domain kept serving an old build. Tell: live site still referenced `memoji-face.png` though commit `a9264e6` renamed it to `memoji-face-2.png`. Fixed by repointing the apex CNAME to `nulljosh.github.io` via the Cloudflare API (record `713fc4b7…`, proxied, matching the `www` record which already pointed there). Verified live. **Anything "fixed but still broken on the site" before this date should be re-checked — it may simply never have been served.**
- [ ] Animoji still has a white outline in dark mode — prior fix attempts (hours spent) unsuccessful. **Re-check first (2026-07-25):** the dark-mode halo fix (`23114da`) plus the `memoji-face-2` cache-bust were live on GitHub Pages but never served on `heyitsmejosh.com` due to the DNS issue above. They are served now — verify on-device before spending more time on it.
- [ ] Stale Cloudflare Pages project `nulljosh-portfolio.pages.dev` still exists and may still hold `heyitsmejosh.com` as a custom domain — delete the project (or at least detach the domain) so it can't hijack the apex again. Blocked: the `CLOUDFLARE_DNS_TOKEN` in `~/.config/fish/secrets.fish` is DNS-scoped only (`/accounts` returns empty) and no working `wrangler` is installed (`npx wrangler` fails on a workerd binary error). Needs a Pages-scoped API token or a `wrangler login`.
- [x] Update education section: KPU for a year (prerequisites incl. Pre-Calc 12 equivalent), then 3 years at SFU, possibly a finance minor/major after. Done 2026-07-25: replaced the UVic entry with SFU (2027, "3 years · possible finance minor") + KPU (2026, "incl. Pre-Calculus 12"); also fixed the stale "Returning to the University of Victoria" line in the intro paragraph. Mirrored in the iOS app.
- [x] Fix experience section href links — heyitsmejosh.com entry should link to "#" not GitHub; remaining entries should link to their own sites (bcgd, simply, macinhome). Done 2026-07-25: heyitsmejosh.com → `#`; Best Choice Garage Doors → bcgaragedoors.ca, Simply Computing → simply.ca, Macinhome → macinhome.com (all verified 200). Mirrored as `url:` values in the iOS app.
