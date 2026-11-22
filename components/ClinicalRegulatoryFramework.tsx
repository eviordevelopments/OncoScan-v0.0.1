"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Scale,
  FileSignature,
  Lock,
  Syringe,
  HeartPulse,
  Biohazard,
  UserCheck,
} from "lucide-react";

export function ClinicalRegulatoryFramework() {
  const helsinkiPrinciples = [
    {
      title: "Tu Salud y Bienestar Primero",
      tag: "PRINCIPIO 01",
      desc: "Tus derechos, tu salud, tu dignidad y tu privacidad están siempre por encima de cualquier objetivo científico o tecnológico.",
      icon: <HeartPulse className="w-5 h-5 text-red-400" />,
    },
    {
      title: "Consentimiento Informado Claro",
      tag: "PRINCIPIO 02",
      desc: "Recibirás información clara, transparente y detallada sobre el estudio, sus alcances y beneficios antes de decidir firmar voluntariamente tu participación.",
      icon: <FileSignature className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "Supervisión por Comité de Ética",
      tag: "PRINCIPIO 03",
      desc: "Ninguna toma de muestra se lleva a cabo sin la revisión y aprobación previa de un Comité de Ética en Investigación (CEI) independiente.",
      icon: <Scale className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Privacidad y Confidencialidad",
      tag: "PRINCIPIO 04",
      desc: "Tus datos médicos son protegidos de manera confidencial y segura para garantizar que tu información personal nunca sea expuesta ni utilizada indebidamente.",
      icon: <Lock className="w-5 h-5 text-blue-400" />,
    },
  ];

  const venipunctureNorms = [
    {
      title: "Personal de Salud Certificado",
      tag: "SEGURIDAD 01",
      desc: "La toma de muestra de sangre en el brazo es realizada únicamente por personal de enfermería o flebotomistas clínicos certificados.",
      icon: <UserCheck className="w-5 h-5 text-[#1832C7]" />,
    },
    {
      title: "Material 100% Estéril y Nuevo",
      tag: "SEGURIDAD 02",
      desc: "Se utilizan exclusivamente tubos cerrados al vacío y agujas estériles nuevas de un solo uso, con limpieza antiséptica completa.",
      icon: <Syringe className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Procedimiento de Riesgo Mínimo",
      tag: "SEGURIDAD 03",
      desc: "Es una extracción de sangre rutinaria y breve (5 a 10 ml, equivalente a un estudio de laboratorio común), con atención médica inmediata en todo momento.",
      icon: <ShieldCheck className="w-5 h-5 text-[#1832C7]" />,
    },
    {
      title: "Higiene y Bioseguridad Hospitalaria",
      tag: "SEGURIDAD 04",
      desc: "Todo el material utilizado se desecha bajo las normas oficiales de bioseguridad hospitalaria (RPBI) para proteger tu salud y el entorno.",
      icon: <Biohazard className="w-5 h-5 text-red-600" />,
    },
  ];

  return (
    <section
      id="marco-normativo"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14 bg-[#07090E] text-white rounded-t-[44px] sm:rounded-t-[64px]"
    >
      <div className="max-w-[1400px] mx-auto space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-blue-400 uppercase block">
            ÉTICA MÉDICA Y SEGURIDAD DEL PACIENTE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[0.98]">
            ¿Cómo cuidamos tu seguridad en cada paso?
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed pt-1">
            El estudio clínico se rige por las normas internacionales de ética médica y los protocolos más estrictos para una toma de muestra cómoda, segura y transparente.
          </p>
        </div>

        {/* Block A: Cumplimiento con la Declaración de Helsinki */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                PROTECCIÓN AL PARTICIPANTE
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Principios de la Declaración de Helsinki
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              ASOCIACIÓN MÉDICA MUNDIAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helsinkiPrinciples.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-7 sm:p-8 rounded-[32px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono font-bold text-neutral-300">
                    {item.tag}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Block B: Procedimiento de Toma de Muestra */}
        <div className="rounded-[40px] bg-white text-black p-8 sm:p-12 lg:p-14 shadow-2xl space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#1832C7] uppercase tracking-wider block">
              PROCEDIMIENTO CLÍNICO
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
              Toma de Muestra de Sangre Segura y Sencilla
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              El procedimiento es idéntico a un análisis de sangre de rutina en laboratorio y cumple con cuatro garantías de seguridad clínica:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venipunctureNorms.map((norm, idx) => (
              <motion.div
                key={norm.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 sm:p-8 rounded-[28px] bg-[#F7F8FA] border border-neutral-200/90 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase">
                    {norm.tag}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-sm">
                    {norm.icon}
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-black">
                  {norm.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {norm.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
