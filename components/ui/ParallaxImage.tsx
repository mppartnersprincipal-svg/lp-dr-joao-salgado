import type { ReactNode } from 'react';

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  /** fração da distância até o centro da tela aplicada como deslocamento (0.1 = 10%) */
  speed?: number;
}

/**
 * Parallax leve só no desktop (no celular fica estático para manter 60fps).
 * O deslocamento é calculado pelo <Interactions /> em relação ao centro da tela.
 */
export function ParallaxImage({ children, className, speed = 0.12 }: ParallaxImageProps) {
  return (
    <div data-parallax={speed} className={className}>
      {children}
    </div>
  );
}
