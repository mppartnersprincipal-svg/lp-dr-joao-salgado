'use client';

import { useEffect } from 'react';

const HEADER_OFFSET = -80;
// Só em mouse + sem reduced motion: no celular o scroll nativo já é suave e o Lenis só custaria JS
const SMOOTH_QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Smooth scroll (Lenis), carregado sob demanda e só no desktop. */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(SMOOTH_QUERY).matches) return;
    let lenis: { destroy: () => void } | null = null;
    let cancelled = false;

    // Depois que a página ficou ociosa: não compete com o carregamento inicial
    const start = () =>
      import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: HEADER_OFFSET } });
      });
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    idle(() => void start());

    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, []);

  return null;
}
