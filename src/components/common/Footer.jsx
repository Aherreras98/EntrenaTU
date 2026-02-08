export default function Footer() {
  return (
    <footer className="py-10 border-t border-neutral-600 bg-neutral-700">
      <div className="text-center space-y-4">
        <p className="text-xs text-neutral-100 opacity-60 uppercase tracking-widest">
          © 2026 Creado por: Javier Villar, Adrian Herrera, Julia San José & Alba Barroso
        </p>
        <div className="flex justify-center gap-6 text-neutral-100 opacity-40 text-sm">
          <a href="#" className="hover:text-primary-orange transition-colors">Términos</a>
          <a href="#" className="hover:text-primary-orange transition-colors">Privacidad</a>
          <a href="#" className="hover:text-primary-orange transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}