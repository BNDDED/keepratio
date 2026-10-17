"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FramePreview } from "@/components/frame-preview";
import { PresetTable } from "@/components/preset-table";
import { PRESETS, presetMatches, type Preset } from "@/lib/presets";
import {
  cssAspectRatio,
  divisorExplanation,
  fieldMessage,
  formatDecimal,
  formatDimensions,
  formatTrimmed,
  parseDraft,
  ratioLabel,
  solveFromDimensions,
  solveLocked,
  wholePixels,
  type Solved,
} from "@/lib/ratio";

type Mode = "find" | "lock";
type Side = "width" | "height";

type ReadyResult = Solved & {
  pixelsLabel: string;
  pixelsDiffer: boolean;
};

export function RatioWorkspace() {
  const [mode, setMode] = useState<Mode>("find");
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [ratioW, setRatioW] = useState("16");
  const [ratioH, setRatioH] = useState("9");
  const [knownSide, setKnownSide] = useState<Side>("width");
  const [knownValue, setKnownValue] = useState("1920");
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const view = useMemo(() => computeView(mode, width, height, ratioW, ratioH, knownSide, knownValue), [
    mode,
    width,
    height,
    ratioW,
    ratioH,
    knownSide,
    knownValue,
  ]);

  const activePreset =
    view.result === null
      ? undefined
      : presetMatches(view.result.width, view.result.height);

  function switchMode(next: Mode) {
    if (next === mode) return;
    if (next === "lock") {
      const widthDraft = parseDraft(width);
      const heightDraft = parseDraft(height);
      if (widthDraft.ok && heightDraft.ok) {
        const solved = solveFromDimensions(widthDraft.value, heightDraft.value);
        setRatioW(String(solved.ratio.width));
        setRatioH(String(solved.ratio.height));
        setKnownSide("width");
        setKnownValue(formatTrimmed(solved.width));
      }
    } else if (view.result) {
      setWidth(formatTrimmed(view.result.width));
      setHeight(formatTrimmed(view.result.height));
    }
    setMode(next);
  }

  function applyPreset(preset: Preset, scroll: boolean) {
    setWidth(String(preset.width));
    setHeight(String(preset.height));
    setRatioW(String(preset.ratioWidth));
    setRatioH(String(preset.ratioHeight));
    setKnownSide("width");
    setKnownValue(String(preset.width));
    if (!scroll) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("calculator")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  async function copyValue(id: string, text: string) {
    const ok = await writeClipboard(text);
    if (!ok) {
      setCopyError("Copy failed. Select the value and copy it manually.");
      setCopied(null);
      return;
    }
    setCopyError(null);
    setCopied(id);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <>
      <section id="calculator" className="shell scroll-mt-24">
        <form
          className="border border-line bg-raised shadow-[0_20px_50px_rgba(27,23,20,0.05)]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line px-4 pt-4 sm:px-6">
            <div role="radiogroup" aria-label="Calculator mode" className="flex gap-6">
              <ModeButton active={mode === "find"} onSelect={() => switchMode("find")}>
                Find ratio
              </ModeButton>
              <ModeButton active={mode === "lock"} onSelect={() => switchMode("lock")}>
                Lock ratio
              </ModeButton>
            </div>
            <p className="pb-3 text-sm text-muted">
              {mode === "find"
                ? "Width and height in, simplified W:H out."
                : "Ratio stays fixed. One side fills the other."}
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
            <div className="border-b border-line p-4 sm:p-6 lg:border-r lg:border-b-0">
              {mode === "find" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <NumberField
                    id="width"
                    label="Width"
                    value={width}
                    onChange={setWidth}
                  />
                  <NumberField
                    id="height"
                    label="Height"
                    value={height}
                    onChange={setHeight}
                  />
                </div>
              ) : (
                <div className="grid gap-5">
                  <fieldset>
                    <legend className="text-xs uppercase tracking-[0.14em] text-muted">
                      Locked ratio
                    </legend>
                    <div className="mt-2 flex items-center gap-3">
                      <NumberField
                        id="ratio-width"
                        label="Ratio width"
                        hideLabel
                        value={ratioW}
                        onChange={setRatioW}
                      />
                      <span className="font-display text-3xl" aria-hidden="true">
                        :
                      </span>
                      <NumberField
                        id="ratio-height"
                        label="Ratio height"
                        hideLabel
                        value={ratioH}
                        onChange={setRatioH}
                      />
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-xs uppercase tracking-[0.14em] text-muted">
                      Side you know
                    </legend>
                    <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Known side">
                      {(["width", "height"] as const).map((side) => (
                        <button
                          key={side}
                          type="button"
                          role="radio"
                          aria-checked={knownSide === side}
                          className={`border px-3 py-2 text-sm capitalize ${
                            knownSide === side
                              ? "border-ink bg-ink text-raised"
                              : "border-line bg-transparent text-ink"
                          }`}
                          onClick={() => setKnownSide(side)}
                        >
                          {side}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <NumberField
                        id="known-value"
                        label={knownSide === "width" ? "Known width" : "Known height"}
                        value={knownValue}
                        onChange={setKnownValue}
                      />
                    </div>
                  </fieldset>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {PRESETS.map((preset) => {
                  const active = preset.id === activePreset?.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={active}
                      className={`border px-2.5 py-1.5 text-left text-xs tabular-nums ${
                        active
                          ? "border-ink bg-ink text-raised"
                          : "border-line bg-[#fffdf8] text-ink hover:border-ink"
                      }`}
                      onClick={() => applyPreset(preset, false)}
                    >
                      <span className="block font-medium">
                        {preset.ratioWidth}:{preset.ratioHeight}
                      </span>
                      <span className={active ? "text-raised/80" : "text-muted"}>
                        {preset.width}×{preset.height}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-muted">
                Nothing is uploaded. KeepRatio calculates the ratio in this browser.
              </p>
            </div>

            <div className="p-4 sm:p-6">
              <FramePreview
                ratioLabel={view.result ? ratioLabel(view.result.ratio) : null}
                aspectWidth={view.result?.ratio.width ?? 16}
                aspectHeight={view.result?.ratio.height ?? 9}
              />
              {view.result ? (
                <ResultList
                  result={view.result}
                  mode={mode}
                  knownSide={knownSide}
                  copied={copied}
                  onCopy={copyValue}
                />
              ) : (
                <p className="mt-2 text-sm text-muted" role="status">
                  {view.message}
                </p>
              )}
              <p className="sr-only" aria-live="polite">
                {copied ? `${copied} copied` : copyError ?? ""}
              </p>
              {copyError ? (
                <p className="mt-3 text-sm text-signal" role="alert">
                  {copyError}
                </p>
              ) : null}
            </div>
          </div>
        </form>
      </section>

      <section id="presets" className="shell scroll-mt-24 pt-14 pb-4">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Preset sizes in real pixels
        </h2>
        <p className="mt-3 max-w-3xl text-muted">
          These are the frames people actually export. 1920×1080, 1280×720, and
          3840×2160 are all 16:9. 1080×1920 is 9:16 for vertical video.
          1080×1080 is 1:1, and 1080×1350 is 4:5. Use a row to load those pixels
          into the calculator.
        </p>
        <div className="mt-6">
          <PresetTable
            activeId={activePreset?.id}
            onUse={(preset) => applyPreset(preset, true)}
          />
          <p className="mt-2 text-sm text-muted sm:hidden">
            Scroll the table sideways to see every column.
          </p>
        </div>
      </section>
    </>
  );
}

function computeView(
  mode: Mode,
  width: string,
  height: string,
  ratioW: string,
  ratioH: string,
  knownSide: Side,
  knownValue: string,
): { result: ReadyResult | null; message: string | null } {
  if (mode === "find") {
    const widthDraft = parseDraft(width);
    const heightDraft = parseDraft(height);
    const message = fieldMessage(
      [widthDraft, heightDraft],
      "Enter both width and height.",
    );
    if (message || !widthDraft.ok || !heightDraft.ok) {
      return { result: null, message };
    }
    return { result: ready(solveFromDimensions(widthDraft.value, heightDraft.value)), message: null };
  }

  const ratioWidth = parseDraft(ratioW);
  const ratioHeight = parseDraft(ratioH);
  const known = parseDraft(knownValue);
  const ratioMessage = fieldMessage(
    [ratioWidth, ratioHeight],
    "Enter both numbers in the locked ratio.",
  );
  if (ratioMessage || !ratioWidth.ok || !ratioHeight.ok) {
    return { result: null, message: ratioMessage };
  }
  const knownMessage = fieldMessage(
    [known],
    knownSide === "width" ? "Enter the width you know." : "Enter the height you know.",
  );
  if (knownMessage || !known.ok) return { result: null, message: knownMessage };
  return {
    result: ready(solveLocked(ratioWidth.value, ratioHeight.value, knownSide, known.value)),
    message: null,
  };
}

function ready(solved: Solved): ReadyResult {
  const pixels = wholePixels(solved.width, solved.height);
  const exact = formatDimensions(solved.width, solved.height);
  return {
    ...solved,
    pixelsLabel: pixels.label,
    pixelsDiffer: exact !== pixels.label,
  };
}

function ResultList({
  result,
  mode,
  knownSide,
  copied,
  onCopy,
}: {
  result: ReadyResult;
  mode: Mode;
  knownSide: Side;
  copied: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const label = ratioLabel(result.ratio);
  const dimensions = formatDimensions(result.width, result.height);
  const css = cssAspectRatio(result.ratio);
  const explanation =
    mode === "find"
      ? divisorExplanation(result.width, result.height, result.ratio)
      : knownSide === "width"
        ? `Height = width × (${result.ratio.height} ÷ ${result.ratio.width}).`
        : `Width = height × (${result.ratio.width} ÷ ${result.ratio.height}).`;
  const matched = presetMatches(result.width, result.height);

  return (
    <div>
      <p className="text-sm text-muted">
        Decimal width ÷ height = {formatDecimal(result.width, result.height)}
        {matched ? ` · Matches ${matched.name}` : ""}
      </p>
      <ResultRow
        id="W:H ratio"
        label="W:H ratio"
        value={label}
        copied={copied}
        onCopy={onCopy}
      />
      <ResultRow
        id="Dimensions"
        label="Dimensions"
        value={dimensions}
        copied={copied}
        onCopy={onCopy}
      />
      {result.pixelsDiffer ? (
        <ResultRow
          id="Nearest whole pixels"
          label="Nearest whole pixels"
          value={result.pixelsLabel}
          copied={copied}
          onCopy={onCopy}
        />
      ) : null}
      <ResultRow
        id="CSS aspect-ratio"
        label="CSS aspect-ratio"
        value={css}
        mono
        copied={copied}
        onCopy={onCopy}
      />
      {explanation ? <p className="pt-3 text-sm text-muted">{explanation}</p> : null}
    </div>
  );
}

function ResultRow({
  id,
  label,
  value,
  mono = false,
  copied,
  onCopy,
}: {
  id: string;
  label: string;
  value: string;
  mono?: boolean;
  copied: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const isCopied = copied === id;
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-3">
      <div className="min-w-0">
        <div className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">{label}</div>
        <div className={`text-xl break-all text-ink sm:text-2xl ${mono ? "font-mono text-base sm:text-lg" : "font-display"}`}>
          {value}
        </div>
      </div>
      <button
        type="button"
        className="copy-btn"
        data-copied={isCopied ? "true" : "false"}
        aria-label={`Copy ${label}`}
        onClick={() => onCopy(id, value)}
      >
        {isCopied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function ModeButton({
  active,
  onSelect,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      className={`-mb-px border-b-2 pb-3 text-sm ${
        active ? "border-signal text-ink" : "border-transparent text-muted"
      }`}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  hideLabel = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className={hideLabel ? "sr-only" : "mb-2 block text-xs uppercase tracking-[0.14em] text-muted"}>
        {label}
      </span>
      <input
        id={id}
        className="field"
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={value}
        aria-label={hideLabel ? label : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
