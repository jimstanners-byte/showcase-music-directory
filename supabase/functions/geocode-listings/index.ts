import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BATCH_SIZE = 100;
const CONCURRENT_REQUESTS = 10;
const MAX_RETRIES = 2;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// =============================================================================
// REGION ASSIGNMENT - LOOKUP TABLES
// =============================================================================

const UK_COUNTY_TO_REGION: Record<string, string> = {
  'london': 'London', 'middlesex': 'London',
  'surrey': 'South East', 'kent': 'South East', 'east sussex': 'South East', 'west sussex': 'South East', 'sussex': 'South East', 'hampshire': 'South East', 'berkshire': 'South East', 'west berkshire': 'South East', 'oxfordshire': 'South East', 'oxforshire': 'South East', 'oxon': 'South East', 'buckinghamshire': 'South East', 'bucks': 'South East', 'isle of wight': 'South East',
  'devon': 'South West', 'north devon': 'South West', 'south devon': 'South West', 'cornwall': 'South West', 'somerset': 'South West', 'west somerset': 'South West', 'dorset': 'South West', 'wiltshire': 'South West', 'gloucestershire': 'South West', 'avon': 'South West', 'channel islands': 'South West', 'the channel islands': 'South West', 'guernsey': 'South West',
  'norfolk': 'East Anglia', 'suffolk': 'East Anglia', 'essex': 'East Anglia', 'cambridgeshire': 'East Anglia', 'cambridge': 'East Anglia', 'hertfordshire': 'East Anglia', 'herts': 'East Anglia', 'bedfordshire': 'East Anglia', 'bedfordhire': 'East Anglia', 'peterborough': 'East Anglia',
  'west midlands': 'Midlands', 'staffordshire': 'Midlands', 'warwickshire': 'Midlands', 'worcestershire': 'Midlands', 'worcester': 'Midlands', 'herefordshire': 'Midlands', 'hereford': 'Midlands', 'shropshire': 'Midlands', 'wolverhampton': 'Midlands', 'derbyshire': 'Midlands', 'south derbyshire': 'Midlands', 'nottinghamshire': 'Midlands', 'leicestershire': 'Midlands', 'leicstershire': 'Midlands', 'rutland': 'Midlands', 'northamptonshire': 'Midlands', 'north hamptonshire': 'Midlands', 'northampton': 'Midlands', 'lincolnshire': 'Midlands', 'north lincolnshire': 'Midlands', 'north east lincolnshire': 'Midlands',
  'west yorkshire': 'Yorkshire', 'w.yorks': 'Yorkshire', 'south yorkshire': 'Yorkshire', 'north yorkshire': 'Yorkshire', 'east yorkshire': 'Yorkshire', 'east riding of yorkshire': 'Yorkshire', 'yorkshire': 'Yorkshire', 'north humberside': 'Yorkshire',
  'lancashire': 'North West', 'lancanshire': 'North West', 'merseyside': 'North West', 'wirral': 'North West', 'greater manchester': 'North West', 'cheshire': 'North West', 'cumbria': 'North West', 'blackpool': 'North West', 'isle of man': 'North West',
  'tyne and wear': 'North East', 'county durham': 'North East', 'co durham': 'North East', 'northumberland': 'North East', 'cleveland': 'North East', 'middlesbrough & stockton on tees': 'North East',
  'scotland': 'Scotland', 'aberdeenshire': 'Scotland', 'angus': 'Scotland', 'argyll': 'Scotland', 'argll & bute': 'Scotland', 'ayrshire': 'Scotland', 'east ayrshire': 'Scotland', 'south ayrshire': 'Scotland', 'berwickshire': 'Scotland', 'caithness': 'Scotland', 'dumfries and galloway': 'Scotland', 'dunbartonshire': 'Scotland', 'east lothian': 'Scotland', 'west lothian': 'Scotland', 'lothian': 'Scotland', 'midlothian': 'Scotland', 'fife': 'Scotland', 'inner hebrides of scotland': 'Scotland', 'outer hebrides': 'Scotland', 'inverness-shire': 'Scotland', 'isle of mull': 'Scotland', 'isle of skye': 'Scotland', 'kinross-shire': 'Scotland', 'kirkubrightshire': 'Scotland', 'lanarkshire': 'Scotland', 'south lanarkshire': 'Scotland', 'moray': 'Scotland', 'perth': 'Scotland', 'perthshire': 'Scotland', 'renfrewshire': 'Scotland', 'ross and cromarty': 'Scotland', 'ross-shire': 'Scotland', 'roxburghshire': 'Scotland', 'shetland islands': 'Scotland', 'stirling': 'Scotland', 'stirlingshire': 'Scotland',
  'wales': 'Wales', 'north wales': 'Wales', 'mid wales': 'Wales', 'south wales': 'Wales', 'glamorgan': 'Wales', 'mid glamorgan': 'Wales', 'west glamorgan': 'Wales', 'vale of glamorgan': 'Wales', 'gwent': 'Wales', 'gwynedd': 'Wales', 'powys': 'Wales', 'dyfed': 'Wales', 'clwyd': 'Wales', 'monmouthshire': 'Wales', 'carmarthenshire': 'Wales', 'ceredigion': 'Wales', 'pembrokeshire': 'Wales', 'denbighshire': 'Wales', 'flintshire': 'Wales', 'bridgend': 'Wales', 'torfaen': 'Wales', 'neath port talbot': 'Wales', 'bangor': 'Wales',
  'northern ireland': 'Northern Ireland', 'county antrim': 'Northern Ireland', 'county down': 'Northern Ireland', 'county derry': 'Northern Ireland', 'county londonderry': 'Northern Ireland', 'county tyrone': 'Northern Ireland',
};

