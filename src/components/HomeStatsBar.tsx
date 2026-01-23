'use client';

import { useHomeStats } from "@/hooks/useHomeStats";
import { AnimatedCounter } from "@/components/AnimatedCounter";

function AnimatedStat({ value, label, suffix }: { value: number; label: string; suffix: string }) {
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

export function HomeStatsBar() {
  const { data: stats, isLoading } = useHomeStats();

  const statItems = [
    { value: stats?.listings ?? 0, label: "Listings", suffix: "+" },
    { value: stats?.categories ?? 0, label: "Categories", suffix: "" },
    { value: stats?.countries ?? 0, label: "Countries", suffix: "+" },
  ];

  if (isLoading) {
    return (
      <section className="py-10 sm:py-14">
        <div className="container">
          <div className="flex items-center justify-center gap-6 sm:gap-16 md:gap-24">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-10 w-20 bg-muted animate-pulse rounded mx-auto mb-2" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="container">
        <div className="flex items-center justify-center gap-6 sm:gap-16 md:gap-24">
          {statItems.map((stat, index) => (
            <AnimatedStat
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
