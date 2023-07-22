import { InputHTMLAttributes } from 'react';
import classes from './TimePicker.module.scss';

interface NumberFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    value: number;
}

const NumberField = ({ value, ...props }: NumberFieldProps) => (
    <input
        className={classes.timeInput}
        pattern="[0-9]*"
        inputMode="numeric"
        value={String(value).padStart(2, '0')}
        onChange={(event) => event.preventDefault()}
        {...props}
    />
);

export default NumberField;
