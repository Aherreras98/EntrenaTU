import { useState } from "react";
import { Modal } from "../ui/Modal";

export default function Footer() {
  
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);
  const closeModal = () => setActiveModal(null);

  return (
    <footer className="w-full py-6 bg-surface text-text-muted text-center mt-auto border-t border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary font-bold">ENTRENATU</span>. Todos los derechos reservados.
        </p>
        
        <div className="flex justify-center gap-4 mt-2 text-xs opacity-70">
          <button
            onClick={() => setActiveModal("privacy")}
            className="hover:text-text-main transition-colors cursor-pointer outline-none focus:underline"
          >
            Política de Privacidad
          </button>
          
          <span>•</span>
          
          <button
            onClick={() => setActiveModal("terms")}
            className="hover:text-text-main transition-colors cursor-pointer outline-none focus:underline"
          >
            Términos de Servicio
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={activeModal === "privacy" ? "Política de Privacidad" : "Términos de Servicio"}
      >
        {activeModal === "privacy" ? (
          <div className="space-y-4">
            <p>
              En <strong>ENTRENATU</strong>, tu privacidad es lo primero. Solo recopilamos los datos estrictamente necesarios para que puedas gestionar tus rutinas de entrenamiento.
            </p>
            <h3 className="text-zinc-100 font-bold uppercase text-xs tracking-widest mt-4 underline decoration-primary">Uso de datos</h3>
            <p>Tus progresos y datos personales están cifrados y nunca serán compartidos con terceros sin tu consentimiento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-zinc-100 font-bold uppercase text-xs tracking-widest underline decoration-primary">1. Uso de la plataforma</h3>
            <p>
              EntrenaTU es una herramienta diseñada para el seguimiento de actividad física. El usuario es responsable de realizar los ejercicios en un entorno seguro y bajo su propia supervisión.
            </p>
            
            <h3 className="text-zinc-100 font-bold uppercase text-xs tracking-widest mt-4 underline decoration-primary">2. Exención de Responsabilidad</h3>
            <p>
              La plataforma proporciona rutinas y guías, pero <strong>no sustituye el asesoramiento de un profesional médico o entrenador titulado</strong>. EntrenaTU no se hace responsable de lesiones derivadas de la práctica de los ejercicios mostrados.
            </p>
            
            <h3 className="text-zinc-100 font-bold uppercase text-xs tracking-widest mt-4 underline decoration-primary">3. Propiedad Intelectual</h3>
            <p>Todo el contenido, diseño y algoritmos de la plataforma son propiedad exclusiva de EntrenaTU.</p>
          </div>
        )}
      </Modal>
    </footer>
  );
}