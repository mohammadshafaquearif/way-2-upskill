import React from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCountryOptions } from '@/lib/phone';
import { countryCodeToRegion, getRazorpayCurrencyForCountry, PRICING_REGION_LABELS } from '@/lib/coursePricing';

interface PricingCountrySelectProps {
  value: CountryCode;
  onChange: (country: CountryCode) => void;
  disabled?: boolean;
}

const PricingCountrySelect = ({ value, onChange, disabled }: PricingCountrySelectProps) => {
  const options = getCountryOptions();
  const region = countryCodeToRegion(value);
  const currency = getRazorpayCurrencyForCountry(value);

  return (
    <div className="space-y-2">
      <Label htmlFor="pricing-country">Your country</Label>
      <Select value={value} onValueChange={(v) => onChange(v as CountryCode)} disabled={disabled}>
        <SelectTrigger id="pricing-country" className="cursor-pointer">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          {options.map(({ code, name }) => (
            <SelectItem key={code} value={code} className="cursor-pointer">
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {PRICING_REGION_LABELS[region]} · Pay in {currency}
      </p>
    </div>
  );
};

export default PricingCountrySelect;
