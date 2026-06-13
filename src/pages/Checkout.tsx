import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, ArrowLeft, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import PageHero from '@/components/PageHero';
import PageShell from '@/components/layout/PageShell';
import { IMAGES } from '@/lib/images';
import { getCourseByCheckoutId } from '@/lib/courses';
import { formatInr, rupeesToPaise } from '@/lib/payments';
import { openRazorpayCheckout } from '@/lib/razorpayCheckout';
import {
  completeEnrollment,
  saveEnrollmentSuccess,
} from '@/lib/enrollmentWorkflow';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_PRICE_INR = 499;

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
  const [coursePriceInr, setCoursePriceInr] = useState(DEFAULT_PRICE_INR);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [dbCourseId, setDbCourseId] = useState<string | null>(null);

  const checkoutEmail = isAuthenticated && user ? user.email : guestEmail.trim();

  const courseMeta = courseId ? getCourseByCheckoutId(courseId) : undefined;
  const course = useMemo(
    () =>
      courseMeta
        ? {
            id: courseMeta.id,
            title: courseMeta.title,
            duration: courseMeta.duration,
            projects: courseMeta.projects,
            code: courseMeta.code,
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
          (c: { title: string; price?: number; code?: string }) =>
            c.code?.toLowerCase() === course.code.toLowerCase() ||
            c.title.toLowerCase().includes(course.title.split(' ')[0].toLowerCase()) ||
            course.title.toLowerCase().includes(c.title.toLowerCase().slice(0, 12)),
        );
        if (dbCourse?.price) {
          setCoursePriceInr(Number(dbCourse.price) || DEFAULT_PRICE_INR);
        }
        if (dbCourse?.id) {
          setDbCourseId(dbCourse.id as string);
        }
      })
      .catch(() => {
        setCoursePriceInr(DEFAULT_PRICE_INR);
      });
  }, [course]);

  if (!course) return null;

  const amountPaise = rupeesToPaise(coursePriceInr);
  const displayAmount = formatInr(amountPaise);

  const checkoutPhone = isAuthenticated && user?.phone ? user.phone : guestPhone.trim();

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
      amount: coursePriceInr,
      paymentPlan: paymentMethod,
      userId: session?.user?.id,
    });

    if (!result.hasServerEnrollment) {
      const nameFromEmail = email.split('@')[0] || 'Learner';
      await apiClient.createEnrollment({
        userId: session?.user?.id,
        courseId: dbCourseId,
        firstName: user?.firstName || nameFromEmail,
        lastName: user?.lastName || '',
        email,
        phone: checkoutPhone,
        paymentPlan: paymentMethod,
        paymentMethod: `razorpay:${payment.razorpay_payment_id}`,
        totalAmount: coursePriceInr,
        status: 'completed',
      });
    }

    saveEnrollmentSuccess(result);
    navigate('/enrollment/success');
  };

  const handlePayment = async () => {
    if (!isValidEmail(checkoutEmail)) {
      toast({
        title: 'Email required',
        description: 'Please enter a valid email address to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (paymentMethod === 'installment') {
      try {
        setLoading(true);
        await apiClient.createContact({
          firstName: user?.firstName || checkoutEmail.split('@')[0] || 'Learner',
          lastName: user?.lastName || '',
          email: checkoutEmail,
          phone: user?.phone,
          subject: `Flexible enrollment — ${course.title}`,
          message: `Interested in flexible payment options for ${course.title}.`,
        });
        toast({
          title: 'Request received',
          description: 'Our team will contact you at your email with flexible enrollment options.',
        });
      } catch {
        toast({
          title: 'Could not submit request',
          description: 'Please try again or email support@zyvotrix.com',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);

    const receiptSuffix = user?.id?.slice(0, 8) ?? checkoutEmail.replace(/[^a-z0-9]/gi, '').slice(0, 8);

    try {
      await openRazorpayCheckout({
        amountPaise,
        receipt: `enroll_${course.id}_${receiptSuffix}`,
        courseTitle: course.title,
        userName: user ? `${user.firstName} ${user.lastName}`.trim() : checkoutEmail.split('@')[0],
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

  return (
    <PageShell>
      <Navbar />

      <PageHero
        title="Secure Checkout"
        subtitle={`Complete payment for ${course.title} and unlock your learning simulator.`}
        image={IMAGES.hero.enroll}
        imageAlt={course.title}
        centered
      />

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
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Duration:</span> {course.duration}
                    </div>
                    <div>
                      <span className="font-medium">Projects:</span> {course.projects}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="font-medium">Program fee</span>
                  <span className="text-2xl font-bold text-primary">{displayAmount}</span>
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
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="installment" id="installment" />
                      <Label htmlFor="installment" className="flex-1 cursor-pointer">
                        <div className="font-medium">Discuss flexible options</div>
                        <div className="text-sm text-muted-foreground">Our team will reach out with details</div>
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

                <Button onClick={handlePayment} disabled={loading} className="w-full btn-brand py-4 text-lg">
                  {loading
                    ? 'Processing…'
                    : paymentMethod === 'installment'
                      ? 'Submit Request'
                      : `Pay ${displayAmount}`}
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
