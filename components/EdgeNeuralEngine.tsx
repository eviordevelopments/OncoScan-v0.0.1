"use client";

import { TextScrub } from "./TextScrub";

export function EdgeNeuralEngine() {
  const specs = [
    { value: "8.4 ms", title: "Latencia Inferencia", desc: "Clasificación molecular en tiempo real." },
    { value: "100%", title: "Privacidad Soberana", desc: "Los datos biométricos no salen del chip." },
    { value: "INT8", title: "Red Cuantizada", desc: "Transformer molecular en 1.4M parámetros." },
    { value: "1.8 W", title: "Consumo Ultra-Bajo", desc: "Operación autónoma con micro-batería." },
  ];

  return (
    <section id="edge-ai" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono tracking-widest text-biotech-cyan uppercase">
            04 // ENCLAVE NEUROMÓRFICO
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-white">
            Inferencia Local. Cero Nube.
          </h2>
          <div className="pt-2">
            <TextScrub
              text="Diagnóstico computado en hardware perimetral garantizando seguridad criptográfica y velocidad."
              className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed"
              theme="dark"
            />
          </div>
        </div>

        {/* 4 Minimalist Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.015] hover:border-white/[0.2] transition-colors"
            >
              <span className="text-3xl font-mono font-bold text-white block mb-1">
                {item.value}
              </span>
              <span className="text-xs font-mono font-semibold text-biotech-cyan block mb-2">
                {item.title}
              </span>
              <p className="text-xs text-zinc-400 border-t border-white/[0.06] pt-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
