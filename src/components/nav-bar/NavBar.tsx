import classes from './NavBar.module.scss';

import { Plus } from '@phosphor-icons/react';
import { Paths } from '../../routes/enums/Paths';
import { useState } from 'react';
import ActivityEditForm from '../activity-edit-form/ActivityEditForm';
import NavItem from './NavItem';

const NavBar = () => {
    const [isActivityModalOpen, setIsActivityModalOpen] =
        useState<boolean>(false);

    return (
        <nav className={classes.navBar}>
            <NavItem label="Home" iconKey="HouseSimple" path={Paths.HOME} />
            <NavItem
                label="Categories"
                iconKey="SquaresFour"
                path={Paths.CATEGORIES}
            />
            <div onClick={() => setIsActivityModalOpen(true)}>
                <Plus className={classes.addButton} />
                {isActivityModalOpen && (
                    <ActivityEditForm
                        onClose={() => setIsActivityModalOpen(false)}
                    />
                )}
            </div>
            <NavItem
                label="Insights"
                iconKey="Sunglasses"
                path={Paths.INSIGHTS}
            />
            <NavItem label="Settings" iconKey="GearSix" path={Paths.SETTINGS} />
        </nav>
    );
};

export default NavBar;
