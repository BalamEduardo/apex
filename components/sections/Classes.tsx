'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Datos de las clases signature
const signatureClasses = [
  {
    id: 'box',
    name: 'BOX',
    description:
      'Técnica depurada, poder controlado. Cada golpe es una declaración de precisión bajo la guía de campeones.',
    intensity: 'INTENSIDAD ALTA',
    duration: '50 MIN',
    image:
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'crossfit',
    name: 'CROSSFIT',
    description:
      'Funcionalidad sin límites. Construye resistencia mental y física a través de movimientos que desafían todo tu sistema.',
    intensity: 'FOCO TÉCNICO',
    duration: '60 MIN',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'spinning',
    name: 'SPINNING',
    description:
      'Ritmo inmersivo, energía colectiva. Pedalea hacia nuevos umbrales cardiovasculares en un ambiente diseñado para la intensidad.',
    intensity: 'CARDIO EXTREMO',
    duration: '45 MIN',
    image:
      'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=2094&auto=format&fit=crop',
  },
];

const apexEase = [0.16, 1, 0.3, 1] as const;

// Sección completa
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: apexEase,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Rail (lista de clases)
const railVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: apexEase },
  },
};

// Contenedor del hero
const panelVariants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: apexEase, delay: 0.05 },
  },
};

// Cambio entre clases activas (dentro del hero)
const heroVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: apexEase },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.99,
    transition: { duration: 0.25, ease: apexEase },
  },
};

export default function SignatureClassesSection() {
  const [activeId, setActiveId] = useState<string>(signatureClasses[0]?.id);
  const activeClass =
    signatureClasses.find((c) => c.id === activeId) ?? signatureClasses[0];

  return (
    <section
      id="clases"
      aria-labelledby="clases-title"
      className="border-t border-white/5 bg-apex-bg py-20 md:py-28 px-8 md:px-16"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Encabezado */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          variants={sectionVariants}
        >
          <div className="w-12 h-0.5 bg-apex-gold mx-auto mb-6" />

          <h2
            id="clases-title"
            className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-3 leading-none uppercase tracking-tighter"
          >
            Clases
        
          </h2>

          <div className="flex items-center justify-center space-x-3 text-[11px] md:text-xs text-apex-gray/80 font-mono tracking-widest uppercase">
            <span>Box</span>
            <span className="text-apex-gold">·</span>
            <span>CrossFit</span>
            <span className="text-apex-gold">·</span>
            <span>Spinning</span>
          </div>
        </motion.div>

        {/* Layout: rail + hero más compacto */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-10 lg:gap-14 items-start">
          {/* Rail de clases (selector) */}
          <motion.div
            className="lg:sticky lg:top-28 space-y-6"
            variants={railVariants}
          >
            <p className="text-apex-gray text-[11px] md:text-xs font-light uppercase tracking-widest mb-1">
              Selecciona una sala
            </p>

            <ul
              role="tablist"
              aria-label="Clases Signature APEX"
              className="space-y-2"
            >
              {signatureClasses.map((clase, index) => {
                const isActive = clase.id === activeId;
                return (
                  <li key={clase.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`clase-panel-${clase.id}`}
                      onClick={() => setActiveId(clase.id)}
                      className={`
                        w-full flex items-center justify-between gap-4 
                        border-l-2 px-4 py-3
                        transition-all duration-300 text-left
                        ${
                          isActive
                            ? 'border-apex-gold bg-apex-surface/60'
                            : 'border-white/10 hover:border-apex-gold/60 hover:bg-apex-surface/30'
                        }
                      `}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-[11px] text-apex-gold/70 font-mono tracking-widest">
                          0{index + 1}
                        </span>
                        <span
                          className={`
                            text-xs md:text-sm uppercase tracking-widest 
                            ${
                              isActive
                                ? 'text-white'
                                : 'text-apex-gray'
                            }
                          `}
                        >
                          {clase.name}
                        </span>
                      </div>

                      <span className="hidden md:inline-block text-[11px] text-apex-gray/80 font-mono tracking-widest">
                        {clase.duration}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="text-[10px] text-apex-gray/70 font-mono uppercase tracking-widest max-w-xs">
              Coreografiado para el alto rendimiento. Luz, sonido y ritmo
              diseñados para que cada minuto cuente.
            </p>
          </motion.div>

          {/* Hero de clase activa (más pequeño / compacto) */}
          <motion.div
            role="tabpanel"
            id={`clase-panel-${activeClass.id}`}
            aria-labelledby={activeClass.id}
            className="max-w-3xl lg:max-w-4xl ml-auto"
            variants={panelVariants}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeClass.id}
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-apex-surface/50 border border-apex-gold/10 overflow-hidden rounded-xl md:rounded-2xl shadow-2xl shadow-apex-gold/10"
              >
                {/* Imagen más baja */}
                <div className="relative h-52 md:h-60 lg:h-64 overflow-hidden">
                  <Image
                    src={activeClass.image}
                    alt={`Clase de ${activeClass.name}`}
                    fill
                    className="object-cover grayscale-40 hover:grayscale-0 hover:scale-110 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-apex-bg via-apex-bg/70 to-transparent" />

                  {/* Badges flotantes */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <span className="text-[0.6rem] tracking-widest uppercase bg-apex-gold/90 text-apex-bg px-3 py-1 font-bold backdrop-blur-sm">
                      {activeClass.intensity}
                    </span>
                    <span className="text-[0.6rem] tracking-widest uppercase bg-white/10 text-white/90 px-3 py-1 font-mono backdrop-blur-sm border border-white/20">
                      {activeClass.duration}
                    </span>
                  </div>
                </div>

                {/* Contenido más compacto */}
                <div className="p-6 md:p-7 lg:p-8">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] text-apex-gold/70 font-mono tracking-widest uppercase">
                        Signature Studio
                      </span>
                      <span className="hidden md:inline-block w-8 h-px bg-apex-gold/60" />
                    </div>
                    <span className="text-[10px] text-apex-gray/80 font-mono tracking-widest uppercase">
                      Capacidad limitada
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-3">
                    {activeClass.name}
                  </h3>

                  <p className="text-apex-gray text-sm md:text-base leading-relaxed font-light mb-5 max-w-xl">
                    {activeClass.description}
                  </p>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="relative h-px bg-white/10 overflow-hidden">
                        <div className="absolute inset-0 bg-apex-gold scale-x-100 origin-left" />
                      </div>
                      <p className="mt-3 text-[10px] text-apex-gray/80 font-mono uppercase tracking-widest">
                        Sin clases genéricas. Cada sesión está periodizada para
                        progresar, no solo para cansarte.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-5 py-3 border border-apex-gold/60 text-[11px] font-bold uppercase tracking-widest text-apex-gold hover:bg-apex-gold hover:text-apex-bg transition-colors duration-300"
                    >
                      Ver horarios de {activeClass.name}
                    </button>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
