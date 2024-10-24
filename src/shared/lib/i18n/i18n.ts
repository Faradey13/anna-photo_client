import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import enTranslations from '../../locales/en/translation.json';
import ruTranslations from '../../locales/ru/translation.json';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'en',
        debug: import.meta.env.MODE === 'development',

        interpolation: {
            escapeValue: false,
        },

        resources: {
            en: { translation: enTranslations },
            ru: { translation: ruTranslations },
        },
    });

export default i18n;