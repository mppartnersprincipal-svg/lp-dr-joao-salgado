import { DIFERENCIAIS } from '@/config/content';
import { IconBadge } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const STAGGER_MS = 90;

export function Diferenciais() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-t" className="secao bg-creme text-tinta">
      <div className="container-lp">
        <SectionHeading id="diferenciais" eyebrow={DIFERENCIAIS.eyebrow} title={DIFERENCIAIS.title} tone="claro" />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIAIS.items.map((item, i) => (
            <li key={item.title} className={i % 2 === 1 ? 'lg:mt-10' : ''}>
              <Reveal delay={i * STAGGER_MS} className="h-full">
                <SpotlightCard
                  tone="claro"
                  className="h-full border border-tinta/10 bg-white/50 p-7 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-ouro-escuro/40 hover:shadow-[0_30px_60px_-30px_rgba(42,33,27,0.5)]"
                >
                  <div className="flex items-start justify-between">
                    <IconBadge name={item.icon} tone="claro" />
                    <span className="font-serif text-4xl font-light text-tinta/15">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-tinta">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-tinta/75">{item.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
