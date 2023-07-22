import {
    startOfWeek,
    addDays,
    eachDayOfInterval,
    addWeeks,
    format,
    set,
} from 'date-fns';

/**
 * Copies the year, month, and date from one Date object to another.
 *
 * @param {Date} targetDate The Date object to modify.
 * @param {Date} sourceDate The Date object to copy from.
 * @returns {Date} The targetDate with the year, month, and date copied from the sourceDate.
 */
export const copyDate = (targetDate: Date, sourceDate: Date): Date =>
    set(targetDate, {
        year: sourceDate.getFullYear(),
        month: sourceDate.getMonth(),
        date: sourceDate.getDate(),
    });

/**
 * Formats a time range as a string.
 *
 * @param {Date} startTime The start time of the range.
 * @param {Date} [endTime] The end time of the range. If not provided, only the start time is formatted.
 * @param {boolean} [isNow] If true, the function immediately returns the string 'now'.
 * @returns {string} The formatted time range.
 */
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

/**
 * Generates an array of Date objects for each day of the week, considering the week that contains the specified date.
 * The function determines the start of the week for the given date, then applies the optional offset in weeks from that start.
 *
 * @param {Date} date The date within the week to be considered.
 * @param {number} [offset] The number of weeks to offset from the start of the week of the given date.
 * @returns {Date[]} An array of Date objects representing each day of the week.
 */
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
