"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BiomarkerItem } from "./types";
import { TextScrub } from "./TextScrub";

export function BiomarkerMatrix() {
  const [selectedBiomarker, setSelectedBiomarker] = useState<string>("mir-21");

  const biomarkers: BiomarkerItem[] = [
    {
      id: "mir-21",
      name: "miR-21-5p",
      targetCancer: "Gastrointestinal y Colorrectal",
      expressionProfile: "Resistencia celular y proliferación.",
      confidenceScore: 97.4,
      sensitivity: "98.2%",
      detectionThreshold: "0.18 fM",
      status: "Elevated",
      color: "#00C2D1",
    },
    {
      id: "mir-155",
      name: "miR-155-5p",
      targetCancer: "Mamario y Hematológico",
      expressionProfile: "Remodelación estromal.",
      confidenceScore: 95.8,
      sensitivity: "96.5%",
      detectionThreshold: "0.22 fM",
      status: "Normal",
      color: "#10B981",
    },
    {
      id: "mir-34a",
      name: "miR-34a-5p",
      targetCancer: "Pulmonar y Hepático",
      expressionProfile: "Eje supresor tumoral p53.",
      confidenceScore: 98.1,
      sensitivity: "97.9%",
      detectionThreshold: "0.15 fM",
      status: "Under Review",
      color: "#EC4899",
    },
    {
      id: "mir-126",
      name: "miR-126-3p",
      targetCancer: "Melanoma y Vascular",
      expressionProfile: "Permeabilidad y angiogénesis.",
      confidenceScore: 94.2,
      sensitivity: "95.1%",
      detectionThreshold: "0.31 fM",
      status: "Normal",
      color: "#8B5CF6",
    },
  ];

  const current = biomarkers.find((b) => b.id === selectedBiomarker) || biomarkers[0];

  return (
    <section
      id="biomarkers"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white text-black rounded-t-[40px] sm:rounded-t-[64px] -mt-12 sm:-mt-20 z-20 shadow-[0_-25px_60px_rgba(0,0,0,0.06)] border-t border-neutral-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header - Scaled up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 space-y-5"
        >
          <span className="text-xs sm:text-sm font-mono tracking-widest text-emerald-700 uppercase font-bold">
            PANEL DE BIOMARCADORES
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-black">
            Firmas de microARN en Exosomas.
          </h2>
          <div className="pt-2">
            <TextScrub
              text="Medición cuantitativa directa en femtomoles sin reactivos térmicos de laboratorio."
              className="text-lg sm:text-2xl text-neutral-700 font-medium leading-relaxed"
              theme="light"
            />
          </div>
        </motion.div>

        {/* Minimal Grid & Circular Ring (Ultrahuman style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Biomarkers List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {biomarkers.map((b) => {
              const active = b.id === selectedBiomarker;
              return (
                <motion.div
                  key={b.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedBiomarker(b.id)}
                  className={`cursor-pointer p-6 rounded-3xl border transition-all duration-200 ${
                    active
                      ? "bg-[#FAFBFD] border-black shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                      : "bg-[#F7F8FA] border-neutral-200/90 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-base font-extrabold text-black flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                      {b.name}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-500">{b.detectionThreshold}</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-800 mb-1">{b.targetCancer}</h4>
                  <div className="text-xs font-mono font-medium text-neutral-500 flex justify-between pt-3 border-t border-neutral-200/60">
                    <span>Sensibilidad:</span>
                    <span className="text-black font-bold">{b.sensitivity}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Ultrahuman Style Circular Gauge (Porcelain surface - Scaled up) */}
          <div className="lg:col-span-5 p-10 rounded-3xl border border-neutral-200 bg-[#FAFBFD] shadow-[0_16px_45px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
            <span className="text-xs sm:text-sm font-mono text-neutral-600 uppercase tracking-wider mb-8 font-bold">
              CONCORDANCIA CLÍNICA
            </span>

            <div className="relative w-52 h-52 flex items-center justify-center mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={current.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * current.confidenceScore) / 100}
                  fill="none"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-mono font-extrabold text-black tracking-tight">
                  {current.confidenceScore}%
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase font-bold mt-1">Score</span>
              </div>
            </div>

            <div className="w-full text-xs sm:text-sm font-mono text-neutral-700 border-t border-neutral-200 pt-5 flex justify-between">
              <span className="font-semibold">{current.name}</span>
              <span className="text-black font-extrabold">{current.detectionThreshold}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
