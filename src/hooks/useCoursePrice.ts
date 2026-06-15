import { useEffect, useMemo, useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { apiClient } from '@/integrations/api/client';
import { DEFAULT_COUNTRY } from '@/lib/phone';
import {
  countryCodeToRegion,
  getRazorpayCurrencyForCountry,
  getStoredPricingCountry,
  resolveCoursePrice,
  setStoredPricingCountry,
  type RegionalPriceRow,
} from '@/lib/coursePricing';

interface UseCoursePriceOptions {
  courseCode?: string;
  courseId?: string | null;
  country?: CountryCode;
}

export function useCoursePrice({ courseCode, courseId, country }: UseCoursePriceOptions) {
  const [pricingCountry, setPricingCountry] = useState<CountryCode>(
    () => country ?? getStoredPricingCountry() ?? DEFAULT_COUNTRY,
  );
  const [rows, setRows] = useState<RegionalPriceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (country) setPricingCountry(country);
  }, [country]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!courseCode && !courseId) {
        setRows([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await apiClient.getCourseRegionalPrices({
          courseCode,
          courseId: courseId ?? undefined,
        });
        if (!cancelled) setRows(data);
      } catch {
        if (!cancelled) setRows([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseCode, courseId]);

  const region = useMemo(() => countryCodeToRegion(pricingCountry), [pricingCountry]);
  const razorpayCurrency = useMemo(
    () => getRazorpayCurrencyForCountry(pricingCountry),
    [pricingCountry],
  );

  const price = useMemo(
    () => resolveCoursePrice(courseCode ?? 'AAC', pricingCountry, rows),
    [courseCode, pricingCountry, rows],
  );

  const setCountry = (code: CountryCode) => {
    setPricingCountry(code);
    setStoredPricingCountry(code);
  };

  return {
    pricingCountry,
    setCountry,
    region,
    razorpayCurrency,
    price,
    displayPrice: price.displayPrice,
    chargeLabel: price.chargeLabel,
    isLoading,
    hasRegionalPricing: rows.length > 0,
  };
}
