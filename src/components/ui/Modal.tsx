import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Guardar foco previo (Apuntes: previouslyFocused)
      previouslyFocused.current = document.activeElement as HTMLElement;
      
      // 2. Bloquear scroll (Apuntes: Scroll Lock)
      document.body.style.overflow = 'hidden';

      // 3. Enfocar el título o el modal al abrir
      modalRef.current?.focus();

      // 4. Manejar tecla Escape
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        
        // 5. Bloquear el foco dentro (Focus Trap)
        if (e.key === 'Tab') {
          const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable && focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              last.focus();
              e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
        // 6. Restaurar foco (Apuntes: Volver al botón original)
        previouslyFocused.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 7. Uso de createPortal (Apuntes: Renderizar fuera del árbol DOM)
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        tabIndex={-1} // Permite enfocar el contenedor para lectores
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col focus:outline-none"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-6 bg-zinc-900/50">
          <h2 id="modal-title" className="text-xl font-bold text-zinc-100 uppercase italic tracking-wider outline-none">
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-white transition-colors text-2xl p-2"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 text-zinc-400 font-light leading-relaxed custom-scrollbar">
          {children}
        </div>

        <div className="border-t border-zinc-800 p-4 text-right bg-zinc-900/50">
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-8 py-2.5 text-sm font-bold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all active:scale-95"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};