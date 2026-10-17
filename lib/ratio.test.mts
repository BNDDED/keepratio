import assert from "node:assert/strict";
import { test } from "node:test";
import { PRESETS } from "./presets.ts";
import {
  cssAspectRatio,
  formatDimensions,
  gcd,
  parseDraft,
  ratioLabel,
  simplify,
  solveLocked,
} from "./ratio.ts";

test("gcd of the HD frame is 120", () => {
  assert.equal(gcd(1920, 1080), 120);
});

test("presets simplify to their published ratios", () => {
  for (const preset of PRESETS) {
    const ratio = simplify(preset.width, preset.height);
    assert.deepEqual(ratio, {
      width: preset.ratioWidth,
      height: preset.ratioHeight,
    });
    assert.equal(
      ratioLabel(ratio),
      `${preset.ratioWidth}:${preset.ratioHeight}`,
    );
  }
});

test("decimal dimensions simplify", () => {
  assert.deepEqual(simplify(1.5, 1), { width: 3, height: 2 });
  assert.deepEqual(simplify(0.5, 0.25), { width: 2, height: 1 });
});

test("locked ratios solve the missing side", () => {
  assert.equal(solveLocked(16, 9, "width", 1920).height, 1080);
  assert.equal(solveLocked(16, 9, "height", 1080).width, 1920);
  assert.equal(solveLocked(16, 9, "width", 1280).height, 720);
  assert.equal(solveLocked(16, 9, "width", 3840).height, 2160);
  assert.equal(solveLocked(16, 9, "width", 1080).height, 607.5);
  assert.equal(solveLocked(9, 16, "width", 1080).height, 1920);
  assert.equal(solveLocked(4, 5, "width", 1080).height, 1350);
  assert.equal(solveLocked(1, 1, "height", 1080).width, 1080);
});

test("an unsimplified lock still reduces the ratio", () => {
  const solved = solveLocked(1920, 1080, "width", 640);
  assert.deepEqual(solved.ratio, { width: 16, height: 9 });
  assert.equal(solved.height, 360);
});

test("copy strings stay plain and exact", () => {
  const ratio = simplify(1080, 1350);
  assert.equal(ratioLabel(ratio), "4:5");
  assert.equal(cssAspectRatio(ratio), "aspect-ratio: 4 / 5;");
  assert.equal(formatDimensions(1080, 1350), "1080×1350");
  assert.equal(formatDimensions(1080, 607.5), "1080×607.5");
});

test("parser rejects empty, zero, and junk", () => {
  assert.equal(parseDraft("").ok, false);
  assert.equal(parseDraft("0").ok, false);
  assert.equal(parseDraft("-5").ok, false);
  assert.equal(parseDraft("abc").ok, false);
  assert.deepEqual(parseDraft("1920"), { ok: true, value: 1920 });
  const incomplete = parseDraft("1920.");
  assert.equal(incomplete.ok, false);
  if (!incomplete.ok) assert.equal(incomplete.reason, "incomplete");
});
