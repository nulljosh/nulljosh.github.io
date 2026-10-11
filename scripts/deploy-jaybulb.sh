#!/bin/sh
# Deploys the portfolio to the Cloudflare Pages project "jaybulb" (jaybulb.com). Run from the repo root.
set -e
S=$(mktemp -d)
rsync -a --exclude .git --exclude .claude --exclude .wrangler --exclude node_modules --exclude '*.md' --exclude CNAME --exclude scripts --exclude test.mjs ./ "$S/"
npx --no-install wrangler pages deploy "$S" --project-name jaybulb --branch main --commit-dirty=true
