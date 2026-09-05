# Claude Notes

## Project

Static personal site for `heyitsmejosh.com`. v3.0.0.

## Important files

- `index.html` - main homepage
- `CNAME` - custom domain
- `og-image.jpg` - social share card
- `favicon.svg` - browser icon
- `robots.txt` - crawler directives
- `sitemap.xml` - search engine sitemap

## Directories

- `fonts/` - Geist woff2 font files
- `notes/` - personal reference site (styled HTML, theme toggle)
- `scripts/` - maintenance scripts

## Style

`tokens.css` is the canonical design system, Jaybulb, derived from maybulb.com (2026-08-24).
Signature: `#ffca30` used as a solid block (never a tint), black on white, square corners
(`--radius:0`), no shadows, 2px yellow rules between sections, geometric sans (Europa → Avenir Next → Geist).
Dark mode inverts the ink only; the bulb yellow never changes.

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

The `#work` list in `index.html` is ranked by App Store status: submitted/live on the App
Store first, not-on-the-App-Store last (Labs stays last). Within a tier, keep the existing
relative order. The `2026` year label anchors the first row only, so it moves with whatever
ends up on top.

## Working rules

- No build step
- Preview by opening `index.html`
- Deploy by pushing to `main`
- Keep edits lightweight unless asked otherwise

## Open
- [ ] Animated Animoji avatar, BLOCKED, needs user to export and provide an actual Animoji file (video/sticker/Lottie); no usable asset exists in repo.

## iOS app icon, regeneration rule (2026-07-12)
The recurring TestFlight icon scaling glitch came from hand-exporting `icon.svg` (intrinsic 200×200, rounded corners) into the 1024 slot, sometimes at intrinsic size, always double-masked by iOS. Never export by hand: run `scripts/make-appicon.sh`, renders at 1024, flattens corners onto bg, asserts 1024×1024/no-alpha.
