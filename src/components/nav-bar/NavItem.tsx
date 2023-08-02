import classes from './NavBar.module.scss';

import { NavLink, useLocation } from 'react-router-dom';
import { Paths } from '../../routes/enums/Paths';
import { IconKeyType, getIconComponent } from '../../assets/icons';

interface NavItemProps {
    label: string;
    path: Paths;
    iconKey: IconKeyType;
}

enum IconWeight {
    ACTIVE = 'fill',
    NOT_ACTIVE = 'light',
}

const getIconWeight = (isActive: boolean): IconWeight => {
    return isActive ? IconWeight.ACTIVE : IconWeight.NOT_ACTIVE;
};

const NavItem = ({ label, path, iconKey }: NavItemProps) => {
    const location = useLocation();

    const IconComponent = getIconComponent(iconKey);
    return (
        <NavLink
            to={path}
            className={({ isActive }) => (isActive ? classes.active : '')}
        >
            <IconComponent weight={getIconWeight(location.pathname === path)} />
            {label}
        </NavLink>
    );
};

export default NavItem;
