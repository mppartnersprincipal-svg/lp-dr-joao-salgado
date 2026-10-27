import Image from 'next/image';
import { Check } from 'lucide-react';
import { CONTACT, CTA_FINAL, LOCAL, isFilled } from '@/config/content';
import { FOTOS } from '@/lib/images';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function CtaFinal() {
  const { address } = CONTACT;
  const hasAddress = isFilled(address.street);

  return (
    <section id="contato" aria-labelledby="contato-t" className="cv-auto grao relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src={FOTOS.retrato}
          alt=""
          placeholder="blur"
          sizes="50vw"
          className="h-full w-full object-cover object-[50%_20%] opacity-80 [mask-image:linear-gradient(to_right,transparent,black_55%)]"
        />
      </div>
      {/* halo dourado pulsando atrás do CTA */}
      <div
        aria-hidden="true"
        className="halo pointer-events-none absolute left-[8%] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,164,107,0.18),transparent_65%)]"
      />

      <div className="container-lp relative secao">
        <Reveal className="max-w-xl">
          <p className="eyebrow flex items-center gap-3 text-ouro">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            {CTA_FINAL.eyebrow}
          </p>
          <h2 id="contato-t" className="titulo-secao mt-5 text-marfim">
            {CTA_FINAL.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-areia">{CTA_FINAL.text}</p>

          <ul className="mt-8 flex flex-col gap-3">
            {CTA_FINAL.checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-marfim">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ouro/15 text-ouro">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <WhatsAppButton ctaId="cta_whatsapp_final" size="lg" className="brilho mt-10" />

          <dl className="mt-12 grid gap-6 border-t border-ouro/15 pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-ouro">Onde</dt>
              <dd className="mt-2 text-areia">
                {hasAddress ? (
                  <>
                    {address.street}
                    <br />
                  </>
                ) : null}
                {LOCAL} · {address.state}
                {CONTACT.mapsUrl && (
                  <a
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="click_maps"
                    className="mt-2 block text-ouro underline underline-offset-4 hover:text-ouro-claro"
                  >
                    Ver no mapa
                  </a>
                )}
              </dd>
            </div>
            {isFilled(CONTACT.hours) && (
              <div>
                <dt className="eyebrow text-ouro">Atendimento</dt>
                <dd className="mt-2 text-areia">{CONTACT.hours}</dd>
              </div>
            )}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
