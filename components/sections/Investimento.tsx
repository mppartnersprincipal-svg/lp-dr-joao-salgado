import { INVESTIMENTO } from '@/config/content';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const STAGGER_MS = 70;
// Celular: botão na largura toda e rótulo quebrando em duas linhas (o da foto não cabe em 360px numa linha só)
const BOTAO_CELULAR = 'w-full py-3 text-center sm:w-auto';

/**
 * Quem pesquisa preço pede o valor pelo WhatsApp sem precisar agendar. Nenhum valor na página (regra do CRO):
 * a condição da clínica é informada só na conversa.
 */
export function Investimento() {
  return (
    <section id="investimento" aria-labelledby="investimento-t" className="cv-auto secao bg-creme text-tinta">
      <div className="container-lp">
        <SectionHeading id="investimento" eyebrow={INVESTIMENTO.eyebrow} title={INVESTIMENTO.title} intro={INVESTIMENTO.intro} tone="claro" />

        <Reveal className="mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
          <WhatsAppButton ctaId="investimento_valor" topic="valor" label={INVESTIMENTO.ctaValor} className={BOTAO_CELULAR} />
          <div className="flex flex-col gap-2">
            <WhatsAppButton
              ctaId="investimento_foto"
              topic="foto"
              label={INVESTIMENTO.ctaFoto}
              variant="contorno-escuro"
              className={BOTAO_CELULAR}
            />
            <p className="px-1 text-sm text-tinta/70 sm:px-5">{INVESTIMENTO.dicaFoto}</p>
          </div>
        </Reveal>

        <h3 className="eyebrow mt-16 text-ouro-escuro">{INVESTIMENTO.fatoresTitulo}</h3>
        <ol className="mt-6 grid gap-px bg-tinta/10 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTIMENTO.fatores.map((fator, i) => (
            <li key={fator.title} className="bg-creme">
              <Reveal delay={(i % 3) * STAGGER_MS} className="h-full p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <IconBadge name={fator.icon} tone="claro" />
                  <span className="font-serif text-3xl font-light text-tinta/15">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="mt-5 font-serif text-2xl text-tinta">{fator.title}</h4>
                <p className="mt-2 leading-relaxed text-tinta/75">{fator.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 border-t border-tinta/15 pt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-tinta/70">{INVESTIMENTO.porque}</p>
        </Reveal>
      </div>
    </section>
  );
}
