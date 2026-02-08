import { NavLink, useNavigate } from "react-router-dom";
// Asegúrate de tener instalados los iconos: npm install @heroicons/react
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
        console.log("Cerrando sesión...");
        navigate("/login");
    };

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "sidebar-link active" : "sidebar-link";

    return (
        <aside className="sidebar">
            {/* --- LOGO --- */}
            <div className="h-20 flex items-center justify-center border-b border-white/5 mb-2">
                <h1 className="text-2xl font-bold italic tracking-tighter text-primary">
                    ENTRENA<span className="text-text-main">TU</span>
                </h1>
            </div>

            {/* --- NAVEGACIÓN --- */}
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

            {/* --- BOTÓN SALIR --- */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="sidebar-link w-full text-red-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500"
                >
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <span>Salir</span>
                </button>
            </div>
        </aside>
    );
}