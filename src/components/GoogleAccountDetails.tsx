import { useEffect, useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhoneInput from '@/components/PhoneInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { DEFAULT_COUNTRY, toE164, validatePhone } from '@/lib/phone';

const GoogleAccountDetails = () => {
  const { user, isLoading, login } = useAuth();
  const { toast } = useToast();
  const [dismissed, setDismissed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [subject, setSubject] = useState(user?.interestedSubject ?? '');
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setFirstName((current) => current || user.firstName);
    setLastName((current) => current || user.lastName);
    setSubject((current) => current || user.interestedSubject || '');
  }, [user]);

  const needsDetails = Boolean(user && !user.phone.trim());
  if (isLoading || !needsDetails || dismissed || !user) return null;

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('Enter your first and last name.');
      return;
    }
    if (!validatePhone(nationalNumber, phoneCountry)) {
      setError('Enter a valid phone number.');
      return;
    }
    if (!subject) {
      setError('Choose the program you are interested in.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const appUser = await apiClient.completeGoogleProfile({
        userId: user.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: user.email,
        phone: toE164(nationalNumber, phoneCountry),
        interestedSubject: subject,
      });
      login(appUser);
      toast({
        title: 'Account ready',
        description: 'Your Google account is saved with Zyvotrix.',
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save your details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) setDismissed(true); }}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Finish your account</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm text-muted-foreground">
          Google signed you in as {user.email}. Add a phone number so the team can reach you.
        </p>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="google-first-name">First name</Label>
              <Input id="google-first-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="h-12" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google-last-name">Last name</Label>
              <Input id="google-last-name" value={lastName} onChange={(event) => setLastName(event.target.value)} className="h-12" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="google-phone">Phone number</Label>
            <PhoneInput
              id="google-phone"
              country={phoneCountry}
              nationalNumber={nationalNumber}
              onCountryChange={setPhoneCountry}
              onNationalNumberChange={setNationalNumber}
              required
              inputClassName="h-12 flex-1"
              selectTriggerClassName="h-12 w-[6.5rem] shrink-0"
            />
          </div>
          <div className="space-y-2">
            <Label>Interested in</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your area of interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dop">AI-Powered DevOps (DOP)</SelectItem>
                <SelectItem value="aac">Agentic AI (AAC)</SelectItem>
                <SelectItem value="aws">AWS Solutions Architect</SelectItem>
                <SelectItem value="data-science">Data Science with Python</SelectItem>
                <SelectItem value="all">All Programs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" className="h-12 w-full font-bold brand-gradient border-0 text-white hover:opacity-90" disabled={saving}>
            {saving ? 'Saving...' : 'Save and continue'}
          </Button>
          <button type="button" className="w-full text-sm text-muted-foreground hover:underline" onClick={() => setDismissed(true)}>
            Skip for now
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleAccountDetails;