const UK_TOWN_TO_REGION: Record<string, string> = {
  'london': 'London', 'westminster': 'London', 'camden': 'London', 'islington': 'London', 'hackney': 'London', 'southwark': 'London', 'lambeth': 'London', 'wandsworth': 'London', 'croydon': 'London', 'bromley': 'London', 'barnet': 'London', 'ealing': 'London', 'enfield': 'London', 'hounslow': 'London', 'brent': 'London', 'newham': 'London', 'greenwich': 'London', 'lewisham': 'London', 'tower hamlets': 'London',
  'brighton': 'South East', 'brighton and hove': 'South East', 'southampton': 'South East', 'portsmouth': 'South East', 'reading': 'South East', 'oxford': 'South East', 'milton keynes': 'South East', 'high wycombe': 'South East', 'guildford': 'South East', 'maidstone': 'South East', 'canterbury': 'South East', 'crawley': 'South East', 'slough': 'South East', 'basingstoke': 'South East', 'woking': 'South East', 'eastbourne': 'South East', 'tunbridge wells': 'South East', 'winchester': 'South East', 'chichester': 'South East',
  'bristol': 'South West', 'bath': 'South West', 'exeter': 'South West', 'plymouth': 'South West', 'bournemouth': 'South West', 'poole': 'South West', 'swindon': 'South West', 'gloucester': 'South West', 'cheltenham': 'South West', 'taunton': 'South West', 'torquay': 'South West', 'truro': 'South West', 'salisbury': 'South West',
  'norwich': 'East Anglia', 'cambridge': 'East Anglia', 'ipswich': 'East Anglia', 'colchester': 'East Anglia', 'chelmsford': 'East Anglia', 'southend': 'East Anglia', 'southend-on-sea': 'East Anglia', 'peterborough': 'East Anglia', 'luton': 'East Anglia', 'bedford': 'East Anglia', 'st albans': 'East Anglia', 'watford': 'East Anglia', 'stevenage': 'East Anglia', 'berkhamsted': 'East Anglia',
  'birmingham': 'Midlands', 'coventry': 'Midlands', 'leicester': 'Midlands', 'nottingham': 'Midlands', 'derby': 'Midlands', 'wolverhampton': 'Midlands', 'stoke-on-trent': 'Midlands', 'northampton': 'Midlands', 'worcester': 'Midlands', 'hereford': 'Midlands', 'shrewsbury': 'Midlands', 'telford': 'Midlands', 'lincoln': 'Midlands', 'loughborough': 'Midlands',
  'leeds': 'Yorkshire', 'sheffield': 'Yorkshire', 'bradford': 'Yorkshire', 'hull': 'Yorkshire', 'york': 'Yorkshire', 'huddersfield': 'Yorkshire', 'doncaster': 'Yorkshire', 'rotherham': 'Yorkshire', 'barnsley': 'Yorkshire', 'wakefield': 'Yorkshire', 'halifax': 'Yorkshire', 'harrogate': 'Yorkshire', 'scarborough': 'Yorkshire', 'grimsby': 'Yorkshire',
  'manchester': 'North West', 'liverpool': 'North West', 'preston': 'North West', 'blackpool': 'North West', 'bolton': 'North West', 'blackburn': 'North West', 'burnley': 'North West', 'oldham': 'North West', 'rochdale': 'North West', 'stockport': 'North West', 'wigan': 'North West', 'warrington': 'North West', 'chester': 'North West', 'carlisle': 'North West', 'salford': 'North West',
  'newcastle': 'North East', 'newcastle upon tyne': 'North East', 'sunderland': 'North East', 'middlesbrough': 'North East', 'stockton on tees': 'North East', 'stockton-on-tees': 'North East', 'gateshead': 'North East', 'darlington': 'North East', 'hartlepool': 'North East', 'durham': 'North East',
  'glasgow': 'Scotland', 'edinburgh': 'Scotland', 'aberdeen': 'Scotland', 'dundee': 'Scotland', 'inverness': 'Scotland', 'stirling': 'Scotland', 'perth': 'Scotland', 'paisley': 'Scotland', 'east kilbride': 'Scotland', 'livingston': 'Scotland', 'dunfermline': 'Scotland', 'falkirk': 'Scotland', 'dumfries': 'Scotland',
  'cardiff': 'Wales', 'swansea': 'Wales', 'newport': 'Wales', 'wrexham': 'Wales', 'barry': 'Wales', 'neath': 'Wales', 'cwmbran': 'Wales', 'llanelli': 'Wales', 'bridgend': 'Wales', 'pontypridd': 'Wales', 'merthyr tydfil': 'Wales', 'rhyl': 'Wales', 'bangor': 'Wales', 'aberystwyth': 'Wales',
  'belfast': 'Northern Ireland', 'londonderry': 'Northern Ireland', 'derry': 'Northern Ireland', 'lisburn': 'Northern Ireland', 'newry': 'Northern Ireland', 'ballymena': 'Northern Ireland', 'coleraine': 'Northern Ireland', 'omagh': 'Northern Ireland', 'enniskillen': 'Northern Ireland', 'armagh': 'Northern Ireland',
};

