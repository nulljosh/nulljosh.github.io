#!/bin/sh
# Copy every public repo's docs/ARCHITECTURE.md into docs/ here and rebuild docs/index.json for docs.html.
# ponytail: private list is hardcoded from `gh repo list`; rerun that if a repo changes visibility.
cd "$(dirname "$0")/.." || exit 1
PRIVATE=" notes windgate breathe brain joshuatree-monitor litigate slicehack secretary pwnlingo logans-frenchies lec hackrange "
mkdir -p docs && rm -f docs/*.md
for f in ../*/docs/ARCHITECTURE.md; do
  r=$(basename "$(dirname "$(dirname "$f")")")
  case "$r" in joshuatree-*) continue;; esac
  case "$PRIVATE" in *" $r "*) continue;; esac
  cp "$f" "docs/$r.md"
done
printf '[%s]\n' "$(ls docs/*.md | sed 's|docs/\(.*\)\.md|"\1"|' | paste -sd, -)" > docs/index.json
echo "synced $(ls docs/*.md | wc -l | tr -d ' ') docs"
