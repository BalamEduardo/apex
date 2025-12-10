// lib/utils.ts
// Utilidades compartidas del proyecto APEX

/**
 * Valida un número de teléfono mexicano (10 dígitos)
 * @param phone - String con el número de teléfono
 * @returns true si es válido, false si no
 */
export function validateMexicanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return /^[0-9]{10}$/.test(cleaned);
}

/**
 * Verifica si el gimnasio APEX está abierto según el horario
 * Lunes a Viernes: 5:00 – 23:00
 * Sábados: 6:00 – 20:00
 * Domingos: 7:00 – 15:00
 * @returns true si está abierto, false si está cerrado
 */
export function isApexOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=domingo, 1=lunes, ..., 6=sábado
  const hour = now.getHours();

  // Lunes a Viernes (1-5): 5:00 – 23:00
  if (day >= 1 && day <= 5) {
    return hour >= 5 && hour < 23;
  }

  // Sábado (6): 6:00 – 20:00
  if (day === 6) {
    return hour >= 6 && hour < 20;
  }

  // Domingo (0): 7:00 – 15:00
  if (day === 0) {
    return hour >= 7 && hour < 15;
  }

  return false;
}

/**
 * Formatea un número de teléfono a formato mexicano (XX) XXXX-XXXX
 * @param phone - String con el número de teléfono
 * @returns Número formateado o el original si no es válido
 */
export function formatMexicanPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}
