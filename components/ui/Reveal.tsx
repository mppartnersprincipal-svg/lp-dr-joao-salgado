'use client';

import type { ReactNode } from 'react';
import { animated, useInView } from '@react-spring/web';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** atraso em ms (para escalonar itens de uma lista) */
  delay?: number;
  /** deslocamento inicial em px */
  offset?: number;
}

const SPRING_CONFIG = { tension: 140, friction: 24 };
const IN_VIEW_OPTIONS = { rootMargin: '0px 0px -12% 0px', once: true };

/** Fade-in + slide-up ao entrar na tela (padrão de entrada M|P). */
export function Reveal({ children, className, delay = 0, offset = 28 }: RevealProps) {
  const [ref, springs] = useInView(
    () => ({
      from: { opacity: 0, y: offset },
      to: { opacity: 1, y: 0 },
      delay,
      config: SPRING_CONFIG,
    }),
    IN_VIEW_OPTIONS,
  );

  return (
    <animated.div
      ref={ref}
      data-reveal=""
      className={className}
      style={{ opacity: springs.opacity, transform: springs.y.to((y) => `translate3d(0, ${y}px, 0)`) }}
    >
      {children}
    </animated.div>
  );
}
