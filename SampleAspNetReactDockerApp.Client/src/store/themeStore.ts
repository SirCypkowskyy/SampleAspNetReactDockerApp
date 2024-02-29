import {create} from "zustand";

/**
 * Theme type definition
 */
type Theme = 'light' | 'dark' | 'system';

/**
 * Theme store
 * @property {Theme} theme - theme
 * @property {string} storageKey - storage key
 */
interface ThemeState {
    theme: Theme;
    storageKey: string;
}

/**
 * Theme store actions
 * @property {function} setTheme - set theme
 */
interface ThemeActions {
    setTheme: (theme: Theme) => void;
}

/**
 * Theme store
 */
type ThemeStore = ThemeState & ThemeActions;

/**
 * Zustand store for theme
 * @returns {ThemeStore} theme store
 * @example const {theme, setTheme} = useThemeStore();
 * @example setTheme("dark");
 * @example console.log(theme);
 * @example <button onClick={() => setTheme("dark")}>Dark</button>
 */
const useThemeStore = create<ThemeStore>((set) => ({
    theme: localStorage.getItem("vite-ui-theme") as Theme || "system",
    storageKey: "vite-ui-theme",
    setTheme: (theme) => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            theme = systemTheme;
        }
        
        root.classList.add(theme);
        
        localStorage.setItem("vite-ui-theme", theme);
        set({theme})
    },
}));

const initialTheme = localStorage.getItem("vite-ui-theme") as Theme;

useThemeStore.getState().setTheme(initialTheme);

export default useThemeStore;