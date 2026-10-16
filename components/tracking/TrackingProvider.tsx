import Script from 'next/script';
import type { ReactNode } from 'react';
import { TRACKING } from '@/config/content';
import { CONSENT_KEY, validGtmId } from '@/lib/tracking';
import { TrackingEvents } from './TrackingEvents';
import { UTMCapture } from './UTMCapture';

interface TrackingProviderProps {
  children: ReactNode;
}

const GTM_ID = validGtmId(process.env.NEXT_PUBLIC_GTM_ID || TRACKING.gtmId);

// Consent Mode v2 (LGPD): tudo "denied" até o visitante aceitar no banner; quem já aceitou antes
// entra como "granted". Depois disso o GTM carrega. Script inline porque precisa rodar ANTES do gtm.js.
function gtmBootstrap(gtmId: string): string {
  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}
var g=c==='accepted'?'granted':'denied';
gtag('consent','default',{analytics_storage:g,ad_storage:g,ad_user_data:g,ad_personalization:g,wait_for_update:500});
dataLayer.push({page_type:location.pathname==='/'?'home':'outra'});
dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${gtmId}';
document.head.appendChild(s);`;
}

/**
 * Wrapper de rastreamento da LP (padrão M|P):
 * - GTM (GA4, Google Ads e Meta Pixel são configurados lá, nunca direto aqui)
 * - coletor first-party do /dashboard (public/js/tracker.js)
 * - eventos de clique/scroll/seção/FAQ e captura de UTMs
 */
export function TrackingProvider({ children }: TrackingProviderProps) {
  return (
    <>
      {GTM_ID && (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
          <Script id="gtm" strategy="afterInteractive">
            {gtmBootstrap(GTM_ID)}
          </Script>
        </>
      )}
      <Script src="/js/tracker.js" strategy="afterInteractive" />
      <UTMCapture />
      <TrackingEvents />
      {children}
    </>
  );
}
