"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";
import { Megaphone, Layers, UserCheck, Camera, MonitorSmartphone } from "lucide-react";

// Iconos que acompañan cada servicio de "¿Por qué elegirnos?"
const WHY_US_ICONS = [Megaphone, Layers, UserCheck, Camera, MonitorSmartphone];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="quienes-somos" className="scroll-mt-24 py-16 sm:py-24 mx-auto max-w-7xl px-5 sm:px-8">
      
      {/* SECCIÓN SUPERIOR: Texto y Flyer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-24">
        
        <Reveal>
          <div>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-500">
              {t.about.label}
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-white">
              {t.about.title}
            </h2>
            <p className="mt-5 text-gray-400 text-sm sm:text-base leading-relaxed">
              {t.about.p1}
            </p>
            <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              {t.about.p2}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-lg">
            <Image
              src="/img/flyer-quiensomos.avif" 
              alt="On Board Flyer Quiénes Somos"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>

      </div>

      {/* SECCIÓN INFERIOR: ¿POR QUÉ ELEGIRNOS? */}
      <div className="border-t border-white/[0.07] pt-16">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-display text-3xl font-semibold text-white">
              {t.about.whyUsTitle}
            </h3>
            <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              {t.about.whyUsSubtitle}
            </p>
          </div>
        </Reveal>

        {/* Cuadrícula de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {t.about.whyUsList.map((item: string, index: number) => {
            const Icon = WHY_US_ICONS[index] || Megaphone; // Icono por defecto por si acaso
            
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-blue-500/30">
                  {/* Icono */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  
                  {/* Texto */}
                  <h4 className="font-medium text-white text-[0.95rem] leading-tight">
                    {item}
                  </h4>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

    </section>
  );
}