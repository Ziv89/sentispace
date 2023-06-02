import classes from './DayItem.module.scss';

import { MouseEventHandler } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/Database';
import { endOfDay, isAfter, startOfDay } from 'date-fns';
import classNames from 'classnames/bind';
import { Activity } from '../../data/interfaces';

const cx = classNames.bind(classes);

interface DayItemProps {
    date: Date;
    active?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const DayItem = ({ date, active, onClick }: DayItemProps) => {
    const activities =
        useLiveQuery<Activity[]>(() =>
            db.activities
                .where('startTime')
                .between(startOfDay(date), endOfDay(date))
                .toArray()
        ) ?? [];

    const dayLetter = date.toLocaleString('default', { weekday: 'long' })[0];
    const dayNumber = date.getDate();

    const count = activities.length;
    const rating =
        activities.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rating,
            0
        ) / activities.length;

    const invalid = isAfter(date, new Date());
    const mappedRating =
        rating && Math.round(((rating - 0) / (5 - 0)) * (7 - 1) + 1);

    return (
        <div className={classes.dayItem}>
            {count > 0 && (
                <div
                    className={cx({
                        dayActivityCount: true,
                        active,
                    })}
                >
                    {count}
                </div>
            )}
            <div
                className={cx({
                    dayCard: true,
                    active,
                    noCount: !count,
                    activeNoCount: active && !count,
                    invalid,
                    [`ratingColor${mappedRating}`]: !active && mappedRating,
                })}
                onClick={invalid ? undefined : onClick}
            >
                <span className={classes.dayLetter}>{dayLetter}</span>
                <span className={classes.dayNumber}>{dayNumber}</span>
            </div>
        </div>
    );
};

export default DayItem;
