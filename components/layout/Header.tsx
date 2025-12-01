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
      className={`group fixed left-4 top-4 sm:left-6 sm:top-5 z-70 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg transition-all duration-500 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg ${
        isOpen ? 'bg-apex-gold shadow-apex-gold/10' : 'bg-white/95 shadow-black/20 hover:shadow-black/30'
      }`}
    >
      <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
      <span className="relative flex w-5 md:w-6 flex-col items-center justify-center gap-1.5">
        <span
          aria-hidden
          className={`${lineBase} ${
            isOpen
              ? 'translate-y-2 rotate-45'
              : 'group-hover:translate-y-1.5'
          }`}
        />
        <span
          aria-hidden
          className={`${lineBase} ${
            isOpen ? 'opacity-0' : 'group-hover:scale-x-0'
          }`}
        />
        <span
          aria-hidden
          className={`${lineBase} ${
            isOpen
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
    { label: 'INICIO', href: '/' },
    { label: 'SERVICIOS', href: '#servicios' },
    { label: 'NOSOTROS', href: '#nosotros' },
    { label: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <>
      <MenuToggleButton isOpen={isMenuOpen} onToggle={toggleMenu} />

      {/* Header Principal - Flotante y Transparente */}
      <header
        className={`fixed w-full top-0 z-50 px-6 py-4 transition-all duration-300 ${
          !isHome || scrolled ? 'backdrop-blur-sm bg-apex-bg/50' : 'bg-transparent'
        }`}
      >
        <div className="relative flex items-center justify-between max-w-[1920px] mx-auto">
          
          {/* Izquierda: espacio reservado para mantener el balance visual */}
          <div className="w-10 h-10 md:w-12 md:h-12" />

          {/* Centro: Logo APEX */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="group flex items-center gap-3 text-2xl font-bold tracking-widest-xl text-white hover:text-apex-gold transition-colors duration-300 ease-smooth"
            >
              {/* Logo simbolo: diamante (square rotado) con punto central */}
              <span className="relative inline-flex w-5 h-5 items-center justify-center">
                <span className="block w-5 h-5 border border-white/90 rotate-45 transition-all duration-700 ease-smooth group-hover:border-apex-gold group-hover:rotate-135deg"></span>
                <span className="absolute w-1.5 h-1.5 bg-white rounded-full transition-colors duration-700 ease-smooth group-hover:bg-apex-gold"></span>
              </span>
              <span>APEX</span>
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
        className={`fixed inset-0 z-60 bg-apex-bg/95 backdrop-blur-xl transition-all duration-700 ease-smooth ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col h-full p-6">
          {/* Header del Overlay */}
          <div className="flex justify-center items-center pt-2">
            <div className="text-2xl font-bold tracking-widest-xl text-white">APEX</div>
          </div>

          {/* Enlaces de Navegación */}
          <nav className="flex-1 flex flex-col justify-center items-center gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={toggleMenu}
                className="text-4xl md:text-6xl font-serif italic text-white hover:text-apex-gold transition-all duration-500 hover:scale-105 ease-smooth"
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                  {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer del Overlay */}
          <div className="flex justify-between items-end text-apex-gray text-sm pb-8 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-2">
              <span>hello@apex-studio.com</span>
              <span>Polanco, CDMX</span>
            </div>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-apex-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-apex-gold transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


