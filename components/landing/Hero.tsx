"use client";

import { useEffect, useState } from "react";
import GlitchText from "./GlitchText";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex flex-col items-center w-full bg-white py-16 px-6 md:py-[120px] md:px-[120px] overflow-hidden">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2 h-[34px] px-4 bg-[var(--ultra-light-blue)] border border-[var(--light-blue)] rounded-full">
        <span className="w-[6px] h-[6px] rounded-full bg-[var(--green)]" />
        <span className="font-sans text-[12px] md:text-[13px] font-medium text-[var(--blue)] tracking-wide whitespace-nowrap">
          Now serving Next.js 15 and React 19
        </span>
      </div>

      <div className="h-8 md:h-[36px]" />

      {/* Headline */}
      <h1 className="font-sans text-[clamp(32px,7vw,72px)] font-bold text-[var(--dark-blue)] tracking-tight leading-[1.1] text-center w-full max-w-[900px]">
        <GlitchText text="Your restaurant," delay={100} />
        <br />
        <GlitchText text="running smoothly." delay={300} />
      </h1>

      <div className="h-6 md:h-[28px]" />

      {/* Subheading */}
      <p className="font-sans text-[16px] md:text-[18px] text-[var(--text-muted)] leading-[1.7] text-center w-full max-w-[640px]">
        A modern point-of-sale system that helps you manage menus, track orders,
        and grow your business — all from one beautiful interface.
      </p>

      <div className="h-10 md:h-[48px]" />

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <a
          href="#"
          className="flex items-center justify-center w-full sm:w-auto px-8 h-[52px] bg-[var(--dark-blue)] hover:opacity-90 transition-opacity rounded-sm"
        >
          <span className="font-sans text-[15px] font-semibold text-white">
            Get Started Free
          </span>
        </a>
        <a
          href="#how-it-works"
          className="flex items-center justify-center w-full sm:w-auto px-8 h-[52px] bg-white border border-[var(--border-color)] hover:border-[var(--grey)] transition-colors rounded-sm"
        >
          <span className="font-sans text-[15px] text-[var(--text-muted)]">
            See How It Works
          </span>
        </a>
      </div>

      <div className="h-5 md:h-[20px]" />

      <p className="font-sans text-[13px] text-[var(--grey)] text-center">
        No credit card required &middot; Free plan available &middot; Set up in minutes
      </p>

      <div className="h-12 md:h-[72px]" />

      {/* POS Illustration */}
      <div
        className="w-full max-w-[960px] rounded-[10px] overflow-hidden"
        style={{ border: "1px solid var(--border-color)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
        <POSIllustration mounted={mounted} />
      </div>
    </section>
  );
}

/* ──────────────────────── POS Illustration SVG ──────────────────────── */

const menuItems = [
  { name: "Margherita Pizza", price: "$12.99", color: "#FFE0B2", icon: "🍕" },
  { name: "Caesar Salad",     price: "$9.50",  color: "#C8E6C9", icon: "🥗" },
  { name: "Grilled Salmon",   price: "$18.00", color: "#FFCCBC", icon: "🐟" },
  { name: "Pasta Alfredo",    price: "$14.50", color: "#E1BEE7", icon: "🍝" },
  { name: "Chicken Burger",   price: "$11.00", color: "#FFE082", icon: "🍔" },
  { name: "Tomato Soup",      price: "$7.50",  color: "#FFCDD2", icon: "🍲" },
];

const orderItems = [
  { name: "Margherita Pizza", qty: 2, price: "$25.98" },
  { name: "Caesar Salad",     qty: 1, price: "$9.50"  },
  { name: "Grilled Salmon",   qty: 1, price: "$18.00" },
];

