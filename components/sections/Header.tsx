'use client';

import { useEffect, useState } from 'react';
import { DOCTOR } from '@/config/content';
import { Monograma } from '@/components/ui/Monograma';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const NAV = [
  { href: '#facetas', label: 'Facetas' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#faq', label: 'Dúvidas' },
];
const SCROLL_THRESHOLD = 24;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`header fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        isScrolled ? 'border-b border-ouro/15 bg-fundo/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-lp flex h-18 items-center justify-between gap-4 md:h-20">
        <a href="#topo" className="flex items-center gap-3 text-ouro" aria-label={`${DOCTOR.name}, voltar ao início`}>
          <Monograma className="h-9 w-9 md:h-10 md:w-10" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg text-marfim md:text-xl">{DOCTOR.name}</span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-areia">{DOCTOR.cro}</span>
          </span>
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.72rem] uppercase tracking-[0.22em] text-areia transition-colors hover:text-ouro-claro"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* no celular a barra fixa do rodapé já faz esse papel */}
        <div className="hidden sm:block">
          <WhatsAppButton ctaId="cta_whatsapp_header" size="sm" label="Agendar" />
        </div>
      </div>
    </header>
  );
}
