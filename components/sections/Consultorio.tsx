'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { CONSULTORIO } from '@/config/content';
import { FOTOS } from '@/lib/images';
import { useScrollProgress } from '@/lib/useScrollProgress';
import { SectionHeading } from '@/components/ui/SectionHeading';

const DESKTOP_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * Galeria do consultório (só fotos reais).
 * Desktop: a seção fica fixa e as fotos deslizam na horizontal conforme a rolagem vertical.
 * Celular: carrossel com arraste e snap.
 */
export function Consultorio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useScrollProgress(sectionRef, { mode: 'pin' });

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const measure = () => {
      const track = trackRef.current;
      setIsPinned(mq.matches);
      setDistance(track && mq.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="consultorio"
      aria-labelledby="consultorio-t"
      className="relative bg-fundo"
      style={isPinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={isPinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'secao'}>
        <div className="container-lp flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="consultorio" eyebrow={CONSULTORIO.eyebrow} title={CONSULTORIO.title} />
          <p className="eyebrow flex items-center gap-3 text-areia lg:hidden">
            {CONSULTORIO.hint}
            <MoveRight className="h-4 w-4 text-ouro" aria-hidden="true" />
          </p>
        </div>

        <ul
          ref={trackRef}
          className={`mt-12 flex gap-5 px-5 md:gap-8 md:px-10 ${
            isPinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]'
          }`}
          style={isPinned ? { transform: `translate3d(calc(var(--p, 0) * -${distance}px), 0, 0)` } : undefined}
        >
          {CONSULTORIO.photos.map((photo, i) => (
            <li
              key={photo.key}
              className={`group relative shrink-0 snap-center overflow-hidden ${
                i % 2 === 0 ? 'h-[26rem] w-[19rem] md:h-[34rem] md:w-[26rem]' : 'h-[22rem] w-[17rem] md:mt-16 md:h-[30rem] md:w-[22rem]'
              }`}
            >
              <Image
                src={FOTOS[photo.key]}
                alt={`${photo.caption}: Dr. João Salgado`}
                placeholder="blur"
                sizes="(min-width: 768px) 26rem, 19rem"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-suave group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-fundo/85 via-transparent to-transparent" />
              <p className="absolute inset-x-5 bottom-5 flex items-baseline gap-3 font-serif text-xl text-marfim">
                <span className="eyebrow text-ouro">{String(i + 1).padStart(2, '0')}</span>
                {photo.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
