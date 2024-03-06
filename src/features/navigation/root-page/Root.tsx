import NavBar from '../nav-bar/NavBar'
import NewcomerPrompt from '../../../components/newcomer-prompt/NewcomerPrompt'
import { Outlet } from 'react-router-dom'
import classes from './Root.module.scss'

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
