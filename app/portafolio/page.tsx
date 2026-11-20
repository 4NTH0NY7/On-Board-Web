"use client"; // <-- IMPORTANTE AÑADIR ESTO

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Play } from "lucide-react";
import { CLIENTS, VIDEOS } from "@/data/portfolio";
import { useLanguage } from "@/components/LanguageContext"; // <-- NUEVO

function getYouTubeThumbnail(url: string) {
  if (!url) return "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  return "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop"; 
}

export default function PortfolioPage() {
  const { t } = useLanguage(); // <-- Hook de idioma

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fafafa] text-neutral-900 pt-32 pb-24 overflow-x-clip">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-600">
                {t.portfolioPage.label}
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
                {t.portfolioPage.title1} <br /> {t.portfolioPage.title2}
              </h1>
              <p className="mt-6 text-neutral-600 text-lg">
                {t.portfolioPage.subtitle}
              </p>
            </div>
          </Reveal>

          <section className="mb-24">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-semibold text-blue-600 mb-8 border-b border-neutral-200 pb-4">
                {t.portfolioPage.section1}
              </h2>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CLIENTS.map((client, i) => (
                <Reveal key={client.id} delay={i * 0.1}>
                  <a href={client.pdfUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                      <img src={client.cover} alt={client.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm">
                        <ArrowUpRight className="h-4 w-4 text-neutral-900" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-600 mb-2">
                        {client.category}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2">
                        {client.name}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed mt-auto">
                        {client.description}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-semibold text-blue-600 mb-8 border-b border-neutral-200 pb-4">
                {t.portfolioPage.section2}
              </h2>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {VIDEOS.map((video, i) => (
                <Reveal key={video.id} delay={i * 0.1}>
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="group relative flex aspect-video w-full flex-col justify-end rounded-2xl overflow-hidden bg-neutral-900 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <img src={getYouTubeThumbnail(video.videoUrl)} alt={video.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-5 w-5 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="relative z-10 p-6">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-blue-400 mb-1">{video.client}</p>
                      <h3 className="font-display text-lg font-medium text-white">{video.title}</h3>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}