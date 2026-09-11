import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("./", import.meta.url).pathname;
const html = readFileSync(join(root, "index.html"), "utf8");

test("every local href/src in index.html exists", () => {
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1])
    .filter(u => !/^(https?:|mailto:|tel:|#|data:)/.test(u))
    .map(u => u.replace(/[?#].*$/, ""));
  const missing = refs.filter(u => !existsSync(join(root, u.replace(/^\//, ""))));
  assert.deepEqual(missing, []);
});

test("graph IIFE is wrapped in try/catch and required elements exist", () => {
  const graphScript = html.slice(html.indexOf("Obsidian-style force graph"), html.indexOf("</script>", html.indexOf("Obsidian-style force graph")));
  assert.match(graphScript, /\btry\s*{/, "graph script should not be able to throw past progressive enhancement");
  for (const id of ["graph", "graphWrap", "graphHint", "workList", "workListMore", "graphPreview", "graphFrame"]) {
    assert.match(html, new RegExp(`id="${id}"`), `#${id} referenced by the graph script must exist in the DOM`);
  }
});

test("sitemap urls exist", () => {
  const sm = readFileSync(join(root, "sitemap.xml"), "utf8");
  const paths = [...sm.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]);
  const missing = paths.filter(p => { const f = p.replace(/^\//, ""); return !(existsSync(join(root, f)) || existsSync(join(root, f, "index.html"))); });
  assert.deepEqual(missing, []);
});
