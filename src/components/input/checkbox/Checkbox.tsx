import classes from './Checkbox.module.scss';

import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

const cx = classNames.bind(classes);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

const Checkbox = ({
    className,
    name,
    label,
    checked,
    onChange,
    ...props
}: CheckboxProps) => {
    return (
        <label className={cx(className, { checkboxLabel: true })}>
            <input
                type="checkbox"
                name={name}
                className={classes.checkbox}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            {label}
        </label>
    );
};

export default Checkbox;
