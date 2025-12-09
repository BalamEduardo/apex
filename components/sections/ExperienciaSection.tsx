'use client';

import Philosophy from './Philosophy';
import Storytelling from './Storytelling';
import Gallery from './Gallery';
import SignatureClassesSection from './Classes';

export default function ExperienciaSection() {
  return (
    <section id="experiencia" className="relative bg-apex-bg">
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
            <h1 className="text-4xl md:text-6xl  font-light text-white mb-6 tracking-tighter uppercase leading-tight">
              Experiencia
              <span className="block text-apex-gold italic font-serif">APEX</span>
            </h1>

            {/* Subtítulo con separadores */}
            <div className="flex items-center justify-center space-x-4 mb-8 text-apex-gray/80 text-xs md:text-sm font-mono tracking-widest uppercase">
              <span>Filosofía</span>
              <span className="text-apex-gold">·</span>
              <span>La Mentalidad</span>
              <span className="text-apex-gold">·</span>
              <span>Espacio &amp; Clases Signature</span>
            </div>

            {/* Párrafo introductorio */}
            <p className="text-apex-gray text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
              Más que un gimnasio, APEX es una experiencia completa donde el diseño,
              la tecnología y el enfoque personalizado convergen para crear un entorno
              que transforma no solo tu cuerpo, sino tu mentalidad hacia el alto rendimiento.
            </p>
          </div>


        </div>

        {/* Gradiente sutil de transición */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-apex-bg/50 pointer-events-none" />
      </div>

      {/* Sección 1: Filosofía */}
      <div className="relative">
        {/* Label interno decorativo */}
        <div className="sticky top-20 z-10 flex justify-center pointer-events-none py-6">
          <div className="bg-apex-bg/80 backdrop-blur-sm border border-white/10 px-6 py-2 rounded-full">
            <span className="text-apex-gold font-mono text-xs tracking-widest uppercase">
              01 · Filosofía
            </span>
          </div>
        </div>
        <Philosophy />
      </div>



      {/* Sección 2: Storytelling */}
      <div className="relative">
        {/* Label interno decorativo */}
        <div className="sticky top-20 z-10 flex justify-center pointer-events-none py-6">
          <div className="bg-apex-bg/80 backdrop-blur-sm border border-white/10 px-6 py-2 rounded-full">
            <span className="text-apex-gold font-mono text-xs tracking-widest uppercase">
              02 · La Mentalidad
            </span>
          </div>
        </div>
        <Storytelling />
      </div>



      {/* Sección 3: Espacios + Clases */}
      <div className="relative">
        {/* Label interno decorativo */}
        <div className="sticky top-20 z-10 flex justify-center pointer-events-none py-6">
          <div className="bg-apex-bg/80 backdrop-blur-sm border border-white/10 px-6 py-2 rounded-full">
            <span className="text-apex-gold font-mono text-xs tracking-widest uppercase">
              03 · Espacio &amp; Clases
            </span>
          </div>
        </div>
        <Gallery />
        <SignatureClassesSection />
      </div>



    </section>
  );
}
