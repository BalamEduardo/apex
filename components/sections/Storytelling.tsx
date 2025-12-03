'use client';

import { useEffect, useRef } from 'react';

export default function Storytelling() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const leftLabelRef = useRef<HTMLDivElement | null>(null);
  const rightLabelRef = useRef<HTMLDivElement | null>(null);
  const textMaskRef = useRef<HTMLDivElement | null>(null);
  const topTextRef = useRef<HTMLParagraphElement | null>(null);
  const bottomTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const win = window.innerHeight;
      const height = sectionRef.current.offsetHeight;

      // Progreso "suave" a través de la sección
      const raw = Math.max(
        0,
        Math.min(1, (win - rect.top) / (height + win * 0.6))
      );

      const eased = 1 - Math.pow(1 - raw, 3); // ease-out
      const active = raw > 0.12 && raw < 0.95;

      // ---- LÍNEA DORADA ----
      if (lineRef.current) {
        const t = Math.max(0, Math.min(1, (raw - 0.1) / 0.8));

        const scaleX = 0.05 + t * 0.95;
        const opacity = 0.2 + t * 0.8;

        lineRef.current.style.transform = `scaleX(${scaleX})`;
        lineRef.current.style.opacity = `${opacity}`;
        lineRef.current.style.animation = active
          ? 'apexLineShimmer 3.2s linear infinite'
          : 'none';
      }

      // ---- LABEL IZQUIERDA SE VA ----
      if (leftLabelRef.current) {
        const t = Math.max(0, Math.min(1, (raw - 0.2) / 0.5));
        leftLabelRef.current.style.opacity = `${1 - t}`;
        leftLabelRef.current.style.transform = `translateX(${-t * 20}px)`;
      }

      // ---- LABEL DERECHA ENTRA ----
      if (rightLabelRef.current) {
        const t = Math.max(0, Math.min(1, (raw - 0.3) / 0.55));
        rightLabelRef.current.style.opacity = `${t}`;
        rightLabelRef.current.style.transform = `translateX(${(1 - t) * 20}px)`;
      }

      // ---- TEXTO PRINCIPAL: REVEAL LEFT → RIGHT ----
      if (textMaskRef.current) {
        const start = 0.18;
        const end = 0.85;
        const t = Math.max(0, Math.min(1, (raw - start) / (end - start)));

        textMaskRef.current.style.clipPath = `inset(0 ${(1 - t) * 100}% 0 0)`;
        textMaskRef.current.style.opacity = `${0.2 + t * 0.8}`;
        textMaskRef.current.style.transform = `translateY(${(1 - t) * 20}px)`;
      }

      // ---- "ENTRE IDEA Y MATERIA" (TOP) ----
      if (topTextRef.current) {
        const start = 0.12;
        const end = 0.55;
        const t = Math.max(0, Math.min(1, (raw - start) / (end - start)));

        const opacity = t; // 0 → 1
        const translateY = (1 - t) * 16; // baja → se asienta

        topTextRef.current.style.opacity = `${opacity}`;
        topTextRef.current.style.transform = `translateY(${translateY}px)`;
      }

      // ---- "INTENCIÓN · PRESENCIA · ARQUITECTURA..." (BOTTOM) ----
      if (bottomTextRef.current) {
        const start = 0.3;
        const end = 0.9;
        const t = Math.max(0, Math.min(1, (raw - start) / (end - start)));

        const opacity = t; // 0 → 1
        const translateY = (1 - t) * 16;

        bottomTextRef.current.style.opacity = `${opacity}`;
        bottomTextRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="storytelling"
      className="relative h-[220vh] bg-apex-bg border-t border-white/5"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* VIGNETTES */}
        <div className="pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-apex-bg via-apex-bg/85 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-apex-bg via-apex-bg/85 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-apex-bg via-apex-bg/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-apex-bg via-apex-bg/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          {/* LABELS */}
          <div className="flex items-center justify-between mb-10 md:mb-12 text-[0.7rem] md:text-xs uppercase tracking-[0.35em] text-white/40">
            <div ref={leftLabelRef}>Filosofía</div>
            <div ref={rightLabelRef} className="opacity-0">
              El espacio
            </div>
          </div>

          {/* BLOQUE DE TEXTO */}
          <div className="text-center space-y-5 md:space-y-6">
            {/* TOP PHRASE ANIMADA */}
            <p
              ref={topTextRef}
              className="text-sm md:text-xs tracking-[0.4em] uppercase text-apex-gold/70 font-semibold"
              style={{ opacity: 0, transform: 'translateY(16px)', willChange: 'transform, opacity' }}
            >
              Entre idea y materia
            </p>

            {/* MÁSCARA DEL TEXTO PRINCIPAL */}
            <div
              ref={textMaskRef}
              className="inline-block opacity-0"
              style={{
                clipPath: 'inset(0 100% 0 0)',
                willChange: 'transform, opacity, clip-path',
              }}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.6rem] font-light text-white/95 font-serif italic leading-relaxed">
                “Cada sesión comienza en la <span className="text-apex-gold">mente</span>,  
                pero se firma en el <span className="text-apex-gold">espacio</span>.”
              </p>
            </div>

            {/* BOTTOM PHRASE ANIMADA */}
            <p
              ref={bottomTextRef}
              className="text-[0.75rem] md:text-sm text-white/45 tracking-widest-xl uppercase"
              style={{ opacity: 0, transform: 'translateY(16px)', willChange: 'transform, opacity' }}
            >
              Intención · Presencia · Arquitectura del cuerpo
            </p>
          </div>

          {/* LÍNEA DORADA */}
          <div className="mt-14 flex justify-center">
            <div className="w-full max-w-xl">
              <div
                ref={lineRef}
                className="h-px w-full origin-left bg-linear-to-r from-apex-gold/0 via-apex-gold to-apex-gold/0"
                style={{
                  backgroundSize: '200% 100%',
                  willChange: 'transform, opacity',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
