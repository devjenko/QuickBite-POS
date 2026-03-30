"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

const slides = [
  {
    name: "Bella's Kitchen",
    type: "Italian family restaurant, 40 covers",
    quote: "Reduced order errors by 60% in the first week",
    accent: "#003049",
  },
  {
    name: "The Daily Grind",
    type: "Coffee shop & bakery, 3 locations",
    quote: "Managing menus across locations is finally painless",
    accent: "#00669b",
  },
  {
    name: "Harbor Grill",
    type: "Seafood restaurant, 80 covers",
    quote: "The dashboard insights helped us optimize our lunch specials",
    accent: "#008ed8",
  },
  {
    name: "Sunrise Caf\u00e9",
    type: "Breakfast spot & brunch bar",
    quote: "Our staff learned the system in under 10 minutes",
    accent: "#003049",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => Math.max(0, p - 1));
  const next = () => setActive((p) => Math.min(slides.length - 1, p + 1));

  const slide = slides[active];

  return (
    <section id="showcase" className="flex flex-col w-full bg-[#fafafa] pt-16 md:pt-[100px] pb-0 gap-8 md:gap-[48px]">
      {/* Header */}
      <div className="flex items-end justify-between px-6 md:px-[120px]">
        <SectionHeader
          label="Showcase"
          title={"Built for real restaurants"}
          titleWidth="w-full max-w-[600px]"
        />
        <div className="flex items-center gap-[8px] shrink-0">
          <button
            onClick={prev}
            className="flex items-center justify-center w-[44px] h-[44px] bg-white border border-[#e5e5e5] rounded-sm hover:border-[#003049] transition-colors"
          >
            <span className="font-[family-name:var(--font-inter)] text-[18px] font-semibold text-[#003049]">&lt;</span>
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center w-[44px] h-[44px] bg-[#003049] rounded-sm hover:bg-[#00669b] transition-colors"
          >
            <span className="font-[family-name:var(--font-inter)] text-[18px] font-semibold text-white">&gt;</span>
          </button>
        </div>
      </div>

      {/* Mobile: single card */}
      <div className="md:hidden px-6">
        <div
          className="flex flex-col gap-5 p-6 border-l-4 bg-white rounded-[10px] w-full border border-[#e5e5e5]"
          style={{ borderLeftColor: slide.accent }}
        >
          <div className="flex items-center justify-center h-[140px] bg-[#f4f4f4] rounded-[8px]">
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#b8b8b8]">Screenshot</span>
          </div>
          <h3 className="font-[family-name:var(--font-inter)] text-[20px] font-semibold text-[#180e19] leading-[1.2]">
            {slide.name}
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#6b7280]">
            {slide.type}
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#180e19] italic leading-[1.6]">
            &ldquo;{slide.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Desktop: carousel track */}
      <div className="hidden md:overflow-hidden h-[400px] md:block px-[120px]">
        <div
          className="flex gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${active} * (520px + 20px)))` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 p-[36px] h-[396px] w-[520px] shrink-0 bg-white border border-[#e5e5e5] border-l-4 rounded-[10px]"
              style={{ borderLeftColor: s.accent }}
            >
              <div className="flex items-center justify-center h-[180px] bg-[#f4f4f4] rounded-[8px]">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#b8b8b8]">Screenshot</span>
              </div>
              <h3 className="font-[family-name:var(--font-inter)] text-[22px] font-semibold text-[#180e19] leading-[1.2]">
                {s.name}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#6b7280]">
                {s.type}
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#180e19] italic leading-[1.6]">
                &ldquo;{s.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-[8px] px-6 md:px-[120px]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-[4px] rounded-full transition-all"
            style={{ width: i === active ? 32 : 8, backgroundColor: i === active ? "#003049" : "#e5e5e5" }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 md:px-[120px] pb-16 md:pb-[100px]">
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#6b7280]">
          Showing {active + 1} of {slides.length} restaurants
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#003049] font-medium cursor-pointer hover:underline">
          View all &rarr;
        </span>
      </div>
    </section>
  );
}
