'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readConsent, saveConsent, type ConsentChoice } from '@/lib/tracking';

/** Rolagem (px) ou tempo (ms) até o banner aparecer: a primeira tela fica livre para o título e o botão. */
const SHOW_AFTER_SCROLL_PX = 120;
const SHOW_AFTER_MS = 8000;

/**
 * Banner de cookies (LGPD) ligado ao Consent Mode v2 do GTM e ao coletor do /dashboard.
 * Modelo opt-out: o consentimento já é "granted" desde a entrada (TrackingProvider), então adiar o
 * banner até a primeira rolagem não muda a medição; só tira o banner de cima da primeira dobra.
 */
export function ConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Lê o localStorage só no cliente (no servidor não existe decisão salva)
    if (readConsent() !== null) return;
    const open = () => {
      setIsOpen(true);
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL_PX) open();
    };
    const timer = window.setTimeout(open, SHOW_AFTER_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  if (!isOpen) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setIsOpen(false);
  };

  // Celular: faixa fina logo acima da barra fixa do WhatsApp, sem cobrir o título do topo
  // (antes era um cartão que tampava ~1/3 da primeira tela). Desktop: cartão no canto.
  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      className="fixed inset-x-0 bottom-[4.6rem] z-50 flex items-center gap-3 border-t border-ouro/20 bg-superficie/95 px-4 py-2.5 shadow-[0_-12px_30px_-18px_rgba(0,0,0,0.8)] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:flex-wrap md:border md:border-ouro/25 md:p-5"
    >
      <p className="min-w-0 flex-1 text-[0.72rem] leading-snug text-areia md:basis-full md:text-sm md:leading-relaxed">
        Usamos cookies para medir a página e os anúncios.{' '}
        <Link href="/privacidade" className="text-ouro underline underline-offset-2 hover:text-ouro-claro">
          Saiba mais
        </Link>
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => choose('essential')}
          className="min-h-10 rounded-full px-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-areia underline-offset-4 transition-colors hover:text-marfim hover:underline md:border md:border-ouro/30 md:px-5"
        >
          Só o essencial
        </button>
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="min-h-10 rounded-full bg-ouro px-4 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-fundo transition-colors hover:bg-ouro-claro md:px-6"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
