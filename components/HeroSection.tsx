"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MicroRnaCanvas3D } from "./MicroRnaCanvas3D";
import { ArrowRight, Sparkles, Orbit, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map initial scroll range (0 to 0.3) into local progress
    setScrollProgress(Math.min(latest * 3, 1));
  });

  return (
    <section className="relative w-full h-[95vh] min-h-[640px] flex flex-col justify-between bg-[#FBFBFD] text-black overflow-hidden pt-24 pb-8 px-6 sm:px-10 lg:px-14">
      {/* 3D MicroRNA Canvas is the CENTER OF ATTENTION in the Light Stage */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-95">
        <MicroRnaCanvas3D scrollProgress={scrollProgress} theme="light" />
      </div>

      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-100/30 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Floating Indicator (Ultrahuman style minimal HUD) */}
      <div className="relative z-10 w-full flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200/90 bg-white/80 backdrop-blur-md text-[11px] font-mono text-neutral-600 shadow-sm pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ENSAYO CLÍNICO ONCO-1 // DISPOSITIVO ACTIVO</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-500">
          <Orbit className="w-3.5 h-3.5 text-cyan-600 animate-spin-slow" />
          <span>HORQUILLA microARN 3D INTERACTIVA</span>
        </div>
      </div>

      {/* Lower Corner Content (Ultrahuman / Neuralink layout: Text & CTA in lower area, 3D visually dominant) */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-end justify-between gap-6 pb-2">
        {/* Lower Left: Luminous Gradient Headline & Quick CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-4 text-left"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-cyan-700 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-600" />
              SISTEMA DE DIAGNÓSTICO EN TIEMPO REAL
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-gradient-luminous leading-none">
              Detección Molecular.
            </h1>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 font-normal max-w-md leading-relaxed">
            Biomarcadores de microARN cuantificados en minutos mediante microfluidos de alta precisión y redes neuronales en chip.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <a
              href="#patient-kit"
              className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition-all duration-200 shadow-md flex items-center gap-2 group"
            >
              <span>Solicitar Kit Personal</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#microrna-3d"
              className="px-5 py-3 rounded-full text-xs font-semibold text-black border border-neutral-300 bg-white/80 hover:bg-white hover:border-black transition-all duration-200 shadow-sm"
            >
              Explorar Fases
            </a>
          </div>
        </motion.div>

        {/* Lower Right: Live Interactive Telemetry Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 text-xs font-mono text-neutral-500"
        >
          <div className="px-3.5 py-1.5 rounded-xl bg-white/80 border border-neutral-200/80 shadow-sm backdrop-blur-sm flex items-center gap-2">
            <span className="text-black font-bold">64 CANALES</span>
            <span className="text-neutral-400">|</span>
            <span className="text-cyan-700 font-medium">FLUJO 1.4 µL/min</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/80 border border-neutral-200/80 shadow-sm backdrop-blur-sm flex items-center gap-2">
            <span className="text-black font-bold">LATENCIA NPU</span>
            <span className="text-neutral-400">|</span>
            <span className="text-emerald-700 font-medium">&lt; 8.4 ms</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom scroll prompt */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-mono text-neutral-400 pointer-events-none">
        <span>DESLIZA PARA NAVEGAR</span>
        <ChevronDown className="w-3 h-3 animate-bounce" />
      </div>
    </section>
  );
}
