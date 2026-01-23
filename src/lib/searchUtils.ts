'use client';

/**
 * Known location terms to strip from search queries.
 * These are countries, regions, states, and major cities that users might append to searches.
 * Organized by type for maintainability.
 */

// Countries (including common variations and abbreviations)
const COUNTRIES = [
  // UK variations
  "uk",
  "united kingdom",
  "great britain",
  "britain",
  "england",
  "scotland",
  "wales",
  "northern ireland",
  // US variations
  "usa",
  "united states",
  "united states of america",
  "us",
  "america",
  // Europe
  "germany",
  "france",
  "spain",
  "italy",
  "netherlands",
  "holland",
  "belgium",
  "austria",
  "switzerland",
  "portugal",
  "poland",
  "ireland",
  "republic of ireland",
  "eire",
  "sweden",
  "norway",
  "denmark",
  "finland",
  "greece",
  "czech republic",
  "czechia",
  "hungary",
  "romania",
  "bulgaria",
  "croatia",
  "slovenia",
  "slovakia",
  "serbia",
  "ukraine",
  "russia",
  "turkey",
  "cyprus",
  "malta",
  "luxembourg",
  "iceland",
  "estonia",
  "latvia",
  "lithuania",
  "belarus",
  // Americas
  "canada",
  "mexico",
  "brazil",
  "argentina",
  "chile",
  "colombia",
  "peru",
  "venezuela",
  // Asia Pacific
  "australia",
  "new zealand",
  "japan",
  "china",
  "south korea",
  "korea",
  "india",
  "singapore",
  "hong kong",
  "taiwan",
  "thailand",
  "malaysia",
  "indonesia",
  "philippines",
  "vietnam",
  // Middle East & Africa
  "uae",
  "united arab emirates",
  "dubai",
  "saudi arabia",
  "israel",
  "south africa",
  "egypt",
  "morocco",
  "nigeria",
  "kenya",
];

// UK Regions (your 11 regions)
const UK_REGIONS = [
  "london",
  "south east",
  "south west",
  "east of england",
  "east anglia",
  "midlands",
  "east midlands",
  "west midlands",
  "north west",
  "north east",
  "yorkshire",
  "yorkshire and the humber",
  "wales",
  "scotland",
  "northern ireland",
];

// US States (all 50 + DC)
const US_STATES = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming",
  "district of columbia",
  "dc",
];

// US State Abbreviations
const US_STATE_ABBREVS = [
  "al",
  "ak",
  "az",
  "ar",
  "ca",
  "co",
  "ct",
  "de",
  "fl",
  "ga",
  "hi",
  "id",
  "il",
  "in",
  "ia",
  "ks",
  "ky",
  "la",
  "me",
  "md",
  "ma",
  "mi",
  "mn",
  "ms",
  "mo",
  "mt",
  "ne",
  "nv",
  "nh",
  "nj",
  "nm",
  "ny",
  "nc",
  "nd",
  "oh",
  "ok",
  "or",
  "pa",
  "ri",
  "sc",
  "sd",
  "tn",
  "tx",
  "ut",
  "vt",
  "va",
  "wa",
  "wv",
  "wi",
  "wy",
];

