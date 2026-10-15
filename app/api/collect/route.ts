// POST /api/collect — recebe lotes anônimos do coletor (public/js/tracker.js) e grava no Supabase.
// Sem IP, sem cookies. Cidade/região vêm dos cabeçalhos de geolocalização da Vercel.
import { configured, rpc, insert } from '@/server/analytics/db.mjs';
import { isBotUA } from '@/server/analytics/classify.mjs';
import { buildBatch } from '@/server/analytics/payload.mjs';
import { empty, headersToObject, readJson } from '@/server/analytics/http';

const MAX_BODY_BYTES = 32 * 1024; // um lote tem no máximo 50 eventos curtos

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) return empty(413);
  if (!configured()) return empty(); // sem banco configurado: descarta em silêncio
  if (isBotUA(request.headers.get('user-agent') || '')) return empty();

  const batch = buildBatch(await readJson(request), { headers: headersToObject(request.headers) });
  if (!batch.ok) return empty(400);

  try {
    await rpc('joaosalgado_upsert_session', { p: batch.session });
    if (batch.rows.length) await insert('joaosalgado_events', batch.rows);
  } catch (err) {
    console.error('[collect]', err instanceof Error ? err.message : err);
  }
  return empty(); // nunca quebra a página por causa de analytics
}
