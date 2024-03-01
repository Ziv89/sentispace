import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useEffect,
} from 'react'
import { getArrayOfWeekDatesFromDate } from '../../utils/time'
import { isSameDay, isSameWeek, startOfDay } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../Database'

export interface IDayViewContext {
  selectedDay: Date
  setSelectedDay: Dispatch<SetStateAction<Date>>
  displayedWeek: Date[]
  setDisplayedWeek: Dispatch<SetStateAction<Date[]>>
}

interface ContextProviderProps {
  children: ReactNode
}

const today = startOfDay(new Date())

export const DayViewContext = createContext<IDayViewContext>({
  selectedDay: today,
  setSelectedDay: () => {},
  displayedWeek: [],
  setDisplayedWeek: () => {},
})

export default function DayViewContextProvider({
  children,
}: ContextProviderProps) {
  const [initialLoad, setInitialLoad] = useState<boolean>(true)
  const [selectedDay, setSelectedDay] = useState<Date>(today)
  const [displayedWeek, setDisplayedWeek] = useState<Date[]>(
    getArrayOfWeekDatesFromDate(today),
  )

  const lastestActivity = useLiveQuery(() =>
    db.activities.orderBy(':id').last(),
  )

  useEffect(() => {
    setDisplayedWeek((prev) => {
      if (!isSameWeek(startOfDay(selectedDay), prev[0]))
        getArrayOfWeekDatesFromDate(selectedDay)

      return prev
    })
  }, [selectedDay])

  useEffect(() => {
    setInitialLoad(false)
  }, [])

  useEffect(() => {
    if (!lastestActivity?.id || initialLoad) return

    setSelectedDay((prev) => {
      if (isSameDay(prev, lastestActivity.startTime)) return prev
      return lastestActivity.startTime
    })
  }, [initialLoad, lastestActivity])

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
  )
}
