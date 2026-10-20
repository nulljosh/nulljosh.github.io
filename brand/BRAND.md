# Jaybulb brand kit (portfolio)

A bulb for the idea, a pencil for the work. That's the whole brand: one yellow, black ink, white paper.

## The mark
A light bulb whose base turns into a pencil tip.

- `brand/mark.svg`: the mark on its own, yellow bulb with black line. Same file as `pwa/logo.svg`.
- `icon.svg`: the tile. White bulb, black line, on a yellow gradient. `brand/icon-1024.png` is the 1024 render.
- Favicons and install icons live in `pwa/`.

**Use it like this**
- Black line, always. The bulb is yellow on paper and white on a yellow tile.
- Smallest size: 16 px for the mark, 29 px for the tile.
- No text in the icon, no outline around the tile, no drop shadow on the mark.

## Color
Defined in `brand/tokens.css`. Light only, on purpose.

| Role | Value |
|---|---|
| Bulb (sidebar, buttons, underlines) | `#ffca30` |
| Bulb light (icon top, footer floor) | `#ffe48a` |
| Ink | `#000` |
| Body on the footer band | `#333` |
| Blurbs and prices | `#555` |
| Text on the warm band | `#6b5a2e` |
| Paper | `#fff` |
| Hairline | `#eee` |

The footer is a full-width band that fades from paper to bulb light and runs into the landscape (`pwa/footer-landscape.svg`).

## Type
System font only: SF Pro, then Lato, then Helvetica. No webfonts, no serif.

## Layout
Yellow sidebar on the left, one project list on the right, footer band at the bottom. Buttons are flat yellow blocks with square corners. Links get a 2 px bulb underline.

## Not this file
`/tokens.css` is the shared system every app site loads (clay accent, cream paper). Don't copy the portfolio's yellow into it, and don't pull its clay into here.
