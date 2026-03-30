const logos = ["Bella's Bistro", "The Daily Grind", "Sunrise Café", "Harbor Grill", "Maple & Vine"];

export default function Logos() {
  return (
    <section className="flex flex-col items-center w-full bg-white py-[48px] px-6 md:px-[120px] gap-[32px]">
      <span className="font-sans text-[12px] text-[var(--text-muted)] tracking-[1.5px]">
        Loved by food businesses everywhere
      </span>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-[64px] w-full">
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-sans text-[14px] md:text-[15px] font-semibold text-[var(--grey)] tracking-[0.5px]"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
