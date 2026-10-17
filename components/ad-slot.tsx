type AdSlotProps = {
  id: "below-tool" | "near-end";
  tall?: boolean;
  enabled?: boolean;
};

export function AdSlot({ id, tall = false, enabled = false }: AdSlotProps) {
  if (!enabled) return null;

  return (
    <aside data-ad-slot={id} data-ad-format={tall ? "tall" : "standard"}>
      {/* <!-- ADSENSE_SLOT --> */}
    </aside>
  );
}
