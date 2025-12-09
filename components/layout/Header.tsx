'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Calculator, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

type MenuToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const MenuToggleButton = ({ isOpen, onToggle }: MenuToggleButtonProps) => {
  const lineBase =
    'block h-0.5 w-4 md:w-6 rounded-full bg-apex-bg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
      className={`group fixed left-4 top-4 sm:left-6 sm:top-5 z-70 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-500 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg ${isOpen ? 'bg-apex-gold shadow-apex-gold/10' : 'bg-white/95 shadow-black/20 hover:shadow-black/30'
        }`}
    >
      <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
      <span className="relative flex w-5 md:w-6 flex-col items-center justify-center gap-1.5">
        <span
          aria-hidden
          className={`${lineBase} ${isOpen
            ? 'translate-y-2 rotate-45'
            : 'group-hover:translate-y-1.5'
            }`}
        />
        <span
          aria-hidden
          className={`${lineBase} ${isOpen ? 'opacity-0' : 'group-hover:scale-x-0'
            }`}
        />
        <span
          aria-hidden
          className={`${lineBase} ${isOpen
            ? '-translate-y-2 -rotate-45'
            : 'group-hover:-translate-y-1.5'
            }`}
        />
      </span>
    </button>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // initialize
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: 'INICIO', href: '/#hero', description: 'Bienvenida' },
    { label: 'EXPERIENCIA', href: '/#experiencia', description: 'Filosofía · Espacio · Clases' },
    { label: 'COACHES', href: '/#coaches', description: 'Nuestro equipo' },
    { label: 'TESTIMONIOS', href: '/#testimonios', description: 'Lo que dicen' },
    { label: 'MEMBRESÍAS', href: '/#membresias', description: 'Planes exclusivos' },
    { label: 'CONTACTO', href: '/#contacto', description: 'Agenda tu visita' },
  ];

  return (
    <>
      <MenuToggleButton isOpen={isMenuOpen} onToggle={toggleMenu} />

      {/* Header Principal - Flotante y Transparente */}
      <header
        className={`fixed w-full top-0 z-50 px-6 py-4 transition-all duration-300 ${!isHome || scrolled ? 'backdrop-blur-sm bg-apex-bg/50' : 'bg-transparent'
          }`}
      >
        <div className="relative flex items-center justify-between max-w-[1920px] mx-auto">

          {/* Izquierda: espacio reservado para mantener el balance visual */}
          <div className="w-10 h-10 md:w-12 md:h-12" />

          {/* Centro: Logo APEX */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="group flex items-center gap-3 text-2xl font-bold tracking-widest-xl text-white hover:text-apex-gold transition-colors duration-300 ease-smooth font-sans"
            >
              {/* Logo simbolo: diamante (square rotado) con punto central */}
              <span className="relative inline-flex w-5 h-5 items-center justify-center">
                <span className="block w-5 h-5 border border-white/90 rotate-45 transition-all duration-700 ease-smooth group-hover:border-apex-gold group-hover:rotate-135deg"></span>
                <span className="absolute w-1.5 h-1.5 bg-white rounded-full transition-colors duration-700 ease-smooth group-hover:bg-apex-gold"></span>
              </span>
              <span className="tracking-widest-xl">APEX</span>
            </Link>
          </div>

          {/* Derecha: Calculadora TDEE */}
          <Link
            href="/calculadora"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-apex-bg font-medium hover:bg-apex-gold transition-colors duration-300 ease-smooth"
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[0.670rem] tracking-wider">CALCULADORA TDEE</span>
          </Link>

          {/* Mobile Icon for Calculator */}
          <Link
            href="/calculadora"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white text-apex-bg hover:bg-apex-gold transition-colors duration-300 ease-smooth"
          >
            <Calculator className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Menú Overlay */}
      <div
        className={`fixed inset-0 z-60 bg-apex-bg/98 md:bg-apex-bg/95 md:backdrop-blur-xl transition-opacity duration-500 ease-smooth ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="relative flex flex-col h-full p-6">
          {/* Header del Overlay */}
          <div className="flex justify-center items-center pt-2 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* Logo símbolo pequeño */}
              <span className="relative inline-flex w-4 h-4 items-center justify-center">
                <span className="block w-4 h-4 border border-apex-gold rotate-45"></span>
                <span className="absolute w-1 h-1 bg-apex-gold rounded-full"></span>
              </span>
              <span className="text-lg font-bold tracking-widest-xl text-white">APEX</span>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <nav className="flex-1 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 gap-4 md:gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={toggleMenu}
                className="group relative overflow-hidden"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms',
                }}
              >
                <div
                  className={`flex items-baseline gap-4 transform transition-all duration-500 ease-smooth ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} `}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 80}ms` : '0ms',
                  }}
                >
                  <span className="text-xs text-apex-gold/60 font-mono tracking-wider">
                    0{index + 1}
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white group-hover:text-apex-gold transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="hidden lg:block text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 ml-4">
                    {item.description}
                  </span>
                </div>

                <div className="absolute bottom-0 left-8 right-0 h-px bg-white/10">
                  <div className="h-full w-0 bg-apex-gold group-hover:w-full transition-all duration-500 ease-smooth" />
                </div>
              </Link>
            ))}
          </nav>


          {/* Footer del Overlay */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-sm pb-8 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-[0.65rem] tracking-widest-xl uppercase text-apex-gold/70 mb-1">Contacto</span>
              <a href="mailto:hello@apex-studio.com" className="text-white/70 hover:text-apex-gold transition-colors">
                hello@apex-studio.com
              </a>
              <span className="text-white/50">Polanco, CDMX</span>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <span className="text-[0.65rem] tracking-widest-xl uppercase text-apex-gold/70">Síguenos</span>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-apex-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-apex-gold transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


