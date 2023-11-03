import classes from './NavBar.module.scss';

import { Plus } from '@phosphor-icons/react';
import { Paths } from '../../routes/enums/Paths';
import { useEffect, useState } from 'react';
import NavItem from './NavItem';
import Button from '../input/button/Button';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import ActivityEditForm from '../activity-edit-form/ActivityEditForm';
import TemplateSelection from '../template-selection/TemplateSelection';

const cx = classNames.bind(classes);

const NavBar = () => {
    const [isPopup, setIsPopup] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] =
        useState<boolean>(false);
    const [isTemplateSelectionModalOpen, setIsTemplateSelectionModalOpen] =
        useState<boolean>(false);

    const { pathname } = useLocation();

    const handleCreateActivity = (): void => {
        setIsActivityModalOpen(true);
        setIsPopup(false);
    };

    const handleCreateActivityFromTemplate = (): void => {
        setIsTemplateSelectionModalOpen(true);
        setIsPopup(false);
    };

    useEffect(() => {
        if (isPopup) setIsPopup(false);
    }, [pathname]);

    return (
        <nav className={classes.navBar}>
            <div
                className={cx(classes.createButtonsWrapper, { open: isPopup })}
            >
                <div className={classes.createButtonsContainer}>
                    <Button variant="primary" onClick={handleCreateActivity}>
                        Create Activity
                    </Button>
                    {isActivityModalOpen && (
                        <ActivityEditForm
                            onClose={() => setIsActivityModalOpen(false)}
                        />
                    )}
                    <Button
                        variant="secondary"
                        onClick={handleCreateActivityFromTemplate}
                    >
                        Create from Template
                    </Button>
                    {isTemplateSelectionModalOpen && (
                        <TemplateSelection
                            onClose={() =>
                                setIsTemplateSelectionModalOpen(false)
                            }
                        />
                    )}
                </div>
            </div>
            <div className={classes.navButtons}>
                <NavItem label="Home" iconKey="HouseSimple" path={Paths.HOME} />
                <NavItem
                    label="Categories"
                    iconKey="SquaresFour"
                    path={Paths.CATEGORIES}
                />
                <div>
                    <Plus
                        className={cx(classes.addButton, { active: isPopup })}
                        onClick={() => setIsPopup((prev) => !prev)}
                    />
                </div>
                <NavItem
                    label="Insights"
                    iconKey="Sunglasses"
                    path={Paths.INSIGHTS}
                />
                <NavItem
                    label="Settings"
                    iconKey="GearSix"
                    path={Paths.SETTINGS}
                />
            </div>
        </nav>
    );
};

export default NavBar;
