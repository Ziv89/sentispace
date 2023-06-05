import classes from './Root.module.scss';

import NavBar from '../../components/nav-bar/NavBar';
import { Outlet } from 'react-router-dom';

const Root = () => (
    <div className={classes.app}>
        <Outlet />
        <NavBar />
    </div>
);

export default Root;
