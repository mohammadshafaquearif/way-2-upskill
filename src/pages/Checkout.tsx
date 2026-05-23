import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import PageHero from '@/components/PageHero';
import { IMAGES } from '@/lib/images';

const courseData = {
  'ai-ml': {
    id: 'ai-ml',
    title: 'Professional AI/ML & Generative AI Career Accelerator',
    duration: '8 Weeks',
    projects: '15+'
  },
  'web-dev': {
    id: 'web-dev',
    title: 'Full Stack Web Development',
    duration: '10 Weeks',
    projects: '12+'
  },
  'devops': {
    id: 'devops',
    title: 'DevOps Engineering',
    duration: '8 Weeks',
    projects: '10+'
  },
  'cloud': {
    id: 'cloud',
    title: 'Cloud Computing & AWS',
    duration: '10 Weeks',
    projects: '12+'
  },
  'cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    duration: '12 Weeks',
    projects: '8+'
  }
};

const Checkout: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('full');
  const [paymentType, setPaymentType] = useState('card');

  const course = courseData[courseId as keyof typeof courseData];

  useEffect(() => {
    if (!course) {
      navigate('/courses');
      return;
    }
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
  }, [course, isAuthenticated, navigate]);

  if (!course) return null;

  const handlePayment = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create enrollment record
      const allCourses = await apiClient.getAllCourses();
      const dbCourse = allCourses.find(
        (c: { title: string }) =>
          c.title.toLowerCase().includes(course.title.split(' ')[0].toLowerCase()) ||
          course.title.toLowerCase().includes(c.title.toLowerCase().slice(0, 12))
      );

      if (!dbCourse?.id) {
        throw new Error('Course not found in database. Run supabase/schema.sql first.');
      }

      await apiClient.createEnrollment({
        userId: user.id,
        courseId: dbCourse.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        paymentPlan: paymentMethod,
        paymentMethod: paymentType,
        totalAmount: 0,
        status: 'completed',
      });

      toast({
        title: "Payment Successful!",
        description: `You have successfully enrolled in ${course.title}`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <PageHero
        title="Start Learning"
        subtitle={`Confirm your interest in ${course.title} — our team will share next steps.`}
        image={IMAGES.hero.enroll}
        imageAlt={course.title}
        centered
      />

      <div className="pb-16">
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
            {/* Course Summary */}
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
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Duration:</span> {course.duration}
                    </div>
                    <div>
                      <span className="font-medium">Projects:</span> {course.projects}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 text-sm text-gray-600">
                  <p>
                    Program fees and enrollment options are shared after your application is reviewed.
                    Questions? Email{' '}
                    <a href="mailto:support@zyvotrix.com" className="text-primary font-semibold hover:underline">
                      support@zyvotrix.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Preferences</CardTitle>
                <CardDescription>Tell us how you would like to proceed — we will follow up with details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Plan */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">How would you like to enroll?</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="flex-1 cursor-pointer">
                        <div className="font-medium">Start with full program access</div>
                        <div className="text-sm text-gray-600">Complete structured path with projects & support</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="installment" id="installment" />
                      <Label htmlFor="installment" className="flex-1 cursor-pointer">
                        <div className="font-medium">Discuss flexible options</div>
                        <div className="text-sm text-gray-600">Our team will reach out with enrollment details</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Payment Method</Label>
                  <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        UPI Payment
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Details */}
                {paymentType === 'card' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                      <div>
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentType === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input id="mobile" placeholder="+91 9876543210" />
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-4 text-lg font-semibold"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                  Our team will contact you with program and enrollment details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
