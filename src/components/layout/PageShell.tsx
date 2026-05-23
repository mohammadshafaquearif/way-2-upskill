import React from 'react';

/** Consistent page wrapper: full-height, brand background, no horizontal scroll */
const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="page-shell flex min-h-screen flex-col">{children}</div>
);

export default PageShell;
