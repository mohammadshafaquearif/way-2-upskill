import React from 'react';
import { Link } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { PROGRAM_RESOURCES } from '@/lib/lms/content';
import { POPULAR_RESOURCES } from '@/lib/resourcesContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Download, ExternalLink, FileText } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  guide: BookOpen,
  cheatsheet: FileText,
  link: ExternalLink,
};

const LMSResources = () => {
  const { programId, learnerState } = useLearnerProgram();
  const resources = PROGRAM_RESOURCES[programId];
  const popular = POPULAR_RESOURCES[programId as keyof typeof POPULAR_RESOURCES] ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Program-specific guides and cheat sheets for {learnerState?.programCode}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{learnerState?.programCode} Program Resources</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {resources.map((resource) => {
            const Icon = typeIcons[resource.type] ?? FileText;
            return (
              <div
                key={resource.id}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-4 transition-colors duration-200 hover:border-primary/30 hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{resource.title}</p>
                    <Badge variant="secondary" className="mt-1 text-[10px] capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="cursor-pointer shrink-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {popular.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Articles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {popular.map((article) => (
              <Link
                key={article.slug}
                to={`/resources/${article.slug}`}
                className="flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors duration-200 hover:border-primary/30 hover:bg-muted/40"
              >
                <span className="text-sm font-medium">{article.title}</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LMSResources;
