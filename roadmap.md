# Portfolio Roadmap

## DECISION 2026-08-11: Nullfolio is not shipping to the App Store
App 6788180394 stays rejected under **4.2 Minimum Functionality** and will not be
resubmitted. The app is a hardcoded mirror of `index.html` whose rows open Safari — Apple's
read is correct, and the only route past 4.2 is inventing app-only features (widget,
offline cache, notifications) for a personal résumé with no App Store audience. Resubmitting
a thin app while four apps sit under the Guideline 5.6 conduct review is exactly the
"same or similar issues" Apple's letter warns leads to Developer Program removal.

Consequence: every Nullfolio ASC/TestFlight/icon item below is **closed, not deferred**.
Keep the Xcode target as a personal build only. Decided 2026-08-11: the ASC record
6788180394 STAYS (not deleted) — deletion is irreversible, a rejected never-live record is
publicly invisible, and pulling records mid-conduct-review is a bad optic. Nothing open here.

## From Apple Notes (imported 2026-08-08)
- [x] Animoji chin-crop bug: user reported "you said you fixed it but I don't see the changes propagated live" — verified 2026-08-08, it IS live. Fix commit `ea81c36` (Aug 7, padding added around face) is pushed to `origin/main`, and `curl https://heyitsmejosh.com/images/memoji-face-2.png` returns the exact same file (sha1 `f8a49c7f...`) as the repo's current version. No further action.
- [x] Nullfolio (iOS app) TestFlight stale + "icon scaling still broken": **CLOSED 2026-08-11** — app not shipping to App Store per Guideline 4.2 decision above. TestFlight archive and icon-scaling items now closed.
- [x] "Should be dynamically reading and natively displaying information from website" (from Nullfolio note): **CLOSED 2026-08-11** — app not shipping, feature not needed.

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
- [x] Ship a macOS version of Nullfolio (ASC 6788180394): **CLOSED 2026-08-11** — app not shipping to App Store.

## From App Store.pdf (imported 2026-07-29)
- [x] Nullfolio: icon is correct in repo/build but ASC/TestFlight listing still shows a stale plain orange "N": **CLOSED 2026-08-11** — app not shipping, icon update not needed.

## Ingested 2026-08-04
- [x] Animoji asset is low quality — NEEDS A BIGGER EXPORT, not a conversion. `images/memoji-face-2.png` is only 128x128 but is displayed at 88 CSS px, so it is soft on any 2x/3x screen (88pt needs 176px @2x, 264px @3x). SVG will not fix this: a Memoji is a raster 3D render with soft gradients, and auto-tracing it to vector looks visibly worse, not lossless. Upscaling cannot invent detail that is not in the file. **RESOLVED 2026-08-07**: Exported Memoji at 512px from Messages, chroma-keyed out background via flood fill, replaced both web (`images/memoji-face-2.png`) and iOS asset versions. Now displays sharp across all contexts.

## From Apple Notes (imported 2026-08-04)
- [x] **Nullfolio iOS 1.0 was REJECTED since 2026-07-22.** App ID `6788180394` (`com.nulljosh.portfolio`), REJECTED under Guideline 4.2 Minimum Functionality. **RESOLVED 2026-08-11**: decision made not to ship to App Store (see DECISION 2026-08-11 above). ASC record stays in place as a rejected-never-live archive; no further action.

## App Store submission freeze — until 2026-08-18
- [ ] **BLOCKED: no App Store submission on any app until 2026-08-18.** (STILL ACTIVE — do not check this off before Aug 18; a /night wrap incorrectly closed it 2026-08-11.) Account is under a Guideline 5.6 Developer Code of Conduct review suspension (Curvely, Transcriptly, Wiretext, NYC Survive). Apple warns that continued similar submissions may result in removal from the Apple Developer Program. Full detail: wiki `ship-plan.md` § "Guideline 5.6 suspension (2026-08-10)". TestFlight builds, pushes and web deploys are still fine. This is a general account block, not specific to any one app.
- [x] Nullfolio (6788180394) REJECTED 2.3.8 + 4.2: **CLOSED 2026-08-11** — app not shipping, rejection no longer actionable.
