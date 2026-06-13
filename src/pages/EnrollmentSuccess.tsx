import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  clearEnrollmentSuccess,
  loadEnrollmentSuccess,
  type CompleteEnrollmentResult,
} from '@/lib/enrollmentWorkflow';
import { setGuestCheckoutEmail } from '@/lib/learningSimulator';
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Mail,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';

const EnrollmentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const data = loadEnrollmentSuccess() as CompleteEnrollmentResult | null;

  useEffect(() => {
    if (!data?.success) {
      navigate('/courses');
      return;
    }

    if (data.email) {
      setGuestCheckoutEmail(data.email);
    }
  }, [data, navigate]);

  if (!data?.success) return null;

  const communityLink =
    data.community?.discord || data.community?.whatsapp || data.community?.telegram || '';

  const programSlug = data.programCode?.toLowerCase().replace(/\s+/g, '-') || 'aac';

  return (
    <PageShell>
      <Navbar />

      <section className="pt-28 pb-16 min-h-[80vh] bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to Zyvotrix</h1>
            <p className="text-lg text-muted-foreground">Your enrollment has been confirmed.</p>
          </div>

          <Card className="mb-6 border-primary/20 shadow-lg">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Program</p>
                  <p className="font-semibold">{data.courseTitle}</p>
                  <Badge className="mt-2" variant="secondary">
                    {data.programCode}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Enrollment ID</p>
                  <p className="font-mono font-semibold text-primary">{data.enrollmentNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">{data.duration || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registered Email</p>
                  <p className="font-medium break-all">{data.email}</p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-5 space-y-3">
                <p className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Next Steps
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    Check your email for welcome message and portal access
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    Join the learner community
                  </li>
                  <li className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    Access your learning portal and complete onboarding
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    Review curriculum and attend the orientation session
                  </li>
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild size="lg" className="w-full">
                  <Link to={`/learn/${programSlug}`}>Access Learning Portal</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link to="/dashboard">Access Dashboard</Link>
                </Button>
                {communityLink ? (
                  <Button asChild size="lg" variant="outline" className="w-full sm:col-span-2">
                    <a href={communityLink} target="_blank" rel="noopener noreferrer">
                      <Users className="w-4 h-4 mr-2" />
                      Join Community
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                ) : null}
                <Button asChild size="lg" variant="secondary" className="w-full sm:col-span-2">
                  <Link to={`/learn/${programSlug}`}>View Curriculum</Link>
                </Button>
                {data.whatsappNotifyUrl && (
                  <Button asChild size="lg" variant="ghost" className="w-full sm:col-span-2">
                    <a href={data.whatsappNotifyUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Open WhatsApp Welcome Message
                    </a>
                  </Button>
                )}
              </div>

              {data.isNewAccount && (
                <p className="text-xs text-center text-muted-foreground">
                  A secure login link has been sent to your email. Use it to access your dashboard anytime.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => {
                clearEnrollmentSuccess();
                navigate('/courses');
              }}
            >
              Browse more programs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
};

export default EnrollmentSuccess;
