// Gera as fotos da LP a partir dos originais do cliente (Fotos/, fora do git).
// Uso: npm run images
// Saída: assets/fotos/*.webp (importadas pelo next/image) e app/opengraph-image.jpg (1200×630).
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'fotos');
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 80;

// arquivo original → nome usado no código
const FOTOS = {
  '2.jpg': 'dr-joao-lupa',          // hero
  '10.jpg': 'dr-joao-clinica',      // sobre
  '9.jpg': 'dr-joao-clinica-sorrindo',
  '8.jpg': 'dr-joao-xadrez',        // planejamento
  '6.jpg': 'dr-joao-xadrez-sorrindo', // galeria do consultório
  '7.jpg': 'dr-joao-consultorio',   // acolhimento
  '1.jpg': 'dr-joao-retrato',       // CTA final
  '5.jpg': 'dr-joao-recepcao',
};

async function findSourceDir() {
  const base = path.join(ROOT, 'Fotos');
  const dirs = await readdir(base, { withFileTypes: true });
  const sub = dirs.find((d) => d.isDirectory());
  if (!sub) throw new Error(`Nenhuma pasta de fotos encontrada em ${base}`);
  return path.join(base, sub.name);
}

async function main() {
  const src = await findSourceDir();
  await mkdir(OUT_DIR, { recursive: true });

  for (const [file, name] of Object.entries(FOTOS)) {
    await sharp(path.join(src, file))
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(OUT_DIR, `${name}.webp`));
    console.info(`✓ ${file} → assets/fotos/${name}.webp`);
  }

  // Open Graph: retrato à direita sobre o fundo da marca
  const OG_W = 1200;
  const OG_H = 630;
  const retrato = await sharp(path.join(src, '2.jpg'))
    .resize({ width: 520, height: OG_H, fit: 'cover', position: 'top' })
    .toBuffer();
  await sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: '#0E0B09' } })
    .composite([{ input: retrato, left: OG_W - 520, top: 0 }])
    .jpeg({ quality: 82 })
    .toFile(path.join(ROOT, 'app', 'opengraph-image.jpg'));
  console.info('✓ app/opengraph-image.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
