<img src="icon.svg" width="80">

# nulljosh.github.io

![version](https://img.shields.io/badge/version-v3.0.0-blue)

Personal site and project hub at [heyitsmejosh.com](https://heyitsmejosh.com).

## Projects

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `1971/` | History project |
| `bcgd/` | BC Garage Doors landing page |
| `books/` | Reading tracker |
| `brief/` | Article summarizer |
| `chi/` | Room calculator |
| `notes/` | Personal reference site |
| `scroll/` | Scroll feed experiment |

## Stack

Static HTML, CSS, JavaScript. No build step. Geist font family (woff2, `font-display: swap`). Live API integrations: GitHub, Letterboxd, Trakt, Open-Meteo weather, Jekyll blog feed.

## Deploy

Push to `main`. GitHub Pages deploys via Actions. Custom domain via `CNAME`.

## Roadmap
- [ ] Fix Trakt API key — set TRAKT_API_KEY in Vercel env (trakt.tv → Settings → API → copy key → `vercel env add TRAKT_API_KEY production` → `vercel --prod`)
- [ ] Set Vercel API token for iOS app (vercel.com/account/tokens → create token → wire to claude-usage-ios)

## License

MIT 2026 Joshua Trommel
