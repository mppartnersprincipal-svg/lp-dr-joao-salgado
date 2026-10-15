import Link from 'next/link';
import { CONTACT, DOCTOR, FOOTER, isFilled } from '@/config/content';
import { Monograma } from '@/components/ui/Monograma';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export function Footer() {
  return (
    <footer className="footer cv-auto border-t border-ouro/15 bg-fundo pb-28 pt-14 md:pb-14">
      <div className="container-lp grid gap-10 md:grid-cols-12">
        <div className="flex items-start gap-4 md:col-span-5">
          <Monograma className="h-12 w-12 shrink-0 text-ouro" />
          <div>
            <p className="font-serif text-2xl text-marfim">{DOCTOR.name}</p>
            <p className="mt-1 text-sm text-areia">
              {DOCTOR.profession} · {DOCTOR.cro}
            </p>
            {isFilled(DOCTOR.technicalResponsible) && (
              <p className="mt-1 text-sm text-areia">Responsável técnico: {DOCTOR.technicalResponsible}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm md:col-span-4">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-track="click_instagram"
            className="text-areia transition-colors hover:text-ouro-claro"
          >
            Instagram {CONTACT.instagramHandle}
          </a>
          {CONTACT.phone && (
            <a href={`tel:+${CONTACT.phone}`} data-track="click_phone" className="text-areia transition-colors hover:text-ouro-claro">
              Telefone
            </a>
          )}
          <Link href="/privacidade" className="text-areia transition-colors hover:text-ouro-claro">
            Política de privacidade
          </Link>
        </div>

        <div className="md:col-span-3 md:text-right">
          <WhatsAppButton ctaId="cta_whatsapp_footer" variant="contorno" size="sm" label="WhatsApp" />
        </div>
      </div>

      <p className="container-lp mt-12 border-t border-ouro/10 pt-6 text-xs leading-relaxed text-areia/70">
        {FOOTER.disclaimer}
      </p>
    </footer>
  );
}
