import {
    startOfWeek,
    addDays,
    eachDayOfInterval,
    addWeeks,
    format,
} from 'date-fns';

export const formatTimeRange = (
    startTime: Date,
    endTime?: Date,
    isNow?: boolean
): string => {
    if (isNow) return 'now';

    const timeFormat = 'hh:mmaaa';
    const formattedStartTime = format(startTime, timeFormat);
    if (endTime) {
        const formattedEndTime = format(endTime, timeFormat);

        return `${formattedStartTime} - ${formattedEndTime}`;
    }

    return formattedStartTime;
};

export const getArrayOfWeekDatesFromDate = (
    date: Date,
    offset?: number
): Date[] => {
    const startDate = startOfWeek(offset ? addWeeks(date, offset) : date, {
        weekStartsOn: 1,
    });
    return eachDayOfInterval({
        start: startDate,
        end: addDays(startDate, 6),
    });
};
