"use client";

import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/Input";

export const title = "Currency Input";

const PriceInput = ({
  onChange,
}: {
  onChange: (value: number) => void;
  value?: number;
}) => (
  <div className="w-full  space-y-2">
    <div className="relative">
      <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        onChange={(e) => onChange?.(parseFloat(e.target.value) || 0)}
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
