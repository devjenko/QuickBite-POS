"use client";

import { ReactNode, useState } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-5 border-b border-[var(--LightGrey)]">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`px-6 pb-3 text-sm font-semibold transition-colors relative ${
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

      <div className="flex-1 overflow-y-auto min-h-0 flex">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
