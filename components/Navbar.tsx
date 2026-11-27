"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenu, setLangMenu] = useState(false); 
  const pathname = usePathname(); 
  const { language, setLanguage, t } = useLanguage();

  const isPortfolio = pathname?.startsWith("/portafolio");
  const forceDark = scrolled || isPortfolio;

  const LINKS = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.services, href: "/#servicios" },
    { label: t.nav.portfolio, href: "/portafolio" }, 
    { label: t.nav.about, href: "/#quienes-somos" },
    { label: t.nav.contact, href: "/#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${forceDark ? "border-b border-white/[0.06] bg-[#070a12]/75 backdrop-blur-xl shadow-lg shadow-black/5" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-10">
        
        <Link href="/" className="group flex items-center" aria-label="On Board — Inicio">
          <div className="relative h-7 w-28 sm:h-8 sm:w-32">
            {/* LOGO ACTUALIZADO AQUÍ */}
            <Image src="/img/logo-navbar.svg" alt="On Board Logo" fill className="object-contain object-left" priority />
          </div>
        </Link>

        {/* Links desktop (Aumentados a text-[0.95rem]) */}
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link 
                href={l.href} 
                className="group relative text-[0.95rem] font-medium tracking-wide text-muted transition-colors duration-300 hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Controles de la derecha */}
        <div className="hidden items-center gap-6 lg:flex">
          
          {/* SELECTOR DE IDIOMA */}
          <div className="relative">
            <button 
              onClick={() => setLangMenu(!langMenu)}
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors border border-white/10 bg-white/[0.03] px-3 py-1.5 rounded-full"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language === "es" ? "ES" : "EN"}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${langMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown */}
            {langMenu && (
              <div className="absolute right-0 top-full mt-3 w-32 overflow-hidden rounded-xl border border-white/10 bg-[#070a12] shadow-xl backdrop-blur-xl z-[100]">
                <button 
                  onClick={() => { setLanguage("es"); setLangMenu(false); }} 
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors ${language === 'es' ? 'text-blue-500 font-medium' : 'text-gray-400'}`}
                >
                  Español
                </button>
                <button 
                  onClick={() => { setLanguage("en"); setLangMenu(false); }} 
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors ${language === 'en' ? 'text-blue-500 font-medium' : 'text-gray-400'}`}
                >
                  English
                </button>
              </div>
            )}
          </div>
          
          <Link href="/#contacto" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[0.8rem] font-medium text-ink transition-all duration-300 hover:border-accent/50 hover:bg-accent/10">
            {t.nav.cta}
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
          </Link>
        </div>

        {/* Toggle móvil */}
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} className="relative z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink transition-colors hover:border-white/20 lg:hidden">
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {/* Panel móvil full-screen */}
      <div className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-background/85 backdrop-blur-2xl transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />

        <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-24 sm:px-8">
          <ul className="space-y-1">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${100 + i * 70}ms` : "0ms" }} className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <Link href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/[0.06] py-5 font-display text-[clamp(1.6rem,7vw,2.25rem)] font-medium tracking-tight text-ink">
                  {l.label}
                  <ArrowUpRight className="h-5 w-5 text-neutral-600" />
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ transitionDelay: open ? "340ms" : "0ms" }} className={`space-y-5 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            
            {/* Selector idioma móvil */}
            <div className="flex items-center justify-center gap-6 pb-4">
              <button 
                onClick={() => setLanguage("es")} 
                className={`text-sm transition-colors ${language === 'es' ? 'text-blue-500 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Español
              </button>
              <span className="text-gray-700">|</span>
              <button 
                onClick={() => setLanguage("en")} 
                className={`text-sm transition-colors ${language === 'en' ? 'text-blue-500 font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                English
              </button>
            </div>

            <Link href="/#contacto" onClick={() => setOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.8)]">
              {t.hero.cta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}