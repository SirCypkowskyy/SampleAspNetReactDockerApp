import {ReactElement} from "react";
import useThemeStore from "@/store/themeStore.ts";
import { Moon, Sun } from "lucide-react"
import {Button} from "@/components/ui/button.tsx";

export function ModeToggle(
    {
        className = "",
    }
): ReactElement {
    const toggleTheme = useThemeStore((state) => state.setTheme);
    const theme = useThemeStore((state) => state.theme);

    return (
        <Button className={className} variant="outline" size="icon" onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
    
}