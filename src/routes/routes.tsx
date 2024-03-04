import { RouteObject } from 'react-router-dom'
import Categories from './categories/Categories'
import DayView from './day/DayView'
import { Paths } from './enums/Paths'
import Insights from './insights/Insights'
import Root from './root/Root'
import Settings from './settings/Settings'

export const routesConfig: RouteObject = {
  path: '/',
  element: <Root />,
  children: [
    { path: Paths.HOME, element: <DayView /> },
    { path: Paths.CATEGORIES, element: <Categories /> },
    { path: Paths.INSIGHTS, element: <Insights /> },
    { path: Paths.SETTINGS, element: <Settings /> },
  ],
}
