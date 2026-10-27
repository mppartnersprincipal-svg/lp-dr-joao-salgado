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

/** Domínio final: o host com www (o sem www redireciona 308 para ele). */
export const DOMINIO_PRODUCAO = 'https://www.doutorjoaosalgado.com.br';

export const SITE = {
  // Ordem: NEXT_PUBLIC_SITE_URL (sobrescreve) → domínio final em qualquer build da Vercel
  // (preview também aponta o canonical para produção) → localhost no dev.
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL ? DOMINIO_PRODUCAO : 'http://localhost:3000'),
  name: 'Dr. João Salgado',
  title: 'Facetas de Porcelana e Resina em Goiânia | Dr. João Salgado',
  description:
    'Facetas de porcelana, facetas de resina e lentes de contato dental em Goiânia com o Dr. João Salgado (CRO-GO 6835). Agende sua avaliação pelo WhatsApp.',
  locale: 'pt_BR',
} as const;

export const DOCTOR = {
  name: 'Dr. João Salgado',
  profession: 'Cirurgião-dentista',
  // Fonte: bio do Instagram. Confirmar com o Dr. João antes de publicar.
  cro: 'CRO-GO 6835',
  experience: '+25 anos',
  // Responsável técnico (obrigatório em publicidade de clínica): o próprio Dr. João (confirmado em 27/10/2026)
  technicalResponsible: 'Dr. João Salgado, CRO-GO 6835',
} as const;

export const CONTACT = {
  // WhatsApp comercial só com dígitos, com DDI e DDD: (62) 9 9967-5077
  whatsapp: '5562999675077',
  // Sem telefone fixo: o contato é só pelo WhatsApp (confirmado em 27/10/2026). Vazio esconde o link.
  phone: '',
  instagram: 'https://www.instagram.com/dr.joaosalgado/',
  instagramHandle: '@dr.joaosalgado',
  // Igual ao Perfil da Empresa no Google "ALLSTIMA" (enviado pelo Pedro em 27/10/2026). Mudou lá, muda aqui.
  address: {
    street: 'Av. Pará',
    neighborhood: 'Campinas',
    city: 'Goiânia',
    state: 'GO',
    postalCode: '74520-100',
  },
  // Link de compartilhamento do perfil no Google ("Como chegar")
  mapsUrl: 'https://share.google/Qo2sMQty6xYqpxaOW',
  hours: 'Segunda a sexta, das 8h às 19h · Sábado, das 8h às 13h',
} as const;

