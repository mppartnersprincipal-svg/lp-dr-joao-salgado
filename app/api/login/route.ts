// POST /api/login { password } → { token } (30 dias). Senha única em DASHBOARD_PASSWORD.
import { authConfigured, checkPassword, issueToken } from '@/server/analytics/auth.mjs';
import { json, readJson } from '@/server/analytics/http';

const BRUTE_FORCE_DELAY_MS = 400;

export async function POST(request: Request) {
  if (!authConfigured()) {
    return json({ error: 'Dashboard não configurado: defina DASHBOARD_PASSWORD (≥ 8) e DASHBOARD_SECRET (≥ 16) na Vercel.' }, 503);
  }
  const body = (await readJson(request)) as { password?: unknown } | null;
  // Atraso fixo contra força bruta trivial
  await new Promise((r) => setTimeout(r, BRUTE_FORCE_DELAY_MS));
  if (!body || !checkPassword(body.password)) return json({ error: 'Senha incorreta.' }, 401);
  return json({ token: issueToken() });
}
