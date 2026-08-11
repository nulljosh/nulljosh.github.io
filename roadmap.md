# Portfolio Roadmap

## DECISION 2026-08-11: Nullfolio is not shipping to the App Store
App 6788180394 stays rejected under **4.2 Minimum Functionality** and will not be
resubmitted. The app is a hardcoded mirror of `index.html` whose rows open Safari — Apple's
read is correct, and the only route past 4.2 is inventing app-only features (widget,
offline cache, notifications) for a personal résumé with no App Store audience. Resubmitting
a thin app while four apps sit under the Guideline 5.6 conduct review is exactly the
"same or similar issues" Apple's letter warns leads to Developer Program removal.

Consequence: every Nullfolio ASC/TestFlight/icon item below is **closed, not deferred**.
Keep the Xcode target as a personal build only. Remaining open question for Joshua: whether
to delete the ASC record 6788180394 outright (irreversible — not done without a go-ahead).

## From Apple Notes (imported 2026-08-08)
- [x] Animoji chin-crop bug: user reported "you said you fixed it but I don't see the changes propagated live" — verified 2026-08-08, it IS live. Fix commit `ea81c36` (Aug 7, padding added around face) is pushed to `origin/main`, and `curl https://heyitsmejosh.com/images/memoji-face-2.png` returns the exact same file (sha1 `f8a49c7f...`) as the repo's current version. No further action.
- [ ] Nullfolio (iOS app) TestFlight stale + "icon scaling still broken": root cause is NOT the icon asset — `icon-1024.png` is already correctly generated (1024×1024, no alpha, via `scripts/make-appicon.sh` per this repo's CLAUDE.md rule) and matches the documented fix from 2026-07-12. The actual staleness: the last archive in `ios/.asc/artifacts/Nullfolio.xcarchive` is dated **2026-07-21**, but `Sources/PortfolioApp.swift`'s hardcoded journal list (synced by `journal/scripts/sync-portfolio.sh`) has entries through **Aug 6** — meaning ~2.5 weeks of content/fixes (including the chin-crop fix above) have never been archived/uploaded to TestFlight. No `.asc/workflow.json` exists for this app yet. Needs: `asc xcode archive` + `asc xcode export` + upload with a bumped build number, or set up a `ship-ios` workflow like the other repos. "Icon scaling broken" as *currently observed on TestFlight* is most likely just this same stale build, not a new bug — re-verify only if it persists after the next upload.
- [ ] "Should be dynamically reading and natively displaying information from website" (from Nullfolio note) — bigger feature, not a quick fix. Currently `PortfolioApp.swift` hardcodes all list items (marked `// ponytail: content hardcoded to mirror index.html; fetch from site if it drifts`), with the journal section auto-synced by a script but everything else manually mirrored. Making it live-fetch would mean either scraping `index.html` at runtime or adding a JSON data endpoint the site and app both read from. Not scoped — needs a decision on approach before starting.

## From icons-bugs.pdf (imported 2026-06-30)
Icons across all apps shipping to the App Store — portfolio page + ASC.
- [ ] Redesign icons that don't match the set's style — rule: icons mostly black/white, color sprinkled in only. Not actionable without a per-icon visual audit; blocked. (Also applies to ASC listing icons, not this repo's orphaned `images/icons/*.svg` — ignore those, they're unused.)
- [ ] Half the icons missing in App Store Connect across shipping apps — needs per-app visual ASC check, blocked without dashboard/screenshot access.

## Someday / Explore
- [ ] "Null folio" idea (from Null folio.pdf, imported 2026-07-21): a folio/resume variant needing a better name, should mirror the main site's style more closely, and wants Animoji-style avatars with animations. Not scoped/actionable yet — needs a naming + design pass before starting.

## Deferred (2026-07-21)
- [ ] Custom SVG piece-level animation of the Animoji (e.g. animate.css-style or custom)
- [ ] Port the Animoji float/animation to iOS app
- [ ] Automatic project name/URL refresh in the site when a project is renamed — SCOPED 2026-07-28: `index.html` hardcodes each project as a static `<li><a>` with name/URL/tagline/platforms, no data file, no build step (CLAUDE.md: "No build step" is a deliberate convention). Automating this means a generator script parsing `~/Documents/Code/CLAUDE.md`'s project table, but that table lacks the taglines/platform lists/years shown per entry — needs a second source of truth or richer per-repo metadata before a generator is worth building. M-effort, not a quick fix; deferred.

## Ingested 2026-07-25
- [x] Stale Cloudflare Pages project `nulljosh-portfolio` **deleted 2026-08-04** (API DELETE, `success: true`; `nulljosh-portfolio.pages.dev` now returns 530, apex still 200). Worth recording: by deletion time it held **no** custom domain — only `nulljosh-portfolio.pages.dev` — so the apex-hijack risk was already lower than this item described. It was serving a stale duplicate of the portfolio ("Joshua Trommel"). Original note: NO LONGER BLOCKED as of 2026-08-04: `npx wrangler` works (4.118.0) and its OAuth token has `pages:write`. Read the token from `~/.wrangler/config/default.toml` (NOT `~/Library/Preferences/.wrangler/...`, that copy is expired) and call the Pages API with account `14c849d102ecc38b5fae54d9b22deec4`; that is exactly how `voxprint.heyitsmejosh.com` got attached this session. `CLOUDFLARE_DNS_TOKEN` is still DNS-only, as noted.

## From App Store.pdf (imported 2026-07-28)
- [ ] Ship a macOS version of Nullfolio (ASC 6788180394).

## From App Store.pdf (imported 2026-07-29)
- [ ] Nullfolio: icon is correct in repo/build but ASC/TestFlight listing still shows a stale plain orange "N" — needs a resubmit/reprocess to clear the stale cached icon.

## Ingested 2026-08-04
- [x] Animoji asset is low quality — NEEDS A BIGGER EXPORT, not a conversion. `images/memoji-face-2.png` is only 128x128 but is displayed at 88 CSS px, so it is soft on any 2x/3x screen (88pt needs 176px @2x, 264px @3x). SVG will not fix this: a Memoji is a raster 3D render with soft gradients, and auto-tracing it to vector looks visibly worse, not lossless. Upscaling cannot invent detail that is not in the file. **RESOLVED 2026-08-07**: Exported Memoji at 512px from Messages, chroma-keyed out background via flood fill, replaced both web (`images/memoji-face-2.png`) and iOS asset versions. Now displays sharp across all contexts.

## From Apple Notes (imported 2026-08-04)
- [ ] **Nullfolio iOS 1.0 is REJECTED — has been since 2026-07-22, unnoticed.** App ID `6788180394` (`com.nulljosh.portfolio`), version id `cc1a2e3a-7d19-4981-bbd2-1b291077fb90`, submission `0ebad2f8-da32-4727-9be0-a00dce3719e5`, state `UNRESOLVED_ISSUES` (submitted 2026-07-22 07:48 UTC via API Key). `asc review doctor --app 6788180394` confirms 1 blocking error but the actual rejection text lives in App Review's Resolution Center, which is web-UI-only — read it at appstoreconnect.apple.com, fix, then resubmit (`asc versions attach-build` + `asc review submissions-submit --confirm`).

## App Store submission freeze — until 2026-08-18
- [ ] **BLOCKED: no App Store submission on any app until 2026-08-18.** Account is under a Guideline 5.6 Developer Code of Conduct review suspension (Curvely, Transcriptly, Wiretext, NYC Survive). Apple warns that continued similar submissions may result in removal from the Apple Developer Program. Full detail: wiki `ship-plan.md` § "Guideline 5.6 suspension (2026-08-10)". TestFlight builds, pushes and web deploys are still fine.
- [ ] Nullfolio (6788180394) REJECTED 2.3.8 + 4.2. 2.3.8 (name mismatch, marketplace "Nullfolio" vs on-device "Joshua Trommel") FIXED 2026-08-10 in ios/Sources/Info.plist. 4.2 Minimum Functionality is unresolved and is a real verdict on a portfolio-site wrapper — either add genuine app-only functionality or withdraw the record.
