import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../../img/logo.png";

export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-surface border-b border-white/5 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={Logo} alt="EntrenaTU Logo" className="h-12 w-auto object-contain" />
            
            <span className="text-xl font-black text-text-main tracking-tighter uppercase hidden sm:block">
            ENTRENA<span className="text-primary">TU</span>
            </span>
        </Link>
      </div>
      
      <div className="flex gap-4">
        <Link to="/login">
            <Button variant="secondary" className="px-6 py-2 text-sm">
              Iniciar Sesión
            </Button>
        </Link>
        
        <Link to="/register">
            <Button className="px-6 py-2 text-sm">
              Regístrate
            </Button>
        </Link>
      </div>
    </header>
  );
}