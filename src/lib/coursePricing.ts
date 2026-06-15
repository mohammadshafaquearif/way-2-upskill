import type { CountryCode } from 'libphonenumber-js';

/** Currencies Razorpay accepts for international checkout */
export type RazorpayCurrency =
  | 'INR'
  | 'USD'
  | 'CAD'
  | 'GBP'
  | 'EUR'
  | 'AED'
  | 'AUD'
  | 'SGD'
  | 'SAR'
  | 'MYR';

export type PricingRegion = 'IN' | 'GCC' | 'US' | 'EU' | 'ROW';

export const GST_RATE = 0.18;

/**
 * Razorpay does NOT add GST on top of the order amount — the `amount` sent to
 * orders.create is the final charge. For India we compute: total = base + (base × 18%).
 */

/** Base program fees — update here or override via Supabase course_regional_prices */
export const PROGRAM_PRICES: Record<
  string,
  { inrBase: number; usdInternational: number }
> = {
  DOP: { inrBase: 23999, usdInternational: 359 },
  AAC: { inrBase: 22999, usdInternational: 349 },
  AWS: { inrBase: 18999, usdInternational: 209 },
  DSP: { inrBase: 21999, usdInternational: 334 },
};

export interface RegionalPriceRow {
  region_code: string;
  amount: number;
  currency: string;
  amount_inr: number | null;
}

export interface ResolvedCoursePrice {
  region: PricingRegion;
  currency: RazorpayCurrency;
  /** Razorpay charge in major units (rupees / dollars / etc.) */
  amount: number;
  /** Smallest currency unit for Razorpay order (paise / cents) */
  amountMinor: number;
  /** India only — fee before GST */
  inrBase?: number;
  gstAmount?: number;
  /** Primary label, e.g. "₹22,999 + GST" or "$349" */
  displayPrice: string;
  /** Pay button / Razorpay charge label */
  chargeLabel: string;
}

export const PRICING_REGION_LABELS: Record<PricingRegion, string> = {
  IN: 'India',
  GCC: 'Gulf (GCC)',
  US: 'Americas',
  EU: 'Europe & UK',
  ROW: 'International',
};

/** USD list price → local currency (approximate; update periodically) */
const USD_FX: Record<RazorpayCurrency, number> = {
  USD: 1,
  INR: 83,
  CAD: 1.36,
  GBP: 0.79,
  EUR: 0.92,
  AED: 3.67,
  AUD: 1.53,
  SGD: 1.34,
  SAR: 3.75,
  MYR: 4.47,
};

const EU_COUNTRIES = new Set<CountryCode>([
  'DE', 'FR', 'NL', 'IE', 'ES', 'IT', 'SE', 'NO', 'DK', 'FI', 'BE', 'AT', 'CH', 'PL', 'PT',
  'GR', 'CZ', 'RO', 'HU', 'SK', 'BG', 'HR', 'LT', 'LV', 'EE', 'SI', 'LU', 'MT', 'CY',
]);

const GCC_COUNTRIES = new Set<CountryCode>(['AE', 'SA', 'QA', 'OM', 'KW', 'BH']);

const STORAGE_KEY = 'zyvotrix_pricing_country';

const CURRENCY_LOCALE: Record<RazorpayCurrency, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  CAD: 'en-CA',
  GBP: 'en-GB',
  EUR: 'de-DE',
  AED: 'en-AE',
  AUD: 'en-AU',
  SGD: 'en-SG',
  SAR: 'ar-SA',
  MYR: 'en-MY',
};

export function normalizeProgramCode(code: string): string {
  const map: Record<string, string> = {
    dop: 'DOP',
    aac: 'AAC',
    aws: 'AWS',
    dsp: 'DSP',
    'data-science': 'DSP',
  };
  return map[code.toLowerCase()] ?? code.toUpperCase();
}

