import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  UserCheck,
  ShoppingBag,
  DollarSign,
  CalendarOff,
  Inbox,
  type LucideIcon,
} from 'lucide-react';
import type { AdminDashboardStats } from '@/lib/adminTypes';
import { capitalizeStatus, enrollmentStatusClass, formatAdminDate } from '@/lib/adminUi';

interface AdminOverviewProps {
  stats: AdminDashboardStats;
}

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
}

const StatCard = ({ label, value, icon: Icon, hint }: StatItem) => (
  <Card className="border-border/70 shadow-sm">
    <CardContent className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    </CardContent>
  </Card>
);

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/30 px-6 py-12 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
      <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
    </div>
    <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
    <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
  </div>
);

const AdminOverview = ({ stats }: AdminOverviewProps) => {
  const statItems: StatItem[] = [
    { label: 'Total Learners', value: stats.totalLearners, icon: Users },
    { label: 'Active Learners', value: stats.activeLearners, icon: UserCheck },
    { label: 'Programs Sold', value: stats.programsSold, icon: ShoppingBag },
    {
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      hint: 'Active & completed enrollments only',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Upcoming Sessions</CardTitle>
            <CardDescription>Next scheduled live sessions across programs</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.upcomingSessions.length === 0 ? (
              <EmptyState
                icon={CalendarOff}
                title="No sessions scheduled"
                description="Add sessions from the Sessions section to show them here."
              />
            ) : (
              <ul className="divide-y divide-border">
                {stats.upcomingSessions.map((session) => (
                  <li key={session.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{session.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {session.program_code ?? '—'} · {session.mentor_name || 'Mentor TBA'}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-foreground">
                        {formatAdminDate(session.session_date)}
                      </p>
                      <p className="text-xs text-muted-foreground">{session.session_time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Enrollments</CardTitle>
            <CardDescription>Latest learner sign-ups and payment status</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentEnrollments.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No enrollments yet"
                description="New enrollments will appear here as learners register."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      <th className="pb-2 pr-4 font-medium">Learner</th>
                      <th className="pb-2 pr-4 font-medium">Program</th>
                      <th className="pb-2 pr-4 font-medium">Status</th>
                      <th className="pb-2 text-right font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {stats.recentEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="group">
                        <td className="py-3 pr-4">
                          <p className="font-medium text-foreground">{enrollment.user_name || 'Guest'}</p>
                          {enrollment.user_email ? (
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {enrollment.user_email}
                            </p>
                          ) : null}
                        </td>
                        <td className="max-w-[180px] py-3 pr-4">
                          <p className="truncate text-muted-foreground">{enrollment.course_name}</p>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge
                            variant="outline"
                            className={`font-medium ${enrollmentStatusClass(enrollment.status)}`}
                          >
                            {capitalizeStatus(enrollment.status)}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap py-3 text-right text-muted-foreground">
                          {formatAdminDate(enrollment.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
