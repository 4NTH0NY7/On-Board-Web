"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage(); // <-- Hook de idioma

  useEffect(() => {
    gsap.fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 2.5 });

    const handleScroll = () => {
      if (videoRef.current) {
        const scrollY = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
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
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#090f1d] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d] via-[#090f1d]/60 to-transparent pointer-events-none" />

      <div ref={textRef} className="relative z-10 flex h-full flex-col items-center justify-center text-center px-5 opacity-0">
        
        <div className="relative w-48 h-24 sm:w-64 sm:h-28 mb-8 flex items-center justify-center">
          <Image src="/img/logo-onboard.svg" alt="On Board Logo" fill className="object-contain" priority />
        </div>

        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-tight text-white leading-[1.1]">
          {t.hero.title1} <br />
          <span className="text-blue-500">{t.hero.title2}</span>
        </h1>
        
        <p className="mt-6 max-w-md text-sm md:text-base text-gray-400">
          {t.hero.subtitle}
        </p>
        
        <a href="#contacto" className="group mt-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500">
          {t.hero.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}