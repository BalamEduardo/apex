// components/sections/TdeeCalculator.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, Activity, User, Target, Info } from 'lucide-react';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'cut' | 'maintain' | 'bulk';
type Gender = 'male' | 'female';

const GOAL_LABELS: Record<Goal, string> = {
  cut: 'Definición (déficit calórico)',
  maintain: 'Mantenimiento',
  bulk: 'Volumen (superávit calórico)',
};

// Sistema de animación APEX
const apexEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: apexEase,
    },
  },
};

const fadeUpSm = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: apexEase,
    },
  },
};

const sectionVariants = {
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
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: apexEase,
    },
  },
};

// Reutilizar patrones pequeños
const featureVariants = fadeUpSm;
const formItemVariants = fadeUpSm;

const resultVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: apexEase,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

// Clase base para inputs (evita repetir)
const inputBase =
  'w-full bg-apex-bg/30 border border-white/10 text-white p-4 focus:outline-none focus:border-apex-gold/50 transition-colors placeholder:text-white/10 text-[10px] md:text-sm';

export default function TdeeCalculator() {
  // Estados del formulario
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bodyFat, setBodyFat] = useState<string>(''); // Nuevo campo opcional
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');

  // Estados de UI y Resultado
  const [result, setResult] = useState<number | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = !!(weight && height && age);

  const calculateTDEE = () => {
    if (!isFormValid) return;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const bf = bodyFat ? parseFloat(bodyFat) : 0;

    let bmr = 0;

    // LÓGICA CONDICIONAL: Katch-McArdle vs Mifflin-St Jeor
    if (bf > 0) {
      // Opción B: Katch-McArdle (Si hay % grasa)
      // LBM = Peso * (1 - %Grasa/100)
      // BMR = 370 + (21.6 * LBM)
      const lbm = w * (1 - bf / 100);
      bmr = 370 + 21.6 * lbm;
    } else {
      // Opción A: Mifflin-St Jeor (Estándar de Oro)
      if (gender === 'male') {
        // (10 x peso) + (6.25 x altura) - (5 x edad) + 5
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        // (10 x peso) + (6.25 x altura) - (5 x edad) - 161
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
    }

    const multipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    let tdee = bmr * multipliers[activity];

    // AJUSTE DE OBJETIVOS (Porcentajes Inteligentes)
    if (goal === 'cut') {
      // Déficit agresivo pero seguro (20%)
      tdee = tdee * 0.8;
    } else if (goal === 'bulk') {
      // Superávit controlado (10%) para minimizar ganancia de grasa
      tdee = tdee * 1.1;
    }
    // 'maintain' se queda con el TDEE base (Normocalórica)

    setResult(Math.round(tdee));
    setShowLeadForm(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead capturado:', { phone, calories: result });
    setIsSubmitted(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTDEE();
  };

  // Helpers para macros, solo cuando hay resultado y peso válido
  const parsedWeight = parseFloat(weight || '0');
  const proteinGrams = Math.round(parsedWeight * 2); // ~2 g/kg
  const fatsGrams = result ? Math.round((result * 0.25) / 9) : 0;
  const carbsGrams =
    result && parsedWeight
      ? Math.round((result - proteinGrams * 4 - result * 0.25) / 4)
      : 0;

  return (
    <section id="calculadora" className="py-32 bg-apex-bg relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Texto y Explicación */}
          <motion.div className="space-y-8">
            <motion.h2 className="text-4xl md:text-6xl font-light uppercase leading-none text-white" variants={fadeUp}>
              Ingeniería <br />
              <span className="text-apex-gold font-serif italic">Corporal</span>
            </motion.h2>
            <motion.p className="text-apex-gray text-lg font-light leading-relaxed max-w-md" variants={fadeUp}>
              Olvida las estimaciones genéricas. Utilizamos la fórmula{' '}
              <span className="text-white font-medium">Mifflin-St Jeor</span> y,
              si conoces tus datos, el método{' '}
              <span className="text-white font-medium">Katch-McArdle</span> para
              una precisión atlética.
            </motion.p>

            <motion.div
              className="space-y-6 pt-4"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              <motion.div variants={featureVariants}>
                <FeatureItem icon={<Activity className="w-5 h-5" />} text="Algoritmo de Precisión Clínica" />
              </motion.div>
              <motion.div variants={featureVariants}>
                <FeatureItem icon={<Target className="w-5 h-5" />} text="Déficit/Superávit Porcentual Inteligente" />
              </motion.div>
              <motion.div variants={featureVariants}>
                <FeatureItem icon={<User className="w-5 h-5" />} text="Adaptable a tu Composición Corporal" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Tarjeta Calculadora */}
          <motion.div
            className="bg-apex-surface/50 border border-apex-gold/20 p-8 md:p-12 relative backdrop-blur-sm shadow-2xl shadow-black/50"
            variants={cardVariants}
          >
            {/* Esquinas Doradas Animadas */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-apex-gold opacity-50"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.5, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.4, ease: apexEase }}
                  />
            <motion.div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-apex-gold opacity-50"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4, ease: apexEase }}
            />

            <AnimatePresence mode="wait">
              {!showLeadForm ? (
                <motion.div
                  key="form"
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                    },
                    exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
                  }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div role="radiogroup" aria-label="Genero" className="flex gap-3">
                    {/* Género */}
                    <motion.div className="flex gap-3 w-full" variants={formItemVariants}>
                      <motion.button
                        type="button"
                        role="radio"
                        aria-label="Hombre"
                        aria-checked={gender === 'male'}
                        tabIndex={gender === 'male' ? 0 : -1}
                        onClick={() => setGender('male')}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 md:flex-none min-w-0 md:min-w-[140px] flex items-center justify-center gap-2 px-4 py-2 md:py-3 text-[11px] md:text-sm tracking-widest uppercase transition-all duration-300 rounded-lg border shadow-sm ${gender === 'male'
                            ? 'bg-apex-gold text-apex-bg border-apex-gold font-bold'
                            : 'bg-transparent text-apex-gray border-white/10 hover:border-white/30'
                          }`}
                      >
                        Hombre
                      </motion.button>
                      <motion.button
                        type="button"
                        role="radio"
                        aria-label="Mujer"
                        aria-checked={gender === 'female'}
                        tabIndex={gender === 'female' ? 0 : -1}
                        onClick={() => setGender('female')}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 md:flex-none min-w-0 md:min-w-[140px] flex items-center justify-center gap-2 px-4 py-2 md:py-3 text-[11px] md:text-sm tracking-widest uppercase transition-all duration-300 rounded-lg border shadow-sm ${gender === 'female'
                            ? 'bg-apex-gold text-apex-bg border-apex-gold font-bold'
                            : 'bg-transparent text-apex-gray border-white/10 hover:border-white/30'
                          }`}
                      >
                        Mujer
                      </motion.button>
                    </motion.div>
                    </div>

                  {/* Inputs Básicos */}
                  <motion.div className="grid grid-cols-3 gap-4" variants={formItemVariants}>
                    <InputGroup
                      label="Edad"
                      placeholder="25"
                      type="number"
                      value={age}
                      onChange={setAge}
                      min={10}
                      max={120}
                      required
                    />
                    <InputGroup
                      label="Peso (kg)"
                      placeholder="75"
                      type="number"
                      value={weight}
                      onChange={setWeight}
                      min={20}
                      max={500}
                      required
                    />
                    <InputGroup
                      label="Altura (cm)"
                      placeholder="180"
                      type="number"
                      value={height}
                      onChange={setHeight}
                      min={50}
                      max={272}
                      required
                    />
                  </motion.div>


                    {/* Input Avanzado: % Grasa */}
                    <motion.div variants={formItemVariants}>
                      <InputGroup
                        label="% Grasa Corporal (Opcional)"
                        value={bodyFat}
                        onChange={setBodyFat}
                        placeholder="Ej. 15"
                        type="number"
                        hint={<><Info className="w-3 h-3" /> Activa fórmula Katch-McArdle</>}
                      />
                    </motion.div>

                  {/* Actividad */}
                  <motion.div className="space-y-2" variants={formItemVariants}>
                    <label htmlFor="nivel-actividad" className="text-[8px] md:text-xs text-apex-gold uppercase tracking-widest font-bold">
                      Nivel de Actividad
                    </label>
                    <div className="relative">
                      <select
                        id="nivel-actividad"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                        className={`${inputBase} appearance-none`}
                      >
                        <option value="sedentary">Sedentario (Oficina, nada de ejercicio)</option>
                        <option value="light">Ligero (1-3 días/sem o trabajo de pie)</option>
                        <option value="moderate">Moderado (3-5 días/sem o vida activa)</option>
                        <option value="active">Activo (6-7 días/sem o trabajo físico)</option>
                        <option value="very_active">Muy Activo (Doble sesión/atleta)</option>
                      </select>
                      {/* Flecha custom para el select */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-apex-gray">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Objetivo */}
                  <motion.div className="space-y-2" variants={formItemVariants}>
                    <label className="text-[8px] md:text-xs text-apex-gold uppercase tracking-widest font-bold">
                      Objetivo Actual
                    </label>
                    <div role="radiogroup" aria-label="Objetivo" className="grid grid-cols-3 gap-2">
                      {(['cut', 'maintain', 'bulk'] as Goal[]).map((g) => (
                        <motion.button
                          key={g}
                          type="button"
                          role="radio"
                          aria-checked={goal === g}
                          aria-label={GOAL_LABELS[g]}
                          tabIndex={goal === g ? 0 : -1}
                          onClick={() => setGoal(g)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`py-3 text-[10px] md:text-xs uppercase tracking-wider border transition-all ${goal === g
                            ? 'border-apex-gold text-apex-gold bg-apex-gold/5'
                            : 'border-white/10 text-apex-gray hover:border-white/30'
                            }`}
                        >
                          {g === 'cut' ? 'Definición' : g === 'maintain' ? 'Mantener' : 'Volumen'}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                    <motion.button
                      type="submit"
                      disabled={!isFormValid}
                      variants={formItemVariants}
                      whileHover={isFormValid ? { scale: 1.02 } : {}}
                      whileTap={isFormValid ? { scale: 0.98 } : {}}
                      className={`w-full py-4 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2 group transition-colors duration-300 ${isFormValid
                        ? 'bg-white text-apex-bg hover:bg-apex-gold'
                        : 'bg-white/10 text-apex-gray cursor-not-allowed'
                        }`}
                    >
                      Calcular Estrategia
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                // RESULTADO
                <motion.div
                  key="result"
                  className="text-center space-y-8 py-4"
                  variants={resultVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <p className="text-apex-gray text-sm uppercase tracking-widest mb-2">
                      {goal === 'cut'
                        ? 'Objetivo: Déficit (-20%)'
                        : goal === 'bulk'
                          ? 'Objetivo: Superávit (+10%)'
                          : 'Objetivo: Mantenimiento'}
                    </p>
                    <motion.div
                      className="text-6xl md:text-7xl font-bold text-white font-serif"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 150 }}
                    >
                      {result}{' '}
                      <span className="text-2xl text-apex-gold font-sans font-normal">kcal</span>
                    </motion.div>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                            key="lead-form"
                            className="relative bg-apex-bg/20 border border-white/5 p-6 mt-8 overflow-hidden group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          >
                            <div className="absolute inset-0 backdrop-blur-md bg-apex-bg/40 z-10 flex flex-col items-center justify-center p-6 text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                          >
                            <Lock className="w-8 h-8 text-apex-gold mb-3" />
                          </motion.div>

                          <h3 className="text-white font-bold uppercase tracking-wide mb-2">Desbloquea tu Macro-Plan</h3>

                          <p className="text-apex-gray/80 text-xs mb-4 max-w-xs">
                            Obtén la distribución exacta de proteínas, grasas y carbohidratos para estas calorías.
                          </p>

                          <form onSubmit={handleLeadSubmit} className="flex w-full gap-2">
                            <label htmlFor="apex-telefono" className="sr-only">Teléfono</label>
                            <input
                              id="apex-telefono"
                              type="tel"
                              placeholder="Tu teléfono"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={`${inputBase} flex-1 py-2 text-sm border-white/20`}
                            />
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-apex-gold text-apex-bg px-4 py-2 font-bold uppercase text-xs hover:bg-white transition-colors "
                            >
                              Ver
                            </motion.button>
                          </form>
                        </div>
                        {/* Fondo borroso simulado */}
                        <div className="opacity-30 filter blur-sm select-none space-y-3" aria-hidden="true">
                          <div className="flex justify-between text-sm text-apex-gray/80">
                            <span>Proteínas</span>
                            <span>???g</span>
                          </div>
                          <div className="w-full h-1 bg-apex-surface rounded">
                            <div className="w-1/3 h-full bg-apex-gray"></div>
                          </div>
                          <div className="flex justify-between text-sm text-apex-gray/80">
                            <span>Grasas</span>
                            <span>???g</span>
                          </div>
                          <div className="w-full h-1 bg-apex-surface rounded">
                            <div className="w-1/4 h-full bg-apex-gray"></div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="macros"
                        className="bg-apex-bg/20 border border-apex-gold/30 p-6 text-left"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="text-apex-gold font-bold uppercase tracking-wide mb-4 text-center">
                          Plan Nutricional APEX
                        </h4>
                        <motion.div
                          className="space-y-4 text-sm"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                            },
                          }}
                        >
                          <motion.div
                            className="flex justify-between border-b border-white/10 pb-2"
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                          >
                            <span className="text-apex-gray/80">Proteína (~2g/kg)</span>
                            <span className="text-white font-bold">{proteinGrams}g</span>
                          </motion.div>
                          <motion.div
                            className="flex justify-between border-b border-white/10 pb-2"
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                          >
                            <span className="text-apex-gray/80">Grasas (25% total)</span>
                            <span className="text-white font-bold">{fatsGrams}g</span>
                          </motion.div>
                          <motion.div
                            className="flex justify-between border-b border-white/10 pb-2"
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                          >
                            <span className="text-apex-gray/80">Carbohidratos (Resto)</span>
                            <span className="text-white font-bold">{carbsGrams}g</span>
                          </motion.div>
                        </motion.div>
                        <p className="text-[10px] text-apex-gray/70 mt-4 text-center">
                          *Cálculos estimados. Consulta a un profesional.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => {
                      setShowLeadForm(false);
                      setIsSubmitted(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs text-apex-gray hover:text-white underline decoration-apex-gold/50 underline-offset-4"
                  >
                    Recalcular con otros datos
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Subcomponente InputGroup reutilizable
function InputGroup({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
  max,
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  min?: number;
  max?: number;
  required?: boolean;
  hint?: React.ReactNode;
}) {
  const id = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // solo letras/números, resto guion
    .replace(/^-+|-+$/g, '');

  const describedBy = hint ? `${id}-hint` : undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[8px] md:text-xs text-apex-gold uppercase tracking-widest font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        min={min}
        max={max}
        required={required}
        aria-required={required}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputBase}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[8px] md:text-xs text-apex-gold/70 flex items-center gap-1">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 text-apex-gray">
      <div className="p-2 bg-apex-surface rounded-full border border-white/5 text-apex-gold">
        {icon}
      </div>
      <span className="font-light text-sm tracking-wide">{text}</span>
    </div>
  );
}
