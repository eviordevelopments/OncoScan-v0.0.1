"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, X } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Anuncio clínico y de producto"
      className="relative z-40 bg-[#060911] text-white border-b border-white/10 px-4 py-2.5 text-xs sm:text-sm font-mono tracking-tight transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-[#0052FF] to-[#EF4444]"></span>
          </span>
          <span className="font-bold uppercase tracking-wider bg-blue-500/15 px-2.5 py-0.5 rounded-md border border-blue-400/30 text-[11px] sm:text-xs text-blue-300">
            ONCOSCAN GEN-1
          </span>
          <span className="text-white/95 font-medium hidden md:inline">
            Detección molecular temprana mediante microfluidos y microARN.
          </span>
          <span className="text-neutral-400 font-normal">
            Protocolo Clínico ONCO-1 Abierto.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/protocolo-onco-1"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1832C7] hover:bg-[#0052FF] text-white font-semibold border border-white/15 transition-colors text-xs"
          >
            <span>Pre-registro Estudio Clínico</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Cerrar anuncio"
            className="text-neutral-400 hover:text-white p-1 transition-colors rounded-full hover:bg-white/10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
