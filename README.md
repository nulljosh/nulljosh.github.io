<img src="icon.svg" width="80">

# nulljosh.github.io

![version](https://img.shields.io/badge/version-v3.0.0-blue) ![license](https://img.shields.io/badge/license-MIT-green) [![GitHub](https://img.shields.io/badge/GitHub-nulljosh%2Fnulljosh.github.io-black?logo=github)](https://github.com/nulljosh/nulljosh.github.io)

Personal site and project hub at [heyitsmejosh.com](https://heyitsmejosh.com).

## Projects

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `notes/` | Personal reference site |

## Stack

Static HTML, CSS, JavaScript. No build step. Geist font family (woff2, `font-display: swap`). Live API integrations: GitHub, Letterboxd, Trakt, Open-Meteo weather, Jekyll blog feed.

## Deploy

Push to `main`. GitHub Pages deploys via Actions. Custom domain via `CNAME`.

## Roadmap
- [ ] Replace the off-white background with a lighter true white; once the hue is locked, replace all whites across the project with it
- [ ] Set Vercel API token for iOS app (vercel.com/account/tokens → create token → wire to claude-usage-ios)
- [ ] Add echo.heyitsmejosh.com CNAME record to Cloudflare (Name: echo, Content: nulljosh.github.io)

## License

MIT 2026 Joshua Trommel
