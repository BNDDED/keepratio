import { PRESETS, type Preset } from "@/lib/presets";

type PresetTableProps = {
  activeId?: string;
  onUse: (preset: Preset) => void;
};

export function PresetTable({ activeId, onUse }: PresetTableProps) {
  return (
    <div className="w-full max-w-full overflow-x-auto border border-line bg-raised">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">
          Aspect ratio presets with real pixel dimensions
        </caption>
        <thead className="bg-ink text-raised">
          <tr>
            <th scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em]">
              Preset
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em]">
              Pixels
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em]">
              Ratio
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em]">
              Used for
            </th>
            <th scope="col" className="px-4 py-3 text-xs font-medium uppercase tracking-[0.14em]">
              <span className="sr-only">Load preset</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {PRESETS.map((preset) => {
            const active = preset.id === activeId;
            return (
              <tr key={preset.id} className={active ? "bg-[#f3e4dc]" : "odd:bg-raised even:bg-paper"}>
                <th scope="row" className="px-4 py-3 font-medium">
                  {preset.name}
                </th>
                <td className="px-4 py-3 tabular-nums">
                  {preset.width}×{preset.height}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {preset.ratioWidth}:{preset.ratioHeight}
                </td>
                <td className="px-4 py-3 text-muted">{preset.usedFor}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="copy-btn"
                    aria-pressed={active}
                    aria-label={`Use ${preset.name}, ${preset.width} by ${preset.height}`}
                    onClick={() => onUse(preset)}
                  >
                    {active ? "In use" : "Use"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
