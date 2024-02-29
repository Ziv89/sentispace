import classes from './Root.module.scss'

import NavBar from '../../components/nav-bar/NavBar'
import { Outlet } from 'react-router-dom'
import NewcomerPrompt from '../../components/newcomer-prompt/NewcomerPrompt'

const Root = () => {
  return (
    <div className={classes.app}>
      <Outlet />
      <NavBar />
      <NewcomerPrompt />
    </div>
  )
}

export default Root
