'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Rotate3d } from 'lucide-react';
import type { FacetaScene } from '@/lib/faceta3d';
import { track } from '@/lib/tracking';

interface Faceta3DProps {
  /** descrição do modelo para leitores de tela */
  label: string;
  hint: string;
  loadingText: string;
  /** mostrado se o navegador não tiver WebGL ou o módulo 3D falhar */
  fallback: ReactNode;
}

type Status = 'aguardando' | 'carregando' | 'pronto' | 'erro';

// Começa a baixar o three.js um pouco antes de o card entrar na tela
const PRELOAD_MARGIN = '300px 0px';

/**
 * Faceta de porcelana em 3D, girável com mouse ou toque.
 * O three.js só é baixado quando a seção se aproxima (import dinâmico) e só desenha enquanto visível.
 */
export function Faceta3D({ label, hint, loadingText, fallback }: Faceta3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('aguardando');
  const [interagiu, setInteragiu] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let scene: FacetaScene | null = null;
    let visible = false;
    let started = false;
    let cancelled = false;
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const load = async () => {
      started = true;
      setStatus('carregando');
      try {
        const { createFacetaScene } = await import('@/lib/faceta3d');
        if (cancelled) return;
        scene = createFacetaScene(mount, {
          animate,
          onFirstInteraction: () => {
            setInteragiu(true);
            track('interact_3d', { section_id: 'facetas' });
          },
        });
        scene.setActive(visible);
        setStatus('pronto');
      } catch {
        // sem WebGL (ou falha ao baixar o chunk): fica a imagem estática
        if (!cancelled) setStatus('erro');
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) void load();
        scene?.setActive(visible);
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(mount);

    return () => {
      cancelled = true;
      observer.disconnect();
      scene?.dispose();
    };
  }, []);

  return (
    <>
      {status === 'erro' && fallback}

      <div
        ref={mountRef}
        role="img"
        aria-label={label}
        className={`absolute inset-x-0 top-0 bottom-24 cursor-grab transition-opacity duration-1000 ease-suave active:cursor-grabbing ${
          status === 'pronto' ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {status === 'carregando' && (
        <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] uppercase tracking-[0.22em] text-areia">
          <span className="animate-pulse">{loadingText}</span>
        </span>
      )}

      {status === 'pronto' && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 bg-fundo/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-ouro-claro backdrop-blur transition-opacity duration-700 ${
            interagiu ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Rotate3d className="h-3.5 w-3.5" strokeWidth={1.5} />
          {hint}
        </span>
      )}
    </>
  );
}
