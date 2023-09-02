import { CircleNotch, IconProps } from '@phosphor-icons/react';
import classes from './LoadingIcon.module.scss';

const LoadingIcon = ({
    size = 24,
    color = 'var(--color-neutral-3)',
    ...props
}: IconProps) => {
    return (
        <CircleNotch
            size={size}
            color={color}
            {...props}
            className={classes.spinner}
        />
    );
};

export default LoadingIcon;
