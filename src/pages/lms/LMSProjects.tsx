import React, { useState } from 'react';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import type { ProjectStatus } from '@/lib/lms/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ExternalLink, Github, MessageSquare, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const statusStyles: Record<ProjectStatus, { label: string; className: string }> = {
  not_started: { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
  submitted: { label: 'Submitted', className: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' },
  reviewed: { label: 'Reviewed', className: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
};

const LMSProjects = () => {
  const { projects, learnerState } = useLearnerProgram();
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const handleSubmit = (title: string) => {
    toast({
      title: 'Project submitted',
      description: `"${title}" is now under mentor review.`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Project Tracker</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {learnerState?.programCode} — Build portfolio-ready projects with mentor feedback.
        </p>
      </div>

      <div className="grid gap-5">
        {projects.map((project, index) => {
          const style = statusStyles[project.status];
          const canSubmit = project.status === 'in_progress' || project.status === 'not_started';

          return (
            <Card key={project.id} className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Project {index + 1}
                    </p>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                  </div>
                  <Badge className={style.className}>{style.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {project.feedback && project.feedback.length > 0 && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Mentor Feedback
                    </p>
                    <ul className="space-y-1">
                      {project.feedback.map((note) => (
                        <li key={note} className="text-sm text-muted-foreground">
                          — {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {canSubmit && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={project.status === 'in_progress' ? 'default' : 'outline'} className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit — {project.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="gh">GitHub URL</Label>
                          <Input
                            id="gh"
                            placeholder="https://github.com/username/project"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="demo">Demo URL</Label>
                          <Input
                            id="demo"
                            placeholder="https://your-demo.vercel.app"
                            value={demoUrl}
                            onChange={(e) => setDemoUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="docs">Documentation Notes</Label>
                          <Textarea id="docs" placeholder="Brief description of architecture and setup..." rows={3} />
                        </div>
                        <Button
                          className="w-full cursor-pointer"
                          onClick={() => handleSubmit(project.title)}
                        >
                          Submit for Review
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LMSProjects;
