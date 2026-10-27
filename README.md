# LP Dr. João Salgado: Facetas de Porcelana

Landing page de conversão (WhatsApp) do Dr. João Salgado, Goiânia/GO. Next.js 16 + Tailwind 4 + react-spring + Lenis, deploy na Vercel. Contexto e regras: [CLAUDE.md](CLAUDE.md). Painel de métricas: [DASHBOARD.md](DASHBOARD.md).

```bash
npm install
cp .env.example .env.local   # preencher
npm run dev
```

## Pendências antes de publicar
O `npm run build` lista o que falta (`scripts/check-placeholders.mjs`). Hoje:
- Razão social/CNPJ e e-mail de contato na política de privacidade (`app/privacidade/page.tsx`). Responsável técnico (o próprio Dr. João) e telefone (só WhatsApp) já definidos. Endereço, horário e Maps já seguem o Perfil da Empresa "ALLSTIMA" (27/10/2026)
- Confirmar o CRO-GO 6835 (tirado da bio do Instagram) e validar a copy com o Dr. João (FAQ e etapas do tratamento)
- Meta Pixel (quando houver campanha no Meta; configurar no GTM)
- Monograma/logo em vetor oficial (hoje recriado em SVG)
- Antes e depois: só com autorização escrita dos pacientes (`FLAGS.casos`)
- Avaliações do Google: exibição aprovada pelo Dr. João (`FLAGS.avaliacoes` ligado); falta copiar as avaliações reais em `AVALIACOES_GOOGLE`
- Fotos reais do consultório (cadeira, scanner, escala de cor, sala): ainda só há retratos; as ilustrações das facetas, escala e outros tratamentos seguem com a etiqueta "Imagem ilustrativa"

## Rastreamento

Tudo via **GTM** (`NEXT_PUBLIC_GTM_ID`), com Consent Mode v2 no modelo opt-out (desde 27/10/2026): tudo `granted` desde a entrada e `denied` só para quem escolher "Só o essencial" no banner (escolha salva em `js-consent`). Antes era opt-in e as conversões de quem não clicava no banner não chegavam ao Google Ads. GA4, conversões do Google Ads e Meta Pixel ficam configurados no GTM. **Nunca** colocar gtag/pixel direto no código.

| Evento (dataLayer) | Quando | Parâmetros |
|---|---|---|
| `click_whatsapp` | clique em qualquer botão de WhatsApp | `cta_id` + UTMs |
| `click_cta` | "Ver como funciona" (hero) | `cta_id=cta_ver_como_funciona` |
| `click_instagram` / `click_maps` / `click_phone` | links do rodapé/contato | — |
| `faq_open` | pergunta do FAQ aberta | `faq_question` |
| `scroll_25/50/75/100` | profundidade de rolagem (1x por página) | `percent_scrolled` |
| `section_view` | seção cruza o meio da tela (1x) | `section_id` |
| `quiz_complete` | pré-avaliação respondida | `quiz_incomodos`, `quiz_quando` |
| `interact_3d` | visitante girou a faceta 3D (1x por página) | `section_id=facetas` |
| `consent_update` | escolha no banner de cookies | `consent_choice` |

Todos os eventos levam `utm_source/medium/campaign/term/content` da URL de entrada (guardados na sessão). A mensagem do WhatsApp ganha `(ref: origem / mídia / campanha)` quando a visita veio de campanha.

**cta_id** (todos únicos): `cta_whatsapp_header`, `cta_whatsapp_hero`, `cta_whatsapp_facetas`, `cta_whatsapp_como_funciona`, `cta_whatsapp_sobre`, `cta_whatsapp_implantes`, `cta_whatsapp_ortodontia`, `cta_whatsapp_faq`, `cta_whatsapp_resina`, `cta_whatsapp_investimento`, `cta_whatsapp_final`, `cta_whatsapp_footer`, `fab_whatsapp` (desktop), `cta_whatsapp_sticky` (barra fixa no celular), `cta_whatsapp_quiz` (envio da pré-avaliação).

**URLs finais por serviço** (grupos de anúncio): `/#facetas`, `/#implantes`, `/#ortodontia`. Para o Índice de Qualidade da campanha de facetas: grupo **Resina** → `/#facetas-de-resina`; grupo **Comparação** → `/#resina-ou-porcelana`; grupo **Preço** → `/#investimento` (o Google avalia a página inteira; a âncora só leva o visitante direto ao trecho que responde a busca).

### IDs (padrão em `TRACKING`, `config/content.ts`)
| | |
|---|---|
| Domínio | `https://www.doutorjoaosalgado.com.br` (o sem www redireciona) |
| GTM | `GTM-5T5GNXML` (`NEXT_PUBLIC_GTM_ID` sobrescreve) |
| GA4 | `G-9NWEM4VB8G` |
| Google Ads | conta `761-464-6639`; conversão "Clique no Botão de Wpp" `AW-18268832485/UqNCCM6NgZ8dEOWFoYdE` → `click_whatsapp` |
| Meta Pixel | ainda não |

### JSON de importação do GTM
Arquivo: `gtm/GTM-5T5GNXML-importar.json` (tags GA4 config + evento, vinculador e conversão do Ads). Para regerar:
```bash
python ~/.claude/skills/lp-tracking-dashboard/scripts/gtm_container.py --gtm GTM-5T5GNXML --ga4 G-9NWEM4VB8G \
  --name doutorjoaosalgado.com.br --conv "Clique no Botão de Wpp|18268832485|UqNCCM6NgZ8dEOWFoYdE|click_whatsapp" \
  --events click_whatsapp,click_cta,click_phone,click_maps,click_instagram,faq_open,scroll_25,scroll_50,scroll_75,scroll_100,section_view,quiz_complete,interact_3d \
  --out gtm/GTM-5T5GNXML-importar.json
```
GTM → Administrador → Importar contêiner → **Mesclar + Substituir conflitantes** → Visualizar → Publicar. No GA4, marcar `click_whatsapp` como evento-chave.
O JSON também traz o **Meta Pixel** em duas tags de HTML personalizado, ambas com consentimento `ad_storage`: a **base** (`fbq('init','3565437143629261')` + PageView, pixel "Pixel Site - Doutor João" da BM do Dr. João, dispara em All Pages ou no `consent_update` aceito) e a **Lead** (gatilho `click_whatsapp`). Depois de importar, **apagar a tag antiga do pixel** `1153422360581081`: ela pertence à BM da Pádua Corretora, não ao Dr. João. Conferir no modo Visualizar: aceitar o banner deve disparar o PageView, e clicar num botão de WhatsApp deve disparar GA4, conversão do Ads e o Lead do Meta.

## Testes
- `npm test`: 83 testes das libs do painel (coleta, relatório, GA4, Google Ads, período).
- Verificado com Playwright (UA de iPhone): 12 cta_ids únicos com UTMs, 4 marcas de scroll, 10 `section_view`, `faq_open`, referência da campanha no link do WhatsApp e lotes chegando em `/api/collect`.
