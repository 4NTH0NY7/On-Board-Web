"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Sub-componente para animar el número
function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  // Calculamos esto afuera para que el "return" pueda leer el "suffix"
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (isNaN(numericValue)) {
      if (ref.current) ref.current.innerText = value;
      return;
    }

    const obj = { val: 0 };

    const anim = gsap.to(obj, {
      val: numericValue,
      duration: 2.5, // Duración de la animación (2.5 segundos)
      ease: "power3.out", // Empieza rápido y desacelera suavemente
      scrollTrigger: {
        trigger: ref.current,
        start: "top 95%", // Se activa cuando el número entra en pantalla
        once: true, // Solo se anima una vez
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.innerText = Math.round(obj.val).toString() + suffix;
        }
      },
    });

    return () => {
      anim.kill();
    };
  }, [value, numericValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 sm:py-24">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-neutral-200 shadow-sm sm:grid-cols-4">
          {t.stats.map((s: any) => (
            <div
              key={s.label}
              className="group flex flex-col items-center justify-center bg-white px-4 py-8 text-center transition-colors duration-500 hover:bg-neutral-50 sm:px-6 sm:py-12"
            >
              {/* VALOR ANIMADO */}
              <span className="font-display text-[clamp(1.75rem,4.5vw,2.85rem)] font-semibold leading-none tracking-tight text-blue-500 transition-colors duration-500">
                <Counter value={s.value} />
              </span>
              <span className="mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500 sm:text-[0.7rem] sm:tracking-[0.24em]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}