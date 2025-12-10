"use client";

import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-apex-bg text-white border-t border-white/10">
      {/* CINTA SUPERIOR – CTA PRINCIPAL */}
      <div className="border-b border-white/10">
        <div className="max-w-[1920px] mx-auto px-6 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-[0.7rem] tracking-[0.35em] uppercase text-apex-gold/80 mb-2">
              Agenda tu visita
            </p>
            <h3 className="text-xl md:text-2xl font-light text-white/90">
              Un espacio diseñado para alto rendimiento, no para multitudes.
            </h3>
          </div>
          <a
            href="#contacto"
            aria-label="Solicitar tour privado - Ir a formulario de contacto"
            className="inline-flex items-center justify-center px-6 py-3 min-h-11 border border-apex-gold text-apex-gold text-xs font-bold uppercase tracking-[0.2em] hover:bg-apex-gold hover:text-apex-bg transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg"
          >
            Solicitar tour privado
          </a>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-[1920px] mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Marca / Manifiesto */}
          <div className="relative flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-[0.7rem] tracking-[0.35em] uppercase text-apex-gold">
                APEX STUDIO
              </p>
              <p className="text-apex-gray text-sm max-w-xs font-light leading-relaxed">
                House of performance. Un gimnasio para quienes tratan su cuerpo como su activo más valioso.
              </p>
            </div>

            {/* Ghost word grande detrás */}
            <div className="hidden md:block pointer-events-none select-none">
              <span className="text-5xl xl:text-6xl font-bold tracking-[0.35em] text-white/5">
                APEX
              </span>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <nav className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest-xl uppercase text-white">
              Estudio
            </h4>
            <ul className="space-y-2 text-sm text-apex-gray">
              <li>
                <a href="#filosofia" className="hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded inline-block">
                  Filosofía
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded inline-block">
                  Zonas & Espacios
                </a>
              </li>
              <li>
                <a href="#membresias" className="hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded inline-block">
                  Membresías
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded inline-block">
                  Calculadora TDEE
                </a>
              </li>
            </ul>
          </nav>

          {/* Columna 3: Contacto + Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold tracking-widest-xl uppercase text-white">
                Contacto
              </h4>
              <address className="not-italic mt-3 space-y-2 text-sm text-apex-gray">
                <a
                  href="mailto:hello@apex-studio.com"
                  className="hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded inline-block"
                >
                  hello@apex-studio.com
                </a>
                <p>Polanco, CDMX</p>
              </address>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest-xl uppercase text-white mb-3">
                Social
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apex-gray hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded p-1"
                  aria-label="Visítanos en Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apex-gray hover:text-apex-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded p-1"
                  aria-label="Visítanos en LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna 4: Mapa */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest-xl uppercase text-white">
              Ubicación
            </h4>
            <p className="text-[11px] text-apex-gray uppercase tracking-[0.2em]">
              Ver en mapa
            </p>
            <div className="rounded-lg overflow-hidden border border-white/10 bg-apex-surface/40 h-56 md:h-48">
              <iframe
                title="Ubicación APEX Studio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.594217897041!2d-99.203!3d19.432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8c8b2cbbfff%3A0x0000000000000000!2sPolanco%2C%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>

        {/* LÍNEA INFERIOR */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-apex-gray tracking-[0.18em] uppercase text-center md:text-left">
            © 2025 APEX STUDIO · Todos los derechos reservados
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-[11px] text-apex-gray/80 tracking-[0.18em] uppercase">
            <span>Diseñado en CDMX</span>
            <span className="hidden md:inline-block h-px w-8 bg-white/10" />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Volver arriba"
              className="text-apex-gold hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded px-2 py-1"
            >
              className="hover:text-apex-gold transition-colors"
            
              Volver arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
