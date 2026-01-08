"use client";

import { useState } from "react";
import CashCalculator from "./CashCalculator";
import QRDisplay from "./QRDisplay";

const PaymentTabs = () => {
  const [activeTab, setActiveTab] = useState<"cash" | "qr">("qr");

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-5 border-b border-[var(--LightGrey)]">
        <button
          onClick={() => setActiveTab("qr")}
          className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "qr" ? "text-[var(--Black)]" : "text-[var(--Grey)]"
          }`}
        >
          QR
          {activeTab === "qr" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--Black)]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("cash")}
          className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "cash" ? "text-[var(--Black)]" : "text-[var(--Grey)]"
          }`}
        >
          Cash
          {activeTab === "cash" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--Black)]" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "cash" ? <CashCalculator /> : <QRDisplay />}
      </div>
    </div>
  );
};

export default PaymentTabs;
