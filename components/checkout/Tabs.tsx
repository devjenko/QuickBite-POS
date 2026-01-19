"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  label: string;
  content: ReactNode;
};

const Tabs = ({ tabs, className }: { tabs: Tab[], className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex gap-2 mb-5 border-b border-[var(--LightGrey)] justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer px-6 pb-3 text-sm font-semibold transition-colors relative ${
              activeIndex === index ? "text-[var(--Black)]" : "text-[var(--Grey)]"
            }`}
          >
            {tab.label}
            {activeIndex === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--Black)]" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 flex hide-scrollbar">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
