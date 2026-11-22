"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Microscope,
  Droplets,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

interface FormState {
  fullName: string;
  age: string;
  sex: string;
  weightKg: string;
  heightCm: string;
  email: string;
  phone: string;
  generalHistory: string;
  cohortGroup: string;
  histopathologicalDiagnosis: string;
  clinicalStage: string;
  treatmentStatus: string;
  fastingAvailability: string;
  preferredExtractionWindow: string;
  anticoagulantOrHemolysisHistory: string;
  sampleTraceabilityConsent: boolean;
  preliminaryEthicsAck: boolean;
  helsinkiPrivacyAck: boolean;
}

export function ClinicalTrialRegistrationForm() {
  const [submittedFolio, setSubmittedFolio] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    age: "",
    sex: "",
    weightKg: "",
    heightCm: "",
    email: "",
    phone: "",
    generalHistory: "",
    cohortGroup: "Paciente con diagnóstico oncológico (Tumor sólido)",
    histopathologicalDiagnosis: "",
    clinicalStage: "",
    treatmentStatus: "Diagnóstico reciente (sin tratamiento previo)",
    fastingAvailability: "Sí, ayuno de 8 a 12 horas",
    preferredExtractionWindow: "Matutina (07:00 – 10:00 hrs)",
    anticoagulantOrHemolysisHistory: "Ninguna condición conocida",
    sampleTraceabilityConsent: false,
    preliminaryEthicsAck: false,
    helsinkiPrivacyAck: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setSubmittedFolio(`ONCO1-MX-${randomCode}`);
  };

  return (
    <section
      id="formulario-registro"
      className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-14 bg-[#F2F3F5] text-black"
    >
      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Clean Section Heading */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#1832C7] uppercase block">
            PREVALORACIÓN Y REGISTRO DE PACIENTES
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-black leading-[0.98]">
            Formulario de Pre-registro al Estudio Clínico.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Inscripción voluntaria y totalmente gratuita en la lista de espera para conformar los grupos de participantes del estudio.
          </p>
        </div>

        {/* Important Ethical Notice Banner */}
        <div className="rounded-[28px] bg-[#0B1320] text-white p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row items-start gap-5">
          <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-300 shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-mono font-bold uppercase">
                AVISO IMPORTANTE // ETAPA DE PRE-REGISTRO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Actualmente el estudio se encuentra en su etapa de conformación de grupos de participantes. Este registro preliminar permite organizar la lista de espera para la revisión del{" "}
              <strong className="text-white">Comité de Ética en Investigación (CEI)</strong>.{" "}
              <span className="text-blue-300 font-medium">
                Ninguna toma de muestra de sangre se realizará hasta contar con la aprobación del Comité de Ética y la firma presencial de tu Consentimiento Informado.
              </span>
            </p>
          </div>
        </div>

        {/* Main Reception Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Clean Pre-Registration Form */}
          <div className="lg:col-span-8 rounded-[36px] bg-white border border-neutral-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <AnimatePresence mode="wait">
              {submittedFolio ? (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-6 max-w-xl mx-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1832C7] flex items-center justify-center mx-auto">
                    <FileCheck2 className="w-8 h-8" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#1832C7] uppercase">
                    PRE-REGISTRO CONFIRMADO
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                    Solicitud Integrada al Listado ONCO-1
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Tus datos han sido registrados de manera confidencial en nuestra lista de espera. Nuestro equipo médico se pondrá en contacto contigo una vez concluida la validación del Comité de Ética para brindarte toda la información y agendar tu cita sin costo.
                  </p>

                  <div className="p-6 rounded-3xl bg-[#F7F8FA] border border-neutral-200 text-left font-mono text-xs sm:text-sm space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">FOLIO DE PRE-REGISTRO:</span>
                      <span className="font-extrabold text-[#1832C7]">{submittedFolio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">PARTICIPANTE:</span>
                      <span className="font-bold text-black">{form.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">PERFIL:</span>
                      <span className="font-bold text-black">{form.cohortGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">MODALIDAD:</span>
                      <span className="font-bold text-[#1832C7]">VOLUNTARIA // 100% GRATUITA</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmittedFolio(null)}
                    className="px-6 py-3 rounded-full bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors"
                  >
                    Registrar a otro participante
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  {/* BLOCK 1: Datos Generales */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-200">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-[#1832C7]">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#1832C7] uppercase block">
                          PASO 01 // DATOS DEL PARTICIPANTE
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-black">
                          Información Personal e Historial Médico General
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Nombre Completo o Iniciales *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Ej. María Elena Gómez"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Edad *
                        </label>
                        <input
                          type="number"
                          name="age"
                          min={18}
                          max={110}
                          required
                          value={form.age}
                          onChange={handleChange}
                          placeholder="Ej. 52"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Sexo *
                        </label>
                        <select
                          name="sex"
                          required
                          value={form.sex}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Peso Aproximado (kg) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          name="weightKg"
                          required
                          value={form.weightKg}
                          onChange={handleChange}
                          placeholder="Ej. 68"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Estatura (cm) *
                        </label>
                        <input
                          type="number"
                          name="heightCm"
                          required
                          value={form.heightCm}
                          onChange={handleChange}
                          placeholder="Ej. 165"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="correo@ejemplo.com"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Teléfono y Ciudad *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+52 (55) ... / Ciudad"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Historial Clínico General (Antecedentes médicos o padecimientos actuales)
                        </label>
                        <textarea
                          name="generalHistory"
                          rows={2}
                          value={form.generalHistory}
                          onChange={handleChange}
                          placeholder="Comparte brevemente si padeces alguna condición médica general o antecedentes relevantes..."
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BLOCK 2: Información Oncológica / Hematológica */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-200">
                      <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                        <Microscope className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-red-600 uppercase block">
                          PASO 02 // SITUACIÓN MÉDICA ACTUAL
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-black">
                          Diagnóstico y Estado de Tratamiento
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Grupo de Participación *
                        </label>
                        <select
                          name="cohortGroup"
                          required
                          value={form.cohortGroup}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="Paciente con diagnóstico oncológico (Tumor sólido)">
                            Paciente con diagnóstico de cáncer (Tumor sólido)
                          </option>
                          <option value="Paciente con diagnóstico hematológico (Leucemia)">
                            Paciente con diagnóstico hematológico (Leucemia)
                          </option>
                          <option value="Voluntario sano (Grupo de control sin diagnóstico)">
                            Voluntario sano (Grupo control sin diagnóstico)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Estado de Tratamiento *
                        </label>
                        <select
                          name="treatmentStatus"
                          required
                          value={form.treatmentStatus}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="Diagnóstico reciente (sin tratamiento previo)">
                            Diagnóstico reciente (sin tratamiento previo)
                          </option>
                          <option value="En tratamiento activo">
                            En tratamiento activo
                          </option>
                          <option value="En remisión">
                            En remisión
                          </option>
                          <option value="En vigilancia o seguimiento médico">
                            En vigilancia o seguimiento médico
                          </option>
                          <option value="No aplica (Voluntario grupo control)">
                            No aplica (Voluntario grupo control)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Tipo de Diagnóstico Confirmado *
                        </label>
                        <input
                          type="text"
                          name="histopathologicalDiagnosis"
                          required
                          value={form.histopathologicalDiagnosis}
                          onChange={handleChange}
                          placeholder="Ej. Cáncer de mama, Leucemia, o Ninguno (Voluntario sano)"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Etapa o Estadio Clínico Actual *
                        </label>
                        <input
                          type="text"
                          name="clinicalStage"
                          required
                          value={form.clinicalStage}
                          onChange={handleChange}
                          placeholder="Ej. Etapa I, Etapa II, En estudio, o No aplica"
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BLOCK 3: Condiciones para la Toma de Muestra */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-200">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-[#1832C7]">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#1832C7] uppercase block">
                          PASO 03 // PREPARACIÓN PARA LA MUESTRA DE SANGRE
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-black">
                          Condiciones Previas a la Toma de Muestra
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Disponibilidad de Ayuno *
                        </label>
                        <select
                          name="fastingAvailability"
                          value={form.fastingAvailability}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="Sí, ayuno de 8 a 12 horas">
                            Sí, ayuno de 8 a 12 hrs
                          </option>
                          <option value="Ayuno parcial (4 a 6 horas)">
                            Ayuno parcial (4 a 6 hrs)
                          </option>
                          <option value="Requiere indicación médica especial">
                            Requiere indicación especial
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Horario Preferente *
                        </label>
                        <select
                          name="preferredExtractionWindow"
                          value={form.preferredExtractionWindow}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="Matutina (07:00 – 10:00 hrs)">
                            Mañana (07:00 – 10:00 hrs)
                          </option>
                          <option value="Media Mañana (10:00 – 12:00 hrs)">
                            Media Mañana (10:00 – 12:00 hrs)
                          </option>
                          <option value="Sin restricción de horario">
                            Cualquier horario matutino
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-700 uppercase mb-1.5">
                          Uso de Anticoagulantes *
                        </label>
                        <select
                          name="anticoagulantOrHemolysisHistory"
                          value={form.anticoagulantOrHemolysisHistory}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[#F7F8FA] border border-neutral-300 focus:border-[#1832C7] focus:bg-white focus:outline-none text-sm"
                        >
                          <option value="Ninguna condición conocida">
                            No tomo anticoagulantes
                          </option>
                          <option value="En terapia anticoagulante">
                            Sí, tomo anticoagulantes
                          </option>
                          <option value="Antecedente de toma de sangre difícil">
                            Venas difíciles al tomar muestra
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* BLOCK 4: Confirmación de Participación Voluntaria */}
                  <div className="p-6 rounded-3xl bg-[#F7F8FA] border border-neutral-200 space-y-4">
                    <span className="text-xs font-mono font-bold text-black uppercase block">
                      CONFIRMACIÓN DE PRE-REGISTRO (OBLIGATORIO)
                    </span>

                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <input
                        type="checkbox"
                        name="preliminaryEthicsAck"
                        required
                        checked={form.preliminaryEthicsAck}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded accent-[#1832C7] shrink-0"
                      />
                      <span>
                        Entiendo que este formulario es un{" "}
                        <strong className="text-black">pre-registro voluntario y gratuito</strong>, y que ninguna toma de muestra de sangre se realizará hasta contar con la aprobación del Comité de Ética en Investigación y mi firma en el Consentimiento Informado.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <input
                        type="checkbox"
                        name="sampleTraceabilityConsent"
                        required
                        checked={form.sampleTraceabilityConsent}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded accent-[#1832C7] shrink-0"
                      />
                      <span>
                        Autorizo el registro confidencial de mis datos médicos básicos para valorar mi participación en el estudio clínico.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      <input
                        type="checkbox"
                        name="helsinkiPrivacyAck"
                        required
                        checked={form.helsinkiPrivacyAck}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded accent-[#1832C7] shrink-0"
                      />
                      <span>
                        He leído los principios de protección al paciente basados en la{" "}
                        <strong className="text-black">Declaración de Helsinki</strong> y el aviso de privacidad médica.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-full bg-[#1832C7] hover:bg-[#13279E] text-white text-sm sm:text-base font-bold transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <span>Completar Pre-registro Gratuito</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right 4 Columns: Simple & Clear Guide to the Procedure */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[32px] bg-[#0B0F17] text-white p-7 sm:p-8 border border-black/10 shadow-xl space-y-6">
              <div>
                <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                  ¿CÓMO FUNCIONA EL ESTUDIO?
                </span>
                <h3 className="text-2xl font-extrabold mt-1">
                  Información para el Paciente
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Nuestro estudio clínico busca validar la detección oportuna del cáncer mediante un análisis de sangre periférica seguro, rápido y accesible.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                  <span className="font-mono font-bold text-blue-400 block mb-0.5">
                    01 // PARTICIPACIÓN VOLUNTARIA
                  </span>
                  <p className="text-neutral-300">
                    Tú decides libremente participar y puedes retirarte en cualquier momento sin compromiso.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                  <span className="font-mono font-bold text-cyan-400 block mb-0.5">
                    02 // SIN COSTO (GRATUITA)
                  </span>
                  <p className="text-neutral-300">
                    La valoración y el análisis de la muestra no tienen ningún costo para el participante.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                  <span className="font-mono font-bold text-red-400 block mb-0.5">
                    03 // TOMA DE SANGRE RUTINARIA
                  </span>
                  <p className="text-neutral-300">
                    Una vez aprobado por el Comité de Ética, el procedimiento consiste únicamente en una toma de sangre convencional en el brazo (5 a 10 ml) realizada por personal de enfermería certificado.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-white border border-neutral-200/90 p-7 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-[#1832C7] font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Seguridad y Confidencialidad</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Toda tu información clínica se resguarda de forma estrictamente confidencial y protegida. La toma de muestra utiliza material nuevo, estéril y de un solo uso.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-800 pt-2 border-t border-neutral-100">
                <CheckCircle2 className="w-4 h-4 text-[#1832C7] shrink-0" />
                <span>Datos Médicos Protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
