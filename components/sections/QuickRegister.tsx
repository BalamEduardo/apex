// components/sections/QuickRegister.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

export default function QuickRegister() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      setError('Ingresa un número válido de al menos 10 dígitos.');
      return;
    }

    setError('');
    setStatus('loading');

    // Simulación de llamada a Supabase
    // const { error } = await supabase.from('leads').insert({ phone, source: 'landing' });
    
    setTimeout(() => {
      setStatus('success');
      console.log('Lead registrado:', phone);
    }, 1500);
  };

  const handleRetry = () => {
    setStatus('idle');
    setPhone('');
    setError('');
  };

  return (
    <section 
      id="contacto"
      className="py-24 bg-apex-bg relative flex justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Decoración de fondo animada */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            // ESTADO DE ÉXITO
            <motion.div 
              key="success"
              className="flex flex-col items-center gap-4"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-apex-gold/10 flex items-center justify-center text-apex-gold mb-2"
                variants={iconVariants}
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-serif italic text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Bienvenido a la Élite.
              </motion.h3>
              
              <motion.p 
                className="text-apex-gray text-sm font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Nuestro equipo de concierge te contactará en breve.
              </motion.p>

              <motion.button
                type="button"
                onClick={handleRetry}
                className="mt-4 text-[11px] text-apex-gray hover:text-white underline underline-offset-4 decoration-apex-gold/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Registrar otro número
              </motion.button>
            </motion.div>
          ) : (
            // FORMULARIO DE REGISTRO
            <motion.div 
              key="form"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              exit="exit"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-serif italic text-white mb-2"
                variants={itemVariants}
              >
                Empieza tu Ascenso
              </motion.h2>
              
              <motion.p 
                className="text-apex-gray text-sm mb-10 font-light tracking-wide"
                variants={itemVariants}
              >
                Acceso exclusivo. Plazas limitadas cada mes.
              </motion.p>

              <motion.form 
                onSubmit={handleSubmit} 
                className="relative group"
                variants={itemVariants}
              >
                <label htmlFor="quick-phone" className="sr-only">
                  Número de celular
                </label>
                <motion.input
                  id="quick-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ingresa tu número celular..."
                  minLength={10}
                  maxLength={15}
                  required
                  className={`
                    w-full bg-transparent border-b py-4 pl-2 pr-12 text-white placeholder:text-white/20 
                    focus:outline-none transition-colors text-lg tracking-wider
                    ${error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-apex-gold'}
                  `}
                  whileFocus={{ scale: 1.01 }}
                />
                
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-0 bottom-4 text-apex-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.1, x: 3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <ArrowRight className="w-6 h-6" />
                  )}
                </motion.button>
              </motion.form>

              <AnimatePresence>
                {error && (
                  <motion.p 
                    className="mt-2 text-[11px] text-red-400 text-left"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              
              <motion.p 
                className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest"
                variants={itemVariants}
              >
                Sin spam. Solo excelencia.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
