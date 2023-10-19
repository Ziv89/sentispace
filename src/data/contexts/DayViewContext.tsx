import {
    useState,
    Dispatch,
    SetStateAction,
    createContext,
    ReactNode,
    useEffect,
} from 'react';
import { getArrayOfWeekDatesFromDate } from '../../utils/time';
import { isSameWeek, startOfDay } from 'date-fns';

export interface IDayViewContext {
    selectedDay: Date;
    setSelectedDay: Dispatch<SetStateAction<Date>>;
    displayedWeek: Date[];
    setDisplayedWeek: Dispatch<SetStateAction<Date[]>>;
}

interface ContextProviderProps {
    children: ReactNode;
}

const today = startOfDay(new Date());

export const DayViewContext = createContext<IDayViewContext>({
    selectedDay: today,
    setSelectedDay: () => {},
    displayedWeek: [],
    setDisplayedWeek: () => {},
});

export default function DayViewContextProvider({
    children,
}: ContextProviderProps) {
    const [selectedDay, setSelectedDay] = useState<Date>(today);
    const [displayedWeek, setDisplayedWeek] = useState<Date[]>(
        getArrayOfWeekDatesFromDate(today)
    );

    useEffect(() => {
        if (!isSameWeek(startOfDay(selectedDay), displayedWeek[0]))
            setDisplayedWeek(getArrayOfWeekDatesFromDate(selectedDay));
    }, [selectedDay]);

    return (
        <DayViewContext.Provider
            value={{
                selectedDay,
                setSelectedDay,
                displayedWeek,
                setDisplayedWeek,
            }}
        >
            {children}
        </DayViewContext.Provider>
    );
}
