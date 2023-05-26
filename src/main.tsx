import './styles/css-variables.scss';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from './data/contexts/CategoriesContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes';

export enum Paths {
    HOME = '/',
    ACTIVITIES = '/activity',
    SETTINGS = '/settings',
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: Paths.HOME, element: <></> },
            { path: Paths.ACTIVITIES, element: <></> },
            { path: Paths.SETTINGS, element: <></> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
);
