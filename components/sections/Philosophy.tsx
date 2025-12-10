'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const philosophyItems = [
  {
    id: "01",
    title: "Atmósfera de Lujo",
    desc: "Diseño arquitectónico que inspira grandeza. Cada rincón está pensado para elevar tu estado mental antes de levantar la primera pesa.",
    alt: "Atmósfera",
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: "02",
    title: "Enfoque Personal",
    desc: "Entrenamiento 1 a 1 diseñado meticulosamente. No adaptamos rutinas, construimos sistemas alrededor de tu biomecánica.",
    alt: "Enfoque",
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: "03",
    title: "Exclusividad Total",
    desc: "Espacios libres de multitudes. Limitamos nuestra membresía para garantizar que nunca tengas que esperar para superar tus límites.",
    alt: "Exclusividad",
    src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2071&auto=format&fit=crop'
  }
];

function useReveal(threshold = 0.5) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Solo marcamos visible cuando el ratio supera el threshold
          if (entry.intersectionRatio >= threshold) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
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
    <section id="Filosofia" className="bg-apex-bg py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Header dentro del contenedor */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-10">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-light uppercase leading-tight">
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
            <a
              href="#sobre-nosotros"
              aria-label="Conocer más sobre nuestra filosofía"
              className="inline-flex items-center gap-2 text-apex-gold text-sm font-bold tracking-widest hover:gap-4 transition-all duration-300 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded py-2"
            >
              Conoce más sobre nosotros <ArrowRight className="w-4 h-4" />
            </a>
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

function PhilosophyItem({
  item,
  index,
}: {
  item: (typeof philosophyItems)[0];
  index: number;
}) {
  // threshold alto para que el reveal ocurra cuando ya se ve bien el bloque
  const { ref, visible } = useReveal(0.4);
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
            'transition-all duration-1400ms ease-[cubic-bezier(0.22,0.61,0.36,1)]',
            // Mobile: cambio de gris a color con el reveal
            visible ? 'grayscale-0' : 'grayscale',
            // Desktop: se mantiene como la versión original
            // (gris por defecto, menos gris al hover)
            'md:grayscale md:group-hover:grayscale-30',
            // Zoom sutil al aparecer (igual que tu versión original)
            visible ? 'scale-100' : 'scale-[1.02]',
          ].join(' ')}
          style={{
            transform: visible ? 'scale(1)' : 'scale(1.02)',
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Overlay igual que al inicio (solo hover, desktop) */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-black/10 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-100" />
      </div>

      {/* Texto */}
      <div
        className={[
          'relative w-full flex items-center p-8 md:p-16 bg-apex-bg overflow-hidden',
          'transition-colors duration-900ms ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:bg-apex-surface/10',
          isEven ? 'md:order-2' : 'md:order-1',
        ].join(' ')}
      >
        <span className="pointer-events-none absolute left-6 md:left-10 top-6 bottom-6 w-px bg-linear-to-b from-transparent via-white/20 to-transparent group-hover:via-apex-gold/60 transition-all duration-1400ms" />

        <span className="pointer-events-none absolute inset-y-0 right-0 w-1/2 translate-x-1/4 bg-apex-gold/10 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1500ms" />

        <div className="w-full pl-8 md:pl-16">
          {/* ID grande */}
          <span
            className={[
              'block text-6xl md:text-8xl font-serif italic select-none leading-none mb-6',
              'will-change-transform',
              // Mobile: color controlado por el reveal
              visible ? 'opacity-100 translate-y-0 text-apex-gold/50' : 'opacity-0 translate-y-4 text-white/10',
              // Desktop: comportamiento original (blanco tenue + dorado en hover)
              'md:opacity-100 md:translate-y-0 md:text-white/5 md:group-hover:text-apex-gold/50',
            ].join(' ')}
            style={{
              transitionProperty: 'color, opacity, transform',
              transitionDuration: '1800ms, 900ms, 900ms',
              transitionTimingFunction:
                'cubic-bezier(0.22,0.61,0.36,1), cubic-bezier(0.22,0.61,0.36,1), cubic-bezier(0.22,0.61,0.36,1)',
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
