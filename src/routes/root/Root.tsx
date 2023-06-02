import classes from './Root.module.scss';

import NavBar from '../../components/nav-bar/NavBar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { generateData } from '../../data/MOCK_DATA';

const Root = () => {
    useEffect(() => {
        if (import.meta.env.VITE_DEBUG) {
            generateData();
        }
    }, []);

    return (
        <div className={classes.app}>
            <Outlet />
            <NavBar />
        </div>
    );
};

export default Root;
