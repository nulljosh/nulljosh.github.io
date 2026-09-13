# Portfolio Technical Whitepaper

**v3.0.0** | August 2026

Shipping a lot of small apps only counts if someone can find them. [heyitsmejosh.com](https://heyitsmejosh.com)
exists as the one front door to everything I've built, so a link to one project
doubles as a link to all of them. Static HTML, CSS and JavaScript, no build
step, on GitHub Pages, because a portfolio that needs a pipeline to update is a
portfolio that stops getting updated.

## Problem

A portfolio decays the moment it is a snapshot. Hand-written project lists, "last
updated" dates, and pasted stats all go stale between edits. The fix is to make the
page read live sources at request time so it cannot lie about what is current.

## Architecture

No framework, no bundler, no build. The site is HTML plus ES modules loaded directly
by the browser, which means the deployed file is the source file, what is in the
repo is exactly what runs, so there is never a build artifact to go stale or a
step that can fail silently between commit and page.

Live integrations, each fetched client side with its own failure boundary:

| Source | Provides |
|--------|----------|
| GitHub API | Repository list, activity, commit recency |
| Letterboxd | Recent films |
| Trakt | Watch history |
| Open-Meteo | Local weather |
| Jekyll feed | Blog posts |

A failed source renders nothing rather than blocking the page, because the page's
job is to show what I've built, not to prove every third-party API is up, so one
dead API never takes the site down.

## Typography and design system

Geist, self-hosted as woff2 with `font-display: swap`, so the first paint is never
blocked on a font file. Colors and spacing come from the shared token set published
at [heyitsmejosh.com/tokens.css](https://heyitsmejosh.com/tokens.css), which the
other projects consume too, because a fleet of apps that each defined their own
palette would drift out of sync the first time one got a redesign and the rest didn't.

The resume lives inline in `index.html` rather than as a linked PDF, because a PDF
is a copy that goes stale the moment the page changes around it: one page, one
URL, always in sync with the site around it.

## Deploy

Push to `main`. GitHub Actions publishes to GitHub Pages, custom domain via `CNAME`.
Deploy time is the time it takes to copy files, because nothing is compiled.

## Design decisions

- **No build step.** The build is the most common thing to break in a site that gets
  edited twice a month, and a broken build on an infrequently touched site can sit
  undetected for weeks.
- **Client-side fetch over generated content.** A static generator would need a
  scheduled rebuild to stay current; fetching at view time cannot go stale, which
  matters more here than raw load speed.
- **Shared tokens.** The design system is a URL, not a copy in every repo, so a
  palette change is one edit instead of one edit per app.

## License

MIT 2026, Joshua Trommel
