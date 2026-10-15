'use client';

import { animated, easings, useInView, useSpring } from '@react-spring/web';

interface CountUpProps {
  to: number;
  prefix?: string;
  className?: string;
}

const DURATION_MS = 1600;

/** Número que conta de 0 até `to` quando entra na tela (uma vez). */
export function CountUp({ to, prefix = '', className }: CountUpProps) {
  const [ref, inView] = useInView({ once: true });
  const { n } = useSpring({
    n: inView ? to : 0,
    config: { duration: DURATION_MS, easing: easings.easeOutCubic },
  });

  return (
    <span className={className} aria-label={`${prefix}${to}`}>
      <animated.span ref={ref} aria-hidden="true">
        {n.to((v) => `${prefix}${Math.round(v)}`)}
      </animated.span>
    </span>
  );
}
