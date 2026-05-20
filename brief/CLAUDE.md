# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What it is

Static litigation planning tool for Trommel v. AG Canada. Not a generic case analyzer. No build step.

**Lawyer status (as of 2026-05-16):** Full email blitz sent. Awaiting responses.
- Paul Kent-Snowsell (pgkent@kswlawyers.ca) — voicemail + email sent
- DLA Law / Ingrid (Ingrid@dlalaw.ca) — email sent (follow-up)
- Cameron Ward (cward@cameronward.com) — email sent 2026-05-16
- Arvay Finlay (arvayfinlay.ca) — email sent 2026-05-16
- Klein Lawyers (callkleinlawyers.com) — email sent 2026-05-16
- CBA BC (info@cbabc.org) — email sent 2026-05-16
- McQuarrie Hunter LLP (604-581-7001) — voicemail left
- Sean Hern Law Corp (604-684-9151) — not yet contacted
- BCCLA referral line (604-687-2919) — not yet contacted
- Aitken Robertson — phone out of order

## Deployment

Push to main. GitHub Pages serves it at `heyitsmejosh.com/brief`. Cache bust by bumping the `?v=N` query param on `<link>` and `<script>` tags in `index.html` after any CSS or JS change.

## CRITICAL — `<base>` tag

`index.html` MUST have `<base href="/brief/">` as the second tag in `<head>` (right after `<meta charset>`). Without it, accessing `heyitsmejosh.com/brief` (no trailing slash) causes all relative URLs (`style.css`, `script.js`, `manifest.json`) to resolve to the wrong path and the page loads completely unstyled. Never remove this tag.

## Architecture

`script.js` executes after DOM is ready (script tag at bottom of body).

`renderGrounds(containerId, suffix)` is called twice — Case tab (`grounds-case`, `''`) and Money tab (`grounds-money`, `'2'`). Same `GROUNDS` array, independent accordion state. Suffix avoids `dataset.id` collisions.

`renderJournal()` reads `localStorage.brief.journal`, merges with `JOURNAL_SEED`, sorts newest-first, renders into `#journal-list`. The "+ Entry" button shows an inline form; saves to localStorage and re-renders. Seed entries are never modified by user additions — they merge by date key.

`sw.js` is a cache-first service worker registered at `/brief/sw.js` scope. Bump `CACHE` version string when deploying CSS/JS changes to force cache refresh.

Accordion click handlers are attached by a `querySelectorAll('.grounds')` loop after `renderGrounds()` runs — order matters.

## Data locations

- **Legal grounds** (title, Charter section, damage range, description, citation): `GROUNDS` array in `script.js`.
- **Checklist items**: `.cl-item` divs in `index.html` `#checklist`. Each must have a unique `data-i` starting at 0.
- **Pain journal entries**: `JOURNAL_SEED` array in `script.js`. User-added entries live in `localStorage.brief.journal`. To add entries via code, append to `JOURNAL_SEED`.
- **Call script**: `const SCRIPT` at the top of `script.js`.

## Critical invariant

`const TOTAL = 17` in `script.js` must equal the number of `.cl-item` divs in `index.html` (currently 17, data-i 0–16). These are not linked automatically — update both together or the progress bar will be wrong.

## Design system

Apple Liquid Glass variant — dark/paper themes toggled via `body[data-theme="dark"|"paper"]`, persisted to `localStorage`. Fonts: Inter Tight only (Google Fonts CDN). Color tokens defined as CSS custom properties in `style.css`: `--danger`, `--warn`, `--accent`, `--green`, `--mid`, `--muted`.

## New case facts (added 2026-05-13)

- **Wrist injury**: Subject had a pre-existing wrist fracture that was directly aggravated/reinvigorated by the prone restraint. Added to Facts grid and Excessive Force ground description. Strengthens special damages head.

## Comparables research shortcut

To refresh comparables, run these four searches and update `renderDamageScale()` in `script.js`:

1. `Canada Charter damages police misconduct RCMP BC large award millions`
2. `BC RCMP wrongful detention excessive force settlement award`
3. `largest police excessive force government lawsuit settlement billion worldwide`
4. `Langley Fraser Valley RCMP lawsuit settlement civil damages`

Current anchors (update when new cases surface):
- Canadian floor: Degen v. Min. Public Safety 2023 BCSC $317k (Surrey RCMP, PTSD)
- **Closest fact parallel: Wang v. AG Canada (BC RCMP, 2021)** — Kelowna wellness call, officer dragged/assaulted semi-conscious student, criminally convicted, RCMP settled civil claim (confidential). Proves RCMP settles this exact category.
- Canadian ceiling: Henry v. BC 2016 BCSC $8.1M (wrongful conviction — not directly comparable but shows Charter can reach millions)
- US wellness call parallel: Elijah McClain $15M USD (Aurora PD, 2023 — closest fact pattern)
- US ceiling: Randy Cox $45M USD (in-custody paralysis, 2023)
- Systemic: NYC $1.94B FY2024, US top-25 $3.2B/decade

## Auth + sync

Email + password auth (two-step Facebook-style flow). Auth gate: jatrommel@gmail.com only.

- Supabase project: spark (`tjsxsqlxjmanwvmywwvw.supabase.co`)
- Tables: `brief_journal`, `brief_checklist`, `brief_lawyer_status` — all RLS-protected
- Web: supabase-js CDN, two-step overlay (email → avatar confirm → password), session persists via localStorage JWT
- iOS/macOS: supabase-swift SPM, @MainActor Store, email+password (`sbClient.auth.signIn(email:password:)`)
- **First login**: set password via Supabase dashboard > Auth > Users > jatrommel@gmail.com > Send password reset email

## Claude auto-scan (no-auth solution)

Brief's data is in Supabase. To scan without touching the web UI:
```
KEY=$(security find-generic-password -s brief-supabase-service-role -a service_role -w)
curl "https://tjsxsqlxjmanwvmywwvw.supabase.co/rest/v1/brief_checklist?select=*" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY"
```
Store the service role key once: `security add-generic-password -s brief-supabase-service-role -a service_role -w "KEY"`

## Rules

- No build system — do not add Vite, npm, or bundlers
- No `innerHTML` — use DOM methods (`createElement`, `textContent`, `appendChild`)
- All ground content lives in the `GROUNDS` array; do not hardcode ground divs in HTML
- Tabs wired via `data-tab` attribute → `panel-{tab}` ID; Money tab triggers `animateBars()` on switch
