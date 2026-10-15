import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  tone?: 'escuro' | 'claro';
  align?: 'esquerda' | 'centro';
}

/** Eyebrow + H2 + intro. O id do H2 (`<id>-t`) liga a seção via aria-labelledby. */
export function SectionHeading({ id, eyebrow, title, intro, tone = 'escuro', align = 'esquerda' }: SectionHeadingProps) {
  const isClaro = tone === 'claro';
  const alignClass = align === 'centro' ? 'mx-auto text-center items-center' : '';
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-5 ${alignClass}`}>
      <p className={`eyebrow flex items-center gap-3 ${isClaro ? 'text-ouro-escuro' : 'text-ouro'}`}>
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2 id={`${id}-t`} className={`titulo-secao ${isClaro ? 'text-tinta' : 'text-marfim'}`}>
        {title}
      </h2>
      {intro && (
        <p className={`text-base leading-relaxed md:text-lg ${isClaro ? 'text-tinta/75' : 'text-areia'}`}>{intro}</p>
      )}
    </Reveal>
  );
}
