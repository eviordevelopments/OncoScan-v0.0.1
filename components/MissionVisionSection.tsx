"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function MissionVisionSection() {
  return (
    <section
      id="mission-vision"
      className="relative py-24 sm:py-36 px-6 sm:px-12 lg:px-20 bg-white text-black z-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Hairline Rule (Neuralink signature divider) */}
        <div className="w-full border-t border-neutral-200" />

        {/* Row 1: Misión — Heading Left, Text Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
        >
          {/* Left Column: Minimalist Light Sans Heading */}
          <div className="md:col-span-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-light tracking-[-0.03em] text-neutral-900 leading-[1.08]">
              Misión
            </h2>
          </div>

          {/* Right Column: Editorial Body Copy + Underlined Link */}
          <div className="md:col-span-7 md:pl-8 lg:pl-16 space-y-6">
            <p className="text-[15px] sm:text-base lg:text-[17px] text-neutral-800 font-normal leading-[1.65] tracking-[-0.01em]">
              Democratizar el acceso al cuidado de la salud mediante servicios de diagnóstico clínico inteligente que conectan el laboratorio con el hogar y la empresa; optimizando la prevención médica con un modelo predictivo, humano y accesible que genera valor para pacientes y aliados estratégicos.
            </p>

            <div>
              <a
                href="#patient-kit"
                className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-normal text-neutral-900 hover:text-black transition-colors"
              >
                <span className="border-b border-neutral-900 pb-0.5 group-hover:border-black">
                  Explorar modelo preventivo
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Middle Hairline Rule */}
        <div className="w-full border-t border-neutral-200" />

        {/* Row 2: Visión — Alternating Sides (Text Left, Heading Right as in neuralink.com/technology/) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
        >
          {/* Left Column on Desktop (Order 2 on mobile so heading still reads first on small screens): Editorial Body Copy */}
          <div className="order-2 md:order-1 md:col-span-7 md:pr-8 lg:pr-16 space-y-6">
            <p className="text-[15px] sm:text-base lg:text-[17px] text-neutral-800 font-normal leading-[1.65] tracking-[-0.01em]">
              Ser la plataforma global líder en diagnóstico inteligente descentralizado, logrando que la detección oncológica temprana y la medicina preventiva sean un estándar de salud accesible, confiable y presente en millones de hogares y empresas alrededor del mundo. Consolidarnos como el principal aliado tecnológico de personas, corporativos y aseguradoras a nivel internacional, transformando radicalmente el acceso a la salud con un sistema de diagnóstico predictivo que erradique las barreras de tiempo y distancia en la lucha contra el cáncer.
            </p>

            <div>
              <a
                href="#clinical-validation"
                className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-normal text-neutral-900 hover:text-black transition-colors"
              >
                <span className="border-b border-neutral-900 pb-0.5 group-hover:border-black">
                  Conocer validación clínica
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-black transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column on Desktop (Order 1 on mobile): Minimalist Light Sans Heading */}
          <div className="order-1 md:order-2 md:col-span-5 md:text-right">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-light tracking-[-0.03em] text-neutral-900 leading-[1.08]">
              Visión
            </h2>
          </div>
        </motion.div>

        {/* Bottom Hairline Rule */}
        <div className="w-full border-t border-neutral-200" />
      </div>
    </section>
  );
}

