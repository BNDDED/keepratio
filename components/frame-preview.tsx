type FramePreviewProps = {
  ratioLabel: string | null;
  aspectWidth: number;
  aspectHeight: number;
};

export function FramePreview({
  ratioLabel,
  aspectWidth,
  aspectHeight,
}: FramePreviewProps) {
  const ready = ratioLabel !== null && aspectWidth > 0 && aspectHeight > 0;
  const width = ready
    ? `min(100%, calc(220px * ${aspectWidth} / ${aspectHeight}))`
    : "min(100%, 320px)";

  return (
    <div className="grid h-64 place-items-center px-4">
      <div
        className="relative bg-ink text-raised shadow-[0_18px_40px_rgba(27,23,20,0.16)]"
        style={{
          width,
          aspectRatio: ready ? `${aspectWidth} / ${aspectHeight}` : "16 / 9",
          opacity: ready ? 1 : 0.4,
        }}
      >
        <span className="frame-mark frame-mark-tl" />
        <span className="frame-mark frame-mark-tr" />
        <span className="frame-mark frame-mark-bl" />
        <span className="frame-mark frame-mark-br" />
        <span className="absolute inset-0 grid place-items-center px-2 text-center font-display text-2xl">
          {ready ? ratioLabel : "—"}
        </span>
      </div>
    </div>
  );
}
