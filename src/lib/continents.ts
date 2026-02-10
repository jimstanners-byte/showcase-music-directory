// Continent configuration and country mappings

export const CONTINENT_COUNTRIES: Record<string, string[]> = {
  Europe: [
    // Western Europe
    "United Kingdom",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "The Netherlands",
    "Netherlands",
    "Netherland",
    "Belgium",
    "Austria",
    "Switzerland",
    "Ireland",
    "Portugal",
    "Luxembourg",
    "Gibraltar",
    // Northern Europe
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Iceland",
    // Eastern Europe
    "Poland",
    "Czech Republic",
    "Slovak Republic",
    "Slovakia",
    "Hungary",
    "Romania",
    "Bulgaria",
    "Russia",
    "Ukraine",
    "Belarus",
    "Moldova",
    // Southern Europe
    "Greece",
    "Croatia",
    "Slovenia",
    "Serbia",
    "Bosnia and Herzegovina",
    "Bosnia",
    "Albania",
    "North Macedonia",
    "Macedonia",
    "Montenegro",
    "Kosovo",
    // Baltic States
    "Estonia",
    "Latvia",
    "Lithuania",
    // Other
    "Malta",
    "Cyprus",
    "Georgia",
    "Armenia",
    "Azerbaijan",
    "Turkey",
    "Andorra",
    "Monaco",
    "San Marino",
    "Vatican City",
    "Liechtenstein",
  ],
  "North America": [
    "United States",
    "Canada",
    "Mexico",
    "USA",
    "US",
    "Bahamas",
    "Jamaica",
    "Trinidad and Tobago",
    "Barbados",
    "Dominican Republic",
    "Cuba",
    "Haiti",
    "Costa Rica",
    "Panama",
    "Guatemala",
    "Honduras",
    "El Salvador",
    "Nicaragua",
    "Belize",
    "Puerto Rico",
    "Cayman Islands",
    "Bermuda",
    "Aruba",
    "Curacao",
  ],
  Asia: [
    // East Asia
    "Japan",
    "South Korea",
    "China",
    "Taiwan",
    "Hong Kong",
    "Macau",
    "Mongolia",
    // Southeast Asia
    "Singapore",
    "Thailand",
    "Malaysia",
    "Indonesia",
    "Philippines",
    "Vietnam",
    "Cambodia",
    "Laos",
    "Myanmar",
    "Brunei",
    // South Asia
    "India",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Nepal",
    "Bhutan",
    "Maldives",
    // Central Asia
    "Kazakhstan",
    "Uzbekistan",
    "Turkmenistan",
    "Kyrgyzstan",
    "Tajikistan",
    // Middle East
    "United Arab Emirates",
    "UAE",
    "Israel",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
    "Jordan",
    "Lebanon",
    "Iraq",
    "Iran",
    "Yemen",
    "Syria",
  ],
  "South America": [
    "Brazil",
    "Argentina",
    "Chile",
    "Colombia",
    "Peru",
    "Venezuela",
    "Ecuador",
    "Uruguay",
    "Paraguay",
    "Bolivia",
    "Guyana",
    "Suriname",
    "French Guiana",
  ],
  Oceania: [
    "Australia",
    "New Zealand",
    "Fiji",
    "Papua New Guinea",
    "Solomon Islands",
    "Vanuatu",
    "Samoa",
    "Tonga",
    "Micronesia",
    "Palau",
    "Marshall Islands",
    "Kiribati",
    "Nauru",
    "Tuvalu",
  ],
  Africa: [
    // Northern Africa
    "Egypt",
    "Morocco",
    "Tunisia",
    "Algeria",
    "Libya",
    "Sudan",
    // Western Africa
    "Nigeria",
    "Ghana",
    "Senegal",
    "Ivory Coast",
    "Mali",
    "Burkina Faso",
    "Guinea",
    "Benin",
    "Togo",
    "Sierra Leone",
    "Liberia",
    "Mauritania",
    "Niger",
    "Gambia",
    "Guinea-Bissau",
    "Cape Verde",
    // Eastern Africa
    "Kenya",
    "Ethiopia",
    "Tanzania",
    "Uganda",
    "Rwanda",
    "Burundi",
    "Somalia",
    "Djibouti",
    "Eritrea",
    "South Sudan",
    "Seychelles",
    "Mauritius",
    // Southern Africa
    "South Africa",
    "Namibia",
    "Botswana",
    "Zimbabwe",
    "Zambia",
    "Mozambique",
    "Angola",
    "Malawi",
    "Lesotho",
    "Eswatini",
    "Madagascar",
    "Comoros",
    // Central Africa
    "Democratic Republic of the Congo",
    "Republic of the Congo",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Gabon",
    "Equatorial Guinea",
    "Sao Tome and Principe",
  ],
};

export const CONTINENT_COLORS: Record<string, string> = {
  Europe: "#ef4444", // Red
  "North America": "#f97316", // Orange
  "South America": "#eab308", // Gold
  Asia: "#22c55e", // Green
  Africa: "#14b8a6", // Teal
  Oceania: "#0ea5e9", // Sky blue
};

export const CONTINENT_ORDER = ["Europe", "North America", "Asia", "South America", "Oceania", "Africa"];

export function getContinent(country: string): string | undefined {
  for (const [continent, countries] of Object.entries(CONTINENT_COUNTRIES)) {
    if (countries.includes(country)) return continent;
  }
  return undefined;
}

export function getContinentCountries(continent: string): string[] {
  return CONTINENT_COUNTRIES[continent] || [];
}

export function getContinentSlug(continent: string): string {
  return continent.toLowerCase().replace(/\s+/g, "-");
}

export function getContinentFromSlug(slug: string): string | undefined {
  const normalized = slug.toLowerCase();
  return CONTINENT_ORDER.find((c) => getContinentSlug(c) === normalized);
}