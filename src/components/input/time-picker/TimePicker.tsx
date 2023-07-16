import classes from './TimePicker.module.scss';

import TextField from '../text-field/TextField';
import {
    InputHTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    useEffect,
    useState,
} from 'react';
import ModalPopup, { ButtonType } from '../../generic/ModalPopup';
import {
    addDays,
    addMinutes,
    getHours,
    getMinutes,
    isBefore,
    isSameMinute,
    set,
} from 'date-fns';
import Switch from '../switch/Switch';
import classNames from 'classnames/bind';
import { formatTimeRange } from '../../../utils/time';

const cx = classNames.bind(classes);

interface TimePickerProps {
    label: string;
    startTime: Date;
    endTime?: Date;
    isNow: boolean;
    onTimeChange: (startTime: Date, endTime?: Date) => void;
}

const TimePicker = ({
    label,
    startTime,
    endTime,
    isNow,
    onTimeChange,
}: TimePickerProps) => {
    const [selectedStartTime, setSelectedStartTime] = useState<Date>(startTime);
    const [selectedEndTime, setSelectedEndTime] = useState<Date>(
        endTime || startTime
    );

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [displayEndTime, setDisplayEndTime] = useState<boolean>(!!endTime);

    useEffect(() => {
        if (!isModalOpen) {
            if (isNow) {
                const now = new Date();
                setSelectedStartTime(now);
                setSelectedEndTime(now);
            } else {
                setSelectedStartTime(startTime);
                setSelectedEndTime(endTime || startTime);
            }
        }
    }, [isModalOpen]);

    const disabledButton = () => {
        const isStartTimeUnchanged = isSameMinute(startTime, selectedStartTime);
        const isEndTimeUnchanged =
            endTime && isSameMinute(endTime, selectedEndTime);
        const areStartAndEndSame = isSameMinute(
            selectedStartTime,
            selectedEndTime
        );

        if (!displayEndTime) {
            // If the end time is not displayed, the button should be disabled if the start time is unchanged
            // but if there's an end time, or if isNow is true, the button should always be enabled
            return isStartTimeUnchanged && !(endTime || isNow);
        }

        if (displayEndTime) {
            // If the end time is displayed, the button should be disabled in the following cases:
            // 1. Start and end time are the same, and the start time is unchanged
            // 2. An end time exists and both start and end times are unchanged
            return (
                (areStartAndEndSame && isStartTimeUnchanged) ||
                (endTime && isStartTimeUnchanged && isEndTimeUnchanged)
            );
        }

        return false;
    };

    const onButtonClick = (button: ButtonType): void => {
        switch (button) {
            case 'primary':
                let adjustedEndTime: Date | undefined;

                if (displayEndTime && selectedEndTime) {
                    if (isBefore(selectedEndTime, selectedStartTime)) {
                        adjustedEndTime = addDays(selectedEndTime, 1);
                        setSelectedEndTime(adjustedEndTime);
                    } else {
                        adjustedEndTime = selectedEndTime;
                    }
                }

                onTimeChange(selectedStartTime, adjustedEndTime);
                setIsModalOpen(false);
                break;
            case 'secondary':
                handleTimeReset();
                break;
            case 'close':
                setIsModalOpen(false);
                setDisplayEndTime(endTime instanceof Date);
                break;
        }
    };

    const handleTimeReset = (): void => {
        setSelectedStartTime(startTime);
        setSelectedEndTime(endTime || startTime);
    };

    const handleEndTimeToggle = (): void => {
        if (displayEndTime) {
            setTimeout(() => setSelectedEndTime(selectedStartTime), 250);
        } else {
            setSelectedEndTime(endTime || selectedStartTime);
        }
        setDisplayEndTime((prev) => !prev);
    };

    const handleModalOpen = (event: MouseEvent | TouchEvent): void => {
        event.stopPropagation();
        const target = event.target as HTMLInputElement;
        target.blur();
        setIsModalOpen(true);
    };

    return (
        <>
            <TextField
                label={label}
                value={formatTimeRange(startTime, endTime, isNow)}
                className={classes.timeField}
                iconKey="Clock"
                onClick={(event) => handleModalOpen(event)}
                readOnly
            />
            {isModalOpen && (
                <ModalPopup
                    title="Pick a time"
                    primaryButtonText="Save"
                    secondaryButtonText="Reset"
                    onButtonClick={onButtonClick}
                    disabledPrimaryButton={disabledButton()}
                >
                    <div className={classes.label}>Start time</div>
                    <TimeInput
                        date={selectedStartTime}
                        onDateChange={setSelectedStartTime}
                    />

                    <div className={classes.endTimeToggle}>
                        <div className={classes.label}>End time (optional)</div>
                        <Switch
                            checked={displayEndTime}
                            onChange={handleEndTimeToggle}
                        />
                    </div>

                    <div
                        className={cx({
                            endTimeWrapper: true,
                            open: displayEndTime,
                        })}
                    >
                        <div className={classes.endtimeContainer}>
                            <TimeIncrementButton
                                arrayOfMinutes={[1, 5, 10, 30]}
                                date={selectedEndTime}
                                onDateChange={setSelectedEndTime}
                            />
                            <TimeInput
                                date={selectedEndTime}
                                onDateChange={setSelectedEndTime}
                            />
                        </div>
                    </div>
                </ModalPopup>
            )}
        </>
    );
};

interface TimeIncrementButtonProps {
    arrayOfMinutes: number[];
    date: Date;
    onDateChange: (date: Date) => void;
}

const TimeIncrementButton = ({
    arrayOfMinutes,
    date,
    onDateChange,
}: TimeIncrementButtonProps) => (
    <div className={classes.incrementButtons}>
        {arrayOfMinutes.map((minutes, index) => (
            <button
                className={classes.incrementButton}
                onClick={() => onDateChange(addMinutes(date, minutes))}
                key={index}
            >
                +{minutes}m
            </button>
        ))}
    </div>
);

interface TimeInputProps {
    date: Date;
    onDateChange: (date: Date) => void;
}

interface NumberFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    value: number;
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

export default TimePicker;
