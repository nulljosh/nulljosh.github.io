# Brief -- Claude Instructions

## Design System

Apple Liquid Glass. All UI follows these rules:

- `backdrop-filter: blur(20px)` on all card surfaces
- Frosted glass cards with `rgba(255, 255, 255, 0.06)` background and `rgba(255, 255, 255, 0.12)` border
- `-apple-system, BlinkMacSystemFont, 'SF Pro Display'` font stack
- Primary accent: `#0071e3` (Apple blue)
- Background: `#1a1a2e` (deep navy)
- Text: `#f5f5f7` (near-white), muted: `rgba(255, 255, 255, 0.55)`
- Status colors: green `#30d158`, yellow `#ffd60a`, orange `#ff9f0a`, red `#ff453a`
- Border radius: `16px` cards, `100px` buttons/tags (pill shape)
- Spring physics on hover: `transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)`
- Cards lift on hover with `translateY(-2px)` and box-shadow

## Rules

- No emojis anywhere (code, comments, UI text, commit messages)
- Mobile-first CSS. Base styles target small screens, scale up with media queries
- `clamp()` for responsive font sizes
- Section labels: `0.75rem`, `0.12em` letter-spacing, uppercase, muted color
- All buttons are pill-shaped (`border-radius: 100px`)
- Use `animate.css` classes for entrance/exit animations
- Keep files under 100 lines

## Project Structure

```
index.html          Single page shell, loads src/main.js as ES module
src/
  main.js           Bootstrap, DOM bindings, event handlers, state reset
  analysis.js       Legal analysis engine (keyword detection, area matching, scoring)
  ui.js             Template rendering (results grid, loading spinner)
  style.css         Design tokens (:root vars), reset, glass-card primitive, buttons
  hero.css          Hero headline, subline, textarea input card
  results.css       Strength gauge, issues list, area tags, steps timeline, disclaimer
  layout.css        Footer, loading spinner, secondary button
```

## Analysis Engine (src/analysis.js)

Mock keyword-based analysis. Five legal areas: employment, landlord-tenant, personal injury, consumer protection, family law. Each area has a keyword list, label, and issue templates. Scoring formula:

- Base: 30 points
- Text length bonus: up to 25 points (length / 15, capped)
- Area count bonus: 8 points per matched area
- Keyword hit bonus: 3 points per hit
- Max: 95

This module is designed to be swapped for a real AI backend (API call) without changing the rest of the app. The `analyzeCase()` export returns a Promise with `{ strength, strengthLabel, issues, areas, steps }`.

## Local Development

```bash
npm install
npm run dev       # Vite dev server with HMR
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

## Deployment

Vercel. Static site, no server-side logic. `npm run build` outputs to `dist/`.

## Quick Commands
- `./scripts/simplify.sh`
- `./scripts/monetize.sh . --write`
- `./scripts/audit.sh .`
- `./scripts/ship.sh .`
