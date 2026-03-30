"use client";

import GlitchText from "./GlitchText";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  titleWidth?: string;
  subtitleWidth?: string;
  center?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  titleWidth = "w-full max-w-[700px]",
  subtitleWidth = "w-full max-w-[600px]",
  center = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 w-full ${center ? "items-center text-center" : ""}`}>
      <span className="font-sans text-[12px] md:text-[13px] font-semibold text-[var(--dark-blue)] tracking-[1px]">
        <GlitchText text={label} speed={30} />
      </span>
      <h2
        className={`font-sans text-[32px] md:text-[48px] font-bold text-[var(--black)] tracking-[-0.5px] leading-[1.1] whitespace-pre-line ${titleWidth}`}
      >
        <GlitchText text={title} speed={40} delay={150} />
      </h2>
      {subtitle && (
        <p
          className={`font-sans text-[14px] md:text-[16px] text-[var(--text-muted)] leading-[1.6] text-pretty ${subtitleWidth}`}
        >
          <GlitchText text={subtitle} speed={20} delay={350} />
        </p>
      )}
    </div>
  );
}
