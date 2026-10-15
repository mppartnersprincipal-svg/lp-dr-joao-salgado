'use client';

import { useEffect } from 'react';
import { captureUtms } from '@/lib/tracking';

/** Guarda as UTMs da URL de entrada na sessão (seguem em todos os eventos e na mensagem do WhatsApp). */
export function UTMCapture() {
  useEffect(() => {
    captureUtms(window.location.search);
  }, []);
  return null;
}
