import { whatsappLink } from '@/config/content';
import { WhatsAppButton } from './WhatsAppButton';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * Atalhos fixos para o WhatsApp:
 * - desktop: botão flutuante redondo (fab_whatsapp)
 * - celular: barra fixa no rodapé da tela (cta_whatsapp_sticky)
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
        <WhatsAppButton ctaId="cta_whatsapp_sticky" size="md" className="w-full" />
      </div>
    </>
  );
}
