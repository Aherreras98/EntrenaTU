import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import en from './locales/en.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

export const defaultNS = 'translation';

export const resources = {
    es: { translation: es },
    en: { translation: en },
    pt: { translation: pt },
    it: { translation: it },
    fr: { translation: fr },
    de: { translation: de },
} as const;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        defaultNS,
        resources,
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;