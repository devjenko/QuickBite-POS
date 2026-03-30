"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Features",     section: "features"   },
  { label: "How It Works", section: "how-it-works"},
  { label: "Pricing",      section: "pricing"    },
  { label: "FAQ",          section: "faq"        },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("");
  const [menuOpen, setMenuOpen]   = useState(false);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = links.map((l) => l.section).filter(Boolean);
    const obs: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });

    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:           scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter:       scrolled ? "blur(14px)"             : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)"             : "none",
        borderBottom:         scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between h-[60px] px-6 md:px-[48px] max-w-[1400px] mx-auto">

        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-2 shrink-0 group">
          <Image src="/quickbite-icon.webp" alt="QuickBite logo" width={32} height={32} className="rounded-sm object-cover" />
          <span className="font-sans text-[17px] font-bold text-[var(--dark-blue)] tracking-tight">
            QuickBite
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-[32px]">
          {links.map(({ label, section }) => {
            const isActive = active === section;
            return (
              <button
                key={label}
                onClick={() => scrollTo(section)}
                className={`relative font-sans text-[14px] transition-colors duration-150 bg-transparent border-none cursor-pointer ${
                  isActive ? "text-[var(--dark-blue)] font-medium" : "text-[var(--text-muted)] hover:text-[var(--black)]"
                }`}
              >
                {label}
                <span
                  className="absolute left-0 -bottom-[3px] h-[2px] bg-[var(--dark-blue)] rounded-full transition-all duration-300"
                  style={{ width: isActive ? "100%" : "0%" }}
                />
              </button>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-[14px]">
          <a
            href="#"
            className="font-sans text-[14px] text-[var(--text-muted)] hover:text-[var(--dark-blue)] transition-colors"
          >
            Log in
          </a>
          <a
            href="#"
            className="font-sans text-[14px] font-semibold text-white bg-[var(--dark-blue)] px-[20px] py-[9px] rounded-sm hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>

        {/* ── Mobile burger ── */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-[20px] h-[1.5px] bg-[var(--dark-blue)] transition-transform duration-200 origin-center"
            style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
          />
          <span
            className="block w-[20px] h-[1.5px] bg-[var(--dark-blue)] transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-[20px] h-[1.5px] bg-[var(--dark-blue)] transition-transform duration-200 origin-center"
            style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight:    menuOpen ? "400px" : "0px",
          background:   "rgba(255,255,255,0.98)",
          backdropFilter: "blur(14px)",
          borderBottom: menuOpen ? "1px solid var(--border-color)" : "none",
        }}
      >
        <nav className="flex flex-col px-6 py-5 gap-0">
          {links.map(({ label, section }) => {
            const isActive = active === section;
            return (
              <button
                key={label}
                onClick={() => { scrollTo(section); setMenuOpen(false); }}
                className={`flex items-center gap-2 w-full font-sans text-[15px] py-[14px] border-b border-[var(--border-color)] transition-colors bg-transparent border-x-0 border-t-0 cursor-pointer ${
                  isActive ? "text-[var(--dark-blue)] font-medium" : "text-[var(--text-muted)]"
                }`}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full shrink-0 transition-colors"
                  style={{ background: isActive ? "var(--dark-blue)" : "var(--border-color)" }}
                />
                {label}
              </button>
            );
          })}
          <div className="flex flex-col gap-[10px] pt-5">
            <a href="#" className="font-sans text-[15px] text-[var(--text-muted)]">Log in</a>
            <a
              href="#"
              className="font-sans text-[14px] font-semibold text-white bg-[var(--dark-blue)] px-[20px] py-[11px] text-center rounded-sm hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
