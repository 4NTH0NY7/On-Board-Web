"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { CLIENTS, VIDEOS } from "@/data/portfolio";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "./LanguageContext";

function getYouTubeThumbnail(url: string) {
  if (!url) return "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  return "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop"; 
}

export default function Portfolio() {
  const { t } = useLanguage();
  
  // CARRUSEL 1: Proyectos
  const autoplay1 = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ loop: true, align: "center" }, [autoplay1.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi1) return;
    setSelectedIndex(emblaApi1.selectedScrollSnap());
  }, [emblaApi1]);

  useEffect(() => {
    if (!emblaApi1) return;
    onSelect();
    emblaApi1.on("select", onSelect);
    emblaApi1.on("reInit", onSelect);
  }, [emblaApi1, onSelect]);

  const scrollPrev1 = useCallback(() => {
    if (emblaApi1) {
      emblaApi1.scrollPrev();
      if (autoplay1.current) autoplay1.current.reset();
    }
  }, [emblaApi1]);

  const scrollNext1 = useCallback(() => {
    if (emblaApi1) {
      emblaApi1.scrollNext();
      if (autoplay1.current) autoplay1.current.reset();
    }
  }, [emblaApi1]);

  // CARRUSEL 2: Videos
  const autoplay2 = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef2, emblaApi2] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: true }, 
    [autoplay2.current]
  );

  const scrollPrev2 = useCallback(() => {
    if (emblaApi2) {
      emblaApi2.scrollPrev();
      if (autoplay2.current) autoplay2.current.reset();
    }
  }, [emblaApi2]);

  const scrollNext2 = useCallback(() => {
    if (emblaApi2) {
      emblaApi2.scrollNext();
      if (autoplay2.current) autoplay2.current.reset();
    }
  }, [emblaApi2]);

  return (
    <section id="portafolio" className="scroll-mt-24 py-16 sm:py-24 border-y border-white/5 bg-[#070a12] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <Reveal>
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-500">
                {t.portfolioHome.label}
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-brand-cream">
                {t.portfolioHome.title}
              </h2>
            </div>
            <Link href="/portafolio" className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-brand-cream">
              {t.portfolioHome.viewAll}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* CARRUSEL 1: Proyectos */}
        <div className="relative mb-12">
          <button 
            onClick={scrollPrev1} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0a0f18]/80 backdrop-blur-md text-brand-cream transition-all hover:bg-[#0a0f18] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] -ml-4 lg:-ml-6"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing py-10" ref={emblaRef1}>
            <div className="flex touch-pan-y">
              {CLIENTS.map((client, index) => (
                <div key={client.id} className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_45%] px-2 sm:px-4">
                  <a 
                    href={client.pdfUrl} target="_blank" rel="noopener noreferrer" 
                    className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#edeae1] shadow-lg transition-all duration-500 ease-in-out ${
                      index === selectedIndex ? "scale-100 opacity-100 z-10 relative" : "scale-90 opacity-60"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border-b border-black/10">
                      <img src={client.cover} alt={client.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col p-6">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-600 mb-2">{client.category}</span>
                      <h3 className="font-display text-xl font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">{client.name}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollNext1} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0a0f18]/80 backdrop-blur-md text-brand-cream transition-all hover:bg-[#0a0f18] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] -mr-4 lg:-mr-6"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* CARRUSEL 2: Videos */}
        <div className="relative mt-8 max-w-5xl mx-auto">
          
          <button 
            onClick={scrollPrev2} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0f18]/80 backdrop-blur-md text-brand-cream transition-all hover:bg-[#0a0f18] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] -ml-6 lg:-ml-8"
            aria-label="Video Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef2}>
            <div className="flex -ml-4">
              {VIDEOS.map((video) => (
                <div key={video.id} className="flex-[0_0_100%] md:flex-[0_0_50%] pl-4">
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#edeae1] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 border-b border-black/10">
                      <img src={getYouTubeThumbnail(video.videoUrl)} alt={video.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-brand-cream transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-4">
                      <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-blue-600 mb-1">{video.client}</span>
                      <h3 className="font-display text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollNext2} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0f18]/80 backdrop-blur-md text-brand-cream transition-all hover:bg-[#0a0f18] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] -mr-6 lg:-mr-8"
            aria-label="Video Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}