import { useEffect, useRef, type RefObject } from 'react';

/**
 * Progresso de rolagem (0 → 1) de um elemento, gravado como variável CSS (padrão `--p`).
 * Atualiza só o estilo do elemento (sem re-render do React) e roda no máximo 1x por frame.
 *
 * Modos:
 * - `pass`:   0 quando o topo do elemento entra pela base da tela → 1 quando a base sai pelo topo
 * - `reveal`: 0 quando o elemento chega a 85% da tela → 1 quando está bem acima do meio (texto revelado)
 * - `pin`:    0 quando o topo encosta no topo da tela → 1 no fim do trecho fixado (seções sticky)
 */
export type ScrollMode = 'pass' | 'reveal' | 'pin';

interface Options {
  mode?: ScrollMode;
  varName?: string;
  onProgress?: (progress: number) => void;
}

function progressFor(rect: DOMRect, vh: number, mode: ScrollMode): number {
  if (mode === 'pin') return -rect.top / Math.max(1, rect.height - vh);
  if (mode === 'reveal') return (vh * 0.85 - rect.top) / (vh * 0.55 + rect.height * 0.35);
  return (vh - rect.top) / (rect.height + vh);
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>, { mode = 'pass', varName = '--p', onProgress }: Options = {}) {
  // Callback mais recente sem re-assinar os listeners a cada render
  const callbackRef = useRef(onProgress);
  useEffect(() => {
    callbackRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, progressFor(el.getBoundingClientRect(), window.innerHeight, mode)));
      el.style.setProperty(varName, p.toFixed(4));
      callbackRef.current?.(p);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref, mode, varName]);
}
