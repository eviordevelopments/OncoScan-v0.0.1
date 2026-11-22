"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  HeartPulse,
  ShieldAlert,
  Users,
} from "lucide-react";
import {
  CohortPatient,
  getPatientRiskFactorCount,
  hasCentralAdiposityRisk,
} from "@/lib/impactCohortData";
import { AnimatedNumber } from "./AnimatedNumber";

interface ImpactSpiderAndDiseaseMatrixProps {
  filteredPatients: CohortPatient[];
  allPatients: CohortPatient[];
}

interface DiseaseMatrixRow {
  id: string;
  disease: string;
  plainDescription: string;
  general: {
    total: number;
    positiveTotal: number;
    newSilent: number;
    mixedBoth: number;
    priorControlled: number;
    negative: number;
    untestedNA: number;
  };
  men: {
    total: number;
    positiveTotal: number;
    newSilent: number;
    mixedBoth: number;
    priorControlled: number;
    negative: number;
    untestedNA: number;
  };
  women: {
    total: number;
    positiveTotal: number;
    newSilent: number;
    mixedBoth: number;
    priorControlled: number;
    negative: number;
    untestedNA: number;
  };
}

export function ImpactSpiderAndDiseaseMatrix({
  filteredPatients,
  allPatients,
}: ImpactSpiderAndDiseaseMatrixProps) {
  const [showGeneralPoly, setShowGeneralPoly] = useState(true);
  const [showMenPoly, setShowMenPoly] = useState(true);
  const [showWomenPoly, setShowWomenPoly] = useState(true);
  const [selectedDiseaseTab, setSelectedDiseaseTab] = useState<
    "ALL" | "H" | "M"
  >("ALL");

  // Compute the 6 community health dimensions (0 - 100%)
  const computeHealthDimensions = (pts: CohortPatient[]) => {
    const total = pts.length || 1;
    const overweightObesity =
      (pts.filter((p) => p.bmi >= 25.0).length / total) * 100;
    const centralAdiposity =
      (pts.filter((p) => hasCentralAdiposityRisk(p)).length / total) * 100;
    const hypertensionLoad =
      (pts.filter((p) => p.repHta === "Sí" || p.pas >= 130 || p.pad >= 80)
        .length /
        total) *
      100;
    const glycemicAlteration =
      (pts.filter((p) => p.repDiabetes === "Sí" || p.glucose >= 110).length /
        total) *
      100;
    const undiagnosedGap =
      (pts.filter((p) => p.currDx === "No").length / total) * 100;
    const multimorbidityLoad =
      (pts.filter((p) => getPatientRiskFactorCount(p) >= 2).length / total) *
      100;

    return [
      {
        axis: "Sobrepeso u obesidad",
        short: "Sobrepeso / Obesidad",
        val: Number(overweightObesity.toFixed(1)),
        target: 25,
      },
      {
        axis: "Medida de cintura elevada",
        short: "Cintura de riesgo",
        val: Number(centralAdiposity.toFixed(1)),
        target: 20,
      },
      {
        axis: "Presión arterial alta",
        short: "Presión alta",
        val: Number(hypertensionLoad.toFixed(1)),
        target: 20,
      },
      {
        axis: "Azúcar elevada o diabetes",
        short: "Azúcar / Diabetes",
        val: Number(glycemicAlteration.toFixed(1)),
        target: 15,
      },
      {
        axis: "Sin diagnóstico previo",
        short: "No sabían su condición",
        val: Number(undiagnosedGap.toFixed(1)),
        target: 10,
      },
      {
        axis: "2 o más condiciones juntas",
        short: "2 o más riesgos",
        val: Number(multimorbidityLoad.toFixed(1)),
        target: 15,
      },
    ];
  };

  const menPts = allPatients.filter((p) => p.sex === "H");
  const womenPts = allPatients.filter((p) => p.sex === "M");

  const axesGeneral = computeHealthDimensions(filteredPatients);
  const axesMen = computeHealthDimensions(menPts);
  const axesWomen = computeHealthDimensions(womenPts);

  // Generous Radar SVG Geometry so full criterion names and large percentages NEVER overlap the diagram
  const cx = 360;
  const cy = 245;
  const maxR = 124;
  const numAxes = 6;

  const getPoint = (axisIdx: number, pct: number) => {
    const angle = (Math.PI * 2 * axisIdx) / numAxes - Math.PI / 2;
    const r = (Math.min(Math.max(pct, 0), 150) / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const buildPolygonPoints = (vals: number[]) =>
    vals
      .map((v, i) => {
        const pt = getPoint(i, v);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(" ");

  // Compute exact detection breakdown:
  // Only 1 patient (Paciente 12, Esaú Álvarez) had a prior known diagnosis ("Diabetes Confirmada", currDx === "Sí").
  // All other 25 patients had currDx === "No" and prevDx === "N/A"!
  const computeConditionBreakdown = (
    pts: CohortPatient[],
    type:
      | "obesidad_clinica"
      | "sobrepeso_obesidad"
      | "hipertension"
      | "diabetes_glucemia"
      | "dislipidemia"
  ) => {
    let newSilent = 0;
    let mixedBoth = 0;
    let priorControlled = 0;
    let negative = 0;
    let untestedNA = 0;

    for (const p of pts) {
      if (type === "obesidad_clinica") {
        const colI = p.repObesity === "Sí";
        const bmi30 = p.bmi >= 30.0;
        if (colI && bmi30) newSilent++;
        else if (!colI && bmi30) mixedBoth++;
        else negative++;
      } else if (type === "sobrepeso_obesidad") {
        const colI = p.repObesity === "Sí";
        const bmi25 = p.bmi >= 25.0;
        if (colI && bmi25) newSilent++;
        else if (!colI && bmi25) mixedBoth++;
        else negative++;
      } else if (type === "hipertension") {
        const colJ = p.repHta === "Sí";
        const bpHigh = p.pas >= 130 || p.pad >= 80;
        if (colJ) newSilent++;
        else if (!colJ && bpHigh) mixedBoth++;
        else negative++;
      } else if (type === "diabetes_glucemia") {
        const hasPriorFormalDM =
          p.currDx === "Sí" && p.prevDx.toLowerCase().includes("diabetes");
        const colL = p.repDiabetes === "Sí";
        const gluAlert = p.glucose >= 125;
        if (hasPriorFormalDM) priorControlled++;
        else if (colL) newSilent++;
        else if (gluAlert) mixedBoth++;
        else negative++;
      } else if (type === "dislipidemia") {
        if (p.repDyslipidemia === "Sí") newSilent++;
        else if (p.repDyslipidemia === "No") negative++;
        else untestedNA++;
      }
    }

    const positiveTotal = newSilent + mixedBoth + priorControlled;
    return {
      total: pts.length,
      positiveTotal,
      newSilent,
      mixedBoth,
      priorControlled,
      negative,
      untestedNA,
    };
  };

  const diseaseRows: DiseaseMatrixRow[] = [
    {
      id: "sobrepeso_obesidad",
      disease: "Sobrepeso y obesidad en conjunto",
      plainDescription: "Personas con índice de masa corporal de 25.0 kg/m² o mayor",
      general: computeConditionBreakdown(allPatients, "sobrepeso_obesidad"),
      men: computeConditionBreakdown(menPts, "sobrepeso_obesidad"),
      women: computeConditionBreakdown(womenPts, "sobrepeso_obesidad"),
    },
    {
      id: "obesidad_clinica",
      disease: "Obesidad (Grados I y II)",
      plainDescription: "Personas con índice de masa corporal de 30.0 kg/m² o mayor",
      general: computeConditionBreakdown(allPatients, "obesidad_clinica"),
      men: computeConditionBreakdown(menPts, "obesidad_clinica"),
      women: computeConditionBreakdown(womenPts, "obesidad_clinica"),
    },
    {
      id: "hipertension",
      disease: "Presión arterial alta (Hipertensión)",
      plainDescription: "Personas con presión de 130/80 mmHg o superior en la jornada",
      general: computeConditionBreakdown(allPatients, "hipertension"),
      men: computeConditionBreakdown(menPts, "hipertension"),
      women: computeConditionBreakdown(womenPts, "hipertension"),
    },
    {
      id: "diabetes_glucemia",
      disease: "Diabetes y azúcar elevada en sangre",
      plainDescription: "Detección de diabetes o glucosa capilar de 125 mg/dL o mayor",
      general: computeConditionBreakdown(allPatients, "diabetes_glucemia"),
      men: computeConditionBreakdown(menPts, "diabetes_glucemia"),
      women: computeConditionBreakdown(womenPts, "diabetes_glucemia"),
    },
    {
      id: "dislipidemia",
      disease: "Colesterol y triglicéridos elevados",
      plainDescription: "Personas evaluadas con estudio de grasas en sangre en la jornada",
      general: computeConditionBreakdown(allPatients, "dislipidemia"),
      men: computeConditionBreakdown(menPts, "dislipidemia"),
      women: computeConditionBreakdown(womenPts, "dislipidemia"),
    },
  ];

  return (
    <section
      id="panorama-y-detecciones"
      className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto"
    >
      {/* Clear Human Section Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#1832C7] font-semibold mb-2">
            02 · RESULTADOS PRINCIPALES DE SALUD
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#060911]">
            Panorama de salud y nuevos casos detectados
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl">
          Comparamos los principales indicadores de salud entre hombres y mujeres de la
          comunidad y desglosamos cuántos casos fueron{" "}
          <strong className="text-[#1832C7]">descubiertos por primera vez en la jornada</strong>.
        </p>
      </div>

      {/* 2-COLUMN ULTRAHUMAN LIGHT BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* LEFT 6 COLS: COMMUNITY HEALTH FOOTPRINT (6-Axis Interactive Comparison) */}
        <motion.div
          whileHover={{ y: -3 }}
          className="lg:col-span-6 rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_16px_50px_rgba(6,9,17,0.05)]"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#1832C7]/10 text-[#1832C7] flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </span>
                <h3 className="text-xl font-semibold text-[#060911]">
                  Huella de salud comunitaria por sexo
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1832C7]/10 text-[#1832C7]">
                6 indicadores clave
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              Observa cómo la presión arterial alta predomina en los{" "}
              <strong className="text-[#1832C7]">hombres (78.6%)</strong>, mientras que
              el azúcar elevada predomina en las{" "}
              <strong className="text-[#EF4444]">mujeres (66.7%)</strong>.
            </p>

            {/* Clear Interactive Legend & Toggle Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4 p-2 rounded-2xl bg-[#F8FAFC] border border-slate-200/70">
              <button
                type="button"
                onClick={() => setShowGeneralPoly(!showGeneralPoly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  showGeneralPoly
                    ? "bg-[#060911] text-white shadow-sm"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#060911] ring-2 ring-white" />
                Comunidad ({filteredPatients.length})
              </button>

              <button
                type="button"
                onClick={() => setShowMenPoly(!showMenPoly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  showMenPoly
                    ? "bg-[#1832C7] text-white shadow-sm"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF] ring-2 ring-white" />
                Hombres (14)
              </button>

              <button
                type="button"
                onClick={() => setShowWomenPoly(!showWomenPoly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  showWomenPoly
                    ? "bg-[#EF4444] text-white shadow-sm"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] ring-2 ring-white" />
                Mujeres (12)
              </button>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ml-auto">
                <span className="w-3 h-0.5 border-b-2 border-dashed border-emerald-600 inline-block" />
                Nivel saludable
              </span>
            </div>
          </div>

          {/* Animated SVG Multi-Axis Comparison Chart with Full Criterion Names & Enlarged Non-Overlapping Percentages */}
          <div className="relative w-full flex items-center justify-center my-4">
            <svg
              viewBox="0 0 720 490"
              className="w-full h-auto overflow-visible"
            >
              {/* Concentric Hexagonal Rings (20%, 40%, 60%, 80%, 100%) */}
              {[20, 40, 60, 80, 100].map((level) => (
                <g key={level}>
                  <polygon
                    points={buildPolygonPoints(Array(numAxes).fill(level))}
                    fill={level === 100 ? "rgba(241,245,249,0.55)" : "none"}
                    stroke="#CBD5E1"
                    strokeWidth={level === 100 ? "1.5" : "1"}
                    strokeDasharray={level === 60 ? "3 3" : undefined}
                  />
                  <text
                    x={cx + 6}
                    y={cy - (level / 100) * maxR + 11}
                    fill="#94A3B8"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {level}%
                  </text>
                </g>
              ))}

              {/* Radial Spokes */}
              {axesGeneral.map((ax, i) => {
                const outer = getPoint(i, 100);
                return (
                  <line
                    key={ax.axis}
                    x1={cx}
                    y1={cy}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#CBD5E1"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Healthy Reference Polygon (Green Inner Target) */}
              <polygon
                points={buildPolygonPoints(axesGeneral.map((a) => a.target))}
                fill="rgba(16, 185, 129, 0.12)"
                stroke="#059669"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />

              {/* Men Polygon (OncoScan Royal Blue) */}
              {showMenPoly && (
                <motion.polygon
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  points={buildPolygonPoints(axesMen.map((a) => a.val))}
                  fill="rgba(0, 82, 255, 0.14)"
                  stroke="#0052FF"
                  strokeWidth="2.2"
                />
              )}

              {/* Women Polygon (OncoScan Crimson Red) */}
              {showWomenPoly && (
                <motion.polygon
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  points={buildPolygonPoints(axesWomen.map((a) => a.val))}
                  fill="rgba(239, 68, 68, 0.14)"
                  stroke="#EF4444"
                  strokeWidth="2.2"
                />
              )}

              {/* Active Community Polygon (Obsidian Ink Highlight) */}
              {showGeneralPoly && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.35 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  <polygon
                    points={buildPolygonPoints(axesGeneral.map((a) => a.val))}
                    fill="rgba(24, 50, 199, 0.12)"
                    stroke="#060911"
                    strokeWidth="2.8"
                  />
                  {axesGeneral.map((a, i) => {
                    const pt = getPoint(i, a.val);
                    return (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r="5.5"
                        fill="#1832C7"
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                      />
                    );
                  })}
                </motion.g>
              )}

              {/* External Callout Badges: Complete Criterion Name + Large Percentage Outside Diagram */}
              {axesGeneral.map((ax, i) => {
                // Position labels well outside the 100% ring so there is ZERO overlap with the polygon
                const posMap: {
                  x: number;
                  y: number;
                  anchor: "middle" | "start" | "end";
                }[] = [
                  { x: cx, y: cy - maxR - 46, anchor: "middle" }, // Top (0)
                  { x: cx + maxR + 28, y: cy - maxR * 0.52, anchor: "start" }, // Top-Right (1)
                  { x: cx + maxR + 28, y: cy + maxR * 0.52, anchor: "start" }, // Bottom-Right (2)
                  { x: cx, y: cy + maxR + 52, anchor: "middle" }, // Bottom (3)
                  { x: cx - maxR - 28, y: cy + maxR * 0.52, anchor: "end" }, // Bottom-Left (4)
                  { x: cx - maxR - 28, y: cy - maxR * 0.52, anchor: "end" }, // Top-Left (5)
                ];
                const pos = posMap[i];

                return (
                  <g key={`label-${ax.axis}`}>
                    <text
                      x={pos.x}
                      y={pos.y - 6}
                      textAnchor={pos.anchor}
                      fill="#1832C7"
                      fontSize="21"
                      fontWeight="800"
                    >
                      {ax.val}%
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 15}
                      textAnchor={pos.anchor}
                      fill="#060911"
                      fontSize="13.5"
                      fontWeight="700"
                    >
                      {ax.axis}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-xs">
            {axesGeneral.map((ax, idx) => (
              <div
                key={ax.axis}
                className="rounded-2xl bg-[#F8FAFC] border border-slate-200/70 p-3"
              >
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {ax.axis}
                </p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-bold text-[#060911]">
                    <AnimatedNumber value={ax.val} decimals={1} suffix="%" />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    H:{axesMen[idx].val}% · M:{axesWomen[idx].val}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT 6 COLS: NEW DETECTIONS VS PRIOR DIAGNOSIS BY CONDITION */}
        <motion.div
          whileHover={{ y: -3 }}
          className="lg:col-span-6 rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_16px_50px_rgba(6,9,17,0.05)]"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-red-50 text-[#EF4444] flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </span>
                <h3 className="text-xl font-semibold text-[#060911]">
                  Nuevos casos detectados por condición
                </h3>
              </div>

              {/* Filter by Sex for Disease Bars */}
              <div className="inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200">
                {(
                  [
                    { k: "ALL", label: "Todos (26)" },
                    { k: "H", label: "Hombres (14)" },
                    { k: "M", label: "Mujeres (12)" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.k}
                    type="button"
                    onClick={() => setSelectedDiseaseTab(t.k)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedDiseaseTab === t.k
                        ? "bg-[#1832C7] text-white shadow-sm"
                        : "text-slate-600 hover:text-[#060911]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Dado que <strong className="text-[#060911]">solo 1 persona tenía diagnóstico previo conocido (en Diabetes)</strong>,
              casi la totalidad de los casos positivos fueron{" "}
              <strong className="text-[#1832C7]">descubiertos por primera vez en esta jornada</strong>.
            </p>

            {/* Clear Color Key Legend Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-5 p-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 text-[11px] font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1832C7]" />
                Nueva detección directa
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                Hallazgo en medición física
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Diagnóstico previo (1)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Saludable / Negativo
              </span>
            </div>

            {/* Animated Stacked Bars per Disease */}
            <div className="space-y-4">
              {diseaseRows.map((row) => {
                const d =
                  selectedDiseaseTab === "ALL"
                    ? row.general
                    : selectedDiseaseTab === "H"
                    ? row.men
                    : row.women;
                const total = d.total || 1;
                const posPct = (d.positiveTotal / total) * 100;
                const newPct = (d.newSilent / total) * 100;
                const mixPct = (d.mixedBoth / total) * 100;
                const ctrlPct = (d.priorControlled / total) * 100;
                const negPct = (d.negative / total) * 100;
                const naPct = (d.untestedNA / total) * 100;

                return (
                  <div
                    key={row.id}
                    className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#060911]">
                          {row.disease}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {row.plainDescription}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1832C7]">
                          {d.positiveTotal} de {d.total} (
                          <AnimatedNumber value={posPct} decimals={1} suffix="%" />)
                        </span>
                      </div>
                    </div>

                    {/* Animated Multi-segment Horizontal Stacked Bar */}
                    <div className="w-full h-3.5 rounded-full bg-slate-200/80 overflow-hidden flex my-2.5">
                      {newPct > 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${newPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="h-full bg-[#1832C7]"
                        />
                      )}
                      {mixPct > 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${mixPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
                          className="h-full bg-[#EF4444]"
                        />
                      )}
                      {ctrlPct > 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${ctrlPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                          className="h-full bg-amber-500"
                        />
                      )}
                      {negPct > 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${negPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                          className="h-full bg-emerald-500"
                        />
                      )}
                      {naPct > 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${naPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                          className="h-full bg-slate-300"
                        />
                      )}
                    </div>

                    {/* Clear Breakdown Counts Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium pt-1">
                      <span className="text-[#1832C7]">
                        ● Nuevos detectados: <strong>{d.newSilent}</strong>
                      </span>
                      {d.mixedBoth > 0 && (
                        <span className="text-[#DC2626]">
                          ● Medición física: <strong>+{d.mixedBoth}</strong>
                        </span>
                      )}
                      {d.priorControlled > 0 && (
                        <span className="text-amber-700">
                          ● Ya diagnosticado antes: <strong>{d.priorControlled}</strong>
                        </span>
                      )}
                      <span className="text-emerald-700">
                        ● Negativos (Sanos): <strong>{d.negative}</strong>
                      </span>
                      {d.untestedNA > 0 && (
                        <span className="text-slate-500">
                          ● Sin estudio previo: <strong>{d.untestedNA}</strong> (
                          {naPct.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================================================================== */}
      {/* CLEAR COMPARATIVE TABLE: POSITIVOS Y NEGATIVOS POR SEXO Y GENERAL    */}
      {/* ==================================================================== */}
      <div className="rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_16px_50px_rgba(6,9,17,0.05)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1832C7]">
              DESGLOSE COMPLETO POR CONDICIÓN Y SEXO
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#060911] mt-1">
              Comparativa de casos positivos, nuevos detectados y negativos (26 personas)
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-xs font-semibold uppercase text-slate-500">
                <th className="py-3.5 pr-4">Condición de salud</th>
                <th className="py-3.5 px-3 text-center bg-slate-50 text-[#060911]">
                  Total Positivos (de 26)
                </th>
                <th className="py-3.5 px-3 text-center text-[#1832C7]">
                  Detectados en jornada (Sin Dx Previo)
                </th>
                <th className="py-3.5 px-3 text-center text-[#DC2626]">
                  Medición física / Dx Previo
                </th>
                <th className="py-3.5 px-3 text-center text-emerald-700">
                  Negativos (Sin la condición)
                </th>
                <th className="py-3.5 px-3 text-center bg-[#1832C7]/[0.05] text-[#1832C7]">
                  Hombres (+ / -) [14]
                </th>
                <th className="py-3.5 pl-3 text-center bg-red-50/70 text-[#DC2626]">
                  Mujeres (+ / -) [12]
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {diseaseRows.map((r) => {
                const g = r.general;
                const m = r.men;
                const w = r.women;
                return (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-[#060911]">{r.disease}</p>
                      <p className="text-xs text-slate-500">
                        {r.plainDescription}
                      </p>
                    </td>
                    <td className="py-4 px-3 text-center bg-slate-50/60">
                      <span className="text-base font-bold text-[#060911]">
                        {g.positiveTotal}
                      </span>{" "}
                      <span className="text-xs font-semibold text-[#1832C7]">
                        ({((g.positiveTotal / g.total) * 100).toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center text-[#1832C7]">
                      <strong className="text-base">{g.newSilent}</strong>{" "}
                      <span className="text-xs text-slate-500 block">
                        H: {m.newSilent} · M: {w.newSilent}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center text-[#DC2626]">
                      <strong className="text-base">
                        {g.mixedBoth + g.priorControlled}
                      </strong>{" "}
                      <span className="text-xs text-slate-500 block">
                        {g.priorControlled > 0
                          ? `(${g.priorControlled} Dx previo + ${g.mixedBoth} medición)`
                          : `H: ${m.mixedBoth} · M: ${w.mixedBoth}`}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center text-emerald-700">
                      <strong className="text-base">{g.negative}</strong>{" "}
                      <span className="text-xs text-slate-500">
                        ({((g.negative / g.total) * 100).toFixed(1)}%)
                      </span>
                      {g.untestedNA > 0 && (
                        <span className="block text-[11px] text-slate-400">
                          +{g.untestedNA} sin estudio previo
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 text-center bg-[#1832C7]/[0.03] font-semibold">
                      <span className="text-[#1832C7]">+{m.positiveTotal}</span>{" "}
                      <span className="text-slate-300">/</span>{" "}
                      <span className="text-emerald-700">-{m.negative}</span>
                      {m.untestedNA > 0 && (
                        <span className="text-[11px] text-slate-400 block font-normal">
                          ({m.untestedNA} sin lab)
                        </span>
                      )}
                    </td>
                    <td className="py-4 pl-3 text-center bg-red-50/40 font-semibold">
                      <span className="text-[#DC2626]">+{w.positiveTotal}</span>{" "}
                      <span className="text-slate-300">/</span>{" "}
                      <span className="text-emerald-700">-{w.negative}</span>
                      {w.untestedNA > 0 && (
                        <span className="text-[11px] text-slate-400 block font-normal">
                          ({w.untestedNA} sin lab)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
