'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/lib/useScrollProgress';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  /** palavras em destaque (itálico dourado) */
  highlight?: readonly string[];
}

const MIN_OPACITY = 0.14;

/**
 * Texto que "acende" palavra por palavra conforme a rolagem.
 * Cada palavra calcula a própria opacidade em CSS a partir de --p (sem re-render do React).
 * Sem JS, --p não existe e o texto aparece inteiro.
 */
export function ScrollTextReveal({ text, className = '', highlight = [] }: ScrollTextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollProgress(ref, { mode: 'reveal' });

  const words = text.split(' ');
  const total = words.length;
  const isHighlight = (w: string) => highlight.some((h) => w.toLowerCase().startsWith(h.toLowerCase()));

  return (
    <p ref={ref} data-scroll-reveal="" className={className}>
      {/* texto inteiro para leitores de tela; as palavras animadas ficam ocultas para eles */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className={`inline-block transition-opacity duration-150 ${isHighlight(word) ? 'italic text-ouro-claro' : ''}`}
          style={{ opacity: `clamp(${MIN_OPACITY}, calc(var(--p) * ${(total * 1.2).toFixed(1)} - ${i}), 1)` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