// Major UK Cities & Towns
const UK_CITIES = [
  // Major cities
  "london",
  "birmingham",
  "manchester",
  "leeds",
  "liverpool",
  "newcastle",
  "sheffield",
  "bristol",
  "nottingham",
  "leicester",
  "coventry",
  "bradford",
  "cardiff",
  "belfast",
  "edinburgh",
  "glasgow",
  // Music industry hubs & significant towns
  "brighton",
  "bournemouth",
  "southampton",
  "portsmouth",
  "reading",
  "oxford",
  "cambridge",
  "norwich",
  "hull",
  "middlesbrough",
  "sunderland",
  "wolverhampton",
  "derby",
  "stoke",
  "plymouth",
  "exeter",
  "bath",
  "york",
  "chester",
  "lancaster",
  "blackpool",
  "preston",
  "bolton",
  "wigan",
  "stockport",
  "rochdale",
  "oldham",
  "salford",
  "warrington",
  "crewe",
  "shrewsbury",
  "telford",
  "worcester",
  "gloucester",
  "cheltenham",
  "swindon",
  "milton keynes",
  "luton",
  "watford",
  "st albans",
  "guildford",
  "crawley",
  "worthing",
  "hastings",
  "eastbourne",
  "folkestone",
  "canterbury",
  "maidstone",
  "tunbridge wells",
  "margate",
  "ramsgate",
  "dover",
  "ashford",
  "colchester",
  "ipswich",
  "peterborough",
  "northampton",
  "bedford",
  "stevenage",
  "hemel hempstead",
  "harlow",
  "basildon",
  "southend",
  "chelmsford",
  // Scotland
  "aberdeen",
  "dundee",
  "inverness",
  "stirling",
  "perth",
  "falkirk",
  "ayr",
  "kilmarnock",
  "greenock",
  "paisley",
  "cumbernauld",
  "livingston",
  "dunfermline",
  "kirkcaldy",
  // Wales
  "swansea",
  "newport",
  "wrexham",
  "barry",
  "neath",
  "bridgend",
  "llanelli",
  "cwmbran",
  // Northern Ireland
  "derry",
  "londonderry",
  "lisburn",
  "newtownabbey",
  "bangor",
  "newry",
  "armagh",
  "omagh",
];

// Major European Cities
const EUROPEAN_CITIES = [
  // Germany
  "berlin",
  "munich",
  "hamburg",
  "cologne",
  "frankfurt",
  "dusseldorf",
  "stuttgart",
  "dortmund",
  "essen",
  "leipzig",
  "bremen",
  "dresden",
  "hanover",
  "nuremberg",
  "duisburg",
  // France
  "paris",
  "lyon",
  "marseille",
  "toulouse",
  "nice",
  "nantes",
  "strasbourg",
  "montpellier",
  "bordeaux",
  "lille",
  "rennes",
  // Spain
  "madrid",
  "barcelona",
  "valencia",
  "seville",
  "zaragoza",
  "malaga",
  "bilbao",
  "murcia",
  // Italy
  "rome",
  "milan",
  "naples",
  "turin",
  "palermo",
  "genoa",
  "bologna",
  "florence",
  "venice",
  // Netherlands
  "amsterdam",
  "rotterdam",
  "the hague",
  "utrecht",
  "eindhoven",
  "tilburg",
  "groningen",
  // Belgium
  "brussels",
  "antwerp",
  "ghent",
  "bruges",
  "liege",
  "charleroi",
  // Austria & Switzerland
  "vienna",
  "salzburg",
  "innsbruck",
  "zurich",
  "geneva",
  "basel",
  "bern",
  // Scandinavia
  "stockholm",
  "gothenburg",
  "malmo",
  "oslo",
  "bergen",
  "copenhagen",
  "aarhus",
  "helsinki",
  "tampere",
  "turku",
  // Eastern Europe
  "prague",
  "budapest",
  "warsaw",
  "krakow",
  "bucharest",
  "sofia",
  "zagreb",
  "belgrade",
  "bratislava",
  "ljubljana",
  // Other
  "dublin",
  "cork",
  "galway",
  "limerick",
  "lisbon",
  "porto",
  "athens",
  "thessaloniki",
  "reykjavik",
  "tallinn",
  "riga",
  "vilnius",
  "minsk",
  "kyiv",
];

// North American Cities
const NORTH_AMERICAN_CITIES = [
  // Major US cities
  "new york",
  "los angeles",
  "chicago",
  "houston",
  "phoenix",
  "philadelphia",
  "san antonio",
  "san diego",
  "dallas",
  "san jose",
  "austin",
  "jacksonville",
  "fort worth",
  "columbus",
  "charlotte",
  "san francisco",
  "indianapolis",
  "seattle",
  "denver",
  "washington",
  "boston",
  "nashville",
  "baltimore",
  "oklahoma city",
  "louisville",
  "portland",
  "las vegas",
  "milwaukee",
  "albuquerque",
  "tucson",
  "fresno",
  "sacramento",
  "mesa",
  "kansas city",
  "atlanta",
  "miami",
  "oakland",
  "minneapolis",
  "tulsa",
  "cleveland",
  "new orleans",
  "tampa",
  "st louis",
  "pittsburgh",
  "cincinnati",
  "orlando",
  "detroit",
  "memphis",
  // Canada
  "toronto",
  "montreal",
  "vancouver",
  "calgary",
  "edmonton",
  "ottawa",
  "winnipeg",
  "quebec city",
  "hamilton",
  "victoria",
];

