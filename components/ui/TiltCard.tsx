import type { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** inclinação máxima em graus */
  max?: number;
}

/**
 * Card com leve inclinação 3D acompanhando o mouse (desktop; desligado no toque).
 * A inclinação é aplicada pelo <Interactions /> e suavizada pela transição CSS abaixo.
 */
export function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  return (
    <div data-tilt={max} className={`transition-transform duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}
