import { RouteObject } from 'react-router-dom'
import DayView from '../views/day/day-view-page/DayView'
import Categories from '../categories/categories-page/Categories'
import Insights from '../insights/insights-page/Insights'
import Settings from '../settings/settings-page/Settings'
import { Paths } from './Paths.enum'
import Root from './root-page/Root'

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
