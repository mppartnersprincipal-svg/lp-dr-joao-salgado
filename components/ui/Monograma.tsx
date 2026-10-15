interface MonogramaProps {
  className?: string;
  title?: string;
}

/**
 * Monograma "JS" em círculo, recriado a partir do bordado do jaleco.
 * TODO: trocar pelo vetor oficial quando o manual de marca chegar.
 */
export function Monograma({ className = 'h-10 w-10', title = 'Dr. João Salgado' }: MonogramaProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <text
        x="31"
        y="42"
        textAnchor="middle"
        fill="currentColor"
        className="font-serif"
        style={{ fontStyle: 'italic', fontSize: '30px', fontWeight: 400, letterSpacing: '-2px' }}
      >
        JS
      </text>
    </svg>
  );
}
