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

          {/* Columna 2: Contacto */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">CONTACTO</h3>
            <div className="flex flex-col gap-4 text-apex-gray">
              <a href="mailto:hello@apex-studio.com" className="hover:text-apex-gold transition-colors">
                hello@apex-studio.com
              </a>
              <p>Polanco, CDMX</p>
            </div>
          </div>

          {/* Columna 3: Social */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">SOCIAL</h3>
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
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-apex-gray tracking-wider">
            © 2025 APEX STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
