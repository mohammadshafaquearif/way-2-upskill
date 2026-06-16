import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '@/integrations/api/client';
import {
  canAccessAdminSection,
  hasAdminPermission,
  hasAnyAdminAccess,
  parseAdminAccessPayload,
  type AdminAccessState,
} from '@/lib/admin';
import {
  ADMIN_ACCESS_VERIFY_FAILED,
  logAdminError,
  toSafeAdminMessage,
} from '@/lib/adminErrors';
import type { AdminPermission, AdminSection } from '@/lib/adminTypes';

interface AdminAccessContextValue {
  access: AdminAccessState | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  canAccess: (section: AdminSection) => boolean;
  canDo: (permission: AdminPermission) => boolean;
  hasAccess: boolean;
}

const AdminAccessContext = createContext<AdminAccessContextValue | undefined>(undefined);

export const AdminAccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [access, setAccess] = useState<AdminAccessState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getMyAdminAccess();
      setAccess(parseAdminAccessPayload(data));
    } catch (err) {
      logAdminError('load admin permissions', err);
      setError(toSafeAdminMessage(err, ADMIN_ACCESS_VERIFY_FAILED));
      setAccess(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<AdminAccessContextValue>(
    () => ({
      access,
      loading,
      error,
      refresh,
      canAccess: (section) => canAccessAdminSection(access, section),
      canDo: (permission) => hasAdminPermission(access, permission),
      hasAccess: hasAnyAdminAccess(access),
    }),
    [access, loading, error, refresh],
  );

  return <AdminAccessContext.Provider value={value}>{children}</AdminAccessContext.Provider>;
};

export function useAdminAccess() {
  const context = useContext(AdminAccessContext);
  if (!context) {
    throw new Error('useAdminAccess must be used within AdminAccessProvider');
  }
  return context;
}
