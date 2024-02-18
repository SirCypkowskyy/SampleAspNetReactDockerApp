import {create} from "zustand";
import i18next from "i18next";

type Lang = 'en' | 'pl' | 'system';

/**
 * Lang state
 * @property {Lang} lang - language
 * @property {string} storageKey - storage key
 */
interface LangState {
    lang: Lang;
    storageKey: string;
}

/**
 * Lang actions
 * @property {function} setLang - set language
 */
interface LangActions {
    setLang: (lang: Lang) => void;
}


type LangStore = LangState & LangActions;

/**
 * Zustand store for lang
 * @returns {LangStore} lang store
 * @example const {lang, setLang} = useLangStore();
 * @example setLang("pl");
 * @example console.log(lang);
 * @example <button onClick={() => setLang("pl")}>Polish</button>
 */
const useLangStore = create<LangStore>((set) => ({
    lang: "en",
    storageKey: "i18nextLng",
    setLang: (lang) => {
        const root = document.documentElement;
        root.classList.remove("en", "pl");

        if (lang === "system") {
            const systemLang = window.navigator.language.startsWith("pl")
                ? "pl"
                : "en";
            lang = systemLang as Lang;
        }

        root.classList.add(lang);

        localStorage.setItem("i18nextLng", lang);
        set({lang});
        i18next.changeLanguage(lang);
    }
}));

/**
 * Initialize language from local storage or set default language
 */
const initLang = () => {
    const lang = localStorage.getItem("i18nextLng");
    try {
        if (lang) {
            useLangStore.getState().setLang(lang as Lang);
            return;
        }

        if (window.navigator.language.startsWith("pl")) {
            useLangStore.getState().setLang("pl");
            return;
        }
        useLangStore.getState().setLang("en");
    } catch (e) {
        useLangStore.getState().setLang("en");
    }
};

// initLang();


export {useLangStore, initLang};