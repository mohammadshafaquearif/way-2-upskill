import React, { useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { trackEvent } from '@/lib/analytics';
import PhoneInput from '@/components/PhoneInput';
import { DEFAULT_COUNTRY, toE164, validatePhone } from '@/lib/phone';

interface EnrollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programName?: string;
}

const EnrollModal = ({ open, onOpenChange, programName }: EnrollModalProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setCountry(DEFAULT_COUNTRY);
    setNationalNumber('');
    setEmail('');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !nationalNumber.trim()) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    if (!trimmedEmail.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }

    if (!validatePhone(nationalNumber, country)) {
      toast({ title: 'Enter a valid phone number', variant: 'destructive' });
      return;
    }

    const phone = toE164(nationalNumber, country);

    setIsSubmitting(true);

    try {
      const nameParts = trimmedName.split(/\s+/);
      const firstName = nameParts[0] ?? trimmedName;
      const lastName = nameParts.slice(1).join(' ') || '-';

      await apiClient.createContact(
        {
          firstName,
          lastName,
          email: trimmedEmail,
          phone: phone,
          subject: programName ? `Enrollment — ${programName}` : 'Enrollment Inquiry',
          message: programName
            ? `Enrollment request for ${programName}.`
            : 'Enrollment request submitted via website popup.',
        },
        { emailType: 'enrollment' },
      );

      trackEvent('enroll_form_submit', { program: programName ?? 'general' });

      toast({
        title: 'Request submitted!',
        description: 'Our team will contact you shortly with enrollment details.',
      });

      resetForm();
      onOpenChange(false);
    } catch (error) {
      const description =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast({ title: 'Submission failed', description, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enroll in a Program</DialogTitle>
          <DialogDescription>
            {programName
              ? `Share your details for ${programName} — we'll reach out with next steps.`
              : 'Share your details and our team will guide you to the right program.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="enroll-name">Full Name</Label>
            <Input
              id="enroll-name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enroll-phone">Phone Number</Label>
            <PhoneInput
              id="enroll-phone"
              country={country}
              nationalNumber={nationalNumber}
              onCountryChange={setCountry}
              onNationalNumberChange={setNationalNumber}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enroll-email">Email</Label>
            <Input
              id="enroll-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <Button type="submit" className="btn-brand h-11 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollModal;
