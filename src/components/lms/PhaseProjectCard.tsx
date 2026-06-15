import type { LMSPhaseProject } from '@/lib/lms/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';

interface PhaseProjectCardProps {
  project: LMSPhaseProject;
  showSubmitLink?: boolean;
}

export function PhaseProjectCard({ project, showSubmitLink = true }: PhaseProjectCardProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {project.isCapstone ? 'Capstone Project' : `${project.label} — after this phase`}
            </p>
            <CardTitle className="mt-1 flex items-center gap-2 text-lg">
              <FolderKanban className="h-5 w-5 shrink-0 text-primary" />
              {project.title}
            </CardTitle>
          </div>
          {project.isCapstone && (
            <Badge className="bg-primary text-primary-foreground">Capstone</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Deliverables
          </p>
          <ul className="space-y-1.5">
            {project.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {showSubmitLink && (
          <Button asChild variant="outline" size="sm" className="cursor-pointer">
            <Link to="/dashboard/projects">View in Project Tracker</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
