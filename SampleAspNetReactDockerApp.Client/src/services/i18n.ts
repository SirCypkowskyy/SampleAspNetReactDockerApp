import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import plJSON from "@/../public/locales/pl/translation.json";
import enJSON from "@/../public/locales/en/translation.json";
import {initReactI18next} from "react-i18next";


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        backend: {
            loadPath: "/localization/{{lng}}/translation.json",
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: true,
        },
        resources: {
            en: {...enJSON},
            pl: {...plJSON},
        },
    });

export default i18n;