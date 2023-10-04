import classes from './DayView.module.scss';

import { useContext, useMemo, useState } from 'react';
import Activity from '../../components/activity/Activity';
import { CalendarBlank, Sliders } from '@phosphor-icons/react';
import { format, isWithinInterval } from 'date-fns';
import { DayViewContext } from '../../data/contexts/DayViewContext';
import DayCarousel from '../../components/day/DayCarousel';
import classNames from 'classnames/bind';
import FilterModal from '../../components/shared/FilterModal';
import { useFilteredActivities } from '../../hooks/useFilteredActivities';
import Badge from '../../components/generic/Badge';

const cx = classNames.bind(classes);

function getDisplayMonthYear(selectedDay: Date, displayedWeek: Date[]) {
    const startDateOfWeek = displayedWeek[0];
    const endDateOfWeek = displayedWeek[6];
    const isDateInWeek = isWithinInterval(selectedDay, {
        start: startDateOfWeek,
        end: endDateOfWeek,
    });

    const displayedMonthYear = isDateInWeek ? selectedDay : startDateOfWeek;

    return format(displayedMonthYear, 'MMMM yyyy');
}

function DayView() {
    const { selectedDay, displayedWeek } = useContext(DayViewContext);
    const [activities, selectedCategories] = useFilteredActivities(selectedDay);

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const displayedMonthYear = useMemo(
        () => getDisplayMonthYear(selectedDay, displayedWeek),
        [selectedDay, displayedWeek]
    );

    return (
        <div className={classes.viewContainer}>
            <div className={classes.header}>
                <h1 className={classes.displayedMonth}>{displayedMonthYear}</h1>
                <div className={cx({ clickableText: true, invalid: true })}>
                    Change View
                    <CalendarBlank />
                </div>
            </div>
            <DayCarousel />
            <div className={classes.activitiesHeading}>
                <h2 className={classes.title}>Activities</h2>
                <div
                    className={classes.clickableText}
                    onClick={() => setIsFilterModalOpen(true)}
                >
                    Filters
                    <Sliders />
                    {selectedCategories.length > 0 && (
                        <Badge
                            top
                            right
                            value={selectedCategories.length}
                            color="var(--color-filter)"
                        />
                    )}
                </div>
            </div>
            <div className={classes.activitiesWrapper}>
                <div className={classes.activitiesContainer}>
                    {activities.map((activity, index) => (
                        <Activity key={index} {...activity} />
                    ))}
                </div>
            </div>
            {isFilterModalOpen && (
                <FilterModal onClose={() => setIsFilterModalOpen(false)} />
            )}
        </div>
    );
}

export default DayView;
