"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { MicroRnaCanvas3D } from "./MicroRnaCanvas3D";
import { ArrowRight, Sparkles, Orbit, ChevronDown } from "lucide-react";

export function UnifiedHeroExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Stage 0: Initial Hero lower-left content fades out as user begins scroll (0.0 to 0.12)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -35]);

  // Stage 1 to 4: Narrative chapters pinned firmly to the LEFT with bidirectional scrub
  const ch1Opacity = useTransform(scrollYProgress, [0.15, 0.24, 0.34, 0.42], [0, 1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0.15, 0.24, 0.34, 0.42], [30, 0, 0, -30]);

  const ch2Opacity = useTransform(scrollYProgress, [0.42, 0.50, 0.58, 0.65], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.42, 0.50, 0.58, 0.65], [30, 0, 0, -30]);

  const ch3Opacity = useTransform(scrollYProgress, [0.65, 0.72, 0.80, 0.87], [0, 1, 1, 0]);
  const ch3Y = useTransform(scrollYProgress, [0.65, 0.72, 0.80, 0.87], [30, 0, 0, -30]);

  const ch4Opacity = useTransform(scrollYProgress, [0.87, 0.93, 0.98, 1.0], [0, 1, 1, 0.9]);
  const ch4Y = useTransform(scrollYProgress, [0.87, 0.93, 0.98, 1.0], [30, 0, 0, 0]);

  const chapters = [
    {
      opacity: ch1Opacity,
      y: ch1Y,
      tag: "01 // ESTRUCTURA MOLECULAR",
      headline: "La Clave Transcriptómica.",
      copy: "19 a 25 nucleótidos que delatan anomalías celulares mucho antes de un tumor sólido.",
    },
    {
      opacity: ch2Opacity,
      y: ch2Y,
      tag: "02 // MICROFLUIDOS",
      headline: "Separación Celular Pura.",
      copy: "Flujo laminar pasivo en 64 microcanales que aíslan exosomas sin centrifugación.",
    },
    {
      opacity: ch3Opacity,
      y: ch3Y,
      tag: "03 // DETECCIÓN ÓPTICA",
      headline: "Hibridación en Attomoles.",
      copy: "Resonadores fotónicos que miden el enlace molecular complementario en tiempo real.",
    },
    {
      opacity: ch4Opacity,
      y: ch4Y,
      tag: "04 // EDGE AI",
      headline: "Diagnóstico en 8.4 ms.",
      copy: "Inferencia neuromórfica en chip. Privacidad biomédica total sin conexión a la nube.",
    },
  ];

  return (
    <section
      id="hero-experience"
      ref={containerRef}
      className="relative h-[340vh] bg-gradient-to-b from-[#FBFBFD] via-[#F4F5F7] to-[#FAFBFD] text-black"
    >
      {/* Sticky Fullscreen 3D Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 sm:px-12 lg:px-20">
        {/* 
          1. The 3D MicroRNA Canvas:
          - Positioned firmly on the RIGHT side of the page (centerX = width * 0.70)
          - Brilliant Red & Blue structure points
        */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-95">
          <MicroRnaCanvas3D scrollProgress={scrollProgress} theme="light" />
        </div>

        {/* Ambient subtle light glow behind 3D render */}
        <div className="absolute top-[56%] left-[66%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] bg-blue-100/35 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Top Minimal Status Indicator */}
        <div className="absolute top-24 sm:top-28 left-6 sm:left-12 lg:left-16 xl:left-20 right-6 sm:right-12 lg:right-16 xl:right-20 flex items-center justify-end text-xs sm:text-sm font-mono text-neutral-500 z-10 pointer-events-none">
          <div className="hidden sm:flex items-center gap-2 font-semibold text-blue-700">
            <Orbit className="w-4 h-4 text-blue-600 animate-spin-slow" />
            <span>FIBRA microARN 3D {(scrollProgress * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* 
          2. STAGE 0: INITIAL HERO CONTENT
          - ANCHORED FIRMLY IN THE LOWER-LEFT CORNER (Esquina inferior izquierda)
          - Red and Blue luminous heading gradient
          - CTA button & Latency badges fully visible with comfortable margins
        */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 bottom-10 sm:bottom-12 lg:bottom-16 z-10 max-w-lg lg:max-w-xl text-left pointer-events-auto space-y-4 sm:space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold tracking-wider text-blue-700 uppercase">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>SISTEMA DE DIAGNÓSTICO EN TIEMPO REAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-gradient-luminous leading-[0.94] text-left">
            Detección Molecular.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-700 font-medium leading-relaxed max-w-md text-left">
            Biomarcadores de microARN cuantificados en minutos mediante microfluidos y redes neuronales en chip.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <a
              href="#patient-kit"
              className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-black hover:bg-neutral-800 transition-all duration-200 shadow-lg flex items-center gap-2 group"
            >
              <span>Solicitar Kit Personal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* 
          3. STAGE 1 to 4: NARRATIVE CHAPTERS
          - FIRMLY PINNED TO THE LEFT SIDE
          - 3D render is on the RIGHT side: ZERO overlap!
          - High-transparency Ultrahuman glassmorphic cards
        */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          {chapters.map((ch, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: ch.opacity, y: ch.y }}
              className="absolute left-6 sm:left-12 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg pointer-events-auto"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_16px_40px_rgba(0,0,0,0.05)] space-y-4 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 bg-white/80 text-xs font-mono text-blue-700 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  {ch.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-neutral-900 leading-[1.1]">
                  {ch.headline}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-neutral-600 font-medium leading-relaxed">
                  {ch.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom subtle indicator */}
        <div className="absolute bottom-3 left-6 sm:left-12 lg:left-16 xl:left-20 text-[11px] font-mono font-medium text-neutral-400 pointer-events-none flex items-center gap-1.5">
          <span>DESLIZA PARA NAVEGAR LA EXPERIENCIA CONTINUA</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
