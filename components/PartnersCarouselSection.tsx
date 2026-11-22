"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
}

const PARTNERS: PartnerLogo[] = [
  {
    name: "Tecnológico de Monterrey",
    src: "/partners/tec-de-monterrey.png",
    width: 1600,
    height: 421,
    className: "h-12 sm:h-16 w-auto",
  },
  {
    name: "IMSS — Instituto Mexicano del Seguro Social",
    src: "/partners/imss.png",
    width: 678,
    height: 842,
    className: "h-14 sm:h-20 w-auto",
  },
  {
    name: "Oncología Ornelas — Especialista en Tratamiento Oncológico",
    src: "/partners/oncologia-ornelas.png",
    width: 367,
    height: 228,
    className: "h-14 sm:h-20 w-auto",
  },
  {
    name: "Cinvestav — Genómica Avanzada",
    src: "/partners/cinvestav.png",
    width: 406,
    height: 487,
    className: "h-16 sm:h-20 w-auto",
  },
  {
    name: "Orbit — Martin Trust Center for MIT Entrepreneurship",
    src: "/partners/orbit.png",
    width: 2124,
    height: 307,
    className: "h-10 sm:h-12 w-auto",
  },
  {
    name: "CIMAT — Centro de Investigación en Matemáticas",
    src: "/partners/cimat.png",
    width: 752,
    height: 328,
    className: "h-13 sm:h-16 w-auto",
  },
  {
    name: "ITRASIG — Instituto Traslacional de Singularidad Genómica",
    src: "/partners/itrasig.png",
    width: 506,
    height: 175,
    className: "h-12 sm:h-16 w-auto",
  },
  {
    name: "Distrito Tlalpan",
    src: "/partners/distrito-tlalpan.png",
    width: 474,
    height: 160,
    className: "h-11 sm:h-14 w-auto",
  },
  {
    name: "Instituto de Emprendimiento Eugenio Garza Lagüera",
    src: "/partners/ieegl-tec.png",
    width: 2203,
    height: 285,
    className: "h-11 sm:h-14 w-auto",
  },
  {
    name: "Bridge for Billions",
    src: "/partners/bridge-for-billions.png",
    width: 1084,
    height: 996,
    className: "h-14 sm:h-18 w-auto",
  },
  {
    name: "Hecho en México",
    src: "/partners/hecho-en-mexico.png",
    width: 1923,
    height: 1921,
    className: "h-14 sm:h-20 w-auto",
  },
];

export function PartnersCarouselSection() {
  // Duplicate array twice for a seamless 0% -> -50% infinite marquee loop
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="aliados-estrategicos"
      aria-label="Respaldados por Patrocinadores, Aliados e Instituciones de Investigación"
      className="relative w-full py-20 sm:py-28 bg-transparent overflow-hidden select-none z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 sm:mb-16 text-center">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-medium tracking-[-0.02em] text-neutral-800">
          Respaldados por Patrocinadores, Aliados e Instituciones de Investigación
        </h2>
      </div>

      {/* Infinite Monochromatic Carousel Container without card backgrounds */}
      <div
        className="relative w-full overflow-hidden flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-16 sm:gap-24 lg:gap-28 w-max pr-16 sm:pr-24 lg:pr-28"
        >
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="shrink-0 flex items-center justify-center bg-transparent opacity-60 hover:opacity-100 grayscale contrast-125 transition-opacity duration-300"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                unoptimized
                className={`${partner.className ?? "h-14 w-auto"} object-contain pointer-events-none`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
