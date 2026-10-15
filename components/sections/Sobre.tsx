import Image from 'next/image';
import { Check } from 'lucide-react';
import { DOCTOR, SOBRE } from '@/config/content';
import { FOTOS } from '@/lib/images';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="sobre-t" className="secao grao relative overflow-hidden">
      <div className="container-lp grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        {/* fotos em camadas: a menor desliza em outra velocidade (profundidade) */}
        <Reveal className="relative mx-auto w-full max-w-md pb-16 pr-10 lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="moldura absolute -top-4 bottom-24 left-10 right-0" />
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={FOTOS.clinica}
              alt="Dr. João Salgado na recepção da clínica Allstima, com parede de pedra ao fundo"
              placeholder="blur"
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 448px, 100vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <ParallaxImage speed={-0.08} className="absolute -bottom-2 right-0 w-[46%]">
            <div className="relative aspect-square overflow-hidden border-4 border-fundo shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
              <Image
                src={FOTOS.xadrezSorrindo}
                alt="Dr. João Salgado sorrindo durante uma partida de xadrez"
                placeholder="blur"
                sizes="(min-width: 1024px) 18vw, 45vw"
                className="h-full w-full object-cover object-[60%_30%]"
              />
            </div>
          </ParallaxImage>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="sobre" eyebrow={SOBRE.eyebrow} title={SOBRE.title} />
          <Reveal delay={100} className="mt-8 flex max-w-xl flex-col gap-5 text-base leading-relaxed text-areia md:text-lg">
            {SOBRE.paragraphs.map((p, i) =>
              i === 0 ? (
                <p key={p} className="border-l border-ouro/50 pl-5 font-serif text-2xl italic leading-snug text-marfim md:text-[1.7rem]">
                  “{p}”
                </p>
              ) : (
                <p key={p}>{p}</p>
              ),
            )}
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 font-serif text-3xl italic text-ouro-claro">{DOCTOR.name}</p>
            <ul className="mt-8 grid gap-3 border-t border-ouro/15 pt-8">
              {SOBRE.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-4 text-marfim">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ouro/40 text-ouro">
                    <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
            <WhatsAppButton ctaId="cta_whatsapp_sobre" variant="contorno" className="mt-10" label="Conversar com o Dr. João" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
