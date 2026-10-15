import { TRATAMENTOS } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 120;

export function Tratamentos() {
  return (
    <section id="tratamentos" aria-labelledby="tratamentos-t" className="secao">
      <div className="container-lp">
        <SectionHeading id="tratamentos" eyebrow={TRATAMENTOS.eyebrow} title={TRATAMENTOS.title} />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {TRATAMENTOS.items.map((item, i) => (
            // id no card: URL final por serviço para os grupos de anúncio (/#implantes)
            <li key={item.id} id={item.id} className="scroll-mt-28">
              <Reveal
                delay={i * STAGGER_MS}
                className="moldura group flex h-full flex-col bg-superficie/50 p-7 transition-colors duration-500 hover:border-ouro/60 hover:bg-superficie md:p-10"
              >
                <p className="eyebrow text-ouro">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-serif text-3xl text-marfim md:text-4xl">{item.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-areia">{item.text}</p>
                <WhatsAppButton
                  ctaId={item.ctaId}
                  topic={item.topic}
                  label={item.cta}
                  variant="contorno"
                  className="mt-8 self-start"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
