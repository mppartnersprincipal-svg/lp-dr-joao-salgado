import { HERO_INTENCOES, whatsappLink, type HeroIntencao, type Intencao } from '@/config/content';
import { WhatsAppButton } from './WhatsAppButton';
import { WhatsAppIcon } from './WhatsAppIcon';

const INTENCOES = Object.entries(HERO_INTENCOES) as [Intencao, HeroIntencao][];

/**
 * Atalhos fixos para o WhatsApp:
 * - desktop: botão flutuante redondo (fab_whatsapp)
 * - celular: barra fixa no rodapé da tela (cta_whatsapp_sticky). O rótulo e a mensagem seguem a
 *   intenção da busca (quem buscou preço vê "Quero saber o valor"), com o mesmo cta_id em todas.
 */
export function WhatsAppFloat() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="fab_whatsapp"
        aria-label="Falar com o Dr. João Salgado no WhatsApp"
        className="fab fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-suave hover:scale-110 md:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-ouro/20 bg-fundo/95 px-4 py-3 md:hidden">
        <WhatsAppButton ctaId="cta_whatsapp_sticky" size="md" className="intencao-padrao w-full" />
        {INTENCOES.map(([key, v]) => (
          <WhatsAppButton
            key={key}
            ctaId="cta_whatsapp_sticky"
            topic={v.cta.topic}
            label={v.cta.label}
            size="md"
            className={`intencao-${key} w-full`}
          />
        ))}
      </div>
    </>
  );
}
