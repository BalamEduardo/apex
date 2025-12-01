import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 1. Capa Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="Hb.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/videoHero.webm" type="video/webm" />
        {/* Fallback para navegadores que no soportan video */}
        Tu navegador no soporta el elemento de video.
      </video>

      {/* 2. Capa Overlay */}
      <div className="absolute inset-0  bg-linear-to-b from-apex-bg/60 via-transparent to-apex-bg pointer-events-none" />

      {/* 3. Capa Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6 text-center">
        
        {/* Subtítulo */}
        <span className="text-apex-gold tracking-widest-xl text-sm md:text-base font-medium mb-6 animate-hero-lift delay-100">
          WELLNESS & PERFORMANCE
        </span>

        {/* Título H1 */}
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-10 animate-hero-lift delay-200">
          CONSTRUYE TU MEJOR
          <br />
          <span className="italic font-serif text-apex-gold">MAÑANA</span>
        </h1>

        {/* CTA Button */}
        <a
          href="#contacto"
          className="group flex items-center gap-2 md:gap-3 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white text-apex-bg font-semibold text-sm md:text-lg transition-all duration-300 hover:bg-apex-gold hover:scale-105 animate-hero-lift delay-300"
        >
          <span>EMPEZAR AHORA</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
