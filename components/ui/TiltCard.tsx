'use client';

import type { PointerEvent, ReactNode } from 'react';
import { animated, to, useSpring } from '@react-spring/web';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** inclinação máxima em graus */
  max?: number;
}

const SPRING = { tension: 260, friction: 26 };

/** Card com leve inclinação 3D acompanhando o mouse (desligado no toque). */
export function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  const [style, api] = useSpring(() => ({ rx: 0, ry: 0, s: 1, config: SPRING }));

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    api.start({ rx: -y * max * 2, ry: x * max * 2, s: 1.015 });
  };
  const reset = () => api.start({ rx: 0, ry: 0, s: 1 });

  return (
    <animated.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={className}
      style={{
        transform: to(
          [style.rx, style.ry, style.s],
          (rx, ry, s) => `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
        ),
      }}
    >
      {children}
    </animated.div>
  );
}
