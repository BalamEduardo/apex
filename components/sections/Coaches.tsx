// components/sections/Coaches.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Dumbbell, HeartPulse, Zap } from 'lucide-react';

const COACHES = [
  {
    id: 1,
    name: 'Carlos Hernández',
    specialty: 'Fuerza & Recomposición',
    image: 'https://images.unsplash.com/photo-1696563996353-214a3690bb11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZpdG5lc3MlMjB0cmFpbmVyfGVufDB8fDB8fHww',
    quote: "Mi objetivo es que entrenes con confianza, no con miedo.",
    bio: "Ex competidor de powerlifting. 7 años transformando cuerpos priorizando la técnica sobre el ego.",
    skills: ['Hipertrofia', 'Powerlifting', 'Nutrición'],
    icon: <Dumbbell className="w-4 h-4" />
  },
  {
    id: 2,
    name: 'Sarah Miller',
    specialty: 'HIIT & Conditioning',
    image: 'https://images.unsplash.com/photo-1704223523303-a5ed14561b1f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: "Tu mente se rinde antes que tu cuerpo. Yo entreno tu mente.",
    bio: "Especialista en alto rendimiento metabólico. Te llevaré a límites que no sabías que tenías.",
    skills: ['Resistencia', 'Sprints', 'Mentalidad'],
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 3,
    name: 'Mateo Varela',
    specialty: 'Movilidad & Funcional',
    image: 'https://images.unsplash.com/photo-1738523686513-0c27d2be85e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    quote: "Fuerza sin control es riesgo. Construye un cuerpo para toda la vida.",
    bio: "Kinesiólogo deportivo. Enfocado en longevidad, postura y fuerza funcional libre de dolor.",
    skills: ['Movilidad', 'Kettlebells', 'Recovery'],
    icon: <HeartPulse className="w-4 h-4" />
  }
];

// Variantes de animación consistentes con otras secciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Coaches() {
  return (
    <section id="coaches" className="py-32 bg-apex-bg relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header de Sección */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl">
            <span className="text-apex-gold text-xs font-light tracking-widest-xl uppercase mb-4 block">
              Equipo Élite
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white uppercase leading-none">
              Mentores de tu <br />
              <span className="text-apex-gold font-serif italic normal-case">Evolución</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-apex-gray text-sm font-light leading-relaxed">
              Cada entrenador tiene un enfoque distinto; encuentra al experto que conecta con tu visión.
            </p>
          </div>
        </motion.div>

        {/* Grid de Coaches */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {COACHES.map((coach) => (
            <motion.div 
              key={coach.id}
              className="group relative h-[500px] md:h-[600px] w-full overflow-hidden bg-apex-surface cursor-pointer"
              variants={cardVariants}
            >
              {/* IMAGEN DE FONDO (B&W to Color) */}
              <Image
                src={coach.image}
                alt={coach.name}
                fill
                className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Overlay Gradiente */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

              {/* CONTENIDO */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                
                {/* Parte Superior: Siempre visible */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="p-1.5 rounded-full bg-apex-gold/20 text-apex-gold border border-apex-gold/30">
                      {coach.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-apex-gold font-bold">
                      Head Coach
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-1">
                    {coach.name}
                  </h3>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                    {coach.specialty}
                  </p>
                </div>

                {/* Parte Inferior: Reveal en Hover */}
                <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[300px] group-hover:opacity-100 transition-all duration-700 ease-out">
                  <div className="pt-6 space-y-4 md:space-y-6 border-t border-white/20 mt-4">
                    
                    {/* Frase / Quote */}
                    <p className="text-base md:text-lg text-white font-light leading-snug italic">
                      &quot;{coach.quote}&quot;
                    </p>

                    {/* Bio */}
                    <p className="text-xs md:text-sm text-apex-gray font-light line-clamp-3">
                      {coach.bio}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {coach.skills.map(skill => (
                        <span key={skill} className="px-2 md:px-3 py-1 text-[10px] uppercase tracking-wider border border-white/10 text-white/80 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-3 md:py-4 bg-white text-apex-bg text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-apex-gold transition-colors flex items-center justify-center gap-2 group/btn">
                      Entrenar con {coach.name.split(' ')[0]}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}