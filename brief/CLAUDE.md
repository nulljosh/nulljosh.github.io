# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What it is

Static litigation planning tool — 3 cases. No build step.

**Cases:**
- CASE-0001: Trommel v. AG Canada (RCMP excessive force / Charter)
- CASE-0002: Trommel v. Trommel (family — appropriation of personality, IIMS)
- CASE-0003: Baitz v. City of Surrey (municipal slip-and-fall, s.285 notice)

**Lawyer status (as of 2026-05-26):**
- Paul Kent-Snowsell (KSW) — DECLINED May 18: "Not taking new cases." Referred Thomas Harding & Neil Chantler.
- DLA Law / Ingrid Eiermann — DECLINED May 15: "Not able to assist with your matter."
- Cameron Ward — DECLINED May 23: "I am no longer practising law." (retired)
- Arvay Finlay — DECLINED (confirmed via notes)
- Paul B. North-Brownell — DECLINED (contradictory response)
- Thomas Harding — NOT YET CONTACTED (PK referral, Degen $317k) — TOP PRIORITY
- Neil Chantler — NOT YET CONTACTED (PK referral) — TOP PRIORITY
- Klein Lawyers (callkleinlawyers.com) — emailed, awaiting
- CBA BC (info@cbabc.org) — emailed, awaiting
- McQuarrie Hunter LLP (604-581-7001) — voicemail left
- Sean Hern Law Corp (604-684-9151) — not yet contacted
- BCCLA referral line (604-687-2919) — contacted, referred but dismissed
- Gust Harris Law Corporation — not yet contacted
- Al-Qurashi Hunter LP (604-387-5957) — not yet contacted
- Aitken Robertson — phone out of order

## New case facts (added 2026-05-26)

- **Officer names**: Unknown — ATIP pending.
- **RCMP complaint file**: 2023-XCAP
- **PTSD therapy start**: August 2, 2025 (formal discoverability anchor for s.18 incapacity)

## Current version

**v6.0.0** — shipped 2026-05-26. Assets `?v=13`, sw.js `brief-v8`. Clean single-case redesign from Claude Design handoff. No auth overlay, no multi-case switcher.

## PIN Bypass

`?pin=7743` in the URL skips the Supabase auth overlay. Identical to normal post-login flow (`loadAndShow()`). Bookmark URL for parents' iMac: `heyitsmejosh.com/brief/?pin=7743`

## PDF Export

Run `/brief-pdf` (Claude skill) or `~/.local/bin/brief-pdf` directly. Outputs `~/Downloads/brief-YYYYMMDD.pdf` combining both cases. Uses Chrome headless + `@media print` (auth bypass built in) + pdfunite. Case switching via `?case=rcmp|family` URL param in `script.js`.

## Deployment

Push to main. GitHub Pages serves at `heyitsmejosh.com/brief`. Cache bust by bumping `?v=N` on `<link>` and `<script>` tags in `index.html`, and bumping `CACHE` in `sw.js`.

## CRITICAL — `<base>` tag

`index.html` MUST have `<base href="/brief/">` as the second tag in `<head>` (right after `<meta charset>`). Without it, accessing `heyitsmejosh.com/brief` (no trailing slash) causes all relative URLs to resolve to the wrong path.

## Architecture

`script.js` executes after DOM is ready (script tag at bottom of body).

**Case switching**: `body[data-activecase="rcmp|family|muni"]`. Show/hide via `.case-rcmp/.case-family/.case-muni`. Case switcher buttons: `.cs-btn[data-case]` in `.cs-switcher`. `setActiveCase(id)` in script.js.

**Tab switching**: `.rib[data-tab]` buttons → `#panel-{tab}` panels. Money tab triggers `animateBars()` on switch.

`renderGrounds(containerId, suffix)` called twice — Case tab (`grounds-case`, `''`) and Money tab (`grounds-money`, `'2'`). Suffix avoids `dataset.id` collisions.

`renderJournal()` reads `localStorage.brief.journal`, merges with `JOURNAL_SEED`, sorts newest-first. Journal is RCMP case only.

`sw.js` is a cache-first service worker. Bump `CACHE` version string on every deploy.

## Data locations

All per-case data lives in `script.js` as `const` arrays:

