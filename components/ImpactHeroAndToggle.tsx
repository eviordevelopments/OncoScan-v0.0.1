"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Filter,
  Globe2,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  CohortPatient,
  computeQuantStats,
} from "@/lib/impactCohortData";
import { AnimatedNumber } from "./AnimatedNumber";

export type PreventionMode = "deteccion-prevencion" | "onco-metabolico-okrs";
export type SexFilter = "ALL" | "H" | "M";
export type AgeGroupFilter = "ALL" | "20-29" | "30-39" | "40-49" | "50+";

interface ImpactHeroAndToggleProps {
  mode: PreventionMode;
  setMode: (m: PreventionMode) => void;
  sexFilter: SexFilter;
  setSexFilter: (s: SexFilter) => void;
  ageFilter: AgeGroupFilter;
  setAgeFilter: (a: AgeGroupFilter) => void;
  filteredPatients: CohortPatient[];
  allPatients: CohortPatient[];
}

export function ImpactHeroAndToggle({
  sexFilter,
  setSexFilter,
  ageFilter,
  setAgeFilter,
  filteredPatients,
  allPatients,
}: ImpactHeroAndToggleProps) {
  const nTotal = allPatients.length;
  const nFiltered = filteredPatients.length;

  // Ref for the Sticky Stacked Cards Section ("Ring AIR / Un compacto gigante" style)
  const stickyStackRef = useRef<HTMLElement | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stickyStackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.24) setActiveCardIdx(0);
    else if (latest < 0.5) setActiveCardIdx(1);
    else if (latest < 0.75) setActiveCardIdx(2);
    else setActiveCardIdx(3);
  });

  // ==========================================================================
  // OVERLAPPING STACKED CARDS ANIMATION TRANSFORMS (Ultrahuman Ring AIR style)
  // ==========================================================================
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.6, 0.86],
    [1, 1, 0.94, 0.9, 0.87]
  );
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.6, 0.86],
    [0, 0, -22, -38, -50]
  );
  const card1Opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.6, 0.86],
    [1, 1, 0.65, 0.4, 0.2]
  );

  const card2Y = useTransform(scrollYProgress, [0.16, 0.32], [620, 0]);
  const card2Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.26, 0.46, 0.6, 0.86],
    [0, 1, 1, 0.65, 0.35]
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0.32, 0.46, 0.6, 0.86],
    [1, 1, 0.95, 0.91]
  );
  const card2StackOffset = useTransform(
    scrollYProgress,
    [0.32, 0.46, 0.6, 0.86],
    [0, 0, -18, -32]
  );

  const card3Y = useTransform(scrollYProgress, [0.43, 0.59], [620, 0]);
  const card3Opacity = useTransform(
    scrollYProgress,
    [0.42, 0.53, 0.7, 0.86],
    [0, 1, 1, 0.6]
  );
  const card3Scale = useTransform(
    scrollYProgress,
    [0.59, 0.7, 0.86],
    [1, 1, 0.96]
  );
  const card3StackOffset = useTransform(
    scrollYProgress,
    [0.59, 0.7, 0.86],
    [0, 0, -14]
  );

  const card4Y = useTransform(scrollYProgress, [0.69, 0.86], [640, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.68, 0.8], [0, 1]);

  const scrollToStackStep = (idx: number) => {
    if (!stickyStackRef.current) return;
    const rect = stickyStackRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = stickyStackRef.current.offsetHeight - window.innerHeight;
    const targetProgress =
      idx === 0 ? 0.05 : idx === 1 ? 0.36 : idx === 2 ? 0.63 : 0.92;
    window.scrollTo({
      top: sectionTop + targetProgress * scrollable,
      behavior: "smooth",
    });
  };

  // Demographics calculations for Section 1
  const menCount = filteredPatients.filter((p) => p.sex === "H").length;
  const womenCount = filteredPatients.filter((p) => p.sex === "M").length;
  const menPct = nFiltered > 0 ? (menCount / nFiltered) * 100 : 0;
  const womenPct = nFiltered > 0 ? (womenCount / nFiltered) * 100 : 0;

  const ageStats = computeQuantStats(filteredPatients.map((p) => p.age));

  const decennialGroups = [
    {
      label: "20 a 29 años",
      key: "20-29" as AgeGroupFilter,
      count: filteredPatients.filter((p) => p.age >= 20 && p.age <= 29).length,
      tag: "Adultos jóvenes",
    },
    {
      label: "30 a 39 años",
      key: "30-39" as AgeGroupFilter,
      count: filteredPatients.filter((p) => p.age >= 30 && p.age <= 39).length,
      tag: "Etapa laboral plena",
    },
    {
      label: "40 a 49 años",
      key: "40-49" as AgeGroupFilter,
      count: filteredPatients.filter((p) => p.age >= 40 && p.age <= 49).length,
      tag: "Prevención clave",
    },
    {
      label: "50 años o más",
      key: "50+" as AgeGroupFilter,
      count: filteredPatients.filter((p) => p.age >= 50).length,
      tag: "Seguimiento prioritario",
    },
  ];

  const nativeGto = filteredPatients.filter((p) => p.origin.includes("Gto")).length;
  const migrantVeracruz = filteredPatients.filter((p) =>
    p.origin.includes("Veracruz")
  ).length;
  const migrantJalisco = filteredPatients.filter((p) =>
    p.origin.includes("Jalisco")
  ).length;
  const nativePct = nFiltered > 0 ? (nativeGto / nFiltered) * 100 : 0;
  const migrantPct =
    nFiltered > 0
      ? ((migrantVeracruz + migrantJalisco) / nFiltered) * 100
      : 0;

  const imssCount = filteredPatients.filter((p) => p.affiliation === "IMSS").length;
  const isssteCount = filteredPatients.filter(
    (p) => p.affiliation === "ISSSTE"
  ).length;
  const openPopCount = filteredPatients.filter((p) => p.affiliation === "N/A").length;

  const imssPct = nFiltered > 0 ? (imssCount / nFiltered) * 100 : 0;
  const issstePct = nFiltered > 0 ? (isssteCount / nFiltered) * 100 : 0;
  const openPopPct = nFiltered > 0 ? (openPopCount / nFiltered) * 100 : 0;

  const r = 62;
  const circ = 2 * Math.PI * r;
  const seg1 = (imssPct / 100) * circ;
  const seg2 = (issstePct / 100) * circ;
  const seg3 = (openPopPct / 100) * circ;

  return (
    <div className="relative w-full">
      {/* ==================================================================== */}
      {/* 1. FULL-BLEED PHOTOGRAPHIC HERO SECTION (ONLY TITLE & SUBTITLE)      */}
      {/* ==================================================================== */}
      <section className="relative w-full h-[94vh] min-h-[680px] flex items-center justify-center overflow-hidden">
        <Image
          src="/profile-caregivers-patients.jpg"
          alt="Prevención y detección temprana en la comunidad"
          fill
          priority
          unoptimized
          className="object-cover object-center scale-[1.02]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,9,17,0.58) 0%, rgba(6,9,17,0.48) 45%, rgba(6,9,17,0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(24,50,199,0.22) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Hero Center Text — ONLY the two texts requested */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 text-center pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl lg:text-[76px] font-semibold tracking-[-0.035em] text-white leading-[1.04] max-w-5xl mx-auto mb-7 drop-shadow-sm"
          >
            Detectar a tiempo cambia el futuro de una comunidad.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-2xl lg:text-[26px] text-white/90 max-w-4xl mx-auto font-normal leading-[1.45] tracking-[-0.01em]"
          >
            Acercamos evaluaciones gratuitas y completas de salud a las comunidades
            para identificar hipertensión, diabetes, sobrepeso y alteraciones
            metabólicas en personas que aún no saben que las padecen.
          </motion.p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. SPACIOUS STICKY OVERLAPPING CARDS SECTION (Ultrahuman Ring AIR)   */}
      {/* ==================================================================== */}
      <section
        id="jornada-umaps-loza"
        ref={stickyStackRef}
        className="relative h-[430vh] w-full bg-[#FBFBFD]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT 5 COLUMNS: STRATEGIC SSG LOGO + FIXED CONTEXT & STEP INDICATORS */}
            <div className="lg:col-span-5 space-y-6">
              {/* Strategic Official SSG Logo Block replacing the text pill */}
              <div className="inline-flex items-center gap-5 px-5 py-3.5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(6,9,17,0.05)]">
                <Image
                  src="/logo_SSG.png"
                  alt="Secretaría de Salud de Guanajuato"
                  width={220}
                  height={96}
                  unoptimized
                  className="h-14 sm:h-16 w-auto object-contain"
                />
                <div className="pl-4 border-l border-slate-200 text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#1832C7] font-bold">
                    ALIANZA INSTITUCIONAL
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#060911]">
                    UMAPS Loza de los Padres
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    Jurisdicción Sanitaria VII · León, GTO
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Consentimiento Informado y Datos Anonimizados
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1832C7]/10 border border-[#1832C7]/20 text-[#1832C7] text-xs font-semibold">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#0052FF]" />
                  Formulario Oficial CENAPRECE
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#1832C7]" />
                  20 de noviembre
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/70 text-[#DC2626] text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
                  León de los Aldama, Guanajuato, México
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-[50px] font-semibold tracking-[-0.03em] text-[#060911] leading-[1.06]">
                Jornada Conjunta · UMAPS Loza de los Padres
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                El pasado <strong className="text-[#060911]">20 de noviembre</strong> en{" "}
                <strong className="text-[#060911]">León de los Aldama, Guanajuato</strong>,
                en coordinación con la{" "}
                <strong className="text-[#1832C7]">
                  Secretaría de Salud de Guanajuato
                </strong>{" "}
                a través de la{" "}
                <strong className="text-[#060911]">UMAPS Loza de los Padres</strong>,
                evaluamos a{" "}
                <strong className="text-[#1832C7]">
                  26 habitantes en edad productiva
                </strong>{" "}
                aplicando la{" "}
                <strong className="text-[#060911]">
                  Cédula Oficial de Detección Integrada del CENAPRECE
                </strong>{" "}
                bajo consentimiento informado firmado y estricta protección de datos
                personales.
              </p>

              {/* Interactive Card Step Selector Pills */}
              <div className="pt-1 flex flex-wrap items-center gap-2">
                {[
                  { idx: 0, label: "01 · Personas evaluadas" },
                  { idx: 1, label: "02 · Riesgo detectado" },
                  { idx: 2, label: "03 · Diagnóstico previo" },
                  { idx: 3, label: "04 · Hallazgo principal" },
                ].map((step) => (
                  <button
                    key={step.idx}
                    type="button"
                    onClick={() => scrollToStackStep(step.idx)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeCardIdx === step.idx
                        ? "bg-[#060911] text-white shadow-md scale-[1.02]"
                        : "bg-white text-slate-500 border border-slate-200 hover:text-[#060911]"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT 7 COLUMNS: ENLARGED PHOTO-FREE STACKED CARDS STAGE */}
            <div className="lg:col-span-7 relative h-[540px] sm:h-[580px] lg:h-[600px] w-full flex items-center justify-center">
              {/* ============================================================ */}
              {/* CARD 1: PERSONAS EVALUADAS (26 · 100% con estudio completo)  */}
              {/* ============================================================ */}
              <motion.div
                style={{
                  scale: card1Scale,
                  y: card1Y,
                  opacity: card1Opacity,
                }}
                className="absolute inset-0 rounded-[40px] bg-white border border-slate-200/90 shadow-[0_28px_80px_rgba(6,9,17,0.08)] p-8 sm:p-14 flex flex-col justify-between overflow-hidden z-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-[#1832C7]/10 text-[#1832C7] text-xs font-bold uppercase tracking-wider">
                    01 · Cobertura de la jornada
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Cédula Oficial CENAPRECE · León, GTO
                  </span>
                </div>

                <div className="my-auto py-4 space-y-5">
                  <p className="text-xl sm:text-2xl font-semibold text-slate-500">
                    Personas evaluadas
                  </p>
                  <p className="text-8xl sm:text-9xl lg:text-[136px] font-bold tracking-[-0.04em] text-[#060911] leading-none">
                    26
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-[#1832C7]">
                    100% con estudio completo
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Cada habitante completó el circuito preventivo de medición de
                    peso, estatura, circunferencia abdominal, presión arterial y
                    glucosa capilar en sangre bajo los lineamientos oficiales del
                    CENAPRECE y la Secretaría de Salud.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Expedientes clínicos preventivos completos</span>
                    <span className="text-[#1832C7]">26 de 26 (100%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-[#1832C7] to-[#0052FF]" />
                  </div>
                </div>
              </motion.div>

              {/* ============================================================ */}
              {/* CARD 2: CON ALGÚN RIESGO DETECTADO (92.3% · 24 de 26)        */}
              {/* ============================================================ */}
              <motion.div
                style={{
                  y: card2Y,
                  scale: card2Scale,
                  opacity: card2Opacity,
                  translateY: card2StackOffset,
                }}
                className="absolute inset-0 rounded-[40px] bg-white border border-[#1832C7]/25 shadow-[0_32px_90px_rgba(24,50,199,0.14)] p-8 sm:p-14 flex flex-col justify-between overflow-hidden z-20"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-[#0052FF]/10 text-[#0052FF] text-xs font-bold uppercase tracking-wider">
                    02 · Detección oportuna en campo
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Tamizaje preventivo primario
                  </span>
                </div>

                <div className="my-auto py-4 space-y-5">
                  <p className="text-xl sm:text-2xl font-semibold text-slate-500">
                    Con algún riesgo detectado
                  </p>
                  <p className="text-8xl sm:text-9xl lg:text-[128px] font-bold tracking-[-0.04em] text-[#1832C7] leading-none">
                    92.3%
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-[#060911]">
                    24 de 26 personas evaluadas
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Presentaron al menos una condición clínica fuera de rango
                    (presión arterial elevada, sobrepeso, obesidad o glucosa alta)
                    que amerita atención preventiva inmediata en su unidad de salud.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Tasa de positividad preventiva en la jornada</span>
                    <span className="text-[#1832C7]">24 de 26 (92.3%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[92.3%] h-full bg-gradient-to-r from-[#1832C7] via-[#0052FF] to-[#EF4444]" />
                  </div>
                </div>
              </motion.div>

              {/* ============================================================ */}
              {/* CARD 3: TENÍAN DIAGNÓSTICO PREVIO (1 de 26 · Solo 3.8%)      */}
              {/* ============================================================ */}
              <motion.div
                style={{
                  y: card3Y,
                  scale: card3Scale,
                  opacity: card3Opacity,
                  translateY: card3StackOffset,
                }}
                className="absolute inset-0 rounded-[40px] bg-white border border-red-200 shadow-[0_36px_96px_rgba(239,68,68,0.14)] p-8 sm:p-14 flex flex-col justify-between overflow-hidden z-30"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-red-50 text-[#DC2626] text-xs font-bold uppercase tracking-wider">
                    03 · Brecha de diagnóstico previo
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Historial médico previo
                  </span>
                </div>

                <div className="my-auto py-4 space-y-5">
                  <p className="text-xl sm:text-2xl font-semibold text-[#DC2626]">
                    Tenían diagnóstico previo
                  </p>
                  <p className="text-8xl sm:text-9xl lg:text-[124px] font-bold tracking-[-0.04em] text-[#EF4444] leading-none">
                    1{" "}
                    <span className="text-5xl sm:text-6xl text-slate-400 font-semibold">
                      de 26
                    </span>
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold text-[#060911]">
                    Solo 3.8% conocía su enfermedad
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Antes de asistir a la jornada en la UMAPS Loza de los Padres,
                    25 de los 26 participantes desconocían padecer alguna enfermedad
                    crónico-degenerativa.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Diagnóstico médico previo registrado</span>
                    <span className="text-[#DC2626]">1 de 26 (3.85%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-red-100 overflow-hidden">
                    <div className="w-[3.85%] h-full bg-[#EF4444]" />
                  </div>
                </div>
              </motion.div>

              {/* ============================================================ */}
              {/* CARD 4: HALLAZGO PRINCIPAL DE LA JORNADA (ENLARGED METRICS)  */}
              {/* ============================================================ */}
              <motion.div
                style={{
                  y: card4Y,
                  opacity: card4Opacity,
                }}
                className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#060911] via-[#101B3B] to-[#1832C7] text-white border border-white/15 shadow-[0_40px_100px_rgba(6,9,17,0.45)] p-8 sm:p-11 lg:p-12 flex flex-col justify-between overflow-hidden z-40"
              >
                <div className="flex items-center justify-between gap-4 shrink-0">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-red-300 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                    <span>HALLAZGO PRINCIPAL DE LA JORNADA</span>
                  </div>
                  <span className="text-xs font-mono text-blue-200">
                    04 / 04 · Impacto directo
                  </span>
                </div>

                <div className="space-y-3.5 my-auto py-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-white leading-[1.15]">
                    De las 26 personas evaluadas, solo 1 sabía que tenía una
                    enfermedad crónica
                  </h3>
                  <p className="text-sm sm:text-base lg:text-[17px] text-slate-200 leading-relaxed">
                    Al revisar el historial médico previo de cada participante,
                    únicamente{" "}
                    <strong className="text-white underline decoration-[#EF4444] decoration-2">
                      1 persona (3.85%) tenía diagnóstico confirmado de Diabetes
                    </strong>
                    . Las otras{" "}
                    <strong className="text-white">
                      25 personas (96.15%) no sabían que tenían ninguna condición
                      crónica
                    </strong>{" "}
                    o se consideraban completamente sanas; sin embargo, la jornada
                    permitió detectarles a tiempo presión arterial alta, sobrepeso,
                    obesidad o azúcar elevada.
                  </p>
                </div>

                {/* Enlarged, Well-Contained Dual Metric Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 shrink-0">
                  <div className="rounded-3xl bg-white/[0.11] backdrop-blur-md border border-white/20 p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white leading-none tracking-tight">
                        96.2%
                      </p>
                      <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                        No sabían su condición (25 personas)
                      </p>
                    </div>
                    <span className="px-3.5 py-2 rounded-2xl bg-white/15 text-blue-200 font-mono text-base sm:text-lg font-bold shrink-0">
                      25/26
                    </span>
                  </div>

                  <div className="rounded-3xl bg-[#EF4444]/30 backdrop-blur-md border border-[#EF4444]/60 p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white leading-none tracking-tight">
                        23
                      </p>
                      <p className="text-xs sm:text-sm text-red-100 mt-2 font-medium">
                        Nuevos casos detectados a tiempo
                      </p>
                    </div>
                    <span className="w-12 h-12 rounded-2xl bg-[#EF4444]/30 border border-white/20 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-7 h-7 text-white" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. EXPANDED DEMOGRAPHICS & INTERACTIVE FILTER BAR                    */}
      {/* ==================================================================== */}
      <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        {/* Interactive Filter Bar */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_12px_36px_rgba(6,9,17,0.04)] mb-14 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-[#060911]">
            <Filter className="w-5 h-5 text-[#0052FF]" />
            <span>
              Explora los resultados filtrando la comunidad (Mostrando{" "}
              <strong className="text-[#1832C7]">{nFiltered}</strong> de {nTotal}{" "}
              personas):
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sex Filter Pills */}
            <div className="inline-flex items-center rounded-full bg-slate-100 p-1.5 border border-slate-200">
              {(
                [
                  { key: "ALL", label: "Todos (26)" },
                  { key: "H", label: "Hombres (14)" },
                  { key: "M", label: "Mujeres (12)" },
                ] as { key: SexFilter; label: string }[]
              ).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSexFilter(item.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    sexFilter === item.key
                      ? "bg-[#1832C7] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#060911]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Age Group Filter Pills */}
            <div className="inline-flex flex-wrap items-center rounded-full bg-slate-100 p-1.5 border border-slate-200">
              {(
                [
                  { key: "ALL", label: "Todas las edades" },
                  { key: "20-29", label: "20–29 años" },
                  { key: "30-39", label: "30–39 años" },
                  { key: "40-49", label: "40–49 años" },
                  { key: "50+", label: "50+ años" },
                ] as { key: AgeGroupFilter; label: string }[]
              ).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setAgeFilter(item.key)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    ageFilter === item.key
                      ? "bg-[#060911] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#060911]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1 Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-[#1832C7] font-semibold mb-2">
              01 · PERFIL DE LA COMUNIDAD EVALUADA
            </p>
            <h3 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#060911]">
              ¿A quiénes atendimos en León de los Aldama?
            </h3>
          </div>
          <p className="text-sm sm:text-base text-slate-500">
            Grupo mostrado:{" "}
            <strong className="text-[#060911]">{nFiltered} participantes</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1.1: Participación de Hombres y Mujeres */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between shadow-[0_14px_44px_rgba(6,9,17,0.05)]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Participación por sexo
                </span>
                <span className="w-10 h-10 rounded-2xl bg-[#1832C7]/10 text-[#1832C7] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl sm:text-6xl font-bold text-[#060911]">
                  <AnimatedNumber value={nFiltered} />
                </span>
                <span className="text-xs font-semibold text-[#1832C7] bg-[#1832C7]/10 px-3.5 py-1 rounded-full">
                  Acceso equitativo
                </span>
              </div>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Asistieron tanto hombres como mujeres de la comunidad en proporción
                equilibrada, logrando evaluar a familias y trabajadores completos.
              </p>
            </div>

            <div className="space-y-3.5 pt-5 border-t border-slate-100">
              <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${menPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#1832C7]"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${womenPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#EF4444]"
                />
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="inline-flex items-center gap-2 text-[#1832C7]">
                  <span className="w-3 h-3 rounded-full bg-[#1832C7]" />
                  Hombres: {menCount} ({menPct.toFixed(1)}%)
                </span>
                <span className="inline-flex items-center gap-2 text-[#EF4444]">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  Mujeres: {womenCount} ({womenPct.toFixed(1)}%)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 1.2: Edades de los Participantes */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between shadow-[0_14px_44px_rgba(6,9,17,0.05)]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Edades de los participantes
                </span>
                <span className="w-10 h-10 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/70 p-3.5">
                  <p className="text-xs text-slate-500 font-medium">Promedio</p>
                  <p className="text-2xl font-bold text-[#060911] mt-0.5">
                    <AnimatedNumber value={ageStats.mean} decimals={1} suffix="a" />
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/70 p-3.5">
                  <p className="text-xs text-slate-500 font-medium">Valor central</p>
                  <p className="text-2xl font-bold text-[#1832C7] mt-0.5">
                    <AnimatedNumber value={ageStats.median} decimals={1} suffix="a" />
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/70 p-3.5">
                  <p className="text-xs text-slate-500 font-medium">Mín – Máx</p>
                  <p className="text-2xl font-bold text-[#060911] mt-0.5">
                    {ageStats.min}–{ageStats.max}a
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-slate-100">
              {decennialGroups.map((g) => {
                const pct = nFiltered > 0 ? (g.count / nFiltered) * 100 : 0;
                return (
                  <div key={g.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-700 font-semibold">
                        {g.label}{" "}
                        <span className="text-slate-400 font-normal">
                          · {g.tag}
                        </span>
                      </span>
                      <span className="font-bold text-[#060911]">
                        {g.count} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#1832C7] to-[#0052FF]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Card 1.3: Cobertura Médica, Edad Productiva y Lugar de Origen */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-9 flex flex-col justify-between shadow-[0_14px_44px_rgba(6,9,17,0.05)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Servicio médico y origen
              </span>
              <span className="w-10 h-10 rounded-2xl bg-red-50 text-[#EF4444] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            <div className="flex items-center gap-6 my-3">
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                  <circle
                    cx="75"
                    cy="75"
                    r={r}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="15"
                  />
                  <motion.circle
                    cx="75"
                    cy="75"
                    r={r}
                    fill="none"
                    stroke="#1832C7"
                    strokeWidth="15"
                    initial={{ strokeDasharray: `0 ${circ}` }}
                    whileInView={{ strokeDasharray: `${seg1} ${circ}` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                  <motion.circle
                    cx="75"
                    cy="75"
                    r={r}
                    fill="none"
                    stroke="#0052FF"
                    strokeWidth="15"
                    initial={{ strokeDasharray: `0 ${circ}` }}
                    whileInView={{ strokeDasharray: `${seg2} ${circ}` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
                    strokeDashoffset={-seg1}
                  />
                  <motion.circle
                    cx="75"
                    cy="75"
                    r={r}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="15"
                    initial={{ strokeDasharray: `0 ${circ}` }}
                    whileInView={{ strokeDasharray: `${seg3} ${circ}` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                    strokeDashoffset={-(seg1 + seg2)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-[#060911]">
                    <AnimatedNumber value={imssPct} decimals={1} suffix="%" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase text-[#1832C7]">
                    IMSS ({imssCount})
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm flex-1">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-3 h-3 rounded-full bg-[#1832C7] shrink-0" />
                    IMSS
                  </span>
                  <span className="font-bold text-[#060911]">
                    {imssCount} ({imssPct.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-3 h-3 rounded-full bg-[#0052FF] shrink-0" />
                    ISSSTE
                  </span>
                  <span className="font-bold text-[#060911]">
                    {isssteCount} ({issstePct.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-slate-700 font-medium">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444] shrink-0" />
                    Sin seguro
                  </span>
                  <span className="font-bold text-[#060911]">
                    {openPopCount} ({openPopPct.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/70">
                <p className="text-xs font-semibold text-[#1832C7]">
                  Edad productiva
                </p>
                <p className="text-lg font-bold text-[#060911] mt-0.5">
                  100% ({nFiltered}/{nFiltered})
                </p>
                <p className="text-xs text-slate-500">
                  Población laboral activa
                </p>
              </div>
              <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/70">
                <p className="text-xs font-semibold text-[#060911] flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-[#0052FF]" /> Lugar de origen
                </p>
                <p className="text-lg font-bold text-[#060911] mt-0.5">
                  {nativePct.toFixed(1)}% Gto.
                </p>
                <p className="text-xs text-slate-500">
                  {migrantPct.toFixed(1)}% Veracruz y Jalisco
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
