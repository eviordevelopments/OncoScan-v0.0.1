import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImpactPageClient } from "@/components/ImpactPageClient";

export const metadata: Metadata = {
  title:
    "Impacto · Prevención y Detección Temprana (UMAPS Loza de los Padres, GTO) | OncoScan",
  description:
    "Resultados claros e interactivos de la jornada de detección temprana del 20 de noviembre en Guanajuato (UMAPS Loza de los Padres): nuevos hallazgos de salud, indicadores medidos e impacto comunitario.",
};

export default function ImpactoPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#060911] selection:bg-[#0052FF]/15 selection:text-[#060911] flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        <ImpactPageClient />
      </main>

      <Footer />
    </div>
  );
}
