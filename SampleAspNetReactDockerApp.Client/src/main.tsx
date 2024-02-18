import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home.tsx";
import {Layout} from "@/components/layouts/Layout.tsx";
import "./services/i18n.ts";
import {initLang} from "@/store/langStore.ts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
            }
        ]
    }
]);

initLang();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
