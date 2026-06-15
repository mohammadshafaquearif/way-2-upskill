import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/integrations/api/client';
import { getCourseByCheckoutId } from '@/lib/courses';
import { enrollmentGrantsAccess } from '@/lib/enrollmentAccess';
import { hasVerifiedGuestAccess } from '@/lib/enrollmentWorkflow';
import {
  getSimulatorModules,
  getTotalLessons,
  getSimulatorUserKey,
  loadSimulatorProgress,
  saveSimulatorProgress,
  type SimulatorLesson,
  type SimulatorModule,
} from '@/lib/learningSimulator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  PlayCircle,
  Sparkles,
  Terminal,
} from 'lucide-react';

const LearningSimulator: React.FC = () => {
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const simulatorUserKey = getSimulatorUserKey(user?.id);
  const guestVerified = hasVerifiedGuestAccess(courseId);
  const [enrollmentVerified, setEnrollmentVerified] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

  const course = getCourseByCheckoutId(courseId);
  const modules = useMemo(() => getSimulatorModules(courseId), [courseId]);
  const totalLessons = useMemo(() => getTotalLessons(modules), [modules]);

  const hasAccess = enrollmentVerified || guestVerified;

  const [activeModule, setActiveModule] = useState<SimulatorModule>(modules[0]);
  const [activeLesson, setActiveLesson] = useState<SimulatorLesson>(modules[0].lessons[0]);
  const [labInput, setLabInput] = useState(modules[0].lessons[0].starterCode ?? '');
  const [labOutput, setLabOutput] = useState('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (!course) {
      navigate('/courses');
      return;
    }

    let cancelled = false;

    const verifyAccess = async () => {
      if (guestVerified) {
        if (!cancelled) {
          setEnrollmentVerified(true);
          setAccessChecked(true);
        }
        return;
      }

      if (!isAuthenticated || !user) {
        if (!cancelled) setAccessChecked(true);
        return;
      }

      try {
        const { courses } = await apiClient.getUserCourses(user.id);
        const programCode = course.code.toUpperCase();
        const paid = (courses ?? []).some(
          (row: { status: string; payment_status?: string | null; course_code?: string | null }) =>
            enrollmentGrantsAccess(row.status, row.payment_status) &&
            (row.course_code?.toUpperCase() === programCode ||
              row.course_code?.toLowerCase() === courseId),
        );
        if (!cancelled) {
          setEnrollmentVerified(paid);
          setAccessChecked(true);
        }
      } catch {
        if (!cancelled) {
          setEnrollmentVerified(false);
          setAccessChecked(true);
        }
      }
    };

    verifyAccess();

    return () => {
      cancelled = true;
    };
  }, [course, courseId, guestVerified, isAuthenticated, user, navigate]);

  useEffect(() => {
    if (!accessChecked || !course) return;

    if (!hasAccess) {
      toast({
        title: 'Complete checkout first',
        description: 'Pay for a program to unlock the learning simulator, or sign in if you already enrolled.',
        variant: 'destructive',
      });
      navigate(`/checkout/${courseId}`);
    }
  }, [accessChecked, hasAccess, course, courseId, navigate]);

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      toast({
        title: 'Payment successful',
        description: 'Your program is unlocked. Start your first lab below.',
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!hasAccess) return;
    const saved = loadSimulatorProgress(simulatorUserKey, courseId);
    setCompletedLessons(saved.completedLessons);

    if (saved.lastLessonId) {
      for (const module of modules) {
        const lesson = module.lessons.find((item) => item.id === saved.lastLessonId);
        if (lesson) {
          setActiveModule(module);
          setActiveLesson(lesson);
          setLabInput(lesson.starterCode ?? '');
          break;
        }
      }
    }
  }, [hasAccess, simulatorUserKey, courseId, modules]);

  useEffect(() => {
    if (!hasAccess) return;
    saveSimulatorProgress(simulatorUserKey, courseId, {
      completedLessons,
      lastLessonId: activeLesson.id,
    });
  }, [completedLessons, activeLesson.id, hasAccess, simulatorUserKey, courseId]);

  if (!course || !accessChecked || !hasAccess) return null;

  const displayName = user?.firstName || 'Learner';

  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  const selectLesson = (module: SimulatorModule, lesson: SimulatorLesson) => {
    setActiveModule(module);
    setActiveLesson(lesson);
    setLabInput(lesson.starterCode ?? '');
    setLabOutput('');
  };

  const markComplete = () => {
    if (completedLessons.includes(activeLesson.id)) return;
    setCompletedLessons((prev) => [...prev, activeLesson.id]);
    toast({ title: 'Lesson completed', description: activeLesson.title });
  };

  const runLab = () => {
    const expected = activeLesson.expectedOutput ?? '';
    const matched = expected ? labInput.includes(expected.split('\n')[0]) : labInput.trim().length > 0;
    setLabOutput(
      matched
        ? `✓ Simulator executed successfully\n> ${expected || 'Command completed'}`
        : '✗ Output mismatch. Review the starter commands and try again.',
    );
    if (matched) markComplete();
  };

  const lessonIcon = (type: SimulatorLesson['type']) => {
    if (type === 'lab') return <Terminal className="w-4 h-4" />;
    if (type === 'quiz') return <FlaskConical className="w-4 h-4" />;
    return <PlayCircle className="w-4 h-4" />;
  };

  return (
    <PageShell>
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <Button variant="outline" size="sm" className="mb-4" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/courses')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isAuthenticated ? 'Back to Dashboard' : 'Back to Programs'}
              </Button>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <Badge variant="secondary">Learning Simulator</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Welcome, {displayName}! Hands-on labs, guided modules, and progress tracking — unlocked after payment.
              </p>
            </div>

            <Card className="w-full lg:w-80">
              <CardContent className="p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall progress</span>
                  <span className="font-semibold">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedLessons.length}/{totalLessons} lessons completed
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id}>
                    <p className="text-sm font-semibold mb-2">{module.title}</p>
                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLesson.id;
                        const isDone = completedLessons.includes(lesson.id);
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => selectLesson(module, lesson)}
                            className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex items-center gap-2">
                                {lessonIcon(lesson.type)}
                                {lesson.title}
                              </span>
                              {isDone && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                            </div>
                            <p className={`text-xs mt-1 ${isActive ? 'opacity-90' : 'text-muted-foreground'}`}>
                              {lesson.duration} · {lesson.type}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{activeModule.title}</p>
                    <CardTitle className="text-2xl mt-1">{activeLesson.title}</CardTitle>
                  </div>
                  <Badge>{activeLesson.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{activeLesson.content}</p>

                {activeLesson.type === 'lab' && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Sandbox terminal</label>
                    <Textarea
                      value={labInput}
                      onChange={(event) => setLabInput(event.target.value)}
                      className="font-mono min-h-[160px]"
                    />
                    <div className="flex gap-2">
                      <Button onClick={runLab}>Run in Simulator</Button>
                      <Button variant="outline" onClick={() => setLabInput(activeLesson.starterCode ?? '')}>
                        Reset
                      </Button>
                    </div>
                    {labOutput && (
                      <pre className="rounded-lg bg-slate-950 text-green-400 p-4 text-sm overflow-x-auto">
                        {labOutput}
                      </pre>
                    )}
                  </div>
                )}

                {activeLesson.type === 'video' && (
                  <div className="rounded-xl border bg-muted/40 p-8 text-center">
                    <PlayCircle className="w-12 h-12 mx-auto text-primary mb-3" />
                    <p className="font-medium">Guided walkthrough placeholder</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Replace with embedded video or live session link in production.
                    </p>
                  </div>
                )}

                {activeLesson.type === 'quiz' && (
                  <div className="rounded-xl border p-6 space-y-3">
                    <p className="font-medium">Checkpoint: Can you explain rollback before deploy?</p>
                    <Button onClick={markComplete}>Mark checkpoint complete</Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  {activeLesson.type !== 'lab' && (
                    <Button onClick={markComplete}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as complete
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link to="/dashboard">View dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
};

export default LearningSimulator;
