import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { useLmsCurriculum } from '@/hooks/useLmsCurriculum';
import { lmsDb } from '@/integrations/supabase/lmsDb';
import { getModuleById, getPhaseForModule } from '@/lib/lms/curriculum';
import type { DbProgramModule } from '@/lib/lms/dbTypes';
import { TopicAssets, isEmbeddableYouTube, resolveAssetUrl, youtubeEmbedSrc } from '@/components/lms/TopicAssets';
import type { DbLearningAsset } from '@/lib/lms/dbTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  HelpCircle,
  Loader2,
  MessageSquare,
  Upload,
} from 'lucide-react';
import { PhaseProjectCard } from '@/components/lms/PhaseProjectCard';
import { getDopProjectByModuleId } from '@/lib/lms/dopProjects';
import { useToast } from '@/hooks/use-toast';

const LMSModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user, programId, courseId, learnerState } = useLearnerProgram();
  const { phases, getDbModule } = useLmsCurriculum(courseId, programId);
  const { toast } = useToast();

  const modId = parseInt(moduleId ?? '0', 10);
  const module = phases.flatMap((p) => p.modules).find((m) => m.id === modId)
    ?? getModuleById(programId, modId);
  const phase = phases.find((p) => p.modules.some((m) => m.id === modId))
    ?? getPhaseForModule(programId, modId);
  const phaseProject = phase?.project ?? (programId === 'dop' ? getDopProjectByModuleId(modId) : undefined);

  const [dbModule, setDbModule] = useState<DbProgramModule | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(Boolean(courseId));
  const [previewAsset, setPreviewAsset] = useState<{
    asset: DbLearningAsset;
    url: string;
  } | null>(null);

  useEffect(() => {
    if (!courseId || !modId) {
      setDbModule(getDbModule(modId));
      setLoadingDetail(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoadingDetail(true);
      try {
        const detail = await lmsDb.getModuleDetail(courseId, modId);
        if (!cancelled) setDbModule(detail);
      } catch {
        if (!cancelled) setDbModule(getDbModule(modId));
      } finally {
        if (!cancelled) setLoadingDetail(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseId, modId, getDbModule]);

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
      <div className="mx-auto max-w-lg text-center">
        <p className="text-muted-foreground">Module not found.</p>
        <Button asChild variant="link" className="mt-2">
          <Link to="/dashboard/curriculum">Back to Curriculum</Link>
        </Button>
      </div>
    );
  }

  const quizId = module.quizId ?? dbModule?.quiz_id;
  const topics = dbModule?.topics ?? module.topics.map((title, i) => ({
    id: `static-${i}`,
    module_id: module.dbId ?? '',
    title,
    sort_order: i + 1,
    assets: [] as DbLearningAsset[],
    quiz_id: null as string | null,
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button asChild variant="ghost" size="sm" className="cursor-pointer">
        <Link to="/dashboard/curriculum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Curriculum
        </Link>
      </Button>

      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{phase?.phase}</Badge>
          <Badge variant="outline">Module {module.id}</Badge>
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">{module.title}</h1>
        <p className="mt-2 text-muted-foreground">{phase?.label}</p>
      </div>

      {loadingDetail ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading module content…
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Topics & Learning Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {topics.map((topic, index) => (
                <AccordionItem key={topic.id} value={`topic-${topic.id}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-medium">
                      {index + 1}. {topic.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <TopicAssets assets={topic.assets} onOpenAsset={handleOpenAsset} />
                    {topic.quiz_id && (
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-3">
                        <div>
                          <p className="text-sm font-medium">Topic Quiz</p>
                          <p className="text-xs text-muted-foreground">Test your understanding of this topic</p>
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/dashboard/curriculum/${module.id}/quiz/${topic.quiz_id}`}>
                            Start Quiz
                          </Link>
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {previewAsset && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">{previewAsset.asset.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setPreviewAsset(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg border">
              <iframe
                title={previewAsset.asset.title}
                src={youtubeEmbedSrc(previewAsset.url)}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      )}

      {module.hasQuiz && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Module Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Check your understanding</p>
              <p className="text-sm text-muted-foreground">
                Pass score: {dbModule?.pass_score ?? 70}% — required to complete this module
              </p>
            </div>
            {quizId ? (
              <Button asChild variant="outline" className="shrink-0">
                <Link to={`/dashboard/curriculum/${module.id}/quiz/${quizId}`}>Start Quiz</Link>
              </Button>
            ) : (
              <Button variant="outline" disabled className="shrink-0">
                Coming Soon
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {module.hasAssignment && phaseProject && (
        <PhaseProjectCard project={phaseProject} />
      )}

      {module.hasAssignment && !phaseProject && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Phase Project
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Submit your work</p>
              <p className="text-sm text-muted-foreground">Upload PDF, ZIP, or GitHub link</p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/dashboard/projects">Submit</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Discussion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Ask questions about this module. Your mentor and peers can help clarify concepts.
          </p>
          <Button variant="outline" disabled>
            Ask a Question
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSModuleDetail;