function POSIllustration({ mounted }: { mounted: boolean }) {
  return (
    <svg
      viewBox="0 0 960 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <clipPath id="posClip">
          <rect width="960" height="520" rx="10" />
        </clipPath>
      </defs>

      <g clipPath="url(#posClip)">
        {/* Background */}
        <rect width="960" height="520" fill="#fafafa" />

        {/* ── Top bar ── */}
        <rect width="960" height="52" fill="#ffffff" />
        <line x1="0" y1="52" x2="960" y2="52" stroke="#e5e5e5" strokeWidth="1" />

        {/* Logo area */}
        <text x="24" y="33" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#003049">
          QuickBite
        </text>
        <text x="110" y="33" fontFamily="Inter, sans-serif" fontSize="12" fill="#6b7280">
          Dashboard
        </text>

        {/* Top-right status */}
        <circle cx="880" cy="26" r="4" fill="#36cd1d" />
        <text x="890" y="30" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Online</text>

        {/* ── Sidebar / Categories ── */}
        <rect x="0" y="52" width="160" height="468" fill="#ffffff" />
        <line x1="160" y1="52" x2="160" y2="520" stroke="#e5e5e5" strokeWidth="1" />

        <text x="20" y="84" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#003049" letterSpacing="0.5">
          CATEGORIES
        </text>

        {/* Category items */}
        {["All Items", "Pizza", "Salads", "Seafood", "Pasta", "Burgers", "Soups"].map((cat, i) => {
          const y = 100 + i * 38;
          const isActive = i === 0;
          return (
            <g
              key={cat}
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.06}s`,
              }}
            >
              {isActive && <rect x="0" y={y} width="160" height="34" fill="#f4fbff" rx="0" />}
              {isActive && <rect x="0" y={y} width="3" height="34" fill="#003049" rx="1" />}
              <text
                x="24"
                y={y + 22}
                fontFamily="Inter, sans-serif"
                fontSize="13"
                fill={isActive ? "#003049" : "#6b7280"}
                fontWeight={isActive ? "600" : "400"}
              >
                {cat}
              </text>
            </g>
          );
        })}

        {/* ── Menu grid ── */}
        {menuItems.map((item, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 184 + col * 192;
          const y = 72 + row * 210;

          return (
            <g
              key={item.name}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
              }}
            >
              {/* Card */}
              <rect x={x} y={y} width="176" height="190" rx="10" fill="#ffffff" stroke="#e5e5e5" strokeWidth="1" />

              {/* Image placeholder */}
              <rect x={x + 12} y={y + 12} width="152" height="100" rx="8" fill={item.color} opacity="0.5" />
              <text
                x={x + 88}
                y={y + 68}
                fontFamily="Inter, sans-serif"
                fontSize="28"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {item.icon}
              </text>

              {/* Name */}
              <text x={x + 14} y={y + 134} fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#180e19">
                {item.name}
              </text>

              {/* Price */}
              <text x={x + 14} y={y + 154} fontFamily="Inter, sans-serif" fontSize="13" fill="#00669b" fontWeight="600">
                {item.price}
              </text>

              {/* Add button */}
              <rect x={x + 128} y={y + 156} width="36" height="24" rx="6" fill="#003049" />
              <text x={x + 140} y={y + 173} fontFamily="Inter, sans-serif" fontSize="16" fill="#ffffff" fontWeight="500" textAnchor="middle">
                +
              </text>
            </g>
          );
        })}

        {/* ── Order sidebar ── */}
        <rect x="760" y="52" width="200" height="468" fill="#ffffff" />
        <line x1="760" y1="52" x2="760" y2="520" stroke="#e5e5e5" strokeWidth="1" />

        <text x="780" y="84" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#003049">
          Current Order
        </text>
        <text x="780" y="102" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">
          Table 4 &middot; 3 items
        </text>

        <line x1="780" y1="114" x2="940" y2="114" stroke="#e5e5e5" strokeWidth="1" />

        {/* Order items */}
        {orderItems.map((item, i) => {
          const y = 130 + i * 52;
          return (
            <g
              key={item.name}
              style={{
                opacity: mounted ? 1 : 0,
                transition: `opacity 0.4s ease ${0.3 + i * 0.1}s`,
              }}
            >
              <text x="780" y={y + 16} fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="#180e19">
                {item.name}
              </text>
              <text x="780" y={y + 34} fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">
                Qty: {item.qty}
              </text>
              <text x="935" y={y + 16} fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#003049" textAnchor="end">
                {item.price}
              </text>
              {i < orderItems.length - 1 && (
                <line x1="780" y1={y + 46} x2="940" y2={y + 46} stroke="#f0f0f0" strokeWidth="1" />
              )}
            </g>
          );
        })}

        {/* Totals */}
        <line x1="780" y1="296" x2="940" y2="296" stroke="#e5e5e5" strokeWidth="1" />
        <text x="780" y="320" fontFamily="Inter, sans-serif" fontSize="12" fill="#6b7280">Subtotal</text>
        <text x="935" y="320" fontFamily="Inter, sans-serif" fontSize="12" fill="#180e19" fontWeight="500" textAnchor="end">$53.48</text>

        <text x="780" y="342" fontFamily="Inter, sans-serif" fontSize="12" fill="#6b7280">Tax</text>
        <text x="935" y="342" fontFamily="Inter, sans-serif" fontSize="12" fill="#180e19" fontWeight="500" textAnchor="end">$4.28</text>

        <line x1="780" y1="354" x2="940" y2="354" stroke="#e5e5e5" strokeWidth="1" />
        <text x="780" y="378" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#003049">Total</text>
        <text x="935" y="378" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#003049" textAnchor="end">$57.76</text>

        {/* Place order button */}
        <rect x="780" y="470" width="160" height="40" rx="8" fill="#003049" />
        <text x="860" y="495" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill="#ffffff" textAnchor="middle">
          Place Order
        </text>
      </g>
    </svg>
  );
}
