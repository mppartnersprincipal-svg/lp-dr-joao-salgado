'use client';

import { useEffect } from 'react';
import { SCROLL_MARKS, track, withUtmReference } from '@/lib/tracking';

const FAQ_QUESTION_MAX = 120;

/** Onde o clique aconteceu: rodapé, header ou seção (id). */
function placeOf(el: Element): string {
  if (el.closest('.footer')) return 'footer';
  if (el.closest('.header')) return 'header';
  return el.closest('section')?.id || '';
}

// Cliques: data-cta = botão de WhatsApp (conversão); data-track = demais
function handleClick(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest<HTMLElement>('[data-cta],[data-track]');
  if (!el) return;

  const cta = el.getAttribute('data-cta');
  if (cta) {
    if (el instanceof HTMLAnchorElement) el.href = withUtmReference(el.href);
    track('click_whatsapp', { cta_id: cta });
    return;
  }
  const ctaId = el.getAttribute('data-cta-id');
  track(el.getAttribute('data-track') || 'click_cta', ctaId ? { cta_id: ctaId } : {}, placeOf(el));
}

// FAQ: o clique no <summary> acontece antes de o <details> abrir
function handleFaqClick(e: MouseEvent) {
  const summary = (e.target as Element | null)?.closest('.faq summary');
  if (!summary || (summary.parentElement as HTMLDetailsElement | null)?.open) return;
  // [data-faq-q] = só o texto da pergunta (sem o número decorativo)
  const source = summary.querySelector('[data-faq-q]') || summary;
  const question = (source.textContent || '').replace(/\s+/g, ' ').trim().slice(0, FAQ_QUESTION_MAX);
  track('faq_open', { faq_question: question });
}

function watchScroll(): () => void {
  const fired = new Set<number>();
  let ticking = false;
  const check = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 100;
    SCROLL_MARKS.forEach((m) => {
      if (!fired.has(m) && pct >= m - 1) {
        fired.add(m);
        track(`scroll_${m}`, { percent_scrolled: m });
      }
    });
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(check);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

// Seção vista: quando cruza o meio da tela, uma vez por seção
function watchSections(): () => void {
  if (!('IntersectionObserver' in window)) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        track('section_view', { section_id: en.target.id });
      });
    },
    { rootMargin: '0px 0px -50% 0px' },
  );
  document.querySelectorAll('#topo, main section[id]').forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Liga os eventos automáticos da página (delegação no document: funciona com qualquer seção). */
export function TrackingEvents() {
  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleFaqClick);
    const stopScroll = watchScroll();
    const stopSections = watchSections();
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleFaqClick);
      stopScroll();
      stopSections();
    };
  }, []);
  return null;
}
