"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextScrub } from "./TextScrub";

export function MicrofluidicShowcase() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const modules = [
    {
      step: "01",
      name: "Cartucho COC",
      tagline: "64 microcanales capilares.",
      telemetry: "Flujo pasivo a 1.4 µL/min.",
    },
    {
      step: "02",
      name: "Sensor Fotónico",
      tagline: "Guías de onda a 1550 nm.",
      telemetry: "Detección óptica sin PCR.",
    },
    {
      step: "03",
      name: "Acelerador Edge AI",
      tagline: "Inferencia local en chip.",
      telemetry: "Latencia menor a 8.4 ms.",
    },
  ];

  return (
    <section
      id="microfluidics"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] text-black rounded-t-[40px] sm:rounded-t-[64px] -mt-12 sm:-mt-20 z-20 shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-neutral-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header - Scaled up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 space-y-5"
        >
          <span className="text-xs sm:text-sm font-mono tracking-widest text-neutral-600 uppercase font-bold">
            ARQUITECTURA DE HARDWARE
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-black">
            Ingeniería de Escala Celular.
          </h2>
          <div className="pt-2">
            <TextScrub
              text="Un laboratorio oncológico completo compactado en una cámara reactiva milimétrica."
              className="text-lg sm:text-2xl text-neutral-700 font-medium leading-relaxed"
              theme="light"
            />
          </div>
        </motion.div>

        {/* 3-Part Teardown Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {modules.map((mod, i) => {
            const active = activeTab === i;
            return (
              <motion.div
                key={mod.step}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveTab(i)}
                className={`cursor-pointer p-7 rounded-3xl border transition-all duration-200 ${
                  active
                    ? "bg-white border-black shadow-[0_16px_35px_rgba(0,0,0,0.08)]"
                    : "bg-white/60 border-neutral-200/90 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono">
                  <span className={active ? "text-black font-extrabold" : "text-neutral-500 font-semibold"}>
                    {mod.step} // ETAPA
                  </span>
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />}
                </div>
                <h3 className="text-xl font-extrabold text-black mb-1.5">{mod.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mb-5">{mod.tagline}</p>
                <div className="text-xs font-mono font-medium text-neutral-500 border-t border-neutral-100 pt-3">
                  {mod.telemetry}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Schematic Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-neutral-200 bg-white shadow-[0_16px_45px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-neutral-600 border-b border-neutral-100 pb-4 mb-6">
            <span className="font-semibold">CANALES ACTIVOS: 64/64</span>
            <span className="text-black font-bold">DIAGNÓSTICO EN TIEMPO REAL</span>
          </div>

          <div className="relative w-full h-48 sm:h-64 flex items-center justify-center">
            <svg className="w-full h-full max-w-2xl" viewBox="0 0 600 200" fill="none">
              <rect x="10" y="10" width="580" height="180" rx="18" stroke="#E5E7EB" strokeWidth="1.5" />
              <path d="M 40 100 L 160 100 L 240 50 L 360 50 L 440 100 L 560 100" stroke="#00C2D1" strokeWidth="3" className="animate-flow" />
              <path d="M 160 100 L 240 150 L 360 150 L 440 100" stroke="#10B981" strokeWidth="3" className="animate-flow" />
              <circle cx="300" cy="50" r="16" fill="#FFFFFF" stroke="#00C2D1" strokeWidth="3" />
              <circle cx="300" cy="50" r="6" fill="#00C2D1" />
              <circle cx="300" cy="150" r="16" fill="#FFFFFF" stroke="#10B981" strokeWidth="3" />
              <circle cx="300" cy="150" r="6" fill="#10B981" />
              <text x="328" y="56" fill="#1F2937" fontSize="13" fontFamily="monospace" fontWeight="700">miR-21 (fM)</text>
              <text x="328" y="156" fill="#1F2937" fontSize="13" fontFamily="monospace" fontWeight="700">miR-34a (fM)</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
