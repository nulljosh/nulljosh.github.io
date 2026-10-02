# Portfolio loop handoff (2026-10-02, afternoon)

## What the loop is

Polish the portfolio to A+ grade against the landing-demo rubric. Recover from the recent crash, fix the exit button visibility in portfolio mode, and grade the page against the A+ bar: no letterbox bands (16:9 demo on 16:10 screens), sharp face frames on retina displays, and hidden exit button when not in demo mode.

## Where things stand

Final checkpoint 2026-10-02. PR #353 merged, exit button hidden verified headless. Portfolio grade A- (exit button fixed and hidden; letterbox bands and soft retina faces remain).

**Fixed in this session:**
- Exit button visibility: CSS hidden attribute on #demo-exit, merged and live in 1.9.39.
- Headless verification: exit button confirmed hidden in local ci-local tests.

**Loop status: Paused at A-**
- Exit button hidden on portfolio mode (done).
- Letterbox bands on 16:10 screens (outstanding).
- Face frames soft on retina (outstanding).

## Next, in order (when loop resumes)

1. Letterbox bands: Fix desktop/mobile layout on 16:10 aspect screens. Demo frames 16:9 (1600x900), but 16:10 screens (1920x1200) letterbox it. Check `index.html` video frame sizing and CSS aspect-ratio rules.
2. Face sharpness: Face image frames soft on retina (>1x device pixel ratio). Verify image rendering (canvas upscale vs. asset). Check if face needs a 2x version or if CSS scale is blurring it.
3. Grade to A+: Once both fixed, re-capture at real device sizes and grade against A+ rubric (clean no-band rendering, sharp face, hidden buttons when not demoing).

## Restart prompt

```
/loop QA portfolio until A+: fix letterbox bands on 16:10 screens, sharpen face on retina. Grade after each fix. No new scope.
```

