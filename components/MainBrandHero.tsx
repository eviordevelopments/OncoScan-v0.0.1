"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Activity, Droplets, Home, Cpu, Sparkles } from "lucide-react";

export function MainBrandHero() {
  const quickProducts = [
    {
      name: "OncoScan Gen-1",
      tag: "NUEVO // BIOSENSOR",
      desc: "Detección molecular de microARN en 15 min",
      href: "/oncoscan",
      highlight: true,
      icon: <Sparkles className="w-4 h-4 text-[#75E65E]" />,
    },
    {
      name: "Blood Vision",
      tag: "100+ BIOMARCADORES",
      desc: "Paneles preventivos de longevidad en sangre",
      href: "#blood-vision",
      highlight: false,
      icon: <Droplets className="w-4 h-4 text-red-500" />,
    },
    {
      name: "M1 Metabólico",
      tag: "GLUCOSA CONTINUA",
      desc: "Monitoreo metabólico CGM en tiempo real",
      href: "#m1-metabolic",
      highlight: false,
      icon: <Activity className="w-4 h-4 text-blue-600" />,
    },
    {
      name: "NeuralHack Home",
      tag: "AMBIENTE & SUEÑO",
      desc: "Salud ambiental del hogar sin pantallas",
      href: "#neuralhack-home",
      highlight: false,
      icon: <Home className="w-4 h-4 text-emerald-600" />,
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#F2F3F5] text-black overflow-hidden flex flex-col justify-between pt-28 pb-8 px-4 sm:px-8 lg:px-14">
      {/* Ultrahuman MX Style Full-Bleed Architectural Background Card */}
      <div className="relative flex-1 w-full max-w-[1400px] mx-auto rounded-[36px] sm:rounded-[48px] bg-[#07090E] text-white overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-black/10 flex flex-col justify-between p-6 sm:p-12 lg:p-16 min-h-[78vh]">
        
        {/* Ambient Studio Spotlight (Ultrahuman Titanium / Bio Glow) */}
        <div className="absolute -top-24 right-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#1832C7]/35 via-cyan-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-red-500/20 via-purple-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* Top Bar inside Hero Stage */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono tracking-wider uppercase text-white">
            <span className="w-2 h-2 rounded-full bg-[#75E65E] animate-pulse" />
            <span>NEURALHACK MÉXICO // PLATAFORMA DE LONGEVIDAD</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span>ENVÍOS A TODO MÉXICO</span>
            <span>•</span>
            <span className="text-[#75E65E]">SIN SUSCRIPCIÓN MENSUAL</span>
          </div>
        </div>

        {/* Center Visual & Heroic Statement */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-[#75E65E] uppercase block">
              EL ECOSISTEMA DE BIO-TELEMETRÍA MÁS AVANZADO DEL MUNDO
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-[74px] font-extrabold tracking-[-0.04em] leading-[0.94] text-white">
              Monitorea tu biología.{" "}
              <span className="text-neutral-400 font-light block sm:inline">
                Extiende tu longevidad.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal">
              Unificamos diagnósticos moleculares de microARN, marcadores sanguíneos preventivos, glucosa continua y salud ambiental en una sola arquitectura clínica.
            </p>

            {/* Primary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/oncoscan"
                className="px-7 py-4 rounded-full bg-[#1832C7] hover:bg-[#13279E] text-white text-sm sm:text-base font-bold transition-all shadow-[0_10px_35px_rgba(24,50,199,0.5)] flex items-center gap-2.5 group"
              >
                <span>Conocer OncoScan Gen-1</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#ecosistema"
                className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md text-sm sm:text-base font-semibold transition-all"
              >
                Explorar Productos
              </a>
            </div>
          </motion.div>

          {/* Right Side: Ultrahuman-style Hardware Showcase Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <Link
              href="/oncoscan"
              className="group relative w-full max-w-md rounded-[32px] bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-white/35 backdrop-blur-2xl p-7 sm:p-8 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-mono text-[#75E65E] font-bold uppercase tracking-wider block">
                    LANZAMIENTO DESTACADO
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-0.5">
                    OncoScan™ Gen-1
                  </h2>
                </div>
                <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>

              <div className="relative h-44 w-full flex items-center justify-center my-2">
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/30 to-red-500/30 blur-2xl" />
                <Image
                  src="/oncoscan.png"
                  alt="OncoScan Biosensor"
                  width={150}
                  height={150}
                  className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                Biosensor perimetral de microfluidos para detección temprana de cáncer mediante perfiles de microARN en 8.4 ms.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono">
                <div className="bg-black/40 rounded-xl p-2">
                  <span className="text-xs sm:text-sm font-bold text-white block">64 ch</span>
                  <span className="text-[10px] text-neutral-400">Microfluidos</span>
                </div>
                <div className="bg-black/40 rounded-xl p-2">
                  <span className="text-xs sm:text-sm font-bold text-[#75E65E] block">98.7%</span>
                  <span className="text-[10px] text-neutral-400">Sensibilidad</span>
                </div>
                <div className="bg-black/40 rounded-xl p-2">
                  <span className="text-xs sm:text-sm font-bold text-cyan-400 block">8.4 ms</span>
                  <span className="text-[10px] text-neutral-400">Edge NPU</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom 4-Product Dock (Ultrahuman MX Product Strip) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-white/10">
          {quickProducts.map((prod) => (
            <Link
              key={prod.name}
              href={prod.href}
              className={`group p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                prod.highlight
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-white/[0.04] hover:bg-white/[0.09] text-white border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                    prod.highlight ? "text-[#1832C7]" : "text-neutral-400"
                  }`}
                >
                  {prod.tag}
                </span>
                {prod.icon}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold tracking-tight">{prod.name}</h3>
                  <p
                    className={`text-xs mt-0.5 ${
                      prod.highlight ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    {prod.desc}
                  </p>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                    prod.highlight ? "text-black" : "text-neutral-400"
                  }`}
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
