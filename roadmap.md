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

## From Apple Note (imported 2026-07-26)
- [x] "Remove the Animoji background without keying out the eyes" — DONE 2026-07-27: blue circle background removed from `images/memoji-face-2.png` using border flood-fill instead of color key, preserving blue in eyes/glasses. Deployed.

## Ingested 2026-07-25
- [x] Books (now Spine) and Spark links 404 — repo names changed and broke them. Fixed 2026-07-25: `books.` → `spine.heyitsmejosh.com` (+ label "Books" → "Spine"), `spark.` → `sparkjar.heyitsmejosh.com`; both were DNS-dead, now curl 200. Mirrored in `ios/Sources/PortfolioApp.swift`. All 16 project links re-verified 200.
- [x] **Deploy path was broken — root cause of "fixes that never took" (found + fixed 2026-07-25).** `heyitsmejosh.com`'s apex CNAME pointed at a stale Cloudflare Pages project (`nulljosh-portfolio.pages.dev`) while GitHub Pages (`build_type: workflow`, status `built`) was the real, up-to-date host — so `git push` deployed correctly but the live domain kept serving an old build. Tell: live site still referenced `memoji-face.png` though commit `a9264e6` renamed it to `memoji-face-2.png`. Fixed by repointing the apex CNAME to `nulljosh.github.io` via the Cloudflare API (record `713fc4b7…`, proxied, matching the `www` record which already pointed there). Verified live. **Anything "fixed but still broken on the site" before this date should be re-checked — it may simply never have been served.**
- [x] Animoji white outline in dark mode — **RESOLVED 2026-07-25, verified by pixel analysis.** Root cause was a white matte baked into the PNG's anti-aliased edge, never a CSS problem — which is why every CSS attempt failed. Measured: old `images/memoji-face.png` has 179 semi-transparent edge pixels, **41 of them near-white (22.9% of the edge)**. Current `images/memoji-face-2.png` (shipped in `a9264e6`) has 252 semi-transparent edge pixels and **0 near-white** — avg edge RGB (170,152,140), clean skin tone. There is no outline in the CSS: `.avatar`/`.avatar img` (index.html:40-41) set no border, filter, or box-shadow. Live site confirmed serving `memoji-face-2.png` via cache-busted request. If it still looks outlined in a browser, it's a stale Cloudflare edge copy — hard-reload (⌘⇧R); the asset rename in `a9264e6` was itself the cache-bust and the HTML sends `max-age=0, must-revalidate`, so it expires on its own. API purge was attempted and denied: `CLOUDFLARE_DNS_TOKEN` is DNS-scoped only (zone `6cea109e1986f4a1ab47a94591961e19` resolves, `purge_cache` returns auth error 10000) — same token limitation as the stale-Pages-project item below.
- [x] Unused legacy avatar assets: `images/memoji.png` (6535 opaque near-white px — hard white background, no alpha edge) and the old `images/memoji-face.png` are both unreferenced now. Done 2026-07-26: `memoji-face.png` was already gone; grepped repo (html/swift/css) to confirm zero references to either filename, then `git rm images/memoji.png`.
- [ ] Stale Cloudflare Pages project `nulljosh-portfolio.pages.dev` still exists and may still hold `heyitsmejosh.com` as a custom domain — delete the project (or at least detach the domain) so it can't hijack the apex again. Blocked: the `CLOUDFLARE_DNS_TOKEN` in `~/.config/fish/secrets.fish` is DNS-scoped only (`/accounts` returns empty) and no working `wrangler` is installed (`npx wrangler` fails on a workerd binary error). Needs a Pages-scoped API token or a `wrangler login`.
- [x] Update education section: KPU for a year (prerequisites incl. Pre-Calc 12 equivalent), then 3 years at SFU, possibly a finance minor/major after. Done 2026-07-25: replaced the UVic entry with SFU (2027, "3 years · possible finance minor") + KPU (2026, "incl. Pre-Calculus 12"); also fixed the stale "Returning to the University of Victoria" line in the intro paragraph. Mirrored in the iOS app.
- [x] Fix experience section href links — heyitsmejosh.com entry should link to "#" not GitHub; remaining entries should link to their own sites (bcgd, simply, macinhome). Done 2026-07-25: heyitsmejosh.com → `#`; Best Choice Garage Doors → bcgaragedoors.ca, Simply Computing → simply.ca, Macinhome → macinhome.com (all verified 200). Mirrored as `url:` values in the iOS app.
