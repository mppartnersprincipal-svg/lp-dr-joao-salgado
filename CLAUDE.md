@AGENTS.md

# LP Dr. João Salgado: Facetas de Porcelana (Goiânia)

Contexto completo do cliente (regras do CRO, estratégia, público): `C:\Users\User\Documents\Clientes\João Salgado\CLAUDE.md`. **Ler antes de mexer na copy.**

## Cliente

| Campo | Valor |
|---|---|
| Cliente | Dr. João Salgado, cirurgião-dentista (CRO-GO 6835, conforme a bio do Instagram; confirmar) |
| Segmento | Odontologia estética, público A/B de Goiânia |
| Objetivo | Leads de **facetas de porcelana** via WhatsApp (tráfego pago Google + Meta) |
| CTA | "Agendar minha avaliação" → WhatsApp |
| WhatsApp | `[PREENCHER]` em `config/content.ts` |
| URL | `[PREENCHER]` → `NEXT_PUBLIC_SITE_URL` |

## Regras inegociáveis (CFO / cliente)
- Nada de preço, parcelamento, desconto, "grátis" ou condição de pagamento.
- Nada de promessa de resultado, garantia de durabilidade ou superlativo sem prova.
- Nunca inventar dado factual: o que falta fica `[PREENCHER]` (o `npm run build` lista as pendências).
- Antes e depois só com autorização escrita do paciente (`FLAGS.casos`). A foto `3.jpg` (com paciente) fica fora.
- Não associar ao Dr. Henrique Tavares.
- `Briefing/` contém senhas: **nunca versionar** (está no .gitignore, junto com `Fotos/`).

## Stack
Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · `@react-spring/web` · Lenis · Vercel. Next 16 tem mudanças: ler `node_modules/next/dist/docs/` antes de usar APIs novas.

## Estrutura
```
config/content.ts        ← TODA a copy, contatos, cta_ids e flags
app/                     ← layout (fontes, metadata, JSON-LD Dentist), page, privacidade, robots, sitemap, api/*
components/sections/     ← uma seção por arquivo, na ordem da página
components/ui/           ← WhatsAppButton, Reveal, SmoothScroll, ParallaxImage, ConsentBanner, WhatsAppFloat...
components/tracking/     ← TrackingProvider (GTM + Consent Mode v2), TrackingEvents, UTMCapture
lib/tracking.ts          ← helpers do dataLayer
server/analytics/        ← libs do painel (template lp-tracking-dashboard, portado para route handlers)
public/js/tracker.js     ← coletor first-party do /dashboard
public/dashboard/        ← painel estático (rewrite /dashboard)
assets/fotos/            ← WebP gerados por `npm run images` a partir de Fotos/
```

## Design
- Fundo preto-café `--cor-fundo #0E0B09`, superfícies `#1B140F` / `#2E241F`, dourado do monograma `--cor-primaria #C8A46B` (só CTA e detalhes), seções claras `#F4EFE8`.
- Títulos: Cormorant Garamond 300 (serifada fina, como nos posts). Corpo e rótulos: Jost.
- Molduras em linha fina dourada, grão sutil, monograma JS (recriado; trocar pelo vetor oficial).
- Animações: fade + slide-up ao rolar (react-spring `useInView`), H1 linha a linha (CSS), parallax só no desktop, botões scale + sombra. Respeita `prefers-reduced-motion`.

## Seções (ids = funil do /dashboard)
`topo` · `credenciais` · `identificacao` · `facetas` · `avaliacao` (quiz) · `como-funciona` · `sobre` · `consultorio` (galeria) · `diferenciais` · `tratamentos` (cards `#implantes`, `#ortodontia`) · `faq` · `contato`. Se mudar a ordem, atualizar `SECTIONS.home` em `server/analytics/report.mjs` e `SECTION` em `public/dashboard/app.js`.

## Comandos
```bash
npm run dev          # desenvolvimento
npm run build        # build (lista dados [PREENCHER] pendentes)
npm run images       # regenera assets/fotos/*.webp e app/opengraph-image.jpg a partir de Fotos/
npm test             # testes das libs do painel (node:test)
npm run lint
```

## Trackeamento (obrigatório)
Ver README.md (eventos, cta_ids, GTM) e DASHBOARD.md (painel, banco, variáveis).

## Deploy
Vercel, branch `main`. Variáveis em `.env.example`.
