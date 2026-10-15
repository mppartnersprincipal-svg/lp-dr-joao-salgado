import { MessageCircleQuestion } from 'lucide-react';
import { FAQ } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-t" className="cv-auto secao bg-superficie">
      <div className="container-lp grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq" eyebrow={FAQ.eyebrow} title={FAQ.title} />
            <Reveal delay={120} className="moldura mt-10 bg-fundo/50 p-6">
              <MessageCircleQuestion className="h-7 w-7 text-ouro" strokeWidth={1.25} aria-hidden="true" />
              <p className="mt-4 text-areia">Ficou alguma dúvida? Pergunte direto ao Dr. João.</p>
              <WhatsAppButton ctaId="cta_whatsapp_faq" variant="contorno" label="Tirar minha dúvida" className="mt-5" />
            </Reveal>
          </div>
        </div>

        {/* .faq: o TrackingEvents escuta `.faq summary` para o evento faq_open */}
        <Reveal className="faq lg:col-span-8">
          {FAQ.items.map((item, i) => (
            <details key={item.q} className="faq-item group border-t border-ouro/20 last:border-b">
              <summary className="flex cursor-pointer list-none items-center gap-5 py-6 text-left [&::-webkit-details-marker]:hidden">
                <span className="eyebrow w-6 shrink-0 text-ouro">{String(i + 1).padStart(2, '0')}</span>
                <span data-faq-q="" className="flex-1 font-serif text-xl text-marfim transition-colors group-hover:text-ouro-claro md:text-2xl">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ouro/30 text-ouro transition-[transform,background-color,border-color,color] duration-500 group-open:rotate-180 group-open:border-ouro group-open:bg-ouro group-open:text-fundo"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-px bg-current transition-transform duration-500 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pl-11 leading-relaxed text-areia">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
