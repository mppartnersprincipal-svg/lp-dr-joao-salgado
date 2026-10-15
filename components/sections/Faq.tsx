import { FAQ } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-t" className="secao bg-superficie">
      <div className="container-lp grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq" eyebrow={FAQ.eyebrow} title={FAQ.title} />
            <Reveal delay={120} className="mt-10">
              <p className="text-areia">Ficou alguma dúvida? Pergunte direto ao Dr. João.</p>
              <WhatsAppButton ctaId="cta_whatsapp_faq" variant="contorno" label="Tirar minha dúvida" className="mt-5" />
            </Reveal>
          </div>
        </div>

        {/* .faq: o TrackingEvents escuta `.faq summary` para o evento faq_open */}
        <Reveal className="faq lg:col-span-8">
          {FAQ.items.map((item) => (
            <details key={item.q} className="group border-t border-ouro/20 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-serif text-xl text-marfim transition-colors hover:text-ouro-claro md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-ouro before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-areia">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
