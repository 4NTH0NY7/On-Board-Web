"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    gsap.fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 2.5 });
    const handleScroll = () => {
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0f18]">
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" src="/videos/video-hero.mp4">
        Tu navegador no soporta videos HTML5.
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f18]/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-[#0a0f18]/50 to-transparent pointer-events-none" />

      {/* 1. CENTRADO: justify-center para centrar todo verticalmente */}
      <div ref={textRef} className="relative z-10 flex h-full flex-col items-center justify-center text-center px-5 opacity-0">
        
        <p className="max-w-md text-sm md:text-base text-gray-300 mb-6 mt-10">
          {t.hero.subtitle}
        </p>

        {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-tight text-brand-cream leading-[1.1]">
          {t.hero.title1} <br />
          <span className="text-blue-500">{t.hero.title2}</span>
        </h1>

        <div className="relative w-64 h-28 sm:w-80 sm:h-36 mt-20 mb-16 flex items-center justify-center">
          <Image src="/img/logo-onboard.svg" alt="On Board Logo" fill className="object-contain" priority />
        </div>
        
        {/* 2. BOTÓN NEÓN: SOLO CAMBIADO text-white AQUÍ 👇 */}
        <a 
          href="#contacto" 
          className="group mt-20 inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-base font-semibold text-brand-cream transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          {t.hero.cta}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
        
      </div>
    </section>
  );
}