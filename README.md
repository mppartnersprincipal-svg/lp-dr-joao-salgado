# LP Dr. João Salgado: Facetas de Porcelana

Landing page de conversão (WhatsApp) do Dr. João Salgado, Goiânia/GO. Next.js 16 + Tailwind 4 + react-spring + Lenis, deploy na Vercel. Contexto e regras: [CLAUDE.md](CLAUDE.md). Painel de métricas: [DASHBOARD.md](DASHBOARD.md).

```bash
npm install
cp .env.example .env.local   # preencher
npm run dev
```

## Pendências antes de publicar
O `npm run build` lista o que falta (`scripts/check-placeholders.mjs`). Hoje:
- WhatsApp comercial, endereço, horário, link do Maps, responsável técnico (`config/content.ts`)
- Confirmar o CRO-GO 6835 (tirado da bio do Instagram) e validar a copy com o Dr. João (FAQ e etapas do tratamento)
- Domínio (`NEXT_PUBLIC_SITE_URL`) e IDs do GTM/GA4/Google Ads/Pixel
- Monograma/logo em vetor oficial (hoje recriado em SVG)
- Antes e depois: só com autorização escrita dos pacientes (`FLAGS.casos`)

## Rastreamento

Tudo via **GTM** (`NEXT_PUBLIC_GTM_ID`), com Consent Mode v2: tudo `denied` até o visitante aceitar o banner. GA4, conversões do Google Ads e Meta Pixel ficam configurados no GTM. **Nunca** colocar gtag/pixel direto no código.

| Evento (dataLayer) | Quando | Parâmetros |
|---|---|---|
| `click_whatsapp` | clique em qualquer botão de WhatsApp | `cta_id` + UTMs |
| `click_cta` | "Ver como funciona" (hero) | `cta_id=cta_ver_como_funciona` |
| `click_instagram` / `click_maps` / `click_phone` | links do rodapé/contato | — |
| `faq_open` | pergunta do FAQ aberta | `faq_question` |
| `scroll_25/50/75/100` | profundidade de rolagem (1x por página) | `percent_scrolled` |
| `section_view` | seção cruza o meio da tela (1x) | `section_id` |
| `consent_update` | escolha no banner de cookies | `consent_choice` |

Todos os eventos levam `utm_source/medium/campaign/term/content` da URL de entrada (guardados na sessão). A mensagem do WhatsApp ganha `(ref: origem / mídia / campanha)` quando a visita veio de campanha.

**cta_id** (todos únicos): `cta_whatsapp_header`, `cta_whatsapp_hero`, `cta_whatsapp_facetas`, `cta_whatsapp_como_funciona`, `cta_whatsapp_sobre`, `cta_whatsapp_implantes`, `cta_whatsapp_ortodontia`, `cta_whatsapp_faq`, `cta_whatsapp_final`, `cta_whatsapp_footer`, `fab_whatsapp` (desktop), `cta_whatsapp_sticky` (barra fixa no celular).

**URLs finais por serviço** (grupos de anúncio): `/#facetas`, `/#implantes`, `/#ortodontia`.

### JSON de importação do GTM
Com os IDs em mãos:
```bash
python ~/.claude/skills/lp-tracking-dashboard/scripts/gtm_container.py --gtm GTM-XXX --ga4 G-XXX \
  --name dominio.com.br --conv "Clique no Botão de Wpp|<id AW>|<rótulo>|click_whatsapp" --out gtm/GTM-XXX-importar.json
```
GTM → Administrador → Importar contêiner → **Mesclar + Substituir conflitantes** → Visualizar → Publicar. No GA4, marcar `click_whatsapp` como evento-chave.

## Testes
- `npm test`: 83 testes das libs do painel (coleta, relatório, GA4, Google Ads, período).
- Verificado com Playwright (UA de iPhone): 12 cta_ids únicos com UTMs, 4 marcas de scroll, 10 `section_view`, `faq_open`, referência da campanha no link do WhatsApp e lotes chegando em `/api/collect`.