const US_STATES: Record<string, string> = {
  'al': 'Alabama', 'alabama': 'Alabama',
  'ak': 'Alaska', 'alaska': 'Alaska',
  'az': 'Arizona', 'arizona': 'Arizona',
  'ar': 'Arkansas', 'arkansas': 'Arkansas',
  'ca': 'California', 'california': 'California',
  'co': 'Colorado', 'colorado': 'Colorado',
  'ct': 'Connecticut', 'connecticut': 'Connecticut',
  'de': 'Delaware', 'delaware': 'Delaware',
  'fl': 'Florida', 'florida': 'Florida',
  'ga': 'Georgia', 'georgia': 'Georgia',
  'hi': 'Hawaii', 'hawaii': 'Hawaii',
  'id': 'Idaho', 'idaho': 'Idaho',
  'il': 'Illinois', 'illinois': 'Illinois',
  'in': 'Indiana', 'indiana': 'Indiana',
  'ia': 'Iowa', 'iowa': 'Iowa',
  'ks': 'Kansas', 'kansas': 'Kansas',
  'ky': 'Kentucky', 'kentucky': 'Kentucky',
  'la': 'Louisiana', 'louisiana': 'Louisiana',
  'me': 'Maine', 'maine': 'Maine',
  'md': 'Maryland', 'maryland': 'Maryland',
  'ma': 'Massachusetts', 'massachusetts': 'Massachusetts',
  'mi': 'Michigan', 'michigan': 'Michigan',
  'mn': 'Minnesota', 'minnesota': 'Minnesota',
  'ms': 'Mississippi', 'mississippi': 'Mississippi',
  'mo': 'Missouri', 'missouri': 'Missouri',
  'mt': 'Montana', 'montana': 'Montana',
  'ne': 'Nebraska', 'nebraska': 'Nebraska',
  'nv': 'Nevada', 'nevada': 'Nevada',
  'nh': 'New Hampshire', 'new hampshire': 'New Hampshire',
  'nj': 'New Jersey', 'new jersey': 'New Jersey',
  'nm': 'New Mexico', 'new mexico': 'New Mexico',
  'ny': 'New York', 'new york': 'New York',
  'nc': 'North Carolina', 'north carolina': 'North Carolina',
  'nd': 'North Dakota', 'north dakota': 'North Dakota',
  'oh': 'Ohio', 'ohio': 'Ohio',
  'ok': 'Oklahoma', 'oklahoma': 'Oklahoma',
  'or': 'Oregon', 'oregon': 'Oregon',
  'pa': 'Pennsylvania', 'pennsylvania': 'Pennsylvania',
  'ri': 'Rhode Island', 'rhode island': 'Rhode Island',
  'sc': 'South Carolina', 'south carolina': 'South Carolina',
  'sd': 'South Dakota', 'south dakota': 'South Dakota',
  'tn': 'Tennessee', 'tennessee': 'Tennessee',
  'tx': 'Texas', 'texas': 'Texas',
  'ut': 'Utah', 'utah': 'Utah',
  'vt': 'Vermont', 'vermont': 'Vermont',
  'va': 'Virginia', 'virginia': 'Virginia',
  'wa': 'Washington', 'washington': 'Washington',
  'wv': 'West Virginia', 'west virginia': 'West Virginia',
  'wi': 'Wisconsin', 'wisconsin': 'Wisconsin',
  'wy': 'Wyoming', 'wyoming': 'Wyoming',
  'dc': 'District of Columbia', 'district of columbia': 'District of Columbia',
};

