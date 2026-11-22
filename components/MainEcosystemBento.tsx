"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Droplets, Activity, Home, Cpu, Check, Sparkles } from "lucide-react";

export function MainEcosystemBento() {
  return (
    <section
      id="ecosistema"
      className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14 bg-[#F2F3F5] text-black"
    >
      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Ultrahuman MX Style Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#1832C7] uppercase block">
              HARDWARE &amp; BIO-PLATAFORMAS
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-black leading-[0.96]">
              Diseñado para decodificar cada capa de tu fisiología.
            </h2>
          </div>
          <Link
            href="/oncoscan"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold transition-all self-start md:self-auto"
          >
            <span>Ver Subpágina de OncoScan</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1. FLAGSHIP SHOWCASE BANNER: ONCOSCAN GEN-1 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[40px] bg-white border border-neutral-200/90 p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#1832C7]">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>PRODUCTO INSIGNIA // DETECCIÓN ONCOLÓGICA</span>
              </div>

              <h3 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-black leading-none">
                OncoScan™ Gen-1
              </h3>

              <p className="text-lg sm:text-2xl text-neutral-700 font-medium leading-snug max-w-xl">
                El primer laboratorio molecular de bolsillo que cuantifica firmas de microARN circulante en 15 minutos sin PCR térmica.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-neutral-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1832C7] shrink-0" />
                  <span>64 microcanales en polímero COC</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1832C7] shrink-0" />
                  <span>Resonadores fotónicos a 1550 nm</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1832C7] shrink-0" />
                  <span>Inferencia Edge AI en 8.4 ms</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#1832C7] shrink-0" />
                  <span>Muestra capilar indolora de 20 µL</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/oncoscan"
                  className="px-7 py-4 rounded-full bg-[#1832C7] hover:bg-[#13279E] text-white text-sm font-bold transition-all shadow-md inline-flex items-center gap-2 group"
                >
                  <span>Explorar Experiencia 3D OncoScan</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/oncoscan#patient-kit"
                  className="px-6 py-4 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black text-sm font-bold transition-all"
                >
                  Solicitar Kit Personal
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-sm rounded-[32px] bg-[#F7F8FA] border border-neutral-200 p-8 flex flex-col items-center text-center">
                <Image
                  src="/oncoscan.png"
                  alt="OncoScan Gen-1"
                  width={180}
                  height={180}
                  className="w-36 h-36 object-contain mb-6"
                  unoptimized
                />
                <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  PROTOCOLO CLÍNICO ONCO-1
                </span>
                <span className="text-3xl font-mono font-extrabold text-black mt-1">
                  0.984 AUC-ROC
                </span>
                <p className="text-xs text-neutral-500 mt-2">
                  Precisión validada en estadios tempranos I y II.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. ULTRAHUMAN-STYLE MULTI-PRODUCT GRID (Blood Vision, M1 Metabólico, Home) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card A: Blood Vision */}
          <motion.div
            id="blood-vision"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[36px] bg-[#10131A] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl border border-black/10"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold">
                  BLOOD VISION™
                </span>
                <Droplets className="w-6 h-6 text-red-400" />
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight">
                Más de 100 biomarcadores sanguíneos decodificados.
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed">
                Paneles preventivos de longevidad, inflamación sistémica, perfil hormonal y riesgo cardiovascular correlacionados con tus lecturas moleculares de OncoScan.
              </p>

              {/* Mini Biomarker Pills */}
              <div className="pt-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                  <span className="text-neutral-300">ApoB / Lipoproteína(a)</span>
                  <span className="text-[#75E65E] font-bold">ÓPTIMO</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                  <span className="text-neutral-300">hs-CRP Inflamación</span>
                  <span className="text-cyan-400 font-bold">0.4 mg/L</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.05] border border-white/10">
                  <span className="text-neutral-300">Panel miR-21 / miR-155</span>
                  <span className="text-[#75E65E] font-bold">NORMAL</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">TOMA A DOMICILIO</span>
              <Link
                href="/oncoscan#biomarkers"
                className="text-xs font-bold text-white hover:text-[#75E65E] inline-flex items-center gap-1 transition-colors"
              >
                <span>Ver Paneles</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card B: M1 Metabólico */}
          <motion.div
            id="m1-metabolic"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[36px] bg-white text-black p-8 sm:p-10 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-neutral-200/90"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1832C7] text-xs font-mono font-bold">
                  NEURALHACK M1™
                </span>
                <Activity className="w-6 h-6 text-[#1832C7]" />
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight">
                Metabolismo y glucosa en tiempo real.
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Sensores biosintéticos continuos que mapean tu respuesta glucémica al estrés, el sueño y la nutrición para optimizar tu flexibilidad metabólica celular.
              </p>

              {/* Simulated Metabolic Curve Box */}
              <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">SCORE METABÓLICO</span>
                  <span className="text-black font-extrabold">92 / 100</span>
                </div>
                <svg className="w-full h-16" viewBox="0 0 240 60" fill="none">
                  <path
                    d="M 5 45 Q 45 40, 75 20 T 145 35 T 235 18"
                    stroke="#1832C7"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="75" cy="20" r="4" fill="#1832C7" />
                  <circle cx="235" cy="18" r="4" fill="#10B981" />
                </svg>
                <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>ESTABILIDAD GLUCÉMICA</span>
                  <span className="text-emerald-600 font-bold">+14% ESTA SEMANA</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">SENSOR CGM 14 DÍAS</span>
              <Link
                href="/oncoscan"
                className="text-xs font-bold text-[#1832C7] hover:text-black inline-flex items-center gap-1 transition-colors"
              >
                <span>Explorar Sensor</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card C: NeuralHack Home */}
          <motion.div
            id="neuralhack-home"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[36px] bg-white text-black p-8 sm:p-10 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-neutral-200/90"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold">
                  NEURALHACK HOME™
                </span>
                <Home className="w-6 h-6 text-emerald-600" />
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight">
                El monitor ambiental más avanzado para tu descanso.
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Arquitectura minimalista en aluminio anodizado que mide CO₂, partículas PM2.5, espectro lumínico circadiano y ruido acústico mientras duermes.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px]">NIVEL CO₂</span>
                  <span className="text-base font-extrabold text-black">420 ppm</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px]">PARTÍCULAS PM2.5</span>
                  <span className="text-base font-extrabold text-emerald-600">3 µg/m³</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px]">LUZ CIRCADIANA</span>
                  <span className="text-base font-extrabold text-black">2700 K</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px]">EMISIONES RF</span>
                  <span className="text-base font-extrabold text-blue-600">MODO AVIÓN</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">CERO PANTALLAS</span>
              <Link
                href="/oncoscan"
                className="text-xs font-bold text-black hover:text-emerald-700 inline-flex items-center gap-1 transition-colors"
              >
                <span>Conocer Más</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
