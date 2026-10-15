import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { CONTACT, DOCTOR, SITE, isFilled } from '@/config/content';
import { TrackingProvider } from '@/components/tracking/TrackingProvider';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import './globals.css';

// next/font baixa as fontes no build e serve do próprio domínio (sem requisição ao Google em produção)
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: '/',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0e0b09',
  colorScheme: 'dark',
};

function jsonLd() {
  const { address } = CONTACT;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE.url}/#clinica`,
    name: `${DOCTOR.name} | Facetas de Porcelana`,
    url: SITE.url,
    image: `${SITE.url}/opengraph-image.jpg`,
    description: SITE.description,
    ...(isFilled(CONTACT.whatsapp) && { telephone: `+${CONTACT.whatsapp}` }),
    address: {
      '@type': 'PostalAddress',
      ...(isFilled(address.street) && { streetAddress: address.street }),
      ...(isFilled(address.postalCode) && { postalCode: address.postalCode }),
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'City', name: 'Goiânia' },
    sameAs: [CONTACT.instagram],
    employee: {
      '@type': 'Person',
      name: DOCTOR.name,
      jobTitle: DOCTOR.profession,
      identifier: DOCTOR.cro,
    },
    availableService: ['Facetas de porcelana', 'Implantes dentários', 'Aparelhos ortodônticos'].map((name) => ({
      '@type': 'MedicalProcedure',
      name,
    })),
  };
  // Escapa "<" para o JSON não fechar a tag <script> (recomendação do guia de JSON-LD do Next)
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <body className="min-h-dvh">
        {/* sem JS, os blocos com animação de entrada aparecem direto */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
        <TrackingProvider>
          <SmoothScroll />
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
