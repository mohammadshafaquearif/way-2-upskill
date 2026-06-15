import React, { useState } from 'react';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import type { AssignmentStatus } from '@/lib/lms/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Calendar, CheckCircle2, Clock, Github, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const statusStyles: Record<AssignmentStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
  submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
  reviewed: { label: 'Reviewed', className: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' },
};

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
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Phase Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          One portfolio project after each phase — submit as PDF, ZIP, or GitHub link for mentor review.
        </p>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => {
          const style = statusStyles[assignment.status];
          const isPending = assignment.status === 'pending';

          return (
            <Card key={assignment.id} className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <Badge className={style.className}>{style.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>

                {assignment.deliverables && assignment.deliverables.length > 0 && (
                  <ul className="space-y-1.5">
                    {assignment.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {assignment.skills && assignment.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {assignment.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {assignment.moduleId && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Module {assignment.moduleId}
                    </span>
                  )}
                </div>

                {isPending ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit — {assignment.title}</DialogTitle>
                        <DialogDescription>
                          Upload a PDF/ZIP or share a GitHub link. Your submission will be reviewed by the mentor.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="file">Upload File (PDF / ZIP)</Label>
                          <Input id="file" type="file" accept=".pdf,.zip" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub Link</Label>
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
                        <Button
                          className="w-full cursor-pointer"
                          onClick={() => handleSubmit(assignment.title)}
                        >
                          Submit for Review
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Submitted — awaiting mentor review
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LMSAssignments;
