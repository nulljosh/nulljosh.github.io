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

## Live API integrations

Homepage pulls live data client-side:
- GitHub API (public repo count + contribution heatmap)
- Letterboxd (film count via CORS proxy)
- Trakt.tv (episode count via API)
- Open-Meteo (weather for Langley, BC)
- Jekyll blog feed (latest post from journal.heyitsmejosh.com)

All stats cached in localStorage for 24h.

## Working rules

- No build step
- Preview by opening `index.html`
- Deploy by pushing to `main`
- Keep edits lightweight unless asked otherwise

## Imported from Portfolio.pdf (2026-06-21)
- [ ] Animated Animoji avatar — BLOCKED, needs user to export and provide an actual Animoji file (video/sticker/Lottie); no usable asset exists in repo.

## Imported from Portfolio.pdf (2026-06-28)
- [x] Remove all arrow/symbol characters (↗, →, −) from HTML — done 2026-06-28
- [x] Replace off-white background (#fbfbfb) with true white (#ffffff) — done 2026-06-28
- [x] Trim BSc timeline copy (removed the justification sentence) — done 2026-06-28
- [x] Swap School for Lingo in work table — done 2026-06-28

## Imported from Portfolio.pdf (2026-06-21)
- [x] Projects list has way too much detail per card — trim copy to be more scannable. Applied 2026-06-21: Epiphany/Talli/Echo bullets shortened, NYC added as 4th featured card (was in "Also building"), GitHub repos cache TTL shortened 24h → 1h for accuracy.
