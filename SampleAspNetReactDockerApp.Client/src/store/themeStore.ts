import {create} from "zustand";


/**
 * Theme store
 */
interface ThemeState {
    theme: 'light' | 'dark';
}

/**
 * Theme store actions
 */
interface ThemeActions {
    setTheme: (theme: 'light' | 'dark') => void;
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
    theme: "light",
    setTheme: (theme) => set({theme}),
}));

export default useThemeStore;