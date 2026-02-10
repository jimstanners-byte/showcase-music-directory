/**
 * Phone number formatting utilities
 * Adds international dialing codes based on country
 */

// Country code mapping
const COUNTRY_CODES: Record<string, string> = {
  // UK variations
  'United Kingdom': '+44',
  'UK': '+44',
  'England': '+44',
  'Scotland': '+44',
  'Wales': '+44',
  'Northern Ireland': '+44',
  'Great Britain': '+44',
  
  // USA variations
  'United States': '+1',
  'USA': '+1',
  'US': '+1',
  'United States of America': '+1',
  
  // North America
  'Canada': '+1',
  'Mexico': '+52',
  
  // Caribbean (NANP - use +1)
  'Bahamas': '+1',
  'Barbados': '+1',
  'Dominican Republic': '+1',
  'Jamaica': '+1',
  'Puerto Rico': '+1',
  'Trinidad and Tobago': '+1',
  
  // Caribbean (non-NANP)
  'Aruba': '+297',
  'Cuba': '+53',
  'Curacao': '+599',
  
  // Central America
  'Costa Rica': '+506',
  'El Salvador': '+503',
  'Guatemala': '+502',
  'Panama': '+507',
  
  // South America
  'Argentina': '+54',
  'Bolivia': '+591',
  'Brazil': '+55',
  'Chile': '+56',
  'Colombia': '+57',
  'Ecuador': '+593',
  'Paraguay': '+595',
  'Peru': '+51',
  'Uruguay': '+598',
  'Venezuela': '+58',
  
  // Western Europe
  'France': '+33',
  'Germany': '+49',
  'Spain': '+34',
  'Italy': '+39',
  'Netherlands': '+31',
  'Belgium': '+32',
  'Switzerland': '+41',
  'Austria': '+43',
  'Portugal': '+351',
  'Ireland': '+353',
  'Malta': '+356',
  'Cyprus': '+357',
  'Luxembourg': '+352',
  
  // Northern Europe
  'Sweden': '+46',
  'Norway': '+47',
  'Denmark': '+45',
  'Finland': '+358',
  'Iceland': '+354',
  'Estonia': '+372',
  'Latvia': '+371',
  'Lithuania': '+370',
  
  // Eastern Europe
  'Poland': '+48',
  'Czech Republic': '+420',
  'Slovakia': '+421',
  'Hungary': '+36',
  'Romania': '+40',
  'Bulgaria': '+359',
  'Ukraine': '+380',
  'Russia': '+7',
  
  // Balkans
  'Croatia': '+385',
  'Slovenia': '+386',
  'Serbia': '+381',
  'Bosnia and Herzegovina': '+387',
  'Montenegro': '+382',
  'North Macedonia': '+389',
  'Greece': '+30',
  
  // Middle East
  'Turkey': '+90',
  'Israel': '+972',
  'Lebanon': '+961',
  'Jordan': '+962',
  'UAE': '+971',
  'United Arab Emirates': '+971',
  'Saudi Arabia': '+966',
  'Qatar': '+974',
  'Kuwait': '+965',
  'Bahrain': '+973',
  
  // Africa
  'South Africa': '+27',
  'Egypt': '+20',
  'Morocco': '+212',
  'Tunisia': '+216',
  'Kenya': '+254',
  'Nigeria': '+234',
  'Ghana': '+233',
  'Senegal': '+221',
  'Ivory Coast': '+225',
  'Tanzania': '+255',
  'Rwanda': '+250',
  
  // Asia Pacific
  'Australia': '+61',
  'New Zealand': '+64',
  'Japan': '+81',
  'South Korea': '+82',
  'China': '+86',
  'Hong Kong': '+852',
  'Taiwan': '+886',
  'Singapore': '+65',
  'Malaysia': '+60',
  'Thailand': '+66',
  'Vietnam': '+84',
  'Philippines': '+63',
  'Indonesia': '+62',
  'India': '+91',
};

/**
 * Normalize a phone number by removing common formatting characters
 */
function normalizePhone(phone: string): string {
  // Remove spaces, hyphens, parentheses, and other common formatting
  return phone.replace(/[\s\-\(\)\.]/g, '');
}

/**
 * Check if a phone number already has an international code
 */
function hasInternationalCode(phone: string): boolean {
  return phone.trim().startsWith('+');
}

/**
 * Format a UK phone number from local (0xxx) to international (+44xxx)
 */
function formatUKPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  
  // If it starts with 0, replace with +44
  if (normalized.startsWith('0')) {
    return '+44' + normalized.substring(1);
  }
  
  // If it starts with 44, add the +
  if (normalized.startsWith('44')) {
    return '+' + normalized;
  }
  
  // Otherwise, assume it's missing the 0 and add +44
  return '+44' + normalized;
}

/**
 * Format a US phone number to international (+1xxx)
 */
function formatUSPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  
  // If it starts with 1, add the +
  if (normalized.startsWith('1')) {
    return '+' + normalized;
  }
  
  // Otherwise add +1
  return '+1' + normalized;
}

