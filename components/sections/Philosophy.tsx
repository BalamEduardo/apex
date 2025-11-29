'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const philosophyItems = [
  {
    id: "01",
    title: "Atmósfera de Lujo",
    desc: "Diseño arquitectónico que inspira grandeza. Cada rincón está pensado para elevar tu estado mental antes de levantar la primera pesa.",
    alt: "Atmósfera"
  },
  {
    id: "02",
    title: "Enfoque Personal",
    desc: "Entrenamiento 1 a 1 diseñado meticulosamente. No adaptamos rutinas, construimos sistemas alrededor de tu biomecánica.",
    alt: "Enfoque"
  },
  {
    id: "03",
    title: "Exclusividad Total",
    desc: "Espacios libres de multitudes. Limitamos nuestra membresía para garantizar que nunca tengas que esperar para superar tus límites.",
    alt: "Exclusividad"
  }
];

function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function Philosophy() {
  return (
    <section className="bg-apex-bg py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Header dentro del contenedor */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-10">
          <div className="flex-1">
            <h2 className="text-5xl md:text-7xl font-bold uppercase leading-tight">
              Nuestra <br />
              <span className="text-apex-gold italic font-serif">Filosofía</span>
            </h2>
          </div>
          <div className="flex-1 md:max-w-lg flex flex-col gap-8">
            <p className="text-apex-gray text-lg leading-relaxed">
              En APEX, dos cosas son centrales: tú y tu resultado. Redefinimos
              tu percepción de un gimnasio creando un santuario donde el lujo
              se encuentra con la experiencia.
            </p>
            <button className="flex items-center gap-2 text-apex-gold text-sm font-bold tracking-widest hover:gap-4 transition-all duration-300 uppercase">
              Conoce más sobre nosotros <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Items a ancho completo (sin padding lateral) */}
      <div className="-mx-6 md:-mx-12 lg:-mx-20">
        <div className="flex flex-col gap-0">
          {philosophyItems.map((item, index) => (
            <PhilosophyItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyItem({ item, index }: { item: typeof philosophyItems[0], index: number }) {
  const { ref, visible } = useReveal(0.25);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={[
        'group grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[60vh]',
        'transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ].join(' ')}
    >
      {/* Imagen */}
      <div
        className={[
          'relative w-full h-[400px] md:h-full overflow-hidden bg-apex-surface',
          isEven ? 'md:order-1' : 'md:order-2',
        ].join(' ')}
      >
        <div
          className={[
            'w-full h-full bg-neutral-900/50 flex items-center justify-center',
            'transition-transform duration-900ms ease-[cubic-bezier(0.22,0.61,0.36,1)]',
            'group-hover:scale-[1.03] grayscale group-hover:grayscale-0',
            visible ? 'scale-100' : 'scale-[1.03]',
          ].join(' ')}
        >
          {/* Aquí luego cambias el span por tu <Image /> real */}
          <span className="text-white/20 font-serif italic text-xl">
            [ Imagen: {item.alt} ]
          </span>
        </div>

        {/* Sutil overlay para un toque de “reveal”, no rompecabezas agresivo */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-black/10 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-100" />
      </div>

      {/* Texto */}
      <div
        className={[
          'w-full flex items-center p-8 md:p-16 bg-apex-bg',
          'transition-colors duration-500 group-hover:bg-apex-surface/20',
          isEven ? 'md:order-2' : 'md:order-1',
        ].join(' ')}
      >
        <div className="w-full">
          {/* ID grande */}
          <span
            className={[
              'block text-6xl md:text-8xl font-serif italic select-none leading-none mb-6',
              'text-white/5 transition-colors duration-500 group-hover:text-apex-gold/20',
              'will-change-transform',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            ].join(' ')}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)',
              transitionDelay: visible ? '100ms' : '0ms',
            }}
          >
            {item.id}
          </span>

          {/* Título */}
          <h3
            className={[
              'text-3xl md:text-5xl font-bold uppercase mb-6 tracking-wide',
              'will-change-transform',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
            ].join(' ')}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)',
              transitionDelay: visible ? '200ms' : '0ms',
            }}
          >
            {item.title}
          </h3>

          {/* Párrafo */}
          <p
            className={[
              'text-apex-gray text-base md:text-lg leading-relaxed max-w-xl',
              'will-change-transform',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            ].join(' ')}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.22,0.61,0.36,1)',
              transitionDelay: visible ? '300ms' : '0ms',
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
