# Portfolio Roadmap

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
- [ ] Stale Cloudflare Pages project `nulljosh-portfolio.pages.dev` still exists and may still hold `heyitsmejosh.com` as a custom domain — delete the project (or at least detach the domain) so it can't hijack the apex again. NO LONGER BLOCKED as of 2026-08-04: `npx wrangler` works (4.118.0) and its OAuth token has `pages:write`. Read the token from `~/.wrangler/config/default.toml` (NOT `~/Library/Preferences/.wrangler/...`, that copy is expired) and call the Pages API with account `14c849d102ecc38b5fae54d9b22deec4`; that is exactly how `voxprint.heyitsmejosh.com` got attached this session. `CLOUDFLARE_DNS_TOKEN` is still DNS-only, as noted.

## From App Store.pdf (imported 2026-07-28)
- [ ] Ship a macOS version of Nullfolio (ASC 6788180394).

## From App Store.pdf (imported 2026-07-29)
- [ ] Nullfolio: icon is correct in repo/build but ASC/TestFlight listing still shows a stale plain orange "N" — needs a resubmit/reprocess to clear the stale cached icon.

## Ingested 2026-08-04
- [ ] Animoji asset is low quality — NEEDS A BIGGER EXPORT, not a conversion. `images/memoji-face-2.png` is only 128x128 but is displayed at 88 CSS px, so it is soft on any 2x/3x screen (88pt needs 176px @2x, 264px @3x). SVG will not fix this: a Memoji is a raster 3D render with soft gradients, and auto-tracing it to vector looks visibly worse, not lossless. Upscaling cannot invent detail that is not in the file. Unblock by exporting the Memoji from Messages/Photos at 512px or larger and dropping it in as `memoji-face-2.png`; nothing else has to change.

## From Apple Notes (imported 2026-08-04)
- [ ] **Nullfolio iOS 1.0 is REJECTED — has been since 2026-07-22, unnoticed.** App ID `6788180394` (`com.nulljosh.portfolio`), version id `cc1a2e3a-7d19-4981-bbd2-1b291077fb90`, submission `0ebad2f8-da32-4727-9be0-a00dce3719e5`, state `UNRESOLVED_ISSUES` (submitted 2026-07-22 07:48 UTC via API Key). `asc review doctor --app 6788180394` confirms 1 blocking error but the actual rejection text lives in App Review's Resolution Center, which is web-UI-only — read it at appstoreconnect.apple.com, fix, then resubmit (`asc versions attach-build` + `asc review submissions-submit --confirm`).
