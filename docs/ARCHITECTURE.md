# Architecture

The portfolio site at heyitsmejosh.com is a static site listing all apps, projects, and an index of work. Built with vanilla HTML/CSS/JavaScript. No build step, no framework, no dependencies. Pages are linked manually. The site is deployed via GitHub Pages and is also served at heyitsmejosh.com via a custom domain.

## How it runs

User navigates to heyitsmejosh.com. GitHub Pages serves the static HTML. Pages link to individual app pages, which list features, screenshots, and links to the live site or app store. A theme picker switches between pre-defined color palettes. No dynamic content, no server-side rendering.

## Structure

| File | What it owns |
|---|---|
| `index.html` | Home page. Hero, headline, link to apps/docs. |
| `apps.html` | Gallery of all apps. Grid of app cards (name, icon, description, link). Fetched dynamically from `apps-data.js` or similar (if structured) or hand-coded. |
| `docs.html` | Documentation index. Links to whitepapers, READMEs, architecture docs across all repos. |
| `notes/index.html` | Redirect or landing for the notes app (if hosted here). |
| `privacy.html` | Privacy policy. |
| `echo/privacy.html` | App-specific privacy policies (echo is one example). |
| `tokens.css` | Design tokens. Primary color palette (blue, teal accents, neutrals). Variables for font, spacing, shadows. Shared across all pages. |
| `tokens-lovefrom.css` | Alternative theme palette (LoveFrom brand colors). Named after a design studio or project. |
| `themes/` | Alternative color palettes. `tokens-30s.css`, `tokens-bendingspoons.css`, `tokens-fez.css`, `tokens-fredrika.css`, `tokens-sage.css`. Named after design inspirations or client projects. Users can switch themes, persisted to localStorage. |
| `devices.css` | Device frame styling. iPhone, iPad, Mac, Android containers for screenshots. Used when embedding live apps or screenshots. |
| `onboarding.js` | First-run flow. Intro animation or welcome modal. May prompt users to choose a theme. |
| `sw.js` | Service worker. Caches the site shell and theme assets for offline support. |

## Colors and design

The portfolio uses the house design system: no purple, no teal, no gradients, no emojis. The primary palette is blue and neutral (grays). Accent colors are warm (amber, orange) or cool (cyan, but not teal). Each theme file redefines the CSS variables; switching themes is a matter of swapping `<link>` tags or dynamically updating CSS variables.

`tokens.css` is the primary theme. All pages default to it. `themes/` variants allow users to preview different color directions or test against brand guidelines from other projects.

## Technical decisions

- **No build step:** Every file is served as-is. No minification, no bundling, no transpilation. Keep HTML/CSS/JavaScript simple enough to work without tooling.
- **Static pages:** Each page is a separate `.html` file. No templating engine, no repeated content (or content is small enough to duplicate).
- **Theme switching:** A click handler in `onboarding.js` or a theme picker swaps the `tokens.css` link tag or mutates CSS variables. The choice is persisted to `localStorage`.
- **Offline support:** `sw.js` caches the core pages and theme files. Users can view the site even if GitHub Pages is temporarily down.

## Pages and content

| Page | Links to | Purpose |
|---|---|---|
| `index.html` | apps.html, docs.html, privacy.html | Home. Hero animation, intro copy, nav. |
| `apps.html` | App store/web links for each app | Gallery. Shows all 30+ apps. |
| `docs.html` | GitHub READMEs, whitepapers, ARCHITECTURE.md files | Documentation index. Helps discovery of technical depth. |
| Various app pages | e.g., curbfind.heyitsmejosh.com | (Not in this repo; hosted on Cloudflare.) |

## iOS and watchOS native apps

| File | Purpose |
|---|---|
| `ios/Sources/PortfolioApp.swift` | iOS app entry point. Displays the portfolio as a native app (instead of mobile Safari). |
| `ios/OnboardingView.swift` | First-run intro and theme picker for the iOS app. |
| `watchos/PortfolioWatchApp.swift` | watchOS app entry point. Limited view of the portfolio on Apple Watch. |
| `watchos/Views/AboutView.swift` | About/bio view on watchOS. |
| `watchos/Views/WorkView.swift` | Portfolio/projects grid on watchOS. |
| `watchos/Models/PortfolioData.swift` | Data model. Holds app list and metadata for watchOS views. |

## Scripts

| File | Purpose |
|---|---|
| `scripts/sync-docs.sh` | Syncs documentation from all repos into a central docs index (optional; may not be in active use). |
| `scripts/make-appicon.sh` | Generates app icons for iOS and watchOS from a source image. |
| `scripts/simplify.sh` | Normalizes and lints the site structure. |
| `test.mjs` | Test suite. Verifies HTML validity, link correctness, theme CSS syntax. Run with `node test.mjs`. |

## Deployment

The site is hosted on GitHub Pages (automatic on push) and mirrored to heyitsmejosh.com via a custom domain (DNS configured in Cloudflare). No build workflow needed; GitHub serves the HTML directly.

## Gotchas

- **Custom domain DNS:** The CNAME file or GitHub Pages settings must point heyitsmejosh.com to nulljosh.github.io. If that's not set up, the custom domain won't resolve.
- **Reachability from apps:** Apps link back to the portfolio for sharing or app gallery discovery. Dead links hurt navigation. Keep the portfolio URL up to date if the domain ever changes.
- **Theme persistence:** `localStorage` is per-origin. If the user visits via `nulljosh.github.io`, then via `heyitsmejosh.com`, the theme choice is separate. This is by design (different origins = different storage).
- **No SSR or API:** Everything is static. If a page needs to show live data (e.g., "latest release version"), that must be fetched client-side via a fetch() call to a third-party API (e.g., GitHub releases API).
