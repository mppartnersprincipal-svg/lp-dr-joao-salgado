interface CountUpProps {
  to: number;
  prefix?: string;
  className?: string;
}

/**
 * Número que conta de 0 até `to` quando entra na tela (uma vez), animado pelo <Interactions />.
 * O HTML já sai com o valor final: sem JS (ou para buscadores) o número aparece certo.
 */
export function CountUp({ to, prefix = '', className }: CountUpProps) {
  return (
    <span className={className} data-count={to} data-prefix={prefix}>
      {prefix}
      {to}
    </span>
  );
}
