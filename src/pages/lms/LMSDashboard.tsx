import React from 'react';
import { Link } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { ACHIEVEMENT_BADGES } from '@/lib/lms/content';
import { getLearnPath } from '@/lib/lms/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Flame,
  FolderKanban,
  Lock,
  PlayCircle,
  TrendingUp,
  Video,
} from 'lucide-react';
import InvoiceDownloadCard from '@/components/lms/InvoiceDownloadCard';

const StatCard = ({
  label,
  value,
  icon: Icon,
  iconClass,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  iconClass: string;
}) => (
  <Card className="transition-shadow duration-200 hover:shadow-md">
    <CardContent className="flex items-center gap-4 p-5">
      <div className={`rounded-xl p-2.5 ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const LMSDashboard = () => {
  const { user, learnerState, assignments, projects, sessions, programId, enrollments } = useLearnerProgram();

  if (!learnerState) return null;

  const upcomingSession = sessions.find((s) => s.isUpcoming);
  const pendingAssignment = assignments.find((a) => a.status === 'pending');
  const activeProject = projects.find((p) => p.status === 'in_progress');
  const learnPath = getLearnPath(programId);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome */}
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-primary">Welcome back</p>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Hi {user?.firstName}
              </h1>
              <p className="max-w-lg text-sm text-muted-foreground sm:text-base">
                {learnerState.programTitle}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  {learnerState.streak} Day Streak
                </Badge>
                {learnerState.currentModule && (
                  <Badge variant="outline">
                    Current: Module {learnerState.currentModule.id}
                  </Badge>
                )}
              </div>
            </div>
            <div className="w-full sm:w-64">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="font-bold text-primary">{learnerState.progress}%</span>
              </div>
              <Progress value={learnerState.progress} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="My Program" value={learnerState.programCode} icon={BookOpen} iconClass="bg-primary/10 text-primary" />
        <StatCard label="Completion" value={`${learnerState.progress}%`} icon={TrendingUp} iconClass="bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400" />
        <StatCard label="Assignments" value={`${learnerState.pendingAssignments} Pending`} icon={ClipboardList} iconClass="bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400" />
        <StatCard label="Projects" value={`${learnerState.submittedProjects} Submitted`} icon={FolderKanban} iconClass="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" />
        <StatCard
          label="Certificate"
          value={learnerState.certificateLocked ? 'Locked' : 'Ready'}
          icon={learnerState.certificateLocked ? Lock : Award}
          iconClass={learnerState.certificateLocked ? 'bg-muted text-muted-foreground' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Continue Learning */}
        <Card className="border-primary/30 transition-shadow duration-200 hover:shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <PlayCircle className="h-5 w-5 text-primary" />
              Continue Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Module {learnerState.currentModule?.id}
              </p>
              <p className="text-xl font-bold">{learnerState.currentModuleTitle}</p>
            </div>
            <div className="rounded-lg bg-muted/60 p-3">
              <p className="text-xs font-medium text-muted-foreground">Last watched</p>
              <p className="flex items-center gap-2 text-sm font-medium">
                <Video className="h-4 w-4 text-primary" />
                {learnerState.lastWatchedLesson}
              </p>
            </div>
            <Button asChild className="w-full cursor-pointer">
              <Link to={learnPath}>Resume Learning</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Session */}
        {upcomingSession && (
          <Card className="transition-shadow duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Live Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-bold">{upcomingSession.title}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted/60 p-3">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold">{new Date(upcomingSession.sessionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="rounded-lg bg-muted/60 p-3">
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-semibold">{upcomingSession.sessionTime}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Mentor: <span className="font-medium text-foreground">{upcomingSession.mentorName}</span>
              </p>
              {upcomingSession.meetLink && (
                <Button asChild variant="outline" className="w-full cursor-pointer">
                  <a href={upcomingSession.meetLink} target="_blank" rel="noopener noreferrer">
                    Join Session
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Assignment */}
        {pendingAssignment && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Current Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold">{pendingAssignment.title}</p>
              <p className="text-sm text-muted-foreground">{pendingAssignment.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Pending</Badge>
                <Button asChild size="sm" variant="outline" className="cursor-pointer">
                  <Link to="/dashboard/assignments">View Assignment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Tracker */}
        {activeProject && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Project Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold">{activeProject.title}</p>
              <p className="text-sm text-muted-foreground">{activeProject.description}</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">In Progress</Badge>
                <Button asChild size="sm" variant="outline" className="cursor-pointer">
                  <Link to="/dashboard/projects">View Project</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Achievement Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ACHIEVEMENT_BADGES.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 text-center transition-colors duration-200 ${
                  badge.unlocked ? 'border-primary/20 bg-primary/5' : 'border-muted bg-muted/30 opacity-60'
                }`}
              >
                <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${badge.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                  {badge.unlocked ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs font-semibold leading-tight">{badge.title}</p>
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
