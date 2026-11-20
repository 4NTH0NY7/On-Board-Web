"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const LINKS = [
    { label: t.footer.links[0], href: "#servicios" },
    { label: t.footer.links[1], href: "#metodo" },
    { label: t.footer.links[2], href: "#contacto" },
  ];

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        
        {/* Contenedor principal: Centrado en móvil, a los lados en PC */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          
          <Link href="#" className="flex items-center justify-center w-full sm:w-auto">
            <div className="relative h-7 w-28 sm:h-8 sm:w-32">
              <Image 
                src="/img/logo-navbar2.svg" 
                alt="On Board Logo" 
                fill 
                // Quitamos "object-left" y usamos object-center para que siempre esté centrado
                className="object-contain object-center sm:object-left" 
              />
            </div>
          </Link>

          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.78rem] text-gray-500 transition-colors duration-300 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
          <p className="text-[0.7rem] text-gray-600 text-center sm:text-left">
            © {year} {t.footer.copyright}
          </p>
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-gray-700 text-center sm:text-right">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}