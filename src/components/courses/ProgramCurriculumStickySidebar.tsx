import React, { useEffect, useRef, useState } from 'react';

const HEADER_OFFSET = 104;

interface ProgramCurriculumStickySidebarProps {
  children: React.ReactNode;
}

/**
 * Keeps the inquiry sidebar pinned while scrolling through #curriculum.
 * Uses fixed positioning because page-level overflow-x-hidden breaks CSS sticky.
 */
const ProgramCurriculumStickySidebar = ({ children }: ProgramCurriculumStickySidebarProps) => {
  const colRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'static' | 'fixed' | 'bottom'>('static');
  const [asideHeight, setAsideHeight] = useState(0);
  const [fixedPos, setFixedPos] = useState({ top: HEADER_OFFSET, left: 0, width: 0 });

  useEffect(() => {
    const section = document.getElementById('curriculum');
    const layout = section?.querySelector('.program-curriculum-layout');
    const anchor = layout ?? section;
    const col = colRef.current;
    const aside = asideRef.current;
    if (!section || !anchor || !col || !aside) return;

    const mq = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      if (asideRef.current) {
        setAsideHeight(asideRef.current.offsetHeight);
      }

      const colEl = colRef.current;
      const asideEl = asideRef.current;
      if (!colEl || !asideEl || !mq.matches) {
        setMode('static');
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const colRect = colEl.getBoundingClientRect();
      const asideH = asideEl.offsetHeight;

      if (sectionRect.bottom <= HEADER_OFFSET || sectionRect.top >= window.innerHeight) {
        setMode('static');
        return;
      }

      if (sectionRect.bottom <= asideH + HEADER_OFFSET + 8) {
        setMode('bottom');
        return;
      }

      if (anchorRect.top >= HEADER_OFFSET) {
        setMode('static');
        return;
      }

      setMode('fixed');
      setFixedPos({
        top: HEADER_OFFSET,
        left: colRect.left,
        width: colRect.width,
      });
    };

    const ro = new ResizeObserver(update);
    ro.observe(aside);
    ro.observe(section);
    if (layout instanceof Element) {
      ro.observe(layout);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    mq.addEventListener('change', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      mq.removeEventListener('change', update);
    };
  }, []);

  const asideStyle: React.CSSProperties =
    mode === 'fixed'
      ? {
          position: 'fixed',
          top: fixedPos.top,
          left: fixedPos.left,
          width: fixedPos.width,
          zIndex: 30,
          maxHeight: `calc(100vh - ${HEADER_OFFSET + 16}px)`,
          overflowY: 'auto',
        }
      : mode === 'bottom'
        ? {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }
        : {};

  return (
    <div ref={colRef} className="program-curriculum-sidebar-col">
      {mode === 'fixed' && (
        <div
          aria-hidden
          className="hidden lg:block"
          style={{ height: asideHeight, visibility: 'hidden' }}
        />
      )}
      <div ref={asideRef} className="program-curriculum-sidebar-wrap" style={asideStyle}>
        {children}
      </div>
    </div>
  );
};

export default ProgramCurriculumStickySidebar;
