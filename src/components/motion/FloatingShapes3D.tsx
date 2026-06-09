import React from 'react';

/** Ambient CSS 3D shapes — decorative background layer */
const FloatingShapes3D = () => (
  <div className="floating-shapes-3d pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div className="shape-3d shape-cube animate-spin-slow" />
    <div className="shape-3d shape-ring animate-float" />
    <div className="shape-3d shape-sphere animate-float" style={{ animationDelay: '1.5s' }} />
    <div className="shape-3d shape-pyramid" />
  </div>
);

export default FloatingShapes3D;
