# UTMs — Google Ads (Dr. João Salgado, facetas)

Conta do cliente: 761-464-6639 (via MCC 603-989-2603). Painel: `/dashboard` → "Google Ads e UTMs"
lê `utm_campaign` (Campanha), `utm_content` (Grupo / anúncio) e `utm_term` (Termo).
O canal vira **Google Ads** quando há `gclid` (auto-tagging) ou `utm_source=google` + `utm_medium=cpc`.

## 1. Modelo de acompanhamento (nível da conta)
Configurações da conta → Acompanhamento → **Modelo de acompanhamento**:

```
{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={_campanha}&utm_content={_grupo}&utm_term={keyword}
```

Manter o **auto-tagging ligado** (gclid é o que fecha a conversão no Google Ads; as UTMs são para o GA4 e o painel).

## 2. Parâmetros personalizados
| Onde | Parâmetro | Valor (exemplo) |
|---|---|---|
| Campanha | `{_campanha}` | `facetas-pesquisa-goiania` |
| Grupo de anúncios | `{_grupo}` | `facetas-porcelana` |

Convenção dos valores: minúsculas, sem acento, hífen entre palavras, sem espaço.
`{keyword}` o Google preenche sozinho com a palavra-chave que disparou o anúncio (vazio em Performance Max).

## 3. Sugestão de estrutura (facetas)
| Campanha (`{_campanha}`) | Grupo (`{_grupo}`) | URL final |
|---|---|---|
| `facetas-pesquisa-goiania` | `facetas-porcelana` | `https://www.doutorjoaosalgado.com.br/` |
| `facetas-pesquisa-goiania` | `lentes-de-contato-dental` | `https://www.doutorjoaosalgado.com.br/` |
| `facetas-pesquisa-goiania` | `dentista-estetico-goiania` | `https://www.doutorjoaosalgado.com.br/` |
| `facetas-pesquisa-goiania` | `facetas-concorrentes` (marca de concorrentes, se usar) | `https://www.doutorjoaosalgado.com.br/` |
| `facetas-pmax-goiania` | `pmax` | `https://www.doutorjoaosalgado.com.br/` |
| `facetas-remarketing-display` | `display-rmkt` | `https://www.doutorjoaosalgado.com.br/` |

URL final: usar a **raiz** (o hero já é facetas). Evitar `/#facetas` na URL final: com modelo de
acompanhamento, os parâmetros podem cair depois do `#` e a LP não lê UTM que está no fragmento.
Para implantes/ortodontia no futuro, pedir ao Pedro um parâmetro `?secao=implantes` na LP.

## 4. Como fica a URL que o paciente abre
```
https://www.doutorjoaosalgado.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=facetas-pesquisa-goiania&utm_content=facetas-porcelana&utm_term=facetas%20de%20porcelana%20goiania&gclid=...
```
A mensagem do WhatsApp sai com `(ref: google / cpc / facetas-pesquisa-goiania)`, então o Dr. João vê de onde veio o paciente.

## 5. Teste antes de ligar
Abrir a URL acima (sem gclid) no celular, aceitar o banner e clicar no WhatsApp. No `/dashboard`
deve aparecer a linha `facetas-pesquisa-goiania · facetas-porcelana · <termo>` com canal **Google Ads**.
Depois, apagar o teste com `supabase/limpeza-testes.sql`. Não usar `{keyword}` cru num link de
teste: o painel classifica ValueTrack não resolvido como "Direto" de propósito.
