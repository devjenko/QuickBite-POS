"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

const faqs = [
  {
    question: "Do I need special hardware to use QuickBite?",
    answer:
      "No. QuickBite runs in any modern browser on any device — tablets, laptops, even your phone. No proprietary hardware required.",
    defaultOpen: true,
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most restaurants are up and running in under 15 minutes. Create your account, add your menu items, and you\u2019re ready to take orders.",
  },
  {
    question: "Can I manage multiple locations?",
    answer:
      "Yes. Each location gets its own isolated workspace with its own menu, staff, and analytics — all managed from one account.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption, secure authentication with NextAuth.js, and your business data is completely isolated from other tenants.",
  },
  {
    question: "What if I need help getting started?",
    answer:
      "Our support team is here to help. Reach out anytime and we\u2019ll get you sorted.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="flex flex-col items-center w-full bg-[var(--background)] py-16 px-6 md:py-25 md:px-30"
    >
      <SectionHeader
        label="FAQ"
        title="Common questions"
        subtitle="Everything you need to know about QuickBite."
        center
      />

      <div className="h-10 md:h-16" />

      {/* FAQ items */}
      <div className="flex flex-col w-full max-w-[800px]">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="flex flex-col w-full border-t border-t-[var(--border-color)]"
            >
              <button
                className="flex items-center justify-between w-full py-5 md:h-18 text-left gap-4 bg-transparent border-none cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span
                  className="text-sm md:text-base font-semibold tracking-tight"
                  style={{
                    color: isOpen ? "var(--dark-blue)" : "var(--black)",
                  }}
                >
                  {faq.question}
                </span>
                <div
                  className="flex items-center justify-center w-8 h-8 shrink-0 rounded-md transition-colors"
                  style={{
                    backgroundColor: isOpen
                      ? "var(--dark-blue)"
                      : "var(--light-grey)",
                    border: isOpen
                      ? "none"
                      : "1px solid var(--border-color)",
                  }}
                >
                  <span
                    className="text-sm font-bold leading-none"
                    style={{
                      color: isOpen ? "#ffffff" : "var(--text-muted)",
                    }}
                  >
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </div>
              </button>
              {isOpen && faq.answer && (
                <div className="pb-8">
                  <p className="text-[13px] md:text-sm text-[var(--text-muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div className="border-t border-t-[var(--border-color)]" />
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 pt-10 md:pt-12">
        <span className="text-[13px] text-[var(--text-muted)]">
          Still have questions?
        </span>
        <a
          href="#"
          className="text-[13px] font-semibold text-[var(--dark-blue)] hover:underline"
        >
          Talk to our team &rarr;
        </a>
      </div>
    </section>
  );
}
