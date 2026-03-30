"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** ms before animation starts after entering viewport */
  delay?: number;
  /** kept for API compatibility — unused */
  speed?: number;
}

export default function GlitchText({
  text,
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {text}
    </span>
  );
}
