import { RESINA } from '@/config/content';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 90;
const { colunas, linhas } = RESINA.comparacao;

/**
 * Facetas de resina como serviço + comparação neutra com a porcelana.
 * Dois alvos de URL final: a seção (#facetas-de-resina) e a tabela (#resina-ou-porcelana).
 * A tabela é um <table> de verdade (lida pelo Google); no celular cada linha vira um bloco.
 */
export function FacetasResina() {
  return (
    <section id="facetas-de-resina" aria-labelledby="facetas-de-resina-t" className="cv-auto secao bg-creme text-tinta">
      <div className="container-lp">
        <SectionHeading id="facetas-de-resina" eyebrow={RESINA.eyebrow} title={RESINA.title} intro={RESINA.intro} tone="claro" />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESINA.benefits.map((b, i) => (
            <li key={b.title} className={i % 2 === 1 ? 'lg:mt-10' : ''}>
              <Reveal delay={i * STAGGER_MS} className="h-full">
                <SpotlightCard
                  tone="claro"
                  className="h-full border border-tinta/10 bg-white/50 p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-ouro-escuro/40 hover:shadow-[0_30px_60px_-30px_rgba(42,33,27,0.5)]"
                >
                  <IconBadge name={b.icon} tone="claro" />
                  <h3 className="mt-6 font-serif text-2xl text-tinta">{b.title}</h3>
                  <p className="mt-3 leading-relaxed text-tinta/75">{b.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10">
          <WhatsAppButton ctaId="cta_whatsapp_resina" topic="resina" label={RESINA.cta} />
        </Reveal>

        <div id="resina-ou-porcelana" className="mt-24 scroll-mt-28">
          <Reveal>
            <h3 className="titulo-secao max-w-2xl text-tinta">{RESINA.comparacao.title}</h3>
          </Reveal>

          <Reveal className="mt-10">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Comparação entre faceta de resina e faceta de porcelana</caption>
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-tinta/15">
                  <th scope="col" className="eyebrow w-[22%] py-4 pr-6 font-normal text-tinta/60">
                    {colunas.criterio}
                  </th>
                  <th scope="col" className="w-[39%] py-4 pr-6 font-serif text-2xl font-normal text-tinta">
                    {colunas.resina}
                  </th>
                  <th scope="col" className="w-[39%] py-4 font-serif text-2xl font-normal text-tinta">
                    {colunas.porcelana}
                  </th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((linha) => (
                  <tr key={linha.criterio} className="flex flex-col gap-3 border-b border-tinta/10 py-6 md:table-row md:py-0">
                    <th scope="row" className="eyebrow pr-6 text-left font-normal text-ouro-escuro md:py-6 md:align-top">
                      {linha.criterio}
                    </th>
                    <td className="leading-relaxed text-tinta/80 md:py-6 md:pr-6 md:align-top">
                      <span className="eyebrow mb-1 block text-tinta/50 md:hidden">{colunas.resina}</span>
                      {linha.resina}
                    </td>
                    <td className="leading-relaxed text-tinta/80 md:py-6 md:align-top">
                      <span className="eyebrow mb-1 block text-tinta/50 md:hidden">{colunas.porcelana}</span>
                      {linha.porcelana}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-10">
            <p className="max-w-2xl leading-relaxed text-tinta/80">{RESINA.comparacao.nota}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
