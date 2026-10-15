import Image from 'next/image';
import { HERO } from '@/config/content';
import fotoHero from '@/assets/fotos/dr-joao-lupa.webp';
import { Monograma } from '@/components/ui/Monograma';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const LINE_DELAY_MS = 140;

export function Hero() {
  return (
    <section id="topo" aria-labelledby="topo-t" className="grao relative overflow-hidden pt-18 md:pt-20">
      {/* brilho quente atrás do retrato, como a luz de estúdio das fotos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 hidden h-[40rem] lg:block w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(112,90,76,0.38),transparent_65%)]"
      />

      <div className="container-lp relative grid items-center gap-0 pb-16 md:pb-24 lg:grid-cols-12 lg:gap-6 lg:pt-10">
        {/* Retrato: no celular vem primeiro, recortado */}
        <div className="relative order-first -mx-5 lg:order-last lg:col-span-5 lg:mx-0">
          <div aria-hidden="true" className="moldura absolute -bottom-4 -left-4 top-8 right-6 hidden lg:block" />
          <ParallaxImage speed={0.06} className="relative">
            {/* celular: recorte baixo para o título e o CTA caberem na primeira dobra */}
            <div className="relative h-[42svh] min-h-64 overflow-hidden lg:h-auto lg:aspect-[3/4]">
              <Image
                src={fotoHero}
                alt="Dr. João Salgado de braços cruzados, com jaleco preto e lupa odontológica"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 100vw"
                className="h-full w-full object-cover object-[50%_18%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:[mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
              />
            </div>
          </ParallaxImage>
          <Monograma className="absolute -top-4 right-5 hidden h-20 w-20 text-ouro/70 lg:-right-6 lg:block" title="" />
        </div>

        <div className="-mt-20 relative lg:col-span-7 lg:mt-0 lg:pr-8">
          <p className="eyebrow surgir mb-6 flex items-center gap-3 text-ouro">
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
            {HERO.eyebrow}
          </p>

          <h1 id="topo-t" className="font-serif text-[2.6rem] font-light leading-[1.02] tracking-[-0.015em] text-marfim sm:text-6xl xl:text-7xl">
            {HERO.titleLines.map((line, i) => (
              <span key={line} className="linha-revelar">
                <span style={{ animationDelay: `${i * LINE_DELAY_MS}ms` }}>
                  {i === HERO.titleLines.length - 1 ? <em className="font-normal text-ouro-claro">{line}</em> : line}
                </span>
              </span>
            ))}
          </h1>

          <p className="surgir mt-7 max-w-xl text-base leading-relaxed text-areia md:text-lg" style={{ animationDelay: '420ms' }}>
            {HERO.subtitle}
          </p>

          <div className="surgir mt-9 flex flex-col gap-4 sm:flex-row sm:items-center" style={{ animationDelay: '560ms' }}>
            <WhatsAppButton ctaId="cta_whatsapp_hero" size="lg" />
            <a
              href="#como-funciona"
              data-track="click_cta"
              data-cta-id="cta_ver_como_funciona"
              className="group inline-flex min-h-12 items-center gap-3 px-2 text-[0.75rem] uppercase tracking-[0.2em] text-marfim transition-colors hover:text-ouro-claro"
            >
              {HERO.secondaryCta}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </a>
          </div>

          <ul className="surgir mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-ouro/15 pt-6" style={{ animationDelay: '700ms' }}>
            {HERO.badges.map((badge) => (
              <li key={badge} className="eyebrow text-areia">
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
