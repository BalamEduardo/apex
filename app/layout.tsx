import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollRestoration from "./scroll-restoration";

// 1. Configuración de la fuente Inter
// Se cargan solo los pesos necesarios para rendimiento óptimo
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"], // Light, Regular, SemiBold, Bold, Black
  display: "swap",
  preload: true, // Precarga la fuente para evitar FOUT
});

// 2. Metadatos SEO (Title & Description)
export const metadata: Metadata = {
  title: "APEX | High-End Luxury Fitness",
  description: "Redefiniendo el estándar del fitness moderno. Lujo, rendimiento y exclusividad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      className={inter.variable}
      style={{ 
        backgroundColor: '#000000', 
        color: '#ffffff',
      }}
    >
      <body
        // 3. Inyección de variables y clases base
        // font-sans -> Aplica la fuente inmediatamente (evita FOUT)
        // antialiased -> Suavizado de fuentes para estética premium
        className="font-sans antialiased bg-apex-bg text-white"
        style={{
          fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#000000',
          color: '#ffffff',
        }}
      >
        <ScrollRestoration />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}