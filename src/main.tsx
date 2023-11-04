import './styles/css-variables.scss';
import './styles/main.scss';

import { IconContext } from '@phosphor-icons/react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { iconConfig } from './assets/icons';
import CategoryContextProvider from './data/contexts/CategoriesContext';
import DayViewContextProvider from './data/contexts/DayViewContext';
import { InstallPromptProvider } from './data/contexts/InstallPromptContext';
import { generateData } from './data/MOCK_DATA';
import { routesConfig } from './routes/routes';

if (import.meta.env.DEV) generateData();

const router = createBrowserRouter([routesConfig]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <CategoryContextProvider>
        <DayViewContextProvider>
            <InstallPromptProvider>
                <IconContext.Provider value={iconConfig}>
                    <RouterProvider router={router} />
                </IconContext.Provider>
            </InstallPromptProvider>
        </DayViewContextProvider>
    </CategoryContextProvider>
);
