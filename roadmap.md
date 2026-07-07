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

## Portfolio iOS — submit for review (state 2026-07-06 late)
Done via asc: support URL, review contact (+demo=false), category UTILITIES, content rights, encryption=false, age rating all-none, copyright, free pricing (US base).
Remaining — blocked on expired web session (`asc web` login needed):
- [ ] `asc web apps availability create --app 6788180394 --territory "<all 175 codes from asc pricing territories list --limit 200>" --available-in-new-territories true`
- [ ] App Privacy publish: `asc web privacy publish --app 6788180394 --confirm` (or dashboard: appstoreconnect.apple.com/apps/6788180394/appPrivacy)
- [ ] `asc validate --app 6788180394 --version 1.0 --platform IOS` then `asc review submit --app 6788180394 --version 1.0 --confirm`
