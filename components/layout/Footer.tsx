import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-apex-bg text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Columna 1: Marca */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-widest-xl">APEX</h2>
            <p className="text-apex-gray max-w-xs font-light">
              Redefiniendo el estándar del fitness moderno.
            </p>
          </div>

          {/* Columna 2: Contacto + Mapa */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">
              CONTACTO
            </h3>

            <address className="not-italic flex flex-col gap-4 text-apex-gray">
              <a
                href="mailto:hello@apex-studio.com"
                className="hover:text-apex-gold transition-colors"
              >
                hello@apex-studio.com
              </a>
              <p>Polanco, CDMX</p>
            </address>

            {/* Label del mapa */}
            <p className="text-[11px] uppercase tracking-widest text-apex-gold/80">
              Ubicación en mapa
            </p>

            {/* Mapa embebido */}
            <div className="mt-2 rounded-lg overflow-hidden border border-white/10 h-56 md:h-48">
              <iframe
                title="Ubicación APEX Studio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.594217897041!2d-99.203!3d19.432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8c8b2cbbfff%3A0x0000000000000000!2sPolanco%2C%20Ciudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Columna 3: Social */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">
              SOCIAL
            </h3>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-apex-gray hover:text-apex-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-apex-gray hover:text-apex-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 text-center space-y-1">
          <p className="text-xs text-apex-gray tracking-wider">
            © 2025 APEX STUDIO. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-apex-gray/80 tracking-widest-xl uppercase">
            Diseñado en CDMX
          </p>
        </div>
      </div>
    </footer>
  );
}
