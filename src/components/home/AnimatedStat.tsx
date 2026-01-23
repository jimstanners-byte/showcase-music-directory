'use client';

import { AnimatedCounter } from "@/components/AnimatedCounter";

export function AnimatedStat({ value, label, suffix }: { 
  value: number; 
  label: string; 
  suffix: string 
}) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold text-foreground">
        <AnimatedCounter value={value} duration={3500} />
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}