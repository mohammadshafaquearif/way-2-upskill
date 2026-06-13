import type { CountryCode } from 'libphonenumber-js';
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

export const DEFAULT_COUNTRY: CountryCode = 'IN';

const PRIORITY_COUNTRIES: CountryCode[] = ['IN', 'US', 'GB', 'AE', 'CA', 'AU'];

export interface CountryOption {
  code: CountryCode;
  callingCode: string;
  name: string;
}

function getCountryName(code: CountryCode): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function getCountryOptions(): CountryOption[] {
  const allCountries = getCountries();
  const prioritySet = new Set(PRIORITY_COUNTRIES);
  const priority = PRIORITY_COUNTRIES.filter((c) => allCountries.includes(c));
  const rest = allCountries.filter((c) => !prioritySet.has(c)).sort();

  return [...priority, ...rest].map((code) => ({
    code,
    callingCode: getCountryCallingCode(code),
    name: getCountryName(code),
  }));
}

export function formatNationalNumber(value: string, country: CountryCode): string {
  return new AsYouType(country).input(value);
}

export function getPhonePlaceholder(country: CountryCode): string {
  const example = getExampleNumber(country, examples);
  return example?.formatNational() ?? 'Phone number';
}

export function validatePhone(nationalNumber: string, country: CountryCode): boolean {
  const digits = nationalNumber.replace(/\D/g, '');
  if (!digits) return false;

  const full = `+${getCountryCallingCode(country)}${digits}`;
  return isValidPhoneNumber(full, country);
}

export function toE164(nationalNumber: string, country: CountryCode): string {
  const digits = nationalNumber.replace(/\D/g, '');
  const phone = parsePhoneNumberWithError(digits, country);
  return phone.format('E.164');
}
