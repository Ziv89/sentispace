import './styles/css-variables.scss';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from './data/contexts/CategoriesContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root/Root';
import { Paths } from './routes/enums/Paths';
import DayViewContextProvider from './data/contexts/DayViewContext';
import DayView from './routes/day/DayView';
import { IconContext, IconProps } from '@phosphor-icons/react';
import { generateData } from './data/MOCK_DATA';
import Settings from './routes/settings/Settings';
import Insights from './routes/insights/Insights';
import Categories from './routes/categories/Categories';

if (import.meta.env.DEV) generateData();

const iconProps: IconProps = {
    size: 32,
    weight: 'light',
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: Paths.HOME,
                element: (
                    <DayViewContextProvider>
                        <DayView />
                    </DayViewContextProvider>
                ),
            },
            { path: Paths.CATEGORIES, element: <Categories /> },
            { path: Paths.INSIGHTS, element: <Insights /> },
            { path: Paths.SETTINGS, element: <Settings /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ContextProvider>
            <IconContext.Provider value={iconProps}>
                <RouterProvider router={router} />
            </IconContext.Provider>
        </ContextProvider>
    </React.StrictMode>
);