// =============================================================================
// REGION ASSIGNMENT FUNCTIONS
// =============================================================================

function normalise(str: string | null | undefined): string {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/\s+/g, ' ');
}

function extractUSState(address: string | null | undefined): string | null {
  if (!address) return null;
  const normalised = normalise(address);
  
  for (const [key, stateName] of Object.entries(US_STATES)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(normalised)) {
      return stateName;
    }
  }
  return null;
}

interface ListingForRegion {
  country?: string | null;
  county?: string | null;
  town_city?: string | null;
  address?: string | null;
}

function assignRegionName(listing: ListingForRegion): string | null {
  const country = normalise(listing.country);
  
  // UK
  if (country === 'uk' || country === 'united kingdom') {
    if (listing.county) {
      const countyNorm = normalise(listing.county);
      if (UK_COUNTY_TO_REGION[countyNorm]) {
        return UK_COUNTY_TO_REGION[countyNorm];
      }
    }
    if (listing.town_city) {
      const townNorm = normalise(listing.town_city);
      if (UK_TOWN_TO_REGION[townNorm]) {
        return UK_TOWN_TO_REGION[townNorm];
      }
    }
    return null;
  }
  
  // USA
  if (country === 'usa' || country === 'united states' || country === 'us') {
    if (listing.county) {
      const state = extractUSState(listing.county);
      if (state) return state;
    }
    if (listing.address) {
      const state = extractUSState(listing.address);
      if (state) return state;
    }
    return null;
  }
  
  return null;
}

const regionIdCache: Record<string, number> = {};

async function getRegionId(
  supabase: any, 
  country: string, 
  regionName: string
): Promise<number | null> {
  const cacheKey = `${country}:${regionName}`;
  
  if (regionIdCache[cacheKey]) {
    return regionIdCache[cacheKey];
  }
  
  const { data, error } = await supabase
    .from('regions')
    .select('id')
    .eq('country', country)
    .eq('region_name', regionName)
    .single();
  
  if (error || !data) {
    console.error(`Region lookup failed for ${country}/${regionName}:`, error);
    return null;
  }
  
  regionIdCache[cacheKey] = data.id;
  return data.id;
}

// =============================================================================
// GOOGLE MAPS GEOCODING
// =============================================================================

interface GeocodeResult {
  lat: number;
  lon: number;
}

