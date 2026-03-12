import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../database/supabase/client";
import { ThemeToggle } from "../ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

import {
    HomeIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
    ChartBarIcon,
    Bars3Icon, // <-- Icono de hamburguesa
    XMarkIcon  // <-- Icono para cerrar (la X)
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Sidebar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // ESTADO PARA CONTROLAR SI EL MENÚ ESTÁ ABIERTO EN MÓVIL
    const [isOpen, setIsOpen] = useState(false);

    const sessionUser = useAuthStore((state) => state.sessionUser);
    const clearSession = useAuthStore((state) => state.clearSession);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isAdmin = useAuthStore((state) => state.isAdmin);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        clearSession();
        navigate("/home");
        setIsOpen(false); 
    };

    const handleLogin = () => {
        navigate("/login");
        setIsOpen(false); 
    };

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "sidebar-link active" : "sidebar-link";

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className="md:hidden h-16 w-full flex items-center justify-between px-4 bg-theme-background border-b border-zinc-200 dark:border-white/5 z-40">
                <h1 className="text-xl font-bold italic tracking-tighter text-primary uppercase">
                    ENTRENA<span className="text-theme-text-main">TU</span>
                </h1>
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="text-theme-text-main p-1"
                >
                    <Bars3Icon className="w-8 h-8" />
                </button>
            </div>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm"
                    onClick={closeMenu}
                />
            )}

            {/* MENÚ LATERAL (Hamburguesa) */}
            <aside className={`
                fixed md:sticky top-0 left-0 z-[60] h-screen w-64 flex flex-col
                bg-theme-background border-r border-zinc-200 dark:border-white/5 
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                md:translate-x-0
            `}>
                
                <div className="h-20 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-white/5 mb-2 shrink-0 md:justify-center">
                    <h1 className="text-2xl font-bold italic tracking-tighter text-primary uppercase">
                        ENTRENA<span className="text-theme-text-main">TU</span>
                    </h1>
                    <button onClick={closeMenu} className="md:hidden p-1">
                        <XMarkIcon className="w-8 h-8" />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-2 py-4 overflow-y-auto px-4">
                    <NavLink to="/home" className={getLinkClass} onClick={closeMenu}>
                        <HomeIcon className="w-6 h-6" />
                        <span>{t('sidebar.home')}</span>
                    </NavLink>
                    <NavLink to="/routines" className={getLinkClass} onClick={closeMenu}>
                        <ClipboardDocumentListIcon className="w-6 h-6" />
                        <span>{t('sidebar.routines')}</span>
                    </NavLink>
                    <NavLink to="/history" className={getLinkClass} onClick={closeMenu}>
                        <ClockIcon className="w-6 h-6" />
                        <span>{t('sidebar.history')}</span>
                    </NavLink>
                    {isAdmin && (
                        <NavLink to="/dashboard" className={getLinkClass} onClick={closeMenu}>
                            <ChartBarIcon className="w-6 h-6" />
                            <span>{t('sidebar.dashboard')}</span>
                        </NavLink>
                    )}
                    <NavLink to="/profile" className={getLinkClass} onClick={closeMenu}>
                        {sessionUser?.profile?.avatar_url ? (
                            <img src={sessionUser.profile.avatar_url} className="w-6 h-6 rounded-full object-cover" alt="" />
                        ) : (
                            <UserIcon className="w-6 h-6" />
                        )}
                        <span>{t('sidebar.profile')}</span>
                    </NavLink>
                </nav>

                <div className="mt-auto p-4 border-t border-zinc-200 dark:border-white/5">
                    <div className="flex justify-center gap-4 mb-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                    <button onClick={isAuthenticated ? handleLogout : handleLogin} className="sidebar-link w-full">
                        {isAuthenticated ? <ArrowLeftOnRectangleIcon className="w-6 h-6" /> : <ArrowRightOnRectangleIcon className="w-6 h-6" />}
                        <span>{isAuthenticated ? t('sidebar.logout') : t('sidebar.login')}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}