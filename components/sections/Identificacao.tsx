import { IDENTIFICACAO } from '@/config/content';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollTextReveal } from '@/components/ui/ScrollTextReveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const STAGGER_MS = 90;

export function Identificacao() {
  return (
    <section id="identificacao" aria-labelledby="identificacao-t" className="cv-auto secao bg-creme text-tinta">
      <div className="container-lp">
        <p className="eyebrow flex items-center gap-3 text-ouro-escuro">
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
          {IDENTIFICACAO.eyebrow}
        </p>

        {/* Manifesto: acende palavra por palavra conforme a rolagem */}
        <h2 id="identificacao-t" className="mt-8 max-w-5xl">
          <ScrollTextReveal
            text={IDENTIFICACAO.manifesto}
            highlight={['branco.', 'combina']}
            className="font-serif text-[2.1rem] font-light leading-[1.12] tracking-[-0.01em] md:text-6xl md:leading-[1.08]"
          />
        </h2>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IDENTIFICACAO.pains.map((pain, i) => (
            <li key={pain.text}>
              <Reveal delay={i * STAGGER_MS} className="h-full">
                <SpotlightCard
                  tone="claro"
                  className="h-full border border-tinta/10 bg-white/45 p-6 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ouro-escuro/40 hover:shadow-[0_24px_50px_-28px_rgba(42,33,27,0.45)]"
                >
                  <IconBadge name={pain.icon} tone="claro" />
                  <p className="mt-5 leading-relaxed text-tinta/85">{pain.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
