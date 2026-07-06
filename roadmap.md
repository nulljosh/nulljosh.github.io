# Portfolio Roadmap

## 30s rubber-hose theme (shipped 2026-07-01)
- [x] Cuphead-ify mascot — pie-cut pupils, waving glove, blink/look/kick animations (2026-07-02)
- [x] Improve readability — bumped --text2/--text3 contrast in light + dark modes (2026-07-02)
- [x] ~~Roll out 30s theme to other projects~~ — superseded by sage.me minimal restyle (tokens-sage.css, 2026-07-06)
- [ ] If sage theme sticks: full journal merge into portfolio (post pages need the theme too)

## From icons-bugs.pdf (imported 2026-06-30)
Icons across all apps shipping to the App Store — portfolio page + ASC.
- [ ] Refresh/update stale app icon(s) on portfolio page — at least one shows purple where it should be dark (color/asset mismatch, fast fix)
- [ ] Redesign icons that don't match the set's style — rule: icons mostly black/white, color sprinkled in only
- [ ] Half the icons missing in App Store Connect across shipping apps — needs investigation (visual ASC check per app, likely upload/asset-catalog gap)

## Portfolio iOS app (scaffolded 2026-07-06)
- [ ] Run in simulator, verify light/dark rendering (build passes; visual check pending)
- [x] App icon + ASC registration + build 1.0.0 (1) uploaded 2026-07-06 (app id 6788180394)

## Portfolio iOS — submit for review (state 2026-07-06 evening)
Done: build VALID, attached to v1.0; screenshots (6.5"+6.7", light+dark) uploaded; description/keywords/subtitle/privacy-URL set.
32 validation blockers remain, all quick asc calls / one dashboard visit:
- [ ] support URL (localization f4b47c92-f8b5-4bf8-adbe-9b90439e3e8f)
- [ ] review contact details (name/email/+1 778 201 4533)
- [ ] primary category (appInfo 49ef6b31-e11d-4e37-bbd9-d4a3ec294cd7)
- [ ] `asc apps update --id 6788180394 --content-rights DOES_NOT_USE_THIRD_PARTY_CONTENT`
- [ ] build encryption: usesNonExemptEncryption=false (build a5f74976-7865-46cd-b9db-fb66ef5ca1da)
- [ ] availability/pricing (free, all territories)
- [ ] age rating questionnaire (all "none")
- [ ] `asc versions update --version-id cc1a2e3a-7d19-4981-bbd2-1b291077fb90 --copyright "2026 Joshua Trommel"`
- [ ] App Privacy publish (no data collected) — dashboard
- [ ] then `asc submit --app 6788180394 --version 1.0 --confirm`
