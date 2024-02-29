import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "@/pages/Home.tsx";
import {Layout} from "@/components/layouts/Layout.tsx";
import "./services/i18n.ts";
import {initLang} from "@/store/langStore.ts";
import Login from "@/pages/Login.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import About from "@/pages/About.tsx";
import Register from "@/pages/Register.tsx";
import Contact from "@/pages/Contact.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/register',
                element: <Register/>,
            },
            {
                path: '/dashboard',
                element: <Dashboard/>,
            },
            {
                path: '/contact',
                element: <Contact/>,
            }
        ]
    }
]);

initLang();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
