// Lista os dados ainda marcados como [PREENCHER] / TODO(PREENCHER) antes de publicar.
// Roda no `prebuild` (só avisa, não quebra o build). Use `npm run check:placeholders -- --strict` para falhar.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILES = ['config/content.ts', 'app/privacidade/page.tsx'];
const PATTERN = /TODO\(PREENCHER\)[^\n]*/g;

async function main() {
  const pending = [];
  for (const file of FILES) {
    const text = await readFile(path.join(ROOT, file), 'utf8');
    for (const m of text.matchAll(PATTERN)) pending.push(`${file}: ${m[0].replace('TODO(PREENCHER):', '').trim()}`);
  }
  if (!process.env.NEXT_PUBLIC_GTM_ID) pending.push('env: NEXT_PUBLIC_GTM_ID (sem ele o GTM não carrega)');
  if (!process.env.NEXT_PUBLIC_SITE_URL) pending.push('env: NEXT_PUBLIC_SITE_URL (canonical, OG e Schema)');

  if (!pending.length) return console.info('✓ Nenhum dado pendente.');
  console.warn(`\n⚠ ${pending.length} dado(s) pendente(s) antes de publicar:\n  - ${pending.join('\n  - ')}\n`);
  // Build de produção na Vercel sem domínio poria localhost no canonical/OG/Schema: falha.
  if (process.env.VERCEL_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
    console.error('✖ NEXT_PUBLIC_SITE_URL é obrigatório no deploy de produção.');
    process.exit(1);
  }
  if (process.argv.includes('--strict')) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
