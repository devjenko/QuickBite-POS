const stats = [
  { value: "2,000+", label: "Active Restaurants", border: true },
  { value: "99.9%", label: "Uptime Guaranteed", border: true },
  { value: "50ms", label: "Average Response Time", border: true },
  { value: "10K+", label: "Orders Processed Daily", border: false },
];

export default function Stats() {
  return (
    <section className="flex flex-col w-full bg-[var(--dark-blue)] py-12 px-6 md:py-[80px] md:px-[120px]">
      <span className="font-sans text-[12px] font-semibold text-white/60 tracking-[1.5px]">
        By the numbers
      </span>
      <div className="h-8 md:h-[32px]" />
      <div className="grid grid-cols-2 md:flex w-full gap-[2px] md:gap-0">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 items-center justify-center py-6 md:py-0 md:h-[160px] md:flex-1
              ${stat.border ? "md:border-r md:border-r-white/20" : ""}
              ${i === 0 ? "md:pr-[40px]" : i === stats.length - 1 ? "md:pl-[40px]" : "md:px-[40px]"}
              ${i % 2 === 0 ? "border-r border-r-white/20 pr-4 md:border-r-0 md:pr-0" : "pl-4 md:pl-0"}
              ${i >= 2 ? "border-t border-t-white/20 pt-4 md:border-t-0 md:pt-0" : ""}
            `}
          >
            <span className="font-sans text-[36px] md:text-[56px] font-bold text-white tracking-[-1px] leading-none">
              {stat.value}
            </span>
            <span className="font-sans text-[11px] md:text-[13px] text-white/70 tracking-[0.5px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
