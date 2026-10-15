import Image from 'next/image';
import { DOCTOR, SOBRE } from '@/config/content';
import fotoClinica from '@/assets/fotos/dr-joao-clinica.webp';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="sobre-t" className="secao grao relative overflow-hidden">
      <div className="container-lp grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="moldura absolute -right-4 -top-4 bottom-10 left-10" />
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={fotoClinica}
              alt="Dr. João Salgado na recepção da clínica Allstima, com parede de pedra ao fundo"
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="sobre" eyebrow={SOBRE.eyebrow} title={SOBRE.title} />
          <Reveal delay={100} className="mt-8 flex max-w-xl flex-col gap-5 text-base leading-relaxed text-areia md:text-lg">
            {SOBRE.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 font-serif text-3xl italic text-ouro-claro">{DOCTOR.name}</p>
            <ul className="mt-8 flex flex-col gap-3 border-t border-ouro/15 pt-8">
              {SOBRE.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-4 text-marfim">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-ouro" />
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
