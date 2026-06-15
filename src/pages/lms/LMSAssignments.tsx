import { useState } from 'react';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { LmsPageShell } from '@/components/lms/LmsPageShell';
import { PhaseProjectPanel, SubmittedNote } from '@/components/lms/PhaseProjectPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Github, Loader2, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LMSAssignments = () => {
  const { assignments, submitAssignment, lmsLoading } = useLearnerProgram();
  const [githubLink, setGithubLink] = useState('');
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const handleSubmit = async (assignmentId: string, title: string) => {
    if (!githubLink.trim()) {
      toast({
        title: 'GitHub link required',
        description: 'Share a repository link for mentor review.',
        variant: 'destructive',
      });
      return;
    }

    setSubmittingId(assignmentId);
    try {
      await submitAssignment(assignmentId, { githubUrl: githubLink.trim() });
      setGithubLink('');
      toast({
        title: 'Submission received',
        description: `"${title}" has been submitted for mentor review.`,
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
          One phase project per module block. Submit as PDF, ZIP, or GitHub link before the due date.
        </p>
      }
    >
      {lmsLoading && assignments.length === 0 ? (
        <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading assignments…
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment, index) => {
            const isPending = assignment.status === 'pending';
            const isSubmitting = submittingId === assignment.id;

            return (
              <div key={assignment.id} className="space-y-3">
                <PhaseProjectPanel item={assignment} index={index} />

                {isPending ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit — {assignment.title}</DialogTitle>
                        <DialogDescription>
                          Upload a PDF or ZIP, or share a GitHub repository link for mentor review.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor={`file-${assignment.id}`}>Upload file (PDF / ZIP)</Label>
                          <Input id={`file-${assignment.id}`} type="file" accept=".pdf,.zip" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`github-${assignment.id}`}>GitHub link</Label>
                          <div className="flex gap-2">
                            <Github className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <Input
                              id={`github-${assignment.id}`}
                              placeholder="https://github.com/username/repo"
                              value={githubLink}
                              onChange={(e) => setGithubLink(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          disabled={isSubmitting}
                          onClick={() => void handleSubmit(assignment.id, assignment.title)}
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
                ) : (
                  <SubmittedNote />
                )}
              </div>
            );
          })}
        </div>
      )}
    </LmsPageShell>
  );
};

export default LMSAssignments;
