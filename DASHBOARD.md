# Painel /dashboard

Pacote de medição M|P (skill `lp-tracking-dashboard`, modelo Nova Ferragista), portado para Next.js.

```
Página ──dataLayer──▶ GTM ──▶ GA4 (eventos) + Google Ads (conversões)
   └──jsCollect──▶ /js/tracker.js ──▶ /api/collect ──▶ Supabase (joaosalgado_sessions / joaosalgado_events)
/dashboard (login) ──▶ /api/dashboard (Supabase) + /api/google-ads (via MCC) + /api/ga4 (Data API)
```

## Onde está cada parte
| Parte | Arquivo |
|---|---|
| Coletor anônimo (sem IP, sem cookies) | `public/js/tracker.js` (chaves `js-s`, `js-v`, `js-consent`) |
| Rotas da API | `app/api/{collect,login,dashboard,ga4,google-ads}/route.ts` |
| Lógica (validação, relatório, GA4, Ads) | `server/analytics/*.mjs` (testes em `tests/`) |
| Painel | `public/dashboard/{index.html,app.js}`, servido em `/dashboard` (rewrite no `next.config.ts`, `noindex`) |
| Banco | `supabase/migrations/0001_joaosalgado_analytics.sql` |

## Ativar (passo a passo)
1. **Supabase** (projeto compartilhado `khipnjfbxjgvmjvyxero`): conferir com `list_tables` que o prefixo `joaosalgado_` é novo e aplicar a migration.
2. **Vercel → Environment Variables** (ver `.env.example`): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `DASHBOARD_PASSWORD`, `DASHBOARD_SECRET` e, para as seções extras, as `GOOGLE_ADS_*`, `GA4_PROPERTY_ID` e `GOOGLE_SERVICE_ACCOUNT_JSON`.
3. **Redeploy** (as variáveis só valem depois dele).
4. Conferir: `/api/collect` responde 204; login com senha errada responde "Senha incorreta."; visita com `?utm_campaign=qa-seed` aparece no painel.
5. GA4: a conta de serviço precisa ser **Leitor** na propriedade do cliente. Google Ads: `GOOGLE_ADS_CUSTOMER_ID` é a conta do cliente (10 dígitos).

Segurança: `/api/collect` é público (como em todas as LPs da M|P) e `/api/login` tem atraso fixo. Recomendado ativar rate limit no **Vercel Firewall** para `/api/collect` e `/api/login`, e usar uma senha longa no painel.

Sem as variáveis, nada quebra: `/api/collect` descarta em silêncio (204) e as seções do painel mostram "conexão pendente".

## Personalizações deste cliente
- Funil: `SECTIONS.home` em `server/analytics/report.mjs` = ids das seções na ordem da página.
- Nomes dos botões: `CTA` em `public/dashboard/app.js` (um por `cta_id`).
- Eventos do GA4 lidos: `GA4_EVENTS` em `server/analytics/ga4.mjs`.
- Cores e fontes do painel: tokens `--cb-*` em `public/dashboard/index.html` (valores do design system do Dr. João).
- Horário da clínica no mapa de calor: `heatmap()` em `public/dashboard/app.js` (hoje `[PREENCHER]`).
