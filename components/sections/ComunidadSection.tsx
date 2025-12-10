'use client';

import Coaches from './Coaches';
import Testimonials from './Testimonials';

export default function ComunidadSection() {
  return (
    <section id="comunidad" className="relative bg-apex-bg">
      {/* Encabezado Editorial de Capítulo */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto px-8 md:px-16 py-20 md:py-32">
          {/* Línea decorativa superior */}
          <div className="flex items-center justify-center mb-12 md:mb-16">
            <div className="h-px bg-white/10 w-20" />
            <div className="h-px bg-apex-gold w-12 mx-3" />
            <div className="h-px bg-white/10 w-20" />
          </div>

          {/* Título principal */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tighter uppercase leading-tight">
              Comunidad
              <span className="block text-apex-gold italic font-serif">APEX</span>
            </h1>

            {/* Subtítulo con separadores */}
            <div className="flex items-center justify-center space-x-4 mb-8 text-apex-gray/80 text-xs md:text-sm font-mono tracking-widest uppercase">
              <span>Coaches</span>
              <span className="text-apex-gold">·</span>
              <span>Testimonios</span>
            </div>

            {/* Párrafo introductorio */}
            <p className="text-apex-gray text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
              En APEX, no estás solo en tu camino. Nuestro equipo de coaches élite y una 
              comunidad de individuos de alto rendimiento te rodean, inspiran y empujan a 
              alcanzar versiones de ti mismo que no creías posibles.
            </p>
          </div>
        </div>

        {/* Gradiente sutil de transición */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-apex-bg/50 pointer-events-none" />
      </div>

      {/* Sección 1: Coaches */}
      <div className="relative">
        {/* Label interno decorativo */}
        <div className="sticky top-20 z-20 flex justify-center pointer-events-none py-6">
          <div className="bg-apex-bg/90 backdrop-blur-md border border-apex-gold/30 px-4 sm:px-6 py-2.5 sm:py-2 rounded-full shadow-lg shadow-black/20">
            <span className="text-apex-gold font-mono text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
              01 · Coaches
            </span>
          </div>
        </div>
        <Coaches />
      </div>

      {/* Sección 2: Testimonios */}
      <div className="relative">
        {/* Label interno decorativo */}
        <div className="sticky top-20 z-20 flex justify-center pointer-events-none py-6">
          <div className="bg-apex-bg/90 backdrop-blur-md border border-apex-gold/30 px-4 sm:px-6 py-2.5 sm:py-2 rounded-full shadow-lg shadow-black/20">
            <span className="text-apex-gold font-mono text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
              02 · Testimonios
            </span>
          </div>
        </div>
        <Testimonials />
      </div>
    </section>
  );
}
