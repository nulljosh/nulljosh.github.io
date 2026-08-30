# Plan

Joshua's education/career roadmap. Single static page, no build step, no deploy —
`index.html` is opened locally. Created 2026-07-27 from a one-off HTML file in
`~/Downloads`.

## Files
- `index.html` — the entire plan. Self-contained: inline `<style>`, inline SVG chart,
  no external assets, no JS.
- `architecture.svg` — project map for the README.

## The decision this file encodes
**SFU Computing Science BSc** (Burnaby) + **Beedie Finance minor** as the default,
with **MSc Finance** as an optional post-BSc add-on decided after 1–2 years of work.
Superseded earlier plans: Capilano paralegal (dropped 2026-07-06) and UVic CS (ruled
out — not Lower Mainland). Don't reintroduce either as current.

The one admission blocker is **Pre-Calculus 12** — Joshua has Pre-Calc 11 (C+, 2018).
English is already covered (English 12 C+, English Studies 12 = A), so no English
upgrading. KPU MATQ is free and continuous-intake.

## Editing rules
- Numbers in here are cited — tuition, PWD rates, CSG-D/CSG-DSE caps, salary bands.
  If you change a figure, update the matching entry in the Sources section too.
- The net-worth chart is hand-plotted SVG `points`. The value series is in an HTML
  comment directly above the `<polyline>`; recompute the `y` coords from that comment's
  formula (`y = 280 - (value/1100)*260`) rather than eyeballing new points.
- Keep it one file. This is a personal reference doc, not an app — no framework, no
  bundler, no CSS extraction.

## Roadmap
See `roadmap.md` in this repo root.

## Public mirror
`docs/index.html` is a **redacted** copy of `index.html` — the Step 0 (transcript
grades), Disability Funding, Income While Studying, Other Programs, and Monthly
Expenses sections are stripped, along with every PWD/StudentAid/RDSP source link.
It's mirrored to the public repo `nulljosh/plan-site`, served at
https://heyitsmejosh.com/plan-site/ (this repo is private, and GitHub Pages isn't
available on private repos on the free plan).

Rebuild it after editing `index.html`:
```
python3 - <<'PY'
import re
s = open('index.html').read()
drop = ['Step 0 —','Disability Funding','Income While Studying',
        'Other Programs Worth Checking','Monthly Expenses']
parts = re.split(r'(?=  <div class="glass")', s)
open('docs/index.html','w').write(''.join(
    p for p in parts if not any(d in p[:400] for d in drop)))
PY
```
Then re-strip the stray disability lines in Next Steps/Sources and copy
`docs/index.html` into the `plan-site` repo. **Never** push the root `index.html`
to `plan-site` — it has medical and income detail.
