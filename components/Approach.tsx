"use client";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";

export default function Approach() {
  const { t } = useLanguage();

  return (
    <section id="metodo" className="relative scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.26em] text-blue-500 sm:text-[0.7rem]">
              <span className="h-px w-8 bg-blue-500/60" />
              {t.approach.label}
            </span>
            {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
            <h2 className="mt-5 text-balance font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-brand-cream">
              {t.approach.title}
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-white/[0.07]">
          {t.approach.steps.map((step: any, i: number) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="group grid grid-cols-1 gap-3 border-b border-white/[0.07] py-8 transition-colors duration-500 hover:bg-white/[0.015] sm:gap-4 sm:py-10 md:grid-cols-12 md:items-baseline md:gap-8 md:px-2">
                <div className="md:col-span-2">
                  <span className="font-display text-sm font-semibold tracking-[0.1em] text-gray-600 transition-colors duration-500 group-hover:text-blue-500 md:text-base">
                    0{i + 1}
                  </span>
                </div>
                {/* SOLO CAMBIADO text-white AQUÍ 👇 */}
                <h3 className="font-display text-[1.25rem] font-medium tracking-tight text-brand-cream transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.5rem] md:col-span-4">
                  {step.title}
                </h3>
                <p className="max-w-xl text-pretty text-[0.88rem] leading-relaxed text-gray-400 sm:text-[0.95rem] md:col-span-6">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}