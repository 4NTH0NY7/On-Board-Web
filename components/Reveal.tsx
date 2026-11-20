"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ 
  children, 
  delay = 0, 
  y = 40,
  className = "" // <-- AÑADIDO
}: { 
  children: React.ReactNode; 
  delay?: number; 
  y?: number;
  className?: string; // <-- AÑADIDO
}) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) return;

    const anim = gsap.fromTo(
      element.current,
      { autoAlpha: 0, y: y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: element.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [delay, y]);

  // <-- AÑADIDO className al div
  return <div ref={element} className={className}>{children}</div>; 
}