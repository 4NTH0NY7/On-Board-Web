"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowUpRight, Play } from "lucide-react";
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
  const { t } = useLanguage(); // <-- Hook de idioma

  const [emblaRef1] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [emblaRef2] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  return (
    <section id="portafolio" className="scroll-mt-24 py-16 sm:py-24 border-y border-white/5 bg-[#070a12] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        <Reveal>
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-500">
                {t.portfolioHome.label}
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-white">
                {t.portfolioHome.title}
              </h2>
            </div>
            <Link href="/portafolio" className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
              {t.portfolioHome.viewAll}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Carrusel 1 */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing mb-8" ref={emblaRef1}>
          <div className="flex -ml-4">
            {CLIENTS.map((client) => (
              <div key={client.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                <a href={client.pdfUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/50">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border-b border-white/10">
                    <img src={client.cover} alt={client.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                      <ArrowUpRight className="h-4 w-4 text-neutral-900" />
                    </div>
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

        {/* Carrusel 2 */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef2}>
          <div className="flex -ml-4">
            {VIDEOS.map((video) => (
              <div key={video.id} className="flex-[0_0_100%] md:flex-[0_0_50%] pl-4">
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/50">
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 border-b border-white/10">
                    <img src={getYouTubeThumbnail(video.videoUrl)} alt={video.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-5 w-5 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col p-6">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-600 mb-2">{video.client}</span>
                    <h3 className="font-display text-xl font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}