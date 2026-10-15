import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** atraso em ms (para escalonar itens de uma lista) */
  delay?: number;
  /** deslocamento inicial em px */
  offset?: number;
}

/**
 * Fade-in + slide-up ao entrar na tela (padrão de entrada M|P).
 * Sem JS próprio: a animação é CSS ([data-reveal] → .is-visible) e quem observa a tela é o
 * componente único <Interactions />. Sem JavaScript, o <noscript> do layout mostra tudo.
 */
export function Reveal({ children, className, delay = 0, offset }: RevealProps) {
  const style = {
    ...(delay ? { '--reveal-delay': `${delay}ms` } : {}),
    ...(offset !== undefined ? { '--reveal-offset': `${offset}px` } : {}),
  } as CSSProperties;
  return (
    <div data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
