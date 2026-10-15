'use client';

import { useEffect } from 'react';

/**
 * Único componente cliente que liga TODAS as micro-interações da página por delegação
 * (em vez de um componente React + react-spring por card, que custava ~2s de JS no celular):
 *
 * - [data-reveal]     entra com fade + slide-up ao aparecer (classe .is-visible; animação em CSS)
 * - [data-spotlight]  brilho que segue o mouse (variáveis --mx/--my)
 * - [data-tilt]       inclinação 3D seguindo o mouse (desktop)
 * - [data-parallax]   deslocamento relativo ao centro da tela (desktop, sem reduced motion)
 * - [data-count]      número que conta até o valor quando aparece
 */

const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
const COUNT_MS = 1600;

function watchReveals(reduce: boolean): () => void {
  const show = (el: Element) => el.classList.add('is-visible');
  if (reduce || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(show);
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        show(en.target);
        io.unobserve(en.target);
      }),
    { rootMargin: '0px 0px -10% 0px' },
  );
  const observeAll = (root: ParentNode) =>
    root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
  observeAll(document);
  // Blocos que aparecem depois (troca de etapa do quiz, layout do "Como funciona")
  const mo = new MutationObserver((records) =>
    records.forEach((r) =>
      r.addedNodes.forEach((n) => {
        if (!(n instanceof Element)) return;
        if (n.matches('[data-reveal]')) io.observe(n);
        observeAll(n);
      }),
    ),
  );
  mo.observe(document.body, { childList: true, subtree: true });
  return () => {
    io.disconnect();
    mo.disconnect();
  };
}

function watchCounters(reduce: boolean): () => void {
  if (reduce) return () => {};
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / COUNT_MS);
      el.textContent = `${prefix}${Math.round(to * (1 - Math.pow(1 - k, 3)))}`;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) =>
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      run(en.target as HTMLElement);
    }),
  );
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function watchPointer(): () => void {
  const desktop = window.matchMedia(DESKTOP_MOTION);
  let tilted: HTMLElement | null = null;
  const resetTilt = () => {
    if (tilted) tilted.style.transform = '';
    tilted = null;
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const target = e.target as Element | null;

    const spot = target?.closest<HTMLElement>('[data-spotlight]');
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--my', `${e.clientY - r.top}px`);
    }

    const tilt = target?.closest<HTMLElement>('[data-tilt]') || null;
    if (tilt !== tilted) resetTilt();
    if (tilt && desktop.matches) {
      const r = tilt.getBoundingClientRect();
      const max = Number(tilt.dataset.tilt) || 5;
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(1100px) rotateX(${(-y * max * 2).toFixed(2)}deg) rotateY(${(x * max * 2).toFixed(2)}deg) scale(1.015)`;
      tilted = tilt;
    }
  };
  document.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', resetTilt);
  return () => {
    document.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', resetTilt);
  };
}

function watchParallax(): () => void {
  const mq = window.matchMedia(DESKTOP_MOTION);
  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      if (!mq.matches) {
        el.style.transform = '';
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return; // fora da tela: não mexe
      const offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  mq.addEventListener('change', schedule);
  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    mq.removeEventListener('change', schedule);
    cancelAnimationFrame(frame);
  };
}

export function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stops = [watchReveals(reduce), watchCounters(reduce), watchPointer(), watchParallax()];
    return () => stops.forEach((stop) => stop());
  }, []);
  return null;
}
