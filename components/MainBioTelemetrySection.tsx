"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Dna, HeartPulse, Sun, ShieldAlert, Cpu, Layers } from "lucide-react";

export function MainBioTelemetrySection() {
  const powerPlugs = [
    {
      title: "Tamizaje microARN (OncoScan)",
      category: "ONCOLOGÍA PREVENTIVA",
      desc: "Algoritmo que cruza miR-21, miR-155 y miR-34a con tu historial clínico basal.",
      badge: "ACTIVO EN APP",
      icon: <Dna className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Alineación Circadiana",
      category: "CRONOBIOLOGÍA",
      desc: "Optimiza tus ventanas de exposición solar y síntesis de melatonina endógena.",
      badge: "INCLUIDO",
      icon: <Sun className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "Adaptabilidad Cardiovascular",
      category: "LONGEVIDAD",
      desc: "Monitoreo continuo de VFC, recuperación autonómica y VO2 máx estimado.",
      badge: "INCLUIDO",
      icon: <HeartPulse className="w-5 h-5 text-red-400" />,
    },
    {
      title: "Alerta de Inflamación Celular",
      category: "INMUNOLOGÍA",
      desc: "Detección temprana de desviaciones térmicas y biomarcadores exosomales.",
      badge: "CLÍNICO",
      icon: <ShieldAlert className="w-5 h-5 text-[#75E65E]" />,
    },
    {
      title: "Inferencia Local AES-256",
      category: "PRIVACIDAD SOBERANA",
      desc: "Tus datos genómicos se procesan en el NPU del dispositivo sin subir a la nube.",
      badge: "HARDWARE",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "Sincronización FHIR Hospitalaria",
      category: "INTEROPERABILIDAD",
      desc: "Exporta reportes moleculares certificados directamente a tu médico u oncólogo.",
      badge: "PROTOCOLO ONCO-1",
      icon: <Layers className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <section
      id="powerplugs"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14 bg-[#07090E] text-white rounded-t-[44px] sm:rounded-t-[64px]"
    >
      <div className="max-w-[1400px] mx-auto space-y-20">
        {/* Ultrahuman PowerPlugs Style Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#75E65E] uppercase block">
            POWERPLUGS™ &amp; INTELIGENCIA PERIMETRAL
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[0.96]">
            Aplicaciones clínicas modulares sobre tu propia biología.
          </h2>
          <p className="text-base sm:text-xl text-neutral-400 leading-relaxed pt-2">
            Personaliza tu plataforma NeuralHack activando módulos de diagnóstico molecular, cronobiología y prevención oncológica en tiempo real.
          </p>
        </div>

        {/* 6 PowerPlugs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {powerPlugs.map((plug, idx) => (
            <motion.div
              key={plug.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="p-7 rounded-[28px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10">
                    {plug.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono font-bold text-neutral-300">
                    {plug.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    {plug.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {plug.title}
                  </h3>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {plug.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Leading to the Dedicated OncoScan Subpage */}
        <div className="rounded-[40px] bg-gradient-to-r from-[#1832C7] via-[#1E3A8A] to-[#0F172A] p-8 sm:p-12 lg:p-16 border border-white/15 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-mono font-bold text-white uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#75E65E]" />
              <span>SUBPÁGINA DEDICADA // ONCOSCAN GEN-1</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explora la ingeniería detrás de OncoScan.
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Ingresa a la página exclusiva de OncoScan para interactuar con la molécula microARN en 3D, inspeccionar el cartucho microfluídico de 64 canales y revisar la validación clínica ONCO-1.
            </p>
          </div>

          <Link
            href="/oncoscan"
            className="px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-100 text-sm sm:text-base font-extrabold transition-all shadow-xl inline-flex items-center gap-2.5 shrink-0 group"
          >
            <span>Abrir Página de OncoScan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
