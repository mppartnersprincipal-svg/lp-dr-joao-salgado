'use client';

import { useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { AVALIACAO, quizMessage, whatsappLinkWithText } from '@/config/content';
import { track } from '@/lib/tracking';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const RESULT_STEP = AVALIACAO.steps.length;

/**
 * Pré-avaliação interativa: 2 perguntas → mensagem de WhatsApp montada com as respostas.
 * Ajuda o paciente a dar o primeiro passo e entrega ao Dr. João um lead já qualificado.
 */
export function Avaliacao() {
  const [step, setStep] = useState(0);
  const [incomodos, setIncomodos] = useState<string[]>([]);
  const [quando, setQuando] = useState('');

  const transitions = useTransition(step, {
    from: { opacity: 0, x: 24 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -24, position: 'absolute' as const },
    config: { tension: 260, friction: 28 },
  });

  const toggle = (label: string) =>
    setIncomodos((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));

  const choose = (label: string) => {
    setQuando(label);
    track('quiz_complete', { quiz_incomodos: incomodos.join(', '), quiz_quando: label });
    setStep(RESULT_STEP);
  };

  const restart = () => {
    setIncomodos([]);
    setQuando('');
    setStep(0);
  };

  const message = quizMessage(incomodos, quando);
  const progress = Math.min(step, RESULT_STEP) / RESULT_STEP;

  return (
    <section id="avaliacao" aria-labelledby="avaliacao-t" className="secao relative overflow-hidden bg-superficie">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(200,164,107,0.12),transparent_65%)]"
      />
      <div className="container-lp relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="avaliacao" eyebrow={AVALIACAO.eyebrow} title={AVALIACAO.title} intro={AVALIACAO.intro} />
        </div>

        <div className="lg:col-span-7">
          <div className="moldura relative bg-fundo/70 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur md:p-10">
            {/* progresso */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-ouro/15">
                <div
                  className="h-px bg-ouro transition-transform duration-700 ease-suave"
                  style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
                />
              </div>
              <span className="eyebrow text-areia" aria-live="polite">
                {step < RESULT_STEP ? `${step + 1} de ${RESULT_STEP}` : 'Concluído'}
              </span>
            </div>

            <div className="relative min-h-[22rem]">
              {transitions((style, current) => (
                <animated.div
                  style={{ opacity: style.opacity, transform: style.x.to((x) => `translate3d(${x}px,0,0)`), position: style.position, inset: 0 }}
                  className="w-full"
                >
                  {current < RESULT_STEP ? (
                    <QuizStep
                      index={current}
                      selected={current === 0 ? incomodos : [quando]}
                      onSelect={current === 0 ? toggle : choose}
                    />
                  ) : (
                    <div>
                      <p className="flex items-center gap-3 font-serif text-2xl text-marfim md:text-3xl">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ouro text-fundo">
                          <Check className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                        </span>
                        {AVALIACAO.resultTitle}
                      </p>
                      {/* prévia em formato de balão de WhatsApp */}
                      <div className="mt-6 max-w-md rounded-2xl rounded-tr-sm bg-[#1f3a2c] p-4 text-sm leading-relaxed text-[#e9f5ee] shadow-lg">
                        {message.split('\n').map((line) => (
                          <p key={line} className="[&+p]:mt-2">
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <WhatsAppButton
                          ctaId="cta_whatsapp_quiz"
                          href={whatsappLinkWithText(message)}
                          label={AVALIACAO.cta}
                          size="lg"
                        />
                        <button
                          type="button"
                          onClick={restart}
                          className="inline-flex min-h-12 items-center gap-2 px-2 text-[0.72rem] uppercase tracking-[0.2em] text-areia transition-colors hover:text-ouro-claro"
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden="true" />
                          {AVALIACAO.restart}
                        </button>
                      </div>
                    </div>
                  )}
                </animated.div>
              ))}
            </div>

            {step === 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={!incomodos.length}
                  onClick={() => setStep(1)}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ouro px-7 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-fundo transition-[transform,background-color,opacity] duration-300 hover:scale-[1.03] hover:bg-ouro-claro disabled:pointer-events-none disabled:opacity-35"
                >
                  {AVALIACAO.next}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-areia transition-colors hover:text-ouro-claro"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {AVALIACAO.back}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface QuizStepProps {
  index: number;
  selected: readonly string[];
  onSelect: (label: string) => void;
}

function QuizStep({ index, selected, onSelect }: QuizStepProps) {
  const step = AVALIACAO.steps[index];
  return (
    <fieldset>
      <legend className="font-serif text-2xl text-marfim md:text-3xl">{step.question}</legend>
      <p className="mt-2 text-sm text-areia">{step.hint}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {step.options.map((opt) => {
          const isOn = selected.includes(opt.label);
          return (
            <button
              key={opt.label}
              type="button"
              aria-pressed={isOn}
              onClick={() => onSelect(opt.label)}
              className={`group flex min-h-14 items-center gap-4 rounded-full border py-2 pl-2 pr-5 text-left transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 ${
                isOn ? 'border-ouro bg-ouro/12 text-marfim' : 'border-ouro/20 bg-superficie/40 text-areia hover:border-ouro/60 hover:text-marfim'
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOn ? 'border-ouro bg-ouro text-fundo' : 'border-ouro/30 text-ouro'
                }`}
              >
                {isOn ? <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" /> : <Icon name={opt.icon} />}
              </span>
              <span className="text-[0.95rem]">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
