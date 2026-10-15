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
import laboratorio from '@/assets/servicos/laboratorio.webp';
import planejamento from '@/assets/servicos/planejamento-digital.webp';

export const FOTOS = { clinica, clinicaSorrindo, consultorio, lupa, recepcao, retrato, xadrez, xadrezSorrindo } as const;

export const SERVICOS = { alinhador, escala, facetas, implante, laboratorio, planejamento } as const;

/** Imagem de cada etapa do "Como funciona" (consultório e acompanhamento = fotos reais). */
export const ETAPAS = {
  consultorio: { src: consultorio, alt: 'Dr. João Salgado no consultório', ilustrativa: false },
  planejamento: { src: planejamento, alt: 'Planejamento digital do sorriso em um monitor de consultório', ilustrativa: true },
  escala: { src: escala, alt: 'Escala de cor com tons naturais de porcelana', ilustrativa: true },
  laboratorio: { src: laboratorio, alt: 'Ceramista aplicando porcelana em uma faceta', ilustrativa: true },
  acompanhamento: { src: clinicaSorrindo, alt: 'Dr. João Salgado sorrindo na clínica', ilustrativa: false },
} as const;

export type EtapaImagem = keyof typeof ETAPAS;
