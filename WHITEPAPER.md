# Portfolio Technical Whitepaper

**v3.0.0** | August 2026

Me, on the internet. [heyitsmejosh.com](https://heyitsmejosh.com) is the front door
to everything I've shipped. Static HTML, CSS and JavaScript, no build step, on
GitHub Pages.

## Problem

A portfolio decays the moment it is a snapshot. Hand-written project lists, "last
updated" dates, and pasted stats all go stale between edits. The fix is to make the
page read live sources at request time so it cannot lie about what is current.

## Architecture

No framework, no bundler, no build. The site is HTML plus ES modules loaded directly
by the browser, which means the deployed file is the source file, what is in the
repo is exactly what runs.

Live integrations, each fetched client side with its own failure boundary:

| Source | Provides |
|--------|----------|
| GitHub API | Repository list, activity, commit recency |
| Letterboxd | Recent films |
| Trakt | Watch history |
| Open-Meteo | Local weather |
| Jekyll feed | Blog posts |

A failed source renders nothing rather than blocking the page, so one dead API never
takes the site down.

## Typography and design system

Geist, self-hosted as woff2 with `font-display: swap`, so the first paint is never
blocked on a font file. Colors and spacing come from the shared token set published
at [heyitsmejosh.com/tokens.css](https://heyitsmejosh.com/tokens.css), which the
other projects consume too, one place to change the look of everything.

The resume lives inline in `index.html` rather than as a linked PDF: one page, one
URL, always in sync with the site around it.

## Deploy

Push to `main`. GitHub Actions publishes to GitHub Pages, custom domain via `CNAME`.
Deploy time is the time it takes to copy files, because nothing is compiled.

## Design decisions

- **No build step.** The build is the most common thing to break in a site that gets
  edited twice a month.
- **Client-side fetch over generated content.** A static generator would need a
  scheduled rebuild to stay current; fetching at view time cannot go stale.
- **Shared tokens.** The design system is a URL, not a copy in every repo.

## License

MIT 2026, Joshua Trommel
