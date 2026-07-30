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
- [ ] Automatic project name/URL refresh in the site when a project is renamed — SCOPED 2026-07-28: `index.html` hardcodes each project as a static `<li><a>` with name/URL/tagline/platforms, no data file, no build step (CLAUDE.md: "No build step" is a deliberate convention). Automating this means a generator script parsing `~/Documents/Code/CLAUDE.md`'s project table, but that table lacks the taglines/platform lists/years shown per entry — needs a second source of truth or richer per-repo metadata before a generator is worth building. M-effort, not a quick fix; deferred.

## Ingested 2026-07-25
- [ ] Stale Cloudflare Pages project `nulljosh-portfolio.pages.dev` still exists and may still hold `heyitsmejosh.com` as a custom domain — delete the project (or at least detach the domain) so it can't hijack the apex again. Blocked: the `CLOUDFLARE_DNS_TOKEN` in `~/.config/fish/secrets.fish` is DNS-scoped only (`/accounts` returns empty) and no working `wrangler` is installed (`npx wrangler` fails on a workerd binary error). Needs a Pages-scoped API token or a `wrangler login`.

## From App Store.pdf (imported 2026-07-28)
- [ ] Ship a macOS version of Nullfolio (ASC 6788180394).

## From App Store.pdf (imported 2026-07-29)
- [ ] Nullfolio: icon is correct in repo/build but ASC/TestFlight listing still shows a stale plain orange "N" — needs a resubmit/reprocess to clear the stale cached icon.
