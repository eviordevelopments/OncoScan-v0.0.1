"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Dna, CheckCircle2, HeartHandshake } from "lucide-react";

export function ClinicalTrialHero() {
  const pillars = [
    {
      tag: "MODALIDAD 01",
      title: "Participación Voluntaria",
      desc: "Integración libre y autónoma sin ningún tipo de coacción clínica.",
      icon: <HeartHandshake className="w-4 h-4 text-blue-400" />,
    },
    {
      tag: "MODALIDAD 02",
      title: "100% Gratuita (Sin Costo)",
      desc: "Evaluación diagnóstica y procesamiento molecular sin gravamen para el paciente.",
      icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" />,
    },
    {
      tag: "MODALIDAD 03",
      title: "Pre-registro de Cohorte",
      desc: "Lista de espera controlada para grupos de estudio y control por tipología.",
      icon: <Dna className="w-4 h-4 text-red-400" />,
    },
    {
      tag: "MARCO BIOÉTICO",
      title: "Declaración de Helsinki",
      desc: "Sujeto a dictamen de Comité de Ética en Investigación (CEI) y Consentimiento Informado.",
      icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#F2F3F5] text-black overflow-hidden flex flex-col justify-between pt-28 pb-8 px-4 sm:px-8 lg:px-14">
      {/* Ultrahuman MX Style Full-Bleed Architectural Hero Card with Real Clinical Photography */}
      <div className="relative flex-1 w-full max-w-[1400px] mx-auto rounded-[36px] sm:rounded-[48px] bg-[#07090E] text-white overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.22)] border border-black/10 flex flex-col justify-end p-6 sm:p-12 lg:p-16 min-h-[82vh]">
        
        {/* Background Clinical Procedure Photograph with Subtle Slow Zoom Animation */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/clinical-procedure.jpg"
            alt="Procedimiento clínico de toma de muestra sanguínea"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Clean Editorial Gradient Scrims so text on left and cards at bottom are crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060911]/95 via-[#060911]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/35 to-transparent" />
        </motion.div>

        {/* Main Clean Hero Content: Only Heading, Simple Description & CTAs */}
        <div className="relative z-10 my-auto py-12 max-w-2xl space-y-6 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[0.96] text-white"
          >
            Estudio Clínico{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#3B82F6] to-[#EF4444] bg-clip-text text-transparent">
              OncoScan ONCO-1.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg lg:text-xl text-neutral-200 max-w-xl leading-relaxed font-normal"
          >
            Participa de forma voluntaria y sin costo en nuestro estudio clínico de detección temprana a partir de una muestra rutinaria de sangre, realizada por profesionales de la salud bajo estrictos estándares éticos y médicos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#formulario-registro"
              className="px-7 py-4 rounded-full bg-[#1832C7] hover:bg-[#0052FF] text-white text-sm sm:text-base font-bold transition-all shadow-[0_10px_35px_rgba(24,50,199,0.5)] flex items-center gap-2.5 group"
            >
              <span>Iniciar Pre-registro</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#marco-normativo"
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-sm sm:text-base font-semibold transition-all"
            >
              Conocer el Procedimiento
            </a>
          </motion.div>
        </div>

        {/* Bottom 4-Pillar Dock (Preserved exactly as requested) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-white/15">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="p-4 sm:p-5 rounded-2xl bg-black/55 hover:bg-black/70 backdrop-blur-xl border border-white/15 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-300 uppercase">
                  {item.tag}
                </span>
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
