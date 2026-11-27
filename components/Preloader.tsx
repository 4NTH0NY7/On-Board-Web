"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  
  const [step, setStep] = useState<"logo" | "options" | "exit">("logo");
  const { setLanguage } = useLanguage();

  // Animación inicial del logo
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const tl = gsap.timeline({
      onComplete: () => setStep("options")
    });

    // El logo aparece y luego se desvanece para dejar paso a las opciones
    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.5 })
      .to(logoRef.current, { y: -30, opacity: 0, duration: 0.6, delay: 0.8, ease: "power2.in" });
      
  }, []);

  // Animación cuando aparecen las opciones
  useEffect(() => {
    if (step === "options") {
      gsap.fromTo(optionsRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [step]);

  const handleLanguageSelect = (lang: "es" | "en") => {
    setLanguage(lang);
    setStep("exit");

    // Animación de salida (difuminar toda la pantalla)
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        // Aquí ya desaparece el preloader por completo
      }
    });
  };

  if (step === "exit" && !containerRef.current) return null; // Failsafe

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070a12] ${step === "exit" ? "pointer-events-none" : ""}`}
    >
      
      {/* PASO 1: EL LOGO */}
      <div ref={logoRef} className="absolute flex flex-col items-center opacity-0 translate-y-6">
        <div className="relative w-56 h-28 sm:w-72 sm:h-36 flex items-center justify-center">
          <Image src="/img/logo-onboard.svg" alt="On Board Logo" fill className="object-contain" priority />
        </div>
      </div>

      {/* PASO 2: LOS BOTONES DE IDIOMA (NEÓN) */}
      <div ref={optionsRef} className="absolute flex flex-col items-center gap-6 opacity-0">
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-2 font-medium">Select Language</p>
        
        <div className="flex gap-4">
          {/* SOLO CAMBIADO text-white POR text-brand-cream 👇 */}
          <button 
            onClick={() => handleLanguageSelect("es")} 
            className="px-10 py-4 rounded-full border border-blue-500/50 text-brand-cream font-medium transition-all duration-300 hover:bg-blue-600 hover:border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
          >
            Español
          </button>
          
          {/* SOLO CAMBIADO text-white POR text-brand-cream 👇 */}
          <button 
            onClick={() => handleLanguageSelect("en")} 
            className="px-10 py-4 rounded-full border border-blue-500/50 text-brand-cream font-medium transition-all duration-300 hover:bg-blue-600 hover:border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
          >
            English
          </button>
        </div>
      </div>

    </div>
  );
}