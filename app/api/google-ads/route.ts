// GET /api/google-ads?de=YYYY-MM-DD&ate=YYYY-MM-DD → relatório da conta (só leitura).
// Separado de /api/dashboard: se o Google Ads demorar ou falhar, o resto do painel não espera nem zera.
import { range } from '@/server/analytics/period.mjs';
import { fetchGoogleAdsReport } from '@/server/analytics/google-ads.mjs';
import { isAuthorized, json, queryToObject, unauthorized } from '@/server/analytics/http';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const r = range(queryToObject(request.url));
  // Sempre 200: o estado (ready | not_configured | error) vai no corpo, com mensagem segura.
  return json(await fetchGoogleAdsReport({ from: r.from, to: r.to }));
}
