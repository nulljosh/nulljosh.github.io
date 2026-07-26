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
- [ ] Animoji still has a white outline in dark mode — prior fix attempts (hours spent) unsuccessful.
- [x] Update education section: KPU for a year (prerequisites incl. Pre-Calc 12 equivalent), then 3 years at SFU, possibly a finance minor/major after. Done 2026-07-25: replaced the UVic entry with SFU (2027, "3 years · possible finance minor") + KPU (2026, "incl. Pre-Calculus 12"); also fixed the stale "Returning to the University of Victoria" line in the intro paragraph. Mirrored in the iOS app.
- [x] Fix experience section href links — heyitsmejosh.com entry should link to "#" not GitHub; remaining entries should link to their own sites (bcgd, simply, macinhome). Done 2026-07-25: heyitsmejosh.com → `#`; Best Choice Garage Doors → bcgaragedoors.ca, Simply Computing → simply.ca, Macinhome → macinhome.com (all verified 200). Mirrored as `url:` values in the iOS app.
