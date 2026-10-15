import { CTA_LABEL, whatsappLink, type WhatsAppCtaId, type WhatsAppTopic } from '@/config/content';
import { WhatsAppIcon } from './WhatsAppIcon';

type Variant = 'ouro' | 'contorno' | 'contorno-escuro';
type Size = 'sm' | 'md' | 'lg';

interface WhatsAppButtonProps {
  /** cta_id único do botão (evento click_whatsapp) */
  ctaId: WhatsAppCtaId;
  topic?: WhatsAppTopic;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  ouro: 'bg-ouro text-fundo hover:bg-ouro-claro hover:shadow-[0_14px_40px_-12px_rgba(200,164,107,0.65)]',
  contorno: 'moldura text-marfim hover:border-ouro hover:text-ouro-claro hover:shadow-[0_14px_40px_-16px_rgba(200,164,107,0.5)]',
  'contorno-escuro': 'border border-tinta/30 text-tinta hover:border-ouro-escuro hover:text-ouro-escuro hover:shadow-[0_14px_40px_-18px_rgba(42,33,27,0.45)]',
};

const SIZES: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-[0.7rem] gap-2',
  md: 'min-h-12 px-6 text-[0.75rem] gap-2.5',
  lg: 'min-h-14 px-8 text-[0.8rem] gap-3',
};

/** Link para o WhatsApp com cta_id próprio. Hover: scale + sombra (padrão M|P). */
export function WhatsAppButton({
  ctaId,
  topic = 'facetas',
  label = CTA_LABEL,
  variant = 'ouro',
  size = 'md',
  className = '',
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(topic)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={ctaId}
      className={`inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.18em] transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-suave hover:scale-[1.03] active:scale-[0.98] ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      <WhatsAppIcon className={size === 'sm' ? 'h-4 w-4' : 'h-[1.15rem] w-[1.15rem]'} />
      <span>{label}</span>
    </a>
  );
}
