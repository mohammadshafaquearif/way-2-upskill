import React, { createContext, useCallback, useContext, useState } from 'react';
import EnrollModal from '@/components/EnrollModal';

interface EnrollModalContextValue {
  openEnrollModal: (programName?: string) => void;
}

const EnrollModalContext = createContext<EnrollModalContextValue | null>(null);

export const EnrollModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [programName, setProgramName] = useState<string | undefined>();

  const openEnrollModal = useCallback((program?: string) => {
    setProgramName(program);
    setOpen(true);
  }, []);

  return (
    <EnrollModalContext.Provider value={{ openEnrollModal }}>
      {children}
      <EnrollModal open={open} onOpenChange={setOpen} programName={programName} />
    </EnrollModalContext.Provider>
  );
};

export const useEnrollModal = () => {
  const context = useContext(EnrollModalContext);
  if (!context) {
    throw new Error('useEnrollModal must be used within EnrollModalProvider');
  }
  return context;
};
