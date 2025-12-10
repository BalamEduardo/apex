// components/sections/Memberships.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';
import { apexEase, fadeUp as fadeUpShared } from '@/lib/animations';

const plans = [
  {
    name: 'Essential',
    price: '1,500',
    description:
      'El punto de partida para quienes buscan excelencia en su entorno de entrenamiento.',
    features: [
      'Acceso a zonas de Fuerza y Cardio',
      'Smart Lockers',
      'Toallas y amenidades premium',
      'Acceso 24/7',
    ],
    highlight: false,
  },
  {
    name: 'Performance',
    price: '2,200',
    description:
      'Diseñado para atletas que requieren datos, estructura y variedad en su rutina.',
    features: [
      'Todo lo de Essential',
      'Clases de Studio ilimitadas',
      'App APEX Pro (TDEE + Rutinas)',
      '1 Sesión de Inbody mensual',
      'Acceso a invitados (2/mes)',
    ],
    highlight: true,
  },
  {
    name: 'Signature',
    price: '3,500',
    description:
      'La experiencia definitiva. Personalización total y recuperación de nivel olímpico.',
    features: [
      'Todo lo de Performance',
      'Entrenamiento Personalizado 1:1',
      'Acceso a Zona de Recuperación (Spa)',
      'Nutrición mensual dedicada',
      'Kit de bienvenida APEX Elite',
      'Valet Parking incluido',
    ],
    highlight: false,
  },
];

// Variantes locales específicas
const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = fadeUpShared;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: apexEase,
    },
  },
};

export default function Memberships() {
  return (
    <section
      id="membresias"
      aria-labelledby="memberships-heading"
      className="py-32 bg-apex-bg border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header de Sección */}
        <motion.div
          className="text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-apex-gold text-[10px] font-bold tracking-widest-xl uppercase mb-4 block">
            Membresías
          </span>
          <h2
            id="memberships-heading"
            className="text-4xl md:text-6xl font-light text-white uppercase leading-none"
          >
            Elige tu{' '}
            <span className="text-apex-gold font-serif italic uppercase">
              Legado
            </span>
          </h2>
        </motion.div>

        {/* Grid de Planes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: apexEase },
              }}
              className={`group relative p-8 md:p-10 border transition-colors duration-300 ${
                plan.highlight
                  ? 'bg-apex-surface border-apex-gold/30 shadow-[0_0_30px_-10px_rgba(255,200,0,0.18)] md:scale-105 z-10'
                  : 'bg-apex-bg border-white/10 hover:border-white/20 hover:bg-apex-surface/60'
              }`}
            >
              {/* Badge para el plan destacado */}
              {plan.highlight && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-apex-gold text-apex-bg text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1"
                  aria-hidden="true"
                >
                  <Crown className="w-3 h-3" />
                  <span>Más Popular</span>
                </div>
              )}

              {/* Título y Precio */}
              <div className="mb-8 pb-8 border-b border-white/5">
                <h3 className="text-2xl font-serif italic text-white mb-2 flex items-center gap-2 justify-between">
                  <span>{plan.name}</span>
                  {plan.highlight && (
                    <Crown
                      className="w-5 h-5 text-apex-gold"
                      aria-hidden="true"
                    />
                  )}
                </h3>
                <div className="flex items-baseline gap-1" aria-label={`Precio plan ${plan.name}`}>
                  <span className="text-xs text-apex-gold font-bold">$</span>
                  <span className="text-4xl font-bold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-[10px] text-apex-gray/70 uppercase tracking-wide">
                    / mes
                  </span>
                </div>
                <p className="text-apex-gray/80 text-sm mt-4 font-light leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Lista de Características */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-apex-gray group-hover:text-white transition-colors"
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                        plan.highlight
                          ? 'text-apex-gold'
                          : 'text-apex-gray/60 group-hover:text-apex-gold'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botón CTA */}
              <motion.a
                href="#contacto"
                aria-label={`Contratar membresía ${plan.name} - ${plan.price} pesos al mes`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full py-4 text-center text-[11px] font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg ${
                  plan.highlight
                    ? 'bg-apex-gold text-apex-bg hover:bg-white'
                    : 'bg-transparent border border-white/20 text-white hover:border-apex-gold hover:bg-apex-gold/10 hover:text-apex-gold'
                }`}
              >
                {plan.name === 'Signature' ? 'Aplicar ahora' : 'Empezar ahora'}
              </motion.a>
            </motion.article>
          ))}
        </motion.div>

        {/* Nota al pie */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-apex-gray/70 text-xs font-light">
            * Todas las membresías incluyen una evaluación inicial obligatoria.
            <br className="md:hidden" />
            <a
              href="#contacto"
              aria-label="Contactar para agendar tour privado"
              className="text-apex-gold hover:underline decoration-1 underline-offset-4 ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apex-gold focus-visible:ring-offset-2 focus-visible:ring-offset-apex-bg rounded px-1"
            >
              Contáctanos para un tour privado.
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
