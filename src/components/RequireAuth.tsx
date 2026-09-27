import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageShell from '@/components/layout/PageShell';
import LoginSignupModal from '@/components/LoginSignupModal';
import { useAuth } from '@/contexts/AuthContext';

const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const authedRef = useRef(isAuthenticated);
  authedRef.current = isAuthenticated;

  useEffect(() => {
    authedRef.current = isAuthenticated;
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <PageShell>
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-28 text-sm text-muted-foreground">
          Checking your account…
        </main>
        <Footer />
      </PageShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageShell>
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Sign in to open resources</h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            New here? Create an account. Already registered? Log in. Your details are saved with your Zyvotrix account.
          </p>
        </main>
        <LoginSignupModal
          isOpen
          onClose={() => {
            window.setTimeout(() => {
              if (!authedRef.current) navigate('/');
            }, 0);
          }}
        />
        <Footer />
      </PageShell>
    );
  }

  return <Outlet />;
};

export default RequireAuth;
