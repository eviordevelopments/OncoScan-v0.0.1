import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-[#F5F5F7] text-neutral-600 text-sm sm:text-base font-mono py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            {/* NeuralHack Official Logotype - Direct, Crisp, High-res */}
            <div className="flex items-center">
              <a href="#" aria-label="NeuralHack Health Technologies" className="inline-block group">
                <Image
                  src="/NeuralHack-logotype.png"
                  alt="NeuralHack Health Technologies"
                  width={340}
                  height={80}
                  unoptimized
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  priority
                />
              </a>
            </div>

            <p className="text-sm sm:text-base text-neutral-500 font-sans leading-relaxed max-w-md">
              Sistemas moleculares perimetrales para la detección ultra-temprana del cáncer mediante microfluidos, microARN y Edge AI en chip. Desarrollado por NeuralHack Health Technologies.
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Protocolo ONCO-1 en Curso Clínico</span>
            </div>
          </div>

          <div>
            <h4 className="text-black font-bold text-sm sm:text-base mb-4 tracking-wider">TECNOLOGÍA</h4>
            <ul className="space-y-2.5">
              <li><a href="/oncoscan" className="hover:text-black transition-colors font-semibold">OncoScan Gen-1</a></li>
              <li><a href="/oncoscan#hero-experience" className="hover:text-black transition-colors">Microfluidos COC</a></li>
              <li><a href="/oncoscan#biomarkers" className="hover:text-black transition-colors">Panel microARN</a></li>
              <li><a href="/oncoscan#hardware-closer-look-container" className="hover:text-black transition-colors">Edge AI en Chip</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold text-sm sm:text-base mb-4 tracking-wider">CIENCIA</h4>
            <ul className="space-y-2.5">
              <li><a href="/protocolo-onco-1" className="hover:text-black transition-colors font-semibold">Protocolo ONCO-1 (Pre-registro)</a></li>
              <li><a href="/oncoscan#clinical-validation" className="hover:text-black transition-colors">Publicaciones</a></li>
              <li><a href="/oncoscan#clinical-validation" className="hover:text-black transition-colors">ISO 13485</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold text-sm sm:text-base mb-4 tracking-wider">ACCESO</h4>
            <ul className="space-y-2.5">
              <li><a href="/oncoscan#patient-kit" className="hover:text-black transition-colors">Kit Personal</a></li>
              <li><a href="/oncoscan#patient-kit" className="hover:text-black transition-colors">Hospitales B2B</a></li>
              <li><a href="/oncoscan#patient-kit" className="hover:text-black transition-colors">Inversionistas</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer (Mandatory clinical disclaimer) */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans shadow-sm">
          <p>
            <strong className="text-black font-mono">AVISO CLÍNICO Y REGULATORIO:</strong> El dispositivo OncoScan Gen-1 y sus cartuchos microfluídicos se encuentran en fase de validación clínica multicéntrica bajo el protocolo ONCO-1. Ningún contenido de este portal pretende sustituir la evaluación de un oncólogo certificado ni biopsias anatomopatológicas confirmatorias.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200 text-neutral-500 text-xs sm:text-sm">
          <div>
            &copy; {currentYear} NeuralHack Health Technologies Inc. / OncoScan. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacidad Genómica</a>
            <a href="#" className="hover:text-black transition-colors">Términos</a>
            <a href="#" className="hover:text-black transition-colors">Cifrado AES-256</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
