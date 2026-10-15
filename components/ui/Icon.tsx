import {
  Award,
  Building2,
  Calendar,
  Camera,
  CircleCheck,
  Clock,
  Droplets,
  Ear,
  Eraser,
  Eye,
  Fingerprint,
  Gem,
  Hand,
  HeartHandshake,
  HeartPulse,
  Layers,
  MessageCircle,
  Microscope,
  MoveHorizontal,
  Palette,
  Ruler,
  ScanLine,
  Shapes,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '@/config/content';

const ICONS: Record<IconKey, LucideIcon> = {
  award: Award,
  building: Building2,
  calendar: Calendar,
  camera: Camera,
  circleCheck: CircleCheck,
  clock: Clock,
  droplets: Droplets,
  ear: Ear,
  eraser: Eraser,
  eye: Eye,
  fingerprint: Fingerprint,
  gem: Gem,
  hand: Hand,
  heartHandshake: HeartHandshake,
  heartPulse: HeartPulse,
  layers: Layers,
  message: MessageCircle,
  microscope: Microscope,
  moveHorizontal: MoveHorizontal,
  palette: Palette,
  ruler: Ruler,
  scan: ScanLine,
  shapes: Shapes,
  shield: ShieldCheck,
  smile: Smile,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
};

interface IconProps {
  name: IconKey;
  className?: string;
}

/** Ícones em traço fino (mesma linguagem das molduras douradas). Decorativos: o texto ao lado dá o sentido. */
export function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  const Component = ICONS[name];
  return <Component className={className} strokeWidth={1.25} aria-hidden="true" />;
}

interface IconBadgeProps extends IconProps {
  tone?: 'escuro' | 'claro';
}

/** Ícone dentro de um losango com moldura dourada (assinatura visual dos cards). */
export function IconBadge({ name, tone = 'escuro', className = '' }: IconBadgeProps) {
  const toneClass =
    tone === 'claro'
      ? 'border-ouro-escuro/40 text-ouro-escuro bg-white/50'
      : 'border-ouro/35 text-ouro bg-fundo/60';
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 group-hover:border-ouro group-hover:text-ouro-claro ${toneClass} ${className}`}
    >
      <Icon name={name} className="h-5 w-5" />
    </span>
  );
}
