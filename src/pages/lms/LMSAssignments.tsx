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
import { Github, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LMSAssignments = () => {
  const { assignments } = useLearnerProgram();
  const [githubLink, setGithubLink] = useState('');

  const handleSubmit = (title: string) => {
    toast({
      title: 'Submission received',
      description: `"${title}" has been submitted for mentor review.`,
    });
  };

  return (
    <LmsPageShell
      meta={
        <p className="text-sm text-muted-foreground">
          One phase project per module block. Submit as PDF, ZIP, or GitHub link before the due date.
        </p>
      }
    >
      <div className="space-y-4">
        {assignments.map((assignment, index) => {
          const isPending = assignment.status === 'pending';

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
                        <Label htmlFor="file">Upload file (PDF / ZIP)</Label>
                        <Input id="file" type="file" accept=".pdf,.zip" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub link</Label>
                        <div className="flex gap-2">
                          <Github className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <Input
                            id="github"
                            placeholder="https://github.com/username/repo"
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => handleSubmit(assignment.title)}>
                        Submit for review
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
    </LmsPageShell>
  );
};

export default LMSAssignments;
