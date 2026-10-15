/**
 * Conteúdo da LP num só lugar: textos, contatos, CTAs e flags.
 *
 * REGRAS (CLAUDE.md do cliente + Código de Ética Odontológica / CFO):
 * - Nada de preço, parcelamento, desconto, "grátis" ou condição de pagamento.
 * - Nada de promessa de resultado, garantia de durabilidade ou superlativo ("o melhor", "o único").
 * - Nunca inventar dado factual. O que falta fica como [PREENCHER] (ver pendências no README).
 * - Fontes dos fatos usados: kick-off do cliente e bio/legendas do Instagram @dr.joaosalgado (out/2026).
 */

// ---------------------------------------------------------------------------
// Dados do negócio
// ---------------------------------------------------------------------------

/** Valor-sentinela dos dados que o cliente ainda não enviou (scripts/check-placeholders.mjs avisa no build). */
export const PREENCHER = '[PREENCHER]';

/** true quando o dado já foi preenchido (a página nunca exibe "[PREENCHER]"). */
export const isFilled = (value: string): boolean => Boolean(value) && value !== PREENCHER;

export const SITE = {
  // TODO(PREENCHER): domínio final (conferir com `curl -sI` qual host não redireciona)
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  name: 'Dr. João Salgado',
  title: 'Facetas de Porcelana em Goiânia | Dr. João Salgado',
  description:
    'Facetas de porcelana em Goiânia com o Dr. João Salgado (CRO-GO 6835), mais de 25 anos de odontologia. Sorriso natural, planejado para você. Agende sua avaliação pelo WhatsApp.',
  locale: 'pt_BR',
} as const;

export const DOCTOR = {
  name: 'Dr. João Salgado',
  profession: 'Cirurgião-dentista',
  // Fonte: bio do Instagram. Confirmar com o Dr. João antes de publicar.
  cro: 'CRO-GO 6835',
  experience: '+25 anos',
  // TODO(PREENCHER): responsável técnico da clínica (obrigatório em publicidade de clínica)
  technicalResponsible: PREENCHER,
} as const;

export const CONTACT = {
  // TODO(PREENCHER): WhatsApp comercial só com dígitos, com DDI e DDD (ex.: 5562900000000)
  whatsapp: PREENCHER,
  // TODO(PREENCHER): telefone fixo, se houver (deixe vazio para esconder)
  phone: '',
  instagram: 'https://www.instagram.com/dr.joaosalgado/',
  instagramHandle: '@dr.joaosalgado',
  // TODO(PREENCHER): endereço completo da clínica
  address: {
    street: PREENCHER,
    neighborhood: PREENCHER,
    city: 'Goiânia',
    state: 'GO',
    postalCode: PREENCHER,
  },
  // TODO(PREENCHER): link do Google Maps da clínica (deixe vazio para esconder)
  mapsUrl: '',
  // TODO(PREENCHER): horário de atendimento
  hours: PREENCHER,
} as const;

export const FLAGS = {
  /** Antes e depois: só com autorização escrita de cada paciente e aval do Dr. João. */
  casos: false,
} as const;

// ---------------------------------------------------------------------------
// WhatsApp: cada botão tem um cta_id único (evento click_whatsapp no GTM/GA4)
// ---------------------------------------------------------------------------

export type WhatsAppCtaId =
  | 'cta_whatsapp_header'
  | 'cta_whatsapp_hero'
  | 'cta_whatsapp_facetas'
  | 'cta_whatsapp_como_funciona'
  | 'cta_whatsapp_sobre'
  | 'cta_whatsapp_implantes'
  | 'cta_whatsapp_ortodontia'
  | 'cta_whatsapp_faq'
  | 'cta_whatsapp_final'
  | 'cta_whatsapp_footer'
  | 'fab_whatsapp'
  | 'cta_whatsapp_sticky';

export type WhatsAppTopic = 'facetas' | 'implantes' | 'ortodontia';

const WHATSAPP_MESSAGES: Record<WhatsAppTopic, string> = {
  facetas: 'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para facetas de porcelana.',
  implantes: 'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para implantes dentários.',
  ortodontia: 'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para aparelho ortodôntico.',
};

