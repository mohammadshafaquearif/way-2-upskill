import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CountryCode } from 'libphonenumber-js';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCountrySelect from '@/components/courses/PricingCountrySelect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, ArrowLeft, CreditCard, Smartphone, ShieldCheck, Clock, FolderKanban, GraduationCap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import PageShell from '@/components/layout/PageShell';
import { Badge } from '@/components/ui/badge';
import { getCourseByCheckoutId } from '@/lib/courses';
import { GST_RATE } from '@/lib/coursePricing';
import { useCoursePrice } from '@/hooks/useCoursePrice';
import { buildCheckoutSeo } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';
import { openRazorpayCheckout } from '@/lib/razorpayCheckout';
import {
  completeEnrollment,
  saveEnrollmentSuccess,
} from '@/lib/enrollmentWorkflow';
import { supabase } from '@/integrations/supabase/client';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('full');
  const [paymentType, setPaymentType] = useState('razorpay');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestName, setGuestName] = useState('');
  const [dbCourseId, setDbCourseId] = useState<string | null>(null);
  const [dbDescription, setDbDescription] = useState<string | null>(null);
  const [pricingCountry, setPricingCountry] = useState<CountryCode>('IN');
  const didAutoPayRef = useRef(false);

  const shareParams = useMemo(() => {
    try {
      const url = new URL(window.location.href);
      const p = url.searchParams;
      return {
        email: p.get('email')?.trim() || '',
        phone: p.get('phone')?.trim() || '',
        name: p.get('name')?.trim() || '',
        autoPay: p.get('autoPay') === '1' || p.get('autoPay') === 'true',
      };
    } catch {
      return { email: '', phone: '', name: '', autoPay: false };
    }
  }, []);

  const checkoutEmail = isAuthenticated && user ? user.email : guestEmail.trim();

  const courseMeta = courseId ? getCourseByCheckoutId(courseId) : undefined;

  usePageMeta(buildCheckoutSeo(courseId ?? ''));

  const course = useMemo(
    () =>
      courseMeta
        ? {
            id: courseMeta.id,
            title: courseMeta.title,
            shortTitle: courseMeta.shortTitle,
            description: courseMeta.description,
            duration: courseMeta.duration,
            projects: courseMeta.projects,
            code: courseMeta.code,
            level: courseMeta.level,
            includes: courseMeta.checkoutIncludes,
          }
        : undefined,
    [courseMeta],
  );

  useEffect(() => {
    if (!course) {
      navigate('/courses');
    }
  }, [course, navigate]);

  useEffect(() => {
    if (!course) return;

    apiClient
      .getAllCourses()
      .then((courses) => {
        const dbCourse = courses.find(
          (c: { title: string; price?: number; code?: string; id?: string; description?: string }) =>
            c.code?.toLowerCase() === course.code.toLowerCase() ||
            c.title.toLowerCase().includes(course.title.split(' ')[0].toLowerCase()) ||
            course.title.toLowerCase().includes(c.title.toLowerCase().slice(0, 12)),
        );
        if (dbCourse?.id) {
          setDbCourseId(dbCourse.id as string);
        }
        if (dbCourse?.description) {
          setDbDescription(dbCourse.description as string);
        }
      })
      .catch(() => {
        /* keep fallback pricing */
      });
  }, [course]);

  const {
    price: resolvedPrice,
    displayPrice,
    chargeLabel,
    setCountry: setPricingCountryFromHook,
    isLoading: priceLoading,
  } = useCoursePrice({
    courseCode: course?.code,
    courseId: dbCourseId,
    country: pricingCountry,
  });

  const handleCountryChange = (country: CountryCode) => {
    setPricingCountry(country);
    setPricingCountryFromHook(country);
  };

  const chargeAmount = resolvedPrice.amount;
  const amountMinor = resolvedPrice.amountMinor;
  const chargeCurrency = resolvedPrice.currency;

  const payButtonLabel = priceLoading ? 'Loading price…' : `Pay ${chargeLabel}`;

  useEffect(() => {
    if (isAuthenticated) return;
    if (!shareParams.email && !shareParams.phone && !shareParams.name) return;
    if (shareParams.email) setGuestEmail(shareParams.email);
    if (shareParams.phone) setGuestPhone(shareParams.phone);
    if (shareParams.name) setGuestName(shareParams.name);
  }, [isAuthenticated, shareParams.email, shareParams.phone, shareParams.name]);

  const runPostPaymentWorkflow = async (
    payment: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    },
    email: string,
  ) => {
    if (!dbCourseId) {
      throw new Error('Course not found in database. Run supabase/schema.sql first.');
    }

    const { data: { session } } = await supabase.auth.getSession();
    const learnerName = user
      ? `${user.firstName} ${user.lastName}`.trim()
      : email.split('@')[0];

    const result = await completeEnrollment({
      ...payment,
      email,
      learnerName,
      phone: checkoutPhone || undefined,
      courseId: dbCourseId,
      programCode: course.code,
      programSlug: course.id,
      courseTitle: course.title,
      duration: course.duration,
      paymentPlan: paymentMethod,
      userId: session?.user?.id,
      countryCode: pricingCountry,
      country: new Intl.DisplayNames(['en'], { type: 'region' }).of(pricingCountry) ?? pricingCountry,
    });

    if (!result.hasServerEnrollment) {
      throw new Error('Enrollment could not be confirmed. Contact support@zyvotrix.com with your payment ID.');
    }

    saveEnrollmentSuccess(result);
    navigate('/enrollment/success');
  };

  const handlePayment = async () => {
    if (!course) return;
    if (!isValidEmail(checkoutEmail)) {
      toast({
        title: 'Email required',
        description: 'Please enter a valid email address to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (!dbCourseId) {
      toast({
        title: 'Course unavailable',
        description: 'Please try again in a moment or contact support.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const receiptSuffix = user?.id?.slice(0, 8) ?? checkoutEmail.replace(/[^a-z0-9]/gi, '').slice(0, 8);

    try {
      await openRazorpayCheckout({
        courseId: dbCourseId,
        courseCode: course.code,
        country: pricingCountry,
        receipt: `enroll_${course.id}_${receiptSuffix}`,
        courseTitle: course.title,
        userName: user
          ? `${user.firstName} ${user.lastName}`.trim()
          : guestName.trim() || checkoutEmail.split('@')[0],
        userEmail: checkoutEmail,
        userPhone: checkoutPhone || undefined,
        onSuccess: async (payment) => {
          try {
            await runPostPaymentWorkflow(payment, checkoutEmail);
          } catch (error) {
            toast({
              title: 'Enrollment failed',
              description:
                error instanceof Error ? error.message : 'Payment succeeded but enrollment could not be saved.',
              variant: 'destructive',
            });
          } finally {
            setLoading(false);
          }
        },
        onDismiss: () => {
          setLoading(false);
          toast({
            title: 'Payment cancelled',
            description: 'You closed the payment window.',
          });
        },
        onError: (message) => {
          setLoading(false);
          toast({
            title: 'Payment failed',
            description: message,
            variant: 'destructive',
          });
        },
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Checkout error',
        description: error instanceof Error ? error.message : 'Could not start Razorpay checkout.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (didAutoPayRef.current) return;
    if (!shareParams.autoPay) return;
    if (loading || priceLoading) return;
    if (!dbCourseId) return;
    if (paymentMethod !== 'full') return;
    if (!isValidEmail(checkoutEmail)) return;

    didAutoPayRef.current = true;
    void handlePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shareParams.autoPay,
    loading,
    priceLoading,
    dbCourseId,
    paymentMethod,
    checkoutEmail,
    pricingCountry,
  ]);

  if (!course) return null;

  const courseDescription = dbDescription ?? course.description;
  const checkoutPhone = isAuthenticated && user?.phone ? user.phone : guestPhone.trim();

  return (
    <PageShell>
      <Navbar />

      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-8 sm:pt-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Secure Checkout</p>
          <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{course.shortTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{courseDescription}</p>
        </div>
      </section>

      <section className="section-padding section-alt pb-16">
        <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/courses')}
            className="mb-8 border-primary text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Course Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3 rounded-lg border bg-card p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{course.code}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{course.title}</h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-primary" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FolderKanban className="h-4 w-4 shrink-0 text-primary" />
                      {course.projects} projects
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                      Mentor-led
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2">
                    {course.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <PricingCountrySelect
                    value={pricingCountry}
                    onChange={handleCountryChange}
                    disabled={priceLoading}
                  />
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Program fee</span>
                    <span className="text-lg font-semibold text-primary">
                      {priceLoading ? '…' : displayPrice}
                    </span>
                  </div>
                  {!priceLoading && resolvedPrice.inrBase != null && resolvedPrice.gstAmount != null && (
                    <>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>GST ({Math.round(GST_RATE * 100)}%)</span>
                        <span>
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          }).format(resolvedPrice.gstAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-2">
                        <span className="font-semibold">Total payable</span>
                        <span className="text-2xl font-bold text-primary">{chargeLabel}</span>
                      </div>
                    </>
                  )}
                  {!priceLoading && resolvedPrice.inrBase == null && (
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="font-semibold">Total payable ({chargeCurrency})</span>
                      <span className="text-2xl font-bold text-primary">{chargeLabel}</span>
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground flex gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p>
                    Payments are processed securely via Razorpay. After success, you will be redirected to your
                    interactive learning simulator dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Pay with UPI, cards, netbanking, or wallets via Razorpay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="checkout-email" className="text-base font-semibold">
                    Email address
                  </Label>
                  {isAuthenticated && user ? (
                    <Input id="checkout-email" type="email" value={user.email} readOnly className="bg-muted" />
                  ) : (
                    <>
                      <Input
                        id="checkout-email"
                        type="email"
                        placeholder="you@example.com"
                        value={guestEmail}
                        onChange={(event) => setGuestEmail(event.target.value)}
                        autoComplete="email"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Enrollment confirmation and portal access will be sent to this email.
                      </p>
                      <div className="pt-2">
                        <Label htmlFor="checkout-phone" className="text-sm">
                          Phone (optional)
                        </Label>
                        <Input
                          id="checkout-phone"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={guestPhone}
                          onChange={(event) => setGuestPhone(event.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Enrollment option</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="flex-1 cursor-pointer">
                        <div className="font-medium">Pay now — unlock simulator</div>
                        <div className="text-sm text-muted-foreground">
                          Instant access to labs, modules, and progress tracking
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === 'full' && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Payment method</Label>
                    <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <Label htmlFor="razorpay" className="flex-1 cursor-pointer flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Card / Netbanking / Wallet
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-80">
                        <RadioGroupItem value="upi" id="upi" disabled />
                        <Label htmlFor="upi" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          UPI (via Razorpay modal)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <Button onClick={handlePayment} disabled={loading || priceLoading} className="w-full btn-brand py-4 text-lg">
                  {loading
                    ? 'Processing…'
                    : payButtonLabel}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By paying, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
};

export default Checkout;
