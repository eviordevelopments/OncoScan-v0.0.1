"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ExplodedSystemsShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.5) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  // ============================================================================
  // LAYER 1 (TOP): MICROFLUIDIC SYSTEM TRANSFORMS
  // Step 0: Exploded stack top (-165px, opacity 1, scale 0.95)
  // Step 1: Active focus (-35px, opacity 1, scale 1.14)
  // Step 2: Receded top (-235px, opacity 0.14, scale 0.88)
  // Step 3: Receded top (-250px, opacity 0.12, scale 0.86)
  // ============================================================================
  const microY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [-165, -165, -35, -35, -235, -235, -250, -250]
  );
  const microScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [0.95, 0.95, 1.14, 1.14, 0.88, 0.88, 0.86, 0.86]
  );
  const microOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [1, 1, 1, 1, 0.15, 0.15, 0.12, 0.12]
  );

  // ============================================================================
  // LAYER 2 (MIDDLE): SENSING SYSTEM TRANSFORMS
  // Step 0: Exploded stack center (0px, opacity 1, scale 0.95)
  // Step 1: Receded middle (+125px, opacity 0.15, scale 0.88)
  // Step 2: Active focus (0px, opacity 1, scale 1.15)
  // Step 3: Receded middle (-125px, opacity 0.15, scale 0.88)
  // ============================================================================
  const sensingY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [0, 0, 125, 125, 0, 0, -125, -125]
  );
  const sensingScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [0.95, 0.95, 0.88, 0.88, 1.15, 1.15, 0.88, 0.88]
  );
  const sensingOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [1, 1, 0.15, 0.15, 1, 1, 0.15, 0.15]
  );

  // ============================================================================
  // LAYER 3 (BOTTOM): ELECTRONIC SYSTEM TRANSFORMS
  // Step 0: Exploded stack bottom (+165px, opacity 1, scale 0.95)
  // Step 1: Receded bottom (+250px, opacity 0.12, scale 0.86)
  // Step 2: Receded bottom (+235px, opacity 0.15, scale 0.88)
  // Step 3: Active focus (+35px, opacity 1, scale 1.14)
  // ============================================================================
  const electronicY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [165, 165, 250, 250, 235, 235, 35, 35]
  );
  const electronicScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [0.95, 0.95, 0.86, 0.86, 0.88, 0.88, 1.14, 1.14]
  );
  const electronicOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.54, 0.72, 0.8, 1],
    [1, 1, 0.12, 0.12, 0.15, 0.15, 1, 1]
  );

  // ============================================================================
  // 4 SCROLL-LINKED TEXT SLIDES (Left-pinned, entering smoothly from the right)
  // ============================================================================
  const s0Opacity = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0]);
  const s0X = useTransform(scrollYProgress, [0, 0.18, 0.24], [0, 0, -32]);

  const s1Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [0, 1, 1, 0]);
  const s1X = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [48, 0, 0, -32]);

  const s2Opacity = useTransform(scrollYProgress, [0.48, 0.54, 0.7, 0.76], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.48, 0.54, 0.7, 0.76], [48, 0, 0, -32]);

  const s3Opacity = useTransform(scrollYProgress, [0.74, 0.8, 0.96, 1], [0, 1, 1, 1]);
  const s3X = useTransform(scrollYProgress, [0.74, 0.8, 0.96, 1], [48, 0, 0, 0]);

  // Exploded Guide Lines Opacity (Visible in Step 0 overview, subtle during single-layer inspection)
  const axisGuideOpacity = useTransform(scrollYProgress, [0, 0.18, 0.26], [0.85, 0.85, 0.22]);

  const slides = [
    {
      subheader: "Ingeniería centrada en el humano · Diseño de precisión",
      title: "Arquitectura en vista explosionada",
      body: "Tres subsistemas de vanguardia acoplados con tolerancia micrométrica. La integración vertical de microfluídica capilar, sensado fotónico y electrónica Edge AI reduce un laboratorio clínico completo a una arquitectura compacta y autónoma.",
      specs: [
        { label: "01 // CAPA SUPERIOR", value: "Sistema Microfluídico Lab-on-a-Chip" },
        { label: "02 // CAPA INTERMEDIA", value: "Matriz de Sensado Fotónico y Óptico" },
        { label: "03 // CAPA BASE", value: "Sistema Electrónico e Inferencia Edge AI" },
      ],
      opacity: s0Opacity,
      x: s0X,
    },
    {
      subheader: "Arquitectura Interna · Capa 01 / 03",
      title: "Sistema microfluídico",
      body: "Cartucho monolítico de vidrio óptico y PDMS grabado con microcanales serpentinos de mezcla laminar pasiva y cámaras de captura funcionalizadas con aptámeros y anticuerpos. Aísla exosomas y microARNs circulantes a partir de una microgota capilar sin necesidad de PCR.",
      specs: [
        { label: "VOLUMEN DE MUESTRA", value: "< 50 µL de sangre capilar o plasma" },
        { label: "RÉGIMEN DE FLUJO", value: "Capilaridad pasiva (Re < 1) libre de bombas" },
        { label: "BIORECONOCIMIENTO", value: "Matriz multiplexada de sondas de alta afinidad" },
      ],
      opacity: s1Opacity,
      x: s1X,
    },
    {
      subheader: "Arquitectura Interna · Capa 02 / 03",
      title: "Sistema de sensado",
      body: "Arreglo óptico de microlentes colimadoras de cuarzo acoplado a una matriz de 36 fotodetectores cuánticos CMOS y transductores electroquímicos. Convierte cada evento de hibridación molecular en señales espectrales con sensibilidad femtomolar y cero diafonía óptica.",
      specs: [
        { label: "MATRIZ DE DETECCIÓN", value: "36 canales fotónicos / CMOS independientes" },
        { label: "LÍMITE DE DETECCIÓN", value: "Rango sub-femtomolar (< 10⁻¹⁵ M)" },
        { label: "AISLAMIENTO ÓPTICO", value: "Colimación dual con rechazo de ruido > 95 dB" },
      ],
      opacity: s2Opacity,
      x: s2X,
    },
    {
      subheader: "Arquitectura Interna · Capa 03 / 03",
      title: "Sistema electrónico",
      body: "Placa multicapa de alta densidad con ruteo diferencial chapado en oro, etapa analógica frontal (AFE) de ultra-bajo ruido y procesador neuronal (NPU) en silicio que ejecuta algoritmos de clasificación oncológica en 8.4 ms con cifrado por hardware AES-256.",
      specs: [
        { label: "PROCESAMIENTO ON-CHIP", value: "Inferencia neuronal espectral en 8.4 ms" },
        { label: "CONVERSIÓN ANALÓGICA", value: "AFE de 24 bits con deriva térmica compensada" },
        { label: "SEGURIDAD CLÍNICA", value: "Cifrado en silicio AES-256 · HL7 FHIR nativo" },
      ],
      opacity: s3Opacity,
      x: s3X,
    },
  ];

  const scrollToStep = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (index / 3.6) * scrollableHeight + 12;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="exploded-systems"
      ref={sectionRef}
      className="relative h-[440vh] bg-black text-white select-none border-t border-white/[0.06]"
    >
      {/* Sticky Fullscreen Stage (Renders on Left, Text on Right) */}
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden flex items-center">
        
        {/* Subtle Ambient Studio Backlight on the Left Exploded Stack Stage */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 29% 50%, rgba(0, 140, 255, 0.14) 0%, rgba(124, 58, 237, 0.08) 28%, rgba(0, 0, 0, 0) 64%)",
          }}
        />

        {/* 1. Left / Center-Left 3-Layer Isometric Exploded Stack */}
        <div className="absolute inset-0 flex items-center justify-start pl-2 sm:pl-8 lg:pl-14 xl:pl-24 z-10 pointer-events-none">
          <div className="relative w-full max-w-[500px] sm:max-w-[640px] lg:max-w-[780px] xl:max-w-[880px] h-[560px] sm:h-[680px] lg:h-[760px] flex items-center justify-center">
            
            {/* Precision Vertical Isometric Alignment Axis Lines (Visible in Exploded View) */}
            <motion.div
              style={{ opacity: axisGuideOpacity }}
              className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
            >
              {/* Central Precision Axis */}
              <div className="w-[1px] h-[68%] bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-emerald-400/0" />
              {/* Left & Right Corner Isometric Alignment Guides */}
              <div className="absolute left-[24%] top-[20%] bottom-[20%] w-[1px] border-l border-dashed border-white/15" />
              <div className="absolute right-[24%] top-[20%] bottom-[20%] w-[1px] border-l border-dashed border-white/15" />
            </motion.div>

            {/* ============================================================== */}
            {/* LAYER 3 (BOTTOM): ELECTRONIC SYSTEM                            */}
            {/* ============================================================== */}
            <motion.div
              style={{
                y: electronicY,
                scale: electronicScale,
                opacity: electronicOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute inset-0 flex items-center justify-center z-10 origin-center"
            >
              <div className="relative w-full flex items-center justify-center">
                {/* Subtle Emerald/Gold Rim Glow for Electronic Layer */}
                <div
                  className="absolute inset-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(16, 185, 129, 0.14) 0%, rgba(245, 158, 11, 0.08) 45%, rgba(0,0,0,0) 100%)",
                  }}
                />
                <Image
                  src="/electronic-system.png?v=2"
                  alt="Sistema Electrónico e Inferencia Edge AI"
                  width={2752}
                  height={1536}
                  unoptimized
                  priority
                  className="relative z-10 w-full h-auto object-contain [filter:drop-shadow(0_32px_42px_rgba(0,0,0,0.95))_drop-shadow(0_8px_24px_rgba(16,185,129,0.18))]"
                />
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* LAYER 2 (MIDDLE): SENSING SYSTEM                               */}
            {/* ============================================================== */}
            <motion.div
              style={{
                y: sensingY,
                scale: sensingScale,
                opacity: sensingOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute inset-0 flex items-center justify-center z-20 origin-center"
            >
              <div className="relative w-full flex items-center justify-center">
                {/* Subtle Photonic Violet/Blue Glow for Sensing Layer */}
                <div
                  className="absolute inset-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(139, 92, 246, 0.16) 0%, rgba(59, 130, 246, 0.10) 48%, rgba(0,0,0,0) 100%)",
                  }}
                />
                <Image
                  src="/sensing-system.png?v=2"
                  alt="Sistema de Sensado Fotónico y Óptico"
                  width={2752}
                  height={1536}
                  unoptimized
                  priority
                  className="relative z-10 w-full h-auto object-contain [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.92))_drop-shadow(0_8px_24px_rgba(139,92,246,0.22))]"
                />
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* LAYER 1 (TOP): MICROFLUIDIC SYSTEM                             */}
            {/* ============================================================== */}
            <motion.div
              style={{
                y: microY,
                scale: microScale,
                opacity: microOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute inset-0 flex items-center justify-center z-30 origin-center"
            >
              <div className="relative w-full flex items-center justify-center">
                {/* Subtle Ice-Cyan Optical Glow for Microfluidic Glass Layer */}
                <div
                  className="absolute inset-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(56, 189, 248, 0.16) 0%, rgba(255, 255, 255, 0.08) 48%, rgba(0,0,0,0) 100%)",
                  }}
                />
                <Image
                  src="/microfluidic-system.png?v=2"
                  alt="Sistema Microfluídico Lab-on-a-Chip"
                  width={2752}
                  height={1536}
                  unoptimized
                  priority
                  className="relative z-10 w-full h-auto object-contain [filter:drop-shadow(0_28px_38px_rgba(0,0,0,0.9))_drop-shadow(0_8px_24px_rgba(56,189,248,0.22))]"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* 2. Right Protective Scrim Gradient so right-aligned typography is always legible */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0) 72%)",
          }}
        />

        {/* 3. Right Content Stage: Enlarged System Slides + Vertical Step Lines on the Right */}
        <div className="relative z-30 w-full pr-4 sm:pr-8 lg:pr-10 pl-6 flex items-center justify-end">
          {/* Vertical Line Indicators */}
          <div
            role="group"
            aria-label="Capas del sistema en vista explosionada"
            className="flex flex-col items-center justify-center gap-3 pr-5 sm:pr-7 lg:pr-9"
          >
            {slides.map((sl, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  aria-label={`Capa ${idx + 1} de ${slides.length}: ${sl.title}`}
                  aria-current={isActive ? "step" : undefined}
                  className="group relative py-1 px-2 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`block w-[2px] h-11 sm:h-14 transition-colors duration-300 ${
                      isActive ? "bg-white" : "bg-white/25 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Primary Enlarged Feature Slides on the Right */}
          <ol className="relative w-full max-w-lg lg:max-w-[560px] xl:max-w-[620px] h-[460px] flex items-center list-none m-0 p-0 text-left">
            {slides.map((sl, idx) => (
              <motion.li
                key={idx}
                style={{ opacity: sl.opacity, x: sl.x }}
                className="absolute inset-0 flex flex-col justify-center items-start pointer-events-none"
              >
                {sl.subheader && (
                  <p className="text-xs sm:text-sm lg:text-base font-mono uppercase text-cyan-400/90 tracking-[0.14em] mb-3">
                    {sl.subheader}
                  </p>
                )}
                <h2 className="text-4xl sm:text-6xl lg:text-[62px] xl:text-[68px] font-light tracking-[-0.03em] text-white leading-[1.03] mb-5">
                  {sl.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-[20px] text-neutral-300 font-normal leading-[1.6] tracking-[-0.01em] max-w-xl mb-7">
                  {sl.body}
                </p>

                {/* Precision Engineering Technical Telemetry Specs (Neuralink #robot style callout rows) */}
                <div className="w-full max-w-lg border-t border-white/15 pt-4 grid grid-cols-1 gap-2.5">
                  {sl.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] pb-2"
                    >
                      <span className="text-[11px] sm:text-xs font-mono tracking-[0.12em] text-neutral-400 uppercase">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-white text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* 4. Bottom-Right "Skip section" Link */}
        <div className="absolute bottom-8 right-4 sm:right-8 lg:right-10 z-30">
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-normal text-neutral-400 hover:text-white transition-colors"
          >
            <span className="border-b border-neutral-600 group-hover:border-white pb-0.5">
              Saltar sección
            </span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
