import classes from './Switch.module.scss';

import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

const cx = classNames.bind(classes);

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

const Switch = ({
    className,
    name,
    label,
    checked,
    onChange,
    ...props
}: SwitchProps) => {
    return (
        <label className={cx(className, { switch: true })}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <span className={classes.slider} />
        </label>
    );
};

export default Switch;
