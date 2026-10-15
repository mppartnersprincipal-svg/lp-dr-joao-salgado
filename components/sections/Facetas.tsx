import { FACETAS } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 100;

export function Facetas() {
  return (
    <section id="facetas" aria-labelledby="facetas-t" className="secao grao relative overflow-hidden">
      <div className="container-lp">
        <SectionHeading id="facetas" eyebrow={FACETAS.eyebrow} title={FACETAS.title} intro={FACETAS.intro} />

        <ul className="mt-16 grid gap-x-12 md:grid-cols-2">
          {FACETAS.benefits.map((b, i) => (
            <li key={b.title} className="border-t border-ouro/20">
              <Reveal delay={(i % 2) * STAGGER_MS} className="flex gap-6 py-8 md:py-10">
                <span className="eyebrow pt-2 text-ouro">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-marfim md:text-[1.7rem]">{b.title}</h3>
                  <p className="mt-3 leading-relaxed text-areia">{b.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>


        <Reveal className="mt-12 flex justify-center">
          <WhatsAppButton ctaId="cta_whatsapp_facetas" size="lg" />
        </Reveal>
      </div>
    </section>
  );
}
