import { Star } from 'lucide-react';
import { AVALIACOES_GOOGLE, FLAGS } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STAGGER_MS = 90;
const NOTA_MAXIMA = 5;

function Estrelas({ nota, className = '' }: { nota: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${nota} de ${NOTA_MAXIMA} estrelas`} role="img">
      {Array.from({ length: NOTA_MAXIMA }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.round(nota) ? 'fill-ouro text-ouro' : 'text-ouro/30'}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/** Avaliações reais do Google, copiadas sem edição. Escondida até FLAGS.avaliacoes e haver itens. */
export function AvaliacoesGoogle() {
  const { itens, url, nota, total } = AVALIACOES_GOOGLE;
  if (!FLAGS.avaliacoes || itens.length === 0) return null;

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-t" className="cv-auto secao bg-superficie">
      <div className="container-lp">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading id="avaliacoes" eyebrow={AVALIACOES_GOOGLE.eyebrow} title={AVALIACOES_GOOGLE.title} />
          {total > 0 && (
            <Reveal className="flex items-center gap-4">
              <p className="font-serif text-5xl font-light text-ouro-claro">{nota.toFixed(1).replace('.', ',')}</p>
              <div>
                <Estrelas nota={nota} />
                <p className="eyebrow mt-1 text-areia">
                  {total} {total === 1 ? 'avaliação' : 'avaliações'} no Google
                </p>
              </div>
            </Reveal>
          )}
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {itens.map((item, i) => (
            <li key={`${item.autor}-${item.quando}`}>
              <Reveal delay={(i % 3) * STAGGER_MS} className="h-full">
                <figure className="flex h-full flex-col border border-ouro/15 bg-fundo/50 p-7">
                  <Estrelas nota={item.nota} />
                  <blockquote className="mt-5 flex-1 leading-relaxed text-marfim">“{item.texto}”</blockquote>
                  <figcaption className="mt-6 flex items-baseline justify-between gap-4 border-t border-ouro/10 pt-4 text-sm">
                    <span className="text-marfim">{item.autor}</span>
                    <span className="text-areia/70">{item.quando}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        {url && (
          <Reveal className="mt-10">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_maps"
              className="text-ouro underline underline-offset-4 transition-colors hover:text-ouro-claro"
            >
              {AVALIACOES_GOOGLE.cta}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