/** Mesmo horário de CONTACT.hours, no formato do schema.org (JSON-LD). Domingo fechado. */
export const HORARIOS_SCHEMA = [
  { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
  { dayOfWeek: ['Saturday'], opens: '08:00', closes: '13:00' },
] as const;

/** Nome do perfil no Google: entra como alternateName no JSON-LD para ligar o site ao perfil. */
export const NOME_PERFIL_GOOGLE = 'Allstima';

/**
 * "Bairro, Goiânia" quando o bairro estiver preenchido; senão só a cidade.
 * Entra no hero, no FAQ e no rodapé (sinal de negócio local para o Índice de Qualidade do Google Ads).
 */
export const LOCAL = isFilled(CONTACT.address.neighborhood)
  ? `${CONTACT.address.neighborhood}, ${CONTACT.address.city}`
  : CONTACT.address.city;

/** Endereço em uma linha ("Rua X, 123 · Setor Y · Goiânia, GO · CEP"), ou '' enquanto a rua não vier. */
export function enderecoCompleto(): string {
  const { street, neighborhood, city, state, postalCode } = CONTACT.address;
  if (!isFilled(street)) return '';
  return [street, isFilled(neighborhood) ? neighborhood : '', `${city}, ${state}`, isFilled(postalCode) ? `CEP ${postalCode}` : '']
    .filter(Boolean)
    .join(' · ');
}

/**
 * IDs públicos de medição (não são segredo). GA4 e Google Ads ficam DENTRO do GTM:
 * ga4Id e a conversão estão aqui só como referência do JSON em gtm/.
 * NEXT_PUBLIC_GTM_ID, se definido na Vercel, sobrescreve o gtmId.
 */
export const TRACKING = {
  gtmId: 'GTM-5T5GNXML',
  ga4Id: 'G-9NWEM4VB8G',
  googleAdsCustomerId: '761-464-6639',
  conversaoWhatsapp: { id: '18268832485', rotulo: 'UqNCCM6NgZ8dEOWFoYdE', evento: 'click_whatsapp' },
  // Meta Pixel "Pixel Site - Doutor João" (BM do Dr. João). Base + Lead ficam no GTM (gtm/*.json), não no código.
  metaPixelId: '3565437143629261',
} as const;

export const FLAGS = {
  /** Antes e depois: só com autorização escrita de cada paciente e aval do Dr. João. */
  casos: false,
  /**
   * Avaliações do Google (seção #avaliacoes). Exibição aprovada pelo Dr. João em 27/10/2026.
   * A seção só aparece quando AVALIACOES_GOOGLE.itens tiver avaliações reais copiadas do perfil.
   */
  avaliacoes: true,
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
  | 'cta_whatsapp_resina'
  | 'cta_whatsapp_investimento'
  | 'cta_whatsapp_avaliacoes'
  | 'cta_whatsapp_final'
  | 'cta_whatsapp_footer'
  | 'fab_whatsapp'
  | 'cta_whatsapp_sticky'
  | 'cta_whatsapp_quiz';

/** Nomes dos ícones (lucide) usados nos cards; o mapa fica em components/ui/Icon.tsx. */
export type IconKey =
  | 'award' | 'building' | 'gem' | 'shield' | 'camera' | 'smile' | 'droplets' | 'sparkles'
  | 'palette' | 'fingerprint' | 'heartPulse' | 'message' | 'scan' | 'circleCheck' | 'hand'
  | 'heartHandshake' | 'eye' | 'ear' | 'microscope' | 'shapes' | 'ruler' | 'moveHorizontal'
  | 'eraser' | 'clock' | 'calendar' | 'layers' | 'stethoscope' | 'star';

export type WhatsAppTopic = 'facetas' | 'resina' | 'implantes' | 'ortodontia';

/** Tema das mensagens de facetas; lib/tracking.ts troca porcelana por resina para quem veio de anúncio de resina. */
export const TEMA_FACETAS = { porcelana: 'facetas de porcelana', resina: 'facetas de resina' } as const;

const WHATSAPP_MESSAGES: Record<WhatsAppTopic, string> = {
  facetas: `Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para ${TEMA_FACETAS.porcelana}.`,
  resina: `Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para ${TEMA_FACETAS.resina}.`,
  implantes: 'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para implantes dentários.',
  ortodontia: 'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para aparelho ortodôntico.',
};

export function whatsappLink(topic: WhatsAppTopic = 'facetas'): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGES[topic])}`;
}

/** Link com mensagem livre (usado pelo quiz, que monta o texto com as respostas). */
export function whatsappLinkWithText(text: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const CTA_LABEL = 'Agendar minha avaliação';

/** Aviso exibido junto das imagens geradas (não são pacientes nem resultados). */
export const IMAGEM_ILUSTRATIVA = 'Imagem ilustrativa';

// ---------------------------------------------------------------------------
// Seções (ids = section_id no GTM e no /dashboard, na ordem da página)
// ---------------------------------------------------------------------------

export const HERO = {
  // Entra DENTRO do h1 (Hero.tsx): palavra-chave principal + cidade, sem mudar o visual
  eyebrow: 'Facetas de porcelana e de resina · Lentes de contato dental · Goiânia',
  titleLines: ['Um sorriso natural,', 'elegante e feito', 'para você.'],
  subtitle:
    'Há mais de 25 anos, o cirurgião-dentista Dr. João Salgado planeja cada sorriso a partir de quem você é: tom de pele, traços do rosto e a sua identidade. Facetas de porcelana e de resina sem exagero e sem aquele branco artificial.',
  secondaryCta: 'Ver como funciona',
  badges: [DOCTOR.cro, '+25 anos de odontologia', `Atendimento em ${LOCAL}`],
  // Cartões flutuantes sobre o retrato
  floating: [
    { icon: 'fingerprint', title: 'Planejamento sob medida', text: 'para o seu rosto' },
    { icon: 'shield', title: DOCTOR.cro, text: 'cirurgião-dentista' },
  ],
} as const;

export const MARQUEE = ['Naturalidade', 'Planejamento', 'Porcelana', 'Precisão', 'Acolhimento', 'Pós-atendimento'] as const;

export const CREDENCIAIS = [
  { icon: 'award', count: 25, prefix: '+', value: '', label: 'anos de odontologia' },
  { icon: 'building', count: 0, prefix: '', value: 'ISOdonto', label: 'fundador da rede de clínicas' },
  { icon: 'gem', count: 0, prefix: '', value: 'Allstima', label: 'fundador da clínica' },
  { icon: 'shield', count: 0, prefix: '', value: 'Neodent', label: 'implantes de procedência' },
] as const;

export const IDENTIFICACAO = {
  eyebrow: 'Talvez você se reconheça aqui',
  // Frase revelada palavra por palavra conforme a rolagem
  manifesto:
    'Sorriso bonito não é sorriso mais branco. É aquele que ninguém percebe que foi feito, mas que combina com quem você é.',
  pains: [
    { icon: 'camera', text: 'Você evita sorrir nas fotos ou disfarça o sorriso com a mão.' },
    { icon: 'smile', text: 'A cor, o tamanho ou o formato dos dentes incomodam quando você se olha no espelho.' },
    { icon: 'droplets', text: 'Já tem facetas ou restaurações que mancharam ou perderam o brilho e quer refazer.' },
    { icon: 'sparkles', text: 'Tem receio de ficar com um sorriso artificial, aquele "dente de porcelana" que todo mundo nota.' },
  ],
} as const;

export const FACETAS = {
  eyebrow: 'O tratamento',
  title: 'Facetas de porcelana: beleza que acompanha a sua rotina',
  // Definição direta (SEO/GEO): o que é faceta de porcelana e por que "lente de contato dental" é a mesma família
  // Cobre também o jeito leigo de buscar (grupo "Porcelana nos dentes" da campanha)
  intro:
    'Facetas de porcelana são lâminas finas de cerâmica coladas sobre os dentes da frente para corrigir cor, formato, tamanho e pequenas desarmonias. É o que muita gente chama de "porcelana nos dentes"; quando as lâminas são ultrafinas, recebem o nome de lentes de contato dental. A indicação para o seu caso, e a espessura de cada lâmina, é definida na avaliação.',
  // Faceta 3D interativa (components/ui/Faceta3D.tsx); sem WebGL, mostra a foto SERVICOS.facetas
  modelo3d: {
    tag: 'Modelo ilustrativo',
    hint: 'Arraste para girar',
    loading: 'Carregando modelo 3D',
    caption: 'Uma lâmina fina de porcelana, feita sob medida para o seu dente',
    label:
      'Modelo 3D de uma faceta de porcelana: uma lâmina fina e curva no formato de um dente da frente, que pode ser girada para ver a espessura.',
  },
  shadeCaption: 'A cor é escolhida junto com você, comparando tons naturais',
  benefits: [
    {
      icon: 'palette',
      title: 'Cor mais estável no dia a dia',
      text: 'A porcelana é pouco suscetível a manchas por pigmentos de alimentos e bebidas. Com os cuidados e o acompanhamento indicados, a cor tende a se manter por mais tempo.',
    },
    {
      icon: 'gem',
      title: 'Naturalidade e translucidez',
      text: 'Cor, formato e proporção escolhidos para conversar com o seu tom de pele, a sua idade e os traços do seu rosto.',
    },
    {
      icon: 'fingerprint',
      title: 'Sob medida para quem você é',
      text: 'O planejamento respeita a sua expressão e a sua rotina, inclusive a fala. O sorriso continua sendo seu, só que mais harmonioso.',
    },
    {
      icon: 'heartPulse',
      title: 'Saúde em primeiro lugar',
      text: 'Gengiva e estrutura dos dentes entram no planejamento, para que o resultado seja bonito e saudável.',
    },
  ],
} as const;

// TODO(validar com o Dr. João): textos de facetas de resina e da comparação.
// Atende os grupos "Facetas de Resina" (URL final /#facetas-de-resina) e "Resina ou Porcelana"
// (/#resina-ou-porcelana) da campanha. As duas aparecem como opções válidas: nada de falar contra a resina.
export const RESINA = {
  eyebrow: 'Facetas de resina',
  title: 'Facetas de resina: o sorriso ajustado direto no consultório',
  intro:
    'Na faceta de resina, também chamada de lente de resina, o Dr. João aplica e esculpe a resina composta camada por camada sobre o dente, no próprio consultório. É uma forma de corrigir cor, formato, pequenos espaços e desgastes, com a tonalidade escolhida para combinar com o seu sorriso.',
  benefits: [
    { icon: 'hand', title: 'Feita no consultório', text: 'Aplicada e esculpida diretamente no dente, sem etapa de laboratório.' },
    { icon: 'shield', title: 'Respeito ao dente natural', text: 'Costuma exigir pouco ou nenhum desgaste. A indicação é definida na avaliação.' },
    { icon: 'sparkles', title: 'Ajustes e reparos', text: 'Quando precisar, a resina pode ser polida, ajustada ou reparada no consultório.' },
    { icon: 'palette', title: 'Cor planejada com você', text: 'A tonalidade é escolhida para combinar com o seu rosto, sem aquele branco artificial.' },
  ],
  cta: 'Agendar avaliação para resina',
  comparacao: {
    title: 'Resina ou porcelana: qual é a indicada para você?',
    colunas: { criterio: 'O que comparar', resina: 'Faceta de resina', porcelana: 'Faceta de porcelana' },
    linhas: [
      {
        criterio: 'Como é feita',
        resina: 'Aplicada e esculpida direto no dente, no consultório.',
        porcelana: 'Confeccionada sob medida em laboratório, a partir do planejamento do sorriso.',
      },
      {
        criterio: 'Preparo do dente',
        resina: 'Costuma pedir pouco ou nenhum desgaste.',
        porcelana: 'Depende da espessura. As lentes de contato dental são as lâminas mais finas.',
      },
      {
        criterio: 'Manutenção',
        resina: 'Polimentos periódicos ajudam a manter cor e brilho; reparos são feitos no consultório.',
        porcelana: 'A cerâmica é pouco suscetível a manchas e pede acompanhamento periódico.',
      },
      {
        criterio: 'Costuma ser indicada para',
        resina: 'Correções pontuais ou quem prefere um tratamento feito no próprio consultório.',
        porcelana: 'Transformações mais amplas ou quem busca uma cor estável a longo prazo.',
      },
    ],
    nota: 'As duas são boas opções. A escolha depende dos seus dentes, do que você quer mudar e da sua rotina, e é feita junto com o Dr. João na avaliação.',
  },
} as const;

// Quiz de pré-avaliação (qualificação do lead, sem perguntar sobre valores: regra do CRO)
export const AVALIACAO = {
  eyebrow: 'Pré-avaliação em 30 segundos',
  title: 'Conte o que você quer mudar no seu sorriso',
  intro: 'Responda duas perguntas e envie para o Dr. João pelo WhatsApp. Você revisa a mensagem antes de enviar.',
  steps: [
    {
      question: 'O que mais te incomoda hoje?',
      hint: 'Pode escolher mais de uma opção',
      multiple: true,
      options: [
        { icon: 'palette', label: 'Cor dos dentes' },
        { icon: 'shapes', label: 'Formato' },
        { icon: 'ruler', label: 'Tamanho' },
        { icon: 'moveHorizontal', label: 'Espaços entre os dentes' },
        { icon: 'eraser', label: 'Desgastes ou fraturas' },
        { icon: 'sparkles', label: 'Quero uma transformação completa' },
      ],
    },
    {
      question: 'Quando você pensa em começar?',
      hint: 'Escolha uma opção',
      multiple: false,
      options: [
        { icon: 'clock', label: 'O quanto antes' },
        { icon: 'calendar', label: 'Nos próximos 30 dias' },
        { icon: 'calendar', label: 'Nos próximos 3 meses' },
        { icon: 'eye', label: 'Ainda estou pesquisando' },
      ],
    },
  ],
  resultTitle: 'Pronto! Sua mensagem está montada.',
  cta: 'Enviar para o Dr. João',
  back: 'Voltar',
  next: 'Continuar',
  restart: 'Refazer',
} as const;

export function quizMessage(incomodos: readonly string[], quando: string): string {
  return [
    WHATSAPP_MESSAGES.facetas,
    incomodos.length ? `O que me incomoda: ${incomodos.join(', ').toLowerCase()}.` : '',
    quando ? `Quando penso em começar: ${quando.toLowerCase()}.` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

// TODO(validar com o Dr. João): etapas e textos do processo clínico
export const COMO_FUNCIONA = {
  eyebrow: 'Passo a passo',
  title: 'Como funciona o tratamento com facetas de porcelana',
  steps: [
    {
      icon: 'message',
      image: 'consultorio',
      title: 'Avaliação',
      text: 'Uma conversa sem pressa: você conta o que te incomoda e o que espera do seu sorriso. O Dr. João examina e explica as opções para o seu caso.',
    },
    {
      icon: 'scan',
      image: 'planejamento',
      title: 'Planejamento',
      text: 'Estudo de proporções, formato e cor, pensado para o seu rosto e para a sua identidade.',
    },
    {
      icon: 'circleCheck',
      image: 'recepcao',
      title: 'Aprovação',
      text: 'Você entende cada etapa, tira todas as dúvidas e decide junto com o Dr. João.',
    },
    {
      icon: 'hand',
      image: 'lupa',
      title: 'Confecção e instalação',
      text: 'As facetas de porcelana são confeccionadas sob medida e instaladas com precisão, com atenção a cada detalhe.',
    },
    {
      icon: 'heartHandshake',
      image: 'acompanhamento',
      title: 'Acompanhamento',
      text: 'O cuidado não termina no último dia de tratamento. O pós-atendimento faz parte do compromisso.',
    },
  ],
} as const;

// TODO(validar com o Dr. João): fatores do orçamento. NUNCA citar valor, faixa, parcelamento ou desconto (regra do CRO).
// Atende o grupo "Preço e Valor" da campanha (URL final /#investimento): quem busca preço encontra uma resposta honesta.
export const INVESTIMENTO = {
  eyebrow: 'Preço das facetas de porcelana e de resina',
  title: 'Quanto custam as facetas? Depende do seu sorriso.',
  intro:
    'O valor das facetas, de porcelana ou de resina, não é tabelado, porque cada sorriso pede um planejamento diferente. O orçamento é individual e apresentado na consulta de avaliação, depois do exame. Estes são os pontos que definem o investimento no seu caso:',
  fatores: [
    { icon: 'smile', title: 'Quantidade de dentes', text: 'Corrigir um ou dois dentes é diferente de planejar o sorriso inteiro.' },
    { icon: 'layers', title: 'Material e espessura', text: 'Porcelana, resina ou lente de contato dental: o material e a espessura dependem do que precisa ser corrigido.' },
    { icon: 'heartPulse', title: 'Saúde de dentes e gengiva', text: 'Alguns casos pedem cuidados antes das facetas, para que o resultado seja bonito e saudável.' },
    { icon: 'scan', title: 'Planejamento do sorriso', text: 'Estudo de proporção, formato e cor pensado para o seu rosto.' },
    { icon: 'hand', title: 'Feita sob medida', text: 'A de porcelana é confeccionada em laboratório; a de resina, esculpida no consultório. Nenhuma sai de um molde pronto.' },
    { icon: 'heartHandshake', title: 'Acompanhamento', text: 'O pós-atendimento faz parte do tratamento.' },
  ],
  porque:
    'Por que não divulgamos valores: as regras de publicidade odontológica não permitem anunciar preço de tratamento, e um número dado sem exame não diria nada sobre o seu caso.',
  cta: 'Quero meu orçamento na avaliação',
} as const;

export const SOBRE = {
  eyebrow: 'Cirurgião-dentista em Goiânia',
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
    'Facetas de porcelana e de resina, implantes e ortodontia em Goiânia, GO',
  ],
} as const;

export const DIFERENCIAIS = {
  eyebrow: 'Por que pacientes confiam no Dr. João',
  title: 'Técnica, cuidado e presença do início ao fim',
  items: [
    {
      icon: 'eye',
      title: 'Atenção aos detalhes',
      text: 'Pequenas proporções e formatos fazem diferença no resultado final, por isso cada um é estudado.',
    },
    {
      icon: 'heartHandshake',
      title: 'Pós-atendimento próximo',
      text: 'Estar presente, tirar dúvidas e acompanhar o seu resultado faz parte do tratamento.',
    },
    {
      icon: 'microscope',
      title: 'Tecnologia com propósito',
      text: 'Planejamento digital e materiais de procedência, escolhidos com critério para cada caso.',
    },
    {
      icon: 'ear',
      title: 'Escuta e acolhimento',
      text: 'Técnica sem empatia é apenas um processo. Cada paciente chega com uma história, e ela é respeitada.',
    },
  ],
} as const;

interface AvaliacaoGoogle {
  /** Como aparece no Google (nome e inicial do sobrenome, por exemplo "Ana P."). */
  autor: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** Texto da avaliação COPIADO do Google, sem editar. */
  texto: string;
  /** Quando foi publicada, como o Google mostra ("há 2 meses") ou "mês/ano". */
  quando: string;
}

/**
 * Avaliações reais do Perfil da Empresa no Google. NUNCA escrever avaliação: só copiar as que existem.
 * A seção #avaliacoes só aparece com FLAGS.avaliacoes = true e pelo menos uma avaliação aqui.
 * Sem aggregateRating no JSON-LD: o Google não aceita nota "autoatribuída" no site do próprio negócio.
 */
export const AVALIACOES_GOOGLE: {
  eyebrow: string;
  title: string;
  /** Link do perfil no Google (entra no sameAs do JSON-LD e no "Ver todas no Google"). */
  url: string;
  /** Nota média e total exibidos no Google na data da cópia. */
  nota: number;
  total: number;
  itens: readonly AvaliacaoGoogle[];
  cta: string;
} = {
  eyebrow: 'Avaliações no Google',
  title: 'O que dizem os pacientes do Dr. João',
  // Perfil "ALLSTIMA" no Google (kgmid enviado pelo Pedro em 27/10/2026, sem os parâmetros de rastreio)
  url: 'https://www.google.com/search?kgmid=/g/11z9c8mccq&q=ALLSTIMA',
  nota: 0,
  total: 0,
  itens: [],
  cta: 'Ver todas no Google',
};

interface Tratamento {
  id: 'implantes' | 'ortodontia';
  icon: IconKey;
  topic: WhatsAppTopic;
  ctaId: WhatsAppCtaId;
  title: string;
  text: string;
  highlights: readonly string[];
  cta: string;
}

export const TRATAMENTOS: { eyebrow: string; title: string; items: readonly Tratamento[] } = {
  eyebrow: 'Outros tratamentos',
  title: 'Além das facetas: cuidado completo para o seu sorriso',
  items: [
    {
      id: 'implantes',
      icon: 'layers',
      topic: 'implantes',
      ctaId: 'cta_whatsapp_implantes',
      title: 'Implantes dentários',
      text: 'Da reposição de um dente à reabilitação com prótese fixa. No implante guiado, o planejamento digital ajuda a definir a posição do implante antes do procedimento.',
      highlights: ['Implante guiado com planejamento digital', 'Implantes Neodent, marca com mais de 30 anos de história', 'Da unidade à prótese fixa (protocolo)'],
      cta: 'Quero avaliar implantes',
    },
    {
      id: 'ortodontia',
      icon: 'stethoscope',
      topic: 'ortodontia',
      ctaId: 'cta_whatsapp_ortodontia',
      title: 'Aparelhos ortodônticos',
      text: 'Alinhar os dentes também é cuidar da saúde e da função do sorriso. Na avaliação, o Dr. João indica o caminho mais adequado para o seu caso.',
      highlights: ['Indicação definida na avaliação', 'Foco em saúde, função e estética', 'Acompanhamento durante todo o tratamento'],
      cta: 'Quero avaliar ortodontia',
    },
  ],
};

// Fotos reais do Dr. João (as imagens geradas por IA NÃO entram aqui: esta galeria mostra o consultório de verdade)
export const CONSULTORIO = {
  eyebrow: 'Por dentro do consultório, em Goiânia',
  title: 'Um ambiente pensado para você se sentir à vontade',
  hint: 'Arraste para o lado',
  photos: [
    { key: 'recepcao', caption: 'Recepção da Allstima' },
    { key: 'consultorio', caption: 'Conversa antes de qualquer decisão' },
    { key: 'clinicaSorrindo', caption: 'Atendimento próximo' },
    { key: 'xadrezSorrindo', caption: 'Planejar é antecipar cada movimento' },
    { key: 'xadrez', caption: 'Precisão em cada detalhe' },
  ],
} as const;

// TODO(validar com o Dr. João): respostas do FAQ
export const FAQ = {
  eyebrow: 'Dúvidas sobre facetas de porcelana, resina e lentes',
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
      // TODO(validar com o Dr. João): definição de lente de contato dental
      q: 'Qual a diferença entre faceta de porcelana e lente de contato dental?',
      a: 'As duas são lâminas de cerâmica coladas sobre a face visível do dente. "Lente de contato dental" é o nome popular das facetas de porcelana mais finas, que costumam exigir pouco ou nenhum desgaste do dente. Qual das duas se aplica ao seu caso é definido na avaliação, a partir do que você quer corrigir.',
    },
    {
      // TODO(validar com o Dr. João): comparação resina x porcelana
      q: 'Faceta de resina ou de porcelana?',
      a: 'As duas corrigem cor e formato. A faceta de resina é esculpida diretamente no dente, no consultório, e costuma pedir pouco ou nenhum desgaste. A de porcelana é confeccionada sob medida em laboratório e é pouco suscetível a manchas. O Dr. João faz as duas, e a indicação para o seu caso é definida na avaliação.',
    },
    {
      q: 'Vou precisar abrir mão do café ou do vinho?',
      a: 'Não é preciso abrir mão. A porcelana é pouco suscetível a manchas, e a resina mantém cor e brilho com os polimentos de manutenção. Na avaliação, você recebe as orientações de cuidado para o seu caso.',
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
      q: 'Quanto custam as facetas de porcelana e de resina?',
      a: 'O orçamento é individual e depende do seu caso, como a quantidade de dentes e o planejamento necessário. Ele é apresentado na consulta de avaliação, depois de entender o que você quer mudar.',
    },
    {
      q: 'Como agendar uma avaliação para facetas em Goiânia?',
      a: `Pelo WhatsApp. É só tocar em qualquer botão desta página e a equipe do Dr. João responde para combinar o melhor horário no consultório, em ${LOCAL}.${
        enderecoCompleto() ? ` Endereço: ${enderecoCompleto()}.` : ''
      }`,
    },
  ],
} as const;

export const CTA_FINAL = {
  eyebrow: 'Agende sua avaliação',
  title: 'Seu novo sorriso começa com uma conversa.',
  text: 'Conte o que te incomoda e entenda, com calma, o que facetas de porcelana, facetas de resina ou lentes de contato dental podem fazer pelo seu sorriso.',
  checklist: ['Conversa sem pressa', 'Planejamento individual', 'Acompanhamento depois do tratamento'],
} as const;

export const FOOTER = {
  disclaimer:
    'Conteúdo de caráter informativo. Os resultados variam de pessoa para pessoa e dependem de avaliação clínica individual.',
} as const;
