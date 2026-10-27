// Imagens estáticas da LP (import estático → next/image gera tamanhos, blur e dimensões).
// fotos/   = fotos reais do Dr. João (npm run images a partir de Fotos/)
// servicos/ = imagens ILUSTRATIVAS geradas por IA (Higgsfield), sem pacientes e sem rostos:
//             nunca usar como "resultado" ou "antes e depois".
import clinica from '@/assets/fotos/dr-joao-clinica.webp';
import clinicaSorrindo from '@/assets/fotos/dr-joao-clinica-sorrindo.webp';
import consultorio from '@/assets/fotos/dr-joao-consultorio.webp';
import lupa from '@/assets/fotos/dr-joao-lupa.webp';
import recepcao from '@/assets/fotos/dr-joao-recepcao.webp';
import retrato from '@/assets/fotos/dr-joao-retrato.webp';
import xadrez from '@/assets/fotos/dr-joao-xadrez.webp';
import xadrezSorrindo from '@/assets/fotos/dr-joao-xadrez-sorrindo.webp';
import alinhador from '@/assets/servicos/alinhador.webp';
import escala from '@/assets/servicos/escala-cor.webp';
import facetas from '@/assets/servicos/facetas.webp';
import implante from '@/assets/servicos/implante.webp';

export const FOTOS = { clinica, clinicaSorrindo, consultorio, lupa, recepcao, retrato, xadrez, xadrezSorrindo } as const;

export const SERVICOS = { alinhador, escala, facetas, implante } as const;

/**
 * Imagem de cada etapa do "Como funciona": todas fotos reais do Dr. João (out/2026).
 * As ilustrações de planejamento, escala de cor e laboratório saíram daqui: o Google Ads pesa foto real
 * na experiência da página. Quando houver fotos do consultório (cadeira, scanner, escala), trocar aqui.
 */
export const ETAPAS = {
  consultorio: { src: consultorio, alt: 'Dr. João Salgado conversando no consultório, com o notebook à frente', ilustrativa: false },
  planejamento: { src: xadrez, alt: 'Dr. João Salgado concentrado em uma jogada de xadrez', ilustrativa: false },
  recepcao: { src: recepcao, alt: 'Dr. João Salgado na recepção da clínica Allstima, em Goiânia', ilustrativa: false },
  lupa: { src: lupa, alt: 'Dr. João Salgado com as lupas de aumento usadas nos procedimentos', ilustrativa: false },
  acompanhamento: { src: clinicaSorrindo, alt: 'Dr. João Salgado sorrindo na clínica', ilustrativa: false },
} as const;

export type EtapaImagem = keyof typeof ETAPAS;
