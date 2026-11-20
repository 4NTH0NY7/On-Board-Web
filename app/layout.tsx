import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import { LanguageProvider } from "@/components/LanguageContext";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-display", weight: ["400", "500", "600", "700", "800"] });
const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  title: "On Board - Marketing Solutions",
  description: "Agencia boutique de marketing digital, branding y producción audiovisual.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-background font-sans text-ink antialiased">
        
        {/* AQUÍ ESTÁ LA MAGIA: ENVOLVEMOS TODO */}
        <LanguageProvider>
          <Preloader />
          {children}
        </LanguageProvider>

      </body>
    </html>
  );
}