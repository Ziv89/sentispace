import classes from './NavBar.module.scss';

import { GearSix, HouseSimple, Plus } from '@phosphor-icons/react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paths } from '../../main';

enum IconWeight {
    ACTIVE = 'fill',
    NOT_ACTIVE = 'light',
}

const getIconWeight = (isActive: boolean): IconWeight => {
    return isActive ? IconWeight.ACTIVE : IconWeight.NOT_ACTIVE;
};

const BUTTON_ICON_WEIGHT = 'light';
const ICON_SIZE = 32;

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className={classes.navBar}>
            <NavLink
                to={Paths.HOME}
                className={({ isActive }) => (isActive ? classes.active : '')}
            >
                <HouseSimple
                    weight={getIconWeight(location.pathname === Paths.HOME)}
                    size={ICON_SIZE}
                />
                Home
            </NavLink>
            <NavLink to={Paths.ACTIVITIES}>
                <Plus
                    weight={BUTTON_ICON_WEIGHT}
                    size={ICON_SIZE}
                    className={classes.addButton}
                />
            </NavLink>
            <NavLink
                to={Paths.SETTINGS}
                className={({ isActive }) => (isActive ? classes.active : '')}
            >
                <GearSix
                    weight={getIconWeight(location.pathname === Paths.SETTINGS)}
                    size={ICON_SIZE}
                />
                Settings
            </NavLink>
        </nav>
    );
};

export default NavBar;
