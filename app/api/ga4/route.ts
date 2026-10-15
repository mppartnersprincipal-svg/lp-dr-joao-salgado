// GET /api/ga4?de=YYYY-MM-DD&ate=YYYY-MM-DD → relatório da propriedade GA4 (só leitura).
// Separado de /api/dashboard: se o GA4 demorar ou falhar, o resto do painel não espera nem zera.
import { range } from '@/server/analytics/period.mjs';
import { fetchGa4Report } from '@/server/analytics/ga4.mjs';
import { isAuthorized, json, queryToObject, unauthorized } from '@/server/analytics/http';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const r = range(queryToObject(request.url));
  // Sempre 200: o estado (ready | not_configured | error) vai no corpo, com mensagem segura.
  return json(await fetchGa4Report({ from: r.from, to: r.to, prevFrom: r.prevFrom, prevTo: r.prevTo }));
}
