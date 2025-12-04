'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';

type Testimonial = {
  roleLabel: string;
  name: string;
  title: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    roleLabel: 'El Ejecutivo',
    name: 'Carlos M.',
    title: 'Director de Estrategia',
    quote:
      'El único lugar donde el caos de la ciudad desaparece. Diseño impecable y enfoque total. Es mi santuario diario.',
  },
  {
    roleLabel: 'El Atleta',
    name: 'Ana R.',
    title: 'Competidora de Cross Training',
    quote:
      'No es solo estética. El equipamiento biomecánico está a otro nivel. Aquí se entrena de verdad, sin distracciones.',
  },
  {
    roleLabel: 'El Esteta',
    name: 'Julián P.',
    title: 'Arquitecto & Diseñador',
    quote:
      'Más que un gimnasio, es un ritual. La atmósfera te obliga a dar tu mejor versión. Cada detalle arquitectónico inspira.',
  },
  {
    roleLabel: 'La Visionaria',
    name: 'Elena S.',
    title: 'CEO Tech Startup',
    quote:
      'La claridad mental que consigo aquí es invaluable. Un espacio donde la excelencia física alimenta la excelencia profesional.',
  },
  {
    roleLabel: 'El Innovador',
    name: 'Ricardo T.',
    title: 'Fundador de StartUp',
    quote:
      'APEX no es un lugar para atajos. Es un espacio donde la disciplina y el diseño se encuentran para crear resultados extraordinarios.',
  },
  {
    roleLabel: 'La Profesional',
    name: 'Daniela V.',
    title: 'Médico Cirujano',
    quote:
      'La precisión con la que está diseñado cada espacio refleja mi filosofía de vida. Aquí todo tiene un propósito y una razón de ser.',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll solo para desktop (el contenedor desktop tiene la ref)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const cardWidth = 400;
  const gap = 32;
  const totalCards = TESTIMONIALS.length;
  const totalWidth = totalCards * (cardWidth + gap);

  const x = useTransform(scrollYProgress, [0, 1], [200, -totalWidth + 800]);

  return (
    <section id="testimonios" className="relative bg-apex-bg border-t border-white/5">
      {/* MOBILE / TABLET: layout simple, sin framer-motion pesado */}
      <div className="block lg:hidden px-6 py-16">
        {/* Texto intro */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-apex-gold" />
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-apex-gold font-semibold">
              Testimonios
            </p>
          </div>

          <h2 className="text-3xl text-white font-light tracking-tight leading-[1.1]">
            LO QUE DICEN{' '}
            <span className="block mt-2 font-serif italic text-apex-gold">
              DE NOSOTROS
            </span>
          </h2>

          <p className="text-sm text-white/60 leading-relaxed max-w-md">
            Voces reales que confirman que APEX no es solo un gimnasio, sino un espacio
            diseñado para altos estándares de rendimiento, enfoque y estética absoluta.
          </p>
        </div>

        {/* Carrusel horizontal nativo */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-[280px] h-auto relative group"
            >
              <div className="h-full relative overflow-hidden border border-white/10 bg-apex-surface/80 backdrop-blur-sm p-6">
                <div className="relative z-10 h-full flex flex-col">
                  <Quote
                    className="h-8 w-8 text-apex-gold/30 mb-4"
                    aria-hidden="true"
                  />
                  <div className="mb-4 flex items-center gap-2 text-[0.6rem] tracking-[0.3em] uppercase text-apex-gold font-semibold">
                    <span className="h-px w-6 bg-apex-gold/50" />
                    <span>{testimonial.name}</span>
                  </div>
                  <blockquote className="mb-4">
                    <p className="text-base leading-relaxed text-white/85 font-serif italic">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <p className="text-[0.65rem] tracking-[0.3em] uppercase text-apex-gold font-semibold">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: versión sticky + scroll horizontal con Framer Motion */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Fondo decorativo */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-apex-gold/5 blur-[120px]" />
            <div className="absolute right-[-10%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-white/3 blur-[110px]" />
          </div>

          {/* Grid principal */}
          <div className="relative flex h-full items-center">
            {/* Columna Izquierda */}
            <div className="w-[35%] pl-16 xl:pl-24 pr-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-apex-gold" />
                  <p className="text-[0.7rem] tracking-[0.35em] uppercase text-apex-gold font-semibold">
                    Testimonios
                  </p>
                </div>

                <h2 className="text-4xl lg:text-5xl xl:text-6xl text-white font-light tracking-tight leading-[1.1]">
                  LO QUE DICEN{' '}
                  <span className="block mt-2 font-serif italic text-apex-gold">
                    DE NOSOTROS
                  </span>
                </h2>

                <p className="text-sm lg:text-base text-white/60 leading-relaxed max-w-md">
                  Voces reales que confirman que APEX no es solo un gimnasio, sino
                  un espacio diseñado para altos estándares de rendimiento, enfoque
                  y estética absoluta.
                </p>

                <div className="pt-4">
                  <div className="h-px w-20 bg-linear-to-r from-apex-gold to-transparent" />
                </div>
              </div>
            </div>

            {/* Columna Derecha - Scroll horizontal */}
            <div className="w-[65%] h-full flex items-center overflow-hidden">
              <motion.div style={{ x }} className="flex gap-8 px-8">
                {TESTIMONIALS.map((testimonial, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-[400px] h-[480px] relative group"
                  >
                    <div className="h-full relative overflow-hidden border border-white/10 bg-apex-surface/80 backdrop-blur-sm p-8 transition-all duration-500">
                      <div className="relative z-10 h-full flex flex-col">
                        <Quote
                          className="h-10 w-10 text-apex-gold/30 mb-6"
                          aria-hidden="true"
                        />

                        <div className="mb-6 flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-apex-gold font-semibold">
                          <span className="h-px w-6 bg-apex-gold/50" />
                          <span>{testimonial.name}</span>
                        </div>

                        <blockquote className="grow mb-8">
                          <p className="text-lg lg:text-xl leading-relaxed text-white/85 font-serif italic">
                            "{testimonial.quote}"
                          </p>
                        </blockquote>

                        <div className="border-t border-white/10 pt-6">
                          <p className="text-xs tracking-[0.3em] uppercase text-apex-gold font-semibold mb-2">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-16 xl:left-24 flex items-center gap-3">
            <div className="h-px w-12 bg-white/20" />
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40">
              Desplázate para ver más
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
