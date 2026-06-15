import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { db } from '@/integrations/supabase/db';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestedSubject?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_INIT_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistUser = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('Zyvotrix_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('Zyvotrix_user');
    }
  };

  useEffect(() => {
    let mounted = true;

    const finishLoading = () => {
      if (mounted) setIsLoading(false);
    };

    const init = async () => {
      try {
        const sessionUser = await withTimeout(db.getSession(), AUTH_INIT_TIMEOUT_MS);
        if (sessionUser) {
          persistUser(sessionUser);
        } else {
          const stored = localStorage.getItem('Zyvotrix_user');
          if (stored) setUser(JSON.parse(stored));
        }
      } catch {
        const stored = localStorage.getItem('Zyvotrix_user');
        if (stored) setUser(JSON.parse(stored));
      } finally {
        if (window.location.hash.includes('access_token')) {
          const path = window.location.pathname;
          if (path !== '/reset-password') {
            window.history.replaceState({}, '', path + window.location.search);
          }
        }
        finishLoading();
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Never call supabase.auth.* inside this callback — it deadlocks the client.
      setTimeout(async () => {
        if (!mounted) return;

        if (session?.user) {
          const appUser = await db.getAppUserFromAuthUser(session.user);
          if (appUser) persistUser(appUser);
        } else if (_event === 'SIGNED_OUT') {
          persistUser(null);
        }
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = (userData: User) => {
    persistUser(userData);
  };

  const logout = async () => {
    await db.signOut();
    persistUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
