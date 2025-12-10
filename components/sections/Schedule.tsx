// components/sections/ClassSchedule.tsx
'use client';

import { motion } from 'framer-motion';
import { apexEase } from '@/lib/animations';

type ScheduleSlot = {
  time: string;
  name: string;
  focus: string;
  intensity: 'BAJA' | 'MEDIA' | 'ALTA';
};

type ScheduleDay = {
  id: string;
  label: string;
  short: string;
  slots: ScheduleSlot[];
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: apexEase,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const dayCardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: apexEase,
    },
  },
};

const SCHEDULE: ScheduleDay[] = [
  {
    id: 'monday',
    label: 'Lunes',
    short: 'LUN',
    slots: [
      { time: '06:00', name: 'BOX', focus: 'Golpeo Técnico', intensity: 'ALTA' },
      { time: '07:00', name: 'CROSSFIT', focus: 'Fuerza Funcional', intensity: 'ALTA' },
      { time: '19:00', name: 'SPINNING', focus: 'Cardio Umbral', intensity: 'MEDIA' },
    ],
  },
  {
    id: 'tuesday',
    label: 'Martes',
    short: 'MAR',
    slots: [
      { time: '06:30', name: 'SPINNING', focus: 'Endurance', intensity: 'MEDIA' },
      { time: '07:30', name: 'CROSSFIT', focus: 'Metcon', intensity: 'ALTA' },
      { time: '20:00', name: 'BOX', focus: 'Sparring Controlado', intensity: 'ALTA' },
    ],
  },
  {
    id: 'wednesday',
    label: 'Miércoles',
    short: 'MIÉ',
    slots: [
      { time: '06:00', name: 'CROSSFIT', focus: 'Halting Strength', intensity: 'ALTA' },
      { time: '19:00', name: 'BOX', focus: 'Combinaciones', intensity: 'MEDIA' },
      { time: '20:00', name: 'SPINNING', focus: 'HIIT', intensity: 'ALTA' },
    ],
  },
  {
    id: 'thursday',
    label: 'Jueves',
    short: 'JUE',
    slots: [
      { time: '06:30', name: 'BOX', focus: 'Footwork & Timing', intensity: 'MEDIA' },
      { time: '07:30', name: 'SPINNING', focus: 'Climb Session', intensity: 'MEDIA' },
      { time: '19:30', name: 'CROSSFIT', focus: 'Gymnastics Skill', intensity: 'MEDIA' },
    ],
  },
  {
    id: 'friday',
    label: 'Viernes',
    short: 'VIE',
    slots: [
      { time: '06:00', name: 'SPINNING', focus: 'Endurance Flow', intensity: 'MEDIA' },
      { time: '07:00', name: 'CROSSFIT', focus: 'Benchmark WOD', intensity: 'ALTA' },
      { time: '18:30', name: 'BOX', focus: 'Power Rounds', intensity: 'ALTA' },
    ],
  },
  {
    id: 'saturday',
    label: 'Sábado',
    short: 'SÁB',
    slots: [
      { time: '08:00', name: 'CROSSFIT', focus: 'Team WOD', intensity: 'ALTA' },
      { time: '09:00', name: 'SPINNING', focus: 'Ride & Rhythm', intensity: 'MEDIA' },
      { time: '10:00', name: 'BOX', focus: 'Fundamentos', intensity: 'BAJA' },
    ],
  },
];

export default function ClassScheduleSection() {
  return (
    <section
      id="horario"
      aria-labelledby="horario-title"
      className="bg-apex-bg border-t border-white/5 py-20 md:py-28 px-8 md:px-16"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Encabezado */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          variants={dayCardVariants}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-white/10" />
              <div className="h-px w-10 bg-apex-gold" />
              <div className="h-px w-16 bg-white/10" />
            </div>

            <h2
              id="horario-title"
              className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tighter uppercase leading-tight"
            >
              Horario
              <span className="block text-apex-gold italic font-serif">
                Signature Studio
              </span>
            </h2>

            <p className="mt-4 text-apex-gray text-sm md:text-base font-light leading-relaxed">
              Estructura semanal fija, pensada para que diseñes rituales de entrenamiento
              y eleves tu rendimiento sin depender del azar.
            </p>
          </div>

          <div className="text-xs md:text-[11px] text-apex-gray/80 font-mono tracking-widest uppercase space-y-2">
            <p>Formato cartel · Horario recurrente</p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-apex-gold" />
              <span>Alta intensidad</span>
            </p>
          </div>
        </motion.div>

        {/* Grid de días (formato cartel) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={sectionVariants}
        >
          {SCHEDULE.map((day) => (
            <motion.article
              key={day.id}
              variants={dayCardVariants}
              className="relative bg-apex-surface border border-white/10 overflow-hidden group"
            >
              {/* Barra lateral dorada */}
              <div className="absolute inset-y-0 left-0 w-1 bg-apex-gold/80 group-hover:bg-apex-gold transition-colors" />

              {/* Cabecera del día */}
              <header className="px-6 pt-5 pb-4 md:px-7 md:pt-6 md:pb-5 border-b border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-apex-gray/70 font-mono tracking-widest uppercase">
                    {day.short}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold text-white tracking-wide uppercase">
                    {day.label}
                  </h3>
                </div>
                <span className="text-[10px] text-apex-gray/70 font-mono uppercase tracking-widest">
                  {day.slots.length} sesiones
                </span>
              </header>

              {/* Sesiones del día */}
              <ul className="px-6 md:px-7 py-4 md:py-5 space-y-3">
                {day.slots.map((slot, index) => (
                  <li
                    key={`${day.id}-${slot.time}-${slot.name}-${index}`}
                    className="flex items-start gap-4"
                  >
                    {/* Hora */}
                    <div className="pt-1">
                      <p className="text-xs text-apex-gray/80 font-mono tracking-widest">
                        {slot.time}
                      </p>
                    </div>

                    {/* Info de clase */}
                    <div className="flex-1 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <p className="text-sm font-semibold uppercase tracking-widest text-white">
                          {slot.name}
                        </p>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                            slot.intensity === 'ALTA'
                              ? 'border-apex-gold/80 text-apex-gold'
                              : slot.intensity === 'MEDIA'
                              ? 'border-white/20 text-white/80'
                              : 'border-apex-gray/50 text-apex-gray/80'
                          }`}
                        >
                          {slot.intensity}
                        </span>
                      </div>

                      <p className="text-[12px] text-apex-gray font-light leading-snug">
                        {slot.focus}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Línea inferior animada */}
              <div className="relative h-px bg-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-apex-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Nota legal / microcopy */}
        <motion.p
          className="mt-10 text-[10px] text-apex-gray/60 font-mono uppercase tracking-widest text-center"
          variants={dayCardVariants}
        >
          * Horarios sujetos a ajuste por temporada. Actualización mensual en recepción APEX.
        </motion.p>
      </motion.div>
    </section>
  );
}
