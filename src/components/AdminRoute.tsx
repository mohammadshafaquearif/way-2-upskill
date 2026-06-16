import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminAccessProvider, useAdminAccess } from '@/contexts/AdminAccessContext';
import { ADMIN_ACCESS_DENIED } from '@/lib/adminErrors';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import { Button } from '@/components/ui/button';

const AdminGate = () => {
  const { logout } = useAuth();
  const { loading, error, hasAccess } = useAdminAccess();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking admin permissions...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <ShieldX className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="mb-2 text-2xl font-bold">Access denied</h1>
          <p className="mb-6 text-muted-foreground">
            {error ?? ADMIN_ACCESS_DENIED}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/">Go home</Link>
            </Button>
            <Button
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};

const AdminRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminAccessProvider>
      <AdminGate />
    </AdminAccessProvider>
  );
};

export default AdminRoute;
