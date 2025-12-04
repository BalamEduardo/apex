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

  // Hook de scroll para detectar el progreso del scroll vertical
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transformamos el scroll vertical en desplazamiento horizontal (de derecha a izquierda)
  // cardWidth debe coincidir con w-[400px] en la clase de la tarjeta
  const cardWidth = 400; // Ancho aproximado de cada tarjeta
  const gap = 32; // Gap entre tarjetas
  const totalCards = TESTIMONIALS.length;
  const totalWidth = totalCards * (cardWidth + gap);

  // El desplazamiento irá de 0 (inicio) a -totalWidth (final)
  // El 800 es un valor ajustado para que el último card no desaparezca por completo del viewport
  const x = useTransform(scrollYProgress, [0, 1], [200, -totalWidth + 800]);

  return (
    <section
      ref={containerRef}
      id="testimonios"
      className="relative bg-apex-bg border-t border-white/5"
      style={{ height: '300vh' }} // Altura suficiente para permitir scroll
    >
      {/* Contenedor sticky que se mantiene fijo mientras hacemos scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fondo decorativo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-apex-gold/5 blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-white/3 blur-[110px]" />
        </div>

        {/* Grid principal */}
        <div className="relative flex h-full flex-col lg:flex-row items-center">
          {/* Columna Izquierda - Texto Fijo (30-40%) */}
          <div className="w-full lg:w-[35%] pl-8 lg:pl-16 xl:pl-24 pr-8 mb-10 lg:mb-0">
            <div className="space-y-6">
              {/* Badge superior */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-apex-gold" />
                <p className="text-[0.7rem] tracking-[0.35em] uppercase text-apex-gold font-semibold">
                  Testimonios
                </p>
              </div>

              {/* Título principal */}
              <h2 className="text-4xl lg:text-5xl xl:text-6xl text-white font-light tracking-tight leading-[1.1]">
                LO QUE DICEN{' '}
                <span className="block mt-2 font-serif italic text-apex-gold">
                  DE NOSOTROS
                </span>
              </h2>

              {/* Descripción */}
              <p className="text-sm lg:text-base text-white/60 leading-relaxed max-w-md">
                Voces reales que confirman que APEX no es solo un gimnasio, sino
                un espacio diseñado para altos estándares de rendimiento, enfoque
                y estética absoluta.
              </p>

              {/* Línea decorativa inferior */}
              <div className="pt-4">
                <div className="h-px w-20 bg-linear-to-r from-apex-gold to-transparent" />
              </div>
            </div>
          </div>

          {/* Columna Derecha - Tarjetas con Scroll Horizontal (60-70%) */}
          <div className="w-full lg:w-[65%] h-full flex items-center overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex gap-8 px-8"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className="shrink-0 w-[400px] h-[480px] relative group"
                >
                  {/* Tarjeta */}
                  <div className="h-full relative overflow-hidden border border-white/10 bg-apex-surface/80 backdrop-blur-sm p-8 transition-all duration-500">
                    {/* Contenido */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icono comillas */}
                      <Quote
                        className="h-10 w-10 text-apex-gold/30 mb-6"
                        aria-hidden="true"
                      />

                      {/* Nombre arriba */}
                      <div className="mb-6 flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-apex-gold font-semibold">
                        <span className="h-px w-6 bg-apex-gold/50" />
                        <span>{testimonial.name}</span>
                      </div>

                      {/* Cita */}
                      <blockquote className="grow mb-8">
                        <p className="text-lg lg:text-xl leading-relaxed text-white/85 font-serif italic">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>

                      {/* Footer solo con la función / título */}
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

        {/* Indicador de scroll (opcional) */}
        <div className="absolute bottom-8 left-8 lg:left-16 xl:left-24 flex items-center gap-3">
          <div className="h-px w-12 bg-white/20" />
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-white/40">
            Desliza para ver más
          </p>
        </div>
      </div>
    </section>
  );
}
