"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import Image from "next/image";
import { Megaphone, Layers, UserCheck, Camera, MonitorSmartphone, ArrowRight } from "lucide-react";

const WHY_US_ICONS = [Megaphone, Layers, UserCheck, Camera, MonitorSmartphone];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="quienes-somos" className="relative scroll-mt-24 py-16 sm:py-24 mx-auto max-w-7xl px-5 sm:px-8">
      
      {/* Estilos para la nueva animación (ahora con movimiento fluido y constante) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-light {
          0%   { transform: translate(-20%, -20%); }
          25%  { transform: translate(20%, -10%); }
          50%  { transform: translate(10%, 20%); }
          75%  { transform: translate(-20%, 10%); }
          100% { transform: translate(-20%, -20%); }
        }
        .animate-float-light {
          /* linear hace que no frene, sea constante */
          animation: float-light 12s linear infinite;
        }
      `}} />

      {/* SECCIÓN SUPERIOR: Texto y Flyer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-32">
        <Reveal>
          <div>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-500">
              {t.about.label}
            </span>
            {/* SOLO CAMBIADO EL BLANCO/CREMA AQUÍ 👇 */}
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-brand-cream">
              {t.about.title}
            </h2>
            <p className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed">
              {t.about.p1}
            </p>
            <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
              {t.about.p2}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl">
            <Image
              src="/img/flyer-quiensomos.avif" 
              alt="On Board Flyer"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </Reveal>
      </div>

      {/* SECCIÓN INFERIOR */}
      <div className="relative border-t border-white/10 pt-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              {/* SOLO CAMBIADO AQUÍ 👇 */}
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-brand-cream">
                {t.about.whyUsTitle}
              </h3>
              <p className="mt-4 text-gray-400 text-base leading-relaxed">
                {t.about.whyUsSubtitle}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {t.about.whyUsList.map((item: string, index: number) => {
            const Icon = WHY_US_ICONS[index] || Megaphone;
            const isLarge = index === 0;
            const colSpan = isLarge ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-2";

            return (
              <Reveal key={index} delay={index * 0.1} className={`${colSpan} h-full`}>
                
                {/* TARJETA */}
                <div className="group relative flex flex-col justify-center h-full min-h-[140px] overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0c1017] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)]">
                  
                  {/* LUZ FLOTANTE (Más suave, menos opaca y con movimiento fluido) */}
                  <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-500/10 blur-[50px] animate-float-light pointer-events-none group-hover:bg-blue-500/20 group-hover:blur-[60px] transition-all duration-700" />

                  <div className={`relative z-10 flex ${isLarge ? 'flex-col items-start gap-6' : 'items-center gap-5'}`}>
                    
                    {/* SOLO CAMBIADO EL HOVER AQUÍ 👇 */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#425474]/20 text-blue-400 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-brand-cream group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    
                    {/* SOLO CAMBIADO AQUÍ 👇 */}
                    <h4 className={`font-semibold text-brand-cream leading-snug ${isLarge ? 'text-xl' : 'text-[0.95rem]'}`}>
                      {item}
                    </h4>
                  </div>

                  {isLarge && (
                    <div className="relative z-10 mt-8 flex items-center text-sm font-medium text-blue-400 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-2">
                      Descubre cómo lo hacemos <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}