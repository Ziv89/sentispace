import { KeyboardEvent } from 'react';
import NumberField from './NumberField';
import classes from './TimePicker.module.scss';

import { getHours, getMinutes, set } from 'date-fns';

interface TimeInputProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

const enum timePeriod {
    AM = 'AM',
    PM = 'PM',
}

const enum Units {
    HOURS = 'hours',
    MINUTES = 'minutes',
}

const units = {
    hours: { min: 1, max: 12, getUnit: getHours },
    minutes: { min: 0, max: 59, getUnit: getMinutes },
} as const;

const TimeInput = ({ date, onDateChange }: TimeInputProps) => {
    const hours24h = getHours(date);
    const hours12h = hours24h >= 12 ? hours24h - 12 : hours24h;
    const displayed12h = hours12h === 0 ? 12 : hours12h;

    const minutes = getMinutes(date);

    const ampm = hours24h >= 12 ? timePeriod.PM : timePeriod.AM;

    const handleTimeInput = (event: KeyboardEvent, unit: Units): void => {
        const { key } = event;
        if (key !== 'Tab') event.preventDefault();

        const input = parseInt(key);
        if (isNaN(input) || input < 0 || input > 9) return;

        const { min, max } = units[unit];
        const previous = unit === Units.HOURS ? displayed12h : minutes;
        const concatenated = parseInt(String(previous) + String(input));

        let current = input;

        if (concatenated >= min && concatenated <= max) current = concatenated;
        if (current < min || current > max) current = previous;

        if (unit === Units.HOURS) {
            if (ampm === timePeriod.AM && current === 12) current = 0;
            if (ampm === timePeriod.PM && current !== 12) current += 12;
        }

        const updatedDate = set(date, { [unit]: current });

        onDateChange(updatedDate);
    };

    const handleAMPMToggle = (): void => {
        const adjustedHour =
            ampm === timePeriod.AM ? hours24h + 12 : hours24h - 12;
        const updatedDate = set(date, { hours: adjustedHour });

        onDateChange(updatedDate);
    };

    return (
        <div className={classes.inputWrapper}>
            <div className={classes.inputContainer}>
                <NumberField
                    value={displayed12h}
                    onKeyDown={(event) => handleTimeInput(event, Units.HOURS)}
                />
                <div className={classes.divider}>:</div>
                <NumberField
                    value={minutes}
                    onKeyDown={(event) => handleTimeInput(event, Units.MINUTES)}
                />
            </div>
            <div
                className={classes.timePeriodToggle}
                tabIndex={0}
                onClick={handleAMPMToggle}
            >
                {ampm}
            </div>
        </div>
    );
};

export default TimeInput;
