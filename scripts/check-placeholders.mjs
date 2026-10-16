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
  // GTM e domínio têm padrão em config/content.ts (TRACKING.gtmId e DOMINIO_PRODUCAO); as envs só sobrescrevem.

  if (!pending.length) return console.info('✓ Nenhum dado pendente.');
  console.warn(`\n⚠ ${pending.length} dado(s) pendente(s) antes de publicar:\n  - ${pending.join('\n  - ')}\n`);
  if (process.argv.includes('--strict')) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
