import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// 1. Configuración de la fuente Inter
// Se cargan solo los pesos necesarios para rendimiento óptimo
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"], // Light, Regular, SemiBold, Bold, Black
  display: "swap",
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
    <html lang="es">
      <body
        // 3. Inyección de variables y clases base
        // ${inter.variable} -> Hace disponible la fuente para Tailwind
        // antialiased -> Suavizado de fuentes para estética premium
        className={`${inter.variable} antialiased bg-apex-bg text-white`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}