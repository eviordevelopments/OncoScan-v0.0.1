"use client";

import React, { useEffect, useRef, useState } from "react";

const SPLINE_VIEWER_SCRIPT = "/spline/spline-viewer.js";
const DESKTOP_SCENE = "/spline/scene-bv.splinecode?v=2";
const MOBILE_SCENE = "/spline/scene-bv-responsive.splinecode?v=2";

let scriptPromise: Promise<void> | null = null;
let shaderPatched = false;

function patchWebGLShaderPrecision(proto: WebGLRenderingContext | WebGL2RenderingContext) {
  const fallbackFormat = { rangeMin: 127, rangeMax: 127, precision: 23 };
  const original = proto.getShaderPrecisionFormat;
  proto.getShaderPrecisionFormat = function (shaderType: number, precisionType: number) {
    try {
      return original.call(this, shaderType, precisionType) ?? (fallbackFormat as WebGLShaderPrecisionFormat);
    } catch {
      return fallbackFormat as WebGLShaderPrecisionFormat;
    }
  };
}

export function BloodVisionHeroAnimation() {
  const viewerContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);
    const handler = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!shaderPatched && typeof WebGLRenderingContext !== "undefined") {
      shaderPatched = true;
      patchWebGLShaderPrecision(WebGLRenderingContext.prototype);
      if (typeof WebGL2RenderingContext !== "undefined") {
        patchWebGLShaderPrecision(WebGL2RenderingContext.prototype);
      }
    }

    let cancelled = false;

    const loadSplineViewer = () => {
      if (typeof customElements !== "undefined" && customElements.get("spline-viewer")) {
        return Promise.resolve();
      }
      if (!scriptPromise) {
        scriptPromise = new Promise<void>((resolve, reject) => {
          const existing = document.querySelector(`script[src="${SPLINE_VIEWER_SCRIPT}"]`);
          if (existing) {
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener("error", () => reject(new Error("spline-viewer failed to load")), {
              once: true,
            });
            return;
          }
          const script = document.createElement("script");
          script.type = "module";
          script.src = SPLINE_VIEWER_SCRIPT;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("spline-viewer failed to load"));
          document.body.appendChild(script);
        }).catch((err) => {
          scriptPromise = null;
          throw err;
        });
      }
      return scriptPromise;
    };

    loadSplineViewer()
      .then(() => {
        if (!cancelled) {
          setViewerReady(true);
        }
      })
      .catch(() => {
        // Fallback if WebGL or script fails
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Hide Spline logo badge inside shadowRoot exactly as Ultrahuman does
  useEffect(() => {
    if (!viewerReady || isDesktop === null) return;
    const viewerEl = viewerContainerRef.current?.querySelector("spline-viewer") as HTMLElement & {
      shadowRoot?: ShadowRoot | null;
    };
    if (!viewerEl) return;

    let attempts = 0;
    const hideLogo = () => {
      const shadow = viewerEl.shadowRoot;
      if (!shadow) return false;
      try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync("a { opacity: 0 !important; display: none !important; }");
        const existing = [...shadow.adoptedStyleSheets];
        if (!existing.includes(sheet)) {
          shadow.adoptedStyleSheets = [...existing, sheet];
        }
        return true;
      } catch {
        const logoLink = shadow.querySelector("a");
        if (logoLink) {
          (logoLink as HTMLElement).style.display = "none";
          return true;
        }
        return false;
      }
    };

    if (!hideLogo()) {
      const timer = window.setInterval(() => {
        if (hideLogo() || attempts >= 25) {
          window.clearInterval(timer);
        }
        attempts += 1;
      }, 100);
      return () => window.clearInterval(timer);
    }
  }, [viewerReady, isDesktop]);

  const sceneUrl = isDesktop ? DESKTOP_SCENE : MOBILE_SCENE;

  return (
    <section className="relative w-screen h-screen bg-black overflow-x-hidden select-none">
      {/* 1. Fullscreen 3D Spline Canvas Container (.pkYU_W_canvasContainer) */}
      <div
        ref={viewerContainerRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        aria-hidden="true"
      >
        {viewerReady &&
          isDesktop !== null &&
          React.createElement("spline-viewer", {
            url: sceneUrl,
            loading: "lazy",
            style: { width: "100%", height: "100%", display: "block" },
          })}
      </div>

      {/* 2. Exact Ultrahuman Blood Vision Bottom-Centered Overlay (.pkYU_W_mainContent[data-cta="none"]) */}
      <div
        data-cta="none"
        className="absolute bottom-[123px] 2xl:bottom-[150px] left-1/2 -translate-x-1/2 w-full md:w-fit px-6 z-10 pointer-events-none text-center"
      >
        {/* ._2gTduW_comingEyebrow */}
        <p className="block text-center uppercase tracking-[3px] text-[11px] font-medium text-[#cccccc] mb-4">
          Coming to your location soon
        </p>

        {/* .oqvZeq_h1 */}
        <h2
          className="text-center font-medium tracking-[-3px] leading-[1.0] text-[48px] lg:text-[72px] 2xl:text-[96px] mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(98.35deg, #FFFFFF 1.84%, #757575 228.23%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Introduciendo
          <br />
          OncoScan 1
        </h2>

        {/* .oqvZeq_p */}
        <p className="text-center text-[#cccccc] text-[19px] lg:text-[24px] leading-[1.1] font-normal whitespace-nowrap">
          Decoding the Language of Blood with UltraTrace
          <span style={{ opacity: 0.5 }}>™</span>
        </p>
      </div>
    </section>
  );
}

