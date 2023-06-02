import { startOfWeek, addDays, eachDayOfInterval, addWeeks } from 'date-fns';

function formatTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const amPm = hours < 12 ? 'am' : 'pm';
    const formattedHours = hours % 12 === 0 ? '12' : `${hours % 12}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes}${amPm}`;
}

export function formatTimeRange(
    startTime: Date,
    endTime: Date | undefined
): string {
    const start = formatTime(startTime);
    if (!endTime) {
        return start;
    }
    const end = formatTime(endTime);
    if (start === end) {
        return start;
    }
    return `${start} - ${end}`;
}

export const getArrayOfWeekDatesFromDate = (date: Date, offset?: number) => {
    const startDate = startOfWeek(offset ? addWeeks(date, offset) : date, {
        weekStartsOn: 1,
    });
    return eachDayOfInterval({
        start: startDate,
        end: addDays(startDate, 6),
    });
};
