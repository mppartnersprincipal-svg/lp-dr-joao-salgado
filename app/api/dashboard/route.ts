// GET /api/dashboard?de=YYYY-MM-DD&ate=YYYY-MM-DD&origem=<canal>&jornadas=conv|todas
// GET /api/dashboard?live=1  → últimos eventos (feed ao vivo)
// Autenticação: Authorization: Bearer <token de /api/login>
// O Google Ads e o GA4 ficam em rotas separadas (não seguram o painel).
import { configured } from '@/server/analytics/db.mjs';
import { live, report } from '@/server/analytics/dashboard-data.mjs';
import { isAuthorized, json, queryToObject, unauthorized } from '@/server/analytics/http';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  if (!configured()) return json({ error: 'Supabase não configurado (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).' }, 503);

  const q = queryToObject(request.url);
  try {
    return json(q.live ? await live() : await report(q));
  } catch (err) {
    console.error('[dashboard]', err instanceof Error ? err.message : err);
    return json({ error: 'Falha ao consultar o banco.' }, 500);
  }
}
