import {ReactElement} from "react";
import Navbar from "@/components/Navbar.tsx";
import {Outlet} from "react-router-dom";

export function Layout(): ReactElement {
    return (
        <div className="h-screen flex flex-col">
            <header>
                <Navbar />
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}