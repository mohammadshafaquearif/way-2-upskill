import { useCallback, useRef, useState } from 'react';

interface Use3DTiltOptions {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export function use3DTilt({
  maxTilt = 14,
  scale = 1.03,
  perspective = 1100,
}: Use3DTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(${perspective}px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.08s ease-out',
      });
    },
    [maxTilt, scale, perspective],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    });
  }, [perspective]);

  return { ref, style, onMouseMove, onMouseLeave };
}
