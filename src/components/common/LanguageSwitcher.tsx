import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';

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

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };
    const currentLang = i18n.language ? i18n.language.substring(0, 2) : 'es';

    return (
        <div className="relative">
            {/* BOTÓN PRINCIPAL */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 sm:p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary transition-all border border-transparent dark:border-zinc-800 flex items-center justify-center"
                aria-label="Cambiar idioma"
            >
                <Languages size={18} />
            </button>

            {/* MENÚ DESPLEGABLE */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 py-1 z-50 overflow-hidden">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors
                                ${currentLang === lang.code ? 'text-primary font-bold' : 'text-zinc-700 dark:text-zinc-300'}
                            `}
                        >
                            <span>{lang.label}</span>
                            {currentLang === lang.code && <Check size={16} />}
                        </button>
                    ))}
                </div>
            )}

            {/* Fondo transparente para cerrar al hacer clic fuera */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}