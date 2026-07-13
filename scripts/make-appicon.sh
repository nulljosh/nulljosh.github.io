#!/bin/sh
# Regenerate the iOS AppIcon 1024 PNG from icon.svg. ALWAYS use this — never export by hand.
# Renders at full 1024 and flattens the rounded corners onto the icon's own bg color so the
# PNG is square-corner, full-bleed, no alpha (ASC requirements; iOS adds the rounded mask).
# Hand exports at the SVG's intrinsic 200px size are what caused the recurring scaling glitch.
set -e
cd "$(dirname "$0")/.."
BG="#1a1a1a"
DEST="ios/Sources/Assets.xcassets/AppIcon.appiconset/icon-1024.png"
rsvg-convert -w 1024 -h 1024 icon.svg | magick - -background "$BG" -alpha remove -alpha off "$DEST"
sips -g pixelWidth -g pixelHeight -g hasAlpha "$DEST" | grep -q 'hasAlpha: no'
sips -g pixelWidth "$DEST" | grep -q 'pixelWidth: 1024'
echo "OK: $DEST"
