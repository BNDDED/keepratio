export type Ratio = {
  width: number;
  height: number;
};

export type Draft =
  | { ok: true; value: number }
  | { ok: false; reason: "empty" | "incomplete" | "invalid" };

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function parseDraft(raw: string): Draft {
  const value = raw.trim();
  if (!value) return { ok: false, reason: "empty" };
  if (!/^\d*\.?\d*$/.test(value)) return { ok: false, reason: "invalid" };
  if (value === "." || value.endsWith(".")) {
    return { ok: false, reason: "incomplete" };
  }
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0 || n > 1_000_000) {
    return { ok: false, reason: "invalid" };
  }
  return { ok: true, value: n };
}

function fractionDigits(n: number): number {
  const text = String(n);
  if (text.includes("e") || text.includes("E")) return 6;
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : text.length - dot - 1;
}

function scaleFactor(width: number, height: number): number {
  const places = Math.min(
    6,
    Math.max(fractionDigits(width), fractionDigits(height)),
  );
  return 10 ** places;
}

export function simplify(width: number, height: number): Ratio {
  const scale = scaleFactor(width, height);
  const divisor = gcd(Math.round(width * scale), Math.round(height * scale));
  return {
    width: Math.round(width * scale) / divisor,
    height: Math.round(height * scale) / divisor,
  };
}

export function formatTrimmed(n: number, digits = 4): string {
  if (!Number.isFinite(n)) return "";
  const factor = 10 ** digits;
  const rounded = Math.round(n * factor) / factor;
  return String(rounded);
}

export function formatDimensions(width: number, height: number): string {
  return `${formatTrimmed(width)}×${formatTrimmed(height)}`;
}

export function formatDecimal(width: number, height: number): string {
  return formatTrimmed(width / height, 4);
}

export function ratioLabel(ratio: Ratio): string {
  return `${ratio.width}:${ratio.height}`;
}

export function cssAspectRatio(ratio: Ratio): string {
  return `aspect-ratio: ${ratio.width} / ${ratio.height};`;
}

export function wholePixels(width: number, height: number): {
  width: number;
  height: number;
  label: string;
} {
  const pixelWidth = Math.max(1, Math.round(width));
  const pixelHeight = Math.max(1, Math.round(height));
  return {
    width: pixelWidth,
    height: pixelHeight,
    label: `${pixelWidth}×${pixelHeight}`,
  };
}

export function divisorExplanation(
  width: number,
  height: number,
  ratio: Ratio,
): string | null {
  if (!Number.isInteger(width) || !Number.isInteger(height)) return null;
  const divisor = gcd(width, height);
  if (divisor === 1) {
    return "These whole numbers are already the simplified ratio.";
  }
  return `Greatest common divisor ${divisor}. ${width}÷${divisor} = ${ratio.width} and ${height}÷${divisor} = ${ratio.height}.`;
}

export type Solved = {
  width: number;
  height: number;
  ratio: Ratio;
};

export function solveFromDimensions(width: number, height: number): Solved {
  return {
    width,
    height,
    ratio: simplify(width, height),
  };
}

export function solveLocked(
  ratioWidth: number,
  ratioHeight: number,
  knownSide: "width" | "height",
  known: number,
): Solved {
  const ratio = simplify(ratioWidth, ratioHeight);
  if (knownSide === "width") {
    return {
      width: known,
      height: (known * ratio.height) / ratio.width,
      ratio,
    };
  }
  return {
    width: (known * ratio.width) / ratio.height,
    height: known,
    ratio,
  };
}

export function fieldMessage(
  drafts: Draft[],
  emptyMessage: string,
): string | null {
  if (drafts.some((draft) => draft.ok === false && draft.reason === "invalid")) {
    return "Enter a positive number up to 1,000,000.";
  }
  if (
    drafts.some((draft) => draft.ok === false && draft.reason === "incomplete")
  ) {
    return "Finish the number after the decimal point.";
  }
  if (drafts.some((draft) => !draft.ok)) return emptyMessage;
  return null;
}
