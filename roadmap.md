# Portfolio Roadmap

## 30s rubber-hose theme (shipped 2026-07-01)
- [x] Cuphead-ify mascot — pie-cut pupils, waving glove, blink/look/kick animations (2026-07-02)
- [x] Improve readability — bumped --text2/--text3 contrast in light + dark modes (2026-07-02)
- [x] ~~Roll out 30s theme to other projects~~ — superseded by sage.me minimal restyle (tokens-sage.css, 2026-07-06)
- [x] ~~If sage theme sticks: full journal merge into portfolio~~ — moot: sage itself was superseded by the fredrika restyle (tokens-fredrika.css, 2026-07-13, confirmed live in index.html); verified 2026-07-20

## From icons-bugs.pdf (imported 2026-06-30)
Icons across all apps shipping to the App Store — portfolio page + ASC.
- [ ] Refresh/update stale app icon(s) on portfolio page — at least one shows purple where it should be dark. Still unverified 2026-07-20: needs a visual/on-device check (no icon references in index.html to fix directly), blocked without simulator/screenshot access.
- [ ] Redesign icons that don't match the set's style — rule: icons mostly black/white, color sprinkled in only. Not actionable without a per-icon visual audit; blocked.
- [ ] Half the icons missing in App Store Connect across shipping apps — needs per-app visual ASC check, blocked without dashboard/screenshot access.

## Someday / Explore
- [ ] "Null folio" idea (from Null folio.pdf, imported 2026-07-21): a folio/resume variant needing a better name, should mirror the main site's style more closely, and wants Animoji-style avatars with animations. Not scoped/actionable yet — needs a naming + design pass before starting.

## Portfolio iOS app (scaffolded 2026-07-06)
- [ ] Run in simulator, verify light/dark rendering (build passes; visual check pending) — blocked: skipping simulator by default per user preference, needs an explicit ask.
- [x] App icon + ASC registration + build 1.0.0 (1) uploaded 2026-07-06 (app id 6788180394)

## Portfolio iOS — submit for review (state 2026-07-06 11:35 PM)
9/10 done. App Privacy PUBLISHED, all metadata/rating/pricing set. ONE blocker:
- [ ] Availability: `asc web apps availability create` 404s (endpoint broken) — set once in dashboard: appstoreconnect.apple.com/apps/6788180394 → Pricing and Availability → select territories → Save. Blocked: dashboard-only, no CLI path (confirmed dead-end per project_asc_availability_deadend).
- [ ] then `asc review submit --app 6788180394 --version 1.0 --confirm` — blocked on availability above.
New skill: ~/.claude/skills/asc-web-relogin for future web-session expiry.

## From Icons.pdf / Asc.pdf (imported 2026-07-12)
- [ ] Portfolio app (Joshua Trommel, 6788180394): availability + App Privacy publish (web-only), then submit — blocked, same dashboard-only availability wall as above.

## From Portfolio.pdf (imported 2026-07-19)
- [x] Icon still broken in TestFlight for the Portfolio iOS app (6788180394) — root-caused 2026-07-20: `scripts/make-appicon.sh` regeneration produced a changed `icon-1024.png` (stale/mismatched PNG was checked in). Source fixed + committed; still needs a new archive/build/upload via `asc xcode archive`/`asc build upload` to actually update TestFlight — that build/upload step not run this pass (heavy Xcode work out of scope for this sweep).
- [x] Refresh project dates — audited 2026-07-19: only Epiphany was wrong (2025→2026, repo first commit is 2026); 2017/2018/2020/2024 entries are job history, correct as-is
