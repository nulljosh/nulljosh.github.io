# Brief — Claude Notes

## What it is

Static litigation planning tool for a specific charter violation case (Trommel v. AG Canada). Not a generic case analyzer.

## Design System

Apple Liquid Glass variant — dark/paper themes, Inter Tight + JetBrains Mono, CSS custom properties in `style.css`.

Colors: `--danger` red, `--warn` amber, `--accent` blue, `--green`, `--mid` muted white, `--muted` dimmer.

## Structure

```
index.html     Page shell — no inline style or script
style.css      All CSS including @media print
script.js      All JS: GROUNDS data array, renderGrounds(), accordion, tabs,
               checklist, theme toggle, PDF export
```

## Deployment

GitHub Pages. Push to main, deploys automatically. No build step — plain static files.

## Rules

- No emojis
- No build system — do not add Vite, npm, or bundlers
- All case data (grounds, descriptions, citations) lives in the GROUNDS array in script.js
- Accordion rendered by renderGrounds() — do not hardcode ground divs in HTML
- Theme stored as `body[data-theme="dark"|"paper"]`, persisted to localStorage
- No innerHTML — use DOM methods (createElement, textContent, appendChild)

## Case data location

`script.js` → `const GROUNDS` array (lines 4–35 approx). Edit here for any ground updates.
Checklist items are in `index.html` `#checklist` div.
Pain journal entries are in `index.html` `.j-entry` divs.
