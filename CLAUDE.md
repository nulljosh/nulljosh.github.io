# Claude Notes

## Project

Static personal site for `heyitsmejosh.com`. v3.0.0.

## Important files

- `index.html` - the root: Joshua Tree booting live in portfolio mode (frames joshuatree.heyitsmejosh.com/?full&portfolio)
- `classic.html` - the old text homepage, linked from the root as "Classic site"
- `CNAME` - custom domain
- `robots.txt` - crawler directives
- `sitemap.xml` - search engine sitemap

## Directories

- `pwa/` - installability only: manifest, favicon, apple-touch-icon, maskable icons, og-image
- `fonts/` - Geist woff2 font files
- `notes/` - redirect stub to notes.heyitsmejosh.com
- `echo/` - redirect stub to echo.heyitsmejosh.com (Voxprint privacy policy)
- `themes/` - retired token files (Fez, Fredrika, 30s, Sage, Bending Spoons), kept for reference, not loaded
- `scripts/` - maintenance scripts
- `ios/`, `watchos/` - dev-only companion wrappers, not shipped to the App Store

## Style

`tokens.css` is the canonical design system, Jaybulb: `#ffca30` bulb accent (solid block,
never a tint) from maybulb.com, merged 2026-09-10 with an Apple liquid-glass system extracted
via /vibe from apple.com — SF Pro type, -0.374px tracking, rounded geometry (`--radius:20px`),
translucent blurred `.glass` surfaces (`--glass-bg`/`--glass-blur`/`--glass-border`), and real
shadows again (`--shadow-sm/md/lg`). Dark mode inverts the ink only; the bulb yellow never changes.

The portfolio itself runs on `tokens-lovefrom.css`, lovefrom.com-derived, extracted
2026-08-25 via /vibe: #fafafa on #000, no radius, no shadows, links with no underline that
fade to 50% ink. The type is NOT LoveFrom's, the serif (EB Garamond) was rolled back
2026-08-28 for the system sans stack (San Francisco → Helvetica Neue → Helvetica → Arial).
**No serif webfonts on any project, standing instruction, do not reintroduce one.** No webfont is loaded on the portfolio.
The stylesheet link carries a `?v=YYYYMMDD` cache-buster, **bump it whenever
`tokens-lovefrom.css` changes**. Cloudflare fronts the zone and caches CSS by extension, so
without a new URL the edge keeps serving the old tokens and the change never reaches anyone.
Every app site should link `https://heyitsmejosh.com/tokens.css` rather than redefining colors.
The no-new-themes rule guards `tokens.css`: it is the shared Jaybulb system every app site
consumes, so never repaint it for a portfolio-only look, change the portfolio's own token file
instead. Retired themes (Fez, Fredrika, 30s, Sage, Bending Spoons) are parked in `themes/`.

## Work list ordering

`#workList` is five picks, no more. Only apps READY_FOR_SALE on every platform they target
(check the ASC ledger, `wiki/pages/asc-status.md`), ranked by how much shipping they have behind them. The homepage shows only those five plus a link to `apps.html`,
which lists everything (picks included), grouped by kind: Life, Read, Make, Play, Dev, Client. The group label sits in
the `.year` slot of the group's first row. Within a group, App Store apps first. New project =
one `<li>` in its group in `apps.html`, and bump the count there and in the homepage link.
No runtime GitHub sync. It was removed 2026-09-20: every subdomain rename made it append a dupe.
Journal lives in Writing, not Work.

## Working rules

- No build step
- Preview by opening `index.html`
- Deploy by pushing to `main`
- Keep edits lightweight unless asked otherwise

## Open
- [ ] Animated Animoji avatar, BLOCKED, needs user to export and provide an actual Animoji file (video/sticker/Lottie); no usable asset exists in repo.

## iOS app icon, regeneration rule (2026-07-12)
The recurring TestFlight icon scaling glitch came from hand-exporting `icon.svg` (intrinsic 200×200, rounded corners) into the 1024 slot, sometimes at intrinsic size, always double-masked by iOS. Never export by hand: run `scripts/make-appicon.sh`, renders at 1024, flattens corners onto bg, asserts 1024×1024/no-alpha.
