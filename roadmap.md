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

## App Store submission freeze — LIFTED 2026-08-18
Freeze lifted 2026-08-18 (Guideline 5.6 suspension expired). Submitted that day and now
WAITING_FOR_REVIEW: Curvely iOS 1.2.0, Wiretext iOS 1.1.0, Wordroot iOS 1.0, Healstack iOS 2.3.4.
**Held pending those four verdicts — never a batch:** Sparkjar iOS+Mac, BCGD iOS+Mac, Wordroot Mac,
Lexly Mac. All six are `asc validate` clean (0 errors, 0 blocking) with a VALID build attached, so
each is one `asc review submit` away. Do not submit until the in-flight verdicts land.

## Braindump 2026-08-19
- [ ] Nullfolio: refresh the app and ship a new version (App Store record was closed 2026-08-11 — confirm whether reviving or re-creating).

## Braindump 2026-08-19
- [ ] Vibe-clone https://cmux.com/ — run /vibe on it, extract tokens, apply to portfolio

## Ingested 2026-08-22
- **CLOSED 2026-08-25** (the Nullfolio App Store track was abandoned 2026-08-11 — the record 6788180394 is one of three orphans slated for deletion via Apple Support, not a product to fix. Its iOS 1.0 is still REJECTED and will stay that way). Was: **Nullfolio App Store rejection — Guideline 2.3.8 Accurate Metadata** (submission 0ebad2f8-da32-4727-9be0-a00dce3719e5, reviewed 2026-08-04, iPhone 17 Pro Max, v1.0 build 202607211542). Marketplace name is "Nullfolio" but the name displayed on device is "Joshua Trommel". One-line fix: set `CFBundleDisplayName`/`CFBundleName` to Nullfolio. Do not change the bundle identifier.
### DECIDED 2026-08-22: Nullfolio App Store app is abandoned.
A personal portfolio cannot pass Guideline 4.2 — Apple names repackaged personal
sites as not app-like, so there is no build that fixes it while it stays a
portfolio. Retrying it also spends review goodwill on a zero-reach app record
while Healstack, Lexly and Sparkjar sit in the same queue, on an account that was
already suspended once under 5.6. The portfolio is already live on the web at
heyitsmejosh.com, so the app adds nothing but a rejection record.
The only version worth building is a different product: a portfolio *builder*
other people use. That is a new app, not a resubmit.
- [ ] Manual step (Joshua, ASC dashboard): remove the Nullfolio app record (id 6788180394). No API exists for deleting an app record.
- [ ] ~~Guideline 4.2 Minimum Functionality~~ — moot, see decision above.
- [ ] (superseded) **Nullfolio rejection — Guideline 4.2 Minimum Functionality.** "The app does not provide sufficient content and features to be useful, unique, and app-like." Needs real added functionality, not a metadata tweak. Note: memory records Nullfolio as CLOSED 2026-08-11 — decide whether to revive or formally abandon this app record before spending on 4.2.
- [ ] Vibe-clone Nous Research's site aesthetic into the portfolio (from Notes: "Nous research / Portfolio / Vibe clone nous into our portfolio").

## Rename: heyitsmejosh.com → jaybulb.com

`jaybulb.com` and `joybulb.com` are both unregistered as of 2026-08-24. Jaybulb it is.
Slow migration — nothing breaks at any step:

1. Register `jaybulb.com`, add the zone to Cloudflare (same account as heyitsmejosh.com).
2. Point `jaybulb.com` at the same GitHub Pages / Pages deploy. Both domains serve the site.
3. Move app subdomains one at a time (`epiphany.jaybulb.com`, …), keeping the old ones
   as 301s. ~20 subdomains, so do these in batches when touching each app anyway.
4. Update `CNAME`, canonical/OG URLs, `sitemap.xml`, ASC support/marketing URLs, resume.
5. Once App Store metadata is all on jaybulb.com, 301 the apex heyitsmejosh.com → jaybulb.com.
6. Keep heyitsmejosh.com renewed indefinitely — old App Store listings link to it.

## Link audit 2026-08-24

- [ ] `letterboxd.com/literallyjordan/` (index.html) returns 403 to curl even with a browser UA — likely Letterboxd bot protection rather than a dead profile. Verify in a real browser; only change the link if it actually 404s there. Every other outbound link on index.html returned 200 in this audit.

## From Apple Notes (imported 2026-08-25)

- [ ] Top description is a bit wordy. Clean it up — make it more like a business card than life story paragraphs.
