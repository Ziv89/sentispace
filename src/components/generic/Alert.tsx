import classes from './Alert.module.scss';

import {
    CheckCircle,
    Info,
    Warning,
    WarningCircle,
} from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(classes);

export type SeverityType = 'error' | 'warning' | 'info' | 'success';

interface AlertProps {
    severity: SeverityType;
    description?: string;
    title?: string;
    marginTop?: boolean;
    marginButton?: boolean;
    className?: string;
    isScrollIntoView?: boolean;
}

const getAlertIcon = (severity: SeverityType) => {
    switch (severity) {
        case 'error':
            return <WarningCircle />;
        case 'warning':
            return <Warning />;
        case 'info':
            return <Info />;
        case 'success':
            return <CheckCircle />;
    }
};

const Alert = ({
    severity,
    title,
    description,
    marginTop,
    marginButton,
    className,
    isScrollIntoView,
}: AlertProps) => {
    const alertRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isScrollIntoView && alertRef.current) {
            alertRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div
            className={cx(className, {
                alert: true,
                [severity]: true,
                marginTop,
                marginButton,
            })}
            ref={alertRef}
        >
            {getAlertIcon(severity)}
            <div className={classes.content}>
                {!!title && <div className={classes.title}>{title}</div>}
                {description}
            </div>
        </div>
    );
};

export default Alert;
