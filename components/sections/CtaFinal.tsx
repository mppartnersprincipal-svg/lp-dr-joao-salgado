import Image from 'next/image';
import { CONTACT, CTA_FINAL, isFilled } from '@/config/content';
import fotoRetrato from '@/assets/fotos/dr-joao-retrato.webp';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function CtaFinal() {
  const { address } = CONTACT;
  const hasAddress = isFilled(address.street);

  return (
    <section id="contato" aria-labelledby="contato-t" className="grao relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src={fotoRetrato}
          alt=""
          placeholder="blur"
          sizes="50vw"
          className="h-full w-full object-cover object-[50%_20%] opacity-80 [mask-image:linear-gradient(to_right,transparent,black_55%)]"
        />
      </div>

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
          <WhatsAppButton ctaId="cta_whatsapp_final" size="lg" className="mt-10" />

          <dl className="mt-12 grid gap-6 border-t border-ouro/15 pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-ouro">Onde</dt>
              <dd className="mt-2 text-areia">
                {hasAddress ? (
                  <>
                    {address.street}, {address.neighborhood}
                    <br />
                  </>
                ) : null}
                {address.city} · {address.state}
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
