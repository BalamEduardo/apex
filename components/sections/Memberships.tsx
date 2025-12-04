// components/sections/Memberships.tsx
import React from 'react';
import { Check, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Essential',
    price: '1,500',
    description: 'El punto de partida para quienes buscan excelencia en su entorno de entrenamiento.',
    features: [
      'Acceso a zonas de Fuerza y Cardio',
      'Smart Lockers',
      'Toallas y amenidades premium',
      'Acceso 24/7'
    ],
    highlight: false,
    delay: 'delay-100'
  },
  {
    name: 'Performance',
    price: '2,200',
    description: 'Diseñado para atletas que requieren datos, estructura y variedad en su rutina.',
    features: [
      'Todo lo de Essential',
      'Clases de Studio ilimitadas',
      'App APEX Pro (TDEE + Rutinas)',
      '1 Sesión de Inbody mensual',
      'Acceso a invitados (2/mes)'
    ],
    highlight: true, // Plan destacado
    delay: 'delay-200'
  },
  {
    name: 'Signature',
    price: '3,500',
    description: 'La experiencia definitiva. Personalización total y recuperación de nivel olímpico.',
    features: [
      'Todo lo de Performance',
      'Entrenamiento Personalizado 1:1',
      'Acceso a Zona de Recuperación (Spa)',
      'Nutrición mensual dedicada',
      'Kit de bienvenida APEX Elite',
      'Valet Parking incluido'
    ],
    highlight: false,
    delay: 'delay-300'
  }
];

export default function Memberships() {
  return (
    <section id="membresias" className="py-32 bg-apex-bg border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header de Sección */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-apex-gold text-xs font-bold tracking-widest-xl uppercase mb-4 block">
            Membresías
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase leading-none">
            Elige tu <span className="text-apex-gold font-serif italic normal-case">Legado</span>
          </h2>
        </div>

        {/* Grid de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <article 
              key={plan.name}
              className={`
                group relative p-8 md:p-10 border transition-all duration-500 hover:-translate-y-2
                ${plan.highlight 
                  ? 'bg-apex-surface border-apex-gold/30 shadow-[0_0_30px_-10px_rgba(255,200,0,0.1)] md:scale-105 z-10' 
                  : 'bg-black border-white/10 hover:border-white/20 hover:bg-apex-surface/50'
                }
                ${plan.delay} animate-fade-in-up
              `}
            >
              {/* Badge para el plan destacado */}
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-apex-gold text-apex-bg text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>Más Popular</span>
                </div>
              )}

              {/* Título y Precio */}
              <div className="mb-8 pb-8 border-b border-white/5">
                <h3 className="text-2xl font-serif italic text-white mb-2 flex items-center gap-2 justify-between">
                  <span>{plan.name}</span>
                  {plan.highlight && (
                    <Crown className="w-5 h-5 text-apex-gold" />
                  )}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-apex-gold font-bold">$</span>
                  <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">/ mes</span>
                </div>
                <p className="text-gray-400 text-sm mt-4 font-light leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Lista de Características */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors"
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 ${
                        plan.highlight ? 'text-apex-gold' : 'text-gray-600 group-hover:text-apex-gold'
                      }`}
                    />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botón CTA */}
              <button 
                type="button"
                className={`
                  w-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300
                  ${plan.highlight 
                    ? 'bg-apex-gold text-apex-bg hover:bg-white' 
                    : 'bg-transparent border border-white/20 text-white hover:border-apex-gold hover:text-apex-gold'
                  }
                `}
              >
                {plan.name === 'Signature' ? 'Aplicar Ahora' : 'Empezar Ahora'}
              </button>
            </article>
          ))}
        </div>

        {/* Nota al pie */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-xs font-light">
            * Todas las membresías incluyen una evaluación inicial obligatoria. <br className="md:hidden" />
            <a
              href="#contacto"
              className="text-apex-gold hover:underline decoration-1 underline-offset-4 ml-1"
            >
              Contáctanos para un tour privado.
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
