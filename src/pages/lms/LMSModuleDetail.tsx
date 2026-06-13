import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { getModuleById, getPhaseForModule } from '@/lib/lms/curriculum';
import { getLearnPath } from '@/lib/lms/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  FileText,
  FlaskConical,
  HelpCircle,
  MessageSquare,
  PlayCircle,
  Upload,
} from 'lucide-react';

const LMSModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { programId, learnerState } = useLearnerProgram();

  const modId = parseInt(moduleId ?? '0', 10);
  const module = getModuleById(programId, modId);
  const phase = getPhaseForModule(programId, modId);
  const learnPath = getLearnPath(programId);

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

  const materials = [
    { icon: PlayCircle, label: 'Video Lessons', desc: `${module.lessonCount} guided video sessions` },
    { icon: FileText, label: 'Notes & Slides', desc: 'Downloadable module notes and slide decks' },
    { icon: FlaskConical, label: 'Hands-on Labs', desc: 'Interactive sandbox exercises' },
    { icon: FileText, label: 'Resources', desc: 'Cheat sheets and reference guides' },
  ];

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

      {/* Learning Material */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Material</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {materials.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors duration-200 hover:border-primary/30 hover:bg-muted/40"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Module Quiz */}
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
              <p className="font-medium">10 Questions</p>
              <p className="text-sm text-muted-foreground">Test your understanding of {module.title}</p>
            </div>
            <Button variant="outline" className="cursor-pointer shrink-0" disabled>
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Assignment */}
      {module.hasAssignment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Submit your work</p>
              <p className="text-sm text-muted-foreground">Upload PDF, ZIP, or GitHub link</p>
            </div>
            <Button asChild variant="outline" className="cursor-pointer shrink-0">
              <Link to="/dashboard/assignments">Submit</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Discussion */}
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
          <Button variant="outline" className="cursor-pointer" disabled>
            Ask a Question
          </Button>
        </CardContent>
      </Card>

      <Button asChild size="lg" className="w-full cursor-pointer">
        <Link to={learnPath}>Start Learning — Module {module.id}</Link>
      </Button>
    </div>
  );
};

export default LMSModuleDetail;
