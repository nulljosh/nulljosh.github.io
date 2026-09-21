import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("./", import.meta.url).pathname;
const html = readFileSync(join(root, "classic.html"), "utf8");

test("every local href/src in classic.html exists", () => {
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1])
    .filter(u => !/^(https?:|mailto:|tel:|#|data:)/.test(u))
    .map(u => u.replace(/[?#].*$/, ""));
  const missing = refs.filter(u => !existsSync(join(root, u.replace(/^\//, ""))));
  assert.deepEqual(missing, []);
});

test("sitemap urls exist", () => {
  const sm = readFileSync(join(root, "sitemap.xml"), "utf8");
  const paths = [...sm.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]);
  const missing = paths.filter(p => { const f = p.replace(/^\//, ""); return !(existsSync(join(root, f)) || existsSync(join(root, f, "index.html"))); });
  assert.deepEqual(missing, []);
});
