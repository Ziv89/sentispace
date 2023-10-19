import classes from './ActivityOption.module.scss';

import { HTMLAttributes } from 'react';
import { IconKeyType, getIconComponent } from '../../../assets/icons';
import { IconWeight } from '@phosphor-icons/react';

interface ActivityOptionProps extends HTMLAttributes<HTMLDivElement> {
    iconKey: IconKeyType;
    iconWeight?: IconWeight;
    label: string;
}

const ActivityOption = ({
    iconKey,
    iconWeight = 'light',
    label,
    ...props
}: ActivityOptionProps) => {
    const IconComponent = getIconComponent(iconKey);

    return (
        <div className={classes.activityOption} {...props}>
            <IconComponent weight={iconWeight} />
            {label}
        </div>
    );
};

export default ActivityOption;
