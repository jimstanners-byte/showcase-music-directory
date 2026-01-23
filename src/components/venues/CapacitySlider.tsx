'use client';

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CapacitySliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  variant?: "stacked" | "inline";
}

// Stepped scale for capacity (log-like distribution)
const CAPACITY_STEPS = [
  0, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 
  10000, 15000, 20000, 30000, 50000, 75000, 100000
];

function valueToStep(value: number): number {
  for (let i = CAPACITY_STEPS.length - 1; i >= 0; i--) {
    if (value >= CAPACITY_STEPS[i]) return i;
  }
  return 0;
}

function stepToValue(step: number): number {
  return CAPACITY_STEPS[Math.min(step, CAPACITY_STEPS.length - 1)];
}

function formatCapacity(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }
  return value.toString();
}

export function CapacitySlider({ min, max, onChange, variant = "stacked" }: CapacitySliderProps) {
  const [values, setValues] = useState<[number, number]>([
    valueToStep(min),
    valueToStep(max),
  ]);

  // Update internal state when props change
  useEffect(() => {
    setValues([valueToStep(min), valueToStep(max)]);
  }, [min, max]);

  const handleChange = (newValues: number[]) => {
    const sorted = [Math.min(newValues[0], newValues[1]), Math.max(newValues[0], newValues[1])] as [number, number];
    setValues(sorted);
  };

  const handleCommit = () => {
    onChange(stepToValue(values[0]), stepToValue(values[1]));
  };

  const minValue = stepToValue(values[0]);
  const maxValue = stepToValue(values[1]);
  const isDefault = minValue === 0 && maxValue === 100000;

  if (variant === "inline") {
    return (
      <div className={cn(
        "flex items-center gap-1.5 lg:gap-2 h-9 px-2 lg:px-3 rounded-md border",
        isDefault 
          ? "border-input bg-background" 
          : "border-primary bg-primary/5"
      )}>
        <span className={cn(
          "text-sm whitespace-nowrap hidden lg:inline",
          isDefault ? "text-muted-foreground" : "text-primary font-medium"
        )}>Capacity</span>
        <span className={cn(
          "text-sm whitespace-nowrap lg:hidden",
          isDefault ? "text-muted-foreground" : "text-primary font-medium"
        )}>Cap.</span>
        <Slider
          min={0}
          max={CAPACITY_STEPS.length - 1}
          step={1}
          value={values}
          onValueChange={handleChange}
          onValueCommit={handleCommit}
          className="w-16 lg:w-24"
        />
        <span className={cn(
          "text-sm whitespace-nowrap",
          isDefault ? "text-muted-foreground" : "text-primary font-medium"
        )}>
          {formatCapacity(minValue)}-{formatCapacity(maxValue)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 min-w-[180px]">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Capacity</span>
        <span className={isDefault ? "text-muted-foreground" : "text-foreground font-medium"}>
          {formatCapacity(minValue)} - {formatCapacity(maxValue)}
        </span>
      </div>
      <Slider
        min={0}
        max={CAPACITY_STEPS.length - 1}
        step={1}
        value={values}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
        className="w-full"
      />
    </div>
  );
}
