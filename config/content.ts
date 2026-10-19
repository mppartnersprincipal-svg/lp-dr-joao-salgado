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
  // WhatsApp comercial só com dígitos, com DDI e DDD: (62) 9 9967-5077
  whatsapp: '5562999675077',
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
  // TODO(PREENCHER): Meta Pixel quando houver campanha no Meta (configurar no GTM, não no código)
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
  | 'cta_whatsapp_sticky'
  | 'cta_whatsapp_quiz';

/** Nomes dos ícones (lucide) usados nos cards; o mapa fica em components/ui/Icon.tsx. */
export type IconKey =
  | 'award' | 'building' | 'gem' | 'shield' | 'camera' | 'smile' | 'droplets' | 'sparkles'
  | 'palette' | 'fingerprint' | 'heartPulse' | 'message' | 'scan' | 'circleCheck' | 'hand'
  | 'heartHandshake' | 'eye' | 'ear' | 'microscope' | 'shapes' | 'ruler' | 'moveHorizontal'
  | 'eraser' | 'clock' | 'calendar' | 'layers' | 'stethoscope';

export type WhatsAppTopic = 'facetas' | 'implantes' | 'ortodontia';

const WHATSAPP_MESSAGES: Record<WhatsAppTopic, string> = {
  facetas: 'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para facetas de porcelana.',
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
  eyebrow: 'Facetas de porcelana · Goiânia',
  titleLines: ['Um sorriso natural,', 'elegante e feito', 'para você.'],
  subtitle:
    'Há mais de 25 anos, o Dr. João Salgado planeja cada sorriso a partir de quem você é: tom de pele, traços do rosto e a sua identidade. Sem exagero e sem aquele branco artificial.',
  secondaryCta: 'Ver como funciona',
  badges: [DOCTOR.cro, '+25 anos de odontologia'],
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
    { icon: 'droplets', text: 'Já fez facetas de resina que mancharam ou perderam o brilho com o tempo.' },
    { icon: 'sparkles', text: 'Tem receio de ficar com um sorriso artificial, que não combina com você.' },
  ],
} as const;

export const FACETAS = {
  eyebrow: 'O tratamento',
  title: 'Facetas de porcelana: beleza que acompanha a sua rotina',
  intro:
    'Lâminas finas de porcelana que corrigem cor, formato, tamanho e pequenas desarmonias dos dentes. A indicação para o seu caso é definida na avaliação.',
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
      text: 'A porcelana é menos suscetível a manchas por pigmentos de alimentos e bebidas. Com os cuidados e o acompanhamento indicados, a cor tende a se manter por mais tempo.',
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
    'Olá, Dr. João! Vim pelo site e gostaria de agendar uma avaliação para facetas de porcelana.',
    incomodos.length ? `O que me incomoda: ${incomodos.join(', ').toLowerCase()}.` : '',
    quando ? `Quando penso em começar: ${quando.toLowerCase()}.` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

// TODO(validar com o Dr. João): etapas e textos do processo clínico
export const COMO_FUNCIONA = {
  eyebrow: 'Passo a passo',
  title: 'Como funciona o seu tratamento',
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
      image: 'escala',
      title: 'Aprovação',
      text: 'Você entende cada etapa, tira todas as dúvidas e decide junto com o Dr. João.',
    },
    {
      icon: 'hand',
      image: 'laboratorio',
      title: 'Confecção e instalação',
      text: 'As facetas são confeccionadas e instaladas com precisão, com atenção a cada detalhe.',
    },
    {
      icon: 'heartHandshake',
      image: 'acompanhamento',
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
  title: 'Cuidado completo para o seu sorriso',
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
  eyebrow: 'Por dentro do consultório',
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
  checklist: ['Conversa sem pressa', 'Planejamento individual', 'Acompanhamento depois do tratamento'],
} as const;

export const FOOTER = {
  disclaimer:
    'Conteúdo de caráter informativo. Os resultados variam de pessoa para pessoa e dependem de avaliação clínica individual.',
} as const;
