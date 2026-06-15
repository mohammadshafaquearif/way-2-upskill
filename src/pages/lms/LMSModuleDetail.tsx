import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { useLmsCurriculum } from '@/hooks/useLmsCurriculum';
import { lmsDb } from '@/integrations/supabase/lmsDb';
import { getModuleById, getPhaseForModule } from '@/lib/lms/curriculum';
import type { DbProgramModule } from '@/lib/lms/dbTypes';
import { TopicAssets, isEmbeddableYouTube, resolveAssetUrl, youtubeEmbedSrc } from '@/components/lms/TopicAssets';
import type { DbLearningAsset } from '@/lib/lms/dbTypes';
import { PhaseProjectPanel } from '@/components/lms/PhaseProjectPanel';
import { getDopProjectByModuleId } from '@/lib/lms/dopProjects';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  findResumableDraft,
  getQuizDraftSecondsLeft,
} from '@/lib/lms/quizSessionStorage';
import {
  computeQuizTimeLimitMinutes,
  findTopicQuiz,
  formatQuizCountdown,
  formatTopicQuizSummary,
} from '@/lib/lms/quizCatalog';
import { getProgramMeta } from '@/lib/lms/utils';

const LMSModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user, programId, courseId, learnerState } = useLearnerProgram();
  const { phases } = useLmsCurriculum(courseId, programId);
  const { toast } = useToast();

  const modId = parseInt(moduleId ?? '0', 10);
  const module = phases.flatMap((p) => p.modules).find((m) => m.id === modId)
    ?? getModuleById(programId, modId);
  const phase = phases.find((p) => p.modules.some((m) => m.id === modId))
    ?? getPhaseForModule(programId, modId);
  const phaseProject = phase?.project ?? (programId === 'dop' ? getDopProjectByModuleId(modId) : undefined);

  const programCode = getProgramMeta(programId).code;

  const getTopicQuizMeta = (topicSort: number) => {
    const def = findTopicQuiz(programCode, modId, topicSort);
    if (!def) return '70% to pass';
    return formatTopicQuizSummary(def.questions.length, def.passScore ?? 70);
  };

  const staticTopics = useMemo(
    () =>
      module?.topics.map((title, i) => ({
        id: `static-${i}`,
        module_id: module.dbId ?? '',
        title,
        sort_order: i + 1,
        assets: [] as DbLearningAsset[],
        quiz_id: null as string | null,
      })) ?? [],
    [module],
  );

  const [dbModule, setDbModule] = useState<DbProgramModule | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<{
    asset: DbLearningAsset;
    url: string;
  } | null>(null);
  const fetchKeyRef = useRef<string | null>(null);
  const hasDetailRef = useRef(false);

  useEffect(() => {
    const fetchKey = `${courseId ?? 'static'}:${modId}`;

    if (!courseId || !modId) {
      setDbModule(null);
      setSyncing(false);
      fetchKeyRef.current = fetchKey;
      hasDetailRef.current = false;
      return;
    }

    if (fetchKeyRef.current === fetchKey && hasDetailRef.current) {
      return;
    }

    let cancelled = false;
    setSyncing(true);

    (async () => {
      try {
        const detail = await lmsDb.getModuleDetail(courseId, modId);
        if (!cancelled) {
          setDbModule(detail);
          fetchKeyRef.current = fetchKey;
          hasDetailRef.current = true;
        }
      } catch {
        if (!cancelled) setDbModule(null);
      } finally {
        if (!cancelled) setSyncing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseId, modId]);

  const topics = dbModule?.topics ?? staticTopics;

  const handleOpenAsset = async (asset: DbLearningAsset) => {
    try {
      const url = await resolveAssetUrl(asset, (path) => lmsDb.getSignedAssetUrl(path));
      if (!url) {
        toast({
          title: 'Content not uploaded yet',
          description: 'Your mentor will publish this resource before the live session.',
        });
        return;
      }

      if (isEmbeddableYouTube(asset)) {
        setPreviewAsset({ asset, url });
        return;
      }

      if (user) await lmsDb.markAssetComplete(user.id, asset.id).catch(() => undefined);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      toast({ title: 'Could not open resource', variant: 'destructive' });
    }
  };

  if (!module || !learnerState) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center text-sm text-muted-foreground">
        Module not found.
        <div className="mt-3">
          <Button asChild variant="link" size="sm">
            <Link to="/dashboard/curriculum">Back to curriculum</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <div className="space-y-4 border-b border-border/60 pb-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2 h-8 px-2 text-muted-foreground">
          <Link to="/dashboard/curriculum">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Curriculum
          </Link>
        </Button>

        <div>
          <p className="text-xs text-muted-foreground">
            {phase?.phase} · Module {module.id}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{module.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{phase?.label}</p>
        </div>

        {syncing && (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Syncing materials…
          </p>
        )}
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          Topics
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {topics.map((topic, index) => {
            const resumableDraft =
              user && topic.quiz_id ? findResumableDraft(user.id, topic.quiz_id) : null;

            return (
            <AccordionItem
              key={topic.id}
              value={`topic-${topic.id}`}
              className="overflow-hidden rounded-xl border border-border/80 px-4"
            >
              <AccordionTrigger className="py-4 text-left hover:no-underline">
                <span className="font-medium">
                  <span className="mr-2 text-muted-foreground">{index + 1}.</span>
                  {topic.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <TopicAssets assets={topic.assets} onOpenAsset={handleOpenAsset} />

                {topic.quiz_id ? (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-muted/40 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">Topic quiz</p>
                      <p className="text-xs text-muted-foreground">
                        {getTopicQuizMeta(topic.sort_order ?? index + 1)}
                        {resumableDraft
                          ? ` · ${formatQuizCountdown(getQuizDraftSecondsLeft(resumableDraft))} left`
                          : ''}
                      </p>
                    </div>
                    <Button asChild size="sm">
                      <Link
                        to={
                          resumableDraft
                            ? `/dashboard/curriculum/${module.id}/quiz/${topic.quiz_id}?resume=1`
                            : `/dashboard/curriculum/${module.id}/quiz/${topic.quiz_id}`
                        }
                      >
                        {resumableDraft ? 'Resume' : 'Start'}
                      </Link>
                    </Button>
                  </div>
                ) : courseId && syncing ? (
                  <p className="mt-3 animate-pulse text-xs text-muted-foreground">Quiz loading…</p>
                ) : null}
              </AccordionContent>
            </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {previewAsset && (
        <section className="overflow-hidden rounded-xl border border-border/80">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <p className="text-sm font-medium">{previewAsset.asset.title}</p>
            <Button variant="ghost" size="sm" onClick={() => setPreviewAsset(null)}>
              Close
            </Button>
          </div>
          <div className="aspect-video">
            <iframe
              title={previewAsset.asset.title}
              src={youtubeEmbedSrc(previewAsset.url)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {module.hasAssignment && phaseProject && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium">Phase project</h2>
          <PhaseProjectPanel item={phaseProject} index={module.id - 1} />
        </section>
      )}
    </div>
  );
};

export default LMSModuleDetail;
