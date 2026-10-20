# Claude Notes

## Project

Static portfolio for `jaybulb.com`. v3.0.0.

## Important files

- `index.html` - the root: yellow sidebar, one project list, footer band
- `CNAME` - custom domain
- `robots.txt` - crawler directives
- `sitemap.xml` - search engine sitemap

## Directories

- `pwa/` - installability only: manifest, favicon, apple-touch-icon, maskable icons, og-image
- `notes/` - redirect stub to notes.heyitsmejosh.com
- `echo/` - redirect stub to echo.heyitsmejosh.com (Voxprint privacy policy)
- `themes/` - retired token files (Fez, Fredrika, 30s, Sage, Bending Spoons), kept for reference, not loaded
- `scripts/` - maintenance scripts
- `ios/`, `watchos/` - dev-only companion wrappers, not shipped to the App Store

## Style

Two systems, kept apart:
- `tokens.css` is the shared Jaybulb system every app site loads (Orchard edition: clay accent, cream paper, 12px radius). Never repaint it for a portfolio look; it changes 30 sites.
- The portfolio runs on `brand/tokens.css` (bulb yellow, black ink, white paper, warm footer band) with the kit in `brand/BRAND.md`. Bump its `?v=` in `index.html` when it changes, Cloudflare caches CSS.

System font only. No webfonts, no serif. `tokens-lovefrom.css` is legacy, only `docs.html` still loads it. Retired themes sit in `themes/`.

## Project list

One list: `#apps` in `index.html`, every project one `<li>`, no hero, no second list. `apps.html` redirects to `/#apps`.
Before deploying run `python3 scripts/sync-projects.py` (`--dry` to preview). It keys every row to its GitHub repo or labs
folder, so renames can't add dupes, drops rows that are archived, gone, or quiet for 120 days (App Store apps stay),
and adds new public repos with a jaybulb.com homepage. Names, blurbs and prices are hand-curated; it never rewrites them.
Prices come from the public store (`itunes.apple.com/lookup?id=`), not from guesses. Journal lives in Writing, not Work.

## Working rules

- No build step
- Preview by opening `index.html`
- Deploy with `sh scripts/deploy-jaybulb.sh` (Cloudflare Pages `jaybulb`). A push deploys nothing to jaybulb.com.
- Keep edits lightweight unless asked otherwise

## Open
- [ ] Animated Animoji avatar, BLOCKED, needs user to export and provide an actual Animoji file (video/sticker/Lottie); no usable asset exists in repo.

## iOS app icon, regeneration rule (2026-07-12)
The recurring TestFlight icon scaling glitch came from hand-exporting `icon.svg` (intrinsic 200×200, rounded corners) into the 1024 slot, sometimes at intrinsic size, always double-masked by iOS. Never export by hand: run `scripts/make-appicon.sh`, renders at 1024, flattens corners onto bg, asserts 1024×1024/no-alpha.
