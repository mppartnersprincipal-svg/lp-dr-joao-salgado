'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { COMO_FUNCIONA, IMAGEM_ILUSTRATIVA } from '@/config/content';
import { ETAPAS } from '@/lib/images';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STEPS = COMO_FUNCIONA.steps;
const TOTAL = STEPS.length;
/** altura de rolagem por etapa enquanto a seção fica fixada (em vh) */
const VH_PER_STEP = 85;
/** fração de cada etapa usada no crossfade entre imagens */
const FADE = 0.12;
const DESKTOP_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * Estilo de cada imagem calculado em CSS a partir de --p (0→1 no trecho fixado), a cada frame:
 * `seg` = progresso local da etapa (0 no início, 1 no fim). A imagem entra e sai em crossfade
 * nas bordas do segmento e faz um zoom-out + deslocamento contínuos enquanto a etapa está ativa.
 */
function imageStyle(i: number): CSSProperties {
  const seg = `(var(--p, 0) * ${TOTAL} - ${i})`;
  const fadeIn = i === 0 ? '1' : `calc((${seg} + ${FADE}) / ${FADE * 2})`;
  const fadeOut = i === TOTAL - 1 ? '1' : `calc((1 + ${FADE} - ${seg}) / ${FADE * 2})`;
  const local = `clamp(0, ${seg}, 1)`;
  return {
    opacity: `clamp(0, min(${fadeIn}, ${fadeOut}), 1)`,
    transform: `translate3d(0, calc((0.5 - ${local}) * 36px), 0) scale(calc(1.12 - ${local} * 0.1))`,
  };
}

export function ComoFunciona() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsPinned(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Etapa ativa derivada do mesmo progresso (só re-renderiza quando a etapa muda)
  const handleProgress = useCallback((p: number) => {
    setActive((prev) => {
      const next = Math.min(TOTAL - 1, Math.floor(p * TOTAL));
      return next === prev ? prev : next;
    });
  }, []);
  useScrollProgress(sectionRef, { mode: 'pin', onProgress: handleProgress });

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      aria-labelledby="como-funciona-t"
      className="relative bg-superficie"
      style={isPinned ? { height: `${TOTAL * VH_PER_STEP + 100}vh` } : undefined}
    >
      {isPinned ? <PinnedLayout active={active} /> : <ListLayout />}
    </section>
  );
}

/** Desktop: tela fixa; a rolagem avança as etapas, a linha e as imagens em tempo real. */
function PinnedLayout({ active }: { active: number }) {
  return (
    <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-18">
      <div className="container-lp grid w-full items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          {/* título compacto: tudo (etapas + CTA) precisa caber na tela fixada */}
          <p className="eyebrow flex items-center gap-3 text-ouro">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            {COMO_FUNCIONA.eyebrow}
          </p>
          <h2 id="como-funciona-t" className="mt-4 font-serif text-[2.6rem] font-light leading-[1.05] text-marfim xl:text-5xl">
            {COMO_FUNCIONA.title}
          </h2>

          <ol className="relative mt-7 pl-16">
            <span aria-hidden="true" className="absolute bottom-3 left-[1.35rem] top-3 w-px bg-ouro/15" />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[1.35rem] top-3 w-px origin-top bg-gradient-to-b from-ouro-claro to-ouro"
              style={{ transform: 'scaleY(var(--p, 0))' }}
            />
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <li key={step.title} aria-current={isActive ? 'step' : undefined} className="relative py-[0.45rem]">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-16 top-1.5 inline-flex h-11 w-11 items-center justify-center rounded-full border transition-[background-color,border-color,color,box-shadow,transform] duration-300 ${
                      isActive
                        ? 'scale-110 border-ouro bg-ouro text-fundo shadow-[0_0_0_8px_rgba(200,164,107,0.12)]'
                        : isDone
                          ? 'border-ouro/70 bg-superficie text-ouro'
                          : 'border-ouro/25 bg-superficie text-ouro/60'
                    }`}
                  >
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <p className={`eyebrow transition-colors duration-300 ${isActive ? 'text-ouro' : 'text-areia/60'}`}>
                    Etapa {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className={`mt-0.5 font-serif text-[1.4rem] leading-tight transition-colors duration-300 ${isActive ? 'text-marfim' : 'text-marfim/45'}`}>
                    {step.title}
                  </h3>
                  {/* texto só da etapa ativa (abre com altura animada) */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-suave ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className="max-w-md overflow-hidden pt-2 leading-relaxed text-areia">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 pl-16">
            <WhatsAppButton ctaId="cta_whatsapp_como_funciona" label="Começar pela avaliação" />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-[4/5] max-h-[74vh] overflow-hidden border border-ouro/20">
            {STEPS.map((step, i) => {
              const img = ETAPAS[step.image];
              return (
                <div key={step.title} aria-hidden={i !== active} className="absolute inset-0 will-change-[opacity,transform]" style={imageStyle(i)}>
                  <Image src={img.src} alt={img.alt} placeholder="blur" fill sizes="45vw" className="object-cover" />
                </div>
              );
            })}
            {/* etiqueta fora da camada com zoom (não é cortada) */}
            {ETAPAS[STEPS[active].image].ilustrativa && (
              <span className="absolute right-3 top-3 z-10 bg-fundo/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-areia backdrop-blur">
                {IMAGEM_ILUSTRATIVA}
              </span>
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-fundo/85 via-transparent to-transparent" />

            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6">
              <p className="font-serif text-3xl text-marfim" aria-live="polite">
                {STEPS[active].title}
              </p>
              <p className="font-serif text-xl tabular-nums text-areia">
                <span className="text-4xl text-ouro-claro">{String(active + 1).padStart(2, '0')}</span> / {String(TOTAL).padStart(2, '0')}
              </p>
            </div>
            {/* barra de progresso dentro do quadro */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-ouro/15">
              <div className="h-full origin-left bg-ouro" style={{ transform: 'scaleX(var(--p, 0))' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Celular / reduced motion: lista simples, cada etapa com a sua imagem. */
function ListLayout() {
  return (
    <div className="secao">
      <div className="container-lp">
        <SectionHeading id="como-funciona" eyebrow={COMO_FUNCIONA.eyebrow} title={COMO_FUNCIONA.title} />
        <ol className="mt-12 flex flex-col gap-12">
          {STEPS.map((step, i) => {
            const img = ETAPAS[step.image];
            return (
              <li key={step.title}>
                <Reveal className="grid gap-5 sm:grid-cols-2 sm:items-center sm:gap-8">
                  <div className="relative aspect-[4/3] overflow-hidden border border-ouro/15">
                    <Image src={img.src} alt={img.alt} placeholder="blur" fill sizes="(min-width: 640px) 45vw, 100vw" className="object-cover" />
                    {img.ilustrativa && (
                      <span className="absolute right-3 top-3 bg-fundo/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-areia backdrop-blur">
                        {IMAGEM_ILUSTRATIVA}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="eyebrow flex items-center gap-3 text-ouro">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ouro/40">
                        <Icon name={step.icon} className="h-4 w-4" />
                      </span>
                      Etapa {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl text-marfim">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-areia">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
        <Reveal className="mt-12">
          <WhatsAppButton ctaId="cta_whatsapp_como_funciona" label="Começar pela avaliação" />
        </Reveal>
      </div>
    </div>
  );
}
