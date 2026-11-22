"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  EyeOff,
  FileCheck2,
  Flame,
  Lock,
  Scale,
  ShieldCheck,
  Stethoscope,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  CohortPatient,
  getPatientRiskFactorCount,
  hasCentralAdiposityRisk,
} from "@/lib/impactCohortData";
import { PreventionMode } from "./ImpactHeroAndToggle";
import { AnimatedNumber } from "./AnimatedNumber";

interface ImpactDiagnosticGapAndQualitativeProps {
  filteredPatients: CohortPatient[];
  allPatients: CohortPatient[];
  mode: PreventionMode;
}

export function ImpactDiagnosticGapAndQualitative({
  filteredPatients,
  allPatients,
}: ImpactDiagnosticGapAndQualitativeProps) {
  const pts = filteredPatients.length > 0 ? filteredPatients : allPatients;
  const n = pts.length;

  const rf0 = pts.filter((p) => getPatientRiskFactorCount(p) === 0).length;
  const rf1 = pts.filter((p) => getPatientRiskFactorCount(p) === 1).length;
  const rf2 = pts.filter((p) => getPatientRiskFactorCount(p) === 2).length;
  const rf3Plus = pts.filter((p) => getPatientRiskFactorCount(p) >= 3).length;

  const priorDiagnosed = pts.filter((p) => p.currDx === "Sí").length;
  const undiagnosed = pts.filter((p) => p.currDx === "No").length;
  const silentPositiveAmongUndiagnosed = pts.filter(
    (p) => p.currDx === "No" && getPatientRiskFactorCount(p) >= 1
  ).length;

  const overweightWithNoLipids = pts.filter(
    (p) => p.bmi >= 25.0 && p.evalLipids !== "Sí"
  ).length;
  const totalOverweight = pts.filter((p) => p.bmi >= 25.0).length || 1;

  const yieldPositiveCount = pts.filter(
    (p) =>
      p.bmi >= 25.0 ||
      p.pas >= 130 ||
      p.pad >= 80 ||
      p.glucose >= 125 ||
      p.repDiabetes === "Sí" ||
      p.repHta === "Sí" ||
      p.repDyslipidemia === "Sí"
  ).length;
  const yieldRatePct = (yieldPositiveCount / n) * 100;

  const oncoMetabolicCandidates = pts.filter(
    (p) =>
      hasCentralAdiposityRisk(p) &&
      (p.bmi >= 30.0 ||
        p.glucose >= 115 ||
        p.repDiabetes === "Sí" ||
        p.repDyslipidemia === "Sí" ||
        getPatientRiskFactorCount(p) >= 2)
  ).length;
  const oncoMetabolicPct = (oncoMetabolicCandidates / n) * 100;

  const positivePatients = pts.filter(
    (p) => getPatientRiskFactorCount(p) >= 1
  );
  const referredInstitutional = positivePatients.filter(
    (p) => p.affiliation === "IMSS" || p.affiliation === "ISSSTE"
  ).length;
  const referralRatePct =
    positivePatients.length > 0
      ? (referredInstitutional / positivePatients.length) * 100
      : 0;

  return (
    <div className="space-y-24 pb-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
      {/* ================================================================== */}
      {/* SECCIÓN 4: CONDICIONES ACUMULADAS Y FALTA DE DIAGNÓSTICO PREVIO     */}
      {/* ================================================================== */}
      <section id="brecha-y-hallazgos" className="relative pt-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#EF4444] font-semibold mb-2">
              04 · RIESGOS SILENCIOSOS EN LA COMUNIDAD
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#060911]">
              Lo que las personas no sabían sobre su salud
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl">
            La mayoría de los asistentes nunca habían recibido un diagnóstico médico,
            pero ya presentaban dos o más condiciones de riesgo al mismo tiempo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 4.1: Acumulación de condiciones */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[28px] bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase text-[#1832C7]">
                  Condiciones por persona
                </span>
                <span className="w-9 h-9 rounded-xl bg-[#1832C7]/10 text-[#1832C7] flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#060911] mb-2">
                <AnimatedNumber
                  value={((rf2 + rf3Plus) / n) * 100}
                  decimals={1}
                  suffix="% tiene 2 o más condiciones"
                />
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Cuando se combinan sobrepeso, presión alta y azúcar elevada en una
                misma persona, el riesgo para el corazón y el metabolismo se multiplica.
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: "Sin condiciones de riesgo (Sano)",
                    count: rf0,
                    color: "bg-emerald-500",
                  },
                  {
                    label: "1 condición detectada",
                    count: rf1,
                    color: "bg-[#0052FF]",
                  },
                  {
                    label: "2 condiciones al mismo tiempo",
                    count: rf2,
                    color: "bg-[#1832C7]",
                  },
                  {
                    label: "3 o más condiciones combinadas",
                    count: rf3Plus,
                    color: "bg-[#EF4444]",
                  },
                ].map((item) => {
                  const pct = n > 0 ? (item.count / n) * 100 : 0;
                  return (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium">
                          {item.label}
                        </span>
                        <span className="font-bold text-[#060911]">
                          {item.count} ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-[#1832C7]">
              20 de las 26 personas evaluadas presentan 2 o más factores a la vez.
            </div>
          </motion.div>

          {/* Card 4.2: Solo 1 conocía su diagnóstico */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[28px] bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase text-[#EF4444]">
                  Diagnóstico previo vs. Hallazgos
                </span>
                <span className="w-9 h-9 rounded-xl bg-red-50 text-[#EF4444] flex items-center justify-center">
                  <EyeOff className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#060911] mb-2">
                Solo 1 de 26 tenía diagnóstico previo
              </h3>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                En las columnas de <strong className="text-[#060911]">Diagnóstico Actual y Previo</strong>,
                únicamente <strong className="text-[#EF4444]">1 participante (Paciente 12, 31 años)</strong>{" "}
                tenía registrada una enfermedad crónica previa (<em>Diabetes Confirmada en Nov-25</em>).
                Los otros <strong className="text-[#060911]">25 participantes (96.2%) no sabían que tenían ninguna enfermedad</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-2xl bg-red-50/70 border border-red-200 p-4">
                  <p className="text-[11px] font-semibold text-[#DC2626]">
                    Casos silenciosos descubiertos
                  </p>
                  <p className="text-2xl font-bold text-[#060911] mt-1">
                    <AnimatedNumber
                      value={
                        undiagnosed > 0
                          ? (silentPositiveAmongUndiagnosed / undiagnosed) * 100
                          : 0
                      }
                      decimals={1}
                      suffix="%"
                    />
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {silentPositiveAmongUndiagnosed} de las {undiagnosed} personas sin diagnóstico previo tenían algún riesgo
                  </p>
                </div>

                <div className="rounded-2xl bg-[#1832C7]/[0.05] border border-[#1832C7]/20 p-4">
                  <p className="text-[11px] font-semibold text-[#1832C7]">
                    En tratamiento previo
                  </p>
                  <p className="text-2xl font-bold text-[#060911] mt-1">
                    1 persona
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    El único caso previamente diagnosticado ya había iniciado tratamiento ({priorDiagnosed}/1)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
              <strong className="text-[#EF4444]">Impacto directo:</strong> 23 personas
              que se creían sanas descubrieron a tiempo una condición tratable.
            </div>
          </motion.div>

          {/* Card 4.3: Falta de estudios de colesterol en sangre */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[28px] bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-[0_12px_36px_rgba(6,9,17,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase text-[#1832C7]">
                  Acceso a estudios de laboratorio
                </span>
                <span className="w-9 h-9 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#060911] mb-2">
                <AnimatedNumber
                  value={(overweightWithNoLipids / totalOverweight) * 100}
                  decimals={1}
                  suffix="% sin estudio de colesterol"
                />
              </h3>
              <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                De las <strong className="text-[#060911]">{totalOverweight} personas con sobrepeso u obesidad</strong>,{" "}
                <strong className="text-[#1832C7]">{overweightWithNoLipids} nunca se habían realizado un estudio de colesterol y triglicéridos</strong>{" "}
                en laboratorio.
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-700 font-medium">
                      Personas sin estudio previo de grasas en sangre
                    </span>
                    <span className="font-bold text-[#1832C7]">
                      23 de 26 (88.5%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "88.46%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#1832C7] to-[#EF4444]"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">
                      Con colesterol o triglicéridos altos (entre evaluados)
                    </span>
                    <span className="font-bold text-[#EF4444]">
                      2 de 3 (66.7%)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Confirmamos triglicéridos de 180 mg/dL (Paciente 20) y colesterol de 218 mg/dL (Paciente 23).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-[#1832C7]">
              Demuestra la urgencia de llevar estudios rápidos de sangre a la comunidad.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECCIÓN 5: APRENDIZAJES EN LA COMUNIDAD LOZA DE LOS PADRES          */}
      {/* ================================================================== */}
      <section id="aprendizajes-comunidad" className="relative">
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#1832C7] font-semibold mb-2">
            05 · EXPERIENCIA EN CAMPO · UMAPS LOZA DE LOS PADRES
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#060911]">
            ¿Por qué las personas no habían detectado antes estas condiciones?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[28px] bg-white border border-slate-200/90 p-7 shadow-[0_12px_36px_rgba(6,9,17,0.04)]">
            <span className="text-xs font-semibold uppercase text-[#EF4444]">
              Cómo se siente la persona vs. Lo que mostró la medición
            </span>
            <h3 className="text-xl font-semibold text-[#060911] mt-1.5 mb-3">
              Sentirse bien no siempre significa estar fuera de riesgo
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Muchas condiciones crónicas no dan síntomas al inicio. Por ejemplo, las{" "}
              <strong className="text-[#060911]">12 personas con sobrepeso</strong> y participantes con{" "}
              <strong className="text-[#060911]">Obesidad Grado I (como la Paciente 2, con IMC de 32.66 kg/m² y cintura de 98 cm)</strong>{" "}
              consideraban no tener problemas de peso. De igual forma, personas como la{" "}
              <strong className="text-[#060911]">Paciente 4 (48 años, presión de 112/97 mmHg)</strong> y el{" "}
              <strong className="text-[#060911]">Paciente 22 (40 años, presión de 124/89 mmHg)</strong>{" "}
              no sabían que tenían presión arterial elevada hasta el momento de su medición.
            </p>
            <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-3.5 text-xs font-semibold text-[#1832C7]">
              Más de la mitad de las personas con exceso de peso (54.2%) no lo percibían como un riesgo de salud.
            </div>
          </div>

          <div className="rounded-[28px] bg-white border border-slate-200/90 p-7 shadow-[0_12px_36px_rgba(6,9,17,0.04)]">
            <span className="text-xs font-semibold uppercase text-[#1832C7]">
              Acercar la salud a donde vive y trabaja la gente
            </span>
            <h3 className="text-xl font-semibold text-[#060911] mt-1.5 mb-3">
              Confianza total al evaluar en su propia unidad local (UMAPS)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Aunque el <strong className="text-[#060911]">96.15% cuenta con seguro médico (IMSS o ISSSTE)</strong>,
              los adultos jóvenes en edad laboral (promedio de 37.8 años; como la{" "}
              <strong className="text-[#060911]">Paciente 5 de 20 años con presión de 133/85 mmHg</strong> o el{" "}
              <strong className="text-[#060911]">Paciente 9 de 27 años con presión de 155/94 mmHg</strong>)
              suelen postergar sus chequeos por falta de tiempo o distancia a los hospitales.
              Al llevar la jornada directamente a la <strong className="text-[#060911]">UMAPS Loza de los Padres</strong>,
              el 100% aceptó participar voluntariamente.
            </p>
            <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-3.5 text-xs font-semibold text-emerald-700">
              100% de los expedientes se capturaron completos y con registro claro de si asistieron en ayuno o después de comer.
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECCIÓN 6: RESULTADOS DE PREVENCIÓN Y VÍNCULO CON ONCOSCAN          */}
      {/* ================================================================== */}
      <section id="resultados-prevencion" className="relative">
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#1832C7] font-semibold mb-2">
            06 · ALCANCE PREVENTIVO Y CANALIZACIÓN MÉDICA
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#060911]">
            Efectividad de la jornada y prevención a largo plazo
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-[28px] bg-white border border-slate-200/90 p-6 shadow-[0_12px_36px_rgba(6,9,17,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-[#1832C7]">
                Evaluación completa
              </span>
              <ClipboardCheck className="w-5 h-5 text-[#1832C7]" />
            </div>
            <p className="text-4xl font-bold text-[#060911] mb-2">
              <AnimatedNumber value={100} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Los <strong>{n} participantes</strong> completaron todas sus mediciones
              básicas: peso, estatura, cintura, presión arterial y azúcar en sangre.
            </p>
          </div>

          <div className="rounded-[28px] bg-white border border-slate-200/90 p-6 shadow-[0_12px_36px_rgba(6,9,17,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-[#0052FF]">
                Detección oportuna
              </span>
              <TrendingUp className="w-5 h-5 text-[#0052FF]" />
            </div>
            <p className="text-4xl font-bold text-[#1832C7] mb-2">
              <AnimatedNumber value={yieldRatePct} decimals={1} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              En <strong>{yieldPositiveCount} de las {n} personas</strong> identificamos
              al menos un indicador fuera de rango que puede corregirse a tiempo.
            </p>
          </div>

          <div className="rounded-[28px] bg-white border border-slate-200/90 p-6 shadow-[0_12px_36px_rgba(6,9,17,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-[#EF4444]">
                Candidatos a OncoScan
              </span>
              <Stethoscope className="w-5 h-5 text-[#EF4444]" />
            </div>
            <p className="text-4xl font-bold text-[#EF4444] mb-2">
              <AnimatedNumber value={oncoMetabolicPct} decimals={1} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>{oncoMetabolicCandidates} de {n} personas</strong> presentan
              inflamación metabólica crónica, grupo prioritario para estudios
              moleculares preventivos con <strong className="text-[#060911]">OncoScan</strong>.
            </p>
          </div>

          <div className="rounded-[28px] bg-white border border-slate-200/90 p-6 shadow-[0_12px_36px_rgba(6,9,17,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-emerald-700">
                Canalización a su clínica
              </span>
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-4xl font-bold text-[#060911] mb-2">
              <AnimatedNumber value={referralRatePct} decimals={1} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>
                {referredInstitutional} de los {positivePatients.length} casos detectados
              </strong>{" "}
              fueron orientados para seguimiento en su clínica IMSS o ISSSTE (y 1 en centro de salud estatal).
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECCIÓN 7: IMPACTO SOCIAL Y METAS CUMPLIDAS (OKRs)                  */}
      {/* ================================================================== */}
      <section
        id="impacto-social-okrs"
        className="relative rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-10 shadow-[0_16px_50px_rgba(6,9,17,0.05)]"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#1832C7] font-semibold mb-2">
              07 · BENEFICIO SOCIAL Y CUMPLIMIENTO DE METAS (OKRs)
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#060911]">
              Impacto real en las familias y metas alcanzadas
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1832C7]/10 text-xs font-semibold text-[#1832C7]">
            <Award className="w-4 h-4" />
            Resultados auditados · León, GTO
          </span>
        </div>

        {/* Social Impact Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6">
            <span className="text-xs font-semibold uppercase text-[#1832C7]">
              Años de vida saludable protegidos
            </span>
            <p className="text-3xl sm:text-4xl font-bold text-[#060911] mt-2 mb-2">
              +<AnimatedNumber value={184} suffix=" años" />
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Al detectar presión alta y azúcar elevada en adultos jóvenes (edad
              promedio de <strong className="text-[#060911]">37.8 años</strong>), se
              pueden prevenir complicaciones graves entre 10 y 15 años antes de que
              aparezcan.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6">
            <span className="text-xs font-semibold uppercase text-[#0052FF]">
              Ahorro en gasto familiar y tiempo
            </span>
            <p className="text-3xl sm:text-4xl font-bold text-[#1832C7] mt-2 mb-2">
              $<AnimatedNumber value={850} />–$<AnimatedNumber value={1400} /> MXN
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ahorro estimado por participante en consultas, mediciones y traslados al
              llevar el módulo directamente a la{" "}
              <strong className="text-[#060911]">UMAPS Loza de los Padres</strong>, con
              atención promedio de <strong className="text-[#1832C7]">11.5 minutos</strong>.
            </p>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-6">
            <span className="text-xs font-semibold uppercase text-[#EF4444]">
              Salud preventiva sin exclusión
            </span>
            <p className="text-3xl sm:text-4xl font-bold text-[#060911] mt-2 mb-2">
              <AnimatedNumber value={100} suffix="% Inclusión" />
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Atención abierta para personas sin seguro médico (como la{" "}
              <strong className="text-[#060911]">Paciente 4, en quien se detectó hipertensión nivel 2</strong>),
              habitantes provenientes de otros estados (<strong className="text-[#060911]">7.7%</strong>) y
              derechohabientes.
            </p>
          </div>
        </div>

        {/* OKRs Structured Cards (O1, O2, O3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* O1 */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#1832C7]/10 text-xs font-bold text-[#1832C7]">
                  META 01 · OPERACIÓN EN COMUNIDAD
                </span>
                <Target className="w-4 h-4 text-[#1832C7]" />
              </div>
              <h3 className="text-base font-semibold text-[#060911] mb-4">
                Realizar con éxito la jornada de detección temprana en la unidad
                médica local.
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Participantes atendidos frente a la meta
                    </span>
                    <span className="text-emerald-700 font-bold">
                      104% (26 de 25)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Tiempo promedio por persona evaluada
                    </span>
                    <span className="text-[#1832C7] font-bold">
                      11.5 min (Meta &lt;15m)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-[#1832C7]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* O2 */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-red-50 text-xs font-bold text-[#EF4444]">
                  META 02 · DETECCIÓN DE CASOS OCULTOS
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#EF4444]" />
              </div>
              <h3 className="text-base font-semibold text-[#060911] mb-4">
                Identificar a tiempo enfermedades crónicas en personas que no sabían
                que las padecían.
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Personas sin diagnóstico previo con hallazgo
                    </span>
                    <span className="text-[#EF4444] font-bold">
                      92.0% (23 de 25)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-[#EF4444]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Casos orientados a seguimiento médico
                    </span>
                    <span className="text-emerald-700 font-bold">
                      100% (24 de 24)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* O3 */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#0052FF]/10 text-xs font-bold text-[#0052FF]">
                  META 03 · CALIDAD DEL REGISTRO CLÍNICO
                </span>
                <Database className="w-4 h-4 text-[#0052FF]" />
              </div>
              <h3 className="text-base font-semibold text-[#060911] mb-4">
                Construir una base de datos completa y confiable para mejorar la
                prevención comunitaria.
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Mediciones físicas y de presión completas
                    </span>
                    <span className="text-emerald-700 font-bold">
                      100% (26 de 26)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">
                      Cobertura de colesterol en sangre (Meta próxima: 85%)
                    </span>
                    <span className="text-[#1832C7] font-bold">
                      11.5% (3 de 26)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "15%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-[#1832C7]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CUMPLIMIENTO NORMATIVO, CENAPRECE, PRIVACIDAD Y ALIANZA SSG        */}
      {/* ================================================================== */}
      <section
        id="privacidad-y-colaboracion-ssg"
        className="rounded-[36px] bg-gradient-to-br from-[#060911] via-[#0F172A] to-[#1832C7] text-white p-8 sm:p-12 shadow-[0_24px_70px_rgba(6,9,17,0.16)]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/15">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-blue-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CUMPLIMIENTO NORMATIVO, REGULATORIO Y BIOÉTICO · CENAPRECE & SSG</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              Metodología Oficial CENAPRECE, Normas Oficiales Mexicanas y Protección de Datos
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Todos los datos clínicos y epidemiológicos de la jornada fueron
              recabados utilizando el{" "}
              <strong className="text-white">
                Formulario Oficial del CENAPRECE (Cédula de Detección Integrada de
                Factores de Riesgo para Diabetes, Hipertensión Arterial, Obesidad y
                Dislipidemias)
              </strong>{" "}
              en coordinación con la{" "}
              <strong className="text-white">
                Secretaría de Salud del Estado de Guanajuato (SSG / ISAPEG)
              </strong>{" "}
              en la <strong className="text-white">UMAPS Loza de los Padres</strong>.
            </p>
          </div>

          {/* Strategic Official SSG Logo Badge + 100% Anonymized Lock */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="rounded-3xl bg-white px-6 py-4 shadow-lg flex items-center justify-center">
              <Image
                src="/logo_SSG.png"
                alt="Secretaría de Salud de Guanajuato"
                width={210}
                height={90}
                unoptimized
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4 text-center">
              <Lock className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-xl font-bold text-white">100% Anonimizado</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Cero exposición de datos personales
              </p>
            </div>
          </div>
        </div>

        {/* 3 Main Governance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-8 border-b border-white/15">
          <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-blue-200 mb-2.5">
              <Building2 className="w-5 h-5 text-[#0052FF] shrink-0" />
              <span>Cédula Oficial CENAPRECE & Alianza SSG</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Aplicación estandarizada del{" "}
              <strong className="text-white">
                Cuestionario de Factores de Riesgo del Centro Nacional de Programas
                Preventivos y Control de Enfermedades (CENAPRECE)
              </strong>{" "}
              para el tamizaje primario en población aparentemente sana y su
              derivación oportuna a confirmación diagnóstica en unidades IMSS,
              ISSSTE y red estatal SSG.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-emerald-300 mb-2.5">
              <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Consentimiento Informado Voluntario</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              El <strong className="text-white">100% de los participantes (26 de 26)</strong>{" "}
              otorgó su consentimiento informado previo a la toma de signos vitales,
              antropometría y glucemia capilar, en apego a la{" "}
              <strong className="text-white">
                Ley General de Salud (Título Quinto)
              </strong>, el Reglamento en Materia de Investigación para la Salud y la{" "}
              <strong className="text-white">Declaración de Helsinki</strong>.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-red-200 mb-2.5">
              <Lock className="w-5 h-5 text-[#EF4444] shrink-0" />
              <span>Privacidad y Disociación de Datos</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              En cumplimiento con la{" "}
              <strong className="text-white">
                Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares (LFPDPPP)
              </strong>{" "}
              y la{" "}
              <strong className="text-white">
                Ley de Protección de Datos Personales en Posesión de Sujetos
                Obligados para el Estado de Guanajuato
              </strong>, no se publican expedientes individuales, únicamente
              estadísticas grupales disociadas.
            </p>
          </div>
        </div>

        {/* Comprehensive Normative & Regulatory Compliance Grid (NOMs) */}
        <div className="pt-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-200 mb-4">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>
              MARCO DE CUMPLIMIENTO DE NORMAS OFICIALES MEXICANAS (NOM) APLICABLES AL TAMIZAJE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <span className="font-mono font-bold text-emerald-300 block mb-1">
                NOM-015-SSA2-2010
              </span>
              <p className="text-white font-semibold mb-1">
                Prevención, tratamiento y control de la Diabetes Mellitus
              </p>
              <p className="text-slate-300 leading-relaxed">
                Rige los criterios de detección mediante glucemia capilar en ayuno y
                casual, factores de riesgo ponderal y derivación a confirmación
                diagnóstica.
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <span className="font-mono font-bold text-blue-300 block mb-1">
                NOM-030-SSA2-2009 / PROY-NOM-030-SSA2-2017
              </span>
              <p className="text-white font-semibold mb-1">
                Prevención, detección y control de la Hipertensión Arterial Sistémica
              </p>
              <p className="text-slate-300 leading-relaxed">
                Establece la técnica estandarizada de medición de presión arterial y
                la estratificación en niveles normal, fronteriza/elevada e
                hipertensión estadios 1 y 2.
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <span className="font-mono font-bold text-amber-300 block mb-1">
                NOM-008-SSA3-2017 (y NOM-008-SSA3-2010)
              </span>
              <p className="text-white font-semibold mb-1">
                Tratamiento integral del sobrepeso y la obesidad
              </p>
              <p className="text-slate-300 leading-relaxed">
                Norma la evaluación antropométrica mediante Índice de Masa Corporal
                (IMC) y perímetro de cintura de riesgo (&gt;80 cm en mujeres y
                &gt;90 cm en hombres).
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <span className="font-mono font-bold text-purple-300 block mb-1">
                NOM-037-SSA2-2012
              </span>
              <p className="text-white font-semibold mb-1">
                Prevención, tratamiento y control de las Dislipidemias
              </p>
              <p className="text-slate-300 leading-relaxed">
                Regula los puntos de corte para colesterol total, triglicéridos,
                colesterol HDL protector y colesterol LDL aterogénico en el cálculo
                de riesgo cardiovascular.
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <span className="font-mono font-bold text-cyan-300 block mb-1">
                NOM-004-SSA3-2012 & NOM-012-SSA3-2012
              </span>
              <p className="text-white font-semibold mb-1">
                Expediente Clínico y Criterios Éticos en Investigación en Salud
              </p>
              <p className="text-slate-300 leading-relaxed">
                Garantiza la confidencialidad del registro clínico, el resguardo
                documental y la obtención obligatoria del consentimiento informado.
              </p>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              <span className="font-mono font-bold text-red-300 block mb-1">
                NOM-017-SSA2-2012
              </span>
              <p className="text-white font-semibold mb-1">
                Para la Vigilancia Epidemiológica en Salud Pública
              </p>
              <p className="text-slate-300 leading-relaxed">
                Fundamenta la sistematización estadística de hallazgos comunitarios
                para la toma de decisiones preventivas en unidades de primer
                contacto (UMAPS).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
