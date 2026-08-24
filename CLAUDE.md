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

`tokens.css` is the canonical design system — Jaybulb, derived from maybulb.com (2026-08-24).
Signature: `#ffca30` used as a solid block (never a tint), black on white, square corners
(`--radius:0`), no shadows, 2px yellow rules between sections, geometric sans (Europa → Avenir Next → Geist).
Dark mode inverts the ink only; the bulb yellow never changes.

The portfolio itself stays on `tokens-fredrika.css` — the yellow was rolled back 2026-08-24.
Every app site should link `https://heyitsmejosh.com/tokens.css` rather than redefining colors.
Retired themes (Fez, Fredrika, 30s, Sage, Bending Spoons) are parked in `themes/` — don't add
a new one, edit `tokens.css`.

## Work list ordering

The `#work` list in `index.html` is ranked most- to least-shipped, using shipped platform
breadth as the metric (the `.meta` column): 4 platforms, then 3, then 2, then 1, then source-only
(Labs stays last). Within a tier, keep the existing relative order. The `2026` year label anchors
the first row only, so it moves with whatever ends up on top.

## Working rules

- No build step
- Preview by opening `index.html`
- Deploy by pushing to `main`
- Keep edits lightweight unless asked otherwise

## Open
- [ ] Animated Animoji avatar — BLOCKED, needs user to export and provide an actual Animoji file (video/sticker/Lottie); no usable asset exists in repo.

## iOS app icon — regeneration rule (2026-07-12)
The recurring TestFlight icon scaling glitch came from hand-exporting `icon.svg` (intrinsic 200×200, rounded corners) into the 1024 slot — sometimes at intrinsic size, always double-masked by iOS. Never export by hand: run `scripts/make-appicon.sh` — renders at 1024, flattens corners onto bg, asserts 1024×1024/no-alpha.
