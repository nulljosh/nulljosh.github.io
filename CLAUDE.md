# Claude Notes

## Project

Static personal site for `heyitsmejosh.com`. v2.2.1.

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
- `brief/` - article summarizer (Vite app with dist/)
- `chi/` - room calculator (Vite app with dist/)
- `fonts/` - Geist woff2 font files
- `notes/` - personal reference site (styled HTML, theme toggle)
- `scripts/` - maintenance scripts
- `scroll/` - scroll feed experiment

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
