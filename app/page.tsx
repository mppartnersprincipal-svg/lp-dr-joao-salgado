import { Avaliacao } from '@/components/sections/Avaliacao';
import { ComoFunciona } from '@/components/sections/ComoFunciona';
import { Consultorio } from '@/components/sections/Consultorio';
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
import { Marquee } from '@/components/ui/Marquee';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

// Ordem das seções = funil do /dashboard (server/analytics/report.mjs → SECTIONS.home).
// "casos" (antes e depois) entra quando FLAGS.casos for liberado com autorização dos pacientes.
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Credenciais />
        <Identificacao />
        <Facetas />
        <Avaliacao />
        <ComoFunciona />
        <Sobre />
        <Consultorio />
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