/** Razorpay-supported currency for learner country */
export function getRazorpayCurrencyForCountry(country: CountryCode): RazorpayCurrency {
  if (country === 'IN') return 'INR';
  if (country === 'US') return 'USD';
  if (country === 'CA') return 'CAD';
  if (country === 'GB') return 'GBP';
  if (country === 'AU') return 'AUD';
  if (country === 'SG') return 'SGD';
  if (country === 'MY') return 'MYR';
  if (country === 'SA') return 'SAR';
  if (GCC_COUNTRIES.has(country)) return 'AED';
  if (EU_COUNTRIES.has(country)) return 'EUR';
  return 'USD';
}

export function countryCodeToRegion(country: CountryCode): PricingRegion {
  if (country === 'IN') return 'IN';
  if (GCC_COUNTRIES.has(country)) return 'GCC';
  if (country === 'US' || country === 'CA') return 'US';
  if (EU_COUNTRIES.has(country) || country === 'GB') return 'EU';
  return 'ROW';
}

export function getStoredPricingCountry(): CountryCode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && stored.length === 2 ? (stored as CountryCode) : null;
  } catch {
    return null;
  }
}

export function setStoredPricingCountry(country: CountryCode): void {
  try {
    localStorage.setItem(STORAGE_KEY, country);
  } catch {
    /* ignore */
  }
}

export function convertUsdToCurrency(usd: number, currency: RazorpayCurrency): number {
  const rate = USD_FX[currency] ?? 1;
  return Math.round(usd * rate);
}

export function formatCoursePrice(amount: number, currency: RazorpayCurrency): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE[currency] ?? 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toMinorUnits(amount: number, _currency: RazorpayCurrency): number {
  return Math.max(100, Math.round(amount * 100));
}

function getProgramAmounts(
  courseCode: string,
  dbRows: RegionalPriceRow[],
): { inrBase: number; usdInternational: number } {
  const code = normalizeProgramCode(courseCode);
  const defaults = PROGRAM_PRICES[code] ?? PROGRAM_PRICES.AAC;

  const inRow = dbRows.find((r) => r.region_code === 'IN');
  const intlRow =
    dbRows.find((r) => r.region_code === 'ROW') ??
    dbRows.find((r) => r.region_code === 'US');

  return {
    inrBase: inRow?.amount ?? defaults.inrBase,
    usdInternational: intlRow?.amount ?? defaults.usdInternational,
  };
}

export function resolveCoursePrice(
  courseCode: string,
  country: CountryCode,
  dbRows: RegionalPriceRow[] = [],
): ResolvedCoursePrice {
  const region = countryCodeToRegion(country);
  const currency = getRazorpayCurrencyForCountry(country);
  const { inrBase, usdInternational } = getProgramAmounts(courseCode, dbRows);

  if (country === 'IN') {
    const gstAmount = Math.round(inrBase * GST_RATE);
    const total = inrBase + gstAmount;
    return {
      region: 'IN',
      currency: 'INR',
      inrBase,
      gstAmount,
      amount: total,
      amountMinor: toMinorUnits(total, 'INR'),
      displayPrice: `${formatCoursePrice(inrBase, 'INR')} + 18% GST`,
      chargeLabel: formatCoursePrice(total, 'INR'),
    };
  }

  const localAmount = convertUsdToCurrency(usdInternational, currency);

  return {
    region,
    currency,
    amount: localAmount,
    amountMinor: toMinorUnits(localAmount, currency),
    displayPrice: formatCoursePrice(localAmount, currency),
    chargeLabel: formatCoursePrice(localAmount, currency),
  };
}

/** @deprecated use resolveCoursePrice */
export function resolveRegionalPrice(
  rows: RegionalPriceRow[],
  region: PricingRegion,
  courseCode = 'AAC',
): ResolvedCoursePrice {
  const country: CountryCode =
    region === 'IN' ? 'IN' : region === 'US' ? 'US' : region === 'GCC' ? 'AE' : region === 'EU' ? 'GB' : 'US';
  return resolveCoursePrice(courseCode, country, rows);
}

export function formatInrAmount(amountInr: number): string {
  return formatCoursePrice(amountInr, 'INR');
}