| Data type | RCMP | Family | Muni |
|---|---|---|---|
| Grounds | `GROUNDS` | `FAMILY_GROUNDS` | `MUNI_GROUNDS` |
| Stack heads | `STACK_HEADS` | `FAMILY_STACK_HEADS` | `MUNI_STACK_HEADS` |
| Scenarios | `SCENARIOS` | `FAMILY_SCENARIOS` | `MUNI_SCENARIOS` |
| Checklist | `CHECKLIST` | `FAMILY_CHECKLIST` | `MUNI_CHECKLIST` |
| Lawyers | `LAWYERS` | `FAMILY_LAWYERS` | `MUNI_LAWYERS` |
| Timeline | `TIMELINE` | `FAMILY_TIMELINE` | `MUNI_TIMELINE` |
| Call script | `SCRIPT` | `FAMILY_CALL_SCRIPT` | `MUNI_CALL_SCRIPT` |
| localStorage key | `CL_STORE` | `CL_STORE_FAMILY` | `CL_STORE_MUNI` |

**Stack units**: RCMP and Family values are in $k (200 = $200k). Muni values are also in $k (3.5 = $3.5k). `renderStack()` displays `v<1000` as `vk`, else as `(v/1000)M`. Total display is case-aware: muni shows `k`, others show `M`.

## Critical invariant

`const TOTAL = 17` in `script.js` must equal the number of `.cl-item` divs in `index.html` (RCMP checklist). MUNI and FAMILY checklists are JS-rendered; only RCMP uses the HTML `.cl-item` pattern.

## CASE-0003 specifics

- **Incident date**: unknown (placeholder `2026-05-24` in notice countdown — update when confirmed)
- **Location**: Main Street, Surrey BC
- **Injury**: Bilateral knee lacerations ("road rash"), minor injury classification
- **Key law**: BC Community Charter s.285 — 2-month written notice to municipality or claim barred
- **Range**: $6k–$12k likely; floor $5.5k (minor injury cap) + medicals
- **Grounds**: Occupiers Liability Act s.3 (grade A), Municipal Negligence / Marchi 2021 SCC (grade B), Notice requirement (prerequisite)
- **Notice**: Send to Surrey City Clerk, 13450 104 Ave, Surrey BC V3T 1V8. Registered mail + email.
- **Surrey PI lawyers**: Law Society BC 1-800-663-1919, Slater Vecchio LLP, Acheson Sweeney Foley Sahota (Surrey local)

## Design system

v5: `.cls` fixed banner, `.filebar` sticky, `header.cover` with SVG stamp, `section.tape` (RCMP limitation clock), `section.belt` (value columns), `nav.ribs` (tabs), `.section-hd` with roman numeral labels.

Apple Liquid Glass variant — dark/paper themes toggled via `body[data-theme="dark"|"paper"]`, persisted to `localStorage`. Fonts: Inter Tight only (Google Fonts CDN). Color tokens: `--danger`, `--warn`, `--accent`, `--green`, `--mid`, `--muted`, `--red`, `--red-soft`, `--red-line`.

## New case facts (added 2026-05-13)

- **Wrist injury**: Pre-existing fracture aggravated by prone restraint. Added to Facts grid and Excessive Force ground description.

## Comparables research shortcut

Current anchors:
- Canadian floor: Degen v. Min. Public Safety 2023 BCSC $317k (Surrey RCMP, PTSD)
- Closest fact parallel: Wang v. AG Canada (BC RCMP, 2021) — RCMP settled (confidential)
- Canadian ceiling: Henry v. BC 2016 BCSC $8.1M
- US wellness call parallel: Elijah McClain $15M USD (Aurora PD, 2023)
- US ceiling: Randy Cox $45M USD (2023)

## Auth + sync

Email + password auth. Auth gate: jatrommel@gmail.com only.

- Supabase project: spark (`tjsxsqlxjmanwvmywwvw.supabase.co`)
- Tables: `brief_journal`, `brief_checklist`, `brief_lawyer_status` — all RLS-protected
- Web: supabase-js CDN, two-step overlay

## Claude auto-scan (no-auth solution)

```
KEY=$(security find-generic-password -s brief-supabase-service-role -a service_role -w)
curl "https://tjsxsqlxjmanwvmywwvw.supabase.co/rest/v1/brief_checklist?select=*" \
  -H "apikey: $KEY" -H "Authorization: Bearer $KEY"
```

## Rules

- No build system — no Vite, npm, bundlers
- No `innerHTML` — use DOM methods (`createElement`, `textContent`, `appendChild`)
- All ground content lives in the data arrays; do not hardcode ground divs in HTML
- Tab buttons are `.rib`, not `.tab-btn` (v5 rename)
