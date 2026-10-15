'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { animated, useScroll } from '@react-spring/web';

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  /** fração do scroll aplicada como deslocamento (0.1 = 10%) */
  speed?: number;
}

const DESKTOP_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/** Parallax leve só no desktop (no celular fica estático para manter 60fps). */
export function ParallaxImage({ children, className, speed = 0.12 }: ParallaxImageProps) {
  const { scrollY } = useScroll();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <animated.div
      className={className}
      style={{ transform: scrollY.to((y) => `translate3d(0, ${isEnabled ? y * speed : 0}px, 0)`) }}
    >
      {children}
    </animated.div>
  );
}
