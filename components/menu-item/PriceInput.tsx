"use client";

import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

export const title = "Currency Input";

const PriceInput = () => (
  <div className="w-full max-w-sm space-y-2">
    <div className="relative">
      <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="bg-background pl-9"
        id="currency-input"
        min="0"
        placeholder="0.00"
        step="0.01"
        type="number"
      />
    </div>
  </div>
);

export default PriceInput;
