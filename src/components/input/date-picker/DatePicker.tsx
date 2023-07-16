import classes from './DatePicker.module.scss';

import {
    addMonths,
    addWeeks,
    compareAsc,
    eachDayOfInterval,
    endOfWeek,
    format,
    getWeeksInMonth,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import TextField from '../text-field/TextField';
import {
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    useEffect,
    useState,
} from 'react';
import { today } from '../../../data/contexts/DayViewContext';
import ModalPopup, { ButtonType } from '../../generic/ModalPopup';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

interface DatePickerProps {
    label: string;
    date: Date;
    onDateChange: (date: Date) => void;
}

enum Directions {
    NEXT = 1,
    PREVIOUS = -1,
}

const getMonthWeeks = (selectedMonth: Date) => {
    const startOfMonthDate = startOfMonth(selectedMonth);
    const numberOfWeeksInMonth = getWeeksInMonth(selectedMonth);

    const weeksInMonths: Date[][] = [];
    for (let week = 0; week < numberOfWeeksInMonth; week++) {
        const desiredWeek = addWeeks(startOfMonthDate, week);
        const startOfWeekDate = startOfWeek(desiredWeek);
        const endOfWeekDate = endOfWeek(desiredWeek);
        const weekDays = eachDayOfInterval({
            start: startOfWeekDate,
            end: endOfWeekDate,
        });
        weeksInMonths.push(weekDays);
    }

    return weeksInMonths;
};

const DatePicker = ({ label, date, onDateChange }: DatePickerProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(date);
    const [monthOffset, setMonthOffset] = useState<number>(0);

    useEffect(() => setMonthOffset(0), [isModalOpen]);

    const disabledPrimaryButton = isSameDay(date, selectedDate);

    const selectedMonth = addMonths(date, monthOffset);
    const weeksInMonths = getMonthWeeks(selectedMonth);

    const formattedDate = isSameDay(date, today)
        ? 'today'
        : format(date, 'dd/MM/yyyy');

    const handleMonthNavigation = (direction: Directions) => {
        switch (direction) {
            case Directions.NEXT:
                if (isSameMonth(selectedMonth, today)) return;
                setMonthOffset((prev) => prev + 1);
                break;
            case Directions.PREVIOUS:
                setMonthOffset((prev) => prev - 1);
                break;
        }
    };

    const handleDateSelection = (date: Date) => {
        if (compareAsc(date, today) === 1) return;

        if (isSameMonth(date, selectedMonth)) {
            setSelectedDate((prev) => date);
            return;
        }

        if (compareAsc(date, selectedMonth) > 0) {
            handleMonthNavigation(Directions.NEXT);
        } else {
            handleMonthNavigation(Directions.PREVIOUS);
        }

        setSelectedDate(date);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const { code } = event;

        if (!isModalOpen && code === 'Enter') {
            handleModalOpen(event);
            return;
        }
    };

    const onButtonClick = (button: ButtonType) => {
        switch (button) {
            case 'primary':
                onDateChange(selectedDate);
                setIsModalOpen(false);
                break;
            case 'secondary':
                setSelectedDate(date);
                setMonthOffset(0);
                break;
            case 'close':
                setIsModalOpen(false);
                break;
        }
    };

    const handleModalOpen = (
        event: MouseEvent | TouchEvent | KeyboardEvent
    ) => {
        event.stopPropagation();
        const target = event.target as HTMLInputElement;
        target.blur();

        setIsModalOpen(true);
    };

    return (
        <>
            <TextField
                label={label}
                value={formattedDate}
                iconKey="CalendarBlank"
                onClick={handleModalOpen}
                onKeyDown={handleKeyPress}
                readOnly
            />

            {isModalOpen && (
                <ModalPopup
                    title="Pick a date"
                    primaryButtonText="Save"
                    secondaryButtonText="Reset"
                    onButtonClick={onButtonClick}
                    disabledPrimaryButton={disabledPrimaryButton}
                >
                    <div className={classes.header}>
                        <CaretLeft
                            onClick={() =>
                                handleMonthNavigation(Directions.PREVIOUS)
                            }
                        />
                        <div className={classes.displayedMonth}>
                            {format(selectedMonth, 'MMMM yyyy')}
                        </div>
                        <CaretRight
                            onClick={() =>
                                handleMonthNavigation(Directions.NEXT)
                            }
                        />
                    </div>
                    <div className={classes.month}>
                        <div className={classes.week}>
                            {weeksInMonths[0].map((day, index) => (
                                <div
                                    key={index}
                                    className={cx({ day: true, dayName: true })}
                                >
                                    {format(day, 'EEEEE')}
                                </div>
                            ))}
                        </div>
                        {weeksInMonths.map((week, index) => (
                            <div key={index} className={classes.week}>
                                {week.map((day, index) => (
                                    <div
                                        key={index}
                                        className={cx({
                                            day: true,
                                            selectedDate: isSameDay(
                                                day,
                                                selectedDate
                                            ),
                                            outOfMonth:
                                                !isSameMonth(
                                                    day,
                                                    selectedMonth
                                                ) ||
                                                compareAsc(day, today) === 1,
                                        })}
                                        onClick={() => handleDateSelection(day)}
                                    >
                                        {format(day, 'dd')}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </ModalPopup>
            )}
        </>
    );
};

export default DatePicker;
