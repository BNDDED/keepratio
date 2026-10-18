import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { SITEMAP_XML } from "./sitemap-xml.ts";

test("public sitemap matches the route handler body", () => {
  const file = readFileSync(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );
  assert.equal(file, SITEMAP_XML);
});

test("sitemap lists the public pages with trailing slashes", () => {
  for (const loc of [
    "https://keepratio.com/",
    "https://keepratio.com/privacy/",
    "https://keepratio.com/contact/",
  ]) {
    assert.match(SITEMAP_XML, new RegExp(`<loc>${loc}</loc>`));
  }
  assert.match(SITEMAP_XML, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.match(
    SITEMAP_XML,
    /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/,
  );
});

test("sitemap metadata route files are absent", () => {
  assert.equal(existsSync(new URL("../app/sitemap.ts", import.meta.url)), false);
  assert.equal(existsSync(new URL("../app/sitemap.js", import.meta.url)), false);
});
