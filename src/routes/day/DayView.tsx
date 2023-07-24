import classes from './DayView.module.scss';

import { useContext, useState } from 'react';
import Activity from '../../components/activity/Activity';
import { CalendarBlank, Sliders } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { DayViewContext } from '../../data/contexts/DayViewContext';
import DayCarousel from '../../components/day/DayCarousel';
import classNames from 'classnames/bind';
import FilterModal from '../../components/shared/FilterModal';
import { useFilteredActivities } from '../../hooks/useFilteredActivities';
import Badge from '../../components/generic/Badge';

const cx = classNames.bind(classes);

function DayView() {
    const { selectedDay } = useContext(DayViewContext);
    const [activities, selectedCategories] = useFilteredActivities(selectedDay);

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
