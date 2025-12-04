import React from 'react';
import Image from 'next/image';

// Datos de las zonas para mantener el código limpio
const zones = [
  {
    id: 'strength',
    title: 'ZONA DE FUERZA',
    subtitle: 'STRENGTH',
    description:
      'Donde la ingeniería se encuentra con el esfuerzo humano. Equipamiento biomecánico de precisión en un entorno diseñado para la concentración absoluta.',
    layout: 'left', // Texto a la izquierda, imágenes a la derecha
    images: [
      {
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
        alt: 'Entrenamiento de fuerza 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
        alt: 'Entrenamiento de fuerza 2',
      },
    ],
  },
  {
    id: 'cardio',
    title: 'STUDIO & CARDIO',
    subtitle: 'CARDIO',
    description:
      'Ritmo, resistencia y tecnología. Nuestras zonas de cardio inmersivo te transportan mientras desafías tus límites en un espacio sin distracciones.',
    layout: 'right', // Texto a la derecha, imágenes a la izquierda
    images: [
      {
        src: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop',
        alt: 'Cardio inmersivo 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop',
        alt: 'Cardio inmersivo 2',
      },
    ],
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-apex-bg border-t border-white/5 relative">
      {zones.map((zone, index) => (
        <ZoneSection key={zone.id} zone={zone} index={index + 1} />
      ))}
    </section>
  );
}

function ZoneSection({ zone, index }: { zone: (typeof zones)[0]; index: number }) {
  const isLeft = zone.layout === 'left';

  return (
    // Contenedor Flex que alterna dirección (Zig-Zag)
    <section
      id={zone.id}
      aria-labelledby={`${zone.id}-title`}
      className={`flex flex-col ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } border-b border-white/5`}
    >
      {/* --- COLUMNA DE TEXTO --- */}
      {/* En mobile: bloque normal arriba. En desktop: sticky a la izquierda. */}
      <div
        className={`
        w-full md:w-[30%] h-auto md:h-screen 
        md:sticky md:top-0 z-20 
        flex flex-col justify-center px-8 md:px-16 
        bg-apex-bg 
        ${isLeft ? 'md:border-r' : 'md:border-l'} border-white/5
      `}
      >
        <div className="relative animate-fade-in-up py-4 md:py-0">
          {/* Línea decorativa dorada */}
          <div className="w-12 h-0.5 bg-apex-gold mb-4 md:mb-8" />

          <h2
            id={`${zone.id}-title`}
            className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-6 leading-none uppercase tracking-tighter"
          >
            {zone.title.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h2>

          <p className="text-apex-gray text-sm md:text-base leading-relaxed font-light max-w-xs">
            {zone.description}
          </p>

          <div className="mt-6 md:mt-12 flex items-center space-x-2 text-xs text-apex-gray/80 font-mono tracking-widest">
            <span className="text-apex-gold">0{index}</span>
            <div className="w-8 h-px bg-white/20" />
            <span className="uppercase">{zone.subtitle}</span>
          </div>
        </div>
      </div>

      {/* --- COLUMNA DE IMÁGENES (SCROLLABLE) --- */}
      <div className="w-full md:w-[70%] bg-apex-surface">
        {zone.images.map((img, imgIndex) => (
          <div
            key={imgIndex}
            className="relative w-full h-[60vh] md:h-screen group overflow-hidden border-b border-white/5 md:border-b-0"
          >
            {/* Imagen con Next/Image para optimización */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-all duration-1000 ease-out grayscale-30 group-hover:grayscale-0 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 70vw"
            />

            {/* Overlay oscuro que desaparece al hover */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Indicador de imagen (estética técnica) */}
            <div
              className={`
              absolute bottom-10 text-white/80 font-mono text-xs tracking-widest 
              border border-white/20 px-4 py-1 backdrop-blur-sm
              ${isLeft ? 'right-10' : 'left-10'}
            `}
            >
              0{imgIndex + 1} / 0{zone.images.length}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
