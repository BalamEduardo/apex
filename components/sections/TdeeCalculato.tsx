// components/sections/TdeeCalculator.tsx
'use client';

import { useState } from 'react';
import { ChevronRight, Lock, Activity, User, Target, Info } from 'lucide-react';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'cut' | 'maintain' | 'bulk';
type Gender = 'male' | 'female';

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
      {/* Fondo Decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apex-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto y Explicación */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none text-white">
              Ingeniería <br />
              <span className="text-apex-gold font-serif italic">Corporal</span>
            </h2>
            <p className="text-apex-gray text-lg font-light leading-relaxed max-w-md">
              Olvida las estimaciones genéricas. Utilizamos la fórmula{' '}
              <span className="text-white font-medium">Mifflin-St Jeor</span> y,
              si conoces tus datos, el método{' '}
              <span className="text-white font-medium">Katch-McArdle</span> para
              una precisión atlética.
            </p>

            <div className="space-y-6 pt-4">
              <FeatureItem icon={<Activity className="w-5 h-5" />} text="Algoritmo de Precisión Clínica" />
              <FeatureItem icon={<Target className="w-5 h-5" />} text="Déficit/Superávit Porcentual Inteligente" />
              <FeatureItem icon={<User className="w-5 h-5" />} text="Adaptable a tu Composición Corporal" />
            </div>
          </div>

          {/* Tarjeta Calculadora */}
          <div className="bg-apex-surface border border-apex-gold/20 p-8 md:p-12 relative backdrop-blur-sm shadow-2xl shadow-black/50">
            {/* Esquinas Doradas */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-apex-gold opacity-50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-apex-gold opacity-50" />

            {!showLeadForm ? (
              <div className="space-y-6 animate-fade-in-up">
                {/* Género */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 text-sm tracking-widest uppercase transition-all duration-300 border ${
                      gender === 'male'
                        ? 'bg-apex-gold text-apex-bg border-apex-gold font-bold'
                        : 'bg-transparent text-apex-gray border-white/10 hover:border-white/30'
                    }`}
                  >
                    Hombre
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 text-sm tracking-widest uppercase transition-all duration-300 border ${
                      gender === 'female'
                        ? 'bg-apex-gold text-apex-bg border-apex-gold font-bold'
                        : 'bg-transparent text-apex-gray border-white/10 hover:border-white/30'
                    }`}
                  >
                    Mujer
                  </button>
                </div>

                {/* Inputs Básicos */}
                <div className="grid grid-cols-3 gap-4">
                  <InputGroup label="Edad" value={age} onChange={setAge} placeholder="25" type="number" />
                  <InputGroup label="Peso (kg)" value={weight} onChange={setWeight} placeholder="75" type="number" />
                  <InputGroup label="Altura (cm)" value={height} onChange={setHeight} placeholder="180" type="number" />
                </div>

                {/* Input Avanzado: % Grasa */}
                <div className="relative">
                  <InputGroup
                    label="% Grasa Corporal (Opcional)"
                    value={bodyFat}
                    onChange={setBodyFat}
                    placeholder="Ej. 15"
                    type="number"
                  />
                  <div className="absolute top-0 right-0 text-[10px] text-apex-gold/70 flex items-center gap-1 mt-1">
                    <Info className="w-3 h-3" /> Activa fórmula Katch-McArdle
                  </div>
                </div>

                {/* Actividad */}
                <div className="space-y-2">
                  <label className="text-xs text-apex-gold uppercase tracking-widest font-bold">
                    Nivel de Actividad
                  </label>
                  <div className="relative">
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                      className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-apex-gold/50 transition-colors appearance-none text-sm"
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
                </div>

                {/* Objetivo */}
                <div className="space-y-2">
                  <label className="text-xs text-apex-gold uppercase tracking-widest font-bold">
                    Objetivo Actual
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['cut', 'maintain', 'bulk'] as Goal[]).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGoal(g)}
                        className={`py-3 text-xs uppercase tracking-wider border transition-all ${
                          goal === g
                            ? 'border-apex-gold text-apex-gold bg-apex-gold/5'
                            : 'border-white/10 text-apex-gray hover:border-white/30'
                        }`}
                      >
                        {g === 'cut' ? 'Definición' : g === 'maintain' ? 'Mantener' : 'Volumen'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculateTDEE}
                  disabled={!isFormValid}
                  className={`w-full py-4 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2 group transition-colors duration-300 ${
                    isFormValid
                      ? 'bg-white text-apex-bg hover:bg-apex-gold'
                      : 'bg-white/10 text-apex-gray cursor-not-allowed'
                  }`}
                >
                  Calcular Estrategia
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              // RESULTADO
              <div className="text-center space-y-8 animate-fade-in-up py-4">
                <div>
                  <p className="text-apex-gray text-sm uppercase tracking-widest mb-2">
                    {goal === 'cut'
                      ? 'Objetivo: Déficit (-20%)'
                      : goal === 'bulk'
                      ? 'Objetivo: Superávit (+10%)'
                      : 'Objetivo: Mantenimiento'}
                  </p>
                  <div className="text-6xl md:text-7xl font-bold text-white font-serif">
                    {result}{' '}
                    <span className="text-2xl text-apex-gold font-sans font-normal">kcal</span>
                  </div>
                </div>

                {!isSubmitted ? (
                  <div className="relative bg-black/20 border border-white/5 p-6 mt-8 overflow-hidden group">
                    <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-10 flex flex-col items-center justify-center p-6 text-center">
                      <Lock className="w-8 h-8 text-apex-gold mb-3" />
                      <h4 className="text-white font-bold uppercase tracking-wide mb-2">Desbloquea tu Macro-Plan</h4>
                      <p className="text-gray-400 text-xs mb-4 max-w-xs">
                        Obtén la distribución exacta de proteínas, grasas y carbohidratos para estas calorías.
                      </p>

                      <form onSubmit={handleLeadSubmit} className="flex w-full gap-2">
                        <input
                          type="tel"
                          placeholder="Tu teléfono"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 bg-black/50 border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-apex-gold text-sm"
                        />
                        <button
                          type="submit"
                          className="bg-apex-gold text-apex-bg px-4 py-2 font-bold uppercase text-xs hover:bg-white transition-colors"
                        >
                          Ver
                        </button>
                      </form>
                    </div>
                    {/* Fondo borroso simulado */}
                    <div className="opacity-30 filter blur-sm select-none space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Proteínas</span>
                        <span>???g</span>
                      </div>
                      <div className="w-full h-1 bg-gray-700 rounded">
                        <div className="w-1/3 h-full bg-apex-gray"></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Grasas</span>
                        <span>???g</span>
                      </div>
                      <div className="w-full h-1 bg-gray-700 rounded">
                        <div className="w-1/4 h-full bg-apex-gray"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/20 border border-apex-gold/30 p-6 animate-fade-in-up text-left">
                    <h4 className="text-apex-gold font-bold uppercase tracking-wide mb-4 text-center">
                      Plan Nutricional APEX
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Proteína (~2g/kg)</span>
                        <span className="text-white font-bold">{proteinGrams}g</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Grasas (25% total)</span>
                        <span className="text-white font-bold">{fatsGrams}g</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-gray-400">Carbohidratos (Resto)</span>
                        <span className="text-white font-bold">{carbsGrams}g</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-4 text-center">
                      *Cálculos estimados. Consulta a un profesional.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowLeadForm(false);
                    setIsSubmitted(false);
                  }}
                  className="text-xs text-apex-gray hover:text-white underline decoration-apex-gold/50 underline-offset-4"
                >
                  Recalcular con otros datos
                </button>
              </div>
            )}
          </div>
        </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs text-apex-gold uppercase tracking-widest font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black/30 border border-white/10 text-white p-4 focus:outline-none focus:border-apex-gold/50 transition-colors placeholder:text-white/10 text-sm"
      />
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 text-gray-300">
      <div className="p-2 bg-apex-surface rounded-full border border-white/5 text-apex-gold">
        {icon}
      </div>
      <span className="font-light text-sm tracking-wide">{text}</span>
    </div>
  );
}
