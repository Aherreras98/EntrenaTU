export default function Footer() {
  return (
    <footer className="w-full py-6 bg-surface text-text-muted text-center mt-auto border-t border-white/10">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="text-primary font-bold">ENTRENATU</span>. Todos los derechos reservados.
        </p>
        <div className="flex justify-center gap-4 mt-2 text-xs opacity-70">
          <a href="#" className="hover:text-text-main transition-colors">Política de Privacidad</a>
          <span>•</span>
          <a href="#" className="hover:text-text-main transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
}