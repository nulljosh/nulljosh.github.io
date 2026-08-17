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

## App Store submission freeze — until 2026-08-18
- [ ] **BLOCKED: no App Store submission on any app until 2026-08-18.** (STILL ACTIVE — do not check this off before Aug 18; a /night wrap incorrectly closed it 2026-08-11.) Account is under a Guideline 5.6 Developer Code of Conduct review suspension (Curvely, Transcriptly, Wiretext, NYC Survive). Apple warns that continued similar submissions may result in removal from the Apple Developer Program. Full detail: wiki `ship-plan.md` § "Guideline 5.6 suspension (2026-08-10)". TestFlight builds, pushes and web deploys are still fine. This is a general account block, not specific to any one app.
