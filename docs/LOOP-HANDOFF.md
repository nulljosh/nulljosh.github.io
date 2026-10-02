# Portfolio loop handoff (2026-10-02, afternoon)

## What the loop is

Polish the portfolio to A+ grade against the landing-demo rubric. Recover from the recent crash, fix the exit button visibility in portfolio mode, and grade the page against the A+ bar: no letterbox bands (16:9 demo on 16:10 screens), sharp face frames on retina displays, and hidden exit button when not in demo mode.

## Where things stand

Delta checkpoint 2026-10-02. PR #353 (exit button hide) open with auto-merge waiting for GitHub CI. Portfolio grade B+ (letterbox bands on 16:10 screens, soft face frames on retina).

**Fixed in this session:**
- Exit button visibility: CSS hidden attribute on #demo-exit, committed.
- Local ci-local test: exit button fix runs green headless.

**CI status:**
- Shared ci-local with another session's jt-release run (16 QEMUs total) caused transient Stocks and Keyrate flakes in local ci-local; all checks passed when rerun alone.
- PR #353 now on GitHub CI auto-merge, waiting for passing checks.

**Outstanding issues:**
- Black letterbox bands on 16:10 aspect screens (16:9 content in 16:10 frame).
- Face image frames appear soft on retina displays.

## Next, in order

1. Black letterbox bands: Investigate the desktop/mobile layout boundary on 16:10 aspect screens. The demo frames content at 16:9 (1600x900 on desktop), but screens with 16:10 (1920x1200, etc.) letterbox it. Check `index.html` video frame sizing and CSS aspect-ratio rules.
2. Face sharpness on retina: Face image frames are soft when displayed at >1x device pixel ratio. Verify image rendering (canvas upscale vs. asset resolution). Check if Joshua's face image needs a 2x version or if a CSS scale is blurring it.
3. Grade against the rubric: Once both are fixed, re-capture the page at real device sizes and grade against the A+ bar (clean no-band rendering, sharp text and face, hidden UI buttons when not needed).

## Restart prompt

```
/loop QA portfolio until A+: fix letterbox bands on 16:10 screens, sharpen face on retina, verify exit button hidden. Grade after each fix. No new scope.
```

