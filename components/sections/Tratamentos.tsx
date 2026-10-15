import Image from 'next/image';
import { Check } from 'lucide-react';
import { IMAGEM_ILUSTRATIVA, TRATAMENTOS } from '@/config/content';
import { SERVICOS } from '@/lib/images';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 120;

const IMAGENS = {
  implantes: {
    src: SERVICOS.implante,
    alt: 'Implante dentário de titânio com coroa de cerâmica sobre pedestal de pedra',
    position: 'object-[50%_22%]',
  },
  ortodontia: {
    src: SERVICOS.alinhador,
    alt: 'Alinhadores ortodônticos transparentes sobre veludo escuro',
    position: 'object-[40%_55%]',
  },
} as const;

export function Tratamentos() {
  return (
    <section id="tratamentos" aria-labelledby="tratamentos-t" className="cv-auto secao">
      <div className="container-lp">
        <SectionHeading id="tratamentos" eyebrow={TRATAMENTOS.eyebrow} title={TRATAMENTOS.title} />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {TRATAMENTOS.items.map((item, i) => {
            const img = IMAGENS[item.id];
            return (
              // id no card: URL final por serviço para os grupos de anúncio (/#implantes)
              <li key={item.id} id={item.id} className="scroll-mt-28">
                <Reveal delay={i * STAGGER_MS} className="h-full">
                  <TiltCard className="group h-full">
                    <article className="flex h-full flex-col border border-ouro/20 bg-superficie/60 transition-colors duration-500 group-hover:border-ouro/55">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          placeholder="blur"
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className={`h-full w-full object-cover ${img.position} transition-transform duration-[1.4s] ease-suave group-hover:scale-[1.06]`}
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-superficie via-transparent to-transparent" />
                        <span className="absolute right-3 top-3 bg-fundo/80 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-areia">
                          {IMAGEM_ILUSTRATIVA}
                        </span>
                      </div>

                      <div className="relative flex flex-1 flex-col p-7 pt-12 md:p-10 md:pt-14">
                        <IconBadge name={item.icon} className="absolute -top-7 left-7 h-14 w-14 bg-superficie md:left-10" />
                        <h3 className="font-serif text-3xl text-marfim md:text-4xl">{item.title}</h3>
                        <p className="mt-4 leading-relaxed text-areia">{item.text}</p>
                        <ul className="mt-6 flex flex-1 flex-col gap-3">
                          {item.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-[0.95rem] text-marfim">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-ouro" strokeWidth={2} aria-hidden="true" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <WhatsAppButton
                          ctaId={item.ctaId}
                          topic={item.topic}
                          label={item.cta}
                          variant="contorno"
                          className="mt-8 self-start"
                        />
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
