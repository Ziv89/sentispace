import './styles/css-variables.scss';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from './data/contexts/CategoriesContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IconContext } from '@phosphor-icons/react';
import { generateData } from './data/MOCK_DATA';
import { iconConfig } from './assets/icons';
import { routesConfig } from './routes/routes';
import { InstallPromptProvider } from './data/contexts/InstallPromptContext';

if (import.meta.env.DEV) generateData();

const router = createBrowserRouter([routesConfig]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ContextProvider>
            <InstallPromptProvider>
                <IconContext.Provider value={iconConfig}>
                    <RouterProvider router={router} />
                </IconContext.Provider>
            </InstallPromptProvider>
        </ContextProvider>
    </React.StrictMode>
);
