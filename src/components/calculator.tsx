"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Operator = "+" | "-" | "×" | "÷" | null;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForNewValue) {
        setDisplay(digit);
        setWaitingForNewValue(false);
      } else {
        setDisplay(display === "0" ? digit : display + digit);
      }
    },
    [display, waitingForNewValue]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForNewValue]);

  const calculate = useCallback(
    (left: string, right: string, op: Operator): string => {
      const l = parseFloat(left);
      const r = parseFloat(right);
      switch (op) {
        case "+":
          return String(l + r);
        case "-":
          return String(l - r);
        case "×":
          return String(l * r);
        case "÷":
          return r === 0 ? "Fehler" : String(l / r);
        default:
          return right;
      }
    },
    []
  );

  const handleOperator = useCallback(
    (nextOperator: Operator) => {
      const currentValue = display;

      if (previousValue !== null && operator && !waitingForNewValue) {
        const result = calculate(previousValue, currentValue, operator);
        setDisplay(result);
        setPreviousValue(result);
      } else {
        setPreviousValue(currentValue);
      }

      setOperator(nextOperator);
      setWaitingForNewValue(true);
    },
    [display, previousValue, operator, waitingForNewValue, calculate]
  );

  const handleEquals = useCallback(() => {
    if (previousValue === null || !operator) return;

    const result = calculate(previousValue, display, operator);
    setDisplay(result);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  }, [display, previousValue, operator, calculate]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  }, []);

  const handleToggleSign = useCallback(() => {
    setDisplay(String(parseFloat(display) * -1));
  }, [display]);

  const handlePercent = useCallback(() => {
    setDisplay(String(parseFloat(display) / 100));
  }, [display]);

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
      else if (e.key === ".") inputDecimal();
      else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        const opMap: Record<string, Operator> = {
          "+": "+",
          "-": "-",
          "*": "×",
          "/": "÷",
        };
        handleOperator(opMap[e.key]);
      } else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Escape") handleClear();
      else if (e.key === "Backspace") {
        setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
      }
    },
    [inputDigit, inputDecimal, handleOperator, handleEquals, handleClear, display]
  );

  // Attach keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const buttons = [
    { label: "C", action: handleClear, type: "function" },
    { label: "±", action: handleToggleSign, type: "function" },
    { label: "%", action: handlePercent, type: "function" },
    { label: "÷", action: () => handleOperator("÷"), type: "operator" },
    { label: "7", action: () => inputDigit("7"), type: "number" },
    { label: "8", action: () => inputDigit("8"), type: "number" },
    { label: "9", action: () => inputDigit("9"), type: "number" },
    { label: "×", action: () => handleOperator("×"), type: "operator" },
    { label: "4", action: () => inputDigit("4"), type: "number" },
    { label: "5", action: () => inputDigit("5"), type: "number" },
    { label: "6", action: () => inputDigit("6"), type: "number" },
    { label: "-", action: () => handleOperator("-"), type: "operator" },
    { label: "1", action: () => inputDigit("1"), type: "number" },
    { label: "2", action: () => inputDigit("2"), type: "number" },
    { label: "3", action: () => inputDigit("3"), type: "number" },
    { label: "+", action: () => handleOperator("+"), type: "operator" },
    { label: "0", action: () => inputDigit("0"), type: "number", colSpan: 2 },
    { label: ".", action: inputDecimal, type: "number" },
    { label: "=", action: handleEquals, type: "equals" },
  ];

  const getButtonClasses = (type: string, colSpan?: number) => {
    const baseClasses =
      "h-16 text-2xl font-medium transition-all duration-150 active:scale-95 border-0";
    const typeClasses = {
      number: "bg-zinc-800 text-white hover:bg-zinc-700",
      function: "bg-zinc-600 text-white hover:bg-zinc-500",
      operator: "bg-orange-500 text-white hover:bg-orange-600",
      equals: "bg-orange-500 text-white hover:bg-orange-600",
    };
    return cn(
      baseClasses,
      typeClasses[type as keyof typeof typeClasses] ?? typeClasses.number,
      colSpan === 2 && "col-span-2"
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-800">
        {/* Display */}
        <div className="p-6 pb-4">
          <div className="bg-zinc-950 rounded-2xl p-6 min-h-[120px] flex flex-col justify-end items-end">
            {previousValue && operator && (
              <div className="text-zinc-500 text-lg mb-2 font-light">
                {previousValue} {operator}
              </div>
            )}
            <div
              className={cn(
                "text-white text-right font-light tracking-tight break-all transition-all duration-200",
                display.length > 12
                  ? "text-3xl"
                  : display.length > 8
                    ? "text-4xl"
                    : "text-5xl"
              )}
            >
              {display}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 pt-0 grid grid-cols-4 gap-3">
          {buttons.map((btn, i) => (
            <Button
              key={i}
              variant="outline"
              className={getButtonClasses(btn.type, btn.colSpan)}
              onClick={btn.action}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
