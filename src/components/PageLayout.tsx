import React from 'react';
import { Outlet } from 'react-router-dom';

/** Wraps all routes — prevents horizontal scroll and sets full-width mobile shell */
const PageLayout = () => (
  <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
    <Outlet />
  </div>
);

export default PageLayout;
