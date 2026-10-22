-- Limpeza dos testes de QA do coletor (/dashboard). Rodar no SQL Editor do Supabase
-- (projeto khipnjfbxjgvmjvyxero). Os eventos caem junto (on delete cascade).

-- 1) Só a visita de teste marcada com utm_campaign=qa-seed
delete from public.joaosalgado_sessions where utm_campaign = 'qa-seed';

-- 2) Tudo que entrou antes do início das campanhas (testes internos de 15 a 22/10/2026).
--    Ajuste a data/hora para o momento em que as campanhas subiram e rode UMA vez.
-- delete from public.joaosalgado_sessions where started_at < '2026-10-23 00:00:00-03';

-- Conferência
select count(*) as sessoes, min(started_at) as primeira, max(started_at) as ultima from public.joaosalgado_sessions;
