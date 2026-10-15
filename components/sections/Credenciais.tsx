import { CREDENCIAIS } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';

const STAGGER_MS = 90;

export function Credenciais() {
  return (
    <section id="credenciais" aria-label="Credenciais do Dr. João Salgado" className="border-y border-ouro/15 bg-superficie">
      <ul className="container-lp grid grid-cols-2 lg:grid-cols-4">
        {CREDENCIAIS.map((item, i) => (
          <li
            key={item.value}
            className={`border-ouro/15 py-8 md:py-10 ${i % 2 === 1 ? 'border-l pl-5 md:pl-8' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
              i === 2 ? 'lg:border-l lg:pl-8' : ''
            }`}
          >
            <Reveal delay={i * STAGGER_MS}>
              <p className="font-serif text-3xl font-light text-ouro-claro md:text-4xl">{item.value}</p>
              <p className="eyebrow mt-2 text-areia">{item.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
