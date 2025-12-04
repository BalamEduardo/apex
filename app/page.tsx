import React from 'react';
import Hero from '@/components/sections/Hero';
import Philosophy from '@/components/sections/Philosophy';
import Storytelling from '@/components/sections/Storytelling';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import TdeeCalculator from '@/components/sections/TdeeCalculato';
import Memberships from '@/components/sections/Memberships';
import QuickRegister from '@/components/sections/QuickRegister';

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Storytelling />
      <Gallery />
      <Testimonials />
      <TdeeCalculator />
      <Memberships />
      <QuickRegister />
    </main>
  );
}
