import React, { useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { Download, Loader2 } from 'lucide-react';
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
import PhoneInput from '@/components/PhoneInput';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { trackEvent } from '@/lib/analytics';
import { COURSE_BY_ID, getCourseBrochureFilename } from '@/lib/courses';
import { DEFAULT_COUNTRY, toE164, validatePhone } from '@/lib/phone';

type DownloadBrochureButtonProps = React.ComponentProps<typeof Button> & {
  courseId: string;
};

function triggerBrochureDownload(brochurePath: string, filename: string) {
  const link = document.createElement('a');
  link.href = brochurePath;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const DownloadBrochureButton = ({
  courseId,
  children,
  onClick,
  ...props
}: DownloadBrochureButtonProps) => {
  const course = COURSE_BY_ID[courseId];
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhoneCountry(DEFAULT_COUNTRY);
    setNationalNumber('');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !isSubmitting) {
      resetForm();
    }
    setOpen(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!course?.brochurePath) {
      toast({
        title: 'Brochure unavailable',
        description: 'Please contact admin@zyvotrix.com for program details.',
        variant: 'destructive',
      });
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = nationalNumber.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      toast({
        title: 'Missing details',
        description: 'Please enter your name, email, and mobile number.',
        variant: 'destructive',
      });
      return;
    }

    if (!trimmedEmail.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }

    if (!validatePhone(trimmedPhone, phoneCountry)) {
      toast({ title: 'Enter a valid mobile number', variant: 'destructive' });
      return;
    }

    const phone = toE164(trimmedPhone, phoneCountry);
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] ?? trimmedName;
    const lastName = nameParts.slice(1).join(' ') || '—';

    setIsSubmitting(true);
    try {
      await apiClient.createContact(
        {
          firstName,
          lastName,
          email: trimmedEmail,
          phone,
          subject: course.code
            ? `${course.code} — Brochure Download`
            : `${course.title} — Brochure Download`,
          message: [
            `Program: ${course.title}`,
            course.code ? `Program code: ${course.code}` : null,
            'Action: Downloaded program brochure',
            'Source: Course page — Download Brochure',
          ]
            .filter(Boolean)
            .join('\n'),
        },
        { emailType: 'inquiry' },
      );

      trackEvent('brochure_download', {
        course_id: courseId,
        program: course.title,
        program_code: course.code,
      });

      triggerBrochureDownload(course.brochurePath, getCourseBrochureFilename(courseId));

      toast({
        title: 'Brochure downloading',
        description: 'Your program brochure is downloading.',
      });

      resetForm();
      setOpen(false);
    } catch (error) {
      const description =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast({ title: 'Download failed', description, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(true);
          }
        }}
      >
        {children ?? (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download Brochure
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Program Brochure</DialogTitle>
            <DialogDescription>
              {course
                ? `Enter your details to download the ${course.shortTitle} brochure.`
                : 'Enter your details to download the program brochure.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
            <div className="space-y-2">
              <Label htmlFor="brochure-name">Full Name</Label>
              <Input
                id="brochure-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brochure-phone">Mobile Number</Label>
              <PhoneInput
                id="brochure-phone"
                country={phoneCountry}
                nationalNumber={nationalNumber}
                onCountryChange={setPhoneCountry}
                onNationalNumberChange={setNationalNumber}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brochure-email">Email</Label>
              <Input
                id="brochure-email"
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
                  Preparing download…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Brochure
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadBrochureButton;
