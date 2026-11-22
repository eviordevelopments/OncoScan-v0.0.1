"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Heart,
  Scale,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import {
  CohortPatient,
  QuantStats,
  computeQuantStats,
} from "@/lib/impactCohortData";
import { AnimatedNumber } from "./AnimatedNumber";

interface ImpactQuantitativeChartsProps {
  filteredPatients: CohortPatient[];
  allPatients: CohortPatient[];
}

type BiometricVarKey = "bmi" | "glucose" | "pas" | "pad" | "waist" | "age";

export function ImpactQuantitativeCharts({
  filteredPatients,
  allPatients,
}: ImpactQuantitativeChartsProps) {
  const [selectedOgiveVar, setSelectedOgiveVar] =
    useState<BiometricVarKey>("bmi");

  const pts = filteredPatients.length > 0 ? filteredPatients : allPatients;
  const n = pts.length;

  const bmiStats = computeQuantStats(pts.map((p) => p.bmi));
  const waistStats = computeQuantStats(pts.map((p) => p.waist));
  const pasStats = computeQuantStats(pts.map((p) => p.pas));
  const padStats = computeQuantStats(pts.map((p) => p.pad));
  const gluStats = computeQuantStats(pts.map((p) => p.glucose));
  const ageStats = computeQuantStats(pts.map((p) => p.age));

  // Waist segregated by sex
  const womenPts = pts.filter((p) => p.sex === "M");
  const menPts = pts.filter((p) => p.sex === "H");
  const waistWomenStats = computeQuantStats(womenPts.map((p) => p.waist));
  const waistMenStats = computeQuantStats(menPts.map((p) => p.waist));
  const womenRiskWaist = womenPts.filter((p) => p.waist > 80).length;
  const menRiskWaist = menPts.filter((p) => p.waist > 90).length;

  // Glucose stratified by condition (Fasting vs Casual)
  const casualPts = pts.filter((p) => p.glucoseType === "Casual");
  const fastingPts = pts.filter((p) => p.glucoseType === "Ayuno");
  const casualGluStats = computeQuantStats(casualPts.map((p) => p.glucose));
  const fastingGluStats = computeQuantStats(fastingPts.map((p) => p.glucose));

  // Lipid subsample
  const tgVals = allPatients
    .map((p) => p.tg)
    .filter((v): v is number => v !== null);
  const cholVals = allPatients
    .map((p) => p.chol)
    .filter((v): v is number => v !== null);
  const hdlVals = allPatients
    .map((p) => p.hdl)
    .filter((v): v is number => v !== null);
  const ldlVals = allPatients
    .map((p) => p.ldl)
    .filter((v): v is number => v !== null);

  const tgStats = computeQuantStats(tgVals);
  const cholStats = computeQuantStats(cholVals);
  const hdlStats = computeQuantStats(hdlVals);
  const ldlStats = computeQuantStats(ldlVals);

  // Body weight categories (WHO)
  const whoCategories = [
    {
      label: "Peso saludable (18.5–24.9)",
      count: pts.filter((p) => p.bmi >= 18.5 && p.bmi < 25.0).length,
      color: "#10B981",
    },
    {
      label: "Sobrepeso (25.0–29.9)",
      count: pts.filter((p) => p.bmi >= 25.0 && p.bmi < 30.0).length,
      color: "#0052FF",
    },
    {
      label: "Obesidad Grado I (30.0–34.9)",
      count: pts.filter((p) => p.bmi >= 30.0 && p.bmi < 35.0).length,
      color: "#1832C7",
    },
    {
      label: "Obesidad Grado II (35.0–39.9)",
      count: pts.filter((p) => p.bmi >= 35.0 && p.bmi < 40.0).length,
      color: "#EF4444",
    },
    {
      label: "Bajo peso o Grado III",
      count: pts.filter((p) => p.bmi < 18.5 || p.bmi >= 40.0).length,
      color: "#94A3B8",
    },
  ];

  // Blood Pressure Stages
  const bpStages = [
    {
      label: "Presión normal (<120/80)",
      count: pts.filter((p) => p.bpStage === "Normal").length,
      color: "#10B981",
    },
    {
      label: "Presión elevada (120–129/<80)",
      count: pts.filter((p) => p.bpStage === "Elevada").length,
      color: "#0052FF",
    },
    {
      label: "Hipertensión Nivel 1 (130–139 / 80–89)",
      count: pts.filter((p) => p.bpStage === "Hipertensión Estadio 1").length,
      color: "#1832C7",
    },
    {
      label: "Hipertensión Nivel 2 (≥140 / ≥90)",
      count: pts.filter((p) => p.bpStage === "Hipertensión Estadio 2").length,
      color: "#EF4444",
    },
  ];

  // Variables configuration
  const boxVariables: {
    key: BiometricVarKey;
    title: string;
    unit: string;
    stats: QuantStats;
    cutoff: number;
    cutoffLabel: string;
    color: string;
  }[] = [
    {
      key: "bmi",
      title: "Índice de Masa Corporal (Peso / Estatura)",
      unit: "kg/m²",
      stats: bmiStats,
      cutoff: 25.0,
      cutoffLabel: "Límite peso saludable (25.0)",
      color: "#1832C7",
    },
    {
      key: "waist",
      title: "Medida de Cintura Abdominal",
      unit: "cm",
      stats: waistStats,
      cutoff: 90.0,
      cutoffLabel: "Límite recomendado (80 M / 90 H)",
      color: "#0052FF",
    },
    {
      key: "pas",
      title: "Presión Arterial Sistólica (Valor alto)",
      unit: "mmHg",
      stats: pasStats,
      cutoff: 130.0,
      cutoffLabel: "Inicio hipertensión (130)",
      color: "#EF4444",
    },
    {
      key: "pad",
      title: "Presión Arterial Diastólica (Valor bajo)",
      unit: "mmHg",
      stats: padStats,
      cutoff: 80.0,
      cutoffLabel: "Inicio hipertensión (80)",
      color: "#DC2626",
    },
    {
      key: "glucose",
      title: "Azúcar en Sangre (Glucosa capilar)",
      unit: "mg/dL",
      stats: gluStats,
      cutoff: 125.0,
      cutoffLabel: "Nivel de alerta (125)",
      color: "#1832C7",
    },
    {
      key: "age",
      title: "Edad de los Participantes",
      unit: "años",
      stats: ageStats,
      cutoff: 40.0,
      cutoffLabel: "40 años",
      color: "#060911",
    },
  ];

  const activeVarConfig =
    boxVariables.find((b) => b.key === selectedOgiveVar) || boxVariables[0];
  const rawActiveValues = pts
    .map((p) => p[selectedOgiveVar] as number)
    .sort((a, b) => a - b);

  // Build 7 intervals for Cumulative Progress & Frequency distribution
  const minVal = activeVarConfig.stats.min;
  const maxVal =
    activeVarConfig.stats.max > minVal ? activeVarConfig.stats.max : minVal + 10;
  const numBins = 7;
  const step = (maxVal - minVal) / numBins;

  const ogiveBins = Array.from({ length: numBins + 1 }, (_, i) => {
    const boundary = Number((minVal + i * step).toFixed(1));
    const cumCount =
      i === 0
        ? 0
        : i === numBins
        ? rawActiveValues.length
        : rawActiveValues.filter((v) => v <= boundary).length;
    const cumPct =
      rawActiveValues.length > 0
        ? Number(((cumCount / rawActiveValues.length) * 100).toFixed(1))
        : 0;
    const binFreq =
      i === 0
        ? 0
        : rawActiveValues.filter(
            (v) =>
              v > minVal + (i - 1) * step - (i === 1 ? 0.01 : 0) &&
              v <= boundary + (i === numBins ? 0.01 : 0)
          ).length;
    const freqPct =
      rawActiveValues.length > 0
        ? Number(((binFreq / rawActiveValues.length) * 100).toFixed(1))
        : 0;

    return {
      idx: i,
      boundary,
      cumCount,
      cumPct,
      binFreq,
      freqPct,
    };
  });

  // Helper for SVG Donut segments
  const buildDonutSegments = (
    items: { label: string; count: number; color: string }[],
    radius: number
  ) => {
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    return items.map((item) => {
      const pct = n > 0 ? item.count / n : 0;
      const dash = pct * circumference;
      const seg = {
        ...item,
        pct: (pct * 100).toFixed(1),
        dash,
        circumference,
        offset,
      };
      offset += dash;
      return seg;
    });
  };

  const whoDonut = buildDonutSegments(whoCategories, 58);
  const bpDonut = buildDonutSegments(bpStages, 58);

  return (
    <section
      id="indicadores-medidos"
      className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto"
    >
      {/* Clear Human Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#1832C7] font-semibold mb-2">
            03 · MEDICIONES FÍSICAS Y DE SANGRE EN LA JORNADA
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#060911]">
            Niveles medidos y distribución en la comunidad
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl">
          Visualiza de forma sencilla el valor mínimo, el promedio, el rango donde se
          concentra la mayoría de las personas y el límite saludable de cada medición.
        </p>
      </div>

      {/* ==================================================================== */}
      {/* 1. RANGOS MÍNIMOS, PROMEDIOS Y MÁXIMOS POR INDICADOR                 */}
      {/* ==================================================================== */}
      <div className="rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_16px_50px_rgba(6,9,17,0.05)] mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1832C7]">
              RANGOS Y CONCENTRACIÓN DE CADA MEDICIÓN
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#060911] mt-1">
              ¿En qué niveles se encuentra la comunidad evaluada? ({n} personas)
            </h3>
          </div>

          {/* Clean Legend Bar with Zero Overlap */}
          <div className="flex flex-wrap items-center gap-4 px-4 py-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-0.5 bg-slate-500 inline-block" />
              Mínimo a Máximo
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#1832C7]/20 border-2 border-[#1832C7] inline-block" />
              50% central de las personas
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444] inline-block" />
              Promedio
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-3.5 bg-[#060911] inline-block" />
              Valor central (Mediana)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boxVariables.map((bv) => {
            const st = bv.stats;
            const span = Math.max(st.max - st.min, 1);
            const padMin = st.min - span * 0.08;
            const padMax = st.max + span * 0.08;
            const totalRange = Math.max(padMax - padMin, 1);

            const toPct = (val: number) =>
              Math.min(Math.max(((val - padMin) / totalRange) * 100, 3), 97);

            const minX = toPct(st.min);
            const p10X = toPct(st.p10);
            const q1X = toPct(st.p25);
            const medX = toPct(st.p50);
            const meanX = toPct(st.mean);
            const q3X = toPct(st.p75);
            const p90X = toPct(st.p90);
            const maxX = toPct(st.max);
            const cutoffX =
              bv.cutoff >= padMin && bv.cutoff <= padMax
                ? toPct(bv.cutoff)
                : null;

            return (
              <div
                key={bv.key}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-5 flex flex-col justify-between"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-base font-semibold text-[#060911]">
                      {bv.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Promedio:{" "}
                      <strong className="text-[#1832C7]">
                        <AnimatedNumber
                          value={st.mean}
                          decimals={1}
                          suffix={` ${bv.unit}`}
                        />
                      </strong>{" "}
                      (±{st.std}) · Valor central:{" "}
                      <strong className="text-[#060911]">
                        {st.median} {bv.unit}
                      </strong>
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#1832C7] border border-slate-200">
                    Rango: {st.min} – {st.max} {bv.unit}
                  </span>
                </div>

                {/* Animated SVG Range Plot */}
                <div className="my-2">
                  <svg viewBox="0 0 400 78" className="w-full h-20 overflow-visible">
                    {/* Background Track */}
                    <line
                      x1="8"
                      y1="34"
                      x2="392"
                      y2="34"
                      stroke="#E2E8F0"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Clinical Reference Threshold Line */}
                    {cutoffX !== null && (
                      <g>
                        <line
                          x1={cutoffX * 4}
                          y1="6"
                          x2={cutoffX * 4}
                          y2="56"
                          stroke="#EF4444"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={Math.min(Math.max(cutoffX * 4, 65), 335)}
                          y="70"
                          textAnchor="middle"
                          fill="#DC2626"
                          fontSize="9.5"
                          fontWeight="600"
                        >
                          {bv.cutoffLabel}
                        </text>
                      </g>
                    )}

                    {/* Whisker Line (Min to Max) */}
                    <line
                      x1={minX * 4}
                      y1="34"
                      x2={maxX * 4}
                      y2="34"
                      stroke="#64748B"
                      strokeWidth="2"
                    />
                    <line
                      x1={minX * 4}
                      y1="22"
                      x2={minX * 4}
                      y2="46"
                      stroke="#060911"
                      strokeWidth="2"
                    />
                    <line
                      x1={maxX * 4}
                      y1="22"
                      x2={maxX * 4}
                      y2="46"
                      stroke="#060911"
                      strokeWidth="2"
                    />

                    {/* P10 & P90 ticks */}
                    <line
                      x1={p10X * 4}
                      y1="27"
                      x2={p10X * 4}
                      y2="41"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={p90X * 4}
                      y1="27"
                      x2={p90X * 4}
                      y2="41"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                    />

                    {/* Animated Central 50% Box (P25 to P75) */}
                    <motion.rect
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{
                        width: Math.max((q3X - q1X) * 4, 6),
                        opacity: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, ease: "easeOut" }}
                      x={q1X * 4}
                      y="16"
                      height="36"
                      rx="6"
                      fill={`${bv.color}22`}
                      stroke={bv.color}
                      strokeWidth="2"
                    />

                    {/* Median Line (P50) */}
                    <line
                      x1={medX * 4}
                      y1="14"
                      x2={medX * 4}
                      y2="54"
                      stroke="#060911"
                      strokeWidth="3"
                    />

                    {/* Mean Marker Dot */}
                    <circle
                      cx={meanX * 4}
                      cy="34"
                      r="5"
                      fill="#EF4444"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Clear 7-Point Reference Row */}
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] pt-2.5 border-t border-slate-200/80">
                  <div>
                    <span className="text-slate-400 font-medium block">Mín</span>
                    <span className="text-[#060911] font-semibold">{st.min}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">10%</span>
                    <span className="text-slate-700 font-semibold">{st.p10}</span>
                  </div>
                  <div>
                    <span className="text-[#1832C7] font-semibold block">25%</span>
                    <span className="text-[#1832C7] font-bold">{st.p25}</span>
                  </div>
                  <div className="bg-white rounded-lg py-0.5 border border-slate-200">
                    <span className="text-[#060911] font-bold block">50%</span>
                    <span className="text-[#060911] font-bold">{st.p50}</span>
                  </div>
                  <div>
                    <span className="text-[#1832C7] font-semibold block">75%</span>
                    <span className="text-[#1832C7] font-bold">{st.p75}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">90%</span>
                    <span className="text-slate-700 font-semibold">{st.p90}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Máx</span>
                    <span className="text-[#060911] font-semibold">{st.max}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. PROGRESIÓN ACUMULADA DE LA COMUNIDAD & TABLA DE NIVELES           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* LEFT 7 COLS: ANIMATED CUMULATIVE PROGRESS & FREQUENCY CURVE */}
        <div className="lg:col-span-7 rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_16px_50px_rgba(6,9,17,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#1832C7]/10 text-[#1832C7] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <h3 className="text-xl font-semibold text-[#060911]">
                  Proporción acumulada de personas por nivel
                </h3>
              </div>

              {/* Variable Selector */}
              <div className="inline-flex flex-wrap items-center rounded-full bg-slate-100 p-1 border border-slate-200">
                {(
                  [
                    { k: "bmi", label: "Peso / IMC" },
                    { k: "glucose", label: "Azúcar" },
                    { k: "pas", label: "Presión Sistólica" },
                    { k: "pad", label: "Presión Diastólica" },
                    { k: "waist", label: "Cintura" },
                  ] as { k: BiometricVarKey; label: string }[]
                ).map((item) => (
                  <button
                    key={item.k}
                    type="button"
                    onClick={() => setSelectedOgiveVar(item.k)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedOgiveVar === item.k
                        ? "bg-[#1832C7] text-white shadow-sm"
                        : "text-slate-600 hover:text-[#060911]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              Muestra cómo se acumula el porcentaje de participantes conforme aumenta el
              valor de <strong className="text-[#060911]">{activeVarConfig.title}</strong>,
              junto con la proporción de personas en cada tramo.
            </p>
          </div>

          {/* Animated SVG Cumulative Curve & Frequency Polygon */}
          <div className="w-full my-2">
            <svg viewBox="0 0 560 275" className="w-full h-auto overflow-visible">
              {/* Horizontal Grid Lines (0%, 25%, 50%, 75%, 100%) */}
              {[0, 25, 50, 75, 100].map((pct) => {
                const y = 225 - (pct / 100) * 180;
                return (
                  <g key={pct}>
                    <line
                      x1="48"
                      y1={y}
                      x2="532"
                      y2={y}
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray={pct === 50 ? "4 3" : undefined}
                    />
                    <text
                      x="40"
                      y={y + 4}
                      textAnchor="end"
                      fill="#64748B"
                      fontSize="10.5"
                      fontWeight="600"
                    >
                      {pct}%
                    </text>
                  </g>
                );
              })}

              {/* Frequency Polygon Area & Dashed Line */}
              {(() => {
                const polyPts = ogiveBins.map((b, idx) => {
                  const x = 48 + (idx / numBins) * 484;
                  const y = 225 - (b.freqPct / 100) * 180;
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                });
                const areaPts = `48,225 ${polyPts.join(" ")} 532,225`;
                return (
                  <g>
                    <polygon
                      points={areaPts}
                      fill="rgba(239, 68, 68, 0.10)"
                    />
                    <polyline
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.2"
                      strokeDasharray="5 4"
                      points={polyPts.join(" ")}
                    />
                  </g>
                );
              })()}

              {/* Animated Cumulative Curve (0% -> 100%) */}
              {(() => {
                const ogivePts = ogiveBins.map((b, idx) => {
                  const x = 48 + (idx / numBins) * 484;
                  const y = 225 - (b.cumPct / 100) * 180;
                  return { x, y, ...b };
                });
                const pathD = ogivePts
                  .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
                  .join(" ");

                return (
                  <g>
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="#1832C7"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    {ogivePts.map((pt) => (
                      <g key={pt.idx}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5"
                          fill="#1832C7"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 11}
                          textAnchor="middle"
                          fill="#1832C7"
                          fontSize="10"
                          fontWeight="700"
                        >
                          {pt.cumPct}%
                        </text>
                        <text
                          x={pt.x}
                          y="248"
                          textAnchor="middle"
                          fill="#334155"
                          fontSize="10.5"
                          fontWeight="600"
                        >
                          {pt.boundary}
                        </text>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Clean Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs font-semibold">
            <span className="inline-flex items-center gap-2 text-[#1832C7]">
              <span className="w-3 h-3 rounded-full bg-[#1832C7]" />
              Porcentaje acumulado de personas (0% a 100%)
            </span>
            <span className="inline-flex items-center gap-2 text-[#EF4444]">
              <span className="w-4 h-0.5 border-b-2 border-dashed border-[#EF4444]" />
              Personas dentro de cada tramo (%)
            </span>
          </div>
        </div>

        {/* RIGHT 5 COLS: TABLA CLARA DE CORTES POBLACIONALES (10% A 90%) */}
        <div className="lg:col-span-5 rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_16px_50px_rgba(6,9,17,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1832C7]">
                PUNTOS DE CORTE DE LA COMUNIDAD
              </span>
              <SlidersHorizontal className="w-4 h-4 text-[#1832C7]" />
            </div>
            <h3 className="text-xl font-semibold text-[#060911] mb-2">
              Niveles del 10% más bajo al 90% más alto
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Permite ubicar rápidamente cualquier medición individual frente al resto
              de los habitantes evaluados en León de los Aldama.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-[11px] text-slate-500 uppercase font-semibold">
                    <th className="py-2.5 pr-2">Medición</th>
                    <th className="py-2.5 px-1.5 text-center">10%</th>
                    <th className="py-2.5 px-1.5 text-center text-[#1832C7]">
                      25%
                    </th>
                    <th className="py-2.5 px-1.5 text-center text-[#060911] font-bold">
                      50% (Mitad)
                    </th>
                    <th className="py-2.5 px-1.5 text-center text-[#1832C7]">
                      75%
                    </th>
                    <th className="py-2.5 pl-1.5 text-center text-[#DC2626]">
                      90%
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {boxVariables.map((bv) => (
                    <tr key={bv.key} className="hover:bg-slate-50">
                      <td className="py-3 pr-2 font-semibold text-[#060911]">
                        {bv.title.split("(")[0].trim()}
                        <span className="block text-[10px] font-normal text-slate-400">
                          ({bv.unit})
                        </span>
                      </td>
                      <td className="py-3 px-1.5 text-center text-slate-600">
                        {bv.stats.p10}
                      </td>
                      <td className="py-3 px-1.5 text-center text-[#1832C7] font-semibold">
                        {bv.stats.p25}
                      </td>
                      <td className="py-3 px-1.5 text-center text-[#060911] font-bold bg-slate-100/80">
                        {bv.stats.p50}
                      </td>
                      <td className="py-3 px-1.5 text-center text-[#1832C7] font-semibold">
                        {bv.stats.p75}
                      </td>
                      <td className="py-3 pl-1.5 text-center text-[#DC2626] font-bold">
                        {bv.stats.p90}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#1832C7]/[0.04]">
                    <td className="py-2.5 pr-2 font-semibold text-[#1832C7]">
                      Cintura Hombres
                      <span className="block text-[10px] font-normal text-slate-500">
                        (cm · Límite 90)
                      </span>
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-slate-600">
                      {waistMenStats.p10}
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-[#1832C7] font-semibold">
                      {waistMenStats.p25}
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-[#060911] font-bold">
                      {waistMenStats.p50}
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-[#1832C7] font-semibold">
                      {waistMenStats.p75}
                    </td>
                    <td className="py-2.5 pl-1.5 text-center text-[#DC2626] font-bold">
                      {waistMenStats.p90}
                    </td>
                  </tr>
                  <tr className="bg-red-50/60">
                    <td className="py-2.5 pr-2 font-semibold text-[#DC2626]">
                      Cintura Mujeres
                      <span className="block text-[10px] font-normal text-slate-500">
                        (cm · Límite 80)
                      </span>
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-slate-600">
                      {waistWomenStats.p10}
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-[#1832C7] font-semibold">
                      {waistWomenStats.p25}
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-[#060911] font-bold">
                      {waistWomenStats.p50}
                    </td>
                    <td className="py-2.5 px-1.5 text-center text-[#1832C7] font-semibold">
                      {waistWomenStats.p75}
                    </td>
                    <td className="py-2.5 pl-1.5 text-center text-[#DC2626] font-bold">
                      {waistWomenStats.p90}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1832C7]/[0.06] border border-[#1832C7]/20 p-3.5 text-xs text-slate-700 leading-relaxed">
            <strong className="text-[#1832C7]">Dato clave:</strong> Incluso el 10% con
            menor peso de la muestra ({bmiStats.p10} kg/m²) supera el límite de peso
            saludable (25.0 kg/m²), lo que confirma que 9 de cada 10 personas requieren
            apoyo nutricional.
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. CUATRO TARJETAS CLÍNICAS ANIMADAS CON LEYENDAS CLARAS             */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 3.1: Balance de Peso Corporal */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[28px] bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Balance de peso corporal
              </span>
              <span className="w-8 h-8 rounded-xl bg-[#1832C7]/10 text-[#1832C7] flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center justify-center my-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                  <circle
                    cx="75"
                    cy="75"
                    r="58"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="15"
                  />
                  {whoDonut.map((seg, i) =>
                    seg.count > 0 ? (
                      <motion.circle
                        key={seg.label}
                        cx="75"
                        cy="75"
                        r="58"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="15"
                        initial={{ strokeDasharray: `0 ${seg.circumference}` }}
                        whileInView={{
                          strokeDasharray: `${seg.dash} ${seg.circumference}`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: i * 0.12,
                          ease: "easeOut",
                        }}
                        strokeDashoffset={-seg.offset}
                      />
                    ) : null
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-[#060911]">
                    <AnimatedNumber value={bmiStats.mean} decimals={1} />
                  </span>
                  <span className="text-[10px] font-semibold text-[#1832C7]">
                    kg/m² Promedio
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
            {whoDonut.map((seg) => (
              <div
                key={seg.label}
                className="flex items-center justify-between gap-2"
              >
                <span className="inline-flex items-center gap-2 text-slate-700 font-medium">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span>{seg.label}</span>
                </span>
                <span className="font-bold text-[#060911] shrink-0">
                  {seg.count} ({seg.pct}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 3.2: Medida de Cintura por Sexo */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[28px] bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Medida de cintura abdominal
              </span>
              <span className="w-8 h-8 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-[#060911]">
                <AnimatedNumber value={waistStats.mean} decimals={1} suffix=" cm" />
              </span>
              <span className="text-xs font-semibold text-[#1832C7]">
                promedio
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              El{" "}
              <strong className="text-[#060911]">
                {n > 0
                  ? (((womenRiskWaist + menRiskWaist) / n) * 100).toFixed(1)
                  : "0.0"}
                % ({womenRiskWaist + menRiskWaist} de {n})
              </strong>{" "}
              supera la medida saludable de cintura recomendada.
            </p>

            <div className="space-y-3">
              <div className="rounded-2xl bg-red-50/70 border border-red-200/70 p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#DC2626]">
                    Mujeres (Límite &gt; 80 cm)
                  </span>
                  <span className="font-bold text-[#060911]">
                    {womenPts.length > 0
                      ? ((womenRiskWaist / womenPts.length) * 100).toFixed(1)
                      : "0.0"}
                    % ({womenRiskWaist}/{womenPts.length})
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Promedio: <strong>{waistWomenStats.mean} cm</strong> (Rango{" "}
                  {waistWomenStats.min}–{waistWomenStats.max} cm)
                </p>
              </div>

              <div className="rounded-2xl bg-[#1832C7]/[0.05] border border-[#1832C7]/20 p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#1832C7]">
                    Hombres (Límite &gt; 90 cm)
                  </span>
                  <span className="font-bold text-[#060911]">
                    {menPts.length > 0
                      ? ((menRiskWaist / menPts.length) * 100).toFixed(1)
                      : "0.0"}
                    % ({menRiskWaist}/{menPts.length})
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Promedio: <strong>{waistMenStats.mean} cm</strong> (Rango{" "}
                  {waistMenStats.min}–{waistMenStats.max} cm)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
            Solo 2 participantes dentro de la medida abdominal ideal.
          </div>
        </motion.div>

        {/* Card 3.3: Niveles de Presión Arterial */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[28px] bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Niveles de presión arterial
              </span>
              <span className="w-8 h-8 rounded-xl bg-red-50 text-[#EF4444] flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center justify-center my-3">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                  <circle
                    cx="75"
                    cy="75"
                    r="58"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="15"
                  />
                  {bpDonut.map((seg, i) =>
                    seg.count > 0 ? (
                      <motion.circle
                        key={seg.label}
                        cx="75"
                        cy="75"
                        r="58"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="15"
                        initial={{ strokeDasharray: `0 ${seg.circumference}` }}
                        whileInView={{
                          strokeDasharray: `${seg.dash} ${seg.circumference}`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: i * 0.12,
                          ease: "easeOut",
                        }}
                        strokeDashoffset={-seg.offset}
                      />
                    ) : null
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-bold text-[#060911]">
                    {Math.round(pasStats.mean)}/{Math.round(padStats.mean)}
                  </span>
                  <span className="text-[10px] font-semibold text-[#EF4444]">
                    mmHg Promedio
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
            {bpDonut.map((seg) => (
              <div
                key={seg.label}
                className="flex items-center justify-between gap-2"
              >
                <span className="inline-flex items-center gap-2 text-slate-700 font-medium">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span>{seg.label.split("(")[0]}</span>
                </span>
                <span className="font-bold text-[#060911] shrink-0">
                  {seg.count} ({seg.pct}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 3.4: Azúcar en Sangre y Estudios de Colesterol */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[28px] bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-500">
                Azúcar y grasas en sangre
              </span>
              <span className="w-8 h-8 rounded-xl bg-[#1832C7]/10 text-[#1832C7] flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </span>
            </div>

            {/* Glucose Split */}
            <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-3.5 mb-3">
              <p className="text-[11px] font-bold text-[#1832C7] mb-1.5">
                Glucosa capilar según toma
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">
                    Después de comer ({casualPts.length})
                  </span>
                  <span className="text-[#060911] font-bold text-sm">
                    {casualGluStats.mean} mg/dL
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Rango {casualGluStats.min}–{casualGluStats.max}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">
                    En ayuno ({fastingPts.length})
                  </span>
                  <span className="text-emerald-700 font-bold text-sm">
                    {fastingGluStats.mean || 74} mg/dL
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Nivel saludable
                  </span>
                </div>
              </div>
            </div>

            {/* Lipid Subsample */}
            <div className="rounded-2xl bg-[#1832C7]/[0.04] border border-[#1832C7]/15 p-3.5">
              <p className="text-[11px] font-bold text-[#060911] mb-2">
                Estudio de colesterol y triglicéridos (3 evaluados)
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    Triglicéridos
                  </span>
                  <span className="text-[#060911] font-bold">
                    {tgStats.mean} mg/dL
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    (20 a 180)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    Colesterol Total
                  </span>
                  <span className="text-[#DC2626] font-bold">
                    {cholStats.mean} mg/dL
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    (Alto &gt;200)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    Colesterol HDL (Bueno)
                  </span>
                  <span className="text-emerald-700 font-bold">
                    {hdlStats.mean} mg/dL
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    (63 a 76)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">
                    Colesterol LDL (Malo)
                  </span>
                  <span className="text-[#1832C7] font-bold">
                    {ldlStats.mean} mg/dL
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    (68 a 127)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
            23 de 26 personas nunca se habían hecho un estudio de colesterol.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
