import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, ShoppingBag, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import type { AdminDashboardStats } from '@/lib/adminTypes';

interface AdminOverviewProps {
  stats: AdminDashboardStats;
}

const AdminOverview = ({ stats }: AdminOverviewProps) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-muted-foreground">Launch overview — learners, revenue, and activity</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        { label: 'Total Learners', value: stats.totalLearners, icon: Users, color: 'text-blue-600 bg-blue-100' },
        { label: 'Active Learners', value: stats.activeLearners, icon: UserCheck, color: 'text-green-600 bg-green-100' },
        { label: 'Programs Sold', value: stats.programsSold, icon: ShoppingBag, color: 'text-violet-600 bg-violet-100' },
        { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-600 bg-amber-100' },
      ].map((item) => (
        <Card key={item.label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl p-3 ${item.color}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.upcomingSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No upcoming sessions scheduled.</p>
          ) : (
            stats.upcomingSessions.map((session) => (
              <div key={session.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.program_code} · {session.mentor_name || 'TBA'}
                    </p>
                  </div>
                  <Badge variant="outline">{session.program_code}</Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(session.session_date).toLocaleDateString()} at {session.session_time}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Enrollments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.recentEnrollments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No enrollments yet.</p>
          ) : (
            stats.recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{enrollment.user_name || 'Guest'}</p>
                  <p className="text-sm text-muted-foreground">{enrollment.course_name}</p>
                </div>
                <div className="text-right">
                  <Badge>{enrollment.status}</Badge>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(enrollment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AdminOverview;