export function whatsappLink(topic: WhatsAppTopic = 'facetas'): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGES[topic])}`;
}

export const CTA_LABEL = 'Agendar minha avaliação';

// ---------------------------------------------------------------------------
// Seções (ids = section_id no GTM e no /dashboard, na ordem da página)
// ---------------------------------------------------------------------------

export const HERO = {
  eyebrow: 'Facetas de porcelana · Goiânia',
  titleLines: ['Um sorriso natural,', 'elegante e feito', 'para você.'],
  subtitle:
    'Há mais de 25 anos, o Dr. João Salgado planeja cada sorriso a partir de quem você é: tom de pele, traços do rosto e a sua identidade. Sem exagero e sem aquele branco artificial.',
  secondaryCta: 'Ver como funciona',
  badges: [DOCTOR.cro, '+25 anos de odontologia'],
} as const;

export const CREDENCIAIS = [
  { value: '+25', label: 'anos de odontologia' },
  { value: 'ISOdonto', label: 'fundador da rede de clínicas' },
  { value: 'Allstima', label: 'fundador da clínica' },
  { value: 'Neodent', label: 'implantes de procedência' },
] as const;

export const IDENTIFICACAO = {
  eyebrow: 'Talvez você se reconheça aqui',
  title: 'Sorriso bonito não é sorriso mais branco.',
  quote: 'É aquele que ninguém percebe que foi feito, mas que combina com quem você é.',
  pains: [
    'Você evita sorrir nas fotos ou disfarça o sorriso com a mão.',
    'A cor, o tamanho ou o formato dos dentes incomodam quando você se olha no espelho.',
    'Já fez facetas de resina que mancharam ou perderam o brilho com o tempo.',
    'Tem receio de ficar com um sorriso artificial, que não combina com você.',
  ],
} as const;

export const FACETAS = {
  eyebrow: 'O tratamento',
  title: 'Facetas de porcelana: beleza que acompanha a sua rotina',
  intro:
    'Lâminas finas de porcelana que corrigem cor, formato, tamanho e pequenas desarmonias dos dentes. A indicação para o seu caso é definida na avaliação.',
  benefits: [
    {
      title: 'Cor mais estável no dia a dia',
      text: 'A porcelana é menos suscetível a manchas por pigmentos de alimentos e bebidas. Com os cuidados e o acompanhamento indicados, a cor tende a se manter por mais tempo.',
    },
    {
      title: 'Naturalidade e translucidez',
      text: 'Cor, formato e proporção escolhidos para conversar com o seu tom de pele, a sua idade e os traços do seu rosto.',
    },
    {
      title: 'Sob medida para quem você é',
      text: 'O planejamento respeita a sua expressão e a sua rotina, inclusive a fala. O sorriso continua sendo seu, só que mais harmonioso.',
    },
    {
      title: 'Saúde em primeiro lugar',
      text: 'Gengiva e estrutura dos dentes entram no planejamento, para que o resultado seja bonito e saudável.',
    },
  ],
} as const;

// TODO(validar com o Dr. João): etapas e textos do processo clínico
export const COMO_FUNCIONA = {
  eyebrow: 'Passo a passo',
  title: 'Como funciona o seu tratamento',
  steps: [
    {
      title: 'Avaliação',
      text: 'Uma conversa sem pressa: você conta o que te incomoda e o que espera do seu sorriso. O Dr. João examina e explica as opções para o seu caso.',
    },
    {
      title: 'Planejamento',
      text: 'Estudo de proporções, formato e cor, pensado para o seu rosto e para a sua identidade.',
    },
    {
      title: 'Aprovação',
      text: 'Você entende cada etapa, tira todas as dúvidas e decide junto com o Dr. João.',
    },
    {
      title: 'Confecção e instalação',
      text: 'As facetas são confeccionadas e instaladas com precisão, com atenção a cada detalhe.',
    },
    {
      title: 'Acompanhamento',
      text: 'O cuidado não termina no último dia de tratamento. O pós-atendimento faz parte do compromisso.',
    },
  ],
} as const;

export const SOBRE = {
  eyebrow: 'Quem cuida do seu sorriso',
  title: 'Eu sou o Dr. João Salgado.',
  // Legenda fixada no Instagram (primeira pessoa, palavras do próprio Dr.)
  paragraphs: [
    'Há 25 anos, escolhi fazer da odontologia uma forma de cuidar de pessoas.',
    'Acredito que um sorriso bem planejado não transforma apenas a estética, mas também a forma como alguém se enxerga e se apresenta ao mundo.',
    'Aqui, cada caso é conduzido com planejamento e atenção aos detalhes.',
  ],
  facts: [
    `${DOCTOR.profession} · ${DOCTOR.cro}`,
    'Fundador da rede ISOdonto Clínica',
    'Fundador da Allstima Odontologia',
  ],
} as const;

export const DIFERENCIAIS = {
  eyebrow: 'Por que pacientes confiam no Dr. João',
  title: 'Técnica, cuidado e presença do início ao fim',
  items: [
    {
      title: 'Atenção aos detalhes',
      text: 'Pequenas proporções e formatos fazem diferença no resultado final, por isso cada um é estudado.',
    },
    {
      title: 'Pós-atendimento próximo',
      text: 'Estar presente, tirar dúvidas e acompanhar o seu resultado faz parte do tratamento.',
    },
    {
      title: 'Tecnologia com propósito',
      text: 'Planejamento digital e materiais de procedência, escolhidos com critério para cada caso.',
    },
    {
      title: 'Escuta e acolhimento',
      text: 'Técnica sem empatia é apenas um processo. Cada paciente chega com uma história, e ela é respeitada.',
    },
  ],
} as const;

interface Tratamento {
  id: string;
  topic: WhatsAppTopic;
  ctaId: WhatsAppCtaId;
  title: string;
  text: string;
  cta: string;
}

export const TRATAMENTOS: { eyebrow: string; title: string; items: readonly Tratamento[] } = {
  eyebrow: 'Outros tratamentos',
  title: 'Cuidado completo para o seu sorriso',
  items: [
    {
      id: 'implantes',
      topic: 'implantes',
      ctaId: 'cta_whatsapp_implantes',
      title: 'Implantes dentários',
      text: 'Da reposição de um dente à reabilitação com prótese fixa. No implante guiado, o planejamento digital ajuda a definir a posição do implante antes do procedimento. O Dr. João trabalha com implantes Neodent, marca com mais de 30 anos de história.',
      cta: 'Quero avaliar implantes',
    },
    {
      id: 'ortodontia',
      topic: 'ortodontia',
      ctaId: 'cta_whatsapp_ortodontia',
      title: 'Aparelhos ortodônticos',
      text: 'Alinhar os dentes também é cuidar da saúde e da função do sorriso. Na avaliação, o Dr. João indica o caminho mais adequado para o seu caso.',
      cta: 'Quero avaliar ortodontia',
    },
  ],
};

// TODO(validar com o Dr. João): respostas do FAQ
export const FAQ = {
  eyebrow: 'Dúvidas frequentes',
  title: 'Antes de agendar, você pode estar se perguntando',
  items: [
    {
      q: 'Faceta de porcelana desgasta o dente?',
      a: 'Depende do caso. A técnica e a quantidade de preparo são definidas na avaliação, sempre buscando preservar ao máximo a estrutura natural do dente.',
    },
    {
      q: 'Quanto tempo duram as facetas de porcelana?',
      a: 'A durabilidade varia de pessoa para pessoa e depende de cuidados como higiene, consultas de acompanhamento e hábitos (por exemplo, ranger os dentes). Por isso o acompanhamento faz parte do tratamento.',
    },
    {
      q: 'Vou precisar abrir mão do café ou do vinho?',
      a: 'A porcelana é menos suscetível a manchas do que dentes naturais e resina. Na avaliação, você recebe as orientações de cuidado para o seu caso.',
    },
    {
      q: 'O resultado fica artificial?',
      a: 'O objetivo é o oposto. Cor, formato e proporção são planejados para combinar com o seu rosto, buscando um resultado discreto.',
    },
    {
      q: 'Homem também faz facetas?',
      a: 'Sim. Cuidar do sorriso não é vaidade: é coerência com a forma como você se apresenta. O planejamento respeita traços e expressão masculinos para um resultado natural.',
    },
    {
      q: 'Como é feito o orçamento?',
      a: 'O orçamento é individual: ele é apresentado na consulta de avaliação, depois de entender o seu caso.',
    },
    {
      q: 'Como faço para agendar a avaliação?',
      a: 'Pelo WhatsApp. É só tocar em qualquer botão desta página e a equipe do Dr. João responde para combinar o melhor horário.',
    },
  ],
} as const;

export const CTA_FINAL = {
  eyebrow: 'Agende sua avaliação',
  title: 'Seu novo sorriso começa com uma conversa.',
  text: 'Conte o que te incomoda e entenda, com calma, o que pode ser feito pelo seu sorriso.',
} as const;

export const FOOTER = {
  disclaimer:
    'Conteúdo de caráter informativo. Os resultados variam de pessoa para pessoa e dependem de avaliação clínica individual.',
} as const;
