'use client';

import { useEffect, useState, memo } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const DigitColumn = memo(function DigitColumn({ 
  digit, 
  duration 
}: { 
  digit: string; 
  duration: number;
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Small delay to trigger the animation after mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const targetIndex = DIGITS.indexOf(digit);
  
  return (
    <span className="inline-block h-[1em] overflow-hidden relative">
      <span
        className={cn(
          "inline-flex flex-col transition-transform ease-out",
          mounted ? "" : ""
        )}
        style={{
          transform: mounted ? `translateY(-${targetIndex * 10}%)` : "translateY(0)",
          transitionDuration: `${duration}ms`,
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            className="h-[1em] flex items-center justify-center"
            aria-hidden={d !== digit}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
});

const Separator = memo(function Separator({ char }: { char: string }) {
  return <span className="inline-block">{char}</span>;
});

export const AnimatedCounter = memo(function AnimatedCounter({
  value,
  className,
  duration = 3000,
}: AnimatedCounterProps) {
  // Format the number with commas
  const formattedValue = value.toLocaleString();
  
  // Split into individual characters
  const characters = formattedValue.split("");
  
  // Calculate staggered delay for each digit (last digit animates first, creating a rolling effect)
  const digitCount = characters.filter(c => DIGITS.includes(c)).length;
  
  let digitIndex = 0;
  
  return (
    <span className={cn("inline-flex tabular-nums", className)}>
      {characters.map((char, index) => {
        if (DIGITS.includes(char)) {
          // Stagger from right to left (rightmost digit gets shortest duration, leftmost gets full)
          const currentDigitIndex = digitIndex;
          digitIndex++;
          
          // Calculate duration: rightmost digit completes first
          const positionFromRight = digitCount - currentDigitIndex - 1;
          const staggeredDuration = duration - (positionFromRight * 150);
          
          return (
            <DigitColumn
              key={`${index}-${char}`}
              digit={char}
              duration={Math.max(staggeredDuration, 800)}
            />
          );
        }
        
        return <Separator key={index} char={char} />;
      })}
    </span>
  );
});
