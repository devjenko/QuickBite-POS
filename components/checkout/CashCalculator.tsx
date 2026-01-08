"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const CashCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumberClick = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (operation && !newNumber) {
      calculate();
    }
    setPreviousValue(display);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (!operation || !previousValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          setDisplay("Error");
          setPreviousValue(null);
          setOperation(null);
          setNewNumber(true);
          return;
        }
        result = prev / current;
        break;
    }

    const formattedResult =
      result % 1 === 0 ? result.toString() : result.toFixed(2);
    setDisplay(formattedResult);
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleEquals = () => {
    if (operation && previousValue) {
      calculate();
    }
  };

  const buttonRows = [
    { buttons: ["7", "8", "9", "÷"], ops: [false, false, false, true] },
    { buttons: ["4", "5", "6", "×"], ops: [false, false, false, true] },
    { buttons: ["1", "2", "3", "-"], ops: [false, false, false, true] },
    { buttons: ["0", ".", "=", "+"], ops: [false, false, false, true] },
  ];

  return (
    <div className="flex flex-col gap-4 max-w-md min-w-xs m-auto">
      <Card className="max-w-none ">
        <CardContent className="p-6 w-full">
          <div className="bg-[var(--LightGrey)]  p-6 rounded-lg min-h-[100px] flex items-center justify-end">
            <div className="text-right text-4xl font-semibold  text-[var(--Black)] break-all">
              {display}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-3">
        <Button
          onClick={handleClear}
          variant="grey"
          className="col-span-4 h-14 text-base font-semibold"
        >
          Clear
        </Button>
        {buttonRows.map((row, rowIndex) =>
          row.buttons.map((btn, btnIndex) => {
            const isOperator = row.ops[btnIndex];
            const isEquals = btn === "=";

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
                className="h-14 text-lg font-semibold"
              >
                {btn}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CashCalculator;
