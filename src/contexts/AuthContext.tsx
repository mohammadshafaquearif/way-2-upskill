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
    const init = async () => {
      const sessionUser = await db.getSession();
      if (sessionUser) {
        persistUser(sessionUser);
      } else {
        const stored = localStorage.getItem('Zyvotrix_user');
        if (stored) setUser(JSON.parse(stored));
      }
      setIsLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        try {
          const sessionUser = await db.getSession();
          if (sessionUser) persistUser(sessionUser);
        } catch {
          /* profile may not exist yet */
        }
      } else if (_event === 'SIGNED_OUT') {
        persistUser(null);
      }
    });

    return () => subscription.unsubscribe();
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
