import Image from 'next/image';
import { COMO_FUNCIONA } from '@/config/content';
import fotoPlanejamento from '@/assets/fotos/dr-joao-xadrez.webp';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 80;

export function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-t" className="secao bg-superficie">
      <div className="container-lp grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="como-funciona" eyebrow={COMO_FUNCIONA.eyebrow} title={COMO_FUNCIONA.title} />
            <Reveal delay={120} className="relative mt-10 hidden lg:block">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={fotoPlanejamento}
                    alt="Dr. João Salgado movendo uma peça de xadrez, em referência ao planejamento"
                    placeholder="blur"
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="h-full w-full object-cover object-[45%_30%]"
                  />
                </div>
                <figcaption className="mt-4 font-serif text-lg italic text-areia">
                  Planejar é antecipar cada movimento.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="relative border-l border-ouro/25 pl-8 md:pl-12">
            {COMO_FUNCIONA.steps.map((step, i) => (
              <li key={step.title} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(2rem+0.4rem)] top-1.5 h-3 w-3 rotate-45 border border-ouro bg-superficie md:-left-[calc(3rem+0.4rem)]"
                />
                <Reveal delay={i * STAGGER_MS}>
                  <p className="eyebrow text-ouro">Etapa {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-serif text-2xl text-marfim md:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-areia">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-14 pl-8 md:pl-12">
            <WhatsAppButton ctaId="cta_whatsapp_como_funciona" label="Começar pela avaliação" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
