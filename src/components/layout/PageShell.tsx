import React from 'react';
import { cn } from '@/lib/utils';

/** Consistent page wrapper: full-height, brand background, no horizontal scroll */
const PageShell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('page-shell flex min-h-screen flex-col', className)}>{children}</div>
);

export default PageShell;
