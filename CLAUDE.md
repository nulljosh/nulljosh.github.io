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

- `1971/` - history project
- `bcgd/` - BC Garage Doors landing page
- `books/` - reading tracker
- `brief/` - Charter litigation tool (multi-case: Trommel v. AG Canada + Trommel v. Trommel). DEPLOY-ONLY MIRROR of `apps/brief/web/` (the canonical source). Do NOT hand-edit here; it is overwritten by `apps/brief/web/deploy.sh` (auto-run by the apps pre-push hook). `family/` standalone below is redundant (folded into brief as the Family tab) - flag for later removal.
- `chi/` - room calculator (Vite app with dist/)
- `family/` - private legal brief: Trommel v. Trommel (CASE-0002). PIN-locked. `index.html` + `style.css` + `script.js`.
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
