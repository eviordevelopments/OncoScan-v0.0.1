import { Header } from "@/components/Header";
import { ClinicalTrialHero } from "@/components/ClinicalTrialHero";
import { ClinicalTrialRegistrationForm } from "@/components/ClinicalTrialRegistrationForm";
import { ClinicalRegulatoryFramework } from "@/components/ClinicalRegulatoryFramework";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudio Clínico ONCO-1 — Pre-registro de Participantes | OncoScan",
  description:
    "Pre-registro voluntario y gratuito para participar en el Estudio Clínico ONCO-1 de detección temprana mediante una muestra rutinaria de sangre.",
};

export default function ProtocoloOnco1Page() {
  return (
    <div className="min-h-screen bg-[#F2F3F5] text-black selection:bg-cyan-500/20 selection:text-black flex flex-col">
      {/* Header with Top Banner linked directly to /protocolo-onco-1 */}
      <Header />

      {/* Main Clinical Trial Reception & Registration Experience */}
      <main className="flex-1 w-full">
        {/* 1. Ultrahuman MX-Style Animated Hero Section */}
        <ClinicalTrialHero />

        {/* 2. Patient Profile, Reception & Pre-Registration Form + Ethical Status Notice */}
        <ClinicalTrialRegistrationForm />

        {/* 3. Normative Framework: Declaration of Helsinki & IV Venipuncture Biosafety */}
        <ClinicalRegulatoryFramework />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
