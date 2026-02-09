import { NavLink, useNavigate } from "react-router-dom";
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Lógica de logout
        navigate("/login");
    };

    // Función para clases dinámicas
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-4 px-6 py-4 font-bold uppercase transition-all duration-300 border-r-4 
    ${isActive
            ? "text-primary bg-white/5 border-primary"
            : "text-text-muted hover:text-primary hover:bg-white/5 border-transparent"
        }`;

    return (
        <aside className="w-64 bg-surface h-screen flex flex-col border-r border-white/5">
            {/* LOGO */}
            <div className="h-24 flex items-center justify-center border-b border-white/5 mb-2">
                <h1 className="text-2xl font-bold italic tracking-tighter text-primary">
                    ENTRENA<span className="text-text-main">TU</span>
                </h1>
            </div>

            {/* NAVEGACIÓN */}
            <nav className="flex-1 flex flex-col gap-2 py-4">
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

            {/* BOTÓN SALIR */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-6 py-3 w-full text-left font-bold uppercase text-danger hover:text-red-400 hover:bg-danger/10 rounded-xl transition-all duration-300"
                >
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <span>Salir</span>
                </button>
            </div>
        </aside>
    );
}