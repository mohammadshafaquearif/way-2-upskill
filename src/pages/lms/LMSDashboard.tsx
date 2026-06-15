import React from 'react';
import { Link } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { formatLmsSessionDate } from '@/lib/lmsUi';
import type { LearnerProgramState, LMSAssignment } from '@/lib/lms/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  BookOpen,
  CalendarOff,
  CheckCircle2,
  ClipboardList,
  Flame,
  FolderKanban,
  Lock,
  PlayCircle,
  TrendingUp,
  Video,
  type LucideIcon,
} from 'lucide-react';
import InvoiceDownloadCard from '@/components/lms/InvoiceDownloadCard';

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) => (
  <Card className="border-border/70 shadow-sm">
    <CardContent className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold tracking-tight text-foreground">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/30 px-6 py-10 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
      <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
    </div>
    <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
    <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
  </div>
);

function getAchievementBadges(
  learnerState: LearnerProgramState | null,
  overview: { completedModules?: number; progress?: number } | null,
  assignments: LMSAssignment[],
) {
  if (!learnerState) return [];

  const hasModuleProgress = (overview?.completedModules ?? 0) > 0 || (overview?.progress ?? 0) > 5;
  const hasSubmission = assignments.some((a) => a.status !== 'pending');
  const hasReviewed = assignments.some((a) => a.status === 'reviewed' || a.status === 'approved');
  const certReady = !learnerState.certificateLocked;

  return [
    { id: 'b1', title: 'Module progress started', unlocked: hasModuleProgress },
    { id: 'b2', title: 'Phase project submitted', unlocked: hasSubmission },
    { id: 'b3', title: 'Capstone track ready', unlocked: certReady },
    { id: 'b4', title: 'Mentor reviewed work', unlocked: hasReviewed },
  ];
}

const LMSDashboard = () => {
  const { user, learnerState, assignments, projects, sessions, enrollments, overview } = useLearnerProgram();

  if (!learnerState) return null;

  const badges = getAchievementBadges(learnerState, overview, assignments);

  const upcomingSession = sessions.find((s) => s.isUpcoming);
  const pendingAssignment = assignments.find((a) => a.status === 'pending');
  const activeProject = projects.find(
    (p) => p.status === 'in_progress' || (p.status === 'not_started' && pendingAssignment?.id === p.id),
  ) ?? projects.find((p) => p.status === 'in_progress' || p.status === 'not_started');

  const resumePath = learnerState.currentModule
    ? `/dashboard/curriculum/${learnerState.currentModule.id}`
    : '/dashboard/curriculum';

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Card className="border-border/70 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Welcome back</p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Hi, {user?.firstName}
              </h2>
              <p className="max-w-lg text-sm text-muted-foreground">{learnerState.programTitle}</p>
              <div className="flex flex-wrap items-center gap-2">
                {learnerState.streak > 0 ? (
                <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 font-medium text-emerald-700">
                  <Flame className="h-3 w-3" aria-hidden />
                  {learnerState.streak} day streak
                </Badge>
                ) : null}
                {learnerState.currentModule ? (
                  <Badge variant="outline" className="font-medium">
                    Module {learnerState.currentModule.id}
                  </Badge>
                ) : null}
              </div>
            </div>
            <div className="w-full sm:w-56">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">Overall progress</span>
                <span className="font-semibold text-foreground">{learnerState.progress}%</span>
              </div>
              <Progress value={learnerState.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="My Program" value={learnerState.programCode} icon={BookOpen} />
        <StatCard label="Completion" value={`${learnerState.progress}%`} icon={TrendingUp} />
        <StatCard
          label="Assignments"
          value={`${learnerState.pendingAssignments} pending`}
          icon={ClipboardList}
        />
        <StatCard
          label="Projects"
          value={`${learnerState.submittedProjects} submitted`}
          icon={FolderKanban}
        />
        <StatCard
          label="Certificate"
          value={learnerState.certificateLocked ? 'Locked' : 'Ready'}
          icon={learnerState.certificateLocked ? Lock : Award}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Module {learnerState.currentModule?.id}
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {learnerState.currentModuleTitle}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground">Last watched</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                <Video className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {learnerState.lastWatchedLesson}
              </p>
            </div>
            <Button asChild className="w-full cursor-pointer">
              <Link to={resumePath}>Resume Learning</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Upcoming Live Session</CardTitle>
            <CardDescription>Your next scheduled mentor session</CardDescription>
          </CardHeader>
          <CardContent>
            {!upcomingSession ? (
              <EmptyState
                icon={CalendarOff}
                title="No session scheduled"
                description="Check the Live Sessions page for your full schedule."
              />
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-foreground">{upcomingSession.title}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
                    <p className="text-xs font-medium text-muted-foreground">Date</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {formatLmsSessionDate(upcomingSession.sessionDate)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
                    <p className="text-xs font-medium text-muted-foreground">Time</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {upcomingSession.sessionTime}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mentor:{' '}
                  <span className="font-medium text-foreground">{upcomingSession.mentorName}</span>
                </p>
                {upcomingSession.meetLink ? (
                  <Button asChild variant="outline" className="w-full cursor-pointer">
                    <a href={upcomingSession.meetLink} target="_blank" rel="noopener noreferrer">
                      Join Session
                    </a>
                  </Button>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {(pendingAssignment || activeProject) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {pendingAssignment ? (
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Current Assignment</CardTitle>
                <CardDescription>Pending submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold text-foreground">{pendingAssignment.title}</p>
                <p className="text-sm text-muted-foreground">{pendingAssignment.description}</p>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <Badge variant="outline" className="border-amber-200 bg-amber-50 font-medium text-amber-700">
                    Pending
                  </Badge>
                  <Button asChild size="sm" variant="outline" className="cursor-pointer">
                    <Link to="/dashboard/assignments">View Assignment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activeProject ? (
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Project Tracker</CardTitle>
                <CardDescription>Active hands-on project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold text-foreground">{activeProject.title}</p>
                <p className="text-sm text-muted-foreground">{activeProject.description}</p>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <Badge variant="outline" className="border-blue-200 bg-blue-50 font-medium text-blue-700">
                    In progress
                  </Badge>
                  <Button asChild size="sm" variant="outline" className="cursor-pointer">
                    <Link to="/dashboard/projects">View Project</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Achievement Badges</CardTitle>
          <CardDescription>Milestones unlocked as you progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-lg border p-4 text-center transition-colors duration-200 ${
                  badge.unlocked
                    ? 'border-primary/20 bg-primary/5'
                    : 'border-border/60 bg-muted/30 opacity-70'
                }`}
              >
                <div
                  className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                    badge.unlocked ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {badge.unlocked ? (
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                  ) : (
                    <Lock className="h-4 w-4" aria-hidden />
                  )}
                </div>
                <p className="text-xs font-medium leading-tight text-foreground">{badge.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <InvoiceDownloadCard enrollments={enrollments} />
    </div>
  );
};

export default LMSDashboard;
