import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "OncoScan — Detección Molecular de Cáncer & Microfluidos Edge AI",
  description:
    "Diagnóstico molecular temprano en tiempo real. Fusión de cartuchos microfluídicos, perfiles de microARN circulante e inferencia de Inteligencia Artificial perimetral en 8.4 ms.",
  keywords: [
    "OncoScan",
    "detección temprana cáncer",
    "microfluidos",
    "microARN",
    "biomarcadores",
    "Edge AI",
    "DeepTech",
    "biotecnología médica",
  ],
  authors: [{ name: "OncoScan Biomedical Systems" }],
  openGraph: {
    title: "OncoScan — Detección Molecular en Tiempo Real",
    description:
      "Plataforma de diagnóstico no invasivo mediante microfluidos y redes neuronales en chip.",
    url: "https://oncoscan.bio",
    siteName: "OncoScan",
    locale: "es_MX",
    type: "website",
  },
  alternates: {
    canonical: "https://oncoscan.bio",
    languages: {
      "es-MX": "https://oncoscan.bio/es",
      "en-US": "https://oncoscan.bio/en",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "name": "OncoScan Biomedical Systems",
        "url": "https://oncoscan.bio",
        "logo": "https://oncoscan.bio/logo.png",
        "medicalSpecialty": "Oncology",
      },
      {
        "@type": "MedicalDevice",
        "name": "OncoScan Gen-1 Cartridge & Edge Reader",
        "purpose": "Early cancer detection through circulating microRNA panels and on-device spectrometry.",
        "category": "In Vitro Diagnostic Device",
      },
    ],
  };

  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body className="font-sans bg-[#FBFBFD] text-black antialiased selection:bg-cyan-500/20 selection:text-black">
        {children}
      </body>
    </html>
  );
}
