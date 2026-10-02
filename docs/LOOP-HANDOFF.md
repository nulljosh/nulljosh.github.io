# Portfolio loop handoff (2026-10-02, afternoon)

## What the loop is

Polish the portfolio to A+ grade against the landing-demo rubric. Recover from the recent crash, fix the exit button visibility in portfolio mode, and grade the page against the A+ bar: no letterbox bands (16:9 demo on 16:10 screens), sharp face frames on retina displays, and hidden exit button when not in demo mode.

## Where things stand

Checkpoint 2026-10-02 afternoon. Portfolio recovered from a crash. QA'd heyitsmejosh.com: grade B+ (three issues identified and one fixed).

**Issues found:**
- Black letterbox bands appear on 16:10 screens (demo is 16:9 content in a 16:10 frame).
- Face frames appear soft/pixelated on retina displays.
- Exit button visible in portfolio mode even though it should be hidden.

**Fixed:**
- Joshua Tree 1.9.39: CSS hidden attribute on #demo-exit fixes visibility (`#demo-exit[hidden] { display: none }`).
- tools/ci-local.sh running locally, green.

**Deployed state:**
- Last 30 GitHub runs verified green.
- Live at heyitsmejosh.com with exit button now hidden in portfolio mode.

## Next, in order

1. Black letterbox bands: Investigate the desktop/mobile layout boundary on 16:10 aspect screens. The demo frames content at 16:9 (1600x900 on desktop), but screens with 16:10 (1920x1200, etc.) letterbox it. Check `index.html` video frame sizing and CSS aspect-ratio rules.
2. Face sharpness on retina: Face image frames are soft when displayed at >1x device pixel ratio. Verify image rendering (canvas upscale vs. asset resolution). Check if Joshua's face image needs a 2x version or if a CSS scale is blurring it.
3. Grade against the rubric: Once both are fixed, re-capture the page at real device sizes and grade against the A+ bar (clean no-band rendering, sharp text and face, hidden UI buttons when not needed).

## Restart prompt

```
/loop QA portfolio until A+: fix letterbox bands on 16:10 screens, sharpen face on retina, verify exit button hidden. Grade after each fix. No new scope.
```

