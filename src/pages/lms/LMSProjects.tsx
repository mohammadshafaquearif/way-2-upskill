import { useState } from 'react';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { LmsPageShell } from '@/components/lms/LmsPageShell';
import { PhaseProjectPanel } from '@/components/lms/PhaseProjectPanel';
import { SubmittedNote } from '@/components/lms/PhaseProjectPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ExternalLink, Github, Loader2, MessageSquare, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LMSProjects = () => {
  const { projects, submitAssignment, lmsLoading } = useLearnerProgram();
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const handleSubmit = async (projectId: string, title: string) => {
    if (!githubUrl.trim()) {
      toast({
        title: 'GitHub link required',
        description: 'Share your repository link for mentor review.',
        variant: 'destructive',
      });
      return;
    }

    setSubmittingId(projectId);
    try {
      await submitAssignment(projectId, {
        githubUrl: githubUrl.trim(),
        demoUrl: demoUrl.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      setGithubUrl('');
      setDemoUrl('');
      setNotes('');
      toast({
        title: 'Project submitted',
        description: `"${title}" is now under mentor review.`,
      });
    } catch (err) {
      toast({
        title: 'Submission failed',
        description: err instanceof Error ? err.message : 'Try again later',
        variant: 'destructive',
      });
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <LmsPageShell
      meta={
        <p className="text-sm text-muted-foreground">
          Build portfolio-ready work across each phase. Submit GitHub and demo links for mentor review.
        </p>
      }
    >
      {lmsLoading && projects.length === 0 ? (
        <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading projects…
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => {
            const canSubmit =
              project.status === 'in_progress' ||
              project.status === 'not_started' ||
              project.status === 'submitted';
            const isPendingSubmit = project.status !== 'reviewed';
            const isSubmitting = submittingId === project.id;

            return (
              <div key={project.id} className="space-y-3">
                <PhaseProjectPanel item={project} index={index} />

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {project.feedback && project.feedback.length > 0 && (
                  <div className="rounded-lg border border-border/80 bg-muted/30 px-4 py-3">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      Mentor feedback
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {project.feedback.map((note) => (
                        <li key={note}>— {note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {canSubmit && isPendingSubmit ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        {project.status === 'submitted' ? 'Update submission' : 'Submit project'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit — {project.title}</DialogTitle>
                        <DialogDescription>
                          Share GitHub and an optional demo link. Add short setup notes for faster review.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor={`gh-${project.id}`}>GitHub URL</Label>
                          <Input
                            id={`gh-${project.id}`}
                            placeholder="https://github.com/username/project"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`demo-${project.id}`}>Demo URL</Label>
                          <Input
                            id={`demo-${project.id}`}
                            placeholder="https://your-demo.vercel.app"
                            value={demoUrl}
                            onChange={(e) => setDemoUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`docs-${project.id}`}>Documentation notes</Label>
                          <Textarea
                            id={`docs-${project.id}`}
                            placeholder="Architecture, setup steps, trade-offs…"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                        <Button
                          className="w-full"
                          disabled={isSubmitting}
                          onClick={() => void handleSubmit(project.id, project.title)}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            'Submit for review'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : project.status === 'submitted' ? (
                  <SubmittedNote />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </LmsPageShell>
  );
};

export default LMSProjects;
