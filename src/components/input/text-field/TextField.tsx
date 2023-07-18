import classes from './TextField.module.scss';

import { IconKeyType, getIconComponent } from '../../../assets/icons';
import {
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    useEffect,
    useId,
    useRef,
} from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

type InputAndTextareaAttributes = InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>;

interface TextFieldProps extends InputAndTextareaAttributes {
    label?: string;
    iconKey?: IconKeyType;
    multiline?: boolean;
    className?: string;
}

export type TextFieldElement = HTMLInputElement | HTMLTextAreaElement;

const TextField = ({
    multiline,
    iconKey,
    label,
    className,
    ...props
}: TextFieldProps) => {
    const uniqueId = useId();

    const renderInput = () => (
        <div className={classes.input}>
            {Icon && (
                <div className={classes.inputIcon}>
                    <Icon />
                </div>
            )}
            {multiline ? (
                <TextArea id={uniqueId} {...props} />
            ) : (
                <input
                    id={uniqueId}
                    autoComplete="off"
                    type={props.type || 'text'}
                    {...props}
                />
            )}
        </div>
    );

    const Icon = iconKey ? getIconComponent(iconKey) : null;
    return label ? (
        <label htmlFor={uniqueId} className={cx(className, { label: true })}>
            {label}
            {renderInput()}
        </label>
    ) : (
        renderInput()
    );
};

const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '0px';
            const scrollHeight = textAreaRef.current.scrollHeight;

            textAreaRef.current.style.height = scrollHeight + 'px';
        }
    }, [textAreaRef, props.value]);

    return <textarea ref={textAreaRef} {...props} />;
};

export default TextField;
