import React, { useCallback, useEffect, useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdminSidebar, { AdminMobileToggle } from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminLearners from '@/components/admin/AdminLearners';
import AdminPrograms from '@/components/admin/AdminPrograms';
import AdminSessions from '@/components/admin/AdminSessions';
import AdminAssignments from '@/components/admin/AdminAssignments';
import AdminCertificates from '@/components/admin/AdminCertificates';
import AdminContacts from '@/components/admin/AdminContacts';
import type {
  AdminAssignment,
  AdminCertificate,
  AdminContact,
  AdminDashboardStats,
  AdminLearner,
  AdminProgram,
  AdminSection,
  AdminSession,
  AdminSubmission,
} from '@/lib/adminTypes';

const emptyStats: AdminDashboardStats = {
  totalLearners: 0,
  activeLearners: 0,
  programsSold: 0,
  revenue: 0,
  upcomingSessions: [],
  recentEnrollments: [],
};

const AdminDashboard = () => {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<AdminDashboardStats>(emptyStats);
  const [learners, setLearners] = useState<AdminLearner[]>([]);
  const [programs, setPrograms] = useState<AdminProgram[]>([]);
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [assignments, setAssignments] = useState<AdminAssignment[]>([]);
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [certificates, setCertificates] = useState<AdminCertificate[]>([]);
  const [contacts, setContacts] = useState<AdminContact[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        statsData,
        learnersData,
        programsData,
        sessionsData,
        assignmentsData,
        submissionsData,
        certificatesData,
        contactsData,
      ] = await Promise.all([
        apiClient.getAdminDashboardStats(),
        apiClient.getAdminLearners(),
        apiClient.getAdminPrograms(),
        apiClient.getAdminSessions(),
        apiClient.getAdminAssignments(),
        apiClient.getAdminSubmissions(),
        apiClient.getAdminCertificates(),
        apiClient.getAdminContacts(),
      ]);

      setStats(statsData);
      setLearners(learnersData);
      setPrograms(programsData);
      setSessions(sessionsData);
      setAssignments(assignmentsData);
      setSubmissions(submissionsData);
      setCertificates(certificatesData);
      setContacts(contactsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load admin data';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const sectionTitles: Record<AdminSection, string> = {
    dashboard: 'Dashboard',
    learners: 'Learners',
    programs: 'Programs',
    sessions: 'Sessions',
    assignments: 'Assignments',
    certificates: 'Certificates',
    contacts: 'Contact Leads',
  };

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <AdminOverview stats={stats} />;
      case 'learners':
        return <AdminLearners learners={learners} programs={programs} onRefresh={loadData} />;
      case 'programs':
        return <AdminPrograms programs={programs} onRefresh={loadData} />;
      case 'sessions':
        return <AdminSessions sessions={sessions} programs={programs} onRefresh={loadData} />;
      case 'assignments':
        return (
          <AdminAssignments
            assignments={assignments}
            submissions={submissions}
            programs={programs}
            onRefresh={loadData}
          />
        );
      case 'certificates':
        return (
          <AdminCertificates
            certificates={certificates}
            learners={learners}
            programs={programs}
            onRefresh={loadData}
          />
        );
      case 'contacts':
        return <AdminContacts contacts={contacts} onRefresh={loadData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar
        active={section}
        onChange={setSection}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <AdminMobileToggle open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">{sectionTitles[section]}</h1>
              <p className="text-xs text-muted-foreground sm:text-sm">Phase 1 — Launch admin panel</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Database setup required</AlertTitle>
              <AlertDescription>
                {error}. Run <code className="rounded bg-muted px-1">supabase/admin-phase1.sql</code> in Supabase SQL Editor, then refresh.
              </AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            renderSection()
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
