import Image from 'next/image';
import { DIFERENCIAIS } from '@/config/content';
import fotoConsultorio from '@/assets/fotos/dr-joao-consultorio.webp';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STAGGER_MS = 90;

export function Diferenciais() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-t" className="secao bg-creme text-tinta">
      <div className="container-lp">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading id="diferenciais" eyebrow={DIFERENCIAIS.eyebrow} title={DIFERENCIAIS.title} tone="claro" />
          </div>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src={fotoConsultorio}
                alt="Dr. João Salgado sorrindo no consultório, ao lado do notebook"
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="h-full w-full object-cover object-[50%_35%]"
              />
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px bg-tinta/12 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIAIS.items.map((item, i) => (
            <li key={item.title} className="bg-creme">
              <Reveal delay={i * STAGGER_MS} className="h-full p-6 md:p-8">
                <span aria-hidden="true" className="block h-px w-10 bg-ouro-escuro" />
                <h3 className="mt-6 font-serif text-2xl text-tinta">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-tinta/75">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
