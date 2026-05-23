
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  projectImage
}) => {
  return (
    <Card className="hover-card border-t-4 border-t-primary">
      <CardHeader className="pb-3">
        <div className="pill-tag mb-2">WEEK {week}</div>
        <CardTitle className="text-lg sm:text-xl break-words leading-snug">{title}</CardTitle>
        <CardDescription className="text-base">{objective}</CardDescription>
      </CardHeader>
      <CardContent>
        {projectImage && (
          <div className="mb-4 h-48 overflow-hidden rounded-lg">
            <img src={projectImage} alt={`Week ${week} project`} className="w-full h-full object-cover" />
          </div>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="concepts">
            <AccordionTrigger className="text-sm font-medium">Core Concepts</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                {coreConcepts.map((concept, index) => (
                  <li key={index} className="text-sm">{concept}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="deliverables">
            <AccordionTrigger className="text-sm font-medium">Projects</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="text-sm">Project {index + 1}: {deliverable}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-6 pt-4 border-t text-sm italic text-secondary">
          {salesHook}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekCard;
