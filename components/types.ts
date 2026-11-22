export interface BiomarkerItem {
  id: string;
  name: string;
  targetCancer: string;
  expressionProfile: string;
  confidenceScore: number;
  sensitivity: string;
  detectionThreshold: string;
  status: "Normal" | "Elevated" | "Under Review";
  color: string;
}

export interface TelemetryMetric {
  label: string;
  value: string;
  unit: string;
  status: string;
  description: string;
}

export interface ClinicalTrialStat {
  metric: string;
  value: string;
  description: string;
  baseline: string;
}
