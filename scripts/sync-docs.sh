#!/bin/sh
# Copy every public repo's docs/ARCHITECTURE.md into docs/ here and rebuild docs/index.json for docs.html.
# ponytail: private list is hardcoded from `gh repo list`; rerun that if a repo changes visibility.
cd "$(dirname "$0")/.." || exit 1
PRIVATE=" airwell brain cruise homeroom icelus-private jaybulb-api notes themis vault "
mkdir -p docs && rm -f docs/*.md
for f in ../*/docs/ARCHITECTURE.md; do
  r=$(basename "$(dirname "$(dirname "$f")")")
  case "$r" in joshuatree-*|thinkpond) continue;; esac
  case "$PRIVATE" in *" $r "*) continue;; esac
  cp "$f" "docs/$r.md"
done
printf '[%s]\n' "$(ls docs/*.md | sed 's|docs/\(.*\)\.md|"\1"|' | paste -sd, -)" > docs/index.json
echo "synced $(ls docs/*.md | wc -l | tr -d ' ') docs"
