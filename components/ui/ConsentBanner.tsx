'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readConsent, saveConsent, type ConsentChoice } from '@/lib/tracking';

/** Banner de cookies (LGPD) ligado ao Consent Mode v2 do GTM e ao coletor do /dashboard. */
export function ConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Lê o localStorage só no cliente (no servidor não existe decisão salva)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(readConsent() === null);
  }, []);

  if (!isOpen) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setIsOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl border border-ouro/25 bg-superficie/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur md:bottom-6 md:left-6 md:right-auto"
    >
      <p className="text-sm leading-relaxed text-areia">
        Usamos cookies para entender como a página é usada e melhorar a sua experiência. Saiba mais na{' '}
        <Link href="/privacidade" className="text-ouro underline underline-offset-4 hover:text-ouro-claro">
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="min-h-11 bg-ouro px-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-fundo transition-colors hover:bg-ouro-claro"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => choose('essential')}
          className="moldura min-h-11 px-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-marfim transition-colors hover:border-ouro"
        >
          Só o essencial
        </button>
      </div>
    </div>
  );
}
