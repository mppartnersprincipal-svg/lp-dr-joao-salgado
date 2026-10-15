'use client';

import { useEffect } from 'react';
import { Globals } from '@react-spring/web';
import Lenis from 'lenis';

const HEADER_OFFSET = -80;

/** Smooth scroll (Lenis) + respeito a prefers-reduced-motion em todas as animações react-spring. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    Globals.assign({ skipAnimation: reduce });
    if (reduce) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: HEADER_OFFSET } });
    return () => lenis.destroy();
  }, []);

  return null;
}
