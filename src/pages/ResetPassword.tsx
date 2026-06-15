import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { KeyRound, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const type = hashParams.get('type');

      const { data: { session }, error } = await supabase.auth.getSession();

      if (cancelled) return;

      if (error) {
        toast({
          title: 'Invalid or expired link',
          description: 'Request a new password reset email and try again.',
          variant: 'destructive',
        });
        setIsChecking(false);
        return;
      }

      if (session && (type === 'recovery' || type === null)) {
        setIsReady(true);
        window.history.replaceState({}, '', '/reset-password');
      } else {
        toast({
          title: 'Invalid or expired link',
          description: 'Open the latest reset link from your email.',
          variant: 'destructive',
        });
      }

      setIsChecking(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsReady(true);
        setIsChecking(false);
        window.history.replaceState({}, '', '/reset-password');
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

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

  return (
    <PageShell>
      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Set new password</CardTitle>
            <CardDescription>
              Choose a strong password for your Zyvotrix account.
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
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  This reset link is invalid or has expired.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">Go home & request new link</Link>
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
