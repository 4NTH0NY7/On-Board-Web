import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";       // <-- Movido aquí
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <About />      {/* <-- Ahora aparece después de Portafolio */}
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}