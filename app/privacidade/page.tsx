import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, DOCTOR, enderecoCompleto, whatsappLinkWithText } from '@/config/content';

export const metadata: Metadata = {
  title: `Política de privacidade | ${DOCTOR.name}`,
  description: `Como a página do ${DOCTOR.name} trata dados de navegação e cookies, conforme a LGPD.`,
  alternates: { canonical: '/privacidade' },
  robots: { index: false, follow: true },
};

// Controlador = o Dr. João, pessoa física (sem CNPJ). O CPF NÃO vai para a página pública: nome + CRO + endereço
// já identificam o controlador e evitam exposição a fraude. O canal do titular é o próprio Dr. João (WhatsApp/Instagram).
const MENSAGEM_PRIVACIDADE = 'Olá, Dr. João! Tenho uma solicitação sobre os meus dados pessoais e o site.';

/** 5562999675077 → (62) 99967-5077 */
function telefoneLegivel(digitos: string): string {
  const local = digitos.replace(/^55/, '');
  return `(${local.slice(0, 2)}) ${local.slice(2, -4)}-${local.slice(-4)}`;
}

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
            Esta página é do {DOCTOR.name}, {DOCTOR.profession.toLowerCase()} ({DOCTOR.cro}), que atende na clínica em{' '}
            {enderecoCompleto()}. Como pessoa física, o {DOCTOR.name} é o controlador dos dados tratados nesta página,
            nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
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
            Meta) para entender como a página é usada e medir o resultado das campanhas. Esses cookies ficam ativos
            desde a sua entrada na página. Se você clicar em &quot;Só o essencial&quot; no aviso de cookies, eles são
            desligados e a escolha fica salva neste navegador; a página continua funcionando e apenas estatísticas
            anônimas e agregadas são registradas.
          </p>
        </section>

        <section>
          <h2>Seus direitos</h2>
          <p className="mt-3">
            Você pode mudar sua escolha de cookies a qualquer momento limpando os dados do site no seu navegador. Você
            também pode pedir confirmação, acesso, correção ou exclusão dos seus dados, e tirar dúvidas sobre privacidade.
          </p>
        </section>

        <section>
          <h2>Canal de contato</h2>
          <p className="mt-3">
            As solicitações sobre dados pessoais são atendidas pelo próprio {DOCTOR.name}, pelo WhatsApp{' '}
            {/* sem data-cta: não é clique de agendamento e não deve contar como conversão */}
            <a
              href={whatsappLinkWithText(MENSAGEM_PRIVACIDADE)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ouro underline underline-offset-4"
            >
              {telefoneLegivel(CONTACT.whatsapp)}
            </a>{' '}
            ou pelo Instagram{' '}
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
