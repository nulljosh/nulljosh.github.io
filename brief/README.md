<img src="icon.svg" width="80">

# Brief

![v2.1.0](https://img.shields.io/badge/version-2.1.0-blue)

Litigation planning tool for Trommel v. Attorney General of Canada. Charter violations from a warrantless wellness-call entry, Langley BC, August 2023. Ultimate deadline August 2038 (discoverability active).

## Features

- 8 legal grounds with Charter citations and damage ranges
- Outcome scenarios with probability bars and comparable awards scale
- Evidence checklist with localStorage persistence
- Limitation countdown (August 2026)
- 4 lawyer contacts + call script
- In-app pain journal, add entries without editing code
- Dark / Paper theme with persistence
- PDF export via print
- PWA, installable from Safari, works offline

## Stack

- Vanilla HTML / CSS / JS, no framework, no build step
- GitHub Pages, deploys on push to main
- localStorage, checklist state, theme, journal entries

## Structure

```
index.html            Page shell + PWA meta
style.css             Design tokens, layout, @media print
script.js             Grounds data, journal, accordion, checklist, theme
sw.js                 Service worker, cache-first, offline support
manifest.json         PWA manifest
apple-touch-icon.png  iOS home screen icon (180×180)
```

## Roadmap
- [ ] Graph: show a dynamic date in the top-right, matching the header date
- [ ] Case 0003 (granny's case) is not rendering while 0002 is - restore it and investigate why it was dropped
- [ ] Decide whether to keep the tweaks/toggle button; apply that decision consistently across all projects

### v3.0.0, Multi-user / Open-Ended Case Tool

Make Brief a generic litigation planner, not hardcoded to one case.

- **Auth**: Registration + login (email/password). Supabase Auth or similar.
- **Per-user case storage**: Each account gets private case data, grounds, checklist, journal, lawyer contacts. Cases are private by default.
- **Profile page**: Manage account, view all cases, basic settings.
- **Multi-case support**: Create/switch between multiple cases per user.
- **Data migration**: Export current localStorage state to seed a new account's first case.
- **Skills to build first**: `supabase-auth`, `case-crud` (create/read/update/delete cases), `user-profile`.

This is a significant rearchitecture, localStorage becomes Supabase tables, all reads/writes go through the API. Plan for a weekend session with full token budget.

## License

MIT 2026 Joshua Trommel