// Other Major World Cities
const OTHER_CITIES = [
  // Australia & NZ
  "sydney",
  "melbourne",
  "brisbane",
  "perth",
  "adelaide",
  "gold coast",
  "canberra",
  "auckland",
  "wellington",
  "christchurch",
  // Asia
  "tokyo",
  "osaka",
  "kyoto",
  "yokohama",
  "seoul",
  "busan",
  "beijing",
  "shanghai",
  "hong kong",
  "taipei",
  "singapore",
  "bangkok",
  "kuala lumpur",
  "jakarta",
  "manila",
  "mumbai",
  "delhi",
  "bangalore",
  "chennai",
  "hyderabad",
  // Middle East
  "dubai",
  "abu dhabi",
  "tel aviv",
  "jerusalem",
  "riyadh",
  "doha",
  "kuwait city",
  // Africa
  "johannesburg",
  "cape town",
  "durban",
  "cairo",
  "lagos",
  "nairobi",
  "casablanca",
  // South America
  "sao paulo",
  "rio de janeiro",
  "buenos aires",
  "bogota",
  "lima",
  "santiago",
  "caracas",
  "medellin",
  "mexico city",
  "guadalajara",
  "monterrey",
];

// Common Abbreviations & Nicknames
const ABBREVIATIONS = ["nyc", "la", "sf", "dc", "philly", "vegas", "nola", "chi", "atl", "brum", "manc"];

// Combine all into single array
const KNOWN_LOCATIONS = [
  ...COUNTRIES,
  ...UK_REGIONS,
  ...US_STATES,
  ...US_STATE_ABBREVS,
  ...UK_CITIES,
  ...EUROPEAN_CITIES,
  ...NORTH_AMERICAN_CITIES,
  ...OTHER_CITIES,
  ...ABBREVIATIONS,
];

// Pre-sort by length (longest first) for efficient matching - only done once at module load
const SORTED_LOCATIONS = [...new Set(KNOWN_LOCATIONS)].sort((a, b) => b.length - a.length);

/**
 * Strips known location terms from a search query.
 * Returns the cleaned search term for better matching.
 *
 * Example: "backline london" -> "backline"
 * Example: "studio equipment germany" -> "studio equipment"
 * Example: "PA hire california" -> "PA hire"
 */
export function stripLocationFromQuery(query: string): string {
  if (!query) return "";

  let cleanedQuery = query.toLowerCase().trim();

  for (const location of SORTED_LOCATIONS) {
    // Check if query ends with the location (most common case)
    if (cleanedQuery.endsWith(` ${location}`)) {
      cleanedQuery = cleanedQuery.slice(0, -(location.length + 1)).trim();
      break; // Only strip one location
    }
    // Also check if it starts with location (less common but handle it)
    if (cleanedQuery.startsWith(`${location} `)) {
      cleanedQuery = cleanedQuery.slice(location.length + 1).trim();
      break;
    }
  }

  return cleanedQuery;
}

/**
 * Check if a query contains only a location term (no actual search term)
 */
export function isOnlyLocation(query: string): boolean {
  if (!query) return false;
  const normalized = query.toLowerCase().trim();
  return SORTED_LOCATIONS.includes(normalized);
}

/**
 * Extract location from query if present (for potential future use in filtering)
 */
export function extractLocation(query: string): string | null {
  if (!query) return null;

  const normalized = query.toLowerCase().trim();

  for (const location of SORTED_LOCATIONS) {
    if (normalized.endsWith(` ${location}`)) {
      return location;
    }
    if (normalized.startsWith(`${location} `)) {
      return location;
    }
    if (normalized === location) {
      return location;
    }
  }

  return null;
}
