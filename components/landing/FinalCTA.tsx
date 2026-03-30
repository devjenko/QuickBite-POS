"use client";

import GlitchText from "./GlitchText";

export default function FinalCTA() {
  return (
    <section className="flex flex-col items-center w-full bg-[var(--accent)] py-16 px-6 md:p-[120px] gap-10 md:gap-[48px]">
      {/* Badge */}
      <div className="flex items-center justify-center gap-[8px] h-[32px] px-[16px] bg-white rounded-full border border-[var(--border)]">
        <span className="text-[12px] font-semibold text-[var(--dark-blue)] tracking-[0.3px]">
          <GlitchText text="Ready to get started?" speed={30} />
        </span>
      </div>

      {/* Title */}
      <h2 className="text-[36px] md:text-[64px] font-bold text-[var(--dark-blue)] tracking-[-1px] leading-[1.1] text-center w-full max-w-[800px]">
        <GlitchText text="Your next order is waiting." speed={40} delay={200} />
      </h2>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-[16px] w-full sm:w-auto">
        <button className="flex items-center justify-center w-full sm:w-[220px] h-[52px] bg-[var(--dark-blue)] hover:opacity-90 transition-opacity rounded-sm">
          <span className="text-[14px] font-semibold text-white tracking-[0.2px]">
            Get Started Free
          </span>
        </button>
        <button className="flex items-center justify-center w-full sm:w-[220px] h-[52px] bg-white border border-[var(--border)] hover:border-[var(--dark-blue)] transition-colors rounded-sm">
          <span className="text-[14px] font-semibold text-[var(--dark-blue)] tracking-[0.2px]">
            Schedule a Demo
          </span>
        </button>
      </div>
    </section>
  );
}
