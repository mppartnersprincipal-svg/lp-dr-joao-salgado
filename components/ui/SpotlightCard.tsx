import type { ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tone?: 'escuro' | 'claro';
}

/**
 * Card com brilho dourado que segue o cursor (só em mouse; no toque fica um card limpo).
 * O cursor é acompanhado pelo <Interactions /> (delegação), que grava --mx/--my no card.
 */
export function SpotlightCard({ children, className = '', tone = 'escuro' }: SpotlightCardProps) {
  const glow =
    tone === 'claro'
      ? 'bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(140,106,60,0.14),transparent_60%)]'
      : 'bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(200,164,107,0.16),transparent_60%)]';

  return (
    <div data-spotlight="" className={`group relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${glow}`}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
