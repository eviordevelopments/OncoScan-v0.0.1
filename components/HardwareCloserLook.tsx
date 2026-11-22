"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HardwareCloserLook() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setActiveStep(0);
    else if (latest < 0.4) setActiveStep(1);
    else if (latest < 0.6) setActiveStep(2);
    else if (latest < 0.8) setActiveStep(3);
    else setActiveStep(4);
  });

  // Synchronized Hardware Zoom & Pan (Device on the Right, zooming smoothly like Neuralink N1)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.45, 0.68, 0.92, 1],
    [0.82, 0.98, 1.15, 1.32, 1.46, 1.46]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.22, 0.45, 0.68, 0.92, 1],
    [0, 12, 28, 18, -10, -10]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.45, 0.68, 0.92, 1],
    [16, 4, -18, 12, -16, -16]
  );

  // 5 Smooth Scroll-Linked Slide Transitions (Positioned on the Left, entering smoothly from the right: x from 48px -> 0)
  const s0Opacity = useTransform(scrollYProgress, [0, 0.14, 0.2], [1, 1, 0]);
  const s0X = useTransform(scrollYProgress, [0, 0.14, 0.2], [0, 0, -32]);

  const s1Opacity = useTransform(scrollYProgress, [0.18, 0.24, 0.34, 0.4], [0, 1, 1, 0]);
  const s1X = useTransform(scrollYProgress, [0.18, 0.24, 0.34, 0.4], [48, 0, 0, -32]);

  const s2Opacity = useTransform(scrollYProgress, [0.38, 0.44, 0.54, 0.6], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.38, 0.44, 0.54, 0.6], [48, 0, 0, -32]);

  const s3Opacity = useTransform(scrollYProgress, [0.58, 0.64, 0.74, 0.8], [0, 1, 1, 0]);
  const s3X = useTransform(scrollYProgress, [0.58, 0.64, 0.74, 0.8], [48, 0, 0, -32]);

  const s4Opacity = useTransform(scrollYProgress, [0.78, 0.84, 0.96, 1], [0, 1, 1, 1]);
  const s4X = useTransform(scrollYProgress, [0.78, 0.84, 0.96, 1], [48, 0, 0, 0]);

  const slides = [
    {
      subheader: null,
      title: "OncoScan 1",
      body: "Nuestro analizador molecular de escritorio integra captura microfluídica, espectroscopía fotónica e inferencia en chip para cuantificar firmas de microARN en minutos.",
      opacity: s0Opacity,
      x: s0X,
    },
    {
      subheader: "OncoScan 1",
      title: "Chasis unibody de grado clínico",
      body: "Sellado en una estructura de aluminio anodizado mecanizado en CNC con blindaje electromagnético y disipación térmica pasiva que aísla los sensores ópticos de cualquier vibración externa.",
      opacity: s1Opacity,
      x: s1X,
    },
    {
      subheader: "OncoScan 1",
      title: "Bahía microfluídica y fotónica",
      body: "Cámara receptora de alta precisión para cartuchos de 64 microcanales capilares, acoplada a resonadores láser de 1550 nm que leen la hibridación molecular sin amplificación PCR.",
      opacity: s2Opacity,
      x: s2X,
    },
    {
      subheader: "OncoScan 1",
      title: "Chips y electrónica Edge AI",
      body: "Microprocesadores neuromórficos personalizados de ultra-bajo consumo procesan las señales espectrales en 8.4 ms directamente en el dispositivo, garantizando privacidad genómica absoluta.",
      opacity: s3Opacity,
      x: s3X,
    },
    {
      subheader: "OncoScan 1",
      title: "Conectividad e integración",
      body: "Puertos dedicados Gigabit Ethernet y USB de alta velocidad con cifrado por hardware AES-256 para transmitir reportes estructurados bajo el estándar hospitalario HL7 / FHIR.",
      opacity: s4Opacity,
      x: s4X,
    },
  ];

  const scrollToStep = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (index / 4.5) * scrollableHeight + 10;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="hardware-closer-look-container"
      ref={sectionRef}
      className="relative h-[460vh] bg-black text-white select-none"
    >
      {/* Sticky Fullscreen Viewport Stage (Neuralink _inner-container_1m9me_35) */}
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden flex items-center">
        
        {/* Ambient Unclipped Studio Backlight Behind Hardware */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 70% 52%, rgba(0, 82, 255, 0.16) 0%, rgba(239, 68, 68, 0.08) 28%, rgba(0, 0, 0, 0) 64%)",
          }}
        />

        {/* 1. Right / Center-Right Hardware Render (_coreImage_1m9me_133) */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-12 lg:pr-20 xl:pr-28 z-10 pointer-events-none">
          <motion.div
            style={{ scale, x, y, willChange: "transform" }}
            className="relative w-full max-w-[500px] sm:max-w-[620px] lg:max-w-[740px] xl:max-w-[830px] p-8 sm:p-12 flex items-center justify-center origin-center"
          >
            {/* Unclipped Soft Radial Halo that scales with the device */}
            <div
              className="absolute -inset-16 pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.10) 0%, rgba(0,82,255,0.14) 44%, rgba(0,0,0,0) 100%)",
              }}
            />

            {/* Deep Studio Floor Contact Shadow */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[82%] h-14 pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%)",
              }}
            />

            <Image
              src="/oncoscan-device.png?v=6"
              alt="OncoScan 1 Benchtop Analyzer"
              width={2896}
              height={2172}
              unoptimized
              priority
              className="relative z-10 w-full h-auto object-contain pointer-events-none [filter:drop-shadow(0_36px_48px_rgba(0,0,0,0.95))_drop-shadow(0_10px_28px_rgba(0,82,255,0.22))]"
            />
          </motion.div>
        </div>

        {/* 2. Neuralink-style Left Protective Scrim Gradient so enlarged text on the left is always crisp */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.74) 36%, rgba(0,0,0,0.35) 54%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* 3. Left Content Stage: Vertical Step Lines + Enlarged Feature Slides Pinned to the Far Left */}
        <div className="relative z-30 w-full pl-4 sm:pl-8 lg:pl-10 pr-6 flex items-center justify-start">
          {/* Vertical Line Indicators (_lines_1qj4b_16) */}
          <div
            role="group"
            aria-label="Pasos de arquitectura de hardware"
            className="flex flex-col items-center justify-center gap-3 pr-5 sm:pr-7 lg:pr-9"
          >
            {slides.map((sl, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  aria-label={`Paso ${idx + 1} de ${slides.length}: ${sl.title}`}
                  aria-current={isActive ? "step" : undefined}
                  className="group relative py-1 px-2 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`block w-[2px] h-10 sm:h-12 transition-colors duration-300 ${
                      isActive ? "bg-white" : "bg-white/25 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Primary Enlarged Feature Slides on the Left (sliding in from the right) */}
          <ol className="relative w-full max-w-lg lg:max-w-[560px] xl:max-w-[620px] h-[380px] flex items-center list-none m-0 p-0 text-left">
            {slides.map((sl, idx) => (
              <motion.li
                key={idx}
                style={{ opacity: sl.opacity, x: sl.x }}
                className="absolute inset-0 flex flex-col justify-center items-start pointer-events-none"
              >
                {sl.subheader && (
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-neutral-400 tracking-wide mb-3">
                    {sl.subheader}
                  </p>
                )}
                <h2 className="text-4xl sm:text-6xl lg:text-[64px] xl:text-[70px] font-light tracking-[-0.03em] text-white leading-[1.03] mb-6">
                  {sl.title}
                </h2>
                <p className="text-base sm:text-xl lg:text-[21px] text-neutral-300 font-normal leading-[1.6] tracking-[-0.01em] max-w-xl">
                  {sl.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* 4. Bottom-Left "Skip section" Link */}
        <div className="absolute bottom-8 left-4 sm:left-8 lg:left-10 z-30">
          <a
            href="#exploded-systems"
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
