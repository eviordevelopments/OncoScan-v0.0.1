"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { TextScrub } from "./TextScrub";

export function FreemiumKitFlow() {
  return (
    <section
      id="patient-kit"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFBFD] text-black rounded-t-[40px] sm:rounded-t-[64px] -mt-12 sm:-mt-20 z-20 shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-neutral-200"
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
          <span className="inline-block text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-600 uppercase">
            MODELO FREEMIUM A KIT FÍSICO
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-black">
            Tu salud, en tus manos.
          </h2>
          <div className="pt-2">
            <TextScrub
              text="Comienza con monitoreo digital gratuito y accede al diagnóstico molecular físico desde tu hogar."
              className="text-lg sm:text-2xl text-neutral-700 font-medium leading-relaxed"
              theme="light"
            />
          </div>
        </motion.div>

        {/* 4 Minimalist Steps - Roomier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { num: "01", title: "Portal Digital", desc: "Seguimiento gratuito de factores de riesgo." },
            { num: "02", title: "Kit a Domicilio", desc: "Cartuchos de microfluidos esterilizados." },
            { num: "03", title: "Gota Capilar", desc: "Muestra indolora de 20 µL en segundos." },
            { num: "04", title: "Firma Molecular", desc: "Resultado encriptado en 15 minutos." },
          ].map((st) => (
            <motion.div
              key={st.num}
              whileHover={{ y: -3 }}
              className="p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <span className="text-xs sm:text-sm font-mono font-extrabold text-neutral-400 block mb-3">
                {st.num} // PASO
              </span>
              <h3 className="text-lg font-extrabold text-black mb-1.5">{st.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{st.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dual Conversion Cards (Apple / Ultrahuman style clean cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: B2C Kit Personal */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 sm:p-12 rounded-[32px] bg-white border border-neutral-300 shadow-[0_16px_40px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:border-black transition-all duration-300"
          >
            <div>
              <span className="text-xs font-mono font-bold text-neutral-500 tracking-wider uppercase block mb-3">
                PACIENTES // B2C
              </span>
              <h3 className="text-3xl font-extrabold text-black mb-2">Kit OncoScan Personal</h3>
              <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                Monitoreo molecular preventivo para pacientes y familias.
              </p>
              <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-800 font-mono mb-10">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-black shrink-0" /> 2 Cartuchos de microfluidos Gen-1
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-black shrink-0" /> Lector perimetral USB-C / BLE
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-black shrink-0" /> Reporte transcriptómico cifrado
                </li>
              </ul>
            </div>
            <button className="w-full py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <span>Ordenar Kit Personal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 2: B2B Hospitales */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 sm:p-12 rounded-[32px] bg-[#F5F6F8] border border-neutral-200 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-black transition-all duration-300"
          >
            <div>
              <span className="text-xs font-mono font-bold text-neutral-500 tracking-wider uppercase block mb-3">
                HOSPITALES &amp; INVERSIÓN // B2B
              </span>
              <h3 className="text-3xl font-extrabold text-black mb-2">Unidad Hospitalaria</h3>
              <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
                Despliegue institucional para centros oncológicos y ensayos.
              </p>
              <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-800 font-mono mb-10">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-600 shrink-0" /> Suministro institucional continuo
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-600 shrink-0" /> Integración con HL7 / FHIR
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-600 shrink-0" /> Acceso al Data Room técnico
                </li>
              </ul>
            </div>
            <button className="w-full py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide text-black border border-neutral-300 bg-white hover:border-black transition-colors flex items-center justify-center gap-2">
              <span>Contactar Unidad B2B</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
