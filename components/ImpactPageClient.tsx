"use client";

import { useMemo, useState } from "react";
import { UMAPS_PATIENTS } from "@/lib/impactCohortData";
import {
  AgeGroupFilter,
  ImpactHeroAndToggle,
  PreventionMode,
  SexFilter,
} from "./ImpactHeroAndToggle";
import { ImpactSpiderAndDiseaseMatrix } from "./ImpactSpiderAndDiseaseMatrix";
import { ImpactQuantitativeCharts } from "./ImpactQuantitativeCharts";
import { ImpactDiagnosticGapAndQualitative } from "./ImpactDiagnosticGapAndQualitative";

export function ImpactPageClient() {
  const [mode, setMode] = useState<PreventionMode>("deteccion-prevencion");
  const [sexFilter, setSexFilter] = useState<SexFilter>("ALL");
  const [ageFilter, setAgeFilter] = useState<AgeGroupFilter>("ALL");

  const filteredPatients = useMemo(() => {
    return UMAPS_PATIENTS.filter((p) => {
      if (sexFilter !== "ALL" && p.sex !== sexFilter) return false;
      if (ageFilter === "20-29" && (p.age < 20 || p.age > 29)) return false;
      if (ageFilter === "30-39" && (p.age < 30 || p.age > 39)) return false;
      if (ageFilter === "40-49" && (p.age < 40 || p.age > 49)) return false;
      if (ageFilter === "50+" && p.age < 50) return false;
      return true;
    });
  }, [sexFilter, ageFilter]);

  return (
    <div className="relative w-full">
      {/* 1. Hero Narrative, "Detección y Prevención" Toggle, Active Cohort Registry & Section 1 Demographics */}
      <ImpactHeroAndToggle
        mode={mode}
        setMode={setMode}
        sexFilter={sexFilter}
        setSexFilter={setSexFilter}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        filteredPatients={filteredPatients}
        allPatients={UMAPS_PATIENTS}
      />

      {/* 2. Interactive Spider/Radar Chart (6 Axes) + Positive/Negative/Silent/Mixed Disease Detection Matrix */}
      <ImpactSpiderAndDiseaseMatrix
        filteredPatients={filteredPatients}
        allPatients={UMAPS_PATIENTS}
      />

      {/* 3. Quantitative Clinical & Anthropometric Statistics: Box-and-Whisker Plots, Ogive, Frequency Polygon, Percentiles & Donut Charts */}
      <ImpactQuantitativeCharts
        filteredPatients={filteredPatients}
        allPatients={UMAPS_PATIENTS}
      />

      {/* 4. Multimorbidity, Diagnostic Gap, Qualitative Field Analysis, Screening Yield, Social Impact, OKRs & Full 26-Patient Clinical Table */}
      <ImpactDiagnosticGapAndQualitative
        filteredPatients={filteredPatients}
        allPatients={UMAPS_PATIENTS}
        mode={mode}
      />
    </div>
  );
}
