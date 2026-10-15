import { CREDENCIAIS } from '@/config/content';
import { CountUp } from '@/components/ui/CountUp';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

const STAGGER_MS = 90;

export function Credenciais() {
  return (
    <section id="credenciais" aria-label="Credenciais do Dr. João Salgado" className="bg-superficie">
      <ul className="container-lp grid grid-cols-2 lg:grid-cols-4">
        {CREDENCIAIS.map((item, i) => (
          <li
            key={item.label}
            className={`border-ouro/15 py-8 md:py-12 ${i % 2 === 1 ? 'border-l pl-5 md:pl-8' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
              i === 2 ? 'lg:border-l lg:pl-8' : ''
            }`}
          >
            <Reveal delay={i * STAGGER_MS} className="group">
              <Icon name={item.icon} className="h-6 w-6 text-ouro transition-transform duration-500 group-hover:-translate-y-1" />
              <p className="mt-4 font-serif text-3xl font-light text-ouro-claro md:text-[2.6rem]">
                {item.count ? <CountUp to={item.count} prefix={item.prefix} /> : item.value}
              </p>
              <p className="eyebrow mt-2 text-areia">{item.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
