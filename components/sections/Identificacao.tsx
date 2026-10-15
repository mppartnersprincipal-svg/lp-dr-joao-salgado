import { IDENTIFICACAO } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STAGGER_MS = 90;

export function Identificacao() {
  return (
    <section id="identificacao" aria-labelledby="identificacao-t" className="secao bg-creme text-tinta">
      <div className="container-lp grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading id="identificacao" eyebrow={IDENTIFICACAO.eyebrow} title={IDENTIFICACAO.title} tone="claro" />
          <Reveal delay={120}>
            <blockquote className="mt-10 border-l border-ouro-escuro/50 pl-6 font-serif text-2xl font-light italic leading-snug text-tinta/80 md:text-[1.7rem]">
              “{IDENTIFICACAO.quote}”
            </blockquote>
          </Reveal>
        </div>

        <ol className="flex flex-col lg:col-span-6 lg:pt-16">
          {IDENTIFICACAO.pains.map((pain, i) => (
            <li key={pain} className="border-t border-tinta/15 last:border-b">
              <Reveal delay={i * STAGGER_MS} className="flex gap-6 py-6">
                <span className="font-serif text-lg text-ouro-escuro">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-base leading-relaxed text-tinta/85 md:text-lg">{pain}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
