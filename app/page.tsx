import { ComoFunciona } from '@/components/sections/ComoFunciona';
import { Credenciais } from '@/components/sections/Credenciais';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Diferenciais } from '@/components/sections/Diferenciais';
import { Facetas } from '@/components/sections/Facetas';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Identificacao } from '@/components/sections/Identificacao';
import { Sobre } from '@/components/sections/Sobre';
import { Tratamentos } from '@/components/sections/Tratamentos';
import { ConsentBanner } from '@/components/ui/ConsentBanner';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

// Ordem das seções = funil do /dashboard (server/analytics/report.mjs → SECTIONS.home).
// "casos" (antes e depois) entra aqui quando FLAGS.casos for liberado com autorização dos pacientes.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Credenciais />
        <Identificacao />
        <Facetas />
        <ComoFunciona />
        <Sobre />
        <Diferenciais />
        <Tratamentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ConsentBanner />
    </>
  );
}
