// lib/animations.ts
// Constantes y variantes de animación compartidas para el proyecto APEX

import type { Variants } from 'framer-motion';

/**
 * Easing personalizado APEX
 * cubic-bezier(0.16, 1, 0.3, 1) - Suave y elegante
 */
export const apexEase = [0.16, 1, 0.3, 1] as const;

/**
 * Variante fade-up estándar
 * Aparición suave desde abajo con opacidad
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: apexEase,
    },
  },
};

/**
 * Variante fade-up pequeño (para elementos secundarios)
 */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: apexEase,
    },
  },
};

/**
 * Container con stagger para hijos
 * Útil para listas o grupos de elementos
 */
export const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Variante de escala con fade (para modales, tarjetas destacadas)
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: apexEase,
    },
  },
};

/**
 * Variante para elementos que se deslizan desde la izquierda
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: apexEase,
    },
  },
};

/**
 * Variante para elementos que se deslizan desde la derecha
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: apexEase,
    },
  },
};
