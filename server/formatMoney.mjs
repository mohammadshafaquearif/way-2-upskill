const CURRENCY_LOCALE = {
  INR: 'en-IN',
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  AED: 'en-AE',
  CAD: 'en-CA',
  AUD: 'en-AU',
  SGD: 'en-SG',
};

export function formatMoney(amount, currency = 'INR') {
  const code = String(currency || 'INR').toUpperCase();
  const value = Number(amount) || 0;
  const locale = CURRENCY_LOCALE[code] || 'en-US';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: code === 'INR' ? 0 : 2,
    }).format(value);
  } catch {
    return `${code} ${value.toFixed(2)}`;
  }
}

/** ASCII-safe for PDF standard fonts (no ₹ etc.) */
export function formatMoneyPdf(amount, currency = 'INR') {
  const code = String(currency || 'INR').toUpperCase();
  const value = Number(amount) || 0;
  const formatted = value.toLocaleString('en-IN', {
    maximumFractionDigits: code === 'INR' ? 0 : 2,
    minimumFractionDigits: code === 'INR' ? 0 : 2,
  });
  return `${code} ${formatted}`;
}
