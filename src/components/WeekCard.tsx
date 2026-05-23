
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface WeekCardProps {
  week: number;
  title: string;
  objective: string;
  coreConcepts: string[];
  deliverables: string[];
  salesHook: string;
  projectImage?: string;
}

const WeekCard: React.FC<WeekCardProps> = ({
  week,
  title,
  objective,
  coreConcepts,
  deliverables,
  salesHook,
  projectImage,
}) => (
  <Card className="week-card h-full">
    {projectImage && (
      <div className="aspect-[21/9] overflow-hidden border-b border-border">
        <img
          src={projectImage}
          alt={`Week ${week} project`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
    )}
    <CardHeader className="pb-3 pt-5 px-5 sm:px-6">
      <div className="pill-tag mb-3 w-fit">Week {week}</div>
      <CardTitle className="text-lg sm:text-xl leading-snug break-words">{title}</CardTitle>
      <CardDescription className="text-sm sm:text-base leading-relaxed pt-1">{objective}</CardDescription>
    </CardHeader>
    <CardContent className="px-5 sm:px-6 pb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="concepts" className="border-border">
          <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
            Core concepts
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {coreConcepts.map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="deliverables" className="border-border">
          <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
            Projects & deliverables
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {deliverables.map((deliverable, index) => (
                <li key={deliverable}>
                  Project {index + 1}: {deliverable}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="mt-5 border-t border-border pt-4 text-sm italic text-muted-foreground">{salesHook}</p>
    </CardContent>
  </Card>
);

export default WeekCard;
