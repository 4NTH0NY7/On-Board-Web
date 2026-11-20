"use client";

import Reveal from "./Reveal";
import { Video, Monitor, Users, Lightbulb, Palette } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const ICONS = [Palette, Monitor, Video, Lightbulb];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-24 bg-[#070a12]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-500">
              {t.services.label}
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-white">
              {t.services.title1} <br className="hidden sm:block" /> {t.services.title2}
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base">
              {t.services.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.services.list.map((service: any, index: number) => {
            const Icon = ICONS[index];
            return (
              <Reveal key={service.title} delay={index * 0.15} className="h-full">
                <div className="group flex flex-col h-full min-h-[320px] rounded-3xl border border-white/5 bg-white/[0.02] p-10 transition-colors duration-300 hover:bg-white/[0.04] hover:border-blue-500/30">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[0.95rem] text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}