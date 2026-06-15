import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { apiClient } from '@/integrations/api/client';
import { toast } from '@/hooks/use-toast';
import { authErrorMessage, clearAuthHash, parseAuthHash } from '@/lib/authHash';
import { AlertCircle, KeyRound, Loader2, Mail } from 'lucide-react';

type LocationState = {
  authError?: string;
  errorCode?: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as LocationState | null) ?? null;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [expiredMessage, setExpiredMessage] = useState<string | null>(locationState?.authError ?? null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const hashParams = parseAuthHash();

      if (hashParams.error) {
        if (!cancelled) {
          setExpiredMessage(
            authErrorMessage(hashParams.errorCode, hashParams.errorDescription),
          );
          setIsReady(false);
          setIsChecking(false);
          clearAuthHash();
        }
        return;
      }

      const type = hashParams.type;

      const { data: { session }, error } = await supabase.auth.getSession();

      if (cancelled) return;

      if (error) {
        setExpiredMessage('Could not verify this reset link. Please request a new one.');
        setIsChecking(false);
        return;
      }

      if (session && (type === 'recovery' || type === null)) {
        setIsReady(true);
        setExpiredMessage(null);
        clearAuthHash();
      } else {
        setExpiredMessage(
          (prev) =>
            prev ??
            locationState?.authError ??
            'This reset link is invalid or has expired. Request a new link below.',
        );
      }

      setIsChecking(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsReady(true);
        setIsChecking(false);
        setExpiredMessage(null);
        clearAuthHash();
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [location.hash, locationState?.authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Use at least 8 characters.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please confirm your new password.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      toast({
        title: 'Password updated',
        description: 'You can now sign in with your new password.',
      });

      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Could not reset password',
        description: error instanceof Error ? error.message : 'Please request a new reset link.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = resendEmail.trim();
    if (!email) return;

    setIsResending(true);
    try {
      await apiClient.resetPassword(email);
      toast({
        title: 'New reset email sent',
        description: `Check ${email} and use the latest link within 1 hour.`,
      });
      setResendEmail('');
    } catch {
      toast({
        title: 'Could not send reset email',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <PageShell>
      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{isReady ? 'Set new password' : 'Reset your password'}</CardTitle>
            <CardDescription>
              {isReady
                ? 'Choose a strong password for your Zyvotrix account.'
                : 'Request a new link if yours expired or was already used.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isChecking ? (
              <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Verifying reset link…</p>
              </div>
            ) : isReady ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating…
                    </>
                  ) : (
                    'Update password'
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                {expiredMessage && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{expiredMessage}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleResend} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="resend-email">Email address</Label>
                    <Input
                      id="resend-email"
                      type="email"
                      placeholder="you@example.com"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isResending}>
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send new reset link
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-xs text-muted-foreground">
                  Links expire after about 1 hour. Always open the most recent email.
                </p>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <Footer />
    </PageShell>
  );
};

export default ResetPassword;
