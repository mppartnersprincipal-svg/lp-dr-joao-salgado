/**
 * Intenção da busca do anúncio (message match do topo da página).
 *
 * Roda como script inline no início do <body>, ANTES de o hero ser pintado: marca
 * <html data-intencao="preco|comparacao|resina"> e o CSS (globals.css, "Variantes do hero")
 * mostra só o título/texto/botão daquela intenção. Sem flicker, sem JS do React e a página
 * continua estática (nada depende de searchParams no servidor).
 *
 * Fonte: utm_content da URL (slug do grupo de anúncio da campanha de facetas) ou, na falta,
 * utm_term; sem UTMs na URL, as UTMs guardadas na sessão (js_utms, lib/tracking.ts) para quem
 * volta de /privacidade. Sem intenção reconhecida: nenhum atributo, vale o hero padrão.
 *
 * Mantém em sincronia: os slugs da campanha (clientes/joao-salgado/build_joao_salgado_facetas.py)
 * e a chave de sessão UTM_STORAGE_KEY de lib/tracking.ts.
 */

export const INTENCAO_SCRIPT = `(function(){try{
var q=new URLSearchParams(location.search),c=q.get('utm_content'),t=q.get('utm_term');
if(!c&&!t){var s=JSON.parse(sessionStorage.getItem('js_utms')||'{}');c=s.utm_content;t=s.utm_term;}
c=(c||'').toLowerCase();t=(t||'').toLowerCase();var i='';
if(c==='preco'||c==='comparacao'||c==='resina')i=c;
else if(/pre[cç]o|valor|custa|custo|quanto (sai|fica|vale)|or[cç]amento/.test(t))i='preco';
else if(/\\bou\\b|diferen|\\bx\\b|\\bvs\\b|compara/.test(t))i='comparacao';
else if(t.indexOf('resina')>-1&&t.indexOf('porcelana')<0)i='resina';
if(i)document.documentElement.setAttribute('data-intencao',i);
}catch(e){}})();`;
