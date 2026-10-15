import Image from 'next/image';
import { FACETAS, IMAGEM_ILUSTRATIVA } from '@/config/content';
import { SERVICOS } from '@/lib/images';
import { Faceta3D } from '@/components/ui/Faceta3D';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 90;

// Halo dourado atrás da faceta 3D, sobre a superfície escura
const PALCO_3D_BG =
  'radial-gradient(ellipse at 50% 38%, rgba(200,164,107,0.16), transparent 62%), linear-gradient(to bottom, var(--cor-superficie), var(--cor-fundo))';

function TagIlustrativa({ label = IMAGEM_ILUSTRATIVA }: { label?: string }) {
  return (
    <span className="pointer-events-none absolute right-3 top-3 z-10 bg-fundo/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-areia backdrop-blur">
      {label}
    </span>
  );
}

export function Facetas() {
  return (
    <section id="facetas" aria-labelledby="facetas-t" className="secao grao relative overflow-hidden">
      <div className="container-lp">
        <SectionHeading id="facetas" eyebrow={FACETAS.eyebrow} title={FACETAS.title} intro={FACETAS.intro} />

        {/* Bento: faceta 3D + benefícios + escala de cor */}
        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <Reveal className="relative lg:col-span-5 lg:row-span-2">
            <figure
              className="relative h-full min-h-[30rem] overflow-hidden border border-ouro/15"
              style={{ background: PALCO_3D_BG }}
            >
              <TagIlustrativa label={FACETAS.modelo3d.tag} />
              <Faceta3D
                label={FACETAS.modelo3d.label}
                hint={FACETAS.modelo3d.hint}
                loadingText={FACETAS.modelo3d.loading}
                fallback={
                  <Image
                    src={SERVICOS.facetas}
                    alt="Lâminas de porcelana translúcidas dispostas em arco sobre pedra escura"
                    placeholder="blur"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[30%_40%]"
                  />
                }
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-fundo to-transparent"
              />
              <figcaption className="pointer-events-none absolute inset-x-6 bottom-6 font-serif text-2xl leading-snug text-marfim md:text-[1.7rem]">
                {FACETAS.modelo3d.caption}
              </figcaption>
            </figure>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {FACETAS.benefits.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={(i % 2) * STAGGER_MS} className="h-full">
                  <SpotlightCard className="h-full border border-ouro/15 bg-superficie/60 p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-ouro/45 md:p-7">
                    <IconBadge name={b.icon} />
                    <h3 className="mt-5 font-serif text-2xl text-marfim">{b.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-areia">{b.text}</p>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="lg:col-span-7">
            <figure className="group relative overflow-hidden border border-ouro/15">
              <TagIlustrativa />
              <div className="relative aspect-[4/3] sm:aspect-[16/8]">
                <Image
                  src={SERVICOS.escala}
                  alt="Escala de cor com tons naturais de porcelana sobre couro"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-suave group-hover:scale-105"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-fundo/95 via-fundo/20 to-transparent sm:bg-gradient-to-r sm:from-fundo/90 sm:via-fundo/40" />
              <figcaption className="absolute inset-x-6 bottom-6 max-w-xs font-serif text-xl leading-snug text-marfim sm:inset-x-auto sm:bottom-auto sm:left-8 sm:top-1/2 sm:-translate-y-1/2 md:text-2xl">
                {FACETAS.shadeCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex justify-center">
          <WhatsAppButton ctaId="cta_whatsapp_facetas" size="lg" />
        </Reveal>
      </div>
    </section>
  );
}
