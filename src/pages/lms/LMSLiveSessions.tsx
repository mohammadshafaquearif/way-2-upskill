import React from 'react';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ExternalLink, FileText, PlayCircle, Video } from 'lucide-react';

const LMSLiveSessions = () => {
  const { sessions } = useLearnerProgram();

  const upcoming = sessions.filter((s) => s.isUpcoming);
  const past = sessions.filter((s) => !s.isUpcoming);

  const SessionCard = ({
    session,
    variant,
  }: {
    session: (typeof sessions)[0];
    variant: 'upcoming' | 'past';
  }) => (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={variant === 'upcoming' ? 'default' : 'secondary'}>
                {variant === 'upcoming' ? 'Upcoming' : 'Past Session'}
              </Badge>
            </div>
            <h3 className="text-lg font-bold">{session.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(session.sessionDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span>{session.sessionTime}</span>
            </div>
            <p className="text-sm">
              Mentor: <span className="font-medium">{session.mentorName}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {variant === 'upcoming' && session.meetLink && (
              <Button asChild className="cursor-pointer">
                <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                  Join Session
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {variant === 'past' && (
              <>
                {session.recordingUrl && (
                  <Button asChild variant="outline" size="sm" className="cursor-pointer">
                    <a href={session.recordingUrl}>
                      <Video className="mr-2 h-4 w-4" />
                      Recording
                    </a>
                  </Button>
                )}
                {session.slidesUrl && (
                  <Button asChild variant="outline" size="sm" className="cursor-pointer">
                    <a href={session.slidesUrl}>
                      <FileText className="mr-2 h-4 w-4" />
                      Slides
                    </a>
                  </Button>
                )}
                {session.notesUrl && (
                  <Button asChild variant="outline" size="sm" className="cursor-pointer">
                    <a href={session.notesUrl}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Notes
                    </a>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Live Sessions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join live classes with your mentor and access recordings after each session.
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past & Recordings ({past.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 space-y-4">
          {upcoming.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No upcoming sessions scheduled.
              </CardContent>
            </Card>
          ) : (
            upcoming.map((s) => <SessionCard key={s.id} session={s} variant="upcoming" />)
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4 space-y-4">
          {past.map((s) => (
            <SessionCard key={s.id} session={s} variant="past" />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LMSLiveSessions;
