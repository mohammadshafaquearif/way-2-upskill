import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LearnerSidebar, { LearnerMobileToggle } from '@/components/lms/LearnerSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const LMSLayout = () => {
  const { user } = useAuth();
  const { learnerState, isLoading, hasEnrollment } = useLearnerProgram();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Please login to access your learning dashboard</h1>
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
          <p className="text-muted-foreground">Loading your learning platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] pt-16 lg:pt-0">
        <LearnerSidebar
          programCode={learnerState?.programCode}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-16 z-30 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:top-0 lg:px-6">
            <LearnerMobileToggle open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {learnerState?.programTitle ?? 'Zyvotrix Learning Platform'}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {hasEnrollment ? 'Your professional learning operating system' : 'Enroll to unlock full access'}
              </p>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {!hasEnrollment ? (
              <Card className="mx-auto max-w-lg">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold">No active enrollment</h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Enroll in a program to unlock curriculum, live sessions, assignments, and your certificate track.
                  </p>
                  <Button asChild>
                    <Link to="/courses">Browse Programs</Link>
                  </Button>
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
