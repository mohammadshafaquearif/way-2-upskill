import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, AlertCircle, ShieldX } from 'lucide-react';
import { apiClient } from '@/integrations/api/client';
import { adminPathForSection, adminSectionFromPath } from '@/lib/adminConstants';
import { firstAllowedAdminSection } from '@/lib/admin';
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
import { buildAdminAgents } from '@/lib/adminAgents';
import { useAuth } from '@/contexts/AuthContext';
import AdminSalesReport from '@/components/admin/AdminSalesReport';
import AdminAccess from '@/components/admin/AdminAccess';
import { useAdminAccess } from '@/contexts/AdminAccessContext';
import { ADMIN_DATA_LOAD_FAILED, logAdminError, toSafeAdminMessage } from '@/lib/adminErrors';
import { buildAdminSeo } from '@/lib/seo';
import { usePageMeta } from '@/hooks/usePageMeta';
import type {
  AdminAccessRecord,
  AdminAssignment,
  AdminCertificate,
  AdminContact,
  AdminDashboardStats,
  AdminLearner,
  AdminProgram,
  AdminSaleRecord,
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
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const section = adminSectionFromPath(location.pathname);
  const { access, canAccess, canDo } = useAdminAccess();
  usePageMeta(buildAdminSeo(location.pathname));
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
  const [sales, setSales] = useState<AdminSaleRecord[]>([]);
  const [adminAccessRecords, setAdminAccessRecords] = useState<AdminAccessRecord[]>([]);

  useEffect(() => {
    if (!access) return;
    if (!canAccess(section)) {
      const fallback = firstAllowedAdminSection(access);
      if (fallback) {
        navigate(adminPathForSection(fallback), { replace: true });
      }
    }
  }, [access, section, canAccess, navigate]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tasks: Promise<void>[] = [];

      if (canDo('dashboard')) {
        tasks.push(
          apiClient.getAdminDashboardStats().then((data) => {
            setStats(data);
          }),
        );
      } else {
        setStats(emptyStats);
      }

      if (canDo('learners')) {
        tasks.push(
          apiClient.getAdminLearners().then((data) => {
            setLearners(data);
          }),
        );
      } else {
        setLearners([]);
      }

      if (canDo('programs') || canDo('learners') || canDo('sessions') || canDo('assignments') || canDo('certificates')) {
        tasks.push(
          apiClient.getAdminPrograms().then((data) => {
            setPrograms(data);
          }),
        );
      } else {
        setPrograms([]);
      }

      if (canDo('sessions')) {
        tasks.push(
          apiClient.getAdminSessions().then((data) => {
            setSessions(data);
          }),
        );
      } else {
        setSessions([]);
      }

      if (canDo('assignments')) {
        tasks.push(
          Promise.all([apiClient.getAdminAssignments(), apiClient.getAdminSubmissions()]).then(
            ([assignmentsData, submissionsData]) => {
              setAssignments(assignmentsData);
              setSubmissions(submissionsData);
            },
          ),
        );
      } else {
        setAssignments([]);
        setSubmissions([]);
      }

      if (canDo('certificates')) {
        tasks.push(
          apiClient.getAdminCertificates().then((data) => {
            setCertificates(data);
          }),
        );
      } else {
        setCertificates([]);
      }

      if (canDo('contacts')) {
        tasks.push(
          apiClient.getAdminContacts().then((data) => {
            setContacts(data);
          }),
        );
      } else {
        setContacts([]);
      }

      if (access?.isSuperAdmin) {
        tasks.push(
          apiClient.listAdminAccess().then((data) => {
            setAdminAccessRecords(data);
          }),
        );
      } else {
        setAdminAccessRecords([]);
      }

      if (canDo('sales_report')) {
        tasks.push(
          apiClient.getAdminSalesReport().then((data) => {
            setSales(data);
          }),
        );
      } else {
        setSales([]);
      }

      await Promise.all(tasks);
    } catch (err) {
      logAdminError('load admin dashboard', err);
      setError(toSafeAdminMessage(err, ADMIN_DATA_LOAD_FAILED));
    } finally {
      setLoading(false);
    }
  }, [canDo, access?.isSuperAdmin]);

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
    sales_report: 'Sales Report',
    admin_access: 'Admin Access',
  };

  const sectionSubtitles: Record<AdminSection, string> = {
    dashboard: 'Overview of learners, revenue, and recent activity',
    learners: 'Manage profiles, programs, and enrollment status',
    programs: 'Course catalog, pricing, and availability',
    sessions: 'Schedule and manage live program sessions',
    assignments: 'Review submissions and track learner progress',
    certificates: 'Issue and verify program certificates',
    contacts: 'Inbound leads from the contact form',
    sales_report: 'Payment ledger — Razorpay receipts and pending enrollments',
    admin_access: 'Grant tab-level permissions to team admins',
  };

  const renderSection = () => {
    if (!canAccess(section)) {
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <ShieldX className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">You do not have access to this section.</p>
        </div>
      );
    }

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
        return (
          <AdminContacts
            contacts={contacts}
            agents={buildAdminAgents(adminAccessRecords)}
            isSuperAdmin={Boolean(access?.isSuperAdmin)}
            currentUserEmail={user?.email ?? ''}
            onRefresh={loadData}
          />
        );
      case 'sales_report':
        return <AdminSalesReport sales={sales} />;
      case 'admin_access':
        return <AdminAccess records={adminAccessRecords} onRefresh={loadData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        active={section}
        onChange={(id) => navigate(adminPathForSection(id))}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border/80 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
          <div className="flex items-center gap-3">
            <AdminMobileToggle open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
            <div>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{sectionTitles[section]}</h1>
              <p className="text-sm text-muted-foreground">{sectionSubtitles[section]}</p>
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
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
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
