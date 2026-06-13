import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminEmail } from '@/lib/admin';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import { Button } from '@/components/ui/button';

const AdminRoute = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

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

  if (!user || !isAdminEmail(user.email)) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <ShieldX className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="mb-2 text-2xl font-bold">Access denied</h1>
          <p className="mb-6 text-muted-foreground">
            {user?.email
              ? `${user.email} does not have admin access.`
              : 'You do not have admin access.'}
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

export default AdminRoute;
