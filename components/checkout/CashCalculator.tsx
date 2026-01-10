"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { buttonRows, quickAmounts } from "@/consts/cash-calculator";
import { useCartTotal } from "@/store/cart-store";

// Exchange rate: 4000 KHR = 1 USD
const KHR_PER_USD = 4000;

// Convert USD to KHR
const usdToKhr = (usd: number): number => Math.round(usd * KHR_PER_USD);

// Convert KHR to USD
const khrToUsd = (khr: number): number => khr / KHR_PER_USD;

type Currency = "USD" | "KHR";

const CashCalculator = () => {
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  const totalPriceUsd = useCartTotal();

  // Get display value based on currency
  const getDisplayForTotal = (curr: Currency, usdTotal: number) =>
    curr === "USD"
      ? (Math.floor(usdTotal * 100) / 100).toString()
      : usdToKhr(usdTotal).toString();

  const [display, setDisplay] = useState<string>(() =>
    getDisplayForTotal(currency, totalPriceUsd)
  );
  const [hasUserInput, setHasUserInput] = useState(false);

  // Track the last synced total to detect cart changes
  const [lastSyncedTotal, setLastSyncedTotal] = useState(totalPriceUsd);

  // Sync display with cart total when cart changes (only if user hasn't started calculating)
  if (totalPriceUsd !== lastSyncedTotal) {
    setLastSyncedTotal(totalPriceUsd);
    if (!hasUserInput) {
      setDisplay(getDisplayForTotal(currency, totalPriceUsd));
    }
  }

  // Handle currency toggle
  const handleCurrencyToggle = (newCurrency: Currency) => {
    if (newCurrency === currency) return;

    setCurrency(newCurrency);
    // Reset calculator with new currency's total
    setDisplay(getDisplayForTotal(newCurrency, totalPriceUsd));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setHasUserInput(false);
  };

  // Format number with commas for display
  const formatDisplay = (value: string) => {
    if (value === "Error") return value;
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    // Handle decimals
    if (value.includes(".")) {
      const [intPart, decPart] = value.split(".");
      const formattedInt = parseInt(intPart).toLocaleString();
      return decPart !== undefined
        ? `${formattedInt}.${decPart}`
        : formattedInt;
    }

    return num.toLocaleString();
  };

  // Get raw value without formatting
  const getRawValue = (formatted: string) => {
    return formatted.replace(/,/g, "");
  };

  const handleNumberClick = (num: string) => {
    setHasUserInput(true);

    if (display === "Error") {
      setDisplay(num);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      // Limit input length to prevent overflow
      const rawDisplay = getRawValue(display);
      if (rawDisplay.replace(".", "").length >= 12) return;

      setDisplay(rawDisplay === "0" ? num : rawDisplay + num);
    }
  };

  // Handle quick amount buttons (KHR denominations)
  // In KHR mode: adds KHR value directly
  // In USD mode: converts KHR to USD and adds
  const handleQuickAmount = (khrAmount: string) => {
    setHasUserInput(true);
    const khrValue = parseInt(khrAmount);
    // Convert to current currency
    const amountInCurrentCurrency =
      currency === "KHR" ? khrValue : khrToUsd(khrValue);

    const displayValue =
      currency === "KHR"
        ? khrValue.toString()
        : amountInCurrentCurrency.toFixed(2);

    if (display === "Error") {
      setDisplay(displayValue);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand || display === "0") {
      setDisplay(displayValue);
      setWaitingForOperand(false);
    } else {
      // Add the amount to current value
      const currentValue = parseFloat(getRawValue(display));
      const newValue = currentValue + amountInCurrentCurrency;

      // Format based on currency
      const formattedValue =
        currency === "KHR"
          ? Math.round(newValue).toString()
          : parseFloat(newValue.toFixed(2)).toString();

      // Prevent overflow
      if (formattedValue.replace(".", "").length > 12) return;

      setDisplay(formattedValue);
    }
  };

  const handleOperationClick = (op: string) => {
    if (display === "Error") return;

    const current = parseFloat(getRawValue(display));

    // If we already have an operation pending and user enters another, calculate first
    if (operation && previousValue && !waitingForOperand) {
      const result = performCalculation(
        parseFloat(previousValue),
        current,
        operation
      );
      if (result === null) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }
      setDisplay(result.toString());
      setPreviousValue(result.toString());
    } else {
      setPreviousValue(current.toString());
    }

    setOperation(op);
    setWaitingForOperand(true);
  };

  const performCalculation = (
    prev: number,
    current: number,
    op: string
  ): number | null => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        if (current === 0) return null;
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (display === "Error") return;

    const current = parseFloat(getRawValue(display));

    if (operation && previousValue) {
      const result = performCalculation(
        parseFloat(previousValue),
        current,
        operation
      );

      if (result === null) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
        return;
      }

      // Format result: remove trailing zeros but keep reasonable precision
      const formattedResult =
        Math.abs(result) < 0.0001 && result !== 0
          ? result.toExponential(2)
          : Number.isInteger(result)
            ? result.toString()
            : parseFloat(result.toFixed(8)).toString();

      setDisplay(formattedResult);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    // AC behavior: if display is not 0, first press clears display (C)
    // If display is 0 or after C, clear everything and reset to cart total (AC)
    if (getRawValue(display) !== "0" && !waitingForOperand) {
      setDisplay("0");
    } else {
      // Full reset - go back to cart total
      setDisplay(getDisplayForTotal(currency, totalPriceUsd));
      setPreviousValue(null);
      setOperation(null);
      setHasUserInput(false);
    }
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (display === "Error") {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    const rawDisplay = getRawValue(display);
    if (!rawDisplay.includes(".")) {
      setDisplay(rawDisplay + ".");
    }
  };

  // Determine clear button text (C vs AC like Apple)
  const clearButtonText =
    getRawValue(display) !== "0" && !waitingForOperand ? "C" : "AC";

  // Get conversion display for the secondary line
  const getConversionDisplay = () => {
    if (display === "Error") return null;
    const value = parseFloat(getRawValue(display));
    if (currency === "USD") {
      return `≈ ${usdToKhr(value).toLocaleString()}៛`;
    } else {
      return `≈ $${khrToUsd(value).toFixed(2)}`;
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-4 min-w-sm lg:min-w-lg">
        {/* Currency Toggle */}
        <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => handleCurrencyToggle("USD")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              currency === "USD"
                ? "bg-white text-[var(--Black)] shadow-sm"
                : "text-[var(--Grey)] hover:text-[var(--Black)]"
            }`}
          >
            $ USD
          </button>
          <button
            onClick={() => handleCurrencyToggle("KHR")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
              currency === "KHR"
                ? "bg-white text-[var(--Black)] shadow-sm"
                : "text-[var(--Grey)] hover:text-[var(--Black)]"
            }`}
          >
            ៛ KHR
          </button>
        </div>

        {/* Display */}
        <Card className="max-w-none">
          <CardContent className="p-6 w-full">
            <div className="bg-[var(--LightGrey)] p-6 rounded-lg min-h-[120px] flex flex-col justify-center items-end">
              {/* Show operation indicator */}
              {operation && previousValue && (
                <div className="text-sm text-[var(--Grey)] mb-1">
                  {currency === "USD" && "$"}
                  {formatDisplay(previousValue)}
                  {currency === "KHR" && "៛"} {operation}
                </div>
              )}
              {/* Main display */}
              <div className="text-right text-4xl font-semibold text-[var(--Black)] break-all">
                {display !== "Error" ? (
                  <>
                    {currency === "USD" && "$"}
                    {formatDisplay(display)}
                    {currency === "KHR" && "៛"}
                  </>
                ) : (
                  display
                )}
              </div>
              {/* Conversion equivalent */}
              {display !== "Error" && (
                <div className="text-sm text-[var(--Grey)] mt-1">
                  {getConversionDisplay()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-4 gap-3">
          {/* Clear button */}
          <Button
            onClick={handleClear}
            variant="grey"
            className="col-span-4 h-14 text-base font-semibold"
          >
            {clearButtonText}
          </Button>

          {/* Quick amount buttons (KHR denominations) */}
          <div className="col-span-4 grid grid-cols-4 gap-3">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                onClick={() => handleQuickAmount(amount)}
                variant="grey"
                className="h-14 text-sm font-semibold"
              >
                {parseInt(amount).toLocaleString()}៛
              </Button>
            ))}
          </div>

          {/* Calculator buttons */}
          {buttonRows.map((row, rowIndex) =>
            row.buttons.map((btn, btnIndex) => {
              const isOperator = row.ops[btnIndex];
              const isEquals = btn === "=";
              const isActiveOperator =
                isOperator && operation === btn && waitingForOperand;

              return (
                <Button
                  key={`${rowIndex}-${btn}`}
                  onClick={() => {
                    if (isEquals) {
                      handleEquals();
                    } else if (isOperator) {
                      handleOperationClick(btn);
                    } else if (btn === ".") {
                      handleDecimal();
                    } else {
                      handleNumberClick(btn);
                    }
                  }}
                  variant={isOperator || isEquals ? "dark" : "grey"}
                  className={`h-14 text-lg font-semibold ${
                    isActiveOperator ? "ring-2 ring-white ring-inset" : ""
                  }`}
                >
                  {btn}
                </Button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CashCalculator;
