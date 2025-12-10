import React from 'react';
import Hero from '@/components/sections/Hero';
import ExperienciaSection from '@/components/sections/ExperienciaSection';
import ComunidadSection from '@/components/sections/ComunidadSection';
import TdeeCalculator from '@/components/sections/TdeeCalculato';
import Memberships from '@/components/sections/Memberships';
import QuickRegister from '@/components/sections/QuickRegister';
import Schedule from '@/components/sections/Schedule';

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienciaSection />
      <ComunidadSection />
      <TdeeCalculator />
      <Memberships />
      <Schedule />
      <QuickRegister />
      
    </main>
  );
}
