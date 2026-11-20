"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "";
      },
    });

    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.2 })
      .to(logoRef.current, { y: -80, opacity: 0, duration: 1, delay: 0.5, ease: "power3.inOut" })
      .to(containerRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.5");

  }, []);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070a12]">
      <div ref={logoRef} className="text-center opacity-0 translate-y-6 flex flex-col items-center">
        
        <div className="relative w-56 h-28 sm:w-72 sm:h-36 flex items-center justify-center">
          <Image 
            src="/img/logo-onboard2.svg" 
            alt="On Board Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <div className="mt-6 h-[1px] w-12 bg-blue-500" />
      </div>
    </div>
  );
}