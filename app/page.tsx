import { Header } from "@/components/Header";
import { MainBrandHero } from "@/components/MainBrandHero";
import { MainEcosystemBento } from "@/components/MainEcosystemBento";
import { MainBioTelemetrySection } from "@/components/MainBioTelemetrySection";
import { PartnersCarouselSection } from "@/components/PartnersCarouselSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-black selection:bg-cyan-500/20 selection:text-black flex flex-col">
      {/* 
        Single Ultrahuman Header System:
        - High-transparency frosted glass capsule (bg-white/45 + backdrop-blur-2xl)
        - Prominent "OncoScan" navigation pill in the header to access /oncoscan
        - Dead-centered NeuralHack emblem linking to "/"
      */}
      <Header />

      {/* Main Ultrahuman-inspired Brand Ecosystem Landing Page */}
      <main className="flex-1 w-full">
        {/* Dark Flagship Hero */}
        <MainBrandHero />

        {/* Ecosystem Bento Showcase (OncoScan Flagship + miRNA Vision + NeuralCore NPU + Clinical Cloud) */}
        <MainEcosystemBento />

        {/* Bio-Telemetry Rings, Clinical Evidence & Direct Portal to /oncoscan */}
        <MainBioTelemetrySection />

        {/* Monochromatic Background-Free Partners Carousel */}
        <PartnersCarouselSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
