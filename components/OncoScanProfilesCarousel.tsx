"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileSlide {
  id: string;
  tabLabel: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const SLIDE_DURATION_MS = 5000;

export function OncoScanProfilesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: ProfileSlide[] = [
    {
      id: "cuidadores-pacientes",
      tabLabel: "Cuidadores y Pacientes",
      title: "Prevención y tranquilidad desde el hogar",
      desc: "Diseñado para pacientes y familias que buscan monitoreo molecular oportuno sin procesos hospitalarios invasivos. Permite dar seguimiento continuo a factores de riesgo y acceder a pruebas preventivas con claridad y acompañamiento humano.",
      image: "/profile-caregivers-patients.jpg",
      alt: "Cuidadores y pacientes revisando resultados preventivos en casa",
    },
    {
      id: "laboratorios-instituciones",
      tabLabel: "Laboratorios e Instituciones",
      title: "Despliegue clínico de alto rendimiento",
      desc: "Infraestructura escalable para laboratorios de diagnóstico, hospitales y centros oncológicos. Automatiza el aislamiento microfluídico de ácidos nucleicos en cartuchos cerrados y se integra nativamente con sistemas hospitalarios HL7 y FHIR.",
      image: "/profile-labs-institutions.jpg",
      alt: "Laboratorio de diagnóstico molecular e institución hospitalaria",
    },
    {
      id: "clinicos-medicos",
      tabLabel: "Clínicos y Médicos Independientes",
      title: "Decisiones médicas respaldadas por bio-datos",
      desc: "Equipa a oncólogos, hematólogos y médicos especialistas con paneles cuantitativos de microARN en minutos directamente en el consultorio, acelerando la detección en estadios tempranos y el monitoreo de respuesta terapéutica.",
      image: "/profile-clinicians-doctors.jpg",
      alt: "Médico especialista en consulta revisando biomarcadores moleculares",
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <section
      id="perfiles-oncoscan"
      aria-label="Perfiles y usuarios de OncoScan"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-20 w-full bg-black text-white py-24 sm:py-32 lg:py-36 overflow-x-clip select-none"
    >
      <div className="relative z-10 w-full">
        {/* 1. Centered Header & Sliding Pill Tab List (Ultrahuman .o0UDHq_head) */}
        <div className="w-full max-w-[1040px] mx-auto px-6 flex flex-col items-center text-center gap-8 sm:gap-14">
          <div className="flex flex-col items-center gap-4 sm:gap-5 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-[44px] font-medium tracking-[-1px] text-white leading-[1.08]">
              OncoScan más allá de la medición
            </h2>
            <p className="text-sm sm:text-base text-white/60 tracking-[-0.4px] leading-relaxed">
              Cada perfil que integra nuestra tecnología, y cómo transforma la detección temprana en cada entorno de salud.
            </p>
          </div>

          {/* Pill Tab List (.o0UDHq_tabList) with animated highlight pill */}
          <div
            role="tablist"
            aria-label="Perfiles de usuario OncoScan"
            className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-1 p-1.5 rounded-full bg-white/[0.05] border border-white/10"
          >
            {slides.map((slide, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  id={`oncoscan-profile-tab-${slide.id}`}
                  aria-selected={isActive}
                  aria-controls={`oncoscan-profile-slide-${slide.id}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-[13.5px] font-medium tracking-[-0.2px] transition-colors duration-200 cursor-pointer whitespace-nowrap focus:outline-none ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="ultrahumanProfileTabHighlight"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-white/[0.14] border border-white/15 -z-10"
                      aria-hidden="true"
                    />
                  )}
                  <span>{slide.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Horizontal Sliding Carousel Region (.o0UDHq_carouselRegion) */}
        <div className="w-full mt-10 sm:mt-14 overflow-hidden">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-16">
            <motion.ul
              animate={{ x: `calc(-${activeIndex * 100}% - ${activeIndex * 40}px)` }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-stretch gap-[40px] m-0 p-0 list-none"
            >
              {slides.map((slide, idx) => {
                const isCurrent = activeIndex === idx;
                return (
                  <li
                    key={slide.id}
                    id={`oncoscan-profile-slide-${slide.id}`}
                    role="tabpanel"
                    aria-labelledby={`oncoscan-profile-tab-${slide.id}`}
                    className={`w-full shrink-0 flex flex-col gap-6 transition-opacity duration-500 ${
                      isCurrent ? "opacity-100" : "opacity-35 hover:opacity-65 cursor-pointer"
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {/* Widescreen Media Card (.o0UDHq_media) */}
                    <div className="relative w-full aspect-[1018/572] max-h-[560px] rounded-[16px] bg-[#1a1a1a] overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        unoptimized
                        priority={idx === 0}
                        className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                      />
                      {/* Subtle bottom gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                      {/* Corner Profile Tag Pill */}
                      <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-white/90 uppercase tracking-wider">
                        0{idx + 1} // {slide.tabLabel}
                      </div>
                    </div>

                    {/* Slide Copy Below Card (.o0UDHq_cardCopy) */}
                    <div className="flex flex-col items-start gap-3 max-w-[600px] text-left pt-1">
                      <h3 className="text-xl sm:text-2xl lg:text-[26px] font-normal tracking-[-0.8px] text-white leading-[1.2]">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-[15px] text-white/60 font-normal leading-[1.55] tracking-[-0.3px]">
                        {slide.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </div>
        </div>

        {/* 3. Expanding Progress Dots (.o0UDHq_dots) */}
        <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14 px-6">
          {slides.map((slide, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir a perfil ${slide.tabLabel}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-[6px] rounded-full bg-white/20 overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive ? "w-[48px]" : "w-[6px] hover:bg-white/40"
                }`}
              >
                {isActive && (
                  <motion.span
                    key={`${activeIndex}-${isPaused ? "paused" : "running"}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "100%" : "100%" }}
                    transition={{
                      duration: isPaused ? 0.2 : SLIDE_DURATION_MS / 1000,
                      ease: "linear",
                    }}
                    className="block h-full bg-white rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
