"use client";

import { motion } from "framer-motion";
import { TextScrub } from "./TextScrub";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function ClinicalValidation() {
  const stats = [
    {
      metric: "0.984",
      label: "AUC - ROC",
      caption: "Detección temprana en Estadios I y II.",
    },
    {
      metric: "98.7%",
      label: "Sensibilidad Analítica",
      caption: "Identificación de microARN libre en plasma.",
    },
    {
      metric: "99.2%",
      label: "Especificidad Clínica",
      caption: "Control estricto frente a falsos positivos.",
    },
    {
      metric: "< 15 min",
      label: "Tiempo a Resultado",
      caption: "Diagnóstico en el punto de atención médica.",
    },
  ];

  return (
    <section
      id="clinical-validation"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F5F7] text-black rounded-t-[48px] sm:rounded-t-[64px] z-20 shadow-[0_-35px_90px_rgba(0,0,0,0.65)] border-t border-neutral-300/80"
    >
      <div className="max-w-6xl mx-auto">
        {/* Ultrahuman Light Mode Section Header - Firmly pegged to the LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 space-y-5 text-left"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-600 uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            EVIDENCIA CLÍNICA // PROTOCOLO ONCO-1
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-black leading-tight text-left">
            Cada lectura, respaldada por evidencia.
          </h2>
          <div className="pt-2 text-left">
            <TextScrub
              text="Validado rigurosamente en estudios multicéntricos bajo estándares internacionales de diagnóstico molecular."
              className="text-lg sm:text-2xl text-neutral-700 font-medium leading-relaxed text-left"
              theme="light"
            />
          </div>
        </motion.div>

        {/* Clean Light-Themed Cards with Staggered Entrance and Larger Scale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-3xl border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between text-left"
            >
              <div>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black block mb-2 font-mono">
                  {s.metric}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-neutral-700 tracking-wide block mb-3">
                  {s.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 border-t border-neutral-100 pt-4 leading-relaxed text-left">
                {s.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Minimal Institutional Certification Pill */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-neutral-200 gap-4 text-xs sm:text-sm font-mono text-neutral-600">
          <span className="font-semibold">COMPLIANCE: ISO 13485 // CE-IVD TRACK // HIPAA</span>
          <a
            href="#patient-kit"
            className="inline-flex items-center gap-1.5 font-bold text-black hover:text-cyan-700 transition-colors"
          >
            <span>Ver Publicaciones Científicas</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
