import {
    useState,
    Dispatch,
    SetStateAction,
    createContext,
    ReactNode,
} from 'react';
import { getArrayOfWeekDatesFromDate } from '../../utils/time';

export interface IDayViewContext {
    selectedDay: Date;
    setSelectedDay: Dispatch<SetStateAction<Date>>;
    displayedWeek: Date[];
    setDisplayedWeek: Dispatch<SetStateAction<Date[]>>;
}

interface ContextProviderProps {
    children: ReactNode;
}

const today = new Date();

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
