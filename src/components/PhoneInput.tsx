import { useMemo } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { getCountryCallingCode } from 'libphonenumber-js';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import {
  formatNationalNumber,
  getCountryOptions,
  getPhonePlaceholder,
} from '@/lib/phone';

interface PhoneInputProps {
  country: CountryCode;
  nationalNumber: string;
  onCountryChange: (country: CountryCode) => void;
  onNationalNumberChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  inputClassName?: string;
  selectTriggerClassName?: string;
}

const PhoneInput = ({
  country,
  nationalNumber,
  onCountryChange,
  onNationalNumberChange,
  id,
  disabled,
  required,
  inputClassName,
  selectTriggerClassName,
}: PhoneInputProps) => {
  const countryOptions = useMemo(() => getCountryOptions(), []);

  const handleCountryChange = (value: string) => {
    const nextCountry = value as CountryCode;
    onCountryChange(nextCountry);

    if (nationalNumber) {
      const digits = nationalNumber.replace(/\D/g, '');
      onNationalNumberChange(formatNationalNumber(digits, nextCountry));
    }
  };

  const handleNumberChange = (value: string) => {
    onNationalNumberChange(formatNationalNumber(value, country));
  };

  return (
    <div className="flex gap-2">
      <Select value={country} onValueChange={handleCountryChange} disabled={disabled}>
        <SelectTrigger
          className={selectTriggerClassName ?? 'w-[6.5rem] shrink-0'}
          aria-label="Country code"
        >
          <span className="text-sm">+{getCountryCallingCode(country)}</span>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {countryOptions.map(({ code, callingCode, name }) => (
            <SelectItem key={code} value={code}>
              {name} (+{callingCode})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        id={id}
        type="tel"
        inputMode="tel"
        placeholder={getPhonePlaceholder(country)}
        value={nationalNumber}
        onChange={(e) => handleNumberChange(e.target.value)}
        disabled={disabled}
        required={required}
        autoComplete="tel-national"
        className={inputClassName ?? 'flex-1'}
      />
    </div>
  );
};

export default PhoneInput;
