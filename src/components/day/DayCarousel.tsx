import classes from './DayCarousel.module.scss';

import { isSameDay, isSameWeek } from 'date-fns';
import DayItem from './DayItem';
import { CaretLeft, CaretRight, IconProps } from '@phosphor-icons/react';
import { DayViewContext, today } from '../../data/contexts/DayViewContext';
import {
    MouseEvent,
    TouchEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { getArrayOfWeekDatesFromDate } from '../../utils/time';
import classNames from 'classnames/bind';

const cx = classNames.bind(classes);

enum Directions {
    NEXT = 1,
    PREVIOUS = -1,
}

const NAVIGATION_ICON_PROPS: IconProps = {
    color: 'var(--color-neutral-1)',
};

const swipeThreshold = 10000;

const swipeMagnitude = (offset: number, velocity: number): number => {
    return Math.abs(offset) * velocity;
};

const usePrevious = <T,>(state: T): T | null => {
    const [tuple, setTuple] = useState<[T | null, T]>([null, state]);

    if (tuple[1] !== state) {
        setTuple([tuple[1], state]);
    }

    return tuple[0];
};
const DayCarousel = () => {
    const { selectedDay, setSelectedDay, displayedWeek, setDisplayedWeek } =
        useContext(DayViewContext);

    const [prevWeek, setPrevWeek] = useState<Date[]>();
    const [nextWeek, setNextWeek] = useState<Date[]>();

    const [isDragging, setIsDragging] = useState(false);

    const weekIndicator = displayedWeek[0];
    const previousWeekIndicator = usePrevious(weekIndicator);

    useEffect(() => {
        setPrevWeek(
            getArrayOfWeekDatesFromDate(weekIndicator, Directions.PREVIOUS)
        );
        setNextWeek(
            getArrayOfWeekDatesFromDate(weekIndicator, Directions.NEXT)
        );
    }, [displayedWeek]);

    let direction: Directions;

    previousWeekIndicator && previousWeekIndicator < weekIndicator
        ? (direction = Directions.NEXT)
        : (direction = Directions.PREVIOUS);

    const handleWeekNavigation = useCallback(
        (direction: Directions) => {
            if (direction == Directions.NEXT) {
                if (isSameWeek(weekIndicator, today)) return;
                setDisplayedWeek(
                    getArrayOfWeekDatesFromDate(weekIndicator, Directions.NEXT)
                );
            } else if (direction == Directions.PREVIOUS) {
                setDisplayedWeek(
                    getArrayOfWeekDatesFromDate(
                        weekIndicator,
                        Directions.PREVIOUS
                    )
                );
            }
        },
        [displayedWeek]
    );

    const handleDaySelection = useCallback(
        (event: MouseEvent | TouchEvent, date: Date) => {
            event.stopPropagation();
            if (isDragging) return;

            if (!isSameDay(date, selectedDay)) {
                setSelectedDay(date);
            }
        },
        [selectedDay, isDragging]
    );

    return (
        <div className={classes.daysCarousel}>
            <CaretLeft
                {...NAVIGATION_ICON_PROPS}
                onClick={() => handleWeekNavigation(Directions.PREVIOUS)}
            />
            <div className={classes.daysWrapper}>
                <AnimatePresence custom={direction}>
                    <motion.div
                        className={classes.days}
                        key={weekIndicator.toDateString()}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={direction}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipeMagnitude(offset.x, velocity.x);

                            if (swipe < -swipeThreshold) {
                                handleWeekNavigation(Directions.NEXT);
                            } else if (swipe > swipeThreshold) {
                                handleWeekNavigation(Directions.PREVIOUS);
                            }

                            setIsDragging(false);
                        }}
                    >
                        <div className={classes.prevWeek}>
                            {prevWeek?.map((date) => (
                                <DayItem
                                    key={date.toDateString()}
                                    date={date}
                                />
                            ))}
                        </div>
                        <div className={classes.currentWeek}>
                            {displayedWeek.map((date) => (
                                <DayItem
                                    key={date.toDateString()}
                                    date={date}
                                    active={isSameDay(date, selectedDay)}
                                    onClick={(event) =>
                                        handleDaySelection(event, date)
                                    }
                                />
                            ))}
                        </div>
                        <div className={classes.nextWeek}>
                            {nextWeek?.map((date) => (
                                <DayItem
                                    key={date.toDateString()}
                                    date={date}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <CaretRight
                {...NAVIGATION_ICON_PROPS}
                className={cx({ invalid: isSameWeek(weekIndicator, today) })}
                onClick={() => handleWeekNavigation(Directions.NEXT)}
            />
        </div>
    );
};

let variants: Variants = {
    enter: (direction: Directions) => ({
        x: direction === Directions.NEXT ? 200 : -200,
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: Directions) => ({
        x: direction === Directions.NEXT ? -200 : 200,
        opacity: 0,
    }),
};

export default DayCarousel;
