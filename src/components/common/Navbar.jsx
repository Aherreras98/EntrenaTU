import logo from '../../img/LogoEntrenaTu.png';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-neutral-700 border-b border-neutral-600">
      {/* Logo y Nombre */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="EntrenaTu Logo" className="h-10 w-auto" />
        <span className="text-xl font-black tracking-tighter uppercase">
          ENTRENA<span className="text-primary-orange">TÚ</span>
        </span>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-3">
        <button className="text-sm font-bold px-4 py-2 rounded hover:text-primary-orange transition-colors">
          Iniciar Sesión
        </button>
        <button className="bg-primary-orange hover:bg-primary-hover text-neutral-700 text-sm font-bold px-5 py-2 rounded shadow-lg transition-all">
          Regístrate
        </button>
      </div>
    </nav>
  );
}