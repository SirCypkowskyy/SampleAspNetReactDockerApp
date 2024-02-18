import {ReactElement} from "react";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {cn} from "@/lib/utils.ts";
import LangToggle from "@/components/lang-toggle.tsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

/**
 * Navbar component
 */
export default function Navbar(
    {
        className = "",
    }
): ReactElement {

    const { t } = useTranslation();

    return (
        <div className={cn(className)}>
        <nav className="bg-background text-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <a href="/" className="hover:text-primary">
                        {t("app.title")}
                    </a>
                </div>
                <ul className="flex space-x-5 mt-4">
                    <li>
                        <Link to="/about" className="hover:text-primary">
                            {t("navbar.about")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:text-primary">
                            {t("navbar.login")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="hover:text-primary">
                            {t("navbar.register")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-primary">
                            {t("navbar.contact")}
                        </Link>
                    </li>
                    <li>
                        <ModeToggle className={cn("h-8 w-8")} />
                    </li>
                    <li>
                        <LangToggle className={cn("h-8")} />
                    </li>
                </ul>
            </div>
        </nav>
        </div>
    );
}
