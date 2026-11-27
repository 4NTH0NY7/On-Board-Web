"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import { Printer, MonitorSmartphone, Video, Megaphone, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const ICONS = [Printer, MonitorSmartphone, Video, Megaphone];

export default function Services() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      
      if (step === 1) setActiveIndex(0); 
      else if (step === 2) setActiveIndex(1);
      else if (step === 3) setActiveIndex(2);
      else if (step === 4) setActiveIndex(3);
      else if (step === 5) setActiveIndex(-1); // Todos encendidos
      else if (step === 6) setActiveIndex(-2); // Todos apagados
      else if (step === 7) {
        setActiveIndex(0); // Reinicia en el primero
        step = 1; 
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="servicios" className="py-24 bg-[#070a12]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-20 flex flex-col items-center justify-center">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-500 mb-3">
              {t.services.title1}
            </span>
            {/* SOLO CAMBIADO AQUÍ 👇 */}
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-cream tracking-tight">
              {t.services.title2}
            </h2>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base">
              {t.services.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {t.services.list.map((service: any, index: number) => {
              const Icon = ICONS[index];
              const isActive = activeIndex === index || activeIndex === -1;

              return (
                <Reveal key={service.title} delay={index * 0.15} className="h-full">
                  
                  <div 
                    className={`group relative flex flex-col h-full p-8 lg:p-10 transition-all duration-500 ${
                      isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    
                    {/* LÍNEA NEÓN VERTICAL */}
                    {index !== t.services.list.length - 1 && (
                      <div className="absolute right-0 top-8 bottom-8 hidden lg:block w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    )}

                    {/* LÍNEA NEÓN HORIZONTAL */}
                    {index !== t.services.list.length - 1 && (
                      <div className="absolute bottom-0 left-8 right-8 block lg:hidden h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    )}

                    {/* ICONO: SOLO CAMBIADO text-white AQUÍ 👇 */}
                    <div 
                      className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                        isActive 
                          ? "bg-blue-500 text-brand-cream shadow-[0_0_30px_rgba(59,130,246,0.6)] scale-110 rotate-12" 
                          : "bg-blue-500/10 text-blue-500 scale-100 rotate-0"
                      }`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>

                    {/* TÍTULO: SOLO CAMBIADO text-white y #edeae1 AQUÍ 👇 */}
                    <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isActive ? "text-brand-cream" : "text-brand-cream"}`}>
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-8">
                      {service.desc}
                    </p>
                    
                    <ul className="mt-auto space-y-3">
                      {service.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-[0.9rem] text-gray-300">
                          {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 transition-colors duration-500 ${isActive ? "bg-blue-500 text-brand-cream" : "bg-blue-500/10 text-blue-500"}`}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* LÍNEA INFERIOR DE LA TARJETA ACTIVA */}
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-500 ${isActive ? "w-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" : "w-0"}`} />
                  </div>

                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}