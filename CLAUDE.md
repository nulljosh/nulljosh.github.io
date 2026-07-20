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

Fredrika restyle (2026-07-13): `tokens-fredrika.css`, Geist + Instrument Serif, theme toggle, light + dark via `prefers-color-scheme`. Sage (`tokens-sage.css`) retired. Static page — no client-side API integrations.

## Working rules

- No build step
- Preview by opening `index.html`
- Deploy by pushing to `main`
- Keep edits lightweight unless asked otherwise

## Open
- [ ] Animated Animoji avatar — BLOCKED, needs user to export and provide an actual Animoji file (video/sticker/Lottie); no usable asset exists in repo.

## iOS app icon — regeneration rule (2026-07-12)
The recurring TestFlight icon scaling glitch came from hand-exporting `icon.svg` (intrinsic 200×200, rounded corners) into the 1024 slot — sometimes at intrinsic size, always double-masked by iOS. Never export by hand: run `scripts/make-appicon.sh` — renders at 1024, flattens corners onto bg, asserts 1024×1024/no-alpha.
