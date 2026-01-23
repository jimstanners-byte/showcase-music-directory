import { AnimatedStat } from './AnimatedStat';

interface HomeStatsDisplayProps {
  stats: {
    listings: number;
    categories: number;
    countries: number;
  };
}

export function HomeStatsDisplay({ stats }: HomeStatsDisplayProps) {
  const statItems = [
    { value: stats.listings, label: "Listings", suffix: "+" },
    { value: stats.categories, label: "Categories", suffix: "" },
    { value: stats.countries, label: "Countries", suffix: "+" },
  ];

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