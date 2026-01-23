'use client';

import { useState } from "react";
import countryShapes from "world-map-country-shapes";
import { Button } from "@/components/ui/button";

interface WorldMapProps {
  venueCounts: Record<string, number>;
  onSelectContinent: (continent: string) => void;
}

// Continent to country code mapping (ISO 2-digit codes)
const CONTINENT_MAPPING: Record<string, string[]> = {
  'Europe': ['AD','AL','AT','BA','BE','BG','BY','CH','CY','CZ','DE','DK','EE','ES','FI','FO','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MD','ME','MK','MT','NL','NO','PL','PT','RO','RS','SE','SI','SK','UA','IC'],
  'North America': ['AG','BB','BS','BZ','CA','CR','CU','DM','DO','GD','GL','GT','HN','HT','JM','KN','KY','LC','MX','NI','PA','PR','SV','TC','TT','US','VC','VG','VI','AW','CW','GP','MQ','GF','AI','BM','MS','SX'],
  'South America': ['AR','BO','BR','CL','CO','EC','FK','GY','PE','PY','SR','UY','VE'],
  'Asia': ['AE','AF','AM','AZ','BD','BH','BN','BT','CN','GE','HK','ID','IL','IN','IQ','IR','JO','JP','KG','KH','KP','KR','KW','KZ','LA','LB','LK','MM','MN','MY','NP','OM','PH','PK','PS','QA','RU','SA','SG','SY','TH','TJ','TL','TM','TR','TW','UZ','VN','YE','MV'],
  'Africa': ['AO','BF','BI','BJ','BW','CD','CF','CG','CI','CM','CV','DJ','DZ','EG','EH','ER','ET','GA','GH','GM','GN','GQ','GW','KE','KM','LR','LS','LY','MA','MG','ML','MR','MU','MW','MZ','NA','NE','NG','RE','RW','SC','SD','SL','SN','SO','SS','ST','SZ','TD','TG','TN','TZ','UG','YT','ZA','ZM','ZW'],
  'Oceania': ['AU','FJ','NC','NR','NZ','PF','PG','SB','TO','VU','PN']
};

// Continent highlight colors
const CONTINENT_COLORS: Record<string, string> = {
  'Europe': '#ef4444',      // red - brand accent
  'North America': '#f97316', // orange
  'South America': '#eab308', // gold
  'Asia': '#22c55e',        // green
  'Africa': '#14b8a6',      // teal
  'Oceania': '#0ea5e9',     // sky blue
};

const CONTINENT_ORDER = [
  'Europe',
  'North America',
  'South America',
  'Asia',
  'Africa',
  'Oceania'
];

// Build country ID to continent lookup
const countryToContinent: Record<string, string> = {};
Object.entries(CONTINENT_MAPPING).forEach(([continent, countries]) => {
  countries.forEach(code => {
    countryToContinent[code] = continent;
  });
});

// Group country shapes by continent
const getCountryPathsByContinent = () => {
  const result: Record<string, { id: string; shape: string }[]> = {
    'Europe': [],
    'North America': [],
    'South America': [],
    'Asia': [],
    'Africa': [],
    'Oceania': [],
  };
  
  countryShapes.forEach((country: { id: string; shape: string }) => {
    const continent = countryToContinent[country.id];
    if (continent && result[continent]) {
      result[continent].push(country);
    }
  });
  
  return result;
};

const CONTINENT_PATHS = getCountryPathsByContinent();

// Get continent slug for URL
const getContinentSlug = (continent: string): string => {
  return continent.toLowerCase().replace(/\s+/g, '-');
};

export function WorldMap({ venueCounts, onSelectContinent }: WorldMapProps) {
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  const getCount = (continent: string): number => {
    return venueCounts[continent] || 0;
  };

  const handleContinentClick = (continent: string) => {
    onSelectContinent(continent);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Map container */}
      <div 
        className="relative rounded-xl overflow-hidden border border-zinc-700"
        style={{ backgroundColor: '#18181b' }}
        onMouseLeave={() => setHoveredContinent(null)}
      >
        <svg 
          viewBox="0 0 2000 1001" 
          className="w-full h-auto"
          style={{ maxHeight: '360px' }}
        >
          {/* Dark background */}
          <rect x="0" y="0" width="2000" height="1001" fill="#18181b" />
          
          {/* Render countries grouped by continent */}
          {Object.entries(CONTINENT_PATHS).map(([continent, countries]) => {
            const isHovered = hoveredContinent === continent;
            const color = CONTINENT_COLORS[continent] || '#3f3f46';
            
            return (
              <g key={continent}>
                {countries.map((country) => (
                  <path
                    key={country.id}
                    d={country.shape}
                    fill={isHovered ? color : '#3f3f46'}
                    stroke={isHovered ? color : '#52525b'}
                    strokeWidth={isHovered ? 1.5 : 0.5}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredContinent(continent)}
                    onClick={() => handleContinentClick(continent)}
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* Info card - bottom left */}
        <div
          className={`absolute bottom-3 left-3 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg px-4 py-3 transition-all duration-300 ${
            hoveredContinent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {hoveredContinent && (
            <>
              <div className="flex items-center gap-2.5">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: CONTINENT_COLORS[hoveredContinent] }}
                />
                <span 
                  className="font-semibold text-sm text-white"
                >
                  {hoveredContinent}
                </span>
              </div>
              <div className="text-sm text-zinc-400 mt-1">
                {getCount(hoveredContinent).toLocaleString()} venue{getCount(hoveredContinent) !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-zinc-500 mt-1.5 border-t border-zinc-700 pt-1.5">
                Click to explore
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick access buttons */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
        {CONTINENT_ORDER.map((continent) => {
          const color = CONTINENT_COLORS[continent];
          const isHovered = hoveredContinent === continent;
          const count = getCount(continent);
          
          return (
            <button
              key={continent}
              className="relative px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-200 text-center group"
              style={{
                borderColor: isHovered ? color : undefined,
                backgroundColor: isHovered ? `${color}15` : undefined,
              }}
              onMouseEnter={() => setHoveredContinent(continent)}
              onMouseLeave={() => setHoveredContinent(null)}
              onClick={() => handleContinentClick(continent)}
            >
              <div 
                className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors"
                style={{ color: isHovered ? color : undefined }}
              >
                {continent === 'North America' ? 'N. America' : 
                 continent === 'South America' ? 'S. America' : continent}
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">
                {count.toLocaleString()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Instruction text */}
      <p className="text-center text-sm text-zinc-500 mt-3">
        Hover over a region and click to explore venues
      </p>
    </div>
  );
}
