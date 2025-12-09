// components/sections/Coaches.tsx
'use client';

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Dumbbell, HeartPulse, Zap } from 'lucide-react';

const COACHES = [
  {
    id: 1,
    name: 'Carlos Hernández',
    specialty: 'Fuerza & Recomposición',
    image:
      'https://images.unsplash.com/photo-1696563996353-214a3690bb11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZpdG5lc3MlMjB0cmFpbmVyfGVufDB8fDB8fHww',
    quote: 'Mi objetivo es que entrenes con confianza, no con miedo.',
    bio: 'Ex competidor de powerlifting. 7 años transformando cuerpos priorizando la técnica sobre el ego.',
    skills: ['Hipertrofia', 'Powerlifting', 'Nutrición'],
    icon: <Dumbbell className="w-4 h-4" />,
  },
  {
    id: 2,
    name: 'Sarah Miller',
    specialty: 'HIIT & Conditioning',
    image:
      'https://images.unsplash.com/photo-1704223523303-a5ed14561b1f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'Tu mente se rinde antes que tu cuerpo. Yo entreno tu mente.',
    bio: 'Especialista en alto rendimiento metabólico. Te llevaré a límites que no sabías que tenías.',
    skills: ['Resistencia', 'Sprints', 'Mentalidad'],
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 3,
    name: 'Mateo Varela',
    specialty: 'Movilidad & Funcional',
    image:
      'https://images.unsplash.com/photo-1738523686513-0c27d2be85e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    quote: 'Fuerza sin control es riesgo. Construye un cuerpo para toda la vida.',
    bio: 'Kinesiólogo deportivo. Enfocado en longevidad, postura y fuerza funcional libre de dolor.',
    skills: ['Movilidad', 'Kettlebells', 'Recovery'],
    icon: <HeartPulse className="w-4 h-4" />,
  },
];

// Variantes de animación
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Coaches() {
  const [activeCoachId, setActiveCoachId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveCoachId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="coaches"
      className="py-32 bg-apex-bg relative border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header de Sección */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl">
            <span className="text-apex-gold text-xs font-light tracking-widest-xl uppercase mb-4 block">
              Equipo Élite
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white uppercase leading-tight">
              Mentores de tu <br />
              <span className="text-apex-gold font-serif italic uppercase">
                Evolución
              </span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-apex-gray text-sm font-light leading-relaxed">
              Cada entrenador tiene un enfoque distinto; encuentra al experto que
              conecta con tu visión.
            </p>
          </div>
        </motion.div>

        {/* Grid de Coaches */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {COACHES.map((coach) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              isActive={activeCoachId === coach.id}
              onToggle={() => handleToggle(coach.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type Coach = (typeof COACHES)[number];

function CoachCard({
  coach,
  isActive,
  onToggle,
}: {
  coach: Coach;
  isActive: boolean;
  onToggle: () => void;
}) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = (offsetX / rect.width - 0.5) * 10;
    const y = (offsetY / rect.height - 0.5) * 10;

    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={cardVariants}
      onClick={onToggle} // mobile
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-expanded={isActive}
      role='button'
      tabIndex={0}
      className={[
        'group relative h-[500px] md:h-[600px] w-full overflow-hidden cursor-pointer',
        'rounded-3xl border border-white/10 bg-apex-surface/80',
        'transition-all duration-300',
        'md:hover:-translate-y-1 md:hover:border-apex-gold/40 md:hover:shadow-[0_0_40px_rgba(255,215,128,0.25)]',
        isActive ? 'z-10 md:z-0' : 'z-0',
      ].join(' ')}
    >
      {/* Capa de fondo de imagen con parallax suave */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="h-full w-full transition-transform duration-200 will-change-transform"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <Image
            src={coach.image}
            alt={coach.name}
            fill
            className={[
              'object-cover transition-all duration-700 ease-out',
              // Mobile: ya directo en color (más simple y fluido)
              'grayscale-0 scale-105',
              // Desktop: gris → color en hover
              'md:scale-100 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105',
            ].join(' ')}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Overlay gradiente para contraste */}
        <div
          className={[
            'absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-transparent transition-opacity duration-300',
            isActive ? 'opacity-100' : 'opacity-90',
            'md:opacity-90 md:group-hover:opacity-95',
          ].join(' ')}
        />
      </div>

      {/* CONTENIDO */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Header: nombre + rol + hint mobile */}
        <div
          className={[
            'relative transition-transform duration-300',
            isActive ? '-translate-y-3' : 'translate-y-0',
            'md:group-hover:-translate-y-4',
          ].join(' ')}
        >
          <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span className="p-1.5 rounded-full bg-apex-gold/20 text-apex-gold border border-apex-gold/30">
              {coach.icon}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-apex-gold font-bold">
              Head Coach
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-1">
            {coach.name}
          </h3>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
            {coach.specialty}
          </p>

          {/* Hint solo en mobile */}
          <p className="mt-2 text-[11px] text-white/65 flex items-center gap-1 md:hidden">
            Toca para ver detalles
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* PANEL DESLIZANTE: descripción */}
        <div
          className={[
            'absolute inset-x-4 md:inset-x-5 bottom-4 md:bottom-6',
            'transition-all duration-300 ease-out',
            // Mobile: solo opacity + translate (sin max-height)
            isActive
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-4 opacity-0 pointer-events-none',
            // Desktop: hover manda, el estado mobile no afecta
            'md:translate-y-4 md:opacity-0 md:pointer-events-none md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto',
          ].join(' ')}
        >
          <div className="bg-apex-bg/95 border border-white/10 rounded-2xl p-4 md:p-5 shadow-xl">
            {/* Frase / Quote */}
            <p className="text-sm md:text-base text-white font-light leading-snug italic mb-3 md:mb-4">
              &quot;{coach.quote}&quot;
            </p>

            {/* Bio */}
            <p className="text-[11px] md:text-sm text-apex-gray font-light leading-relaxed mb-3 md:mb-4">
              {coach.bio}
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {coach.skills.map((skill, idx) => (
                <span
                  key={skill}
                  className="px-2 md:px-3 py-1 text-[10px] uppercase tracking-[0.16em] border border-white/10 text-white/80 rounded-full transition-all duration-300 hover:border-apex-gold/40 hover:bg-apex-gold/10 hover:text-white"
                  style={{
                    transitionDelay: `${idx * 60}ms`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="w-full py-3 md:py-3.5 bg-white text-apex-bg text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] rounded-full flex items-center justify-center gap-2 group/btn transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_45px_rgba(255,215,128,0.35)] hover:bg-apex-gold hover:-translate-y-0.5"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Entrenar con {coach.name.split(' ')[0]}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
