import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Languages, Check, X } from 'lucide-react';

const LANGUAGES = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'es';

    const modalContent = isOpen ? (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            {/* Contenedor del Modal */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200">
                
                {/* CABECERA DEL MODAL */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <Languages size={22} className="text-primary" />
                        Idioma / Language
                    </h3>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="p-2 -mr-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* CUADRÍCULA DE IDIOMAS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm hover:scale-[1.02]
                                ${currentLang === lang.code 
                                    ? 'border-primary dark:border-primary bg-primary/10 text-primary' 
                                    : 'text-zinc-600 dark:text-zinc-300 hover:border-primary/50 hover:text-primary bg-white dark:bg-zinc-900'
                                }
                            `}
                        >
                            <span>{lang.label}</span>
                            {currentLang === lang.code && <Check size={18} strokeWidth={3} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            {/* BOTÓN PRINCIPAL */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-1.5 sm:p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary transition-all border border-transparent dark:border-zinc-800 flex items-center justify-center"
                aria-label="Cambiar idioma"
            >
                <Languages size={18} />
            </button>

            {/* RENDERIZAMOS EL MODAL EN EL BODY MEDIANTE CREATE PORTAL */}
            {mounted && createPortal(modalContent, document.body)}
        </>
    );
}