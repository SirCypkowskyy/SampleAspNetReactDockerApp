import {ReactElement} from "react";
import useThemeStore from "@/store/themeStore.ts";

/**
 * Navbar component
 */
export default function Navbar(): ReactElement {
    
    const { theme, setTheme } = useThemeStore();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <nav className="bg-background text-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <a href="/" className="hover:text-primary">Brand</a>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/about" className="hover:text-primary">About</a>
                    </li>
                    <li>
                        <a href="/services" className="hover:text-primary">Services</a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:text-primary">Contact</a>
                    </li>
                    <li>
                        <button onClick={toggleTheme} className="py-2 px-4 bg-primary text-primary-foreground rounded-md bg-primary">
                            {theme === 'light' ? 'Dark' : 'Light'} Theme
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
