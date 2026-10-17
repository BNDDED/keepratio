type AdSlotProps = {
  id: "below-tool" | "near-end";
  tall?: boolean;
};

export function AdSlot({ id, tall = false }: AdSlotProps) {
  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot={id}
      className={`flex flex-col items-center justify-center border border-dashed border-line bg-raised/70 px-4 text-center ${
        tall ? "min-h-64" : "min-h-28"
      }`}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">Advertisement</p>
      <p className="mt-1 text-sm text-muted">Ad slot</p>
    </aside>
  );
}
