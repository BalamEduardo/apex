import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollRestoration from "./scroll-restoration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
  preload: true,
});

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
    >
      <body className="font-sans antialiased">
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
