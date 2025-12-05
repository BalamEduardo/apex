// app/scroll-restoration.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Desactiva la restauración automática del scroll del navegador
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Si hay un hash en la URL (#seccion), scroll suave a esa sección
    // después de que la página cargue completamente
    const hash = window.location.hash;
    if (hash) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Sin hash = ir al top
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
