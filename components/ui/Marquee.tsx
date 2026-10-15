import { MARQUEE } from '@/config/content';

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {MARQUEE.map((word) => (
        <li key={word} className="flex items-center gap-10 pr-10 font-serif text-3xl font-light italic text-marfim/80 md:text-5xl">
          {word}
          <span aria-hidden="true" className="text-lg not-italic text-ouro md:text-2xl">✦</span>
        </li>
      ))}
    </ul>
  );
}

/** Faixa infinita com os valores da marca (CSS puro; pausa no hover e com reduced motion). */
export function Marquee() {
  return (
    <div className="marquee group relative flex overflow-hidden border-y border-ouro/15 bg-fundo py-6 md:py-8">
      <div className="marquee-track flex group-hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-fundo to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-fundo to-transparent" />
    </div>
  );
}
