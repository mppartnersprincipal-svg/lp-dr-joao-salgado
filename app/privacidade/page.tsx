import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, DOCTOR } from '@/config/content';

export const metadata: Metadata = {
  title: `Política de privacidade | ${DOCTOR.name}`,
  description: `Como a página do ${DOCTOR.name} trata dados de navegação e cookies, conforme a LGPD.`,
  alternates: { canonical: '/privacidade' },
  robots: { index: false, follow: true },
};

// TODO(PREENCHER): razão social/CNPJ do controlador e e-mail de contato do encarregado (LGPD)
export default function Privacidade() {
  return (
    <main className="container-lp max-w-3xl py-24 md:py-32">
      <Link href="/" className="eyebrow text-ouro hover:text-ouro-claro">
        ← Voltar
      </Link>
      <h1 className="titulo-secao mt-8 text-marfim">Política de privacidade</h1>

      <div className="mt-10 flex flex-col gap-8 leading-relaxed text-areia [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-marfim">
        <section>
          <h2>Quem somos</h2>
          <p className="mt-3">
            Esta página é do {DOCTOR.name}, {DOCTOR.profession.toLowerCase()} ({DOCTOR.cro}), em {CONTACT.address.city}/
            {CONTACT.address.state}.
          </p>
        </section>

        <section>
          <h2>Quais dados coletamos</h2>
          <p className="mt-3">
            Não pedimos nome, telefone ou e-mail nesta página. O contato acontece pelo WhatsApp, por iniciativa sua.
            Coletamos apenas dados de navegação de forma anônima: páginas e seções visualizadas, cliques nos botões,
            tempo na página, tipo de dispositivo, cidade aproximada e a origem da visita (por exemplo, um anúncio).
          </p>
        </section>

        <section>
          <h2>Cookies e ferramentas</h2>
          <p className="mt-3">
            Usamos o Google Tag Manager, o Google Analytics e ferramentas de mensuração de anúncios (Google Ads e
            Meta) para entender como a página é usada e medir o resultado das campanhas. Esses cookies só são
            ativados se você clicar em &quot;Aceitar&quot; no aviso de cookies. Com &quot;Só o essencial&quot;, a
            página continua funcionando e apenas estatísticas anônimas e agregadas são registradas.
          </p>
        </section>

        <section>
          <h2>Seus direitos</h2>
          <p className="mt-3">
            Você pode mudar sua escolha a qualquer momento limpando os dados do site no seu navegador. Para dúvidas
            sobre privacidade, fale conosco pelo Instagram{' '}
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-ouro underline underline-offset-4">
              {CONTACT.instagramHandle}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