/**
 * Format any phone number with the appropriate international code
 * @param phone - The phone number to format
 * @param country - The country the number belongs to
 * @returns Formatted phone number with international code, or original if already formatted/unknown country
 */
export function formatPhoneWithCountryCode(
  phone: string | null | undefined,
  country: string | null | undefined
): string | null {
  // Return null if no phone number
  if (!phone || phone.trim() === '') {
    return null;
  }
  
  // If already has international code, return as-is
  if (hasInternationalCode(phone)) {
    return phone;
  }
  
  // If no country specified, return original
  if (!country) {
    return phone;
  }
  
  // Get country code from mapping
  const countryCode = COUNTRY_CODES[country];
  
  // If country not in mapping, return original
  if (!countryCode) {
    console.warn(`No country code mapping found for: ${country}`);
    return phone;
  }
  
  // Special handling for UK numbers (need to remove leading 0)
  if (countryCode === '+44') {
    return formatUKPhone(phone);
  }
  
  // Special handling for US/Canada numbers
  if (countryCode === '+1') {
    return formatUSPhone(phone);
  }
  
  // For other countries, just prepend the country code
  const normalized = normalizePhone(phone);
  
  // If it already starts with the country code digits (without +), just add +
  const codeDigits = countryCode.substring(1); // Remove the +
  if (normalized.startsWith(codeDigits)) {
    return '+' + normalized;
  }
  
  // Otherwise prepend the country code
  return countryCode + normalized;
}

/**
 * Format phone number for tel: link
 * Removes all spaces and formatting for reliable dialing
 */
export function formatPhoneForTelLink(
  phone: string | null | undefined,
  country: string | null | undefined
): string | null {
  const formatted = formatPhoneWithCountryCode(phone, country);
  
  if (!formatted) {
    return null;
  }
  
  // Remove all spaces for the tel: link
  return formatted.replace(/\s/g, '');
}

/**
 * Format a UK phone number for display with proper spacing
 * UK numbers follow specific patterns:
 * - 020 (London): +44 20 XXXX XXXX
 * - 011X (Leeds, Sheffield, etc.): +44 11X XXX XXXX
 * - 01XXX (4-digit area codes): +44 1XXX XXXXXX or +44 1XXX XXX XXX
 * - 07XXX (mobile): +44 7XXX XXX XXX
 */
function formatUKPhoneDisplay(phone: string): string {
  // Remove the +44 prefix and any spaces
  const digits = phone.replace(/^\+44/, '').replace(/\s/g, '');
  
  // London numbers (020)
  if (digits.startsWith('20')) {
    return `+44 20 ${digits.slice(2, 6)} ${digits.slice(6)}`;
  }
  
  // 3-digit area codes (011X, 023, 024, 028, 029, 013X, 014X, 015X, 016X, 017X, 018X, 019X)
  if (digits.match(/^(11[0-9]|2[0-9]|1[3-9][0-9])/)) {
    const areaCode = digits.slice(0, 3);
    const rest = digits.slice(3);
    if (rest.length === 7) {
      return `+44 ${areaCode} ${rest.slice(0, 3)} ${rest.slice(3)}`;
    }
    return `+44 ${areaCode} ${rest}`;
  }
  
  // Mobile numbers (07XXX)
  if (digits.startsWith('7')) {
    return `+44 ${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  
  // 4-digit area codes (01XXX)
  if (digits.startsWith('1')) {
    const areaCode = digits.slice(0, 4);
    const rest = digits.slice(4);
    if (rest.length === 6) {
      return `+44 ${areaCode} ${rest.slice(0, 3)} ${rest.slice(3)}`;
    }
    return `+44 ${areaCode} ${rest}`;
  }
  
  // Default: return with +44 prefix
  return `+44 ${digits}`;
}

/**
 * Format a US/Canada phone number for display with proper spacing
 * Format: +1 (XXX) XXX-XXXX
 */
function formatUSPhoneDisplay(phone: string): string {
  // Remove the +1 prefix and any spaces/formatting
  const digits = phone.replace(/^\+1/, '').replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Default: return with +1 prefix
  return `+1 ${digits}`;
}

/**
 * Format phone number for display
 * Adds country code with proper spacing based on country conventions
 */
export function formatPhoneForDisplay(
  phone: string | null | undefined,
  country: string | null | undefined
): string | null {
  const formatted = formatPhoneWithCountryCode(phone, country);
  
  if (!formatted) {
    return null;
  }
  
  // If it doesn't start with +, return as-is
  if (!formatted.startsWith('+')) {
    return formatted;
  }
  
  // Get country code from mapping
  const countryCode = country ? COUNTRY_CODES[country] : null;
  
  // Format UK numbers with proper spacing
  if (countryCode === '+44' && formatted.startsWith('+44')) {
    return formatUKPhoneDisplay(formatted);
  }
  
  // Format US/Canada numbers with proper spacing
  if (countryCode === '+1' && formatted.startsWith('+1')) {
    return formatUSPhoneDisplay(formatted);
  }
  
  // For other countries, return the formatted number as-is
  return formatted;
}