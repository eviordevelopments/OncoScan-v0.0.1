"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { MicroRnaCanvas3D } from "./MicroRnaCanvas3D";
import { Orbit, Sparkles } from "lucide-react";

export function MicroRnaExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Bidirectional opacity & translate for the 4 chapters:
  const ch1Opacity = useTransform(scrollYProgress, [0.03, 0.12, 0.22, 0.27], [0, 1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0.03, 0.12, 0.22, 0.27], [30, 0, 0, -30]);

  const ch2Opacity = useTransform(scrollYProgress, [0.28, 0.38, 0.48, 0.53], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.28, 0.38, 0.48, 0.53], [30, 0, 0, -30]);

  const ch3Opacity = useTransform(scrollYProgress, [0.54, 0.64, 0.74, 0.79], [0, 1, 1, 0]);
  const ch3Y = useTransform(scrollYProgress, [0.54, 0.64, 0.74, 0.79], [30, 0, 0, -30]);

  const ch4Opacity = useTransform(scrollYProgress, [0.80, 0.88, 0.96, 1.0], [0, 1, 1, 0.8]);
  const ch4Y = useTransform(scrollYProgress, [0.80, 0.88, 0.96, 1.0], [30, 0, 0, 0]);

  const chapters = [
    {
      opacity: ch1Opacity,
      y: ch1Y,
      tag: "01 // ESTRUCTURA",
      headline: "La Clave Transcriptómica.",
      copy: "19 a 25 nucleótidos en plasma que delatan anomalías celulares mucho antes de un tumor sólido.",
    },
    {
      opacity: ch2Opacity,
      y: ch2Y,
      tag: "02 // MICROFLUIDOS",
      headline: "Separación Celular Pura.",
      copy: "Flujo laminar pasivo en 64 microcanales que aíslan exosomas sin requerir centrifugación.",
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
      ref={containerRef}
      className="relative h-[340vh] bg-gradient-to-b from-[#FBFBFD] via-[#F3F4F6] to-[#FAFBFD] text-black border-t border-neutral-200"
    >
      {/* Sticky 3D Viewport on Light Surface */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Full 3D Particle Point-Cloud Canvas in Light Mode */}
        <div className="absolute inset-0 z-0 opacity-95">
          <MicroRnaCanvas3D scrollProgress={scrollProgress} theme="light" />
        </div>

        {/* Ambient light glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-100/40 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Minimalist Telemetry Bar */}
        <div className="absolute top-24 left-6 right-6 max-w-6xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-500 z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <Orbit className="w-3.5 h-3.5 text-cyan-600 animate-spin-slow" />
            <span className="text-black font-semibold">HORQUILLA microARN 3D</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-700 font-bold">
            <span>TRAYECTORIA {(scrollProgress * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Narrative Chapters (Bidirectional Scrub in Light Mode) */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pointer-events-none">
          {chapters.map((ch, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: ch.opacity, y: ch.y }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 space-y-4 px-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 bg-white/80 backdrop-blur-md text-xs font-mono text-cyan-800 font-semibold shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-600" />
                {ch.tag}
              </span>
              <h3 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-black">
                {ch.headline}
              </h3>
              <p className="text-base sm:text-lg text-neutral-600 max-w-lg mx-auto font-normal leading-relaxed">
                {ch.copy}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom subtle indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] font-mono text-neutral-400 z-10 pointer-events-none">
          DESLIZA PARA NAVEGAR BIDIRECCIONALMENTE // 60 FPS
        </div>
      </div>
    </section>
  );
}
