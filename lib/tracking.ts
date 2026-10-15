/**
 * Helpers de dataLayer (padrão M|P, portado de lp-tracking-dashboard/references/page-tracking.js).
 *
 * Regra de ouro: GA4, Google Ads e Meta Pixel SÓ pelo GTM. Esta página apenas empurra eventos
 * para o dataLayer; nada de gtag/pixel direto (contaria em dobro).
 *
 * Eventos: click_whatsapp (cta_id) · click_cta · click_phone · click_maps · click_instagram
 *          · faq_open · scroll_25/50/75/100 · section_view · interact_3d (faceta 3D girada)
 * UTMs da URL de entrada ficam na sessão e seguem junto em cada evento.
 * Cliques e FAQ também vão para o coletor do /dashboard (public/js/tracker.js → window.jsCollect).
 */

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
export const SCROLL_MARKS = [25, 50, 75, 100] as const;
export const CONSENT_KEY = 'js-consent'; // mesma chave lida por public/js/tracker.js
const UTM_STORAGE_KEY = 'js_utms';
const UTM_MAX_LENGTH = 100;

export type ConsentChoice = 'accepted' | 'essential';
export type Utms = Partial<Record<(typeof UTM_KEYS)[number], string>>;
type Params = Record<string, string | number | undefined>;

// O dataLayer do GTM guarda o último valor de cada chave: zerar a cada push evita que um
// evento herde o parâmetro do anterior.
const RESET: Params = {
  cta_id: undefined,
  section_id: undefined,
  percent_scrolled: undefined,
  faq_question: undefined,
  quiz_incomodos: undefined,
  quiz_quando: undefined,
};

// Nome do evento no coletor do /dashboard
const COLLECT: Record<string, string> = {
  click_whatsapp: 'whatsapp_click',
  click_phone: 'phone_click',
  click_cta: 'cta_click',
  click_maps: 'cta_click',
  click_instagram: 'cta_click',
  faq_open: 'faq_open',
  quiz_complete: 'cta_click',
};
const COLLECT_LABEL: Record<string, string> = {
  quiz_complete: 'pré-avaliação concluída',
  click_phone: 'telefone',
  click_maps: 'maps',
  click_instagram: 'instagram',
};

declare global {
  interface Window {
    dataLayer: unknown[];
    jsCollect?: (name: string, props: Record<string, unknown>) => void;
  }
}

function dataLayer(): unknown[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** Guarda as UTMs da URL de entrada (só sobrescreve se a URL trouxer alguma). */
export function captureUtms(search: string): void {
  const qs = new URLSearchParams(search);
  const fromUrl: Utms = {};
  UTM_KEYS.forEach((k) => {
    const v = qs.get(k);
    if (v) fromUrl[k] = v.slice(0, UTM_MAX_LENGTH);
  });
  if (Object.keys(fromUrl).length) safeSession()?.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
}

export function readUtms(): Utms {
  try {
    return JSON.parse(safeSession()?.getItem(UTM_STORAGE_KEY) || '{}') as Utms;
  } catch {
    return {};
  }
}

/** Envia o evento ao dataLayer (GTM) e espelha no coletor do /dashboard. */
export function track(name: string, params: Params = {}, where = ''): void {
  dataLayer().push({ event: name, ...RESET, ...readUtms(), ...params });

  const collected = COLLECT[name];
  if (!collected || !window.jsCollect) return;
  const props =
    name === 'faq_open'
      ? params
      : { cta_location: params.cta_id || `${COLLECT_LABEL[name] || name}${where ? ` · ${where}` : ''}` };
  window.jsCollect(collected, props);
}

/**
 * Acrescenta a origem da campanha na mensagem do WhatsApp (ex.: "(ref: google / cpc / facetas)"),
 * para o Dr. João saber qual anúncio trouxe o paciente. Sem UTMs, devolve o link original.
 */
export function withUtmReference(href: string): string {
  const utms = readUtms();
  const parts = [utms.utm_source, utms.utm_medium, utms.utm_campaign]
    .map((v) => (v || '').replace(/[^\p{L}\p{N} _.\-]/gu, '').slice(0, 40))
    .filter(Boolean);
  if (!parts.length) return href;
  try {
    const url = new URL(href);
    const text = url.searchParams.get('text') || '';
    url.searchParams.set('text', `${text}\n\n(ref: ${parts.join(' / ')})`);
    return url.toString();
  } catch {
    return href;
  }
}

/** Consent Mode v2: atualiza a decisão do visitante (o padrão "denied" é definido antes do GTM). */
export function updateConsent(choice: ConsentChoice): void {
  const granted = choice === 'accepted' ? 'granted' : 'denied';
  // O GTM só reconhece comandos de consentimento no formato `arguments` (igual ao gtag)
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer().push(arguments);
  } as (...args: unknown[]) => void;
  gtag('consent', 'update', {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });
  dataLayer().push({ event: 'consent_update', consent_choice: choice });
}

export function readConsent(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'essential' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // modo privado / storage bloqueado: a decisão vale só para esta página
  }
  updateConsent(choice);
}

/** GTM ID válido (recusa vazio e placeholder GTM-XXXXXXX). */
export function validGtmId(id: string | undefined): string | null {
  return id && /^GTM-[A-Z0-9]{5,}$/.test(id) && !/^GTM-X+$/.test(id) ? id : null;
}
