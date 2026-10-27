import { INVESTIMENTO } from '@/config/content';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 70;

/** O que define o orçamento das facetas, sem nenhum valor (regra do CRO). */
export function Investimento() {
  return (
    <section id="investimento" aria-labelledby="investimento-t" className="cv-auto secao bg-creme text-tinta">
      <div className="container-lp">
        <SectionHeading id="investimento" eyebrow={INVESTIMENTO.eyebrow} title={INVESTIMENTO.title} intro={INVESTIMENTO.intro} tone="claro" />

        <ol className="mt-14 grid gap-px bg-tinta/10 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTIMENTO.fatores.map((fator, i) => (
            <li key={fator.title} className="bg-creme">
              <Reveal delay={(i % 3) * STAGGER_MS} className="h-full p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <IconBadge name={fator.icon} tone="claro" />
                  <span className="font-serif text-3xl font-light text-tinta/15">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl text-tinta">{fator.title}</h3>
                <p className="mt-2 leading-relaxed text-tinta/75">{fator.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start gap-6 border-t border-tinta/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-tinta/70">{INVESTIMENTO.porque}</p>
          <WhatsAppButton ctaId="cta_whatsapp_investimento" label={INVESTIMENTO.cta} className="shrink-0" />
        </Reveal>
      </div>
    </section>
  );
}
