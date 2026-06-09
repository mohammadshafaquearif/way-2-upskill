import React from 'react';

/** Subtle editorial depth — no spinning shapes or AI-slop decoration */
const AmbientDepth = () => (
  <div className="ambient-depth pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <div className="ambient-depth-light ambient-depth-light--tl" />
    <div className="ambient-depth-light ambient-depth-light--br" />
    <div className="ambient-depth-noise" />
  </div>
);

export default AmbientDepth;
