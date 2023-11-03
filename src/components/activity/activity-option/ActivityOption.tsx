import classes from './ActivityOption.module.scss';

import { IconKeyType, getIconComponent } from '../../../assets/icons';
import { IconWeight } from '@phosphor-icons/react';
import { MouseEvent, TouchEvent } from 'react';

export interface ActivityOptionProps {
    iconKey: IconKeyType;
    iconWeight?: IconWeight;
    label: string;
    onClick: (event: MouseEvent | TouchEvent) => void;
}

const ActivityOption = ({
    iconKey,
    iconWeight = 'light',
    label,
    onClick,
}: ActivityOptionProps) => {
    const IconComponent = getIconComponent(iconKey);

    return (
        <div className={classes.activityOption}>
            <IconComponent weight={iconWeight} onClick={onClick} />
            <span onClick={onClick}>{label}</span>
        </div>
    );
};

export default ActivityOption;
