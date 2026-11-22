"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, ChevronDown, HeartPulse } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [impactToggleOpen, setImpactToggleOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const isOncoScanPage = pathname?.startsWith("/oncoscan");
  const isProtocolPage = pathname?.startsWith("/protocolo-onco-1");

  // Main Header Navigation never changes its core identity; "Impacto" has the slide-down toggle for "Prevención y detección"
  const navLinks = isProtocolPage
    ? [
        { label: "← Inicio", href: "/", isBadge: false },
        { label: "OncoScan", href: "/oncoscan", isBadge: true },
        { label: "Impacto", href: "/impacto", isBadge: false, hasImpactToggle: true },
        { label: "Pre-registro", href: "#formulario-registro", isBadge: false },
        { label: "Marco Bioético", href: "#marco-normativo", isBadge: false },
      ]
    : isOncoScanPage
    ? [
        { label: "← Inicio", href: "/", isBadge: false },
        { label: "OncoScan", href: "/oncoscan", isBadge: true },
        { label: "Impacto", href: "/impacto", isBadge: false, hasImpactToggle: true },
        { label: "microARN 3D", href: "#hero-experience", isBadge: false },
        { label: "Hardware", href: "#hardware-closer-look-container", isBadge: false },
      ]
    : [
        { label: "OncoScan", href: "/oncoscan", isBadge: true },
        { label: "Impacto", href: "/impacto", isBadge: false, hasImpactToggle: true },
        { label: "Home", href: "/#neuralhack-home", isBadge: false },
      ];

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      {/* 1. TOP BANNER (OncoScan Palette: Obsidian Black, Royal Blue & Crimson Red) */}
      {bannerVisible && (
        <motion.aside
          initial={false}
          animate={{
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-[#060911]/95 backdrop-blur-xl text-white border-b border-white/10 text-xs sm:text-sm font-mono tracking-tight pointer-events-auto"
        >
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-[#0052FF] to-[#EF4444]"></span>
              </span>
              <span className="font-bold uppercase tracking-wider bg-blue-500/15 px-2.5 py-0.5 rounded-md border border-blue-400/30 text-[11px] sm:text-xs text-blue-300">
                ONCOSCAN GEN-1
              </span>
              <span className="text-white/95 font-medium hidden md:inline">
                Detección molecular temprana mediante microfluidos y microARN.
              </span>
              <span className="text-neutral-400 font-normal hidden sm:inline">
                Protocolo Clínico ONCO-1 Abierto.
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/protocolo-onco-1"
                className="group inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1832C7] hover:bg-[#0052FF] text-white font-semibold border border-white/15 transition-all text-xs shadow-sm"
              >
                <span>Pre-registro Estudio Clínico</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => setBannerVisible(false)}
                aria-label="Cerrar anuncio"
                className="text-neutral-400 hover:text-white p-1 transition-colors rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.aside>
      )}

      {/* 2. FLOATING ULTRAHUMAN CAPSULE HEADER (Always identical structure) */}
      <div className="w-full px-3.5 sm:px-6 transition-all duration-300 pointer-events-none">
        <motion.header
          initial={false}
          animate={{
            marginTop: bannerVisible && !isScrolled ? 14 : 16,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto w-full max-w-[1200px] h-[58px] sm:h-[64px] rounded-full backdrop-blur-[20px] backdrop-saturate-150 px-4 sm:px-8 pointer-events-auto flex items-center transition-all duration-300 ${
            isOncoScanPage
              ? "bg-black/70 hover:bg-black/80 text-white border border-white/[0.10] shadow-[0_4px_14px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
              : "bg-white/80 hover:bg-white/90 text-black border border-white/70 ring-1 ring-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* 3-Column Grid: 1fr | auto | 1fr -> Mathematical Dead Center Isologo */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full">
            {/* Left Column: 2-line Hamburger Menu + Product Nav Links */}
            <div className="flex items-center gap-4 sm:gap-7 justify-self-start">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className={`p-2 -ml-1.5 transition-colors rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
                  isOncoScanPage
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-neutral-900 hover:text-black hover:bg-black/5"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className={`w-5 h-5 ${isOncoScanPage ? "text-white" : "text-neutral-900"}`} />
                ) : (
                  <div className="w-[17px] h-[9px] flex flex-col justify-between" aria-hidden="true">
                    <span
                      className={`w-full h-[1.5px] rounded-full ${
                        isOncoScanPage ? "bg-white" : "bg-neutral-900"
                      }`}
                    />
                    <span
                      className={`w-full h-[1.5px] rounded-full ${
                        isOncoScanPage ? "bg-white" : "bg-neutral-900"
                      }`}
                    />
                  </div>
                )}
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navLinks.map((link) =>
                  link.isBadge ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-[-0.26px] transition-all whitespace-nowrap ${
                        isOncoScanPage
                          ? "bg-white/15 hover:bg-white/25 text-white border border-white/15"
                          : "bg-black text-white hover:bg-[#1832C7] shadow-sm"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#EF4444] animate-pulse" />
                      <span>{link.label}</span>
                    </Link>
                  ) : link.hasImpactToggle ? (
                    /* "Impacto" tab with slide-down toggle for "Prevención y detección" */
                    <div
                      key={link.href}
                      className="relative py-2 -my-2"
                      onMouseEnter={() => setImpactToggleOpen(true)}
                      onMouseLeave={() => setImpactToggleOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setImpactToggleOpen(!impactToggleOpen)}
                        className={`inline-flex items-center gap-1 relative text-[13px] tracking-[-0.26px] transition-colors whitespace-nowrap py-1 cursor-pointer focus:outline-none ${
                          isOncoScanPage
                            ? "text-white/90 hover:text-white font-normal"
                            : "text-neutral-900 hover:text-[#1832C7] font-semibold"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            impactToggleOpen ? "rotate-180 text-[#0052FF]" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {impactToggleOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white border border-slate-200/90 shadow-[0_14px_36px_rgba(6,9,17,0.12)] p-1.5 text-black z-50 overflow-hidden"
                          >
                            <Link
                              href="/impacto"
                              onClick={() => setImpactToggleOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1832C7]/[0.06] transition-colors group"
                            >
                              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1832C7] to-[#0052FF] text-white flex items-center justify-center shrink-0">
                                <HeartPulse className="w-4 h-4" />
                              </span>
                              <div className="text-left">
                                <span className="block text-[13px] font-semibold text-[#060911] group-hover:text-[#1832C7] transition-colors">
                                  Prevención y detección
                                </span>
                                <span className="block text-[11px] text-neutral-500">
                                  Cohorte León, GTO · 20 Nov
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative text-[13px] font-normal tracking-[-0.26px] transition-colors whitespace-nowrap py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-150 ${
                        isOncoScanPage
                          ? "text-white/90 hover:text-white after:bg-white"
                          : "text-neutral-900 hover:text-[#1832C7] font-semibold after:bg-[#1832C7]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Center Column: ENLARGED ISOLOGO */}
            <div className="flex items-center justify-center justify-self-center px-2">
              <Link
                href={isOncoScanPage ? "/oncoscan" : "/"}
                className="flex items-center justify-center group focus:outline-none"
                aria-label={isOncoScanPage ? "OncoScan Inicio" : "NeuralHack Inicio"}
              >
                <div className="h-[34px] sm:h-[38px] w-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Image
                    src={isOncoScanPage ? "/oncoscan.png" : "/logo_cropped.png"}
                    alt={isOncoScanPage ? "OncoScan Isologo" : "NeuralHack Isologo"}
                    width={194}
                    height={176}
                    className="h-full w-auto object-contain"
                    unoptimized
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Column: Ultrahuman style Right Actions */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 justify-self-end">
              {isOncoScanPage && (
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[12px] font-medium text-white/90">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>MX</span>
                </div>
              )}

              {!isOncoScanPage && (
                <Link
                  href="/oncoscan"
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>OncoScan</span>
                </Link>
              )}

              <Link
                href={isOncoScanPage ? "#patient-kit" : "/oncoscan"}
                className={`px-5 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium active:scale-[0.98] transition-all duration-200 shrink-0 whitespace-nowrap ${
                  isOncoScanPage
                    ? "bg-[#112baf] hover:bg-[#1838d6] text-white border border-white/15 shadow-sm"
                    : "bg-[#1832C7] hover:bg-[#13279E] text-white font-semibold shadow-sm"
                }`}
              >
                {isOncoScanPage ? "Solicitar Kit" : "Explorar OncoScan"}
              </Link>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`pointer-events-auto mx-4 sm:mx-auto mt-3 rounded-3xl backdrop-blur-2xl p-6 shadow-2xl space-y-4 max-w-md w-full ${
              isOncoScanPage
                ? "bg-[#161617]/90 border border-white/15 text-white"
                : "bg-white/90 border border-white/60 ring-1 ring-black/5 text-black"
            }`}
          >
            <div
              className={`flex items-center justify-between pb-3 border-b ${
                isOncoScanPage ? "border-white/10" : "border-black/10"
              }`}
            >
              <Link
                href={isOncoScanPage ? "/oncoscan" : "/"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <Image
                  src={isOncoScanPage ? "/oncoscan.png" : "/logo_cropped.png"}
                  alt={isOncoScanPage ? "OncoScan" : "NeuralHack"}
                  width={28}
                  height={25}
                  className="h-6 w-auto object-contain"
                />
                <span className="font-bold text-sm tracking-tight">
                  {isOncoScanPage ? "OncoScan" : "NeuralHack"}
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-1 rounded-full ${
                  isOncoScanPage
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-neutral-600 hover:text-black hover:bg-black/5"
                }`}
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              {navLinks.map((link) =>
                link.hasImpactToggle ? (
                  <div key={link.href} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setImpactToggleOpen(!impactToggleOpen)}
                      className={`w-full flex items-center justify-between text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors ${
                        isOncoScanPage
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-neutral-800 hover:text-black hover:bg-black/5"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          impactToggleOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {impactToggleOpen && (
                      <Link
                        href="/impacto"
                        onClick={() => {
                          setImpactToggleOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block ml-4 py-2 px-3.5 rounded-xl text-xs font-semibold bg-[#1832C7]/10 text-[#1832C7]"
                      >
                        ↳ Prevención y detección (Cohorte León, GTO)
                      </Link>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors ${
                      link.isBadge
                        ? isOncoScanPage
                          ? "bg-white/15 text-white font-semibold"
                          : "bg-black text-white font-semibold"
                        : isOncoScanPage
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-neutral-800 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isBadge && <Sparkles className="w-4 h-4 text-[#75E65E]" />}
                  </Link>
                )
              )}
            </div>

            <div className={`pt-3 border-t ${isOncoScanPage ? "border-white/10" : "border-black/10"}`}>
              <Link
                href={isOncoScanPage ? "#patient-kit" : "/oncoscan"}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#112baf] hover:bg-[#1838d6] transition-colors shadow-sm"
              >
                {isOncoScanPage ? "Solicitar Kit" : "Ir a OncoScan"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
