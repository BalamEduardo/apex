import React from 'react';
import Hero from '@/components/sections/Hero';
import ExperienciaSection from '@/components/sections/ExperienciaSection';
import Testimonials from '@/components/sections/Testimonials';
import TdeeCalculator from '@/components/sections/TdeeCalculato';
import Memberships from '@/components/sections/Memberships';
import QuickRegister from '@/components/sections/QuickRegister';
import Coaches from '@/components/sections/Coaches';

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienciaSection />
      <Coaches />
      <Testimonials />
      <TdeeCalculator />
      <Memberships />
      <QuickRegister />
    </main>
  );
}
