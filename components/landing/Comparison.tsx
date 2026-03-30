import SectionHeader from "./SectionHeader";

const rows = [
  { feature: "Free tier", qb: "✓", square: "✓", toast: "✗", clover: "✗" },
  { feature: "No hardware required", qb: "✓", square: "✗", toast: "✗", clover: "✗" },
  { feature: "Custom menu categories", qb: "✓", square: "✓", toast: "✓", clover: "✓" },
  { feature: "Real-time dashboard", qb: "✓", square: "✓", toast: "✓", clover: "✗" },
  { feature: "Multi-tenant support", qb: "✓", square: "✗", toast: "✗", clover: "✗" },
  { feature: "Modern UI (no training needed)", qb: "✓", square: "—", toast: "✗", clover: "✗" },
];

function cellStyle(val: string) {
  if (val === "✓") return "text-[#36cd1d] font-semibold text-[14px]";
  if (val === "✗") return "text-[#b8b8b8] text-[14px]";
  return "text-[#6b7280] text-[14px]";
}

export default function Comparison() {
  return (
    <section id="comparison" className="flex flex-col w-full bg-[#ffffff] py-16 px-6 md:py-[100px] md:px-[120px] gap-12 md:gap-[64px]">
      <SectionHeader
        label="Comparison"
        title={"See how QuickBite stacks up"}
        subtitle="An honest look at how we compare to the alternatives."
      />

      {/* Desktop table */}
      <div className="hidden md:flex flex-col w-full border border-[#e5e5e5] rounded-[10px] overflow-hidden">
        {/* Header */}
        <div className="flex w-full h-[56px] bg-[#fafafa] border-b border-b-[#e5e5e5]">
          <div className="flex items-center w-[320px] shrink-0 px-[32px] border-r border-r-[#e5e5e5]">
            <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-[#6b7280]">Feature</span>
          </div>
          <div className="flex items-center flex-1 px-[32px] bg-[#003049] border-r border-r-[#003049]">
            <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-white">QuickBite</span>
          </div>
          {["Square POS", "Toast", "Clover"].map((tool, i) => (
            <div key={tool} className={`flex items-center flex-1 px-[32px] ${i < 2 ? "border-r border-r-[#e5e5e5]" : ""}`}>
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-[#6b7280]">{tool}</span>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, i) => (
          <div key={row.feature} className={`flex w-full h-[56px] ${i < rows.length - 1 ? "border-b border-b-[#e5e5e5]" : ""}`}>
            <div className="flex items-center w-[320px] shrink-0 px-[32px] border-r border-r-[#e5e5e5]">
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-[#180e19]">{row.feature}</span>
            </div>
            <div className="flex items-center flex-1 px-[32px] bg-[#f4fbff] border-r border-r-[#e5e5e5]">
              <span className={`font-[family-name:var(--font-inter)] ${cellStyle(row.qb)}`}>{row.qb}</span>
            </div>
            {[row.square, row.toast, row.clover].map((val, j) => (
              <div key={j} className={`flex items-center flex-1 px-[32px] ${j < 2 ? "border-r border-r-[#e5e5e5]" : ""}`}>
                <span className={`font-[family-name:var(--font-inter)] ${cellStyle(val)}`}>{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: condensed layout */}
      <div className="flex flex-col md:hidden w-full gap-[1px] border border-[#e5e5e5] rounded-[10px] overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-5 bg-[#fafafa] border-b border-b-[#e5e5e5]">
          <div className="col-span-2 px-3 py-3">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-semibold text-[#6b7280]">Feature</span>
          </div>
          <div className="px-2 py-3 bg-[#003049]">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-semibold text-white">QB</span>
          </div>
          <div className="px-2 py-3">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-semibold text-[#6b7280]">Sq</span>
          </div>
          <div className="px-2 py-3">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-semibold text-[#6b7280]">Tst</span>
          </div>
        </div>
        {rows.map((row, i) => (
          <div key={row.feature} className={`grid grid-cols-5 ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"} ${i < rows.length - 1 ? "border-b border-b-[#e5e5e5]" : ""}`}>
            <div className="col-span-2 flex items-center px-3 py-4">
              <span className="font-[family-name:var(--font-inter)] text-[11px] text-[#180e19] leading-[1.4]">{row.feature}</span>
            </div>
            <div className="flex items-center px-2 py-4 bg-[#f4fbff]">
              <span className={`font-[family-name:var(--font-inter)] text-[13px] ${cellStyle(row.qb)}`}>{row.qb}</span>
            </div>
            <div className="flex items-center px-2 py-4">
              <span className={`font-[family-name:var(--font-inter)] text-[12px] ${cellStyle(row.square)}`}>{row.square}</span>
            </div>
            <div className="flex items-center px-2 py-4">
              <span className={`font-[family-name:var(--font-inter)] text-[12px] ${cellStyle(row.toast)}`}>{row.toast}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
