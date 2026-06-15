import React, { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LearnerSidebar, { LearnerMobileToggle } from '@/components/lms/LearnerSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';

const PAGE_META: { path: string; title: string; description: string; exact?: boolean }[] = [
  { path: '/dashboard', title: 'Dashboard', description: 'Your progress, sessions, and upcoming tasks', exact: true },
  { path: '/dashboard/curriculum', title: 'Curriculum', description: 'Modules, lessons, and learning path' },
  { path: '/dashboard/sessions', title: 'Live Sessions', description: 'Upcoming and past mentor-led sessions' },
  { path: '/dashboard/assignments', title: 'Assignments', description: 'Phase projects and submissions' },
  { path: '/dashboard/projects', title: 'Projects', description: 'Portfolio projects and mentor feedback' },
  { path: '/dashboard/resources', title: 'Resources', description: 'Downloads, links, and reference material' },
  { path: '/dashboard/certificate', title: 'Certificate', description: 'Completion status and certificate download' },
  { path: '/dashboard/profile', title: 'Profile', description: 'Account details and preferences' },
];

const LMSLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { learnerState, isLoading, hasEnrollment, hasCancelledEnrollment } = useLearnerProgram();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageMeta = useMemo(() => {
    const match = PAGE_META.find(({ path, exact }) =>
      exact ? location.pathname === path : location.pathname.startsWith(path),
    );
    return match ?? PAGE_META[0];
  }, [location.pathname]);

  const isQuizExam = /\/dashboard\/curriculum\/\d+\/quiz/.test(location.pathname);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold">Please sign in to access your learning dashboard</h1>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
          <p className="text-muted-foreground">Loading your learning platform…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-var(--site-header-h))] pt-[var(--site-header-h)]">
        {!isQuizExam && (
        <LearnerSidebar
          programCode={learnerState?.programCode}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          {!isQuizExam && (
          <header className="sticky top-[var(--site-header-h)] z-30 flex items-center gap-3 border-b border-border/80 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
            <LearnerMobileToggle open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">{pageMeta.title}</h1>
              <p className="truncate text-sm text-muted-foreground">
                {hasEnrollment
                  ? learnerState?.programTitle
                    ? `${pageMeta.description} · ${learnerState.programTitle}`
                    : pageMeta.description
                  : 'Enroll in a program to unlock full access'}
              </p>
            </div>
          </header>
          )}

          <main className={cn('flex-1 overflow-y-auto', isQuizExam ? 'p-0' : 'p-4 lg:p-6')}>
            {!hasEnrollment ? (
              <Card className="mx-auto max-w-lg border-border/70 shadow-sm">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    {hasCancelledEnrollment ? (
                      <ShieldX className="h-8 w-8 text-destructive" />
                    ) : (
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">
                    {hasCancelledEnrollment ? 'Course access revoked' : 'No active enrollment'}
                  </h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {hasCancelledEnrollment
                      ? 'Your enrollment has been cancelled. LMS access, curriculum, and certificate features are no longer available.'
                      : 'Enroll in a program to unlock curriculum, live sessions, assignments, and your certificate track.'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild>
                      <Link to="/courses">{hasCancelledEnrollment ? 'Re-enroll' : 'Browse Programs'}</Link>
                    </Button>
                    {hasCancelledEnrollment ? (
                      <Button variant="outline" asChild>
                        <Link to="/contact">Contact support</Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Outlet context={{ learnerState }} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LMSLayout;

export function useLMSOutlet() {
  return useLearnerProgram();
}
