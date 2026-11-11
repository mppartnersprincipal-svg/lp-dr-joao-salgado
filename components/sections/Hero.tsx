import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { HERO, HERO_INTENCOES, type HeroIntencao, type Intencao } from '@/config/content';
import { FOTOS } from '@/lib/images';
import { Icon } from '@/components/ui/Icon';
import { Monograma } from '@/components/ui/Monograma';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const LINE_DELAY_MS = 140;
const TITULO = 'font-serif text-[2.35rem] font-light leading-[1.02] tracking-[-0.015em] text-marfim sm:text-6xl xl:text-7xl';
const SUBTITULO = 'surgir mt-5 max-w-xl text-[0.95rem] leading-relaxed text-areia md:mt-7 md:text-lg';
const LINHA_CTA = 'surgir mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 md:mt-9';
const LINK_ROLAGEM =
  'group inline-flex min-h-11 items-center gap-3 whitespace-nowrap px-2 text-[0.72rem] uppercase tracking-[0.2em] underline decoration-ouro/40 underline-offset-8 transition-colors hover:text-marfim';

const INTENCOES = Object.entries(HERO_INTENCOES) as [Intencao, HeroIntencao][];

/** Título linha a linha; a última linha em itálico dourado. */
function linhas(lines: readonly string[]) {
  return lines.map((line, i) => (
    <span key={line} className="linha-revelar">
      <span style={{ animationDelay: `${i * LINE_DELAY_MS}ms` }}>
        {i === lines.length - 1 ? <em className="font-normal text-ouro-claro">{line}</em> : line}
      </span>
    </span>
  ));
}

/** Link que só rola até a seção (click_cta, não é conversão). */
function linkRolagem(href: string, ctaId: string, label: string, tom = 'text-ouro-claro') {
  return (
    <a href={href} data-track="click_cta" data-cta-id={ctaId} className={`${LINK_ROLAGEM} ${tom}`}>
      {label}
      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
    </a>
  );
}

/**
 * Topo da página. Celular: foto baixa para título, resposta e botão caberem na primeira tela.
 * Variantes por intenção da busca (preço, resina ou porcelana, resina): todas vêm no HTML e o
 * CSS mostra só a do <html data-intencao> (lib/intencao.ts). O h1 guarda o selo com a palavra-chave
 * e o título padrão; nas variantes o título padrão some e o título da intenção aparece logo abaixo.
 */
export function Hero() {
  return (
    <section id="topo" aria-labelledby="topo-t" className="grao relative overflow-hidden pt-18 md:pt-20 lg:min-h-[100svh]">
      {/* brilho quente atrás do retrato, como a luz de estúdio das fotos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 hidden h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(112,90,76,0.42),transparent_65%)] lg:block"
      />
      {/* grade fina dourada ao fundo (profundidade sem poluir) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.07] [background-image:linear-gradient(var(--cor-primaria)_1px,transparent_1px),linear-gradient(90deg,var(--cor-primaria)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)] lg:block"
      />

      <div className="container-lp relative grid items-center gap-0 pb-12 md:pb-24 lg:grid-cols-12 lg:gap-6 lg:pt-10">
        {/* Retrato: no celular vem primeiro, recortado baixo */}
        <div className="relative order-first -mx-5 lg:order-last lg:col-span-5 lg:mx-0">
          <div aria-hidden="true" className="moldura absolute -bottom-4 -left-4 top-8 right-6 hidden lg:block" />
          <ParallaxImage speed={0.06} className="relative">
            <div className="relative h-[27svh] min-h-48 overflow-hidden lg:aspect-[3/4] lg:h-auto">
              <Image
                src={FOTOS.lupa}
                alt="Dr. João Salgado de braços cruzados, com jaleco preto e lupa odontológica"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full w-full object-cover object-[50%_14%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:[mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
              />
            </div>
          </ParallaxImage>

          {/* cartões flutuantes (glass) */}
          {HERO.floating.map((card, i) => (
            <div
              key={card.title}
              className={`flutuar surgir absolute z-10 hidden items-center gap-3 border border-ouro/25 bg-fundo/55 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md lg:flex ${
                i === 0 ? '-left-10 top-[38%]' : '-right-6 bottom-[16%]'
              }`}
              style={{ animationDelay: `${900 + i * 200}ms, ${i * 1.4}s` }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ouro/40 text-ouro">
                <Icon name={card.icon} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-marfim">{card.title}</span>
                <span className="text-xs text-areia">{card.text}</span>
              </span>
            </div>
          ))}
          <Monograma className="absolute -top-4 right-5 hidden h-20 w-20 text-ouro/70 lg:-right-6 lg:block" title="" />
        </div>

        <div className="relative -mt-12 lg:col-span-7 lg:mt-0 lg:pr-8">
          {/* O selo faz parte do h1 (palavra-chave + cidade para SEO) */}
          <h1 id="topo-t" className={TITULO}>
            <span className="eyebrow surgir mb-4 flex items-center gap-3 text-[0.64rem] leading-relaxed text-ouro md:mb-6 md:text-[0.72rem]">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current opacity-60 md:w-10" />
              {HERO.eyebrow}
            </span>
            <span className="intencao-padrao block">{linhas(HERO.titleLines)}</span>
          </h1>
          {INTENCOES.map(([key, v]) => (
            <p key={key} className={`intencao-${key} ${TITULO}`}>
              {linhas(v.titleLines)}
            </p>
          ))}

          <p className={`intencao-padrao ${SUBTITULO}`} style={{ animationDelay: '420ms' }}>
            {HERO.subtitle}
          </p>
          {INTENCOES.map(([key, v]) => (
            <p key={key} className={`intencao-${key} ${SUBTITULO}`} style={{ animationDelay: '420ms' }}>
              {v.subtitle}
            </p>
          ))}

          <div className={`intencao-padrao ${LINHA_CTA}`} style={{ animationDelay: '560ms' }}>
            <WhatsAppButton ctaId="cta_whatsapp_hero" size="lg" className="brilho sm:whitespace-nowrap" />
            {/* Para quem chegou pesquisando preço: leva à #investimento (rolagem, não é clique de WhatsApp) */}
            {linkRolagem('#investimento', 'hero_valor', HERO.valorCta)}
            <span className="hidden sm:contents">
              {linkRolagem('#como-funciona', 'cta_ver_como_funciona', HERO.secondaryCta, 'text-marfim no-underline')}
            </span>
          </div>
          {INTENCOES.map(([key, v]) => (
            <div key={key} className={`intencao-${key} ${LINHA_CTA}`} style={{ animationDelay: '560ms' }}>
              <WhatsAppButton ctaId={v.cta.ctaId} topic={v.cta.topic} label={v.cta.label} size="lg" className="brilho sm:whitespace-nowrap" />
              {linkRolagem(v.link.href, v.link.ctaId, v.link.label)}
            </div>
          ))}

          <ul className="surgir mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-ouro/15 pt-5 md:mt-10 md:pt-6" style={{ animationDelay: '700ms' }}>
            {HERO.badges.map((badge) => (
              <li key={badge} className="eyebrow flex items-center gap-2 text-areia">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-ouro" />
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* indicador de rolagem */}
      <a
        href="#credenciais"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-areia transition-colors hover:text-ouro lg:flex"
      >
        <span className="eyebrow">Role</span>
        <span className="relative h-10 w-px overflow-hidden bg-ouro/20">
          <span className="indicador-rolagem absolute inset-x-0 top-0 h-4 bg-ouro" />
        </span>
      </a>
    </section>
  );
}
