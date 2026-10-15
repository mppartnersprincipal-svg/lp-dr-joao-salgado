// Ponte entre os Route Handlers do Next e as libs do painel (portadas do template M|P, que usam
// objetos simples em vez de Request/Response).
import { verifyToken } from './auth.mjs';

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };

/** Cabeçalhos como objeto simples (chaves em minúsculas), formato esperado por payload.mjs. */
export function headersToObject(headers: Headers): Record<string, string> {
  return Object.fromEntries(headers.entries());
}

/** Query string como objeto simples (?de=...&ate=...), formato esperado por period.mjs. */
export function queryToObject(url: string): Record<string, string> {
  return Object.fromEntries(new URL(url).searchParams.entries());
}

export function isAuthorized(request: Request): boolean {
  const h = request.headers.get('authorization') || '';
  return verifyToken(h.startsWith('Bearer ') ? h.slice(7) : '');
}

export function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: NO_STORE });
}

export function empty(status = 204): Response {
  return new Response(null, { status, headers: NO_STORE });
}

export const unauthorized = () => json({ error: 'Sessão expirada. Entre novamente.' }, 401);

/** Corpo JSON ou null (nunca lança). */
export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
