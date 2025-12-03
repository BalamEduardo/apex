import React from 'react';
import Hero from '@/components/sections/Hero';
import Philosophy from '@/components/sections/Philosophy';
import Storytelling from '@/components/sections/Storytelling';
import Gallery from '@/components/sections/Gallery';

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Storytelling />
      <Gallery />
    </main>
  );
}
