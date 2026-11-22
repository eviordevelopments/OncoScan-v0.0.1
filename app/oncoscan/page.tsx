import { Header } from "@/components/Header";
import { UnifiedHeroExperience } from "@/components/UnifiedHeroExperience";
import { BloodVisionHeroAnimation } from "@/components/BloodVisionHeroAnimation";
import { MissionVisionSection } from "@/components/MissionVisionSection";
import { HardwareCloserLook } from "@/components/HardwareCloserLook";
import { ExplodedSystemsShowcase } from "@/components/ExplodedSystemsShowcase";
import { SeamlessDiagnosticExperience } from "@/components/SeamlessDiagnosticExperience";
import { OncoScanProfilesCarousel } from "@/components/OncoScanProfilesCarousel";
import { ClinicalValidation } from "@/components/ClinicalValidation";
import { BiomarkerMatrix } from "@/components/BiomarkerMatrix";
import { FreemiumKitFlow } from "@/components/FreemiumKitFlow";
import { PartnersCarouselSection } from "@/components/PartnersCarouselSection";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OncoScan — Detección Molecular de Cáncer & Microfluidos Edge AI | NeuralHack",
  description:
    "Diagnóstico molecular temprano en tiempo real. Fusión de cartuchos microfluídicos, perfiles de microARN circulante e inferencia de Inteligencia Artificial perimetral en 8.4 ms.",
};

export default function OncoScanPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-black selection:bg-cyan-500/20 selection:text-black flex flex-col">
      {/* 
        Single Ultrahuman Header System:
        - Collapsible announcement banner at top
        - Morphing navigation pill on scroll
        - 100% mathematically dead-centered logo emblem
      */}
      <Header />

      {/* Main OncoScan Subpage Experience */}
      <main className="flex-1 w-full">
        {/* Unified Hero + 3D MicroRNA Experience */}
        <UnifiedHeroExperience />

        {/* Exact Ultrahuman Blood Vision 3D Spline Hero Animation */}
        <BloodVisionHeroAnimation />

        {/* Neuralink-style Minimalist Mission & Vision with Alternating Sides */}
        <MissionVisionSection />

        {/* Dark Hardware Section (Neuralink N1 style closer look) */}
        <HardwareCloserLook />

        {/* Neuralink "Surgical robot" style 3-Layer Exploded Systems Architecture */}
        <ExplodedSystemsShowcase />

        {/* Neuralink "A seamless BCI experience" style Video Section */}
        <SeamlessDiagnosticExperience />

        {/* Ultrahuman "PRO beyond measure" style Profiles & Targets Carousel */}
        <OncoScanProfilesCarousel />

        {/* Clinical Evidence */}
        <ClinicalValidation />

        {/* Molecular Biomarker Telemetry */}
        <BiomarkerMatrix />

        {/* B2B2C Kit Experience */}
        <FreemiumKitFlow />

        {/* Monochromatic Background-Free Partners Carousel */}
        <PartnersCarouselSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

