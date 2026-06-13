import React, { useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhoneInput from '@/components/PhoneInput';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { trackEvent } from '@/lib/analytics';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { DEFAULT_COUNTRY, toE164, validatePhone } from '@/lib/phone';

interface ProgramInquirySidebarProps {
  programName: string;
  programCode?: string;
}

const splitFullName = (fullName: string) => {
  const trimmed = fullName.trim();
  const spaceIdx = trimmed.indexOf(' ');
  if (spaceIdx <= 0) {
    return { firstName: trimmed, lastName: '—' };
  }
  return {
    firstName: trimmed.slice(0, spaceIdx),
    lastName: trimmed.slice(spaceIdx + 1),
  };
};

const ProgramInquirySidebar = ({ programName, programCode }: ProgramInquirySidebarProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = nationalNumber.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      toast({
        title: 'Missing details',
        description: 'Please fill in your name, email, and phone number.',
        variant: 'destructive',
      });
      return;
    }

    if (!validatePhone(trimmedPhone, phoneCountry)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number.',
        variant: 'destructive',
      });
      return;
    }

    const phone = toE164(trimmedPhone, phoneCountry);

    if (!agreed) {
      toast({
        title: 'Please accept the terms',
        description: 'You must agree to the Terms and Privacy Policy to continue.',
        variant: 'destructive',
      });
      return;
    }

    const { firstName, lastName } = splitFullName(trimmedName);

    setIsSubmitting(true);
    try {
      await apiClient.createContact({
        firstName,
        lastName,
        email: trimmedEmail,
        phone,
        subject: programCode
          ? `${programCode} — Program Inquiry`
          : `${programName} — Program Inquiry`,
        message: [
          `Program: ${programName}`,
          programCode ? `Program code: ${programCode}` : null,
          'Source: Program curriculum page inquiry form',
        ]
          .filter(Boolean)
          .join('\n'),
      });

      trackEvent('program_inquiry_submit', {
        program: programName,
        program_code: programCode,
      });

      toast({
        title: 'Request received',
        description: 'An advisor will reach out shortly with program details.',
      });

      setName('');
      setEmail('');
      setPhoneCountry(DEFAULT_COUNTRY);
      setNationalNumber('');
      setAgreed(false);
    } catch (error) {
      const description =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast({
        title: 'Submission failed',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="program-curriculum-sidebar space-y-4">
      <div className="program-inquiry-contact rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Contact Us
        </p>
        <div className="flex items-center justify-between gap-3">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-foreground transition-colors hover:text-primary sm:text-2xl"
          >
            +91 8887720741
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Chat on WhatsApp"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="program-inquiry-form rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h3 className="mb-5 text-center text-lg font-bold text-foreground">
          Request More Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="inquiry-name" className="text-xs font-semibold text-muted-foreground">
              Name<span className="text-destructive">*</span>
            </Label>
            <Input
              id="inquiry-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              placeholder="Your full name"
              className="rounded-none border-0 border-b border-border px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="inquiry-email" className="text-xs font-semibold text-muted-foreground">
              Email<span className="text-destructive">*</span>
            </Label>
            <Input
              id="inquiry-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              placeholder="you@email.com"
              className="rounded-none border-0 border-b border-border px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="inquiry-phone" className="text-xs font-semibold text-muted-foreground">
              Phone Number<span className="text-destructive">*</span>
            </Label>
            <PhoneInput
              id="inquiry-phone"
              country={phoneCountry}
              nationalNumber={nationalNumber}
              onCountryChange={setPhoneCountry}
              onNationalNumberChange={setNationalNumber}
              required
              inputClassName="flex-1 rounded-none border-0 border-b border-border px-0 shadow-none focus-visible:ring-0"
              selectTriggerClassName="w-[5.5rem] shrink-0 rounded-none border-0 border-b border-border px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              id="inquiry-terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <Label htmlFor="inquiry-terms" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
              I agree to Zyvotrix{' '}
              <Link to="/terms" className="text-primary underline-offset-2 hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Talk to Advisor'}
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default ProgramInquirySidebar;
