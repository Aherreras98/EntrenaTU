import { NavLink, useNavigate } from "react-router-dom";

import {
    HomeIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/solid";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../database/supabase/client";
import { ThemeToggle } from "../ThemeToggle";

export default function Sidebar() {
    const navigate = useNavigate();

    const session = useAuthStore((state) => state.session);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const isAuthenticated = !!session;
   
    console.log("INICIO DE LA SESIÓN:", { 
        sessionActual: session, 
        estaAutenticado: isAuthenticated 
    });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        clearAuth(); // Limpiamos Zustand
        navigate("/home"); // Va al home
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "sidebar-link active" : "sidebar-link";

   return (
        <aside className="sidebar flex flex-col h-screen sticky top-0 border-r border-zinc-200 dark:border-white/5 transition-colors duration-300">
            {/* LOGO */}
            <div className="h-20 flex items-center justify-center border-b border-zinc-200 dark:border-white/5 mb-2 shrink-0">
                <h1 className="text-2xl font-bold italic tracking-tighter text-primary">
                    ENTRENA<span className="text-text-main">TU</span>
                </h1>
            </div>

            {/* NAVEGACIÓN */}
            <nav className="flex-1 flex flex-col gap-2 py-4 overflow-y-auto">
                <NavLink to="/home" className={getLinkClass}>
                    <HomeIcon className="w-6 h-6" />
                    <span>Inicio</span>
                </NavLink>

                <NavLink to="/routines" className={getLinkClass}>
                    <ClipboardDocumentListIcon className="w-6 h-6" />
                    <span>Rutinas</span>
                </NavLink>

                <NavLink to="/history" className={getLinkClass}>
                    <ClockIcon className="w-6 h-6" />
                    <span>Historial</span>
                </NavLink>

                <NavLink to="/profile" className={getLinkClass}>
                    <UserIcon className="w-6 h-6" />
                    <span>Perfil</span>
                </NavLink>
            </nav>

            {/* BLOQUE INFERIOR */}
            <div className="mt-auto shrink-0 flex flex-col gap-4">
                <div className="flex justify-center">
                    <ThemeToggle />
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-white/5 bg-sidebar-bg">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="sidebar-link w-full text-red-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all"
                        >
                            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                            <span>Salir</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="sidebar-link w-full text-primary hover:text-primary/80 hover:bg-primary/10 hover:border-primary transition-all font-bold"
                        >
                            <ArrowRightOnRectangleIcon className="w-6 h-6" />
                            <span>Iniciar Sesión</span>
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}