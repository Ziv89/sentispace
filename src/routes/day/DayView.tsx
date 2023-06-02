import classes from './DayView.module.scss';

import { useContext } from 'react';
import { db } from '../../data/Database';
import Activity from '../../components/activity/Activity';
import { Activity as IActivity } from '../../data/interfaces';
import { useLiveQuery } from 'dexie-react-hooks';
import { CalendarBlank, Sliders } from '@phosphor-icons/react';
import { endOfDay, format, startOfDay } from 'date-fns';
import { DayViewContext } from '../../data/contexts/DayViewContext';
import DayCarousel from '../../components/day/DayCarousel';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

function DayView() {
    const { selectedDay } = useContext(DayViewContext);
    const activities =
        useLiveQuery<IActivity[]>(
            () =>
                db.activities
                    .where('startTime')
                    .between(startOfDay(selectedDay), endOfDay(selectedDay))
                    .toArray(),
            [selectedDay]
        ) ?? [];

    return (
        <div className={classes.viewContainer}>
            <div className={classes.header}>
                <h1 className={classes.displayedMonth}>
                    {format(selectedDay, 'MMMM yyyy')}
                </h1>
                <div className={cx({ clickableText: true, invalid: true })}>
                    Change View
                    <CalendarBlank />
                </div>
            </div>
            <DayCarousel />
            <div className={classes.activitiesHeading}>
                <h2 className={classes.title}>Activities</h2>
                <div className={classes.clickableText}>
                    Filters
                    <Sliders />
                </div>
            </div>
            <div className={classes.activitiesWrapper}>
                <div className={classes.activitiesContainer}>
                    {activities.map((activity) => (
                        <Activity
                            key={activity.id?.toString()}
                            iconId={activity.iconId}
                            title={activity.title}
                            startTime={activity.startTime}
                            endTime={activity.endTime}
                            description={activity.description}
                            rating={activity.rating}
                            categoryIds={activity.categoryIds}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DayView;
