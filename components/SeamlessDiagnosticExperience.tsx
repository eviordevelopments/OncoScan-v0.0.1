"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function SeamlessDiagnosticExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const sectionEl = sectionRef.current;
    if (!videoEl || !sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {
              // Autoplay fallback if browser blocks before interaction
            });
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-white text-black z-20"
    >
      {/* 12-Column Grid matching Neuralink's ._inner_x1yyb_22 */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-12 gap-x-6">
        
        {/* Header & Lead Copy (grid-column: 1 / span 8 on md, 2 / span 7 on xl) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 md:col-span-8 xl:col-start-2 xl:col-span-7 text-left"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-light tracking-[-0.03em] text-neutral-950 leading-[1.06]">
            Una experiencia diagnóstica fluida
          </h2>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-[20px] text-neutral-700 font-normal leading-[1.55] tracking-[-0.01em]">
            Para transformar la detección temprana y salvar vidas, hemos diseñado una plataforma de análisis molecular que permite una lectura rápida, confiable y automatizada desde la muestra hasta el resultado clínico, priorizando la simplicidad de uso.
          </p>
        </motion.div>

        {/* Outer Video Frame (grid-column: 1 / -1 on mobile, 2 / span 10 on xl; solid #393939 bezel & rounded corners) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 xl:col-start-2 xl:col-span-10 mt-10 sm:mt-14 relative flex overflow-hidden bg-black border-[12px] sm:border-[24px] lg:border-[32px] border-[#393939] rounded-[14px] sm:rounded-[20px] shadow-[0_25px_70px_rgba(0,0,0,0.14)]"
        >
          <div className="relative w-full aspect-[512/323] bg-black overflow-hidden">
            <video
              ref={videoRef}
              src="/gemini_generated_video_8c0b0a58.mp4"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              aria-label="Video de experiencia diagnóstica OncoScan 1"
              className="w-full h-full object-cover block"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