async function geocodeWithGoogle(
  address: string, 
  apiKey: string, 
  retries = 0
): Promise<GeocodeResult | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Google Maps API returned status ${response.status} for address: ${address}`);
      if (retries < MAX_RETRIES) {
        await delay(1000 * (retries + 1));
        return geocodeWithGoogle(address, apiKey, retries + 1);
      }
      return null;
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lon: location.lng,
      };
    }
    
    if (data.status === 'OVER_QUERY_LIMIT' || data.status === 'OVER_DAILY_LIMIT') {
      console.error(`Google Maps API quota exceeded: ${data.status}`);
      if (retries < MAX_RETRIES) {
        await delay(2000 * (retries + 1));
        return geocodeWithGoogle(address, apiKey, retries + 1);
      }
      return null;
    }
    
    if (data.status === 'ZERO_RESULTS') {
      console.log(`No results found for address: ${address}`);
      return null;
    }
    
    console.error(`Google Maps API error for "${address}": ${data.status} - ${data.error_message || ''}`);
    return null;
  } catch (error) {
    console.error(`Error geocoding address "${address}":`, error);
    if (retries < MAX_RETRIES) {
      await delay(1000 * (retries + 1));
      return geocodeWithGoogle(address, apiKey, retries + 1);
    }
    return null;
  }
}

function buildAddressString(listing: any): string {
  const parts = [
    listing.address,
    listing.town_city,
    listing.county,
    listing.country
  ].filter(Boolean);
  return parts.join(", ");
}

// Process listings in parallel chunks
async function processListingsInParallel(
  listings: any[],
  apiKey: string,
  supabase: any
): Promise<{ processed: number; failed: number; regionsAssigned: number }> {
  let processed = 0;
  let failed = 0;
  let regionsAssigned = 0;

  // Process in chunks of CONCURRENT_REQUESTS
  for (let i = 0; i < listings.length; i += CONCURRENT_REQUESTS) {
    const chunk = listings.slice(i, i + CONCURRENT_REQUESTS);
    
    const results = await Promise.all(
      chunk.map(async (listing) => {
        const addressString = buildAddressString(listing);
        
        if (!addressString) {
          console.log(`Skipping listing ${listing.id}: no address data`);
          await supabase
            .from("listings")
            .update({ geocoded_at: new Date().toISOString() })
            .eq("id", listing.id);
          return { success: false, regionAssigned: false };
        }

        console.log(`Geocoding: ${addressString}`);
        const coords = await geocodeWithGoogle(addressString, apiKey);

        // Region assignment
        let regionId: number | null = null;
        const regionName = assignRegionName(listing);
        
        if (regionName && listing.country) {
          const countryNorm = normalise(listing.country);
          let countryForLookup = 'UK';
          if (countryNorm === 'usa' || countryNorm === 'united states' || countryNorm === 'us') {
            countryForLookup = 'USA';
          }
          
          regionId = await getRegionId(supabase, countryForLookup, regionName);
        }

        const updateData: any = {
          geocoded_at: new Date().toISOString(),
        };

        if (coords) {
          updateData.latitude = coords.lat;
          updateData.longitude = coords.lon;
        }

        if (regionId) {
          updateData.region_id = regionId;
        }

        const { error: updateError } = await supabase
          .from("listings")
          .update(updateData)
          .eq("id", listing.id);

        if (updateError) {
          console.error(`Failed to update listing ${listing.id}:`, updateError);
          return { success: false, regionAssigned: false };
        }

        return { 
          success: coords !== null, 
          regionAssigned: regionId !== null 
        };
      })
    );

    // Tally results
    for (const result of results) {
      if (result.success) {
        processed++;
      } else {
        failed++;
      }
      if (result.regionAssigned) {
        regionsAssigned++;
      }
    }

    // Small delay between chunks to avoid rate limiting
    if (i + CONCURRENT_REQUESTS < listings.length) {
      await delay(100);
    }
  }

  return { processed, failed, regionsAssigned };
}

// =============================================================================
// MAIN HANDLER
// =============================================================================

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const googleMapsApiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    
    if (!googleMapsApiKey) {
      console.error("GOOGLE_MAPS_API_KEY not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Google Maps API key not configured" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { count: totalListings } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    const { count: geocodedCount } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .not("geocoded_at", "is", null)
      .not("latitude", "is", null);

    const { count: manualCount } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("coordinates_manual", true);

    // Fetch batch of listings to geocode
    const { data: listings, error: fetchError } = await supabase
      .from("listings")
      .select("id, address, town_city, county, country")
      .is("geocoded_at", null)
      .or("coordinates_manual.is.null,coordinates_manual.eq.false")
      .eq("is_active", true)
      .limit(BATCH_SIZE);

    if (fetchError) throw fetchError;

    if (!listings || listings.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No listings to geocode",
          processed: 0,
          failed: 0,
          regionsAssigned: 0,
          remaining: 0,
          total: totalListings || 0,
          geocoded: geocodedCount || 0,
          manual: manualCount || 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Starting Google Maps geocoding batch of ${listings.length} listings...`);
    const startTime = Date.now();

    const { processed, failed, regionsAssigned } = await processListingsInParallel(
      listings,
      googleMapsApiKey,
      supabase
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Batch complete in ${duration}s: ${processed} geocoded, ${failed} failed, ${regionsAssigned} regions assigned`);

    // Get updated remaining count
    const { count: remainingCount } = await supabase
      .from("listings")
      .select("*", { count: "exact", head: true })
      .is("geocoded_at", null)
      .or("coordinates_manual.is.null,coordinates_manual.eq.false")
      .eq("is_active", true);

    return new Response(
      JSON.stringify({
        success: true,
        processed,
        failed,
        regionsAssigned,
        remaining: remainingCount || 0,
        total: totalListings || 0,
        geocoded: (geocodedCount || 0) + processed,
        manual: manualCount || 0,
        duration: parseFloat(duration),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Geocoding error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
