import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const logoPath = new URL('../../img/logo.png', import.meta.url).href;

export default function Header() {
  // Inicializamos el estado basado en si la clase 'dark' ya existe o no
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains("dark")
  );

  // Cada vez que cambie isDark, actualizamos el HTML y el localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="w-full py-4 px-8 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/5 flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
      
      {/* LOGO Y NOMBRE */}
      <div className="flex items-center gap-3">
        <Link to="/login" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logoPath} alt="EntrenaTU Logo" className="h-10 w-auto object-contain dark:brightness-110" />
            
            <span className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase hidden sm:block">
              ENTRENA<span className="text-primary">TU</span>
            </span>
        </Link>
      </div>

      {/* NAVEGACIÓN DE ANCLA */}
      <nav className="hidden md:flex gap-8 items-center text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        <a href="#features" className="hover:text-primary dark:hover:text-primary transition-colors">Características</a>
        <a href="#about" className="hover:text-primary dark:hover:text-primary transition-colors">Comunidad</a>
      </nav>
      
      {/* BOTONES DE ACCIÓN */}
      <div className="flex items-center gap-4">
        {/* BOTÓN SOL/LUNA */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent dark:border-zinc-800"
          aria-label="Cambiar tema"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block mx-2" />

        <Link to="/login" className="hidden sm:block">
            <Button variant="secondary" className="px-5 py-2 text-xs uppercase font-bold border-zinc-200 dark:border-zinc-800">
              Entrar
            </Button>
        </Link>
        
        <Link to="/signup">
            <Button className="px-5 py-2 text-xs uppercase font-bold bg-primary hover:bg-orange-600 shadow-lg shadow-primary/20">
              Empezar
            </Button>
        </Link>
      </div>
    </header>
  );
}