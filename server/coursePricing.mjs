import { createClient } from '@supabase/supabase-js';

const GST_RATE = 0.18;

const PROGRAM_PRICES = {
  DOP: { inrBase: 23999, usdInternational: 370 },
  AAC: { inrBase: 22999, usdInternational: 359 },
  AWS: { inrBase: 18999, usdInternational: 215 },
  DSP: { inrBase: 21999, usdInternational: 344 },
};

const USD_FX = {
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

const GCC_COUNTRIES = new Set(['AE', 'SA', 'QA', 'OM', 'KW', 'BH']);
const EU_COUNTRIES = new Set([
  'DE', 'FR', 'NL', 'IE', 'ES', 'IT', 'SE', 'NO', 'DK', 'FI', 'BE', 'AT', 'CH', 'PL', 'PT',
  'GR', 'CZ', 'RO', 'HU', 'SK', 'BG', 'HR', 'LT', 'LV', 'EE', 'SI', 'LU', 'MT', 'CY',
]);

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) return null;
  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function normalizeProgramCode(code) {
  const map = {
    dop: 'DOP',
    aac: 'AAC',
    aws: 'AWS',
    dsp: 'DSP',
    'data-science': 'DSP',
  };
  return map[String(code || '').toLowerCase()] ?? String(code || 'AAC').toUpperCase();
}

export function getRazorpayCurrencyForCountry(country) {
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

function convertUsdToCurrency(usd, currency) {
  const rate = USD_FX[currency] ?? 1;
  return Math.round(usd * rate);
}

function toMinorUnits(amount) {
  return Math.max(100, Math.round(amount * 100));
}

function getProgramAmounts(courseCode, dbRows = []) {
  const code = normalizeProgramCode(courseCode);
  const defaults = PROGRAM_PRICES[code] ?? PROGRAM_PRICES.AAC;
  const inRow = dbRows.find((r) => r.region_code === 'IN');
  const intlRow = dbRows.find((r) => r.region_code === 'ROW') ?? dbRows.find((r) => r.region_code === 'US');
  return {
    inrBase: inRow?.amount ?? defaults.inrBase,
    usdInternational: intlRow?.amount ?? defaults.usdInternational,
  };
}

export function resolveCoursePrice(courseCode, country, dbRows = []) {
  const currency = getRazorpayCurrencyForCountry(country);
  const { inrBase, usdInternational } = getProgramAmounts(courseCode, dbRows);

  if (country === 'IN') {
    const gstAmount = Math.round(inrBase * GST_RATE);
    const total = inrBase + gstAmount;
    return {
      currency: 'INR',
      amount: total,
      amountMinor: toMinorUnits(total),
    };
  }

  const localAmount = convertUsdToCurrency(usdInternational, currency);
  return {
    currency,
    amount: localAmount,
    amountMinor: toMinorUnits(localAmount),
  };
}

export async function fetchRegionalPrices(courseId) {
  const admin = getSupabaseAdmin();
  if (!admin || !courseId) return [];

  const { data, error } = await admin
    .from('course_regional_prices')
    .select('region_code, amount, currency, amount_inr')
    .eq('course_id', courseId);

  if (error) {
    console.warn('Could not fetch regional prices:', error.message);
    return [];
  }

  return data ?? [];
}

export async function fetchCourseCode(courseId) {
  const admin = getSupabaseAdmin();
  if (!admin || !courseId) return null;

  const { data, error } = await admin
    .from('courses')
    .select('code')
    .eq('id', courseId)
    .maybeSingle();

  if (error || !data?.code) return null;
  return data.code;
}

export async function getExpectedOrderAmount({ courseId, courseCode, country }) {
  const normalizedCountry = String(country || 'IN').toUpperCase();
  const code = courseCode || (await fetchCourseCode(courseId));
  if (!code) {
    return { error: 'Course not found' };
  }

  const dbRows = await fetchRegionalPrices(courseId);
  const price = resolveCoursePrice(code, normalizedCountry, dbRows);
  return { ...price, courseCode: normalizeProgramCode(code) };
}
