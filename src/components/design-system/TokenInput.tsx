import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CSS_UNITS = ["px", "rem", "em", "vw", "vh", "%", "pt", "ch"];

function parseValueAndUnit(value: string | number, defaultUnit: string = "px"): { numericValue: string; unit: string } {
  if (typeof value === "number") {
    return { numericValue: String(value), unit: defaultUnit };
  }
  
  // Match number (including decimals) followed by optional unit
  const match = value.match(/^(-?[\d.]+)\s*([a-z%]+)?$/i);
  if (match) {
    const unit = match[2]?.toLowerCase();
    return {
      numericValue: match[1],
      unit: unit && CSS_UNITS.includes(unit) ? unit : defaultUnit,
    };
  }
  
  return { numericValue: value, unit: defaultUnit };
}

interface TokenInputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "number" | "color";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  allowUnitChange?: boolean;
}

export function TokenInput({
  label,
  value,
  onChange,
  type = "text",
  unit: defaultUnit = "px",
  min,
  max,
  step = 1,
  allowUnitChange = false,
}: TokenInputProps) {
  const [currentUnit, setCurrentUnit] = useState(defaultUnit);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Sync input value from prop
  useEffect(() => {
    if (!isFocused) {
      if (allowUnitChange && typeof value === "string") {
        const { numericValue, unit } = parseValueAndUnit(value, defaultUnit);
        setInputValue(numericValue);
        setCurrentUnit(unit);
      } else {
        setInputValue(String(value));
      }
    }
  }, [value, allowUnitChange, defaultUnit, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    setInputValue(rawInput);
    
    if (type === "color") {
      onChange(rawInput);
      return;
    }

    if (allowUnitChange) {
      // Check if user typed a complete value with unit
      const { numericValue, unit } = parseValueAndUnit(rawInput, currentUnit);
      
      // Only update if we have a valid number
      if (numericValue && !isNaN(parseFloat(numericValue))) {
        if (CSS_UNITS.includes(unit)) {
          setCurrentUnit(unit);
        }
        onChange(`${numericValue}${unit}`);
      }
    } else {
      if (type === "number") {
        const num = parseFloat(rawInput);
        if (!isNaN(num)) {
          onChange(num);
        }
      } else {
        onChange(rawInput);
      }
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // On blur, ensure value is properly formatted
    if (allowUnitChange) {
      const { numericValue, unit } = parseValueAndUnit(inputValue, currentUnit);
      if (numericValue && !isNaN(parseFloat(numericValue))) {
        setInputValue(numericValue);
        setCurrentUnit(unit);
        onChange(`${numericValue}${unit}`);
      }
    }
  };

  const displayValue = allowUnitChange ? inputValue : (isFocused ? inputValue : value);
  const fullValue = allowUnitChange ? `${inputValue}${currentUnit}` : String(value);

  const applyDelta = (direction: 1 | -1, multiplier = 1) => {
    const baseStep = step ?? 1;
    const delta = baseStep * multiplier * direction;

    if (allowUnitChange) {
      const { numericValue, unit } = parseValueAndUnit(displayValue, currentUnit);
      const parsed = parseFloat(numericValue);
      if (isNaN(parsed)) return;
      const next = parsed + delta;
      const clamped = min !== undefined ? Math.max(min, next) : next;
      const bounded = max !== undefined ? Math.min(max, clamped) : clamped;
      const nextValue = `${bounded}${unit}`;
      setInputValue(String(bounded));
      setCurrentUnit(unit);
      onChange(nextValue);
    } else if (type === "number" || type === "text") {
      const parsed = parseFloat(String(displayValue));
      if (isNaN(parsed)) return;
      const next = parsed + delta;
      const clamped = min !== undefined ? Math.max(min, next) : next;
      const bounded = max !== undefined ? Math.min(max, clamped) : clamped;
      setInputValue(String(bounded));
      onChange(bounded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const direction = e.key === "ArrowUp" ? 1 : -1;
    const shiftMultiplier = e.shiftKey ? 10 : 1;
    const altMultiplier = e.altKey ? 0.1 : 1;
    applyDelta(direction, shiftMultiplier * altMultiplier);
  };

  return (
    <div className="flex flex-col">
      <Label className="text-xs text-muted-foreground uppercase tracking-wider h-4 leading-4 truncate mb-1.5" title={label}>
        {label}
      </Label>
      <div className="relative flex items-center gap-2">
        {type === "color" ? (
          <div className="flex items-center gap-2 w-full">
            <input
              type="color"
              value={value as string}
              onChange={handleChange}
              className="w-10 h-10 rounded border border-border cursor-pointer bg-transparent"
            />
            <Input
              type="text"
              value={value}
              onChange={handleChange}
              className="flex-1 bg-musio-gray/50 border-border text-foreground font-mono text-sm"
            />
          </div>
        ) : (
          <div className="relative flex items-center gap-2 w-full">
            {/* Live tooltip above input */}
            {isFocused && (
              <div className="absolute -top-8 left-0 px-2 py-1 bg-foreground text-background text-xs font-mono rounded shadow-lg whitespace-nowrap z-10">
                {fullValue}
              </div>
            )}
            <Input
              type="text"
              value={displayValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              min={min}
              max={max}
              step={step}
              className="flex-1 bg-musio-gray/50 border-border text-foreground font-mono text-sm"
            />
            {(defaultUnit || currentUnit) && (
              <span className="text-xs text-muted-foreground min-w-[2rem]">
                {allowUnitChange ? currentUnit : defaultUnit}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
