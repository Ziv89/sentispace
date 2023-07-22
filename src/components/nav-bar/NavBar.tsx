import classes from './NavBar.module.scss';

import { GearSix, HouseSimple, Plus } from '@phosphor-icons/react';
import { NavLink, useLocation } from 'react-router-dom';
import { Paths } from '../../routes/enums/Paths';
import { useState } from 'react';
import ActivityEditForm from '../activity-edit-form/ActivityEditForm';

enum IconWeight {
    ACTIVE = 'fill',
    NOT_ACTIVE = 'light',
}

const getIconWeight = (isActive: boolean): IconWeight => {
    return isActive ? IconWeight.ACTIVE : IconWeight.NOT_ACTIVE;
};

const NavBar = () => {
    const location = useLocation();

    const [isActivityModalOpen, setIsActivityModalOpen] =
        useState<boolean>(false);

    return (
        <nav className={classes.navBar}>
            <NavLink
                to={Paths.HOME}
                className={({ isActive }) => (isActive ? classes.active : '')}
            >
                <HouseSimple
                    weight={getIconWeight(location.pathname === Paths.HOME)}
                />
                Home
            </NavLink>
            <div onClick={() => setIsActivityModalOpen(true)}>
                <Plus className={classes.addButton} />
                {isActivityModalOpen && (
                    <ActivityEditForm
                        onClose={() => setIsActivityModalOpen(false)}
                    />
                )}
            </div>
            <NavLink
                to={Paths.SETTINGS}
                className={({ isActive }) => (isActive ? classes.active : '')}
            >
                <GearSix
                    weight={getIconWeight(location.pathname === Paths.SETTINGS)}
                />
                Settings
            </NavLink>
        </nav>
    );
};

export default NavBar;
