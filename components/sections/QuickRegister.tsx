// components/sections/QuickRegister.tsx
'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

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
    <section className="py-24 bg-apex-bg relative flex justify-center items-center overflow-hidden border-t border-white/5">
      {/* Decoración de fondo muy sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        {status === 'success' ? (
          // ESTADO DE ÉXITO
          <div className="animate-fade-in-up flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-apex-gold/10 flex items-center justify-center text-apex-gold mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif italic text-white">
              Bienvenido a la Élite.
            </h3>
            <p className="text-apex-gray text-sm font-light">
              Nuestro equipo de concierge te contactará en breve.
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 text-[11px] text-apex-gray hover:text-white underline underline-offset-4 decoration-apex-gold/60"
            >
              Registrar otro número
            </button>
          </div>
        ) : (
          // FORMULARIO DE REGISTRO
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mb-2">
              Empieza tu Ascenso
            </h2>
            <p className="text-apex-gray text-sm mb-10 font-light tracking-wide">
              Acceso exclusivo. Plazas limitadas cada mes.
            </p>

            <form onSubmit={handleSubmit} className="relative group">
              <label htmlFor="quick-phone" className="sr-only">
                Número de celular
              </label>
              <input
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
              />
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-0 bottom-4 text-apex-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <ArrowRight className="w-6 h-6 transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1" />
                )}
              </button>
            </form>

            {error && (
              <p className="mt-2 text-[11px] text-red-400 text-left">
                {error}
              </p>
            )}
            
            <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest">
              Sin spam. Solo excelencia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
