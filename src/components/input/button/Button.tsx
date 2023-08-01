import classNames from 'classnames/bind';

import classes from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

const cx = classNames.bind(classes);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
    children: string;
    isDangerous?: boolean;
    underline?: boolean;
    className?: string;
}

const Button = ({
    variant,
    children,
    isDangerous,
    underline,
    className,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cx(className, {
                [variant]: true,
                isDangerous,
                underline,
            })}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
